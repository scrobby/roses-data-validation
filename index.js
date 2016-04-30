//set this to true to see more information about the data that was changed
var debug = false;

//This loads in the data. As we aren't working with a large file and there are no other operations, we don't have to worry about doing it asyncronously
var fs = require('fs');

var fileName = 'data.json';
var usingSample = false;

//check if 'data.json' exists and use the sample data if not
try {
    fs.accessSync(fileName, fs.F_OK);
} catch (e) {
    fileName = 'sampledata.json';
    usingSample = true;
}

var data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

if (!usingSample) {
    console.log('Now running');
} else {
    console.log('Now running using sample data');
}

//Roses always takes place Fri-Sun, with a few events before, so hard-coding these values isn't that big of a deal at the moment.
//All of Chris King's Roses plugins also have these hard coded, so this will also make sure that it works properly with them.
var days = ["Before", "Friday", "Saturday", "Sunday"];

//set up a JSON object to keep track of changes
var changeCount = {
    "Before": 0,
    "Friday": 0,
    "Saturday": 0,
    "Sunday": 0,
    "total": 0
};

//Now we need to run through each day to check all of its events
for (var dayKey in days) {
    if (debug) console.log('Now checking: ' + days[dayKey]);

    //this gets the JSON data for the current day
    var currentDay = data[days[dayKey]];

    //set up a variable to see how many events were changed
    var dayCount = 0;

    //now go through every event and see if any changes are necessary
    for (var eventID in currentDay) {
        //get the current event by its ID
        var event = currentDay[eventID];

        //check to see if the event ID matches the key and change it if it doesn't
        if (event.ID !== eventID) {
            if (debug) console.log('Changed ' + event.ID + 'to ' + eventID);
            event.ID = eventID;

            dayCount++;
        }
    }

    changeCount[days[dayKey]] = dayCount;
    changeCount.total += dayCount;
}

//once this has all taken place, we need to save the data to a new file. This will overwrite any pre-existing files.
fs.writeFile('newdata.json', JSON.stringify(data), function(err) {
    if (err) return console.log(err);

    //alter the changeCount to make it something more readable for its output
    var changesString = reformatChangesJSON(changeCount);

    //inform the user of how many changes have taken place
    console.log('Made a total of ' + changeCount.total + ' changes: \n' + changesString);
});

function reformatChangesJSON(jsonData) {
    var changesString = JSON.stringify(jsonData);

    changesString = changesString.replace("{", " - ");
    changesString = changesString.replace("}", "");
    changesString = changesString.replace(/"/g, "");
    changesString = changesString.replace(/,total.*/, "");
    changesString = changesString.replace(/,/g, "\n - ");
    changesString = changesString.replace(/:/g, ": ");

    if (usingSample) {
        changesString = "SAMPLE DATA:\n" + changesString;
    }

    return changesString;
}