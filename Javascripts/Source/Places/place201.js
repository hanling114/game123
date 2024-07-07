// Antiques & Artifacts Shop

function ShowPlace348()
{
	var perVictoria = findPerson("Victoria");
	var clv = perVictoria.getCharmedLevel();
	var bStartEvent2 = (clv == 2 && (!perVictoria.checkFlag(10) || !perVictoria.checkFlag(11) || !perVictoria.checkFlag(12) || !perVictoria.checkFlag(13) || !perVictoria.checkFlag(14)));
	var bStartEvent1 = ((clv == 4 || clv == 1) && (nTime - perVictoria.charmedTime) > 48);
	var md = WritePlaceHeader(false, bStartEvent1 ? 'td-none' : '');

	var perDesiree = findPerson("Desiree");
	var perLeanne = findPerson("Leanne");

	/*  PICTURE REFERENCES */

	if (clv === 0) {
		//NOT CHARMED
		if (!isShopOpen(0, 0, true)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Chakra ' + getShopStore() + ' closes and Victoria asks you to leave.');
		perVictoria.showPerson("victoria1a.jpg");
	} else if (!bStartEvent1) {
		if (bStartEvent2) perVictoria.showPerson("victoria4.jpg");
		else if (isNight()) perVictoria.showPerson("victoria1c.jpg");
		else if (clv == 4) perVictoria.showPerson("victoria1b.jpg");
		else perVictoria.showPerson("victoria2.jpg");
	}

	if (bStartEvent1) {
		// TITLE LINE
		addPlaceTitle(md, "Victoria");
		perVictoria.showPerson("victoria4.jpg", "30%", "left");
		perVictoria.charmThem(2);

		// Description
		md.write(
			'<p>Victoria is eager to fulfill your every desire, she booms and moans all the time when she sees you. You know she wets her panties in an instant. She constantly tells you how she misses immediately after you leave her ' + getShopStore() + '. You know that it’s just the charm effect that’s talking, but it feels good hearing it.</p>' +
			'<p>You are standing in front of her at the moment, mouth agape as she is wearing nothing. Her naked body presented to you like an offering.</p>' +
			'<p>"My love! Welcome! I hope this body is to your liking!", Victoria shouts in joy as she sees you. ' +
			'You are still shocked how stunning she looks. You never thought that she has such a nice figure  before.</p>' +
			'<p>"I wanted to please you! I know you have commanded me to stay put and wait further commands, but I thought you would be happy seeing me naked!", her last words are filled with little moans. You know that just by looking at you fills her with orgasms.</p>' +
			'<p>"Yes, you have pleased me, my dear! I… you see… you’ve done well.", you stammer a bit.</p>' +
			'<p>"You know, you don’t have to stand there! These are all yours!", she jiggles her boobs a bit and smiles.</p>' +
			'<p>"' + perYou.getPersonName() + '! I feel an urge to get to know you better. I want to understand you. Your desires, your dreams, your needs. I want to be the person whom you could always rely on, who always got your back. A girl who listens to you anytime and interested in your emotions.", Victoria runs a finger through your chest. ' +
			'You realise she really wants more than just being your girlfriend. Not just a sex toy or a slave like most of the others you have charmed, but a person who supports you. It comes to you that she wants to be your personal caretaker or assistant.</p>' +
			'<p>You grin at her and embrace her for a minute. The two of you silently caressing each other.</p>' +
			'<p>"All right, my dear. But enough talk for now! Let’s have some fun!", you break the silence with a laugh. ' +
			'Victoria doesn’t say a word, she just opens comes close to you and shows you her pair of round tits and gives you a mouthful kiss. You don’t even have to tell her what you want, she’s just doing it all by herself! She’s like reading your mind by trying to please you on her own without your say in it and you like it so far!'
		);

	} else {

		/* TITLE LINE */
		addPlaceTitle(md, "Chakra Chachkis Store");

		/* Description */
		md.write(
			'<p>The Chakra Chachkis ' + getShopStore(true) + ' is a quaint little ' + getShopStore() + ' that seems to have a little bit of everything - from the rare and valuable to the type of stuff your grandmother might have.</p>'
		);
		if (!perVictoria.checkFlag(8) && !perVictoria.isCharmedBy()) {
			//haven't met yet
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<p>Off to the side of the ' + getShopStore() + ' you run into the ' + (isBritish() ? 'shop assistant' : 'store clerk') + '. She is in the middle of a yoga routine.   "Namaste, can I help you with something today?"</p>'
			);
		} else if (clv === 0) {
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<p>You find Victoria doing her yoga.</p>'
			);
		} else {
			//CHARMED
			md.write(
				'<p>Only people who are interested in the occult and mysterious come where. Which is, let’s face it, a small handful of people. The ' + getShopStore() + ' stands mostly empty during the day, only one or two costumer stop by.</p>' +
				'<p>Your lovely personal property, Victoria, still watches over the ' + getShopStore() + ' after she sworn herself to you. In this way, she still has a regular job to do and something to keep her occupied. It would be too much for you to handle if she would follow you around, not leaving your side. Well, maybe one day you can make her dream come true, but you can’t take risks at the moment.</p>' +
				'<p>Victoria is right where you left her. "Hello, ' + perYou.getMaster() + '. I\'m so glad you\'re here. Is there <i>anything</i> I can do for you?"</p>'
			);
		}
	}

	// Shoppng Options
	if (perVictoria.checkFlag(35) && !perVictoria.checkFlag(36)) {
		startQuestionsOnly("Items for sale");
		addQuestionC(md, 'buy assorted occult papers for ' + sCurrency + '50', "Victoria", -2718, 'travelblock');
		md.write('<br>');
	}

	// Dialogue Options
	startQuestions();

	if (!perVictoria.checkFlag(8)) {
		addPopupLinkC(md, 'introduce yourself', "Victoria",
			"<img src='Images/victoria0.jpg' style='height:80vh;float:right;margin-left:5px' alt='Victoria'>" +
			"As you search through the aisles containing strange relics and herbal remedies you come across the owner of the " + getShopStore() + ". The tall blonde lady greets you wholeheartedly,<br><br>" +
			'"Nice to meet you ' + perYou.getPersonName() + '.  My name is Victoria, my father used to own this ' + getShopStore() + ' before I inherited it.  Now, is there something I can help you with?"<br><br>' +
			"You answer that you are just browsing, so she tells you to look around and have fun.<br><br>" +
			"Victoria seems nice, she even flashes a blush to you, but she is busy keeping the " + getShopStore() + " together so you two don’t have enough time to get acquainted. But you certainly do feel a vibe for her and you know her affections are the same.",
			false, "setPersonFlag('Victoria', 8);dispPlace();"
		);
	} else {

		//Catholic Relic Questions
		if (perDesiree.getQuestRelic() > 0 && !perVictoria.checkFlag(1)) {
			//Started the Catholic Relic Path
			addQuestionC(md, '"Do you know anything about an old Catholic relic around here?"', "Victoria", 1851);
		}
		if (perYourBody.FindItem(48) > 0 && !perVictoria.checkFlag(2)) {
			addQuestionC(md, 'show her the Relic - "Know anything about this?"', "Victoria", 1852);
		}

		//Aftane of the Dead MURDER Path - so that you can get the aftane on the murder path
		if (isMurderPath()) {
			//On the Murder path
			if (perKurndorf.getQuestSeance() >= 16 && !perVictoria.checkFlag(3)) {
				//Seance path has STARTED
				addQuestionC(md, '"Do you know of any relics that can protect from evil spirits?"', "Victoria", 14501);
			}
		}

		if (checkPersonFlag("Pamela", 8) && !checkPersonFlag("Pamela", 9) && !checkPersonFlag("Pamela", 10) && !checkPersonFlag("Pamela", 11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet?"', "Victoria", 1);
		}
		if (checkPersonFlag("Pamela",  8) && checkPersonFlag("Pamela",  9) && !checkPersonFlag("Pamela",  11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet, it is called a \'Twin Souls\' bracelet?"', "Victoria", 2);
		}
		if (perLeanne.place == 382 && !perLeanne.checkFlag(10)) addQuestionC(md, 'ask Victoria about saving Leanne', "Victoria", 700);
		if (perLeanne.place == 382 && perLeanne.checkFlag(8) && !perVictoria.checkFlag(9) && !checkPersonFlag("Vampyre", 2)) addQuestionC(md, "ask Victoria about the 'Mirror of Souls'", "Victoria", 701);

		if (!isDay() && clv > 0) {
			addPopupLink(md, "go upstairs and spend the night with Victoria", "Going to Bed with Victoria",
				'<img src="Images/victoriabed1.jpg" style="position:absolute;width:100%;bottom:0" alt="Victoria">' +
				'You tell your beautiful slave that you will sleep here tonight. She kneels down to lick your cock while you sleep.',
				true, "sleepForNight()", false, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0");
		}
	}

	addLinkToPlace(md, 'leave the ' + getShopStore(), 194);

	WritePlaceFooter(md);
}