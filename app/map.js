import * as d3 from 'd3';
import * as topojson from "topojson";
import mn from '../sources/mncounties.json';

class Map {

  constructor(target) {
    this.target = target;
  }

  render() {
    var self = this;

    var path = d3.geoPath();
    var svg = d3.select(self.target + " svg");
    var g = svg.append("g");

    g.append("g")
        .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(mn, mn.objects.counties).features)
      .enter().append("path")
        .attr("d", path)
  }
}

export { Map as default }
