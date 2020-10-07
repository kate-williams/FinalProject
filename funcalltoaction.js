var pairingsPromise = d3.csv("calltoaction.csv");

var successFCN = function(pairing)
    {
        console.log("Data Collected", pairing);
        drawTable(pairing);
    }
var failFCN = function(errorMsg)
    {
        concole.log("No Data", errorMsg);
    }
pairingsPromise.then(successFCN, failFCN);

//d3.select("body")
//.selectAll("tr")
//.data(employeePromise)
//.enter()
//.append("tr")
var drawTable = function(pairing)
    {
var rows = d3.select("tbody")
.selectAll("tr")
.data(pairing)
.enter()
.append("tr")
rows.append("td")
    .text(function(pairing)
          {
    return pairing.Type
})
rows.append("td")
    .text(function(pairing)
          {
    return pairing.BestMatch
})
    rows.append("td")
    .text(function(pairing)
          {
    return pairing.WorstMatch
})
    }


                       
    