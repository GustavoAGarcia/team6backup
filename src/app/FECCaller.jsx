import axios from 'axios'
import * as Constants from '../app/constants'

export default class PropublicaCaller {

    constructor() {
        this.baseURL = 'https://api.open.fec.gov/v1/'
        this.instance = axios.create({
        })
    }

    // Generic call, pass in URL
    async call(url) {
        let response = await this.instance.get(url)
        return response
    }

    // Returns the id for a representative
    async getMemberId(name) {
        var url = this.baseURL + 'candidates/search/?is_active_candidate=true&sort_hide_null=false&per_page=20&sort_nulls_last=false&sort_null_only=false&api_key=' + Constants.FEC_API_KEY + '&page=1&name=' + name
        var response = await this.call(url)
        return response.data.results[0].candidate_id
    }

    // Returns a list of all house members
    async getFinanceInformation(id) {
        var url = this.baseURL + 'candidate/' + id + '/totals/?api_key=' + Constants.FEC_API_KEY + '&page=1&sort_hide_null=false&per_page=20&sort_nulls_last=false&sort_null_only=false&sort=-cycle'
        var response = await this.call(url)
        return response.data.results[0]
    }
}
