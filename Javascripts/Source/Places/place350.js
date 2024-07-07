// Yoga Shop

function ShowPlace350()
{
	var md = WritePlaceHeaderNI();
	
	var perCherry = findPerson("Cherry");
	var perVictoria = findPerson("Victoria");
	var clv = perCherry.getCharmedLevel();
	var med = perYou.checkFlag(29) && !perYou.checkFlag(61);
	var mednew = med && !perCherry.checkFlag(37);

	/*  PICTURE REFERENCES */
	if (clv === 0) {
		//NOT CHARMED
		if (!isShopOpen(-1, 1, true)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The antiques ' + getShopStore() + ' closes and Cherry asks you to leave.');
		perCherry.showPerson("cherry1u.jpg");
		
	} else {
		// Charmed and not an event
		if (mednew) perCherry.showPerson("cherry1u.jpg");
		else perCherry.showPersonDN("cherry1c" + perCherry.getSuffix() + ".jpg");
	} 

	/* TITLE LINE */
	addPlaceTitle(md, "Chakra Chachkies " + getShopStore(true));
	if (isShopOpen(-1, 1, true)) AddImage("cherryitems.jpg", "20%", "right");

	/* Description */
	addPlaceDescription(md, 
		'The Chakra Chachkies ' + getShopStore(true) + ' looks like a quaint little ' + getShopStore() + ' in an older building.', 
		'On the inside you see a modern looking yoga studio with a small area selling a variety of new age items, with a definite emphasis on crystals.' +
		(isVisible() && clv != 0 ? '</p><p>Only people who are interested in yoga or new age crystal power visit here, and it seems there are few such people in Glenvale. The studio stands mostly empty during the day, only one or two costumer stop by.' : ''),
		"NewAgeStore", 5
	);
	
	if (isVisible()) {
		if (!perCherry.checkFlag(8) && !perCherry.isCharmedBy()) {
			//haven't met yet
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<pYou see over in the yoga studio a woman ' + (mednew ? 'meditating' : 'doing stretching exercises') + '.. She looks up and approaches you.   "Hello, can I help you with something today?"</p>'
			);
		} else if (clv === 0) {
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<p>You see Cherry ' + (mednew ? 'meditating' : 'doing yoga exercises') + '.  She looks up as you approach and smiles.</p>'
			);
		} else {
			//CHARMED
			if (med) md.write('<p>You notice Cherry is mediating when you enter the store.</p>');
			else if (clv == 3) {
				md.write(
					'<p>When your lover Cherry sees you enter she removes much of what she is wearing, her lust rising as you approach. You and not completely sure this is because of the spell! She says "Hello lover. I\'m so glad you\'re here, let\'s get sweaty together!"</p>'
				);				
			} else {
				md.write(
					'<p>Your lovely slave Cherry is here and she bows to you as you enter and says, "Hello, ' + perYou.getMaster() + '. I\'m so glad you\'re here. Is there <i>anything</i> I can do for you?"</p>' +
					'<p>She really seems to have embraced the slave role and mentality with a passion, probably more than the spell would normally do!</p>'
				);
			}
		}
	} else md.write('<p>You see Cherry ' + (isNight() ? 'sitting and reading' : (mednew ? 'meditating' : 'doing some yoga exercises')) + '.</p>');

	if (!isShopOpen(-1, 1, true)) {
		md.write('<p>You notice the small shop display is covered over, if you wish to browse there it would be best to return in the morning when she sets things back up again.</p>');
		startQuestions();
	} else {
		md.write(
			'<p>You look at the items for sale, many are more like souvenirs or ornaments, not worth your attention. ' +
			'There are some items more interesting <b>a Dream Catcher</b>, <b>a Crystal Diffuser</b>, '
		);
		if (isItemHere(71)) md.write('<b>a Pyrite Pendant</b> (only one is available), ');
		if (isItemHere(72)) md.write('<b>an Egyptian Idol</b> (only one is available), ');
		md.write('the remaining items are not of interest to you</p>');
		if (mednew) perCherry.setFlag(37);

		// Shoppng Options
		if (!isInvisible() && perCherry.checkFlag(8)) {
			startQuestionsOnly("Items for sale");
			if (!perCherry.checkFlag(10)) addQuestionC(md, 'ask about the Dream Catcher', "Cherry", 3000);
			else addQuestionC(md, 'buy a Dream Catcher ' + sCurrency + '10', "Cherry", -3001, 'travelblock');
			if (!perCherry.checkFlag(11)) addQuestionC(md, 'ask about the Crystal Diffuser', "Cherry", 3002);
			else addQuestionC(md, 'buy a Crystal Diffuser ' + sCurrency + '15', "Cherry", -3003, 'travelblock');		
			if (!perCherry.checkFlag(12)) addQuestionC(md, 'ask about the Pyrite Pendant', "Cherry", 3004);
			else if (isItemHere(71)) addQuestionC(md, 'buy a Pyrite Pendant ' + sCurrency + '45', "Cherry", -3005, 'travelblock');
			if (!perCherry.checkFlag(13)) addQuestionC(md, 'ask about the idol', "Cherry", 3006);
			else if (isItemHere(72)) addQuestionC(md, 'buy the Nehebkau Idol ' + sCurrency + '95', "Cherry", -3007, 'travelblock');
			if (med) {
				if (!perCherry.checkFlag(38)) addQuestionC(md, 'ask about learning to meditate', "Cherry", 3008);
				else addQuestionC(md, 'ask Cherry to teach you to meditate', "Cherry", 3009);
			}		
			bQuestionsShown = false;
		}

		// Dialogue Options
		startQuestions(undefined, 'br');
	}
	addLinkToPlace(md, 'leave the ' + getShopStore(), 344);

	WritePlaceFooter(md);
}