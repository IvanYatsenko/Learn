import constants from "../Constant/Constants.js"

class DateService {

  getDateFrom(date) {
    const dateTo = new Date(date)
    const dateFrom = new Date(dateTo.setTime(dateTo.getTime() - constants.dayRange)).toLocaleDateString()
    let dateFromStr = dateFrom.split('.')
    dateFromStr = `${dateFromStr[2]}/${dateFromStr[1]}/${dateFromStr[0]}`
    return dateFromStr
  }
}

export default DateService