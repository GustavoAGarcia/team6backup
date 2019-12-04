import React, { Component } from 'react';
import './DetailsCard.css'
export default class DetailsCard extends Component
{

    constructor(props) {
        super(props)

        this.billTitle = props.billTitle
        console.log(this.billTitle)

        this.billNumber = {
          billNumber  : props.billNumber
        }
        this.introducedDate = {
            introducedDate: props.introducedDate
        }
        this.subject = {
            subject: props.subject
        }
        this.shortSummary = {
            shortSummary: props.shortSummary
        }
        this.majorActionDate = {
          majorActionDate : props.majorActionDate
      }

        this.majorAction = {
            majorAction : props.majorAction
        }
    }

    render() {
      return(
        <div className='details__container'>
          <h3 className='details__name'>{this.props.billTitle}</h3>
          <p className='details__bill--number'>Bill Number: {this.props.billNumber}</p>
          <p>Introduction Date: {this.props.introducedDate}</p>
          <p>Subject: {this.props.subject}</p>
          <p>Short Summary:</p>
          <p>{this.props.shortSummary}</p>
          <p>Latest Major Action:</p>
          <p>{this.props.majorActionDate} {this.props.majorAction}</p>
        </div>
      )
    }
}
