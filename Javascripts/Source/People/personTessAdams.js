 /****************************************************************
Tess Adams
****************************************************************/
function RepliesTessAdams(nR)
{
	var perT = per;
	//var bCharm = perT.isCharmedBy();
	var myName = perT.getYourNameFor();
	var perJ = findPerson("JohnAdams");
	var ret = true;

	if (nR == 2100)  // v21 = Tess Adams Path
	{
		addComments(
			'<p>"Oh darn. Yes, please, ' + myName + '. How silly of me, I seem to have dropped everything."</p>' +
			'<p>You help her to pick up the fallen items, while doing so you cannot help admiring the sweet and rather beautiful librarian.</p>' +
			'<p>While she finishes replacing the last of the items, you comment about how nervous Monique was and how she mentioned some stories Mrs. Adams had told. She smiles,<br>' +
			'"Monique and I are really interested in magic, and my husband likes to collect things that have some association with the old covens. I have read a number of books on witchcraft and the ways old sorcerers used to encode their works."</p>'
		);
		perT.setFlag(1);
	}
	else if (nR == 2101)
	{
		addComments('"Magic! Oh I wish I did because then I could help people and save the poor wild animals in danger. The books talk about so many things, ways to walk through walls and rescue people, and darker things like necromancy and possession"');
		perT.setFlag(2);
	}
	else if (nR == 2105)  // Research "Pass" Spell
	{
		addComments('<p>You mention that you have an old work talking of magic, not mentioning the exact book. Since she had mentioned a knowledge of protecting the contents that she might help look something up.</p>' +
		'<p>"Of course, ' + myName + '. What do you want to know about?"</p>');
		if (!isRunes()) {
			bChatLeft = false;
			setQueryParams("type=learnpass");
		} else {
			return !Research("Spell", "Serphoni", undefined, undefined, undefined, true);
		}
	}
	else if (nR == 6900) // v69 = Is the Door to her office closed?
	{
		addComments('"Oh, there is always a bit of a draft in this old building, isn\'t there? Sure, go ahead and close the door."</i> says Mrs Adams as she stands to get some books.</p><p>You close the door');
		if (Math.random() < 0.6) addComments(' and as you do you hear Mrs. Adams accidentally knock some books off her desk and she starts to pick them up. As people had said, she is a bit of a klutz.');
		else addComments('.');
		setPlaceFlag("Library", 1); // Close the door
	}
	else if (nR == 2001) // Need you to research more spells
	{
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		addComments('"Whatever you say my love. I will search the files and report anything that I find.');
		perT.other = 5;
		perT.extra[0] = nTime;
		//perT.place = 0; // Puts Tess back in the Library if elsewhere (not really possible)
		//Place = 29;
	}
	else if (nR == 2002)
	{
		// Send her to your home (first time)
		bChat = false;
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		if (perT.place == 230) {
			addComments('"As you wish ' + myName + '. I will leave right now."</p><p>She quickly dresses and you follow her out of the house.');
			Place = 229;
		} else if (perT.place == 96) {
			addComments('"As you wish ' + myName + '. I will leave right now."</p><p>She quickly dresses and you follow her out to the Town Hall reception.');
			Place = 95;
		} else {
			addComments('"As you wish ' + myName + '. I will leave right now."</p><p>She quickly dresses and you follow her out to the main area of the library.');
			Place = 3; // Puts you out in the reception area
		}
		if (!perT.checkFlag(8)) {
			perT.other = 10; // advance charmed path to "sent to your room"
			perT.extra[0] = 0;
		} else perT.setFlag(6);
		perT.place = !perT.checkFlag(7) ? 45 : 46; // Put Tess in your room
		setQueryParams();
		return true;
	}
	else if (nR == 2003) // Call the Receptionist into the room to Charm her
	{
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		addComments('"As you wish ' + myName + '. I will only be a moment."');
		movePerson("MsTitus", 29);  // brings the receptionist in.
		setQueryParams();
		Place = 29;

	}
	else if (nR == 2005) // Tell her to Stop researching
	{
		addComments('"As you wish, my love."<br>');
		perT.other = 1;  // reset Tess variable back to 1...  Allow to choose Research/Bedroom again

	}
	else if (nR == 2011) // Need more magic items (in bedroom)
	{
		addComments(
			'"No, my darling. I don\'t know anything about items of magic but my...husband is a surveyor for the town council. He might know where there are sites of the old cults and where things have been found. He has a sort of hobby collecting some of the relics from the old days"'
		);
		perT.other = 12;
	}
	else if (nR == 2012) // Send her to get her husband
	{
		bChat = false;
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		addComments('"Yes ' + myName + '," she says with a twinkle in her eye. "As you command.". She gives you a kiss and leaves to see her husband.');
		Place = 46; // sets you back in your empty bedroom
		perT.place = 124;  // puts her @ the hotel
		perT.other = 13;
		setQueryParams();
		return true;
	}
	else if (nR == 2013) // Artifact from her husband
	{
		addComments(
			'"Oh you will be so pleased, ' + myName + '. My...husband heard that something weird was handed in at the council office. He took it for me, so I rewarded him better than anyone else could have, it was to help you, you understand?", she looks at you imploringly. You smile and tell her she did well, he is still her husband...for now.</p>' +
			'<p>She looks relieved, "Should we go somewhere private for you to see it, the item that is?"');
		perT.other = 14;
		bChatLeft = false;
	}
	else if (nR == 2014) // Move to the Hotel Room
	{
		addComments('"Oh good ' + myName + '. Maybe you will let me make love to you there," she says, her voice dripping with desire as she takes you to a room in the hotel she must have already arranged');
		Place = 186; // Move to the Room
		setQueryParams();
		return true;
	}
	else if (nR == 2021)
	{
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		addComments(
			'Tess nods.  "Yes ' + myName + '. Hop in and I\'ll take you there immediately." she says.</p><p>Her hand quickly strays to your crotch once you enter the vehicle.</p>' +
			'<p>It is a short drive to her home on Rathdown Rd, which is near the Broken Inn hotel. You both get out of the car and she asks you to follow in a few minutes while she speaks with John. She sounds a little nervous with you meeting her husband so you agree and wait a little.'
		);
		bChat = false;
		perT.other = 25;
		perT.place = 230;  	// Move Tess to her house
		perJ.place = 230;		// Move John Adams there too
		setPlaceKnown("AdamsHouse");
		Place = 229;  			// Move you to Rathdown Road outside the house
		setQueryParams();
		return true;
	}
	else if (nR == 10407) // v104 = John Adams Path (telling her to change to prove your control)
	{
		bChatLeft = false;
		perJ.other = 8;
		perT.other = 27;  //Tess dressing up
		addComments('<p>Tess nods excitedly and runs off to change. She returns in several minutes wearing a cheerleader outfit you recognize from your tryst at the hotel.</p>');
	}
	else if (nR == 10420)
	{
		bChat = false;
		if (Place == 230 && !perJ.isCharmedBy()) {
			perT.setFlag(13);
			addComments('You start to ask Tess to meet you back at you home, but she looks worried and looks at John and shakes her head. It seems you will have to deal with John first.');
			if (perT.other == 28) addComments('</p><p>She does briefly step out and changes into her cheerleader outfit as an apology, and a promise for later.');
			perT.other = 27;			
		} else {
			// send her to your home, second or later times
			perT.place = 46; // Put her back in your room
			perT.setFlag(6);
			if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
			addComments('<p>Tess grins at you, her tongue running over her lips in anticipation.  "Yes ' + myName + ', I\'ll wear something special for you again," she says, grabbing a few things and leaving the house immediately.');
		}
		return true;
	}
	else if (nR == 10421)
	{
		bChat = false;
		if (Place == 230 && !perJ.isCharmedBy()) {
			perT.setFlag(13);
			addComments('You start to ask Tess to meet you back at your home, but she looks worried and looks at John and shakes her head. It seems you will have to deal with John first.');
			if (perT.other == 28) addComments('</p><p>She does briefly step out and changes into her cheerleader outfit as an apology, and a promise for later.');
			perT.other = 27;
		} else {
			if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
			if (perT.place == 230 && perT.other < 10) {
				addComments('<p>"Yes ' + myName + ', I will...but what about John..." she says. You tell her we will talk about him later, and she leaves grabbing a few things and exiting the office and you follow her out of the house.');
				Place = 229;
			} else if (perT.place == 96) {
				addComments('<p>"Yes ' + myName + ', I will...but what about John..." she says. You tell her we will talk about him later, and she leaves grabbing a few things and exiting the office and you follow to the Town Hall reception.');
				Place = 95;
			} else {
				addComments('<p>"Yes ' + myName + ', I\'ll look forward to speaking to Karen and Monique again" she says, grabbing a few things and leaving the house immediately.');
				perT.setFlag(8);
			}
			perT.place = 0; // Put her back at the library
		}
		setQueryParams();
		return true;
	}
	else if (nR == 10422)
	{
		bChat = false;
		addComments('<p>"Yes ' + myName + ', I\'ll look forward to seeing ' + perJ.getPersonName() + ', <i>with you</i>" she says, grabbing a few things and she leaves saying she will get a taxi and meet you there.');
		perT.place = 230; // Put her back at her home
		Place = 46;
		setQueryParams();
		return true;
	}	
	else if (nR == 10301) // v103 = John Adams CHARMED Path
	{
		PlaceI(32, 230);
		perJ.setFlag(1);
		if (!gameState.bShowSpeaker) addComments(perT.addPersonFace());
		addComments('"Of course, ' + myName + '.  I believe he may have kept an old silver ring in the safe.  It may be magical as he swore to me it seemed to glow when it was near the talking worm I showed you before."</p>');
	}
	return ret;
}

function TessChangeClothes()
{
	var perTess = findPerson("Tess");
	perTess.other = (perTess.other == 27 ? 30 : 27);
}


// Initialise
function initialiseTessAdams()
{
	// Tess Adams
	addPerson("Tess", 0, "Tess", '', false);
	per.Replies = RepliesTessAdams;
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Tess" : "Tess Adams"; };
	per.getPersonAddress = function(n) { return isPlaceKnown("AdamsHouse") ? n ? 230 : '2121 Rathdown Rd, Glenvale' : n ? 0 : ''; };

	per.whereNow = function() {
		if (Place == 231 && (sType.indexOf("tess") != -1 || sWho.indexOf("tess") != -1)) return Place;
		if (this.place === 0) {
			if (isShopOpen(2, 1, true)) return 29;
			if (Place == 29) return 29;
			if (Place == 3 && this.isCharmedBy()) return 29;
			return this.checkFlag(6) ? 46 : 230;
		}
		if (Place == 186) return Place;
		if (this.place == 194) return isShopOpen(0, 0, true) ? 194 : 230;
		return this.place;
	};
	per.getPossessionFace = function() { return this.isCharmedBy() ? "tess-facec" : "tess-faceu"; };

	per.passTimeNight = function() {
		if (this.place == 96) this.place = 230;
		else if (this.place == 1000) this.place = 194;
		this.setFlag(16, false);
		return '';
	};

	per.showEventPopup = function()
	{
		if (Place == 124 && sType == "afterworm") {
			if (!isDay()) this.place = 194;		// Will be there tomorrow morning
			else this.place = 1000;		// On the way to the shops
			showPopupWindow("Leaving with Tess",
				this.addPersonString("tess11e.jpg", "height:max%", "right") +
				(getQueryParam("sex") == "no" ? 
					'Tess looks disappointed, but she smiles and gives you a quick kiss before dressing.' :
					'Tess gets out of the bed, trips over, and then starts redressing.') +
				' She is an adorable clutz, and as she dresses she tells you,</p>' +
				'<p>"I..I will have to go home and talk to John...it may take a while my love." You feel that last bit was to remind herself almost.</p>' +
				'<p>She continues, "I will message you when I have it sorted out." She sounds very uncertain and nervous but you are sure she will do her best for you.</p>' +
				' She finishes dressing and when you are ready she links her arm with yours and says "Shall we go?"</p>' +
				'<p>In the hotel lobby she gives you a kiss and asks a staff member to call her a taxi. You resist the impulse to say "You\'re a taxi" and instead walk over to the bar.'
			);
			return true;			
		}
		
		if (sType !== "") return false;
		
		// First glimpse
		if (Place == 2 && !this.checkFlag(9) && !perYou.isQuestComplete(1)) {
			this.setFlag(9);	// Show once!
			showPopupWindow("Who is that?",
				this.addPersonString("tess0.jpg", "height:max%", "right") +
				'As you approach the library you notice a beautiful woman leaving. You think she is one of the librarians, you may have seen her there before. You hear her call out</p>' +
				'<p>"I\'ll be back soon once I change my top, silly pen breaking and ruining my nice coat..."</p>' +
				'She gets into a taxi waiting nearby and leaves. You wonder if she was the librarian Mrs. Adams, you have heard she is gorgeous and accident prone.'
			);
			return true;
		}

		if (Place == 46 && this.isHere()) {
			
			if (!isDay() && !this.checkFlag(4)) {
				this.setFlag(4);
				showPopupWindow("",
					this.addPersonString("tess20b.jpg", "height:max%", "right") +
					"<p style='text-align:center;margin-top:-12px;font-size:x-large'><b>Tess's Nightie</b></p>" +
					'You are amazed as you see Tess has changed into a lovely green nightie. She is simply stunning and you look at her wordlessly. Tess smiles,<br><br>' +
					'"Well my love, I am ready for bed..?"',
					'', "background-color:white;color:black;"
				);
				return true;
			}
			
			if (!this.checkFlag(15) && this.hoursCharmed() > 167) {
				this.setFlag(15);
				this.setFlag(16);
				showPopupWindow("",
					this.addPersonString("musicd.jpg", "height:max%", "left") +
					"<p style='text-align:center;margin-top:-12px;font-size:x-large'><b>Musical Interlude</b></p>" +
					'You see Tess is listening to some music, you are not sure where she got the headphones or the sound system.</p>' +
					'<p>Most of all you are unsure why she is naked, not that you are complaining!',
					'', "background-color:white;color:black;"
				);
				return true;
			}
			
			if (this.checkFlag(15) && !this.checkFlag(16) && Math.random() < 0.1) {
				this.setFlag(16);
				showPopupWindow("",
					this.addPersonRandomString("music", 5, "height:max%", "left") +
					"</div><div style='position:absolute;left:50%;top:10%;width:50%'><p style='text-align:center;margin-top:-12px;font-size:large'><b>Another Musical Interlude</b><br><br>" +
					'You see Tess is listening to music once again, and once again naked. You should ask her sometime why, but maybe another time...</p>',
					'', "background-color:white;color:black;"
				);
				return true;
			}
		}
		
		if (Place == 29 && this.other == 5 && ((nMana < 10 && (nTime - this.extra[0] > 24)) || (nTime - this.extra[0] > 288)) && perYourBody.FindItem(24) === 0) {
			// Event for research completed
			// Happens 2 hours after asking and you have < 10 mana or 24 hours later period
			PlaceI(24, 29);
			this.setFlag(3); // Found it, but basically unused as perTess.other is the controlling flag here
			this.other = 2;	// set her able to be sent to your home
			this.extra[0] = 0;
			perYou.addExperience(1);
			showPopupWindow("Tess\'s Research",
				this.addPersonString("tess5a.jpg", "height:max%", "right") +
				'"I\'m so glad that you\'ve returned ' + perYou.getPersonName() + '. Through my research I found the location of this gold stone, it was in the library archives and Monique got it for me. Please take it..." she says, her eyes straying all over your body as she begs you.</p>' +
				'<p><img src="Images/Items/stone3.png" style="float:left;width:10%;margin-right:5px" alt="Stone">' +
				'The stone is not like any other you have seen before, a gold colour but probably more like iron pyrites than actually gold. You know the difference from your days of collecting minerals, you have some of it in your collection in your room. ' +
				'You reach out to touch it and feel a tingle and you can sense the power in it, so you now know about these different sort of stones.</p>'
			);
			return true;
		}
		
		return false;
	};

	per.showEventBedroom = function()
	{
		var md;

		if (sType == "tessprivate") {
			// Talking to Tess
			md = WritePlaceHeader();

			var perJ = findPerson("JohnAdams");
			var perTanika = findPerson("MrsTanika");
			var clvT = perTanika.getCharmedLevel();
			var nmT = perTanika.getPersonName();
			var nmTs = perTanika.getPersonNameShort();

			var myName = this.getYourNameFor();

			// State changes
			if (this.other == 10) this.other = 11; //  Opening up the option for Tess to Talk about her husband.

			// Comments
			//if (sType === "enter") {
				//WriteComments('"I\'m so glad that you like it '+ myName +'. Here, do you want to kiss these?" She asks, exposing her breasts for your viewing pleasure.<br>');
				//setQueryParams('');
			//}

			// Images
			if (!isDay()) this.showPerson("tess20b.jpg");
			else if (this.other == 27) this.showPerson("tess14c.jpg");
			else this.showPerson("tess8.jpg");

			// Title
			addPlaceTitle(md, "Mrs. Adams In Your Bedroom");

			// Description
			md.write('<p>Mrs. Adams holds her breasts out for you to play with. You take your time to explore her mounds and she groans as your fingers touch each nipple.</p>');

			// Questions
			startQuestions();
			
			if (this.other == 11) addQuestionC(md, '"Tess, do you have any magic artifacts?"', "Tess", 2011);
			else if (this.other == 12) addQuestionC(md, '"Ask your husband for magic, but do <b>NOT</b> tell him about <i>us</i>."', "Tess", 2012);
			else if (isDay() && perJ.checkFlag(2)) addLinkToPlaceC(md, 'Tess, "Maybe you could change your outfit?"', 46, '', '&quot;Of course my love, I will change for you immediately&quot;', '', 'TessChangeClothes();');
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

			// Tess only
			addLinkToPlaceC(md, 'play with Tess even more', Place, 'type=tessplaymore');
			if (checkPlaceFlag("Hotel", 9)) addLinkToPlaceC(md, 'light bondage play with Tess', Place, 'type=tessbondageplay');
			// Both Tess and Tracy
			if (getCharmedLevel("Tracy") == 2) addLinkToPlaceC(md, "invite Tracy to join Tess and yourself", Place, 'type=tesstracy');
			// Both Tess and Mrs Tanika
			if (perTanika.whereNow() == 46) {
				addLinkToPlace(md, "ask Tess and " + nmTs + " to work together for you", Place, 'type=tesstanikathreesome');
				addLinkToPlace(md, "ask " + nmTs + " and Tess to play with each other", Place, 'type=tanikatesssex');
			}

			if (this.other > 24) {
				if (isShopOpen(2, 1, true)) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
				if (wherePerson("JohnAdams") == 230) addQuestionC(md, '"Tess, let\'s visit ' + findPerson("JohnAdams").getPersonName() + '"', "Tess", 10422);
			}

			this.addDancingLink(md, 'talk to Tess about dancing in the club',
				'You ask Tess about dancing and mention the Avernus club. She looks uncertain,</p>' +
				'<p>&quot;My love, I could dance for you here, but for others...&quot; and you tell her how beautiful she is and you want to show her off to everyone. She is still not sure but replies,</p>' +
				'<p>"It\'s ok, I will give it a try" and with that you call Jade to arrange a dance for Tess.'
			);
			this.addSleepLink(md, "go to bed for the night with Tess", "Going to Bed with Tess", 
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you prepare to go to bed for the night, Tess lies down on the bed looking beautiful as always. She looks at you with desire and you can see you will not be sleeping for a while...</p>',
					'tess20c.jpg', true
			);

			addLinkToPlace(md, 'finish playing with Tess', 46);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "tessplaymore") {
			// Event: Play with Tess alone ib your bedroom
			md = WritePlaceHeader();

			if (!isExplicit()) this.showPersonRandom("tess-play", 2);
			else if (perYou.isMaleSex()) AddImageGM("GenericSex/Explicit/sex-mf pussy h.jpg");
			else AddImageArray(["GenericSex/Explicit/sex-ff lick f.jpg", "GenericSex/Explicit/sex-ff lick g.jpg"]);

			addPlaceTitle(md, "Playing with Tess\'s Body");

			md.write(
				'<p>You ask Tess for something more, and she asks, "You mean you want to make love?"</p>' +
				'<p>She asks in such a cute and almost hesitant way there is no way you could say no, and you nod your head "yes". Tess embraces you and have a wonderful sexual encounter with her</p>' +
				'<p>After she says "I wish I had you only to myself!"</p>'
			);

			startQuestions();
			addLinkToPlace(md, "return to your bedroom", 46);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tessbondageplay") {
			// Event: Bondage Play with Tess alone ib your bedroom
			md = WritePlaceHeader();

			if (isExplicit() && perYou.isMaleSex()) this.showPersonRandomX("bondageplayb", 1);
			else this.showPersonRandom("bondageplay", 4);

			addPlaceTitle(md, "Playing Tie-up Games with Tess");

			md.write(
				'<p>Since you learned of Bambi\'s skill in bondage she has loaned you some basic gear to "play with" when you like.</p>' +
				'<p>You decide you "like" to try it now and discuss with Tess some light play. She is a little uncertain, this is clearly something she has not experimented with in the past. You play at binding her and she makes a performance of struggling to get free.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "release her and return to your bedroom", 46);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "tesstracy") {
			// Threesome with Tess and Monique
			md = WritePlaceHeader();
			if (isExplicit() && perYou.isMaleSex()) findPerson("Tracy").showPersonRandomX("tesstracyb", 1);
			else findPerson("Tracy").showPersonRandom("tesstracy", 3);

			addPlaceTitle(md, "Tess and Tracy");

			md.write(
				'<p>You ask Tracy to join Tess and yourself, Tracy has no reservations, looking on it as a bit naughty and playful. Tess looks a little uncertain, she can see what you want but she has previously state a preference to have you to herself. Also involving your sister seems a bit kinky for her. Despite this she responds "For you my love, anything".</p>' +
				'<p>The three of you play with each others bodies to many mutual climaxes. Tracy is eager to please both yourself and Tess, but Tess is more reserved, more focused on you and your pleasure, her desires and thoughts only on you.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "thank them and return to your bedroom", 46);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 46 && sType !== "endgame1tess") return this.showEventBedroom();
		
		var md, img, perJohn, nmJ, plcJ;
		
		if (Place == 96 && this.isHere() && sType === "") {
			md = WritePlaceHeader();
		
			this.showPerson("tess1a.jpg");
			addPlaceTitle(md, "Tess Adams Hiding?");

			md.write(
				'<p>You see Mrs. Adams sitting on a chair in the office, looking very nervous, she looks up "John...." but her voice trails away as she sees you.</p>' +
				'<p>"Oh ' + perYou.getPersonName() + '...sorry I ran out on you, I really had to see my husband, but he is not here, but I called he will be soon...I should go and wait for him...."'
			);

			startQuestions("You have to hurry..");
			addLinkToPlace(md, "order Tess to stay", Place, 'type=charmtess2');
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 29 && sType == "learnpass") {
			// Tess Adam's Learn Pass
			md = WritePlaceHeader(true);
			md.write(
				'<table style="width:100%"><tr><td style="width:70%" style="vertical-align:top"><div style="text-align:center">' +
				'<p style="font-size:x-large"><b>Tess Adams Research</b></p>' +
				'<p>I want to look up the word(s):</p>');

			md.write('<form method="POST" name="FormChar">');
			md.write('<p><input type="text" size="20" name="research"><input type="button" name="button" value="please" onClick="ResearchOLD(\'T\', document.FormChar.research.value)"></p>');
			md.write('</form><p>');
			addLinkToPlace(md, 'Never mind...', 29);
			AddPeopleColumnLarge(md);
			if (isCharmedBy("Tess")) this.showPerson("tess5a.jpg");
			else this.showPerson("tess5.jpg");
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 29 || Place == 96 || Place == 230) {
			if (sType == "charmtess1") {
				// Charm Tess Adams 1
				md = WritePlaceHeader();

				this.showPerson("tess1a.jpg", "height:max");
				addPlaceTitle(md, "Tess Adams Under a Spell");
				md.write(
					'<p>As you look at Mrs. Adams, you let the words come, speaking them with a clear succinct purpose, "Dai Chu Tess Adams"</p>' +
					'<p>You can feel the drain of the mana fleeing your body, rushing out as it takes form under the ' +
					'conditions of your spell, then flashing into the body of the woman before you. The confusion comes first, playing ' +
					'across her features as the spell takes hold in her mind, its tendrils snaking about. Nothing in its path remains ' +
					'untouched, her body suddenly finding itself seized with a growing wave of desire. Her ego, her ambitions, all fall to ' +
					'dust against the spell you have cast, as a sense of exhibitionism ' +
					'instills itself in the fertile soil of her mind, then begins to grow with a sudden speed and urgency.</p>' +
					'<p>As the disks and papers lie forgotten on the floor, she looks ' +
					'your way, eyes steadily growing hotter and hotter as a growing passion, a lust, appears in them. Her lips part as ' +
					'her tongue snakes across them, an almost hungry twitch as ' +
					'she shifts slightly in her chair. Still her eyes conveyed a nervous sense of confusion, hands working against each ' +
					'other as they attempt to fight the urge to run themselves all over her body.</p>' +
					'<p>"Oh ' + perYou.getPersonName() + '...". Her voice is a throaty moan as she shifts in her chair, ' +
					'legs pressed tightly together, her body almost squirming, ' +
					'&quot;I suddenly feel so... so alive! It must be the warmth in here... I... I think I should really go and see ' +
					'my husband about this... feeling... Do you... do you mind if I go?&quot;</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "order Tess to stay", Place, 'type=charmtess2');
				addLinkToPlaceO(md, "do not reply and go to the reception area.", 3, "type=flee");
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmtess2") {
				// Charm Tess Adams 2
				md = WritePlaceHeader();

				this.showPerson("tess2.jpg");
				addPlaceTitle(md, "Tess Adams Under a Spell");
				md.write(
					'<p>You order her rather firmly to stay, and even though she seems slightly distressed at it, she remains where ' +
					'she is, her eyes closing as she fights to suppress a low moan of arousal from escaping her throat, still ' +
					'blissfully ignorant of your control over her.</p>' +
					'<p>Slowly, almost as if rising unbidden, her hand moves to her blouse, slim fingers trailing up against the ' +
					'buttons, idly fingering at one or another until they make their way to her throat. She lightly pulls at the collar ' +
					'of her blouse, cheeks flushing slightly as she feels the rising need to show off her body to you, a heat flashing ' +
					'through her skin, urging her to seek a minor bit of relief. Then, reluctantly at first, she slips the first ' +
					'button undone, exposing the first flash of the soft plain ' +
					'of flesh hidden beneath the soft texture of the blouse, followed swiftly by a second, then a third, each coming ' +
					'undone faster than the one before it, steadily revealing ' +
					'the teasing view of the valley of her breasts all the way down to just below their lower slopes.</p>' +
					'<p>A low, sultry tone escapes from her mouth as her eyes begin to smolder with a hungry passion, &quot;You know... ' +
					'a lot of men look at me when I walk by... You know what they\'re looking at don\'t you? They want to see these ' +
					'tits, my big, wonderful titties. You look like you want to see them too. You do don\'t you? I don\'t mind... I want ' +
					'you to see them... I want you to see ALL of me...</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "tell Tess to show you more.", Place, 'type=charmtess3');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmtess3") {
				// Charm Tess Adams 3
				md = WritePlaceHeader();

				this.showPerson("tess3.jpg");
				addPlaceTitle(md, "Tess Adams Under a Spell");
				md.write(
					'<p>&quot;Mmm... so you DO want to see more!&quot; ' +
					'A tremor of excitement rises in her voice, a pitch of hungry ' +
					'desire: &quot;I have sooo much more to show you too...All you have to do is say please darling...&quot;</p>' +
					'<p>Her breasts fall from the white confines of the blouse, standing firm and ripe upon her chest. More and ' +
					'more she feels the thrilling rush of this exhibition rushing through her body, a moan of need escaping her ' +
					'lips as her hand snakes down, seeking out the junction between her legs with a hungry rush. As the spell\'s hold ' +
					'grows over her mind, she begins to feel the thoughts of her husband and all others in her life fading away, replaced by a ' +
					'burning hunger for the one before her, for you. Her mind fills with the desire to submit, to be owned, to serve.</p>' +
					'<p>Her will has been consumed by the fury of the spell, and she belongs ' +
					'to the magic, and more importantly, she belongs to the one who wielded the magic: You.</p>' +
					'<p>As she lets out hoarse, empassioned gasps of need, she manages to get out, &quot;Please... all you need to say ' +
					'is please ' + perYou.getPersonName() + '... I need you to say it... Please, please say please...&quot;</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "order Tess to finish herself off.", Place, 'type=charmtess4');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmtess4") {
				// Charm Tess Adams 4
				md = WritePlaceHeader();
				this.showPerson("tess4.jpg");
				addPlaceTitle(md, "Tess Adams Under a Spell");
				md.write(
					'<p>Tess eagerly obeys your order, pumping her fingers faster and faster into herself, two digits pushing past ' +
					'the displaced panties, plundering deep into her body. Her thumb presses against the budding nub of her clit, ' +
					'almost mashing it with her eager movements. Suddenly a low moan escapes her lips as her body is suddenly seized ' +
					'by a massive force, taking her and throwing her over the edge as she\'s consumed by the explosive force of an orgasm.</p>' +
					'<p>"Oh ' + perYou.getMaster() + '..." Her lips part as she smiles, a dreamy sigh escaping her lips as she rides the blissful wake of her climax, now completely enslaved by the spell. ' +
					'"That was wonderful... Do... do you think we could do it again sometime?"</p>'
				);

				startQuestions();
				if (this.place == 96 || this.place == 230) {
					// At John Adams office
					addQuestionC(md, '"Tess, let\'s meet back at the library"', "Tess", 10421);
					addQuestionCO(md, 'order Tess to come to your house and wear something sexy', "Tess", 2002);
				} else {
					// At the library
					addLinkToPlaceC(md, "talk to Tess Adams", 29, 'type=continue');
					addLinkToPlace(md, "go to the library reception", 3);
				}
				WritePlaceFooter(md, "Script by EH");
				return true;
			}			
		}
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showertess") {
				md = WritePlaceHeader();

				this.showPerson("tess-shower1.jpg");
				addPlaceTitle(md, "Shower and Tess Joins You");
				md.write(
					'<p>You haven\'t even activated the shower when you hear a soft knock on the door followed by Tess peeking in, dressed in nothing more than probably her tightest jeans.</p>' +
					'<p>“I saw you heading to the shower and couldn\'t help but think that I do feel a little dirty as well.” She gives you a sultry look. “Would you like to share the shower, my love?”</p>'
				);
				startQuestions();
				addLinkToPlace(md, '"Of Course!"', Place, 'type=showertessjoin');
				addLinkToPlace(md, '"Not this time"', Place, 'type=showertessno');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showertessno") {
				md = WritePlaceHeader();
				perYou.showPerson("shower.jpg");
				addPlaceTitle(md, "Showering");
				md.write(
					'<p>As much as you would love to, taking a shower with Tess would take up more time than you are able to spend right now. Tess looks disappointed when you ask for a raincheck, but you know she won\'t be for long, and the two of you will get to make up for the lost opportunity.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showertessjoin") {
				md = WritePlaceHeader();
				this.showPerson("tess-shower2.jpg");
				addPlaceTitle(md, "Showering with Tess");
				md.write(
					'<p>Tess smiles brightly, opens her pants and approaches you with a playfully seductive sway off her hip, her eyes hungrily on you as she stops right in front of the shower, pushes her pants down in a single, sensual motion and... somehow gets her legs tangled up trying to step out of them.</p>' +
					'<p>You manage to catch her as she falls, but with the slippery bathroom floor you, too, lose your balance and hit the floor with her in your arms.</p>' +
					'<p>“Oh my god! I\'m so sorry! Are you okay?” Tess looks to be close to panicking, but luckily you got out of this without mayor bruises.</p>' +
					'<p>“Do you need me to get first aid? Just stay here and I....” You interrupt her by pulling her into a kiss,  and after she had calmed down quickly assure her that you are fine.</p>' +
					'<p>“Oh... okay...” Tess gives you an uneasy smile. “Do you... still want to...?”</p>' +
					'<p>You answer her with another kiss, adjusting your position just enough to allow her to straddle you before turning on the water.</p>' +
					'<p>You are not letting this ruin the opportunity to have shower sex with Tess, but, given how accident-prone she is, it\'s probably better you both remain seated.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'finish the shower together and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}			
			return false;
		}
				
		if (Place == 269 && sType == "tesspool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			if (this.checkFlag(12)) this.showPersonRandom("tess-pool", 7, '', '', '', '', 1);
			else this.showPerson("tess-poola.jpg");
			addPlaceTitle(md, "Swimming with Tess");
			if (this.checkFlag(12)) {
				md.write(
					'<p>Tess arrives and un-selfconsciously removes her bikini top before having a playful swim with you.</p>'
				);				
			} else {
				md.write(
					'<p>Tess is weaning a lovely back bikini, and goes for a playful swim with you. After the swim she seems to be lost in thought.</p>'
				);
			}
			startQuestions();
			if (!this.checkFlag(11)) {
				// Ask Tess how she is feeling
				addQuestionR(md, 'ask Tess about her thoughts',
					'“I am sorry my love, it is just a silly thing. I love swimming at the beach but usually we...I go to the sort of beach where swim-wear is optional. I prefer swimming that way, but it would be rather naughty here..."',
					"Tess",
					"setPersonFlag(\\'Tess\\',11)"
				);
			} else if (!this.checkFlag(12)) {
				// Ask Tess how she is feeling
				startAlternatives(md);
				addLinkToPlaceC(md, 'encourage her to be naughty', Place, 'type=tesspooltopless', 'You tell here is it perfectly fine, the pool is generally quite enpty, and anyone who complained is a idiot, Tess is so beautiful after all, Tess smiles,</p>"Thank you" and she removes her top');
				addLinkToPlaceC(md, 'tell her it is a bit public here', Place, '', 'Tess agrees and a little while later gives you a kiss and leaves the pool');
				endAlternatives(md);
			} else {
				addLinkToPlaceC(md, '"Let\'s be naughtier"', Place, 'type=tesspoolsex');
				addLinkToPlace(md, 'later say goodbye to Tess', Place, '', 'Tess gives you a kiss and leaves the pool');
			}
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "tesspooltopless") {
			md = WritePlaceHeader();
			this.setFlag(12);
			this.showPerson("tess-pool-sex.jpg");
			addPlaceTitle(md, "Tess Topless...Bottomless too");
			md.write(
				'<p>Tess does not stop at her top and removes her bikini bottom as well for you,</p>' +
				'<p>"My love..." and she kisses you. A while later she replaces the bottom of her bikini before giving you another kiss before she leaves.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'say goodbye to Tess', Place);
			WritePlaceFooter(md);
			return true;
		}		
		if (Place == 269 && sType == "tesspoolsex") {
			md = WritePlaceHeader();
			if (isExplicit() && perYou.isMaleSex()) this.showPersonX("tess-pool-sexb.jpg");
			else this.showPerson("tess-pool-sex.jpg");
			addPlaceTitle(md, "Private Time with Tess");
			md.write(
				'<p>You ask your beautiful librarian to play with you more privately, and she seductively removes all of her swimsuit and embraces you and kisses you.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'later...say goodbye to Tess', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 194) {

			if (sType === "carsex") {
				// Initial approach for sex in the car
				md = WritePlaceHeader();
				this.showPerson("tess13a.jpg");
				addPlaceTitle(md, "Mrs. Tess Adams");

				md.write(
					'<p>"I\'m so glad that you want me ' + perYou.getPersonName() + '," says Tess, tugging at her skirt.  Her breasts pop out of the too-tight top. "Take me right here in the street. I\'m yours, always, ' + perYou.getPersonName() + '.</p>' +
					'<p>You hesitate. There are too many people around and you don\'t want to create suspicion yet.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"then again we could be discrete"', Place, 'type=carbj');
				addQuestionC(md, 'regretfully tell Tess to take you to her husband', "Tess", 2021);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "carbj") {
				// Being Discrete
				md = WritePlaceHeader();
				if (!isExplicit()) img = this.showPerson(perYou.isMaleSex() ? "tess13b.jpg" : "tess13g.jpg");
				else if (perYou.isMaleSex()) img = this.showPersonArrayX(["tess13ba.jpg","tess13bb.gif", "tess13bc.gif"]);
				else img = this.showPersonX("tess13g.gif");
				addPlaceTitle(md, "Being Discrete with Tess");

				md.write(
					'<p>You tell Tess that this too public, and she grins playfully and says,</p>' +
					'<p>"' + perYou.getPersonName() + ' I know how to be very discrete..."</p>'
				);
				if (!perYou.isMaleSex()) md.write('<p>She asks you to sit in the passenger seat and closes the doors and she kisses you. She then quickly lowers your panties and starts to lick your pussy, to your surprise and delight. As she enthusiastically licks you, you notice her skirt has slid up and her rear is bobbing up too much. You warn her to be careful, a passerby might get an unexpected view!');
				else if (img.indexOf("tess13bb.gif") != -1) md.write('<p>She invites you into the back seat of the car while removing her clothes. Fortunately this is a large expensive car with plenty of space so with only a little bit of difficulty you are able to fuck the beautiful librarian  in the back..seat!');
				else md.write('<p>She asks you to sit in the drivers seat and kneels down with the car door blocking peoples view. She opens your trousers and takes out your cock and to your surprise and delight proceeds to give you a wonderful blowjob.');
				md.write('</p><p>After she looks around to check that no-one seemed to be watching and then gives you a kiss. You must admit you very much enjoyed her mischevious discretion!</p>');

				startQuestions();
				// Learn a training
				if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
				addQuestionC(md, 'tell Tess to take you to her husband', "Tess", 2021);
				WritePlaceFooter(md);
				return true;

			} else if (sType === "tesscar") {
				// Meet Tess at the shopping center in John's car
				md = WritePlaceHeader();
				this.setFlag(14);
				this.showPerson("tess_driving.jpg");

				addPlaceTitle(md, "Mrs. Tess Adams");

				md.write(
					'<p>Wearing another outstanding outfit, Mrs. Adams beckons you over to her car, though when you approach she does mention that it is not actually her car but her husbands that she is borrowing. With that explained she begins to tell you about some magic that she has found.</p>' +
					'<p>"Oh ' + perYou.getPersonName() + '!" she says between breaths. "Victoria could not help me but I told my...John about what you did to the golden worm. He is very keen to meet with you and told me that he has even more magic items."</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'tell her that you are more interested in her', 194, 'type=carsex');
				addQuestionC(md, 'tell Tess to take you to her husband', "Tess", 2021);
				addLinkToPlace(md, 'leave her and return to the shops', 194);
				WritePlaceFooter(md);
				return true;

			}
		}
		
		if (Place == 231) {
		
			perJohn = findPerson("JohnAdams");
			nmJ = perJohn.getPersonName(false);
			plcJ = perJohn.place;
			
			if (sType == "tesssexenjoy") {
				// Tess in the Adams bedroom
				md = WritePlaceHeader();
				if (plcJ == 231) this.showPerson("tess-sex1m-alt.jpg");
				else if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("tess-sex1m", 4);
					else this.showPerson("tess-sex1m.jpg");
				} else this.showPerson("tess-sex1f.jpg");

				addPlaceTitle(md, "Making Love to Tess Adams");

				md.write(
					'<p>“I\'d never thought I\'d do something so... forbidden...” Tess breathes the words out in-between quick kisses as you slowly guide her towards her marital bed. “Is your heart beating as fast as mine, ' + perYou.getMaster() + '?”</p>' +
					'<p>She is simply adorable when she is all flustered like this, but you do have to admit that it is quite exiting to take a woman ' + (plcJ != 231 ? 'on her own marital bed' : 'while her husband is watching') + '.</p>' +
					'<p>You keep things on a slow burn. Clothes are coming off piece by piece, kisses are long and passionate, and only when there is nothing left covering your bare skin, both of you allow yourself to fall onto the bed.</p>' +
					(plcJ == 231 ? '<p>' + nmJ + ' had to sit down by then, and the position does little to hide the painfully hard bulge in his pants. His eyes are glued to the bed, unable to look away as another ' + perYou.getManWoman() + ' is indulging his wife, making her gasp and moan and writhe in sweet pleasure in ways he could never hope to achieve.</p>' : '') +
					'<p>You are on top of her almost immediately. Your lips seek hers for another kiss, your hands explore her skin, your knee pushes between her tights to spread her legs...</p>' +
					'<p>The slow buildup has left you both eager for more, and only seconds after settling down on the sheets, ' + (perYou.isMaleSex() ? 'you are inside her' : 'your hip is pressed against hers') + '.</p>' +
					'<p>What follows is short, but intense. A blur of rapid motions and vivid sensations, of skin touching skin, lips touching lips and two bodies giving in to desire. Tess\'s spellbound eyes are on you at all time as she begs you to make her cum, reaffirming her love and devotion for you again and again ' + (plcJ != 231 ? 'with no mention of her Husband' : 'right in front of her husband') + ' until her eyes roll back and her body tenses up underneath you in powerful climax.</p>' +
					'<p>It was more of a culmination to the long buildup than the main act, but wonderful nevertheless, and ' + (plcJ != 231 ? 'the two of you remain in bed for a long time to bask in the afterglow.' : 'as you turn around to look at ' + nmJ + ', you find him exhausted, cock in hand, traces of cum on his fingers and his head in a deep shade of red') + '.</p>' +
					(plcJ == 231 ? '<p>Looks like he enjoyed it as well.</p>' : '')
				);
				
				startQuestions();
				addLinkToPlace(md, plcJ == 231 ? 'talk to the Adamses a bit more' : 'talk to Tess a bit more', 231, 'type=' + sWho);
				addLinkToPlace(md, 'exit the Adams home', 229);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tesssexbj") {
				// Tess in the Adams bedroom licking/bj
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("tess-sex2m.jpg");
				else this.showPerson("tess-sex2f.gif");

				addPlaceTitle(md, "Accepting Tess Adams' Love");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>Tess\' eyes lighten up when you tell her to get onto her knees and, knowing exactly what you want, she wastes no time doing so.</p>' +
						(plcJ != 231 ? '<p>You watch Tess as she pulls down your pants and wraps her lips around your manhood, not hesitating for a second to pleasure another man right in the bedroom she usually shares with her husband.</p>' :
											'<p>' + nmJ + ' has to watch as his wife pulls down your pants and wraps her lips around your manhood without even giving him as much as a glance, but from the way his eyes are fixated on your crotch, and the visible bulge on his own, he probably would much rather trade places with her than you.</p>') +
						'<p>Tess never stops looking up to you. Her spellbound eyes are full of adoration as her head bobs back and forth on your shaft, taking it deeply inside in slow, measured motions and occasionally letting it plop free to suggestively trail her tongue around the tip. It is a rather sensual and tender way of doing it, as if she wants to show that she loves your cock just as much as the rest of you. She clearly takes delight in every moan she lures from your lips and it is only fitting that when you finally reach your peak, she eagerly swallows every drop of your load and even thanks you for it.</p>'
					);
				} else {
					md.write(
						'<p>Tess\' eyes lighten up when you tell her to get onto her knees and, knowing exactly what you want, she wastes no time doing so.</p>' +
						(plcJ != 231 ? '<p>You sit down on the bed and watch Tess as she reveals your nether-region and eagerly wraps her lips around your clit, not hesitating for a second to pleasure another woman right in the bedroom she usually shares with her husband.</p>' :
											'<p>' + nmJ + ' has to watch as his wife reveals your nether-region and eagerly wraps her lips around your clit without even giving him as much as a glance, but judging from the way he looks at you, and the bulge in his pants, he is not really opposed to watching you two make out.</p>') +
						'<p>Tess never stops looking at you. Her spellbound eyes are full of adoration as her tongue circles your clit and her fingers slip past your folds. She has a rather sensual and tender way of doing it, taking her time to build up your arousal and watching every single one of your reactions with delight.</p>' +
						'<p>As your own arousal builds, her fingers grow bolder, too, sliding deeper into your wetness to push you closer and closer to your peak with curious skill until a warm wave of pleasure washes over your body and you let yourself fall back onto the bed with a last, blissful moan ' + (plcJ != 231 ? 'under the proud gaze of your lover' : 'with both Tess and ' + nmJ + ' watching you ride out your climax') + '.</p>'
					);
				}
				
				startQuestions();
				addLinkToPlace(md, plcJ == 231 ? 'talk to the Adamses a bit more' : 'talk to Tess a bit more', 231, 'type=' + sWho);
				addLinkToPlace(md, 'exit the Adams home', 229);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 186) {
			var bRight = this.other == 20;    // Got it right
			if (sType == "sex") {
				md = WritePlaceHeader(false, "td-left-large");

				// Sex!
				this.showPerson("tess11c.jpg");
				addPlaceTitle(md, "Making love to Tess");

				md.write(
					'<p>Tess lies back sefuctively and you embrace her and you make love to your mutual ecstasy.</p>' +
					'<p>Later Tess tells you of her love for you, and how she will check for more magic. '
				);
				if (isDay()) {
					startQuestions();
					if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
					addLinkToPlace(md, "walk with Tess to the hotel bar", 124, 'type=afterworm&sex=yes');
				} else {
					md.write(' She looks at you and asks,</p><p>"Night has fallen, why not spend the night here with me?"</p><p>A decidedly tempting proposition, like her last...</p>');
					startQuestions();
					if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
					this.addSleepLink(md, "spend the night with Tess", "",
						"<p style='position:absolute;top:74%;left:55%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Tess</b></p>" +
						'<p style="position:absolute;left:45%;top:75%;cursor:pointer;font-size:1.1em;width:55%">You spend the night with Tess in the hotel, to her delight and your equally great pleasure. In the morning you have a light breakfast with her in the hotel dining room before she leaves to speak to Victoria.',
						'tess11d.jpg', false, 124, 'type=afterworm&sex=yes'
					);

					addLinkToPlace(md, '"Not tonight Tess" and walk with Tess to the hotel bar', 124, 'type=afterworm&sex=yes');
				}
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "answer1" || sType == "answer2") {
				md = WritePlaceHeader(true, "");

				bRight = this.other == 20;    // Got it right
				
				md.write('<table class="table-main"><tr><td>&nbsp;</td><td><img src="Images/goldworm2.png" alt="Gold Worm"></td><td style="vertical-align:top">');

				addPlaceTitle(md, "Golden Worm Answer", '', 0, true);

				if (sType == "answer1") {
					if (bRight) {
						// Correct answer
						md.write(
							'<p>"Correct!" says the worm. "Never before has a human been so clever. Your reward is forthcoming. My power is yours to use as you wish."</p>' +
							'<p>You absorb twenty mana points from the worm.</p>' +
							'<p>The worm then whispers to you, strange words, magical secrets of some sort that expand your magical knowledge.</p>'
						);
						if (isSpellKnown("Transform")) sType = "answer2";		// Already know it
						else {
							// Don't Know The Transform Spell Yet
							md.write('<p>In the words of the worm you realise there is a secret knowledge that could yeild a spell, but you will only get one chance!</p>');
							startQuestions();
							if (perYou.FindItem(4) > 0) {
								if (isRunes()) addOptionLink(md, 'learn the spell', "Research('Spell','AlMass','',186,'type=answer2');");
								else {
									md.write(
										'<p>What are the strange words you heard?</p>' +
										'<p><form method="POST" name="FormChar"><input type="text" size="20" name="research"><input type="button" name="button" value="enter" onClick=ResearchOLD(\"AM\",document.FormChar.research.value)></form></p>'
									);
								}
							} else addLinkToPlace(md, 'unfortunately you do not have the Book', 186, 'type=answer2', 'Regretfully you do not have the book...');

							AddPeopleColumnLarge();
							this.showPerson("tess11b.jpg");
						}

					} else {
						// Wrong answer
						md.write(
							'<p>"Fool!", yells the worm. "Such idiocy deserves nothing. Goodbye, you weak link of the human species"</p>' +
							'<p>You got the answer wrong. Better luck next time you play the game.</p>');
							sType = "answer2";
					}
				}
				if (sType == "answer2") {

					md.write(
						'<p>The worm freezes in place and falls silent. You start to ask Tess if there were any other items like this, and you notice Tess has removed some more of her clothing and is looking at you expectantly. She tells you,</p>' +
						'<p>"I think Victoria may be able to help me, but Love, we have this room for as long as we want, make love to me..."</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, 'no words are needed, embrace her', Place, 'type=sex');
					addLinkToPlace(md, '"Later Tess" and go to the hotel bar', 124, 'type=afterworm&sex=no');

					AddPeopleColumnLarge();
					this.showPerson("tess11b.jpg");
				}
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		if (sType == "endgame1tess") {
			// End Game - Tess
			perJohn = findPerson("JohnAdams");
			nmJ = perJohn.getPersonName(false);
			var bJP = perJohn.isCharmedBy() && !perJohn.isMan();
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Beautiful Librarians" + (bJP ? " and their Husbands" : "") + "?");

			md.write(
				'<p>One day when you return home and see Tess lying on your bed you notice her swollen belly. You know she is not just gaining weight, she looks after her figure, and you suspect Miss Logan\'s influence. You ask Tess and she replies,</p>' +
				'<p>"Yes my love, it is yours!", just so you understood it was not John\'s from <i>before</i>.</p>'
			);
			if (bJP) {
				md.write('<p>Tess suggest you may wish to come with her to the home she shared with John. Curious you go there with her and you immediately see why she brought you here. You see ' + nmJ + ' standing there, just as pregnant as ' + perJohn.getHisHer() + ' wife!</p>');
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			
			if (bJP) {
				AddPeopleColumnLarge(md);
				perJohn.showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;				
		}

		if (Place != 29) return false;			

		if (sType == "all") {
			// Foursome in Tess's Office, ONLY after she returns to the library
			md = WritePlaceHeader();
			AddImageRandom("GenericSex/foursome", 2, "height:max");

			addPlaceTitle(md, "Full Meeting of the Library Staff");

			md.write(
				'<p>You call for Monique and Ms. Titus to join Tess and yourself for a meeting, and Ms. Titus arrives first followed almost immediately by Monique.</p>' +
				'<p>Your loyal slave Monique stands waiting for your orders, but Ms. Titus has already decided, correctly, what this will be a meeting of, as she starts to remove her clothing. As she does she tells Monique, "Strip for ' + perYou.getMaster() + ' slut".</p>' +
				'<p>Monique looks annoyed at Ms. Titus, and you chastise her, "Monique is mine to order around and call a slut if I wish, not yours slave!". Ms. Titus smiles as she finishes removing her clothing and presents herself to you and replies, "Of course ' + perYou.getMaster() + '!".</p>' +
				'<p>You tell Monique to also remove her clothing, and she immediately obeys as your true and loyal slave. You look at Tess, who is looking uncertain, but she starts to remove her underwear as she tells you, "Whatever you want, my love".</p>' +
				'<p>After a little while you have your three beautiful librarians lined up, ready for a meeting '
			);
			if (perYou.isMaleSex()) md.write('with your cock');
			else md.write('of lips, hands and pussies');
			md.write(
				'.</p><p>You take great pleasure from your beautiful librarians, as they do as well. Tess is very focused on you, her passions all centered on you. Monique also prefers to serve you when possible but she is quite fond of Tess and tries to help and please her when she can. Ms. Titus is a complete slut, eager to lick or suck anyone in any way at any time.</p>' +
				'<p>Some time later as the librarians are re-dressing you cannot but help thinking about how much you have come to enjoy visiting the library.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to Tess once the others leave", 29, 'type=continue');
			addLinkToPlace(md, "go to the reception area.", 3);

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "private") {
			// Private Time with Tess at the Library after you ask her to return to the library
			var ar = ["tess-office-1.jpg", "tess-office-2.jpg", "tess-office-3.jpg", "tess-office-4.jpg"];
			if (isExplicit() && perYou.isMaleSex()) {
				ar.push("Explicit/tess-office-1.jpg");
				ar.push("Explicit/tess-office-1.jpg");
			}
			img = this.showPersonArray(ar, '', '', '', '', false, "string");
			md = WritePlaceHeader();
			md.write(img);

			addPlaceTitle(md, "Full Meeting of the Library Staff");

			if (!checkPlaceFlag("Library", 1)) md.write('<p>You close the door to Tess\'s office and as you do Tess');
			else md.write('<p>Tess looks at you and she ');
			setPlaceFlag("Library", 1);
			md.write('removes the rest of her clothing');
			if (img.indexOf("office-4") == -1) md.write('and poses for your pleasure');
			else md.write(' and lies down on her desk');
			md.write(
				'.</p><p>She is completely irresistible and there is no need to resist! You embrace the beautiful librarian and kiss her passionately.</p>' +
				'<p>Some time later, after more than just kissing, you separate from her as she looks up at you wordlessly, but with an expression full of passion.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "talk more to Tess", 29, 'type=continue2');
			addLinkToPlace(md, "go to the reception area.", 3);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "tesstitus") {
			// Threesome with Tess and Ms. Titus
			md = WritePlaceHeader();
			if (isExplicit()) findPerson("MsTitus").showPersonX(perYou.isMaleSex() ? "titustessb.jpg" : "titustessg.jpg");
			else AddImageGM("GenericSex/threesome any b.jpg");

			addPlaceTitle(md, "Ms. Titus Assists Tess");

			md.write(
				'<p>You ask Tess to call Ms. Titus into her office so she can assist her. Tess looks a little uncertain, she can see what you want but she has previously state a preference to have you to herself. Despite this she responds "For you my love, anything".</p>' +
				'<p>The three of you play with each others bodies to many mutual climaxes. Your slave Ms. Titus is completely unreserved, eager and willing to use her mouth, her large breasts, any part of her body. Tess is more reserved, more focused on you and your pleasure, her desires and thoughts only on you.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to Tess", 29, 'type=continue2');
			addLinkToPlace(md, "go to the library reception?", 3);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "tessmonique") {
			// Threesome with Tess and Monique
			md = WritePlaceHeader();
			this.showPerson("tessmonique.jpg");

			addPlaceTitle(md, "Monique Assists Tess");

			md.write(
				'<p>You ask Tess to call Monique into her office so she can assist her. Tess looks a little uncertain, she can see what you want but she has previously state a preference to have you to herself. Despite this she responds "For you my love, anything".</p>' +
				'<p>The three of you play with each others bodies to many mutual climaxes. Monique is anxious to please both yourself and her friend Tess, but Tess is more reserved, more focused on you and your pleasure, her desires and thoughts only on you.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to Tess", 29, 'type=continue2');
			addLinkToPlace(md, "go to the library reception?", 3);

			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1tess" : "";
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance");
		addPlaceTitle(md, "Tess's Dance");
		md.write(
			'<p>Tess is uncertain as she steps onto the stage, but she is gorgeous as always. Her confidence improves and she does an effective partial strip-tease, down to topless, nothing more.</p>' +	
			'<p>After she sits with you for a while, she seems a bit embarrassed so you compliment her dance and her beauty as always. She smiles gratefully and calms down and relaxes with you for a while.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.showPersonTextHere = function(md)
	{
		if (this.whereNow() == 46 && (sType == "anitabj" || sType == "anitafuck" || sType == "tanikafuck" || sType == "tanikabj")) md.write('<p>During the act, you catch Tess watching you from the corner of your eye. Her eyes are locked on your crotch and following every single one of the other woman\'s motions jealously while she subconsciously sucks on her fingers, quickly pulling in her lower lip with a sheepish smile the moment she notices you watching her.</p>');
	};
	
	// Can you chat with Tess or someone else
	per.showPersonChat = function(md)
	{
		if (Place != 230 || !this.isHere() || sType !== "") return;
		
		var perJohn = findPerson("JohnAdams");
		if (!perJohn.isCharmedBy() && perJohn.other > 9) {
			if (perJohn.checkFlag(10)) {
				if (!perJohn.isCharmedBy() && !this.checkFlag(13)) {
					addQuestionC(md, '"I think I prefer you in my bedroom, Tess."', "Tess", 10420);
					if (isShopOpen(2, 1, true)) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
				}
				if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
			}
		} else if (perJohn.isCharmedBy()) {
			addQuestionC(md, '"I think I prefer you in my bedroom, Tess."', "Tess", 10420);
			if (isShopOpen(2, 1, true) && this.place == 230) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Tess Adams  (w/ Door Shut or Shielded)
			if (Place == 29 && this.isHere())  {
				if (checkPlaceFlag("Library", 1) || isSpellKnown("Shielded Charm")) {
					CastCharmSpell("Tess", Place, 1, 'type=charmtess1');
				}	else addComments("Don't cast the spell here. Anyone could see you, with that door open.");
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (Place == 230 && this.place != 230 && isCharmedBy("JohnAdams")) return true;
		if (isShopOpen(2, 1, true) && isAtLocation(2) && this.place != 0) return true;
		// Poledance
		if  (!this.isCharmedBy()) return false;
		if (msg) return true;
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;		
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.other >= 10;
	};

	per.callThem = function() {
		if (Place == 230) {
			receiveCall('',	'You decide to call Tess and ask her to join you and ' + findPerson("JohnAdams").getPersonName() + ' at their home. Tess answers and replies' +
				addOptionLink("string", '"Of course, my love!', "setTimeout(TessGo(230), 100)") +
				addOptionLink("string", 'she sounds nervous, "Can I just wait here?" and you let her', "dispPlace()")
			);
			WriteCommentsFooter(bChat, bChatLeft);
			return;
		}
		if (Place == 269) {
			if (!isDay()) WriteComments("You call Tess to invite her to join you at the pool for a swim, but she replies, \"Sorry My Love, I love swimming, but can we do it in the daytime, it is so much nicer?\". It is hard to refuse her request so you will ask her another time. ");
			else {
				gotoPlace(Place, 'type=tesspool');
				receiveCall('', 'You call Tess to invite her to join you at the pool for a swim, and she answers enthusiastically, "Of course My Love, I will join you there"');
				WriteCommentsFooter(bChat, bChatLeft);
			}
			return;
		}
		if (isAtLocation(2)) {
				receiveCall('',	'You decide to call Tess and ask her to join you at the library with the other librrians. Tess answers and replies ' +
				(this.place == 230 && !isCharmedBy("JohnAdams") ? 'nervously "I..John would not like that..I want to but..." and you realise you have to do something about John first. You tell her it is ok and end the call.' :
				addOptionLink("string", '"Of course, my love!', "setTimeout(TessGo(0), 100)"))
			);
			WriteCommentsFooter(bChat, bChatLeft);
			//return;
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function() {
		if (this.whereNow() == 194 && !this.checkFlag(14)) {
			// SMS 321, at the shops
			if (this.makeCall(true, 321)) this.setFlag(14);
		}
		return '';
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 320: 
				if (checkPersonFlag("JohnAdams", 9)) return receiveSMS('Tess', 'My love, John has calmed down and I have “persuaded” him to not call the police, but now he says he doesn\'t want me to see you ever again!') + receiveSMS("Tess", 'I don\'t want to make this decision without you in case you have a way to make him see reason, but one word and I -will- divorce him! He can not keep us apart forever and I miss you so much. :-*');
				else return receiveSMS('Tess', 'My love, I need your help. John does not want me to see you ever again and I fear that he will involve the police if we do meet. I am sure that you can make him see reason. You are amazingly charming, and he can not keep us apart forever! I miss you so much. :-*');
				break;
			case 321:
				return receiveSMS('Tess', 'I have got away while John is at work for a bit. Meet me at the shopping center?', 'tess13a.jpg');
		}
		return '';
	};
}

function TessGo(plc)
{
	ClearComments();
	var perTess = findPerson("Tess");
	perTess.place = plc;
	dispPlace(Place, '', perTess.addPersonFace() + 'Tess arrives a little while later, she appears to have caught a taxi to get here as soon as possible');
}
