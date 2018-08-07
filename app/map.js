import * as d3 from 'd3';
import * as topojson from 'topojson';
import mn from '../sources/mncounties.json';

class Map {
  constructor(target) {
    this.target = target;
  }

  render() {
    var self = this;

    var path = d3.geoPath();
    var svg = d3.select(self.target + ' svg');
    var g = svg.append('g');

    g.append('g')
      .attr('class', 'counties')
      .selectAll('path')
      .data(topojson.feature(mn, mn.objects.counties).features)
      .enter()
      .append('path')
      .attr('d', path)
      .call(
        d3.helper.tooltip(function(d, i) {
          return d.properties.NAME + ' County';
        })
      );

    //RESPONSIVENESS
    var aspect = 400 / 300,
      mappage = $(self.target + ' svg');
    var targetWidth = mappage.parent().width();
    mappage.attr('width', targetWidth);
    mappage.attr('height', targetWidth / aspect);
    if ($(window).width() <= 520) {
      $(self.target + ' svg').attr('viewBox', '0 0 400 300');
    }

    $(window).on('resize', function() {
      targetWidth = mappage.parent().width();
      mappage.attr('width', targetWidth);
      mappage.attr('height', targetWidth / aspect);
    });

    //TOOLTIP HELPER
    d3.helper = {};

    d3.helper.tooltip = function(accessor) {
      return function(selection) {
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection
          .on('mouseover', function(d, i) {
            // Clean up lost tooltips
            d3.select('body')
              .selectAll('div.tooltip')
              .remove();
            // Append tooltip
            tooltipDiv = d3
              .select('body')
              .append('div')
              .attr('class', 'tooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv
              .style('left', absoluteMousePos[0] + 10 + 'px')
              .style('top', absoluteMousePos[1] - 15 + 'px')
              .style('position', 'absolute')
              .style('z-index', 1001);
            // Add text using the accessor function
            var tooltipText = accessor(d, i) || '';
          })
          .on('mousemove', function(d, i) {
            // Move tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv
              .style('left', absoluteMousePos[0] + 10 + 'px')
              .style('top', absoluteMousePos[1] - 15 + 'px');
            var tooltipText = accessor(d, i) || '';
            tooltipDiv.html(tooltipText);
          })
          .on('mouseout', function(d, i) {
            // Remove tooltip
            tooltipDiv.remove();
          });
      };
    };
  }
}

export { Map as default };
