import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import { MapContainer } from './components/MapContainer.js'
import { List } from './components/List.js'
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    locations: [],
    infoWindowToTrigger: null,
    query: ''
  }
// Next element to trigger using the list items
  triggerInfoWindow = (elem) => {
    this.setState({
      infoWindowToTrigger: elem.innerHTML
    })
  }
/* This function gets the venues in Messina
 * and adds them in the locations array
 */
  componentWillMount() {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
      headers: {'Authorization': 'Bearer Mk1W8GWMoNujHkUFq9LAq6FDWvSIkX2pPkQUx02oxxpEY7gNaQ4nx4IIPoQ9c9qJk99wwoW-cxh4v0vEPMX5GRxUIK-zxe9A4Yh7QB-hX3eAyagAa8m_hKkc00loW3Yx'},
      params: {
        latitude: 38.1866785,
        longitude: 15.5483217
      }
    }).then(response => {
      var locations = []
      response.data.businesses.map(business => locations.push(business))
      this.setState({ locations })
    }).catch(error => {
      console.log('ERROR')
    })
  }

   updateQuery = (query) => {
    this.setState({ query })
  }

  render() {
    return (
      <div className="App">
        <input 
            type="text" 
            placeholder="Search for a location..."
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            role="searchbox"
            tabIndex="0"
            />
        <List 
          locations={this.state.locations}
          onClick={this.triggerInfoWindow}
          query={this.state.query} />
        <MapContainer 
          google={this.props.google}
          locations={this.state.locations}
          triggerInfoWindow={this.state.infoWindowToTrigger}
          query={this.state.query} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyISNpEobnswgZU4WZRbcODsPCYhlCsSU'
})(App)
