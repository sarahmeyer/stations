(function() {
  var sorter = new CitibikeStationSorter(Stations(), Trips());
  var ui = new CitibikeStationUI(sorter, 'sort-order-select', 'station-ul');

  ui.setup();
})();
