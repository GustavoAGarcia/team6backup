import React, { Component } from 'react'
import axios from 'axios'
import * as constants from '../../app/constants.jsx'
import FECCaller from '../../app/FECCaller'
import { RadialChart, Hint } from 'react-vis';

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
            donationInfo: "",
            fec_id: props.fec_id
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
        fecCaller.getFinanceInformation(this.props.fec_id)
        .then(results => {
            this.setState({
                donationInfo: results
            })
        })
    }

	render()
    {
        const data = [
          {angle: this.state.donationInfo.individual_contributions, label: 'Individual Contributions', color: 'brown'},
          {angle: this.state.donationInfo.contributions, label: 'Campaign Contributions', color: 'orange'},
          {angle: this.state.donationInfo.loans, label: 'Total loans', color: 'yellow'},
          {angle: this.state.donationInfo.receipts, label: 'Receipts', color: 'green'},
          {angle: this.state.donationInfo.disbursements, label: 'Disbursements', color: 'blue'}
        ]

        return(

        <div className = 'graphCard'>

            <h4>Campaign Finance </h4>
            <div className='dataContainer'>
              <li>Individual Contributions: ${numberWithCommas(this.state.donationInfo.individual_contributions)} </li>
              <li>Campaign Contributions: ${numberWithCommas(this.state.donationInfo.contributions)} </li>
              <li>Total loans: ${numberWithCommas(this.state.donationInfo.loans)} </li>
              <li>Receipts: ${numberWithCommas(this.state.donationInfo.receipts)} </li>
              <li>Disbursements: ${numberWithCommas(this.state.donationInfo.disbursements)} </li>
            </div>
            <div className='graphContainer'>
              <RadialChart
                animation
                data={data}
                width={350}
                height={350}
                showLabels
                colorType='literal'
              />
            </div>
        </div>
        )
    }
}
