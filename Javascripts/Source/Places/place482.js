// Foremans Office

function ShowPlace482()
{
	var md = isDay() ? WritePlaceHeader() : WritePlaceHeaderNP();

	var perAsh = findPerson("Ash");
	
	if (!perAsh.isHere()) {
		// Empty
		addPlaceTitle(md, "Construction Site Office", "constructionoffice.jpg");
		md.write('<p>This is an office and store area for the site. There is no one here currently, but you can see some personal effects and rough bedding indicating there is some one using the place recently. Maybe return tomorrow in the daytime?</p>');
		startQuestionsOnly();
		addLinkToPlace(md, "leave the office", 481);
		WritePlaceFooter(md);
		return;
	}
	var clvA = perAsh.getCharmedLevel();
	
	if (perLilith.isHere()) perLilith.showPerson("vampashroom.jpg");
	else if (clvA === 0 || isInvisible()) perAsh.showPerson("ash1.jpg");
	else if (!isDay()) perAsh.showPerson("ashnight.jpg");
	else perAsh.showPerson("ashday.jpg");
	
	addPlaceTitle(md, "Construction Site Office");

	if (perLilith.isHere()) {
		md.write(
		'<p>Ash\'s attention is completely focussed on Lilith, she barely notices your presence,</p>' +
		'<p>"Hello Ma\'am, everything is in order at the site, I am ready for your inspection"</p>'
		);
	} else if (isInvisible()) md.write('<p>Ash is doing something to the equipment in the office, some maintenance work maybe?</p>');
	else if (clvA == 4) md.write('<p>Ash is now constantly trying to bribe you with her mouth or asshole. It is such a stark contrast to the prudish girl she used to be. She is your devoted slave and will truly do anything you tell her to do.</p>');
	else if (clvA == 3) md.write('<p>Ash seems grateful to you for arranging for her to work at site maintenance, "Thank you so much for the job. "I am quite sure some \'benefits\' are in order"</p>');
	else {
		md.write(
			'<p>Ash seems grateful to you, "Thank you so much for letting me stay here. If there\'s anything I can ever do for you just let me know. This means so much to me. You really are saving my life here. Anything you need is done. Just say the word"</p>' +
			'<p>You keep thinking, "Ash, you keep saying that but I don\'t think you know what anything means"</p>'
		);
	}

	if (perLilith.isHere()) {
		startQuestions("Lilith commands Ash");
		addLinkToPlace(md, '"let me inspect your body"', Place, 'type=ashexpose', '', '', '', 'bloodblock');
		if (perAsh.checkFlag(3)) {
			addLinkToPlace(md, '"Demonstrate some of the equipment"', Place, 'type=ashjackhammer', '', '', '', 'bloodblock');
			if (perAsh.checkFlag(4)) addLinkToPlace(md, '"Demonstrate the other equipment"', Place, 'type=ashfuckingmachine', '', '', '', 'bloodblock');
			addLinkToPlace(md, '"Apply some lubrication"', Place, 'type=ashlubricate', '', '', '', 'bloodblock');
			addLinkToPlace(md, '"I will inspect your entire body with mine"', Place, 'type=ashvampsex', '', '', '', 'bloodblock');
			addLinkToPlace(md, '"Help me with my assistant here"', Place, 'type=ashvampthreesome', '', '', '', 'bloodblock');
			addLinkToPlace(md, '"I will inspect your neck"', Place, "type=feedOn&by=" + perLilith.uid + "&who=" + perAsh.uid, '', '', '', "bloodblock");
		}
		
	} else if (clvA == 0) {
		startQuestions();
		addLinkToPlaceC(md, '"You could show me those tits"', Place, 'type=ashexpose');
		
	} else if (clvA == 4) {
		startQuestions();
		if (perYou.isMaleSex()) addLinkToPlaceC(md, 'suck my balls', Place, 'type=ashbj');
		else addLinkToPlaceC(md, 'lick me', Place, 'type=ashbj');
		addLinkToPlaceC(md, 'let her ride you', Place, 'type=ashfuck');	
	} else {
		addLinkToPlaceC(md, 'ask for some oral \'benefits\'', Place, 'type=ashbj');
		addLinkToPlaceC(md, 'ask for some fucking \'benefits\'', Place, 'type=ashfuck');	
	}


	if (clvA > 0 && !perLilith.isHere()) {
		if (!perYou.isMaleSex() && perYourBody.FindItem(45) > 0) addLinkToPlace(md, "fuck her with your plastic cock", Place, "type=ashstrapon");
		addLinkToPlaceC(md, clvA == 4 ? '"Jiggle that ass"' : 'play around with a jackhammer', Place, 'type=ashjackhammer');
		addLinkToPlace(md, '"Apply some lubrication"', Place, 'type=ashlubricate');

		perAsh.addSleepLink(md, "sleep here for the night", "Time for Bed Ash",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>It\'s so peaceful here.</b>',
			'sleep.jpg', true
		);
	}

	addLinkToPlace(md, "leave the building", 481);
	WritePlaceFooter(md);
}