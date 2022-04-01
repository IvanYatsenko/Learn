import constants from "../Constant/Constants.js"

class CurrencyService {
    constructor(client) {
        this.client = client
    }
    async getAllCurrency() {
        const result = await this.client.fetchData(constants.allCurrencyURL)
        return result
    }

    async getCurrencyByIDAndDateRange(id, dateFrom, dateTo) {
        const urlstr = `${constants.rangeCourseCurrencyURL}?date_req1=${dateFrom}&date_req2=${dateTo}&VAL_NM_RQ=${id}`
        const result = await this.client.fetchData(urlstr)
        return result
    }
}

export default CurrencyService