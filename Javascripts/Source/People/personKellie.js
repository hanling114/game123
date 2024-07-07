/***********************************************************************
Kellie
***********************************************************************/

function initialiseKellie()
{
	// Kellie
	addPerson("Kellie", 0, "Kellie");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clvK = this.getCharmedLevel();
		if (clvK > 0) return "Your Study Buddy";
		return this.name;
	};
	
	per.getPossessionFace = function() { return !this.isCharmedBy() ? 'kellie-faceu' : this.isLover() ? 'kellie-facecl' : 'kellie-facecs'; };

	per.whereNow = function() {
		if (this.place === 0) return 0;
		if (isShopOpen(2, 0, true)) {
			var p = findPersonNC("Kate");
			if (!p.isHere()) return 216;
		}
		if (!isShopOpen(2, 0, true) && this.checkFlag(6) && !this.isCharmedBy()) return 234;
		return this.place;		// Was basement/man-cave
	};
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };
	
	per.passTimeDay = function() {
		if (this.place === 0 && isCharmedBy("MissLogan")) this.place = 999;	// Out and about, now in the game
		this.setFlag(2, false);
		this.setFlag(3, false);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 216 && this.isHere() && sType === "") {
			if (!this.checkFlag(6)) return this.showPerson("kellie1.jpg", '', '', '', '', false, "string");
			if (this.checkFlag(6) && !this.isCharmedBy()) return this.showPerson("kellieworried.jpg", '', '', '', '', false, "string");
			if (this.isCharmedBy()) return this.showPerson("kelliecharmed-" + (this.isLover() ? "lover" : "slave") + ".jpg", '', '', '', '', false, "string");
		} else if (Place == 234 && this.isHere() && sType === "") {
			if (!isShopOpen(2)) return this.showPerson("kellie3.jpg", '', '', '', '', false, "string");
		}
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Introduction to Kellie
		if (Place == 216 && this.isHere() && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Kellie " + (isBritish() ? "your fellow student" : "the Valedictorian"),
				this.addPersonString("kellie0.jpg", "height:max%", "right") +
				"You see " + (isBritish() ? "your classmate " : "your school valedictorian ") + "Kellie walking along and then sitting at a park table as you approach the bridge.</p>" +
				"<p>She has always been such a tease and regularly acts like a stuck up bitch.</p>" +
				"<p> You just don't understand how a girl who looks that much like a bimbo could be the smartest person at school, well maybe except for Kate. Something smells fishy.</p>"
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, clv;
		
		if (sType == "endgame1kellie") {
			// End Game - Kellie
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Students?");

			md.write(
				'<p>One day you meet Kellie and see her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 269) {
			if (sType == "kelliepool") {
				// Kellie Called to Pool
				clv = this.getCharmedLevel();
				WaitHereOnly(6);
				md = WritePlaceHeader();
				
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Kellie");
			
				md.write(
					'<p>Kellie spends some time relaxing while waiting for you.</p>'
				);
				
				startQuestions();
				addLinkToPlace(md, 'take her somewhere private', Place, 'type=kelliePoolSex');
				addLinkToPlace(md, this.isLover() ? 'say goodbye to Kellie' : 'send Kellie back home', Place);
				
				WritePlaceFooter(md);
				return true;
			};

			if (sType == "kelliePoolSex") {
				// Emma Called to Pool
				md = WritePlaceHeader();
				clv = this.getCharmedLevel();
				
				if (isExplicit() && perYou.isMaleSex()) this.showPersonRandomRorX("pool-sexb", 2);
				else this.showPerson("pool-sex.jpg");
				
				addPlaceTitle(md, "Private with Kellie");

				md.write(
					'<p>You spend some private time with Kellie.</p>'
				);
				
				startQuestions();
				addLinkToPlace(md, this.isLover() ? 'say goodbye to Kellie' : 'send Kellie back home', Place);
				WritePlaceFooter(md);
				return true;
			};
		}
		
		if (isAtLocation(355)) {
			if (sType == "kelliemovie") {
				// Movie
				md = WritePlaceHeader();
				this.showPerson("movie.jpg");
				AddCash(-20);
				setPlaceFlag("NewAgeStore", 4);		// Watched one today

				addPlaceTitle(md, "Watching a movie with Kellie");

				md.write("<p>Kellie meets you and you discuss movies and decide on a movie");
				if (Place == 356) md.write('smiles and walks you to the main area of the movie threater. You pick a movie');
				md.write(
				  ' and walk into the theatre with Kellie and talk your seats. The movie is not very interesting, Kellie is a lot more so!</p>'
				 );

				startQuestions();
				addLinkToPlace(md, this.isLover() ? 'Kellie looks around and leans down...' : 'guide Kellie\'s head to your groin', Place, 'type=kelliemoviebj');
				addLinkToPlace(md, this.isLover() ? 'kiss Kellie' : 'grope Kellie', Place, 'type=kelliemoviesex');
				addLinkToPlace(md, 'watch the movie and walk to the shopping center with Kellie', 194);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "kelliemoviebj") {
				// Movie bj
				md = WritePlaceHeader();
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("moviebj.jpg");
				else  this.showPerson("moviebj.jpg");

				addPlaceTitle(md, "Kellie Watching You");

				md.write("<p>Kellie slides down and undoes your pants");
				if (perYou.isMaleSex()) {
					md.write(
						' and takes out your cock. She licks and strokes it to full hardness. She proceeds to give you a reasonably skillful blowjob.'
					);
				} else {
					md.write(
						' and pulls down your panties and fingers you before leaning down to lick and suck your pussy and clit.'
					);
				}
				md.write(
				  '</p><p>Later you watch the rest of the movie and then walk with Kellie to the main shopping center.</p>'
				 );

				startQuestions();
				addLinkToPlace(md, 'say goodbye to Kellie', 194);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "kelliemoviesex") {
				// Movie sex
				md = WritePlaceHeader();
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("moviesexb.jpg");
				else this.showPersonBG("moviesex.jpg");

				addPlaceTitle(md, "Movie Sex with Kellie");

				md.write("<p>You caress Kellie\'s large breasts as you both partly remove your clothing. ");
				if (perYou.isMaleSex()) {
					md.write(
						'Kellie takes your cock in her hands and strokes it to hardness and then quickly steps onto your lap and mounts herself on your cock. She rides you is as much silence as she can, but she still makes small moans as she builds to her orgasm. As she cums you unload into her is a wonderful climax for the movie.'
					);
				} else {
					md.write(
						'You kiss finger and caress each other building towards your mutual orgasms.'
					);
				}
				md.write(
				  '</p><p>Later you watch the rest of the movie and then walk with Kellie to the main shopping center.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'say goodbye to Kellie', 194);
				WritePlaceFooter(md);
				return true;			
			}				
		}
		
		if (Place == 216) {
			if (sType == "surprisequiz") {
				// Surprise Quiz
				md = WritePlaceHeader();
				this.showPerson("kellie2.jpg");
				this.setFlag(6);

				addPlaceTitle(md, "Telling Kellie about the Quiz");

				md.write(
				  '<p>You approach Kellie and tell her "Oh hey Kellie. I\'m surprised you aren\'t studying. I would have figured that you\'d wanna keep your perfect grades."</p>' +
				  '<p>She asks, "What are you talking about. I do have perfect grades. I don\'t even have any homework today so I\'m just relaxing. Can you just leave me alone. I wouldn\'t want your stupid to rub off on me."</p>' +
				  '<p>You reply. "Oh wow. You really have all the nerves in the body memorized already. How is that even possible. You must be like a super genius or something."</p>' +
				  '<p>She looks annoyed, "Why the fuck would I waste my time memorizing that."</p>' +
				  '<p>You almost smile, "...Uhh did you not get the email from Sla...I mean Miss Logan. Here I have it on my phone."   You pull out your phone and scroll to the email that Slave Logan created detailing the fake upcoming quiz.</p>' +
				  '<p>Kellie looks disbelieving as you say, "I can\'t believe you didn\'t see this email. It was sent to all of our school email addresses.  Oh man that sucks. You probably won\'t have time to learn it all now. I\'ve been getting tutoring from Miss Logan for a while now. It\'s been super helpful. She basically just pulls all the test info from her desk drawers and runs through it with me. Something about not wanting me to pull down our school average. I dunno. I wasn\'t really listening.  Oh well. I gotta run. Good luck with the studying."</p>'
				 );

				startQuestions();
				addLinkToPlace(md, 'return to the park bridge', 216);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 216 || Place == 234) {
			if (sType == "recharmkellie1") {
				// Re-charm Kellie
				clv = this.getCharmedLevel();
				md = WritePlaceHeader();
				if (this.getCharmedLevel() == 4) this.charmThem(3);
				else this.charmThem(4);
				this.showPerson("recharm1.jpg");
				addPlaceTitle(md, "Kellie Under A Charm Spell - Again");
				md.write(
					'<p>Once again Kellie falls under the spell. She starts to say something, then trails off after the first word, and shakes her head.</p>'
				);
				if (this.isLover()) {
					md.write(
						'<p>You talk to Kellie, apologising and promising to never tell about what happened at the school. You tell her she is so cute that you could not keep up how things have been.</p>' +
						'<p>You speak more of your attraction and how much she likes you, shaping her thoughts as the spell courses through her again, shifting her from being a slave to a girlfriend!</p>'
					);
				} else {
					md.write(
						'<p>You speak dominantly to her, threatening to tell people of her cheating, and how she needs to obey you in all things.</p>' +
						'<p>You contine speaking of her obedience and how she must do <b>anything</b> you tell her, <b>anything</b></p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'talk more to her', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 234) return false;
		
		var perLogan = findPerson("MissLogan");
		
		// Anatomy classroom
		if (sType == "kelliestudy") {
			md = WritePlaceHeader();
			this.setFlag(3);
			this.showPerson("anatomy.jpg");

			addPlaceTitle(md, "Studying with Kellie");

			md.write(
				'<p>You ask Miss Logan if it is good to do a study session with Kellie, knowing she will say yes. After all you just called Kellie, and she agrees eagerly.</p>' +
				'<p>"Oh ' + perYou.getMaster() + '! I am sure we can study reproductive anatomy together!"</p>' +
				'<p>A little while later Kellie arrives and sits at a desk next to you. Miss Logan starts a tutorial session, often with suggestive slips of clothing or references.</p>' +
				'<p>Kellie asks,</p>'
			);

			startQuestions('"What shall we study now?"');
			addLinkToPlaceC(md, 'study your anatomy', Place, "type=anatomybj");
			addLinkToPlaceC(md, 'study both of your anatomies', Place, "type=anatomyfuck");
			addLinkToPlaceC(md, 'ask Miss Logan for a practical exam', Place, "type=anatomythreesome");
			addLinkToPlace(md, 'that\'s enough for today', 70);
			AddPeopleColumnMed();
			perLogan.showPerson("class-neurology-charm2.jpg");
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "anatomybj") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("anatomybjb", isExplicit() ? 2 : 1);
			else this.showPersonRandom("anatomybjg", 3);

			addPlaceTitle(md, "Kellie\'s Careful Study of Your Anatomy");

			md.write(
				'<p>Under Miss Logan\'s watchful and envious eyes, Kellie makes a careful study of your ' + perYou.getGenitals() + '.</p>' +
				'<p>This appears to be a study she has done often before!</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'continue studying', Place, 'type=kelliestudy');
			AddPeopleColumnMed();
			perLogan.showPerson("class-neurology-charm2.jpg");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "anatomyfuck") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("anatomyfuckb", 1);
			else this.showPersonRandom("anatomyfuckg", 1);

			addPlaceTitle(md, "Careful Study of Kellie\'s Anatomy");

			md.write(
				'<p>Under Miss Logan\'s watchful and envious eyes, you thoroughly probe Kellie\'s anatomy with your ' + (perYou.isMaleSex() ? "cock" : 'fingers') + '.</p>' +
				'<p>This appears to be a study she has done often before!</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'continue studying', Place, 'type=kelliestudy');
			AddPeopleColumnMed();
			perLogan.showPerson("class-neurology-charm2.jpg");
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "anatomythreesome") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) perLogan.showPersonRandomRorX("kellieloganb", isExplicit() ? 4 : 1);
			else perLogan.showPersonRandom("kellielogang", 1);

			addPlaceTitle(md, "Miss Logans\'s Practical Exam");

			md.write(
				'<p>Miss Logan\'s eagerly supervises Kellie and yourself, with a whispered "finally". She makes sure to show you both all the details of reproductive anatomy, over and over to ensure you both are quite satisfied with her teaching.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'tired you leave studying for now', 70);
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "askkellie") {
			md = WritePlaceHeader();
			perLogan.showPerson("class-neurology-charm2.jpg");
			this.setFlag(5);

			addPlaceTitle(md, "Getting dirt on Kellie");

			md.write(
				'<p>You ask Miss Logan about Kellie, and she tells you,</p>' +
				'<p>"Oh ' + perYou.getMaster() + '! She is a very smart girl and almost all of the teachers love her. I just never understood why. She seems clever but her memorization skills are lacking. From what I\'ve seen she spends way longer on memorization that even average students."</p>' +
				'<p>You wonder, "Interesting. Do you think she has any dirty secrets that I could use against her?"</p>' +
				'<p>Miss Logan replies, "Well there have been a few instances where her answers have matched up with another student sitting near her for a test. Once I even talked to both of them and neither claimed to have any idea why. It could have been a coincidence or either one of them could have copied answers.  Oh yes and one weird thing is she refuses to use school supplied email. Something about it not looking professional on an application"</p>' +
				'<p>You tell her "Thank you slave. I think I have an idea. Ill need you to send an email to me on my school account telling me about a very difficult memorization quiz coming up soon. Also mention that to combat cheating the school will be implementing blinders on the sides of the desks.  Leave your office door unlocked at night and I think I\'ll be able to lure her here."</p>' +
				'<p>You agree and sits and writes the email immediately.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'that is settled', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmkellie1") {
			// Charm Kellie 1
			md = WritePlaceHeader();

			this.showPerson("kellie4.jpg");
			addPlaceTitle(md, "Kellie Under a Spell");

			md.write(
				'<p>"Dai Chu Kellie."</p>' +
				'<p>The spell sinks in this time. She will be your plaything soon but no reason not to have a bit of fun first. So you tell her,</p>' +
				'<p>"Well Well Well. What do we have here. The smartest girl in school caught stealing answers."</p>' +
				'<p>She stutters, "No no err it\'s not what it looks like. Miss Logan asked me to straighten up her desk for her"</p>' +
				'<p>You skae your head, "Uh Huh yea I\'m sure. Look I don\'t really care how you make your grades but I\'m pretty sure cheating looks pretty bad on a permanent record."</p>' +
				'<p>Kelie pleads, "No No please. You can\'t tell anyone about this. It would ruin me!"</p>' +
				'<p>You reply, "Yea it surely would. I don\'t have much to gain by not telling though. It might make my grades look better if I could knock off the top spot."</p>' +
				'<p>You see the charm flare up in her eyes and it gives her an idea.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Well. Did you have a better offer?"', Place, 'type=charmkellie2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmkellie2") {
			// Charm Kellie 2 (Slave)
			this.charmThem(1);
			md = WritePlaceHeader();

			this.showPerson("kellie5.jpg");
			addPlaceTitle(md, "Kellie\'s Bargaining");

			md.write(
				'<p>Kellie begins to unbutton her outer blouse and asks,</p>' +
				'<p>"Maybe I could make it worth your while not to talk?" </p>' +
				'<p>You reply, "That\'s an intriguing proposition Kellie."</p>' +
				'<p>She replies, her eyes glowing with the spell, "I figured you would like that."</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceC(md, 'you tell her "Go on"', Place, 'type=charmkellie3slave');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceC(md, '"You are cute, so I am sure I can cover this up"', Place, 'type=charmkellie3lover');
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmkellie3slave") {
			// Charm Kellie 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("kellie6.jpg");
			addPlaceTitle(md, "Kellie Under a Spell");

			md.write(
				'<p>Kellie lifts her shirt to reveal some great cleavage and asks,</p>' +
				'<p>"So are we all good now?" You admire her cleavage and reply,</p>' +
				'<p>"Well I don\'t know Kellie. You are the smart one here aren\'t you. I know something that has the power to destroy the rest of your entire life and you showed me some cleavage that I could see anytime at the pool."</p>' +
				'<p>Kellie looks surprised but she knows she doesn\'t have a good comeback so she continues to undress. As she does the spell reinforces her obedience to your words, making it easier and easier for her to comply.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'continue Watching', Place, 'type=charmkellie4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmkellie4slave") {
			// Charm Kellie 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("kellie7.jpg");
			addPlaceTitle(md, "Kellie Further Under a Spell");

			md.write(
				'<p>You lecture Kellie, "Wow you really are a slow learner. No wonder you had to steal the answers."</p>' +
				'<p>She looks confused, "but...I removed my skirt and shirt for you."</p>' +
				'<p>You tell her, "Yea and it\'s still no more exciting than a typical day at the public pool. You\'ve gotta earn my silence."</p>' +
				'<p>She replies resigned, "Ok fine. If I get naked here will that be enough."</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"You don\'t really have a choice anyway"', Place, 'type=charmkellie5slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmkellie5slave") {
			// Charm Kellie 5 (Slave)
			md = WritePlaceHeader();
			this.showPerson("kellie8.jpg");
			addPlaceTitle(md, "Kellie Your Slave");
			setWallpaper(this.getImg("kellie8.jpg"), '');
			if (gameState.nRightBarState < 3) showRightBar(gameState.nRightBarState + 2);	// Show your phone

			md.write(
				'<p>Kellie strips and displays herself for you.</p>' +
				'<p>You look her over, "Now that is much better. You are quite the looker. I\'ll need to remember this day" You whip out your phone and take a picture.</p>' +
				'<p>She weakly complains, "Hey no. That wasn\'t part of the deal. Delete that right now."</p>' +
				'<p>You tell her, "Umm first off. No. And second the deal was that you do whatever you can to keep me happy so I don\'t tell everyone about this. Thirdly. Now I have proof of you nude in a teachers office so you\'d better get real cooperative real fast Bitch."</p>' +
				'<p>She drops her head. "Ok. I\'ll do whatever you want. What next?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'tell her you will find her when you need her services', 234);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmkellie3lover") {
			// Charm Kellie 3 (lover)
			md = WritePlaceHeader();
			this.charmThem(3);
			this.showPerson("kellie6.jpg");
			addPlaceTitle(md, "Kellie Under a Spell");

			md.write(
				'<p>Kellie lifts her shirt to reveal some great cleavage and asks,</p>' +
				'<p>"Well thank you and as a little show of thanks!"</p>' +
				'<p>You promise to talk to Miss Logan and can arrange that Kellie can sit in on your tuition sessions with her.</p>' +
				'<p>Kellie looks surprised, "I did not think you had even noticed me, though others mentioned your fascination of the occult and not really being interested in anyone, well maybe Kate?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'no comment on Kate but compliment Kellie', Place, 'type=charmkellie4lover');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmkellie4lover") {
			// Charm Kellie 4 (lover)
			md = WritePlaceHeader();

			this.showPerson("kellie7.jpg");
			addPlaceTitle(md, "Kellie Further Under a Spell");

			md.write(
				'<p>You say nothing about Kate but further compliment Kellie\'s beauty and intelligence, she just needs some help studying at times. You see her eyes flicker as the spell continues working on her, accentuating your good words and greatly stimulating and arousing her.</p>' +
				'<p>She looks at you more curiously "Well, well, maybe I can help you a bit more..." and she removes the rest of her clothing, down to her underwear.<p>' +
				'<p>She continues, "I really could use some help to get of...be better at studying" and she blushes, in both embarrassment at what she almost said and in her arousal.</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"I am always ready to help you..study"', Place, 'type=charmkellie5lover');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmkellie5lover") {
			// Charm Kellie 5 (lover)
			md = WritePlaceHeader();
			this.showPerson("kellie8.jpg");
			addPlaceTitle(md, "Kellie Your Study Buddy");

			md.write(
				'<p>Kellie strips and displays herself for you, "Maybe we should study some anatomy? We are in the right classroom!"</p>' +
				'<p>You carefully and thoroughly study Kellie\'s anatomy and she studies yours as thoroughly.</p>' +
				'<p>Later you discuss <b>calling</b> her when you can arrange another <b>study session during school hours</b>. She suggest you could meet for a <b>movie on the weekend</b>, she heard of some good movies at the cinema in the town center. She suggest you call her if you are free.</p>' +
				'<p>You give your new charmed girlfriend?...study buddy? a kiss and promise to study again with her. She re-dresses and leaves the classroom.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'tell her you will give her a call as she leaves', 234);
			WritePlaceFooter(md);
			return true;
		}		
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img = this.showPersonRandomString("poledance", 2);
		md.write(img);
		addPlaceTitle(md, "Kellie\'s Dance");
		if (this.isLover()) md.write('<p>You wait impatiently for Kellie, she sounded quite eager to try dancing for you and you are equally eager to see her!</p>');
		else md.write('<p>You quietly wait for Kellie, the spell will ensure she is here, she is bound as your slave to comply if reluctantly.</p>');

		if (img.indexOf("poledancea") != -1) {
			md.write('<p>You see Kellie step out onto the stage, she has been paired with another girl in some sort bunny-girl outfit, though little more than the ears!');
			if (this.isLover()) md.write(' You think she would prefer to be dancing on her own, but quickly gets into the feel of things. Their dance turns into a soft lesbian play, and the audience very much enjoys it, as do you!</p>');
			else md.write(' You see Kellie is complying if reluctantly and the other girl takes the lead as the dominant partner. The dance turns into a light lezdom sort of play to the audience, and your, approval!</p>');					
		} else {
			md.write('<p>You see Kellie step out onto the stage, she is dressed in some sort of lingerie with a collar and lead, given the nature of this club that is quite appropriate!');
			if (this.isLover()) md.write(' You see she really seems to get into it, but mostly she is danding for you and late in the dance gives one end of the lead to you, and encourages you to spank her to the loud approval of the audience.</p>');
			else md.write(' You see Kellie is playing to her slave personna here and performs well. She reluctantly gives you the other end of the lead at the end of the dance and she follows you off the stage.</p>');
		}

		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};	
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1kellie" : "";
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 234 && this.isHere()) {
			md.write(
				'<p>Ahah so this bitch is a little cheater. She is startled as you open the door and jumps so her skirt bounces up higher on her ass than usual. Looks like she got worried about the upcoming test and couldn\'t resist. That should put a chink in her mental armor. She must be feeling pretty embarrased and ashamed right about now. Time to strike.</p>'
			);
			return;
		}
		if (Place == 216 && this.isHere()) {
			addPlaceImage(md, "park2.jpg", "20%", "left", undefined, undefined, true);
			if (!this.checkFlag(6)) {
				md.write(
					'<p>You say "Hello Kellie", she smiles towards you but clearly doesn\'t remember your name. "Hey there..." she replies before gesturing she does not want to be disturbed.</p>'
				);
			} else if (this.checkFlag(4) && !this.checkFlag(5)) md.write('<p>Kellie is in your class with Miss Logan.  Maybe you could check with her to see if anything can be done to put this little know it all in her place.</p>');
			else if (this.checkFlag(6) && !this.isCharmedBy()) md.write('<p>Kellie looks worried now. She is scribbling something on a piece of paper but she wont let you get a look at it. You will need to catch her in the act of stealing answers if your charm spell has any hope of working on her.</p>');
			else if (this.isCharmedBy()) md.write('<p>Kellie still hangs out in the park, but you have made it clear she must always be ready for her ' + perYou.getMaster() + ' to use her though.</p>');
		}
	};
	
	per.showPersonChat = function(md)
	{
		if (Place == 234) {
			if (isPersonHere("MissLogan") && isCharmedBy("MissLogan") && this.checkFlag(4) && !this.checkFlag(5)) addLinkToPlace(md, "ask " + per.getPersonName() + " about Kellie", Place, 'type=askkellie');
		} else if (Place == 216 && this.isHere()) {
			if (this.checkFlag(5) && !this.checkFlag(6)) addLinkToPlaceC(md, "tell Kellie about the surprise quiz", Place, 'type=surprisequiz');
			if (this.isCharmedBy()) {
				if (this.isLover()) {
						addPopupLinkToPlaceC(md, 'ask Kellie for some attention', Place, '', "Kellie\'s Attention",
							this.addPersonStringRorX(addBGSuffix("parkbj.jpg"), "height:95%", "rightpopup") +
							'Kellie happily gives your ' + (perYou.isMaleSex() ? 'cock' : 'pussy') + ' some attention',
							"sexEvent()"
						);
						addPopupLinkToPlaceC(md, 'play with Kellie', Place, '', "Sex on the table",
							this.addPersonStringRorX(addBGSuffix("parkfuck.jpg"), "height:maxm%", "rightpopup") +
							'You ' + (perYou.isMaleSex() ? 'fuck Kellie there in the park' : 'have a 69 with Kellie there on the table'),
							"sexEvent()"
						);	
				} else {
					if (perYou.isMaleSex()) {
						addPopupLinkToPlace(md, 'have fun with Kellie', Place, '', "You let her suck your cock for a while.",
							this.addPersonStringRorX("parkbjb.jpg", "height:95%", "rightpopup") +
							'This really is a lovely park.',
							"sexEvent()"
						);
						addPopupLinkToPlace(md, 'bend Kellie over', Place, '', "You take it easy while fucking her cunt.",
							this.addPersonStringRorX("parkfuckb.jpg", "height:maxm%", "rightpopup") +
							'The cool breeze feels nice on your balls.',
							"sexEvent()"
						);
					} else {
						addPopupLinkToPlace(md, 'have fun with Kellie', Place, '', "You let her lick your pussy for a while.",
							this.addPersonStringRorX("parkbjg.jpg", "height:95%", "rightpopup") +
							'This really is a lovely park.',
							"sexEvent()"
						)
						addPopupLinkToPlace(md, 'bend Kellie over', Place, '', "Kellie in the Park",
							this.addPersonStringRorX("parkfuckb.jpg", "height:maxm%", "rightpopup") +
							'You have a 69 with her on the park table.',
							"sexEvent()"
						);	
					}
				}
			}
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 216 && this.isHere()) {
				if (!this.isCharmedBy()) {
					// Park Bridge - Kellie self confidence
					this.setFlag(4);
					addComments('You attempt to cast the spell, but it fails to take effect. It doesn\'t seem like she is already charmed but something about her attitude isn\'t allowing the spell to work. She radiates self confidence. You\'ll have to fix that. Maybe a teacher under your control could help.');
					return "handled";
				}
				// Recharm
				CastCharmSpell("Kellie", 216, 0, 'type=charmkellie1', '', 'type=recharmkellie1');
				return "handled";
			}

			// Anatomy class
			if (Place == 234 && this.isHere()) {
				CastCharmSpell("Kellie", 234, 4, 'type=charmkellie1'); // CHARM Kellie (ValeDICKtorian), slave level
				return "handled";
			}
		}
		return "";		// do nothing
	};

	//Phone calls
	// Are they are available at certain times
	per.isPhoneable = function(msg) { 	// Can you call them?
		if (!this.isCharmedBy()) return false;
		if (msg) return true;
		if (this.isLover()) {
			if (Place == 234 && isPersonHere("MissLogan")) return true;
		}
		if (isAtLocation(355)) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		return isAtLocation(282) && perJade.isDanceAvailable();				// Strip club
	};
	
	// The actual calls
	per.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=' + this.uid + 'pool');
			if (this.isLover()) receiveCall('','You call Kellie and invite her to join you at the pool, and she happily agrees.'); 
			else receiveCall('','You call your slave Kellie and order her to join you at the pool, and she reluctantly agrees.'); 
			WriteCommentsFooter(bChat, bChatLeft);
			return;
		}
		if (isAtLocation(282)) {
			// Strip club
			perJade.setDancer(this.uid);
			dispPlace();			
			if (this.isLover()) receiveCall('', txt !== undefined ? txt : ('You call Kellie and ask her to join you at the Avernus club, and she suggests dancing for you. You make arrangements with Jade for the dance.'));
			else receiveCall('', txt !== undefined ? txt : ('You call Kellie and order her to join you at the Avernus club to dance for you. You make arrangements with Jade for the dance.'));
			WriteCommentsFooter(bChat, bChatLeft);	
			return;
		}
		if (isAtLocation(355)) {
			// Movies
			if (checkPlaceFlag("NewAgeStore", 4)) WriteComments("You have already seen a movie today");
			else if (isDay()) WriteComments("You reconsider calling, there are few matinee movies and nothing you want to see.");
			else if (nMoney < 20) WriteComments("You reconsider calling, you cannot afford the tickets at " + sCurrency + "20");
			else if (isWeekDay() && this.isLover()) WriteComments("You remember Kellie said to call on the weekend");
			else {
				gotoPlace(Place, 'type=kelliemovie');
				if (this.isLover()) receiveCall('','You call Kellie and invite her to see a movie and she promises to be there soon.', true);
				else receiveCall('','You call your slave Kellie and order her to join you for a movie.', true); 
				WriteCommentsFooter(bChat, bChatLeft);
			}
			return;
		}
		if (this.isLover()) {
			if (Place == 234 && isPersonHere("MissLogan")) {
				if (this.checkFlag(3)) WriteComments("You reconsider calling, you have already studied once with Kellie today");
				else {
					gotoPlace(Place, 'type=kelliestudy');
					receiveCall('','You call Kellie that you are free to study with her at the Anatomy classroom. Kellie replies she will be there in 5 minutes.'); 
					WriteCommentsFooter(bChat, bChatLeft);				
				}
			}
		}
	};
	
		
	per.addPersonPhoneCall = function()
	{
		if (!this.isCharmedBy() || this.checkFlag(2)) return false;
		if (!this.checkFlag(7) && this.isLover() && !this.isHere() && isMorning() && this.hoursCharmed() > 48) {
			if (this.makeCall(true, 380)) {
				this.setFlag(7);
				this.setFlag(2);
			}
		} else if (!this.checkFlag(8) && !this.isLover() && !this.isHere() && isMorning()) {
			if (this.makeCall(true, 381))  {
				this.setFlag(8);
				this.setFlag(2);
			}
		} else if (!this.checkFlag(9) && this.isLover() && !this.isHere() && isMorning() && this.hoursCharmed() > 48) {
			if (this.makeCall(true, 382))  {
				this.setFlag(9);
				this.setFlag(2);
			}
		} else if (!this.checkFlag(10) && !this.isLover() && !this.isHere() && isMorning()) {
			if (this.makeCall(true, 383))  {
				this.setFlag(10);
				this.setFlag(2);
			}
		}	else if (!this.checkFlag(11) && this.isLover() && !this.isHere() && isMorning() && this.hoursCharmed() > 48) {
			if (this.makeCall(true, 384))  {
				this.setFlag(11);
				this.setFlag(2);
			}
		} else if (!this.checkFlag(12) && !this.isLover() && !this.isHere() && isMorning()) {
			if (this.makeCall(true, 385))  {
				this.setFlag(12);
				this.setFlag(2);
			}
		}	
		return false;
	};

	per.isSMSImageDressVersion = function(id) { return true; };
	
	per.getPersonSMS = function(id) {
		if (id == 380) return receiveSMS('Kellie', 'Do you like my new bra?', 'sms1l.jpg') + replyToSMS('Hell yeah!');
		if (id == 381) return receiveSMS('Kellie', 'Is this what you wanted?', 'sms1s.jpg') + replyToSMS("Yes, tomorrow something sexier");
		if (id == 382) return receiveSMS('Kellie', 'Do you like?', 'sms2l.jpg') + replyToSMS('Very much!');
		if (id == 383) return receiveSMS('Kellie', 'Is this what you wanted?', 'sms2s.jpg') + replyToSMS("Yes, tomorrow even sexier");
		if (id == 384) return receiveSMS('Kellie', 'Just thinking what you would do if you were here...', 'sms3l.jpg') + replyToSMS('So am I!');
		if (id == 385) return receiveSMS('Kellie', 'Is this what you wanted?', 'sms3s.jpg');
		return '';
	};
}
