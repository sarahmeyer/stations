# Citibike Station Sorter

This is a simple web app that sorts Citibike stations by 2 criteria:
1. the number of times a given station was the start or end of a trip
2. the average duration of trips ending at a given station

To run, either open `stations.html` directly from the file system or run 
```
python -m SimpleHTTPServer 9090
```
and navigate to `http://localhost:9090/stations.html` in a browser.

## Design
Two classes, implemented with the traditional `prototype` approach in native JavaScript, provide the bulk of the functionality to this app.
`CitibikeStationSorter` takes two arguments, arrays of `Station` and `Trip` data respectively. 
It provides a variety of functions to access and sort stations according to trip data.
`CitibikeStationUI` merely binds events and redraws the list of stations depending on the user-selected sort order.
These two classes are trivially run from a JavaScript file called `main.js`, which runs on page load.
A suspicious amount of logic is included in the HTML file -- in particular, the possible sort orders exist only as options within a select tag.
A more consistent implementation would have this functionality encapsulated in the JavaScript layer. But I am getting sleepy.

## Libraries and tools used

This web app was intended to be as accessible as possible, with no setup time for the person who has to run it. 
To that end, it primarily uses native JavaScript functionality. The only 3rd-party library imported was Underscore.js.

## CSS

Styling on this page is minimal. BEM syntax is used to keep selectors meaningful and organized, without specificity collisions.

## Tests

A spec file for the CitibikeStationSorter class is included. This tests the main functionality of the web app, including the sorting
of stations by the required criteria. The test framework used is Jasmine. 
I happened to use Rake to run Jasmine, but npm should work just as well. 
