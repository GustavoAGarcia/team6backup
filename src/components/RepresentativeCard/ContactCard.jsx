import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export default class ContactCard extends Component{
    constructor(props) { 
        super(props) 
        //format for social media list. [youtube,twitter,facebook]
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
          
           {this.props.socialmedia.map((item,index) => <a href = {this.linkUrl(item,index)} >{this.displayMedia(index)}</a>)}
          </ul>
        )
    }
    displayContacts()
    {
        if(this.props.contacts.length > 0)
        {
           return( <ul>
        <li>Office: {this.props.contacts[0]}</li>
        <li>Phone: {this.props.contacts[1]}</li>
        <li>Official Webpage: <a href = {this.props.contacts[2]}>{this.props.contacts[2]}</a></li>
            </ul>);
        }
        else{
            return(<div></div>);
        }
    }
    
    
    render() 
    {
        return(
            
            <div className = 'listed-rep__container'> 
            <h4>Contact:</h4>
           {this.displayContacts()}
                <h4>Social Media:</h4>
                <ul>
                <li>   <a href = {this.getTwitter()}>Twitter</a></li>
                <li>   <a href = {this.getFaceBook()}>FaceBook</a></li>
           <li>   <a href = {this.getYoutube()}>Youtube</a></li> 
            </ul>
            </div>
           
            )
        /*
        return(
        <Router>
        <div className = 'listed-rep__container'> 
        <h4>Contact:</h4>
       {this.displayContacts()}
            <h4>Social Media:</h4>
            <ul>
       <li><Link to='/twitter' > Twitter</Link></li> 
       <li> <Link to='/facebook' > FaceBook</Link></li> 
       <li>   <Link to='/youtube' > Youtube</Link></li> 
        </ul>
        <Switch> 
            <Route path='/youtube' component={() => { 
     window.location.href = this.getYoutube(); return null;}}/>
            <Route path='/youtube' component={() => { 
     window.location.href = this.getFaceBook(); return null;}}/>
            <Route path='/twitter' component={() => { 
     window.location.href = this.getTwitter(); return null;}}/>
            
        </Switch>
        </div>
        </Router>
        )*/
    }
}