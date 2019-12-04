//tutorial used for ipmlementing the text box
//https://www.youtube.com/watch?v=NnpISZANByg

import './TextField.css'
import React, { Component } from 'react';
import * as data from '../../data/convertcsv.json';
import * as house from '../../data/house.json';
import * as senate from '../../data/senate.json';

function createJson()
{
  var newJson = [];
  var senateMembers = senate.results[0].members;
  for(var i = 0; i < 100;i++)
  {
    var name = senateMembers[i]["first_name"] + ' ' + senateMembers[i].last_name;
    var temp = {"name":name,"memberID":senateMembers[i].id};
    newJson.push(temp);
  }
  var houseMembers = house.results[0].members;
  for(var i = 0; i < houseMembers.length;i++)
  {
    var name = houseMembers[i]["first_name"] + ' ' + houseMembers[i].last_name;
    var temp = {"name":name,"memberID":houseMembers[i].id};
    //console.log('test');
    newJson.push(temp);
  }
  return newJson;
}
function getAllNames(jsonArray)
{
  var namesList = [];
  for(var i = 0; i < jsonArray.length;i++)
  {
    var name = jsonArray[i].name;
    namesList.push(name);
  }

  return namesList;

}


var error;
var status;
var response;
var jsonTest


export default class TextField extends Component {
    constructor(props){
        super(props);

        /*
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      */
     this.fullList = createJson();
      this.items = getAllNames(this.fullList);

      this.state = {
          suggestions:[],
          text: '',
      };
    }
    ontextChanged = (e)=>{
      const value = e.target.value;
      let suggestions = [];
      if(value.length > 0)
      {
        const regex = new RegExp(`^${value}`,'i');
        suggestions = this.items.sort().filter(v => regex.test(v));


      }
      this.setState(() => ({ suggestions,text:value }));
    }
    suggestionSelected(value)
    {
        this.setState(() => ({
          text: value,
          suggestions: [],
        }))
    }
    linkUrl(item)
    {

        var index = this.fullList.findIndex(x => x.name ===item);


        var id = this.fullList[index].memberID;
        var url = "../../Representative?myVar1= " + item+'&myVar2='+id;//+ this.props.name + "&myvar2=" + this.props.party;
        return url;
    }
    renderSuggestions()
    {
      const suggestions = this.state.suggestions;
      if(suggestions.length === 0){
        //return <ul> <li></li></ul>
        return null;
      }
      return (
        <ul>
          {suggestions.map((item) => <a href = {this.linkUrl(item)} onClick={() =>this.suggestionSelected(item)}>{item}</a>)}
        </ul>
      )
    }
    render(){
      const text = this.state.text;
        return (
        <div className = "text_field__container">
          <input class="text_field__input" placeholder="Search by name..." value = {text} onChange = {this.ontextChanged} type="text" />
          <div className = "search_results__container">{this.renderSuggestions()}</div>
        </div>
        )
    }

}
