class View {

  createTitle(title) {
    const titleEl = document.createElement('h1')
    titleEl.textContent = title
    return titleEl
  }
    
  createBtn(btnName) {
    const btn = document.createElement('button')
    btn.textContent = btnName
    return btn
  }

  createList() {
    const listEl = document.createElement('ul')
    listEl.id = 'list'
    return listEl
  }
    
  createItemEl(strItem) {
    const itemEl = document.createElement('li')
    itemEl.innerHTML = strItem
    return itemEl
  }

  loadElement() {
    const wrap = document.createElement('div')
    wrap.id = 'loader'
    wrap.textContent = 'Подождите идет загрузка...'
    return wrap
  }

  createHoverElement() {
    const element = document.createElement('div')
    return element
  }
}

export default View


