import React, { Component } from 'react';
import './NavigationBar.css';
import TextField from '../TextFieldComponent/textField'

export default class NavigationBarComponent extends Component {

    render() {
        return (
            <div className='nav_bar__container'>
              <a className='nav-bar__home' href='../'><b>Home</b></a>
              <TextField className='search_bar__container'/>
            </div>
        )
    }
}
