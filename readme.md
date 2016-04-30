# Roses Data Validator
To be used in conjunction with the York Vision Roses plugin. This makes sure that the 'ID' for each event matches its key. This is done as a temporary workaround for a bug in the current Roses implementation which can't be fixed whilst the events are on; it's not the neatest piece of code.

## Usage
*Again, this is a quick and dirty fix so it's not the most glorious thing to use.*

**Requirements:** *You'll need to have node.js installed on your computer for this to work properly. If you don't have node, get it [here](http://nodejs.org).*

1. Clone this repository into a new folder.
2. Run `$ npm install` to install the dependencies.
3. Get the `RosesTimetable.json` file from the root directory of the VisionTHREE theme: `/public_html/wp-content/themes/VisionTHREE/RosesTimetable.json`.
4. Put this into a new file called `data.json` and put it in the same directory as `index.js`.
5. In terminal, run `node .` in this directory.

In this directory you will now see a new file called `newdata.json`. This contains a new JSON file with all of the event IDs matching the event key.

### Debugging
In `index.js` you can set the `debug` variable to true in order to see every change the script is making (if you have a lot of changes to be made this may create a lot of output).

### Sample Data
If the script does not find a `data.json` file it will automatically use the `sampledata.json` file so you can see what the output looks like.

## TODO
[ ] Make the script check for any conflicting keys
[ ] Return an error if a certain day isn't found
[ ] Create more tests to further validate (e.g. checking that all of the score data is there and is valid)