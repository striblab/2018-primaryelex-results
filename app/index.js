import Map from './map.js';

(function(){
  let map_dem = new Map('#d-gov-map');
  map_dem.render();

  let map_rep = new Map('#r-gov-map');
  map_rep.render();
})();
