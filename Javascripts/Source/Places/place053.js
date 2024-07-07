// Place: Hidden Room

function ShowPlace53(stype)
{
	var md = WritePlaceHeader(false, stype == "look" ? "" : "td-left-med");

	var perMonique = findPerson("Monique");
	var perAbby = findPerson("Abby");
	var perSera = findPerson("Seraphina");

	if (stype == "look") {
		// Looking in the mirror
		addPlaceTitle(md, "Looking in the Mirror", "mirror.jpg");
		md.write('<p>You look in the mirrors and for a moment you do not even see your own reflection, but you realise it is just a matter of angles. You see your own reflection');
		var cor = perYou.getCorruption();
		if (cor < 5) md.write(' and it is clear and bright despite the dark colouring of the mirrors');
		else if (cor < 10) md.write(' and it is little odd, slightly distorted, the mirrors must have an imperfect surface');
		else if (cor < 20) md.write(' and it is distorted with an odd sort of faint double image, almost like there is someone standing behind you');
		else md.write(' and it is distorted with an odd double image, it looks almost like the ghostly image you have seen of Kurndorf');
		md.write(
			'<p>You look away a little bit creeped out. As you do you swear you saw the statue twist and look at you, but you quickly look and it is fixed in the same place as always, still <b>not reflecting</b> in the mirrors.</p>'
		);
		startQuestions();
		addLinkToPlace(md, 'look away', 53);

	} else {

		// General visits
		setPlaceKnown("HiddenRoom", false); // Have entered the Secret Room
		var img = whereItem(35) == -53 ? (whereItem(48) == -53 ? "hiddenroom1c.jpg" : "hiddenroom1b.jpg") : "hiddenroom1a.jpg";
		if (!perSera.isHere()) addPlaceImage(md, img, "", "", "Hidden Room");
		if (perMonique.isHere()) {
			// Monique is here (Hellgate Path)
			perMonique.showPersonFace();
		}

		// **** Description ****
		addPlaceTitle(md, "Hidden Room");
		md.write('<p>You enter a strange room with an unusual Asian style dragon sculpture perched upon a pedestal. ');
		if (whereItem(35) == -53) md.write('One of the eyes of the statue is filled with the dragon gem, the other is empty.');
		else md.write('You notice the eyes of the statue are empty sockets.');
		md.write(' Lining the walls are large tinted mirrors that reflect the room darkly. ');
		if (checkPersonFlag("Victoria", 9) || perLilith.checkFlag(2)) md.write('You now know these are called the \'Mirrors of the Soul\'. ');
		md.write('To your great discomfort you see the sculpture <b>does not reflect</b> in any of the mirrors.</p>');
		if (!checkPlaceFlag("Alley", 8)) md.write('<p>You have a feeling there is something in the room, odd reflections in the mirrors and shifting shadows. Whatever it is you can never quite see it.</p>');
		else md.write('<p>There are still odd reflections and shifting shadows, but you can now see they are all centered on the statue in some way.</p>');
		if (!isSpellKnown("Charm")) {
			// Don't Know Charm Spell Yet
			md.write('As you examine the room you see a note scribbled onto the frame of one of the mirrors.</p>');
		}

		if (perMonique.isHere()) {
			// Monique is here
			md.write('<p>Monique greets you. "I can\'t find any magic ' + perYou.getMaster() + '. Please forgive me."');
		}

		// **** Choices ****

		startQuestions();
		addLinkToPlace(md, 'look in the mirrors', 53, 'type=look');

		if (!isSpellKnown("Charm")) {
			// Don't Know Charm Spell Yet
			if (isRunes()) addOptionLink(md, 'examine the note', "Research(\'Spell\', \'DaiChu\');");
			else {
				md.write(
					'<p style="text-align:center">What are the strange words in the note?<br>' +
					'<form method="POST" name="FormChar" style="text-align:center"><input type="text" size="20" name="research"> <input type="button" name="button" value="enter" onClick=ResearchOLD(\"H\",document.FormChar.research.value)></form></p>'
				);
			}
		}
		if (perMonique.isHere()) addQuestionCO(md, 'tell Monique to look up the library files for Davy', "Monique", 1105);
	}
	if (whereItem(48) == -53) addOptionLink(md, "remove the relic", "perYourBody.PutItem(48);gotoPlace(53)");
	if (isPersonHere("Leanne")) addOptionLink(md, "say goodbye to Leanne for now", "movePerson('Leanne',450);gotoPlace(53)");		// Fallback for old saves
	addLinkToPlace(md, 'exit the room?', 52);

	WritePlaceFooter(md);
}