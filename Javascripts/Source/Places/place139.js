// Place: Kate's Room and she is home

function ShowPlace139()
{
	var md = WritePlaceHeader();

	var perKate = findPerson("Kate");
	var perMG = findPerson("MrsGranger");
	var clv = perKate.getCharmedLevel();
	var plcMG = perMG.whereNow();

	// What is the state of your relationship with Kate? Or her location
	if (perKate.place == 1 && perKate.other >= 15 && perKate.isCharmedBy("Davy")) {
		if (perDavy.other == 7) perDavy.other = 6;
		perKate.setFlag(40);
		if (sType == "leave" || sType == "embrace") {
			// Kate kills you
			perKate.other = 900;  // SHE HAS STABBED YOU - END OF GAME

			perKate.showPerson("kate17e.jpg");
			addPlaceTitle(md, "Stabbed!");
			if (sType === "leave") md.write('<p>Something about how she is acting troubles you and you make and excuse and turn to walk out of her room. As you do something cold and sharp pierces between your ribs. ');
			else md.write('<p>You embrace Kate. Her warm lips surround yours and she wraps her arms around you before something cold and sharp pierces between your ribs. ');
			
			md.write(
				'You stagger backward and try to grasp the handle of a dagger lodged in your left side. Your bloodied fingers fail to grip, slipping off the hilt.</p>' +
				'<p>Kate sneers at your passing life. &quot;You conceited fool,&quot; she says. &quot;How could you ever think that I could ' +
				'love anyone else but my master Davy?&quot;</p>' +
				'<p>You\'re unsure how you have failed to finish your journey or how you could ever win against the villains conspiring against you.</p>' +
				'<p>Better luck next time.</p>'
			);

			addRestartLink(md);
		
		} else {
			// Kate is charmed and trying to kill you!
			if (perDavy.other == 7) perDavy.other = 6;
			perKate.showPerson("kate17a.jpg", "", "", "kate17c.jpg");

			addPlaceTitle(md, "Kate At Her House");

			md.write(
				'<p>Kate is waiting for you in her bedroom. Although she\'s changed her clothes again she looks much calmer than the last time you saw her.</p>' +
				'<p>"Hello," she says. "I\'m so glad you\'re here. I was thinking that I have never met anyone quite as nice as you ' + perYou.getPersonName() +
				'. You know, we have a lot in common and, at times like this, it\'s ' +
				'only natural for two people to find an attraction to one another. I know that you think that I\'m a little ' +
				'forward but I want to know you a lot better ' + perYou.getPersonName() + '. Would you like to get to know me	too?"</p>'
			);

			if (perMG.other >= 50 && perMG.checkFlag(1)) {
				setPlaceKnown("Hospital");
				md.write("<p>&quot;By the way, I hope you've visited my mother in the hospital.  She kept saying your name in her sleep when I visited her there. I didn\'t know the two of you were so close.&quot;</p>");
			}

		  startQuestions();

			if (perKate.other == 15 || perKate.other == 999) addQuestionC(md, 'tell Kate that you like her too', "Kate", 5415);
			else if (perKate.other == 50) addLinkToPlace(md, 'embrace your friend', Place, 'type=embrace');
			if (perMG.whereNow() === 177) addLinkToPlace(md, 'look for Mrs. Granger', Place, "type=leave");
			addLinkToPlace(md, 'exit the house', Place, "type=leave");
		}
		WritePlaceFooter(md);
		return;
	}
	else if (perKate.place != 1 && perKate.place != 139.5) {
		// She is not here!
		if (sType === "") {
			// Empty room
			addPlaceTitle(md, "Kate\'s Bedroom", "bedroom5.jpg");

			if (perKate.checkFlag(18)) {
				if (isInvisible()) md.write('<p>You are waiting in Kate\'s room, quiet and invisible.</p>');
				else if (perYou.checkFlag(16)) md.write('<p>You are quietly hiding in the wardrobe in Kate\'s room.</p>');
				else if (perKate.checkFlag(9)) {
					if (perKate.checkFlag(21)) md.write('<p>You are in Kate\'s room, and you have finished making room in her wardrobe.</p>');
					else if (perKate.checkFlag(20)) md.write('<p>You are in Kate\'s room, there is still not enough room in her wardrobe to hide.</p>');
					else if (perKate.checkFlag(19)) md.write('<p>You are in Kate\'s room, you have quickly rearranged some stuff, but there is not enough room in the wardrobe to hide.</p>');
					else md.write('<p>You are in Kate\'s room, possibly you could make some space in her wardrobe to hide?</p>');
				} else md.write('<p>You are in Kate\'s room, but there is no way she will not see you when she returns, how can you make sure she does not notice you?</p>');
			} else md.write('<p>You wait for Kate but, as time goes by, you realise that she isn\'t coming home.</p>');

			startQuestions();

		} else if (sType == "afterclobbered" || sType == "afterclobberedvisible") {
			// You tried to charm her
			nMoney = nMoney > 0 ? 0 : nMoney;  //Kate takes ALL your cash
			AddCash(0);  //Refresh the cash counter
			perKate.place = 9999;		// Kate leaves town
			perKate.setFlag(4);		// pissed her off (duh!)

			if (perDavy.getPathHellgate() === 0) {
				//Haven't started the Hellgate Path yet
				perDavy.setPathHellgate(1);  //Start it...  alternative start to the Hellgate path in case you didn't get shot
			}

			//showPopupWindow("", '::THUD:: Did someone get the license number of that TRUCK!?!', "");

			addPlaceTitle(md, "Kate\'s Empty Bedroom", "bedroom5.jpg");

			if (sType == "afterclobberedvisible") {
				md.write(
					'<p>You black out for a bit, and wake some time later, your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
					'<p>Kate saw you as she return to her room,  <i>Man she can hit hard!</i> You think to yourself.</p>' +
					'<p>A few moments later you realize Kate did more than just hit you...  it would seem she liberated your cash from your pocket before she left.</p>' +
					'<p>You see a note sitting on a side table</p>' +
					'<p>"<i>You ' + (perYou.isMaleSex() ? "bastard" : "bitch") + ', you are scum, I hope to never see you again. I getting the hell out of the town, I will sort things out with Mama</i>"');

			} else {
				md.write(
					'<p>You black out for a bit, and wake some time later, your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
					'<p>Kate must have noticed as you started to cast the spell.  <i>Man she can hit hard!</i> You think to yourself.</p>' +
					'<p>A few moments later you realize Kate did more than just hit you...  it would seem she liberated your cash from your pocket before she left.</p>' +
					'<p>You see a note sitting on a side table</p>' +
					'<p>"<i>You ' + (perYou.isMaleSex() ? "bastard" : "bitch") + ' I almost trusted you! The you had to do whatever that is, something like Davy. You are scum, I hope to never see you again. I getting the hell out of the town, I will sort things out with Mama</i>"');
			}
			startQuestions();
		}

		addOptionLink(md, 'wait for Kate?', "bChat = false;WaitHere();WriteComments('You wait for a bit');");
		if (perKate.checkFlag(7)) addLinkToPlace(md, 'look at the ' + (perKate.checkFlag(9) ? 'first ' : '') + 'photo album', Place, 'type=album1&page=1');
		if (perKate.checkFlag(9)) addLinkToPlace(md, 'look at the second photo album', Place, 'type=album2&page=1');

		if (perKate.checkFlag(18) && perKate.checkFlag(9) && !isInvisible() && !perYou.checkFlag(16)) {
			if (perKate.checkFlag(21)) addOptionLink(md, "hide in the wardrobe", 'perYou.setFlag(16);dispPlace();');
			else if (perKate.checkFlag(20)) addOptionLink(md, "try to make more room in the wardrobe", "setPersonFlag('Kate',21);dispPlace();");
			else if (perKate.checkFlag(19)) addOptionLink(md, "try to make more room in the wardrobe", "setPersonFlag('Kate',20);dispPlace();");
			else addOptionLink(md, "try to make room in the wardrobe", "setPersonFlag('Kate',19);dispPlace();");
		}
	}
	else if (perKate.isCharmedBy("You") && clv == 2) {
		// Charmed Kate, Lover
		perKate.showPerson("kate-home-charmedlover1.jpg");

		addPlaceTitle(md, perKate.getPersonName() + " At Home");
		md.write(
			'<p>Your charmed lover Kate is waiting for you on her bed.</p>'
		);
		startQuestions();
		addLinkToPlace(md, "time for some foreplay with Kate", 139, "type=bedroomforeplay");
		addLinkToPlace(md, "skip that and make love with Kate", 139, "type=bedroomsex");
		perKate.addSleepLink(md, "go to bed for the night with Kate", "Sleeping with Kate",
			'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You tell your lover that is it late and you wish to spend the night.',
			Math.random() < 0.5 ? 'kate-home-charmedlover-bed1.jpg' : 'kate-home-charmedlover-bed2.jpg', true
		);

	} else if (perKate.isCharmedBy("You")) {
		// Charmed Kate, slave
		perKate.showPerson("kate-home-charmedslave1.jpg");

		addPlaceTitle(md, perKate.getPersonName() + " At Home");
		md.write(
			'<p>Your slave Kate is waiting for her ' + perYou.getMaster() + ' on her bed.</p>'
		);
		startQuestions();
		addLinkToPlace(md, "have your slave pleasure you", 139, "type=bedroomforeplay");
		addLinkToPlace(md, "take your slave", 139, "type=bedroomsex");
		perKate.addSleepLink(md, "go to bed for the night with Kate", "Going to Bed with Kate",
			'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You order your slave that is it late and you will spend the night.',
			'kate-home-charmedslave-bed1.jpg', true
		);
		
	} else if (perKate.checkFlag(22)) {
		// Lover (uncharmed)
		perKate.showPerson("kate-home-lover1.jpg");

		addPlaceTitle(md, "Kate At Home");
		md.write(
			'<p>Your girlfriend Kate greets you as you visit her room. She is not wearing too much, a smile and some underwear.</p>'
		);
		startQuestions();
		if (!perKate.checkFlag(27) && perKate.checkFlag(15)) {
			addQuestionR(md, 'ask Kate for the necklace back',
				'You explain to Kate that now Davy is dealt with, you need the necklace back, and talk about strange supernatural encounters in the Sacred Grove. You are trying to give good reasons, but secretly is it that you want her as your slave?</p>' +
				'<p>Kate replies hesitantly, "Alright, as you say I am now safe from Davy"</p>' +
				'<p>She hands you back the necklace.',
				"",
				"findPerson(\\'Kate\\');per.setFlag(27);per.setFlag(15,false);per.DropItem(43,\\'You\\')"
			);
		}
		addLinkToPlace(md, "time for some foreplay with Kate", 139, "type=bedroomforeplay");
		addLinkToPlace(md, "skip that and make love with Kate", 139, "type=bedroomsex");
		perKate.addSleepLink(md, "ask Kate if you can sleep-over", "Sleeping with Kate",
			'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You ask your lover Kate if you could spend the night',
			'kate-home-lover-bed1.jpg', true
		);

	} else if (perKate.checkFlag(23)) {
		// Ally (uncharmed, not lover)
		if (getQueryParam("hypno") == "true") {
			// Hypnotised
			perKate.showPerson("kate16e.jpg");

			addPlaceTitle(md, "Hypnotised Kate");
			md.write(
				'<p>You touch Kate on her shoulder and use the magical hypnotic technique and instantly she falls into a trance. She shifts and sits down, and as she does your fingers catch on her top and her flimsy top slips off exposing her breasts. You wait for the pain, expecting her to beat you, but she seems to be firmly in the trance and does not respond.</p>' +
				'<p>For a time she is yours to convince or</p>'
			);
			startQuestions();
			addQuestionR(md, 'convince her you are trustworthy, and you love her',
				'You explain earnestly to the hypnotised Kate that you can be trusted and that you love her completely. You talk at length try to explain, but in the back of your mind you wonder if secretly is it that you want her as your slave?</p>' +
				'<p>I her trance Kate replies, "Yes...yes...you did so much, I love you too"</p>' +
				'<p>It is a strange thing to hear her confess love this way but it is hopefully enough',
				"",
				"setPersonFlag(\\'Kate\\',22);setPersonFlag(\\'Kate\\',23,false);setPersonFlag(\\'Kate\\',27,false)"
			);
			if (perKate.checkFlag(15)) {
				addQuestionR(md, 'take the necklace back',
					'You carefully remove the necklace from Kate as you remind her it was only a loan, and talk about strange supernatural encounters in the Sacred Grove. You are trying to give good reasons, but secretly is it that you want her as your slave?</p>' +
					'<p>Kate hesitates but does nothing, and you tell her to not worry, things will be fine.</p>',
					"",
					"setPersonFlag(\\'Kate\\',15,false);per.DropItem(43,\\'You\\')"
				);
			}
			addLinkToPlace(md, "end the hypnotic trance", 139);
			WritePlaceFooter(md);
			return;

		} else {
			perKate.showPerson("kate16a.jpg");

			addPlaceTitle(md, "Kate At Home");
			md.write(
				'<p>Kate greets you as you enter her room. You are still unsure about how she feels about you.</p>'
			);
			startQuestions();
			if (perKate.checkFlag(15)) {
				if (!perKate.checkFlag(27)) {
					addQuestionR(md, 'ask Kate for the necklace back',
						'You explain to Kate that now Davy is dealt with, you need the necklace back, and talk about strange supernatural encounters in the Sacred Grove. You are trying to give good reasons, but secretly is it that you want her as your slave?</p>' +
						'<p>Kate replies, "No, I think I will keep it"</p>' +
						'<p>Well, it was worth a try',
						"",
						"setPersonFlag(\\'Kate\\',27)"
					);
				} else if (!perKate.checkFlag(28) && perYou.checkFlag(25)) addLinkToPlaceC(md, "hypnotise Kate", 139, "hypno=true", '', 'setPersonFlag("Kate",28)');
			} else if (!perKate.checkFlag(28) && perYou.checkFlag(25)) addLinkToPlaceC(md, "hypnotise Kate", 139, "hypno=true", '', 'setPersonFlag("Kate",28)');
		}
	} else if ((perMG.other == 50 && perMG.checkFlag(1)) && (plcMG == 275.5 || plcMG == 278) && sType === "") {
		// Mrs Granger @ hospital and you meet Kate in her room
		// Charmed initially unless you free her
		if (perDavy.other == 7) perDavy.other = 6;
		perKate.setFlag(40);
		perKate.showPerson("kate17b.jpg", "", "", "kate17c.jpg");

		addPlaceTitle(md, "Kate At Home");

		setPlaceKnown("Hospital");  // Set the Hospital as known if not already
		md.write(
			'<p>Kate tries to be pleasant but you can tell she is upset.</p>' +
			'<p>"Hi," she says. "I heard that you were at the museum when Mama got shot. She is hurt so badly that the doctors don\'t think that she will pull through. I never knew that she liked you so much; even in her semi-coma she calls your name. Perhaps you should go to the hospital to see her?"</p>'
		);

		startQuestions();
		if (!perKate.checkFlag(3)) addQuestionR(md, "comfort Kate", 'You try to comfort Kate and she appreciates your attempt, but she seems a little distant.', 'Kate', "setPersonFlag(\\'Kate\\', 3, true);");


	} else if (!perMG.checkFlag(1) && perKate.other == 7 && sType === "") {
		// Meeting in her room after you pick up the vase (alternate to meeting afyer Mrs Granger is in the hospital)
		// Charmed initially unless you free her
		if (perDavy.other == 7) perDavy.other = 6;
		perKate.setFlag(40);
		perKate.showPerson("kate17balt.jpg", "", "", "kate17c.jpg");

		addPlaceTitle(md, "Kate At Home");

		md.write(
			'<p>Kate is acting oddly, much more reserved than usual. You ask her where she has been, and she looks almost embarrassed,.' +
			'<p>"None of your business...Sorry to snap, it has been...difficult recently"</p>'
		);

		startQuestions();
		if (!perKate.checkFlag(3)) addQuestionR(md, 'ask "difficult?"', 'You try to get Kate to explain more, so you can help, but she seems a little distant and will not talk about it.', 'Kate', "setPersonFlag(\\'Kate\\', 3, true);");


	} else {
		// Normal visit
		// NOT charmed (ie before you learn Charm spell)
		switch (sType) {

		case "":
			// Standard, with nothing to talk about
			perKate.showPerson("kate16a.jpg");

			addPlaceTitle(md, "Kate At Home");

			md.write('<p>Kate has evidently arrived home and she seems pleased to see that you have come to visit.</p>');
			break;

		case "chat1":
			perKate.showPerson("kate16b.jpg");
			addPlaceTitle(md, "Chatting with Kate");

			addWallpapers(7, 10);
			md.write(
				'<p>You chat with Kate for a while. She talks about her interest in martial arts and working out. She also talks about her love of martial arts movies, especially old-school ones, like those with Bruce Lee or Jackie Chan, but she likes any of those type of movie.</p>' +
				'<p>Kate is very animated and leans toward you excitedly at times, giving you a very nice view!</p>' +
				'<p>You try to talk a little about your interest in magic, the old covens and the legendary spell book. Kate is not particularly interested so you start to change the topic of conversation. Kate interrupts you for a moment and shows you an image from some game she had played with a friend, and sends a copy to your phone. You notice she also sent a few other images as well.</p>' +
				'<p>As you look up you notice a small photo in a frame on her desk, it looks an older image as she is a brunette in the image. It is also odd it is a printed image, you expected Kate to have all digital photos.</p>'
			);
			perKate.setFlag(1);
			break;

		case "chat2a":
			perKate.showPerson("kate16c.jpg");
			addPlaceTitle(md, "Chatting with Kate");

			md.write(
				'<p>You comment on her working out and try to compliment her figure. She smiles briefly before her expression changes and she looks a little uncomfortable and changes the topic of the conversation and she starts gossiping a little about people at school.</p>' +
				'<p>Kate does stand briefly after you compliment her and you see a nice view of her thigh as she rearranges her dress. You struggle to think about how to continue the conversation...</p>');
			perKate.setFlag(2);
			break;
			
		case "chat2b":
			perKate.showPerson("holidayphoto1.jpg");
			addPlaceTitle(md, "The Photo");
			
			md.write(
				'<p>You ask Kate about the photo and comment how it is an actual printed photo, and she almost looks embarrassed,</p>' +
				'<p>"It is one memento from a holiday I took with some friends at my old school, before we moved to Glenvale. You know my Mama is really good with computers and insists on knowing my passwords. It is difficult to keep digital things private from her at times. She is cool, but there are things I do not want to share with her, in particular this holiday!"</p>' +
				'<o>She leans over and whispers to you "There are more photos, some more interesting. Some day I may show them to you"</p>' +
				'<p>She pulls back, this was clearly not an invitation to kiss her or something similar, but she smiles at you.</p>'
			);
			perKate.setFlag(36);
			break;			

		case "chat3":
			perKate.showPerson("kate16b.jpg");
			addPlaceTitle(md, "Chatting with Kate");

			md.write(
				'<p>You know a bit about the old Bruce Lee movies, and suggest a small wager about who knows a bit of trivia about the legend of martial arts. Kate looks excited "Sure! What shall we wager?"</p>' +
				'<p>You start to suggest a kiss, or maybe money, and she interrupts "I know what you want, if you win I\'ll give you a glimpse of heaven, but if I win then I get to try out a new martial arts technique on you"</p>' +
				'<p>While losing sounds painful, that is just part of being Kate\'s friend so you agree eagerly, "a glimpse of heaven" could be many pleasant things.</p>' +
				'<p>Kate then asks you, "What was Bruce Lee\'s last movie that he actually acted for?"</p>'
				);
			perKate.setFlag(10);
			startQuestions("Your answer is?");
			startAlternatives(md);
			addLinkToPlace(md, "Game of Death II", 139, "type=chat5&answer=gd2");
			addLinkToPlace(md, "The Big Boss", 139, "type=chat5&answer=bb");
			addLinkToPlace(md, "Game of Death", 139, "type=chat6&answer=gd&strip=first");
			addLinkToPlace(md, "Enter the Dragon", 139, "type=chat5&answer=ed");
			addLinkToPlace(md, "give up and exit the house", 43);
			endAlternatives(md);

			WritePlaceFooter(md);
			return;

		case "chat4":
			perKate.showPerson("kate16a.jpg");
			addPlaceTitle(md, "Chatting with Kate");

			md.write(
				'<p>You do you best to try to kiss Kate, but she leans away looking a little cross and says "Not yet, we should get to know each other better".</p>' +
				'<p>You are disappointed, but at least she has implied that there could be another time!</p>');
			perKate.setFlag(10, true);
			break;

		case "chat5":
			perKate.showPerson("kate16d.jpg");
			addPlaceTitle(md, "Wrong Answer");
			var ans = getQueryParam("answer");

			if (ans == "bb") md.write('<p>You tell her "The Big Boss" and she laughs, "Fool that was his first starring role, not his last!"</p>');
			else if (ans == "gd2") md.write('<p>You tell her "Game of Death II" and she laughs, "Fool that was made after his death using old footage so he never acted for that movie specifically, they re-used old footage."</p>');
			else md.write('<p>You tell her "Enter the Dragon" and she laughs, "Idiot that was his best movie but not his last one!"</p>');

			md.write(
				'<p>Kate stands up and tells you to as well. You do and brace yourself for the pain. She starts to do a complex sort of round-house kick, and you have two thoughts "This is going to hurt" and "I can see her panties...ummm I mean no panties!"</p>' +
				'<p>You hear a ripping sound and see Kate slip and fall onto the floor, the polished floorboards must have been too slick for martial arts. You see Kate lying on the ground, her thin dress has been ripped and is lying next to her. She looks at you a bit embarrassed and she quickly redresses. Your main thought is "no panties"...</p>'  +
				'<p>She gets back up and sits and says "Well...ummm...that will do for the bet"</p>');

			break;

		case "chat6":
			var strip = getQueryParam("strip");
			if (strip == "first") {
				perKate.setFlag(11);
				perKate.showPerson("kate16e.jpg");
				addPlaceTitle(md, "Correct Answer");
				md.write(
					'<p>You tell her "Game of Death" and she looks pleased, "That\'s right, unfortunately he died during production of that movie so it is the last movie he acted in and for."</p>' +
					'<p>Kate smiles a little coyly and says "As I promised, a glimpse of heaven"</p>' +
					'<p>She adjusts her top and exposes her breasts. You expect her to immediately cover up again but...</p>');
				startQuestions();
				addLinkToPlace(md, "she continues", 139, "type=chat6&answer=gd2&strip=second");
				WritePlaceFooter(md);
				return;
			} else {
				perKate.showPerson("kate16f.jpg");
				addPlaceTitle(md, "Heaven");
				md.write(
					'<p>Kate stands and turns her back to you, she wiggles a bit and her clothes fall to the ground at her feet, she is wearing just a sheer set of panties, and nothing else. She looks at you over her shoulder and bends over and redresses quickly, giving you a beautiful view of her gorgeous rear end.</p>' +
					'<p>She sits and looks at you "Well the bet is over, and you have had your reward, but that is all for now..."</p>' +
					'<p>You are pleased that she added "now" to the end of that!</p>');
			}
			break;
		}

		startQuestions();

		// Chatting

		if (!perKate.checkFlag(1)) addLinkToPlaceC(md, "chat with Kate", 139, "type=chat1");
		else if (!perKate.checkFlag(2) || !perKate.checkFlag(36)) {
			if (!perKate.checkFlag(2)) addLinkToPlaceC(md, "compliment her figure", 139, "type=chat2a");
			if (!perKate.checkFlag(36)) addLinkToPlaceC(md, "ask about the photo", 139, "type=chat2b");
		} else if (!perKate.checkFlag(10)) {
			startAlternatives(md);
			addLinkToPlace(md, "bet her about some trivia of Bruce Lee", 139, "type=chat3");
			addLinkToPlace(md, "try to kiss her", 139, "type=chat4");
			endAlternatives(md);
		}

	}

	// Common
	if (plcMG === 177) addLinkToPlace(md, "look for Mrs Granger", 177);
	addLinkToPlace(md, "exit the house", 43);

	WritePlaceFooter(md);
}