// Place: History Classroom

function ShowPlace10()
{
	var md = WritePlaceHeader();

	var perMonique = findPerson("Monique");
	var myName = perMonique.getYourNameFor();
	var perAbby = findPerson("Abby");
	var bMoniqueHere = isShopOpen(2) && perMonique.place == 10;

	// Images
	if (bMoniqueHere) perMonique.showPerson("monique9.jpg");	// Is Monique in the classroom
	else addPlaceImage(md, "classroom1.jpg", "", "", "History Classroom");

	// Title
	addPlaceTitle(md, "History Classroom");
	if (bMoniqueHere) addPlaceImage(md, "classroom1.jpg", "15%", "left", "History Classroom");
	
	// Description
	var s1;
	if (perYou.getExperience() < 1) s1 = 'The classroom is deserted; everyone has gone home for the day. You look around for something to help your quest. Some papers are scattered on the teacher\'s desk and books are in the bookcase.<br><br>  You hear some footsteps outside in the corridor and you tense. It would not do you any good to be found snooping around school without a teacher present. After what seems like minutes the footsteps pass by, then fade out.';
	else s1 = 'The classroom is deserted; everyone has gone home for the day.';

	var s2 = '';
	if (!bMoniqueHere && isDay()) {
		s2 = '</p><p>As you sneak back to the classroom, you hear some voices in the room next door. Putting your ear to the wall you hear them speaking about strange happenings in Glenvale.';
		if (perYourBody.FindItem(4) > 0) s2 += '  You are not sure whether they\'re talking about what you have done. <br><br>You realize that if the townsfolk find out that you have the book, then you will be in grave danger. It is becoming urgent that you find more magic or rid yourself of the book as quickly as possible.<br><br>The voices fade away, leaving you with an uneasy feeling.';
	}

	addPlaceDescription(md, s1, s2, "HistoryClassroom", 17);
	if (bMoniqueHere) md.write('<p>You are startled by a noise at the front of the room. Somebody lifts their head over the teacher\'s desk. You are relieved when you realize that it\'s just Monique.</p>');

	if (!checkPlaceFlag("HistoryClassroom", 8)) {
		setPlaceFlag("HistoryClassroom", 8);
		md.write('<p>You return the Stears letter you found, probably stolen by Davy Robbins.</p>');
	}

	if (whereItem(1) == Place) {
		// Hint for Beasley's Paper
		md.write(
			'<p>The top-most paper, <b>at the top right</b> has Mr Beasley\'s name printed in bold and it about the events of the Kurndorf cult. This paper should contain valuable details for your research to find the book. You should <b>pick it up</b> and take it somewhere to study with many <b>reference books</b></p>' +
			'<p><i>Reminder you pick up items by clicking on the icon <img src="UI/themes/theme1/pickup.png" style="max-width:40px;height:1em;margin-right:2px" title="Pick Up" alt="Pick Up"> or link next to the item. You use or give them to another person using the inventory.</i></p>'
		);
		showHintIcon("pickupicon1", "Pickup", true, 100);
	}
	
	startQuestionsNP();

	// Books you can find
	if (!bMoniqueHere) addLinkToPlaceO(md, "examine the books in the bookcase", 12, '', '', 'passTime(true,2)');
	showQuestionsPeople(md);		// Add custom person actions here, should normally be extra books
	if (bMoniqueHere) addLinkToPlaceO(md, "examine the books in the bookcase", 12, '', '', 'passTime(true,2)');
	if (checkPlaceFlag("HistoryClassroom", 8)) addLinkToPlaceO(md, "re-read the letter from Mrs. Stears", 12, 'type=stears');
	if (checkPlaceFlag("HistoryClassroom", 5)) addLinkToPlaceO(md, "re-read 'The Settlement of Glenvale'", 12, 'type=settlement');
	if (checkPlaceFlag("Crypt", 2)) addLinkToPlaceO(md, "re-read 'The Death of Kurndorf'", 12, 'type=crypt');
	if (perAbby.getQuestDragonGem() > 0) addLinkToPlaceO(md, "re-read 'The Gem of the Dragon'", 12, 'type=gem');
	if (checkPlaceFlag("HistoryClassroom", 6)) addLinkToPlaceO(md, "re-read 'Greek Mythology'", 12, 'type=greek');
	if (checkPlaceFlag("HistoryClassroom", 9)) addLinkToPlaceO(md, "re-read 'Rituals under the Broken Inn'", 12, 'type=rituals');
	if (checkPlaceFlag("HistoryClassroom", 10)) addLinkToPlaceO(md, "re-read 'Following the Water'", 12, 'type=bookhydromancy');
	if (checkPlaceFlag("HistoryClassroom", 11)) addLinkToPlaceO(md, "re-read 'Pharmakopoeia'", 12, 'type=bookpharma');
	if (checkPlaceFlag("HistoryClassroom", 12)) addLinkToPlaceO(md, "re-read 'Witches of Pennsylvania'", 12, 'type=bookwitches');
	// Books are DONE ************************

	addLinkToPlace(md, "exit the room?", 70);

	WritePlaceFooter(md);
}