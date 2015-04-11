var Year = [];
var SeaIceExt = [];

	d3.csv('data.csv', function(data) {
		console.log(data);

		for (key in data) {
			Year.push(data[key].Year)
			SeaIceExt.push(data[key].SeaIceExt)
		}


	var margin = { top: 100, right: 50, bottom: 90, left: 50 }



	var height = 400 - margin.top - margin.bottom,
		width = 500  -margin.left - margin.right,
		barWidth = 50,
		barOffset = 5;

	var yScale = d3.scale.linear()
		.domain([0, d3.max(SeaIceExt)])
		.range([0, height]);

	var xScale = d3.scale.ordinal()
	  .domain(d3.range(0, Year.length))
		.rangeBands([0, width], .1);

	var TempColor;

	var colors = d3.scale.linear()
		.domain([0, d3.max(SeaIceExt)])
		.range(['#177f9d', '#fff']);

	var tooltip = d3.select('body').append('div')
		.style ('position','absolute')
		.style ('padding','0 10px')
		.style ('background','#fff')
		.style ('opacity','0');

	var myChart = d3.select('#chart').append('svg')
		.style('background', '#c3c6ab')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.bottom + margin.top)
		.append('g')
		.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
		.style('background', '')
		.selectAll('rect').data(SeaIceExt)
		.enter().append('rect')
			.style('fill', colors)
			.attr('width', xScale.rangeBand())
			.attr('height', 0)
			.attr('y', height)
			.attr('x', function(d,i) {
				return xScale(i);
			})

		.on('mouseover', function(d) {

		  tooltip.transition()
			.style('opacity', .9)

		  tooltip.html(d)
			.style ('left', (d3.event.pageX - 35) + 'px')
			.style ('top', (d3.event.pageY - 30) + 'px')


		  TempColor = this.style.fill;

		  d3.select(this)
			.style('opacity', 1)
			.style('fill', '#fff')

		//toggle image
		})

		.on('mouseout', function(d) {
		d3.select(this)
			.style('opacity', 1)
			.style('fill', TempColor)

		tooltip.transition()
			.style('opacity', 0)

		//toggle image
		})

	myChart.transition()
		.attr('height', function(d) {
				return yScale(d);
			})
		.attr('y', function(d) {
				return height - yScale(d);
			})
		.delay(function(d,i)  {
			return i * 20;
		})
		.duration(1000)
		.ease('elastic')

	var vGuideScale = d3.scale.linear()
		.domain ([0, d3.max(SeaIceExt)])
		.range([height, 0])

	var vAxis = d3.svg.axis()
		.scale(vGuideScale)
		.orient('left')
		.ticks(10)

	var vGuide = d3.select('svg').append('g')
		vAxis(vGuide)
		vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
		vGuide.selectAll('path')
			.style({fill: 'none', stroke: '#000'})
		vGuide.selectAll('line')
			.style({stroke: '#000'})

	var hAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.tickValues(xScale.domain().filter (function (d, i){ return ! ((i-1) % 5)}))
		.tickFormat(function(d, i) {return d + parseInt(Year[0]);})

	var hGuide = d3.select('svg').append('g')
		hAxis(hGuide)
		hGuide.attr('transform', 'translate('+ margin.left +', '+ (height+ margin.top)+')')
		hGuide.selectAll('path')
			.style({fill: 'none', stroke: '#000'})
		hGuide.selectAll('line')
			.style({stroke: '#000'})

	d3.select('svg').append("text")
	.attr('class', 'axisLabel')  //fix when styling
    .attr('text-anchor', "middle")
    .attr("x", (margin.left)+width/2)
    .attr("y", height + margin.top + margin.bottom/2)
    .text("Year")

    var squared = 2;

    d3.select('svg').append('text')
	.attr ('class', 'axisLabel')  //fix when styling
    .attr('text-anchor', "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", margin.left/2)
    .attr("x", -(margin.top + height/2))
    .text("Sea Ice Extent (in millions of km\u00B2)");
});
