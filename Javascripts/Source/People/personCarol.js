/***********************************************************************************************************
Carol
/***************** Initialise ******************************************************************************/

function initialiseCarol()
{
	// Carol
	addPerson("Carol", 420, "Carol", "Carol");
	
	per.getPersonName = function(full) {
		if (full !== true) {
			var clv = this.getCharmedLevel();
			if (clv > 0) {
				if (clv == 2) return "playful Carol";
				if (clv == 4) return "Slave Carol";
				return "Carol";
			}
		}
		return "Carol Bartel";
	};
	per.getPersonAddress = function(n) { return this.checkFlag(1) ? n ? 420 : '12 Dervish Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "carol-facec" : "carol-faceu"; };
	
	per.getModels = function() { return "Carol|Carol Goldnerova,Summer|Summer Brielle"; };

	per.whereNow = function() {
		if (Place == 424) return Place;
		return this.place;
	};

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (Place == 420 && this.isCharmedBy() && isCharmedBy("Ellie")) {
			return this.addPeopleString(findPerson("Ellie"), "carolellie1a.jpg", "height:max%", "right") +
				"Carol and Ellie Bartel, the beautiful mother and daughter, are now yours.";
		} else {
			if (this.isCharmedBy()) {
				return this.addPersonString("carol1d-day.jpg", "height:max%", "right") +
					"Carol turned out to be quite energetic, to say at least. You rarely can get her to sit still for a while without her trying to strike up a conversation or do something silly to amuse you, and by now, you have pretty much stopped trying.<br><br>" +
					"She is obedient to you in a very playful manner, tending to your needs when you visit as nether a submissive slave nor devoted lover, but as a great companion always ready to have Sex. Fun, lighthearted and rather inventive Sex, often involving Kristin and/or, her rather large collection of Sextoys, and occasionally lasting through the entire night.<br><br>" +
					"You have begun to mediate between her and Ellie to get the two to fix their strained relationship, and so far, the “bonding exercises” you thought up bear great fruits... with a little magical help.<br><br>" +
					"The only thing keeping her from devoting herself to you fully is the thought of her wife, who, as Carol in varying degrees of subtlety often hints at, would apparently be a great asset to your harem as well.<br><br>" +
					"Once she bothers to return home, that is...<br><br>";
			}
			return this.addPersonString("carol1d-day.jpg", "height:max%", "right") +
				"Carol Bartel is... not what you expected her to be.<br><br>" +
				"Ellie\'s mother looks like she had fallen straight out of a magazine cover: Tall and blonde with a perfectly shaped figure, large natural breasts and wearing clothes that cover just enough to not seem cheap while leaving plenty for people to look at... and speaking of:<br><br>" +
				"She definitely notices the way you look at her and doesn't seem to mind at all, greeting you with a warm smile and a faint accent in her voice that you would place somewhere into Slavic or Russian territories.";
		}
	};
	
	per.passTimeDay = function() {
		this.setFlag(4, false);
		return '';
	};
	
	per.showEventPopup = function()
	{
		// Initial meeting in the teachers lounge
		if (Place == 420 && !this.checkFlag(1) && this.dress === "") {
			this.pickModel("As you approach the door you remember once seeing Ellie\'s mother in the distance. Was she...", "carol1a-day", "Carol", "Summer", "blonde and buxom", "buxom and blonde", '', "Ellie\'s Mother");
			return true;
		}
		
		// Transforming
		if (sType == "caroltransformbodycarol") {
			CastTransform(1);
			this.setFlag(14);
			this.dress = "Summer";	
			showPopupWindow("Transformed",
				this.addPersonStringDN("carol2.jpg", "height:max%", "right") +
				'Carol\'s body starts to subtly change, filling out and becoming rounder, and her breast growing. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still Carol, still your playful milf and the same person she was before',
				'dispPlace()'
			);
			return true;
		}	
		if (sType == "caroltransformbodysummer") {
			CastTransform(1);
			this.setFlag(14);
			this.dress = "Carol";
			showPopupWindow("Transformed",
				this.addPersonString("carol2.jpg", "height:max%", "right") +
				'Carol\'s body starts to subtly change, filling out and becoming rounder, and her breast growing. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still Carol, still your playful milf and the same person she was before',
				'dispPlace()'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, idx, sw, perEllie;
		
		if (Place == 420 && sType == "carolrecharm") {
			// Recharm Lola
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Carol Under a Charm Spell Again");

			if (this.getCharmedLevel() == 4) {
				this.charmThem(2);
				md.write(
					'<p>You tell Lola, "Gina told me about how beautiful you are and I can see she did not exaggerate."</p>' +
					'<p>You continue flattering her and then notice the spell is taking effect and she is becoming aroused at your words.</p>'
				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>You tell Lola, "I have come to discuss primal man and his desire for power. You have studied primitive cultures before. Right?"</p>' +
					'<p>She answers shortly, "Yes of course. My speciality is the Paleolithic era."</p>'
				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Carol', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 423 && sType == "carolpool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			var ab = Math.random() < 0.5 ? "a" : "b";
			this.showPerson("carol-pool" + ab + ".jpg");
			addPlaceTitle(md, "Pool-side with Carol");
			md.write(
				'<p>Carol changes in to her bikini and sits on a recliner at the pool-side, looking beautiful and sexy. She comments how they often entertain guests here. While she does not quite say it, you get the impression she plays the beautiful hostess but that the guests were seldom her friends.</p>' +
				'<p>You take her mind of her thoughts with a kiss and then insist she join you for a playful swim.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is private here...', Place, 'type=carolpoolsex&ab=' + ab);
			addLinkToPlaceC(md, 'leave the pool', 420);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 423 && sType == "carolpoolsex") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			var ab = getQueryParam("ab");
			this.showPerson("carol-pool-sex" + ab + ".jpg");
			addPlaceTitle(md, "Pool-play with Carol");
			md.write(
				'<p>You suggest something more than just a swim and she embraces you for some "naughty" times.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave the pool', 420);
			WritePlaceFooter(md);
			return true;
		}

		
		if (Place == 424) {
			sw = perYou.isMaleSex() ? "Volkhov" : "Vedma";
			var herName = capitalize(this.getPersonName());

			if (sType == "carolfuck") {
				// Fuck her
				if (isExplicit()) {
					md = WritePlaceHeader();
					if (perYou.isMaleSex()) this.showPersonRandomX("carol9b", 6);
					else this.showPersonRandomX("carol7g", 2);
				} else {
					idx = Math.floor(Math.random() * 2);
					md = WritePlaceHeader();
					if (perYou.isMaleSex()) this.showPersonRandom("carol7b", 2);
					else this.showPersonRandom("carol7g", 2);
				}

				addPlaceTitle(md, herName);

				md.write(
					'<p>You take a translucent pink dildo you find close to the door and curiously spin it in your fingers while an idea begins to form in your mind.</p>' +
					'<p>“I think we will use this one today.” Carol crawls closer to the edge of the bed and you watch as her tongue begins to playfully cover the toys entire length in her saliva.</p>' +
					'<p>“An excellent choice.” She assures you with a wide grin, her eyes focusing on you. “And just what would you compel me do today, my naughty ' + sw + '?”</p>' +
					'<p>You order her to turn around onto her back bend both her legs back and, as always, you are impressed by her flexibility as she holds them both in place easily with a smug grin on her lips.</p>' +
					'<p>You trace the toy over her exposed folds teasingly, luring an impatient purr from her lips before pushing it in and, one quickly applied dose of lube later, following up by pressing your cock into her rear.</p>' +
					'<p>Carol moans in approval, her eyes focused on you as you begin to grind your hip against her body, enjoying her tightness, and even more the increasingly lustful noises every stroke lures form her lips. Soon, you feel barely able to hold back and lean forward to press both hands firmly against her ankles. You focus on the spell binding her to you, increasing her sensitivity and arousal by the second until she seems barely able to think straight under your continued assault. Finally, feeling your own climax approach, you order her to cum together with you, hammering the words into her mind until you both share an intense orgasm.</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Carol', 424);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;
			} 

			if (sType == "caroltitfuck") {
				// Tit-Fuck her
				md = WritePlaceHeader();
				if (!perYou.isMaleSex()) this.showPerson("carol-tfg.jpg");
				else this.showPersonRandomRorX("carol-tf", isExplicit() ? 2 : 1);

				addPlaceTitle(md, 'Enchanting ' + herName + "'s Tits");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You play along and tell Carol you are going to compel her to do a naughty thing, that you will make her use her breasts on your cock. She smiles,</p>' +
						'<p>"Very naughty my ' + perYou.getWitch(false, true) + '! How can I resist your powers, I must let you do this thing", and she bares her breasts and sits back ready for you.</p>' +
						'<p>You remove your pants and step over and straddle her so you can put your cock between her large breasts. As you do Carol says in a rather theatrical way,</p>' +
						'<p>"Oh you dirty ' + perYou.getWitch(false, true) + ', I will have to defeat you and make your wand of power discharge harmlessly over my titties!". She is completely correct, and she did make you discharge all over her breasts!</p>'
					);
				} else {
					md.write(
						'<p>You play along and tell Carol you are going to compel her to do a naughty thing, and you put on your strap-on and gesture to her breasts in an exaggerated \'magic\' wave. Carol smiles and collapses back in a theatrical way, saying,</p>' +
						'<p>"Very naughty my ' + perYou.getWitch(false, true) + '! How can I resist your powers, my breasts are yours to defile with that toy", and she bares her breasts.</p>' +
						'<p>You step over and straddle her so you can put your plastic cock between her large breasts. As you do Carol says in a rather theatrical way,</p>' +
						'<p>"Oh you dirty ' + perYou.getWitch(false, true) + ', I will have to defeat you and make your wand of power discharge harmlessly over my titties!". If your strap-on was real it certainly would of discharged, but instead both of you discharge in a different way!</p>'
					);
				}

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Carol', 424);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;
			} 

			if (sType == "carolbj") {
				// Blowjob/Lick
				md = WritePlaceHeader();
				if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("carol6b", 4);
					else this.showPersonRandomX("carol6g", 4);
				} else {
					if (perYou.isMaleSex()) this.showPerson("carol6b.jpg");
					else this.showPerson("carol6g.jpg");
				}

				addPlaceTitle(md, "'Enchanting' " + herName + "'s mouth");

				md.write(
					'<p>You play along with Carol\'s game, that you are a ' + perYou.getWitch(false, true) + ' who is enchanting her to do naughty things. Then again, isn\'t it true? You put that thought aside and return your attention back to the beautiful Carol.</p>' +
					'<p>You tell Carol that your magic is compelling her to be naughty and she feels the need to pleasure you with her mouth. She smiles and replies,</p>'
				);

				if (perYou.isMaleSex()) {
					md.write(
						'<p>"Very naughty, making me do this thing I almost never do, but your magic is making me want to do this". As she speaks you start to remove your pants, and Carol kneels down in front of you.</p>' +
						'<p>"Such a large, powerful wand, it compels me to lick it, and take it into my mouth" and with that she starts to lick your hardening shaft. She takes your now hard cock into her mouth. She is certainly not that experienced at this, but then again she prefers women sexually. She is skilled enough with her attentions to your \'wand\' until your reach your peak and \'cast\' all over her face.</p>'
					);
				} else {
					md.write(
						'<p>"Naughty that you compel me to do something so nice and familiar. Your magic makes me want to do this to the powerful ' + perYou.getWitch(false, true) + '". As she speaks you start to remove your clothes and Carol moves over and kisses you, moving lower and lower.</p>' +
						'<p>Carol is very experienced at pleasuring another woman and she expertly and passionately licks and sucks your pussy until you orgasm on her face.</p>'
					);
				}
				md.write('<p>Carol smiles, "I am sure you will compel me to do many more naughty things", and you agree.</p>');

				// Questions
				startQuestions();
				addLinkToPlaceC(md, '\'compel\' Carol to do more', 424);
				addLinkToPlace(md, 'leave the house', 5);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 422) {
			perEllie = findPerson("Ellie");
			var herName = perEllie.getPersonName();
			sw = perYou.isMaleSex() ? "volkhov" : "vedma";
			var clvE = perEllie.isCharmedBy() ? perEllie.getCharmedLevel() : 0;
			
			if (sType == "seecarol") {				
				md = WritePlaceHeader(true);
				md.write('<table class="table-main"><tr><td>');
				addPlaceTitle(md, "Carol Visits", '', 0, true);
				this.showPersonDN("carol1c.jpg", "60%", "center");
				perEllie.setFlag(4);
				md.write(
					'<p>Your ' + (clvE == 4 ? 'slave' : 'lover') + ' steps over to a door and asks, "Mom, do you have a moment to meet someone?"</p>' +
					'<p>Her mother Carol steps into the room a few minutes later, giving Ellie a smile as she takes a seat and stretching out with her legs up on a counter top. She looks at you with the broad smile that seems to be characteristic of the women of this family, well, that and a surprising turn of speed at times.</p>' +
					'<p>Carol says, "Well, it is the ' + perYou.getSex() + ' from the Bank, is it not? Are you and Ellie an item now? I hope so, her last boyfriend was creepy!”</p>'
				);
				if (clvE == 4) {
					md.write(
						'<p>Ellie exclaims, "Mom...what do you mean, my last boyfriend...? ' + perYou.getPersonName() + ' is not my lover, but my ' + perYou.getMaster() + '"</p>' +
						'<p>Carol lifts her eyebrows at that statement and just says "Kinky, I like!"</p>'
					);
				} else {
					md.write('<p>Ellie exclaims, "Mom... I... don\'t really like to think about my last Boyfriend, but I do love ' + perYou.getPersonName() + ' dearly, it was love at first sight."</p>');
					if (!perYou.isBornMale()) md.write('<p>Carol looks a little surprised, "Strange, my Ellie has never liked girls that way before, you must have a special way about you?</p>');
				}
				md.write('<p>Carol continues, "So tell me about yourself!"</p>');

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'talk about yourself', 422, '','You have a pleasant chat with Carol and after a while she apologies and tells you she has an appointment and has to leave, she smiles and leaves you and ' + herName + ' alone.');
				// Questions
				startQuestions();

				addLinkToPlace(md, 'leave the house', 5);

				AddPeopleColumn();
				perEllie.showPerson("ellie17.jpg", "100%");
				WritePlaceFooter(md);
				return true;
			}
			
			/*
					if (stype === "carol2") {
			// Carol Charmed 1
			md.write(
				'<p>First things first. You bind her so she cannot resist you. Then you tell her,</p>' +
				'<p>"I am a Harem master and you are going to be my latest conquest."<br>' +
				'She gently laughs, and continues in amusement, "So my little ' + sw + ' You think you are one of the big boys now eh?  Ropes or not I doubt you could even get me to get your mail for you."</p>' +
				'<p>You tell her "Well bondage does have its limitations but thats why I also have this..."</p>' +
				'<p>You concentrate your powers and force your charm spell to spread throughout her body.</p>' +
				'<p>"That power...Its like Svarog is here...You cannot possibly posess such power...."</p>' +
				'<p>"Shut up bitch. I dont care about all that old school bullshit. Im into the here and now and right now Ive got a big titted bitch to break.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'Change her bondage and gag her properly."', 422, 'type=carol3');

		} else if (stype === "carol3") {
			// Carol Charmed 2
			md.write(
				'<p>"Now how do I want to break you in."</p>' +
				'<p>"mmmmfffmfm mfmfmfrrrnn"</p>' +
				'<p>"Good idea. Ill make you cum so hard that you lose some brain cells."</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'Make her situation...better', 422, 'type=carol4');

		} else if (stype === "carol4") {
			// Carol Charmed 3
			perCarol.charmThem(2);
			md.write(
				'<p>You bind her in a helpless position and use various devices on her cunt. All of which are cranked to max settings of course,</p>' +
				'<p>She cums multiple times. You stopped counting around 7 or so.</p>'
			);

			if (isExplicit()) md.write('<p>  Now what should you do to her First.</p>');
			else md.write('<p> Now what should you do to her first.</p>');

			md.write('<p>You remove her gag and she weakly asks. "What now Master?"</p>');

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'Face Fucking of course', 422, 'type=carol5');

		} else if (stype === "carol5") {
			// Carol Charmed 4
			md.write(
				'<p>You rebind her in a good face fucking position and go to town on her mouth.</p>'
			);

			if (isExplicit()) md.write('<p>Carol coughs and gags periodically but you do not slow down until you cum deep into her throat.</p>');
			else md.write('<p>Carol coughs and gags periodically but you do not slow down until you cum deep into her throat.</p>');

			md.write(
				'<p>Now that ought to show you who your master truly is. Get used to this cock, slave. You are going to be best friends with it before long.</p>'
			);
			*/
			
			if (sType === "carol2") {
				// Carol Charmed 1
				md = WritePlaceHeader();
				this.showPersonDN(sType + ".jpg");
				addPlaceTitle(md, "Carol Under a Charm Spell");
				md.write(
					'<p>You tell Carol about your search for the Kurndorf book and the secrets of magic it contains, she smiles and tells you,</p>' +
					'<p>"You want to be be a ' + sw + ' from the old tales, a spinner of potions and spells, a talker to the vampir and wolf-skin\'s."<br>' +
					'She gently laughs, and continues in amusement, "So my little ' + sw + ' what have you found?"</p>' +
					'<p>You tell her "Here is one thing" and recite the charm spell, the sudden rush of mana entering her body taking Carol completely of guard. "Strange words those..."</p>' +
					'<p>She stands and stretches, her breasts slipping out of her tight top, she pays no attention as the spell work itself into her mind, looking around for a moment before she comments,</p>' +
					'<p>"So strange, like Svarog is here...it is so hot and I feel the pounding of his hammers...."</p>' +
					'<p>Carol grabs her short skirt and waves it around to cool her growing passions, but all she achieves is to show you her ' + (isDay() ? 'red' : 'black') + ' underwear.</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'ask her "Who is Svarog"', 422, 'type=carol3');
				AddPeopleColumn();
				perEllie.showPerson("ellie17.jpg", "100%");				
				WritePlaceFooter(md);
				return true;
				
			} else if (sType === "carol3") {
				// Carol Charmed 2
				md = WritePlaceHeader();
				this.showPersonDN(sType + ".jpg");
				addPlaceTitle(md, "Carol Under a Charm Spell");				
				md.write(
					'<p>You ask about the name Svarog. You think you have heard the name in mythology but cannot place it. Also, this helps to keep her mind off what is happening to her for a while.</p>' +
					'<p>"Svarog, the smith of the sky forge some say.", Her voice trails off and she continues speaking in some Slavic language until she realizes it and stops. You decide to take advantage of her confusion,</p>' +
					'<p>"If you are so hot, you should make yourself comfortable"</p>' +
					'<p>Carol removes her skirt and slides her top up further. You notice her ' + (isDay() ? 'red' : 'black') + ' panties start to slip down as well. She may have pulled them down as she removed her skirt, but your attention was focused at the time on her lovely breasts. Carol looks at you, a smile re-forming on her face,</p>' +
					'<p>"Naughty ' + sw + ' aren\'t you"</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'answer "Yes I am a ' + sw + '"', 422, 'type=carol4');
				AddPeopleColumn();
				perEllie.showPerson("ellie17.jpg", "100%");				
				WritePlaceFooter(md);
				return true;
				
			} else if (sType === "carol4") {
				// Carol Charmed 3
				md = WritePlaceHeader();
				this.showPersonRorXDN(sType + ".jpg");
				addPlaceTitle(md, "Carol Under a Charm Spell");
				this.charmThem(2);
				md.write(
					'<p>You tell her "Yes I am a ' + sw + ', and you are under my spell"</p>' +
					'<p>Carol laughs, "Yes, I am enchanted by you, naughty little ' + sw + '"</p>' +
					'<p>She is just playing along with a game but not realizing how close to the actual truth she is, so you continue to play along as well, speaking in a playful manner, but never straying from the absolute truth,</p>' +
					'<p>"You are ensorcelled by me!” You lay it on thick. “A slave to my spell! And you want to do something naughty for me now."</p>'
				);

				if (isExplicit()) md.write('<p>Carol removes her panties, and while she does, Ellie hands her mother a transparent plastic item. Svarog only knows how she got it so fast, but Carol eagerly puts it to her lips and you see it is a narrow dildo. Carol begins licking playfully with surprising experience, eager to delight and arouse you.</p>');
				else md.write('<p>Carol sits down and removes her panties, as she does Ellie rearranges a chair so Carol can put her legs up. Carol spreads her legs giving you a clear view of her pussy, touching it as you watch.</p>');

				md.write('<p>Carol asks "Naughty enough, little ' + sw + '</p>');

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'of course you answer "No"', 422, 'type=carol5');
				AddPeopleColumn();
				perEllie.showPerson("ellie17.jpg", "100%");				
				WritePlaceFooter(md);
				return true;
				
			} else if (sType === "carol5") {
				// Carol Charmed 4
				md = WritePlaceHeader();
				this.showPersonRorXDN(sType + ".jpg");
				addPlaceTitle(md, "Carol Under a Charm Spell");
				md.write(
					'<p>"No!” Your voice booms. “My spell commands you to do more!"</p>' +
					'<p>Carol laughs gently at your true words, and it is difficult to say how much it is the spell which is controlling her, or the game she thinks she is playing. In some ways it does not matter as long as she does not stop playing, and the spell should ensure to make it that way.</p>'
				);

				if (isExplicit()) md.write('<p>Carol now uses the dildo to tease her pussy, but quickly begins to do more, pushing it into her feverishly to fuck herself until she finally cries out "I cum for my little ' + sw + '!"</p>');
				else md.write('<p>Carol plays more with per pussy and ass and after a while moves and actively starts masturbating herself. After a while she cries out "I cum for my little ' + sw + '!"</p>');

				md.write(
					'<p>“Yes!” You again lay on the ham. “Cum for me! Cum and the Spell will be completed to bind you to my will! And when it is, we will play these games more often!"</p>' +
					'<p>Once again speaking the truth within the game, Carol is finally driven over the edge with a loud scream and falls back to bask in the afterglow, her now pink eyes focus on you adoringly as she replies: "Yes, we should play again.” Once more giving you a broad smile.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "talk more with Carol and Ellie", 420);
				addLinkToPlace(md, 'leave the house', 5);
				AddPeopleColumn();
				perEllie.showPerson("ellie17.jpg", "100%");
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 420) return false;		
			
		perEllie = findPerson("Ellie");
		var perKristin = findPerson("Kristin");
		
		if (sType == "elliecarolthreesome") {
			if (isExplicit()) {
				var id3 = Math.random() < 0.33;
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) {
					if (id3) this.showPeopleX(perEllie, "carolellie3bc.jpg");
					else this.showPeopleRandomX(perEllie, "carolellie3b", 2);
				} else this.showPersonRandomX("carolellie3g", 3);
			} else {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPeopleRandom(perEllie, "carolellie3b", 2);
				else this.showPeopleRandom(perEllie, "carolellie3g", 2);
			}
			addPlaceTitle(md, "Playing together with the Bartel\'s");
			md.write(
				'<p>You invite Carol and Ellie to join you in the bedroom to live out the mother/daughter threesome fantasy.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'mother daughter time', 420, 'type=elliecaromotherdaughter');
			addLinkToPlace(md, "return to the living room", 420);
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elliecaromotherdaughter") {
			md = WritePlaceHeader();
			this.showPeopleRandom(perEllie, "carolellie2", 5);
			addPlaceTitle(md, "Mother/Daughter Bonding");
			md.write(
				'<p>You invite Carol and Ellie to join you in the bedroom, but tell them to get closer to each other, and play together. Ellie looks a little reluctant, but Carol embraces her with enthusiasm and a smile on her face.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'let us play together', 420, 'type=elliecarolthreesome');
			addLinkToPlace(md, "return to the living room", 420);
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;			
		} 
		
		if (sType == "bank") {
			md = WritePlaceHeader();
			this.showPersonDN("carol1b.jpg");
			addPlaceTitle(md, "Bartel Home");

			md.write(
				'<p>You tell her that you are here from the Bank and need to check some information with Ellie. Carol Bartel answers,</p>' +
				'<p>"My daughter is popular lately."<br/>' +
				'She giggles and then says<br/>' +
				'"Creepy new boyfriends aside, I been told there some funny things happening in town recently. I will call Kristin and check you do work for her"<br/>' +
				'<p>She takes out her mobile phone and makes a call,<br/>' +
				'<p>"Hi Kristy, there is a ' + perYou.getSex() + ' here to see Ellie from your Bank, is this ok...Good!...Yeah I suppose cute, ' + (perYou.isBornMale() ? "but you know not my type" : "you\'re cuter") + '..See you tonight?...Ok bye!"</p>'
			);
			if (isDay()) {
				md.write(
					'<p>She puts her phone away and stretches while looking at you curiously. Her top slips up exposing the lower parts of her breasts but she does not notice. She says,</p>' +
					'<p>"Kristy likes you and says fine then. Ellie is at the park reading, she is studying for a part-time business degree. She would have gone to her new boyfriend but she said he was busy. Try the lake at the Glenvale Park. If she is not there you may like to try his house, it\'s the Robbins house on Yoolaroo Drive."</p>' +
					'<p>She checks her phone for the address and as she does she notices her top and adjusts it. She smiles and tells you "Naughty!".</p>'
				);
			} else {
				md.write(
					'<p>She puts her phone away and stretches while looking at you curiously. Her thin nightie slips exposing more of her breasts but she does not notice. She says,</p>' +
					'<p>"Kristy likes you and says fine then. Ellie is at the park reading, she is studying for a part-time business degree. She would have gone to her new boyfriend but she said he was busy. Try the lake at the Glenvale Park. If she is not there you may like to try his house, it\'s the Robbins house on Yoolaroo Drive."</p>' +
					'<p>She checks her phone for the address and as she does she notices her nightie and adjusts it. She smiles and tells you "Naughty!".</p>'
				);
			}
			this.setFlag(3);
			perEllie.place = 421;
			setPlaceKnown("DuckPond");
			if (!isPlaceKnown("RobbinsHouse")) {
				md.write('<p><b>You now know the Robbinses\' address.</b></p>');
				setPlaceKnown("RobbinsHouse"); // Sets it so that you will always know where the Robbin's home is
				if (!isPlaceKnown("Alley")) setPlaceKnown("Alley"); // Set to know the alley
			}
			startQuestions();
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "kristincarol2") {
			md = WritePlaceHeader();
			perEllie.place = 423;		
			movePerson("Kristin", 430);
			perKristin.showPerson("!" + sType + ".jpg");
			addPlaceTitle(md, "Visiting Kristin and Carol");

			md.write('<p>You knock on the door to the Bartel\'s house, and a moment later Kristin answers it, dressed in sexy lingerie. She takes you through into the master bedroom where Carol is already waiting on the bed, dressed in a similar attire. She explains to you with a smile,</p>');

			if (perYou.isBornMale()) md.write('<p>"Carol has agreed to letting you watch us, but you may not touch or join in. Men do nothing for her sexually, unlike me."</p>');
			else md.write('<p>"Carol has agreed to letting you watch us, and maybe even join in. Let us see how she likes you after a bit"</p>');
			md.write(
				'<p>She slips onto the bed and kisses Carol, who at first returns the kiss, but then quickly breaks away, looking at you suspiciously,</p>' +
				'<p>"Wait a moment, you are the one from before...  what was that about selling magazine subscriptions?” She looks at you suspiciously. “Look, you are a friend of Kristin, and I don\'t know why you lied to me, but I\'m not comfortable with this anymore, you should leave now."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Goodbye?"', 5, '', 'A little while after leaving the house Kristin joins you, &quot;Sorry ' + perYou.getMaster() + ' she can be a bit temperamental at times! Come back to my home, and I will make it up to you!&quot;');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "kristincarol3") {
			md = WritePlaceHeader();
			perKristin.showPerson("!" + sType + ".jpg");
			addPlaceTitle(md, "Carol under a Charm Spell");
			md.write(
				'<p>You whisper the words of the charm and Carol sighs as the spell floods her body with arousal, strengthening what she must have already been feeling. She starts to undress Kristin, who gives you a knowing smile. Carol, though, glares at you as she notices,<br>' +
				'"You\'re still here, go away...I need..with Kristy..."</p>' +
				'<p>You shake your head and firmly tell her,<br>' +
				'"How could I leave if you want Kristin? She is my slave, my completely loyal servant and plaything. We are only here because I want you, and Kristin is obeying my desires. She is my proxy, Carol, a sex toy I am using to arouse you and a toy I will use to fuck you."</p>' +
				'<p>While you speak, Kristin kisses a distracted Carol, quickly removing most of her lingerie and whispering to her,<br>' +
				'"Is this not great? I will be the toy ' + perYou.getMaster() + ' uses to make love to you, Carol!” She turns to you. “Please use me, ' + perYou.getMaster() + '!"</p>' +
				'<p>Carol looks between the two of you in confusion, dimly aware that something can\'t be right as the spell increases her arousal further, making her more receptive for Kristin\'s touch.<br>' +
				'"Don\'t worry, Carol," You say. "you will be joining Kristin soon, but first, you will lick my toy."<br>' +
				'<p>Carol gasps while Kristin\'s hands roam over her body, some of her resistance vanishing as she looks at you. "Joining?"'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you answer "As a slave"', 420, 'type=kristincarol4');
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "kristincarol4") {
			md = WritePlaceHeader();
			perKristin.showPersonRorX("!" + sType + ".jpg");
			addPlaceTitle(md, "Carol under a Charm Spell");
			md.write(
				'<p>Carol mind seems to snap back into reality a little and again, she glares at you,<br>' +
				'"Slave?..."<br>' +
				'You interrupt her,<br>' +
				'"Yes, a Slave! And you will stop questioning me. I want you to lick my toy and properly prepare her to fuck you."</p>' +
				'<p>She is clearly struggling with your words, but after a moment of hesitation, her arousal gets the better of her and she moves to kiss and lick Kristin\'s folds, something they have undoubtedly done many times before. You watch as Carol gets more and more lost in her arousal and the passion of the moment and seems to forget about you in her desire to tend to her lover. You would guess that Kristin often takes the lead or even a dominant role in these things.</p>' +
				'<p>Kristin on her end, seems to really enjoy herself, giving you a sly smile as she leans back to present her body to Carol and moaning loudly under her touch,<br>' +
				'"' + perYou.getMaster() + ', your toy is getting very wet, and your new slave is very good at licking pussies.” She seems close to the edge and roughly grabs her lovers hair. ”Carol, oh Carol! My body belongs to my ' + perYou.getMaster() + ', so drink your ' + perYou.getMaster() + 's cum!”</p>' +
				'<p>Kristin cries out as she orgasms and Carol looks at you, still confused by what is happening with her, her mind malleable under your spell,<br>' +
				'"Slave Carol. You will now present your pussy to my Toy, and I will use her to fuck you."</p>' +
				'<p>She starts to object, but you cut her off,</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Obey Slave"', 420, 'type=kristincarol5');
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "kristincarol5") {
			md = WritePlaceHeader();
			perKristin.showPersonRorX("!" + sType + ".jpg");
			addPlaceTitle(md, "Slave Carol under a Charm Spell");
			md.write(
				'<p>Your words seem to shake her body and she gasps in pleasure as you repeat them, telling her to obey you and turn back to Kristin,<br>' +
				'"Join me as ' + (perYou.isBornMale() ? 'Masters' : 'Mistresses') + ' slave,” Your toy coos to her, her lips close to Carols. ”let me fuck you as our ' + (perYou.isBornMale() ? 'Masters' : 'Mistresses') + ' toy and accept ' + perYou.getHimHer() + ' as your ' + perYou.getMaster() + ' as well."</p>' +
				'<p>Carol\'s expression changes, a last moment of defiance flaring up before the doubt and confusion leaves her mind and she gives Kristin a deep kiss, finally turning to you.<br>' +
				'"' + perYou.getMaster() + '... “She smiles at you broadly.” Please fuck me. Use your toy or fuck your slave. I want to be yours!"</p>' +
				'<p>Kristin picks up a dildo from what seems to be a curiously large collection and leans back, motioning for Carol to move on top of her. Your new slave happily complies and you watch as your toy uses the Dildo to fuck her in your name, driving the already heavily aroused woman to her climax with surprising speed,<br>' +
				'"' + perYou.getMaster() + '! Your toy...you..ahhh..making me cummm!!!</p>' +
				'<p>Carol slumps back onto her back from the sensation, looking at you with nothing but devotion in her eyes,</p>' +
				'<p>"' + perYou.getMaster() + '..."</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'fuck your slave, Carol', 420, 'type=fuckcarol');
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "fuckcarol") {
			md = WritePlaceHeader();
			if (perYou.isBornMale()) this.showPersonRandomRorX("carol7b", 2);
			else if (isExplicit()) this.showPersonRandomX("carol7g", 2);
			else this.showPersonRandom("carol7b", 2);
			addPlaceTitle(md, "Fucking Slave Carol");
			md.write(
				'<p>Seeing how the spell has fully taken over Carols mind, you finally move closer to the bed, ordering Kristin to undress you while you speak to your newest acquisition,<br>' +
				'"I will now Fuck you personally, slave, turn around and present your pussy."</p>'
			);

			if (perYou.isBornMale()) md.write('<p>Carol complies but seems uncertain as Kristin removes your underwear and reveals your erect cock, but you just shake your head. "I know are a Lesbian, but I also know you want me to fuck you, isn\'t that right, slave?" You position yourself behind her as you speak, placing your cock\'s tip to her folds.</p>');
			else md.write('<p>Carol complies eagerly while Kristin fastens a likely well used strap on to your hip. "You like to be fucked with this, right slave?" You ask and position yourself behind her, placing the strap tip to her folds.</p>');

			md.write(
				'<p>"Yes ' + perYou.getMaster() + '...." She coos...</p>' +
				'<p>"And you will fuck any woman I want you to as well, like a good little slavetoy, right?"</p>' +
				'<p>"Yes, ' + perYou.getMaster() + '...” She begins to grind her hip back against you with desperate moans.</p>' +
				'<p>"Good slave. Now let me claim you fully, and become mine."</p>' +
				'<p>You push into her before she even has a chance to reply and begin to rock your hips, delighting in Carols unrestrained passion as you take her roughly, and seal her fate as your slave.</p>'
			);
			addLinkToPlace(md, 'leave the house', 5);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(md)
	{
		// Common questions
		if (sType === "" && Place == 423 && wherePerson("Ellie") != 423 && this.isCharmedBy()) {
			addLinkToPlaceO(md, 'ask Carol to go for a swim', 423, 'type=carolpool');
		}
	
		if (!this.isHere() || sType !== "") return;
		
		var sw = perYou.getWitch(true, true);
		
		if (Place == 424) {

			if (perYou.isMaleSex()) {
				addLinkToPlaceO(md, "'enchant' her and play with her mouth", 424, 'type=carolbj');
				addLinkToPlaceO(md, "'compel' her to play with her toys", 424, 'type=carolfuck');
				addLinkToPlaceO(md, "'compel' her and play with her tits", 424, 'type=caroltitfuck');
			} else {
				addLinkToPlaceO(md, "'compel' her use her tongue", 424, 'type=carolbj');
				addLinkToPlaceC(md, '"Let\'s put that collection to good use"', 424, 'type=carolfuck');
				if (perYou.FindItem(45) > 0) addLinkToPlaceC(md, '"Let\'s put that collection to good use on her tits"', 424, 'type=caroltitfuck');
			}

			if (!this.checkFlag(4)) {
				addQuestionR(md, 'ask her if she is well',
					'&quot;I have a beautiful lover, a smart and kindhearted daughter and lots of naughty dreams about blissfully serving my little ' + sw + '. You are often wearing a black cape and high collar in them and order me to capture other woman for you to fuck, though.&quot; She laughs playfully.</p>' +
					'<p>&quot;Maybe we could visit Kristin one of these days? I may have an idea for an interesting roleplay.&quot;',
					"Carol",
					"setPersonFlag(\\'Carol\\',4)"
				);
			}
			if (!this.checkFlag(5) && isCharmedBy("Ellie")) {
				addQuestionR(md, 'ask about Ellie',
					getCharmedLevel("Ellie") == 4 ?
					'&quot;I would never have thought that she could be so Kinky, did you cast your spell on her as well, my naughty ' + sw + '?&quot; Carol chuckles.</p>' +
					'<p>&quot;She has been surprisingly accepting of both my affair with Kristin and yourself. We don&rsquo;t really argue anymore and she has even been a great help in the house.&quot;</p>' +
					'<p>&quot;I... sometimes wonder if something is off, but it passes. I&rsquo;m happy that she is happy with you.&quot;' :
					'<p>We have argued over Kristin for so long, it&rsquo;s almost eerie to have her accept, even encourage it...&quot; Carol muses.</p>' +
					'<p>&quot;I always understood her anger. I had raised her to be faithful and yet, started an affair with her boss... even asked her to keep it a secret from Sally.&quot;</p>' +
					'<p>&quot;With you, it&rsquo;s different, no secrets, no shame. She thinks it&rsquo;s great that Kristin is part of the Family now and I will come clear with Sally as well... whenever she is back. We still sometimes argue but it&rsquo;s a lot less intense.' +
					(perYou.isMaleSex() ? '' : '&quot;Oh, she has also become rather curious  about how to please a woman, too.&quot; Carol winks'),
					"Carol",
					"setPersonFlag(\\'Carol\\',5)"
				);
			}
			if (!this.checkFlag(6)) {
				addQuestionR(md, 'ask about her collection',
					'&quot;Sally and I loved to experiment, and we usually had money to spare. So, what began with a handful of toys grew over time and when things began to cool down between us, I often bought new toys to spice things up... it even sometimes worked.&quot;</p>' +
					'<p>Carol laughs and rolls onto her back to present her body to you invitingly.</p>' +
					'<p>&quot;Feel free to use whatever you like, including myself.&quot; She winks.',
					"Carol",
					"setPersonFlag(\\'Carol\\',6)"
				);
			}
			if (!perYou.isMaleSex() && perYou.FindItem(45) === 0 && !this.checkFlag(7) && this.checkFlag(6)) {
				addQuestionR(md, '"anything you would recommend?"',
					'&quot;This might be entirely self-serving, but I&rsquo;d like you to have this.&quot;</p>' +
					'<p>She takes out a strap-on dildo and hands it to you.</p>' +
					'<p>&quot;It&rsquo;s nearly new, probably one of my favorite designs, and I&rsquo;d love to hear tales of you using it to please your other women as well. It&rsquo;ll be like a piece of me is with you when you fuck them.&quot;',
					"Carol",
					"setPersonFlag(\\'Carol\\',7);PlaceI(45)"
				);
			}
			if (!this.checkFlag(8)) {
				addQuestionR(md, 'ask about her marriage',
					'&quot;Curious, are you?&quot;</p>' +
					'<p>&quot;Sally and I have been married for over 20 years, but the fire is kind of... gone.&quot;</p>' +
					'<p>&quot;She is a pretty successful businesswoman and often traveling. We decided early that I stay at home to raise Ellie and tend to the house, but these days, when she is at home, everything is just one huge routine, even sex.</p>' +
					'<p>&quot;I wouldn&rsquo;t mind sharing her, by the way, you do have a way to make sex exiting, little ' + sw + '.&quot;',
					"Carol",
					"setPersonFlag(\\'Carol\\',8)"
				);
			}
			if (!this.checkFlag(9) && this.checkFlag(8)) {
				addQuestionR(md, 'ask how they met',
					'&quot;I was working the reception desk of a hotel in Kiev while she was staying there on one of her Business trips, and well, while it wasn&rsquo;t exactly love at first sight, we got along well, spoke often, finally went on a date and... well we pretty much never left her room.&quot;</p>' +
					'<p>Carol seems to think back for a moment and continues.</p>' +
					'<p>&quot;I was taken by her charm and lavish lifestyle, and as time passed, she visited more often, we spoke  on the phone, and in the end, I decided to take her invitation to move here, learn the language and finally get married as a loving mother and housewife in a land where lesbians aren&rsquo;t seen as mentally disordered.&quot;',
					"Carol",
					"setPersonFlag(\\'Carol\\',9)"
				);
			}
			if (!this.checkFlag(10)) {
				addQuestionR(md, 'ask about Kristin',
					'&quot;I know what you are getting at.&quot; Carol chuckles</p>' +
					'<p>&quot;Kristin is a good friend, but we are not in love and I know of at least one other woman she is regularly seeing, not to mention her understandable devotion to you.&quot;</p>' +
					'<p>&quot;The affair... well it just developed over time and I remember I often had doubts before I met you...&quot;</p>' +
					'<p>&quot;Now, it all seems clear, though, we are all united in servitude to our wonderful little ' + sw + ' and how can this possibly be wrong?',
					"Carol",
					"setPersonFlag(\\'Carol\\',10)"
				);
			}
			if (!this.checkFlag(11) && this.checkFlag(10)) {
				addQuestionR(md, 'ask who Kristin is seeing?',
					'&quot;Her name is Karen and she&rsquo;s working at the Library, just look for the biggest pair of juggs in the place and you can&rsquo;t possibly miss her.&quot; Carol laughs.</p>' +
					'<p>&quot;But be careful, if you stare at them too long, Ms. Adams will likely bump into you with a stack of books or accidentally run you over with a book mobile.&quot;',
					"Carol",
					"setPersonFlag(\\'Carol\\',11)"
				);
			}

			this.addSleepLink(md, "go to bed for the night with Carol", "Going to Bed with Carol",
				'<p style="position:absolute;left:50%;top:80%;cursor:pointer;font-size:1.1em;width:45%">As night falls Carol simply tells you "Time for bed my naughty ' + sw + '", and she lies down, ready for you to enchant her more.',
				Math.random() < 0.5 ? 'beda.jpg' : 'bedb.jpg', true
			);
		}

	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			
			//At door of Bartel house
			// OR
			//Bartel's House Carol's Bedroom
			if (Place == 420) {
				if (!this.isCharmedBy()) {
					if (sType == "kristincarol2") {
						CastCharmSpell("Carol", 420, 2, "type=kristincarol3");		//Charm Carol
						return "handled";
					} else addComments('<p>You recite the spell, but nothing at all happens!</p><p>You wonder if somehow the doorway is blocking the spell, you know the old legends about how vampires must be invited into a house. Also you heard stories about Chinese evil spirits not being able to cross certain doors with steps and you notice past the door is a sunken area for changing shoes. Carol looks puzzled and says "Bless you", clearly she misheard what you said</p><p>It looks like you are going to have to find a way into the house</p>');
				} else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
	
			//Bartel's House Lounge Room
			if (Place == 422) {
				if (sType == "seecarol") {
					CastCharmSpell("Carol", 422, 2, "type=carol2"); //, "", "carolrecharm");		//Charm Carol
					return "handled";
				}
				return '';
			}
		}
		
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her.");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(14))) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=caroltransformbody' + this.dress.toLowerCase());
				return "nofooter";
			}
		}
		return "";		// do nothing
	};

	per.callThem = function() {
		if (Place == 269) {
			this.setFlag(12);
			dispPlace();
			receiveCall('', 'You call Carol to invite her to join you at the pool for a swim, and she immediately answers, "Naughty little ' + perYou.getWitch(true, true) + ', you want to see me in my bikini don\'t you? Why no come here, and we can play in my pool" That invitation sounded a little suggestive but you would guess there is a language thing so you do not quite get it. Still, you get it enough and agree to visit her for a swim.');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(13) && this.isCharmedBy() && !this.isHere() && isMorning() && this.hoursCharmed() > 48) {
			if (this.makeCall(true, 142)) this.setFlag(13);
		}
		return false;
	};

	per.isSMSImageDressVersion = function(id) { return true; };
	
	per.getPersonSMS = function(id) {
		if (id == 142) return receiveSMS('CarolEnchanted', 'Trying a new phone, you like it my ' + perYou.getWitch(true, true), 'sms1.jpg');
		return '';
	};

}
