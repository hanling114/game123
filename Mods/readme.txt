To create a mod for the game

IMPORTANT FIRST STEP: Do you have the Java installed? If you do not visit
www.java.com 
and install the latest. Now edit the file
Development/compile.bat
and change the line 10 from
set JDK=C:\jdk20\bin\
to your install path and save the file.
OR
change the line to
set JDK=

Now
a) add a subfolder in the Mods folder named for your mod
eg
Mods/yourmodname

NOTE: the folder name cannot contain spaces

b) add a subfolder
Javascripts
and a further subfolder
Source

c) in the Javascripts folder add a file detailsX.js where X is an unused number for existing mods or a letter A-Z
This file should contain a single line
addDetails("short name", "brief description", "version", "5", "flags", "yourmodname");
eg
addDetails("Severn Valley", "A rich town with a dark 'Mythos' past.", "1.0", "", "", "SevernValley");
The last three default to
- the suffix for the detailsX.js, so X
- blank, so no flags
- the short name with all spaces removed
Generally override these if you wish to differ from these

The flags field can contain a comma separated list of 
pickmale			- defaults to a male avatar selected but the player can change
pickfemale		- defaults to a female avatar selected but the player can change
pickfuta			- defaults to a futa avatar selected but the player can change
onlymale			- only male avatars can be selected
onlyfemale		- only female avatars can be selected
onlyfuta			- only futa avatars can be selected
pickuk			- UK setting is selected but can be changed
pickus			- US setting is selected but can be changed
onlyuk			- UK setting is only available
onlyus			- US setting is only available

d) (OPTIONAL) in the Source folder add any javascript needed for your mod. 
You can copy a file from the base game and alter as needed or copy functions. Your version will effectively replace the core game version.
Note: you can in most cases you can use the mod js described below.

e) (OPTIONAL) Add a .js file commonly named personMod.js containing code like

function initialiseMod(mod)
{
	if (mod !== "nameofmod") return;		// Note: remove any spaces, so use "SevernValley" in the example above or the value passed to the last parameter in addDetails above
	
	// Any custom changes to variables/places/people here
	
	// The Mod 'person' object to alter events without completely replacing existing javascript, but this is allowed too
	addPersonTop("nameofmod", 0, "", '', false, false);
}

This function can be used to change existing game objects like person objects, say the folder for images, peoples names or add new people, items etc.
Additonally you can add a person object like personGlenvale() for your mod to intercept standard events. You should use
addPersonTop() to ensure it is checked first and thus intercept the standard game versions.

You can add a start of game credits screen to the mod , by adding to initialiseMod() after the addPersonTop

per.showEventPopup = function()
{
	// Introduction shown at the start of the game after the general welcome screen
   // Note: flag 4 can be any you like, this just prevents it being reshown
	if (Place == 1 && sType == "modstart" && !this.checkFlag(4)) {
      this.setFlag(4);
      // Now you can customise the start of this game, altering starting variables as this is only called when the game is started
  		setPlaceKnown("AvernusClub");
		setPlaceKnown("Graveyard");
		nMoney = 200;
      
		showPopupWindow("",
			'<img src="Images/intro.jpg" class="imgpopup">' +   // An image in your Mods Images folder (optional, see below)
			"Stuff you want to say on the mod</p>" +
			'<p>More stuff in another paragraph"
		);
		return true;
	}
	return false;
};

f) (OPTIONAL) Add a folder
Mods/yourmodname/Images
with replacement images. If you use the exact same folder/naming as the base Images folder the game will use your image to replace the base game image
You only need to include images you wish to change. The game will
1. try loading from Mods/yourmodname/Images
2. if it fails then try Images

It will try the various image extensions first in the Mod folder, generally
png, gif, jpg, mp4
Then if these fail it will try the base game versions of the images

g) compile the game by running
Development\compile.bat

h) Distribute the mod with only the folders you have in Mods (Source is optional but recommended) and the 'detailsX.js' in the base Mods folder
If you did not have any javascript then the console will show errors on start of the game but will work

i) select to use your mod at the start of a new game by selecting a Scenario

Note:
a Mod that only changes images can just add the details.js and also the Images folder, with an empty/missing Javascript/Source folder