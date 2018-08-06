# Neighborhood Map

**Neighborhood Map** is a single-page web application which uses the Google Maps API to find interesting locations in Messina. 

## How to run
The application requires Node.js (with npm). If you don't have Node it on your machine, here's a link for a download: [Node.js](https://nodejs.org/en/)

This application also uses `escape-string-regexp` and `axios`.
 * For more information about Escape Regexp, visit this page: [escape-string-regexp](https://github.com/sindresorhus/escape-string-regexp)
 * For more information about axios, visit this page: [axios](https://github.com/axios/axios) 

To run the application, follow these instructions:

* clone the repository with `git clone https://github.com/omarshatani/neighborhood-map-react.git`
* install all project dependencies with `npm install`
* (optional) optimize the building process with `npm run build`
* start the development server with `npm start`

The application will run on [http://localhost:3000/](http://localhost:3000/)

## Navigation and search

The application has a list of locations on the left sidebar and their marker on the map. The can filter the locations on the map by typing on the search box. 

Clicking on a marker displays some useful informations about the venue.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Licence

MIT
