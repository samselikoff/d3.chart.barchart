d3.chart.barchart
=================

[View demo](http://jsfiddle.net/samselikoff/BkPLn/4/)


A simple bar chart built with d3.chart

### Sample use

    var barChart = d3.select("#bar-chart")
      .append("svg")
      .chart("BarChart")
      .width(200)
      .height(150);

    barChart.draw([
      {name: 'a', value: 4},
      {name: 'b', value: 16},
      {name: 'c', value: 19},
      {name: 'd', value: 8},
      {name: 'e', value: 6},
    ]);
