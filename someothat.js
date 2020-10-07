
//
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawBarsM = function(dispersion,target,
                         xScale,yScale,height)
{
   target.selectAll("rect")
    .data(dispersion)
    .enter()
    .filter(function(name)
                           {
        return (["MOne","MTwo","MThree","MFour","MFive","MSix","MSeven","MEight","MNine"])
    })
    .append("rect")
    .attr("fill", "blue")
    .on("mouseover", function(des)
       {
       console.log(des.name);
       d3.selectAll("." + des.name)
       .style("background-color", "#ffec51")
       d3.select(this)
       .attr("fill", "skyblue");
   })
    .on("mouseout", function(dos)
       {
       d3.selectAll("." + dos.name)
       .style("background-color", "transparent");
       d3.select(this)
       .attr("fill", "blue");
   })
    .attr("x", function(obj)
         {
       //console.log("(type.type)", type.type)
       //console.log("xScale(type.type)", xScale(type.type))
        return xScale(obj.name)
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


var makeTranslateStringM = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxesM = function(graphDim,margins,
                         xScale,yScale)
{
var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        
        var axes = d3.select("#men")
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
var drawLabelsM = function(graphDim,margins)
{
    var labels = d3.select("#men")
        .append("g")
        .classed("labels", true)
        
    labels.append("text")
        .text("Type Distribution in General Male Population")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graphDim.width/2))
        .attr("y", margins.top+(10))
    
    labels.append("text")
        .text("Number of Men of Type")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(18," + (graphDim.height/2)+") rotate(270) ")
    
    labels.append("text")
        .text("Type (Male)")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graphDim.width/2))
        .attr("y", margins.top+(graphDim.height)+(40))
}


var drawLegendM = function(graphDim,margins)
{
    
    
    
    
}
    
            

//sets up several important variables and calls the functions for the visualization.
var initGraphM = function(distribution)
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
    
    d3.select("#men")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#men")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain(["MOne","MTwo","MThree","MFour","MFive","MSix","MSeven","MEight","MNine"])
        .range([0,graph.width])
        .paddingInner(.1)

    var yScale = d3.scaleLinear()
        .domain([0,2000])
        .range([graph.height,0])
    
    
    drawAxesM(graph,margins,xScale,yScale);
    drawBarsM(distribution,target,xScale,yScale,graph.height);
    drawLabelsM(graph,margins);
    drawLegendM(graph,margins);
}


    
    
var successFCNM = function(distribution)
{
    console.log("distribution",distribution);
    initGraphM(distribution);
}

var failFCNM = function(error)
{
    console.log("error",error);
}

var typePromiseM = d3.csv("men.csv")
typePromiseM.then(successFCNM,failFCNM)