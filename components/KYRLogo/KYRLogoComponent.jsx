import React, { Component } from 'react';
import './KYRLogo.css';
import KYRImage from '../../images/KYR_logo.png'

export default class KYRLogoComponent extends Component {

    render() {
        return (
            <div className='logo__container'>
              <a href = "/"><img name='KYRImage' src={KYRImage}></img></a>
            </div>
        )
    }
}
