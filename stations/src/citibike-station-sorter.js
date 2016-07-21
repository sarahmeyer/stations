function CitibikeStationSorter(stations, trips) {
  this.stations = stations;
  this.trips = trips;

  this.usage = this.computeStationUsage();
}

CitibikeStationSorter.prototype.computeStationUsage = function() {
  var counts = {};

  _.each(this.trips, function(trip) {
    counts[trip.start_station_id] = counts[trip.start_station_id] + 1 || 1;
    counts[trip.end_station_id] = counts[trip.end_station_id] + 1 || 1;
  });

  return counts;
}

CitibikeStationSorter.prototype.sortedStations = function(sortKey, numStations) {
  var ctx = this,
      sortType = sortKey.split('-')[0],
      sortOrder = sortKey.split('-')[1],
      sortedStationIds,
      topStationIds;

  numStations = numStations || 10;

  if (sortType === 'busy') {
    sortedStationIds = this.stationIdsSortedByBusiness();
  }

  if (sortType === 'duration') {
    sortedStationIds = this.stationIdsSortedByDuration();
  }

  if (sortOrder === 'desc') {
    sortedStationIds = sortedStationIds.reverse();
  }

  topStationIds = sortedStationIds.slice(0, numStations);

  return _.map(topStationIds, function(stationId) {
    return _.find(ctx.stations,
      function(station) {
        return station.id === stationId;
    });
  });
},

CitibikeStationSorter.prototype.stationIdsSortedByBusiness = function() {
  return this.sortStations(this.businessByStationId);
}

CitibikeStationSorter.prototype.stationIdsSortedByDuration = function() {
  return this.sortStations(this.avgTripDurationByStationId);
}

CitibikeStationSorter.prototype.sortStations = function(predicate) {
  var ctx = this;

  return _.map(
    _.sortBy(
      _.map(ctx.stations, function(station) {
        return {
          stationId: station.id,
          predicate: predicate.apply(ctx, [station.id])
        }
      }),
      'predicate'),
    'stationId');
}

CitibikeStationSorter.prototype.businessByStationId = function(stationId) {
  return this.usage[stationId];
}

CitibikeStationSorter.prototype.avgTripDurationByStationId = function(stationId) {
  var totalDuration,
      tripsByStation;

  tripsByStation = _.filter(this.trips, function(trip) {
    return trip.end_station_id == stationId;
  })

  if (tripsByStation.length === 0) {
    return 0;
  }

  totalDuration = _.reduce(tripsByStation, function(memo, obj) {
    return memo + parseInt(obj.trip_duration);
  }, 0);

  return totalDuration / tripsByStation.length;
}

CitibikeStationSorter.prototype.getStationById = function(stationId) {
  return _.find(this.stations,
    function(station) {
      return station.id === stationId;
  });
}
