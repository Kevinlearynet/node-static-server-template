# Segments prototype

## Setup

1. Clone the repo
1. Run `npm install`
1. Run `npm start`
1. Open [localhost:8080](http://localhost:8080)

## Notes

* Prototype is available online at [dry-dawn-2805.herokuapp.com](https://dry-dawn-2805.herokuapp.com/) (Heroku free teir spins up slow)
* Static files are served from `./public/` directory
* Uses [Rivets.js](http://rivetsjs.com/) for data binding

## For discussion / need help

* Consolidating `/segment/` and `/segment/new/` into a single view
* Handling conditional form logic when we have more than one segment editor form visible at a given time
* Replace the "getReadable" method with inline form fields that are always editable (opposed to one at a time)
* Removing the edit/save and single form approach to use a series of replicated forms