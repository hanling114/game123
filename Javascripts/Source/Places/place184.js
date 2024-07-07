// Room 101 at the Hotel, Davy Robbins is here, possibly with Kate
// Confrontation

function BambiDominatesDavy()
{
	perDavy.setFlag(3);
	movePerson("Bambi", 184);		// Move Bambi to room 101
}

function ShowPlace184(stype)
{
	var md = WritePlaceHeader();

	var perKate = findPerson("Kate");
	var bKateCharmed = perKate.isCharmedBy("Davy");

	setPlaceFlag("Hotel", 8);		// Fallback in case the seance path has not started

	if (perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7) && !perDavy.checkFlag(8))) {
		// Davy is unconscious still
		perDavy.showPerson("davy8.jpg");
		addPlaceTitle(md, "Davy Unconscious in Hotel Room 101");
		md.write('<p>You see Davy is lying on the bed, still unconscious from Kate\'s blow.</p>');

		startQuestions();
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (isDavyDefeated()) {
		// Davy is here and restrained
		perDavy.showPerson("davy3.jpg");
		addPlaceTitle(md, "Davy Restrained in Hotel Room 101");
		md.write('<p>You see Davy is still tightly restrained, unable to speak or move, Bambi is a very good rigger.</p>');

		startQuestions();
		if (!perYou.isMaleSex() && perDavy.checkFlag(4)) addLinkToPlace(md, 'train Davy some more', 184, 'type=training');
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	// -------------------
	// Davy and/or charmed Kate in room 101
	// -------------------
	} else if (stype == "plan") {
		// Stopped Kate to plan a confrontation
		perKate.unCharmThem();
		perKate.showPerson("kate15a.jpg");
		addPlaceTitle(md, "Planning with Kate");

		md.write(
			'<p>You quickly stop Kate before she runs head-long into confront Davy, she looks at you annoyed,</p>' +
			'<p>"Not now, I need to punish an arsehole!"</p>' +
			'<p>You tell her that we need to work out how the confront him safely, he has controlled Kate before. She looks a little less certain'
		);
		if (perKate.checkFlag(15)) {
			md.write(' but then touches the silver necklace and says, "But I am safe with this, right!", you cannot argue this and she just runs towards Davy\'s room, and you follow after her');
			startQuestions();
			addLinkToPlace(md, 'follow Kate', 267, 'type=kick');
		} else {
			md.write('</p>');
			startQuestions("What will you both do?");
			startAlternatives(md);
			addTextForQuestions(md, "<b>Kate suggests</b>", "center");
			addLinkToPlaceC(md, '"I\'ll run in and kick him before he can say a word!"', 267, 'type=kick');
			addTextForQuestions(md, "<b>You suggest</b>", "center");
			addLinkToPlaceC(md, '"Let me go first and talk to him, you follow and kick him when I have him distracted"', 184, 'type=distract');
			if (perYourBody.FindItem(32) > 0 || perYourBody.FindItem(33) > 0)	addLinkToPlaceC(md, '"I\'ll take him out!"', 184, 'type=mechoose');
			if (isCharmedBy("Bambi")) addLinkToPlace(md, 'get Bambi to distract Davy with some room-service', 184, 'type=roomservice');
			endAlternatives(md);
		}
		addLinkToPlace(md, 'go back to the bar', 124, '', 'As you leave Kate looks pissed off at your apparent cowardice! and runs toward the room Davy is in', 'Kate', "setPersonFlag('Kate',4);movePerson('Kate', 4);");
		WritePlaceFooter(md);
		return;

	} else if (perKate.place == 184 && !bKateCharmed) {
		// Kate ran in and confronted Davy on her own AND is NOT wearing the necklace
		// Variation of default below
		perKate.showPerson("kate12b.jpg");
		addPlaceTitle(md, "Hotel Room 101");
		md.write(
			'<p>You step into room 101, and you see Kate has removed her clothes and is looking lustfully at Davy. She turns to you and says,</p>' +
			'<p>"Hello,have you come to join in the fun?"</p>');

		startQuestions();
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	addLinkToPlace(md, 'interrupt Davy\'s fun', 184, 'type=interrupt');
		else addLinkToPlace(md, 'interrupt Davy\'s fun', 990);

	} else if (perKate.place == 184 && !bKateCharmed && perKate.checkFlag(15)) {
		// Kate ran in and confronted Davy on her own AND is wearing the necklace
		dispPlace(267);
		return;

	} else if (stype === "" && bKateCharmed) {
		// Davy and Kate are here, Kate is charmed
		perKate.showPersonRorX("kate12a.jpg");
		addPlaceTitle(md, "Hotel Room 101");
		md.write(
			'<p>You stumble into room 101.  Kate and Davy are on the bed, <i>in flagrante delicto</i>.  The bed is shaking.</p>' +
			'<p>"Hello," says Kate, smiling a welcome to you. "Have you come to join in the fun?"</p>');

		startQuestions();
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	addLinkToPlace(md, 'interrupt Davy\'s fun', 184, 'type=interrupt');
		else addLinkToPlace(md, 'interrupt Davy\'s fun', 990);

	} else if (stype == "interrupt") {
		// Davy and Kate are here and you tried to interrupt them AND you are protected
		if (isExplicit()) perKate.showPersonX("kate13.jpg");
		else perKate.showPerson("kate12a.jpg");
		addPlaceTitle(md, "Hotel Room 101");
		md.write('<p>Davy looks angry as you intrude on his activity. "You are really beginning to annoy me," he says, then you hear him whisper <i>"Dai Chu ' + perYou.getPersonName() + '"</i>.</p>');
		if (perYourBody.FindItem(46) > 0) md.write('<p>You feel a pulse of warmth in your bracelet.</p>');
		else md.write('<p>You feel a pulse of warmth from your necklace.</p>');
		md.write('<p>It takes him a moment to realize the spell didn\'t work, and you are sure you see a flash of fear in his eyes before his bravado reasserts itself.  "I\'ll give you one minute to get out of this room and leave me and my bitch alone."</p>');

		startQuestions();

	}	else if (stype == "distract") {
		// You distract him and she kicks him
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			perDavy.showPersonFace();
			addPlaceTitle(md, "Take Davy Out");
		} else {
			if (perYou.folder.indexOf("Nobody") != -1) perKate.showPerson("kate17b.jpg");
			else perYou.showPerson("charmedbydavy-start.jpg");
			addPlaceTitle(md, "Kate\'s Slave");
		}

		md.write(
			'<p>You enter the room and confront Davy, with the ideal of distracting him while Kate attacks. You tell him "Davy, you are a fool, I have taken you slaves, and I have the book, you are nothing!"</p>' +
			'<p>Davy looks angry as you intrude on his activity. "Rubbish!" he says, then you hear him whisper <i>"Dai Chu' + perYou.getPersonName() + '"</i>.</p>'
		);
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			md.write('<p>The spell has no effect on you and Davy looks very afraid...</p>');

			startQuestions();
			addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=you');

		} else {
			md.write(
				'<p>You feel a rush as the spell washes over you and you feel a surge of arousal. As you are becoming lost to the spell there is a blur as Kate runs in a drop-kicks Davy.</p>' +
				'<p>You look over at the scene, your mind a fog of arousal, and Kate looks at you annoyed, "Well you were useless, what good are you?"</p>' +
				'<p>You reply "Anything you want Mistress" and mean it as the spell locks you to the service of your beautiful mistress.</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return;
		}

		AddPeopleColumn();
		perKate.showPerson("kate15a.jpg");

		WritePlaceFooter(md);
		return;


	} else if (stype == "mechoose") {
		// You do it yourself using the ring/bottle

		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			perDavy.showPersonFace();
			addPlaceTitle(md, "Take Davy Out");
		} else {
			perYou.showPerson("charmedbydavy-start.jpg");
			addPlaceTitle(md, "Kate\s Slave");
		}

		md.write(
			'<p>You enter the room with the intention of dealing with Davy yourself, Kate discretely follows you, waiting at the doorway.</p>' +
			'<p>Davy looks angry as you intrude on his activity. "You are really beginning to annoy me," he says, then you hear him whisper <i>"Dai Chu ' + perYou.getPersonName() + '"</i>.</p>'
		);
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			md.write('<p>The spell has no effect on you and Davy looks very afraid...</p>');

			startQuestions();
			addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=you');
			AddPeopleColumn();
			perKate.showPerson("kate15a.jpg");
			WritePlaceFooter(md);
			return;

		} else {
			md.write(
				'<p>You feel a rush as the spell washes over you and you feel a surge of arousal. As you are becoming lost to the spell there is a blur as Kate runs in a drop-kicks Davy.</p>' +
				'<p>You look over at the scene, your mind a fog of arousal, and Kate looks at you annoyed, "Well you were useless, what good are you?"</p>' +
				'<p>You reply "Anything you want Mistress" and mean it as the spell locks you to the service of your beautiful mistress.</p>'
			);
			addRestartLink(md);
			AddPeopleColumn();
			perKate.showPerson("kate15a.jpg");
			WritePlaceFooter(md);
			return;
		}

	}

   addLinkToPlace(md, 'go back to the bar', 124, '', 'You leave Davy and Kate, and it seems likely that they will flee, given how fearful Davy has been of you', '', "perDavy.place = 9999;movePerson('Kate', 9999);");

	WritePlaceFooter(md);
}