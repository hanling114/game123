/***********************************************************************
Melanie
***********************************************************************/

function initialiseMelanie()
{
	// Melanie
	addPerson("Melanie", 432, "Melanie", '', false);
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 4) return "Slave Milf Melanie";
		if (clv == 3) return "Milf Melanie";
		return this.name;
	};
	
	per.getPersonAddress = function(n) { return isPlaceKnown("MelaniesHouse") ? n ? 432 : '9 Cherise Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "melanie-facec" : "melanie-faceu"; };
	
	per.getSuffix = function() {
		var clv = this.getCharmedLevel();
		if (clv == 3) return "gf";
		return this.checkFlag(3) ? "slave2" : "slave";
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 432 && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Neighbourhood Milf",
				this.addPersonString("mel0.jpg", "height:max%", "right") +
				"You knock on the door and a busty blonde milf opens it. You saw on the mailbox that her last name is Thames.</p>" +
				'<p>"Hello Miss Thames" you say. She smiles and replies,</p>' +
				'<p>"Oh please call me Melanie. What can I do for you today."</p>' +
				"<p>You think to yourself, why can't they all be this easy?" +
				(this.isCharmedBy("Davy") ? 
					" As you think this you see her expression change, and she asks,</p>" +
					'<p>"Are you ' + perYou.getPersonName() + ' my Massss..friend warned me about you. Please leave or I will call the police"'
					: "")
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, clv;
		
		if (Place == 269) {
			if (sType == "melaniepool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Melanie");
				md.write(
					'<p>Melanie joins you wearing a lovely bikini and she poses for you before going for a swim.</p>' +
					'<p>After you wonder if you should take it a bit further...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'of course you should', Place, 'type=melaniepoolsex');
				addLinkToPlaceC(md, 'say goodbye to Melanie', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "melaniepoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Melanie");
				md.write('<p>Of course you do and ask Melanie to remove the rest of her bikini and play together at the edge of the pool!</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Melanie', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "endgame1melanie") {
			// End Game - Melanie
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Milfs?");

			md.write(
				'<p>One day you visit your older lover Melanie and you see while older, she is not too old to learn from Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place != 432) return false;
		
		if (sType == "freemelanie") {
			// Use the silver ring on her
			if (this.isCharmed()) {
				AddMana(5);
				this.unCharmThem();
			}			
			md = WritePlaceHeader();
			this.showPerson("freed.jpg");
			addPlaceTitle(md, 'Freeing Melanie');
			
			if (getQueryParam("by") === "Tina") md.write('<p>Tina steps back as the spell fades from Melanie, looking to you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over Melanie, absorbing it within moments.</p>');
			md.write(
				'<p>Melanie looks confused, and she bends over exposing her panties as if inviting you, or at least her Master. She suddenly stands and straightens her dress, and says,</p>' +
				'<p>"What was that...is it time...sorry again what were you visiting for?"</p>' +
				'<p>She seems to not remember much of her time charmed, you guess Davy may of just had her charmed as a sex slave!</p>' +
				'<p>She is now free willed again...unless you wish to change that!</p>'
			);
			// Questions
			startQuestions();
			addLinkToPlace(md, 'talk to the now freed Melanie', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel1slave") {
			// Charm Melanie 1 (Slave)
			this.charmThem(4);
			md = WritePlaceHeader();
			this.showPerson("mel2.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>Melanie asks, "I\'m sorry I didn\'t understand what you said?"</p>' +
				'<p>You tell her, "That\'s ok Melanie, you didn\'t need to understand it. Now <b>take off those clothes</b> and show me what you\'re working with under there"</p>' +
				'<p>She exclaims, "EXCUSE ME Young ' + perYou.getManWoman() + '. That is no way to speak to a lady.  Leave my house this instant!" Despite her words she starts to unconsciously lift her skirt.</p>' +
				'<p>You tell her "Hold on there don\'t get your panties in a bunch...actually you should do that.  You will take them off and throw them away..."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Present yourself to me naked."', Place, 'type=charmmel2slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel2slave") {
			// Charm Melanie 2 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel3s.jpg");
			addPlaceTitle(md, "Melanie Being Enslaved By A Spell");

			md.write(
				'<p>"No I won\'t" she says even as she rips off all of her clothes.</p>' +
				'<p>"Good girl, Melanie" you say."</p>' +
				'<p>She cries out, "Stop. Fuck off and leave me alone. Why am I naked."</p>' +
				'<p>You tell her "Shut up now. Your voice is annoyiing. You will do whatever I say because I am your owner now. Maybe you need more proof"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'bind her arms and legs', Place, 'type=charmmel3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel3slave") {
			// Charm Melanie 3 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel4s.jpg");
			addPlaceTitle(md, "Melanie Enslaved By a Spell");

			md.write(
				'<p>"This can\'t be possible" she says as she looks around the room confused.</p>' +
				'<p>You tell her, "What\'s wrong bitch. how can you still be confused. It\'s pretty obvious at this point. I guess I need to make it more clear that you are my bitch."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'make her look like a bitch', Place, 'type=charmmel4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel4slave") {
			// Charm Melanie 4 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel5s.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>You bind your bitch and put her on a leash and tell her,</p>' +
				'<p>"There ya go bitch.  Now do you understand your position?"</p>' +
				'<p>"MMmmm Hmm" she whimpers  "pllllssss lllltt mmmmm ggggoo".</p>' +
				'<p>You tell her, "Oh but if I let you go then you will be a bitch without a ' + perYou.getMaster() + ' and we can\'t have that. I know what will cheer you up."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Lets play a game"', Place, 'type=charmmel5slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel5slave") {
			// Charm Melanie 5 (Slave)
			md = WritePlaceHeader();

			this.showPerson("mel6s.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>"Fetch" you yell as you throw the ball across the room.  She has no choice but to obey since you issued a command. You have not made her enjoy any of this but you don\'t really care.  "You are really slow at fetch. I\'ll have to get you in better shape. You will be kept on a strict exercise regiment from now on."</p>'
			);

			startQuestions();
			addLinkToPlace(md, "make her exercise", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel1gf") {
			// Charm Melanie 1 (Girlfriend)
			md = WritePlaceHeader();
			this.charmThem(3);
			this.showPerson("mel2.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>You tell her "I am Aunt Brandi\'s '  + (perYou.getManWoman() == "man" ? 'nephew' : 'niece') + ' and she told me to tell you Dia Chu!" as you cast the charm spell.</p>' +
				'<p>Melanie asks, "I\'m sorry I didn\'t understand what you said?"</p>' +
				'<p>You tell her, "That\'s ok Melanie, I must have misunderstood her or said it wrong. She did not say how pretty you are and I was distracted"</p>' +
				'<p>She smiles broadly, she does have a lovely smile! "You really shouldn\'t flirt with older women, I am old enough to be your mother" she replies.</p>' +
				'<p>You answer with the line about she barely old enough to be your sister, a line you both recognise, but the spell is making her more receptive.</p>' +
				'<p>You comment on her figure...how she works-out at the gym with Aunt Brandi and she brushes her skirt and it flies up giving you a glimpse of her panties. You think this was unconscious, but the spell would of helped...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she looks back at you', Place, 'type=charmmel2gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel2gf") {
			// Charm Melanie 2 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("mel3gf.jpg");
			addPlaceTitle(md, "Melanie Being Seduced By A Spell");

			md.write(
				'<p>She says in an exaggerated way "Oops, silly me" and continues smiling. It seems flipping her dress was not so unconscious. </p>' +
				'<p>You say there was nothing wrong and you like the colour red. Melanie looks back at you and you can see she is getting more and more affected by the spell. She tells you after a short hesitation,</p>' +
				'<p>"Don\'t tell your Auntie" and raises up her skirt fully exposing her panties. You promise not to tell Aunt Brandi, why would you?</p>' +
				'<p>You tell her how beautiful she is, but again she refers to herself being too old for you, but with less force than before.</p>' +
				'<p>You answer...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Not at all, I love women of all ages"', Place, 'type=charmmel3gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel3gf") {
			// Charm Melanie 3 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("mel4gf.jpg");
			addPlaceTitle(md, "Melanie Seduced By a Spell");

			md.write(
				'<p>She looks at you and seems to have reached a decision "Promise you will not tell Brandi"</p>' +
				'<p>You promise and she starts to remove the rest of her clothing. Curiously you ask why she is so insistent to not tell Aunt Brandi, not that you had ever planned to. She has stripped to just her panties and tells you,</p>' +
				'<p>"She is so very protective of Kylie, and while I did not know she had other family here in Glenvale, I would think she will be equally protective of them as well"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'with that answered, embrace her', Place, 'type=charmmel4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel4gf") {
			// Charm Melanie 4 (Girlfriend)
			md = WritePlaceHeader();
			this.showPersonRorXBG("mel5gf.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>Nothing more is needed to be said, and you embrace your enchanted lover and you take pleasure from her body as she takes it from yours.</p>' +
				'<p>Afterwards she invites you to return anytime, but once again makes you promise not not tell your Aunt. You guess she has never met your mother as she makes no mention of any other members of your family.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "melaniebj") {
			// Oral sex (Girlfriend only)
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("home-bj", isExplicit() ? (perYou.isMaleSex() ? 4 : 2) : 1);
			addPlaceTitle(md, "Melanie");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Melanie is perfectly happy to give you a blowjob, it seems to be something she has done for her previous lovers often and is quite skilled!</p>'
				);
			} else {
				md.write(
					'<p>Melanie is certainly familiar with receiving this sort of attention but has limited experience giving. It seems to make little difference, she is skilled and enthusiastic to your considerable pleasure!</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melaniefuck") {
			// Fuck
			md = WritePlaceHeader();
			if (this.getCharmedLevel() == 4) this.showPersonRandom("home-slave-fuck", 2);
			else if (perYou.isMaleSex()) this.showPersonRandomRorX("home-fuckb", isExplicit() ? 3 : 1);
			else this.showPersonRandom("home-fuckg", 1);
			addPlaceTitle(md, "Melanie");

			if (this.getCharmedLevel() == 4) {
				// Slave
				md.write(
					'<p>You fuck your MILF slave.</p>'
				);				
			} else if (perYou.isMaleSex()) {
				// Girlfriend (Male player)
				md.write(
					'<p>You suggest to Melanie that it is time to fuck her and she is quite excited and eager for her younger lover to show their talents.</p>' +
					'<p>You are young and learning so your talents are still improving, but Melanie is an experienced and eager lover!</p>'
				);
			} else {
				// Girlfriend (Female player)
				md.write(
					'<p>While Melanie is not that familiar with making love to another female and she is unsure what you want to do when you suggest fucking. You are quite happy to show her exactly what you meant and she is a quick learner.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, this.getCharmedLevel() == 4 ? "do more to Melanie" : "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melanietitfuck") {
			// Tit-Fuck (Girlfriend only)
			md = WritePlaceHeader();
			this.showPersonRandomRorX("home-tf", isExplicit() ? 3 : 1);
			addPlaceTitle(md, "Melanie");

			md.write(
				'<p>Melanie has good sized breasts, not Ms. Titus level but few do after all. Plenty for you to ask your lover to put it simply, fuck them! Melanie smiles,</p>' +
				'<p>"My past lovers have requested this too, and I have always obliged them, just remember to fuck me in other ways too!"<p>' +
				'<p>You get the point and promise to give her a good fucking later, and she kneels before you as she removes most of what she is wearing to completely expose her breasts. As she mentioned she is quite skilled here in working your cock with her tits and mouth. When you cry out you are about to cum she makes sure you cum all over her tits.</p>' +
				'<p>After she runs a finger through the cum on her tits and makes a play of licking it.</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melanietoy") {
			// Use a toy
			md = WritePlaceHeader();
			this.showPerson("toya.jpg");
			addPlaceTitle(md, "Toying with Melanie");

			md.write(
				'<p>You use one of Melanie\'s toy on her in a way she had never intended.</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "do more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}			
		if (sType == "melaniestraponfuck") {
			// Strap-on Fuck (Girlfriend only)
			md = WritePlaceHeader();
			this.showPersonRandomX("home-strapon", 1);
			addPlaceTitle(md, "Melanie");

			md.write(
				'<p>You take out your strap-on and Melanie says "I have not had many female lovers and not sure I have used one of these with any of them, but I am sure I can get the hang of it!"</p>' +
				'<p>She certainly does, treating your plastic cock as a real one, lick it to get it wet enough for you to thrust it into your lover. She then rides it like any cock and orgasms loudly on it after a while.</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melaniebath") {
			// Bath time
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPerson(clv == 4 ? "melbath-slave.jpg" : "melbath-gf.jpg");
			addPlaceTitle(md, clv == 4 ? "C\'mon bitch. relax. I made this nice warm bath just for you." : "Bath-time");

			if (clv == 4) {
				md.write(
					'<p>Ungrateful whores these days.</p>'
				);
			} else {
				md.write(
					'<p>You ask Melanie to have a bath with her. She goes and runs the bath and calls you to join her when it is ready. You see she is rather aroused and touching herself as you approach the tub.</p>' +
					'<p>You join her in the tub and have a hot time kissing, touching and caressing each other. It becomes not exactly fucking but more masturbating each other in the hot soapy bath!</p>' +
					'<p>When you have had enough Melanie provides large towels and dries your back and hair for you, something you have always found quite sensual and appealing.</p>'
				);
			}
	
			startQuestions();
			addLinkToPlace(md, clv == 4 ? "do more to Melanie" : "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "melanieface") {
			// Face fuck
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("melfaceb", isExplicit() ? 2 : 1);
			else if (perYourBody.FindItem(45) > 0) this.showPerson("melfacegs.jpg");
			else this.showPerson("melfacegn.jpg");

			addPlaceTitle(md, perYou.isMaleSex() || perYourBody.FindItem(45) > 0 ?  "Open your throat more bitch." : "Lick bitch");

			md.write('<p>You\'ll learn to love this.</p>');

			startQuestions();
			addLinkToPlace(md, "do more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}			
				
		return false;
	};
	
	per.showPersonChat = function(md)
	{
		if (Place != 432 || !this.isCharmedBy() || sType !== "") return;
		
		if (this.getCharmedLevel() == 4) {
			// Slave
			if (this.checkFlag(3)) addLinkToPlaceC(md, 'she needs more exercise', Place, '', 'You set your slave back on her exercise machine', '', "setPersonFlag('Melanie',3,false)");
			else addLinkToPlaceC(md, 'let her have a rest', Place, '', 'You take her off the machine and leave her securely tied', '', "setPersonFlag('Melanie',3)");
			
			addLinkToPlaceC(md, 'give the sweaty Milf a bath', Place, 'type=melaniebath');
			addLinkToPlaceC(md, 'use her face', Place, 'type=melanieface');
			addLinkToPlaceC(md, 'fuck her', Place, 'type=melaniefuck');
			addLinkToPlaceC(md, 'use a toy on her', Place, 'type=melanietoy');

			this.addSleepLink(md, "sleep here tonight", "Sleeping with Melanie",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You decide to give Melanie the night off from her bondage and let her suck our cock while you sleep.</b>',
				(perYou.isMaleSex() && isExplicit() ? 'Explicit/' : '') + 'melsleep.jpg', true
			);
			
		} else {
			// Girlfriend
			addLinkToPlaceC(md, "ask her " + (perYou.isMaleSex() ? "for a blowjob" : "to lick you"), Place, 'type=melaniebj');
			addLinkToPlaceC(md, "fuck your milf lover", Place, 'type=melaniefuck');
			if (perYou.isMaleSex()) addLinkToPlaceC(md, "ask to fuck your milf lover's tits", Place, 'type=melanietitfuck');
			else if (perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, "fuck your milf lover with a strap-on", Place, 'type=melaniestraponfuck');
			addLinkToPlaceC(md, "have a bath with Melanie", Place, 'type=melaniebath');
			
			if (!isInvisible()) {
				this.addDancingLink(md, 'talk to Melanie about dancing at the club?', 
					'You talk to Melanie about the Avernus club and about if she wants to have some fun and dance there,</p>' +
					'<p>&quot;Did Brandi tell you I used to work as an exotic dancer when I was studying?&quot; You deny talking to Aunt Brandi about this, but no matter it is agreed she will dance in the club later on for you.'
				);
			}
			this.addSleepLink(md, "sleep here tonight", "Sleeping with Melanie",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>' +
				'You ask Melanie if you can spend the night and she eagerly agrees. She prepares the bed and lies on it in some lingerie ready for you!</b>',
				'sleep.jpg', true
			);		
		}		
	};

	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Melanie's Dance");
		md.write(
			'<p>Melanie takes the stage dressed in some exotic dance gear, she seems to be quite familiar with the needed outfits! She mentioned having worked previously as an exotic dancer while studying.</p>' +
			'<p>Melanie is a very experienced dancer, older than most of the dancers here but very skilled!</p>' +
			'<p>After she collects her tips and joins you for a while buying some drinks with them for both of you.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1melanie" : "";
	}
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Melanie's House
			if (Place == 432 && this.isHere()) {
				var txt = '<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
					'<table><tr><td width="80%;margin-right:2em"><p>You cast the spell and you see Melanie start to be affected by it. As she does you tell her...<br>' +
					'<i>You have a strange intuition that her slave charm will be harsh...and irreversible.</i></p>' +
					addOptionLink("string", '"Take off your clothes, slave"', "dispPlace(432,'type=charmmel1slave')") +
					(perYou.checkFlag(26) ? addOptionLink("string", '"I am Aunt Brandi\'s ' + (perYou.getManWoman() == "man" ? 'nephew' : 'niece') + '..."', "dispPlace(432,'type=charmmel1gf')") : '') +
					addOptionLink("string", 'stop the spell for now', "dispPlace()") +
					'<br></td><td width="20%">' + this.addPersonFace(false, "80%") + '</td></tr></table>';
				CastCharmSpell("Melanie", '', 0, '', txt);
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	
	this.isPhoneable = function(msg) { 	// Can you call them?
		if (this.getCharmedLevel() != 3) return false;
		if (msg === true) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		return isAtLocation(282) && perJade.isDanceAvailable();				// Strip club
	};

	per.callThem = function() {
		if (this.getCharmedLevel() == 4) return;
		if (Place == 269) {
			gotoPlace(Place, 'type=melaniepool');
			receiveCall('', 'You call Melanie to ask her to join you at the pool for a swim, and she answers, "Sure why not!".');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();
	};	
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(2) && this.getCharmedLevel() == 3 && !this.isHere() && isNight() && this.hoursCharmed() > 24) {
			if (this.makeCall(true, 355)) this.setFlag(2);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 355) return receiveSMS('MelMILF', 'Still looking good for my age?', 'sms1.jpg');
		return '';
	};
}
