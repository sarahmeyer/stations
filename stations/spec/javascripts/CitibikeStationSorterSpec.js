describe("CitibikeStationSorter", function() {
  var citibikeStationSorter,
      stations = Stations(),
      trips = Trips(),
      sortedStations,
      avgDuration,
      stationBusiness;

  beforeEach(function() {
    citibikeStationSorter = new CitibikeStationSorter(stations, trips)
  })

  describe("#getStationById", function() {
    it("should return a station with the right ID if the ID exists", function() {
      var station = citibikeStationSorter.getStationById("217");

      expect(station.id).toBe("217");
    });


    it("should return undefined if the ID does not exist", function() {
      var result = citibikeStationSorter.getStationById("bleh");

      expect(result).toBeUndefined();
    });
  });

  describe("#avgTripDurationByStationId", function() {
    beforeEach(function() {
      avgDuration = citibikeStationSorter.avgTripDurationByStationId("2017");
    });

    it("should return the average duration of trips for a given station ID", function() {
      var trips,
          expectedAverage,
          durations,
          totalDuration;

      // this test looks suspiciously like the inside of the function
      // unfortunately i don't know how to test that something computes an average
      // without in fact computing the average

      trips = _.filter(citibikeStationSorter.trips, function(trip) {
        return trip.end_station_id === "2017";
      });

      durations = _.map(trips, function(trip) { return parseInt(trip.trip_duration) });

      totalDuration = _.reduce(durations, function(memo, num){ return memo + num; }, 0);

      expectedAverage = totalDuration / trips.length;

      expect(avgDuration).toEqual(expectedAverage);
    });
  });

  describe("#businessByStationId", function() {
    beforeEach(function() {
      stationBusiness = citibikeStationSorter.businessByStationId("128");
    })

    it("should return the number of trips that have that station ID as start or end", function() {
      var tripsStartingAtStation,
          tripsEndingAtStation,
          numTrips;

      tripsStartingAtStation = _.filter(trips, function(trip) {
        return trip.start_station_id === "128";
      });

      tripsEndingAtStation = _.filter(trips, function(trip) {
        return trip.end_station_id === "128";
      });

      numTrips = tripsStartingAtStation.length + tripsEndingAtStation.length;

      expect(stationBusiness).toEqual(numTrips);
    });
  });

  describe("#stationIdsSortedByDuration", function() {
    beforeEach(function() {
      sortedStations = citibikeStationSorter.stationIdsSortedByDuration();
    });

    it("should produce a list of station ids", function() {
      expect(_.isArray(sortedStations)).toBe(true);
    });

    it("should sort the list so the trip durations are in ascending order", function() {
      var currentStationDuration,
          nextStationDuration;

      for (var i = 0; i <= sortedStations.length - 2; i++) {
        currentStationDuration = citibikeStationSorter.avgTripDurationByStationId(sortedStations[i]);
        nextStationDuration = citibikeStationSorter.avgTripDurationByStationId(sortedStations[i+1]);

        expect(nextStationDuration).not.toBeLessThan(currentStationDuration);
      }
    });
  });

  describe("#stationIdsSortedByBusiness", function() {
    beforeEach(function() {
      sortedStations = citibikeStationSorter.stationIdsSortedByBusiness();
    });

    it("should produce a list of stations", function() {
      expect(_.isArray(sortedStations)).toBe(true);
    });

    it("should sort the list so the trip durations are in ascending order", function() {
      var currentStationBusiness,
          nextStationBusiness;

      for (var i = 0; i <= sortedStations.length - 2; i++) {
        currentStationBusiness = citibikeStationSorter.businessByStationId(sortedStations[i]);
        nextStationBusiness = citibikeStationSorter.businessByStationId(sortedStations[i+1]);

        expect(nextStationBusiness).not.toBeLessThan(currentStationBusiness);
      }
    });
  });
});
