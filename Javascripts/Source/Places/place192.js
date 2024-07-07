// Sarah Gates' Room

function ShowPlace192(stype)
{
	var bMurder = isMurderPath();
	var perMiku = findPerson("Miku");
	var perLauren = findPerson("Lauren");
	if (perLauren.dress == "") perLauren.dress = "Shay";	
	var bLauren = perLauren.isHere();
	var perSarah = findPerson("Sarah");
	var bCharmed = perSarah.isCharmedBy();
	if (!bCharmed) endInvisibility();
	var myName = perSarah.getYourNameFor();
	if (perSarah.place == 17) perSarah.place = 192;

	if (whereItem(41) == 293) moveItem(41, 192);	//Left the aftane in the room with the safe, move it here for you to pick up
	if (perYou.getQuestAftane() == 3 && bCharmed && bMurder) {
		//You asked her about the Aftane before charming her
		perYou.setQuestAftane(1);					// Reset the Aftane path so you can ask her again
	}
	if ((bCharmed || isConspiracyPath()) && whereItem(4) == 998)  moveItem(4, 999);
	var bAfter = perSarah.place == 192 && (Math.floor(perSarah.other) == 114 || Math.floor(perSarah.other) == 117 || Math.floor(perSarah.other) == 120);

	if (bLauren || perLilith.isHere()) SetLeftColumnSize("small");
	var md = WritePlaceHeader();
	
	//**********************  Picture Placement *********************
	if (perMiku.other == -3) addPlaceImage(md, "mansionlibrary.jpg");
	else if (bAfter) perSarah.showPerson("attendinga.jpg");
	else if (bCharmed) perSarah.showPersonDN("sarah7.jpg");
	else if (bMurder) perSarah.showPerson("sarah1a.jpg");
	else perSarah.showPersonDN(perSarah.isLover() ? "sarah13.jpg" : "sarah12.jpg");

	//*********************  Description ****************************
	if (bMurder) addPlaceTitle(md, "Gates Mansion");
	else addPlaceTitle(md, "Sarah Gates's Room");

	if (isConspiracyPath()) {
		// Later meetings with Sarah on the conspiracy path
		// No content except vampire stuff currently
		if (nFromPlace != 192) md.write('<p>You knock on the door to Sarah Gate\'s room and she brightly asks you to enter.</p>');

		if (whereItem(25) == 999 || whereItem(21) == 999) // Lost when shot
		{
			md.write('<p>"' + perYou.getPersonName() + '! I am so glad you are alright.  I visited you in the hospital but you were still in intensive care.  Here, the police brought a few things from when you were shot, I was able to keep them from Uncle Ronnie.</p>');
			if (whereItem(25) == 999) moveItem(25); // put the wooden box here.
			if (whereItem(21) == 999) moveItem(21); // put the blue key here
		}

	} else if (bCharmed) {
		// CHARMED
		if (isInvisible()) {
			md.write(
				'<p>You see Sarah reading an occult book, and Lauren nearby dusting a shelf.</p>' +
				'<p>You see Lauren directly looking at you a few times, somehow she knows you are here!</p>'
			);
		} else {
			md.write('<p>Sarah Gates is so glad to see her One True ' + perYou.getMaster() + '. She grovels before you, begging for attention.</p>');

			if (perLauren.flags[0] === 0)	{
				if (whereItem(40) == 192) md.write('<p>"This wine looks very delicious.  Thank you, ' + perYou.getMaster() + '. Would you like me to call the maid to open it?" Sarah asks.</p>');
				else if (perYourBody.FindItem(40) > 0) md.write('<p>"Oh yes, ' + myName + '," says Sarah. "I see that you brought me a special wine. Please give it to me so we can celebrate my new role as your faithful, loyal, devoted, and oh so <i>willing</i> slave."</p>');
				else md.write('<p>"' + perYou.getMaster() + '," says Sarah. "I am so thirsty... if only we had a bottle of wine, I could serve you properly..."</p>');
			}
			else md.write('<p>"Thank you for the wine, ' + perYou.getMaster() + '. Is there any <i>other</i> way that I may serve you?"</p>');

			if (perSarah.checkFlag(1) && !isSpellKnown("Clairvoyance")) md.write('<p>"Oh darling," she says in a husky tone. "I can teach you something I know you would like. A spell, so powerful that it will lead you to places no other can go."');

			if (whereItem(25) == 999 || whereItem(21) == 999) // Lost when shot
			{
				md.write('<p>"' + perYou.getMaster() + '! I am so glad you are alright.  I visited you in the hospital but you were still in intensive care.  Here, the police brought a few things from when you were shot.</p>');
				if (whereItem(25) == 999) moveItem(25); // put the wooden box here.
				if (whereItem(21) == 999) moveItem(21); // put the blue key here
			}
		}
	} else {
		// NOT CHARMED
		if (bMurder) {
			// Murder Path
			md.write('<p>You enter the Gates\' Mansion to see a elegant young lady, sitting on the floor. You recognise her from her from the paper. It is Sarah Gates, the richest lady in Glenvale.</p>');
			if (perSarah.other === 1) md.write('<p>She is obviously distressed by the departing of her uncle Ronald. Drying tears away she looks up to see you. \"Who are you?\" she asks in a sweet, if wearied voice. \"Do you know what happened to Uncle Ronny?\"</p>');

		} else {
			// Apprentice Path
			if (perSarah.place == 192 && (perSarah.other == 114 || perSarah.other == 117 || perSarah.other == 120)) md.write('<p>Sarah sits up after Lauren finishes \'attending\' her, still partially unclothed. Lauren stand nearby looking acutely uncomfortable.</p>');
			else if (nFromPlace != 192) {
				if (!perSarah.isLover()) md.write('<p>You knock on the door to Sarah Gate\'s room and she brightly asks you to enter.</p>');
				else md.write('<p>You enter Sarah Gate\'s room and you see your lovers? Sarah and Lauren. They both adjust their clothing to be \'more comfortable\'.</p>');
			}
			if (perSarah.extra[1] > 2) md.write('<p>While Sarah is happy to chat it is only about inconsequential things' + (perSarah.isLover() ? ' but she is interested in more fun things' : ' and she seems unwilling to do anything else') + '.</p>');
		}
	}
	if (perLauren.flags[0] == 1) {
		md.write(
			'<p>With a brisk, set pace a woman enters the room to open the dark bottle of wine. For the first time you notice that the label seems old and faded.  Most likely a rather rare and expensive wine, and very good as well. With practiced grace she lifts the bottle and pours out the appropriate amounts, filling the flute with a deep red liquid, almost as if blood poured for the lips of her mistress. After setting the wine down carefully upon the table, she takes hold of the slender shaft of a feather duster and waits for permission to leave.</p>' +
			'<p>When you turn your eyes upon her, she seems to lightly tilt her head and look away not seeming to care about your presence one or another, simply tolerating you for the moment. However, your eyes tend to stray to the shiny material of uniform, done in the classic cut of a French maid, with the appropriate touches of frilly lace, high heels and stockings, but, done in latex instead of the usual cotton or silk. Upon her release, she quickly turns and makes her way back into a guest rooms.</p>'
		);
	}

	//****************************** Dialogue Options  ***********************************
	startQuestions();
	
	// Charm Lauren options
	if (perLauren.flags[0] == 1) addLinkToPlace(md, 'follow the maid to the guest rooms', 290, '', '', '', '', 'moveblock');
	else if (perLauren.checkFlag(3)) addLinkToPlace(md, 'go to the guest room', 290, '', '', '', '', 'moveblock');

	// Leaving
	if (!isConspiracyPath() && !bMurder) {
		addLinkToPlace(md, 'leave Sarah\'s room', 18, 'area=upstairs', '', '', '', 'moveblock');
		addLinkToPlace(md, 'go downstairs', 18, '', '', '', '', 'moveblock');
	} else if (bMurder && bCharmed) addLinkToPlaceM(md, "visit the basement", 19);
	addLinkToPlace(md, 'exit the house', 16);

	if (perLilith.isHere() && bLauren) {
		AddPeopleColumnLarge(md);
		perLauren.showPersonDN("lauren1" + (perSarah.isLover() ? "d" : "a") + "2col.jpg", "47%");			
	} else if (bLauren) {
		AddPeopleColumnMed(md);
		perLauren.showPersonDN("lauren1" + (perSarah.isLover() ? "d" : "a") + ".jpg");
	}

	WritePlaceFooter(md);
}