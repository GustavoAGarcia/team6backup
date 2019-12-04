import React, { Component } from 'react'

export default class CommitteeCard extends Component
{
    
    constructor(props) { 
        super(props) 
        this.CommitteeList = {
            CommitteeList: props.CommitteeList
        }
    }
    getlist()
    {
        if(this.props.CommitteeList.length > 0)
        {
            return (<ul>
                {this.props.CommitteeList.map(committee => <li>{committee}</li>)}
            </ul>);
        }
        else
        {
            return (<div></div>);
        }
    }
    getSublist()
    {
        if(this.props.SubCommitteeList.length > 0)
        {
            return (<ul>
                {this.props.SubCommitteeList.map(committee => <li>{committee}</li>)}
            </ul>);
        }
        else
        {
            return (<div></div>);
        }
    }
    render() 
    {
        return(
        
        <div className = 'listed-rep__container'> 
        <h4>Committees: </h4>
        {this.getlist()}
        <h4>SubCommittess</h4>
        {this.getSublist()}
        </div>

        )
    }
}