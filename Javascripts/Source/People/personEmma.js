/**********************************************
Emma
Cafe shop barista
***********************************************/
function initialiseEmma()
{
	addPerson("Emma", 200, "Emma");
	
	per.getPersonName = function(full) {
		if (full == true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 1) return "Mistress Emma";		
		if (clv == 2) return "Bimbo Whore Emma";
		if (clv == 3) return "Emma, your lover";
		return this.name;
	};
	
	per.getPossessionFace = function() { return 'emma-face' + (this.isCharmedBy() ? 'c' : 'u'); };	

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 200 && this.isHere() && !this.checkFlag(2) && isVisible()) {
			this.setFlag(2);
			showPopupWindow("Hot Coffee and Barista",
				this.addPersonString("info.jpg", "height:max%", "right") +
				"The cafe looks fairly empty, so you easily spot the well-endowed barista reading a novel over the counter. She looks up and smiles at you but returns to reading her book."
			);
			return true;
		}
		return false;
	};	
	
	//Events
	per.showEvent = function()
	{
		var md, clv, sf;
		
		if (Place == 269 && sType == "emmapool") {
			// Emma Called to Pool
			clv = this.getCharmedLevel();
			WaitHereOnly(6);
			md = WritePlaceHeader();
			
			if (clv == 1) {
				this.showPerson("emmapoolm.jpg");
				addPlaceTitle(md, "Mistress at the Hotel");
			
				md.write(
					'<p>You meet your Mistress Emma at the pool and wait for her orders.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'follow her to a hotel room', Place, 'type=emmaPoolSex');
				addLinkToPlace(md, 'she smiles and leaves', Place);	
				
			} else if (clv == 2) {
				this.showPerson("emmapoolb.jpg");
				addPlaceTitle(md, "Swimming with Your Bimbo");
			
				md.write(
					'<p>Your bimbo Emma meets you at the pool.</p>'
				);
				
				startQuestions();
				addLinkToPlace(md, '"Show me how long you can hold your breath for"', Place, 'type=emmaPoolSex');
				addLinkToPlace(md, 'send Emma back home', Place);
				
			} else if (clv == 3) {
				this.showPerson("emmapooll.jpg");
				addPlaceTitle(md, "Swimming with Your Girlfriend");
	
				md.write(
					'<p>You meet Emma at the pool.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'suggest you go somewhere private', Place, 'type=emmaPoolSex');
				addLinkToPlace(md, 'say goodbye to Emma', Place);				
			}
			
			WritePlaceFooter(md);
			return true;
		};

		if (Place == 269 && sType == "emmaPoolSex") {
			// Emma Called to Pool
			md = WritePlaceHeader();
			clv = this.getCharmedLevel();
					
			if (clv == 3) {
				if (isExplicit()) this.showPerson("emmapoolsex.jpg");
				else this.showPersonRandomXBG("emmapoolsl", 1);
				addPlaceTitle(md, "Private with Your Girlfriend");
				md.write(
					'<p>You spend some intimate time with your girlfriend.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'say goodbye to Emma', Place);	
				
			} else if (clv == 2) {
				if (!isExplicit() || !perYou.isMaleSex()) this.showPerson("emmapoolsex.jpg");
				else this.showPersonRandomX("emmapoolsb", 2);
				addPlaceTitle(md, "Private with Your Bimbo");
				md.write(
					'<p>You use your bimbo.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'send Emma back home', Place);	
				
			} else if (clv == 1) {
				if (!perYou.isMaleSex()) this.showPersonRandom("emmapoolsmg", 2);
				else if (isExplicit()) this.showPerson("emmapoolsex.jpg");
				else this.showPersonRandomX("emmapoolsmb", 3);
				addPlaceTitle(md, "Mistress at the Hotel");
				md.write(
					'<p>Your Mistree uses you for her pleasure.</p>'
				);			
				startQuestions();
				addLinkToPlace(md, 'Emma returns back home', Place);		
			}
			
			WritePlaceFooter(md);
			return true;
		};	
		
		if (sType == "endgame1emma") {
			// End Game - Emma
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Baristas?");

			md.write(
				'<p>One day you receive a message from your ' + (this.getCharmedLevel() == 3 ? "girlfriend" : this.getCharmedLevel() == 2 ? 'bimbo' : 'Mistress') + ' Emma, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place != 200) return false;
		
		sf = getQueryParam("sf");
		
		if (sType == "recharmemma1") {
			// Re-charm Emma 1
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPerson("recharm1.jpg");
			addPlaceTitle(md, "Emma Under A Charm Spell - Again");
			md.write(
				'<p>Once again Emma falls under the spell. She starts to say something, then trails off after the first word, and shakes her head.</p>' +
				'<p>She tries again and asks, "I am hot, I need to get comfortable"</p>' +
				'<p>She strips to her underwear and lies on a table looking at you and asks if you want to get confortable as well?</p>'
			);			 
			startQuestions();
			if (clv != 3) addLinkToPlaceC(md, 'agree and start removing your clothes too', Place, 'type=recharmemma2', '', '', "charmPerson('Emma',3);");
			if (clv != 2) addLinkToPlaceC(md, 'tell your <b>Bimbo Whore</b> that she doesn\'t need to think anymore', Place, 'type=recharmemma2', '', '', "charmPerson('Emma',2);");
			if (clv != 1) addLinkToPlaceC(md, 'reply to your new <b>Mistress</b> that she\'s in charge', Place, 'type=recharmemma2', '', '', "charmPerson('Emma',1);");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "recharmemma2") {
			// Re-charm Emma 2
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (clv == 3) this.showPerson("emmalover.jpg");
			else if (clv == 2) this.showPerson("emmabimbo.jpg");
			else this.showPersonBG("emmadom1.jpg");
			addPlaceTitle(md, "Emma Under A Charm Spell - Again");
			switch(this.getCharmedLevel()) {
				case 3:
					// Lover
					md.write(
						'<p>Her expresion seems to change instantly. The sly smile and judgemental eyes that once sat upon her face are replaced with a more friendly and passionate look.</p>' +
						'<p>She turns her ass to you and starts caressing it seductively, "Well lover how about it?"</p>'
					);				
					break;
				case 2:
					// Bimbo
					md.write(
						'<p>Her expresion seems to change instantly. The sly smile and judgemental eyes that once sat upon her face are replaced with an open mouth and hungry eyes </p>' +
						'<p>"Yes ' + (perYou.isMan() ? 'Daddy' : 'Mommy') + ', of course. A bimbo whore like me doesn\'t need any thoughts at all." She turns her ass to you and starts caressing it seductively.</p>'
					);
					break;
				case 1:
					// Mistress
					md.write(
						'<p>Her expresion seems to change, the sly smile and judgemental eyes seem to get clearer as she looks down on you!</p>'
					);
					break;
			}
			startQuestions();
			addLinkToPlace(md, "go back to your table");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ordercoffee" || sType == "ordertea") {
			// Order a coffee
			md = WritePlaceHeader();
			AddCash(-3);
			this.showPerson("order.jpg");
			addPlaceTitle(md, "Ordering from Emma");
			s = sType == "ordercoffee" ? "coffee" : "tea";

			md.write(
				'<p>You step over and order a cup of ' + s + ' and take a seat at a table. A little while later the barista delivers the cup to you.</p>'
			);
			if (!this.checkFlag(1)) {
				md.write(
					'<p>You say "Thank you....sorry I do not know your name", she looks a little annoyed, probably thinking you are going to try flirting with her. She replies,</p>' +
					'<p>"Emma, and I am not interested, also I am working" and she returns to the counter and her book.</p>'
				);
				this.setFlag(1);
			} else {
				md.write(
					'<p>You try to strike up a conversation with Emma but she smiles and says she is working.</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, 'drink your ' + s);
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmemma1") {
			// Charm Emma 1
			md = WritePlaceHeader();

			this.showPerson("emma1.jpg");
			addPlaceTitle(md, "Emma Enthralled");

			md.write(
				'<p>Preoccupied, she doesn\'t notice you casting the spell.  But as her eyes begin to glow as she puts down her book.</p>' +
				'<p>"You alright, Miss?  You look a bit warm." you ask.</p>' +
				'<p>"Yeah, it just feels so ... hot in here. Did the manager turn the thermostat up?" she replies, clearly flustered.</p>' +
				'<p> You slyly smile "Well, no one else is in here," you gesture to the empty cafe around you "I certainly wouldn\'t mind if you got a bit more comfortable"</p>' 
			);

			startQuestions();
			addLinkToPlaceC(md, 'she gets more comfortable', Place, 'type=charmemma2');
			
			WritePlaceFooter(md);
			return true;
		};
	
		if (sType == "charmemma2") {
			// Charm Emma 2
			md = WritePlaceHeader();

			this.showPerson("emma2.jpg");
			addPlaceTitle(md, "Emma Enthralled");
			md.write(
				'<p>"This does feel a lot better..." she coos after pulling down her slacks, and prying open her shirt.</p>' +
				'<p>"Don\'t you think it\'s a little unfair that I\'m the only one getting undressed?"</p>'
			);
			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceC(md, 'agree and start removing your clothes too', Place, 'type=charmemmalover');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceC(md, 'tell your <b>Bimbo Whore</b> that she doesn\'t need to think anymore', Place, 'type=charmemmabimbo');
				addLinkToPlaceC(md, 'reply to your new <b>Mistress</b> that she\'s in charge', Place, 'type=charmemmadom');
				endAlternatives();
			}
			
			WritePlaceFooter(md);
			return true;
		};

		if (sType == "charmemmalover") {
			// Charm Emma Bimbo
			md = WritePlaceHeader();

			this.showPerson("emma3.jpg");
			addPlaceTitle(md, "Girlfriend Emma");
			md.write(
				'<p>Her expresion seems to change instantly. The sly smile and judgemental eyes that once sat upon her face are replaced with a more friendly and passionate look.</p>' +
				'<p>She turns her ass to you and starts caressing it seductively, "Well lover how about it?"</p>'
			);
			this.charmThem(3);
			startQuestions();
			addLinkToPlace(md, 'fuck your new girlfriend', Place, 'type=emmafuck');
			
			WritePlaceFooter(md);
			return true;
		};
		
		if (sType == "charmemmabimbo") {
			// Charm Emma Bimbo
			md = WritePlaceHeader();

			this.showPerson("emma3.jpg");
			addPlaceTitle(md, "Bimbo Emma");
			md.write(
				'<p>Her expresion seems to change instantly. The sly smile and judgemental eyes that once sat upon her face are replaced with an open mouth and hungry eyes </p>' +
				'<p>"Yes ' + (perYou.isMan() ? 'Daddy' : 'Mommy') + ', of course. A bimbo whore like me doesn\'t need any thoughts at all." She turns her ass to you and starts caressing it seductively.</p>'
			);
			this.charmThem(2);
			startQuestions();
			addLinkToPlace(md, 'fuck your newly minted bimbo', Place, 'type=emmafuck');
			
			WritePlaceFooter(md);
			return true;
		};

		if (sType == "charmemmadom") {
			// Charm Emma Dom
			md = WritePlaceHeader();

			this.showPersonBG("emmadom1.jpg");
			addPlaceTitle(md, "Mistress Emma");
			md.write(
				'<p>Her expresion seems to change, the sly smile and judgemental eyes seem to get clearer as she looks down on you!</p>'
			);
			this.charmThem(1);

			startQuestions();
			addLinkToPlace(md, 'obey your Mistress', Place, 'type=charmemmaDom2');

			WritePlaceFooter(md);
			return true;
		};
		if (sType == "charmemmaDom2") {
			// Charm Emma Dom 2 (or repeat dominate)
			md = WritePlaceHeader();
			this.showPersonBG("emmadom2.jpg");
			addPlaceTitle(md, "Mistress Emma");
			
			if (perYou.isMaleSex()) {
				if (!this.checkFlag(3)) md.write('<p>Mistress Emma take you into a backroom and hands you a suit and tells you to wear it. It is a stylisted dog mask with a chain attached, as you go to put it on she says "<b>Only</b> put this on". You obey and remove your clothes and put on the mask.</p>');
				else md.write('<p>Once again Mistress Emma takes you inth the backroom and gives you the costume, and you obediently put it on.</p>');
				md.write(
					'<p>Mistress Emma tells you to "paw" her until she tells you to stop.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'she says you are a good doggy and deserve a reward', Place, 'type=charmemmaDomBj');
				addLinkToPlace(md, 'she says time for doggy style', Place, 'type=charmemmaDomFuck');
			} else {
				md.write(
					'<p>Mistress Emma leads you into a back room and leaves you there for a few minutes. She returns with her hair tied back and wearing some black latex and stockings.</p>' +
					'<p>She proceeds to apply baby oil to her as she tells you to kneel before her and rub the oil into her body, everywhere into her body!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'she says you may service her now', Place, 'type=charmemmaDomBj');
			}
			this.setFlag(3);
			addLinkToPlace(md, "go back to your table");
			WritePlaceFooter(md);
			return true;
		};

		if (sType == "charmemmaDomBj") {
			// Charm Emma Dom Blowjob/Lick (male/female)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("emmadom3b.jpg");
			else this.showPerson("emmadom3g.jpg");
			addPlaceTitle(md, "Mistress Emma");
			
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Mistress Emma tells you are a good doggy and kneels down and starts to lick and suck your cock. She pauses to remind you that you are her dog and this is her cock to play with whenever she wants!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'she says time for doggy style', Place, 'type=charmemmaDomFuck');
				addLinkToPlace(md, 'cum-plete the session', Place, 'type=charmemmaDomCum');
			} else {
				md.write(
					'<p>Mistress Emma strips of her latex corset and instructs you to lick her ass and pussy from behind.</p>' +
					'<p>As you do she tells you how good you are, but how you are hers, so really she is good. She cries out in orgasm, and tells you to finish yourself with your fingers as she watches.</p>'
				);
				startQuestions();
			}			
			addLinkToPlace(md, "go back to your table", 200);

			WritePlaceFooter(md);
			return true;
		};

		if (sType == "charmemmaDomFuck") {
			// Charm Emma Dom Fuck (male only)
			md = WritePlaceHeader();

			this.showPersonRorX("emmadom4b.jpg");
			addPlaceTitle(md, "Mistress Emma");
			
			md.write(
				'<p>She tells you, her doggy to fuck her doggy style, and to make sure <b>not</b> to cum.</p>' +
				'<p>Mistress Emma is very aroused and it is easy not to cum before her, she cums very quickly as you fuck her.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'cum-plete the session', Place, 'type=charmemmaDomCum');
			addLinkToPlace(md, "she leaves you unsatisfied", 200);

			WritePlaceFooter(md);
			return true;
		};

		if (sType == "charmemmaDomCum") {
			// Charm Emma Dom Cum (male only)
			md = WritePlaceHeader();

			this.showPersonRorX("emmadom5b.jph");
			addPlaceTitle(md, "Mistress Emma");
			
			md.write(
				'<p>Mistress Emma tells you that you may cum over her breasts and face as a special reward for a good doggy.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "Go back to your table", 200);

			WritePlaceFooter(md);
			return true;
		};

		if (sType == "emmafuck") {
			// Emma fuck
			md = WritePlaceHeader();
			if (sf === "") sf = "fuck";

			if (perYou.isMaleSex()) this.showPersonRandomRorX("emma5b", isExplicit() ? 4 : 1);
			else if (perYou.FindItem(45) > 0) this.showPersonRandomRorX("emma5g", 1);
			else this.showPerson("emma5ga.jpg");
			addPlaceTitle(md, "Fucking " + this.getPersonName());
			clv = this.getCharmedLevel();
			
			switch (clv) {
				case 2:
					md.write(
						'<p>You fuck your always ready bimbo, she certainly does not care if anyone should walk in!</p>'
					);					
					startQuestions();
					if (sf !== "bj") addLinkToPlace(md, perYou.isMaleSex() ? '"Suck my cock, whore!"' : '"Lick my pussy, whore!"', Place, 'type=emmabj&sf=' + sf);
					if (perYou.isMaleSex()) addLinkToPlace(md, 'add some extra "cream" to her drink', Place, 'type=emmacumshot');										
					break;
				case 3:
					md.write(
						'<p>You embrace your girlfriend and fuck her there in the cafe, there is a delightful pleasure in anticipating someone may come in and see you!</p>'
					);
					startQuestions();
					if (sf !== "bj") addLinkToPlace(md, 'she moves to ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick you'), Place, 'type=emmabj&sf=' + sf);
					if (perYou.isMaleSex()) addLinkToPlace(md, 'you cannot hold back', Place, 'type=emmacumshot');
					break;
			}
			addLinkToPlace(md, "go back to your table", 200);
			WritePlaceFooter(md);
			return true;
		};

		if (sType == "emmabj" || sType == "emmabjyou") {
			// Emma bj
			md = WritePlaceHeader();
			if (sf === "") sf = "bj";
			clv = this.getCharmedLevel();

			this.showPersonRandomRorXBG("emma6", isExplicit() ?perYou.isMaleSex() ? 5 : 4 : 1);
			addPlaceTitle(md, clv == 2 && perYou.isMaleSex() ? "Thats a 'Latte' Cock" : "Personal Service");
			
			switch (clv) {
				case 2:
					md.write(
						'<p>You tell you ever ready bimbo to ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy') + '!</p>'
					);					
					startQuestions();
					if (sf !== "fuck") addLinkToPlace(md, '"I\'m going to fuck your brains out."', Place, 'type=emmafuck&sf=' + sf);
					if (perYou.isMaleSex()) addLinkToPlace(md, 'add some extra "cream" to her drink', Place, 'type=emmacumshot');										
					break;
				case 3:
					md.write(
						'<p>Your girlfriend kneels and ' + (perYou.isMaleSex() ? 'sucks and licks your cock' : 'skillfuly licks your pussy and sucks on your clit') + '. There is a delightful pleasure in anticipating someone may come in and see you!</p>'
					);
					startQuestions();
					if (sf !== "fuck") addLinkToPlace(md, 'you embrace her', Place, 'type=emmafuck&sf=' + sf);
					if (perYou.isMaleSex()) addLinkToPlace(md, 'you cannot hold back', Place, 'type=emmacumshot');
					break;
			}

			startQuestions();

			addLinkToPlace(md, "go back to your table", 200);
			WritePlaceFooter(md);
			return true;
		
		};
		if (sType == "emmacumshot") {
			// Emma Cumshot (male only)
			md = WritePlaceHeader();

			this.showPersonRandomRorX("emma7b", isExplicit() ? 3 : 1);
			addPlaceTitle(md, "Extra Cream");
			
			md.write(
				'<p>You cum over Emma!</p>'
			);
			
			startQuestions();
			addLinkToPlace(md, "go back to your table", 200);
			
			WritePlaceFooter(md);
			return true;
			
		};	
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		if (this.getCharmedLevel() == 1) this.showPerson("poledancem.jpg");
		else this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, nm + "'s Dance");
		if (this.getCharmedLevel() == 1) {
			md.write(
				'<p>Your Mistree Emma leads you onto the stage, and orders you to start dancing. As you do she jiggles enticing for you and incidentally the audience.</p>'
			);			
		} else if (this.getCharmedLevel() == 2) {
			md.write(
				'<p>Your bimbo Emma takes the stage in very little but that is what she normally wears.</p>' +
				'<p>She is somewhat experienced as dancer and entertains the audience well. As much as she can focus, she is more focused on you than the general audience, dancing almost as your private dancer!</p>' +
				'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and Emma deserves her tips to keep herself in lipstick and other cosmetics as the bimbo she is.</p>'
			);			
		} else {
			md.write(
				'<p>Your girlfriend takes the stage dressed in a version of exotic dancing wear!</p>' +
				'<p>She is somewhat experienced as dancer and entertains the audience well. Emma is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
				'<p>After she collects her tips and sits with you for a while.</p>'
			);
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		if (this.getCharmedLevel() == 1) {
			AddPeopleColumn(md);
			perYou.showPersonRandom("!poledance", 1);
		}		
		WritePlaceFooter(md);
	};	
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1emma" : "";
	};
	
	//Spells and Items
	per.handleItem = function(no, cmd)
	{
		if (no == 14 && cmd == 2) {
			if (this.isHere()) {
				if (!this.checkFlag(1)) addComments("You do not know her name, so the spell will not work.");
				else if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here. It\'s too public.");
				else CastCharmSpell("Emma", 200, 3, 'type=charmemma1', '', 'type=recharmemma1');
				return "handled";
			}
		};
		return "";		// do nothing
	};

	//Phone calls, default isPhoneable
	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=emmapool');
			receiveCall('','You call Emma and she agrees to meet you by the pool'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) {
			// Strip club
			perJade.setDancer(this.uid);
			dispPlace();			
			if (this.getCharmedLevel() == 3) receiveCall('', 'You call Emma and invite her to join you at the Avernus club. She suggest she could even dance for you if possible. You make immediate arrangements with Jade!'); 
			else if (this.getCharmedLevel() == 2) receiveCall('', 'You call your bimbo Emma and tell her to come and dance for you at the club. You then make arrangements with Jade, knowing Emaa will agree, she is a bimbo after all.'); 
			else receiveCall('', 'You call Mistress Emma and suggest she could show her power on the stage at the club, and she agrees to do it <b>with you</b>'); 
			WriteCommentsFooter(bChat, bChatLeft);	
		}		
	};
}
	
