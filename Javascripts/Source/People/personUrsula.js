/************************************
 Ursula Melin, Detective
		
************************************/
function initialiseUrsula()
{
	// Ms Reagan, school Principal
	addPerson("Ursula", 0, "Ursula", "");
	
	per.getPersonAddress = function(n) { return this.isCharmedBy() && isPlaceKnown("UrsulasHouse") ? n ? 131 : '121 Parkview Rd, Glenvale' : n ? 0 : ''; };
	
	per.getPossessionFace = function()
	{
		return 'face' + (this.isCharmedBy() ? 'c' : 'u');
	};

	per.getPersonName = function(full) {
		if (full === true) return "Ursula Hamilton";
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 2) return "Ursula the Bimbo";
			if (clv == 4) return "Slave Ursula";
			return "Ursula, your lover";
		} else return this.name;	// If NOT Charmed
	};
	per.getPersonNameShort = function(uncharmed) {
		return "Ursula";
	};
	
	per.isLover = function(nc) { return this.getCharmedLevel() == 3; };

	per.whereNow = function() {
		if (Place == 132) return Place;
		return this.place;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 131 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPerson(this.getCharmedLevel() == 2 ? "hallsexmenub.jpg" : this.getCharmedLevel() == 3 ? "hallsexmenul.jpg" : "hallsexmenus.jpg", '', '', '', '', false, "string");
			return this.showPerson("meeting.jpg", '', '', '', '', false, "string");
		}	
		else if (Place == 132 && this.isHere() && sType === "") return this.showPerson(this.getCharmedLevel() == 2 ? "bedsexmenub.jpg" : this.getCharmedLevel() == 3 ? "bedsexmenul.jpg" : "bedsexmenus.jpg", '', '', '', '', false, "string");				
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 131 && this.isHere() && sType === "") {
			if (!this.isCharmedBy()) {
				if (!this.checkFlag(8)) md.write('<p>Ursula asks "Did you find his location?" and you reply...</p>');
				else md.write('<p>Ursula looks uncertain "I have not decided yet"</p>');
			} else {
				if (this.isLover()) {
					md.write(
						'<p>"Oh ' + perYou.getYourNameFor() + ', is there something I can help you with?" says Ursula.</p>'
					);
				} else if (this.getCharmedLevel() == 2) {
					md.write(
						'<p>"Oh ' + perYou.getMaster() + ', like did you want to do me?" asks Ursula.</p>'
					);					
				} else {
					md.write(
						'<p>"Oh ' + perYou.getMaster() + ', how can I serve you" asks Ursula.</p>'
					);
				}
				return;
			}
			if (Place == 132 && this.isHere() && sType === "") {
				md.write('<p>Your ' + (this.isLover() ? 'lover' : this.getCharmedLevel() == 2 ? 'bimbo' : 'slave') + ' quickly removes some of her clothing and stands waiting for you.</p>');
			}				
		}
	};
	
	per.askUrsula = function(ps)
	{
		findPerson(ps);
		if (!this.checkFlag(3)) {
			addQuestionR(md, 'ask about Melin',
				per.getYourNameFor() + ", In the time of the Kurndorf Cult, after the incident the judge was found dead in his cabin. The true reason for his death is unknown, but I assume that Kurndoff killed Merlin with the influence of the spell removed.</p>" +
				"<p>Melin was quite enthusiastic with making a proposal of sharing his family with Kurndoff before his death. After the incident, very little information is known about the family.",
				ps,
				"setPersonFlag(\\'Ursula\\',3);" + (Place == 95 ? "setPersonFlag(\\'Ursula\\',5)" : "setPersonFlag(\\'Ursula\\',6)")
			);
		} else {
			addQuestionR(md, 'ask more about Melin',
				'"I understand one of his decendants Ursula has become a private detective with a special interest in occult related cases."</p>' +
				"<p>You ask if they have any information regarding her address,</p>" +
				'<p>"I have heard a mob attacked Melin\'s house after the court verdict, I have heard it was since rebuilt. The house is now owned by a Mr Hamilton, and he is married to Ursula.</p>' +
				'<p>There is no way she should have guessed that magical events are going on this town without some other source. Here is the address we have"',
				ps,
				"setPersonFlag(\\'Ursula\\',4);setPlaceKnown(\\'UrsulasHouse\\');" + (Place == 95 ? "setPersonFlag(\\'Ursula\\',5)" : "setPersonFlag(\\'Ursula\\',6)")
			);			
		}
	};
	
	per.showPersonChat = function(md)
	{
		if ((Place == 131 || Place == 132) && sType === "" && this.isHere() && this.isCharmedBy()) {
			var bs = this.getCharmedLevel() == 2 ? "bimbo" : "slave";
			addLinkToPlaceC(md, this.isLover() ? '"Shall we make love"' : 'fuck your ' + bs, Place, 'type=ursulafuck');
			addLinkToPlaceC(md, this.isLover() ? '"Could you go down on me?"' : 'have your ' + bs + ' ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you') , Place, 'type=ursulabj');
			if (!perYou.isMaleSex() && perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your ' + bs + ' with your strapon', Place, 'type=ursulafuckstrap');
			if (perYou.isMaleSex()) addLinkToPlaceC(md, this.isLover() ? '"Can I play with your tits"' : 'fuck your ' + bs + '\'s tits', Place, 'type=ursulaboobjob');
			if (Place == 132) {
				this.addSleepLinkRandom(md, "spend the night with " + this.getPersonNameShort(), "Going to Bed with Ursula",
					'<p style="position:absolute;right:2%;bottom:2em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">You tell Ursula that you will sleep here tonight. She lies down awaiting you to join her.</p>',
					"bed.jpg", 2, true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
				);			
			}
		}
		if ((Place == 131 || Place == 132) && sType === "" && this.isHere() && !this.isCharmedBy() && !this.checkFlag(8)) {
			if (isDavyCaptive()) addLinkToPlaceC(md, 'tell her you know where Davy is and offer to take her there', wherePerson("Davy"), 'type=ursuladavy');
			addLinkToPlace(md, "tell her not yet", 130, '', 'With that she asks you to leave her home');
		}
		if (Place == 95 && isPersonHere("Angela") && this.checkFlag(1) && !this.checkFlag(5) && (!this.checkFlag(3) || !this.checkFlag(4))) this.askUrsula("Angela");
		if (Place == 110 && isPersonHere("Mayor") && this.checkFlag(1) && !this.checkFlag(6) && (!this.checkFlag(3) || !this.checkFlag(4))) this.askUrsula("Mayor");
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 46 && this.checkFlag(13) && !this.checkFlag(1)) {
			// Finding the file
			this.setFlag(1);
			// Anyone here?
			var perTanika = findPerson("MrsTanika");
			var perAnita = findPerson("Anita");
			var pn = findPerson("Tess").isHere() ? "Tess" : "";
			if (pn === "" && perTanika.isHere()) pn = perTanika.getPersonName();
			if (pn === "" && perAnita.isHere()) pn = perAnita.getPersonName();
			if (pn === "" && isAtLocation(45, findPerson("Elian").whereNow())) pn = "Elian";
			showPopupWindow("Who is that Lady",
				this.addPersonStringAnon("file.jpg", "height:max%", "right") +
				"When you enter your bedroom " + (pn !== "" ? pn + " shows you a file she found on your bed, saying she is unsure when it was put there" : "you see a file on your bed") + ". " +
				(isMurderPath() ? "It contains many details regarding your presence at Town Hall, the Library and that you were spotted minutes before the death of Sir Ronald in his mansion" :
										"It contains details about all your meetings in the Town Hall, Library and spending time outside of Sir Ronald's manor") +
				". It has a simple title \"Find me if you will\"</p>" +
				"<p>By reading though page by page you were able to notice a name Melin that you think maybe the writer of the document. As you recall the name belongs to the judge who let Kurndorf walk away from prison."
			);
			return true;

		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md, clv, type, bMan;
		
		if (sType == "endgame1ursula") {
			// End Game - Ursula
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Detectives?");
			var sf = this.getCharmedLevel() == 4 ? 'slave' : this.getCharmedLevel() == 2 ? 'bimbo' : 'lover';
			md.write(
				'<p>One day you talk to your ' + sf + ' Ursula, you see her swollen pregnant belly, she must of met Miss. Logan somewhere!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "ursuladavy") {
			// Take her to meet Davy
			WaitHereOnly(6);
			this.setFlag(8);
			md = WritePlaceHeader();
			var ds = '';
			if (Place == 81) perDavy.showPerson("home2-" + (perDavy.checkFlag(18) ? "bound" : "free") + ".jpg");
			else if (Place == 161) {
				if (perDavy.isMan()) {
					if (perDavy.isCharmedBy()) perDavy.showPersonRorX("davycellar-bound1.jpg");
					else perDavy.showPerson("davycellar-bound1.jpg");
				} else perDavy.showPersonRandom("davycellar-bound1", 2);
			} else perDavy.showPerson("davy3.jpg");
			addPlaceTitle(md, "Ursula and Davy");
			
			md.write(
				'<p>You tell Ursula you know where Davy is and you are about to offer to take her to see him and she interrupts,</p>' +
				'<p>"Take me to see him immediately, I want you with me so I can keep an eye on you" and you realise she is suspicious of some sort of trap or double cross.</p>' +
				'<p>She asks you to wait and comes back a few minutes later after changing her clothes, you are unsure why and ask and she shortly says "Other people will be around, I will look like I am your date". You suppose it is reasonable, but such a tight dress?</p>' +
				'<p>She takes you to the garage and you get into her car and you drive to the '
			);
			if (Place == 81) md.write('Robbin\'s house and you take her into Davy\'s room.');
			if (Place == 161) md.write("Broken Inn Hotel and then you take her into the cellar.");
			else md.write("Broken Inn Hotel and then you take her into the room Davy is in.");
			if (!perDavy.isMan()) {
				md.write(
					'</p><p>Ursula looks puzzled and asks "This is Davy, this woman?" You really do not want to go into transformation spells and other magic things yet and also hesitate. Before you answer she continues,</p>' +
					'<p>"Really I thought he was a guy, I was sure I had photos...but I seem to also remember she is a woman with an odd name..." You recall how people were often affected by the transform spell and it seems to affect their memory and make them forget how they used to be. This is the first time you remember it happening to someone else!'
				)
			}
			md.write(
				'</p><p>Ursula looks at Davy and you explain how ' + perDavy.getHeShe() + ' is completely in your control now and that ' + perDavy.getHeShe() + ' will do anything Ursula needs and supply any information she wants. This is not quite true as there is a lot on magic that you will not be telling Ursula about!</p>' +
				'<p>Ursula looks genuinely troubled and says "This is not what I expected..." and then she asks a few questions of Davy more relating to the time of the Kurndorf cult. You tell Davy to answer and ' + perDavy.getHeShe() + ' does to the satisfaction of Ursula. She looks at you and then ' + perDavy.getHimHer() + ',</p>' +
				'<p>"I am going to have to consider this and return later when I have it worked out." and she says she is leaving.</p>'
			);
			
			startQuestions();
			addLinkToPlaceO(md, 'let Ursula leave', Place);
			AddPeopleColumnMed(md);
			this.showPerson("meetingdavy.jpg");
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType.indexOf("charmursuladavy") != -1) {
			// Charm Ursula with Davy
			if (sType == "charmursuladavy1") {
				// Event: Cast Charm on Ursula with Davy 1
				md = WritePlaceHeader();
				this.showPerson("charm1b.jpg");
				addPlaceTitle(md, "Ursula Under a Charm Spell");
				
				if (Place == 81) md.write("<p>You ask Davy to leave the room for now");
				else md.write('<p>You ask Ursula to speak in private for a moment and  she agrees and follows you to another room in the Hotel');
				md.write(
					'. She asks what you wanted and you recite the spell "Dai chu Ursula", and she cries out,</p>' +
					'<p>"Oh ' + perYou.getPersonName() + ' what is this..why am I feeling like this...Ahh"</p>' +
					'<p>You decide that while you could just enslave her you could of just done that at her home. Here she is confused and feeling at least a bit better towards you, she agreed to speak privately with you with out any apparent suspicion. So the best approach you feel is to make her into your enchanted lover!</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'seduce Ursula', Place, 'type=charmursuladavy2');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "charmursuladavy2") {
				// Event: Cast Charm on Ursula 2
				md = WritePlaceHeader();
				this.showPerson("charm2lover.jpg");
				addPlaceTitle(md, 'Ursula Being Seduced by a Charm Spell');

				md.write(
					'<p>You talk to her about how you are helping her despite her blackmail and she asks tentatively "Why?" You tell her how attactive she is and you are falling for her and ask pointedly if she likes you, though given the spell it is more telling her that she likes you!</p>' +
					'<p>She replies, "Well...I suppose you are cute...and I am separated from my husband.". She adjusts her clothing and asks,</p>' +
					'<p>"Do you like my dress?" though she is more asking if you like her body.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, '"Very much" as you look her up and down', Place, 'type=charmursuladavy3');

				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charmursuladavy3") {
				// Event: Cast Charm on Ursula 3
				md = WritePlaceHeader();
				this.showPerson("charm3lover.jpg");
				addPlaceTitle(md, 'Ursula Being Seduced by a Charm Spell');

				md.write(
					'<p>You compliment her dress and her body, avoiding overly sexual references, but it is difficult given the way she dresses! She looks a bit more playful and says,</p>' +
					'<p>"Let me offer you something" and she runs her hands over her breasts, and then picks up her camera and she deletes all the photos and other data she has on you. You thank her and ask if you could have something a little more?</p>' +
					'<p>She smiles and strips off to just her underwear and gestures for you to do the same, and she asks,</p>' +
					'<p>"Is this it, or did you want more?"</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, '"More!"', Place, 'type=charmursuladavy4&ctype=fuck');
				addLinkToPlaceO(md, '"More for my ' + (perYou.isMaleSex() ? 'cock"' : 'pussy"'), Place, 'type=charmursuladavy4&ctype=bj');

				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "charmursuladavy4") {
				// Event: Cast Charm on Ursula 4
				type = getQueryParam("ctype");
				md = WritePlaceHeader();
				var bMan = perYou.isMaleSex();
				this.showPerson("charm4lover.jpg");

				addPlaceTitle(md, 'Ursula, Your Lover');

				if (perYou.isMaleSex()) {
					if (type == "fuck") md.write('<p>You fuck Ursula</p>');
					else md.write('<p>Ursula gives you a blowjob</p>');
				} else {
					if (type == "fuck") md.write('<p>You fuck Ursula with your strap-on.</p>');
					else md.write('<p>Ursula licks you.</p>');				
				}

				// Choices
				startQuestions();
				addLinkToPlace(md, "let her go home", Place);
				WritePlaceFooter(md);
				return true;
			}	
			
		}
		
		if (Place == 269) {
			if (sType == "ursulapool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with " + this.getPersonName());
				if (this.getCharmedLevel() == 2) md.write('<p>Your bimbo Ursula arrives dressed sluttily as always but in a bikini this time, and poses for you.</p>');
				else if (this.isLover()) md.write('<p>Your lover Ursula arrives dressed in a bikini, and poses for your pleasure and it looks hers as well.</p>');
				else md.write('<p>Your slave Ursula promptly arrives dressed in a bikini, and she poses for your pleasure.</p>');

				startQuestions();
				if (this.getCharmedLevel() == 2) {
					addLinkToPlaceC(md, 'Ursula pulls you towards a lounge saying "Fuck me"', Place, 'type=ursulapoolsex');
					if (perYou.isMaleSex()) addLinkToPlaceC(md, 'Ursula pulls you towards a lounge saying "Fuck my tits"', Place, 'type=ursulapoolboobjob');
				} else if (this.isLover()) {
					addLinkToPlaceC(md, 'suggest going somewhere private and intimate', Place, 'type=ursulapoolsex');
					if (perYou.isMaleSex()) addLinkToPlaceC(md, 'ask to play with her boobs', Place, 'type=ursulapoolboobjob');
				} else {
					addLinkToPlaceC(md, 'order your slave to go somewhere private with you', Place, 'type=ursulapoolsex');
					if (perYou.isMaleSex()) addLinkToPlaceC(md, 'play with your slave\'s boobs', Place, 'type=ursulapoolboobjob');
				}
				addLinkToPlaceC(md, 'say goodbye to ' + this.getPersonName(), Place);
				
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "ursulapoolsex") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("pool-fuckb", isExplicit() ? 3 : 1);
				else this.showPersonRandom("pool-fuckg", 1);
				
				addPlaceTitle(md, "Ursula at the pool");
				md.write('<p>' + this.getPersonName() + ' is quite content to fuck by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "ursulapoolboobjob") {
				md = WritePlaceHeader();
				this.showPersonRandomRorX("pool-boobjob", isExplicit() ? 3 : 1);
				
				addPlaceTitle(md, "Ursula\'s Tits by the pool");
				md.write('<p>' + this.getPersonName() + ' is quite content for you to fuck her tits by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + this.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		if (Place == 131 || Place == 132) {
			bMan = perYou.isMaleSex();
			clv = this.getCharmedLevel();
			
			if (!this.checkFlag(7) || sType == "firstmeeting") {
				// First meeting
				setQueryParams("type=firstmeeting");
				md = WritePlaceHeader();
				this.place = 131;
				this.showPerson("meeting.jpg");
				addPlaceTitle(md, "Meeting Ursula");
				md.write(
					'<p>After opening the front door of the house you hear a voice which says "Come upstairs". You follow the voice and reach a bedroom, and you see a busty woman holding a camera. You consider how she is even more beautiful than she is in the picture Tracy sent! Your thoughts are interrupted when she says,</p>' +
					'<p>"Hello, I am Ursula Hamilton née Melin. I work as a private detective in the next town" , she introduces herself. After a pause she continues,</p>' +
					'<p>"Now coming to the case, I find it very interesting that you are spotted near many hot spots in this town?"  You are not sure how to answer, you decided to play it safe and claim it was just chance. She is clearly disinterested in your reply,</p>' +
					'<p>"Cut the crap. I know about your friend Davy and his ancestral connection with the Stears. Look, I get it, my family was in a similar position too as yours", she gets emotional as she speaks. She regains her composure,<p>' +
					'<p>"Try to help me find his location and I will help you to overcome the torture offered by him", she asks for a deal. You reply that you will help, but deep down knowing that this woman has completely misread the situation around this town. Maybe it is for the best you think.</p>'
				);
				if (isDavyCaptive()) {
					md.write(
						'<p>After all you know exactly where Davy is and could tell her?'
					);
				} else {
					md.write(
						'<p>You could just track down Davy and let her know later?'
					);	
				}
				md.write(
					' Then again, she has been quite intrusive and could be a threat. It may just be safest to enslave her, you doubt anything subtler or nicer would work if you are this up front.</p>'
				);
				this.setFlag(7);
				startQuestions();
				if (isDavyCaptive()) addLinkToPlaceC(md, 'tell her you know where Davy is and offer to take her there', wherePerson("Davy"), 'type=ursuladavy');
				addLinkToPlaceC(md, 'say goodbye to Ursula', 130);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "ursulafuck") {
				// Fuck
				md = WritePlaceHeader();
				if (Place == 131) {
					if (!perYou.isMaleSex()) this.showPersonRandom("hallfuckg", 3);
					else this.showPersonRandomRorX("hallfuckb", isExplicit() ? 3 : 1);
				} else if (Place == 132) {
					if (!perYou.isMaleSex()) this.showPersonRandom("bedfuckg", 2);
					else this.showPersonRandomRorX("bedfuckb", isExplicit() ? 7 : 1);
				}

				if (clv == 3) {
					addPlaceTitle(md, "Making Love to Ursula");
					if (perYou.isMaleSex()) md.write('<p>You mount your lover telling her how that you love her and how great she looks. You then slap her ass and start to fuck her, concentrating on both yours and her pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that you love her.</p>');
					else md.write('<p>You decide to try some tribbing with your lover.</p>');
				} else {
					addPlaceTitle(md, "Fucking Your slave");
					if (perYou.isMaleSex()) md.write('<p>You mount your slave, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
					else md.write('<p>You decide to try some tribbing with your lover.</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Ursula', Place);
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "ursulabj") {
				// Blowjob
				md = WritePlaceHeader();
				if (Place == 131) this.showPersonRandomRorXBG("hallbj", isExplicit() ? bMan ? 3 : 1 : 1);
				else if (Place == 132) this.showPersonRandomRorXBG("bedbj", isExplicit() ? bMan ? 6 : 1 : bMan ? 1 : 2);
				
				if (clv == 4) {
					addPlaceTitle(md, "Your slave "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				} else {
					addPlaceTitle(md, "Your Lover "  + this.getPersonNameShort());
					if (perYou.isMaleSex()) md.write('<p>You ask her if she would give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth.</p>');
					else md.write('<p>You ask her to lick you, and she kneels uncertain how to proceed. You sit down and give her instructions to pleasure you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm.</p>');
				} 
				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "ursulaboobjob") {
				// Tit fuck
				md = WritePlaceHeader();
				if (Place == 131) this.showPersonRandomRorX("hallboobjob", isExplicit() ? 3 : 1);
				else if (Place == 132) this.showPersonRandomRorX("bedboobjob", isExplicit() ? 3 : 1);

				addPlaceTitle(md, "Fucking Your " + (this.isLover() ? "Lover" : "Slave") + " Ursula's Titus");
				if (clv == 4) md.write('<p>You tell her that she will now fuck her tits.</p>');
				else md.write('<p>You fuck your lovers tits.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;					
			}	
			
			if (sType == "ursulafuckstrap") {
				// Strap-on fuck
				md = WritePlaceHeader();
				this.showPersonRandomX("straponfuck", 3);
				addPlaceTitle(md, "Fucking Your " + (this.isLover() ? "Lover" : "Slave") + " Ursula");
				if (clv == 4) md.write('<p>You tell her that she will now fuck her with your strap-on.</p>');
				else md.write('<p>You take out your strap-on and Ursula lies back ready for you to fuck her.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to '  + this.getPersonNameShort(), Place);
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "ursularecharm") {
				// Recharm Ursula
				md = WritePlaceHeader();
				this.showPerson("recharm.jpg");			
				addPlaceTitle(md, "Ursula Under a Charm Spell Again");

				md.write('<p>You recite the spell "Dai chu Ursula", and she cries out,</p>');

				if (this.getCharmedLevel() == 4) {
					// Lover
					this.charmThem(3);
					md.write(
						'<p>"Oh what does that means, there is something familiar like deja vu, but a bit hotter.."</p>' +
						'<p>You tell her as you obviously look her over "A lot hotter definitely". She smiles and replies,</p>' +
						'<p>"You\'re not bad yourself..this is really strange, it\'s not like I fall in lust or love this quickly"</p>' +
						'<p>You continue to compliment and seduce her until the spell is firmly established and Ursula is your new lover.</p>'
					);
				} else {
					// Slave
					this.charmThem(4);
					md.write(
						'<p>"What your are really is just reacting to my presence and your desire to be with me and follow me,</p>' +
						'<p>You continue to assert your position of authority until the spell is firmly established and Ursula is your new slave.</p>'
					);
				}

				startQuestions();	
				addLinkToPlaceC(md, 'talk more to Ursula', Place);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place != 131) return false;
		
		
		if (sType == "charmursula1") {
			// Event: Cast Charm on Ursula 1
			md = WritePlaceHeader();
			this.showPerson("charm1a.jpg");
			addPlaceTitle(md, "Ursula Under a Charm Spell");
			
			md.write(
				'<p>You think let\'s see what will happen if she finally learns the truth and you recite the spell "Dai chu Ursula", and she cries out wordlessly.</p>' +
				'<p>You laugh at her pathetic situation and think it like a monkey getting caught in her own cage. She shouts at you " YOU LYING ASSHOLE".</p>'
			);
			if (perYou.checkFlag(26)) md.write('<p>You are somewhat annoyed with her out-burst, she is such a big titted slut, maybe you can use that...and her.</p>');

			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceO(md, 'remain silent as the spell works to enslave Ursula', Place, 'type=charmursula2', '', '', "charmPerson('Ursula',4);");
			if (perYou.checkFlag(26)) {
				addLinkToPlaceO(md, 'tell her "Shut up you Bimbo!"', Place, 'type=charmursula2', '', '', "charmPerson('Ursula',2);");
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "charmursula2") {
			// Event: Cast Charm on Ursula 2
			md = WritePlaceHeader();
			this.showPerson("charm2" + (clv == 2 ? "bimbo" : "slave") + ".jpg");
			addPlaceTitle(md, 'Ursula Being ' + (clv == 2 ? 'Bimbofied' : 'Enslaved') + ' by a Charm Spell');

			if (clv == 2) {
				// Bimbo
				md.write(
					'<p>She hesitates but denies it "I\'m not a bimbo, I am blonde and have large breasts...". You interrupt to assert control and contine "large fake breasts, pouty lips and a large butt. You dress in tight, revealing clothes, and are meeting me in the bedroom! That is exactly what a bimbo is, a highly sexual person whose looks matter more than anything. A woman who lives for sex!"</p>' +
					'<p>You can see your words affecting her and she unconsciously starts removing her clothes and then asks,</p>' +
					'<p>"Do you like my body and how I dress?"</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'say "You are one hot bimbo"', Place, 'type=charmursula3');
			} else {
				// Slave
				md.write(
					'<p>Ursula cries out "Oh my I have fallen into my own web with tears coming in my eyes". You know within few minutes she will be mindless whore pet. She moves her hand and starts to remove her top.</p>' +
					'<p>She begs for your opinion, "Do you like my body?"</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'say you will tell her once she deletes all data on you', Place, 'type=charmursula3');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmursula3") {
			// Event: Cast Charm on Ursula 3
			md = WritePlaceHeader();
			this.showPerson("charm3" + (clv == 2 ? "bimbo" : "slave") + ".jpg");
			addPlaceTitle(md, 'Ursula ' + (clv == 2 ? 'Bimbofied' : 'Enslaved') + ' by a Charm Spell');

			if (clv == 2) {
				md.write(
					'<p>She starts to deny being a bimbo "I do not think..." and you interrupt, "That is right, you do not need to think, you just need to look good, be ready for sex and obey when I ask you for <b>anything</b>"</p>' +
					'<p>She looks very, very aroused, she must of had at least some thoughts like this in the past, look at her! Before these get too entrenched you ask her to delete all the photos and other data she has on you. She hesitates, like she is having trouble remembering how, but then quickly erases all the data, and then poses in front of you wearing little besides her underwear.</p>' +
					'<p>You can see the spell almost has her accepting her new role and you try to reinforce it and tell her how sexy she is, describing her large breasts, her ass and figure as perfect. She asks knowing the answer,</p>' +
					'<p>"Perfect for what?"</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, '"Perfect for a fuck"', Place, 'type=charmursula4&ctype=fuck');
				addLinkToPlaceO(md, '"Perfect for ' + (perYou.isMaleSex() ? 'cock-sucking' : 'pussy licking'), Place, 'type=charmursula4&ctype=bj');

			} else {
				md.write(
					'<p>She eagerly picks up her camera and deletes all pictures within a few seconds. She then looks expectantly at you,</p>' +
					'<p>You tell her that her body is very sexy and how it is good she asked for your approval and permission to do <b>anything</b>. She asks,</p>' + 
					'<p>"Are you happy ' + perYou.getMaster() + '", she pleads before you. "My ancestors have served Kurndorf but he is not as beautiful and powerful as you, it is fiting for me to serve you as a slave". She pauses and asks "Will you take me?</p>' +
					'<p>You tell her you will, and she replies, "Thank you ' + perYou.getMaster() + ', I will work for your approval".</p>'
				);
				startQuestions();
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'have her serve you with her body', Place, 'type=charmursula4&ctype=fuck');
				addLinkToPlaceO(md, 'have her take care of you orally', Place, 'type=charmursula4&ctype=bj');

			}

			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmursula4") {
			// Event: Cast Charm on Ursula 4
			type = getQueryParam("ctype");
			md = WritePlaceHeader();
			var bMan = perYou.isMaleSex();
			this.showPerson("charm4" + (clv == 2 ? "bimbo" : "slave") + ".jpg");

			addPlaceTitle(md, 'Ursula, Your ' + (clv == 2 ? 'Bimbo' : 'Slave'));

			if (perYou.isMaleSex()) {
				if (type == "fuck") md.write('<p>You fuck Ursula</p>');
				else md.write('<p>Ursula gives you a blowjob</p>');
			} else {
				if (type == "fuck") md.write('<p>You fuck Ursula with your strap-on.</p>');
				else md.write('<p>Ursula licks you.</p>');				
			}
			
			md.write(
				'<p>After you ask her about her husband and she dismisses him, saying they are separated at the moment and he is living out of town.</p>'
			);

			// Choices
			startQuestions();
			addLinkToPlace(md, "leave her home", 130);
			WritePlaceFooter(md);
			return true;
		}	
		
		return false;
	};
	
	
	per.showEventSleep = function(wt)
	{
		if (!isAtLocation(45) && !this.checkFlag(2) && canVisitSarah()) {
			// First time spending the night away from home
			this.setFlag(2);
		}
		return false;
	};
	
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1ursula" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (Place == 131 && this.isHere()) {
				// In her home
				CastCharmSpell("Ursula", Place, 1, 'type=charmursula1', '', 'type=ursularecharm');
				return "handled";
			}
			if (sType == "ursuladavy") {
				// Meeting Davy
				CastCharmSpell("Ursula", Place, 3, 'type=charmursuladavy1');
				return "handled";
			}
			return "";
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=ursulapool');
			if (this.getCharmedLevel() == 2) receiveCall('','You call your bimbo Ursula and invite her to join you at the pool, and she eagerly agrees.'); 
			else if (this.isLover()) receiveCall('','You call your lover Ursula and invite her to join you at the pool, and she readily agrees.'); 
			else receiveCall('','You call your slave Ursula and order her to join you at the pool, and immediate obeys and says she will be there as soon as she can.'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	
	per.addPersonPhoneCall = function() {
		// All messages SENT are post charm, once per day, except 400,407 and they are initiated by Ursula in her code
		if (!this.isCharmedBy()) return;
		
		if (this.hoursCharmed() > 24 && !this.checkFlag(11)) {
			if (this.makeCall(true, 425)) this.setFlag(11);
		}	
		if (this.hoursCharmed() > 48 && !this.checkFlag(12)) {
			if (this.makeCall(true, 426)) this.setFlag(12);
		}			
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 425: return receiveSMS('Ursula', 'Do you like my new lingerie ' + perYou.getYourNameFor(), "sms1.jpg");
			case 426: return receiveSMS('Ursula', 'I love to play with balls', "sms2.jpg");
		}
		return '';
	};

}
