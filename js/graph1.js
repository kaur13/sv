async function init() {
    console.log("Test")
    const data = await d3.csv("data/crimes_by_month.csv");


    //var data =[{avg_crims:400,month:"January"},{avg_crims:500,month:"February"}];
    console.log(data);

    var margin = {top: 50, left: 100, right: 150, bottom: 60};
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var chartWidth = 700;
    var chartHeight = 500;

    var svg = d3.select('#svg1')
        .attr("height", chartHeight + margin.top + margin.bottom)
        .attr("width", chartWidth + margin.left + margin.right);

    var chartArea = svg.append('g')
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale = d3.scaleBand()
        .domain(month)
        .range([0, chartWidth]);

    console.log(xScale("January"));
    console.log(xScale("February"));


    var yScale = d3.scaleLinear()
        .domain([11500, 14000])
        .range([chartHeight, 0]);


//Add circles to mark the points

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("color", "#000")
        .text("a simple tooltip");

    var voronoi = d3.voronoi()
        .x(function (d) {
            return xScale(d.month);
        })
        .y(function (d) {
            return ((yScale((+d.count))))
        })
        .extent([[0, 0], [chartWidth, chartHeight]]);

    chartArea.selectAll('path')
        .data(voronoi.polygons(data)).enter().append('path')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .attr('d', polygon)
        .on("mouseover", function (d) {
            tooltip.text(((d.data.month) + (', ') + (d.data.count)));
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });


    function polygon(d) {
        return "M" + d.join("L") + "Z";
    }


    //Create the line values to pass to path elemnt
    var line = d3.line()
        .x(data => xScale((data.month)))
        .y(data => (yScale((data.count))))
        .curve(d3.curveMonotoneX);

    // data.sort(function (a, b) {
    //     return month.indexOf(a) > month.indexOf(b);
    // });


    //Add Path to the chart
    chartArea.append('path')
        .data([data])
        .attr("fill", 'none')
        .attr("stroke", "rgb(17, 99, 110)")
        .attr("stroke-width", 2)
        .attr('class', 'line')
        .attr('d', line)
        .transition()
        .duration(5000)
        .attr("stroke-dashoffset", 0);


    chartArea.append('g').selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d.month)
        })
        .attr('cy', function (d) {
            return ((yScale((+d.count))))
        })
        .attr("r", 6)
        .attr("fill", "rgb(214, 255, 1)")
        .attr("stroke", "white")
        .attr("stroke-width", 2)   ;



    //Add y axis
    chartArea.append('g')
        .call(d3.axisLeft(yScale));

    //Add X axis
    chartArea.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr("transform", 'rotate(-40)')
        .attr('text-anchor', 'end');

    var xLabelWidth = (chartWidth / 2.5);
    var yLabelHeight = chartHeight + 50;

    // add axis label
    chartArea.append('text')
        .attr('transform', `translate(${xLabelWidth},${yLabelHeight})`)
        .text('Months');
    chartArea.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dx', '-20em')
        .attr('dy', '-3.5em')
        .text('Total Number of Crimes');


    // Annotations for Line Chart
    const line_annotations = [
        {
            type: d3.annotationCalloutCircle,
            note: {
                title: "Mid Year Spike",
                label: "Spikes during longer daylight times ",
                wrap: 200
            },
            x: 0,
            y: 0,
            dy: 10,
            dx: 70,
            subject: {radius: 60, radiusPadding: 10}
        }

    ];

    const line_makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(line_annotations);

    chartArea
        .append("g").attr("transform", `translate(380,15)`)
        .attr("class", "annotation-group")
        .attr("id", "linechart_annotation")
        .call(line_makeAnnotations);


}
