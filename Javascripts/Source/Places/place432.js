// Melanie's House

function ShowPlace432()
{
	var md = WritePlaceHeader();

	var perMelanie = findPerson("Melanie");
	var clvM = perMelanie.getCharmedLevel();

	if (clvM <= 0 || isInvisible()) perMelanie.showPerson("mel1.jpg");
	else if (!isDay()) {
		if (clvM == 4 && perMelanie.checkFlag(3)) perMelanie.showPerson("mel4s.jpg");
		else perMelanie.showPerson("mel9-" + perMelanie.getSuffix() + "-night.jpg");
	} else perMelanie.showPerson("mel9-" + perMelanie.getSuffix() + "-day.jpg");
	
	addPlaceTitle(md, "Melanie\'s Home");

	if (clvM == 4) {
		if (perMelanie.checkFlag(3)) md.write('<p>Your Milf slave is resting, securely bound to remind her of her submission.</p>');
		else md.write('<p>Your Milf slave is locked in her exercise machine. You require your slaves to maintain peak physical condition so that they may please you better.</p>');
	} else if (clvM == 3) {
		if (isInvisible()) md.write('<p>Your Milf-friend Melanie is lounging around, currently she is only dressed in her underwear.</p>');
		else md.write('<p>Your Milf-friend Melanie is very happy to see her younger lover.</p>');
	} else {
		if (perMelanie.isCharmedBy("Davy")) {
			if (isVisible()) md.write('<p>"Please leave now young ' + perYou.getManWoman() + 'before I call the police."</p>');
			else md.write('<p>You see an attractive woman looking around expectantly, she asks "Master is that you?"</p>');
		} else {
			if (isVisible()) md.write('<p>"Hello young ' + perYou.getManWoman() + '. Did you need something or have something to deliver? I wasn\'t expecting visitors today."</p>');
			else md.write('<p>You see an attractive woman looking around expectantly.</p>');
		}
	}

	startQuestions();
	addLinkToPlace(md, "leave her house", 37);
	WritePlaceFooter(md);
}