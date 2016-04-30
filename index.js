console.log('Now running');

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

var days = ["Before", "Friday", "Saturday", "Sunday"];

for (var day in days) {
    console.log(days[day]);

    var currentDay = data[days[day]];

    var count = 0;

    for (var eventID in currentDay) {
        var event = currentDay[eventID];

        // console.log(eventID);
        event.ID = eventID;
        // console.log(event.Match);
        // console.log(count);

        count++;
    }
}

fs.writeFile('newdata.json', JSON.stringify(data), function(err) {
    if (err) return console.log(err);
    console.log('Saved!');
});