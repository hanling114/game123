Developing for 'A Spell For All'
--------------------------------

To develop for this game you need to be aware of the code structure. All location/event code is compiled into a single file
Javascripts/compiled.js
The source for this is in Javascripts/Source and there is a bat/sh file in the Development that creates the combined file using the Google Closure Compiler or simple copy commands. I leave it as an exercise for those using a unix based OS to convert to a bash script. Not this process just combines the files and does a simple whitespace strip.
So the process to change code is edit the js file, and then run the compile script, and test.

To compile the game you need a recent version of the Oracle Java Development Kit installed,
so the game can use the Google Closure Compiler to check and minify the javascript code.

In general to compile the game to play
--------------------------------------
- run compile.bat or compile.sh but please note the .sh has not been updated for sometime
- run check.bat to get a verbose error report. This DOES NOT create a playable game. Fix and errors and run the compile.bat after
- as a shortcut run "compile and run.bat" to compile the game and then open it in your default browser.


Documents
---------
people.html - defines each person in the game and their variables in the Person object and flags.
					This in not very detailed!
places.html	- lists all places and some of the flags used for some meta location objects in the game
developing.html - mostly out of date, will be removed
SOPs folder - settings for editing things like eye colours. You may need to adapt to your image editor (I use Paint.NET for instance and it's settings are different but colour values would be the same)
              I do note though exact values an methods should vary especially for people with dark eye colour or images with poor resolution for the eye.
