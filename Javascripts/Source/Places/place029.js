// Tess Adam's Office

function ShowPlace29()
{
	var md = WritePlaceHeader();

	var perTess = findPerson("Tess");
	var clv = perTess.getCharmedLevel()

	// Image
	if (clv === 0) perTess.showPerson(perTess.checkFlag(1) ? (checkPlaceFlag("Library", 1) ? "tess1b.jpg" : "tess1.jpg") : "tess1c.jpg");
	else perTess.showPerson("tess6.jpg");

	addPlaceTitle(md, clv > 0 ? "Tess Adams Under A Charm Spell" : "Tess Adams");

	// Tess is here
	if (clv === 0) {
		if (!perTess.checkFlag(1)) {
			// haven't spoken w/ Tess at all yet.
			md.write('<p>The crash comes from the far end of the library. You wander over to the office and open the door to see what has caused the noise.</p>');
		}

		if (!perTess.checkFlag(1)) md.write('<p>A pile of discs, along with the rack that held them, have toppled off the desk and onto the floor.</p>');

		md.write(
			'<p>Mrs. Tess Adams turns to you. Everyone knows that Mrs. Adams got her job at the library because her husband has a high position in the local council. She is often seen flitting about the otherwise silent library pushing a trolley of books or resorting the shelves into alphabetical order.</p>' +
			'<p>Ever since the young couple settled into Glendale Mrs. Adams has been the talk of the town. Her outgoing, sweet nature is only surpassed by her awkwardness. It is impossible for anyone who goes to the library to avoid meeting (or bumping into) the charming young lady.</p>'
		);

		if (checkPlaceFlag("Library", 1)) md.write('<p>The door is closed behind you making the office very private.</p>');
		
	} else if (sType == "continue") {
		// After 'order her to stay'
		md.write(
			'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so confused, I feel so much more alive when you are here. It must be the warmth in here. I... I really feel that I have to see my husband and tell him about what I\'m feeling. I have to leave.  Please?"</p>'
		);

	} else {
		if (perTess.checkFlag(8)) {
			// She has been to your bedroom
			md.write(
				'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so glad you\'re back." She pauses and looks at you with love and desire then continues,</p>' +
				'<p>"I\'ve needed you so much since you left but now that you\'re here I feel alive again. It must be the warmth in here."</p>'
			);
		} else {
			md.write(
				'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so glad you\'re back." She pauses and looks at you with confused desire then continues,</p>' +
				'<p>"I\'ve needed you so much since you left but now that you\'re here I feel alive again. It must be the warmth in here. I... I really feel that I have to see my husband and tell him about what I\'m feeling. I have to leave. Please?"</p>'
			);
		}
	}	
	if (perTess.other == 5) md.write('<p>You can see a pile of occult books on her desk, she was working on the research you ordered her to do.</p>');


	//*******************************************************************************
	startQuestions();

	if (clv > 0) {
		// Charmed Path Options
		// Haven't learned "Pass" yet
		if (!perTess.checkFlag(10) && !isSpellKnown("Pass")) addQuestionCO(md, 'tell Tess to look something up for you', "Tess", 2105);
		// Learn a training
		if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

		if (!perTess.checkFlag(8)) addLinkToPlaceC(md, "order Tess to stay", Place, 'type=charmtess2');
		else if (perTess.checkFlag(8)) {
			if (!checkPlaceFlag("Library", 1)) addLinkToPlaceC(md, "close the door for some private time with Tess", 29, 'type=private');
			else addLinkToPlaceC(md, "have some private time with Tess", 29, 'type=private');
		}

		if (perTess.other <= 1) addQuestionC(md, 'tell Tess to stay here and research more magic spells', "Tess", 2001);
		if (perTess.other == 5) addQuestionC(md, 'tell Tess to forget about the research', "Tess", 2005);

		// Receptionist isn't charmed yet?
		var perTitus = findPerson("MsTitus");
		if (!(perTitus.isCharmedBy() || perTitus.isFreeSlave())) addQuestionC(md, 'tell her to invite the library receptionist in here.', "Tess", 2003);
		if (perTess.checkFlag(8)) {
			if (isCharmedBy("Monique") && wherePerson("Monique") == 8) {
				if (perTitus.isCharmedBy() || perTitus.isFreeSlave()) addLinkToPlaceC(md, "bring in all the librarians", 29, 'type=all');
				addLinkToPlaceC(md, "invite Tess to bring in Monique to further assist", 29, 'type=tessmonique');
			}
			if (perTitus.isCharmedBy() || perTitus.isFreeSlave()) addLinkToPlaceC(md, "invite Tess to bring in Ms. Titus to further assist", 29, 'type=tesstitus');
		}

		if (perTess.other <= 2 || perTess.checkFlag(8)) addQuestionC(md, perTess.checkFlag(8) ? 'let\'s return to my home' : 'order Tess to come to your house and wear something sexy', "Tess", 2002);

		addLinkToPlace(md, "go to the reception area.", 3);
		
	} else {
		// Uncharmed
		if (!perTess.checkFlag(1)) addQuestionC(md, '"Can I help you with anything, Mrs. Adams?"', "Tess", 2100);
		else if (!perTess.checkFlag(2)) addQuestionC(md, '"Mrs. Adams, do you know any magic?"', "Tess", 2101);
		else if (perTess.checkFlag(2) && !perTess.checkFlag(10)) {
			// Set to 10 when you learn Pass from her
			addQuestionC(md, '"Mrs. Adams, could you help me look something up?"', "Tess", 2105);
		}
		if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

		if (!checkPlaceFlag("Library", 1)) {
			addQuestionCO(md, 'close the door to Mrs. Adams\' office', "Tess", 6900);
			addLinkToPlace(md, "go to the reception area.", 3);
		} else addLinkToPlaceO(md, "open the door and go to the reception area.", 3, '', '', '', "setPlaceFlag('Library',1,false);");	// Leave the door OPEN when you leave
	}

	WritePlaceFooter(md);
}