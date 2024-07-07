/***********************************************************************
Ash
***********************************************************************/

function initialiseAsh()
{
	// Ash
	addPerson("Ash", 482, "Ash");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 4) return "Worker slut Ash";
		else if (clv > 0) return "Girfriend Ash";
		return this.name;
	};
	
	per.getPossessionFace = function() { return 'ash-face' + (this.isCharmedBy() ? 'c' : 'u'); };	
	
	per.whereNow = function()
	{
		if (!this.isCharmedBy() && !isDay()) return 0
		return this.place;
	};
	
	per.whereNowName = function() {
		var wh = this.whereNow();
		if (wh == 482) return "in the construction site office";
		return this.whereNowNameBase();
	};

	
	per.showEventPopup = function()
	{
		if (Place == 482  && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("A Lone Construction Worker",
				this.addPersonString("ash0.jpg", "height:max%", "right") +
				"You cast the spell and walk though the door into the office and as you do you are startled by a blonde construction worker. She seems just as surprised by you. Your experience thus far has taught you to act confident even when you don\'t know what\'s going on so you say \"Hello Miss. What are you doing here. This construction site has been shut down for weeks\"<p>" +
				'<p>She stammers " Uhhh Oh I forgot my hardhat at the office when we shut down construction and I needed to come back for it.  I know I shouldn\'t be here but... Hey wait a minute. Why are you here. This is private property."</p>' +
				'<p>You make up a story and reply "Yes I am well aware of that. Mayor Thomas has asked me to do an inspection so that the construction can continue." You look around the room and notice that she has made this area into a makeshift bedroom and continue.  "Are you living here?  That is trespassing and a violation of several local ordinances. You know that don\'t you. I\'ll have to call the police."</p>' +
				'<p>She replies, "Please don\'t do that. I don\'t have anywhere else to go. I lost my job when the construction shut down and got evicted when I couldn\'t pay my rent. I just moved here until I can find a new job"</p>' +
				'<p>You tell her, "Ok, Ok spare me the sob story. I can be reasonable. What\'s your name. I\'m sure we can work something out"</p>' +
				'<p>She tells you, "My name is Ash. At least that\'s what everyone calls me nowadays"</p>'
			);
			return true;
		}
		return false;
	};
	
	per.fedUponEvent = function(by) {
		if (by != perLilith) return false;

		md = WritePlaceHeaderNIP(false, "", "black");
		perLilith.showPerson("vampashfeedon.jpg");

		addPlaceTitle(md, "Lilith Inspects Ash\'s Neck", '', 0, false, 'white');

		md.write(
			'<p>Ash bears her neck with no hesitation as Lilith approaches with lust on her face. With no hesitation, she embraces Ash and sinks her fangs into her neck.</p>' +
			'<p>After a surprisingly short time, the vampyre looks up at you, still holding Ash. Her face is still full of lust, but different. She steps away from Ash who looks strange, a mixture of ecstasy and complete exhaustion, and they immediately sit down.</p>' +
			'<p>The vampyre looks at Ash, "My blood-lust has receded, but my other lusts are rising. Ash is mine for now in this place!". She then <b>demands</b> of Ash,</p>'
		);
		startQuestions(undefined, 'white', md);
		addLinkToPlace(md, '"I will inspect your entire body with mine"', Place, 'type=ashvampsex', '', '', '', 'bloodblock');
		addLinkToPlace(md, '"Help me with my assistant here"', Place, 'type=ashvampthreesome', '', '', '', 'bloodblock');
		addLinkToPlace(md, 'You tell her "That is enough!"', Place, '', 'Lilith looks angrily at you but she backs down and walks away, and leaves the room! After she leaves Ash stands up and seems she is no longer under Lilith\'s influence', '', 'perLilith.setFlag(13,false)');
		WritePlaceFooter(md);
		return true;
	};

	per.showEvent = function()
	{
		var md, clv;
		
		if (Place == 269 && sType == "ashpool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Swimming with Ash");
			md.write(
				'<p>Ash arrives wearing a cute bikini, happy to show off her figure for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'suggest moving to a private area', Place, 'type=ashpoolsex');
			addLinkToPlaceC(md, 'let her return to the construction site', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "ashpoolsex") {
			md = WritePlaceHeader();
			this.showPerson("pool-sex.jpg");
			addPlaceTitle(md, "Private Time with Ash");
			md.write(
				'<p>You spend an enjoyable time privately with Ash.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'let her return to the construction site', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1ash") {
			// End Game - Ash
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Construction?");

			md.write(
				'<p>One day you receive a message from your ' + (this.getCharmedLevel() == 4 ? 'slave' : 'friend') + ' Ash, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}

		if (Place != 482) return false;
		
		if (sType == "ashcharm1slave") {
			// Charm Ash 1 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ashstart1.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She angrily cries out, "what the heck did you just say?"</p>' +
				'<p>You tell her, "Oh that was just something that is going to help teach you that words have meanings. You said you would do anything for me and now I have to show you what that actually means."</p>' +
				'<p>She sighs, "You need to relax! I am happy to show you my bra but I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one. It doesn\'t mean you can make me do whatever you want"</p>' +
				'<p>You calmly tell her, "You may be right about that but the spell I just cast actually does mean that."</p>' +
				'<p>She replies confused, "What the fuck are you talking about?" and you tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Take your top off"', Place, 'type=ashcharm2slave');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm2slave") {
			// Charm Ash 2 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ashstart2.jpg");
			addPlaceTitle(md, "Ash Being Enslaved By A Spell");

			md.write(
				'<p>Ash removes her shirt but stops at the bra and covers her breasts with her hands. She says,</p>' +
				'<p>"Yea right, I already said I\'d do that for you. No need to pretend to be some kind of wizard about it."</p>' +
				'<p>You tell her, "Oh my dear I think you misunderstood me. I want you to remove everything covering your breasts. You are not allowed to cover them anymore while I am around."</p>' +
				'<p>Ash\'s hands seem to be struggling against themselves as they grab at her bra strings and begin tearing it off. You <b>order</b> her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Obey me now Slave"', Place, 'type=ashcharm3slave');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm3slave") {
			// Charm Ash 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ash2.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She cries out, "Why can\'t I stop my hands. I shouldn\'t be showing you my breasts. I can\'t cover them up either. What the hell!"</p>' +
				'<p>You firmly tell her, "You really don\'t listen well do you. I guess that doesn\'t matter too much anymore. As long as I say it to you your body will take over whether you understand it or not."</p>' +
				'<p>You continue and order her...</p>'
			);

			startQuestions();

			addLinkToPlace(md, '"Now show me that dumptruck of an ass you have"', Place, 'type=ashcharm4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm4slave") {
			// Charm Ash 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ash3.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She turns around and pulls her shorts down, and calls out,</p>' +
				'<p>"No please don\'t look. I don\'t let anyone look at that. It is disgusting"</p>' +
				'<p>You tell her, "Oh my poor darling. I didn\'t know you were so confused. Your asshole is a beautiful thing. It is a source of great pleasure for you and everyone else lucky enough to spend time with it."</p>' +
				'<p>She again cries out, "Nooo, it\'s dirty and nasty"</p>' +
				'<p>You tell her, "How about this. I will amplify the pleasure you feel with your asshole. This way it will feel much better than normal sex. Actually just to be safe I\'ll make it so the only way you can feel pleasure is through your asshole. How does that sound?"</p>' +
				'<p>She pleads, "Oh Please don\'t do that. Anything but that."</p>' +
				'<p>You ignore plea, "Shush now. Stop whining. There you go saying anything again. Haven\'t you learned yet that that can get you into trouble. I\'m done messing aroung. Time to get busy."</p>' +
				'<p>You order her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Shove a finger in your ass to test it out"', 482, 'type=ashcharm5slave');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm5slave") {
			// Charm Ash 5 (Slave)
			md = WritePlaceHeader();

			this.showPersonRorX("ash4.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She cries out, "OOOOOoooOOhhh nooo. Why does that feel so good. This is perverted and depraved. I shouldn\'t enjoy this."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Ok my turn"', 482, 'type=ashcharm6slave');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "ashcharm6slave") {
			// Charm Ash 6 (Slave)
			md = WritePlaceHeader();
			setPlaceFlag("Park", 7);

			if (isExplicit() && !perYou.isMaleSex()) this.showPersonX(perYourBody.FindItem(45) > 0 ? "ash5gs.jpg" : "ash5gd.jpg");
			else if (!perYou.isMaleSex()) this.showPerson("ash5gd.jpg");
			else this.showPersonRorX("ash5b.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>You grab Ash by the hips and begin savagely fucking her asshole. She moans in pleasure and has to bite down on her sheets to keep from grinding her teeth. You continue for as long as you can hold off your orgasm. It isn\'t especially long since her virgin asshole was the tightest you had ever felt.</p>' +
				'<p>When you finally let up she says, "Okay I get it now. You really are a wizard and you control me now."</p>' +
				'<p>You ask her, "And what are your thoughts on that realization?"</p>' +
				'<p>She replies, "As long as you fuck me good every once in a while I am perfectly happy to be your slave. I\'ve never felt pleasure like that before... Thank You ' + perYou.getMaster() + '."</p>' +
				'<p>She then gives you a spare key to the office.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk to Ash some more", 482);
			addLinkToPlace(md, "leave the building", 481);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm1gf") {
			// Charm Ash 1 (Girlfriend)
			md = WritePlaceHeader();
			this.charmThem(3);

			this.showPerson("ashstart1.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She asks, "what was that?"</p>' +
				'<p>You tell her, "Nothing, nothing, but I was just wondering if we can come to an arrangement. I can speak to the Mayor and even arrange for you to do maintenance work here, giving you a job and entitling you to live here if you wanted"</p>' +
				'<p>She suspiciously asks, "That sounds great but what did you want for this arrangement, I told you I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one."</p>' +
				'<p>You try to reassure her as the spell starts to affect her, "That is not what I meant, just to be friends, and sometimes when we both feel like it \'with benefits\'"</p>' +
				'<p>She answers, "Well it can get lonely here at times"...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she starts to take her top off', Place, 'type=ashcharm2gf');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm2gf") {
			// Charm Ash 2 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("ashstart2.jpg");
			addPlaceTitle(md, "Ash Being 'Friended' By A Spell");

			md.write(
				'<p>Ash removes her shirt but stops at the bra and covers her breasts with her hands. She says,</p>' +
				'<p>"Well, I already said I\'d show you, but being \'friends with benefits\' could work."</p>' +
				'<p>You kill for time for the spell to take further effect so you ' + (isCharmedBy("Mayor") ? 'call the Mayor to quickly arrange for Ash to look after things here.' : 'pretend to call the Mayor to arrange to Ash to work here') + '</p>' +
				'<p>You see Ash is looking more aroused and ask her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"How about a little more"', Place, 'type=ashcharm3gf');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm3gf") {
			// Charm Ash 3 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("ash3.jpg");
			addPlaceTitle(md, "Ash 'Friended' By A Spell");

			md.write(
				'<p>She turns around a bit seductively and pulls her shorts down, and says,</p>' +
				'<p>"Thank you a lot for arranging the job, I am really gradteful. I\'m no whore but at least here is a bit more for your viewing pleasure"</p>' +
				'<p>Again you assure here you do not want her to be a whore, just a friend, with the occasional \'benefit\'...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she says "How about some \'benefits\'"', 482, 'type=ashcharm4gf');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm4gf") {
			// Charm Ash 4 (Girlfriend)
			md = WritePlaceHeader();
			setPlaceFlag("Park", 7);

			if (isExplicit() && !perYou.isMaleSex()) this.showPersonX(perYourBody.FindItem(45) > 0 ? "ash5gsa.jpg" : "ash5gd.jpg");
			else if (!perYou.isMaleSex()) this.showPerson("ash5gd.jpg");
			else this.showPersonRorX("ash5b.jpg");
	
			addPlaceTitle(md, "Ash Under a Spell With 'Benefits'");

			md.write(
				'<p>With that you and your enchanted \'friend\' have some mutually pleasurable \'benefits\'</p>' +
				'<p>Afterwards Ash gives you a spare key to the office.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk to Ash some more", 482);
			addLinkToPlace(md, "leave the building", 481);
			WritePlaceFooter(md);
			return true;
		}		
				
		if (sType == "ashrecharm") {
			// Recharm Ash
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Ash Under a Charm Spell Again");
			if (this.getCharmedLevel() == 4) {
				this.charmThem(3);
				md.write(
					'<p>She asks, "what was that?"</p>' +
					'<p>You tell her, "Nothing, nothing, but I was just wondering if we can come to an arrangement. I can speak to the Mayor and even arrange for you to do maintenance work here, giving you a job and entitling you to live here if you wanted"</p>' +
					'<p>She suspiciously asks, "That sounds great but what did you want for this arrangement, I told you I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one."</p>' +
					'<p>You try to reassure her as the spell starts to affect her, "That is not what I meant, just to be friends, and sometimes when we both feel like it \'with benefits\'"</p>' +
					'<p>She answers, "Well it can get lonely here at times"...</p>'
				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>She angrily cries out, "what the heck did you just say?"</p>' +
					'<p>You tell her, "Oh that was just something that is going to help teach you that words have meanings. You said you would do anything for me and now I have to show you what that actually means."</p>' +
					'<p>She sighs, "You need to relax! I am happy to show you my bra but I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one. It doesn\'t mean you can make me do whatever you want"</p>' +
					'<p>You calmly tell her, "You may be right about that but the spell I just cast actually does mean that."</p>'				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Ash', Place);		
			WritePlaceFooter(md);
			return true;				
		}
		
		
		if (sType == "ashexpose") {
			// Show her tits
			md = WritePlaceHeader();

			if (perLilith.isHere()) this.showPersonRandom("ashflashc", 2);
			else this.showPerson("ashflashu.jpg");
			addPlaceTitle(md, '"This is good enough, right?"');

			if (perLilith.isHere()) {
				if (!this.checkFlag(3)) {
					md.write(
						'<p>You see Lilith has created the situation here where she is Ash\'s supervisor and Ash is her employee. You see also Ash is acting <b>very</b> submissively. You also see she is almost completely ignoring you.</p>'
					);
					this.setFlag(3);
				}
				md.write(
					'<p>Ash removes her top and exposes her breasts, waiting for something from Lilith who says,</p>' +
					'<p>"Very good, you seem to have been washing regularly as well. You may redress for now". It crosses your mind \'very good\' but in comparison Lilith\' breasts are \'amazingly good\'</p>'
				);
			} else md.write('<p>"What are you talking about. I can\'t even see your tits. You said anything."</p>');

			startQuestions();
			addLinkToPlaceC(md, perLilith.isHere() ? 'Lilith waits for her to redress' : 'talk to her more', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashjackhammer") {
			// Jiggle
			md = WritePlaceHeader();
			this.showPerson("jackhammer.jpg");
			addPlaceTitle(md, 'Bounce, Bounce');

			if (perLilith.isHere()) {
				this.setFlag(4);
				md.write(
					'<p>Ash makes a play of demonstrating a jackhammer, pretending it is on and jumping up and down.</p>' +
					'<p>Lilith tells her "That is all I need". Ash returns the jackhammer to it\'s storage place.</p>'
				);
			} else md.write('<p>Ash plays around with a jackhammer, pretending it is on and jumping up and down</p>');

			startQuestions();
			addLinkToPlaceC(md, perLilith.isHere() ? 'Lilith waits for her to put the gear away' : 'talk to her more', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "ashfuckingmachine") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("sextoy", isExplicit() ? 4 : 1);
			addPlaceTitle(md, 'A Different Sort of Equipmet');

			md.write(
				'<p>Ash takes out of a box some gear and you see they are various sex toys, more mechanical than most, designed to piston, rotate, vibrate or all at once.</p>' +
				'<p>She removes her clothing and sets the toys up with a dildo to penetrate her, belt thing that is a sort of mechanical \'licker\'. After a bit you can see she is getting aroused, and she gets a vibrator and applies it above the dildo right on her clit. Quickly she cries out in orgasm.</p>' +
				'<p>She looks over at Lilith and asks "May I stop Mistress" and you can see that the answer is unusually <b>NO</b> but Lilith looks at you and then tells her "Yes, for now"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'Lilith tells her to put it away', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "ashlubricate") {
			// Lubricate
			md = WritePlaceHeader();
			this.showPerson("lubricate.jpg");
			addPlaceTitle(md, '"Oil up!"');

			md.write(
				'<p>Ash removes most of her clothing and applies some baby oil over herself, but mostly on her large jiggly ass.</p>'
			);
	
			startQuestions();
			addLinkToPlaceC(md, perLilith.isHere() ? 'Lilith waits for her' : 'talk to her more', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "ashvampsex") {
			// Ash and Lilith have sex
			md = WritePlaceHeader();
			perLilith.showPersonRandomRorX("vampash", isExplicit() ? 3 : 2);
			addPlaceTitle(md, 'Serving her Mistress');

			md.write(
				'<p>Ash removes most of her clothing while Lilith removes her dress, more like lets it drop from her. Ash says,</p>' +
				'<p>"Ma\'am, do I meet your requirements", and Lilith corrects her "During inspections you will call me Mistress". Ash meekly says "Yes Mistress"</p>' +
				'<p>The nature of the inspection is made perfectly clear when Lilith kneels and licks Ash\'s thigh and then along the folds of her pussy. Lilith then sits on the couch and has Ash inspect her more thoroughly, completely and orgasmicly!</p>'
			);
	
			startQuestions();
			addLinkToPlaceC(md, 'Lilith stands up, dressed again', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashvampthreesome") {
			// Ash and Lilith threesome
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) perLilith.showPersonRandomRorX("vampashthreesomeb", isExplicit() ? 3 : 1);
			else perLilith.showPersonRandomRorX("vampashthreesomeg", 1);
			addPlaceTitle(md, 'Serving Lilith with Ash');

			md.write(
				'<p>Lilith gestures to you "My assistant now will help me to inspect you <i>very</i> thoroughly, obey they instructions as if they were my own. You see Ash look at you for the first time and she looks a bit confused, you see a slight change to the colour in her eyes as if the mana of the charm spell is trying to assert itself.</p>' +
				'<p>You decide it is best for now to play along with Lilith and keep Ask from either remembering who you are or something breaking in the spell or her mind. You quickly tell Lilith, "Thank you Mistress"</p>' +
				'<p>At these words Ash seems to settle back into her \'obedient employee of Lilith\' mode and she steps over to remove Lilith\'s clothes and then they both remove yours.</p>' +
				'<p>You take care to follow Lilith\'s leads, but then again she is never a shrinking violet or submissive minion, she always tries to dominate whenever she can!</p>' +
				'<p>Ash and yourself focus on Lilith\'s pleasure but also each others, a different experience than usual since you learned the charm spell!</p>'
			);
	
			startQuestions();
			addLinkToPlaceC(md, 'Later, you all redress', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashbj") {
			// Ash Oral
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("ashmouthb", isExplicit() ? 5 : 1);
			else this.showPersonRandomRorX("ashmouthg", isExplicit() ? 3 : 1);
			addPlaceTitle(md, clv == 4 ? (perYou.isMaleSex() ? "You can be nice." : "Oral Work") :  "Oral \'Benefits\'");

			if (clv == 4) {
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You decided to allow her some vaginal pleasure while your balls are in her mouth. It is an unusual arrangement but she seems to enjoy it.</p>'
					);
				} else {
					md.write(
						'<p>You have Ash kneel down and provide you some oral pleasure</p>'
					);
				}
			} else {
				md.write(
					'<p>You ask Ash for a bit of oral attention</p>'
				);
			}
	
			startQuestions();
			addLinkToPlaceC(md, 'talk more with Ash', Place);
			WritePlaceFooter(md);
			return true;
		}
	
		if (sType == "ashfuck") {
			// Fuck Ash
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("ashrideb", 1);
			else this.showPersonRandom("ashrideg", 2);
			addPlaceTitle(md, clv == 4 ? "She has become an anal expert." : "Fucking \'Benefits\'");

			if (clv == 4) {
				md.write(
					'<p>Ash\'s love for anal has surprised even you. She has taken to it faster than you would have expected.</p>'
				);
			} else {
				md.write(
					'<p>Time for some sex</p>'
				);
			}
	
			startQuestions();
			addLinkToPlaceC(md, 'talk more with Ash', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "ashstrapon") {
			// Fuck Ash with your strapon
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPersonRandom("ash5gs", 3);
			addPlaceTitle(md, clv == 4 ? "Strap-on her Ass" : "Strap-on \'Benefits\'");

			md.write(
				'<p>Time for some strap-on sex</p>'
			);
	
			startQuestions();
			addLinkToPlaceC(md, 'talk more with Ash', Place);
			WritePlaceFooter(md);
			return true;			
		}
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1ash" : "";
	}
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Ash House
			if (Place == 482 && this.isHere()) {
				var txt = '<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
					'<table><tr><td width="80%;margin-right:2em"><p>You cast the spell and you see Ash start to be affected by it. As she does you tell her...</p>' +
					addOptionLink("string", '"Words matter..."', "dispPlace(482,'type=ashcharm1slave')") +
					(perYou.checkFlag(26) ? addOptionLink("string", '"We can come to an understanding..."', "dispPlace(482,'type=ashcharm1gf')") : '') +
					'<br></td><td width="20%">' + this.addPersonFace(false, "80%") + '</td></tr></table>';
				CastCharmSpell("Ash", '', 4, '', txt, 'type=ashrecharm');	// CHARM Ash (construction slave), slave/gf level
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	
	per.isPhoneable = function(msg) { 	// Can you call them?
		if (!this.checkFlag(1)) return false;
		if (msg === true) return true;
		if (!this.isCharmedBy()) return false;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		return isAtLocation(282) && perJade.isDanceAvailable();				// Strip club
	};
	
	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=ashpool');
			receiveCall('', 'You call Ash to ' + (this.getCharmedLevel() ? 'order' : 'ask') + ' her to join you at the pool for a swim, and she answers promptly, "I\'ll be there shortly ' + perYou.getMaster() + '".');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function() {
		if (Place != 482 && this.isCharmedBy() && !this.checkFlag(5) && this.checkFlag(2) && isMorning()) {
			// SMS 1, few hours after first 'meeting' her
			if (this.makeCall(true, 206)) this.setFlag(5);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 206) return receiveSMS('Ash', 'Hi, did you visit last night, I sort of remember something or was it a dream? I am fairly sure someone was here', 'sms1.jpg');
		return '';
	};
}
