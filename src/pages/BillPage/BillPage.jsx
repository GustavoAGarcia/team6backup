import React, { Component } from 'react';
import './BillPage.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailsCard from '../../components/BillCards/DetailsCard'
import SponsorCard from '../../components/BillCards/SponsorCard'
import AdditionalInfoCard from '../../components/BillCards/AdditionalInfoCard'
import {link} from "react-router-dom";
import PropublicaCaller from '../../app/PropublicaCaller';

export default class BillPage extends Component {
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
  constructor(props) {
      super(props);
      this.state = { bill: ""}
  }

  componentDidMount() {
      let probublicaHelper = new PropublicaCaller()

      probublicaHelper.getSpecificBill(this.getProps()[0])
      .then(bill => {
          this.setState({
              bill: bill
          })
          console.log(bill.title)
      })
  }

  render() {
      return(
          <div className='bill__container'>
              <h1 align='center'>Bill Information</h1>
              <DetailsCard
                billTitle= {this.state.bill.title}
                billNumber= {this.state.bill.number}
                introducedDate= {this.state.bill.introduced_date}
                subject= {this.state.bill.primary_subject}
                shortSummary= {this.state.bill.summary}
                majorActionDate= {this.state.bill.latest_major_action_date}
                majorAction= {this.state.bill.latest_major_action}
              />
              <SponsorCard
                sponsorTitle= {this.state.bill.sponsor_title}
                sponsorName= {this.state.bill.sponsor}
                sponsorState= {this.state.bill.sponsor_state}
                sponsorParty= {this.state.bill.sponsor_party}
              />
              <AdditionalInfoCard
                congress_govLink=<a href= {this.state.bill.congressdotgov_url}>{this.state.bill.congressdotgov_url}</a>
              />
          </div>

      )
  }
}
