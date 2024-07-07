/**********************************************
Donna
***********************************************/

function initialiseDonna()
{
	// Donna
	addPerson("Donna", 0, "Donna");
	
	per.whereNow = function() {
		if (!isDay() && this.place !== 0) return this.isCharmedBy() ? 185 : 1000;
		return this.place;
	};
	
	per.hoursSinceEvent = function() {
		return Math.floor((nTime - this.extra[0]) / 12);
	};
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("donna0.jpg", "height:max%", "right") +
			"Donna became somewhat your friend over your visits. She shows deep sympathy and caring to you, but interestingly she looks as a very close friend and not as her " + perYou.getMaster() + " as everyone else do after you’ve charmed them. Maybe she has such a strong will that it only affects her that much or does she have any magical powers that you don’t know? You have to talk her about this.<br><br>" +
			"Donna became somewhat your friend over your visits. She shows deep sympathy and caring to you, but interestingly she looks as a very close friend and not as her " + perYou.getMaster() + " as everyone else do after you’ve charmed them. Maybe she has such a strong will that it only affects her that much or does she have any magical powers that you don’t know? You have to talk her about this.<br><br>" +
			"Anyways, she is good friend who even lets you make out with her. Deep inside you know if you’d use your powers on her a second time she would most likely be turned into your slave, but you don’t want that. It’s nice to have a \"friend\" after all those obedient, determined to please you, loyal slaves you gathered. Sometimes she calls you " + perYou.getMaster() + " as a foreplay for sex because she knows you like it and she’s a hundred percent devoted to you just like the rest!<br><br>" +
			"Donna is waving at you by the pool. She gives you kisses to both ears and asks you if you have the time to chit-chat with her.";
	};
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		if (this.isCharmedBy()) return this.name + ", your friend";
		return this.name;
	};
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? 'donna-face' : "donna0"; };
	
	per.getModels = function() { return "Elle|Elle Alexander,Britney|Britney Amber"; };
	
	per.showEventPopup = function()
	{
		if (Place == 269 && this.isHere()) {
			if (!this.checkFlag(2)) {
				if (this.dress === "") this.pickModel("You look around and see two young women talking, one appears about to leave the pool area and the other is staying. Which one is staying, is it the one in...", "donna0", "Elle", "Britney", "purple", "hotpants", '', 'Pool');
				else {
					this.setFlag(2);
					showPopupWindow("Redhead Swimmer",
						this.addPersonString("donna0.jpg", "height:max%", "right") +
						"A redhead girl crawls out of the swimming pool just at the time when arrive there. She barely makes a glance towards you and goes back to her deck chair. She grabs the book \"Pride and Prejudice\" which lies on the floor and starts to read it. Ugh! You hope she is not an uptight, arrogant noble girl.<br><br>" +
						"It’s obvious you didn’t attract her attention, but this must be the girl Bambi mentioned to you. She’s all alone...with you. She’s an easy prey!"
					);
				}
				return true;
			}
			if (sType == "donnatransformbodyelle") {
				CastTransform(1);
				this.setFlag(7);
				this.dress = "Britney";	
				showPopupWindow("Transformed",
					this.addPersonString(Place == 269 ? "donna2.jpg" : "donna8.jpg", "height:max%", "right") +
					'Donna\'s body starts to subtly change, filling out and becoming rounder, and her breast growing. Her face completely changes as if a different person is standing in front of you.<p>' +
					'<p>You tentatively as if she is alright and she replies and she is definitely still Donna, still an attractive red-head and the same person she was before',
					'dispPlace()'
				);
				return true;
			}	
			if (sType == "donnatransformbodybritney") {
				CastTransform(1);
				this.setFlag(7);
				this.dress = "Elle";
				showPopupWindow("Transformed",
					this.addPersonString(Place == 269 ? "donna2.jpg" : "donna8.jpg", "height:max%", "right") +
					'Donna\'s body starts to subtly change, her breasts shrinking, and her figure slimming down. Her face changes as if a different person is standing in front of you.<p>' +
					'<p>You tentatively as if she is alright and she replies and she is definitely still Donna, still an attractive red-head and the same person she was before',
					'dispPlace()'
				);
				return true;
			}
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "charmdonna1") {
			// Charm Donna 1
			md = WritePlaceHeader();
			this.showPerson("donna2.jpg");
			addPlaceTitle(md, "Girl Under A Spell");
			md.write(
				'<p>"Oh my gosh!" the girl exclaims. "I feel so strange. My tummy is on fire and I have this sudden urge towards you. Who are you? Please answer me, stranger! I want to know you!”</p>' +
				'<p>The spell starts to take effect on the innocent girl. She drops the classic book she was reading and stands up to face you. The colour purple is slowly filling her eyes. Yet you have an odd feeling. Something should be different, but you don’t know what, it’s just a feeling.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "introduce yourself", Place, 'type=charmdonna2');
			addLinkToPlace(md, "go to the bar?", 124);
			WritePlaceFooter(md);			
			return true;				
		}	
		if (Place == 269 && sType == "charmdonna2") {
			// Charm Donna 2
			md = WritePlaceHeader();
			this.showPerson("donna3.jpg");
			addPlaceTitle(md, "Donna Under A Spell");
			md.write(
				'<p>"' + perYou.getPersonName() + ', pretty name for an ugly ' + (perYou.isBornMale() ? 'Guy' : 'Girl') + ' like you…"- The redhead sarcastically notes your body. She defends her statement right after she sees your pouting face.</p>' +
				'<p>"Heyy! Honey, it’s just a joke! Don’t take it too seriously. I’m Donna and I already know we are going to be great friends!”</p>' +
				'<p>What? Friends? This is rather new. She doesn’t submit like the others and she is making smart jokes on you. What is going on?</p>' +
				'<p>"Donna, don’t you feel curious? We’ve just met and you want to be my friend? You don’t even know me.” – you push the subject, you want to understand what’s going on.</p>' +
				'<p>"' + perYou.getPersonName() + ', sit down next to me. Just take a break. If I don’t know you, I will soon. It doesn’t matter. All that’s important is that we enjoy each other’s company… Hmmm, do you like my tits? I know they are not that special, but I want a friend who enjoys them.", Donna grabs your arm and makes you sit down next to her on the deckchair. She frees one of her boobs from her swimsuit and strokes it. She latches onto one of your hand and guides it onto her open breast.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "accept Donna\'s friendship", Place, 'type=charmdonna3');
			WritePlaceFooter(md);			
			return true;				
		}	
		if (Place == 269 && sType == "charmdonna3") {
			// Charm Donna 3
			md = WritePlaceHeader();
			if (isDay()) this.showPerson("donna4.jpg");
			else if (perYou.isMaleSex()) this.showPersonRorX("donna9b.jpg");
			else this.showPersonRorX("donna9g.jpg");
			addPlaceTitle(md, "Donna Under a Spell");
			md.write(
				'<p>The spell completes it’s task fully and you see that it reached Donna’s soul and altered her personality. She doesn’t bow to you nor calling you names and titles. The spell changed her only so that she became rather friendly and open to you.</p>' +
				'<p>"Yes, Donna. These are a nice pair. I know we will become very close in time, but I still can’t wrap my head around something. You know, I’ve put a spell on you that should make you my slave, but it’s not the case.” You tell her the truth. You know the spell has affected her that much enough that she is caring for you and understands you.</p>' +
				'<p>"I don’t know buddy. Yes, I do feel something different inside me, but to put it this way; I don’t care. I’m your friend now and I want the best for you. We can investigate this strange phenomenon you are witnessing together! Sounds fun!” She cheers you up and for a moment you forget what’s been bothering you. After an everlasting hug, she chimes into your ear.</p>' +
				'<p>"I\'ll be here if you need me, ' + perYou.getPersonName() + '. I don’t want to be lonely so visit me when you can, bud.” She picks up the book that she threw away earlier and cuddles into your arms and continues to read it.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "go to the bar?", 124);
			WritePlaceFooter(md);			
			return true;				
		}	
		
		if (Place == 185 || Place == 269) {
			if (sType == "enjoydonnasex") {
				// Donna Hotel event
				md = WritePlaceHeader();
				if (!isExplicit()) this.showPerson("donna5" + (Place == 269 ? "p" : "r") + ".jpg");
				else this.showPersonRandomXBG("donna5" + (Place == 269 ? "p" : "r"), 3);

				addPlaceTitle(md, "Donna");

				md.write(
					'<p>Donna prepares herself for you. Her body is firm and ripe for you to use however you like.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "talk to Donna", Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place == 185) {
			// Strip-tease event
			if (sType == "strip1") {
				md = WritePlaceHeader();
				setPlaceKnown("DonnasRoom");
				this.showPerson("donna-hotel2.jpg");
				addPlaceTitle(md, "Donna\'s Strip-tease");
				md.write(
					'<p>After you enter Donna’s room she closes the door behind you and turns to you. In a few seconds she’s already out of her dress and leaning against the door in only her black stockings.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Turn around! Make it sexy!"', 185, 'type=strip2');
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);	
				return true;
				
			} else if (sType == "strip2") {
				md = WritePlaceHeader();				
				this.showPerson("donna-hotel3.jpg");
				addPlaceTitle(md, "Donna\'s Strip-tease");
				md.write(
					'<p>She flashes a smile at you, obeying your request.</p>' +
					'<p>"I know that my little clam is much better than those girls’s",  Donna teases you while slowly turns around facing the door. She puts both her hands up to give you a better look.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"No way! You look good, but nowhere near as good as Bambi or Miss Titus. God, she has world class tits!"', 185, 'type=strip3');
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);	
				return true;
				
			} else if (sType == "strip3") {
				md = WritePlaceHeader();				
				this.showPerson("donna-hotel4.jpg");
				addPlaceTitle(md, "Donna\'s Strip-tease");
				md.write(
					'<p>You giggle to yourself knowing that Donna will try even harder now.</p>' +
					'<p>"Okay, but these legs are a thing to die for. You gotta acknowledge at least that!", she says.</p>' +
					'<p>Your ginger friend pulls her legs towards the sky, stretching them as strongly as she can.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Have to agree there! You put up a nice show!"', 185, 'type=strip4');
				addLinkToPlace(md, "go to the Hotel Bar", 124);				
				WritePlaceFooter(md);	
				return true;
				
			} else if (sType == "strip4") {
				md = WritePlaceHeader();				
				this.showPerson("donna-hotel5.jpg");
				addPlaceTitle(md, "Donna\'s Strip-tease");
				md.write(
					'<p>She kneels in front of the door, trying to position her naked body for the best experience you can get.</p>' +
					'<p>"And this little show is only for besties like you!", she adds, a sensation in her voice can be heard. You understand now; she is having an orgasm just by teasing you. Donna doesn’t look at you instead looking at the floor, reminding you  of your slaves.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Whew! That really did the trick! I feel great! I can already forget about all those annoyances!"', 185, 'type=strip5');
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);	
				return true;
				
			} else if (sType == "strip5") {
				md = WritePlaceHeader();				
				this.showPerson("donna-hotel5.jpg");
				addPlaceTitle(md, "End of Donna\'s Strip-tease");
				md.write(
					'<p>Donna looks up to you and you notice something in her eyes. The purple glow vividly dances, pointing out to you the power you have over her. And this power is growing as you can see the submissiveness in her eyes.</p>' +
					'<p>"Whenever you want it! That’s what friends are for!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);	
				return true;
		
			}
		}
		
		if (Place != 196 || !isShopOpen(4, 0, true)) return false;
		
		// Donna Restaurant event
		if ((this.checkFlag(3) && !this.checkFlag(6) && wherePerson("Jenny") == 196) || sType == "donna0") {
			// Donna Hotel event
			md = WritePlaceHeader();
			this.setFlag(6);
			this.extra[0] = nTime;
			setQueryParams('type=donna0');
			var perJenny = findPerson("Jenny");
			perJenny.showPerson("jenny10.jpg");
			addPlaceTitle(md, "A Reservation?");
			md.write(
				'<p>You open the windowed door that serves as the entrance to the Bavaria Hut and look for Donna. ' +
				'Jenny jumps at you spooking you a bit, because in your hurry you forgot that she’s always standing next to the entrance, waiting for new customers to serve. However, this customer is her ' + (perYou.isBornMale() ? 'Lord and Master' : 'Lady and Mistress') + ' so the german waitress tilts her down, greeting you like a good servant.</p>' +
				'"Please follow me ' + perYou.getMaster() + '! Donna’s been waiting for you at your private room!", she’s talking about the VIP room you own at back of the restaurant.</p>' +
				'<p>Jenny escorts you rocking her hip seductively while you check out her booty from the back. As you arrive she poses for your viewing pleasure.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'enter the room', 196, 'type=donna1');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "donna1") {
			// Donna at the Restaurant 1
			md = WritePlaceHeader();
			this.showPerson("donna-resto1.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>Jenny closes the door to your very own private room where you usually spend your dinner. She makes sure it is closed and puts the key away then she marches to a narrow wall part that is between two windows that lights up the room and awaits further commands.</p>'
			);
			if (this.dress == "Elle") md.write('<p>You see Donna on the restaurant’s table sitting in a casual attire that consists of a simple jeans and a blouse.</p>');
			else md.write('<p>You see Donna on the restaurant’s table dressed in some sort of stylised maid costume. You look as if you ask about it and she shakes her head and just says "Special service!".</p>');
			md.write(
				'<p>She then says "Finally! I’ve been waiting for you!". You come close to her and end up hugging your friend.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"It’s nice to see you too! What have you been up to?"', 196, 'type=donna2');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna2") {
			// Donna at the Restaurant 2
			md = WritePlaceHeader();
			this.showPerson("donna-resto2.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You ask Donna how she has been while you sit down to the closest chair. The room is filled with antique paintings, chairs and a big, old fashioned table where at least twelve people could sit and eat.</p>' +
				'<p>"Not much, I can’t stop thinking about you! I can’t even finish that lame book I’ve been reading without stopping at every page. I daydream of having you there, with me, talking funny like you usually do!", she’s referring to Pride and Prejudice she was reading when you first met her. Donna gently pushes her chest thus making the upper buttons on her blouse tears apart revealing her two nipples wide open to you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"I thought you were a typical uptown girl who doesn’t talk to people like me."', 196, 'type=donna3');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna3") {
			// Donna at the Restaurant 3
			md = WritePlaceHeader();
			this.showPerson("donna-resto3.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You jokingly imitate a british oldschool accent as you ask her. She looks at angrily and slaps your chest with her hands.</p>' +
				'<p>"Haha, very funny ' + perYou.getPersonName() + '! You know I was… before I met you!", she playfully pats your face. After that Donna looks at Jenny questioningly, who is still standing at her place hands behind her back.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Don’t worry. She’s mine! She serves me."', 196, 'type=donna4');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna4") {
			// Donna at the Restaurant 4
			md = WritePlaceHeader();
			this.showPerson("donna-resto4.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You casually explain about Jenny to Donna. Jenny looks straight at one point on the dining table without ever looking up or glancing aside to you or Donna. She doesn’t want to disturb your time with your friend. How thoughtful of her! Meanwhile Donna opens her blouse and gets rid of it quickly. She’s doing the same with her jeans too!</p>' +
				'<p>You tell her "Now we are talking! Donna, you are one horny girl and I like that in you!", you say it again with that crappy english noble accent.</p>' +
				'<p>The redhead girl teases you by pulling some of her fiery red hair to hide her nipple.</p>' +
				'<p>"Honey, It’s in my blood! Oohh… I forgot about my panty…Whoops!" with a single action she’s out of that red thong and smirks at you coyly.</p>'

			);
			startQuestions();
			addLinkToPlaceC(md, '"I do have to admire your passion for getting rid of your clothes so fast!"', 196, 'type=donna5');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna5") {
			// Donna at the Restaurant 5
			md = WritePlaceHeader();
			this.showPerson("donna-resto5.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>"' + perYou.getPersonName() + ', stop talking that much… and live the moment!", Donna whispers while making glances at Jenny. She puts a finger to your mouth, shutting you up for the rest of the time while you two are together.</p>' +
				'<p>"How about a little somethin’ for my oh so tired and weary hero?" Donna continues to seduce you and your feelings. You wish you could take her right here right now, but she’s your friend. Donna would be more than willing to have you fuck her, but you don’t want that. You are afraid that if you would have sex with her, your power would drastically grow over her making her a slave like the rest. So you can only have these peepshows without worrying you would control her too much.</p>'
			);
			startQuestions();
			addLinkToPlaceO(md, 'You nod your head signaling her to finish what she started.', 196, 'type=donna6');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna6") {
			// Donna at the Restaurant 6
			md = WritePlaceHeader();
			this.showPerson("donna-resto6.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>She zealously shows you her pussy and ass even motioning you to touch them. She gives in all she got, you clearly see her whole body tightens for your viewing pleasure.</p>' +
				'<p>Ten minutes later, after you had your fun with her you tell Donna to get dressed and thank her for her friendship. She gives you a kiss on your lips and smilingly waves you away so she put her clothes back. You leave with Jenny at your side. Your very own waitress hugs and escorts you out of the Cafe. She goes back to work and you turn to back to the important matters at hand. You start to like these private sessions with Donna more each time you visit! She’s a keeper and a close friend!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'exit the restaurant', 194);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	// Image on the left
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 185 && this.isHere() && sType === "") {
			return this.showPerson("donna8.jpg", '', '', '', '', false, "string");
		}
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 185 && this.isHere()) {
			if (!isPlaceKnown("DonnasRoom")) setPlaceKnown("DonnasRoom");
			md.write(
				'<p>Donna’s in her lingerie, sitting by the only table in her room. She plays with her stockings, trying to fix it when you enter.'
			);
			if (isVisible()) {
				md.write(
					' She leaves her lingerie as it is and hugs you, motioning you to sit down on her bed.</p>' +
					'<p>"' + perYou.getPersonName() + ', I’m glad to see you. Please feel at home. What’s mine is yours, as always. That includes my body too, you know…” she is trying to seduce you to bed. She is showing her pretty chest to you and holding you with both of her hands.</p>'
				);
			} else md.write('</p>');
		}
		return '';
	};
	
	per.showPersonChat = function(md)
	{
		if (Place == 269 && this.isHere() && isDay() && sType === "") {
			if (!this.checkFlag(1)) addQuestionR(md, 'introduce yourself to the girl', 'She ignores you.', 'Girl at the Pool', "setPersonFlag(\\'Donna\\',1);");
			else if (this.isCharmedBy()) addLinkToPlace(md, 'spend time with Donna', Place, 'type=enjoydonnasex');
		} else if (Place == 185 && this.isHere() && !isDay() && sType === "") {
			addLinkToPlace(md, 'enjoy Donna', Place, 'type=enjoydonnasex');
			this.addSleepLink(md, "go to bed for the night with Donna", "Sleeping with Donna",
				'<p style="position:absolute;left:4%;top:2em;cursor:pointer;font-size:1.1em;width:60%">' +
				'You jump into the bed followed by Donna. Raw, friends with benefits type of sex keeps you awake through most of the night. When Donna is exhausted she goes to take a shower, finnally letting you some well deserved sleep. Your bestie joins you in your rest, tugging in and hugging you from the back.',
				"bed.jpg", true, 124, '', 'In the morning you join your friend Donna for breakfast in the bar', "top:10%;left:5%;width:85%;height:80%;padding:0"
			);
		}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Hotel Pool

			if (Place == 269 && this.isHere()) {
				if (!this.isCharmedBy()) {
					// Donna (pool girl) is HERE
					if (!isSpellKnown("Shielded Charm") && wherePerson("Lauren") == 269) addComments('Don\'t cast the spell here. It is too public.');
					else CastCharmSpell("Donna", Place, 1, 'type=charmdonna1');
				} else addComments('You attempt to cast the spell, but if fizzles.');
				return "handled";
			}

			// Donna's room
			if (Place == 185) {
				if (this.isHere()) addComments("You have already <i>Charmed</i> Donna");
				else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
		}
		
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her.");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(7))) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=donnatransformbody' + this.dress.toLowerCase());
				return "nofooter";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (!this.isCharmedBy()) return false;
		if (msg) return true;
		return (isAtLocation(282) && perJade.isDanceAvailable());
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// All SMS's are post Charm for her
		if (isShopOpen(4, 0, true) && !this.checkFlag(3)) {
			var perJenny = findPerson("Jenny");
			if (perJenny.isCharmedBy("You") && Place != 196 && Place != 269 && Place != 185 && !(wherePerson("MissLogan") == 196 && getPersonOther("MissLogan") == 1)) {
				var nt = this.hoursCharmed();
				var jt = perJenny.hoursCharmed();
				if (nt > 48 && jt > 48) {
					// SMS 120 for restaurant event
					if (this.makeCall(true, 120)) this.setFlag(3);
				}
			}
		}
		if (this.checkFlag(6) && !this.checkFlag(4) && this.hoursSinceEvent() > (12 + Math.ceil(Math.random() * 6))) {
			// SMS 121 after restaurant event
			if (this.makeCall(true, 121)) {
				this.setFlag(4);
				this.extra[0] = nTime;
			}
		}
		if (this.checkFlag(4) && !this.checkFlag(5) && this.hoursSinceEvent() > (12 + Math.ceil(Math.random() * 6))) {
			// SMS 122 after last sms
			if (this.makeCall(true, 122)) {
				this.setFlag(5);
				this.extra[0] = nTime;
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 120: return receiveSMS('Donna', 'Hey there lover' + perYou.getSex() + '! Meet me at the restaurant for a good time…also wanted to talk to you. Ive seen this girl Jenny shes looking hot! Don\'t keep me waitin…xoxo');
			case 121: return receiveSMS('Donna', 'Boy that was fun!i like you soo much buddy;P.we have to repeat this again, a friendly get together, right? PS can I borrow Jenny for a while? I could use an ass like hers…:P') + replyToSMS(' sure thing; just don\'t break her…:DD');
			case 122: return receiveSMS('Donna', 'Jenny is great….shes helping around the house…:P I can understand why you\'re sooo fond of your slaves. Anyway, love u and keep safe…:)', 'donna-jenny sms.jpg', '88%');
		}
		return '';
	};	
	
	per.isSMSImageDressVersion = function() { return true; };
}
