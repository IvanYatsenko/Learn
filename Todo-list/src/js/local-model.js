export let Local = {

  storageData: (title) => {
    const strToData = `${title}-srorage`
    let dataStorage = JSON.parse(localStorage.getItem(strToData))
    if(dataStorage === null) {
      dataStorage = false
      localStorage.setItem(strToData, JSON.stringify(dataStorage))
      return dataStorage
    }
    return dataStorage
  },

  storageDataToggle: (title) => {
    const strToData = `${title}-srorage`
    let dataStorage = JSON.parse(localStorage.getItem(strToData))
    dataStorage = !dataStorage
    localStorage.setItem(strToData, JSON.stringify(dataStorage))
  },

  saveData: (title, items) => {
    localStorage.setItem(title, JSON.stringify(items))
  },

  loadData: (title) => {
    return JSON.parse(localStorage.getItem(title))
  }
}
