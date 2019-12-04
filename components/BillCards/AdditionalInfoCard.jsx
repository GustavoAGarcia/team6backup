import React, { Component } from 'react';
import './AdditionalInfoCard.css'
export default class AdditionalInfoCard extends Component
{

    constructor(props) {
        super(props)

        this.congress_govLink = {
          congress_govLink : props.congress_govLink
        }
    }

    render() {
      return(
        <div className='AdditionalInfo__container'>
          <h3 className='AdditionalInfo__header'>Additional Information</h3>
          <p>Congress.gov link: {this.props.congress_govLink}</p>
        </div>
      )
    }
}
