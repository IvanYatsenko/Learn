import constants from "./Constant/Constants.js"
import HTTPClient from "./HTTPClient.js";
import DateService from "./Services/DateService.js";
import CurrencyService from "./Services/CurrencyService.js";
import View from "./View.js";

const view = new View()
const clientHTTP = new HTTPClient
const dateService = new DateService
const currencyService = new CurrencyService(clientHTTP)

const container = document.getElementById('app')
const divEl = document.createElement('div')
divEl.id = 'info'

let dataCurrency = []
let dataDynamicCurrecny = []

const data = await currencyService.getAllCurrency()

for (const currency in data.Valute) {
  dataCurrency.push(data.Valute[currency])
}

function addMainView(title) {
  const
    mainTitle = view.createTitle(title),
    mainList = view.createList(),
    loadEl = view.loadElement()
  mainTitle.classList.add('text-center')
  loadEl.classList.add('load-item')
  mainList.append(loadEl)
  container.append(mainTitle)
  container.append(mainList)
}

function showHideLoader() {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hide')
}

function clickItem(element, item) {
  element.addEventListener('click', () => {
    getDynamicCurrency(item.CharCode)
  })
}

function showTooltip(item) {
  const tooltip = view.createHoverElement()
  tooltip.classList.add('tool')
  tooltip.id = `${item.CharCode}-tooltip`
  tooltip.textContent = `${item.Name}`
  document.getElementById(item.CharCode).append(tooltip)
}

function hideTooltip(item) {
  document.getElementById(`${item.CharCode}-tooltip`).remove()
}

function setupHover(element, item) {
  element.addEventListener('mouseover', () => {
    showTooltip(item)
  })
  element.addEventListener('mouseout', () => {
    hideTooltip(item)
  })
}



async function getDynamicCurrency(charCode) {
  let tempData = []
  tempData = data
  for (let i = 0; i < constants.dayCount; i++) {
    const dateFromStr = dateService.getDateFrom(tempData.Date)
    try {
      const currencyDynamic = await currencyService.getCurrencyByDate(dateFromStr)
      if (currencyDynamic.Date) {
        currencyDynamic.Valute[charCode].date = dateFromStr
        dataDynamicCurrecny.push(currencyDynamic.Valute[charCode])
        tempData = currencyDynamic
      }
    } catch {
      tempData.Date = dateService.getDateFrom(tempData.Date)
      dataDynamicCurrecny.push({Value: 'Курс не установлен', date: tempData.Date})
    }
  }
  crateListDynamic(dataDynamicCurrecny)
  dataDynamicCurrecny = []
}

function crateListDynamic(dataDynamicCurrecny) {

  console.log(divEl)
  divEl.innerHTML = ''
  console.log(dataDynamicCurrecny)
  for (let cur in dataDynamicCurrecny) {
    const pInfo = document.createElement('p')
    pInfo.innerHTML = `${dataDynamicCurrecny[cur].Value} - ${dataDynamicCurrecny[cur].date}`
    divEl.append(pInfo)
  }
  container.append(divEl)
}

function createCurrencyItems() {
  if (!dataCurrency) return
  showHideLoader()
  for (let currency in dataCurrency) {
    const itemElementCurrency = view.createItemEl(`${dataCurrency[currency].CharCode} ${dataCurrency[currency].Value.toFixed(2)}&#8381; ${(100 - 100 * dataCurrency[currency].Previous / dataCurrency[currency].Value).toFixed(2)}%`)
    itemElementCurrency.id = dataCurrency[currency].CharCode
    setupHover(itemElementCurrency, dataCurrency[currency])
    clickItem(itemElementCurrency, dataCurrency[currency])
    document.getElementById('list').append(itemElementCurrency)
  }
}

export function startApp() {
  addMainView(constants.mainTitle)
  createCurrencyItems()
 
}