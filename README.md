# New Note from Template
_A plug-in for ["The Archive"](https://zettelkasten.de/the-archive/) application_

@package `com.akeirou.newnotefromtemplate.thearchiveplugin`

Creates a new note from a well-known template note
  - The user is prompted for a note title.
  - The filename is made from the current timestamp and the sanitized title.
  - The note is created by populating a well-know template.
  - The template must comply with a syntax similar to handlebars.js, limited to
    keys enclosed by double curly braces: _{{key}}_ 
      - Keys are substituted by values when rendering the template.
      - When a key has no value, it is substituted by an empty string unless
        a default value has been specified in the template: _{{key|default}}_

NB:
  - The timestamp is precise to the minute
  - The template note filename is hardcoded


## Plug-in installation
- download the zip file [com.akeirou.newnotefromtemplate.thearchiveplugin.zip](https://github.com/BrBorghi/new_note_from_template/releases/download/v1.0.2/com.akeirou.newnotefromtemplate.thearchiveplugin.zip)
- unzip it in a temporary folder
- double-click on the bundle `com.akeirou.newnotewithtimestamp.thearchiveplugin` to install it
- alternatively to install it, you can copy the bundle `com.akeirou.newnotefromtemplate.thearchiveplugin` in the folder `~/Library/Application\ Support/TheArchive/Plugins/Installed`
- copy the template `000000000000-StdTemplate.md`in your note folder
- enable the plug-in in "The Archive" application:
  - in the toolbar menu, select _Plug-Ins > Manage Plug-Ins..._
  - select the plug-in _New Note from Template_ and click the _Enable_ button
 
## Notes
- The template can be modified without modifying or reloading the plug-in. Only the filename of the template is hardcoded.
