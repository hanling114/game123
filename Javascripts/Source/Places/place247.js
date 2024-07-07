// Place: Crypt

function ShowPlace247()
{
	var md = WritePlaceHeader();


	addPlaceTitle(md, "The Crypt", "crypt1.jpg");

	md.write('<p>An ancient crypt, hidden for over a hundred years, lies before you. Motes of dust float through the air in the ');
	if (isDay()) md.write('sunlight dimly lighting the crypt');
	else md.write('limited light from your phone and the moonlight from outside');
	md.write('. A coffin stands on an ornate pedestal.</p>');

	startQuestions();

	if (perLilith.isCharmedBy("You")) {
		if (!isDay()) addOptionLink(md, "wait for daytime", "WaitForDayNight()");
		else addOptionLink(md, "wait for darkness", "WaitForDayNight()");
	}

	addLinkToPlace(md, 'examine the coffin', 248);
	addLinkToPlace(md, 'exit the crypt?', 26);

	WritePlaceFooter(md);
}