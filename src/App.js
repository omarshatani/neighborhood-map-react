import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import { MapContainer } from './components/MapContainer.js'
import { List } from './components/List.js'
import './App.css';

class App extends Component {

  state = {
    locations: [
      {    
        title: 'Duomo di Messina',
        position: {
            lat: 38.187961,
            lng: 15.5458194
          }
      },
      {    
        title: 'Sacrario di Cristo Re',
        position: {
            lat: 38.1907269,
            lng: 15.5465919
          }
      },
      {    
        title: 'Fontana del Nettuno',
        position: {
            lat: 38.1918399,
            lng: 15.5465919
          }
      },
      {    
        title: 'Stazione Centrale di Messina',
        position: {
            lat: 38.1864937,
            lng: 15.5475575
          }
      },
      {    
        title: 'Pasticceria Irrera',
        position: {
            lat: 38.1857834,
            lng: 15.5497553
          }
      }
    ],
    infoWindowToTrigger: null
  }

  triggerInfoWindow = (elem) => {
    this.setState({
      infoWindowToTrigger: elem.innerHTML
    })
  }

  render() {
    return (
      <div className="App">
        <List 
          locations={this.state.locations}
          onClick={this.triggerInfoWindow} />
        <MapContainer 
          google={this.props.google}
          locations={this.state.locations}
          triggerInfoWindow={this.state.infoWindowToTrigger} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyISNpEobnswgZU4WZRbcODsPCYhlCsSU'
})(App)
