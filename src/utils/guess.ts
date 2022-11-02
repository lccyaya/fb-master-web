
type datafilterParmas = {
  id: number | null
  index: number
  newiswin: string | null
}

// 获取选择竞猜
export const datafilter = (arr: datafilterParmas[], data: datafilterParmas) => {
  let ishava = arr.findIndex((item: datafilterParmas) => {
    return item.index == data.index
  })
  if (ishava == -1) {
    return [...arr, data]
    // setSelectvalue()
  } else if (data.id == null) {

    let newarr = arr.filter((item: datafilterParmas) => {
      return item.index !== data.index
    })

    return newarr
  } else {
    arr[ishava].id = data.id,
      arr[ishava].newiswin = data.newiswin
    return arr
  }
}