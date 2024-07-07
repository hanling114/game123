/**************************************************************************
Louise
**************************************************************************/

function RepliesLouise(nR)
{
	if (nR == 2600)
	{
		setPlaceKnown("CelesteRd");
		setPlaceKnown("LouisesApartment");
		addComments('"Oh, ' + per.getYourNameFor() + ', it is apartment 14 at the North Celeste Apartments, please come and visit any evening!"');
	}
	return true;
}

function initialiseLouise()
{
	// Louise, Leanne's employee
	addPerson("Louise", 0, "Louise", "");
	
	per.Replies = RepliesLouise;
	
	per.getPersonAddress = function(n) { return isPlaceKnown("LouisesApartment") ? n ? 463 : 'Apartment 14, 42 Celeste Rd' : n ? 0 : ''; };	
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			return this.addPersonString("louise1b.jpg", "height:max%", "right") +
				'Louise, a part-time employee of Leanne, she is friendly and cheerful';
		} else {
			return this.addPersonString("info.jpg", "height:max%", "right") +
				'Louise, your slave never takes her eyes off you when you are in the ' + getShopStore() + '. Usually she’s packing items from one box to an another or tidies up the ' + getShopStore() + ' a bit, but when you are around she always lurks behind you. It would creep you out if you wouldn’t know that Louise is extremely shy and timid. Though her undying love towards draws her to you and is more powerful than her shyness. She doesn’t speak much, but when she does she speaks fondly of you. Her ambitions have changed; she still wants to quit her job so she can take care of you. You reasoned her out of that idea.';
		}
	};
	
	per.getSuffix = function() {
		// 4		- transformed BE
		//	5		- transformed Futa
		var be = this.checkFlag(4) && this.dress === "Monica";
		return be && this.checkFlag(5) ? "befuta" : (be ? "be" : (this.checkFlag(5) ? "futa" : ""));
	};
	
	per.getPersonGender = function() { return this.checkFlag(5) ? "futa" : "woman"; };
	
	per.getModels = function() { return "Monica|Monica Miller,Kayla|Kayla Kayden"; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "facec" : "faceu"; };
	
	per.whereNow = function() {
		if (!isShopOpen(2, 1, true)) return 463;
		if (this.checkFlag(11)) {
			if (isMorning(1, 3)) return 195;		// Explicitly at the general store
			if (this.isCharmedBy() && getDay(true) == "Mon" && !this.checkFlag(12)) return 435;
			return 463;
		}
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.checkFlag(7)) this.setFlag(8);
		this.setFlag(12, false);
		return '';
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 463 && this.isHere() && sType === "") return this.showPersonS("home1" + this.getSuffix() + ".jpg");
		if (Place == 435 && this.isHere() && sType === "") return this.showPersonS("gym" + (this.isCharmedBy() ? "c" : "u") + ".jpg");
		else if (Place == 195 && this.isHere() && sType === "") {
			if (wherePersonNC("Anita") != 195 && wherePersonNC("Leanne") == 195) return '';
			var wid = wherePersonNC("Leanne") == 195 && wherePersonNC("Anita") == 195 ? "50%" : "";
			if (this.isCharmedBy()) return this.showPersonS("louise10" + this.getSuffix() + ".jpg", wid);
			return this.showPersonS(this.checkFlag(1) ? "louise1a.jpg" :  "louise1b.jpg", wid);
		}
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		return (Place == 195 && this.isHere() && wherePersonNC("Anita") != 195 && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		SetRightColumnSize("large");
		if (Place == 195) {
			// General Store
			if (this.isCharmedBy()) this.showPerson("louise10" + this.getSuffix() + ".jpg");
			else this.showPerson(this.checkFlag(1) ? "louise1a.jpg" :  "louise1b.jpg");
		}
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 195 && this.place == 195 && !this.checkFlag(1)) {
			// First encounter with Louise
			if (this.dress === "") {
				//md = WritePlaceHeader();
				this.pickModel(
					'You notice two young women chatting down one isle, one is dressed as a cleaner, the other more casually.</p>' +
					'<p>You think one of them is an employee of Leanne who minds the store when Leanne is home or it is her day off. Is it the one dressed..</p>',
					"louise1b", "Monica", "Kayla", "as a cleaner", "casually", '', 'Is that...');
				//WritePlaceFooter(md);
				return true;
			} else {
				if (!isPlaceKnown("Graveyard")) setPlaceKnown("Graveyard");
				var perLea = findPerson("Leanne");
				perLea.setFlag(1);
				this.setFlag(1);
				var s = this.addPersonString("louise1b.jpg", "height:max%", "right") +
					"You bump into a friendly woman as you run through the " + getShopStore() + "’s back aisle. You haven’t seen her before, but it looks like she works here, because she was mopping the floor persistently before you almost knocked her off her feet. You apologise and like a true " + (perYou.isMaleSex() ? "gentleman" : "lady") + " you offer your hand to help her stand up. She gladly takes your offer while glancing at you.<br><br>" +
					'"Thank you…", she whispers looking at you shyly. You see she’s waiting for your name.<br><br>' +
					'"Ohh… ' + perYou.getPersonName() + '! I’m sorry! I was in a rush and I hadn’t seen you!", you say without hesitation.<br><br>' +
					'"Ohh, no problem! The name’s Louise!", she says and offers her hand to shake.<br><br>' +
					"You accept and make a small talk with her. Louise seems like a fine woman. She’s also hard working and persistent and wants to be more than just a cleaning lady at a small " + getShopStore() + ". She has ambitions of her own.</p>";

				if (perLea.other == 20) {
					//First Time (after minding the store)
					s += '<p>"Would you believe, I\'ve seen people take money from the register when Leanne left them to work?  How sleazy is that?"</p>' +
						'<p>You find yourself feeling embarrassed, and just a little proud that you didn\'t take the money.  "Um, pretty sleazy," you agree.</p>' +
						'<p>She flashes a winning smile.  "But not you.  It\'s good to meet someone I can trust, you know?"</p>' +
						'<p>"Leanne told me if I saw you to tell you she took the rest of the day off. She was looking a bit sad"</p>';
					this.setFlag(2);
				} else {
					s += '"Hey, ' + perYou.getPersonName() + ' Leanne told me if I saw you to tell you she took the rest of the day off. She was looking a bit sad"</p>';
					this.setFlag(3);
				}
				s += '<p>You would not be surprised if she has gone to visit the graves of her family.</p>';
				showPopupWindow("Louise", s);
				perLea.other++;
			}
			return true;

		}
		return false;
	};

	per.showEvent = function()
	{
		var md, bRnd;
		
		if (Place == 463) {
			if (sType == "louisefuck") {
				// Sex scenes at her home
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomXBG("home-sex");
				else this.showPerson("home-sex" + (this.checkFlag(5) ? "futa" : perYou.isMaleSex() ? "b" : "g") + ".jpg");
				addPlaceTitle(md, "Louise");
				md.write(
					'<p>You enjoy yourself with Louise</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Louise', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "louiseninafuck") {
				// Sex scenes at her home with Nina
				md = WritePlaceHeader();
				if (this.checkFlag(5)) this.showPerson("louiseninafuta.jpg");
				else this.showPersonRandom("louisenina", 3);
				addPlaceTitle(md, "Louise and Nina");
				md.write('<p>You call Nina to come and visit Louise\'s apartment and a few minutes later she knocks on the door and Louise lets her in. ');
				if (!this.checkFlag(10)) md.write('You introduce the two but it seems they have met before in passing, at the store, here at the apartments and so on.');
				else md.write('They warmly greet each other, it seems they have become good friends');
				md.write(
					'.</p><p>After talking a little where you see the two of them looking at each other with some interest you suggest moving things to the bedroom. Louise starts to lead you there but Nina seems quite eager and playfully slaps Louise as they are passing though the kitchen area. Things quickly develop with little suggestion from yourself and they are making out and then more on the kitchen floor!</p>' +
					'<p>After a little Louise looks up and gestures for you to join them! While the kitchen floor is not the most comfortable place, at least there are chain and benches to lean on and two hot and eager women!</p>'
				);
				this.setFlag(10);
				startQuestions();
				addLinkToPlaceC(md, 'say goodbye to Nina', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 269) {
			if (sType == "louisepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("louise-pool" + this.getSuffix() + ".jpg");
				addPlaceTitle(md, "Swimming with Louise");
				md.write(
					'<p>Louise arrives and changes into her swimsuit and happily wades out into the pool with you. She gives you a quick flash but she is not willing to go any further here in the pool.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"I didn\'t want to swim anyway"', Place, 'type=louisepoolsex');
				addLinkToPlaceC(md, 'say goodbye to Louise', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "louisepoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandomRorXBG("louise-pool-sex", 1);
				addPlaceTitle(md, "Louise at the pool");
				if (perYou.isMaleSex()) md.write('<p>Louise is quite content to just suck your cock by the water.</p>');
				else md.write('<p>Louise is quite content to just lick your pussy by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Louise', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		
		if (sType == "endgame1louise") {
			// End Game - Louise
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Shops?");

			md.write(
				'<p>One day you go out with Louise for a picnic and swim and as she stands there in the water you see she has been learning from Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "louisetransformcock" && t) {
			// Futa transformation
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(5)) {
				showPopupWindow("Transformation",
					this.addPersonString("transformcock" + this.getSuffix() + ".jpg", "height:max%", "right") +
					'<p>You cast the spell and Louise cries out, "God, what is this" and pulls down her uniform. You see a large cock growing from her groin above where her pussy is.</p>' +
					'<p>As she groans you can distinctly hear someone laughing but it is drowned out as Louise cries out in ecstasy as her new cock spasms in her first male ejaculation.</p>' +
					'<p>Louise is confused why you did this and you cannot help but wonder if it was a good thing, but then again as you watch her stroking her new cock you put these worries out of your mind.'
				);
				this.setFlag(5);
			} else {
				showPopupWindow("Transformation", 
					this.addPersonString("transformnocock.jpg", "height:max%", "right") +
					'<p>You cast the spell and Louise cries out, "God, what is this" and pulls down her uniform. You see her cock diminishing from her groin above where her pussy is.</p>' +
					"<p>As she groans you can distinctly hear someone laughing but it is drowned out as Louise cries out in ecstasy as her pussy spasms in her female ejaculation.</p>" +
					"<p>Louise is confused why you did this and you cannot help but wonder if it was a good thing, but then again as you watch her fingering her pussy you put these worries out of your mind.</p>"
				);
				this.setFlag(5, false);
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "louisetransformbody") {
			// Body transformation
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (this.dress == "Monica") this.dress = "Kayla";
			else this.dress = "Monica";
			showPopupWindow("Transformation",
				this.addPersonString("home-sexb.jpg", "height:max%", "rightpopup") +
				'You cast the spell and Louise cries out something inarticulate and you see her figure shifting and her face distorting. After a few minutes the changes settle down and she looks back at you smiling again, almost as it nothing happened.</p>' +
				'<p>She looks like a completely different person, even her clothing is different. You ask her if she is feeling good and she answers "Why ' + this.getYourNameFor() + ' is there something wrong?".</p>' +
				'<p>She certainly seems to be the same Louise she was before despite her different appearance.'
			);
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "louisetransformbreasts") {
			// BE Transformation
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(4)) {
				this.setFlag(4);
				if (this.dress !== "Monica") {
					showPopupWindow("Transformation, Sort Of",
						this.addPersonString("info.jpg", "height:max%", "right") +
						'<p>You cast the spell and is washes overs but nothing seems to happen, possibly her breasts changed slightly. You feel the spell has worked but any real effects will only be visible under other conditions. The word \'model\' comes to mind but you do not know what that means.'
					);					
				} else {
					showPopupWindow("Transformation",
						addImageString('GenericSex/be c.jpg', "50%") +
						'<p>You cast the spell and Louise cries out, "God, what is this" and pulls apart her uniform. You see her breasts swelling, growing larger and larger.</p>' +
						'<p>As she groans you can distinctly hear someone laughing but it is drowned out as Louise cries out in ecstasy as her breasts stop growing.'
					);
				}
			} else {
				this.setFlag(4, false);
				if (this.dress !== "Monica") {
					showPopupWindow("Transformation, Sort Of",
						this.addPersonString("info.jpg", "height:max%", "right") +
						'<p>You cast the spell and is washes overs but nothing seems to happen, possibly her breasts changed slightly. You feel the spell has worked but any real effects will only be visible under other conditions. The word \'model\' comes to mind but you do not know what that means.'
					);					
				} else {
					showPopupWindow("Transformation",
						addImageString('GenericSex/bs d.jpg', "50%") +
						'<p>You cast the spell and Louise cries out, "God, what is this" and pulls apart her uniform. You see her breasts diminishing, becoming smaller and smaller.</p>' +
						"<p>As she groans you can distinctly hear someone laughing but it is drowned out as Louise cries out in ecstasy as her breasts stop diminishing.</p>"
					);
				}
			}				
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 435) {
			if (sType == "louisegymshower") {
				md = WritePlaceHeader();
				addPlaceTitle(md, "Louise's After Train");
				this.showPerson("gymshower.jpg");
				md.write(
					'<p>You step over to talk to Louise, and she says she is just about finished, just keeping up her muscle tone more than anything. She is covered in some sweat as is to be expected and she suggests "I need a shower, how about some company?"</p>' +
					'<p>You of course follow her to a relatively private shower, or at least so you are not visible to other people easily.</p>' +
					'<p>Later after she has cleaned you and herself, and ensured a happy ending to the shower, you leave her for now, promising to meet her another time!</p>'
				);
				this.setFlag(12);
				startQuestions();
				addLinkToPlaceC(md, 'say goodbye to Louise', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place != 195 || this.place != 195) return false;
		
		if (sType == "recharmlouise") {
			// Recharm Louise
			md = WritePlaceHeader();
			this.showPerson("louise4.jpg");			
			addPlaceTitle(md, "Louise Under a Charm Spell Again");

			if (this.getCharmedLevel() == 4) {
				this.charmThem(3);
				md.write(
					'<p>You tell Louise, "You want to be my lover, and for me to love you don\'t you...You do love me..."</p>' +
					'<p>You continue flattering her and then notice the spell is taking effect and she is becoming aroused at your words and shifting to become your lover.</p>'
				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>You tell Louise, "You my love and will do <i>anything</i> I want for me to love you, you want me so much you will become my slave?"</p>' +
					'<p>She answers, "Yes of course, anything, ' + perYou.getMaster() + '"</p>'
				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Louise', Place);
			WritePlaceFooter(md);
			return true;				
		}

		if (sType == "riskjob") {
			// Play/repeat sex
			md = WritePlaceHeaderNI();
			this.showPersonRandomRorXBG("louise12.jpg", perYou.isMaleSex() ? 1 : 2);

			addPlaceTitle(md, "Risking your " + (this.isLover() ? 'Lover' : 'Slave') + "'s Job");

			if (this.isLover()) {
				md.write(
					'<p>"I\'m so glad we became lovers" Louise says, her hands moving seemingly without her direction to undress herself.</p>' +
					'<p>"I want to be with you whenever you like and I know you won\'t take me for granted and every moment with you is pure bliss. Shall we make love now?"</p>' +
					'<p>"Yes", you say honestly.</p>'
				);
				
			} else {
				md.write(
					'<p>"I\'m so glad I decided to be your slave, ' + perYou.getMaster() + '," Louise says, her hands moving seemingly without her direction to undress her.</p>' +
					'<p>"Now I can be available for you whenever you like and I won\'t care for a moment if you take me for granted and every moment of obedience is pure bliss.  Do you wish to take me now?"</p>' +
					'<p>"Yes", you say honestly.</p>'
				);
			}

			if (!this.checkFlag(6)) {
				//havent' taken the stone yet.
				md.write('<p>As you and she are enjoying yourselves behind the counter, you notice a familiar stone in the general ' + getShopStore() + '\'s lost and found box.</p>');
			}

			startQuestions();
			if (!this.checkFlag(6)) addQuestionCO(md, 'grab the stone from the bin', "Leanne", -416);	//havent' taken the stone yet.
			addLinkToPlace(md, 'leave your ' + (this.isLover() ? 'lover' : 'slave') + ' to clean up', 194);

			WritePlaceFooter(md, "Script by Tilde");
			return true;

		} 
		
		if (sType == "charmlouise1") {
			// Charm 1
			md = WritePlaceHeaderNI();
			this.showPerson("louise2.jpg");
			addPlaceTitle(md, "Louise Under a Spell");

			md.write(
				'<p>"Dai Chu Louise," you whisper, almost to yourself. You feel the mana leave you and her eyes ' +
				'begin to glow, yet she seems unaffected.</p>' +
				'<p>"Did you say something?" she asks innocently.</p>' +
				'<p>"Dressy shoes," you stammer quickly, wondering what could have gone wrong. "I was wondering why ' +
				'you\'re wearing such nice shoes to work."</p>' +
				'<p>"You have a good eye," she says, appreciative. "I\'m planning to surprise my ' + perYou.getSex() + 'friend after work. ' +
				'I\'m not sure it\'s worth it these days, though. I mean, ' + perYou.getHeShe() + ' can be such a jerk, you know?"</p>' +
				'<p >She looks oddly melancholy, particularly for someone you\'ve	just charmed.</p>' +
				'<p >"Um, is there anything I can do to help?" you ask, still trying to work out why her eyes are glowing if the charm spell didn\'t work.</p>' +
				'<p>"Look," she says. "I trust you, so please be honest with me."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'tell her "You can trust <i>me</i>."', Place, 'type=charmlouise2');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "charmlouise2") {
			// Charm 2
			md = WritePlaceHeaderNI();
			this.showPerson("louise3.jpg");
			addPlaceTitle(md, "Louise Under a Spell");

			md.write(
				'<p >She pulls down her uniform to reveal that she isn\'t wearing anything underneath.</p>' +
				'<p >"I\'ve been wondering recently if my ' + perYou.getSex() + 'friend is taking me for granted. If you were my ' + perYou.getSex() + 'friend, ' +
				'would you take a body like this for granted?"</p>' +
				'<p >You smile to yourself before you respond.<i>This is more like it.</i></p>' +
				'<p >"You know I\'ll always tell you the truth, right Louise?" you ' +
				'say, and she nods, eager to hear what you have to say. "If I were your ' + perYou.getSex() + 'friend, ' +
				'I probably <i>would</i> take you for granted," you admit.</p>' +
				'<p >"Oh," she says, crestfallen.</p>' +
				'<p >"But if you were <i>my</i> lover, you wouldn\'t mind it."</p>' +
				'<p >She doesn\'t question these words for a moment. She accepts them as absolute law. ' +
				'As you watch she pulls out her cell phone and leaves a breakup message on her ' + perYou.getSex() + 'friend\'s voicemail.</p>' +
				'<p >"That\'s done," she says, "I want to be your lover. What do I need to do to become your lover? Please, be honest with me."</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, '"Show me more now..."', Place, 'type=charmlouise3', '', '', "charmPerson('Louise',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, '"Please show me more..."', Place, 'type=charmlouise3', '', '', "charmPerson('Louise',3);");
				endAlternatives();
			}
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "charmlouise3") {
			// Charm 3
			md = WritePlaceHeaderNI();
			this.showPerson("louise4.jpg");
			addPlaceTitle(md, "Louise Under a Spell");

			if (this.isLover()) {
				md.write(
					'<p>She pulls her outfit off entirely, revealing more of her gorgeous body.<p>' +
					'<p>"What else must I do?" she ask.  She doesn\'t sound annoyed so much as anxious.<p>' +
					'<p>"Honestly?" you say, and she nods eagerly.  "I\'m not seeking an exclusive relationship but I will be honest and care for you"<p>' +
					'<p>She frowns at that.  "That sounds..I mean I would prefer to be the only...I don\'t know if..."<p>' +
					'<p>You stress being honest, caring, loving to her while the spell works on her mind. She looks at you puzzled.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'say "All you have to do is trust and love me"', Place, 'type=charmlouise4');				
			} else {
			md.write(
					'<p>She pulls the janitor outfit off entirely, revealing more of her gorgeous body.<p>' +
					'<p>"What else must I do?" she demands.  She doesn\'t sound annoyed so much as anxious to get it done.<p>' +
					'<p>"Honestly?" you say, and she nods eagerly.  "I\'m not looking for an equal relationship. ' +
					'I would rather have a harem of slaves who obey my every whim."<p>' +
					'<p>She frowns at that.  "That sounds really immoral."<p>' +
					'<p>"It isn\'t immoral at all," you say.  "If all of the slaves want to be slaves, long to be owned, ' +
					'then there is nothing wrong about it."  She trembles gently at the word owned.<p>' +
					'<p>She nods slowly.  "Well, I suppose I can\'t argue with that."  You smile inwardly. ' +
					'Her words are truer than she knows.  "Still," she continues.  "I don\'t know if... if that kind of life... ' +
					'if that\'s something I could ever choose."<p>'
				);	
				startQuestions();
				addLinkToPlaceC(md, 'ask "Do you want to know the <i>honest truth</i>?"', Place, 'type=charmlouise4');				
			}
			WritePlaceFooter(md, "Script by Tilde, adapted for lover path");
			return true;
		}
		
		if (sType == "charmlouise4") {
			// Charm 4
			md = WritePlaceHeaderNI();
			this.showPerson("louise5.jpg");
			addPlaceTitle(md, "Louise Under a Spell");

			if (this.isLover()) {
				md.write(
					'<p>"Of... Of course I trust you,,I want to love you.." she says.</p>' +
					'<p>You reply the onlu way you can answer and the spell demands.  "I <i>do</i> love you Louise.  You do lover me too"</p>' +
					'<p>Again, she doesn\'t miss a beat.  Her mind absorbs this, accepts it as Truth, and moves on to dealing with what that means.  "Then I am yours, I want you so badly it hurts!  I need you to be my lover!"</p>' +
					'<p>You again reinforce "You love me" you say.  It isn\'t a question.</p>' +
					'<p>"Of course!" she answers.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'ask her to show even more', Place, 'type=charmlouise5');				
			} else {
				md.write(
					'<p>"Of... Of course I want the truth.  I trust you completely," she says.</p>' +
					'<p>You snap the trap shut.  "You <i>do</i> want to be my slave, Louise.  You have never ' +
					'wanted anything more and you know that every moment you obey me will be absolute bliss."</p>' +
					'<p>Again, she doesn\'t miss a beat.  Her mind absorbs this, accepts it as Truth, and moves on ' +
					'to dealing with what that means.  "Then how do I become your slave?  Please, I want to be yours ' +
					'so badly it hurts!  I need you to be my ' +  perYou.getMaster() + '!"</p>' +
					'<p>"You will obey me in all things," you say.  It isn\'t a question.</p>' +
					'<p>"Of course!"</p>' +
					'<p>"Everything you own is mine," you press.  "You live only for my pleasure."</p>' +
					'<p>"Yes!" she promises.  "Anything!  Just please, let me be your slave!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Prove your worth to me then"', Place, 'type=charmlouise5');
			}

			WritePlaceFooter(md, "Script by Tilde, adapted for lover path");
			return true;
		}
		
		if (sType == "charmlouise5") {
			// Charm 5
			md = md = WritePlaceHeaderNI();

			this.showPersonRandom("louise6", 2);
			addPlaceTitle(md, "Louise Under a Spell");

			if (this.isLover()) {
				md.write(
					'<p>You decide the tile floor would be uncomfortably hard and cold, so she puts on a show for you, writhing and guiding your eyes with her hands as they work up and down her body.</p>' +
					'<p>You reinforce the spell "You are mine, my lover."</p>' +
					'<p>"Oh, thank you!  Thank you so much ' + perYou.getPersonName() + '!  I promise I will always be a good girlfriend!"</p>' +
					'<p>"And I will always be a good lover," you purr.  "Trust me.  Now get dressed.  I wouldn\'t want you to lose your job."</p>'
				);	
			} else {
			md.write(
					'<p>You decide the tile floor would be uncomfortably hard and cold, so she puts on a show for you, writhing and guiding your eyes with her hands as they work up and down her body.</p>' +
					'<p>You are not cruel.  You know she is completely enslaved already, so you let her feel the joy you promised with three little words: "You are mine."</p>' +
					'<p>"Oh, thank you!  Thank you so much ' + perYou.getMaster() + '!  I promise I will always be a good slave girl!"</p>' +
					'<p>"And I will always be a good ' + perYou.getMaster() + '," you purr.  "Trust me.  Now get dressed.  I wouldn\'t want you to lose your job - not when you can be making money for me."</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, 'leave the ' + getShopStore(), 194);
			WritePlaceFooter(md, "Script by Tilde, adapted for lover path");
			return true;
		}
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledance" + this.getSuffix() + ".jpg");
		addPlaceTitle(md, "Louise\'s Dance");
		md.write(
			'<p>Louise takes the stage dressed in some black lingerie, looking a bit uncertain, this is obviously something she is not experienced in.</p>' +
			'<p>She does a reasonable strip-tease, ' + (this.checkFlag(5) ? 'her cock is a surprise for the customers, some appreciative, some not' : this.checkFlag(4) ? 'her large breasts appreciated by the customers' : 'her slim figure appreciated by the customers') + '.</p>' +
			'<p>After she looks a bit embarrassed and has a chat with you, but makes her excuse after a little while to return home.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 463 && this.isHere()) {
			if (isVisible()) md.write('<p>Louise welcomes you, and invites you in.</p>');
			else md.write('<p>Louise is studying some books when you enter her apartment.</p>');
		}
		if (Place == 435 && this.isHere()) {
			if (isVisible()) md.write('<p>You see Louise working out on a machine.</p>');
			else md.write('<p>You see Louise working out on a machine, she gives you a wave hello!</p>');
		}		
	};

	per.showPersonChat = function(md)
	{
		if (Place == 195 && this.isHere()) {
			if (this.isCharmedBy() && sType === "") {
				addLinkToPlace(md, 'risk your ' + (this.isLover() ? 'lover' : 'slave') + ' Louise\'s job again', 195, 'type=riskjob');		//Louise is charmed
				if (!isPlaceKnown("LouisesApartment")) addQuestionC(md, 'ask Louise where she lives', "Louise", 2600);
			}
		}
		if (Place == 463 && this.isHere() && sType === "") {
			// Louise's apartment
			addLinkToPlaceC(md, 'accept her hospitality', Place, 'type=louisefuck');
			if (isPlaceKnown("NinasApartment") && wherePerson("Nina") == 462) addLinkToPlaceC(md, 'Nina should be home, invite her over', Place, 'type=louiseninafuck');
			this.addSleepLink(md, "go to bed with Louise", "Sleeping with Louise",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Louise to bed for the night.</b>',
				this.checkFlag(5) ? 'bed1.jpg' : 'bed2.jpg', true
			);
		}
		if (Place == 435 && this.isHere()) addLinkToPlaceC(md, 'talk to Louise', Place, 'type=louisegymshower');
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Louise before it will work.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Louise.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			// General Store
			if (Place == 195 && this.place == 195) {
				// Louise is working here
				if (wherePerson("Anita") == 195) return "";		// If Anita is here default to Anita in preference to Louise
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here, the " + getShopStore() + " is still open and it\'s too public.");
				else CastCharmSpell("Louise", Place, 4, 'type=charmlouise1', '', 'type=recharmlouise');
				return "handled";
			}
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// At the general store?
			if ((Place == 195 && this.place == 195) || Place == 463) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(4) && this.checkFlag(5))) return "handled";			

				// It can be cast
				setCommentsNoClick(
					'<div class="' + getConverseBubbleClass() + '" style="cursor:default">' +
					'<table><tr><td width="80%"><p>You decide to try the transformation spell on Louise and tell her to prepare herself. As you start to recite the spell she falls into a sort of trance, her uniform falling down. As it does your attention is drawn to...</p>'
				);
				addOptionLink("comments", this.checkFlag(4) ? 'her too large breasts' : 'her breasts', "ClearComments();dispPlace(" + Place + ",'type=louisetransformbreasts')");
				if (perYou.checkFlag(30)) addOptionLink("comments", this.checkFlag(5) ? 'her cock' : 'her groin', "ClearComments();dispPlace(" + Place + ",'type=louisetransformcock')");
				if (perYou.checkFlag(30)) addOptionLink("comments", 'her face', "ClearComments();dispPlace(" + Place + ",'type=louisetransformbody')");				
				addComments('</td><td width="20%">' + this.addPersonString("louise5.jpg") + '</td></tr></table>');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1louise" : "";
	};
	
	// Phone calls
	
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (!this.isCharmedBy()) return false;
		if (msg) return true;
		// Miss Logan not bred and is a breeder
		if (Place == 440 && !checkPersonFlag("MissLogan", 1) && this.isFuta()) return true;
		// Poledance
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;

		// Swimming		
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
		else if (Place == 269) {
			if (isShopOpen(2, 1, true)) WriteComments("You call Louise to invite her to join you at the pool for a swim, but she says she is working at Leanne\'s General Store but would love to after she finishes for the day.");
			else {
				this.setFlag(7);
				gotoPlace(Place, 'type=louisepool');
				receiveCall('', 'You call Louise to invite her to join you at the pool for a swim, and she immediately answers, "No worries, I will be there as soon as I can!"');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function() {
		if (this.checkFlag(8) && !this.checkFlag(9)) {
			// SMS 1, day after an invite to swim and she is not available
			if (this.makeCall(true, 172)) this.setFlag(9);
		}
		if (!this.checkFlag(13) && this.checkFlag(11) && !isMorning(1, 3) && getDay(true) == "Mon") {
			// SMS 2 Monday afternoon once Leanne returns to work to notify you she is in the gym
			if (this.makeCall(true, 173)) this.setFlag(13);
		}			

		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 172) return receiveSMS('Louise', 'Thinking about you...thought you would like this, from my last holiday', 'sms1.jpg');
		if (id == 173) return receiveSMS('Louise', 'Hey, now I have afternoons free I have got back to the gym, I plan to on Modays, join me sometime', 'sms2.jpg');		
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return true; };
}
