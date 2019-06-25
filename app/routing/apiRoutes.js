// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var wizards = require("../data/wizards");
var muggles = require("../data/muggles");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/wizards", function (req, res) {
        res.json(wizards);
    });

    app.get("/api/muggles", function (req, res) {
        res.json(muggles);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    //*******************************************************************
    app.post("/api/muggles", function (req, res) {
        //     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        //     // It will do this by sending out the value "true" have a table
        //     // req.body is available since we're using the body parsing middleware

        var singleMuggle = req.body;
        muggles.push(singleMuggle);


        var totalDifferenceArray = [];
        //var sortedTotalDifferenceArray = [];
        var matches = [];

        for (var i = 0; i < wizards.length; i++) {
            console.log("wizards[i]" + wizards[i]);
            console.log(wizards[i].scores)
            var tempDifferenceArray = [];
            var total = 0;

            for (var k = 0; k < wizards[i].scores.length; k++) {
                tempDifferenceArray.push(Math.abs(wizards[i].scores[k] - singleMuggle.scores[k]));
            }

            
            total = tempDifferenceArray.reduce((x, y) => x + y)

            totalDifferenceArray.push(total);
            console.log("totalDifferenceArray" + totalDifferenceArray)

        }

        
        let sortedTotalDifferenceArray = Array.from(totalDifferenceArray);
        console.log("totalDifferenceArray outside for loop" + totalDifferenceArray);
        console.log("sortedTotalDifferenceArray" + sortedTotalDifferenceArray);
        sortedTotalDifferenceArray.sort((a, b) => a - b);

        console.log(totalDifferenceArray + "totalDifferenceArray after sorting function");
        
        console.log("sortedTotalDifferenceArray" + sortedTotalDifferenceArray)
        console.log(sortedTotalDifferenceArray[0]);

        for(var m = 0; m < totalDifferenceArray.length; m++){
            
            if(sortedTotalDifferenceArray[0] == totalDifferenceArray[m]){
                console.log("totalDifferenceArray[m]" + totalDifferenceArray[m]);
                console.log(m +"m")
                matches.push(m);
                res.json(m);
            }
            
        }
        
        console.log(matches);
        

        // THIS IS WHERE ALL THEE COMPARING FOR THE QUIZ IS GOING TO HAPPEN!!!!

        




    });



};

