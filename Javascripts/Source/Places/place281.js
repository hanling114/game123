// Place: Strip Club Outside

function ShowPlace281()
{
	var md = WritePlaceHeader();
	
	// TITLE LINE
	addPlaceTitle(md, "Shopping Center Side Alley", "stripclub1.jpg");

	// Description
	md.write('<p>A small side alley off of the main shopping center. The only notable place is the Avernus Club you were told about. The sign notes there is a ' + sCurrency + '10 cover charge.');
	if (getClubManagersTotal() == 0 && !perJade.checkFlag(20)) md.write('<p>The Avernus Club is closed, it has a sign noting it is temporarily closed pending management changes.');
	else if (!perJade.isClubOpen()) md.write('<p>The Avernus Club is closed at this time of day, it has a sign noting it is open ' + perJade.isClubOpen(true) + '.');
	if (perJade.isCharmedBy()) md.write(' You have the key to the side door directly into your slave Jade\'s rooms.');
	else md.write('</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (perJade.isClubOpen()) {
		if (perJade.isCharmedBy()) addLinkToPlace(md, "enter the Avernus Club", 282, '', 'You are let in without paying the cover charge as a guest of Jade');
		else if (perYou.getCashOnHand() >= 10) addLinkToPlace(md, "enter the Avernus Club", 282, '', 'You pay the cover charge and enter', '', 'AddCash(-10)');
		else addTextForQuestions(md, 'You do not have enough money for the cover charge so you cannot enter the club');
	} else if (perJade.isCharmedBy() || perJade.isCharmedBy("Vampyre")) addLinkToPlace(md, "enter the club\'s side door", 280);
	addLinkToPlace(md, "walk back to the shopping center", 194);

	WritePlaceFooter(md);
}