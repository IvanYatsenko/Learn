import constants from "../Constant/Constants.js"

class CurrencyService {
    constructor(client) {
        this.client = client
    }
    async getAllCurrency() {
        const result = await this.client.fetchData(constants.allCurrencyURL)
        return result
    }

    async getCurrencyByDate(date) {
        const urlstr = `${constants.rangeCourseCurrencyURL}${date}/daily_json.js`
        const result = await this.client.fetchData(urlstr)
        return result
    }
}

export default CurrencyService