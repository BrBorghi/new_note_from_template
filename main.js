/**
 * @package com.akeirou.newnotefromtemplate.thearchiveplugin
 * 
 * Plugin for "The Archive"
 * Creates a new note from a well-known template note
 *   - The user is prompted for a note title
 *   - The filename is made from the current timestamp and the sanitized title
 *   - The note is created by populating a well-know template
 *   - The template must comply with a syntax similar to handlebars.js, limited to
 *     keys enclosed by double curly braces: {{key}}. 
 *       - Keys are substituted by values when rendering the template.
 *       - When a key has no value, it is substituted by an empty string unless
 *         a default value has been specified in the template: {{key|default}}
 * 
 * NB:
 *   - The timestamp is precise to the minute
 *   - The template note filename is hardcoded
 *
 * @summary create new note from template note
 * @version v1.0.0
 * @author Bruno Borghi <bruno.borghi@akeirou.com>
 * @license Unlicense
 * 
 * Created at     : 2024-10-13 20:45:00
 * Last modified  : 2024-10-13 20:45:00
 */


"use strict";

// Ask user to provide the title for the note
const targetTitle = app.prompt({
  title: "New Note from Template",
  description: "Enter title:",
  placeholder: "Title",
  defaultValue: "",
});
if (targetTitle === null) { // user clicked cancel
    cancel("Creation cancelled");
}
  
// Sanitize the title to get a valid file name
const sanitizedTitle = targetTitle
    .slice(0,80) // limit title in filename to 80 characters
    .trim() // remove leading and trailing white spaces
    .normalize('NFD').replace(/\p{Diacritic}/gu, "") // remove diacritics
    .replace(/[^a-z0-9]/gi, '_') // replace special characters with underscore
    .replace(/_{2,}/g, '_') // merge several consecutive underscores into one
    .toLowerCase();

// generate the timestamp
const now = new Date();
const timestampString = [
  now.getFullYear(),
  ('0' + (now.getMonth() + 1)).slice(-2),
  ('0' + now.getDate()).slice(-2),
  ('0' + now.getHours()).slice(-2),
  ('0' + now.getMinutes()).slice(-2),
].join('');

// Create file
let targetFilename = timestampString 
if (sanitizedTitle != ""){
    targetFilename += "-" + sanitizedTitle;
}
output.changeFile.filename = targetFilename;

// Insert dynamic header by populating the template

String.prototype.render = function (dict) {
  // populates the template by inserting values from dict
  // returns the whole string
	return this.replace(/\{\{([^\}]+)\}\}/g, function (fullmatch, groupmatch) {
        const a= groupmatch.split('|'), key = a[0]
        return (key in dict) ? dict[key] : (a.length = 2) ? a[1] : "";
	});
};

function getTemplate(str) {
  // read the template from the note specified by str
    for (let note of input.notes.all) {
      if (note.filename === str) return note.content
    }	
}

const templateFilename = "000000000000-StdTemplate" // well-known name for template

output.changeFile.content = getTemplate(templateFilename).render({
          timestamp: timestampString,
          filename: targetFilename, 
          title: targetTitle
});
