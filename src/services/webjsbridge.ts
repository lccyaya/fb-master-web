export {};

declare global {
  interface Window {
    WebViewJavascriptBridge: any;
    WVJBCallbacks: any;
    android: any;
    jsclient: any;
  }
}

let uagent = window.navigator.userAgent;
let isAndroid = uagent.indexOf('Android') > -1 || uagent.indexOf('Linux') > -1;  //判断是安卓手机
let isIOS = !!uagent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);               //判断是iOS
window.jsclient = {};

class WebJsBridge {
  private bridge: any = {};
  private callQueue: any[] = [];
  private handlerQueue: any[] = [];
  constructor() {
    if (isIOS) {
      this.initIOS();
    }
  }

  private initIOS() {
    this.setupWebViewJavascriptBridge((bridge: any) => {
      this.bridge = bridge;

      // Tell Webview that Angular is ready.
      bridge.callHandler('AppReady', {});

      // When call or handle function has called during init,
      // Flush them when bridge is ready.
      if (this.handlerQueue.length > 0 || this.callQueue.length > 0) {
        this.flush();
      }
    });
  }

  /**
   * Call native WebView
   * @param name
   * @param data
   * @param callback
   * @usage
   *   service.callHandler('ObjC Echo', {'key': 'value'}, responseData => {
   *     console.log('Echo returned from native', responseData);
   *   });
   */
  callHandler(name: string, data: string, callback?: (response: string) => void) {
    if (isIOS) {
      // When bridge is not ready, push into queue.
      if (!(this.bridge || {}).callHandler) {
        this.callQueue.push({ name: name, data: data, callback: callback });
        return;
      }
      this.bridge.callHandler(name, data, callback);
    }
    if (isAndroid) {
      const res = window['android'][name](data);
      if (callback) {
        callback(res)
      }
    }
  }

  /**
   * Register handler
   * @param name
   * @param callback
   *
   * @usage
   *   service.registerHandler('JS Echo', (data, callback) => {
   *     console.log('JS Echo called from native with', data);
   *     callback(data);
   *   })
   */
  registerHandler(
    name: string,
    callback: (data: string, callback: (data: string) => void) => void,
  ) {
    if (isIOS) {
      // When bridge is not ready, push into queue.
      if (!(this.bridge || {}).registerHandler) {
        this.handlerQueue.push({ name: name, callback: callback });
        return;
      }
      this.bridge.registerHandler(name, callback);
    }
    if (isAndroid) {
      window["jsclient"][name] = (arg: string) => {
        let result: any;
        callback(arg,(res)=>{
          result = res;
        });
        return result;
      }
    }
  }

  /**
   * Flush queue
   */
  private flush() {
    this.callQueue.forEach((call) => {
      this.callHandler(call.name, call.data, call.callback);
    });
    this.callQueue = [];
    this.handlerQueue.forEach((handler) => {
      this.registerHandler(handler.name, handler.callback);
    });
    this.handlerQueue = [];
  }

  /**
   * Set up native-web bridge
   * from https://github.com/marcuswestin/WebViewJavascriptBridge
   * @param callback
   * @returns {any}
   */
  private setupWebViewJavascriptBridge(callback: (bridge: any) => void) {
    if (Window.prototype.WebViewJavascriptBridge) {
      return callback(Window.prototype.WebViewJavascriptBridge);
    }
    if (Window.prototype.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
}

export const webJsBridge = new WebJsBridge();
