/**********************************************
Zali Taylor
Lonely Cat Lady
***********************************************/

function initialiseZali()
{
	// Zali
	addPerson("Zali", 0, "Zali", '', false);
	
	per.getPersonName = function(full) {
		if (full == true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 3) return "your MILF lover";
		if (clv == 4) return "your MILF slave";
		return this.name;
	};
	
	per.getPossessionFace = function() { return 'zali-face' + (this.isCharmedBy() ? 'c' : 'u'); };	
	per.getPersonAddress = function(n) { return isPlaceKnown("ZalisHouse") ? n ? 220 : '9 Caliross Estates, Glenvale' : n ? 0 : ''; };	

	
	per.passTimeDay = function() {
		this.setFlag(4, false);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 220 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPerson("home1" + (this.getCharmedLevel() == 3 ? "l" : "s") + ".jpg", '', '', '', '', false, "string");
			return this.showPerson("angrydoor.jpg", '', '', '', '', false, "string");
		}	
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 220 && this.isHere()) {
			if (this.isCharmedBy()) {
				// Charmed
				md.write(
					'<p>Zali poses for her ' + (this.getCharmedLevel() == 4 ? perYou.getMaster() : 'younger lover') + '.</p>'
				);
			}
		}
	};
	
	per.showEventPopup = function()
	{
		var perMiku;
		if (Place == 47 && this.place == 220 && !checkPersonFlag("Miku", 39) && getTimeOfDay() == "day") {
			perMiku = findPerson("Miku");
			perMiku.setFlag(39);
			showPopupWindow("Lonely Cat-Lady...",
				this.addPersonString("park.jpg", "height:max%", "right") +
				'Miku meets you at the park in her black cat form. She points out a blonde lady,</p>' +
				'She asks "Well do you want to go to her house?"</p>' +
				addOptionLink("string", '"Yes"', "dispPlace(219,'type=followzali')", "chatblock", "width:40%;margin-left:10%;text-shadow:none") +
				addOptionLink("string", '"Yes, but not now"', "setQueryParams();dispPlace(47,'', '" + perMiku.addPersonFace(true) + "Miku pouts at you, I’ll be waiting in the attic for when you are ready')", "chatblock", "width:40%;margin-left:10%;text-shadow:none") +
				addOptionLink("string", '"Nope, not my thing."', "setQueryParams();dispPlace(47,'', '" + perMiku.addPersonFace(true) + "Miku pouts and gives you a disappointed look.');movePerson('Zali',1000)", "optionblock", "width:40%;margin-left:10%;text-shadow:none") + 
				'<br><br>' + perMiku.addPersonString("mikucat0.jpg", "25%", "left"),
				'', '', true, true, true
			);
			return true;
		}
		if (Place == 219 && sType == "followzali") {
			perMiku = findPerson("Miku");
			setPlaceKnown("ZalisHouse", false);
			showPopupWindow("Lonely Cat-Lady\'s Home...",
				perMiku.addPersonString("mikucat0.jpg", "15%", "left") +
				this.addPersonStringAnon("mailbox.jpg", "30%", "right") +
				"Miku beams with joy and takes you through the neighborhood through a winding maze of back alleys and back yards. You finally you arrive at a house.</p>" +
				'<p>You ask "Now what?", and then you notice a mailbox with the name Taylor in big letters. Miku hops on top of the mailbox and gestures at it.'
			);
			return true;
		}	
		
		if (Place == 219 && sType == "leavezali") {
			perMiku = findPerson("Miku");
			showPopupWindow("Lonely Cat-Lady\'s Home...",
				this.addPersonStringAnon("mailbox.jpg", "30%", "right") +
				'As you leave she slams the door, and you hear "Hello, I want report a suspicious person in the neighborhood.  Yes I’ll hold"</p>' +
				'<p>You wonder...</p>' +
				(isCharmedBy("OfficerBatton") ? addOptionLink("string", 'she wants the police, I will get her the police', "dispPlace(219,'', 'It is time to speak to your friendly, and charmed, Kerry Batton!');setPersonFlag('Zali',2)", "chatblock", "width:50%;margin-left:10%;color:white") 
														: addOptionLink("string", 'you will have to sort this out later', "setPersonFlag('Zali',2);dispPlace()", "chatblock", "width:50%;margin-left:10%;color:white")) +
				addOptionLink("string", 'forget her, too much of a bother', "setQueryParams();dispPlace(215,'', 'You walk back to the hospital and decide to forget about her, just to much of a problem!');movePerson('Zali',1000)", "chatblock", "width:50%;margin-left:10%;color:white") + 
				'<br><br>' + perMiku.addPersonString("mikucat0.jpg", "25%", "left"),
				'', '', true, true, true
			);
			return true;				
		}
		
		if (sType == "stripzali2") {
			showPopupWindow("Stripping",
				this.addPersonString("strip2" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "right") +
				'She continues stripping and posing for you suggestively, she is clearly enjoying it as well.',
				"dispPlace(Place,'type=stripzali3')", '', true
			);				
			return true;
		}
		if (sType == "stripzali3") {
			showPopupWindow("Stripped",
				this.addPersonString("strip3" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "right") +
				'Soon she is completely naked and spreading herself for your viewing pleasure.</p>' +
				'<p>You must have her do this again, maybe tomorrow?'
			);	
			this.setFlag(5, !this.checkFlag(5));
			return true;
		}
		if (sType == "walkzali2") {
			showPopupWindow("Walking",
				this.addPersonString("walk2" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "right") +			
				'Once you are in a private area Zali makes no pretense and loses her dress, standing before you in her underwear',
				"dispPlace(Place,'type=walkzali3')", '', true
			);				
			return true;
		}
		if (sType == "walkzali3") {
			showPopupWindow("Walking",
				this.addPersonString("walk3" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "right") +			
				'Zali loses her underwear and displays herself for her younger lover.</p>' +
				'<p>Later you walk back to her home with her.</p>' +
				'<p>You must do this again with her, maybe tomorrow?'
			);		
			this.setFlag(5, !this.checkFlag(5));
			return true;
		}		

		return false;
	};
	
	per.showEvent = function()
	{
		var md, perMiku, clv;
		
		if (sType == "endgame1zali") {
			// End Game - Zali
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for MILFs?");

			md.write(
				'<p>One day you receive a message from your ' + (this.getCharmedLevel() == 2 ? 'lover' : 'slave') + ' Zali, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 269) {
			if (sType == "zalipool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Zali");
				md.write(
					'<p>Zali arrives, dressed in a swimsuit and a light pink top over it. She tells you she is careful of the sun and is not a good swimmer. So you sit with her and chat for a while.</p>'
				);
				startQuestions();
				if (this.getCharmedLevel() == 4) addLinkToPlaceC(md, 'take her to somewhere private', Place, 'type=zalipoolsex');
				else addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=zalipoolsex');
				addLinkToPlaceC(md, 'say goodbye to Zali', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "zalipoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				if (this.getCharmedLevel() == 4) {
					addPlaceTitle(md, "Private Fucking with Slave Zali");
					md.write(
						'<p>You take Zali to a more private area, and she seductively removes most of her swimsuit and kneels ready for you.</p>'
					);
				} else {
					addPlaceTitle(md, "Being Discrete and Private with Zali");
					md.write(
						'<p>You ask Zali to play with you more privately, and she seductively removes most of her swimsuit and kneels ready for you.</p>'
					);					
				}
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Zali', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 220) return false;
		
		perMiku = findPerson("Miku");
		
		if (sType == "meetzali") {
			// Initial meeting
			md = WritePlaceHeader();
			this.showPerson("angrydoor.jpg");
			addPlaceTitle(md, "Angry Cat-Lady Zali");

			md.write(
				'<p>From the house your hear a woman yell “Who is it?”</p>' +
				'<p>You answer with no real inspiration, "' + capitalize(perYou.getSex()) + ' Scouts selling cookies"</p>' +
				'<p>An angry lady in a bath robe answers the door, it must be Zali Taylor.</p>' +
				'<p>She says "I don’t appreciate strangers dropping by unannounced, who are you young ' + perYou.getManWoman() + '?  Better yet, you need to leave right now or I’m calling the cops."</p>' +
				'<p>You suppose you could apologise and appeal to her love of cats, but you could leave and think of something else. You doubt she will listen to an apology unless you back it up <i>magically</i>.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she slams the door in your face', 219, 'type=leavezali');
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "charmzalilover1") {
			// Charm Zali (Lover) 1
			md = WritePlaceHeader();
			this.showPerson("charm1l.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>You cast the spell and explain you were following your cat Miku and gesture to where Miku is now lying on her couch. Her attitude immediately changes, "Oh…Oh my…what was I thinking, uhhmm would you please come in…" She blushes</p>' +
				'<p>You step into her home and close the door behind you.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you thank her and step over and pat Miku', Place, 'type=charmzalilover2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmzalilover2") {
			// Charm Zali (Lover) 2
			md = WritePlaceHeader();
			this.showPerson("charm2l.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>As the spell takes a hold of her, she looks more flustered and says, "Oh my I feel so hot… I haven’t felt this way since Richard passed, oh my…"</p>' +
				'<p>You try to focus her attention on yourself and tell her she is an attractive woman and there is nothing wrong, she should just go with her feelings.</p>' +
				'<p>You hear Miku purring loudly in her approval!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you again compliment her', Place, 'type=charmzalilover3');
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "charmzalilover3") {
			// Charm Zali (Lover) 3
			md = WritePlaceHeader();
			this.showPerson("charm3l.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>“Opps, my robe slipped!” she smiles in a seductive way as she looks at you. She has clearly decided to go with her feelings, feelings of lust!</p>' +
				'<p>You tell her how sexy she is, and she smiles.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she drops her robe', Place, 'type=charmzalilover4');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmzalilover4") {
			// Charm Zali (Lover) 4
			md = WritePlaceHeader();
			this.showPerson("charm4l.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>She drops her robe entirely and she purrs "Do you like what you see?"</p>' +
				'<p>You hear Miku purring loudly in her approval, and you tell her yes you do and step over to embrace Zali, your new cat-lady lover!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'make love to her', Place, 'type=zalifuck');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmzalislave1") {
			// Charm Zali (Slave) 1
			md = WritePlaceHeader();
			this.showPerson("charm1s.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>You cast the spell and and let ' + getPoliceChief() + ' Batton start to arrest her, and then you intervene, explaining that you can come to an arrangement with Zali,' +
				' as long as she applogises <b>very</b> sincerely. ' + getPoliceChief() + ' Batton steps back and watches, you notice she starts to caress her breasts, knowing or guess what is coming next.</p>' +
				'<p>It is strange you would normally not object to Kerry watching but you think you need to be quite careful and assertive with Zali, and you firmly but politely tell Kerry that she is not needed anymore. Kerry looks disappointed and leaves, you will have to make it up to her later.</p>' +
				'<p>You return your attention to Zali and wait. She is very flustered and blushing as the arousal of the spell washes over her. She avoid looking at you and says some sort of "sorry".</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you tell her to apologise properly', Place, 'type=charmzalislave2');
			AddPeopleColumn(md);
			findPerson("OfficerBatton").showPerson("callout.jpg");			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmzalislave2") {
			// Charm Zali (Slave) 2
			md = WritePlaceHeader();
			this.showPerson("charm2s.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<pYou tell her to apologise more appropriately, she has to do <b>anything</b> for you so you do not call the police back again.</p>' +
				'<p>Strangely Zali looks almost happy and without you asking (though you were just about to) she starts to remove her clothing. She says,</p>' +
				'<p>"Obey like this, obey and do anything at all, like Richard wanted?" you of course agree and wonder if she was secretly or not so secretly submissive. Not like Ms. Titus was but more like wanting others to be in charge? Odd for an independent person, but maybe whoever "Richard" was possibly this was their way?</p>' +
				'<p>Then again the spell may of just brought out hidden desires and fantasies in her?</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'tell her to submit to you', Place, 'type=charmzalislave3');
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "charmzalislave3") {
			// Charm Zali (Slave) 3
			md = WritePlaceHeader();
			this.showPerson("charm3s.jpg");
			addPlaceTitle(md, "Zali Under a Spell");

			md.write(
				'<p>She smiles, "Whatever you want, whenever you want it ' + perYou.getMaster() + '"</p>' +
				'<p>You smile back at your new charmed but happily willing slave.<p>'
			);
			addLinkToPlaceC(md, 'take your slave', Place, 'type=zalifuck');
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "zalifuck") {
			// Fuck her
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("home-sex-fuckb", isExplicit() ? 5 : 1);
			else this.showPersonRandom("home-sex-fuckg", 2);
			addPlaceTitle(md, "Fucking your " + (clv == 4 ? "Slave" : "Lover"));

			if (clv == 4) {
				md.write(
					'<p>You embrace Zali and tell her you are going to fuck her, she is apologetic, for her figure and that she has not had much recent experience. You tell your slave there is no problem, she will learn what you like and how you enjoy fucking her. You also emphasise how she will enjoy serving you as your lovely older sex-toy!</p>'
				);
			} else {
				md.write(
					'<p>Zali is self-conscious when you embrace her, she mentions her figure and lack of recent practise. You compliment her figure about how it is full and womanly, and how you will learn together anything she has forgotten or is a bit \'rusty\' with.</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to your ' + (clv == 4 ? "slave" : "lover"), Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "zalibj") {
			// Oral
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("home-sex-bj", isExplicit() ? 6 : 1);
			addPlaceTitle(md, "Oral Attention from your " + (clv == 4 ? "Slave" : "Lover"));

			if (clv == 4) {
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You tell Zali to give you a blowjob and she steps over and kneels before you smiling and says "Yes ' + perYou.getMaster() + '". She gives you a reasonably skilled blowjob, something she has certainly done many times before!</p>'
					);					
				} else {
					md.write(
						'<p>You tell Zali to come over and lick you pussy, time for some cunnilingus! She steps over smiling and says "Yes ' + perYou.getMaster() + '" and she is surprisingly skilled, she is definitely experienced at this! You ask her if she has had female lovers before, and she replies, "Lovers no, but there were some fun meetings of the PTA"</p>'
					);
				}
			} else {
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You ask Zali to give you a blowjob and she happily steps over and kneels before you smiling. She gives you a reasonably skilled blowjob, something she has certainly done many times before!</p>'
					);					
				} else {
					md.write(
						'<p>You ask Zali to come over for some cunnilingus! She steps over smiling and she is surprisingly skilled, she is definitely experienced at this! You ask her if she has had female lovers before, and she replies, "Lovers no, but there were some fun meetings of the PTA"</p>'
					);
				}

			}

			startQuestions();
			addLinkToPlaceC(md, 'talk more to your ' + (clv == 4 ? "slave" : "lover"), Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "zalipolicephone" || sType == "zalipolicemeet") {
			md = WritePlaceHeader();
			this.setFlag(3);
			this.showPerson("policevisit.jpg");
			addPlaceTitle(md, "Police with Zali");
			
			if (sType == "zalipolicephone") md.write('<p>You meet ' + getPoliceChief() + ' Batton at Zali\'s home, she arrives in a police car, and asks you to wait outside for a little.');
			else {
				md.write(
					'<p>You explain about Zali to ' + getPoliceChief() + ' Batton and ask her to get you back in to see Zali, and cancel any investigation. Kerry takes you to her police car and drives you to the Taylor home. She asks you to wait outside for a little while.'
				);
			}
			md.write(
				'<p>After a while Kerry opens the door, amd takes you into the kitchen. You see they were having a cup of coffee. Zali looks immediately hostile and says "Yes, that is the person!"</p>' +
				'<p>You tell ' + getPoliceChief() + ' Batton you were chasing your cat Miku and gesture at Miku on the couch. You say you suspect Zali has stolen her, how else is Miku in here?</p>' +
				'<p>Zali starts to explain that Miku just followed her in here and how she loves cats. ' + getPoliceChief() + ' Batton explains she will have to arrest Zali and take her in for questioning.</p>' +
				'<p>Zali looks shocked and tries to apologise, you suppose you could accept, but she has annoyed you quite a bit and this something stricter maybe required.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'accept the apology and leave', 215, '', 'You give up on the MILF she is too much of a bother. You accept the apology and tell Kerry not to bother and leave the house with her', '', "movePerson('Zali',1000)");
			AddPeopleColumn(md);
			findPerson("OfficerBatton").showPerson("callout.jpg");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmzali") {
			// Re-charm Zali
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");
			addPlaceTitle(md, "Zali Under a Spell Again");
			if (clv == 3) this.charmThem(4);
			else this.charmThem(3);
			
			if (clv == 4) {
				// Now lover
				md.write(
					'<p>As the spell takes ahold of her again, she looks more flustered and says, "Oh my I feel so hot… I haven’t felt this way since Richard passed, oh my…"</p>' +
					'<p>You try to focus her attention on yourself and tell her she is an attractive woman and there is nothing wrong, she should just go with her feelings.</p>' +
					'<p>You tell her how sexy she is, and how anyone would want her as a lover. She smiles.</p>' +
					'<p>You hear Miku purring loudly in her approval!</p>'
				);
			} else {
				md.write(
					'<pYou tell her you need her to apologise for her earlier calling the police, she has to do <b>anything</b> for you so you do not call the police back again.</p>' +
					'<p>Strangely Zali looks almost happy and without you asking (though you were just about to) she starts to remove her clothing. She says,</p>' +
					'<p>"Obey like this, obey and do anything at all, like Richard wanted?" you of course agree and wonder if she was secretly or not so secretly submissive. Not like Ms. Titus was but more like wanting others to be in charge? Odd for an independent person, but maybe whoever "Richard" was possibly this was their way?</p>' +
					'<p>Then again the spell may of just brought out hidden desires and fantasies in her?</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more with your new ' + (this.getCharmedLevel() == 2 ? 'lover' : 'slave') + ' Zali', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		return false;
	};
	
	per.showPersonChat = function(md)
	{
		var clv;
		if (Place == 219 && sType === "") {
			if (!this.checkFlag(1)) addLinkToPlace(md, "open the letter box", 219, '', 'You see a bill addressed to Zali Taylor, an unusual name.', '', "setPersonFlag('Zali',1)");
			else if (!this.isCharmedBy() && !this.checkFlag(2)) addLinkToPlace(md, "knock on the door", 220, 'type=meetzali');
		}
		if (Place == 220 && sType === "") {
			clv = this.getCharmedLevel();
			addLinkToPlaceC(md, clv == 4 ? "fuck your MILF slave" : "make love to Zali", Place, 'type=zalifuck');
			addLinkToPlaceC(md, clv == 4 ? ("tell your MILF slave to " + (perYou.isMaleSex() ? "give you a blowjob" : "lick you")) : ("ask your lover to " + (perYou.isMaleSex() ? "give you a blowjob" : "lick you")), Place, 'type=zalibj');
			if (!this.checkFlag(4)) {
				if (clv == 4) {
					addPopupLink(md, 'tell her to strip for you', "Stripping",
						this.addPersonString("strip1" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "rightpopup") +
						'You tell Zali to strip for your enjoyment, and she immediately starts to remove the little she is wearning, smiling as always',
						true, "WaitHereOnly(6);setPersonFlag('Zali',4);dispPlace(Place,'type=stripzali2')"
					);
				} else {
					addPopupLink(md, 'go for a walk in the park with Zali', "Walking",
						this.addPersonString("walk1" + (this.checkFlag(5) ? "b" : "a") + ".jpg" , "height:max%", "rightpopup") +
						'You invite Zali to go for a walk in the park. She quickly changes her dress and joins you for a walk. You notice after a while her dress has ridden up showing her panties, you are sure deliberately.',
						true, "WaitHereOnly(6);setPersonFlag('Zali',4);dispPlace(Place,'type=walkzali2')"
					);
				}
			}
			this.addSleepLink(md, "bed Zali", "Sleeping with Zali",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Zali to bed for the night.</b>',
				'bed.jpg', true
			);
		}
		if (Place == 168 && this.checkFlag(2) && !this.checkFlag(3) && isCharmedBy("OfficerBatton")) addLinkToPlace(md, "explain about Zali", 220, 'type=zalipolicemeet');
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1zali" : "";
	};

	//Spells and Items
	per.handleItem = function(no, cmd)
	{
		if (no == 14 && cmd == 2) {
			if (!this.isHere()) return "";
			if (sType == "meetzali") CastCharmSpell("Zali", Place, 3, 'type=charmzalilover1');
			else if (sType.indexOf("zalipolice") != -1) CastCharmSpell("Zali", Place, 4, 'type=charmzalislave1');
			else if (this.isCharmedBy()) CastCharmSpell("Zali", Place, 4, '', '', 'type=recharmzali1');
			return "handled";		
		};
		return "";		// do nothing
	};

	//Phone calls, default
	
}
