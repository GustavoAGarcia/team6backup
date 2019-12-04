import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BillPage from '../../pages/BillPage/BillPage.jsx'
import PropublicaCaller from '../../app/PropublicaCaller';
export default class recentBillsCard extends Component
{

    constructor(props) {
        super(props)
        this.BillList = {
            BillList: props.BillList

        }
        this.state = { representativeInfo: [], apiCalled: false, billList: [],id:[],listBuild:false }
    }
    componentDidMount() {
        this.searchMember(this.props.id).then(() => {
            this.getID()
            this.getTitle()})
       
    }
    async searchMember(id)
    {
      var array = [];
      let probublicaHelper = new PropublicaCaller()
     
      var representativeInfo = await probublicaHelper.getBillList(id)
      console.log(representativeInfo);
      this.setState({apiCalled:true,
          representativeInfo: this.state.representativeInfo.concat(representativeInfo)}
      );
      
      
    }
        
      //arr = probublicaHelper.getSingleMember(id).then(result => {
       //array = result;
        
    //})
    
      
    

     
     
    
    getTitle()
    {
        var rep = this.state.representativeInfo;
        console.log(this.state.representativeInfo);
        console.log(rep);
        var  arr = [];
        if(rep.length > 0)
        {
            for(var i = 0; i < 5;i++)
            {
                    console.log(rep[0].bills[i].short_title)
                arr.push(rep[0].bills[i].short_title);
            }
            
        }
        console.log(arr);
        this.setState({billList:arr});
        return arr;
        
    }
    getID()
    {
        var rep = this.state.representativeInfo;
        console.log(rep)
        
        var  arr = [];
        if(rep.length > 0)
        {
            for(var i = 0; i < 5;i++)
            {
                    console.log(rep[0].bills[i].bill_id)
                    var preshortid = rep[0].bills[i].bill_id;
                    var id = preshortid.substring(0, preshortid.search("-"));
                    console.log(id)
                arr.push(id);
            }
            
        }
        console.log(arr);
        this.setState({id:arr});
        
        return arr;
        
       
    }
    getInitialState()
    {
        return {showMe:false};
    }
    onClick () {
        this.setState({showMe: true});
    }
    getUrl(id,idlist)
    {
        return '../../bill?myVar1=' + idlist[id];
    }
    render()
    {

            
        var billList = this.state.billList;
        var IDList = this.state.id;
        return(
          <div className = 'listed-rep__container'> 
          <h4>Last 5 Bills Co-Sponsored</h4>
          <ol>      
             {billList.map((bill,index) => <li> <a href = {this.getUrl(index,IDList)} >{bill}</a></li>)}
          </ol>
          </div>
        )
        
       
    }
}
