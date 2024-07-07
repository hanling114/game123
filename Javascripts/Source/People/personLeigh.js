/************************
Leigh Parker, Bank Teller
*************************/

/***************** Initialise ******************************************************************************/

function initialiseLeigh()
{
	// Leigh
	addPerson("Leigh", 0, "Ellie", "");
	
	per.getPersonName = function(full) {
		if (full === true) return "Leigh Parker";
		if (this.isCharmedBy("You")) {
			if (this.getCharmedLevel() == 4) return "Slave Leigh";
			return "Leigh, your lover";
		}
		// If NOT Charmed
		return "Leigh";
	};

	per.getPersonAddress = function(n) { return this.checkFlag(2) ? n ? 425 : '12 Dervish Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? 'ellie-facec' : 'ellie-faceu'; };	
	
	per.whereNow = function() {
		if (this.place == 0) return 0;
		if (Place == 226 && sType.indexOf("leighbreak") != -1) return Place;
		if (isBankOpen()) return this.checkFlag(12) ? 223 : 225;
		if (this.checkFlag(4)) return isDay() ? 423 : 425;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.checkFlag(3) && this.place == 0 && getDay(true) == "Mon") this.place = 225;
		if (this.isCharmedBy("You") && isBankOpen(true)) {
			if (this.isHere()) {
				return this.addPersonFace() + "In the morning Leigh gives you a kiss and tells you she has to leave for her job at the Bank.</p>";
			}
		}
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 423 && this.isHere() && sType === "") {
			// The Pool
			if (this.isCharmedBy()) return this.showPerson("ellie25.jpg", '', '', '', '', false, "string");
			return this.showPerson("ellie22.jpg", '', '', '', '', false, "string");
		}
		if (Place == 425 && this.isHere() && sType === "") {
			// Spare room
			if (sWho == "carol") return findPerson("Carol").showPeople(this, "carolellie1a.jpg", '', '', '', '', false, "string");
			else if (this.isCharmedBy()) return this.showPerson("ellie9.jpg", '', '', '', '', false, "string");
			return this.showPerson("ellie3a.jpg", '', '', '', '', false, "string");
		}	
		if (Place == 223 && this.checkFlag(12) && this.isHere() && sType == "") return this.showPerson("loanoffice1.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 423 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				// Charmed at the pool
				if (this.getCharmedLevel() == 4) md.write("<p>Your slave Leigh was sunning herself on a lounge by the pool. She immediately gets up and smiles and says \"What can your slave do for you " + perYou.getMaster() + "?\"</p>");
				else md.write("<p>Your lover Leigh was sunning herself on a lounge by the pool. She immediately gets up and smiles and says \"Hey there darling, here for a swim or some other fun?\"</p>");

			} else {
				// Uncharmed at the pool
				md.write(
					'<p>You see Leigh was lying on a sun lounge and she waves when she sees you and gets up, and dives into the pool.She is quite athletic but you wonder if she dived in to avoid you?</p>'
				);
			}
		} else if (Place == 425 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				// Charmed in the spare room
				if (this.getCharmedLevel() == 4) md.write("<p>Your slave Leigh was sitting by herself looking at something on her phone. She immediately turns it off and starts to remove her clothes and says \"Did you want your slave now " + perYou.getMaster() + "?\"</p>");
				else md.write("<p>Your lover Leigh was sitting and watching something on her phone, she laughs and offers to share the funny video with you. Funny internet videos have never been your thing, so you politely say sometime later. She puts her phone away and asks \"Well then darling, shall we do something else fun?\"</p>");
				
			} else {
				// Uncharmed in the space room
				md.write(
					'<p>You see Leigh was watching something on her phone and smiling. She looks up at you still smiling but you think she would prefer to return to whatever she was watching than talk to you.</p>'
				);
			}			
		} else if (Place == 425 && !this.isHere() && this.checkFlag(2) && sType === "") {
			// Spare room and she is not here
			md.write(
				'<p>The spare room is a nice but with the \'empty\' feel of these sort of rooms. Some of Leigh\'s things are piled in one corner, she does not seem a \'neat freak\' which is fine by you.</p>'
			);			
		} else if (Place == 223 && this.checkFlag(12) && this.isHere() && sType == "") {
			md.write(
				'<p>You see Leigh is working at her desk, a cup of tea on the desk that she has a sip from as you enter.</p>' +
				'<p>She looks brightly at you and asks what she can do for you?</p>'
			);
		}
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		if (Place == 225 && this.place != 0) {
			if (!this.checkFlag(1)) {
				// Show Leigh's introduction if not shown before
				this.setFlag(1);
				showPopupWindow("That must be Leigh?",
					this.addPersonString("ellie1a.jpg", "height:max%", "right") +
					"You see a new bank teller working at a counter, this must be Leigh who Ellie mentioned?</p>" +
					"<p>She is rather cute and you would certainly like to get..to know..her!"
				);
				return true;
			}
		}
		
		if (Place == 420 && (this.whereNow() == 423 || this.whereNow() == 425) && !this.checkFlag(2)) {
			// First meeting at Ellie's home
			this.setFlag(1);
			this.setFlag(2);
			setPlaceKnown("BartelsSpareRoom", false);
			showPopupWindow("Introduced to Leigh",
				this.addPersonString(this.whereNow() == 423 ? "poolmeet.jpg" : "ellie3b.jpg", "height:max%", "right") +
				(this.whereNow() == 423 ? "You are greeted by Ellie and she takes you through to their swimming pool, you see Leigh is there relaxing. She stands as Ellie introduces you to her as a good friend of the family. Leigh smiles,</p>" +
												  '<p>"It\'s nice to meet you!" but seems otherwise disinterested and turns to Ellie "Nice pool here, I can work on my tan and get some exercise in the afternoon or weekends". You leave with Ellie and she points out the spare room Leigh is using and tends to spend most of her time there or in the pool.' 
												: "You are greeted by Ellie and she takes you through to a bedroom you have not seen before, you guess it is the spare room she had mentioned. Ellie introduces you as a good friend of the family. Leigh smiles,<p>" +
												  '"Nice to meet you!" but she seems otherwise disinterested. You leave with Ellie and she mentions Leigh spends a lot of time in her room or out in the pool here in the backyard.')
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (sType == "endgame1leigh") {
			// End Game - Leigh
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Bank Tellers?");

			md.write(
				'<p>One day when you visit Leigh and you see she must of been talking to Miss Logan.</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
				
		if (Place == 425) {
			
			var perCarol = findPerson("Carol");
			
			if (sType == "leighfuck" || sType == "leighbj") {
				md = WritePlaceHeader();
				var bCarolCharmed = perCarol.isCharmedBy();	
				var herName = this.getPersonName();
				if (sType == "leighfuck") {
					// Fuck her
					if (!perYou.isMaleSex()) this.showPerson("bjga.jpg");
					else if (isExplicit()) this.showPersonRandomX("ellie30", 3);
					else this.showPersonRandom("ellie30", 2);

					addPlaceTitle(md, herName);

					md.write(
						'<p>You fuck ' + herName + '</p>' +
						'<p></p>'
					);

				} 
				if (sType == "leighbj") {
					// Blowjob/Lick
					if (perYou.isMaleSex()) this.showPersonRorX("bjba.jpg");
					else this.showPersonRorX("bjga.jpg");

					addPlaceTitle(md, herName);

					if (perYou.isMaleSex()) md.write('<p>' + herName + ' gives you a blowjob</p>');
					else md.write('<p>' + herName + ' licks you</p>');
			
				}
				startQuestions();
				if (sWho == "carol") addLinkToPlaceO(md, 'talk more to Leigh and Carol', Place, 'who=carol');
				else addLinkToPlaceO(md, 'talk more to Leigh', Place);
				if (bCarolCharmed) addLinkToPlaceO(md, "talk more with Carol and Ellie", 420);
				else addLinkToPlaceO(md, "talk more with Carol", 420);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "leighcarolthreesome") {
				if (isExplicit()) {
					var id3 = Math.random() < 0.33;
					md = WritePlaceHeader();
					if (perYou.isMaleSex()) {
						if (id3) perCarol.showPeopleX(this, "carolellie3bc.jpg");
						else perCarol.showPeopleRandomX(this, "carolellie3b", 2);
					} else perCarol.showPersonRandomX("carolellie3g", 3);
				} else {
					md = WritePlaceHeader();
					if (perYou.isMaleSex()) perCarol.showPeopleRandom(this, "carolellie3b", 2);
					else perCarol.showPeopleRandom(this, "carolellie3g", 2);
				}
				addPlaceTitle(md, "Playing together with Leigh and Carol\'s");
				md.write(
					'<p>You play with Leigh and Carol.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'let them continue as you watch', Place, 'type=leighcarollesbian&who=carol');
				addLinkToPlaceO(md, 'talk more to Leigh and Carol', Place, 'who=carol');
				addLinkToPlaceO(md, "talk more with Carol and Ellie", 420);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "leighcarollesbian") {
				md = WritePlaceHeader();
				perCarol.showPeopleRandom(this, "carolellie2", 5);
				addPlaceTitle(md, "Leigh and Carol");
				md.write(
					'<p>You tell Leigh and Carol to get closer to each other, and play together. They embrace each other with enthusiasm.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'let us play together', Place, 'type=leighcarolthreesome&who=carol');
				addLinkToPlaceO(md, 'talk more to Leigh and Carol', Place, 'who=carol');
				addLinkToPlaceO(md, "talk more with Carol and Ellie", 420);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;			
			} 

		}
		
		if (Place == 223) {
			if (sType === "leighloanfuck") {
				// At the bank loan office
				md = WritePlaceHeader();
				this.showPerson("loanoffice-sexa.jpg");
				addPlaceTitle(md, "Leigh\'s Office");

				md.write(
					'<p>Leigh starts to remove her clothing making you an offer, but not for a loan</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlace(md, 'leave her office', 225);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place == 423 || Place == 269) {
			
			if (sType == "leighpool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Leigh");
				md.write(
					'<p>Leigh quicky changes and joins you wearing a cute bikini, smiling as always.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is private here...', Place, 'type=leighpoolsex');
				addLinkToPlaceC(md, 'finish swimming and get dressed', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "leighpoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandom("pool-sex", 2);
				addPlaceTitle(md, "Playing in and near the Pool");
				md.write(
					'<p>You ask Leigh to play with you more privately, and she seductively removes her swimsuit, ready for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'finish and get dressed', Place);
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		
		if (Place != 425 && Place != 423) return false;

		var clv = this.isCharmedBy("You") ? this.getCharmedLevel() : 0;
		var herName = this.getPersonName();
		
		if (Place == 423) {
			
			if (sType === "charmleighpool1") {
				// Charm her at the Pool 1
				md = WritePlaceHeader();
				this.showPerson("ellie23.jpg");
				addPlaceTitle(md, "Leigh Under a Charm Spell");
				md.write(
					'<p>You recite the words of the spell and Leigh looks at you curiously,</p>' +
					'<p>"Odd words, they sound strangely...arousing..are they some sort of pickup line?"</p>' +
					'<p>You can just ignore this and push her towards complete obedience' + (perYou.checkFlag(26) ? ', or you could follow those lines and seduce her with the assistance of the spell. It depends on what you want' : '') + '.</p>'
				);

				startQuestions();
				if (perYou.checkFlag(26)) startAlternatives();
				addLinkToPlaceO(md, 'enslave Leigh', 423, 'type=charmleighpool2', '', '', "charmPerson('Leigh',4);");
				if (perYou.checkFlag(26)) {
					addLinkToPlaceO(md, 'charm Leigh', 423, 'type=charmleighpool2', '', '', "charmPerson('Leigh',2);");
					endAlternatives();
				}
				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;				

			} else if (sType === "charmleighpool2") {
				// Leigh Charmed 2
				md = WritePlaceHeader();
				this.showPerson("ellie24.jpg");		
				addPlaceTitle(md, 'Leigh Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Leigh stands in the shallow part of the pool, and you firmly tell Leigh "Yes. they are arousing as I am telling you them, and you want to do what I say"</p>' +
						'<p>She stands up on the bed, but is shaken by the spell and says uncertainly,</p>' +
						'<p>"What do you mean, what <b>are</b> you asking me to do?"</p>' +
						'<p>You reply firmly "It does not matter what, you just want to do anything I ask, you feel aroused when I <b>tell</b> you to do anything"</p>' +
						'<p>Your words almost pound into her and for a moment her smile fades, she then hesitantly says,</p>' +
						'<p>"I do...not...think I barely know you...you are ' + perYou.getPersonName() + ' right..."</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'tell her to remove the swimsuit', 423, 'type=charmleighpool3');
				} else {
					// Lover
					md.write(
						'<p>Leigh looks thoughtful and stands in the shallow part of the pool and you say. "Leigh, forget the words, but I can see how you were looking at me. You desire me don\'t you?"</p>' +
						'<p>Leigh looks at you curiously, "Well... I am feeling a bit... turned on...</p>' +
						'<p>She looks at you more closely, and as the idea of you as a  lover sinks into her mind, you reinforce it,</p>' +
						'<p>"You are very cute, and at times you know if you like someone at first glance. Not quite love at first sight, but certainly desire at first sight."</p>' +
						'<p>She hesitates as you words sink in more, pulling in her lower lip before she replies, "Desire at first sight...or is it more?" and you see a blush pass across her face.</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, 'increase her desire', 423, 'type=charmleighpool3');
				}

				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;	

			} else if (sType === "charmleighpool3") {
				// Leigh Charmed 3
				md = WritePlaceHeader();
				this.showPerson("ellie25.jpg");
				addPlaceTitle(md, 'Leigh Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
			
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Leigh looks at you in surprise and starts to get out of the pool and with her last remaining willpower,</p>' +
						'<p>"No...I mean why not...I mean what am I saying..."</p>' +
						'<p>You focus on the magical link between you and Leigh, forcing your will on her and reply simply,</p>' +
						'<p>"You do not have to worry about why or why not, or thinking about anything other than obeying me."</p>' +
						'<p>She looks confused, the spell slowly taking its toll, "Why should...shouldn\'t I...what am I saying?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'you tell her "You should say \'Yes ' + perYou.getMaster() + '\'"', Place, 'type=charmleighpool4');

				} else {
					// Lover
					md.write(
						'<p>You focus on her and the magical link between you and Leigh, willing her to desire you concentrating on her desire. She looks at you,</p>' +
						'<p>"It is so strange how hot you are..do you think I am too?"</p>' +
						'<p>She starts to tease you, as she starts to get out of the pool leaning low to show you her cleavage and down into her swimsuit. She looks back you expectantly.</p>' +
						'<p>There is only one real answer to her question...</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I do"', Place, 'type=charmleighpool4');
				}

				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;					

			} else if (sType === "charmleighpool4") {
				// Leigh Charmed 4
				md = WritePlaceHeader();
				this.showPerson("ellie26.jpg");
				addPlaceTitle(md, 'Leigh Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');

				if (clv == 4) {
					// Enslave
					md.write(
						'<p>She looks troubled, "' + perYou.getMaster() + ' that\'s not right! That would mean I was some sort of servant...!"</p>' +
						'<p>You reply firmly,</p>' +
						'<p>"No, that means you are my slave, who desires me and who is aroused by obeying me!<br>' +
						'And now, my slave, you will strip!"</p>' +
						'<p>She lets herself fall back with a blissful gasp and removes the rest of her swimsuit, she softly says,</p>' +
						'<p>"Yes ' + perYou.getMaster() + '"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Prove your obedience"', Place, 'type=charmleighpool5');

				} else {
					// Lover
					md.write(
						'<p>Leigh looks happy to hear this and hesitantly says "I think I may love you too"</p>' +
						'<p>Leigh smiles and lets herself fall back with a sigh to removes the rest of her swimsuit. She looks at you, the arousal from the magic spell still working itself on her.</p>' +
						'<p>"Do you want to see more, my love?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I do"', Place, 'type=charmleighpool5');

				}

				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;	

			} else if (sType === "charmleighpool5") {
				// Leigh Charmed 5
				md = WritePlaceHeader();
				this.showPerson("ellie27.jpg");
				addPlaceTitle(md, 'Leigh ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
				
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Leigh drops her swimsuit and kneels there before you, almost naked and very beautiful, with a wide smile,</p>' +
						'<p>' + perYou.getMaster() + ' what can your slave do to prove her devotion?"</p>' +
						'<p>You are a little surprised, and pleased, at the way she addresses you. She seems to have completely adopted a slave attitude, referring to herself as a slave and not by name. You can see she is yours now, to do anything you like.</p>' +
						'<p>You look at your smiling slave and decide how to proceed,</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, 'dominate her more', Place, 'type=leighbj');
					addLinkToPlaceC(md, 'talk more to Leigh', Place);

				} else {
					// Lover
					md.write(
						'<p>Playfully Leigh throws away her swimsuit and sits there before you, completely naked in all her beauty, and as you admire her body, her lips form a wide smile.</p>' +						'<p>She leans in and kisses you, but while you can feel the force of the spell still coursing though her and reinforcing her feelings, the actual kiss is brief and still hesitant.</p>' +
						'<p>“I can\'t believe how quick I fell for you...” She whispers as she breaks the kiss and looks deeply into your eyes, desire and love filling her expression,</p>' +
						'<p>Shall we...here?</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"I need you now"', Place, 'type=leighbj');
					addLinkToPlaceC(md, 'talk more to Leigh', Place);

				}

				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;	
			}

		}
		
		// Spare room at Carol+Ellie's home
		if (sType === "charmleighroom1") {
			// Leigh Charmed 1
			md = WritePlaceHeader();
			this.showPerson("ellie4.jpg");
			addPlaceTitle(md, 'Leigh Under a Charm Spell');

			md.write(
				'<p>You recite the words of the spell and Leigh looks at you curiously,</p>' +
				'<p>"Odd words, they sound strangely...arousing..are they some sort of pickup line?"</p>' +
				'<p>You can just ignore this and push her towards complete obedience' + (perYou.checkFlag(26) ? ', or you could follow those lines and seduce her with the assistance of the spell. It depends on what you want' : '') + '.</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, 'enslave Leigh', Place, 'type=charmleighroom2', '', '', "charmPerson('Leigh',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, 'seduce Leigh', Place, 'type=charmleighroom2', '', '', "charmPerson('Leigh',2);");
				endAlternatives();
			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;
			
		} else if (sType === "charmleighroom2") {
			// Leigh Charmed 2
			md = WritePlaceHeader();
			this.showPerson("ellie5.jpg");
			addPlaceTitle(md, 'Leigh Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
			if (clv == 4) {
				// Enslave
				md.write(
					'<p>You firmly tell Leigh "Yes. they are arousing as I am telling you them, and you want to do what I say"</p>' +
					'<p>She stands up on the bed, but is shaken by the spell and says uncertainly,</p>' +
					'<p>"What do you mean, what <b>are</b> you asking me to do?"</p>' +
					'<p>You reply firmly "It does not matter what, you just want to do anything I ask, you feel aroused when I <b>tell</b> you to do anything"</p>' +
					'<p>Your words almost pound into her and for a moment her smile fades, she then hesitantly says,</p>' +
					'<p>"I do...not...think I barely know you...you are ' + perYou.getPersonName() + ' right..."</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'tell her to strip', Place, 'type=charmleighroom3');
			} else {
				// Lover
				md.write(
					'<p>You speak to her as she stands on the bed and you say. "Leigh, forget the words, but I can see how you were looking at me. You desire me don\'t you?"</p>' +
					'<p>Leigh looks at you curiously, "Well... I am feeling a bit... turned on...</p>' +
					'<p>She looks at you more closely, and as the idea of you as a  lover sinks into her mind, you reinforce it,</p>' +
					'<p>"You are very cute, and at times you know if you like someone at first glance. Not quite love at first sight, but certainly desire at first sight."</p>' +
					'<p>She hesitates as you words sink in more, pulling in her lower lip before she replies, "Desire at first sight...or is it more?" and you see a blush pass across her face.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'increase her desire', Place, 'type=charmleighroom3');
			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "charmleighroom3") {
			// Leigh Charmed 3
			md = WritePlaceHeader();
			this.showPerson("ellie6.jpg");
			addPlaceTitle(md, 'Leigh Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
			if (clv == 4) {
				// Enslave
				md.write(
					'<p>Leigh looks at you in surprise and subconsciously takes off her top before suddenly covering herself with her last remaining willpower,</p>' +
					'<p>"No...I mean why not...I mean what am I saying..."</p>' +
					'<p>You focus on the magical link between you and Leigh, forcing your will on her and reply simply,</p>' +
					'<p>"You do not have to worry about why or why not, or thinking about anything other than obeying me."</p>' +
					'<p>She looks confused, the spell slowly taking its toll, "Why should...shouldn\'t I...what am I saying?"</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'you tell her "You should say \'Yes ' + perYou.getMaster() + '\'"', Place, 'type=charmleighroom4');

			} else {
				// Lover
				md.write(
					'<p>You focus on her and the magical link between you and Leigh, willing her to desire you concentrating on her desire. She looks at you,</p>' +
					'<p>"It is so strange how hot you are..do you think I am too?"</p>' +
					'<p>She starts to tease you, removing parts of her clothes to give you a glimpse of her body and likely going much farther than she meant to under the influence of your spell. Her top soon flies off completely, and she is not wearing a bra.</p>' +
					'<p>There is only one real answer to her question...</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Yes, I do"', Place, 'type=charmleighroom4');
			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;

		} else if (sType === "charmleighroom4") {
			// Leigh Charmed 4
			md = WritePlaceHeader();
			this.showPerson("ellie7.jpg");
			addPlaceTitle(md, 'Leigh ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
			if (clv == 4) {
				// Enslave
				md.write(
					'<p>She looks troubled, "' + perYou.getMaster() + ' that\'s not right! That would mean I was some sort of servant...!"</p>' +
					'<p>You reply firmly,</p>' +
					'<p>"No, that means you are my slave, who desires me and who is aroused by obeying me!<br>' +
					'And now, my slave, you will strip!"</p>' +
					'<p>She lets herself fall back with a blissful gasp and removes her skirt, she softly says,</p>' +
					'<p>"Yes ' + perYou.getMaster() + '"</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Prove your obedience"', Place, 'type=charmleighroom5');

			} else {
				// Lover
				md.write(
					'<p>Leigh looks happy to hear this and hesitantly says "I think I may love you too"</p>' +
					'<p>Leigh smiles and lets herself fall back with a sigh to removes her skirt, giving you a good view of her panties. She looks at you, the arousal from the magic spell still working itself on her.</p>' +
					'<p>"Do you want to see more, my love?"</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Very much"', Place, 'type=charmleighroom5');

			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;

		} else if (sType === "charmleighroom5") {
			// Leigh Charmed 6
			md = WritePlaceHeader();
			this.showPerson("ellie9.jpg");
			addPlaceTitle(md, 'Leigh ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
			if (clv == 4) {
				// Enslave
				md.write(
					'<p>Leigh drops the skirt and kneels there before you on the bed, almost naked and very beautiful, with a wide smile,</p>' +
					'<p>' + perYou.getMaster() + ' what can your slave do to prove her devotion?"</p>' +
					'<p>You are a little surprised, and pleased, at the way she addresses you. She seems to have completely adopted a slave attitude, referring to herself as a slave and not by name. You can see she is yours now, to do anything you like.</p>' +
					'<p>You look at your smiling slave and decide how to proceed,</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'dominate her more', Place, 'type=leighbj');
				addLinkToPlaceC(md, 'talk more to Leigh', Place);

			} else {
				// Lover
				md.write(
					'<p>Playfully Leigh throws away her skirt and knees on the bed before you, nearly naked in all her Beauty and smiling as you admire her body.</p>' +
					'<p>She leans in and kisses you, but while you can feel the force of the spell still coursing though her and reinforcing her feelings, the actual kiss is brief and still hesitant.</p>' +
					'<p>“I can\'t believe how quick I fell for you...” She whispers as she breaks the kiss and looks deeply into your eyes, desire and love filling her expression,</p>' +
					'<p>Shall we...here?</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"I need you now"', Place, 'type=leighbj');
				addLinkToPlaceC(md, 'talk more to Leigh', Place);

			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1leigh" : "";
	};
	
	per.showPersonChat = function(md)
	{
		if (this.isCharmedBy()) {
			// Common questions
			if (Place == 223 && this.checkFlag(12) && this.isHere() && sType == "") {
				addLinkToPlaceO(md, bSlave ? 'order your slave Leigh to show more' : 'ask Leigh to make you an offer', Place, 'type=leighloanfuck');
				return;
			}
			//if (Place == 225 && this.isHere() && sType === "") {
			//	addLinkToPlace(md, "take Leigh into the employee breakroom", 226, "type=elliebreak");
			//}			
			if (Place == 423 && this.whereNow() == 425 && sType === "") addLinkToPlaceO(md, (this.getCharmedLevel() == 4 ? "order" : 'ask') + ' Leigh to join you for a swim', 423, 'type=leighpool');
			
			else if (Place == 425 && this.isHere() && sType === "") {
				// Visit Leigh in the spare room
				var bSlave = this.getCharmedLevel() == 4;
				var sh = sWho == "carol" ? "&who=carol" : '';

				if (perYou.isMaleSex()) {
					addLinkToPlaceO(md, bSlave ? 'fuck your slave' : '"let\'s have sex\"', Place, 'type=leighfuck' + sh);
					addLinkToPlaceO(md, bSlave ? 'have her serve you with her mouth' : 'ask your girlfriend for a blowjob', Place, 'type=leighbj' + sh);
				} else {
					addLinkToPlaceO(md, bSlave ? 'tell her to lick you' : 'ask her to lick you', Place, 'type=leighbj' + sh);
					addLinkToPlaceO(md, bSlave ? 'fuck your slave' : 'make love to her', Place, 'type=leighfuck' + sh);
				}
				if (isCharmedBy("Carol")) {
					if (sWho !== "carol") addLinkToPlaceO(md, "'compel' Carol to join Leigh and yourself", Place, 'who=carol');
					else {
						addLinkToPlaceO(md, 'ask them to play with each other', Place, 'type=leighcarollesbian' + sh);
						addLinkToPlaceO(md, 'tell them to play with you', Place, 'type=leighcarolthreesome' + sh);
					}

					this.addSleepLink(md, "go to bed for the night with " + (bSlave ? "your slave " : "") + "Leigh", "Going to Bed with Leigh",
						'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">' +
						'It is getting late and Leigh suggests you spend the night, mentioning she prefers to sleep in the nude...',
						'ellie-bed.jpg'
					);
				}
			}
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 425 && this.isHere()) {
				// Spare Room
				CastCharmSpell("Leigh", Place, 4, "type=charmleighroom1");		//Charm Leigh
				return "handled";
			
			} else if (Place == 225 && this.isHere() && !this.isCharmedBy()) {
				addComments("You can't cast that here. Look at all the cameras!");
				if (isSpellKnown("Shielded Charm")) addComments(' Even with the Shielded Charm it would be most unwise to try and charm someone in a place like this.');  // know shielded Charm
				addComments(' You will have to try this on Leigh somewhere else.');
				setPersonFlag("Kristin", 8);
				return "handled";

			} else if (Place == 423 && this.isHere()) {
				// Bartel's House Swimming Pool
				CastCharmSpell("Leigh", Place, 4, "type=charmleighpool1");		//Charm Leigh
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	per.addPersonPhoneCall = function() {
		// All SMS messages are post charm. No 'business' related messages
		if (!this.isCharmedBy()) return false;

		if (getDay(true) == "Fri" && !this.checkFlag(9) && isDay() && getHour() > Math.floor(9 + (3 * Math.random()))) {
			if (this.makeCall(true, 145)) this.setFlag(9);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 145:
				return receiveSMS('Leigh', 'I hate Mondays, but seeing you at work lightens up my day a bit, so here\'s a little incentive for you to visit me.;)', 'elliesms1.jpg') +
						 receiveSMS('Leigh', 'And if that\'s not enough:', 'elliesms2.jpg');
		}
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return true; };

}