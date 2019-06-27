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
       
//this is what finds the soulmate!!!
        var singleMuggle = req.body;

        //adds user input to muggles array
        muggles.push(singleMuggle);


        var totalDifferenceArray = [];
        var matches = [];

        //goes through every wizard
        for (var i = 0; i < wizards.length; i++) {
            
            var tempDifferenceArray = [];
            var total = 0;
//compares each score for each wizard agains each score for the input
            for (var k = 0; k < wizards[i].scores.length; k++) {
                //adds absolute values to a temporary array
                tempDifferenceArray.push(Math.abs(wizards[i].scores[k] - singleMuggle.scores[k]));
            }

            //sums all numbers in temp difference array
            total = tempDifferenceArray.reduce((x, y) => x + y)

            //adds these values to total difference array
            totalDifferenceArray.push(total);
            

        }

        //this creates a completely new deep array not a shallow array
        var sortedTotalDifferenceArray = Array.from(totalDifferenceArray);
        
        //sorts the copy of total difference array to make the lowest on the bottom
        sortedTotalDifferenceArray.sort((a, b) => a - b);

        //compares each number in the total difference array to the lowest score so that we can find position in wizards array of lowest score
        for(var m = 0; m < totalDifferenceArray.length; m++){
            //when they are equal push to matches
            if(sortedTotalDifferenceArray[0] == totalDifferenceArray[m]){
                matches.push(wizards[m]);
                
            }
            
        }
        
        //console.log(matches);

        //response from server is matches
        res.json(matches);

        

        




    });



};

