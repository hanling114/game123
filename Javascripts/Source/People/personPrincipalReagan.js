/************************************
 Ms Reagan Kerrington, Principal
		
************************************/
function initialisePrincipalReagan()
{
	// Ms Reagan, school Principal
	addPerson("Ms. Reagan", 71, "Principal", "");
	
	per.getPersonAddress = function(n) { return isPlaceKnown("PrincipalsHouse") ? n ? 390 : '20 Dervish Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function()
	{
		return '!face' + (this.isCharmedBy() ? 'c' : 'u');
	};

	per.getPersonName = function(full) {
		if (full === true) return "Principal Reagan Kerrington";
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Reagan";
			return "Ms. Reagan, your lover";
		} else return this.name;	// If NOT Charmed
	};
	per.getPersonNameShort = function(uncharmed) {
		if (!isAtLocation(9) || uncharmed === true) return "Principal Reagan";
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Reagan";
			return "Ms. Reagan";
		} 
		return "Principal Reagan";
	};
	
	per.getDress = function(img, sdrs) {
		if (sdrs !== undefined) return sdrs;
		if (Place == 71) {
			if (this.extra[0] == -1) this.extra[0] = Math.floor(Math.random() * 3);
			if (this.extra[0] == 0) return "Black";
			if (this.extra[0] == 1) return "Red";
			if (this.extra[0] == 2)return "Violet";
			return "Slave";
		}
		return this.dress;
	};
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };

	per.whereNow = function() {
		if (sType.indexOf("reaganintro") != -1 || Place == 391) return Place;
		return isShopOpen(2) ? this.place : 390;
	};
	
	per.passTimeDay = function() {
		if (!this.isCharmedBy()) this.extra[0] = -1;
		else if (this.checkFlag(5) && !this.checkFlag(6)) this.setFlag(6);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 71 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				if (!this.checkFlag(4)) return this.showPerson("postcharm.intro", '', '', '', '', false, "string");
				return this.showPersonRandom("postcharm", this.isLover() ? 2 : 5, '', '', '', '', 0, false, "string");
			}
			return this.showPerson("reagan.school.freed.jpg", '', '', '', '', false, "string");
		}	
		else if (Place == 390 && this.isHere() && sType === "") return this.showPersonRandom("reagan.charm.home", 6, '', '', '', '', 0, false, "string");
		else if (Place == 391 && this.isHere() && sType === "") return this.showPersonRandom("bedroom", 3, '', '', '', '', 0, false, "string");		
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 71 && this.isHere() && sType === "") {
			if (!this.isCharmedBy()) md.write('<p>"' + perYou.getPersonName() + ', don\'t waste time. Go to your home and study if you want to graduate."</p>');
			else {
				if (this.isLover()) {
					md.write('<p>"Oh ' + perYou.getYourNameFor() + ', it is nice for you to visit me" says the principal.</p>');
					md.write('<p>She continues, "I assume you are <b>not</b> here about school business, now let us have some fun."</p>');					
				} else {
					md.write('<p>"Oh ' + perYou.getLord() + ', it is nice to feel your presence near me" says the principal.');
					if (!this.checkFlag(4)) md.write(' "' + perYou.getLord() + ', I am hereby taking a pledge to assist you in building a harem empire". the school resources and decision making authority will remain with you."');
					md.write('</p><p>She continues, "I am just your toy willing to blend according to your thinking. Now let us have some fun."</p>');
				}
				this.setFlag(4);
				return;
			}			
		}
		if (Place == 390 && this.isHere() && sType === "") {
			md.write('<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' is waiting for you, and starts removing her clothes. She gestures towards the bedroom you think as she prefers to go in there for anything intimate.</p>');
		}
		if (Place == 391 && this.isHere() && sType === "") {
			md.write('<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' quickly changes into some lingerie and sits on the bed waiting for you.</p>');
		}		
	};
	
	per.showPersonChat = function(md)
	{
		if (sType === "" && this.isHere() && this.isLover() && this.extra[0] != -1) addLinkToPlaceO(md, 'ask Principal Reagan to wear something different to school', Place, '', '"Of course, I will pick a different dress for work!', 'MsReagan', "findPerson('MsReagan').extra[0]=-1;");

		if (Place == 71 && sType === "" && this.isHere() && this.isCharmedBy()) {
			if (!this.checkFlag(5)) addLinkToPlaceC(md, 'discuss your ideas for school management', Place, 'type=schoolmanagement');
			if (!this.checkFlag(8) && isCharmedBy("Penelope")) addLinkToPlaceC(md, 'discuss Penelope\'s lease', Place, 'type=penelopelease');
			if (!this.isLover() && perYou.isMaleSex()) addLinkToPlaceC(md, 'fuck your slave\'s tits', Place, 'type=reagantitfuck');
			addLinkToPlaceC(md, this.isLover() ? '"Shall we do some physical education"' : 'fuck your slave', Place, 'type=reaganfuck');
			addLinkToPlaceC(md, this.isLover() ? '"Could you give me an oral test"' : 'have your slave ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=reaganbj');
			if (!isPlaceKnown("PrincipalsHouse")) {
				addQuestionR(md, (this.isLover() ? 'ask Principal Reagan' : 'order your slave to tell you') + ' where she lives',
					"<p>Your principal answers, \"Of course, " + perYou.getYourNameFor() + ", it is 20 Dervish Rd. Please visit me when I am not working\" She gives you a spare key to her apartment.",
					"MsReagan",
					"setPlaceKnown(\\'PrincipalsHouse\\')"
				);
			}
		} 
		if (Place == 390 && sType === "" && this.isHere() && this.isCharmedBy()) {
			addLinkToPlaceC(md, this.isLover() ? 'have a shower with your lover Principal Reagan' : 'have a shower with your slave Principal', Place, 'type=reaganshower');
			addLinkToPlaceC(md, this.isLover() ? '"Principal Reagan, shall we make love"' : 'fuck your slave Principal', Place, 'type=reaganfuck');
			addLinkToPlaceC(md, this.isLover() ? '"Principal Reagan, could you go down on me?"' : 'have your slave Principal ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=reaganbj');
			if (this.checkFlag(8)) {
				addLinkToPlaceC(md, 'enjoy both of the school administrators', Place, 'type=penelopethreesome1');
				addLinkToPlace(md, 'go into Penelope\'s bedroom' , 392);
			}
			addLinkToPlace(md, 'go into Principal Reagan\'s bedroom' , 391);
		}
		if (Place == 391 && sType === "" && this.isHere() && this.isCharmedBy()) {
			if (perYou.isMaleSex()) addLinkToPlaceC(md, this.isLover() ? 'ask to fuck her tits' : 'fuck your slave\'s tits', Place, 'type=reagantitfuck');			
			addLinkToPlaceC(md, this.isLover() ? '"Shall we make love"' : 'fuck your slave', Place, 'type=reaganfuck');
			addLinkToPlaceC(md, this.isLover() ? '"Could you go down on me?"' : 'have your slave ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=reaganbj');
			if (this.checkFlag(8)) addLinkToPlaceC(md, 'enjoy both of the school administrators', Place, 'type=penelopethreesome1');
			this.addSleepLinkRandom(md, "spend the night with " + this.getPersonNameShort(), "Going to Bed with the Principal",
				'<p style="position:absolute;right:2%;bottom:2em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">You tell your principal that you will sleep here tonight. She lies down awaiting you to join her.</p>',
				"bed.jpg", 2, true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
			);			
		}		
	};
	
	per.showEvent = function()
	{
		var md, clv, mtn, type, bMan;
		
		if (Place == 70 && (!this.checkFlag(1) && checkPersonFlag("MrBeasley", 1) && isShopOpen(2) && sType === "") || sType == "reaganintro1"){
			md = WritePlaceHeader();
			setQueryParams("type=reaganintro1");
			this.setFlag(1);
			this.other = nTime;
			this.showPerson("!reagan.office.meet.compulsory1.jpg");
			addPlaceTitle(md, "The Principal");
			md.write(
				'<p>As you step into the hallway you suddenly receive a message from school management in your phone citing "Urgent, go to see the principal". You exclaim "Oh shit! I am going to die." and you head to her office. Before you get there you receive an update telling you she is in a classroom and you go there instead.</p>' +
				'<p>Your school principal, Ms. Reagan Kerrington is standing waiting for you, and you remember she prefers to be addressed as Principal Reagan. You recall her earlier at school and her changes since then in attitude and dress from a conservative old woman to a voluptuous woman who dresses in more revealing clothes. She has held this position for over 7 years and even though you hate this schools atmosphere, you must not underestimate her administrative skills and dedication towards the school. She has changed the school atmosphere, tradition and position in the national rankings. Even though you have heard rumours that bribery was involved you feel she has done a good job.</p>' +
				'<p>You have had meetings in the past with her in private during your math olympiad test. She encouraged you and supported you in every way possible. You just don\'t know what is happening and what you are going to do. She is looking at you like a bug she is going to squash. She addresses you with an arrogant tone in her voice,</p>' +
				'<p>"Hello idiot, I called you to speak about your academic progress. Actually to be frank, I know this eventually would happen given how stupid and worthless you are!"</p>' +
				'<p>She continues "Recently, I spoke with Mr.Beasley regarding your academics. He told me about an extra-credit assignment he has given you. Try to submit the assignment within the deadline, idiot. Shut the door and go away."</p>'
			);
			startQuestions();
			addLinkToPlace(md, "leave the room confused", 78, 'type=reaganintro2', 'Before you leave the room, the principal calls you back');
			WritePlaceFooter(md);
			return true;			
		}

		if (Place == 78 && sType == "reaganintro2") {
			// Part 2 of the intro
			md = WritePlaceHeader();
			this.showPerson("!reagan.office.meet.compulsory2.jpg");			
			addPlaceTitle(md, "More from the Principal");
			md.write(
				'<p>She tells you, "Huh ' + perYou.getPersonName() + ', I heard my mass..., ohh sorry, if you find some artifact to practically demonstrate your assignment, I will consider giving you a discount in your school tuition fees. It will help you, me and my mas...I mean me"</p>' +
				'<p>She pauses and continues, "Oh sorry I don\'t know what am I saying these days, old age. Leave this room, ' + perYou.getSex() + '!"</p>' + 
				'<p>As you leave you wonder how a person could change this much. But the term  discount now runs curiously in your mind. So she said I will pass this year and have a discount in studies if I finish the extra-credit assignment. You chuckle and wonder cautiously why this much interest in a normal assignment?</p>'
			);
			
			startQuestions();	
			addLinkToPlace(md, "leave the room to the hallway", 78);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "endgame1reagan") {
			// End Game - Principal Reagan
			md = WritePlaceHeader();
			this.showPerson("pregnanta.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Principals?");
			var sf = this.getCharmedLevel() == 4 ? 'slave' : 'lover';
			md.write(
				'<p>One day you talk to your ' + sf + ' Ms. Reagan, you see her swollen pregnant belly, she must of had a meeting with Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 269) {
			if (sType == "msreaganpool1" || sType == "msreaganpool2") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPersonRandom("pool" + (sType == "msreaganpool1" ? '1' : '2'), 3);
				addPlaceTitle(md, "Swimming with " + this.getPersonName());
				if (this.isLover()) md.write('<p>Your principal and lover arrives dressed in a bikini, and poses for your pleasure and is looks hers as well.</p>');
				else md.write('<p>Your slave principal promptly arrives dressed in a bikini, and she poses for your pleasure. You would say she enjoys it too but she tries to hide it.</p>');
				md.write(
					'<p>She doesn\'t look like swimming is what she has in mind.</p>'
				);
				startQuestions();
				if (perYou.isMaleSex()) addLinkToPlaceC(md, 'fuck your principal', Place, 'type=msreaganpoolsexfuck'+ (sType == "msreaganpool1" ? '1' : '2'));
				addLinkToPlaceC(md, '"how about some oral testing"', Place, 'type=msreaganpoolsexbj'+ (sType == "msreaganpool1" ? '1' : '2'));
				addLinkToPlaceC(md, 'say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType.indexOf("msreaganpoolsex") != -1) {
				md = WritePlaceHeader();
				type = (sType.indexOf("fuck") != -1);
				if (isExplicit()) this.showPersonRandomXBG("pool-sex" + (type ? "fuck" : "bj"), type ? 3 : 2);
				else this.showPerson("pool" + + (sType.indexOf("1") != -1 ? '1' : '2') + "sex.jpg");
				addPlaceTitle(md, this.getPersonName() + " at the pool");
				if (type) md.write('<p>' + this.getPersonName() + ' is quite content to fuck by the water.</p>');
				else md.write('<p>' + this.getPersonName() + ' is quite content to just ' + (perYou.isMaleSex() ? 'lick your pussy' : 'suck your cock') + ' by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 71 || Place == 390 || Place == 391) {
			bMan = perYou.isMaleSex();
			clv = this.getCharmedLevel();
			
			if (sType == "reaganshower") {
				// Tit Fuck
				md = WritePlaceHeader();
				this.showPersonRandom("reagan-shower1", 3);
				
				if (clv == 3) {
					addPlaceTitle(md, "Having a Shower with Ms. Reagan");
					md.write('<p>You have a shower with your large breasted principal.</p>');
				} else {
					addPlaceTitle(md, "Having a Shower with Your Slave");
					md.write('<p>You have a shower with your big titted slave.</p>');
				}
				startQuestions();
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, 'fuck her', Place, 'type=showerfuck');
					addLinkToPlaceC(md, 'fuck her tits', Place, 'type=showertitfuck');
					addLinkToPlaceC(md, 'she goes down on you', Place, 'type=showerbj');
				} else addLinkToPlaceC(md, 'take it further', Place, 'type=showerfuck');
				addLinkToPlaceC(md, 'finish the shower', Place);
				WritePlaceFooter(md);
				return true;
			}		
			
			if (sType == "reagantitfuck" || sType == "showertitfuck") {
				// Tit Fuck
				md = WritePlaceHeader();
				if (sType == "showertitfuck") this.showPersonRandomRorX("reagan-shower-maletf", 1);
				else if (Place == 71) this.showPersonRandomRorX("reagan.charm.tfb", 1);
				else this.showPersonRandomRorX("reagan.bed.maletf", 1);
				
				if (clv == 3) {
					addPlaceTitle(md, "Fucking "  + this.getPersonNameShort() + "\'s Tits");
					md.write('<p>You fuck '  + this.getPersonNameShort() + '\'s tits.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your Slave Principal\'s Tits");
					md.write('<p>You fuck your slave\'s tits.</p>');
				}
				startQuestions();
				if (sType == "showertitfuck") addLinkToPlaceC(md, 'finish the shower', Place);
				else addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "reaganfuck" || sType == "showerfuck") {
				// Fuck
				md = WritePlaceHeader();
				if (sType == "showerfuck") {
					if (bMan) this.showPersonRandomRorX("reagan-shower-malefuck", isExplicit() ? 2 : 1);
					else this.showPersonRandom("reagan-shower-femalefuck", 1);
				} else if (Place == 71) {
					if (!isExplicit() || !perYou.isMaleSex()) this.showPersonRandomBG("reagan.charm.fuck", 1);
					else this.showPersonRandomX("reagan.charm.fuckb", 3);
				} else if (Place == 390) {
					if (bMan) this.showPersonRandomRorX("reagan.home.malefuck", isExplicit() ? 3 : 1);
					else this.showPersonRandom("reagan.home.femalefuck", 1);
				} else {
					if (bMan) this.showPersonRandomRorX("reagan.bed.malefuck", isExplicit() ? 3 : 1);
					else this.showPersonRandom("reagan.bed.femalefuck", 1);					
				}

				if (clv == 3) {
					addPlaceTitle(md, "Making Love to "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You mount your lover telling her how that you love her and how great she looks. You then slap her ass and start to fuck her, concentrating on both yours and her pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that you love her.</p>');
					else md.write('<p>You put on your strap-on and fuck your lover. ' + this.getPersonNameShort() + ' is clearly inexperienced with this and you tell her that she will have to get used to this and pleasing you in other ways. You find the strap-on is pleasurable and as you near your orgasm you hear '  + this.getPersonNameShort() + ' cry out her orgasm. This triggers you orgasm and you orgasm hard. As you remove your strap-on you tell Ms. Reagan that you love her.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your Slave");
					if (perYou.isMaleSex()) md.write('<p>You mount your slave, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
					else md.write('<p>You put on your strap-on and mount your new slave. Ms. Reagan is clearly inexperienced with this and you tell her you will teach her everything she needs to know as a good slave. You both orgasm close to each other, Ms. Reagan looking relieved and you tell her she is a good slave!</p>');
				}
				startQuestions();
				if (sType == "showerfuck") addLinkToPlaceC(md, 'finish the shower', Place);
				else addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "reaganbj" || sType == "showerbj") {
				// Blowjob
				md = WritePlaceHeader();
				if (sType == "showerbj") this.showPersonRandomRorX("reagan-shower-malebj", isExplicit() ? 2 : 1);					
				else if (Place == 71) {
					if (!isExplicit() || !perYou.isMaleSex()) {
						if (perYou.isMaleSex()) this.showPersonRandom("reagan.charm.bjb", 1);
						else this.showPersonRandom("Red!reagan.charm.bjg", 3);
					} else this.showPersonRandomRorX("reagan.charm.bjb", 3);
				} else if (Place == 390) {
					if (bMan) this.showPersonRandomRorX("reagan.home.malebj", isExplicit() ? 2 : 1);
					else this.showPersonRandom("reagan.home.femalebj", 3);					
				} else {
					if (bMan) this.showPersonRandomRorX("reagan.bed.malebj", isExplicit() ? 3 : 1);
					else this.showPersonRandom("reagan.bed.femalebj", 3);					
				}
				
				if (clv == 4) {
					addPlaceTitle(md, "Your slave "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				} else {
					addPlaceTitle(md, "Your Lover "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You ask her if she would give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth.</p>');
					else md.write('<p>You ask her to lick you, and she kneels uncertain how to proceed. You sit down and give her instructions to pleasure you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm.</p>');
				} 
				startQuestions();
				if (sType == "showerbj") addLinkToPlaceC(md, 'finish the shower', Place);
				else addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "reaganrecharm") {
				// Recharm Principal Reagam
				md = WritePlaceHeader();
				this.showPerson("recharm.jpg");			
				addPlaceTitle(md, "Principal Reagan Under a Charm Spell Again");

				md.write('<p>You recite the spell "Dai chu Reagan", and she cries out,</p>');

				if (this.getCharmedLevel() == 4) {
					// Lover
					this.charmThem(3);
					md.write(
						'<p>"Oh what does that mean, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her as you obviously look her over "A lot hotter definitely". She smiles and replies,</p>' +
						'<p>"You\'re not bad yourself..this is really strange, it\'s not like I fall in lust or love this quickly"</p>' +
						'<p>You continue to compliment and seduce her until the spell is firmly established and Principal Reagan is your new lover.</p>'
					);
				} else {
					// Slave
					this.charmThem(4);
					md.write(
						'<p>"Oh what does that mean, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her "What you are feeling is just reacting to my presence and your desire to be with me and follow me,</p>' +
						'<p>You continue to assert your position of authority until the spell is firmly established and Principal Reagan is your new slave.</p>'
					);
				}

				startQuestions();	
				addLinkToPlaceC(md, 'talk more to your Principal', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (sType == "freemsreagan") {
			if (this.isCharmed()) {
				AddMana(5);
				this.unCharmThem();
			}
			md = WritePlaceHeader();
			var bEarly = Place == 70;
			this.setFlag(2);
			this.setFlag(3);
			Place = 71;
			setPlaceKnown("PrincipalsOffice", false);
			this.showPerson("reagan.school.freed.jpg");
			addPlaceTitle(md, "Principal Reagan Freed from a Charm Spell");
			
			if (getQueryParam("by") === "Tina") md.write('<p>Tina steps back as the spell fades from Principal Reagan, looking to you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over Principal Reagan, absorbing it within moments.</p>');

			if (bEarly) md.write('<p>She cries out and runs to her office but leaves the door open. You follow her in.</p>');
			md.write(
				'<p>She exclaims, "Oh my god Master Davy!! ' + perYou.getPersonName() + ' what are you doing here? And what is happening around this town? My memory has been somewhat worse after the party especially meeting ugh Davy."</p>'
			);
			if (!bEarly) md.write('<p>You silently take the detention paper and put in your bag. You can leave the room you suppose...</p>');

			startQuestions();
			if (bEarly) addLinkToPlace(md, "leave her office", 78);
			else addLinkToPlaceC(md, 'time for detention', Place, '', 'You have to sit in detention for the rest of the afternoon', '', 'WaitForDayNight()');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (Place != 71) return false;
		
		if (sType == "schoolmanagement") {
			md = WritePlaceHeader();
			this.setFlag(5);
			this.showPerson("postcharma.jpg");
			addPlaceTitle(md, "School Management");
			md.write(
				'<p>You decide to discuss with Principal Reagan the management of the school. You tell her "It looks like the school is going to undergo several changes under my command"</p>'
			);
			if (this.isLover()) md.write('<p>She replies, "Yes ' + perYou.getPersonName() + ' I can certainly implement your changes!"</p>');
			else md.write('<p>She replies, "Yes ' + perYou.getMaster() + ' I will continue to implement your wishes in any way you want!"</p>');
			md.write(
				'<p>You ask her, "Do you have any administrative team that we need to consider here, I do not remember seeing any staff, but I got a message from someone named Penelope a while ago in admin?"</p>' +
				'<p>Principal Reagan replies, "Yes ' + perYou.getYourNameFor() + ' Penelope works for me for general adminstration and management of the school, she was once our school valedictorian. She was a funny, caring student who has been forced into a life of debt. She founded a start-up company straight out of school but it failed like so many others. I helped her out during this time by giving her a job at our school management."<p>' +
				'<p>She pauses and then continues, "I have mostly allowed her to work from home as everything she does can be done online. A lot revolves around sending and accessing messages online". She pauses and resumes,</p>' +
				'<p>"If you wish there is a room present in the administration offices, though the cleaners do not maintain the area currently. I will change that and make sure she comes into the office most days from now . You can speak with her anytime as you wish once I have it arranges. I will notify her and let you know once she is working in the office."</p>' +
				'<p>She pauses and continues "She did recently mention her lease was about to end and she was having trouble finding a new place to rent so she may welcome this change"</p>' +
				'<p>You conpliment Principal Reagan, "Good job"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'discuss other things with her', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "penelopelease") {
			md = WritePlaceHeader();
			this.setFlag(8);
			setPersonFlag("Penelope", 2);
			this.showPerson("postcharmb.jpg");
			addPlaceTitle(md, "Penelope\'s Lease");
			md.write(
				'<p>You ask Principal Reagan about Penelope and her lease ending. </p>' +
				'<p>She replies, "Yes ' + perYou.getYourNameFor() + ' she told me she has not found anywhere so far."</p>' +
				'<p>You ask if Principal Reagan as a spare room she could rent to Penelope, it would be convenient for your two school <font size="-1">slaves</font> to live and be accessible together!</p>' +
				'<p>Your Principal agrees and says she will make arrangements with Penelope and she should at least partly be moved in this evening.<p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'discuss other things with her', Place);
			WritePlaceFooter(md);
			return true;			
		}	
		
		if (this.checkFlag(2) && this.isHere() && (!this.checkFlag(3) || sType == "meetingdetention")) {
			setQueryParams("type=meetingdetention");
			md = WritePlaceHeader();
			this.setFlag(3);		// Meeting to start detention		
			this.showPerson("reagan.school.detentiona.jpg");
			addPlaceTitle(md, "Meeting with the Principal");
			md.write(
				'<p>"I came to know that you are bullying my favourite student Davy for sometime now. Anyway, I forgot to ask did you find any artifact to demonstrate your assignment?"</p>' +
				'<p>Does she seems to be completely forgetting the main reason she called you here?</p>' +
				'<p>Her eyes wide opened and was quite eager to receive an answer...</p>'
			);
			startQuestions();
			startAlternatives();
			addLinkToPlaceC(md, '"Yes, I will show it to you now"', Place, 'type=reaganyes');
			addLinkToPlaceC(md, '"No, I will bring it tomorrow"', Place, 'type=reagannolater');
			addLinkToPlaceC(md, '"No"', Place, 'type=reaganno');
			endAlternatives();

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "reagannolater") {
			// No/later to item
			md = WritePlaceHeader();
			this.showPersonAnon("reagan.school.detentiona.jpg");
			addPlaceTitle(md, "Not now");
			md.write(
				'<p>Her face becomes angry but somehow manages to hide it in her reply."You are going to be in detention today for your problematic behaviour"</p>' +
				'<p>Bring the artifact tomorrow and I will end your detention.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'time for detention', Place, '', 'You have to sit in detention for the rest of the afternoon', '', 'WaitForDayNight()');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "reaganno") {
			// No/later to item
			md = WritePlaceHeader();	
			this.showPersonAnon("reagan.school.detentiona.jpg");
			addPlaceTitle(md, "Do not Trust the Principal");
			md.write(
				'<p>She becomes pissed off. "Don\'t you feel ashamed to have not done any work?", she shouts. Her eyes roll out .Now listen you are going to spend detention till the end of this academic year along with me in this room.</p>' +
				'<p>"Don\'t ever think of running away from detention or coming to school", I have clippings of attaboy dDavy regarding how you torture Davy. I will do my best  to admit you to asylum citing your beranged activities</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'time for detention', Place, '', 'You have to sit in detention for the rest of the afternoon', '', 'WaitForDayNight()');
			WritePlaceFooter(md);
			return true;			
		}		
		
		if (sType == "reaganyes") {
			md = WritePlaceHeader();
			perYou.health = 0;	
			this.showPersonAnon("!gameover.jpg");
			addPlaceTitle(md, "Trusting the Principal");
			md.write(
				'<p>As soon as you say yes she replies,</p>' + 
				'<p>"' + perYou.getPersonName() + ', can you wait for 5 minutes here I have to go to the restroom". You do not consider this odd, you are so happy that you are going to receive a discount in the school tuition fees.</p>' +
				'<p>Suddenly, the Principal and two men appeared in the room. Before you could ask "Who are they", you are shot in the chest. As the darkness claims you, you hear her say "Oh finally I will become the second in command in Master Davy\'s harem", with joy in her voice.</p>' +
				'<p>She continues, "Looking at you in this state is a lifelong blessing ' + perYou.getPersonName() + '. Don\'t worry my Master will look after your family and satisfy them. Die you..." and the darkness claims you.</p>'
			);
			addRestartLink(md);
			AddPeopleColumnMed(md);
			this.showPerson("reagan.school.detentiona.jpg");
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "charmprincipaloffice1") {
			// Event: Cast Charm on Principal Reagan 1
			md = WritePlaceHeader();
			this.showPersonRandom("reagan.charm1", 3);
			addPlaceTitle(md, "Principal Reagan Under a Charm Spell");
			
			md.write(
				'<p>You recite the spell "Dai chu Principal Reagan", and she cries out,</p>' +
				'<p>"Oh ' + perYou.getPersonName() + ' what is happening to me. What have you done to me, why am I feeling like this again...Ahh"</p>' +
				'<p>You notice her reference to <b>again</b>, some memory of Davy\'s charm spell must remain with her. You can make her a slave as Davy did'
			);
			if (perYou.checkFlag(26)) md.write(' or be a little gentler and instead make her your lover. So what do you want to do?</p>');
			else md.write('.</p>');

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, 'enslave Principal Reagan', Place, 'type=charmprincipaloffice2', '', '', "charmPerson('MsReagan',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, 'seduce Principal Reagan', Place, 'type=charmprincipaloffice2', '', '', "charmPerson('MsReagan',3);");
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "charmprincipaloffice2") {
			// Event: Cast Charm on Principal Reagan 2
			md = WritePlaceHeader();
			this.showPersonRandom("reagan.charm2", 2);
			addPlaceTitle(md, 'Principal Reagan Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>You tell her "Nothing unusual, you just find me very attractive. You do find me sexy don\'t you?". She replies,</p>' +
					'<p>"Yes, I am feeling very <b>hot</b> but you are a student and we cannot..." and you interrupt,</p>' +
					'<p>"We will not tell anyone else. You are very sexy yourself, why not loosen your clothing a bit?"</p>' +
					'<p>Without reply she undoes some of her buttons and almost poses for you...</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'compliment her and ask for more', Place, 'type=charmprincipaloffice3');
			} else {
				md.write(
					'<p>You tell her "You are going to serve me for life. Remove your clothing." She replies incredulously,</p>' +
					'<p>"What are you talking about? You are going to go to detention!". Despite her words she starts to remove more clothing, but holds back.</p>' +
					'<p>"You smile and say "Let\'s see..."</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'say "strip slave"', Place, 'type=charmprincipaloffice3');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmprincipaloffice3") {
			// Event: Cast Charm on Principal Reagan 3
			md = WritePlaceHeader();
			this.showPersonRandom("reagan.charm3", 3);
			addPlaceTitle(md, 'Principal Reagan ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>She strips more, seductively for her new lover until she has only parts of her underwear on. She smiles and says,</p>' +
					'<p>"Not bad for an old woman" and you compliment her and say she is not old and is beautiful and sexy. She smiles,</p>' +
					'<p>"Remember you must tell no one about us, especially teachers like Ms. Jones". For a moment it crosses your mind \'what about Catherine\' but she would just encourage you and tell nobody!</p>' +
					'<p>You promise and she gestures for you to approach...</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'make love to her', Place, 'type=charmprincipaloffice4&ctype=fuck');
				addLinkToPlaceO(md, 'allow her to pleasure you', Place, 'type=charmprincipaloffice4&ctype=bj');

			} else {
				md.write(
					'<p>Principal Reagan strips until she is wearing a little of her underwear and she exclaims as the spell fully takes control of her and shapes her thoughts,</p>' +
					'<p>"Oh my god ' + perYou.getYourNameFor() + ' you are looking so sexy today, just take me and use me! I will serve you for life and will allow you to graduate without attending anymore!"</p>' +
					'<p>You smile and tell her " I am going to have a say in the functioning of the school, slave"</p>' +
					'<p>She immediately replies, "Okay ' + perYou.getYourNameFor() + ' you can do whatever you want to the school just let me serve you, I am your slave"</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave', Place, 'type=charmprincipaloffice4&ctype=fuck');
				addLinkToPlaceO(md, 'have your slave orally service you', Place, 'type=charmprincipaloffice4&ctype=bj');

			}

			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmprincipaloffice4") {
			// Event: Cast Charm on Principal Reagan 4
			type = getQueryParam("ctype");
			if (!this.isLover()) {
				this.extra[0] = 3;
			}
			md = WritePlaceHeader();
			var bMan = perYou.isMaleSex();
			if (type == "fuck") {
				if (!isExplicit() || !perYou.isMaleSex()) this.showPersonRandomBG((perYou.isMaleSex() ? 'Red!' : '') + "reagan.charm.fuck", 1);
				else this.showPersonRandomX("reagan.charm.fuckb", 3);
			} else if (!isExplicit() || !perYou.isMaleSex()) {
				if (perYou.isMaleSex()) this.showPersonRandom("reagan.charm.bjb", 1);
				else this.showPersonRandom("Red!reagan.charm.bjg", 3);
			} else this.showPersonRandomRorX("reagan.charm.bjb", 3);

			addPlaceTitle(md, 'Principal Reagan ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');

			if (perYou.isMaleSex()) {
				if (type == "fuck") md.write('<p>You fuck Principal Reagan</p>');
				else md.write('<p>Principal Reagan gives you a blowjob</p>');
			} else {
				if (type == "fuck") md.write('<p>You fuck Principal Reagan with your strap-on.</p>');
				else md.write('<p>Principal Reagan licks you.</p>');				
			}

			// Choices
			startQuestions();
			addLinkToPlace(md, "leave her office", 78);
			WritePlaceFooter(md);
			return true;
		}	
		
		return false;
	};
	
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1reagan" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In their office
			if (Place == 71 && this.isHere()) {
				// In her office
				CastCharmSpell("MsReagan", Place, 1, 'type=charmprincipaloffice1', '', 'type=reaganrecharm');
				return "handled";
			} else if (this.isHere() && this.isCharmedBy()) {
				addComments('You attempt to re-cast the spell, but it fails, you are sure it has to be done somewhere else.');
				return "handled";
			}
			return "";
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=msreaganpool' + Math.ceil(Math.random() * 2));
			if (this.isLover()) receiveCall('','You call your lover Ms. Reagan and invite her to join you at the pool, and she readily agrees.'); 
			else receiveCall('','You call your slave Principal Reagan and order her to join you at the pool, and she immediately obeys and says she will be there as soon as she can.'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	
	per.addPersonPhoneCall = function() {
		if (this.hoursSince(23) && (isDavyDefeated() || perDavy.other >= 7) && isMorning() && !this.checkFlag(2) && isShopOpen(2)) {
			if (this.makeCall(true, 400)) {
				this.setFlag(2);
				setPlaceKnown("PrincipalsOffice", false);
			}
		}
		
		if (this.checkFlag(6) && isMorning() && isWeekDay() && !this.checkFlag(7)) {
			// Penelope now in the office
			if (this.makeCall(true, 407)) {
				this.setFlag(7);
				setPlaceKnown("SchoolAdmin", false);
				movePerson("Penelope", 73);
			}
		}	
		
		// Remaining are all post charm, once per day
		if (!this.isCharmedBy()) return;
		
		if (this.hoursCharmed() > 24 && !this.checkFlag(11) && isMorning()) {
			if (this.makeCall(true, 401)) this.setFlag(11);
		}	
		if (this.hoursCharmed() > 48 && !this.checkFlag(12)) {
			if (this.makeCall(true, 402)) this.setFlag(12);
		}	
		if (this.hoursCharmed() > 72 && !this.checkFlag(13)) {
			if (this.makeCall(true, 403)) this.setFlag(13);
		}	
		if (this.hoursCharmed() > 96 && !this.checkFlag(14)) {
			if (this.makeCall(true, 404)) this.setFlag(14);
		}	
		if (this.hoursCharmed() > 120 && !this.checkFlag(15)) {
			if (this.makeCall(true, 405)) this.setFlag(15);
		}	
		if (this.hoursCharmed() > 144 && !this.checkFlag(16)) {
			if (this.makeCall(true, 406)) this.setFlag(16);
		}	
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 401: return receiveSMS('PrincipalReagan', 'Good morning ' + this.getYourNameFor() + ' I am thinking about you', "sms1.jpg");
			case 402: return receiveSMS('PrincipalReagan', 'I thought I would try a new scarf, do you like it?', "sms2.jpg");
			case 403: return receiveSMS('PrincipalReagan', 'Not quite balls deep...', "sms3.jpg");
			case 404: return receiveSMS('PrincipalReagan', 'I often workout at the gym on weekends', "sms4.jpg");
			case 405: return receiveSMS('PrincipalReagan', 'A Halloween costume from last year', "sms5.jpg");
			case 406: return receiveSMS('PrincipalReagan', 'Another sort of costume', "sms6.jpg");
			case 407: return receiveSMS('PrincipalReagan', 'She has arrived in her new office', "[Penelope]reaganmsgregardingpenelopearrival.jpg");
			case 413: return receiveSMS('PrincipalReagan', 'Penelope is a bit tied up at the moment, I thought you may like to see why. I am sure she will get free soon', "[Penelope]sms4.mp4");
			case 414: return receiveSMS('PrincipalReagan', 'Penelope is tied up again, I am sure she will get free...eventually', "[Penelope]sms5.mp4");
			case 415: return receiveSMS('PrincipalReagan', 'Penelope keeps getting tied up all the time, maybe she won\'t get free', "[Penelope]sms6.mp4");
		}
		return '';
	};

}
