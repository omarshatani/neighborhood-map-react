import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

export class List extends Component {
	//Notifies the parent of a click on a list item
	itemClicked = () => {
		let current = this;
		document.addEventListener('click', function (event) {
			if (event.target.nodeName === "LI") {
				current.props.onClick(event.target)
			}
		})
	}

	componentDidMount () {
		this.itemClicked()
	}

	render () {
		var showingLocations;
  		if (!this.props.query) {
    		showingLocations = this.props.locations
    	} else {
    		const match = new RegExp(escapeRegExp(this.props.query.split(' ').join('')), 'i');   
    		showingLocations = this.props.locations.filter(location => match.test(location.name.split(' ').join('')))
    	}
		return (
			<div className="List" role="list">
				<ul id="locations">
				{
					showingLocations.map((location, i) => <li key={i}>{location.name}</li>)
				}
				</ul>
			</div>
			)
	}
}

