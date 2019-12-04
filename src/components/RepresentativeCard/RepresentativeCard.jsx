import React, { Component } from 'react'
import RepublicanImage from '../../images/republican_logo.png'
import DemocratImage from '../../images/democrat_logo.png'
import usflag from '../../images/usflag.png'
import RecentBillsCard from '../../components/RepresentativeCard/RecentBillsCard.jsx'
import Demographics from  '../../components/RepresentativeCard/Demographics.jsx'
import DonationCard from './DonationCard'
import CommitteCard from './CommitteeCard'
import ContactCard from './ContactCard'
export default class RepresentativeCard extends Component
{
    
    
    constructor(props) { 
        super(props) 
        
        this.setState({
            representative: props.representative
        })
        
        this.state = {
            party: props.state
        }
        this.name = {
            name: props.name
        }
        this.chamber = {
            chamber: props.chamber
        }
        this.gender = {
            gender: props.gender
        }
        this.DOB = {
            DOB: props.DOB
        }
        this.BillList = {
            BillList: props.BillList
        }
        this.demographicsList  = {
            demographicsList: props.demographicsList
        }
        this.usState = {
            usState: props.usState
        }
        this.District = 
        {
            District: props.District
        }
        this.stateNumber = 
        {
            stateNumber: props.stateNumber
        }
    }

    getPartyImage() {
        let partyImage;
        if (this.props.party == 'R') {
            
            partyImage = <img className='listed-rep__party--logo' src={RepublicanImage} alt=""/>
        } 
		else if(this.props.party == 'D')
		{
			
            
            partyImage = <img className='listed-rep__party--logo' src={DemocratImage} alt=""/>
        }
		else{
			partyImage = <img className='listed-rep__party--logo' src={usflag} alt=""/>
		}
        return partyImage
    }

    getDistrict()
    {
        let district;
        if(this.props.chamber == 'House')
        {
           district =  <p>Congressional District: {this.props.District}</p>
        }
        else
        {
            district = <p></p>
        }
        return district;
    }
    
    render()
    {
        console.log(this.props.id);
        return(

        <div className = 'repCard__container'>
            <h3> Your Representative </h3>    
            {this.getPartyImage()}
            <h3>{this.props.name}</h3>
            <h4>State: {this.props.usState}</h4>
            {this.getDistrict()}
            <p>Party: {this.props.party}</p>
            <p>Legislative Chamber: {this.props.chamber}</p>
            <p>Gender: {this.props.gender}</p>
            <p>Date Of Birth: {this.props.DOB}</p>
            
            <RecentBillsCard id = {this.props.id} BillList = {this.props.BillList} />
            <Demographics demographicsList = {this.props.demographicsList} State = {this.props.stateNumber} raceList = {this.props.raceList} chamber = {this.props.chamber} District = {this.props.District} />
            <DonationCard chamber = {this.props.chamber} name = {this.props.name} fec_id={this.props.representative.roles[0].fec_candidate_id}/> 
            <CommitteCard CommitteeList = {this.props.committes} SubCommitteeList = {this.props.subcommittes} />
            <ContactCard id = {this.props.id} contacts = {this.props.contacts} socialmedia = {this.props.socialmedia} />
        </div>
        )
    }
}