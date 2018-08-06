import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import escapeRegExp from 'escape-string-regexp'

export class MapContainer extends Component {
  
  state = {
    currentLocation: {
      lat: null,
      lng: null
    },
    markers: [],
    activeMarker: null,
    infowindow: new this.props.google.maps.InfoWindow()
  }
/* Gets the marker to activate from the list items
 * and adds an infowindow to that marker
 */
  activateInfoWindow = () => {
    for (let marker of this.state.markers) {
      marker.setAnimation(null)
      if (marker.title === this.props.triggerInfoWindow.toString()) {
        let l;
        for (let location of this.props.locations) 
          if (marker.title === location.name)
            l = location
        this.addInfoWindow(marker, l)
      }
    }
  }
// Adds an infowindow to a marker
  addInfoWindow = (marker, location) => {
    const { infowindow, activeMarker } = this.state
    const map = this.map

    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
        } else {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    }

    if (activeMarker === marker || !marker.visible)
      infowindow.close();
  
    if (infowindow.marker !== marker && marker.visible) {
      infowindow.marker = marker;
      infowindow.setContent(`
        <div style="width:300px;text-align:center">
         <h3>${location.name}</h3>
         <img 
          src="${location.image_url ? location.image_url : 'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png'}" 
          alt="${location.name}" 
          style="width:100%; max-height:300px"
          />
         <h4>Phone Number: ${location.display_phone ? location.display_phone : 'Not available'}</h4>
         <h4>Rating: ${location.rating}/5</h4>
         <a href="${location.url}" target="_blank" role="link">See the review on Yelp!</a>
        </div>`)
      infowindow.open(this.map, marker)
      this.setState({
        activeMarker: marker
      })
      map.setZoom(16)
      map.panTo(marker.getPosition())
    }

    infowindow.addListener('closeclick', () => {
      infowindow.marker = null
      this.setState({
        activeMarker: null
      })
    })
  }
/* Function who filters the locations and sets the marker visibilites
 * based on the query the user inserts
 */
  updateMarkers = () => {
    let showingMarkers;
    const match = new RegExp(escapeRegExp(this.props.query.split(' ').join('')), 'i');   
    showingMarkers = this.state.markers.filter(marker => !match.test(marker.title.split(' ').join('')) ? marker.setVisible(false) : marker.setVisible(true))
    this.state.infowindow.close()
    showingMarkers.forEach(marker => {
        marker.addListener('click', () => {
        this.addInfoWindow(marker)
        this.state.markers.forEach(marker => marker.setAnimation(null))
        marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
      })
    })
  }
//Adds a marker from a location to the markers array
  addMarkers = () => {
    const { locations, google } = this.props
    var bounds = new google.maps.LatLngBounds();
    locations.forEach((location, i) => {
      var marker = new google.maps.Marker ({
        position: {
          lat: location.coordinates.latitude,
          lng: location.coordinates.longitude
        },
        title: location.name,
        map: this.map,
        animation: google.maps.Animation.DROP,
        id: i
      })
      marker.addListener('click', () => {
          this.addInfoWindow(marker, location)
          this.state.markers.forEach(marker => marker.setAnimation(null))
          marker.setAnimation(google.maps.Animation.BOUNCE)
      })
      bounds.extend(marker.position)
      this.state.markers.push(marker)
    })
    this.map.fitBounds(bounds);
  }

  loadMap = () => {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let zoom = 15;
      var lat = 38.1864937;
      var lng = 15.5475575;
      const center = new maps.LatLng(lat, lng);
      this.map = new maps.Map(node, {
        center: center,
        zoom: zoom,
        mapTypeId: 'roadmap'
      });
    }
  }
// Used for initializing the maps, the markers and the infowindows
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.triggerInfoWindow !== this.props.triggerInfoWindow) {
      this.activateInfoWindow()
    }
    if (prevProps.query !== this.props.query)
      this.updateMarkers()
    if (prevProps.locations !== this.props.locations) {
      this.loadMap()
      this.addMarkers()
    }
  }

  render() {
    return (
      <div id="map" ref="map" role="application">
        Loading...
      </div>
    );
  }
}
