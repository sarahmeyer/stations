function CitibikeStationUI (sorter, sortSelector, ulSelector) {
  this.sorter = sorter;
  this.sortSelectEl = document.getElementById(sortSelector);
  this.ulEl = document.getElementById(ulSelector);
}

CitibikeStationUI.prototype.setup = function () {
  this.rebuildDisplayedStations(this.sortSelectEl.value);

  this.bindEvents();
}

CitibikeStationUI.prototype.bindEvents = function () {
  var ctx = this;

  this.sortSelectEl.onchange = function(event) {
    ctx.changeSortOrder(event);
  }
}

CitibikeStationUI.prototype.changeSortOrder = function(event) {
  this.rebuildDisplayedStations(event.target.value);
}

CitibikeStationUI.prototype.getStationMarkup = function(station) {
  var li = document.createElement('li');
  li.className += " stations__list-item";

  li.innerHTML = "<details class='stations__list-item__details'>" +
    "<summary class='stations__list-item__summary'>" +
      station.name +
    "</summary>" +
    "<p>" +
      this.sorter.businessByStationId(station.id) +
      " trips began or ended at this station. " +
      "Average trip length at this station was " +
      Math.round(this.sorter.avgTripDurationByStationId(station.id)) +
      "."
    "</p>" +
    "<p>" +
      "<span>" +
        station.longitude;
      "</span>" +
      "<span>" +
        station.latitude;
      "</span>" +
    "</p>" +
  "</details>";

  return li;
}

CitibikeStationUI.prototype.rebuildDisplayedStations = function(sortKey) {
  var ctx = this,
      sortedStations = this.sorter.sortedStations(sortKey, 10);

  while (this.ulEl.firstChild) {
    this.ulEl.removeChild(this.ulEl.firstChild);
  }

  _.each(sortedStations, function(station) {
    ctx.ulEl.appendChild(ctx.getStationMarkup(station));
  })
}

// module.exports = CitibikeStationUI;
