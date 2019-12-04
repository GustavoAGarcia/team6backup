import React, { Component } from 'react'
import axios from 'axios'
import * as constants from '../../app/constants.jsx'
//https://www2.census.gov/programs-surveys/acs/tech_docs/pums/data_dict/PUMSDataDict13.txt


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function is_numeric_char(c) { return /\d/.test(c); }
function stripNonNumber(line)
{
    var num = '';
  	var i = 0;
  	
    while(i < line.length)
    {
        if(is_numeric_char(line[i]))
        {
            num = num + line[i];
        }
        else{
            break;
        }
        i++;
    }
  
    return num;

}
function percentages(stringRaceList)
{
    var sum = 0;
  	
  	var raceList = [];
  	for(var i = 0; i < stringRaceList.length;i++)
    {
      raceList.push(parseInt(stringRaceList[i]));
    }
  
    for(var i = 0; i < raceList.length;i++)
    {
        sum += raceList[i];
    }
    var newList = raceList;
    for(var i = 0; i < raceList.length;i++)
    {
        newList[i] = ((newList[i] / sum) * 100).toFixed(2);
    }
    return newList;
}

var percentRace;

export default class Demographics extends Component
{
    gettotalPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0001E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0001E&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getmalePopulation(District,State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = ' https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0002E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0002E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;
    }
    getfemalePopulation(District,State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0003E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0003E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;
    }
    buildDemographicsList(District,State)
    {
        
        if(this.state.rendered == false)
        {
            
            this.state.rendered = true;
        
        var totalUrl = this.gettotalPopulation(District,State);
        axios.get(totalUrl).then(
            response => {
            this.setState({totalPop:response.data});
            
        }   
         ).catch(error => console.log(error))
        var totalPopulation = stripNonNumber(String(this.state.totalPop[1]));
       
        var maleUrl = this.getmalePopulation(District,State);
        axios.get(maleUrl).then(
            response => {
            this.setState({malePop:response.data});
            
        }   
         ).catch(error => console.log(error))
        var malePopulation = stripNonNumber(String(this.state.malePop[1]));
        var femaleUrl = this.getfemalePopulation(District,State);
        axios.get(femaleUrl).then(
            response => {
            this.setState({femalePop:response.data});
            
        }   
         ).catch(error => console.log(error))
         var femalePopulation = stripNonNumber(String(this.state.femalePop[1]));
         var newdemographicsList =  new Array(totalPopulation,malePopulation,femalePopulation);
        this.setState({demographicsList:newdemographicsList})
        }
    }
    getWhitePopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = ' https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0064E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0064E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getBlackPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0065E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0065E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getHispanicPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0071E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0071E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getAsianPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = ' https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0067E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0067E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getNativePopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = ' https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0066E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0066E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getHawaiianPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0068E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0068E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    getOtherPopulation(District, State)
    {
        var request = new XMLHttpRequest()
        var url;
        if(this.props.chamber == 'House' )
        {
            var urlDistrict = ' https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0069E&for=congressional%20district:' + District + '&in=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlDistrict;
        }
        else{
            var urlState = 'https://api.census.gov/data/2018/acs/acs1/profile?get=DP05_0069E,NAME&for=state:' + State + '&key=' + constants.CENSUS_API_KEY;
            url = urlState;
        }
        return url;   
    }
    buildRaceList(District,State)
    {
        
       if(this.state.rendered2 == false)
       {
           
           this.state.rendered2 = true;

           var url;
            url = this.getWhitePopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({whitePop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))

            url = this.getBlackPopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({blackPop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))

            url = this.getHispanicPopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({hispanicPop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))

            url = this.getAsianPopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({asianPop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))

            url = this.getNativePopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({nativePop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))
            url = this.getHawaiianPopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({hawaiianPop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))

            url = this.getOtherPopulation(District,State);
            axios.get(url).then(
            response => {
                this.setState({otherPop:stripNonNumber(response.data[1])});
            }   
            ).catch(error => console.log(error))
        }

    }
    /*
    getPercentRace()
    {
        var arr = [this.state.whitePop,this.state.blackPop,this.state.hispanicPop,this.state.asianPop,this.state.nativePop,this.state.hawaiianPop,this.state.otherPop];
        console.log(arr);
        var newarr = percentages(arr);
        
        console.log(arr);
        return (
            <ul styles="padding: 0;list-style-type: none;">
            <li>% White: {newarr[0]}</li>
        <li>% Black: {newarr[1]}</li>
        <li>% Hispanic: {newarr[2]}</li>
        <li>% Asian: {newarr[3]}</li>
        <li>% Indian/Native Alaskan: {newarr[4]}</li>
        <li>% Pacific Islander/Hawaiian: {newarr[5]}</li>
        <li>% other: {newarr[6]}</li></ul>
        );
    }*/
    getPercentRace()
    {
        var arr = [this.state.whitePop,this.state.blackPop,this.state.asianPop,this.state.nativePop,this.state.hawaiianPop,this.state.otherPop];
        
        if(arr.length > 0)
            var newarr = percentages(arr);
        return newarr;
    }
    constructor(props) { 
        super(props) 
        
        this.state = {
            tests: [],
            rendered: false,
            rendered2:false,
            rendered3:false,
            demographicsList: [],
            totalPop:"NULLL",
            malePop:"NULL",
            femalePop:"NULL",
            whitePop:[],
            blackPop:[],
            hispanicPop:[],
            asianPop:[],
            nativePop:[],
            hawaiianPop:[],
            otherPop:[],
            raceArr: []

        }
        this.raceList = {
            raceList: props.raceList
        }
        this.chamber = {
            chamber: props.chamber
        }
        this.State = 
        {
            State: props.State
        }
        this.District = {
            District: props.District
        }
        //percentRace = percentages(this.props.raceList);
    }
    
    render()
    {
        if(this.props.District === '00' || this.props.District == '')
        {
            return (<div></div>)
        }
        else{
            
        this.buildDemographicsList(this.props.District,this.props.State);
        this.buildRaceList(this.props.District,this.props.State);
        var t = this.state.demographicsList[0];
        var newarr = this.getPercentRace();
        return(
        
        <div className = 'listed-rep__container'> 
        <h4>Demographics Representing </h4>
        <li>Total Population: {numberWithCommas(stripNonNumber(this.state.totalPop[1][0]))} </li>
        <li>Male Population: {numberWithCommas(stripNonNumber(this.state.malePop[1][0] ))}</li>
        <li>Female Population: {numberWithCommas(stripNonNumber(this.state.femalePop[1][0] ) )}</li>
        <li>White: {newarr[0]}% </li>
        <li>Black: {newarr[1]}%</li>

        <li>Asian: {newarr[2]}%</li>
        <li>Indian/Native Alaskan: {newarr[3]}%</li>
        <li>Pacific Islander/Hawaiian: {newarr[4]}%</li>
        <li>other: {newarr[5]}%</li>
        
        
        
        </div>
        )}
    }
}