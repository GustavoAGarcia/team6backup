import React, { Component } from 'react'
import axios from 'axios'
import * as constants from '../../app/constants.jsx'
import FECCaller from '../../app/FECCaller'

var cashOnHand = '0';
var disbursements = '0';
var receipts = '0';

//function used from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    if (x === undefined) {
        return 0
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class DonationCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            receipts:[],
            committeeID:"NULL",
            donationInfo: ""
        }
        this.name = {
            name: props.name
        }
        this.chamber = {
            chamber: props.chamber
        }
    }

    componentDidMount() {

        let fecCaller = new FECCaller()
         fecCaller.getMemberId(this.props.name)
         .then(id => {
             fecCaller.getFinanceInformation(id)
             .then(results => {
                 this.setState({
                     donationInfo: results
                 })
                 console.log(results)
             })
         })
    }

    render()
    {
        return(
        <div className = 'listed-rep__container'>
            <h4>Campaign Finance </h4>
            <li>Individual Contributions: ${numberWithCommas(this.state.donationInfo.individual_contributions)} </li>
            <li>Campaign Contributions: ${numberWithCommas(this.state.donationInfo.contributions)} </li>
            <li>Total loans: ${numberWithCommas(this.state.donationInfo.loans)} </li>
            <li>Receipts: ${numberWithCommas(this.state.donationInfo.receipts)} </li>
            <li>Disbursements: ${numberWithCommas(this.state.donationInfo.disbursements)} </li>
        </div>
        )
    }
}
