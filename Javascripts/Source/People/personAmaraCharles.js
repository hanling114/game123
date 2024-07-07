/***********************************************
	Amara Charles

***********************************************/

/***************** Initialise ******************************************************************************/

function initialiseAmaraCharles()
{
	// Ms. Charles
	addPerson("Ms. Charles", 0, "MsCharles");
		
	per.isPersonInfo = function() { return this.other > 0; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("info" + this.getSuffix(true) + ".jpg", "height:max%", "right");
		if (this.isLover()) s += "Ms. Charles is now considers herself your lover, a cheery and insightful lover.";
		else if (this.isCharmedBy()) s += "Ms. Charles is your faithful slave, ready to serve you in any way you desire.";
		return s + "</p><p>Ms. Charles is the owner and editor of the Glenvale Herald local newspaper.";
	};
	
	per.getPersonName = function(full) {
		if (full === true) return "Ms. Amara Charles";
		return this.sCharmedBy == "You" && !this.isLover() ? "Slave Amara" : this.isLover() ? "Amara" : this.name;
	};
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "facec" : "faceu"; };

	per.getPersonAddress = function(n) { return isPlaceKnown("MsCharlesHouse") ? n ? 135 : '22 Parkview Rd, Glenvale' : n ? 0 : ''; };
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };
	
	per.getSuffix = function(si) {
		if (!this.isCharmedBy()) return "u";
		if (si === true) return "c";
		return this.isLover() ? "cl" : "cs";
	};

	per.whereNow = function() {
		if (this.place !== 0 && isShopOpen(1, -2, false)) return 367;
		return this.place;
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 367 && this.isHere() && sType === "") return this.showPerson("office1" + this.getSuffix() + ".jpg", '', '', '', '', false, "string");
		if (Place == 135 && this.isHere() && sType === "") return this.showPerson("home1" + this.getSuffix() + ".jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 367 && this.isHere() && sType === "") {
			if (!this.checkFlag(7)) md.write("<p><img src='Images/Items/lamp.jpg' style='width:15%;float:left;margin-right:5px' alt='Lamp'>");
			else md.write('<p>');
			// Newspaper her office
			if (!this.isCharmedBy()) {
				// Uncharmed
				md.write(
					'Ms. Charles is quite friendly and stands to welcome you into her office.</p>'
				);				
			} else {
				// Charmed
				if (this.isLover()) md.write('Your lover Amara greets you with a smile undoing her top in an offer of her affection.</p>');
				else md.write('Your slave greets you and immediately strips off her clothes ready to serve you in any way.</p>');
			}
		}
		if (Place == 135 && this.isHere() && sType === "") {
			// Her home
			if (!this.isCharmedBy()) {
				// Uncharmed
				md.write(
					'Ms. Charles is quite friendly but she is curious why you are here, she asks if Geraldine sent you?</p>'
				);	
				this.setFlag(4);
			} else {
				// Charmed
				if (this.isLover()) md.write('Your lover Amara greets you with a smile, she is wearing little more than lingerie, "Hello My Dearest".</p>');
				else md.write('Your slave greets you and immediately strips off her clothes ready to serve you in any way.</p>');
			}
		}		
	};

	per.showPersonChat = function(md)
	{
		if (Place == 366 && this.whereNow() == 367 && sType === "") {
			// Front office
			if ((this.checkFlag(3) && !this.isCharmedBy()) || this.isCharmedBy()) addLinkToPlace(md, "visit Ms. Charles", 367);
		}	
		if (Place == 367 && this.isHere()) {
			// Her office
			if (this.isCharmedBy() && sType === "") {
				// Charmed
				addLinkToPlaceC(md, this.isLover() ? '"How about a probing interview?"' : 'fuck your slave', Place, 'type=charlesfuck');
				addLinkToPlaceC(md, this.isLover() ? '"Maybe a verbal interview"' : 'have your slave ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=charlesbj');
				if (perYou.isMaleSex()) addLinkToPlaceC(md, (this.isLover() ? '"Let\'s get a breast of events"' : 'have your slave give you a tit-fuck') , Place, 'type=charlestf');
				if (!isPlaceKnown("MsCharlesHouse")) {
					this.addQuestionR(md, 'ask where she lives',
						'You ask ' + this.getPersonName() + ' where she lives and she tells you,</p>' +
						'<p>"My address is 22 Parkview Rd, north of the town, not far from the Gate\'s mansion"',
						"setPlaceKnown(\\'MsCharlesHouse\\')"
					);
				}
			} else {
				// Uncharmed
				if (this.checkFlag(2) && !this.checkFlag(7)) this.addLinkToPlaceF(md, 3, 'accidentally break the lamp', Place, 'type=brokelamp');
			}
			if ((checkPersonFlag("Julie", 1) || checkPersonFlag("Julie", 2)) && !this.checkFlag(6)) {
				this.addQuestionR(md, 'ask about the reporter Julie Luna',
					'You ask ' + this.getPersonName() + 'about the reporter Julie and she metions,</p>' +
					'<p>"She did visit asking about events in town and asked to access our archives. She did mention your name and Davy Robbins but gave no real details"',
					"setPersonFlag(\\'MsCharles\\',6)"
				);
			}
		}
		if (Place == 135 && this.isHere() && sType === "") {
			// Her home
			if (this.isCharmedBy()) {
				// Charmed
				addLinkToPlaceC(md, this.isLover() ? '"How about a probing interview?"' : 'fuck your slave', Place, 'type=charlesfuck');
				addLinkToPlaceC(md, this.isLover() ? '"Maybe a verbal interview"' : 'have your slave ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=charlesbj');
				if (perYou.isMaleSex()) addLinkToPlaceC(md, (this.isLover() ? '"Let\'s get a breast of events"' : 'have your slave give you a tit-fuck') , Place, 'type=charlestf');

				this.addSleepLink(md, "spend the night with " + this.getPersonName(), "Going to Bed with the Editor",
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">' +
					(this.isLover() ? 'You ask Amara if you can spend the night, she of course agrees and leads you to the bedroom...'
										 : 'You tell your slave that you will sleep here tonight. She lies down awaiting you to join her.'),
					"bed.jpg", true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
				);
			}
			if ((checkPersonFlag("Julie", 1) || checkPersonFlag("Julie", 2)) && !this.checkFlag(6)) {
				this.addQuestionR(md, 'ask about the reporter Julie Luna',
					'You ask ' + this.getPersonName() + 'about the reporter Julie and she metions,</p>' +
					'<p>"She did visit asking about events in town and asked to access our archives. She did mention your name and Davy Robbins but gave no real details"',
					"setPersonFlag(\\'MsCharles\\',6)"
				);
			}
		}
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		// Destroy the lamp when charmed at home
		if (Place == 367 && this.isHere() && !this.checkFlag(7) && this.isCharmedBy()) {
			this.setFlag(7)
			showPopupWindow("Eager " + this.getPersonName(),
				this.addPersonString("eager.jpg", "height:max%", "right") +
				"As you enter " + this.getPersonName() + "'s office she eagerly strips off her clothing and throws her bra behind her.</p>" +
				'<p>With horrible luck it hits that lamp once owned by Kurndorf breaking it into useless pieces, any magic once in it estroyed.'
			);
			return true;
		}
		
		return false;
	};		

	per.showEventOffice = function()
	{
		var md;
		
		if (sType == "firstmeeting") {
			this.place = 135;
			this.setFlag(1);
			md = WritePlaceHeader();
			this.showPerson("office1u.jpg");
			addPlaceTitle(md, "Ms. Charles");
			md.write(
				"<p><img src='Images/Items/lamp.jpg' style='width:15%;float:left;margin-right:5px' alt='Lamp'>" +
				'Ms. Charles stands to greet you as you enter her office, she has an excellent figure, large breasts and a lovely smile. She shakes your hand and says,<br><br>' +
				'<p>"Hello ' + perYou.getPersonName() + ', Geraldine has mentioned you but your name has also come up once or twice in stories I have been working on". You ask her what stories but she just invites you to sit down.</p>' +
				'<p>She gestures at an antique lamp sitting on a side table, it appears to have been adapted to have a light bulb, and she says,<p>' +
				'<p>"I have documentation that lamp was once owned by the infamous Kurndorf, it is rather fragile, it was in pieces when I purchased it. Every so often it flickers but nothing seems to be wrong with it." You look at it interested, you get a hint of something unusual about it.</p>' +
				'<p>She continues "You asked about the stories, nothing much really, just references to ' + perGates.getPersonName() + ' and you, also to your occult studies which is why I thought the lamp would interest you. Also I have heard people who despise you and others adore you, like the infamous Kurndorf!"</p>' +
				'<p>You are unsure if she is being playful or trying to get you to reveal something, maybe both.</p>' +
				'<p>You avoid saying much just commenting on your interest in the occult and the Kurndorf Cult. She smiles and in one last comment says "You know Geraldine was one person who despised you when she asked for some time off, but now seems to adore you!"</p>'
			);

			startQuestions();
			addLinkToPlace(md, "return to the front office", 366);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "brokelamp") {
			this.setFlag(7);
			md = WritePlaceHeader();
			this.showPerson("brokelamp.jpg");
			addPlaceTitle(md, "Ms. Charles");
			md.write(
				'You step over to look at the lamp and \'accidentally\' knock it off the table. Ms. Charles yells at you angrily for your clumsiness.</p>' +
				'<p>She calms down a little and still smiling but a little strained as she says she has work to do, and asks you to leave her office.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "return to the front office", 366);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmofficecharles1") {
			// Event: Charm Ms. Charles 1 (Slave)
			md = WritePlaceHeader();
			this.showPerson("officecharm1.jpg");
			addPlaceTitle(md, "Ms. Charles Under A Spell");
			md.write(
				'<p>As the spell takes hold of Ms. Charles she struggles with the spell, her annoyance of you breaking the lamp is still there and affecting the process. You realise there is no option but to dominate her into a slave.</p>' +
				'<p>She again asks for you to leave the office, she needs to be alone, but you ask her why, is it she is filled with desire and the need to submit?</p>' +
				'<p>She denies it but you can see the spell affecting her and shaping her will and desires.</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, "increase Ms. Charles\'s arousal", Place, 'type=charmofficecharles2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmofficecharles2") {
			// Event: Charm Ms. Charles 2 (Slave)
			md = WritePlaceHeader();
			this.showPerson("officecharm2.jpg");

			addPlaceTitle(md, "Ms. Charles Submitting To A Spell");
			md.write(
				'<p>You tell the entranced woman, "You are feeling very sexually aroused, Ms. Charles. You are feeling so sexy that you want to take your clothes off"</p>' +
				'<p>Ms. Charles denies your statement but starts to take off her jacket despite her words. You tell her to embrace her desires and submit to her feelings.</p>'
			);
			startQuestions();
			addLinkToPlace(md, '"and submit to you"', Place, 'type=charmofficecharles3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmofficecharles3") {
			// Event: Charm Ms. Charles 3 (Slave)
			md = WritePlaceHeader();
			this.showPerson("officecharm3.jpg");
			addPlaceTitle(md, "Ms. Charles Being Enslaves A Spell");
			md.write(
				'<p>Ms. Charles\'s denials disappear and she moans as she removes her top exposing her large breasts. A whimper escapes her lips,</p>' +
				'<p>"Oh ' + perYou.getPersonName() + ', is this what I heard about you, what you did to Geraldine..." Ms. Charles whispers. "I don\'t care it feels so wonderful..."</p>' +
				'<p>As Ms. Charles whispers this you tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"It is wonderful to be my slave"', Place, 'type=charmofficecharles4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmofficecharles4") {
			// Event: Charm Ms. Charles 4 (Slave)
			md = WritePlaceHeader();
			this.showPerson("officecharm4.jpg");
			addPlaceTitle(md, "Ms. Charles Enslaved A Spell");
			md.write(
				'<p>You tell her that and Ms. Charles\'s arousal rises to a new level. She gasps and says "Wonderful to submit, to be your slave"</p>' +
				'<p>The spell has dominated her but as a last thing she asks "Is this what Kurndorf did?" You ponder what to say and just tell her "Not the same but similar, my slaves matter to me. Kurndorf did not care"</p>' +
				'<p>As you look at her you wonder if you told the truth.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to your new slave", Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charlesbj") {
			// Oral in Ms. Charles's home
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("office-bj");

			addPlaceTitle(md, this.getPersonName() + "\'s Soft Lips");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Sometimes, words are not needed. Ms. Charles stands in front of you at the ready, and as you open your pants and gesture to the ground before you, your ever faithful slave immediately understands and crouches down.</p>' +
					'<p>Ms. Charles\'s tongue begins to slide eagerly over your manhood, covering you in her saliva and using her hand to get you erect, and doing a good job at it. You place one hand on your hip and drive the other through her hair, watching her as her lips wrap over the tip and begin to slide back and forth, enjoying your slaves administration.</p>' +
					'<p>“You practiced, did you?” You ask her, and the response is a muffled grunt of confirmation before she takes you in all the way to the base as if to show of the results of it. You definitely approve.</p>' +
					'<p>It doesn\'t take her long to bring you close to the edge and when the moment comes, you take a hold of her hair to keep her in place and shoot your load into her mouth.</p>' +
					'<p>Ms. Charles waits patiently, swallowing every drop as ordered and eagerly cleaning when might be left with her tongue after you let go of her.</p>'
				);
			} else {
				md.write(
					'<p>You grab Ms. Charles\'s hair and pull the woman into a kiss as a greeting before simply sitting down on her chair and ordering her to knee in front of you.</p>' +
					'<p>Ms. Charles is taken aback by your directness at first, nervously fidgeting with her fingers before quickly following up on your order and helping to undress you.</p>' +
					'<p>You smile as you wait for her to finish and lazily lean back, one of your legs now resting on her desk to present your sex to her. “You know what to do, my pet.”</p>' +
					'<p>“Y...yes Mistress.” Ms. Charles clearly isn\'t used to such a treatment, and it does take her a moment to “find her flow” so to say, but with a few subtle pointers from you, she begins to lure the first subtle moans from your lips.</p>' +
					'<p>You praise her advances and she seems to grow more confident, her tongue now flicking over your clit before she sucks it inside with her lips and decides to use her fingers to help out.</p>' +
					'<p>Soon, her efforts bear fruit, you feel your body tremble a little as your climax begins to build up and firmly take a hold of Ms. Charles\'s hair and press her closer against your twitching fold as you finally reach your peak. Once again praising your eager pets success.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charlesfuck") {
			// Fuck/strapon in Ms. Charless room
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("office-fuckb");
			else this.showPersonRandom("office-fuckg");

			addPlaceTitle(md, "Take " + this.getPersonName());

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
					'<p>There is a moment of hesitation in which Ms. Charles seems to process what you just said and a profound blush appears on her cheeks.</p>' +
					'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, ' + perYou.getMaster() + ', I did not mean to make you wait!”</p>' +
					'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Ms. Charles eagerly complies.</p>' +
					'<p>Ms. Charles is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
					'<p>“Lovely show, my pet.” You comment her and slip on the bed, aligning your cock with her folds. “Is your pussy ready for me?”</p>' +
					'<p>“Y....yes ' + perYou.getMaster() + '.” Ms. Charles nods quickly and bites her lower lips, watching you expectantly.</p>' +
					'<p>“Good girl.” You push into her without further delay and begin to grind your hip against her body, your motions quickly picking up in pace.</p>' +
					'<p>“Ohhh, Thank... thank you, ' + perYou.getMaster() + '.” Ms. Charles rolls her head back and just lets you take her, her lovely breasts jiggling with every rough motion you make and her fingers feverishly rubbing over her clit to stimulate her further.</p>' +
					'<p>It doesn\'t take long for both of you to reach your climax, and as you do, you place one of her legs against her shoulder and lean forward, embedding your cock as deeply into her as you can as you shoot of your load while her body twitches underneath you.</p>'
				);

			} else {
				md.write(
					'<p>“Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
					'<p>There is a moment of hesitation in which Ms. Charles seems to process what you just said and a profound blush appears on her cheeks.</p>' +
					'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, Mistress, I did not mean to make you wait!”</p>' +
					'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Ms. Charles eagerly complies.</p>' +
					'<p>Ms. Charles is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
					'<p>You use the time to undress and prepare your trusty strap on, making sure Ms. Charles has a good view as you fasten the straps and spread a bit of lube around it.</p>' +
					'<p>“You know what happens next, do you?” You ask in a teasing voice, and Ms. Charles quickly nods. “Yes Mistress”.</p>' +
					'<p>“Turn around!”</p>' +
					'<p>Your pet immediately complies and presents her rear to you, her legs slightly spread and her body shaking in anticipation as you move behind her and begin to rub the tip of the strap-on over her clit and folds and finally push all the way into her with a single, rough motion.</p>' +
					'<p>Ms. Charles reacts beautifully, Her body jerks forward, but she immediately catches herself and pushes her hip against yours while you begin to move, her fingers digging into sheets with every rough motion.</p>' +
					'<p>“Hmmyesyesyes... thank you mistress.” Ms. Charles groans, screams, and occasionally gives a little yelp when you slap her rear or pull her hair, enjoying every little bit of stimulation and quickly reaching her peak, her entire body shuddering under the sensation and finally collapsing on the bed, gasping for air.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charlestf") {
			// Fuck/strapon in Ms. Charless room
			md = WritePlaceHeader();
			this.showPersonRandomRorX("office-tf");

			addPlaceTitle(md, this.getPersonName() + "\'s Tits");

			md.write(
				'<p>You fuck ' + this.getPersonName() + '\'s tits.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}
	
		return false;
	};
	
	per.showEventHome = function()
	{
		var md;
		
		if (sType == "charmhomecharles1") {
			// Event: Charm Ms. Charles 1
			md = WritePlaceHeader();
			this.showPerson("homecharm1.jpg");
			addPlaceTitle(md, "Ms. Charles Under A Spell");
			md.write(
				'<p>As the spell takes hold of Ms. Charles she struggles with the spell, her unexpected arousal is confusing her.</p>' +
				'<p>She asks for you to leave the office, she needs to be alone, but you ask her why, is something affecting her?</p>' +
				'<p>She denies it but you can see the spell affecting her and shaping her will and desires.</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, "increase Ms. Charles\'s arousal and submission", Place, 'type=charmhomecharles2slave');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, '"Let me help you"', Place, 'type=charmhomecharles2lover', '', '', "charmPerson('MsCharles',3);");
				endAlternatives();
			}			
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmhomecharles2slave") {
			// Event: Charm Ms. Charles 2 (Slave)
			md = WritePlaceHeader();
			this.showPerson("homecharm2.jpg");

			addPlaceTitle(md, "Ms. Charles Submitting To A Spell");
			md.write(
				'<p>You tell the entranced woman, "You are feeling very sexually aroused, Ms. Charles. You are feeling so sexy that you want to take your clothes off"</p>' +
				'<p>Ms. Charles denies your statement but starts to take off her jacket despite her words. You tell her to embrace her desires and submit to her feelings.</p>'
			);
			startQuestions();
			addLinkToPlaceO(md, '"and submit to you"', Place, 'type=charmhomecharles3slave');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmhomecharles3slave") {
			// Event: Charm Ms. Charles 3 (Slave)
			md = WritePlaceHeader();
			this.showPerson("homecharm3.jpg");
			addPlaceTitle(md, "Ms. Charles Being Enslaved A Spell");
			md.write(
				'<p>Ms. Charles\'s denials disappear and she moans as she removes her top exposing her large breasts. A whimper escapes her lips,</p>' +
				'<p>"Oh ' + perYou.getPersonName() + ', is this what I heard about you, what you did to Geraldine..." Ms. Charles whispers. "I don\'t care it feels so wonderful..."</p>' +
				'<p>As Ms. Charles whispers this you tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, '"It is wonderful to be my slave"', Place, 'type=charmhomecharles4slave');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmhomecharles4slave") {
			// Event: Charm Ms. Charles 4 (Slave)
			md = WritePlaceHeader();
			this.showPerson("homecharm4.jpg");
			addPlaceTitle(md, "Ms. Charles Enslaved A Spell");
			md.write(
				'<p>You tell her that and Ms. Charles\'s arousal rises to a new level. She gasps and says "Wonderful to submit, to be your slave"</p>' +
				'<p>The spell has dominated her but as a last thing she asks "Is this what Kurndorf did?" You ponder what to say and just tell her "No the same but similar, my slaves matter to me. Kurndorf did not care"</p>' +
				'<p>As you look at her you wonder if you told the truth.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to your new slave", Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmhomecharles2lover") {
			// Event: Charm Ms. Charles 2 (Lover)
			md = WritePlaceHeader();
			this.showPerson("homecharm2.jpg");

			addPlaceTitle(md, "Ms. Charles Being Seduced By A Spell");
			md.write(
				'<p>You ask the entranced woman, "Are you feeling aroused, I think the lamp might of affected you and it is just now taking effect."</p>' +
				'<p>Ms. Charles reluctantly agrees she is feeling <b>hot</b> but how could it be the lamp. You explain you understand a lot of the magics Kurndorf used and you will try to help her.</p>'
			);
			startQuestions();
			addLinkToPlaceO(md, 'help her to realise her feelings', Place, 'type=charmhomecharles3lover');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmhomecharles3lover") {
			// Event: Charm Ms. Charles 3 (Lover)
			md = WritePlaceHeader();
			this.showPerson("homecharm3.jpg");
			addPlaceTitle(md, "Ms. Charles Being Seduced By A Spell");
			md.write(
				'<p>You tell her to think about her feelings and how this just started when you met. You do not think really the lamp will permanently affect her, well maybe a little bit of stimulation. Really it is making her feelings and attractions clear.</p>' +
				'<p>She asks what you mean, she has barely met you but heard quite a lot...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"That is enough to be attracted to me"', Place, 'type=charmhomecharles4lover');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmhomecharles4lover") {
			// Event: Charm Ms. Charles 4 (Lover)
			md = WritePlaceHeader();
			this.showPerson("homecharm4" + (this.isLover() ? "l" : "s") + ".jpg");
			addPlaceTitle(md, "Ms. Charles Seduced By A Spell");
			md.write(
				'<p>You tell her that she has developed an attraction, almost an obsession with you, and she seems to agree. She does seem fascinated and you tell her she is a beautiful woman.</p>' +
				'<p>You talk more of your attraction for her and her fascination for you and build this until you are sure the spell is shaping her into a devoted lover. It may take a little while but it will end that way.</p>' +
				'<p>With the spell you have seduced her but as a last thing she asks "Call me Amara...is this sort of things what Kurndorf did?" You ponder what to say and just tell her "No, he enslaved people"</p>' +
				'<p>As you look at her you wonder if you told the truth.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to your new lover", Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharm1") {
			// Re-charm Ms. Charles (Lover/Slave)
			md = WritePlaceHeader();
			this.showPerson("home3.jpg");
			addPlaceTitle(md, "Ms. Charles Under A Charm Spell - Again");
			md.write(
				'<p>As the spell takes hold of Ms. Charles again she struggles with the spell, her unexpected arousal is confusing her.</p>' +
				'<p>She asks for you to leave the office, she needs to be alone, but you ask her why, is something affecting her?</p>' +
				'<p>She denies it but you can see the spell affecting her and shaping her will and desires.</p>'
			);
			if (this.isLover()) {
				md.write(
					'<p>You tell the entranced woman, "You are feeling very sexually aroused, Ms. Charles. You are feeling so sexy that you want to take your clothes off"</p>' +
					'<p>Ms. Charles denies your statement but starts to take off her top despite her words. You tell her to embrace her desires and submit to her feelings and to you!</p>'
				);
				this.charmThem(4);
			} else {
				md.write(
					'<p>You tell her to think about her feelings and how this just started when you met. Really it is just her feelings and attractions are becoming clear.</p>' +
					'<p>She asks what you mean, and you talk about mutual attraction and desire...</p>'
				);
				this.charmThem(3);
			}
			
			startQuestions();
			addLinkToPlaceO(md, (this.isLover() ? "talk to your new lover" : "give your new slave an order"), Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charlesbj") {
			// Oral in Ms. Charles's home
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("home-bj");

			addPlaceTitle(md, this.getPersonName() + "\'s Soft Lips");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Sometimes, words are not needed. Ms. Charles stands in front of you at the ready, and as you open your pants and gesture to the ground before you, your ever faithful slave immediately understands and crouches down.</p>' +
					'<p>Ms. Charles\'s tongue begins to slide eagerly over your manhood, covering you in her saliva and using her hand to get you erect, and doing a good job at it. You place one hand on your hip and drive the other through her hair, watching her as her lips wrap over the tip and begin to slide back and forth, enjoying your slaves administration.</p>' +
					'<p>“You practiced, did you?” You ask her, and the response is a muffled grunt of confirmation before she takes you in all the way to the base as if to show of the results of it. You definitely approve.</p>' +
					'<p>It doesn\'t take her long to bring you close to the edge and when the moment comes, you take a hold of her hair to keep her in place and shoot your load into her mouth.</p>' +
					'<p>Ms. Charles waits patiently, swallowing every drop as ordered and eagerly cleaning when might be left with her tongue after you let go of her.</p>'
				);
			} else {
				md.write(
					'<p>You grab Ms. Charles\'s hair and pull the woman into a kiss as a greeting before simply sitting down on her chair and ordering her to knee in front of you.</p>' +
					'<p>Ms. Charles is taken aback by your directness at first, nervously fidgeting with her fingers before quickly following up on your order and helping to undress you.</p>' +
					'<p>You smile as you wait for her to finish and lazily lean back, one of your legs now resting on her desk to present your sex to her. “You know what to do, my pet.”</p>' +
					'<p>“Y...yes Mistress.” Ms. Charles clearly isn\'t used to such a treatment, and it does take her a moment to “find her flow” so to say, but with a few subtle pointers from you, she begins to lure the first subtle moans from your lips.</p>' +
					'<p>You praise her advances and she seems to grow more confident, her tongue now flicking over your clit before she sucks it inside with her lips and decides to use her fingers to help out.</p>' +
					'<p>Soon, her efforts bear fruit, you feel your body tremble a little as your climax begins to build up and firmly take a hold of Ms. Charles\'s hair and press her closer against your twitching fold as you finally reach your peak. Once again praising your eager pets success.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charlesfuck") {
			// Fuck/strapon in Ms. Charless room
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("home-fuckb");
			else this.showPersonRandom("home-fuckg");

			addPlaceTitle(md, "Take " + this.getPersonName());

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
					'<p>There is a moment of hesitation in which Ms. Charles seems to process what you just said and a profound blush appears on her cheeks.</p>' +
					'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, ' + perYou.getMaster() + ', I did not mean to make you wait!”</p>' +
					'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Ms. Charles eagerly complies.</p>' +
					'<p>Ms. Charles is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
					'<p>“Lovely show, my pet.” You comment her and slip on the bed, aligning your cock with her folds. “Is your pussy ready for me?”</p>' +
					'<p>“Y....yes ' + perYou.getMaster() + '.” Ms. Charles nods quickly and bites her lower lips, watching you expectantly.</p>' +
					'<p>“Good girl.” You push into her without further delay and begin to grind your hip against her body, your motions quickly picking up in pace.</p>' +
					'<p>“Ohhh, Thank... thank you, ' + perYou.getMaster() + '.” Ms. Charles rolls her head back and just lets you take her, her lovely breasts jiggling with every rough motion you make and her fingers feverishly rubbing over her clit to stimulate her further.</p>' +
					'<p>It doesn\'t take long for both of you to reach your climax, and as you do, you place one of her legs against her shoulder and lean forward, embedding your cock as deeply into her as you can as you shoot of your load while her body twitches underneath you.</p>'
				);

			} else {
				md.write(
					'<p>“Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
					'<p>There is a moment of hesitation in which Ms. Charles seems to process what you just said and a profound blush appears on her cheeks.</p>' +
					'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, Mistress, I did not mean to make you wait!”</p>' +
					'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Ms. Charles eagerly complies.</p>' +
					'<p>Ms. Charles is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
					'<p>You use the time to undress and prepare your trusty strap on, making sure Ms. Charles has a good view as you fasten the straps and spread a bit of lube around it.</p>' +
					'<p>“You know what happens next, do you?” You ask in a teasing voice, and Ms. Charles quickly nods. “Yes Mistress”.</p>' +
					'<p>“Turn around!”</p>' +
					'<p>Your pet immediately complies and presents her rear to you, her legs slightly spread and her body shaking in anticipation as you move behind her and begin to rub the tip of the strap-on over her clit and folds and finally push all the way into her with a single, rough motion.</p>' +
					'<p>Ms. Charles reacts beautifully, Her body jerks forward, but she immediately catches herself and pushes her hip against yours while you begin to move, her fingers digging into sheets with every rough motion.</p>' +
					'<p>“Hmmyesyesyes... thank you mistress.” Ms. Charles groans, screams, and occasionally gives a little yelp when you slap her rear or pull her hair, enjoying every little bit of stimulation and quickly reaching her peak, her entire body shuddering under the sensation and finally collapsing on the bed, gasping for air.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charlestf") {
			// Fuck/strapon in Ms. Charless room
			md = WritePlaceHeader();
			this.showPersonRandomRorX("home-tf");

			addPlaceTitle(md, this.getPersonName() + "'s Tits");

			md.write(
				'<p>You fuck ' + this.getPersonName() + '\'s tits.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to " + this.getPersonName(), Place);
			WritePlaceFooter(md);
			return true;
		}		
			
		return false;
	};	
		
	per.showEvent = function()
	{
		if (Place == 367) return this.showEventOffice();
		if (Place == 135) return this.showEventHome();
		
		var md;
		
		if (Place == 269) {
			if (sType == "charlespool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPersonRandomDN("pool", isDay() ? 3 : 1);
				addPlaceTitle(md, "Swimming with " + this.getPersonName());
				md.write(
					'<p>Ms. Charles steps out of the changing room dressed in a sexy bikini, looking a bit more confident than usual. Unfortunately spoiled a little when she starts as she glances over at a noise, it was just someone diving into the pool.</p>' +
					'<p>You encourage her to join you for a swim, but you canny help but admire her figure and that areas here are quite discrete and private...</p>'
				);
				
				startQuestions();
				ddLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=charlespoolsex');
				addLinkToPlaceC(md, 'chat to her and then say goodbye to Ms. Charles', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charlespoolsex") {
				md = WritePlaceHeader();
				if (!isExplicit() || !perYou.isMaleSex()) this.showPersonRandomDN("pool-sex", isDay() ? 3 : 1);
				else this.showPersonRandomXDN("pool-sex", isDay() ? 7 : 5);
				addPlaceTitle(md, "Being Discrete and Private with " + this.getPersonName());
				md.write(
					'<p>You ask your nervous librarian to play with you more privately, and she seductively removes most of her bikini, ready for you!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Ms. Charles', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
						
		if (sType == "endgame1amara") {
			// End Game - Ms. Charles
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Editors?");

			md.write(
				'<p>One day when you visit Amara at her home you see she is completely naked and you see a large swollen, clearly pregnant belly. She must of been studying with Miss Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);			
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1amara" : "";
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (Place == 367 && this.isHere()) {
				// Ms. Charles - her office
				if (this.isCharmedBy()) addComments(this.addPersonFace() + 'You have already <i>Charmed</i> Ms. Charles. If you wish to change this try somewhere more personal for her.');
				else if (!this.checkFlag(2)) {
					this.setFlag(2);
					addComments(
						this.addPersonFace() + "Strange, as you cast the spell the lamp Ms. Charles mentioned flickered, but nothing happened, Ms. Charles did not react, nothing. The spell failed completely.</p>" +
						'<p>Ms. Charles says, "Odd isn\'t it, that lamp does that now and then, but the electrician says there is nothing wrong with it!"'
					);
					return "refresh";
				} else if (!this.checkFlag(3)) addComments("It seems pointless to try this again, your guess is the lamp somehow interferred!");
				else CastCharmSpell("Ms. Charles", Place, 4, 'type=charmofficecharles1');
				return "handled";		// Ignore any standard action otherwise
				
			} else if (Place == 135) {
				// Ms. Charles - at her home
				if (this.checkFlag(3) && this.isCharmedBy()) addComments("You do not think the spell will work again on her, the initial annoyance she had has locked her to be a slave <b>only</b>");
				else CastCharmSpell("Ms. Charles", Place, 4, 'type=charmhomecharles1', '', 'type=recharm1');
				return "handled";		// Ignore any standard action otherwise
			}
		}
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {
			if (Place == 367 && !this.checkFlag(3)) {
				addComments("<img src='Images/Items/lamp.jpg' style='width:15%;float:left;margin-right:5px;margin-bottom:1em' alt='Lamp'>You feel there is weak magic in the lamp, something that absorbs magic used near it, but it is barely working. Still you would like to study the lamp and figure out how it works!");
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls

	per.callThem = function() {
		if (Place == 269) {
			if (this.whereNow() == 367) WriteComments("You call " + this.getPersonName() + " to invite her to join you at the pool for a swim, but she answers that she is working on the new edition of the paper, but can join you after the office closes, but once it closes");
			else {
				gotoPlace(Place, 'type=charlespool');
				receiveCall('', 'You call ' + this.getPersonName() + ' to invite her to join you at the pool for a swim, and she answers, "I\'ll be there soon".');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function() {
		// Only if she is charmed (any way) and you are not there
		if (!this.isCharmedBy() || this.isHere()) return false;
		
		if (!this.checkFlag(21) && isEvening() && this.hoursCharmed() > 96) {
			if (this.makeCall(true, 431)) this.setFlag(21);
		}	
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 431) return receiveSMS('AmaraCharmes', 'Like?', 'sms1.jpg');
		return '';
	};
}
