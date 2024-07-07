// Robbins House

function isTrapped()
{
	if (perYou.isBornMale()) return false;
	else if (!isCharmedBy("MrsRobbins", "Davy")) return false;					//  Mrs Robbsin FREED from Davy
	else if (nMana >= 10 && isSpellKnown("Charm")) return false; 	// have 10 mana, know the charm spell
	else if (nMana >= 1 && isSpellKnown("Teleport")) return false;		// have 1 mana and know teleport
	else if (nMana >= 3 && isSpellKnown("Pass")) return false;		// Cast Pass, Learn Teleport, and TP out
	else if (perYourBody.FindItem(32) > 0) return false;				//  Has the Silver Ring
	else if (isSpellKnown("Pass") && nMana > 1) return false;		// Know Pass and have 2 mana
	else if (isSpellKnown("Invisibility") && nMana > 4) return false;		// Know Invis and have 5 mana
	return true;
}

function ThrownToBedroom()
{
	setPlaceFlag("RobbinsHouse", 9, false);  // Resets the "Tried to walk out the front door" flag
}

function ShowPlace176()
{
	var perTina = findPerson("Tina");
	var perSister = findPerson("Tracy");
	var perMayor = findPerson("Mayor");
	var perGeraldine = findPerson("MrsRobbins");
	var clvG = perGeraldine.getCharmedLevel();
	var bDCharm = perGeraldine.isCharmedBy("Davy");
	var bTinaAwake = perTina.isCharmedBy() && (!perTina.isVampyre() || (perTina.checkFlag(5) && !(perTina.isVampyre() && (isDay() || !perTina.checkFlag(6)))));
	var bHereG = perGeraldine.isHere();

	var b2Cols = bHereG && (perMayor.place == 176 || perSister.place == 176 || (!isDay() && perTina.isVampyre() && !perTina.checkFlag(5)));

	var md = WritePlaceHeader(false, b2Cols ? "td-left-small" : "");

	// ***************************** Updates ******************************************
	if (perSister.place == 176 && !perSister.isCharmedBy("Davy")) perSister.place = 1;
	if (isCharmedBy("Ellie", "You") && wherePerson("Ellie") == 81) movePerson("Ellie", 420);		// Move Charmed Ellie to her home
	if (perGeraldine.isCharmedBy("You") && perTina.isCharmedBy() && perTina.whereNow() == 82) {
		setPlaceKnown("TinasRoom");
		perTina.moveThem(83);
	}

	// ***************************  Picture Placement ********************************
	if (bHereG) {
		if (perGeraldine.isCharmedBy("You") && (perTina.isCharmedBy() && perTina.place != -1 && perTina.isHere() && !perTina.isVampyre())) perTina.showPeople(perGeraldine, "robbins8b.jpg");	// Both Charmed
		else if (perGeraldine.isCharmedBy("You")) perGeraldine.showPerson(clvG == 4 ? "homecharmsexg.jpg" : "homecharm3.jpg");	// Just Mom Charmed
		else perGeraldine.showPerson(bDCharm ? "home1cd.jpg" : "home1u.jpg");	// Mom not charmed by YOU
	} else if (bTinaAwake) {
		if (!isDay() && perTina.isVampyre() && perTina.checkFlag(6)) perTina.showPersonRandom("tina11night", 2);
		else if (!perTina.isVampyre()) perTina.showPerson("tina10.jpg");
	}


	// ***************************  Description ********************************
	addPlaceTitle(md, "Robbins\' Residence", bHereG || bTinaAwake ? "" : "livingroom8.jpg");
	if (perDavy.whereNow() == 81) perDavy.showPerson("home1-" + (perDavy.checkFlag(18) ? "bound" : "free") + ".jpg", "25%", "left");
	md.write('<p>The Robbins\' Residence at 36 Yoolaroo Drive is the address of the Mr and Mrs Robbins and their children Davy and Tina. Situated in the pleasant neighbourhood, the Robbins make sure that they keep their house tidy.</p>');

	// *************************  Dialogue Options   *********************************
	startQuestions();

	if (bTinaAwake && perTina.place != -1) addLinkToPlace(md, "'talk' to Tina in her bedroom", 83);
	else if (isPlaceKnown("TinasRoom")) addLinkToPlace(md, 'visit Tina\'s room', 83);

	if (isPlaceKnown("DavysRoom") && perGeraldine.isCharmedBy("You")) {
		//Have been to Davy's Room but NOT learned spell
		if (bHereG) addLinkToPlace(md, perTina.checkFlag(1) ? 'visit Slave Geraldine\'s bedroom' : "check the bedroom", 82);
		if (perDavy.whereNow() == 81) addLinkToPlace(md, 'take Davy to ' + perDavy.getHisHer() + ' room', 81);
		else addLinkToPlace(md, 'visit Davy\'s room', 81);
	}
	//  if (female) and Mrs Robbins still charmed then you CAN NOT LEAVE   ( Add way to get out )
	if (!perYou.isBornMale() && bDCharm) addLinkToPlace(md, 'exit the house', 82, '', '', '', 'ThrownToBedroom()');
	else addLinkToPlace(md, 'exit the house', 43);

	//  is TRAPPED, and have already been thrown into the room once.
	if (isTrapped() && checkPlaceFlag("RobbinsHouse", 9)) addLinkToPlace(md, 'hit Mrs Robbins with a frying pan and run out of the house', 43);

	// Right column images
	if (b2Cols) {
		AddPeopleColumnMed();
		if (!isDay() && perTina.isVampyre() && perTina.checkFlag(6)) perTina.showPerson("tina-stopped.jpg");
		if (perMayor.place == 176) {
			// Is the Mayor Here
			if (!perMayor.isCharmed()) perMayor.showPerson("mayor2.jpg");	// Is she charmed
			else perMayor.showPerson("mayor2a.jpg");
		}
		if (perSister.place == 176) perSister.showPerson(perMayor.place != 176 ? "atrobbins.jpg" : "tracy-faceu.jpg");	// Is your sister Tina here
	}

	WritePlaceFooter(md);
}