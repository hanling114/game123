﻿// Museum Storeroom

function ShowPlace246()
{
	var md = WritePlaceHeader();

	var perLola = findPerson("Lola");
	var clvL = perLola.getCharmedLevel();
	perLola.showPerson(clvL == 4 ? "bondage2a.jpg" : "bondage2b.jpg");
	var perGina = findPerson("Gina");

	addPlaceTitle(md, "Museum Storeroom");

	md.write(
		'<p>A storeroom used for storing assorted low-value exhibits when not on display. There is an area that Lola said were for the exhibit on the history of bondage, but mostly it looks like her personal stash of bondage gear!</p>'
	);

	if (clvL == 4) {
		// Slave
		md.write('<p>You have chained up Lola and are holding the chain to her wrists, what would you like to do to her?</p>');
		startQuestions();
		addLinkToPlace(md, "whip her", Place, 'type=lolawhip');
		addLinkToPlace(md, "vibe her", Place, 'type=lolavibe');
		addLinkToPlace(md, "suspend her", Place, 'type=lolasuspend');
		
		if (perYou.isMaleSex()) addLinkToPlace(md, "fuck her", Place, 'type=lolafuck');
		else if (perYourBody.FindItem(45) > 0) addLinkToPlace(md, "fuck her with your strap-on", Place, 'type=lolafuck');

	} else {
		// Lover
		md.write('<p>When Gina arrived in the storeroom Lola immediately stripped herm tied her up and gagged her, all with your complete approval and guidance. Gina being your obedient slave submits willingly.</p>');
		startQuestions();
		// Lola/Gina images
		addLinkToPlace(md, "have Lola whip Gina", Place, 'type=ginawhip');
		addLinkToPlace(md, "have Lola use a vibrator on Gina", Place, 'type=ginavibe');
		// Lola only using look-a-like models or inspecific models
		addLinkToPlace(md, "have Lola sit on the bound Gina\'s face", Place, 'type=ginafacesit');
		addLinkToPlace(md, "have Gina lick Lola while still bound", Place, 'type=ginalick');
		addLinkToPlace(md, "have Gina lick Lola\;s feet", Place, 'type=ginafeet');
		addLinkToPlace(md, "have Lola fuck Gina with a strap-on", Place, 'type=ginastrapon');
	}

	addLinkToPlace(md, "return to Lola\'s office", 243);
	addLinkToPlace(md, "leave the storeroom", 239);
	
	if (clvL == 3) {
		AddPeopleColumnMed(md);
		perGina.showPerson("bondage1.jpg");
	}
	WritePlaceFooter(md);
}