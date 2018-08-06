import React, { Component } from 'react'

export class List extends Component {

	itemClicked = () => {
		let current = this;
		document.addEventListener('click', function (event) {
			if (event.target.nodeName === "LI")
				current.props.onClick(event.target)
			})
	}

	componentDidMount () {
		this.itemClicked()
	}

	render () {
		return (
			<div className="List">
				<ul id="locations">
				{
					this.props.locations.map((location, i) => <li key={i}>{location.title}</li>)
				}
				</ul>
			</div>
			)
	}
}

