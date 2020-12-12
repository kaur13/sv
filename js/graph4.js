async function init4() {

    const data = await d3.csv("data/crimes_by_month_by_time.csv");


    var margin = {
        top: 50,
        left: 100,
        right: 170,
        bottom: 60
    };
    var times = ["12 AM", "1 AM",
        "2 AM", "3 AM",
        "4 AM", "5 AM",
        "6 AM", "7 AM",
        "8 AM", "9 AM",
        "10 AM", "11 AM",
        "12 PM", "1 PM",
        "2 PM", "3 PM",
        "4 PM", "5 PM",
        "6 PM", "7 PM",
        "8 PM", "9 PM",
        "10 PM", "11 PM"
    ];
    // var legendMonth = ['January', 'February',
    //     'March', 'April',
    //     'May', 'June',
    //     'July', 'August',
    //     'September', 'October',
    //     'November', 'December'];

    var chartWidth = 700;
    var chartHeight = 500;

    var svg = d3.select('#svg3')
        .attr("height", chartHeight + margin.top + margin.bottom)
        .attr("width", chartWidth + margin.left + margin.right);

    var chartArea = svg.append('g')
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale = d3.scaleBand()
        .domain(times)
        .range([0, chartWidth]);




    var yScale = d3.scaleLinear()
        .domain([0, 1000])
        .range([chartHeight, 0]);

    var xLabelWidth = (chartWidth / 2);
    var yLabelHeight = chartHeight + 50;

    //1.draw axis
    chartArea.append('g')
        .call(d3.axisLeft(yScale));

    chartArea.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr("transform", 'rotate(-40)')
        .attr('text-anchor', 'end');

    //2.draw axis Labels
    chartArea.append('text')
        .attr('transform', `translate(${xLabelWidth},${yLabelHeight})`)
        .text('Hours');
    chartArea.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dx', '-15em')
        .attr('dy', '-2.5em')
        .text('Crimes Count');

    //3.draw legends
    //drawLegend();


    dataNest = d3.nest()
        .key(function (d) {
            return d.month;
        })
        .entries(data);

    console.log("nest", dataNest);
    var y = 0;
    dataNest.forEach(function (d, i) {
        d.show = true;
        console.log(d);
        y = y + 20;
        drawChart(d, d3.schemePaired[i], i, y)
    });


    //4.draw lines
    // for (i = 0; i < legendMonth.length; i++) {
    //     drawChart(data, legendMonth[i], d3.schemePaired[i]);
    // }
    //
    //
    // function dataFilter(data, month) {
    //     data = data.filter(function (d) {
    //         return d.month == month;
    //     });
    //     return data;
    // }


    // function drawLegend() {
    //     var x = 0;
    //     var y = 0;
    //     var legend = svg.append('g').attr('transform', `translate(800,150)`);
    //     for (i = 0; i < legendMonth.length; i++) {
    //         legend.append('rect')
    //             .attr('x', x)
    //             .attr('y', y)
    //             .attr('width', '15')
    //             .attr('height', '15')
    //             .style('fill', d3.schemePaired[i])
    //             .style('stroke','gold')
    //         // xtext += 20;
    //         legend.append('text')
    //             .attr('x', x + 20)
    //             .attr('y', y + 13)
    //             .attr("class", legendMonth[i])
    //             .text(legendMonth[i])
    //             .on("click",function(){
    //
    //             })
    //         y += 20;
    //
    //     }
    // }

    //Add function to draw lines
    function drawChart(d, color, i, y) {

        var data = d.values;

        //data = dataFilter(data, month);

        var line = d3.line()
            .x(data => xScale((data.hour)))
            .y(data => (yScale((data.count))))
            .curve(d3.curveMonotoneX);

        data.sort(function (a, b) {
            return times.indexOf(a) > times.indexOf(b);
        });
        chartArea.append('path')
            .data([data])
            .attr("fill", 'none')
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .attr('class', 'line')
            .attr('d', line)
            .attr("id", 'line' + i);

        var legend = svg.append('g')
            .attr('transform', `translate(800,150)`).attr('class', 'legend');

        svg.append('g')
            .attr('transform', `translate(800,130)`).attr('class', 'legend')
            .append('text').attr('x',0).attr('y',0).text(['Click below boxes for '])
        svg.append('g')
            .attr('transform', `translate(800,150)`).attr('class', 'legend')
            .append('text').attr('x',0).attr('y',0).text(['individual month details'])
        legend.append('rect')
            .attr('x', 0)
            .attr('y', y)
            .attr('width', '15')
            .attr('height', '15')
            .attr('id', i)
            .style('fill', d3.schemePaired[i])
            .style('stroke', 'gold')
            .on("click", function () {
                    console.log("what i have here", d);
                    var color = document.getElementById(this.id).style.fill;
                    var rect = document.getElementById(this.id);


                    if (color != 'white') {


                        rect.style.fill = 'white'
                    } else {
                        rect.style.fill = d3.schemePaired[i]
                    }

                    var elemented = document.getElementById('line' + this.id);


                    d.show = !(d.show);


                    d3.select(elemented)
                        .transition()
                        .duration(350)
                        .style("opacity", d.show ? 1 : 0)
                        .style("display", d.show ? 'block' : 'none');

                }
            );


        legend.append('text')
            .attr('x', 20)
            .attr('y', y + 13)
            .attr("id", i)
            .text(d.key)
// .on("click", function (d1) {
//     console.log("what i have here", d);
//     var elemented = document.getElementById('line' + this.id)
//     console.log("d..", d.key);
//     console.log("d..", d.show);
//
//     d.show = !(d.show)
//     console.log("d..again", d.show);
//
//
//     console.log(elemented)
//     d3.select(elemented)
//         .transition()
//         .duration(350)
//         .style("opacity", d.show ? 1 : 0)
//         .style("display", d.show ? 'block' : 'none');
//
// })

// var voronoi = d3.voronoi()
//     .x(function (d) {
//         return xScale(d.month);
//     })
//     .y(function (d) {
//         return ((yScale((+d.count))))
//     })
//     .extent([[0, 0], [chartWidth, chartHeight]]);
//
// chartArea.selectAll('path')
//     .data(voronoi.polygons(data))
//     .enter().append('path')
//     .attr('fill', 'none')
//     .attr('pointer-events', 'all')
//     .attr('d', function(d) { return d ? "M" + d.join("L") + "Z" : null; })
//     .on("mouseover", function (d) {
//         tooltip.text(((d.data.month) + (', ') + (d.data.count)));
//         return tooltip.style("visibility", "visible");
//     })
//     .on("mousemove", function () {
//         return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
//     })
//     .on("mouseout", function () {
//         return tooltip.style("visibility", "hidden");
//     });


// function polygon(d) {
//     console.log(data);
//     console.log("graph 4- d", d);
//     return "M" + d.join("L") + "Z";
// }

    }

// var legend1 = svg.selectAll('.legend').data([legendMonth]).enter().append('g').attr('transform', `translate(800,150)`);
// legend1.append('rect').attr('width', '15')
//     .attr('height', '15').style('fill', "green") // each fill is passed a color
//     .style('stroke', "green")


    // var tooltip = d3.select("body")
    //     .append("div")
    //     .style("position", "absolute")
    //     .style("z-index", "10")
    //     .style("visibility", "hidden")
    //     .style("color", "#000")
    //     .text("a simple tooltip");


// var items=document.getElementsByName('acs');
// items.addEventListener('change',function(event){
//     console.log("in checkbox")
//     var typeFilterChecked = d3.select(items).property('checked');
//     console.log("check",typeFilterChecked)
// })


}


