/************************************
 Penelope, School Administrator
		
************************************/
function initialisePenelope()
{
	// Ms Reagan, school Principal
	addPerson("Penelope", 0, "Penelope", "");
	
	per.getPersonAddress = function(n) { return this.checkFlag(2) ? n ? 392 : '20 Dervish Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function()
	{
		return 'face' + (this.isCharmedBy() ? 'c' : 'u');
	};

	per.getPersonName = function(full) {
		if (full === true) return "Penelope";
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Penelope";
			return "Penelope, your lover";
		} 
		return this.name;	// If NOT Charmed
	};
	per.getPersonNameShort = function(uncharmed) {
		return "Penelope";
	};
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };

	per.whereNow = function() {
		return isShopOpen(2) ? this.place : this.checkFlag(2) ? 392 : 0;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 73 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPersonRandom("aftercharm", 2, '', '', '', '', 0, false, "string");
			return this.showPerson("intro.jpg", '', '', '', '', false, "string");
		}	
		else if (Place == 392 && this.isHere() && sType === "") return this.showPerson("bedsexcommandposition.jpg", '', '', '', '', false, "string");		
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		return Place == 390 && this.whereNow() == 392 && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("livingroom.jpg");
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 73 && this.isHere() && sType === "") {
			if (!this.isCharmedBy()) md.write('<p>"Hi ' + perYou.getPersonName() + '! Are you here to discuss school welfare?"</p>');
			else {
				if (this.isLover()) {
					md.write(
						'<p>Penelope looks happy to see you, "Oh ' + perYou.getYourNameFor() + ', thank you for visiting me". She continues, "Are you here about school welfare, or do you want me to look after <b>your</b> welfare and needs?" ' +
						'She looks at you with some lust as she waits for you to ask what or who you want.</p>'
					);
				} else {
					md.write(
						'<p>Penelope looks happy to see you, "Oh ' + perYou.getMaster() + ', I am grateful you have come to supervise me". She continues, "I am here to manage your lusts and every wish. Now let me serve you." ' +
						'She waits subserviantly forr you to tell her what to do!</p>'
						
					);
				}
				return;
			}			
		}
		if (Place == 390 && this.whereNow() == 392 && sType === "") {
			md.write('<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' Penelope is waiting for you near the door to her room. She gestures towards the bedroom inviting you to join her there.</p>');
		}
		if (Place == 392 && this.isHere() && sType === "") {
			md.write(
				'<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' quickly removes most of her clothing and sits on the bed waiting for you. ' +
				(this.isLover() ? 'She happily says,</p><p>"I love you ' + perYou.getPersonName() + ' please let me show you how much?"</p>' 
									 : 'She looks very pleased,</p><p>"' + perYou.getMaster() + ' please let me satisfy your needs and desires"</p>')
			);
		}		
	};
	
	per.showPersonChat = function(md)
	{
		if (Place == 73 && sType === "" && this.isHere() && this.isCharmedBy()) {
			if (isPersonHere("Catherine")) {
				addLinkToPlaceC(md, this.isLover() ? '"Penelope, let\'s discuss my physical welfare"' : 'Penelope spreads her legs ready for you to fuck her', Place, 'type=penelopefuck');
				addLinkToPlaceC(md, this.isLover() ? '"Penelope, could you go down on me?"' : 'Penelope kneels before you ready to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=penelopebj');
			} else {
				addLinkToPlaceC(md, this.isLover() ? '"Let\'s discuss my physical welfare"' : 'she spreads her legs ready for you to fuck her', Place, 'type=penelopefuck');
				addLinkToPlaceC(md, this.isLover() ? '"Could you go down on me?"' : 'she kneels before you ready to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=penelopebj');
			}
		} 
		if (this.whereNow() != 392) return;
		
		if (Place == 392 && sType === "") { // && this.isCharmedBy()) {
			addLinkToPlaceC(md, this.isLover() ? '"Shall we make love"' : 'she spreads her legs ready for you to fuck her', Place, 'type=penelopefuck');
			addLinkToPlaceC(md, this.isLover() ? '"Could you go down on me?"' : 'she kneels before you ready to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=penelopebj');
			if (perYourBody.FindItem(45) > 0 && !perYou.isMaleSex()) addLinkToPlaceC(md, 'take out your strap-on and fuck her', Place, 'type=penelopefuckstrap');
			addLinkToPlaceC(md, this.isLover() ? '"Let\'s have a shower together"' : 'have a shower with Penelope' , Place, 'type=penelopeshowerfuck');
			addLinkToPlaceC(md, 'enjoy both of the school administrators', Place, 'type=penelopethreesome1');
			this.addSleepLinkRandom(md, "spend the night with Penelope", "Going to Bed with your " + (this.isLover() ? "Lover" : "Slave") + " Penelope",
				'<p style="position:absolute;right:2%;bottom:2em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">' +
				(this.isLover() ? 'You ask Penelope if you can spend the night here tonight. She is delighted to have her lover to herself for the night' :
										'You tell your slave Penelope that you will sleep here tonight. She lies down waiting for you to join her') + '.</p>',
				"bed.jpg", 2, true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
			);			
		}		
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 73 && !this.checkFlag(1) && this.isHere()) {
			this.setFlag(1);
			this.extra[0] = nTime;
			showPopupWindow("Penelope of School Administration",
				this.addPersonString("intro.jpg", "height:max%", "right") +
				"You enter the administration office and you see Penelope standing near her desk. You notice on her computer screen is a well known property website. She smiles at you and says,</p>" +
				'<p>"Hi! You must be ' + perYou.getPersonName() + ', nice to meet you! Principal Reagan said you would be visiting and told me about your interest in improving our school welfare. I honestly like students who take initiative in helping others!"</p>' +
				'<p>You thank her, though you think more about how you are more interested in her!<p>' +
				'<p>She starts to ask you about your ideas, but you make an excuse about having a class you have to go to soon and promise to return. That is certainly not a lie, you definitely plan to return for <b>her</b>!'
			);
			return true;
		}
		if (Place == 73 && this.hoursSince(this.extra[0]) > 12 && this.isHere()) {
			this.extra[0] = nTime;
			showPopupWindow("Penelope Busy",
				this.addPersonString("call" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") +
				"You enter the administration office and you see Penelope is busy on a phone call, it sounds like some school business for supplies but it is difficult to say"
			);
			return true;
		}		

		if (Place == 390 && !this.checkFlag(3) && this.checkFlag(2) && !isShopOpen(2)) {
			this.setFlag(3);
			this.other = nTime;
			showPopupWindow("Penelope's New Home",
				this.addPersonString("moving.jpg", "height:max%", "right") +
				"Principal Reagan lets you into her home and you see Penelope, she must of moved in already. You follow her into her new room and she thanks you for arranging this for her, and promises to thank you properly when she is unpacked.</p>" +
				"<p>You see her starting to remove some of her clothing and it is clear how she plans to thank you."
			);
			return true;

		}		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, clv, type, bMan, perCatherine;
		
		if (sType == "endgame1penelope") {
			// End Game - Penelope
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Administrators?");
			var sf = this.isLover() ? 'lover' : 'slave';
			md.write(
				'<p>One day you talk to your ' + sf + ' Penelope, you see her swollen pregnant belly, she must of had a meeting with Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 269) {
			if (sType == "penelopepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPersonRandom("pool", 3);
				addPlaceTitle(md, "Swimming with " + this.getPersonName());
				if (this.isLover()) {
					md.write(
						'<p>Your lover Penelope arrives dressed in a pink bikini, and poses for your pleasure after quietly saying she loves you. She is content to wait for you to ask for anything else so you suggest going for a swim.</p>' +
						'<p>You admire her slim figure as you swim together and you can see she enjoys your attention. You notice how she is very attentive, almost hanging on your every word or request.</p>'
					);
				} else {
					md.write(
						'<p>Your slave Penelope promptly arrives dressed in a pink bikini, and she poses for your pleasure. She says little, waiting for you to decide what you want from her so you tell her to go for a swim together.</p>' +
						'<p>You admire your slave\'s slim figure as you swim with her and you can see she enjoys your attention. She definitely wants you to decide or order her to do anything here and when you give a few small directions she is very happy.</p>'
					);
				}
				startQuestions();
				if (perYou.isMaleSex()) addLinkToPlaceC(md, this.isLover() ? 'ask her to assist you with something lower down' : 'order her to go down on you', Place, 'type=penelopepoolsexbj');
				addLinkToPlaceC(md, this.isLover() ? 'suggest going somewhere private and intimate' : 'direct her to go with you somewhere private for sex', Place, 'type=penelopepoolsexfuck');
				addLinkToPlaceC(md, 'say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType.indexOf("penelopepoolsex") != -1) {
				md = WritePlaceHeader();
				type = (sType.indexOf("fuck") != -1);
				if (!isExplicit() || !perYou.isMaleSex()) this.showPerson("poolsex.jpg");
				else this.showPersonRandomX("pool" + (type ? "fuck" : "bj"), 2);
				
				addPlaceTitle(md, "Intimate with Penelope at the Pool");
				if (type) {
					md.write(
						'<p>' + this.getPersonName() + ' is quite content to fuck by the water.</p>'
					);
				} else {
					md.write(
						'<p>' + this.getPersonName() + ' is quite content to just ' + (perYou.isMaleSex() ? 'lick your pussy' : 'suck your cock') + ' by the water.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Penelope', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 73 || Place == 390 || Place == 391 || Place == 392) {
			bMan = perYou.isMaleSex();
			clv = this.getCharmedLevel();
			perCatherine = findPerson("Catherine");
			
			if (sType == "penelopethreesome1") {
				// Threesome with Ms Reagan
				md = WritePlaceHeader();
				this.showPerson("reaganteamupstartpic.jpg");

				addPlaceTitle(md, "Penelope and Principal Reagan");
				md.write('<p>You call both Penelope and Principal Reagan to join you and as they sit on the bed you can see they know why. Especially as Principal Reagan takes out a dildo and shows it to Penelope.</p>');

				startQuestions();
				if (!perYou.isMaleSex()) addLinkToPlaceC(md, 'take them', Place, 'type=penelopethreesome2&ctype=lesbian');
				else {
					addLinkToPlaceC(md, 'have them go down on you', Place, 'type=penelopethreesome2&ctype=bj');
					addLinkToPlaceC(md, 'fuck them', Place, 'type=penelopethreesome2&ctype=fuck');
				}
				addLinkToPlaceC(md, 'leave it there for now', Place);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "penelopethreesome2") {
				// Threesome with Ms Reagan
				md = WritePlaceHeader();
				type = getQueryParam("ctype");
				if (type == "lesbian") this.showPersonRandomRorX("reaganteamuplesbian", isExplicit() ? 2 : 1);
				else if (type == "bj") this.showPersonRandomRorX("reaganteamupbjb", isExplicit() ? 2 : 1);
				else this.showPersonRandomRorX("reaganteamupfuckb", isExplicit() ? 4 : 1);

				addPlaceTitle(md, "Penelope and Principal Reagan");
				md.write('<p>You enjoy both of your school administrators!</p>');

				startQuestions();
				addLinkToPlaceC(md, 'leave it there for now', Place);
				WritePlaceFooter(md);
				return true;				
			}			

			if (sType == "penelopefuck") {
				// Fuck
				md = WritePlaceHeader();
				if (Place == 73) {
					if (!perYou.isMaleSex()) this.showPersonRandom("aftercharmfuckg", 2);
					else this.showPersonRandomRorX("aftercharmfuckb", isExplicit() ? 5 : 1);
				} else if (!perYou.isMaleSex()) this.showPersonRandom("aftercharmbedfuckg", 3);
				else this.showPersonRandomRorXBG("aftercharmbedfuck", 3);

				if (clv == 3) {
					addPlaceTitle(md, "Making Love to Penelope");
					if (perYou.isMaleSex()) md.write('<p>You mount your lover telling her how that you love her and how great she looks. You then slap her ass and start to fuck her, concentrating on both yours and her pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that you love her.</p>');
					else md.write('<p>You decide to try some tribbing with your lover.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your slave");
					if (perYou.isMaleSex()) md.write('<p>You mount your slave, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
					else md.write('<p>You decide to try some tribbing with your slave.</p>');
				}
				if (perCatherine.isHere()) md.write('<p>Catherine watches you and Penelope with some interest and arousal, masturbating as she watches.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				if (perCatherine.isHere()) {
					AddPeopleColumnMed(md);
					perCatherine.showPerson("adminoffice" + (perCatherine.isCharmedBy() ? "c" : "u") + "-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "penelopebj") {
				// Blowjob
				md = WritePlaceHeader();
				if (Place == 73) this.showPersonRandomRorXBG("aftercharmbj", isExplicit() ? perYou.isMaleSex() ? 4 : 2 : 1);
				else this.showPersonRandomRorXBG("aftercharmbedbj", isExplicit() ? 3 : 1);
				
				if (clv == 4) {
					addPlaceTitle(md, "Your slave "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				} else {
					addPlaceTitle(md, "Your Lover "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You ask her if she would give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth.</p>');
					else md.write('<p>You ask her to lick you, and she kneels uncertain how to proceed. You sit down and give her instructions to pleasure you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm.</p>');
				} 
				if (perCatherine.isHere()) md.write('<p>Catherine watches you and Penelope with some interest and arousal, masturbating as she watches.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				if (perCatherine.isHere()) {
					AddPeopleColumnMed(md);
					perCatherine.showPerson("adminoffice" + (perCatherine.isCharmedBy() ? "c" : "u") + "-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "penelopefuckstrap") {
				// Strap-on fuck
				md = WritePlaceHeader();
				this.showPersonRandomX("straponfuck", 4);
				addPlaceTitle(md, "Fucking Your " + (this.isLover() ? "Lover" : "Slave") + " Penelope");
				if (clv == 4) md.write('<p>You tell her that she will now fuck her with your strap-on.</p>');
				else md.write('<p>You take out your strap-on and Penelope lies back ready for you to fuck her.</p>');

				if (perCatherine.isHere()) md.write('<p>Catherine watches you and Penelope with some interest and arousal, masturbating as she watches.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				if (perCatherine.isHere()) {
					AddPeopleColumnMed(md);
					perCatherine.showPerson("adminoffice" + (perCatherine.isCharmedBy() ? "c" : "u") + "-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "penelopeshowerfuck") {
				// Shower with Penelope
				md = WritePlaceHeader();
				this.showPerson("shower1.jpg");
				addPlaceTitle(md, "Showering with your " + (this.isLover() ? "Lover" : "Slave") + " Penelope");
				md.write('<p>You decide to have a shower with Penelope, thought it is more about getting down and dirty than clean!</p>');

				startQuestions();
				addLinkToPlaceC(md, 'get dirty with '  + this.getPersonNameShort(), Place, 'type=penelopeshowermore');
				addLinkToPlaceC(md, 'finish the shower and get dressed', Place);
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "penelopeshowermore") {
				// Shower with Penelope Sex
				md = WritePlaceHeader();
				if (isExplicit() && perYou.isMaleSex()) this.showPersonX("showersexb.jpg");
				else this.showPerson("showersex.jpg");
				addPlaceTitle(md, "More than Showering with your " + (this.isLover() ? "Lover" : "Slave") + " Penelope");
				md.write('<p>You embrace Penelope and take it further.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'finish the shower and get dressed', Place);
				WritePlaceFooter(md);
				return true;					
			}			
			
			if (sType == "peneloperecharm") {
				// Recharm Penelope
				md = WritePlaceHeader();
				this.showPerson("recharm.jpg");			
				addPlaceTitle(md, "Penelope Under a Charm Spell Again");

				md.write('<p>You recite the spell "Dai chu Penelope", and she cries out,</p>');

				if (this.getCharmedLevel() == 4) {
					// Lover
					this.charmThem(3);
					md.write(
						'<p>"Oh what does that mean, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her you do find her very attractive. You find me sexy as well don\' you?". She replies,</p>' +
						'<p>"Yes, you are really, really <b>hot</b> but you are a student and Principal Reagan does not allow staff and students..."</p>' +
						'<p>You tell her "I am very close to her now and she will allow it as long as we keep it private"</p>' +
						'<p>You continue to compliment and seduce her until the spell is firmly established and Penelope is your new lover.</p>'
					);
				} else {
					// Slave
					this.charmThem(4);
					md.write(
						'<p>"Oh what does that mean, there is something familiar like deja vu, but a bit hotter.."</p>' +					
						'<p>You tell her you do find her very attractive and ask if she would like to please you. She looks confused, aroused but unsure what you mean,</p>' +
						'<p>"You are really <b>hot</b> but you are not my supervisor". You immediately continue explaining how close Principal Reagan is to you and how she will do nothing to interfer.</p>' +
						'<p>You tell her how you will support her and how she will do everything you ask and <i>anything</i></p>' +
						'<p>You continue to assert your position of authority until the spell is firmly established and Principal Reagan is your new slave.</p>'
					);
				}

				startQuestions();	
				addLinkToPlaceC(md, 'talk more to Penelope', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place != 73) return false;
		
		if (sType == "charmadminoffice1") {
			// Event: Cast Charm on Penelope 1
			md = WritePlaceHeader();
			this.showPersonRandom("charm1", 3);
			addPlaceTitle(md, "Penelope Under a Charm Spell");
			
			md.write(
				'<p>When Penelope talks about school welfare you tell her that you are actually more interested in her. She replies annoyed,</p>' +
				'<p>"What rubbish are you talking about? You should leave now..." You interrupt her as you recite the charm spell "Dai chu Penelope, what do you say now?". She stops and then cries out,</p>' +
				'<p>"Oh my god I haven\'t had this kind of sensation since my break-up with a friend". You laugh in expectation of her falling under the spell. She does not appear to hear and asks you,</p>' +
				'<p>"Do you find me attractive?" This confuses you since most people resist much longer and she seems to be surrendering to the spell very quickly. You think that maybe her troubled life has led her to have low self esteem or a more dependent attitude now.</p>' +
				'<p>You think you can easily make her a slave given what you think of her nature'
			);
			if (perYou.checkFlag(26)) md.write(' or be a little gentler and instead make her your lover. So what do you want to do?</p>');
			else md.write('.</p>');

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, 'have Penelope embrace her submissiveness', Place, 'type=charmadminoffice2', '', '', "charmPerson('Penelope',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, '"Yes, I find you attractive"', Place, 'type=charmadminoffice2', '', '', "charmPerson('Penelope',3);");
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "charmadminoffice2") {
			// Event: Cast Charm on Penelope 2
			md = WritePlaceHeader();
			this.showPersonRandom("charm2" + (this.isLover() ? "lover" : "slave"), 2);
			addPlaceTitle(md, 'Penelope Being ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>You tell her you do find her very attractive and ask, "You find me sexy as well don\' you?". She replies,</p>' +
					'<p>"Yes, you are really, really <b>hot</b> but you are a student and Principal Reagan does not allow staff and students..."</p>' +
					'<p>You tell her "I am very close to her now and she will allow it as long as we keep it private".</p>' +
					'<p>As you are saying this the spell is clearly working on her and she starts to hike up her skirt and her top starts to slip down...</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'tell her how sexy she is', Place, 'type=charmadminoffice3');
			} else {
				md.write(
					'<p>You tell her you do find her very attractive and ask if she would like to please you. She looks confused, aroused but unsure what you mean,</p>' +
					'<p>"You are really <b>hot</b> but you are not my supervisor". You immediately continue explaining how close Principal Reagan is to you and how she will do nothing to interfer.</p>' +
					'<p>You tell her how you will support her and how she will do everything you ask and <i>anything</i>!</p>' +
					'<p>As you are saying this the spell is clearly working on her and she starts to hike up her skirt and her top starts to slip down...</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'tell her show more for your pleasure', Place, 'type=charmadminoffice3');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmadminoffice3") {
			// Event: Cast Charm on Penelope 3
			md = WritePlaceHeader();
			this.showPersonRandom("charm3" + (this.isLover() ? "lover" : "slave"), this.isLover() ? 2 : 1);
			addPlaceTitle(md, 'Penelope ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>She strips more, seductively for her new lover until she has only her underwear on. She smiles but does not say anything while waiting for your comment.</p>' +
					'<p>You compliment her saying how she is desirable, beautiful and sexy. You can almost see your words affecting her, driving her arousal and her feelings for you.</p>' +
					'<p>She smiles and a bit hesitantly "If Principal Reagan does not mind...". You assure her the Principal will not care, you will talk to her about the two of you. You may but not for permission or approval!</p>' +
					'<p>She looks at you with considerable desire, you doubt she has anything on her mind but you and her lust...</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'make love to her', Place, 'type=charmadminoffice4&ctype=fuck');
				addLinkToPlaceO(md, 'allow her to pleasure you', Place, 'type=charmadminoffice4&ctype=bj');

			} else {
				md.write(
					'<p>Penelope strips until she is wearing only her underwear and she poses as if presenting herself to you. Before you say anything she softly says,</p>' +
					'<p>"Can I call you ' + perYou.getMaster() + ' it seems so appropriate and hotter?" You of course tell her to and further more to serve you and obey you at all times and in all ways as your beautiful, beloved <b>slave</b>!</p>' +
					'<p>She looks very happy, "I am your slave ' + perYou.getMaster() + ' and lover, you can do whatever you want to me here or anywhere!"</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave', Place, 'type=charmadminoffice4&ctype=fuck');
				addLinkToPlaceO(md, 'have your slave orally service you', Place, 'type=charmadminoffice4&ctype=bj');

			}

			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmadminoffice4") {
			// Event: Cast Charm on Penelope 4
			type = getQueryParam("ctype");
			md = WritePlaceHeader();
			var bMan = perYou.isMaleSex();
			if (type == "fuck") {
				if (!perYou.isMaleSex()) this.showPersonRandom("aftercharmfuckg", 1);
				else this.showPersonRandomRorX("aftercharmfuckb", isExplicit() ? 5 : 1);
			} else this.showPersonRandomRorXBG("aftercharmbj", isExplicit() ? perYou.isMaleSex() ? 4 : 1 : 1);

			addPlaceTitle(md, 'Penelope ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (this.isLover()) {
				if (perYou.isMaleSex()) {
					if (type == "fuck") md.write('<p>You fuck Penelope</p>');
					else md.write('<p>Penelope gives you a blowjob</p>');
				} else {
					if (type == "fuck") md.write('<p>You fuck Penelope.</p>');
					else md.write('<p>Penelope licks you.</p>');				
				}
			} else {
				if (perYou.isMaleSex()) {
					if (type == "fuck") md.write('<p>You fuck Penelope</p>');
					else md.write('<p>Penelope gives you a blowjob</p>');
				} else {
					if (type == "fuck") md.write('<p>You fuck Penelope.</p>');
					else md.write('<p>Penelope licks you.</p>');				
				}				
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
		return this.isCharmedBy() ? "endgame1penelope" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In their office
			if (Place == 73 && this.isHere()) {
				// In her office
				CastCharmSpell("Penelope", Place, 1, 'type=charmadminoffice1', '', 'type=peneloperecharm');
				return "handled";
			}
			return "";
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=penelopepool');
			if (this.isLover()) receiveCall('','You call your lover Penelope and invite her to join you at the pool, and she readily agrees.'); 
			else receiveCall('','You call your slave Penelope and order her to join you at the pool, and immediate obeys and says she will be there as soon as she can.'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	
	per.addPersonPhoneCall = function() {
		// All messages SENT are post charm, once per day, except 400,407 and they are initiated by Penelope in her code
		if (!this.isCharmedBy()) return;
		
		if (this.isLover()) {
			// Lover SMS's
			if (this.hoursCharmed() > 24 && !this.checkFlag(11)) {
				if (this.makeCall(true, 410)) this.setFlag(11);
			}	
			if (this.hoursCharmed() > 48 && !this.checkFlag(12)) {
				if (this.makeCall(true, 411)) this.setFlag(12);
			}	
			if (this.hoursCharmed() > 72 && !this.checkFlag(13)) {
				if (this.makeCall(true, 412)) this.setFlag(13);
			}	
		} else {
			// Slave SMS's
			// Bondage vids
			if (this.checkFlag(2) && !this.checkFlag(14) && isMorning()) {
				if (this.makeCall(true, 413)) this.setFlag(14);
			}	
			if (this.checkFlag(2) && this.checkFlag(14) && this.hoursSince() > 24 && !this.checkFlag(15) && isMorning()) {
				if (this.makeCall(true, 414)) this.setFlag(15);
			}	
			if (this.checkFlag(2) && this.checkFlag(15) && this.hoursSince() > 48 && !this.checkFlag(16) && isMorning()) {
				if (this.makeCall(true, 415)) this.setFlag(16);
			}				
		}
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 400: return receiveSMS('SchoolAdmin', 'This is Penelope in school administration. You have a mandatory midday meeting in the Principal\'s Office');
			case 410: return receiveSMS('Penelope', 'Some new clothing to please you my love', "sms1.jpg");
			case 411: return receiveSMS('Penelope', 'I am thinking about you...I love you', "sms2.jpg");
			case 412: return receiveSMS('Penelope', 'I thought I would get some sun, I love yellow lingerie almost as much as I love you and decided to combine the two', "sms3.jpg");
		}
		return '';
	};

}
