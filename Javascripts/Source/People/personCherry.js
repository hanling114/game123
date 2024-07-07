/****************************************************************
Cherry (Yoga Studio)
 ****************************************************************/
function RepliesCherry(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var perCherry = per;
	var perBeasley = findPerson("Mr Beasley");
	var perVictoria = findPerson("Victoria");

	if (nR == 1)
	{
		addComments('<p>"Let me see it ' + myName + '.  Hmm..very nice and quite old. The crystals and stones are very protective but I know little more."</p>');
		setPersonFlag("Pamela",10);
	}
	else if (nR == 2)
	{
		addComments('<p>"Ah! One time Victoria told me to let her know if I ever saw something like this. The previous owner of the store wanted something about it being a perfect defence.</p><p>Interestingly Esmeralda visited recently and asked about such an item, and offered <i>anything</i> I wanted if I could locate one of these items for her</p>');
		setPersonFlag("Pamela",10);
		setPersonFlag("Pamela",11);
	}
	else if (nR == 192)
	{
		if (isConspiracyPath()) {
			addComments(
				'<p>"Magic Stones?, I just had a young woman sell me something that may be what you are asking about". You ask about the woman, but all Cherry can remember is that she was a waitress or maid. She gets out an odd little stone and shows it to you,</p>' +
				'<p>"I have heard of things like these, they are found around the place, possibly relics of the early days of Glenvale. Still they have no value and I do not consider them antiques. I have seen them for sale in one of the other shops, some people liked them as a novelty item. Here you may have it for ' + sCurrency + '10"</p>'
			);
			if (nMoney < 10) {
				if (nMoney <= 0) addComments('<p>You regretfully tell her you have no money and she smiles, and gives the stone to you, "As I said it has no real value to me, so you may have it. Come back sometime if you work out some interesting things about it."</p>');
				else addComments('<p>You regretfully tell her you do not have enough money and she smiles, and gives the stone to you, "As I said it has no real value to me, so you may have it. Come back sometime if you work out some interesting things about it."</p>');
			} else {
				AddCash(-10);
				addComments('<p>You hand her the money and she smiles, and gives the stone to you, "Come back sometime if you work out some interesting things about it."</p>');
			}
			perYourBody.PutItem(5);
			if (perBeasley.other < 3) {
				perBeasley.other = 3;  // Sets this to 3 Murder && apprentice
				if (!isCharmedPath()) perYou.completeQuest(1);
				setPlaceKnown("WildRanges");
				setPlaceKnown("Park");
				PlaceI(5, 26); // Set stone in the wild ranges
				addComments('<p>As you turn to leave Cherry calls after you, "The young woman did mention that she found this in the <b>Wild Ranges</b>, you know that place north of the Glenvale Park."</p>');
			}
		} else {
			addComments(
				'<p>"Magic Stones?", she asks, and you describe the stones as ' + (isMurderPath() ? 'Mr. Beasley' : perGates.getPersonNameShort()) + ' told you. Cherry replies,</p>' +
				'<p>"I have heard of things like that, they are found around the place, possibly relics of the early days of Glenvale. Still they have no value and I do not consider them an antique. I think I once saw them for sale in one of the other shops, some people liked them as a novelty item. Sorry ' + myName + ' I do not have any here"</p>'
			);
		}
		perVictoria.setFlag(4);
	}
	if (nR == 200)
	{
		addComments('<p>"Let me see it ' + myName + '.  Quite an interesting ring, it has quite an ancient design, but hard to date, in the style of the mythical \'Ring of Arae\', the ring of the furies of curses that is said to invoke and lift curses or other enchantments."</p>');
		perVictoria.setFlag(33);
	}
	else if (nR == 700)
	{
		addComments(
			'You ask Cherry if she knows about any items or books that may talk about how to free someone from being enslaved by a demon,</p>' +
			'<p>"Yes, ' + myName + ', I once heard a ballad, a fairy story, that told of a man stolen by a demon and how his sister went to great lengths to save him. In the end she had to use a powerful relic, a piece of a dragon, that allowed her to perform a ritual at a fairy mound. The ballad does not end well, the demon had to be present and while the man was saved, the demon required the sister to surrender and she was taken away. So the brother was won and the sister lost.</p>' +
			'<p>I would guess the part of dragon spoke of is the legendary "Dragon\'s Eye Gem" but I do not know where this may be, if it ever existed."'
		);
		setPersonFlag("Leanne", 10);
	}
	else if (nR == 701)
	{
		addComments(
			'You ask Cherry if she knows about an artifact called \'The Mirror of Souls\',</p>' +
			'<p>"Yes, ' + myName + ', it is supposed to be a mirror that shows a persons true nature. I once heard my <i>father</i> mention it watches over a dragon in a hidden place here in Glenvale."</p>'
		);
		perVictoria.setFlag(9);
	}
	else if (nR == 1851)
	{
		perVictoria.setFlag(1);
		if (!bCharm) {
			//Normal
			addComments('<p>"Catholic Relic? Around here?" She says evasively. "Well, the convent just outside of town has been around for some time, but I don\'t know of any specific artifact, no."</p>');
		} else {
			// Charmed
			addComments('<p>"A Catholic Relic, ' + myName + '?  I remember my past master mentioning something about an ancient relic but that was before I moved here.  I\'m sorry, ' + myName + '.  I wish I could tell you more."</p>');
		}
	}
	else if (nR == 1852)
	{
		perVictoria.setFlag(1);
		perVictoria.setFlag(2);
		if (!bCharm) {
			//Normal
			addComments('<p>"What\'s this?" She asks, inspecting the relic.  "Very interesting." She says, immediately pulling out a large book and leafing through it.  "Said to have power of demons if properly prepared.  Fascinating. Where did you find this?" She asks, eyeing you suspiciously.</p>');
		} else {
			// Charmed
			addComments('<p>"Give me a moment, ' + myName + '." She says, immediately opening a large tome.  "According to this the relic has <i>power over demons</i>, but it does not say any more than this.  Not being magical myself I am afraid I will be of little more help.  I am sorry, ' + myName + '. Perhaps you should seek the council of someone more... magically inclined.  Perhaps the psychic in town," She suggests.  "If, that is, she is actually a psychic."</p>');
			if (!isPlaceKnown("NewAgeStore")) setPlaceKnown("NewAgeStore"); //know about the new age shop
		}
	}
	else if (nR == 14501)
	{
		perVictoria.setFlag(3);  //asked the question
		if (!bCharm) {
			//Normal
			addComments('<p>"I\'m sorry?" She asks.  "Do you think I carry such fantastical items?  Now, if you are interested in a yoga mat I <i>may</i> be able to help you." She says.  You get the <b>distinct</b> impression that she is lying to you.</p>');
		} else {
			// CHARMED
			if (perYou.getQuestAftane() === 0) perYou.setQuestAftane(1); //Start the Aftane Path
			addComments('<p>"Give me a moment, ' + myName + '." She says looking through some of her notes. "My father made some mention of such an Artifact, but once he discovered it was guarded by the Gates Family, ');
			if (perYourBody.FindItem(41) > 0) {
				//already have the Aftane
				addComments('" She says, suddenly stopping as her eyes settle on the aftane around your neck.  "And it would seem you have already found it, ' + myName + '."');
			} else {
				//Doesn't have the aftane
				addComments(' he stopped trying to get it.  Perhaps you should try there."</p>');
			}
		}
	}
	else if (nR == 3000) 
	{
		perCherry.setFlag(10);
		addComments("<p>\"A native American style Dream Catcher, it will prevent bad dreams. You will only have <b>important</b> dreams and will suffer no harm and have a pleasant nights sleep. In your bedroom you can <b>use</b> it by hanging it on your wall. Just <b>pick it up</b> and store it somewhere to stop it working.\"</p>");
	}
	else if (nR == 3001)
	{
		addComments('<p><b>Buying a Dream Catcher</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > 9 || bCharm) {
			perYourBody.AddItem(69);
			if (bCharm) addComments('Cherry smiles and gives you the dream catcher for free. You put it into your backpack.');
			else {
				AddCash(-10);
				addComments('You pay ' + sCurrency + '10 and tuck the dream catcher into your backpack.');
			}
		}
		else if (nMoney < 10) addComments('You do not have enough money. The dream catcher costs ' + sCurrency + '10.');
	}
	else if (nR == 3002) 
	{
		perCherry.setFlag(11);
		addComments("<p>\"This is an incense diffuser, it will slowy release incense during the night. Some say it guarantees <b>interesting</b> dreams but I have never noticed a change. You set this on a bedside table to <b>use</it>, and <b>pick it up</b> to stop it working.\"</p>");
	}
	else if (nR == 3003)
	{
		addComments('<p><b>Buying a Crystal Diffuser</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > 14 || bCharm) {
			perYourBody.AddItem(70);
			if (bCharm) addComments('Cherry smiles and gives you the crystal diffuser for free. You put it into your backpack.');
			else {
				AddCash(-15);
				addComments('You pay ' + sCurrency + '15 and tuck the crystal diffuser into your backpack.');
			}
		}
		else if (nMoney < 15) addComments('You do not have enough money. The diffuser costs ' + sCurrency + '15.');
	}
	else if (nR == 3004) 
	{
		perCherry.setFlag(12);
		addComments("<p>\"A carved pendant of pyrites, it is a protective crystal the infuses the wearer with vitality. I have heard it <b>regenerates</b> your inner reserves and protects against many things. Just wear it for full effect.\"</p>");
	}
	else if (nR == 3005)
	{
		addComments('<p><b>Buying a Pyrite Pendant</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > 44 || bCharm) {
			perYourBody.PutItem(71);
			if (bCharm) addComments('Cherry smiles and gives you the pendant for free. You put it iaround your neck.');
			else {
				AddCash(-45);
				addComments('You pay ' + sCurrency + '45 and tuck the pendant around your neck.');
			}
		}
		else if (nMoney < 45) addComments('You do not have enough money. The pendant costs ' + sCurrency + '45.');
	}
	else if (nR == 3006) 
	{
		perCherry.setFlag(13);
		addComments(
			"<p>\"A carved idol of the Ancient Egyptian god Nehebkau, early in history he was a fire breathing demon serpent, some say possibly the origin of the myths of <b>dragons</b>. Later a protective god who is one of the judges of the dead and provider of the ka, one of the souls of the dead.</p>" +
			"<p>The paperwork says this is certified as ancient around 500BC, but were fairly common, so a limited number are available for sale. I would carry it with me as a good luck charm!\"</p>"
		);
	}
	else if (nR == 3007)
	{
		addComments('<p><b>Buying an idol of Nehebkau</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > 94 || bCharm) {
			perYourBody.PutItem(72);
			if (bCharm) addComments('Cherry smiles and gives you the idol for free. You put it and the paperwork into your backpack.');
			else {			
				AddCash(-95);
				addComments('You pay ' + sCurrency + '95 and put the idol and paperwork in your bag.');
			}
		}
		else if (nMoney < 95) addComments('You do not have enough money. The idol costs ' + sCurrency + '95.');
	}	
	else if (nR == 3008) 
	{
		perCherry.setFlag(38);
		addComments(
			"<p>Meditation is an easy skill to learn but it can take years to fully master."
		);
		if (bCharm) addComments(" I will be happy to teach you anytime you wish.");
		else addComments("A lesson will cost you " + sCurrency + '50 and take about 1 hour.');
	}
	else if (nR == 3009)
	{
		addComments('<p><b>Learning Meditation</b></p>');
		if ((!bCharm) && nMoney < 50) addComments('You do not have enough money. The lesson costs ' + sCurrency + '50.');
		else {
			if (!bCharm) AddCash(-50);
			perYou.setFlag(61);
			WaitHereOnly(12);
			addComments(
				'You sit down with Cherry on the yoga mats and she instructs you to sit comfortable and focus on your breathing. She continues to instruct you in the basics of meditation, even how to meditate on an item with your eyes open.</p>' +
				'<p>She recommends you practise daily and use a zafu pillow and gives a number of other suggestions. You hope this will be enough for now to use the hydromancy power.'
			);
			if (perYourBody.NoItems < perYourBody.MaxItems) {
				perYourBody.PutItem(5);
				addComments(
					'</p><p>During the lesson Cherry has you try meditating on some items as well as with your eyes closed. One set is a group of crystals and stones, and you notice one is a magic stone! You ask about it and she seems to think nothing and gives it to you as part of the lesson!</p>'
				);
			}
		}
	}		
	return true;
}


// Initialise

function initialiseCherry()
{
	addPerson("Cherry", 350, "Cherry");
	
	per.Replies = RepliesCherry;
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return (this.isCharmedBy() ? "Slave Cherry" : "Cherry,") + " Yoga Instructor";
	};

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = "<p><img src='Images/" + (this.isCharmedBy() ? "cherry2" : "cherry0") + ".jpg' style='width:37%;float:right;margin-left:5px' alt='Cherry'>";
		if (this.isCharmedBy()) {
			return s + 'Cherry told you her story when you enslaved her. Now you understand why she looked at you so passionately before her ultimate surrender to you. She said she felt a strong a presence in you, and warned you that a dominant spirit like yours needs to be trained and well preserved. She offered her services for you without any price.<br><br>Just by a few visits to her shop you realized that Cherry is not only beautiful, but quite bright. She learned a great deal about wizardry, magic and the power of control because her father used her as a spy against his enemies. She showed you around the shop while you two talked about the items on the shelves and the knowledge she has about them. You can always ask her about occultism and magic and she will help you out. Cherry is standing behind her desk, quietly waiting for your commands. She is more submissive than your other slaves and you know she would kill for you if it would bring the slightest smile on your face.<br><br>You just have to ask”!';
		} else return s + "Cherry, the lovely owner of the Chakra Chachkies " + getShopStore(true);
	};

	per.getPersonAddress = function(n) { return this.isCharmedBy() ? n ? (isShopOpen() ? 0 : 350) : 'above the Chakra ' + getShopStore(true) + ', Glenvale Shopping Center' : n ? 0 : ''; };
	
	per.getPossessionFace = function() { return 'cherry-face' + (this.isCharmedBy() ? 'c' : 'u'); };
	
	per.getSuffix = function() {
		var clv = this.getCharmedLevel();
		if (clv == 3) return "-lover";
		return "-slave";		// clv == 4
	};	

	// Can you chat with Cherry
	per.showPersonChat = function(md)
	{
		if (!this.isHere() || sType !== "") return;
		
		if (!this.checkFlag(8)) {
			addPopupLinkC(md, 'introduce yourself', "Cherry",
				this.addPersonString("cherry0.jpg", "height:max%", "right") +
				"As you are looking at a dream catcher you hear the owner of the " + getShopStore() + " call out,</p>" +
				'<p>"Nice to meet you ' + perYou.getPersonName() + '.  My name is Cherry, this is my ' + getShopStore() + ' is there something I can help you with?"</p>' +
				"<p>You answer that you are just browsing, she then asks,</p>" +
				'<p>"Please do, are you interested in yoga classes?" You are not particularly, Amy had tried to get you into this sort of thing but <i>no</i>. You are certainly interested in Cherry though!',
				false, "setPersonFlag('Cherry', 8);dispPlace();"
			);
			return;
		}

		var clv = this.getCharmedLevel();
		var perDesiree = findPerson("Desiree");
		var perLeanne = findPerson("Leanne");
		var perVictoria = findPerson("Victoria");
		
		//Catholic Relic Questions
		if (perDesiree.getQuestRelic() > 0 && !perVictoria.checkFlag(1)) {
			// Started the Catholic Relic Path
			addQuestionC(md, '"Do you know anything about an old Catholic relic around here?"', "Cherry", 1851);
		}
		if (perYourBody.FindItem(48) > 0 && !perVictoria.checkFlag(2)) {
			addQuestionC(md, 'show her the Relic - "Know anything about this?"', "Cherry", 1852);
		}

		//Aftane of the Dead MURDER Path - so that you can get the aftane on the murder path
		if (isMurderPath()) {
			//On the Murder path
			if (perKurndorf.getQuestSeance() >= 16 && !perVictoria.checkFlag(3)) {
				//Seance path has STARTED
				addQuestionC(md, '"Do you know of any relics that can protect from evil spirits?"', "Cherry", 14501);
			}
		}

		if (checkPersonFlag("Pamela", 8) && !checkPersonFlag("Pamela", 9) && !checkPersonFlag("Pamela", 10) && !checkPersonFlag("Pamela", 11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet?"', "Cherry", 1);
		}
		if (checkPersonFlag("Pamela",  8) && checkPersonFlag("Pamela",  9) && !checkPersonFlag("Pamela",  11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet, it is called a \'Twin Souls\' bracelet?"', "Cherry", 2);
		}
		if (perLeanne.place == 382 && !perLeanne.checkFlag(10)) addQuestionC(md, 'ask Cherry about saving Leanne', "Cherry", 700);
		if (perLeanne.place == 382 && perLeanne.checkFlag(8) && !this.checkFlag(9) && !checkPersonFlag("Vampyre", 2)) addQuestionC(md, "ask Cherry about the 'Mirror of Souls'", "Cherry", 701);
		
		if (!perVictoria.checkFlag(33) && perYourBody.FindItem(32) > 0) addQuestionC(md, 'ask about the silver ring', "Cherry", 200);
		
		if (perYou.isQuestStarted(1) && this.checkFlag(8) && !perVictoria.checkFlag(4)) addQuestionC(md, 'ask if she has any magic stones', "Cherry", 192);

		if (clv > 0) {
			addLinkToPlaceO(md, clv == 3 ? 'make love to Cherry' : 'use your slave Cherry again', Place, 'type=cherrysex');
			addLinkToPlaceO(md, (clv == 3 ? 'ask Cherry to ' : 'have Cherry ') + (perYou.isMaleSex() ? 'suck your cock' : 'lick you'), Place, 'type=cherrybj');
			if (this.checkFlag(25)) addLinkToPlaceO(md, 'give Cherry the spanking she deserves and wants', Place, 'type=cherryspanking');
			if (!isShopOpen(0)) {
				// Night, shop is closed and she is charmed, so you are in her apartment
				this.addSleepLink(md, "spend the night with Cherry", "Going to Bed with Cherry",
					'<p style="position:absolute;right:2%;bottom:1em;cursor:pointer;font-size:1.1em;width:66%;font-weight:bold">' +
					(clv == 3 ? 'You tell your beautiful slave that you will sleep here tonight. She lies down awaiting you to use her.'
					          : 'You tell your beautiful lover that you would like sleep here tonight. She lies down awaiting you and smiles and you know sleep may not be the first thing on her mind.'),
					"bed1.jpg", true, undefined, undefined, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0"
				);
			}
		}
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		if (this.isHere() && !this.checkFlag(25) && this.getCharmedLevel() == 4 && this.hoursCharmed() > 23) {
			this.setFlag(25);
			showPopupWindow("It\'s a Spanking?",
				this.addPersonString("spanking-start.jpg", "height:max%", "right") +
				"Your slave Cherry is having a drink of water after some yoga and offers you a glass. She walks up and you are sure she deliberately spills some on you and says a very token \"Oops\'</p>" +
				'<p>You are more perplexed than angry, very little was spilled and she is smiling. It all becomes clear when she bends over pulling down what little she was wearing exposing her lovely rear end, and she says,</p>' +
				'<p>"I am so sorry ' + perYou.getMaster() + ', would you like to punish me, give me a good spanking?"'
			);
			return true;
		}
		
		return false;
	};

	per.showEvent = function()
	{
		var md, clv;
		
		if (Place == 269 && sType == "cherrypool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Swimming with Cherry");
			md.write(
				'<p>Cherry arrives, dressed in a lovely red bikini, and she sits to have a chat with you before going for a swim.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Why not just ' + (perYou.isMaleSex() ? 'suck' : 'lick') + ' me in the pool', Place, 'type=cherrypoolsex');
			addLinkToPlaceC(md, 'say goodbye to Cherry', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "cherrypoolsex") {
			md = WritePlaceHeader();
			this.showPersonRorXBG("pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Cherry");
			md.write(
				'<p>Cherry hides most of her body underwater and gives you a blowjob.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Cherry', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1cherry") {
			// End Game - Cherry
			md = WritePlaceHeader();
			this.showPerson(this.getCharmedLevel() == 3 ? "pregnantlover.jpg" : "pregnantslave.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Yoga Instructors?");

			md.write(
				'<p>One day you receive a message from your ' + (this.getCharmedLevel() == 4 ? 'slave' : 'lover') + ' Cherry, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (!this.isHere()) return false;
		
		clv = this.getCharmedLevel();
		
		if (sType == "recharmcherry1") {
			// Recharm Cherry
			md = WritePlaceHeaderNI();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Cherry Under a Charm Spell Again");

			if (this.getCharmedLevel() == 4) {
				// Now Lover
				this.charmThem(3);
				md.write(
					'<p>You tell Cherry, "Do you feel the lust and desire building in you again, this is not just that you want to obey me, but you love me, I am not your ' + perYou.getMaster() + ' but your lover"</p>' +
					'<p>She looks at you almost disappointed but that is replaced as her expression softens and she looks at you with a more loving expression.</p>'
				);
			} else {
				// Now slave
				this.charmThem(4);
				md.write(
					'<p>You tell Cherry, "You love me and desire me and want to obey me completely and without question..."</p>' +
					'<p>She continues "as your willing and total slave ' + perYou.getMaster() + '" and she smiles as if this is how it was intended all along.</p>'
				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Cherry', Place);
			WritePlaceFooter(md);
			return true;				
		}

		if (sType == "charmcherry1") {
			// CHARM Cherry 1
			md = WritePlaceHeaderNI();
			this.showPerson("cherry2.jpg");
			addPlaceTitle(md, "Cherry Under a Spell");
			md.write(
				'<p>She looks at you, quite calmly almost like she is unaffected. She stands from her yoga pose and then proceeds to bow down very deeply.'
			)
			if (isCharmedBy("Victoria")) md.write(' This seems reminiscent of how Victoria was when she was charmed. Could it be her \'father\' was also in command here too?');
			md.write(
				' She addresses you,</p>' +
				'<p>"Something you said, I know and it will in a few minutes make me your complete and subservient slave"'
			);
			if (isCharmedBy("Victoria")) md.write(' Very, very reminiscent!');
			
			if (perYou.checkFlag(26)) {
				md.write('</p><p>It seems you can simply accept her as a new slave, but if you wish something else then you are going to have to firmly take control now!</p>');
			}
			startQuestions();
			if (perYou.checkFlag(26)) startAlternatives();
			addLinkToPlaceC(md, '"Uhm...  You\'re not also reading my mind, are you?"', Place, 'type=charmcherry2slave');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceC(md, '"Uhm...No, it will make you love me"', Place, 'type=charmcherry2gf');
				endAlternatives();
			}
			WritePlaceFooter(md);
			return true;
		}
		if (sType.indexOf("charmcherry2") != -1) {
			// CHARM Cherry 2
			md = WritePlaceHeaderNI();
			this.showPerson("cherry3.jpg");
			if (sType == "charmcherry2gf") {
				addPlaceTitle(md, "Cherry Enamoured by a Spell");
				this.charmThem(3);		// Now lover charm
				md.write(
					'<p>She smiles at you. "Will it? Well I do feel very aroused, but that is hardly unusual. Still you are quite attractive..."</p>' +
					'<p>She stands and undoes her shorts and then drop to the floor, and she smiles and says "Oops but are you sure it is not just lust and it is time for a quickee as such?"</p>' +
					'<p>You assure her it is lust, but it is more than that and it will become more quite quickly.</p> ' +
					'<p>"Of course...," she says. "What was your name again?" she asks.</p>' +
					'<p>You are getting a clear impression she is rather promiscuous, happily indulging in passionate encounter with little thought or care, quite a bit like your friend Catherine in fact.</p>'
				);				
			} else {
				addPlaceTitle(md, "Cherry Being Enslaved by a Spell");
				md.write(
					'<p>She smiles at you. "Also? No, I am not reading your mind," she says as she begins to undress. "I have often played domination or submission games with lovers, but somehow I feel you are my perfect ' + perYou.getMaster() + '"</p>' +
					'<p>"Uhm...  Well...  Yes, that is what you shall call me from now on.  And, as for you, I suppose Cherry is fine.  Or slave," you stammer.  "But, I reserve the right to change my mind ' +
					'<p>You firmly tell her you are that and that she will obey you completely and without reservations. You ask her what she knew of the words you said, it was like she had heard them before.</p>' +
					'<p>"I sometimes buy and sell items to the Antiques store owner Victoria and she once mentioned forbidden magics, I felt it was this affecting me, increasing my lust, at least higher than usual.."</p>' +
					'<p>You are getting an impression she is rather promiscuous or at least lusty, you would guess happily indulging in passionate encounter with little thought or care, quite a bit like your friend Catherine in fact.</p>'
				);
			}
			startQuestions();
			if (sType == "charmcherry2gf") addLinkToPlaceC(md, 'You tell her your name and say "Shall we continue undressing..."', Place, 'type=charmcherry3');
			else addLinkToPlaceC(md, '"Yes, uhm...  continue undressing..."', Place, 'type=charmcherry3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmcherry3") {
			// CHARM Cherry 3
			md = WritePlaceHeaderNI();
			this.showPerson("cherry4.jpg");
			if (clv == 3) {
				// lover charm
				addPlaceTitle(md, "Cherry Enamoured by a Spell");
				md.write(
					'<p>"Do you like what you see, ' + perYou.getPersonName() + '?" she asks as she removes the last of her clothing.</p>' +
					'<p>"Yes, I do," you say and start to remove some of your clothing. You ask, "How do you know so much about what is happening to you?"</p>' +
					'<p>"I have always had a strong feeling for things, a friend once called me psychic, but I think I am more in tune with the energies that flow in the world and in our bodies"</p>' +
					'<p>Well she does run a \'new age\' shop so it seem reasonable she believes in Chi and the power of crystals or lay-lines. The human energy system as acupuncture is said to control, the flow of Chi in your body. ' +
					'You are not so sure, but then again the spell put an energy called Mana into people and it then controls their mind and body!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Tell me more Cherry"', Place, 'type=charmcherry4');

			} else {
				addPlaceTitle(md, "Cherry Being Enslaved by a Spell");
				md.write(
					'<p>"Do you like what you see, ' + perYou.getMaster() + '?" she asks as she removes the last of her clothing.</p>' +
					'<p>"Yes, I do," you say, slowly beginning to recover from your initial surprise.  "How do you know so much about what is happening to you?"</p>' +
					'<p>"I have always had a strong feeling for things, a friend once called me psychic, but I think I am more in-turn with the energies that flow in the world and in our bodies"</p>' +
					'<p>Well she does run a \'new age\' shop so it seem reasonable she believes in Chi and the power of crystals or lay-lines. The human energy system as acupuncture is said to control, the flow if Chi in your body. ' +
					'You are not so sure, but then again the spell put an energy called Mana into people and it then controls their mind and body!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Tell me more, and play with yourself to prepare for your ' + perYou.getMaster() + '."', Place, 'type=charmcherry4');

			}
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmcherry4") {
			// CHARM Cherry 4
			md = WritePlaceHeaderNI();
			this.showPerson("cherry5.jpg");
			addPlaceTitle(md, "Cherry Under a Spell");
			if (clv == 3) {
				md.write(
					'<p>"As you wish, ' + perYou.getMaster() + '," she says as kneels on the yoga mat now completely naked. She begins to fondle her breasts.  "Is this what you wanted?"</p>' +
					'<p>You tell her you meant for her to explain more of her insights into magic. She smiles, "There is not a lot more, I just know things, I could tell when you walked in we would be having sex". She laughs a little ' +
					'"Not an unusual insight but I was quite sure and I thought it would lead to something more dominating and submissive..."<p>' +
					'<p>You again talk about how it is desire, growing into affection and more, about love.<p>' +
					'<p>She smiles "Aren\'t you the romantic, but I do see what you mean. Why not take it to the next level!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'embrace you new lover', Place, 'type=charmcherry5');
			} else {
				md.write(
					'<p>"As you wish, ' + perYou.getMaster() + '," she says as kneels on the yoga mat now completely naked. She begins to fondle her breasts.  "Is this what you wanted?"</p>' +
					'<p>"That will do for now," you say, feeling more and more comfortable around your newest aquisition. She says,</p>' +
					'<p>"I feel that I was destined to be a <i>slave</i>, your slave and a position I fully embrace!"</p>' +
					'<p>"Do you wish to use me now, ' + perYou.getMaster() + '?" she asks, the smell of sex suddenly assailing you and reminding you why you cast the spell in the first place.'
				);
				startQuestions();
				addLinkToPlace(md, '<i>use</i> your new slave in as many ways as you can think of', Place, 'type=charmcherry5');
			}

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmcherry5") {
			// CHARM Cherry 5
			md = WritePlaceHeaderNI();
			if (isExplicit()) this.showPersonXBG("cherry6.jpg");
			else this.showPerson("cherry6.jpg");
			addPlaceTitle(md, "Cherry Under a Spell");
			myName = perYou.getMaster();
			md.write(
				'<p>"Oh ' + myName + '," she cries as you take her, over and over again.</p>' +
				'<p>Sometime later, and after some of the most interactive sex play you have had in some time, you finally ' +
				'find yourself sitting across from her on the may.</p>' +
				'<p>Although you are exhausted, it would seem that your new ' + (clv == 3 ? 'lover' : 'slave') + ' has more energy than you previously thought possible.</p>'
			);
			if (clv == 3) {
				md.write(
					'<p>She sighs, "Whatever you did, what magic you use is really great, it keeps me ready for you anytime! I am <i>your lover</i> now, ' + myName + '. I live in an apartment upstairs of the ' + getShopStore() + ', you make to visit me anytime, day or night."</p>'
				);				
			} else {
				md.write(
					'<p>She sighs, "The spell certainly helps to keep me perpetually ready for you, I am <i>yours</i> now, ' + myName + '.  In every way possible, just as every other piece of merchandise in what is now <i>your</i> ' + getShopStore() + ' as well.  Which I will continue to watch over ' +
					'as long as you wish it of me. I live in an apartment upstairs of the ' + getShopStore() + ', you make use of me anytime, day or night."</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'speak with Cherry of other matters', Place);
			addLinkToPlace(md, 'leave the ' + getShopStore() + ' in Cherry\'s capable hands', 194);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (this.isHere() && sType == "cherrysex") {
			// Repeat Sex - fuck/trib
			md = WritePlaceHeaderNI();
			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonRandomX("fuckb", 5);
				else this.showPerson("fuckba.jpg");
			} else this.showPersonRandom("fuckg", 2);

			myName = this.getYourNameFor();

			addPlaceTitle(md, "Playing with " + (clv == 3 ? "" : "Slave ") + "Cherry");

			md.write(
				'<p>You have sex with Cherry</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'speak with Cherry of other matters', Place);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 344);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "cherrybj") {
			// Repeat Sex - Blowjob/lick
			md = WritePlaceHeaderNI();

			if (perYou.isMaleSex()) this.showPersonRandomRorX("bjb", isExplicit() ? 4 : 1);
			else this.showPersonRandomRorX("bjg", isExplicit() ? 3 : 1);

			myName = this.getYourNameFor();

			addPlaceTitle(md, (clv == 3 ? "" : "Slave ") + "Cherry Playing with You");

			md.write(
				'<p>Cherry pleasures you orally</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'speak with Cherry of other matters', Place);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 344);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "cherryspanking") {
			// Spanking
			md = WritePlaceHeaderNI();

			this.showPersonRandom("spanking", 2);

			myName = this.getYourNameFor();

			addPlaceTitle(md, "Spaning " + (clv == 3 ? "" : "Slave ") + "Cherry");

			md.write(
				'<p>You spank Cherry, which she seems to enjoy immensely!</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'speak with Cherry of other matters', Place);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 344);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1cherry" : "";
	};

	// Cast a spell on her
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Yoga studio/shop
			if (Place == 350 && this.isHere())  {
				if (!this.checkFlag(8)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Cherry", Place, 4, 'type=charmcherry1', '', 'type=recharmcherry1');
				return "handled";
			}
		}
		return "";		// do nothing
	};

	
	// Phone calls

	per.callThem = function() {
		if (Place == 269) {
			if (isShopOpen(0)) WriteComments("You call Cherry to invite her to join you at the pool for a swim, but she replies, \"Sorry, " + this.getYourNameFor() + ", the studio is open now, can we do this another time?\". You agree and will have to call her another time.");
			else {
				gotoPlace(Place, 'type=cherrypool');
				receiveCall('', 'You call Cherry to invite her to join you at the pool for a swim, and she happily agrees.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.messageThem = function(type) {								// SMS them, default as if you can always message them
		if (type === "sexy") {
			var img = getImageO(this.getCharmedLevel() == 4 ? "smssexyslave" : "smssexylover", -9, 0, this);
			if (img === "") WriteComments("&nbsp;After a while there is no reply, you hope they will send it later?");
			else showSMSTemp(this, '', img);
		} else this.messageThemBase();
	};
	
	per.addPersonPhoneCall = function() {
		var clv = this.getCharmedLevel();
		if (clv === 0) return false;		// Only sent when she is charmed
		if (this.hoursCharmed() > 8 && isMorning() && !this.checkFlag(5)) {
			// First morning after being charmed
			if (this.makeCall(true, 390)) {
				this.setFlag(5);
			}
		}
		if (this.hoursCharmed() > 48 && isMorning() && this.checkFlag(5) && !(this.checkFlag(6) || this.checkFlag(7))) {
			// First morning after being charmed
			if (this.makeCall(true, clv == 3 ? 391 : 392)) {
				this.setFlag(clv == 3 ? 6 : 7);
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 390: return receiveSMS('Cherry' + (this.getCharmedLevel() == 4 ? 'Slave' : ''), 'Good morning, ' + this.getYourNameFor() + '! I hope you had a wonderful night! This is a taste of what you can look forward to when you visit', 'cherrysmsfirstmessage.jpg');
			case 391: return receiveSMS('Cherry', 'I hope I am not interrupting you with someone else lover! I just wanted to check in if you need anything! My body is longing for you!', "cherrysmslover1.jpg");
			case 392: return receiveSMS('CherrySlave', 'I hope I am not disturbing you ' + perYou.getMaster() + '! I just had a beautiful dream with you in it! In it you were the king of a realm and thousands and thousands of women were laying at your feet, ready for your command! It was wonderful! I wish you ' + perYou.getMaster() + ' a happy and productive day!', 'cherrysmsslave1.jpg');
		}
		return '';
	};

}