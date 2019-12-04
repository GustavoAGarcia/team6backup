import React, { Component } from 'react';
import './RepresentativePage.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListedRepresentativeComponent from '../../components/ListedRepresentative/ListedRepresentativeComponent';
import RepresentativeCard from '../../components/RepresentativeCard/RepresentativeCard.jsx';
import PropublicaCaller from '../../app/PropublicaCaller';
import * as codes from '../../data/FixedstateCode.json';
import { create } from 'domain';
//import * as stateCode from '../../data/stateCode.json';
//let module = require('../../data/stateCode.js');


var TedCruzBills = ['A resolution honoring the members of the military and intelligence community who carried out the mission that killed Abu Bakr al-Baghdadi, and for other purposes',
'A bill to amend the National Labor Relations Act to modify the authority of the National Labor Relations Board with respect to rulemaking, issuance of complaints, and authority over unfair labor practices',
'Protecting American Jobs Act','A joint resolution expressing the sense of Congress on the precipitous withdrawal of United States Armed Forces from Syria and Afghanistan, and Turkeys unprovoked incursion into Syria',
'Davis-Bacon Repeal Act'];
var Cruzdemographics = ['25145561','12472280','12673281'];
var Cruzstate = 'Texas'
//white, black, hispanic, asian, indian/native alaskan/, pacific/hawaiian, other
var TexasraceList = [11397345,2886825,9460921,948426,80586,17920,33980]
var chamber = 'N/A'
var gender = 'N/A'
var party = 'N/A'
var DOB = 'N/A'
var state = 'N/A'
var stateNum = '48';
var DistrictNum = '01';
var querystring = require('querystring');
function createStateJson()
{
  var newJson = [];
  
  
  for(var i = 0; i < 51;i++)
  {
    var temp = {"ABVR":codes.default[i].FIELD2,"NUM":codes.default[i].FIELD1,"FULL":codes.default[i].FIELD3};
    newJson.push(temp);
  }
  
  return newJson;
  
}
export default class Representative extends Component {
    removeSpace(argument)
    {
        var i = 0;
        var newArgument = '';
      var first = true;
        while(i < argument.length)
        {
          var c = argument[i];
            if(argument[i] == '%')
            {
              if(first == true)
              {
                first = false;
              }
              else
              {
                newArgument = newArgument + ' ';
              }
               
                i+=2;
            }
          else
          {
            
           	newArgument = newArgument + argument[i];
          }
         
            i++;
        }
      
        return newArgument;
    }
 getProps(argument)
    {
        //var qs = new Querystring();
        var v1 = window.location.href
        //var v2 = window.location.href. 
       
        var wildFound = false;
        var arr = [];
        var i = 0;
        while(i < v1.length)
        {
            if(v1[i] == '?')
            {
                wildFound = true;
            }
            else if(wildFound)
            {
                var arg = '';
                while(i < v1.length && v1[i] != '=')
                {                    
                    i++;
                }
              	i++;
              	while(i < v1.length && v1[i] != '&')
                {
                  arg = arg + v1[i];
                  
                  i++;
                }
              
                arg = this.removeSpace(arg);
                //arg = "test";
                arr.push(arg);
            }
            i++;
        }
        return arr;
        
    }
    searchMember(id)
    {
      var array = [];
      let probublicaHelper = new PropublicaCaller()
      //var url = "https://cors-anywhere.herokuapp.com/" + 'https://api.propublica.org/congress/v1/' + id;
      var arr = probublicaHelper.getSingleMember(id).then(representativeInfo => {
      this.setState({representativeInfo: this.state.representativeInfo.concat(representativeInfo)})})
        
      arr = probublicaHelper.getSingleMember(id).then(result => {
        array = result;
        console.log(result);
        this.setState({
            apiCalled:true,
            representative: array[0]
          });
    })
    array.push(arr);
    
      console.log(array);
      console.log(arr);

     
     
    }
    constructor(props) {

        
        
        super(props)
        this.party = {
            party: props.party
        }
        this.name = {
            name: props.name
        }
        this.state = { representativeInfo: [], apiCalled: false, }
    }
    getCommittees()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';

      if(rep[0].roles.length == 0 || rep[0].roles[0].committees == 0)
      {
        return '';
      }
      var names = [];
      for(var i = 0; i < rep[0].roles[0].committees.length;i++)
      {
        names.push(rep[0].roles[0].committees[i].name)
      }
      return names;
    }
    getSubCommittees()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';

      if(rep[0].roles.length == 0 || rep[0].roles[0].subcommittees == 0)
      {
        return '';
      }
      var names = [];
      for(var i = 0; i < rep[0].roles[0].subcommittees.length;i++)
      {
        names.push(rep[0].roles[0].subcommittees[i].name)
      }
      return names;
    }
    getChamber()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';

      if(rep[0].roles.length == 0)
      {
        return '';
      }
      return rep[0].roles[0].chamber;
    }
    getDistrict()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';

      if(rep[0].roles.length == 0)
      {
        return '';
      }
      if(parseInt(rep[0].roles[0].district,10) < 10)
      {
        return '0' + rep[0].roles[0].district;
      }
      return rep[0].roles[0].district;
    }
    getParty()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';
      if(rep[0].current_party == "D")
      {
        return "Democrat";
      }
	  
      else if(rep[0].current_party == "R"){
        return "Republican";
      }
	  else{
		  return "Independent";
	  }
      
    }
    getState()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';

      return rep[0].roles[0].state;
    }
    getGender()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';
      if(rep[0].gender == "F")
      {
        return "Female";
      }
      else{
        return "Male";
      }
    }
    getDOB()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0)
        return '';
      return rep[0].date_of_birth;
    }
    searchOrList(propsArray)
    {
      if(propsArray[1] == "R" || propsArray[1] == "D")
      {
          this.party = propsArray[1];
      }
      else{
        this.party = "Party Not Found yet";
      }

    }
    getStateNum()
    {
      var state = this.getState();
      console.log(state);
      var arr = createStateJson();
      for(var i = 0; i < arr.length;i++)
      {
       
        if(arr[i].ABVR == state)
        {
          console.log(arr[i].NUM);
          return arr[i].NUM;
        }
      }
      
      return '00';
    }
    getContacts()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0 || rep[0].roles.length == 0)
      {
        return '';
      }
      var contacts = [];
      contacts.push(rep[0].roles[0].office);
      contacts.push(rep[0].roles[0].phone);
      contacts.push(rep[0].url);
      return contacts;
    }
    getSocialMedia()
    {
      var rep = this.state.representativeInfo;
      if(rep.length == 0 || rep[0].roles.length == 0)
      {
        return '';
      }
      var contacts = [];
      contacts.push(rep[0].facebook_account);
      contacts.push(rep[0].twitter_account);
      contacts.push(rep[0].youtube_account);
      return contacts;
    }
    render() {
        //var propsArray = this.getProps(); 
        createStateJson();
        this.getStateNum();
        var propsArray = this.getProps(); 
        this.searchOrList(propsArray);
        
        if(this.state.apiCalled == false)
        {this.searchMember(propsArray[1]);
          return(<div> </div>)
        }
        
        else{
          console.log(propsArray[1]);
          return(
            <div className='rep__container'>
                <RepresentativeCard id = {propsArray[1]} contacts = {this.getContacts()} socialmedia = {this.getSocialMedia()}name = {propsArray[0]} committes = {this.getCommittees()} subcommittes = {this.getSubCommittees()} District = {this.getDistrict()} stateNumber = {this.getStateNum()} usState = {this.getState()} party ={this.getParty()} chamber ={this.getChamber()} gender ={this.getGender()} DOB ={this.getDOB()}  BillList = {TedCruzBills} representative={this.state.representative}/>
            </div>
        )
        }
        
        
    }
}
