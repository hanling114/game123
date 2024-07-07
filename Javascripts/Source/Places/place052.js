// Place: Alley

function ShowPlace52()
{
	var md = WritePlaceHeader();

	addPlaceImage(md, isPlaceKnown("HiddenRoom") ? "alley2.jpg" : "alley1.jpg", "80%");

	if (wherePerson("Kurndorf") == 6) {
		// Ghost is here
		md.write('<img src="Images/ghost2.png" style="border-style:none;margin:0px 5px;float:left;position:absolute;width:50%;width:15vw; top:0px; left:0" alt="Ghost">');
		//addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}

	if (!isPlaceKnown("Alley")) setPlaceKnown("Alley");	// Know the alley permanently.

	addPlaceTitle(md, "Alley");

	md.write(
		'<p>Behind some of the residential properties is an ancient alley. In the past it was a busy thoroughfare but today it is rarely used except for when the townsfolk must take the shortcut by foot.</p>' +
		'<p>A concrete pathway leads from Yoolaroo Drive to Kollam Street.<br>'
	);

	if (wherePerson("Kurndorf") == 6) {
		// Ghost is here
		md.write('<p>You see the ghostly man again.  He is standing in front of a picture of a bull painted on the wall.  It\'s almost as if he is waiting for you...</p>');
	}

	md.write('<p>There are some gutters in the ground with grates stopping you from stepping in and hurting yourself but they are rough and can trip you if you are not careful.');
	if (checkPlaceFlag("Alley", 2)) {
		md.write('You notice one grate guards a deep gutter drain is badly scuffed and has marks where someone had been trying to open it. ');
		if (perYou.getQuestRustyKey() < 999) {
			//Haven't fished out the rusty key yet
			md.write(' You can see a dull rusty metallic object partially buried underneath some debris.');
		}
	} 
	md.write('</p>');
 	if (isPlaceKnown("HiddenRoom")) md.write('<p>You can see a faint outline of the door to the hidden room.</p>');


	//There's a stone (from Kate's puzzle) waiting -AND- you know clairvoyance
	if (checkPlaceFlag("Alley", 6) && isSpellKnown("Clairvoyance")) {
		md.write('<p>As you move through the alley, a small stone falls out of the east wall.  A small, very <i>familiar</i> looking stone.</p>');
	}

	// ******************************************************************
	startQuestions();

	if (checkPlaceFlag("Alley", 6) && isSpellKnown("Clairvoyance")) addQuestionCO(md, "pick up the stone", "Misc", 376);

	if (isPlaceKnown("HiddenRoom")) addLinkToPlace(md, "enter the Hidden Room", 53);

	if (wherePerson("Kurndorf") == 6) addQuestionCO(md, "watch the Ghost", "Misc", 13206);
	
	if (isCharmedBy("Sharon") && isShopOpen(2, 0, true)) addLinkToPlace(md, 'enter the Massage Parlor back entrance', 54);
	
	addLinkToPlaceWest(md, "walk to Yoolaroo Drive", 43);
	addLinkToPlaceEast(md, "walk to Kollam Street", 44);

	WritePlaceFooter(md);
}