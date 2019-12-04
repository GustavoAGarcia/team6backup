import React, { Component } from 'react'
import RepublicanImage from '../../images/republican_logo.png'
import DemocratImage from '../../images/democrat_logo.png'
import './ListedRepresentative.css'
import { Link } from 'react-router-dom';

export default class ListedRepresentativeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            representative: props.representative
        }
    }

    getPartyImage() {
        let partyImage;
        if (this.props.representative.party === 'R') {
            partyImage = <img className='listed-rep__party--logo' src={RepublicanImage} alt=""/>
        } else {
            partyImage = <img className='listed-rep__party--logo' src={DemocratImage} alt=""/>
        }
        return partyImage
    }

    getFullName() {
        return this.props.representative.short_title + " " + this.props.representative.first_name + " " + this.props.representative.last_name
    }

    getAge() {
        return Math.ceil((Date.now() - new Date(this.props.representative.date_of_birth + "T00:00:00").getTime()) / (31557600000))
    }
    
    linkUrl() {
        var url = "../../Representative?myVar1= " + this.props.representative.first_name + " " + this.props.representative.last_name + "&myvar2=" + this.props.representative.id;
        
        return url;
    }
    
    render() {
        return (
            <div className='listed-rep__container'>
                <div className='listed-rep__left-side--container'>
                    {this.getPartyImage()}
                    <a className='listed-rep__name' href={this.linkUrl()}>{this.getFullName()}</a>
                </div>

                <div className='listed-rep__right-side--container'>
                    <p><b>Years Served</b> {this.props.representative.seniority}</p>
                    <p><b>Age</b> { this.getAge() }</p>
                    <p><b>Gender</b> {this.props.representative.gender}</p>
                </div>
            </div>
            
        )
    }
}
