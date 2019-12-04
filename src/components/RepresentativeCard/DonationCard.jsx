import React, { Component } from 'react'
var cashOnHand = 157958.64
var  disbursements =  45990175.82;
var receipts = 45668717.68;
//function used from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default class DonationCard extends Component
{
    constructor(props) { 
        super(props) 
        this.name = {
            name: props.name
        }
        this.chamber = {
            chamber: props.chamber
        }
    }
    render()
    {
        return( 
        <div className = 'listed-rep__container'> 
        <h4> Campaign Finance </h4>
        <li>Cash On Hand: ${numberWithCommas(cashOnHand)} </li>
        <li>Total Receipts: ${numberWithCommas(disbursements)} </li>
        <li>Total Disbursed: ${numberWithCommas(receipts)} </li>
        </div>
        )
    }
}