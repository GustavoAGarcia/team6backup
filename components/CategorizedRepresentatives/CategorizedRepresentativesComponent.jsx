import React, { Component } from 'react'
import './CategorizedRepresentative.css'
import ListedRepresentativeComponent from '../ListedRepresentative/ListedRepresentativeComponent'
import * as Constants from '../../app/constants'

export default class CategorizedRepresentativeComponent extends Component {

    constructor(props) {
        super(props)
        this.setState = {
            representatives: props.representatives
        }
    }

    displayRepresentatives() {
        var reps = this.props.representatives
        return Object.keys(reps).map((key) => {
            return <ListedRepresentativeComponent key={key} representative={reps[key]}/>
        })
    }

    render() {
        return (
            <div>
                <h2 className='cat-rep__title'>{Constants.STATE_ABB[this.props.representatives[0].state]}</h2>
                {this.displayRepresentatives()}
                <hr className='cat-rep__divider'/>
            </div>
        )
    }
}