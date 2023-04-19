
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    x: Math.random() * 500,
    y: Math.random() * 500,
  });
};

const svg = d3.select("body")
  .append("svg")
  .attr("height", 500)
  .attr("width", 500);

svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("r", 5);

d3.csv("titanic.csv").then(data => {
  console.log(data);
});


d3.csv("titanic.csv").then(data => {
  // Step 1: Count the number of passengers in each age group
  const ageData = d3.group(data, d => d.Age);
  const ageCounts = Array.from(ageData, ([key, value]) => ({
    age: key === "" ? "Unknown" : key,
    count: value.length,
  }));

  // Step 2: Define the pie chart layout
  const pie = d3.pie()
    .value(d => d.count);

  // Step 3: Define the color scale
  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  // Step 4: Create the SVG canvas
  const svg = d3.select("body")
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

  // Step 5: Create a group element for the pie chart
  const g = svg.append("g")
    .attr("transform", "translate(250, 250)");

  // Step 6: Define the arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(200);

  // Step 7: Create the pie slices
  const arcs = g.selectAll("arc")
    .data(pie(ageCounts))
    .enter()
    .append("g");

  // Step 8: Draw the pie slices
  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => colors(d.data.age));

  // Step 9: Add the text labels
  arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .text(d => `${d.data.age}: ${d.data.count}`)
    .attr("text-anchor", "middle");
});
