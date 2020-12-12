    //
    // async function init() {
    //
    //     const data = await d3.csv("data/crimes_by_category.csv");
    //
    //
    //     //var data =[{avg_crims:400,month:"January"},{avg_crims:500,month:"February"}];
    //     console.log(data);
    //
    //     var margin = {top: 50, left: 50, right: 50, bottom: 50};
    //     var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //     var chartWidth = 700;
    //     var chartHeight = 500;
    //
    //     var svg = d3.select('svg')
    //         .attr("height", chartHeight + margin.top + margin.bottom)
    //         .attr("width", chartWidth + margin.left + margin.right);
    //
    //     var chartArea = svg.append('g')
    //         .attr("transform", `translate(${margin.left},${margin.top})`);
    //
    //     var xScale = d3.scaleBand()
    //         .domain(month)
    //         .range([0, chartWidth]);
    //
    //
    //
    //     var yScale = d3.scaleLinear()
    //         .domain([100, 800])
    //         .range([chartHeight, 0]);
    //
    //
    //     chartArea.append('g').selectAll('circle')
    //         .data(data)
    //         .enter()
    //         .append('circle')
    //         .attr('cx', function (d) {
    //             return xScale(d.month)
    //         })
    //         .attr('cy', function (d) {
    //             return ((yScale((+d.count))))
    //         })
    //         .attr("r", 2)
    //         .attr("fill", "red");
    //
    //
    //     var line = d3.line()
    //         .x(data => xScale((data.month)))
    //         .y(data => (yScale((data.count))));
    //
    //     data.sort(function (a, b) {
    //         return month.indexOf(a) > month.indexOf(b);
    //     });
    //
    //     function dataFilter(data, category) {
    //         data = data.filter(function (d) {
    //             return d.category == category;
    //         });
    //         return data;
    //     }
    //
    //     drawChart(data,'Fraud',"green");
    //     drawChart(data,'Burglary','red');
    //     drawChart(data,'Drug Offense','black');
    //     drawChart(data,'Motor Vehicle Theft','orange');
    //     drawChart(data,'Traffic Violation Arrest','blue');
    //
    //
    //     // drawChart()
    //     // drawChart()
    //
    //     chartArea.append('g')
    //         .call(d3.axisLeft(yScale));
    //
    //     chartArea.append('g')
    //         .attr('transform', `translate(0,${chartHeight})`)
    //         .call(d3.axisBottom(xScale))
    //         .selectAll('text')
    //         .attr("transform", 'rotate(-40)')
    //         .attr('text-anchor', 'end');
    //
    //     function drawChart(data, category,  color,) {
    //
    //         data = dataFilter(data,category);
    //
    //         var line = d3.line()
    //             .x(data => xScale((data.month)))
    //             .y(data => (yScale((data.count))));
    //
    //         data.sort(function (a, b) {
    //             return month.indexOf(a) > month.indexOf(b);
    //         });
    //         chartArea.append('path')
    //             .data([data])
    //             .attr("fill", 'none')
    //             .attr("stroke", color)
    //             .attr("stroke-width", 2)
    //             .attr('class', 'line')
    //             .attr('d', line);
    //
    //     }
    //
    //
    // }
    //
    //
