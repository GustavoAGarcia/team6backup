import React, { Component } from 'react';
import './SponsorCard.css'
export default class SponsorCard extends Component
{

    constructor(props) {
        super(props)

        this.sponsorTitle = {
          sponsorTitle  : props.sponsorTitle
        }
        this.sponsorName = {
          sponsorName  : props.sponsorName
        }
        this.sponsorState = {
            sponsorState: props.sponsorState
        }
        this.sponsorParty = {
            sponsorParty: props.sponsorParty
        }
    }

    render() {
      return(
        <div className='sponsor__container'>
          <h3 className='sponsor__header'>Sponsor</h3>
          <p>Name: {this.props.sponsorTitle} {this.props.sponsorName}</p>
          <p>State: {this.props.sponsorState}</p>
          <p>Pary: {this.props.sponsorParty}</p>
        </div>
      )
    }
}
