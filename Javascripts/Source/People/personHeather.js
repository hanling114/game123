/************************************
 Heather, School Librarian
		
************************************/
function initialiseHeather()
{
	// Ms Reagan, school Principal
	addPerson("Heather", 77, "Heather", "");
	
	per.getPersonAddress = function(n) { return (this.isCharmedBy() || this.isFreeSlave()) && isPlaceKnown("HeathersHouse") ? n ? 58 : '19 Kollam Street, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function()
	{
		return 'face' + (this.isCharmedBy() ? 'c' : this.checkFlag(12) ? 'h' : 'u');
	};

	per.getPersonName = function(full) {
		if (full === true) return "Heather Graham";
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Heather";
			return "Heather, your lover";
		} else return this.isFreeSlave() ? "Hypno-slut Heather" : this.name;	// If NOT Charmed
	};
	per.getPersonNameShort = function(uncharmed) {
		return "Heather";
	};
	
	this.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (this.isFreeSlave()) return perYou.getMaster();
		if (clv < 2) return perYou.getPersonName();
		if (clv < 4) return "my Love";
		return perYou.getMaster();
	};
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };
	
	per.isFreeSlave = function() { return this.checkFlag(13); };

	per.whereNow = function() {
		if (Place == 51 && !isShopOpen(2)) return 51;
		return isShopOpen(2) ? this.place : 50;
	};
	
	per.passTimeDay = function() {
		if (this.place == 999) this.place = 77;
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 77 && this.isHere() && sType === "") {
			if (this.isFreeSlave() && getQueryParam("trigger") == 'slutmode') return this.showPerson("hypnoslut.jpg", '', '', '', '', false, "string");
			if (this.isCharmedBy()) return this.showPerson("postcharmed.jpg", '', '', '', '', false, "string");
			return this.showPerson(this.isCharmedBy("Davy") ? "librarydavy.jpg" : this.checkFlag(12) ? "libraryb.jpg" : "librarya.jpg", '', '', '', '', false, "string");
		}	
		else if (Place == 50 && this.isHere() && sType === "") {
			if (this.isFreeSlave()) return this.showPerson("homesexmenuh.jpg", '', '', '', '', false, "string");
			return this.showPersonRandom("homesexmenu", 1, '', '', '', '', 0, false, "string");		
		} else if (Place == 51 && this.isHere() && sType === "") {
			if (this.isFreeSlave()) return this.showPerson("bedsexmenuh.jpg", '', '', '', '', false, "string");
			return this.showPersonRandom("bedsexmenu", 2, '', '', '', '', 0, false, "string");
		}
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 77 && this.isHere() && sType === "") {
			var smode = getQueryParam("trigger") == "slutmode";
			if (!this.isCharmedBy()) {
				if (smode) md.write('<p>Heather looks at you quietly waiting your orders and simply says, "' + perYou.getMaster() + '"</p>');
				else md.write('<p>"' + perYou.getPersonName() + ' have you finished the assignment? Do you need any references or help?"</p>');
			} else {
				if (this.isLover()) {
					md.write(
						'<p>"Oh ' + perYou.getYourNameFor() + ', is there something I can help you with?" says Heather.</p>'
					);
				} else {
					md.write(
						'<p>"Oh ' + perYou.getMaster() + ', how can I serve you" asks Heather.</p>'
					);
				}
				return;
			}
		}
		if (Place == 50 && sType === "") {
			if (isItemHere(5)) md.write('<p>You notice sitting in a pot plant a decorative stone, you recognise it as a mana stone!</p>');
			if (this.isHere()) {
				if (this.isFreeSlave()) md.write('<p>You immediately activate Heather\'s trigger "slutmode" so she will serve you as the perfect slut here in her home!</p>');
				else md.write('<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' quickly removes some of her clothing and stands waiting for you.</p>');
			}
		}	
		if (Place == 51 && this.isHere() && sType === "") {
			if (this.isFreeSlave()) md.write('<p>Your hypno-slut Heather waits for you on the bed!</p>');
			else md.write('<p>Your ' + (this.isLover() ? 'lover' : 'slave') + ' quickly removes most of her clothing and sits on the bed waiting for you.</p>');
		}				
	};
	
	per.showPersonChat = function(md)
	{
		var sf;
		if (Place == 77 && sType === "" && this.isHere()) {
			var trigger = getQueryParam("trigger");
			var smode = trigger == "slutmode";
			if (this.isFreeSlave() && !smode) addLinkToPlaceC(md, 'tell Heather her trigger word "slutmode"', Place, 'trigger=slutmode', 'Heather stands and hikes up her tight dress exposing her breasts. Her face goes slack as she enters her hypnotic state, or is it her role-playing being in a trance?');
			if (this.isCharmedBy() || (this.isFreeSlave() && smode)) {
				if (this.isFreeSlave() && smode) addLinkToPlaceC(md, 'end Heathers trance', Place, '', 'Heather replaces her dress and resumes her librarian personna');
				sf = smode ? 'hypno-slut' : 'slave';
				addLinkToPlaceC(md, this.isLover() ? '"Let\'s have sex"' : 'fuck your ' + sf, Place, 'type=heatherfuck&trigger=' + trigger);
				addLinkToPlaceC(md, this.isLover() ? perYou.isMaleSex() ? '"Could you give me a blowjob?"' : '"Can you lick me?"' : 'have your ' + sf + ' ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=heatherbj&trigger=' + trigger);
				if (perYou.isMaleSex()) addLinkToPlaceC(md, this.isLover() ? '"Can I play with your tits"' : 'fuck your ' + sf + '\'s tits', Place, 'type=heatherboobjob&trigger=' + trigger);
				var perCatherine = findPerson("Catherine");
				if (perCatherine.checkFlag(24) && (perCatherine.whereNow() == 69 || perCatherine.whereNow() == 73)) addLinkToPlaceC(md, 'call Catherine to join in', Place, 'type=catherineheather&trigger=' + trigger);
				if (!isPlaceKnown("HeathersHouse")) {
					addQuestionR(md, (this.isLover() ? 'ask Heather' : ((this.isFreeSlave() && smode) ? 'compell your hypno-slut to tell you' : 'order your slave to tell you')) + ' where she lives',
						this.getPersonName() + " answers, \"Of course, " + perYou.getYourNameFor() + ", it is 19 Kollam Street. Please visit me anytime\" Interesting, she is a neighbour of yours and had not known that!",
						"Heather",
						"setPlaceKnown(\\'HeathersHouse\\')"
					);
				}
			} else if (this.checkFlag(12) && !this.checkFlag(13)) {
				// Ready for induction
				if (perYou.checkFlag(25)) addLinkToPlaceC(md, 'rapidly induce Heather into a hypnotic trance', Place, 'type=hypnotise1');

			}
		}

		if ((Place == 50 || Place == 51) && sType === "" && this.isHere() && (this.isCharmedBy() || this.isFreeSlave())) {
			sf = this.isFreeSlave() ? 'hypno-slut' : 'slave';
			addLinkToPlaceC(md, this.isLover() ? '"Shall we make love"' : 'fuck your ' + sf, Place, 'type=heatherfuck&trigger=slutmode');
			addLinkToPlaceC(md, this.isLover() ? '"Could you go down on me?"' : 'have your ' + sf + ' ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=heatherbj&trigger=slutmode');
			if (!perYou.isMaleSex() && perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, 'fuck her with your strapon', Place, 'type=heatherfuckstrap&trigger=slutmode');
			if (perYou.isMaleSex()) addLinkToPlaceC(md, this.isLover() ? '"Can I play with your tits"' : 'fuck your ' + sf + '\'s tits', Place, 'type=heatherboobjob&trigger=slutmode');			
			if (Place == 51) {
				this.addSleepLink(md, "spend the night with " + this.getPersonNameShort(), "Going to Bed with Heather",
					'<p style="position:absolute;right:2%;bottom:2em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">You tell Heather that you will sleep here tonight. She lies down awaiting you to join her.</p>',
					this.isFreeSlave() ? "bedb.jpg" : "beda.jpg", true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
				);
				if (this.isFreeSlave()) {
					this.addDancingLink(md, 'tell ' + this.getPersonName() + ' she will be dancing in the club for you',
						'You tell ' + this.getPersonName() + ' about the Avernus club and about dancing there for you,</p>' +
						'<p>&quot;Yes, yes ' + this.getYourNameFor() + ' as you compell me to!&quot; and with that you call Jade to arrange a dance for her.'
					);
				}
			}
		}	
		
		if (!this.checkFlag(2) || this.isCharmedBy()) return;
		
		// Hypno-slut path
		if (isPersonHere("Catherine") && sType === "" && !this.checkFlag(3)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask Catherine about Ms. Graham and any \'overlap\' with Catherine\'s hobbies. Translated from Catherine-isms, does she know anything about Ms. Graham\'s interests, particularly in sex. You also mention the book you saw,</p>' +
				'<p>"She is one petite goddess of boobage but I have had no \'dealings\' with her or heard much. A really sweet and kind person, but she has been a bit down for a while, something about a failed job interview."',
				"setPersonFlag(\\'Heather\\',3)"
			);
		}
		if (isPersonHere("MsJones") && sType === "" && !this.checkFlag(4)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask Ms. Jones about Ms. Graham and her interests, is she in a relationship. You also mention the book you saw,</p><p>' +
				(per.isCharmedBy() ? '"' + perYou.getMaster() + ' she has been very active online as an author of adult stories, we once talked about them when she asked my opinion. There were very much in the fetish lines with some mind control elements and quite well written and erotic. I have no idea about the book you saw but it sounds like something she would like or have written!"' :
				'"Why ask moi? These sort of things are not appropriate for ze students to ask of teachers"'),
				"setPersonFlag(\\'Heather\\',4)"
			);
		}
		if (isPersonHere("MrsTanika") && per.checkFlag(1) && (sType === "" || sType == "tanikaprivate") && !this.checkFlag(6)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask ' + per.getPersonName() + ' about Ms. Graham and her interests, is she in a relationship. You also mention the book you saw,</p><p>' +
				(per.isCharmedBy() ? '"' + perYou.getMaster() + ' we have not been very close, she is overly familiar with staff and students and certain husbands" You can definitely see some hostility there so do not try to probe further for now!' :
				'She looks coldly at you, "Go away or I will report you to Principal Reagan for inappropriate queries about teachers"'),
				"setPersonFlag(\\'Heather\\',6)"
			);
		}
		if (isPersonHere("MissLogan") && per.checkFlag(17) && sType === "" && !this.checkFlag(10)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask ' + per.getPersonName() + ' about Ms. Graham and her interests, is she in a relationship. You also mention the book you saw,</p><p>' +
				(per.isCharmedBy() ? 'She is such a fuckable and breedable one isn\'t she?" Unfortunately Miss Logan has little else to say about Ms. Graham' :
				'She looks amused, "You should not be asking that about your teachers, though I admire your interest, she is quite...but back to studying"'),
				"setPersonFlag(\\'Heather\\',10)"
			);
		}		
		if (isPersonHere("MrBeasley") && sType === "" && !this.checkFlag(8)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask ' + per.getPersonName() + ' about Ms. Graham and her interests, is she in a relationship. You also mention the book you saw,</p><p>' +
				(per.isCharmedBy() ? '"' + perYou.getMaster() + ' while I would like to be \'closer\' to her she has avoided me. That book sounds like a work of fiction, it is not any legitimate work of the occult.' :
				per.getHeShe(true) + ' looks coldly at you, "She has nothing useful for your assignment. look elsewhere"'),
				"setPersonFlag(\\'Heather\\',8)"
			);
		}
		if (isPersonHere("Penelope") && sType === "" && !this.checkFlag(9)) {
			per.addQuestionR(md, "ask about the librarian Ms. Graham", 
				'You ask ' + per.getPersonName() + ' about Ms. Graham and her interests, is she in a relationship. You also mention the book you saw,</p><p>' +
				'She smiles and says, "I have only met her once or twice, she seemed quite pleasant. Quite short isn\'t she?"',
				"setPersonFlag(\\'Heather\\',9)"
			);
		}		
		if (isPersonHere("MsReagan") && per.isCharmedBy() && sType === "") {
			this.addPopupLinkF(md, 5, "ask about the librarian Ms. Graham", "Ms. Graham",
				this.addPersonString("reagantalk.jpg", "height:max%", "rightpopup") +
				'You ask ' + per.getPersonName() + ' about Ms. Graham and her interests, particularly in sex. You also mention the book you saw,</p>' +
				'<p>"Oh ' + perYou.getYourNameFor() + ', she has not been very focused on her work recently. A time ago she applied to be the head librarian for the Glenvale Library, but she lost out on that. I heard a rumour it was due to the influence of John Adams trying to get his wife Tess the position, though even that did not work out either. Tess is a lovely person but hardly a skilled administrator!"</p>' +
				'<p>You ask about the book, and she continues, "It is related, she has been more and more involved in writing recently than her work, and a lot is adult in nature. I saw her with that book one day openly in the library, an erotic novel is not appropriate around students! She told me it was something she wrote, a self published collection of stories. I had to make her concentrate more on her work and told her to leave it at home."</p>' +
				'<p>You guess she did not as you saw it recently! You wonder if you could find a copy, reading it could give some insight into Ms. Graham. You doubt it will be in the town library or for sale in the stores, do you know anyone who has books on this sort of theme, or generally on domination?'
			);
		}	
		if (!this.checkFlag(12) && this.checkFlag(5) && !this.checkFlag(7) && isPersonHere("MsTitus") && (per.isCharmedBy() || per.isFreeSlave()) && sType === "") {
			per.addQuestionR(md, "ask about the book 'Hypnosis for Sex'",
				'You ask Karen about Ms. Graham\'s book and she smiles,</p><p>"I do own a copy, it is very well written and most arousing. Delightful stories of hypnotic slavery or seduction! ' +
				(Place == 228 ? '", she takes it out and places it on a side table' :
					             ', it is at my home", and she tells you where it is in a bookcase. You will easily be able to find it if you visit her home.'),
				"setPersonFlag(\\'Heather\\',7)" + (per.isFreeSlave() ? ";bChatLeft=false;" : "")
			);
		}
		if ((this.checkFlag(7) && Place == 228) || (this.checkFlag(5) && Place == 61)) {
			this.addPopupLinkF(md, 12, 'read the book "Hypnosis for Sex"', "Reading 'Hypnosis for Sex'",
				"<p><img src='UI/books/hypnobook2.jpg' style='width:30%;float:right;margin-left:5px' alt='Book'>" +
				'You pick up the book and spend a while reading it, it is a collection of well written erotic stories published under a pseudonym. They all deal with women being hypnotically controlled into being sex-toys or in a few cases seduced with the aid of hypnosis. Always they are taken hypnotically in an unrealistic way, nearer the charm spell in how it works than actual hypnosis.</p>' +
				'<p>From what you read here you think you could make Ms. Graham into your personal slut, completely willing and probably more a game but for all intents and purposes your personal hypno-slut. You just need to be able to rapidly hypnotise (or induce) her and then play to the fantasies you have read in this book and have her embrace her new role!</p><p>' +
				(perYou.checkFlag(24) ? 
					(perYou.checkFlag(25) ? 'No problems, you know Mr. Beasley\'s augmented hypnosis technique, that should be all you need!'
					 : 'You know how to hypnotise people but not how to rapidly induce them and do not think a normal hypnosis session would work...')
				 : 'At the moment though you have no idea how to hypnotise people, let alone rapidly induce them'),
				false, "WaitHere(6)"
			);
		}
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 77 && !this.checkFlag(1) && this.isHere()) {
			// Initial meeting, charmed by Davy
			this.setFlag(1);
			showPopupWindow("Heather the School Librarian",
				this.addPersonString("librarymeeting.jpg", "height:max%", "right") +
				"While arriving at the school library you see Heather, or Ms. Graham, the beloved librarian for many years. Another student once said to you how she is small but perfectly formed. Mostly referring to her quite large breasts but she is fairly short, not quite " + (isBritish() ? "150cm" : "5ft") + " tall. Catherine once said something similar but also attracted your attention to that Ms. Graham has nipple piercings and mentioned she has large tattoos</p>" +
				"<p>It is so funny that she is in fact more experienced than our principal.</p>" +
				"<p>There were rumors that she was considered to be in the line for the head of the town library due to her experience. You heard some say influence from Town Hall maybe related to John Adams ended her application.</p>" +
				"<p>After that, her attitude changed from a sweet person to a loathing old nag and she has had an obsession with acquiring occult books for the school library and there have been disputes with teachers and other staff.</p>" +
				(checkPlaceFlag("HistoryClassroom", 8) ?
				  'Ms Graham immediately shouts "I saw you return the Stears paper to the History Classroom. So you are the guy who stole it!"'
				: 'Ms. Graham notices the Stears paper in your hand. She immediately shouts "So you are the guy who stole it from the History Classroom"') +
				'.</p><p>You deny responsibility, explaining how Davy dropped it earlier. She looks befuddled, and tries to downplay the situation, "Really I will try to punish Mas...I mean that boy whenever he comes back to the library", she speaks in a defiant tone.</p>' +
				'<p>"Anyway I heard about your assignment for Mr Beasley you should check in the History Classroom". You wonder why everyone is so curious with my assignment?'
			);
			return true;
		}
		
		if (Place == 77 && !this.isCharmed() && !this.checkFlag(2) && this.isHere()) {
			// Meet again after being freed
			this.setFlag(2);
			showPopupWindow("Heather the Freed School Librarian",
				this.addPersonString("librarylater.jpg", "height:max%", "right") +
				"The library is open again and you see Ms. Graham sitting at her desk, you step over to ask if she is feeling better than when you last spoke, as in when you freed her but do not expect her to clearly remember. Before she answers you see she looks quite embarrassed and moves to cover a odd book, \"Hypnosis for Sex\" it can\'t be a school book it must be something she confiscated or maybe a personal book she was reading. She quickly covers it and answers you,</p>" +
				'<p>"Thank you I am much better, but I am not sure what it was. I am sure it is something Davy Robbins did, a practical joke or the like?" You say maybe it was just some minor illness and she is better now. You try to change the topic and ask her about the book. She looks embarrassed again,</p>' +
				'<p>"Something silly please ignore it" and will not further discuss it.</p>' +
				'<p>You wonder if <b>asking around</b> about the book or at least her interests may give some insight into getting to know her. ' + 
				"Then again you are fairly sure the charm spell will work quite effectively on her now and you can <b>ignore the book</b> completely..."
			);
			return true;
		}	
		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, clv, type, bMan, trigger, sf;
		
		if (sType == "endgame1heather") {
			// End Game - Heather
			md = WritePlaceHeader();
			this.showPerson("pregnant" + (this.isCharmedBy() ? "c" : "u") + ".jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Librarians?");
			var sf = this.isFreeSlave() ? "hypno-slut" : this.getCharmedLevel() == 4 ? 'slave' : 'lover';
			md.write(
				'<p>One day you talk to your ' + sf + ' Heather, you see her swollen pregnant belly, she must of had a meeting with Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "freeheather") {
			// Use the silver ring on her
			if (this.isCharmed()) {
				AddMana(5);
				this.unCharmThem();
			}			
			md = WritePlaceHeader();
			this.showPerson("freed.jpg");
			addPlaceTitle(md, 'Freeing Heather Graham');
			
			if (getQueryParam("by") === "Tina") md.write('<p>Tina steps back as the spell fades from Ms. Graham, looking to you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over Ms. Graham, absorbing it within moments.</p>');
			md.write(
				'<p>"Huh...where am I now?", she questions herself in a sluggish manner. "All I remember was that brat Davy wanted to buy some inappropriate books at our library" , she shouts at anger.</p>' +
				'<p>You decided to go out of the library and let her calm down...or add one more person to your kitty!</p>'
			);
			this.place = 999;
			// Questions
			startQuestions();
			addLinkToPlace(md, 'leave the library', 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 269) {
			if (sType == "heatherpool1" || sType == "heatherpool2") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool" + (sType == "heatherpool1" ? '1' : '2') + ".jpg");
				addPlaceTitle(md, "Swimming with " + this.getPersonName());
				if (this.isFreeSlave()) md.write('<p>Heather arrives dressed in a bikini looking confused or pretending to be, and you use her trigger "slutmode". Her confusion fades with her expression and she poses for your pleasure.</p>');
				else if (this.isLover()) md.write('<p>Your lover Heather arrives dressed in a bikini, and poses for your pleasure and it looks hers as well.</p>');
				else md.write('<p>Your slave Heather promptly arrives dressed in a bikini, and she poses for your pleasure.</p>');

				startQuestions();
				addLinkToPlaceC(md, this.isLover() ? 'suggest going somewhere private and intimate' : 'order her to go with you somewhere private', Place, 'type=heatherpoolsex');
				addLinkToPlaceC(md, 'say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType ==  "heatherpoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandomBG("pool-sex", perYou.isMaleSex() ? (this.isFreeSlave() ? 1 : 2) : 1);
				
				addPlaceTitle(md, "Heather at the pool");
				md.write('<p>' + this.getPersonName() + ' is quite content to fuck by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 77 || Place == 50 || Place == 51) {
			bMan = perYou.isMaleSex();
			clv = this.getCharmedLevel();
			trigger = getQueryParam("trigger");
			sf = trigger == "slutmode" ? 'hypno-slut' : 'slave';
						
			if (sType == "heatherfuck") {
				// Fuck
				md = WritePlaceHeader();
				if (Place == 77) {
					if (!perYou.isMaleSex()) this.showPersonRandom("libraryfuckg", 2);
					else this.showPersonRandomRorX("libraryfuckb", isExplicit() ? 5 : 1);
				} else if (Place == 51) this.showPersonRandomRorXBG("bedfuck", isExplicit() ? (bMan ? 4 : 2) : 1);
				else this.showPersonRandomRorXBG("homefuck", isExplicit() ? (bMan ? 4 : 2) : 1);

				if (clv == 3) {
					addPlaceTitle(md, "Making Love to Heather");
					if (perYou.isMaleSex()) md.write('<p>You mount your lover telling her how that you love her and how great she looks. You then slap her ass and start to fuck her, concentrating on both yours and her pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that you love her.</p>');
					else md.write('<p>You decide to try some tribbing with your lover.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your " + capitalize(sf));
					if (perYou.isMaleSex()) md.write('<p>You mount your ' + sf + ', and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good ' + sf + '.');
					else md.write('<p>You decide to try some tribbing with your ' + sf + '.</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to ' + this.getPersonName(), Place, 'trigger=' + trigger);
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "heatherbj") {
				// Blowjob
				md = WritePlaceHeader();
				if (Place == 77) this.showPersonRandomRorXBG("librarybj", isExplicit() ? bMan ? 3 : 1 : 1);
				else if (Place == 51) this.showPersonRandomRorXBG("bedbj", isExplicit() ? bMan ? 3 : 1 : bMan ? 1 : 2);
				else this.showPersonRandomRorXBG("homebj", isExplicit() ? bMan ? 3 : 1 : 1);
				
				if (clv == 3) {
					addPlaceTitle(md, "Your Lover "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You ask her if she would give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth.</p>');
					else md.write('<p>You ask her to lick you, and she kneels uncertain how to proceed. You sit down and give her instructions to pleasure you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm.</p>');
				} else {
					addPlaceTitle(md, "Your " + capitalize(sf) + ' ' + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You tell your ' + sf + ' to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place, 'trigger=' + trigger);
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "heatherfuckstrap") {
				// Strap-on fuck
				md = WritePlaceHeader();
				this.showPersonRandomX("strapon", 3);
				addPlaceTitle(md, "Fucking Your " + (this.isLover() ? "Lover" : "Slave") + " Heather");
				if (clv == 3) md.write('<p>You take out your strap-on and Penelope lies back ready for you to fuck her.</p>');
				else md.write('<p>You tell her that she will now fuck her with your strap-on.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place, 'trigger=' + trigger);
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "heatherboobjob") {
				// Tit fuck
				md = WritePlaceHeader();
				if (Place == 77) this.showPersonRandomRorX("libraryboobjob", isExplicit() ? 3 : 1);
				else if (Place == 51) this.showPersonRandomRorX("bedboobjob", isExplicit() ? 2 : 1);
				else this.showPersonRandomRorX("homeboobjob", isExplicit() ? 3 : 1);

				addPlaceTitle(md, "Fucking Your " + capitalize(sf) + " Heather's Tits");
				if (clv == 3) md.write('<p>You fuck your lovers tits.</p>');
				else md.write('<p>You tell your ' + sf + ' that she will now fuck her tits.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place, 'trigger=' + trigger);
				WritePlaceFooter(md);
				return true;					
			}			
			
			if (sType == "heatherrecharm") {
				// Recharm Heather
				md = WritePlaceHeader();
				this.showPerson("recharm.jpg");			
				addPlaceTitle(md, "Heather Under a Charm Spell Again");

				md.write('<p>You recite the spell "Dai chu Heather", and she cries out,</p>');

				if (this.getCharmedLevel() == 4) {
					// Lover
					this.charmThem(3);
					md.write(
						'<p>"Oh what does that means, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her as you obviously look her over "A lot hotter definitely". She smiles and replies,</p>' +
						'<p>"You\'re not bad yourself..this is really strange, it\'s not like I fall in lust or love this quickly"</p>' +
						'<p>You continue to compliment and seduce her until the spell is firmly established and Heather is your new lover.</p>'
					);
				} else {
					// Slave
					this.charmThem(4);
					md.write(
						'<p>"What your are really is just reacting to my presence and your desire to be with me and follow me,</p>' +
						'<p>You continue to assert your position of authority until the spell is firmly established and Heather is your new slave.</p>'
					);
				}

				startQuestions();	
				addLinkToPlaceC(md, 'talk more to Heather', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place != 77) return false;
		
		var perCatherine;
		
		if (sType == "catherineheatherfirst") {
			// Initial scene with Catherine and Heather
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader();
			this.showPerson("catherineheather1" + (perCatherine.isCharmedBy() ? "c" : "u") + ".jpg");
			addPlaceTitle(md, "Catherine with Heather");
			
			if (this.isFreeSlave()) {
				md.write(
					'<p>As you enter the room you see Catherine leaning over Heather and you hear her say "slutmode" and Heather immediately drops into her trance. Catherine starts to kiss Heather and you hear her whisper your name and something else you cannot make out.</p>'
				);
			} else {
				md.write(
					'<p>As you enter the room you see Catherine leaning over Heather and you hear her say something, you hear your name and the work harem. They start to kiss each other with no reservation.</p>'
				);
			}
			md.write(
				'<p>You cough in an exaggerated way and Catherine looks over and you see she has already partially stripped off her clothing and some of Heather\'s. She smiles,</p>' +
				'<p>"Hey ' + perYou.getPersonName() + ' time for a librarian, ' + (perCatherine.whereNow() == 69 ? 'nurse' : 'administrator') + ' three-way?" Straight to the point like Catherine always is!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Yes of course"', Place, 'type=catherineheather&trigger=' + trigger);
			addLinkToPlaceC(md, '"Sorry I will have to pass for now"', 70, '', 'You leave the library and they continue without you. You close the door behind you!');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "catherineheather") {
			// Threesome with Catherine and Heather
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("catherineheather", isExplicit() && perYou.isMaleSex() ? 2 : 1);
			addPlaceTitle(md, "Catherine and Heather");
			
			md.write(
				'<p>You indulge with your two large breasted \'harem girls\' in Catherine\'s terminology!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Catherine for now', Place, 'trigger=' + trigger);
			WritePlaceFooter(md);
			return true;			
		}			
		
		if (sType == "hypnotise1") {
			// Hypno-slut 1
			md = WritePlaceHeader();
			AddMana(-1);
			this.setFlag(13);
			this.showPerson("induce1.jpg");
			addPlaceTitle(md, "Heather In a Hypnotic Trance");
			
			md.write(
				'<p>You walk over to Heather and touch her shoulder and say some nonsense like pink avocados and make some exaggerated gestures. As you do you use the augmented hypnotic technique to drop her immediately into a hypnotic trance. In seconds she drowsily falls into the trance.</p>' +
				'<p>You talk to her a bit about how you are hypnotising her for sex and make references to events in her book. You see her smile and seems willing to go along with you in the trance, though you wonder how deeply she is under now.</p>' +
				'<p>You continue explaining how you are taking control of her desires and are going to turn her into a complete slut, a servant to your desires and hers. She drowsily asks,</p>' +
				'<p>"You are going to grope my boobs like you would any slut-toy?"</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'as she asks grope her boobs', Place, 'type=hypnotise2');
			WritePlaceFooter(md);
			return true;			
		}	
		if (sType == "hypnotise2") {
			// Hypno-slut 2
			md = WritePlaceHeader();
			this.showPerson("induce2.jpg");
			addPlaceTitle(md, "Heather In a Hypnotic Trance");
			
			md.write(
				'<p>You walk behind her and grope her rather large 34G cup breasts and you notice they are pierced with bar type piercings. Heather starts to moan, and you tell her you can grope her breasts whenever you want, she is your personal toy, to be used anytime you want. She moans and says,</p>' +
				'<p>"Yes, yes, but what about later, you are going to put in a post-hypnotic trigger so I cannot resist you?"</p>' +
				'<p>You are wondering how much she is under here or if she is just really into this fantasy and embracing it!</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'put in a trigger "slutmode"', Place, 'type=hypnotise3');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "hypnotise3") {
			// Hypno-slut 3
			md = WritePlaceHeader();
			if (!isItemHere(5, 50)) PlaceI(5, 50);
			this.setFlag(13);
			this.showPerson("induce3.jpg", "height:max");
			addPlaceTitle(md, "Heather Your Hypno-Slut!");
			
			md.write(
				'<p>You tell her anytime you say "slutmode" she will return immediately into her trance and be your hypnotic slut toy to use as you like.</p>' +
				'<p>She moans and says "Yes ' + perYou.getMaster() + '". As a test you end the trance and let her wake or at least pretend to wake. She looks at you smiling broadly and you tell her "slutmode". Her face goes blank and she starts to strip off her clothing and stands before you,</p>' +
				'<p>"' + perYou.getMaster() + ' your slut is ready for you!" and that is that!</p>' +
				'<p>One thing though, despite the very small amount of mana you used for the trance here you do sometimes see her eyes take on the colour you see with someone charmed. You think this is just a minor effect of Heather not an actual sign of being charmed.</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'give orders to your hypno-slut', Place, 'trigger=slutmode');
			WritePlaceFooter(md);
			return true;			
		}		
		
		if (sType == "charmlibrary1") {
			// Event: Cast Charm on Heather 1
			md = WritePlaceHeader();
			this.setFlagRange(3, 10);
			if (!isItemHere(5, 50)) PlaceI(5, 50);
			this.showPersonRandom("charmed1", 2);
			addPlaceTitle(md, "Heather Under a Charm Spell");
			
			md.write(
				'<p>You recite the spell "Dai chu Heather", and she cries out,</p>' +
				'<p>"Oh ' + perYou.getPersonName() + ' what is happening to me. What have you done to me, why am I feeling like this again...Ahh"</p>' +
				'<p>You notice her reference to <b>again</b>, some memory of Davy\'s charm spell must remain with her. You can make her a slave as Davy did'
			);
			if (perYou.checkFlag(26)) md.write(' or be a little gentler and instead make her your lover. So what do you want to do?</p>');
			else md.write('.</p>');

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, 'enslave Heather', Place, 'type=charmlibrary2', '', '', "charmPerson('Heather',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, 'seduce Heather', Place, 'type=charmlibrary2', '', '', "charmPerson('Heather',3);");
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "charmlibrary2") {
			// Event: Cast Charm on Heather 2
			md = WritePlaceHeader();
			this.showPerson("charmed2" + (this.isLover() ? "l" : "s") + ".jpg");
			addPlaceTitle(md, 'Heather Being ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>You tell her "Nothing unusual, you just find me very attractive. You do find me sexy don\' you?". She replies,</p>' +
					'<p>"Yes, I am feeling very <b>hot</b> but you are a student and we cannot..."</p>' +
					'<p>You interrupt "We will not tell anyone else. You are very sexy yourself, why not loosen your clothing a bit?"</p>' +
					'<p>Without reply so undoes some of her buttons and almost poses for you...</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'compliment her and ask for more', Place, 'type=charmlibrary3');
			} else {
				md.write(
					'<p>You tell her "You are going to serve me for life. Remove your clothing." She replies incredulously</p>' +
					'<p>"what are you talking about?". Despite her words she starts to remove more clothing, but holds back.</p>' +
					'<p>"You smile and say "Let\'s see..."</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'say "strip slave"', Place, 'type=charmlibrary3');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmlibrary3") {
			// Event: Cast Charm on Heather 3
			md = WritePlaceHeader();
			this.showPerson("charmed3" + (this.isLover() ? "l" : "s") + ".jpg");
			addPlaceTitle(md, 'Heather ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (this.isLover()) {
				md.write(
					'<p>She strips more, seductively for her new lover until she has only parts of her underwear on. She smiles and says,</p>' +
					'<p>"Not bad, would you call me a MILF" and you compliment her and say she is definitely a MILF and is beautiful and sexy. She smiles,</p>' +
					'<p>"You must tell no one about us,...". You promise and she gestures for you to approach...</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'make love to her', Place, 'type=charmlibrary4&ctype=fuck');
				addLinkToPlaceO(md, 'allow her to pleasure you', Place, 'type=charmlibrary4&ctype=bj');

			} else {
				md.write(
					'<p>Heather strips until she is wearing a little of her underwear and she exclaims as the spell fully takes control of her and shapes her thoughts,</p>' +
					'<p>"Oh my god ' + perYou.getYourNameFor() + ' you are looking so sexy today, just take me and use me! I will serve you for life and help you with any research or study you need!"</p>' +
					'<p>She continue, "Please do whatever you want to me and just let me serve you, I am your slave"</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave', Place, 'type=charmlibrary4&ctype=fuck');
				addLinkToPlaceO(md, 'have your slave orally service you', Place, 'type=charmlibrary4&ctype=bj');

			}

			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmlibrary4") {
			// Event: Cast Charm on Heather 4
			type = getQueryParam("ctype");
			md = WritePlaceHeader();
			var bMan = perYou.isMaleSex();
			this.showPerson("charmed4" + (this.isLover() ? "l" : "s") + ".jpg");

			addPlaceTitle(md, 'Heather ' + (this.isLover() ? 'Seduced' : 'Enslaved') + ' by a Charm Spell');

			if (perYou.isMaleSex()) {
				if (type == "fuck") md.write('<p>You fuck Heather</p>');
				else md.write('<p>Heather gives you a blowjob</p>');
			} else {
				if (type == "fuck") md.write('<p>You fuck Heather with your strap-on.</p>');
				else md.write('<p>Heather licks you.</p>');				
			}

			// Choices
			startQuestions();
			addLinkToPlace(md, "leave the library", 70);
			WritePlaceFooter(md);
			return true;
		}	
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		if (this.isFreeSlave()) this.showPerson("poledanceh.jpg");
		else this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, nm + "'s Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After ' + this.getHeShe() + ' collects ' + this.getHisHer() + ' tips and offers them to you, but you feel ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		if (checkPersonFlag('Jade', 8)) md.write('<p>Besides which your deal with Jade for Seraphina means this is a free dance anyway.</p>');
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + this.getHisHer() + ' dance', Place);
		WritePlaceFooter(md);
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() || this.isFreeSlave() ? "endgame1heather" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In their office
			if (Place == 77) {
				// In the library
				if (sType == "freeheather") {
					addComments('You attempt to cast the spell there still seems to be some left-over effect. It would be best to check back later, but she seems oddly affected so maybe tomorrow?');
					return "handled";
				}
				if (this.isHere()) {
					if (this.isFreeSlave()) addComments(this.addPersonFace() + 'Heather is your personal hypno-slut there is no point in charming her!');
					else if (!this.isCharmedBy() && this.isCharmed()) addComments(this.addPersonFace() + 'The spell fails, it seems someone else has already charmed ' + this.getPersonNameShort() + '.');
					else if (this.checkAnyFlags(3, 10) && !this.isCharmedBy()) {
						setCommentsNoClick(
							'<div style="margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default;">' +
							'<table><tr><td width="80%"><p>Have you decided to abandon the hypnosis idea and will just use the charm spell?</p>'
						);
						addOptionLink("comments", 'no, forget casting the spell', "dispPlace()");
						addOptionLink("comments", 'yes, let\'s just charm her', "CastCharmSpell('Heather',Place,1,'type=charmlibrary1')");
						addComments('</td><td width="20%"><img src="Images/' + this.getImg('libraryb.jpg') + '" style="width:95%;" alt="Heather"></td></tr></table>');

					} else CastCharmSpell("Heather", Place, 1, 'type=charmlibrary1', '', 'type=heatherrecharm');
					return "handled";
				}
			}
			return "";
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.isKnowPhoneNumber = function() { return this.isCharmedBy() || this.isFreeSlave(); };
		
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (!(this.isCharmedBy() || this.isFreeSlave())) return false;
		if (msg) return true;
		// Poledance
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;
		// Pool
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};
	
	per.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=heatherpool' + Math.ceil(Math.random() * 2));
			if (this.isLover()) receiveCall('','You call your lover Heather and invite her to join you at the pool, and she readily agrees.'); 
			else if (this.isFreeSlave()) receiveCall('','You call Heather and tell her the trigger word. You then order her to join you at the pool, and she immediately says she will obey and hangs up.'); 
			else receiveCall('','You call your slave Heather and order her to join you at the pool, and she immediately obeys and says she will be there as soon as she can.'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	
	per.addPersonPhoneCall = function() {
		// All messages SENT are post charm/hypno, once per day
		if (!(this.isCharmedBy() || this.isFreeSlave())) return;
		
		if (this.hoursCharmed() > 24 && !this.checkFlag(15)) {
			if (this.makeCall(true, 420)) this.setFlag(15);
		}	
		if (this.hoursCharmed() > 48 && !this.checkFlag(16)) {
			if (this.makeCall(true, 421)) this.setFlag(16);
		}	
		if (this.hoursCharmed() > 72 && !this.checkFlag(17)) {
			if (this.makeCall(true, 422)) this.setFlag(17);
		}			
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 420: 
				if (this.isFreeSlave()) return receiveSMS('HypnoSlut', 'I do not know why but I felt compelled to send this to you', "sms4.jpg");
				return receiveSMS('Heather', 'Do you like this Goth make-over ' + perYou.getYourNameFor(), "sms1.jpg");
			case 421: 
				if (this.isFreeSlave()) return receiveSMS('HypnoSlut', 'Why am I doing this', "sms5.jpg");
				return receiveSMS('Heather', 'Trying on a new bikini, do you like it?', "sms2.jpg");
			case 422:
				if (this.isFreeSlave()) return receiveSMS('HypnoSlut', 'I do not know why but I felt compelled to do this', "sms6.jpg");
				return receiveSMS('Heather', 'I have two points to make', "sms3.jpg");
		}
		return '';
	};

}
