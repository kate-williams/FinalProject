//
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawBars = function(dispersion,target,
                         xScale,yScale,height)
{
   target.selectAll("rect")
       .data(dispersion)
    .enter()
    .append("rect")
    .attr("fill", "pink")
    .on("mouseover", function(dis)
       {
       console.log(dis.type);
       d3.selectAll("." + dis.type)
       .style("background-color", "#ffec51")
       d3.select(this)
       .attr("fill", "deeppink");
   })
    .on("mouseout", function(dat)
       {
       d3.selectAll("." + dat.type)
       .style("background-color", "transparent");
       d3.select(this)
       .attr("fill", "pink");
   })
    .attr("x", function(obj)
         {
       //console.log("(type.type)", type.type)
       //console.log("xScale(type.type)", xScale(type.type))
        return xScale(obj.type)
   })
    .attr("height", function(obj)
         {
       console.log("yScale(obj.value)", yScale(obj.value), height)
       return height-yScale(obj.value)
   })
    .attr("width",xScale.bandwidth)
    .attr("y", function(obj)
         {
       console.log("yScale(obj.value)", yScale(obj.value))
       return yScale(obj.value)
   })
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        
        var axes = d3.select("#women")
            .append("g")
        axes.append("g")
            .attr("transform", "translate("+margins.left+","+(margins.top+graphDim.height)+")")
            .call(xAxis)
        axes.append("g")
            .attr("transform", "translate("+margins.left+","+(margins.top)+")")
            .call(yAxis)
}


//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
    var labels = d3.select("#women")
        .append("g")
        .classed("labels", true)
        
    labels.append("text")
        .text("Type Distribution in General Female Population")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graphDim.width/2))
        .attr("y", margins.top+(10))
    
    labels.append("text")
        .text("Number of Women of Type")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(18," + (graphDim.height/2)+") rotate(270) ")
    
    labels.append("text")
        .text("Type (Female)")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graphDim.width/2))
        .attr("y", margins.top+(graphDim.height)+(40))
}


var drawLegend = function(graphDim,margins)
{
    
    
    
    
}
    
            

//sets up several important variables and calls the functions for the visualization.
var initGraph = function(population)
{
    //size of screen
    var screen = {width:600,height:300}
    //how much space on each side
    var margins = {left:70,right:20,top:20,bottom:70}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right-150,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#women")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#women")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain(["FOne","FTwo","FThree","FFour","FFive","FSix","FSeven","FEight","FNine"])
        .range([0,graph.width])
        .paddingInner(.1)

    var yScale = d3.scaleLinear()
        .domain([0,2000])
        .range([graph.height,0])
    
    
    drawAxes(graph,margins,xScale,yScale);
    drawBars(population,target,xScale,yScale,graph.height);
    drawLabels(graph,margins);
    drawLegend(graph,margins);
}
   

    
var successFCN = function(population)
{
    console.log("population",population);
    initGraph(population);
}

var failFCN = function(error)
{
    console.log("error",error);
}

var typePromise = d3.csv("General.csv")
typePromise.then(successFCN,failFCN)

