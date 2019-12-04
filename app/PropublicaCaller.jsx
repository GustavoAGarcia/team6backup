import axios from 'axios'

export default class PropublicaCaller {

    constructor() {
        this.baseURL = "https://cors-anywhere.herokuapp.com/" + 'https://api.propublica.org/congress/v1/'
        this.instance = axios.create({
            headers: {
                'X-Api-Key': 'Ra6Po86I47wLSfiJ8MHRM9RylznHKAyWQxmQRhyL',
                "x-requested-with": "xhr"
            }
        })
    }

    // Generic call, pass in URL
    async call(url) {
        let response = await this.instance.get(url)
        return response
    }

    // Returns a list of all house members
    async getAllCurrentHouse() {
        var url = this.baseURL + '116/house/members.json'
        var response = await this.call(url)
        return response.data.results[0].members
    }

    // Returns a list of all senate members
    async getAllCurrentSenate() {
        var url = this.baseURL + '116/senate/members.json'
        var response = await this.call(url)
        return response.data.results[0].members
    }

    // Returns a single member from the house or senate
    async getSingleMember(id) {
        var url = this.baseURL + `members/${id}.json`
        var response = await this.call(url)
        return response.data.results
    }

     // Returns a single bill
    async getSpecificBill(bill_id) {
        var url = this.baseURL + `116/bills/${bill_id}.json`
        var response = await this.call(url)
        console.log(response)
        return response.data.results[0]
    }

    async getBillList(id) {
        console.log(id);
        var url = this.baseURL + 'members/' + id + "/bills/cosponsored.json";
        
        var response = await this.call(url)
        console.log(response)
        return response.data.results
    }
}
