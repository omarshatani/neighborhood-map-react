import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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

  activateInfoWindow = () => {
    for (let marker of this.state.markers) {
      if (marker.title === this.props.triggerInfoWindow.toString())
        this.addInfoWindow(marker)
    }
  }

  addInfoWindow = (marker) => {
    const { infowindow, activeMarker } = this.state
    const map = this.map

    if (activeMarker === marker)
      infowindow.close();
  
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<div>${marker.title}</div>`)
      infowindow.open(this.map, marker)
      this.setState({
        activeMarker: marker
      })
      map.panTo(marker.getPosition())
    }

    infowindow.addListener('closeclick', () => {
      infowindow.marker = null
      this.setState({
        activeMarker: null
      })
    })

  }


  addMarkers = () => {
    const { locations, google } = this.props
    var bounds = new google.maps.LatLngBounds();
    locations.forEach((location, i) => {
      var marker = new google.maps.Marker ({
        position: location.position,
        title: location.title,
        map: this.map,
        animation: google.maps.Animation.DROP,
        id: i
      })
      marker.addListener('click', () => {
        this.addInfoWindow(marker)
      })
      bounds.extend(marker.position)
      this.state.markers.push(marker)
    })
    this.map.fitBounds(bounds);
  }

  loadMap = () => {

    if (this.props && this.props.google) {
      // google is available
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

  componentDidMount() {
    this.loadMap()
    this.addMarkers()
    console.log(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.triggerInfoWindow !== this.props.triggerInfoWindow) {
      this.activateInfoWindow()
    }
  }

  render() {

    return (
      <div id="map" ref="map">
        Loading...
      </div>
    );
  }
}
