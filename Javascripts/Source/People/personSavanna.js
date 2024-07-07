/***********************************************************************
Savanna
***********************************************************************/

function initialiseSavanna()
{
	// Savanna
	addPerson("Savanna", 0, "Savanna");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 3) return "Savanna, your political girlfriend";
		if (clv > 0) return "your Political Slut";
		return this.name;
	};
	
	per.getPersonAddress = function(n) { return this.isCharmedBy() ? n ? 493 : 'Apartment 40, 44 Celeste Rd' : n ? 0 : ''; };
	
	per.getPossessionFace = function() { return 'savanna-face' + (this.isCharmedBy() ? 'c' : 'u'); };	

	
	per.whereNow = function() {
		if (isShopOpen(2, 0, true)) return 102;
		if (isDay()) return 493;
		return 493;
	};
	
	per.showEventPopup = function()
	{
		// Introduction to Savanna, non-interview
		if (Place == 102 && !this.checkFlag(1) && sType === "") {
			this.setFlag(1);
			showPopupWindow("Meeting Savanna",
				this.addPersonString("sav0red.jpg", "height:max%", "right") +
				"You see Savanna in her office wearing a nice red dress, and she says</p>" +
				'<p>"Hello there ' + perYou.getMiss() + '?"</p>' +
				'<p>You introduce yourself and explain you are an aid of the Mayor\'s and friend of Angela and Emily. All essentially true, and Savanna says,</p>' +
				'<p>"Nice to meet you, I hope you can help me to fit in around here!" Thoughts of what to fit where cross your mind before you have a pleasant chat with her.</p>' +
				'<p>After a while you find she is a very friendly young woman, not quite submissive but very accommodating and agreeable!</p>'
			);
			return true;
		}
		
		return false;
	};

	per.showEvent = function()
	{
		var md, perEmily, clv;
		
		if (Place == 269) {
			if (sType == "savpool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Savanna");
				md.write(
					'<p>Savanna joins you wearing a lovely bikini and she poses for you, before jumping in the pool for a swim.</p>' +
					'<p>She asks after, "Did you want to do something else?"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Of course!"', Place, 'type=savpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Savanna', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "savpoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Savanna");
				md.write(
					'<p>You agree and your sexy intern seductively removes most of her bikini, ready for you for some more intimate games.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Savanna', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 99 && sType == "internsav") {
			// Intern Candidate (with Emily)
			md = WritePlaceHeader();

			this.showPersonAnon("savs.jpg");

			addPlaceTitle(md, "Setting up an Interview");

			md.write(
			  '<p>"Oh yes ' + perYou.getMaster() + '. We have actually already been looking for interns to bring into the fold. I have one all lined up. She is just waiting on a call to get an interview."  Emily pulls up a picture of the girl on her laptop but she does not make it easy to concentrate on it. She continues,</p>' +
			  '<p>"Her name is Savanna and she used to be an underwear model but she is trying to break into politics now. How silly!"</p>' +
			  '<p>Before you can reply she continues,<p>' +
			  '<p>"You will see she is wearing an inappropriate pink dress. If you want you could,<ul>' +
			  '<li><b>as was originally planned<b>, interview her and teach her how she should act here. If this is a bit <i>harassing</i>, I mean annoying you could instead,</b></li>' +
			  '<li><b>speak to her</b> in the small office I have allocated for her. I will first have her change into a more professional dress</b></li>' +
			  '</ul>Let me know your preference ' + perYou.getMaster() + '"</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'interview her', Place, 'type=interview1', 
				'You shake your head, "Agreed. That dumb slut should learn a lesson about how the world works.  Call her in for an interview that I will be conducting."</p>' +
				'<p>Emily replies, "Of course ' + perYou.getMaster() + '. Right away.</p>' +
				'<p>You tell her, "Thank you Emily."</p>'
			 );
			addLinkToPlace(md, 'talk to Savanna in her office', 102, '', '', '', "setPersonFlag('Savanna',4)");
			AddPeopleColumn(md);
			findPerson("Emily").showPerson("discuss.jpg");
			WritePlaceFooter(md);
			return true;
		}
	
		if (sType == "charmsav1slave") {
			// Charm Savanna 1 (Subordinate)
			md = WritePlaceHeader();

			this.showPerson("savred2.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			md.write(
				'<p>You cast the spell, "Dai Chu Savanna", you say and immediately Savanna sticks her chest forward to expose more cleavage and asks,</p>' +
				'<p>"Oh what did you do ' + perYou.getSir() + '?  I feel all tingly now."</p>' +
				'<p>You explain, "I am showing you what commanding a room feels like. Politics is all about being in control and bending others to your will."</p>' +
				'<p>She says, "Oh but I thought it was about serving the community and putting the needs of the many before your own."</p>' +
				'<p>You ask her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Explain further."', Place, 'type=charmsav2slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsav2slave") {
			// Charm Savanna 2 (Subordinate)
			md = WritePlaceHeader();

			this.showPerson("savred3.jpg");
			addPlaceTitle(md, "Savanna Being Enslaved By A Spell");

			md.write(
				'<p>You explain, "Well I won\'t deny that that is how it usually starts but the higher up you get the less you have to care about others.</p>' +
				'<p>The general public needs to be led. They need to be told what they want. That is the purpose of people like me. I have to keep the peace by making everyone submit to my will."</p>' +
				'<p>She asks, "But isn\'t there a long process for changing things like laws and stuff. I\'ve been doing some reading on the topic and...."</p>' +
				'<p>You interrupt, "Woah stop right there. You are learning from me now. Not some essay you found on the internet.  I\'ll show you how to control people and work your way to the top of the food chain."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'continue explaining', Place, 'type=charmsav3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsav3slave") {
			// Charm Savanna 3 (Subordinate)
			md = WritePlaceHeader();

			this.showPerson("savred4.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			md.write(
				'<p>You continue explaining, "People in power need subordinates to do all the menial tasks that are beneath them. That is why I hired you. That doesn\'t mean that you have to serve forever but it is how you have to start out."</p>' +
				'<p>She nods her head as the spell starts to shape her thoughts. She says thoughtfully, "That makes sense"</p>'
			);
			if (perYou.isMaleSex()) md.write('<p>"Good now one of the menial tasks that I require is having my balls drained every so often.  I don\'t do this myself because I am a busy man. I might have phone calls to make or legislation to sign so I need my hands free at all times."</p>');
			else md.write('<p>"Good now one of the menial tasks that I require is having my pussy pleasure every so often.  I don\'t do this myself because I am a busy woman. I might have phone calls to make or legislation to sign so I need my hands free at all times."</p>');
			md.write(
				'<p>The spell is making her more compliant than normal but you have a feeling that this line of logic would have worked on her either way.  Oh well. It never hurts to have someone on staff who can\'t say no.</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"Go ahead and ' + (perYou.isMaleSex() ? 'jack me off' : 'finger me') + '"', Place, 'type=charmsav4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsav4slave") {
			// Charm Savanna 4 (Subordinate)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("savred5b.jpg");
			else this.showPerson("savred5g.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Savanna kneels and takes out your hardening cock.</p>' +
					'<p>"Just get my cum out as quickly as possible. I can\'t be walking around with full balls while I meet the most influential members of society."</p>' +
					'<p>"Yes ' + perYou.getSir() + '" she says as she strokes your cock with one hand while she fondles your balls with the other.</p>' +
					'<p>You tell her "You have great technique. You will make yourself irreplaceable in no time."</p>'
				);
			} else {
				md.write(
					'<p>Savanna kneels as you remove your clothing, and you tell her,</p>' +
					'<p>"Just get me off as quickly as possible. I can\'t be walking around felling turned on like this while I meet the most influential members of society."</p>' +
					'<p>"Yes ' + perYou.getSir() + '" she says as she rubs your pussy and she starts to lick away.</p>' +
					'<p>You tell her, "You have great technique. You will make yourself irreplaceable in no time."</p>'
				);				
			}

			startQuestions();
			addLinkToPlace(md, perYou.isMaleSex() ? 'cum on her tits' : 'orgasm over her', Place, 'type=charmsav5slave');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmsav5slave") {
			// Charm Savanna 5 (Subordinate)
			md = WritePlaceHeader();
			this.showPerson("savred6.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			if (perYou.isMaleSex()) md.write('<p>Savanna jumps up and shimmies out of her clothes as fast as anyone you\'ve seen. She must not have wanted to get away from your cock. She must be the jealous type.</p>');
			else md.write('<p>Savanna jumps up and shimmies out of her clothes as fast as anyone you\'ve seen. She must not have wanted to get away from any of your fluids as you orgasm. She must be the jealous type.</p>');
			md.write(
				'<p>Savanna can\'t help but smile knowing that she did a good job, and you tell her</p>' +
				'<p>"All Right Savanna. Get back to your paperwork and I\'ll come back if I need you."</p>' +
				'<p>"Thank you so much ' + perYou.getSir() + '"</p>' +
				'<p>"No need to thank me. You earned it and will continue to earn it I\'m sure.  Oh and one more thing. When I visit your office I expect you to strike a more suitable pose that would be fitting of a subordinate. I\'m sure you won\'t have a problem with that."</p>' +
				'<p>She answers, "Yes ' + perYou.getSir() + ' and if you need me to work overtime I live at Celeste Apartments, call on me anytime"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsav1gf") {
			// Charm Savanna 1 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("savred2.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			md.write(
				'<p>You cast the spell, "Dai Chu Savanna", you say and immediately Savanna sticks her chest forward to expose more cleavage and asks,</p>' +
				'<p>"Oh what did you do ' + perYou.getPersonName() + '?  I feel all tingly now."</p>' +
				'<p>You say, "nothing, I stumbled over my words, I meant to say you are very cute and I have enjoyed talking to you. I really like you"</p>' +
				'<p>She blushes a bit and smiles, "I like you too, but you are the Mayor\'s aid and my superior here...". You shake your head, wanting to focus her on you and wanting you, not in being submissive to you. You tell her that you are friends of the Mayor and others here and just help out, you are not an employee here or her superior.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'suggest she relax', Place, 'type=charmsav2gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsav2gf") {
			// Charm Savanna 2 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("savred3gf.jpg");
			addPlaceTitle(md, "Savanna Being Seduced By A Spell");

			md.write(
				'<p>Savanna goes and sits on the couch in her small office and takes off her jacket as she did when you talked before. She smiles,</p>' +
				'<p>"It was getting rather hot in here, join me here? I do like you as well ' + perYou.getPersonName() + ' and as you are not my boss or something like that..." she trails off looking at you smiling. The spell definitely seems to be affecting her, but then again she is so agreeable!</p>' +
				'<p>You talk a little more about how cute she is and other lines, she has probably heard them all before, but the spell is helping to make her more receptive.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'ask if she has a ' + perYou.getSex() + 'friend?', Place, 'type=charmsav3gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsav3gf") {
			// Charm Savanna 3 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("officechatred1u.jpg");
			addPlaceTitle(md, "Savanna Under a Spell");

			md.write(
				'<p>Savanna looks a bit surprised but leans in, "Nobody important" Which probably means she was dating someone who is now gone from her mind.</p>' +
				'<p>You make it clear that you want her as your girlfriend, your lover and she nods her head in her semi-submissive way but she is smiling and clearly likes the idea.</p>' +
				'<p>You lean in and kiss her and she asks "I hope we will do a bit more than that..."</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"we certainly will"', Place, 'type=charmsav4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsav4gf") {
			// Charm Savanna 4 (Girlfriend)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("savred5b.jpg");
			else this.showPerson("savred5g.jpg");
			addPlaceTitle(md, "Savanna Your Enchanted Girlfriend");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Savanna kneels and takes out your hardening cock and she strokes it with one hand while she fondles your balls with the other.</p>'
				);
			} else {
				md.write(
					'<p>Savanna kneels as you remove your clothing, and she leans in and rubs your pussy and then starts to lick away.</p>'
				);				
			}
			md.write('<p>As she does she is frantically rubbing herself at times or humping against the couch. You try to get her to join you but she is determined to \'finish\' things this way.</p>');

			startQuestions();
			addLinkToPlace(md, perYou.isMaleSex() ? 'cum on her tits' : 'orgasm over her', Place, 'type=charmsav5gf');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmsav5gf") {
			// Charm Savanna 5 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("savred6.jpg");
			addPlaceTitle(md, "Savanna Your Enchanted Girlfriend");

			if (perYou.isMaleSex()) md.write('<p>Savanna jumps up and shimmies out of her clothes as fast as anyone you\'ve seen. She must not have wanted to get away from your cock. She must be the jealous type.</p>');
			else md.write('<p>Savanna jumps up and shimmies out of her clothes as fast as anyone you\'ve seen. She must not have wanted to get away from any of your fluids as you orgasm. She must be the jealous type.</p>');
			md.write(
				'<p>Savanna smiles, "If you want to hang out sometime I live at Celeste Apartments, call on me anytime I am not at work"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		

		if (sType == "performancereview") {
			// Savanna Performance Review
			md = WritePlaceHeader();

			this.showPerson("savcharm2.jpg");
			this.setFlag(3);
			this.charmThem(4);

			addPlaceTitle(md, "Savanna\'s Performance Review");

			md.write(
			  '<p>"Ok Savanna time for your performance review. I have good news for you. You have exceeded our expectations in the ball draining department. However your skills with paperwork are severely lacking so I propose a solution."</p>' +
			  '<p>"What is that ' + perYou.getSir() + '."</p>' +
			  '<p>"I have decided to promote you from intern to a full time employee of the office of the Mayor."</p>' +
			  '<p>"That is fantastic ' + perYou.getSir() + '. How does that help me with paperwork though."</p>' +
			  '<p>"Oh you won\'t have to do that anymore. Your new title is my personal cum slut. You will spend your work days waiting for me to drop in so that you can do whatever depraved things I can think of.</p>' +
			  '<p>"Erm.. Is that a promotion Sir?"</p>' +
			  '<p>"Well it\'s really more of a lateral move but I think you will enjoy it a lot more."</p>' +
			  '<p>"Why would I enjoy being a cum slut?"</p>' +
			  '<p>"Oh right.  That\'s because I will force you to like it." You say as you snap your fingers to transform her mind into your bimbo slut. "On the plus side, you can wear pink again.  It\'s actually encouraged in your new line of work."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'return to Reception.', 95);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "interview1") {
			// Savanna Interview 1
			md = WritePlaceHeader();
			this.setFlag(1);
			this.setFlag(2);

			this.showPerson("sav1.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
				"<p>Savanna enters the room in a bright pink outfit. You have no idea why she thought that was a good choice for politics.</p>" +
				'<p>"Hello there ' + perYou.getMiss() + '.... Oh I don\'t think Emily ever told me your name, she just said I would be meeting with the head of Intern Affairs."</p>' +
				'<p>Ahh that Emily is a clever one and you reply, "Yes that is correct. You can just call me ' + perYou.getSir() + ' for now."</p>' +
				'<p>She hesitates, "Erm. Ok I guess. Nice to meet you ' + perYou.getSir() + '."</p>' +
				'<p>You tell her, "You look nervous and quite frankly that pink outfit isn\'t doing you any favours. This is politics, not some sorority bake sale."</p>' +
				'<p>She apologises, "I.. I\'m Sorry ' + perYou.getSir() + '.  These were the most professional clothes I had."</p>' +
				'<p>You shake your head, "Really? No one will take you seriously in that."</p>' +
				'<p>She answers, "Okay well thanks for telling me ' + perYou.getSir() + '. I promise I\'ll do better next time if you just give me a chance. I am eager to learn and I\'ll do whatever you need me to do. I just need someone to teach me."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'teach her how the world works.', Place, 'type=interview2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "interview2") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav2.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
			  '<p>You tell her, "Well the first step is easy. You need to get rid of those pink clothes. Pink conveys weakness and submissiveness."</p>' +
			  '<p>She answer firmly, "Yes ' + perYou.getSir() + '. I won\'t wear this next time."</p>' +
			  '<p>You shake your head again, "Oh no my dear girl. You misunderstand. I mean get rid of them this instant!"</p>' +
			  '<p>She looks surprised, "But I don\'t have any other clothes with me."</p>' +
			  '<p>You tell her , "Well that is your fault isn\'t it. In the real world people have to deal with the consequences of their mistakes."</p>' +
			  '<p>She replies hesitantly, "I guess so ' + perYou.getSir() + '."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, '"Now get rid of it"', Place, 'type=interview3');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "interview3") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav3.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
			  '<p>Savanna begins removing her pink overshirt, and says,</p>' +
			  '<p>"Thank you again for teaching me ' + perYou.getSir() + '" and you reply,</p>' +
			  '<p>"As long as you are willing to take instruction and not talk back then I am happy to do it"</p>' +
			  '<p>She replies, "Of course ' + perYou.getSir() + '. I\'ll do whatever it takes to make it in politics."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, '"Good. Now get rid of all the pink"', Place, 'type=interview4');
			WritePlaceFooter(md);
			return true;
		}			
	
		if (sType == "interview4") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav4.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
			  '<p>Savanna strips off her skirt and is left with just her white button up and her underwear. You look at her and say,</p>' +
			  '<p>"So Savanna. I couldn\'t help but notice that your panties seem to be pink as well.  Is that true?"</p>' +
			  '<p>She answers, "Yes ' + perYou.getSir() + '. I\'m so sorry. I didn\'t know it was bad when I picked it out."</p>' +
			  '<p>You tell her, "Well go ahead and show me so I will know what to do about it."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'Savanna strips to her underwear', Place, 'type=interview5');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "interview5") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav5.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
			  '<p>You look at her and say, "Hmm yes this is not good. I won\'t make you remove it on your first day but you will need to be punished for it."</p>' +
			  '<p>She asks, "First Day?  Does that mean I get the internship?"</p>' +
			  '<p>You tell her, "Yes dear. You show an impressive willingness to learn so I\'m giving you the job."</p>' +
			  '<p>She looks happy, "Thank you ' + perYou.getSir() + '. You won\'t regret this."</p>' +
			  '<p>You tell her...</p>'
			 );

			startQuestions();
			addLinkToPlace(md, '"Now bend over the desk to receive your punishment"', Place, 'type=interview6');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "interview6") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav6.jpg");
			addPlaceTitle(md, "Savanna\'s Interview");

			md.write(
			  '<p>She asks uncertainly, "Umm are you going to spank me ' + perYou.getSir() + '?  Are you sure that\'s the punishment I deserve?"</p>' +
			  '<p>You reply, "Wow one minute with the job and already you are second guessing my decisions. I don\'t have time for this."</p>' +
			  '<p>She bends over and says, "Right ' + perYou.getSir() + '. Sorry ' + perYou.getSir() + '. Here. Here is my ass. Go ahead."</p>' +
			  '<p>You tell her, "That\'s better."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'spank her.', Place, 'type=interview7');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "interview7") {
			// Savanna Interview
			md = WritePlaceHeader();

			this.showPerson("sav7.jpg");
			addPlaceTitle(md, "Savanna\'s Interview finished");

			md.write(
			  '<p>You spend a few minutes spanking and groping Savanna\'s ass.  It is amazing that you have been able to go this far without even using the charm spell. She is very agreeable, almost submissive.</p>' +
			  '<p>You tell herm "All done now. See that wasn\'t so bad and you have learned from your mistakes more effectively now."</p>' +
			  '<p>She replies, "Thank you ' + perYou.getSir() + '."</p>' +
			  '<p>You finally tell her, "All right. That\'s enough for the interview. You can go to your office now and get started. I\'m sure Emily has something for you to do. Oh and get some more suitable clothing."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'return to Emily', 99);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savrelax") {
			// Relax (Girlfriend)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("savhj2.jpg");
				else this.showPerson("savred5b.jpg");
			} else this.showPerson("savlick2.jpg");
			addPlaceTitle(md, "Relaxing!");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Savanna is very helpful in helping you to relax and relieve your self into her mouth.</p' +
					'<p>After she returns to work and suggests she will have all the time for you at home tonight!</p>'
				);
			} else {
				md.write(
					'<p>Savanna is happy to give you a comforting tongue massage.</p' +
					'<p>After she returns to work and suggests she will have all the time for you at home tonight!</p>'
				);				
			}

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "savoralduty") {
			// Ball/Pussy Duty
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("savhj2.jpg");
				else this.showPerson("savred5b.jpg");
			} else this.showPerson("savlick2.jpg");
			addPlaceTitle(md, "Nice work");
			
			md.write('<p>"Keep working hard and a promotion is coming your way."</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savslaveoralduty") {
			// BJ/Lick in the office
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("sav4ball.jpg");
				else this.showPerson("savred5b.jpg");
			} else this.showPersonRorX("sav4lick.jpg");
			addPlaceTitle(md, perYou.isMaleSex() ? "Expertly handled" : "Expertly done");
			
			md.write('<p>"We may have found your true calling."</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savslavefuckduty") {
			// Fuck in the office
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("sav4deskb.jpg");
			else this.showPerson("sav4trib.jpg");
			addPlaceTitle(md, perYou.isMaleSex() ? "Those tits!" : "I love a mobile employee");
			
			if (perYou.isMaleSex()) md.write('<p>Those tits are like stress balls.</p>');
			else md.write('<p>"Aren\'t you glad we got rid of your other duties?"</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "savslavedeepduty") {
			// Deep throat in the office
			md = WritePlaceHeader();

			this.showPersonRorX("sav4deep.jpg");
			addPlaceTitle(md, "I love a focused employee");
			
			md.write('<p>"Aren\'t you glad we got rid of your other duties?"</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savslaverideduty") {
			// Ride in the office
			md = WritePlaceHeader();

			this.showPerson("sav4rideb.jpg");
			addPlaceTitle(md, "Bounce!");
			
			md.write('<p>She\'s an energetic one for sure.</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savoralhome") {
			// Blowjob/lick at her home
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();

			if (clv == 4) this.showPersonX("savbj4.jpg");
			else if (perYou.isMaleSex()) this.showPersonRandomRorX("savbj3", 2);
			else this.showPersonRorX("savlick2.jpg");

			addPlaceTitle(md, clv == 4 ? "Good Bitch.": "Oral pleasure from your girlfriend");
			
			if (clv == 4) md.write('<p>Much better than a hand job.</p>');
			else md.write('<p>You enjoy the oral attention of your enchanted girlfriend.</p>');

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savthroathome") {
			// Throat fuck at her home
			md = WritePlaceHeader();
			this.showPersonX("sav4throat.jpg");

			addPlaceTitle(md, "Don't Move.");
			
			md.write(
				'<p>I\'m hitting bottom here. I\'ll have to get her more practice opening her throat.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "savfuckhome") {
			// Fuck at her home
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("savhome-fuck", 2);
			else this.showPerson("savhome-trib.jpg");

			addPlaceTitle(md, "Fucking your girlfriend");
			
			md.write(
				'<p>You make love with your enchanted girlfriend.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "savtitfuckhome") {
			// Tit-Fuck at her home
			md = WritePlaceHeader();
			this.showPersonRandomRorX("savhome-tf", isExplicit() ? 2 : 1);

			addPlaceTitle(md, "Tit-fucking Savanna");
			
			md.write(
				'<p>You fuck Savanna\'s tits.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "sav69home") {
			// 69 at her home
			md = WritePlaceHeader();
			this.showPerson("savhome-69.jpg");

			addPlaceTitle(md, "The Best Number");
			
			md.write(
				'<p>You enjoy a 69 with Savanna</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'talk more with her', Place);
			WritePlaceFooter(md);
			return true;
		}			

		if (sType == "endgame1savanna") {
			// End Game - Savanna as Girlfriend
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Interns?");

			md.write(
				'<p>One day you visit Savanna at home and you see she has been learning from Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};
	
	per.showPersonChat = function(md)
	{
		if (sType !== "") return;
		
		var bGF, clvS;
		if (Place == 490 && this.isCharmedBy()) {
			addLinkToPlace(md, 'visit Savanna\'s apartment', 493);
			return;
		}
		if (Place == 102 && this.isHere()) {
			// In her office
			bGF = this.checkFlag(4);
			clvS = this.getCharmedLevel();
			if (bGF) {
				if (this.hoursSince() > 12) {
					addPopupLinkC(md, 'chat with Savanna', "Chatting",
						this.addPersonString("officechatred1" + (clvS > 0 ? "c" : "u") + ".jpg", "height:max%", "rightpopup") +
						'You spend a while chatting to Savanna, and as you do she removes her jacket and listens to you very intently.</p>' +
						'<p>She almost hangs on your every word, you are unsure if it is she likes you, or she is very attentive, and borderline submissive. After all you are the aid of the Mayor as far as she has been told.',
						true, "findPerson('Savanna').other=nTime;dispPlace()"
					);
					if (clvS > 0) addTextForQuestions(md, "You probably should not take her away from her work, too much..");

				} else if (clvS === 0) addLinkToPlace(md, 'chat with Savanna', Place, '', 'You should not bother her again, she has to get her work done after all');
				if (clvS > 0) addLinkToPlace(md, 'ask her to help you relax', Place, 'type=savrelax');

			} else {
				// Subordinate/Slave
				if (clvS == 2) {
					// Subordinate
					addLinkToPlace(md, perYou.isMaleSex() ? 'put Savanna on ball drain duty' : 'put Savanna on pussy licking duty', Place, 'type=savoralduty');
					if (!this.checkFlag(3) && this.hoursCharmed() >= 48) addLinkToPlace(md, "performance review time", Place, 'type=performancereview');
					
				} else if (clvS == 4) {
					// Slave
					addLinkToPlace(md, perYou.isMaleSex() ? '"Suck my balls"' : '"Lick me"', Place, 'type=savslaveoralduty');
					addLinkToPlaceC(md, perYou.isMaleSex() ? 'fuck her on the desk' : '"Fuck me"', Place, 'type=savslavefuckduty');

					if (perYou.isMaleSex()) {
						addLinkToPlace(md, '"Deepthroat me"', Place, 'type=savslavedeepduty');
						addLinkToPlaceC(md, 'have her ride you on the couch', Place, 'type=savslaverideduty');
					}
				}
			}
		}
		
		if (Place == 493 && this.isHere()) {
			// At her apartment
			clvS = this.getCharmedLevel();
			if (clvS == 4) {
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'have her suck your cock', Place, 'type=savoralhome');
					addLinkToPlace(md, 'fuck her throat', Place, 'type=savthroathome');
				} else {
					addLinkToPlace(md, '"Lick me"', Place, 'type=savslaveoralduty');
					addLinkToPlace(md, '"Fuck me"', Place, 'type=savslavefuckduty');
				}
				
			} else if (clvS == 3) {
				// Girlfriend
				addLinkToPlaceC(md, 'make love to her', Place, 'type=savfuckhome');
				addLinkToPlaceC(md, 'ask her ' + (perYou.isMaleSex() ? "for a blowjob" : "to lick you"), Place, 'type=savoralhome');
				if (perYou.isMaleSex()) addLinkToPlaceC(md, 'fuck Savanna\'s tits', Place, 'type=savtitfuckhome');				
				else addLinkToPlaceC(md, 'enjoy a 69 with Savanna', Place, 'type=sav69home');
				
			}
			if (clvS != 2) {
				this.addSleepLink(md, "sleep here for the night", clvS == 4 ? "Talk about Overtime" : 'Sleep-over with Savanna',
					'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>' +
					(clvS == 4 ? 'Well there would be overtime if she actually got paid to do this.' : 'Savanna is happy for you to spend the night and goes out of her way to make you feel welcome') + '</b>',
					'bed' + clvS + '.jpg', true
				);
			}
		}
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1savanna" : "";
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Savanna\'s Office
			if (Place == 102 && this.isHere()) {
				if (this.checkFlag(4) && this.other == 0) {
					addComments("You should try talking to her first");
					return "handled";
				}
				CastCharmSpell("Savanna", Place, this.checkFlag(4) ? 3 : 2, this.checkFlag(4) ? 'type=charmsav1gf' : 'type=charmsav1slave'); // CHARM Savanna (Political Slut), slave level
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (this.getCharmedLevel() != 3) return false;
		if (msg) return true;
		// Poledance
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;
		// Pool
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=savpool');
			receiveCall('', 'You call Savanna to invite her to join you at the pool for a swim, and she answers, "I\'d love to, I\'ll be there soon".');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(5) && this.getCharmedLevel() == 3 && !this.isHere() && isNight() && this.hoursCharmed() > 24) {
			if (this.makeCall(true, 365)) this.setFlag(5);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 365) return receiveSMS('Savanna', 'Just washing and getting ready for bed, I miss you', 'sms1.jpg');
		return '';
	};

	
}