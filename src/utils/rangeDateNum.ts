
export function rangeDateNum(time: string) {
    // eslint-disable-next-line @typescript-eslint/type-annotation-spacing

    const newtime: any = ((new Date().getTime() - new Date(time).getTime()) / (1000 * 3600 * 24)).toFixed(0)
    if (newtime < 30) {
        return newtime + "天前"
    } else {
        return time
    }


}


