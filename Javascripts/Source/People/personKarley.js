/***********************************************************************
Karley
***********************************************************************/

function initialiseKarley()
{
	// Charley
	addPersonTop("Charley", 0, "Charley");
	per.setFlag(3);		// Named Karley by default
	
	per.getPersonName = function(full) {
		if (full === true) return this.getPersonNameShort();
		var clv = this.getCharmedLevel();
		if (clv == 1) return "Your angry Milf";
		if (clv == 3) return this.getPersonNameShort() + ", your Milf-friend";
		return this.getPersonNameShort();
	};
	
	per.getPersonNameShort = function() { return this.checkFlag(3) ? "Karley" : this.name; };
	
	per.getPersonAddress = function(n) { return this.isCharmedBy() ? n ? 428 : '2 Dervish Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function() {
		return 'charley-face' + (!this.isCharmedBy() ? "u" : (this.checkFlag(2) ? "b" : "a")); 
	};

	per.whereNow = function() {
		if (isShopOpen(2, 0, true)) return 427;
		return 428;
	};
	
	per.passTimeDay = function() {
		this.setFlag(4, false);
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Introduction to Charley
		if (this.isHere() && !this.checkFlag(1) && isVisible()) {
			//this.setFlag(1);
			var nm = this.getPersonNameShort();
			showPopupWindow(nm + "\'s Hair Salon",
				this.addPersonString("charley2.jpg", "height:max%", "right") +
				"You enter the Salon and ta woman confronts you with obvious contempt in her voice.</p>" +
				(perYou.isMan() ? '<p>"This is my Salon and is for Women only. I don\'t do men here."</p>' : '<p>"This is my Salon and I require appointments, and I am only taking new customers by referral now."</p>') +
				"<p>Well it looks like she won\'t be very helpful to you but on the plus side it is pretty clear that her name must be " + nm + " since she is this is her salon.</p>",
				'setPersonFlag("Charley",1);dispPlace()'
			);
			return true;

		}
		return false;
	};
	
	per.addPlaceImageLeft = function(md)
	{
		if (Place == 5 && sType === "") return addImageString("salon-" + (this.getPersonNameShort() == "Charley" ? "charley" : "karley") + ".jpg", "50%");
		return '';
	};
	
	per.showPersonChat = function(md)
	{
		if (Place != 428 || !this.isHere()) return;
		
		var clvC = this.getCharmedLevel();
		var bMan = perYou.isMaleSex();
		var bBlonde = !this.checkFlag(2);
		var nm = this.getPersonNameShort();
		
		if (clvC == 1) {
			addPopupLinkC(md, 'have her ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy'), "Good Bitch.",
				this.addPersonStringRorXBG("charley8" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
				'Doesn\'t seem like she will ever accept this.',
				true, "WaitHere(2)"
			);
			if (bMan) {
				addPopupLinkC(md, 'make her use her tits', "Still feels great.",
					this.addPersonStringRorX("charley9" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'She doesn\'t even try to hide that she hates it.',
					true, "WaitHere(2)"
				);
				if (!bBlonde) {
					addPopupLinkC(md, 'fuck her face', "No Hands.",
						this.addPersonStringRorX("charley11b.jpg", "height:maxw%", "rightpopup") +
						'She can\'t look disgusted if she can\'t control her face.',
						true, "WaitHere(2)"
					);
				}

				addPopupLinkC(md, 'cum on her face', "Splatter her.",
					this.addPersonStringRorX("charley10" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'Maybe I should make her drink it too.',
					true, "WaitHere(2)"
				);

			}
			this.addSleepLink(md, clvC == 1 && bMan ? "sleep while she sucks" : 'sleep with ' + nm, "A good nights rest",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%">' + (clvC == 1 && bMan ? '<b>You command her to deepthroat your cock while you sleep on her couch.</b>' : '<b>You command her to go to bed with you.</b>'),
				(bMan && isExplicit() ? 'Explicit/' : '') + 'charleysleep' + (this.checkFlag(2) ? "b" : "a") + '.jpg', false
			);
		} else {
			addPopupLinkC(md, 'ask her to ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy'), "Milf Oral",
				this.addPersonStringRorXBG("charley8" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
				nm + ' is clearly quite experienced at time and seems to enjoy pleasuring her lover with her mouth, tongue and hands',
				true, "WaitHere(2)"
			);
			if (bMan) {
				addPopupLinkC(md, 'ask her to use her tits', "Feels great!",
					this.addPersonStringRorX("charley9" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'You suspect this may not be something she particularly enjoys, but she is happy to please her lover with her ample breasts.',
					true, "WaitHere(2)"
				);
			}
			addPopupLinkC(md, 'have sex with your milf lover', "Sexy Milf-Time",
				(isExplicit() ? this.addPersonStringXBG("homefuck" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") :
									 this.addPersonString("homefuck" + (this.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup")) +
				'You have sex with your milf-lover, playing with her ample breasts and luscious body',
				 true, "WaitHere(2)"
			);			
			this.addSleepLink(md, 'sleep with ' + nm, "A good night's rest",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You ask ' + nm + ' to go to bed with you, and then to sleep for the night.</b>',
				'charleysleep' + (this.checkFlag(2) ? "b" : "a") + '.jpg', false
			);
		}
	};

	per.showEvent = function()
	{
		var md, nm, clvC;
		
		if (Place == 269) {
			if (sType == "charleypool") {
				nm = this.getPersonNameShort();
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool" + (this.checkFlag(2) ? "b" : "a") + ".jpg");
				addPlaceTitle(md, "Swimming with " + nm);
				md.write(
					'<p>' + nm + ' arrives, dressed in a cute bikini, and immediately jumps in for a swim beckoning for you to join her!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=charleypoolsex');
				addLinkToPlaceC(md, 'say goodbye to ' + nm, Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charleypoolsex") {
				nm = this.getPersonNameShort();
				md = WritePlaceHeader();
				this.showPerson("pool-sex" + (this.checkFlag(2) ? "b" : "a") + ".jpg");
				addPlaceTitle(md, "Being Discrete and Private with " + nm);
				md.write(
					'<p>You tell ' + nm + ' to play with you more privately, and she kneels exposing herself as an invitation for you to take her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + nm, Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "charmcharley1") {
			// Charm Charley 1
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			this.showPerson("charley0.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>You cast the shielded Dai Chu charm and the Open sign out front switches to closed as your magic flows into ' + nm + '.</p>' +
				'<p>"Listen here young ' + perYou.getManWoman() + '. If you are just gonna come into my salon and start sneezing then I\'m going to have to ask you to leave."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceC(md, '"No thanks. I think I\'ll stay to watch the show"', Place, 'type=charmcharley1slave');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceC(md, '"I\'m sorry I had to meet you"', Place, 'type=charmcharley1lover');
				endAlternatives();
			}			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcharley1slave") {
			// Charm Charley 1 (as Slave)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			this.showPerson("charley0.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>You tell her, "No thanks. I think I\'ll stay to watch the show."</p>' +
				'<p>She exclaims, "What on earth are you talking about. There will be no show here. Especially for some ' + (perYou.isMan() ? 'punk' : 'bitch') + ' like you." she says as her hands unconsciously move toward her breasts. You tell her,</p>' +
				'<p>"You seem to like playing with your tits Charley. I can\'t really blame you. For someone your age they are quite spectacular."</p>' +
				'<p>She replies annoyed, "Oh you can go straight to hell you little shit... Wha.. Stop that. Why can\'t I control my hands?"</p>' +
				'<p>You smile and reply, "Oh that\'s my fault but you don\'t need to worry about that anymore. Your body belongs to me now. You just focus on your mind. I\'ll leave that part alone."</p>' + 
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Open your blouse"', Place, 'type=charmcharley2slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcharley2slave") {
			// Charm Charley 2 (Slave)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPerson("charley3.jpg");
			addPlaceTitle(md, nm + " Being Enslaved By A Spell");

			md.write(
				'<p>' + nm + ' pulls open her shirt and glares at you. "I\'ll kill you fuckface!" She screams at you.</p>' +
				'<p>You reply, "Ahh Fuckface eh? We will get to that in due time my dear. For now I need to educate you on exactly how fucked your situation is. I\'ll give you an example."</p>' +
				'<p>You then tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Pull out your tits and pinch them hard"', Place, 'type=charmcharley3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley3slave") {
			// Charm Charley 3 (Slave)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			
			this.showPerson("charley4.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>"Ahhhh oww owwWW" she yells. "Please let me stop!"</p>' +
				'<p>"Oh that is very good slave. Saying please to your ' + perYou.getMaster() + ' is a fair way to get what you want. I\'ll warn you that It usually won\'t work but it is still your best shot."</p>' +
				'<p>"Fuck you. I don\'t have a ' + perYou.getMaster() + ' and it sure as hell wouldn\'t be you if I did.  I don\'t know how you are doing this but I\'m gonna break free and kill you."</p>' +
				'<p>"Ok now slave. I\'m getting bored of the insults. Go ahead and show me all your good bits."</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'she exposes herself to you', Place, 'type=charmcharley4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley4slave") {
			// Charm Charley 4 (Slave)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPerson("charley6.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>' + nm + ' pulls up her skirt and jerks her panties to the side to expose her pussy to you.</p>' +
				'<p>"Interesting... You consider your pussy to be one of your Good Bits.  Considering your age I would have to assume that it\'s best days are behind us."</p>' +
				'<p>' + nm + ' begins seething with anger and indignation at your comment on her age.</p>' +
				'<p>"Ha well you have the fire of a much younger woman I\'ll give you that. I don\'t really have much use for a used up pussy like yours. But since you like it so much I will allow you to show it off when you are here in the Salon.  From now on when the Salon is open you will be fully nude and spread so that anyone who walks in can appreciate your Good Bits."</p>' +
				'<p>' + nm + '\'s breathing becomes heavy as you continue "For now however, I want to ' + (perYou.isMaleSex() ? 'use a hole that can be as tight as I want' : 'use your mouth for some service') + '."</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'have her ' + (perYou.isMaleSex() ? 'suck' : 'lick'), Place, 'type=charmcharley5slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley5slave") {
			// Charm Charley 5 (Slave)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPersonRorXBG("charley7.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>' + nm + ' has no choice in the matter because you now control her body. She glares at you the whole time she is ' + (perYou.isMaleSex() ? 'sucking and it kinda improves the experience. She has had some experience with sucking cock before and you finish' : 'licking and it kinda improves the experience. She has some experience with women before and you orgasm') + ' relatively quickly.</p>' +
				'<p>"That\'s a good Slave. Now tell me where you live so that I can visit whenever I want."</p>' +
				'<p>"She looks disheartened and replies. I live right across the street."</p>' +
				'<p>"Ah Ah Ah. Slaves must address their ' + perYou.getMaster() + ' properly when they finish talking to them. Try it again slave."</p>' +
				'<p>"I live right across the street....' + (perYou.isMan() ? 'Sir' : 'Ma\'am') + '."</p>' +
				'<p>"That\'s better Bitch. Oh and when I visit you I expect your tits to be on full display when I walk through the door."</p>'
			);

			startQuestions();

			addLinkToPlace(md, "leave the Salon", 5);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcharley1lover") {
			// Charm Charley 1 (as Lover)
			this.charmThem(3);
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			this.showPerson("charley0.jpg");
			addPlaceTitle(md, nm + " Under a Spell");

			md.write(
				'<p>You tell her you are sorry for intruding but she is so beautiful and you had to meet her. You see her unconsciously caress her breasts as the arousal from the spell courses though her.</p>' +
				'<p>She calms down and says "That\'s ok then...but I have an appointment soon..." but she hesitates as she looks at you almost hungrily.</p>' +
				'<p>You suggest to her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"You can reschedule the appointment?"', Place, 'type=charmcharley2lover');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcharley2lover") {
			// Charm Charley 2 (Lover)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPerson("charley3.jpg");
			addPlaceTitle(md, nm + " Being Seduced By A Spell");

			md.write(
				'<p>Without replying ' + nm + ' makes a quick phone call to reschedule an appointment and then looks at you, her hands returning to her sizeable breasts. You feel compelled to complement her breasts as she is emphasising them.</p>' +
				'<p>She pulls apart her top exposing her bra, "I am not usually this..but how about...I mean..." and you explain it is just that she is very, very attracted to you and it is only nature she wants to show off her assets.</p>' +
				'<p>You explain how you find her very appealing as well, at least what you can see as covered by her bra...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she pulls off her bra', Place, 'type=charmcharley3lover');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley3lover") {
			// Charm Charley 3 (Lover)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			
			this.showPerson("charley4.jpg");
			addPlaceTitle(md, nm + " Being Seduced By A Spell");
			
			md.write(
				'<p>' + nm + ' exposes herself more, and starts to unconsciously rub and pinch her nipples as she says,</p>' +
				'<p>"Ahhhh...I mean you are very hot...I mean cute...whatever..."</p>' +
				'<p>You assure her of how much you like her and how she likes you, reinforcing the effects of the spell, and then suggest taking it a little further...</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'she exposes herself to you', Place, 'type=charmcharley4lover');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley4lover") {
			// Charm Charley 4 (Lover)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPerson("charley6.jpg");
			addPlaceTitle(md, nm + " Seduced By A Spell");

			md.write(
				'<p>' + nm + ' pulls up her skirt and pulls her panties to the side to expose her pussy to you in a clear invitation as she says,</p>' +
				'<p>"Come on I have always wanted a younger lover. Take me please?"</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'take her', Place, 'type=charmcharley5lover');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmcharley5lover") {
			// Charm Charley 5 (Lover)
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();

			this.showPersonRorXBG("charley7.jpg");
			addPlaceTitle(md, nm + " Your Charmed Lover");

			md.write(
				'<p>With that you embrace ' + nm + ' and she removes your clothes and the rest of hers urgently. She does down on you with frenzied passion and then you make love to your new charmed milf-lover!</p>' +
				'<p>After you say goodbye for now, but as you are about to leave she hands you a key and tells you "I live right across the street, visit anytime!"</p>'
			);

			startQuestions();

			addLinkToPlace(md, "leave the Salon", 5);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "charleydyehair") {
			// Charley Hair Dye Brunette
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			clvC = this.getCharmedLevel();
			this.setFlag(4);
			
			var bBlonde = !this.checkFlag(2);
			
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("charleyhair" + (bBlonde ? "b" : "a") + ".jpg");
			else this.showPerson("charleyhair" + (bBlonde ? "b" : "a") + ".jpg");

			this.setFlag(2, bBlonde);

			addPlaceTitle(md, "Dyeing Her Hair");

			if (clvC == 1) {
				md.write(
				  '<p>You decide to make ' + nm + ' change her hair color' + (perYou.isMaleSex() ? ' and you don\'t see any reason why she should stop sucking your cock to do so' : '') + '.</p>'
				);
			} else {
				md.write(
				  '<p>You tell ' + nm + ' about how much you like ' + (bBlonde ? 'dark hair' : 'blonde hair') + ' and how she would look even more attractive with her hair dyed. ' + nm + ' says she is happy to change her hair colour for you!</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, 'return to the Salon', Place);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1charley") {
			// End Game - Charley
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Hair Dressers?");

			md.write(
				'<p>One weekend you visit ' + nm + ' in her home and she is lying there with a prominent baby bump, your milf lover has been paying attention to Miss. Logan\'s teachings!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
					
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "charleyrecharm") {
			// Recharm Charley
			md = WritePlaceHeader();
			nm = this.getPersonNameShort();
			var clvC = this.getCharmedLevel();
			var bBlonde = !this.checkFlag(2);		
			if (clvC == 3) {
				this.charmThem(4);
				this.showPerson("workslave" + (bBlonde ? "a" : "b") + ".jpg");
				addPlaceTitle(md, nm + " Being Enslaved by a Charm Spell");
				md.write(
					'<p></p>'
				);
			} else {
				this.charmThem(3);
				this.showPerson("worklover" + (bBlonde ? "a" : "b") + ".jpg");
				addPlaceTitle(md, nm + " Becoming Your Lover By a Charm Spell");
				md.write(
					'<p></p>'
				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to ' + nm, Place);
					
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "freecharley") {
			// Use the silver ring on her
			nm = this.getPersonNameShort();
			if (this.isCharmed()) {
				AddMana(5);
				this.unCharmThem();
			}			
			md = WritePlaceHeader();
			this.showPerson("freed.jpg");
			addPlaceTitle(md, 'Freeing ' + nm);
			
			if (getQueryParam("by") === "Tina") md.write('<p>Tina steps back as the spell fades from ' + nm + ', looking to you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over ' + nm + ', absorbing it within moments.</p>');
			md.write(
				'<p>' + nm + ' looks confused, then almost aroused as she opens her top exposing her bra. She closes the shirt and looks around the room in confusion.</p>' +
				'<p>"What was that Master...did you want your toy to...sorry you are not...I mean who are you?"</p>' +
				'<p>She seems to not remember much of her time charmed, you would guess from her words Davy had her charmed as a sex-toy. You think he must have a taste for older women.</p>' +
				'<p>She is now free willed again...unless you wish to change that!</p>'
			);
			
			// Questions
			startQuestions();
			addLinkToPlace(md, 'talk to the now freed stylist', Place);
			WritePlaceFooter(md);
			return true;
		}
	
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonNameShort();
		if (this.checkFlag(2)) this.showPerson("poledanceb.jpg");
		else this.showPerson("poledancea.jpg");
		addPlaceTitle(md, nm + "'s Dance");
		if (this.getCharmedLevel() == 1) {
			md.write(
				'<p>' + nm + ' reluctantly takes the stage dressed in a version of exotic dancing wear!</p>' +
				'<p>' + nm + ' is not an experienced dancer but ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' tries to avoid looking at you!</p>' +
				'<p>After she collects her tips and goes to leave the club. You consider stopping her but decide to let her leave.</p>'
			);
		} else {
			md.write(
				'<p>' + nm + ' confidently takes the stage dressed in a version of exotic dancing wear!</p>' +
				'<p>' + nm + ' is not an experienced dancer but ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' dances well looking often at you seductively!</p>' +
				'<p>After she collects her tips and joins you for a while flirting and looking gorgeous!</p>'
			);
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + nm + '\'s dance', Place);
		WritePlaceFooter(md);
	};

	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1charley" : "";
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Salon
			if (Place == 427 && this.isHere()) {
				if (!this.checkFlag(1)) addComments('You are not sure what her name is, you cannot cast the spell without it.');
				else if (!isSpellKnown("Shielded Charm")) addComments('Don\'t cast the spell here. It is too public.');
				else CastCharmSpell("Charley", Place, 4, 'type=charmcharley1', '', 'type=charleyrecharm'); // CHARM Charley, slave level
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=charleypool');
			if (this.getCharmedLevel() == 1) receiveCall('', 'You call ' + this.getPersonNameShort() + ' to order her to join you at the pool for a swim, and she answers reluctantly, "If I must!" and hangs up. You take that to mean she will be there soon.');
			else receiveCall('', 'You call ' + this.getPersonNameShort() + ' to ask her to join you at the pool for a swim, and she answers pleasantly, "I\'ll be there shortly!" and hangs up.');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
};
