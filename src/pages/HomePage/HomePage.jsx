import React, { Component } from 'react';
import './Home.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CategorizedRepresentativesComponent from '../../components/CategorizedRepresentatives/CategorizedRepresentativesComponent';
import PropublicaCaller from '../../app/PropublicaCaller';
import * as Constants from '../../app/constants'

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            representatives: [],
            displayedRepresenatives: [],
            selectedDropdownOption: {value: 'All', label: 'Search by state...'}
        }
    }

    componentDidMount() {
        let probublicaHelper = new PropublicaCaller()

         probublicaHelper.getAllCurrentHouse()
         .then(representatives => {
             probublicaHelper.getAllCurrentSenate()
            .then(senate => {
                this.sortRepresentatives(representatives.concat(senate))
            })
         })
    }

    // Sort all the representatives into a 2D array of reps in a state
    sortRepresentatives(reps) {
        var dict = []

        // Sorts the representatives into a dictionary of format [rep_state : [representatives]]
        for (var i = 0; i < reps.length; i++) {
            var repState = reps[i].state

            // initialize array if not present
            if (dict[repState] === undefined) {
                dict[repState] = [reps[i]]
                continue
            }

            dict[repState] = [reps[i]].concat(dict[repState])
        }

        var sortedReps = []

        // Converts the dictionary into a sorted list of arrays for reps in each state
        Object.keys(dict).sort().forEach(key => {
            sortedReps.push(dict[key])
        })

        this.setState({
            representatives: sortedReps,
            displayedRepresenatives: sortedReps
        })
    }

    // Displays the listed representatives
    displayListRepresentatives(reps) {
        return Object.keys(reps).map((key) => {
            return <CategorizedRepresentativesComponent key={key} representatives={reps[key]} />
        })
    }

    // Setup dropdown menu by grabbing all states and setting the dropdown values
    prepareDropdownMenu() {
        var allStatement = [{value: 'All', label: 'All'}]
        var states = Object.keys(Constants.STATE_ABB).map((key) => {
            return {value: Constants.STATE_ABB[key], label: Constants.STATE_ABB[key]}
        })

        return <Dropdown className='home__state-search' options={allStatement.concat(states)} onChange={(event) => { this.dropDownChanged(event) }} value={this.state.selectedDropdownOption} placeholder="Search by state..." />
    }

    // Called when dropdown is selected, filters list of displayed reps to only be for the selected state
    dropDownChanged(event) {
        var displayedReps;
        if (event.value === 'All') {
            displayedReps = this.state.representatives
        } else {
            displayedReps = this.state.representatives.filter((rep) => Constants.STATE_ABB[rep[0].state] === event.value)
        }

        this.setState({
            displayedRepresenatives: displayedReps,
            selectedDropdownOption: event
        })
    }

    render() {
        return(
            <div className='home__container'>
                {this.prepareDropdownMenu()}
                <p className='home__directions'>Learn more about your representative by typing their name in the search bar above, or tap on them in the list below</p>
                {this.displayListRepresentatives(this.state.displayedRepresenatives)}
                
            </div>
        )
    }
}
