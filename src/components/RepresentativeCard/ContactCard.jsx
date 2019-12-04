import React, { Component } from 'react'
import './RepresentativeCard.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export default class ContactCard extends Component{
    constructor(props) { 
        super(props) 
    
        this.contacts = {
            contacts: this.props.contacts
        }
        this.socialmedia = {
            socialmedia: this.props.socialmedia
        }

        
    }
    getYoutube()
    {
        var url = "https://youtube.com/" + this.props.socialmedia[2];
        return url;
    }
    getTwitter()
    {
       var  url = "https://twitter.com/" + this.props.socialmedia[1];
        return url;
    }
    getFaceBook()
    {
       var  url = url = "https://facebook.com/" + this.props.socialmedia[0];
        return url;
    }
    linkUrl(item,index)
    {
        
        if(index == 0)
        {
            
            return this.getYoutube(item);
        }
        else if(index == 1)
        {
            
            return this.getTwitter(item);
        }
        else{
            return this.getFaceBook(item);
        }
    }
    displayMedia(index)
    {
        
        if(index == 0)
        {
            
            return (<p1>Youtube</p1>)
            
        }
        else if(index== 1)
        {
            
            return (<p1>Twitter</p1>)
            
        }
        else{
            return (<p1>FaceBook</p1>)
        }
    }
    
    displaySocialMedia()
    {
        return (
            <ul>
          
           {this.props.socialmedia.map((item,index) => <a class = "Externallink" href = {this.linkUrl(item,index)} >{this.displayMedia(index)}</a>)}
          </ul>
        )
    }
    displayContacts()
    {
        if(this.props.contacts.length > 0)
        {
           return( <ul class = "contactList">
        <li>Office: {this.props.contacts[0]}</li>
        <li>Phone: {this.props.contacts[1]}</li>
        <li>Official Webpage: <a class = "Externallink" href = {this.props.contacts[2]}>{this.props.contacts[2]}</a></li>
            </ul>);
        }
        else{
            return(<div></div>);
        }
    }
    
    
    render() 
    {
        return(
            
            <div className = 'contact_container'> 
            <h4>Contact:</h4>
           {this.displayContacts()}
                <h4 >Social Media:</h4>
                <ul class = "contactList">
                <li>   <a href = {this.getTwitter()} className = 'Externallink'>Twitter</a></li>
                <li>   <a href = {this.getFaceBook()} className = 'Externallink' >FaceBook</a></li>
           <li>   <a href = {this.getYoutube()} className = 'Externallink'>Youtube</a></li> 
            </ul>
            </div>
           
            )

    }
}