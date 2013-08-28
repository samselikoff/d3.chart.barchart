(function() {
  d3.chart('BarChart', {
    initialize : function() {
      this.xScale  = d3.scale.ordinal();
      this.yScale  = d3.scale.linear();
      this._color  = d3.scale.category10();

      this._width = this._width || this.base.attr('width') || 200;
      this._height = this._height || this.base.attr('height') || 100;

      var barsLayerBase = this.base.append('g')
        .classed('bars', true);

      this.layer('bars', barsLayerBase, {

        dataBind: function(data) {
          var chart = this.chart();

          // Update the x-scale.
          chart.xScale.domain(data.map(function(d) { return d.name; }));

          // Update the y-scale.
          chart.yScale.domain([
            d3.min(data, function(d) { return d3.min([d.value, 0]); }),
            d3.max(data, function(d) { return d.value; })
          ]);

          return this.selectAll('.bar')
            .data(data);
        },

        insert: function() {
          var chart = this.chart();

          // Append the bars
          return this.append('rect')
            .attr('fill', 'blue')
            .attr('width', chart.xScale.rangeBand());
        },

        events: {
          enter: function() {
            var chart = this.chart();

            return this
              .attr('x', function(d) { return chart.xScale(d.name); })
              .attr('y', function(d) { return chart.yScale(d3.max([0, d.value])); })
              .attr('height', function(d) { return Math.abs(chart.yScale(d.value) - chart.yScale(0)); })
              .attr('fill', function(d) {return chart._color(d.name);})
              ;
          }
        }

      });
    },

    width: function(newWidth) {
      if (arguments.length === 0) {
          return this._width;
      }
      this._width = newWidth;
      this.base.attr('width', this._width);
      this.xScale.rangeRoundBands([0, newWidth], 0.1);
      return this;
    },
    
    height: function(newHeight) {
      if (arguments.length === 0) {
          return this._height;
      }
      this._height = newHeight;
      this.base.attr('height', this._height);
      this.yScale.range([newHeight, 0]);
      return this;
    },

  });
}());