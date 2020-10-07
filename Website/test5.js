var toyPromise = d3.json("toydesigns.json");
var successFCN = function(toys)
    {console.log ("Here," toys);
    drawTable(toys)}
var failureFCN = function(errorMsg)
    {console.log("Error", errorMsg);})
toyPromise.then(succesFCN, failureFCN);

var drawTable = function(toys)
    {
        var rows = d3.select("#myTable")
        .selectAll("tr")
        .data(toys)
        .enter()
        .append("tr")
    rows.append("td")
        .text(function(toy)
             {
            return toy.name
    })
    rows.append("td")
        .text(getParts)
        
    rows.append("td")
        .text(getCost)
    }

    


var getParts = function(toy)
{
    return d3.sum(toy.parts.map(getNumbers))
}
var getNumbers = function(part)
{
    return part.number
}

var getCost = function(toy)
{
    return d3.sum(toy.parts.map(getPartCost))
}
var getPartCost = function(part)
{
    return part.cost*part.number}
