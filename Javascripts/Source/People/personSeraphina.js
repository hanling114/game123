/****************************************************************
Seraphina
****************************************************************/
/****************************************************************
				 Reponse Bank
 ****************************************************************/
function RepliesSeraphina(nR)
{
	var myName = per.getYourNameFor();
	if (nR == 670)
	{
		addComments(
			'"' + myName + ',  I have a full set of dancers for the club, but we can always fit in a \'special\' dancer, midnight seems an appropriate time for a person like you, or your \'friends\'. One person a night, just let me know in advance by phone. After the performance visit me for the performance fee, the dancer will keep any tips they earn of course."</p>' +
			'<p>Tonight we are full, but any other night I can schedule a dancer for you...or you can dance.'
		);
		perJade.other = 'done';
		perJade.setFlag(10);
	}
	else if (nR == 671)
	{
		addComments(
			'Sera hands over ' + sCurrency + perJade.extra[0] + ' with a smile.</p>'
		);
		AddCash(perJade.extra[0]);
		perJade.extra[0] = 0;
	}
	return true;
}

// Initialise

function initialiseSeraphina()
{
	// Thrall 1, Seraphina
	addPerson("Seraphina", 0, 'Seraphina', '', false);
	per.Replies = RepliesSeraphina;
	
	per.getPersonAddress = function(n) { return isPlaceKnown("SeraphinasRoom")  ? n === true ? 0 : 'Broken In Hotel, room 318' : n === true ? 0 : ''; };
	
	per.getPersonName = function() { return this.isCharmedBy("Demon") ? "Thrall" : this.name; };
	
	per.getPossessionFace = function() { return this.isCharmedBy("Demon") && Place != 375 ? 'seraphina-face-club' : this.isCharmedBy("Demon") ? "seraphina-facet" : this.isCharmedBy() ? 'seraphina-facec' : 'seraphina-faceu'; };
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };
	
	per.getDress = function(img, sdrs) {
		return (sdrs !== undefined ? sdrs : (this.isCharmedBy("Demon") ? "Thrall" : "Normal"));
	};
	
	per.whereNow = function() {
		if (Place == 53 && sType.indexOf("ritualreturn") != -1) return Place;
		if (this.isCharmedBy("Demon")) return this.place == -1 ? Place : this.place;
		if (perJade.isClubOpen() && this.checkFlag(14)) {
			if (getClubManager() == this) return 280;
		}
		return isShopOpen() ? 1000 : 187;		// 1000 for out working somewhere
	};
	
	per.whereNowName = function() {
		var wh = this.whereNow();
		if (wh == 187) return "home " + this.getYourNameFor();
		if (wh == 1000) return "working, I can\'t talk now";
		return this.whereNowNameBase();
	};
	
	per.passTimeDay = function() {
		if (this.place == 282) {
			if (this.checkFlag(3)) {
				this.setFlag(4);
				this.setFlag(3, false);
			} else if (this.checkFlag(4)) {
				this.setFlag(3);
				this.setFlag(4, false);
			}
		}
		if (this.checkFlag(16)) {
			this.setFlag(14, false);
			this.setFlag(16, false);
		}
		return '';
	};
	
	// Images
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 53 && this.place == -1 && this.isCharmedBy("Demon") && sType === "") return this.showPerson("ritual-failed.jpg", '', '', '', '', false, "string");
		if (Place == 187 && this.isHere() && sType === "") return this.showPerson(this.isCharmedBy() ? "homec.jpg" : "homeu.jpg", '', '', '', '', false, "string");
		if (Place == 280 && this.isHere() && !this.isCharmedBy("Demon") && sType === "") return this.showPerson(this.isCharmedBy() ? "cluboffice1c.jpg" : "cluboffice1u.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		// Dancing
		if (this.place == -1 && (sType === '' || sType == "ritualtrap")) {
			// Following you
			SetRightColumnSize("");
			return true;
		}
		return ((Place == 282 && this.checkFlag(1) && this.isHere()) || this.place == -1) && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.place == -1) this.showPerson("leading.jpg", undefined, undefined, undefined, undefined, undefined, md);		
		else if (Place == 282) this.showPerson("club1a.jpg", undefined, undefined, undefined, undefined, undefined, md);
	};
	
	per.showEventPopup = function()
	{
		if (Place == 375 && this.place == -1) {
			// Hotel room with Lucy and possibly Jesse
			this.place = 375;
			if (isJesseOk()) {
				// Jesse well
				showPopupWindow("Jesse, Lucy and Sera",
					this.addPersonString("reunited.jpg", "40%", "right") +
					'You visit Jesse and before you say anything the thrall Sera steps over and embraces Jesse. You are unsure if you would say possessively or submissively, in an odd way it is both.</p>' +
					'<p>Jesse does not seem surprised, and just seems to think Sera has been here all along. Strange, but you also see Sera ignores the other thrall and visa versa.'
				);
			} else if (isDemonGone()) {
				// Legion/Jesse let town, only Lucy is here
				showPopupWindow("Lucy and Sera",
					findPerson("Lucy").addPersonString("lucysera1.jpg", "35%", "right") +
					'You visit the thrall and she looks at Sera, walks over next to her and says \"Mistress is not here\" and then continues, this time directed at you,</p>' +
					'<p>"Mistresses other toy can stay here", and that seems to be that.'
				);
			} else {
				// Jesse here but unwell
				showPopupWindow("Jesse, Lucy and Sera",
					findPerson("Lucy").addPersonString("lucysera1.jpg", "35%", "right") +
					'You visit Jesse but she is still unwell.The thrall Lucy looks at Sera, walks over next to her and say \"Mistress is resting\" and then continues, this time directed at you,</p>' +
					'<p>"Mistresses other toy can stay here", and that seems to be that.'
				);
			}
			return true;
		}

		return false;
	};
		
	// Events for Sera
	per.showEvent = function()
	{
		var md, bMan;

		if (Place == 86 && sType == "thrall1") {
			// Meeting at the Stones
			md = WritePlaceHeader();
			this.setFlag(1);
			this.showPerson("seraphina0.jpg");
			addPlaceTitle(md, "Searching the Stones");
			md.write(
				'<p>You search among the stones - between the massive boulders of the Wild Ranges and under the clumps of sticks and pebbles.</p>'
			);

			md.write(
				'<p>"Hello, there", a cute blonde girl speaks to you, "Is that yours, you are lucky to find it. I lost...something here a little while ago and I just cannot find it!"</p>' +
				'<p>She is a very attractive young woman, with a slight build. She notices your appreciative looks, and she smiles,</p>' +
				'<p>"Nice to meet you, my parents call me Seraphina, my friends normally call me Sera or Peaches, I cannot live up to my name, I am no angel!"</p>' +
				'<p>You exchange some pleasant words but she quickly explains that she has to get back to work, that she was just here hiking a bit for exercise, "for my figure". She waves goodbye as she leaves towards the center of Glenvale.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "walk to the Wild Ranges", 26);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (Place == 53) {
			if (sType == "ritualreturnprepare") {
				// Preparing for the Ritual of Return 
				md = WritePlaceHeader();
				this.showPerson("leading.jpg");
				addPlaceTitle(md, "Preparing to Free Seraphina");
				if (perJade.isHere()) {
					if (Place == 53) md.write('<p>You wait for Jade in the alley and show her into the hidden room. She looks surprised and looks around in surprise. She makes a gesture and then checks a crystal in her pocket, "This is like the Sacred Clearing, a place of power. Amazing I did not know this place existed. I am almost impressed, almost."</p><p>She takes a seat against one wall ready for you to proceed.</p>' );
					else md.write('<p>Jade arrives at the Sacred Clearing dressed quite casually for her but I suppose you are in \'public\' as such. She leans against a tree and waits for you to proceed.</p>');
				}

				md.write(
					'<p>You make some preparations for the ritual, you secure the thrall and attach her chain to the statue. You draw a cermonial circle and light a few candles. Little of this is really needed, it is more a show than anything.</p>'
				);
				if (perJade.isHere()) md.write('<p>Jade watches carefully, standing occasionally to get a better view of what you are doing.</p>');
				startQuestions();
				addLinkToPlaceC(md, "perform the ritual", 53, 'type=ritualreturn' + (perJade.isHere() ? '&who=jade' : ''));
				if (!perJade.isHere()) addLinkToPlace(md, "not now, do the ritual later", 53);
				WritePlaceFooter(md);
				return true;
			}
			if (sType != "ritualreturnprepare" && sType.indexOf("ritualreturn") != -1) {
				// Attempt the Ritual of Return 
				md = WritePlaceHeader();
				if (isDemonGone() || sType == "ritualreturngone") {
					setQueryParams('type=ritualreturngone&who=' + sWho);
					// FAILED: Demon has left town with the relic, so it cannot be done
					this.showPerson("ritual-failed.jpg");
					this.setFlag(10);
					addPlaceTitle(md, "Trying to Free the Thrall");
					md.write(
						'<p>You consider trying the Ritual of Return, but you remember it will not work, you do not have the relic and Legion is gone.</p>' +
						'<p>With sorrow you will have to do something else with the thrall. Somewhat disconcerting you see her looking into a mirror and you see <b>no reflection</b> of her in the mirror!</p>'
					);
					startQuestions();
					if (perJade.isHere()) addLinkToPlace(md, 'Jade laughs derisively and leaves', Place, '', 'well that did not work as you hoped', 'perJade.setFlag(22)');
					else addLinkToPlace(md, "well that did not work as you hoped", 53);
					WritePlaceFooter(md);
					return true;

				} else if ((perYourBody.FindItem(48) === 0 && sType != "ritualreturnsuccess") || sType == "ritualreturnfailed") {
					// FAILED: Here but without the relic, cannot be done
					setQueryParams('type=ritualreturnfailed&who=' + sWho);
					this.showPerson("ritual-failed.jpg");
					addPlaceTitle(md, "Attempting the Ritual of Return");
					md.write(
						'<p>You attempt the Ritual of Return but nothing happens, did you forget something?</p>' +
						'<p>Somewhat disconcerting you see her looking into a mirror and you see <b>no reflection</b> of her in the mirror!</p>'
					);
					startQuestions();
					if (perJade.isHere()) addLinkToPlace(md, 'Jade laughs derisively and leaves', Place, '', 'well that did not work as you hoped', 'perJade.setFlag(22)');
					else addLinkToPlace(md, "well that did not work as you hoped", 53);
					WritePlaceFooter(md);
					return true;
					
				} else {
					// WORKED: Here with the relic, it is locked here (for now)
					setQueryParams('type=ritualreturnsuccess&who=' + sWho);
					perYourBody.DropItem(48, -53);
					this.moveThem(187);
					this.unCharmThem();
					this.other = nTime;		// Counter for her to be charmable
					this.showPerson("ritual-success.jpg");
					addPlaceTitle(md, "The Ritual of Return");
					md.write(
						'<p>You quickly start to prepare for the ritual, and you hang the relic on claws of the statue, the only place it will easily fit. The thrall starts to speak, but the relic glows as you also start to recite the words Ms. Jones taught you. As you do the thrall seems to freeze, and you see an eerie image form in one of the mirrors. A ghostly figure that is only visible in the mirror, an indistinct female figure, it has to be Seraphina!</p>' +
						'<p>You call out the last of the words and the thrall lets out a muffled cry, and slumps to the ground and vomits. After a short time she looks up,</p>' +
						'<p>"' + perYou.getPersonName() + ' I am free, you saved me, thank you, thank you!"</p>' +
						'<p>You ask how she is feeling and what she remembers, she suddenly looks very confused,</p>' +
						'<p>"Remember what, sorry did I get drunk and forget last night. I must get to work, Bambi will kill me if I am late, I have to go to my room and change first!"</p>' +
						'<p>She dashes out of the room before you can ask more or cast a spell or whatever you intended. She seems to have lost her memory of being a thrall, at least for now?</p>' +
						'<p>You will have to check with Bambi sometime to speak more with Seraphina.</p>'
					);
					if (perJade.isHere()) md.write('<p>Jade looks astounded and demands you give her details on where you learned the ritual and more details of how to do the ritual. You think you may of impressed her for once!</p>');
					perYou.completeQuest(9);
					perJade.setFlag(23);
					startQuestions();
					addLinkToPlace(md, "leave the hidden room", 52);
					WritePlaceFooter(md);
					return true;
				}
			}
		}
		
		// Several possible places
		if (sType == "seramanageclub") {
			md = WritePlaceHeader();
			this.showPerson(this.isCharmedBy() ? "cluboffice1c.jpg" : "cluboffice1u.jpg");
			addPlaceTitle(md, "Manager 'Mistress Sera'");
			md.write(
				'<pYou discuss with Sera that the Avernus club need someone to look after managing things for Jade as she cannot now. She looks happy,</p>' +
				'<p>"I would love to do it ' + per.getYourNameFor() + ' I have been there often and I am familiar with the things Mistress Jade does there!"</p>' +
				'<p>You note the reference to "Mistress Jade" and you will make arrangements for Sera to handle things there.</p>' +
				'<p>Sera does comment, "I do have my work still at the Hotel and some other jobs, doing these jobs as well will be difficult. If there is someone else I can share the job with it would be a great help!"</p>'

			);
			this.setFlag(14);
			this.setFlag(15);
			startQuestions();
			addLinkToPlaceC(md, 'talk about other things', Place);
			WritePlaceFooter(md);
			return true;			
		}
		if (sType === "stopseramanageclub")  {
			md = WritePlaceHeader();
			if (Place == 280) this.showPerson(this.isCharmedBy() ? "cluboffice1c.jpg" : "cluboffice1u.jpg");
			else this.showPerson(this.isCharmedBy() ? "homec.jpg" : "homeu.jpg");
			addPlaceTitle(md, "Ex-Manager 'Mistress Sera'");
			md.write(
				'<pYou tell Sera that she can stop managing the Avernus club. She looks disappointed but agrees to stop'
			);
			if (Place == 280) md.write(' after she finishes tonight');
			md.write('.</p>');
			if (perJade.isClubOpen()) this.setFlag(14, false);
			else this.setFlag(16);
			startQuestions();
			addLinkToPlaceC(md, 'talk about other things', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (Place == 280 && sType == "seraprivatedance") {
			md = WritePlaceHeader();
			if (this.isCharmedBy()) this.showPersonBG("cluboffice-sex.jpg");
			else this.showPersonRandom("cluboffice-dance");
			addPlaceTitle(md, "Sera\'s Private Dance");

			if (this.isCharmedBy()) md.write('<p>You tell Sera you would like her to dance for you and she starts to seductively remove her clothes, ready for a different sort of intimate dance!</p>');
			else md.write('<p>You ask Sera is she woould give you a private dance, she smiles and says "Well you did get me this job!". She performs a skilled dance and partial strip-tease, but nothing more.</p>');

			// Questions
			startQuestions();
			addLinkToPlace(md, 'talk more to her', Place);
			addLinkToPlace(md, 'leave the office', 281);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1sera") {
			// End Game - Seraphina
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for " + (this.isCharmedBy("Demon") ? "": "ex-") + "Thralls?");
			var sf = this.isCharmedBy("Demon") ? "thrall" : this.getCharmedLevel() == 4 ? 'slave' : 'lover';
			md.write(
				'<p>One day you visit your ' + sf + ' Sera, you see her swollen pregnant belly, she must of met Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 187) {
			bMan = perYou.isMaleSex();
			if (sType == "serafuck") {
				// Fuck
				md = WritePlaceHeader();
				this.showPersonRandom("home-sex", 3);				

				if (this.isLover()) {
					addPlaceTitle(md, "Making Love to Sera");
					if (perYou.isMaleSex()) md.write('<p>You mount your lover telling her how that you love her and how great she looks. You then slap her ass and start to fuck her, concentrating on both yours and her pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that you love her.</p>');
					else md.write('<p>You put on your strap-on and fuck your lover.Sera is clearly inexperienced with this and you tell her that she will have to get used to this and pleasing you in other ways. You find the strap-on is pleasurable and as you near your orgasm you hear Ms. Reagan cry out her orgasm. This triggers you orgasm and you orgasm hard. As you remove your strap-on you tell Sera that you love her.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your slave");
					if (perYou.isMaleSex()) md.write('<p>You mount your slave, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
					else md.write('<p>You put on your strap-on and mount your new slave. Sera is clearly inexperienced with this and you tell her you will teach her everything she needs to know as a good slave. You both orgasm close to each other, Sera looking relieved and you tell her she is a good slave!</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Sera', Place);
				WritePlaceFooter(md);
				return true;
				
			} 
			
			if (sType == "serabj") {
				// Blowjob
				md = WritePlaceHeader();
				if (!isExplicit()) this.showPersonRandomBG("home-bj", 1);
				else this.showPersonRandomXBG("home-bj", bMan ? 3 : 2);					
				
				if (!this.isLover()) {
					addPlaceTitle(md, "Your slave Sera");
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				} else {
					addPlaceTitle(md, "Your Lover Sera");
					if (perYou.isMaleSex()) md.write('<p>You ask her if she would give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth.</p>');
					else md.write('<p>You ask her to lick you, and she kneels uncertain how to proceed. You sit down and give her instructions to pleasure you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm.</p>');
				} 
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Sera', Place);
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "charmsera1") {
				// Charm Sera 1
				md = WritePlaceHeader();
				this.showPerson("charm1.jpg");
				addPlaceTitle(md, "Sera Under a Charm Spell");
				
				md.write(
					'<p>You recite the spell "Dai chu Seraphina", and she cries out,</p>' +
					'<p>"Oh what does that means, there is something familiar like deja vu, but a bit hotter.."</p>' +
					'<p>You notice her reference to <b>deja vu</b>, some memory of becoming a thrall? You can make her a slave if you want'
				);
				if (perYou.checkFlag(26)) md.write(' or be a little gentler and instead make her your lover. So what do you want to do?</p>');
				else md.write('.</p>');

				startQuestions();
				if (perYou.checkFlag(26)) startAlternatives();
				addLinkToPlaceO(md, 'enslave Sera', Place, 'type=charmsera2', '', '', "charmPerson('Seraphina',4);");
				if (perYou.checkFlag(26)) {
					addLinkToPlaceO(md, 'seduce Sera', Place, 'type=charmsera2', '', '', "charmPerson('Seraphina',3);");
					endAlternatives();
				}
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "charmsera2") {
				// Charm Sera 2
				md = WritePlaceHeader();
				this.showPerson("charm2.jpg");
				addPlaceTitle(md, 'Sera Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
				
				if (this.isLover()) {
					md.write(
						'<p>You tell her as you obviously look her over "A lot hotter definitely". She smiles and replies,</p>' +
						'<p>"You\'re not bad yourself..this is really strange, it\'s not like I fall in lust or love this quickly"</p>' +
						'<p>You also smile "It does happen at times, you are really cute, would you show me a little more?"</p>' +
						'<p>Without reply so undoes some of her underwear and poses a bit for you...</p>'
					);
					startQuestions();
					addLinkToPlaceO(md, 'compliment her and ask for more', Place, 'type=charmsera3');
				} else {
					md.write(
						'<p>"What your are really is just reacting to my presence and your desire to be with me and follow me,</p>' +
						'<p>She looks curious, "Really I am not into that stuff Bambi is into..."</p>'
					);
					startQuestions();
					addLinkToPlaceO(md, 'you say "Not like Bambi, no"', Place, 'type=charmsera3');
				}

				WritePlaceFooter(md);
				return true;	
			}			
		
			if (sType == "charmsera3") {
				// Charm Sera 3
				md = WritePlaceHeader();
				this.showPerson("charm3.jpg");
				addPlaceTitle(md, 'Sera Being ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
				
				if (this.isLover()) {
					md.write(
						'<p>She strips more, seductively for her new lover, making a show of her shapely rear end as she removes her panties. She looks back and says,</p>' +
						'<p>"Am I the only one feeling hot and removing clothing?" You get the point and start removing your clothes, playing along to reinforce the spell, but also she is very cute!</p>'
					);
					startQuestions();
					addLinkToPlaceO(md, 'tell her you want her', Place, 'type=charmsera4');
				} else {
					md.write(
						'<p>You tell her "Bambi was into dominating, but I am sure you are more into the thrill, the desire to obey, to submit to anothers desires"</p>' +
						'<p>The spell is working it\'s way in her mind and she starts to remove more of her underwear, making a play of removing her panties. She looks back at you uncertain, and says,</p>' +
						'<p>"I am not sure..." and you interrupt, "I am completely sure, you want me and need me, and meed to obey be, to bring us pleasure".</p>' +
						'<p>She hesitates, but is clearly affected by the spell and you tell her...</p>'
					);
					startQuestions();
					addLinkToPlaceO(md, '"play with yourself, be my slave"', Place, 'type=charmsera4');
				}

				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "charmsera4") {
				// Charm Sera 4
				md = WritePlaceHeader();
				this.showPerson("charm4.jpg");
				addPlaceTitle(md, 'Sera ' + (this.getCharmedLevel() == 4 ? 'Enslaved' : 'Seduced') + ' by a Charm Spell');
				
				if (this.isLover()) {
					md.write(
						'<p>She removes the rest of her clothing, and says "Not just yet" as she plays with her small breasts and spreads her legs for you.</p>' +
						'<p>You re-assert yourself gently and tell her it is time. You embrace your new charmed lover passionately and she cries out as the spell works it\'s climactic effects!'
					);
					startQuestions();
					addLinkToPlaceO(md, 'later talk more to your lover', Place);
				} else {
					md.write(
						'<p>She removes the rest of her underwear and gasps as she obeys, playing with her small breasts. She cries out "' + perYou.getMaster() + '...' + perYou.getMaster() + ' I am your slave of desire"</p>' +
						'<p>With that you embrace your new slave letting her bring you both pleasure in her new found submission.</p>'
					);
					startQuestions();
					addLinkToPlaceO(md, 'later give your slave more orders', Place);
				}

				WritePlaceFooter(md);
				return true;	
			}	
			
			if (sType == "serarecharm") {
				// Recharm Sera
				md = WritePlaceHeader();
				this.showPerson("recharm.jpg");			
				addPlaceTitle(md, "Sera Under a Charm Spell Again");

				md.write('<p>You recite the spell "Dai chu Seraphina", and she cries out,</p>');

				if (this.getCharmedLevel() == 4) {
					// Lover
					this.charmThem(3);
					md.write(
						'<p>"Oh what does that means, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her as you obviously look her over "A lot hotter definitely". She smiles and replies,</p>' +
						'<p>"You\'re not bad yourself..this is really strange, it\'s not like I fall in lust or love this quickly"</p>' +
						'<p>You continue to compliment and seduce her until the spell is firmly established and Sera is your new lover.</p>'
					);
				} else {
					// Slave
					this.charmThem(4);
					md.write(
						'<p>"What your are really is just reacting to my presence and your desire to be with me and follow me,</p>' +
						'<p>You continue to assert your position of authority until the spell is firmly established and Sera is your new slave.</p>'
					);
				}

				startQuestions();	
				addLinkToPlaceC(md, 'talk more to Sera', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}		
		
		if (Place == 375) {
			// Sex scenes in Room 113 with the Thrall Sera
			if (sType == "serasex") {
				// Have Given in to the Thrall's administrations
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("thrallsex1b.jpg");
				else this.showPersonRorX("thrallsex1g.jpg");
				addPlaceTitle(md, "Playing with Sera the Thrall");
				if (isJesseOk()) md.write('<p>You ask Jesse if you can have a private word with Lucy and Jesse waves to you as she starts playing on her phone. You step into the bedroom and Sera the thrall quietly follows you.</p>');
				md.write(
					'<p>Sera the thrall lets out a low moan as you give in to her ministrations.  Within moments she has skillfully unfastened your pants and her hand quickly finds its target, quickly sending shivers of pleasure through you.</p>' +
					'<p>Moments later you can feel her soft supple lips kiss you as her tongue begins to explore your mouth - the heat from her body held so close against you raising your passions even further.</p>' +
					'<p>For a moment you worry that you have done something wrong - that <i>this</i> time the creature is going to devour your soul as the demon walks in the room cackling in delight...  But a moment later that fear is washed away as you feel an orgasm building toward its inevitable climax.</p>' +
					'<p><i>"If nothing else, she was right about one thing,"</i> you think to yourself.  <i>"This is a particularly fun pet to play with."</i></p>'
				);

				startQuestions();
				addLinkToPlace(md, 'tell her to follow you again', 124, '', 'You tell the thrall to follow you' + (isJesseOk() ? '. You tell Jesse who waves but makes no other comment.' : ''), '', "findPerson('Seraphina').place=-1");
				addLinkToPlace(md, 'ask Lucy to join you', Place, 'type=lucyserathreesome');
				addLinkToPlace(md, isJesseOk() ? 'stop and re-join Jesse' : 'stop and push her away', 375);
				addLinkToPlace(md, 'walk back to the bar', 124);
				addLinkToPlace(md, 'leave the hotel', 123);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 282) return false;
		
		if (sType == "checksera") {
			// See her dancing
			this.setFlag(2);
			md = WritePlaceHeader();
			this.showPerson("club1a.jpg");
			addPlaceTitle(md, "Dancing Thrall");
			md.write(
				'<p>You approach the dancer and you immediately recognise her as the thrall you saw with Legion, the blonde girl you had met earlier in the Wild Ranges. Her hair is different but it has either been dyed or it is some sort of demonic spell, you think they can alter their appearance.</p>' +
				'<p>You try to talk to her and find out why she is here. She looks at you,</p>' +
				'<p>"Little ' + perYou.getWitch() + ', you are not my Mistress, I was given to her so I...That no longer matters, my Mistress has given me a new contract."</p>' +
				'<p>Well, she is fully a demon thrall, clearly she remembers your encounter with her and Legion. You are unsure what to do otherwise with her for now. You know little of her, trying to "save" her seems impossible.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "watchsera1") {
			// Watch her dancing 1
			if (!this.checkFlag(4)) this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("club" + (this.checkFlag(3) ? "1" : "2") + "b.jpg");
			addPlaceTitle(md, "Sera Dancing");
			md.write(
				'<p>You decide to watch Sera, the thrall, dance. For a moment you try to rationalise it is to find more out to help her. You give up, you really just want to watch her dance.</p>' +
				'<p>She is dancing remarkably well, but then again the thrall is a thing of passion, and as you watch she starts to strip, her breasts becoming exposed as she gyrates.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "continue watching", Place, 'type=watchsera2');
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "watchsera2") {
			// Watch her dancing 2
			md = WritePlaceHeader();
			this.showPersonRandom("club" + (this.checkFlag(3) ? "1" : "2") + "c", 3);
			addPlaceTitle(md, "Sera Dancing");
			md.write(
				'<p>She continues dancing, erotic and skillfully until she is completely naked. She keeps the pretense of being chained up the entire time and finally the dance finshed to some applause. She looks directly at you,</p>' +
				'<p>"Little ' + perYou.getWitch() + '....", she hesitates and a look of almost confusion passes over her face. It passes and she just smiles and turns away from you as she re-dresses.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', Place);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "approachsera") {
			// Take her
			this.moveThem(-1);
			md = WritePlaceHeader();
			this.showPerson("leading.jpg");
			addPlaceTitle(md, "Taking Possession of a Thrall");
			md.write(
				'<p>You approach Sera..the thrall and try to talk to her and tell her Jade has released her. She looks at you,</p>'
			);
			if (!perJade.isCharmedBy("Vampyre")) {
				md.write(
					'<p>"Little ' + perYou.getWitch() + ', you are not my Mistress."</p>' +
					'<p>You feel a prescence and turn and see Jade standing there looking very smug. She steps over and whispers to Sera..the thrall..who smiles and says "Yes Mistress". She then looks at you and says,</p>' +
					'<p>"You are now my ' + perYou.getMaster() + '" and Jade hands you a chain that is <i>loosely</i> binding the thralls hands, more a token of control</p>' +
					'<p>Jade turns away, with such a look of superiority that is <b>very, very</b> annoying. You can only think of someday when you can enslave her ass and humiliate her!</p>' +
					'<p>It does cross your mind about how Jade claimed the Ritual of Return is impossible that you could offer to show her, proving your power to her'
				)
				if (perYou.checkFlag(67) || perYou.checkFlag(68)) {
					if (perJade.checkFlag(17)) md.write(', and maybe use it as an opportunity as your charm spell will be stronger and may overcome her protection.</p>');
					else md.write(', and maybe use it as an opportunity as your charm spell may affect her then?</p>');
				} else md.write(' and at least gain some respect from her?</p>');
			} else {
				md.write(
					'<p>"My Mistress did not, Little ' + perYou.getWitch() + ', but I feel my Mistress is taken and I am released. You wish to now by my ' + perYou.getMaster() + '?"</p>' +
					'<p>You tell her firmly that you <b>are</b> her ' + perYou.getMaster() + ' and was responsible for what happened to her ex-Mistress, the thrall smiles,</p>' +
					'<p>"You were not <i>directly</i> but yes, you are my ' + perYou.getMaster() + '" and she hands you the end of one of the chains that is <i>loosely</i> binding her, a token of control</p>'
				);
			}
			md.write(
				'<p>You look at Sera, and tell her to follow. She makes no effort to dress and follows behind you completely naked.</p>' +
				'<p><b>But</b> what are you going to do with her. You cannot take her home, you suppose you could secure her somewhere, or possibly'
			);
			if (isDemonGone()) md.write(' you could put her with the other thrall and ask Bambi to make sure they stay there.');
			else if (isJesseOk() && perJesse.getDemonPath() > 602) md.write(' you think she would stay with Jesse as Lucy, the other thrall, seems to obey her');
			md.write('</p>');
			startQuestions();
			addLinkToPlace(md, 'leave the club with her', 281);
			WritePlaceFooter(md);
			return true;		
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("poledance" + (this.isCharmedBy() ? "c" : "u"), 1);
		addPlaceTitle(md, nm + "'s Dance");
		if (this.isCharmedBy()) {
			md.write(
				'<p>' + nm + ' takes the stage dressed in some exotic dancing wear and you immediately see she is a experienced dancer to the applause of the audience and the tips thrown. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
				'<p>After she collects her tips and offers them to you, but you feel ' + nm + ' deserves them.</p>'
			);
		} else {
			md.write(
				'<p>' + nm + ' takes the stage dressed "normally" but with another dancer you do not recognise. They dance together and they are both very skilled and mostly they strip off the others clothing as part of the dance!</p>' +
				'<p>After they collect their tips and divide them. After you ask who the other girl is, and Sera says "She knew me and I sort of remember her but I do not know from where or even her name!". You guess that they danced together when Sera was here as a thrall?</p>'
			);
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after Sera\'s dance', Place);
		WritePlaceFooter(md);
	};
	
	// Text for a place
	per.showPersonTextHere = function(md)
	{
		if (sType !== "") return;
		
		if (Place == 53 && this.place == -1 && this.isCharmedBy("Demon")) md.write('<p>You see the thrall...Sera looking into a mirror, and there is <b>no reflection</b>. You know these mirrors are special, magical in some way, but this is still disconcerting.</p>');
		
		if (Place == 187 && this.isHere())  {
			if (this.isCharmedBy()) {
				if (this.isLover()) md.write('<p>Your lover Sera is waiting for you on her bed.</p>');
				else md.write('<p>Your slave Sera is waiting on her bed to serve you in any way you desire.</p>');
			} else md.write('<p>Sera is relaxing and invites you to sit with her in her bedroom.</p>');
		}
		if (Place == 375 && this.isHere()) md.write('<p>You see the thrall...Sera sitting in the kitchenette area playing with a dildo, not exactly masturbating but near enough!</p>');
		if (Place == 280 && !this.isCharmedBy("Demon") && this.isHere()) md.write('<p>You see Sera is dressed in leather and very much looks the part as Jade\'s replacement!</p>');
		if (Place != 282) return;
		if (!perJade.isClubOpen()) return;

		if (Place == 282 && this.whereNow() == 280 && perJade.isClubOpen()) md.write('<p>Mistress Sera\'s private room is always open to you.</p>');
		else if (this.isHere()) {
			if (!this.checkFlag(2)) md.write('<p>To one side there is a girl dancing in a booth, wearing something made of leather and bound in chains, or at least pretending to be. She looks familiar but you cannot place her. <b>Maybe you should check her out</b></p>');
			else md.write('<p>To one side you see the thrall Sera dancing for her Mistress.</p>');
		}
	};

	// Questions for Sera
	per.showPersonChat = function(md)
	{
		if (Place == 53 && this.isCharmedBy("Demon") && sType === "" && this.isHere()) {
			if (isKnowRitualReturn() && !isPossess()) {
				if (nMana > 0 && isPlaceAttuned(53) && perYou.checkFlag(21) && whereItem(35) == -53) {
					if (!isDemonGone() || !this.checkFlag(10)) addLinkToPlaceC(md, 'perform the Ritual of Return', Place, 'type=ritualreturnprepare');
				} else addTextForQuestions(md, 'You know the ritual to save Seraphina but not everything is ready for it');
			}
		}
		if (Place == 187 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, this.isLover() ? '"shall we make love"' : 'fuck your slave', Place, 'type=serafuck');
				addLinkToPlaceC(md, this.isLover() ? '"could you go down on me?"' : 'have your slave ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=serabj');
				gameState.bDanceLink = this.checkFlag(14);
				this.addSleepLink(md, "spend the night with Sera", "Going to Bed with Sera",
					'<br><br><br><br>You tell Sera that you will sleep here tonight. She lies down awaiting you to join her.',
					"bed.jpg", undefined, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
				);
			} else {
				addLinkToPlaceC(md, 'chat with Sera', Place, '', 'You chat for a while with Sera, she is very grateful to you, without being quite sure what for', '', 'WaitHereOnly(3)');
				this.addDancingLink(md, 'talk to Sera about dancing in the club',
					'You ask Sera if she would be interested in dancing at the Avernus club since you can arrange a session if she likes.</p>' +
					'<p>&quot;Of course ' + perYou.getYourNameFor() + ' I have danced in the past and would welcome the extra money!&quot; and with that you call ' + getClubManager().getPersonName() + ' to arrange a dance for Sera.'
				);
			}
		}
		if (Place == 375 && this.place == 375 && sType === "") {
			addLinkToPlace(md, perJesse.getDemonPath() < 600 ? 'play with Sera the thrall for a bit' : 'talk to \'Sera\' privately', 375, 'type=serasex');
		}
		if (Place == 282 && sType === "" && this.whereNow() == 280 && perJade.isClubOpen()) addLinkToPlaceC(md, 'visit Mistress Sera', 280);

		if (Place == 280 && sType === "" && this.isHere() && !this.isCharmedBy("Demon")) {
			// Jade's room/office
			if (!perJade.checkFlag(10)) addQuestionC("top", 'ask about dancing in the club', "Seraphina", 670);
			if (perJade.extra[0] > 0) addQuestionC("top", 'ask for the performance fees', "Seraphina", 671);
			if (perJade.isDanceAvailable()) {
				this.addQuestionR("top", 'ask to perform in the club',
					'You ask Sera to dance in the club, the money would be useful to you. She agrees.' ,
					"perJade.setDancer(\\'You\\')"
				);	
			}			
			addLinkToPlaceC("top", 'ask Sera for a private dance', Place, 'type=seraprivatedance');			
		}
		// various locations
		if (sType === "" && !this.isCharmedBy("Demon") && this.isHere() && Place != 269) {
			// Common to any place
			if (perJade.checkFlag(19) && !this.checkFlag(14) && getClubManagersTotal() < 3) addLinkToPlaceC("top", "talk to Sera about managing the Avernus club" + (this.checkFlag(16) ? " again" : ""), Place, 'type=seramanageclub');
			if (this.checkFlag(14) && getClubManagersTotal() > 1) addLinkToPlaceC("top", "tell Sera she can stop managing the Avernus club", Place, 'type=stopseramanageclub');
		}
		
		// Thrall in the club
		if (sType !== "" || !perJade.isClubOpen() || !isAtLocation(282, this.whereNow()) || !this.isCharmedBy("Demon")) return;
		if (Place == 280 && perJade.isHere() && checkPersonFlag("Jade", 5) && this.checkFlag(2)) {
			// Jade's office
			if (isDemonFreed()) {
				if (!isDemonGone() && !isDemonBound()) {
					if (!this.checkFlag(6)) addLinkToPlaceC(md, 'ask about Seraphina', Place, '', 'You reconsider asking, Legion is still loose you had best deal with her before trying to deal with Seraphina', '', "setPersonFlag('Seraphina',6)");
				} else {
					if (!checkPersonFlag("Leanne", 8) && !isDemonGone()) {
						if (!this.checkFlag(7)) addLinkToPlaceC(md, 'ask ' + (this.checkFlag(6) ? 'again ' : '') + 'about Seraphina', Place, '', 'You reconsider asking, you do not know how to deal with her or potentially save her', '', "setPersonFlag('Seraphina',7)");
					} else if (isDemonGone()) {
						if (!this.checkFlag(8)) addQuestionC(md, 'ask ' + (this.checkFlag(6) ? 'again ' : '') + 'about Seraphina', "Jade", 676);
					} else if (isDemonBound()) {
						if (!this.checkFlag(8)) addQuestionC(md, 'ask ' + (this.checkFlag(6) ? 'again ' : '') + 'about Seraphina', "Jade", 674);
					}
				}
			}
		}
		
		if (Place == 282) {
			// Main area at the Avernus club
			if (!this.checkFlag(2)) addLinkToPlaceC(md, 'check the familiar dancer', Place, 'type=checksera');
			else {
				addLinkToPlaceC(md, 'watch Sera the thrall dance', Place, 'type=watchsera1');
				if (this.checkFlag(9) || perJade.isCharmedBy("Vampyre")) addLinkToPlaceC(md, 'approach Sera to take her from here', Place, 'type=approachsera');
			}
		}
		
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Present but she is a thrall
			if (this.isCharmedBy("Demon") && this.isHere()) {
				addComments("As you cast the spell you suddenly smell a hint of brimstone. The thrall looks at you and smiles, but otherwise nothing happens. The spell seems to have done nothing.");
				return "handled";
			} else if (this.isHere() && this.hoursSince() < (7 * 24)) {
				addComments('You attempt to cast the spell, but it seems there is something residual of the demon about her and it fails.');
				return "handled";
			} else if (this.isHere()) {
				CastCharmSpell("Seraphina", Place, 4, 'type=charmsera1', '', 'type=serarecharm');
				return "handled";
			}
		}
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {
			if (!this.isCharmedBy("Demon") && this.isHere()) {
				if (this.hoursSince() < (7 * 24)) {
					addComments('You sense there is something residual of the demon about her and it will probably be with her for ' + ((7 * 24) - this.hoursSince()) + ' more hours');
					return "handled";
				}
			}
		}
				
		return "";		// do nothing
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() || (this.isCharmedBy("Demon") && this.checkFlag(9)) ? "endgame1sera" : "";
	};
	
	// Phone calls
	per.isPhoneable = function() { return false; };
}
