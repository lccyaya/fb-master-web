// 获取选择比赛列表
export const datafilter = (arr, data) => {
  let ishava = arr.findIndex((item) => {
    return item.index == data.index
  })
  if (ishava == -1) {
    return [...arr, data]
    // setSelectvalue()
  } else if (data.id == null) {

    let newarr = arr.filter((item) => {
      return item.index !== data.index
    })

    return newarr
  } else {
    arr[data.index].id = data.id,
      arr[data.index].newiswin = data.newiswin
    return arr
  }
}