// Massage Parlor

function ShowPlace48()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	var clvS = perSharon.getCharmedLevel();

	if (clvS > 0 && isVisible()) perSharon.showPerson("sharongreet.jpg");
	else perSharon.showPerson("sharon1.jpg");

	addPlaceTitle(md, "Massage Parlor");

	if (isInvisible()) md.write('<p>You see the salon and the owner attending to her customers.</p>');
	else if (clvS === 0) md.write('<p>The owner of the parlor greets you as you enter. "Welcome. Please come in and prepare to be relaxed."  You look around the place and there doesn\'t seem to be anyone else here besides customers and the owner.</p>');
	else {
		md.write(
			'<p>Sharon pulls her gorgeous tits out for you as you enter the parlor. She is ready to do anything you ask.</p>' +
			'<p>"Hello again ' + perYou.getMaster() + '. Would you like another massage?"</p>'
		);
	}

	startQuestions();

	if (!perSharon.checkFlag(3)) addLinkToPlaceC(md, 'ask about getting a massage from her', Place, 'type=sharonask1');
	else if (clvS === 0) addLinkToPlaceC(md, 'get another massage from Sharon.', Place, 'type=sharonmassage');

	if (clvS > 0) {
		addLinkToPlaceC(md, perYou.isMaleSex() ? 'have her suck' : 'have her lick', Place, 'type=sharonparlourbj');
		if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, 'bend her over', Place, 'type=sharonparlourfuck');
		addLinkToPlaceC(md, 'get another massage from Sharon', Place, 'type=sharonmassageslave');
	}

	addLinkToPlace(md, "leave the Parlor", 43);

	WritePlaceFooter(md);
}