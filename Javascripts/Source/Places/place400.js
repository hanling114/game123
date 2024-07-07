// Place: Aunt's House

function ShowPlace400()
{
	var perKylie = findPerson("Kylie");
	var perBrandi = findPerson("Brandi");
	var clvB = perBrandi.getCharmedLevel();
	var bNymp = perBrandi.isNympho();

	var b2Cols = perKylie.isHere() && perBrandi.isHere();

	var md = WritePlaceHeader(false, b2Cols ? "td-left-small" : "");

	// ***************************  Picture Placement ********************************

	if (perBrandi.isHere()) {
		if (clvB == 0) perBrandi.showPerson("loungeu" + perBrandi.getSuffix() + ".jpg");
		else perBrandi.showPersonRandom("loungec" + perBrandi.getSuffix(), perBrandi.checkFlag(19) ? 2 : 1);
	} else perKylie.showPerson("lounge.jpg");

	// ***************************  Description ********************************
	addPlaceTitle(md, "Aunt Brandi and Kylie\'s Home");
	md.write(
		'<p>Your aunt and cousin\'s home, a nice residential home,'
	);
	if (isVisible()) {
		md.write(' you were invited into the lounge room when you arrived. Kylie is looking cute as always siting on the couch, well more kneeling there.');
		if (perBrandi.isHere()) {
			if (clvB === 0) md.write(' Aunt Brandi is looking at you pleasantly, she appears to have been doing some housework when you arrive.</p>');
			else if (perBrandi.isNympho()) md.write(' Aunt Brandi is looking at you hungrily, little concealed lust on her face.</p>');
			else md.write(' Aunt Brandi is chained up in a stylised representation of her slavery. She is not really bound as such, except in mind and your orders.</p>');
		} else md.write('</p>');
	} else {
		if (perKylie.isHere()) md.write(' and you see Kylie is looking cute as always siting on the couch.');
		else md.write('. ');
		if (perBrandi.isHere()) {
			if (clvB === 0) md.write(' Aunt Brandi appears to have been doing some housework.</p>');
			else if (perBrandi.isNympho()) md.write(' Aunt Brandi has little concealed lust on her face.</p>');
			else md.write(' Aunt Brandi is chained up in a stylised representation of her slavery. She is not really bound as such, except in mind and your orders.</p>');
		} else md.write('</p>');
	}

	// *************************  Dialogue Options   *********************************
	startQuestions();

	if (isVisible()) {
		if (clvB > 0 && perBrandi.isHere()) addLinkToPlaceM(md, 'ask Aunt Brandi to take you to her bedroom', 402);
		if (perKylie.isHere()) addLinkToPlaceM(md, 'ask Kylie to take you to her bedroom', 401);
		else if (clvB > 0) addLinkToPlaceM(md, 'visit Kylie\'s bedroom', 401);
	}
	addLinkToPlace(md, 'exit the house', 37);

	// Right column images
	if (b2Cols) {
		AddPeopleColumnMed();
		perKylie.showPerson("lounge.jpg");
	}

	WritePlaceFooter(md);
}