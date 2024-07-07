/***************** Your character ******************************************************************************/
var perYou;			// Player's person object
var perYourBody;	// Player's current body, person object of the body they are inhabiting

// Some important variables, not arrays
var nMana; 			// Mana of the player character
var sGender;		// Characters Sex


/**********************************************************************************
Experience
**********************************************************************************/
function spendExperience(type)
{
	Leave();
	var md = WritePlaceHeader(false, '', 'black');

	if (type === undefined) {
		addPlaceImage(md, "UI/books/bookpage1.jpg");
		addPlaceTitle(md, "Secrets of the Book", '', 0, false, 'white');

		if (Place == 348) md.write('<p>Jessica helps you to look up the passages in the book, pointing out some details of the ciphers used and discussing the meanings of some of the parts.</p>');
		else if (Place == 17) md.write('<p>' + perGates.getPersonNameShort() + ' helps you to look up the passages in the book, pointing out some details of the ciphers used and discussing the meanings of some of the parts. He seems to be completely familiar with these parts of the book, he must have already mastered these areas, but he does not give you the exact translation but helps you to learn for yourself.</p>');
		else if (Place == 192) md.write('<p>Sarah helps you to look up the passages in the book, she is very knowledgeable of the occult and magic. Once or twice she asks Lauren for the correct translation of a word and Lauren answers quietly but with no hesitation. Sarah lightly flirts with you as you study the pages, you are not sure if she means it as such or she wants to distract you.</p>');
		else md.write('<p>Tess helps you to look up the passages in the book, she is completely familiar with the ciphers used and makes decoding easy. She has little knowledge of magic in a practical way, just in theory, so she cannot help with a detailed understanding on the passages.</p>');
		md.write('<p>The passages are complex and will take a while to study in detail, so you decide to focus on one in particular for now, but you only have a vague idea of the details so far.</p>');

		if (perYou.checkFlag(12) && !perYou.checkFlag(25) && perYou.checkFlag(24)) md.write("<p>You do remember Mr. Beasley offer to teach you a hypnotic technique, you think you could instead ask him to teach you and leave the Book for now.</p>");

		if (!perYou.checkFlag(18)) md.write('<p>Interesting, you would have thought there would be something to help protect yourself from magic. Maybe it can be found elsewhere.</p>');

		startQuestionsOnly("The passages seem to be about", '', md);
		var nShown = 0;
		if (isSpellKnown("Charm") && !perYou.checkFlag(26) && nShown < 3) { nShown++; addOptionLink(md, "manipulative charms", "spendExperience(8)", "bloodblock"); }
		if (isSpellKnown("Charm") && !perYou.checkFlag(19) && nShown < 3) { nShown++; addOptionLink(md, "masculine cantrips", "spendExperience(3)", "bloodblock"); }
		if (isSpellKnown("MirDaru") && !perYou.checkFlag(23) && nShown < 3) { nShown++; addOptionLink(md, "medium powers", "spendExperience(7)", "bloodblock"); }
		if (isSpellKnown("Teleport") && !perYou.checkFlag(21) && nShown < 3) { nShown++; addOptionLink(md, "precision transitions", "spendExperience(5)", "bloodblock"); }
		if (isSpellKnown("Transform") && !perYou.checkFlag(30) && nShown < 3) { nShown++; addOptionLink(md, "molding as desired", "spendExperience(10)", "bloodblock"); }
		if (!perYou.checkFlag(17) && nShown < 3) { nShown++; addOptionLink(md, "conserving magic", "spendExperience(1)", "bloodblock"); }
		if (!perYou.checkFlag(20) && nShown < 3) { nShown++; addOptionLink(md, "harnessing mana", "spendExperience(4)", "bloodblock"); }
		if (isSpellKnown("Wealth") && !perYou.checkFlag(22) && nShown < 3) { nShown++; addOptionLink(md, "golden gestures", "spendExperience(6)", "bloodblock"); }
		if (isSpellKnown("Invisibility") && !perYou.checkFlag(28) && nShown < 3) { nShown++; addOptionLink(md, "the unseen", "spendExperience(9)", "bloodblock"); }
		if (isSpellKnown("Possession") && !perYou.checkFlag(69) && nShown < 3) { nShown++; addOptionLink(md, "firmer possessions", "spendExperience(11)", "bloodblock"); }

		addLinkToPlaceC(md, 'forget it for now', '', sPlaceParams);

	} else {
		addPlaceImage(md, "UI/books/bookpage2.jpg");
		addPlaceTitle(md, "Secrets of the Book Revealed", '', 0, false, 'white');
		perYou.extra[11] += 9;
		passTime(false, true);passTime(false, true);passTime(false, true);passTime(false, true);

		if (type == 1) {
			// Learn spell discount
			perYou.setFlag(17);
			md.write(
				'<p><b>Conserving magic</b></p>' +
				'<p>After some study the passage is clearer, you can see how to make a hand gesture and focus your thoughts and cast spells for a little less cost in mana.</p>' +
				'<p>Expensive spells will cost 1 or 2 points less now.</p>'
			);
		} else if (type == 3) {
			// Charm Males
			perYou.setFlag(19);
			md.write(
				'<p><b>Masculine Charns</b></p>' +
				'<p>After some study the passage is clearer, you can see now see how to slightly change your pronunciation of "Dai Chu" so it also affects men.</p>'
			);

		} else if (type == 4) {
			// More mana from stones
			perYou.setFlag(20);
			md.write(
				'<p><b>Harnessing Mana</b></p>' +
				'<p>After some study the passage is clearer, you learn a simple ritual to perform when using a magic stone that harnesses a little more mana from the stone.</p>'
			);

		} else if (type == 5) {
			// More teleport choices
			perYou.setFlag(21);
			md.write(
				'<p><b>Precision Transitions</b></p>' +
				'<p>After some study the passage is clearer, you understand how to control the teleport spell better and can use it to travel to more places.</p>' +
				'<p>Additionally you can now bring others with you when you teleport but they have to be completely willing for the spell to work.</p>' +
				'<p><img style="float:right;width:10%" src="UI/themes/theme1/symbol1.png" alt="Hexagram" title="Hexagram">You also now know how to carve a hexagram into a living tree to create a new place to teleport to. The mana cost of this is 1 point.</p>'
			);

		} else if (type == 6) {
			// More money
			perYou.setFlag(22);
			md.write(
				'<p><b>Golden Gestures</b></p>' +
				'<p>After some study the passage is clearer, you understand how to better control the Wealth spell to give more money.</p>'
			);

		} else if (type == 7) {
			// Charm ghosts
			perYou.setFlag(23);
			md.write(
				'<p><b>Medium Powers</b></p>' +
				'<p>After some study the passage is clearer, you now know how to better control the spell \'Unlife Enspelled\' to affect even more types of undead, including ghosts and other spirits.</p>' +
				'<p>It is interesting to see here that ghosts are less strongly tied to their identity and this spell can affect ghosts without knowing their names, but it will only have a transitory effect.</p>'
			);

		} else if (type == 8) {
			// Fine control over charm spell
			perYou.setFlag(26);
			md.write(
				'<p><b>Manipulative Charms</b></p>' +
				'<p>After some study you learn finer control over the charm process and you can now influence the person in more ways, better guiding them to your desires.</p>' +
				'<p>You should be able to choose different ways that the charm spell will affect people but this will vary depending on the person.</p>'
			);

		} else if (type == 9) {
			// Fine control over the invisibility spell
			perYou.setFlag(28);
			md.write(
				'<p><b>The Unseen</b></p>' +
				'<p>After some study you learn how stay invisible for longer. Now only dawn or dusk will end the spell.</p>'
			);
			
		} else if (type == 10) {
			// Fine control over the transform spell
			perYou.setFlag(30);
			md.write(
				'<p><b>Molding as Desired</b></p>' +
				'<p>After some study you learn how to better control the transform spell. Still not perfect but you will have more choice and possibilities. Some transformations can also now be reversed.</p>'
			);			

		} else if (type == 11) {
			// Fine control over the possession spell
			perYou.setFlag(69);
			md.write(
				'<p><b>Firmer Possessions</b></p>' +
				'<p>After some study you learn how to better control the possession spell. It will no longer dispel on passing through a door, but dawn or dusk will always end it.</p>'
			);			

		}
		startQuestionsOnly();
		addLinkToPlaceC(md, 'that is all for now', '', sPlaceParams);
		updateRightBar();
	}
	WritePlaceFooter(md);
}

function isArrestPossible()
{
	if (!isCharmedBy("Gina")) return true;
	if (isMurderPath()) {
		if (isCharmedBy("OfficerKhan") && isCharmedBy("OfficerBatton")) return false;
		return true;
	} else return false;
}

function addEndGamePregnancies(md)
{
	if (perYou.addEndGamePregnanciesBase(md)) {
		// Add option to skip pregnancies
		var stage = getQueryParam("stage");
		addLinkToPlace(mdCache, "enough 'good news'!", 46, 'type=endgame1enough&stage=' + stage);
	}
};

// Initialise

function initialiseYou()
{
	// You
	perYou = addPerson("You", 0, "MilesPride", '', false);
	perYou.extra = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0];		// expanded arbitrary data
	
	// Player Avatar images, a folder containing the images, in Images/Player
	// The following are a comma separated list of valid folders
	perYou.sMaleFolderList = "MilesPride,Tommy,Billy,SammyCase,BrentCorrigan,Stephan,RickySpanish,JamesDeen,Nobody/Male";
	perYou.sFemaleFolderList = "Eufrat,TeenKasia,TaylorSands,Beata,Arianna,Natasha,FayeReagan,ElsaJean,DakotaSkye,AdrianaChechik,Peta,Nobody/Female";

	// Naming
	perYou.getPersonGender = function() {
		if (isPossess()) {
			if (findPerson(sPossess) === null) return "woman";		// Currently possessing someone unknown, only females currently possessable
			return per.getPersonGender();
		}
		return sGender;
	};
	perYou.isFuta = function(bXF) {
		// Are you a futa
		if (this.getPersonGender() != "futa") return false;
		if (bXF === true) return !this.checkFlag(32);
		if (bXF === false) return this.checkFlag(32);
		return true;
	};

	perYou.getPersonName = function(full) {
		if (isPossess()) return GetPersonName(sPossess, full);
		return this.name;
	};
	perYou.getPersonNameShort = function(uncharmed) {
		if (isPossess()) return GetPersonName(sPossess, false);
		return this.name;
	};
	
	perYou.getPossessionFace = function() { return "face1"; };
	
	// Time
	per.passTimeDay = function() 
	{
		if (this.checkFlag(65)) AddMana(10);
		if (perYourBody.FindItem(71) > 0) AddMana(1);
		setPlaceFlag("NewAgeStore", 4, false);
		return "";
	};
	
	// Novement
	perYou.isStuck = function() {
		if (nMoney < 10 && ((isAtLocation(16) && !isPlaceKnown("Tunnel") && !isPlaceKnown("WalkingTrail")) || (isAtLocation(317) && !isPlaceKnown("ChurchTunnel")))) {
			if (nMana > 0 && isSpellKnown("Teleport")) return false;		// Can teleport out of here
			// At the Church or Mansion and cannot get back to town
			return true;
		}
		return false;
	};
	
	perYou.moveThem = function(np) { dispPlace(np); };
	
	// Money
	perYou.getCashOnHand = function() { return nMoney > 0 ? nMoney : 0; };
	perYou.addCashOnHand = function(no) {
		// Increases Cash Value nMoney by 'no' and update ui
		nMoney = nMoney + no;
		updateLeftBar();
	};
	
	perYou.getAccountMax = function() { return this.checkFlag(9) ? -1 : (Math.floor(nTime / 288) > 30 ? -1 : 200); };
	perYou.getBankBalance = function() { return this.extra[12]; };
	perYou.setBankBalance = function(no) { this.extra[12] = no; };
	perYou.changeBankBalance = function(no) 
	{
		if (this.getBankBalance() === 0) this.setBankBalance(1);	// open the account
		else {
			this.setBankBalance(this.getBankBalance() + no);
			this.addCashOnHand(no * -1);
		}
	};

	// Injuries
	perYou.isShot = function() { return this.checkInjury(1); };
	perYou.setInjury = function(no) { this.extra[2] = setBitFlag(this.extra[2], no); };
	perYou.checkInjury = function(no) { return checkBitFlag(this.extra[2], no); };

	// Arrest
	perYou.setArrested = function(no) {
		this.extra[4] = no;
		if (no > 0) this.setFlag(36);		// You have ever been arrested
	};
	perYou.getArrested = function() { return this.extra[4]; };
	perYou.isArrested = function() { return this.extra[4] > 0; };

	// Quests
	perYou.startQuest = function(no) { this.extra[5] = setBitFlag(this.extra[5], no); };
	perYou.isQuestStarted = function(no) { return checkBitFlag(this.extra[5], no); };
	perYou.completeQuest = function(no) { this.extra[6] = setBitFlag(this.extra[6], no); };
	perYou.isQuestComplete = function(no) { return checkBitFlag(this.extra[6], no); };

	perYou.getQuestAftane = function() { return this.extra[9]; };
	perYou.setQuestAftane = function(no) { this.extra[9] = no; };

	perYou.getQuestRustyKey = function() { return this.extra[10]; };
	perYou.setQuestRustyKey = function(no) { this.extra[10] = no; };
	
	perYou.getCorruption = function() { return this.extra[15]; };
	perYou.addCorruption = function(no) {
		this.extra[15] += no;
		if (this.extra[15] < 0) this.extra[15] = 0;
	};
	
	// Items
	perYou.Items = new MakeArray(20, 0);		// Inventory  - Hard limit of 30 items...  "playable" limit of 20, not counting spells
	perYou.MaxItems = 20;							// Maximum number of items

	perYou.getHolyWaterUses = function() { return this.extra[8]; };
	perYou.setHolyWaterUses = function(no) { this.extra[8] = no; };

	// Experience
	perYou.getExperience = function() { return this.other; };
	perYou.addExperience = function(no) { this.other += no; };
	perYou.canUseExperience = function(bNoMax) {
		if ((this.other - this.extra[11]) < 9) return false;
		if (bNoMax === true) return true;
		/*
		17		- Experience: cheaper spells (10%)
		18		- Experience: use mana as a shield against spells ** SPECIAL CASE **
		19		- Experience: charm males
		20		- Experience: better mana from stones
		21		- Experience: more places to teleport to
		22		- Experience: mo' money
		23		- Experience: etherial charms
		24		- Experience: basic hypnosis
		25		- Experience: augmented hypnosis ** SPECIAL CASE **
		26		- Experience: Fine control over charm spell
		27		- Experience: expert at learning spells ** SPECIAL CASE **
		28		- Experience: improved invisibility
		29		- Hydromancy
		30		- Experience: Fine control over the transform spell
		69		- Experience: longer possessions
		*/
		var iTot = 0;
		var iNum = 1;
		for (var i = 17; i < 31; i++) {
			if (i == 18 || i == 25 || i == 27 || i == 29) continue;		// Ignore shielding, hypnosis augmented. 27, 29 are not a training you learn this way
			iNum++;
			if (this.checkFlag(i)) iTot++;
		}
		if (this.checkFlag(69)) iTot++;
		return (iTot < iNum);
	};

	// Popup events for yourself
	perYou.showEventPopup = function()
	{
	
		if (perYourBody.FindItem(4) > 0 && this.canUseExperience() && !this.checkFlag(11) && sType === "") {
			this.setFlag(11);
			showPopupWindow("The Book has changed...",
				"<img src='UI/books/bookpage0.png' class='imgpopup' alt='Book'>" +
				'<p>You notice the book is softly glowing. Opening the book you see some passages almost make sense now that you are more familiar with magic and even seem to have a red tint.</p>' +
				'<p>You should research these passages, but you need help from someone more experienced with deciphering the codes of warlocks.</p>'
			);				
			return true;			
		}
		if (Place == 17 && !this.isQuestComplete(4)) {
			this.completeQuest(4);
			showPopupWindow(perGates.getPersonName(),
				perGates.addPersonString("gates1.jpg", "35%", "right") +
				'<p>An elderly gentleman is sitting behind a large desk made from oak. The whole room is stuffed with things from the past. Paintings and pictures from 19th century decorate the walls and a great Chandelier hangs from the ceiling. The dark blue  color of the walls and the smell of old wood sets the mood of the place. It is certainly a very old room!</p>' +
				'<p>The old man must be ' + perGates.getPersonNameShort() + ' himself! He’s kind of a legend around here, becoming part of the mythos involving the witches and warlocks of the past. Some say he is a warlock himself who’s here to guard something very important. The moustached man looks at you with wise eyes. You can feel his commanding presence even though he looks to be in his 70’s. He has a wooden pipe in his hands, toying with it while glancing at you. After a while he stops, puts the pipe in his mouth, and lights it. Finally he gestures for you to approach. You know he can be an influential ally… or a powerful enemy if you anger him.</p>' +
				'<p>"Welcome," he says with a silvery voice. "I don\'t get to receive guests very often, and even less often do I receive uninvited guests. I am told you are interested in the Sacred Book of Control."</p>' +
				'<p>Something catches your eye; beside ' + perGates.getPersonNameShort() + '\'s desk is a book. <font size="+1"><b>Could it be the one? It is, you are sure it is!</b></font></p>' +
				'<p>You wonder if he will offer to share the secrets of the Book, teach you almost like an <b><font size="+1">Apprentice</font></b>? ' +
				'Then again your have wanted the Book for so long and doubt anyone would willingly share the power in it. You should see if you can try to <b><font size="+1">threaten</font></b> him or get it some other way?</p>' +
				'<p>You could even just <font size="+1"><b>leave</b></font> and try to work out another way to get the Book...</p>'
			);				
			return true;
		}
		
		// Bimbo Curse
		if (this.checkFlag(50) && sType == "bimbosleep1") {
			this.setFlag(56, false);
			showPopupWindow("Dreaming",
				addImageString("Player/Bimbo/" + (isExplicit() ? "Explicit/bimbo3.gif" : "bimbo3.jpg"), "height:max%", "right") +
				'Your dreams are restless, dominated by some of the naughtiest imagery you ever had. You see pictures of women, no, of <font color=pink>sluts</font> before your inner eye. Happy, simple <font color=pink>sluts</font> who just enjoy their lives, uncaring about the bigger picture, about things like bills and politics and magic and all those things that would be too complicated for their simple minds anyway.</p>' +
				'<p><font color=pink>And you find yourself envying them.</font></p>' +
				'<p>How much fun would it be to be like that? To not think about Demons and Warlocks and Ghosts and whatnot? To have your only concern in life to be looking sexy for your guy, or maybe gal?</p>' +
				'<p>You feel something changing within you, as if your mind is drifting away on a cloud of happy bliss, getting lost dreaming about that happy, joyful life you could never lead...</p>' +
				'<p><font color=pink>Or could you?</font>',
				"WaitHereOnly(6);dispPlace(Place,'type=bimbosleep2')", '', true
			);				
			return true;
		}
		if (this.checkFlag(50) && sType == "bimbosleep2") {
			showPopupWindow("Dreaming",
				addImageString("Player/Bimbo/" + (isExplicit() ? "Explicit/bimbo3.gif" : "bimbo3.jpg"), "height:max%", "right") +
				'It\'s gradual at first, but soon, you are no longer watching those <font color=pink>happy</font> bimbos having sex, you are actively taking part. Going shopping and letting the vendor fondle your <font color=pink>tits</font> ' + (this.isMan() ? '(since when did you have tits in your dreams?)' : '(They are bigger in your dreams, are they?)') + ', or being pushed down to the bed and fucked roughly, tied up, ass spanked, taken hard by hunky strangers and <font color=pink>loving</font> every second of it!</p>' +
				'<p>It\'s not you who does all these things, and yet you feel like it could be. A new, better and much more <font color=pink>slutty and happy</font> you! And as that thought begins to take hold in your defenseless, sleeping mind, the dream shifts to be much more vivid.</p>' +
				'<p>You now “feel” things. The pulsing of the cock stretching your <font color=pink>pussy</font>' + (this.isMan() ? ' (You are not supposed to have a pussy... or are you?)' : '') + ', the splatter of cum on your face, the hands fondling your tights, your ass, your tits. Your helpless body being manhandled by people stronger, smarter and bigger than you and <font color=pink>loving</font> every second of it as what must be the most intense climax of your life builds up within your body ready to explode...</p>' +
				'<p>And then you wake up.',
				"WaitHereOnly(6);dispPlace(Place,'type=bimbosleep3')", '', true
			);				
			return true;
		}		
		if (this.checkFlag(56) && sType === "") {
			this.setFlag(56, false);
			if (this.checkFlag(50)) {
				if (!this.checkFlag(51)) {
					// Stage 1
					this.setFlag(51);
					setPersonFlagAfterTime("You", 56, undefined, 12);
					showPopupWindow("Day Dream?",
						addImageString("Player/Bimbo/bimbo1.gif", "height:max%", "right") +
						'You are stopped in your tracks as the world suddenly spins around and a wave of images flashes before your inner eye, each one only remaining for a second but leaving lasting impressions of hot women on their knees, sexy girls on all fours and happy sluts pushed against walls, all of them eagerly getting stuffed by big cocks and loving every second of it.</p>' +
						'<p>It stops as quickly as it began and leaves you gasping for air with an uncomfortable ' + (this.isMaleSex() ? 'boner in your pants' : 'wetness between your legs') + ' and a strange feeling of...<font color=pink> jealousy?</font></p>' +
						'<p>No, that can\'t be right.</p>' +
						'<p>Whatever it was, though, it\'s over now. The feeling of dizziness fades quickly without any side effects, but as you continue to walk you realize that your pants are kinda ill-fitting.</p>' +
						'<p>Maybe you lost weight from all the running around?"'
					);
					return true;
				} else if (!this.checkFlag(52)) {
					// Stage 2
					this.setFlag(52);
					setPersonFlagAfterTime("You", 56, undefined, 12);
					showPopupWindow("Day Dream?",
						addImageString("Player/Bimbo/" + (isExplicit() ? "Explicit/bimbo2.gif" : "bimbo2.jpg"), "height:max%", "right") +
						'You are hit with a sudden giggling fit when you remember a lewd joke Catherine told you a few months ago.</p>' +
						'<p>You didn\'t find it particularly funny back then, but thinking back now, it was actually pretty hilarious, and it was about sex, and sex is pretty much all you have been able to think about for the last 20 minutes.</p>' +
						'<p>A mental image of Catherine forms in your mind as she is being roughly fucked by some guy you remember to be one of her exes.</p>' +
						'<p><font color=pink>And you -so- wish you could trade places with her...</font></p>' +
						'<p>Wait, where did that idea come from? You shake yourself out of your thoughts and take a deep breath... this... isn\'t normal, is it? You have an active libido, but not like this, you are ' + (this.isMaleSex() ? 'a Guy' : 'not a slut') + ' after all.</p>' +
						'<p>You are massaging your temples and scalp to clear your head and find that your hair must have grown quite a bit the last days.</p>' +
						'<p>You may want to make an appointment with a hairdresser, though if you think about it,<font color=pink> don\'t guys like chicks with long hair?</font>'
					);
					return true;
				} else if (!this.checkFlag(53)) {
					// Stage 3
					this.setFlag(53);
					setPersonFlagAfterTime("You", 56, undefined, 12);
					showPopupWindow("Not a Day Dream",
						addImageString("Player/Bimbo/" + (isExplicit() ? "Explicit/bimbo3.gif" : "bimbo3.jpg"), "height:max%", "right") +
						'Okay, something is definitely wrong with you.</p>' +
						'<p>In the last hour, you had been unable to keep yourself from starring at every crotch you found and all you could think of was how much fun it would be to throw yourself at some big, hunky guy and let him <font color=pink>fuck your brains out.</font></p>' +
						'<p><font color=pink>Hell, fuck brains to begin with!</font></p>' +
						'<p>Brainy chicks are always miserable and never get a good dicking while <font color=pink>bimbos</font> have all the fun, and who wouldn\'t want to be a sexy <font color=pink>bimbo</font>, not wasting precious time thinking about stuff when there\'s fun and sex to be had instead?</p>' +
						'<p>Pushing these thoughts down is almost physically painful, and as you clutch your chest you find that ' + (this.isMan() ? 'you suddenly have boobs' : 'your boobs have grown') + '.</p>' +
						'<p>Something is changing you!</p>' +
						'<p>Knowing this sends a cold shiver down your spine, but also helps clear your mind a little. You have to focus, what could have happened? When did this start?</p>' +
						'<p>You fight through the mess of <font color=pink>cocks</font> and <font color=pink>tits</font> and <font color=pink>pussies</font> that is your mind, trying to remember when this began, the first time you\'ve felt this wonderful rush of pure pleasure in the park...</p>' +
						'<p>The park! When you used the large Stone!</p>' +
						'<p>The mana from the stone must have been... corrupted somehow. You have to find someone who is able to drain it, or maybe <font color=pink>go on a sexy shopping spree to find something befitting your slutty new Body?</font></p>' +
						'<p>Making decisions is so, like, tough...<font color=pink> maybe you should find someone else to do it for you?</font>'
					);
					return true;
				} else if (!this.checkFlag(54)) {
					// Stage 4
					this.setFlag(54);
					setPersonFlagAfterTime("You", 56, undefined, 12);
					showPopupWindow("Changes",
						addImageString("Player/Bimbo/" + (isExplicit() ? "Explicit/bimbo4.gif" : "bimbo4.jpg"), "height:max%", "right") +
						'You happen to pass by a mirror and for the first time get a good look at what will soon be the new you if you don\'t find a way to stop the transformation.</p>' +
						'<p>And frankly, you look <font color=pink>gorgeous</font>! Well, your titties could be a bit bigger and ' + (this.isMaleSex() ? 'you still got your cock, which might make it harder to get guys to fuck you' : 'your ass isn\'t bubbly enough, for your taste') + ', but you feel like your transformation isn\'t fully finished, so you might still get lucky!</p>' +
						'<p>That\'s at least what you should be thinking, hell, you shouldn\'t be thinking at all, someone else should do it for you, but there is still an annoying part of your former self inside you, screaming that all of this is wrong, that you have to find someone able to drain the tainted mana from your body and reverse the transformation, <font color=pink>but why would you want to do that?</font></p>' +
						'<p>Thinking is hard, learning magic is hard, taking care of a harem of slaves and fighting ghosts and demons and warlocks is -hard-!</p>' +
						'<p><font color=pink>Isn\'t being too dumb to be concerned with all of this so much better?</font></p>' +
						'<p>You see your new body before you in a variety of sexy situations, bend over, tied up, gagged, naughty, slutty, submissive with Cum on your face while getting fucked in all your holes like the <font color=pink>sexy bimbo slut that you should be.</font></p>' +
						'<p>You could just let it happen... let your mind fade away and be happy... it can\'t be long until the transformation is done now, an hour at best?</p>' +
						'<p><font color=pink>So, why struggle against the inevitable?</font>'
					);
					return true;
				} else if (!this.checkFlag(55)) {
					// Stage 5
					this.setFlag(55);
					showPopupWindow("Changed",
						addImageString("GenericSex/" + (perYou.isMan() ? "tgm2f a.jpg" : "be a.jpg"), "height:max%", "right") +
						'You feel tension build up from deep within your body, slowly but steadily, each step you take sending a rumble of pleasure into you until you are finally no longer able to take it.</p>' +
						'<p>You are climaxing. Hard, loud and over and over and over again.</p>' +
						'<p>Hell, climax, orgasm, cum, all of these terms seem insufficient to describe what is going on within your body right now. It feels as if your mind is swept away on a constant stream of orgasmic bliss while you can\'t help but release a staccato of loud, lustful moans.</p>' +
						'<p>You don\'t know if anyone is watching you and you don\'t care.</p>' +
						'<p>Your sense of self is fading, your ambitions, experiences, intelligence... all leaking out of your ' + (perYou.isMaleSex() ? 'newly transformed' : 'suddenly very sensitive') + ' pussy while your body and mind undergo what must be the final stages of your transformation, and when you finally recover your senses, waking up on your knees with your underwear soaked, you wonder why you were ever worried about this.</p>' +
						'<p>Sure, you vaguely remember something about a gate and magic and demons and a witch you have locked up in the hotel cellar. But that was old ' + this.getPersonName() + '!</p>' +
						'<p>New ' + perYou.getPersonName() + ' doesn\'t want to dominate people and make them do stuff against their will, new ' + this.getPersonName() + ' wants to make people happy! Because if you make others happy you are happy and you are much too dumb for more complicated thoughts anyway.</p>' +
						'<p>In fact, somehow, freeing that poor woman you have locked up is the first thing that does come to your mind... fancy that!' +
						addLinkToPlace('string', "head straight for the hotel and free Jessica!", 161, "type=bimbobadend1", "", "", "", undefined, 'margin-left:5%;margin-right:50%;width:45%'),
						"", "", true, true, true
					);
					return true;
				}
			}
		}
		// Dreams
		if (sType == "dream7") {
			this.setFlag(44);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream7.jpg' style='width:45%;float:right;margin-left:5px' alt='Dream'>" +
				'You remember having erotic and confused dreams during the night. Once you remember clearly seemed to have a group of ghosts walking through a field. All were quite naked under their ectoplasmic veils.<br><br>' +
				"This was probably just a dream from reading odd carnal books."
			);
			return true;
		}
		if (sType == "dream8") {
			this.setFlag(45);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream8.jpg' class='imgpopup' alt='Dream'>" +
				'You remember having erotic and confused dreams during the night. You remember going to take a bath and a beautiful naked woman was waiting for you in the bath. As you looked her skin shifted in colour, becoming red and horns growing from her head. She became the vision of a seductive demon waiting for you...<br><br>' +
				"You remember little more of the dream, it was clearly from your recent dealings with demonic beings!"
			);
			return true;
		}	
		if (sType == "dream9") {
			this.setFlag(48);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream9.jpg' class='imgpopup' alt='Dream'>" +
				'You remember dreaming of ancient Egypt, influenced from your recent visit to the museum. The woman though you dreamt of was more a hybrid of the ancient animal gods and something from a game, but still very appealing!'
			);
			return true;
		}	
		if (sType == "dream10") {
			this.setFlag(59);
			showPopupWindow("Dreaming",
				"<img src='Images/Dreams/dream10.jpg' class='imgpopup' alt='Dream'>" +
				"You remember having a dream and you think in it was the porn-star Aletta Ocean, but part way through she started changing.</p>" +
				"<p>You heard a chanting in the distance, nonsense words 'Ia, Ia, ftang' but the words chilled you. When you looks at Aletta she had transformed into a demonic temptress. While you knew sucking was to follow, it was going to be your soul..."
			);
			return true;
		}			
		if (sType == "dream2") {
			this.setFlag(41);
			showPopupWindow("Dreams in the Dark",
				"<img src='Images/Dreams/dream2.jpg' class='imgpopup' alt='Dream'>" +
				'You start to hear a noise, a low chanting and as you try to hear it a figure starts to form. A goat-like, vaguely female form, fecund and grotesque. While <b>she</b> has no hands she still gestures to you</p>' +
				'<p>The chanting rises "Ia, ia, Shub-Niggurath!" and suddenly you wake up, covered in sweat and feeling profoundly aroused...Just a dream from some old horror story...you hope.'
			);
			return true;
		}
		if (sType == "dream5") {
			this.setFlag(42);
			showPopupWindow("Strange Dream",
				"<img src='Images/Dreams/dream5.jpg' class='imgpopup' alt='Dream'>" +
				'After you wake you vaguely remember a dream of entwined flesh, tentacular flesh and a beautiful woman. All this stuff about the Book and legends must be getting to you...'
			);
			return true;
		}
		if (sType == "dreamkate") {
			this.setFlag(43);
			showPopupWindow("Girl of Your Dreams",
				findPerson("Kate").addPersonString("katedream1.jpg", "height:max%", "right") +
				'After you wake you remember once again dreaming of Kate, this time she was a cheerleader, not that she has ever been one.</p><p>She is certainly agile enough, but she prefers her books and martial arts more...agile...she certainly was in the dream...just in a different way...'
			);
			return true;
		}
		if (sType == "dreamvampyre1") {
			this.setFlag(47);
			showPopupWindow("Vampyre Dreaming",
				"<img src='Images/Dreams/dream-vampire1.jpg' class='imgpopup' alt='Dream'>" +
				'You dream of a pleasant summer night, the cacophony of the city finally muted to a distant murmur and the fresh night air invigorating your senses. The accursed sun has finally been banished to the other side of the planet, and blissful darkness envelops you.</p>' +
				'<p>It is the perfect time to hunt.</p>' +
				'<p>It never takes long to find prey in nights like these and your gaze quickly falls upon a young woman walking home by herself, nervously looking around as if vaguely aware that she is being watched but unable to place that feeling.</p>' +
				'<p>You listen from the shadows as her breath quickens, as the muscle pumping her precious blood starts beating faster, as the sound of her heels clicking on the street picks up in pace.</p>' +
				'<p>The chase begins.</p>' +
				'<p>She is walking faster, uncertain if her mind is playing tricks on her or if that shadow had really just moved, if she had really heard your soft giggle carried by the wind. </p>' +
				'<p>She is hoping to reach the sanctuary of her home before she has to find out if that sensation of danger following her is only inside her mind...</p>' +
				'<p>She won\'t.</p>' +
				'<p>You trail her relentlessly, always close enough to let her feel your presence but keeping out of sight, savoring her tension, her fear building up with every passing minute as the inevitable draws nearer, as you prepare to strike.</p>' +
				 '<p>And only as she is close to reaching her home... you finally act.',
				'dispPlace(Place,"type=dreamvampyre2")'
			);
			return true;
		}
		if (sType == "dreamvampyre2") {
			showPopupWindow("Vampyre Dreaming",
				"<img src='Images/Dreams/dream-vampire2.jpg' class='imgpopup' alt='Dream'>" +
				'With strength and speed far beyond what these poor chattel could ever hope to achieve, your body rushes forward, startling your prey as you emerge from the shadows and lock eyes with her.</p>' +
				'<p>She tries to scream, but her lips disobey her.</p>' +
				'<p>A fraction of a second was all it took to sink your mental hooks into her mind. No true name needed, no Mana expended, just your hypnotic gaze piercing her very soul, rendering her helpless.</p>' +
				'<p>You subdue her thoughts, taking away the instinct to flee.</p>' +
				'<p>Her body freezes up as your dark presence seeps into her, and what little resistance her pitiful, mortal mind can muster is easily crumbling under the mental assault.</p>' +
				'<p>Inch by inch, her mind submits to yours.</p>' +
				'<p>Her posture relaxes as the last mental barriers break. Her tired arms fall down, her eyes loose focus, starring blankly forward while you assert your dominance over her.</p>' +
				'<p>And just like that... she is yours.</p>' +
				'<p>You caress her cheek and drive a thumb over her lips, expose her breasts and move closer to take in the delicious smell of her blood. You are savoring these moments before the feeding, the thrill of a hunt nearing its climax, the rush of power knowing that there is no escape for her.</p>' +
				'<p>You brush her hair back over her shoulders to expose her neck.</p>' +
				'<p>You watch as her head tilts to the side on her own volition, her body trembling in anticipation.</p>' +
				'<p>Your lips touch her neck...</p>' +
				'<p>Your fangs sink into her skin...</p>' +
				'<p>And suddenly... you wake up.'
			);
			return true;
		}		
		if (sType == "dreamking") {
			this.setFlag(46);
			showPopupWindow("The King Does Not Live",
				"<img src='Images/Dreams/dream1.jpg' class='imgpopup' alt='Dream'>" +
				'Your dreams are heavily disturbed, filled with barely seen horrors and whispered voices that you can never quite hear.</p>' +
				'<p>At the end you see a figure reciting from a book, you cannot hear his words but the book looks disturbing familiar. You know his name, he is the King in Yellow and you almost call out his name, but suddenly you wake up in sheer terror.</p>' +
				'<p>While the book was just fiction, you remember from it "death comes to those who speak the King in Yellow\'s name". Yes, it is just fiction, but you have no intention of saying that name, despite how clearly you remember it, <i>Hastur</i>...'
			);
			return true;
		}	
		if (sType == "dreamkinglater") {
			showPopupWindow("The King in Dreams",
				"<img src='Images/Dreams/dream" + (Math.random() < 0.5 ? "3" : "4") + ".jpg' class='imgpopup' alt='Dream'>" +
				'Your dreams are again heavily disturbed, filled with barely seen horrors and whispered voices that you can never quite hear but you are sure what name they are calling <i>Hastur</i>.</p>' +
				'<p>At the end you see his figure appear from the darkness, wreathed in a sickly light, tentacular forms writhing around. You can feel him searching for you but suddenly you wake up in sheer terror.'
			);
			return true;
		}	
		
		if (sType == "dreaminteresting") {
			var img = getQueryParam("img");
			if (img !== "") {
				showPopupWindow("Interesting Dreams",
					"<img src='" + img + "' class='imgpopup' alt='Dream'>" +
					'You have a dream, a blur of events that happened that day.'
				);
				return true;				
			}
		}

		if (Place == 269 && !checkPlaceFlag("Hotel", 11) && !isPersonHere() && sType === "") {
			setPlaceFlag("Hotel", 11);
			showPopupWindow("New View",
				"<img src='Images/pool0.jpg' class='imgpopup' alt='Pool'>" +
				'The pool is almost empty when you arrive, you see a cute woman leaving the pool and with a glance and smile she is gone.</p> ' +
				'<p>It crosses your mind that you should <b>call</b> someone to join you for a dip, it is just a matter of who is free at the moment.'
			);
			return true;		
		}
		if (Place == 46) {
			if (sType == "endgame1notnow") {
				this.setFlag(38);
				movePerson("Didi", 269);
				showPopupWindow("It is Time?",
					addImageString("Endings/endgame1-more.jpg", "height:80vh", 'right') +
					'Not now, it is not yet time to end your exploration or at least take a break from it. Who know what secrets of magic or other people there are to meet and influence....well charm and add to your harem if you want to be accurate!<br><br> ' +
					'Perhaps later you can decide to relax, you suppose you can have a chat with ' + (wherePerson("Tess") == 46 ? 'Tess' : 'Tracy') + ' about it, but say on a weekend. Sunday is supposed to be a day of rest, so then on <b>Sunday night</b> you can reconsider'
				);
				return true;
			}
			if ((!this.checkFlag(38)) || sType == "endgame1start") {
				if ((getDay() != "Sunday" && isMainStoryComplete()) || sType == "endgame1start") {
					var totc = 0;
					var totcan = 0;
					var p;
					for (var i = 0, ie = arPeople.length - 14; i < ie; i++) {
						p = arPeople[i];
						if (p.charmed == -1 || p.isDead() || p.isCharmedBy("Demon") || p.isCharmedBy("Elian") || p.isCharmedBy("Vampyre")) continue;
						if (p.isCharmedBy("You")) totc++;
						else console.log(p.name + ' is not charmed');
						totcan++;
					}

					showPopupWindow("It is Time?",
						addImageString("Endings/endgame1-start.jpg", "height:80vh", 'right') +
						'You sit down for a bit and think about how things are ' +
						(isPersonHere("Tess") ? 'and you look into the adoring eyes of Tess' :
															  'and you consider the new women in your life') + ', you have to think that things are good!<br><br>' +
						'You have dealt with Davy, Kurndorf and the Demon, and the town is more or less yours. The police and town hall are under your influence and you have done ' +
						(totc == totcan ? 'all that you can think to do' : 'enough, though there is probably more that could be done') + '.<br><br>' +
						'You wonder then if you should just relax and enjoy yourself now you have control over the "Sacred Book of Control" and the people of the town' + (isCharmedBy("Mom") || isCharmedBy("Tracy") ? ' and your family' : '') + '. Then again you could continue, looking for new opportunities, sources of magic and people, or just visiting those you are involved with.<br><br>' +
						addLinkToPlace('string', "It is time to enjoy what you have", 46, "type=endgame1harem&stage=random", '', '', 'perYou.setFlag(38)', undefined, 'margin-left:5%;margin-right:50%;width:45%') +
						addLinkToPlace('string', "It is time to enjoy what you have as much as you can", 46, "type=endgame1harem&stage=1", '', '', 'perYou.setFlag(38)', undefined, 'margin-left:5%;margin-right:50%;width:45%') +
						(perYou.checkFlag(38) ? addOptionLink('string', "There must be more to do, or at least re-do...", "setQueryParams();dispPlace()", undefined, 'margin-left:5%;margin-right:50%;width:45%')
													 : addLinkToPlace('string', "There must be more to do, or at least re-do...", 46, "type=endgame1notnow", "", "", "", undefined, 'margin-left:5%;margin-right:50%;width:45%')),
						"", "", true, true, true
					);
					return true;
				}
			}
		}
		
		if (Place != 53) return false;
		
		var lst;
		
		if (sType == "transformbreastsyou") {
			// BE Transformation
			CastTransform(1);
			if (!this.checkFlag(13)) {
				this.setFlag(13);
				showPopupWindow("Transformation",
					addImageString('GenericSex/be c.jpg', "50%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your chest.</p>' +
					'<p>Your breasts swell, growing larger and larger. After a few seconds they settle down to a <b>much</b> larger size.</p>'
				);
			} else {
				this.setFlag(13, false);
            showPopupWindow("Transformation",
					addImageString('GenericSex/bs d.jpg', "50%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings in your chest.</p>' +
					'<p>Your breasts slowly shrink, returning to their original size. After a few seconds they settle down as they were before you cast the spell previously.</p>'
				);
			}				
			setQueryParams("");
			return true;
		}
		
		if (sType == "transformcockyou") {
			// Futa/Cock expansion
			CastTransform(1);
			if (!this.isMan() && this.checkFlag(57)) {
				// Futa to Female
				this.setFlag(57, false);
				sGender = 'woman';
				showPopupWindow("Transformation",
					this.addPersonString('xf-female.jpg', "height:max%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>' +
					'<p>Your groin changes and you remove your lower clothing, to reveal you no longer have a cock, you are a woman only once again.</p>'
				);
			} else if (!this.isMaleSex()) {
				// Female to futa
				sGender = 'futa';
				showPopupWindow("Transformation",
					this.addPersonString('xf-futa.jpg', "height:max%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>' +
					'<p>Your groin swells and you remove your lower clothing, revealing that you now have a large cock grown to replace your clit.</p>' +
					'<p>You feel it start to stir and stiffen but you try to take your mind off it....'
				);
			} else if (!this.checkFlag(57)) {
				// Cock expansion
				this.setFlag(57);
				showPopupWindow("Transformation",
					addImageString('GenericSex/cockex a.jpg', "30%", "right") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>' +
					'<p>Your groin changes your cock swells, not in erection, but getting larger and larger. After a few seconds it stops growing, but the lust you felt then makes in grow a different way, hardening until fully erect, and <b>much</b> larger than previously.</p>'
				);
			} else {
				// Cock reduction
				this.setFlag(57, false);
            showPopupWindow("Transformation",
					addImageString('GenericSex/cockdec a.jpg', "50%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>' +
					'<p>Your groin changes your cock shrinks, not as in the cold or becoming flaccid, but getting smaller and smaller. After a few seconds it stops at about the same size as it was before you cast the spell previously.</p>'
				);
			}				
			setQueryParams("");
			return true;
		}		
		if (sType == "transformbreastsyou") {
			// BE Transformation
			CastTransform(1);
			if (!this.checkFlag(13)) {
				this.setFlag(13);
				showPopupWindow("Transformation",
					addImageString('GenericSex/be c.jpg', "50%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your chest.</p>' +
					'<p>Your breasts swell, growing larger and larger. After a few seconds they settle down to a <b>much</b> larger size.</p>'
				);
			} else {
				this.setFlag(13, false);
            showPopupWindow("Transformation",
					addImageString('GenericSex/bs d.jpg', "50%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your chest.</p>' +
					'<p>Your breasts shrink, growing smaller and smaller. After a few seconds they settle down to about the size they were before you cast the spell to expand them.</p>'
				);
			}				
			setQueryParams("");
			return true;
		}		
		if (sType == "transformgenderyou") {
			// What is your gender
			CastTransform(1);		
			if (perYou.getPersonGender() != "man") {
            sGender = "man";
				lst = perYou.sMaleFolderList.split(",");
				var idx = Math.floor(Math.random() * lst.length);
				this.folder = lst[idx];
				updateLeftBar();
				showPopupWindow("Transformation",
					this.addPersonString('charmedbydavy-resisting.jpg', "height:max%") +
					"You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>" + 
					"<p>Your breasts changes and you remove your clothing, to reveal you now no longer have breasts, you are now a man. Even your face looks different!</p>"
				);
				
			} else {
				lst = perYou.sFemaleFolderList.split(",");
				var idx = Math.floor(Math.random() * lst.length);
				this.folder = lst[idx];
				updateLeftBar();
				sGender = 'woman';
				updateLeftBar();
				showPopupWindow("Transformation",
					this.addPersonString('xf-female.jpg', "height:max%") +
					'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your body.</p>' +
					'<p>Your groin changes and you remove your lower clothing, to reveal you no longer have a cock, and you feel breast swell on your chest. You can see clearly in the mirror your face has changed and you are a woman now.</p>'
				);
			}
			setQueryParams("");
			return true;
		}
		
		if (sType == "transformavataryou") {
			CastTransform(1);
			lst = this.isMan() ? this.sMaleFolderList.split(",") : this.sFemaleFolderList.split(",");
			var idx = Math.floor(Math.random() * lst.length);
			this.folder = lst[idx];
			updateLeftBar();
			showPopupWindow("Transformation",
				this.addPersonString('charmedbydavy-resisting.jpg', "height:max%") +
				'You cast the spell as you look at yourself in the mirrors, and you feel an incredible surge of lust wash over you. For a moment you thought you heard laughter, but it is lost in the strange feelings swelling in your chest.</p>' +
				'<p>You can see your face shifting, and almost blurs and after a moment you are looking at a different person in the mirror. A moment later you wonder what just happened, the face in the mirror is the one you always had, but you seem to remember that maybe this is not right.</p>'
			);		
			setQueryParams("");
			return true;
		}
		
		return false;
	};

	perYou.showEventSleep = function(wt, plc, s, param)
	{
		if (this.checkFlag(50)) {
			// Bimbo Curse Sleep 1
			dispPlace(46, "type=bimbosleep1");
			return true;
		}
		if (param) return false;		// An event is pending, do nothing tonight
		
		// Dreams disabled by the dream catcher
		if (isItemHere(69)) return false;
		
		var dm = isItemHere(70) ? 100 : 1;
		
		// Dream after reading 'Carnal Alchemy
		if (!this.checkFlag(44) && checkPlaceFlag("RathdownRd", 5)) {
			WaitForDayNight(s, plc, 'type=dream7');
			return true;
		}
		// Initial dream after reading 'The King in Yellow'
		if (checkPersonFlag("Catherine", 13) && !perYou.checkFlag(46)) {
			WaitForDayNight(s, plc, 'type=dreamking');
			return true;
		}
		// Dream 2 random
		if (!this.checkFlag(41) && nMana > 0 && Math.random() < (dm * 0.1)) {
			WaitForDayNight(s, plc, 'type=dream2');
			return true;
		}
		// Dream 5 random
		if (!this.checkFlag(42) && Math.random() < (dm * 0.1)) {
			WaitForDayNight(s, plc, 'type=dream5');
			return true;
		}
		// Dream Kate (random but high chance)
		if (!this.checkFlag(43) && Math.random() < (dm * 0.8)) {
			WaitForDayNight(s, plc, 'type=dreamkate');
			return true;
		}
		// Dream Vampire (random but high chance)
		if (!this.checkFlag(47) && Math.random() < (dm * 0.8) && isCharmed("Vampyre")) {
			WaitForDayNight(s, plc, 'type=dreamvampyre1');
			return true;
		}
		// Random 'King in Yellow' dreans (repeatable)
		if (this.checkFlag(46) && Math.random() < 0.1) {
			WaitForDayNight(s, plc, 'type=dreamkinglater');
			return true;
		}
		// Demon in the bath
		if (!this.checkFlag(45) && isDemonFreed() && Math.random() < (dm * 0.5)) {
			WaitForDayNight(s, plc, 'type=dream8');
			return true;
		}
		// Egypt dream
		if (!this.checkFlag(48) && checkPlaceFlag("Museum", 5) && Math.random() < (dm * 0.5)) {
			WaitForDayNight(s, plc, 'type=dream9');
			return true;
		}
		// Demon Aletta Ocean
		if (!this.checkFlag(59) && this.checkFlag(45) && isDemonFreed() && Math.random() < (dm * 0.5)) {
			WaitForDayNight(s, plc, 'type=dream10');
			return true;
		}	
		
		// Other Interesting dreams
		if (dm > 1) {
			var ar = gameState.sRecentImages.split(",");
			if (ar.length < 10) {
				ar.push("Images/Visions/wet1j.mp4");
				ar.push("Images/Visions/bimbo1d.mp4");
				ar.push("Images/Visions/family1a.mp4");
				ar.push("Images/Visions/family1f.mp4");
				ar.push("Images/Visions/sex1d.mp4");
				ar.push("Images/Visions/nun1b.mp4");
				ar.push("Images/Visions/lesbian1b.mp4");
			}
			dm = Math.floor(ar.length * Math.random());
			WaitForDayNight(s, plc, 'type=dreaminteresting&img=' + ar[dm]);
			return true;
		}
		return false;
	};

	// events for you
	perYou.showEvent = function()
	{
		var md;

		if (sType == "possessionendnight") {
			// Possession ends at night
			md = WritePlaceHeader();
			showPopupWindow("Dusk Arrives...",
				"<img src='Images/dusk.png' class='imgpopup' alt='Dusk'>" +
				'<p>The possession spell ends as the sun rises and you wake at the Sacred Clearing...</p>',
				"Dispossession()"
			);	
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "possessionendday") {
			// Possession ends at night
			md = WritePlaceHeader();
			showPopupWindow("Dawn Arrives...",
				"<img src='Images/dawn.png' class='imgpopup' alt='Dawn'>" +
				'<p>The possession spell ends as the sun sets and you wake at the Sacred Clearing...</p>',
				"Dispossession()"
			);	
			WritePlaceFooter(md);
			return true;			
		}		
		
		if (sType == "bimbosleep3") {
			// Bimbo Bad End after sleeping
			md = WritePlaceHeader();
			this.setFlag(55);
			AddImage("Player/Bimbo/bimboface1.jpg");
			addPlaceTitle(md, "Bimbo Transformation");
			md.write(
				'<p>You are soaked.</p>' +
				'<p>You wake up with your entire body covered in sweat, your pussy drenched in your own wetness and your fingers deeply embedded into it as the climax that had been building up in your dream hits you.</p>' +
				'<p>Hell, climax, orgasm, cum, all of these terms seem insufficient to describe what is going on within your body right now. It feels as if your mind is swept away on a constant stream of orgasmic bliss while your very sense of self is fading away.</p>' +
				'<p>You are changing. Your ambitions, experiences, intelligence... all leaking out of your ' + (this.isMan() ? 'newly transformed' : 'suddenly very sensitive') + ' pussy in the process of your body and mind taking on a new identity.</p>' +
				'<p>When you finally recover your senses, very little of your old self is left. You search for a mirror and find a gorgeous, sexy Bimbo starring back at you, a body made to be fucked and dominated and not think about... stuff as much as you used to, and to your surprise... that\'s just fine with you.</p>' +
				'<p>Old ' + this.getPersonName() + ' was such a meanie, always charming people and chasing power and doing complicated... uh... magicstuff.</p>' +
				'<p>New ' + this.getPersonName() + ' doesn\'t want to dominate people and make them do stuff against their will, new ' + this.getPersonName() + ' wants to make people happy! Because if you make others happy you are happy and you are much to dumb for more complicated thoughts anyway.</p>' +
				'<p>In fact, somehow, freeing that poor woman you have locked up is the first thing that does come to your mind... fancy that!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'head straight for the hotel and free Jessica!', 161, 'type=bimbobadend1');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "mikuendtransform") {
			// Miku end the transform
			md = WritePlaceHeader();
			perYou.setFlag(50, false);
			perYou.setFlag(54, false);
			perYou.setFlag(56, false);
			AddMana(-30);
			AddImage(findPerson("Miku").addPlaceImageLeft());
			addPlaceTitle(md, "Miku and the Transformation");
			md.write(
				'<p>You expect a quip or barb from her, but Miku quickly realizes the severity of the situation and tells you to lie down, so she can work on isolating the tainted Mana within your body.</p>' +
				'<p>It\'s a gruesome process... You feel like a part of you is torn away, like you go against your better instincts to allow her to take that blissful lack of worry and errant thoughts away, and you are lucky that Miku ignores your orders to stop and fights any attempt to struggle until your mind has cleared enough to think straight again.</p>' +
				'<p>Piece by piece, the changes to your body revert until she finally pulls the collected mana into a small glowing ball of energy, briefly pulsating around her hand before being left to evaporate into thin air.</p>' +
				'<p>It\'s very unsettling to realize how much the stone made you love the idea of changing into some brainless fucktoy, and you wonder if that\'s how those who were under the Dai Chu and remember its effects feel. But more-so, you worry about who may have ordered it delivered to your house.</p>' +
				'<p>Miku is happy that your brain (And your cock) is still intact and certainly enjoys your praise for her quick thinking. She doesn\'t know what kind of magic this was or who might have send you that package, but confirms your own thought that you likely still have an enemy out there.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'thank Miku and continue on', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "tinaendtransform") {
			// Miku end the transform
			md = WritePlaceHeader();
			perYou.setFlag(50, false);
			perYou.setFlag(54, false);
			perYou.setFlag(56, false);
			AddMana(-30);
			findPerson("Tina").showPerson("tina-talk.jpg");
			addPlaceTitle(md, "Tina and the Transformation");
			md.write(
				'<p>Tina looks distractedly sexy to you, and you have a hard time focusing enough to explain your predicament to her in as few words as possible, but luckily, she quickly catches on what she needs to do.</p>' +
				'<p>It\'s almost a painful process. Your altered mind doesn\'t want Tina to stop your Transformation into a blissfully happy slut and you need to muster all your willpower to stop yourself from telling her to not take this wonderful gift away, but as the changes to your body revert, so do those to your mind and your senses slowly begin to clear up.</p>' +
				'<p>It\'s very unsettling when you begin to realize how much the stone made you love the idea of changing into some brainless fucktoy, and you breath out a sight of relieve as Tina assures you she got all of it out and allowed it to evaporate into thin air.</p>' +
				'<p>You wonder if that\'s how those who were under the Dai Chu and remember its effects feel. But more-so, you worry about who may have ordered that stone delivered to your house.</p>' +
				'<p>Tina positively glows as you thank her for the help, reiterating several times that it was nothing and how happy she is that you are still yourself and to be of service to you.</p>' +
				'<p>She however doesn\'t know anything about this stone and who might have the means to create a trap like that.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'thank Tina and continue on', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (Place == 161 && sType == "bimbobadend1") {
			md = WritePlaceHeaderNIP();
			perYou.setFlag(31);
			var perJessica = findPerson("Jessica");
			switch(Math.floor(getHour() / 6)) {
				case 0: perJessica.showPerson("jessica5e.jpg","100%", "", "", "Witch-Toy"); break;
				case 1: perJessica.showPersonRorX("jessica-bound3.jpg", "100%", "", "", "Witch-Toy"); break;
				case 2: perJessica.showPersonRorX("jessica-bound5.jpg", "100%", "", "", "Witch-Toy"); break;
				case 3: perJessica.showPerson("jessica-bound2.jpg", "100%", "", "", "Witch-Toy"); break;
			}
			addPlaceTitle(md, "Jessica and the Bimbo Curse");
			md.write(
				'<p>You had expected Jess to be, like, a lot more happy to see you... She didn\'t even recognize you at first, and once you told her who you are she got angry and mean and even doesn\'t like being called “Jess” at all...</p>' +
				'<p>Sure, old you had locked her up in a sex dungeon, but that does sound like a lot of fun to new you, so you really don\'t know what her problem is.</p>' +
				'<p>The two of you argue for a while, and Jess seems so frustrated by your mental ineptitude that you are actually happy when your phone rings and you have an excuse to ignore her for a moment.</p>' +
				'<p>The voice at the other end sounds... familiar? It\'s a woman. Someone you have spoken to in the last days but who you are probably just too dumb to place properly... and she wants to talk to Jess anyway.</p>' +
				'<p>Jess is confused, mostly by how to use the phone, and you have to actually, like, explain it to her as if she\'s from the medieval ages or so!</p>' +
				'<p>“Who are you? How did you know that I was here? What did you do to ' + this.getPersonName() + '?”</p>' +
				'<p>The conversation sounds boring, so you start playing with your tits for a bit while she speaks, after all, it still amazes you how sensitive they are and... oh wait she is already done!</p>' +
				'<p>Maybe you can make up now? Or make out? She does have a pretty big smile on her face as she looks at you, so maybe all will be good now?</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return the smile and see what Jessica wants to do with you', 161, 'type=bimbobadend2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 161 && sType == "bimbobadend2") {
			md = WritePlaceHeaderNIP();
			perYou.setFlag(31);
			var perJessica = findPerson("Jessica");
			AddImage("Player/Bimbo/bimboplayer1.jpg");
			addPlaceTitle(md, "Happy Victim of the Bimbo Curse");
			md.write(
				'<p>It\'s been a week since Mistress Jessica (Gotta remember to not call her Jess, even though it\'s easier) and her lady friend, who apparently send you that wonderful stone but whose name you still can\'t seem to remember, have decided to take care of you, and you couldn\'t be happier!</p>' +
				'<p>You no longer have to worry about the whole “slave harem” thing, Mistress Jessica has freed you of that annoying responsibility, and you still get a lot of sex from all the horny men she sends over to your room.</p>' +
				'<p>Sometimes Jessica needs you to do boring stuff like helping track down girls from your old harem (It was huge, how could you ever have thought handling a group as big as this?) or assisting in some ritual. You help her because she\'s always so nice to you, but you very much prefer to go out, try out new clothes and throw yourself at cute guys and gals instead.</p>' +
				'<p>This magic thing is too complicated for your silly brain, but it\'s okay, that\'s what you have Mistress Jessica for.</p>' +
				'<p>Your new body is much better suited for mindless sex, anyway, and Mistress makes sure you get a lot of it to keep you happy and obedient.</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 40 && sType == "showeralone") {
			// Shower alone in the house (or too recently)
			md = WritePlaceHeader();
			perYourBody.showPerson("shower.jpg");
			addPlaceTitle(md, "Taking a Shower");
			md.write(
				'<p>You place your clothes on a nearby shelve and enjoy a relaxing shower for the next few minutes. No one disturbs you, and you feel refreshed and ready to take on the rest of the day.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'get out of the shower and dressed', 40);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 161 && this.whereNow() == 124 && isDavyDefeated() && perDavy.place != 184 && this.checkFlag(9) && !checkPersonFlag("Anita", 6)) {
			// Anita is here and moved Davy
			setPersonFlag("Anita", 6);
			md = WritePlaceHeader();
			perDavy.showPerson("davycellar.jpg");
			addPlaceTitle(md, "Davy in the Cellar");
			if (!checkPlaceFlag("Hotel", 9)) {
				setPlaceFlag("Hotel", 9);
				md.write(
					'<p>You descend the stairs into the cellar and you see Bambi has arranged a quick refit so it is more a dungeon of some sort of BDSM fantasy. You are always surprised at the skill and depravity of Bambi.</p>'
				);
			} else md.write('<p>The cellar or more accurately now the hotel dungeon is mostly dark, but with spot lighting on selected areas and people.</p>');

			md.write(
				'<p>You see Davy securely bound and gagged against one wall of the cellar. Standing in front of him are Bambi and Anita dressed in revealing leather outfits, a fantasy of dominatrix pleasures. Bambi you have no doubt has such an outfit, but Anita? Then you realised, of course Bambi has loaned Anita something from her collection.</p>' +
				'<p>Bambi greets you "' + perYou.getLord() + ' your servant Anita is somewhat lacking in skills to properly restrain and punish your slave here. I will train her with all my skill to become the best possible guardian of your slave."</p>' +
				'<p>Anita asks you "Are you sure ' + (perYou.isBornMale() ? 'Sir' : "Ma'am") + ' that this is what you want? Surely it would be simpler to beat him and then...", you stop her,</p>' +
				'<p>"No soldier! I want him here and controlled, not tortured. In all matters of guarding your prisoner you will obey Bambi, she is your superior for this duty." Anita salutes you and address Bambi,</p>' +
				'<p>"Ma\'am I am your to command!", you notice a mischievous glint in Bambi\'s eye and you caution her "Bambi, for this duty, remember that"</p>' +
				'<p>"Of course ' + perYou.getLord() + '", but you know how "imaginative" she is so you will have to check on things here occasionally.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'check the rest of the cellar dungeon', 161);
			addLinkToPlace(md, 'go back up to the hotel bar', 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "possessshower") {
			// Shower alone while possessing someone
			md = WritePlaceHeaderNP();
			perYourBody.showPerson("shower.jpg");
			addPlaceTitle(md, "Taking a Shower as " + perYourBody.getPersonName());
			md.write(
				'<p>You place their clothes on a nearby shelve and enjoy a relaxing shower for the next few minutes. Well maybe not so relaxing as you are not exactly yourself!</p>'
			);
			startQuestionsNP();
			addLinkToPlace(md, 'finish the shower and get dressed', Place);
			WritePlaceFooter(md);
			return true;			
		}
		if (Place != 46) return false;
		return this.showEventEndGame();
	};
	
	perYou.addEndGameOthers = function(md, stage)
	{
		// Things that failed 
		if (sType != "endgame1kategone" && sType != "endgame1family1" && sType != "endgame1family2" && sType != "endgame1davy" && sType != "endgame1cult" && sType != "endgame1cultpreg" && sType != "endgame1elian" && ((isDemonGone() && sType !== "endgame1demonloose") || wherePerson("Kate") == 9999)) addLinkToPlace(md, 'but not everything went well...', 46, 'type=' + (isDemonGone() ? 'endgame1demonloose' : 'endgame1kategone') + (stage == "random" ? "&stage=random" : ""));

		// Others
		else if ((isCharmedBy("Mom") || isCharmedBy("Tracy")) && sType != "endgame1family1" && sType != "endgame1family2" && sType != "endgame1davy" && sType != "endgame1cult" && sType != "endgame1cultpreg" && sType != "endgame1elian") addLinkToPlace(md, 'then again there is your family', 46, 'type=endgame1family1' + (stage == "random" ? "&stage=random" : ""));
		else if (isCharmedBy("Kylie") && sType != "endgame1family2" && sType != "endgame1davy" && sType != "endgame1cult" && sType != "endgame1cultpreg" && sType != "endgame1elian") addLinkToPlace(md, 'then again there is your extended family', 46, 'type=endgame1family2' + (stage == "random" ? "&stage=random" : ""));
		else if (isDavyCaptive() && sType != "endgame1davy" && sType != "endgame1cult" && sType != "endgame1cultpreg" && sType != "endgame1elian" ) addLinkToPlace(md, 'then again there is Davy', 46, 'type=endgame1davy' + (stage == "random" ? "&stage=random" : ""));
		else if (checkPersonFlag("Daria", 12) && sType != "endgame1cult" && sType != "endgame1cultpreg" && sType != "endgame1elian") addLinkToPlace(md, 'there is also Mother Superior and her Cult', 46, 'type=endgame1cult' + (stage == "random" ? "&stage=random" : ""));
		else if (isCharmedBy("Elian") && per.place < 1000 && sType != "endgame1elian") addLinkToPlace(md, "then there is Elian", 46, 'type=endgame1elian' + (stage == "random" ? "&stage=random" : ""));

		else addLinkToPlace(md, 'why not indulge with others?', 46, 'type=endgame1other' + (stage == "random" ? "&stage=random" : "&stage=1"));
	};
	
	perYou.addEndGamePregnancy = function(cond, evt)
	{
		var stage = getQueryParam("stage");
		var state = getQueryParam("state");
		if (state === '' || state === undefined) state = 0;
		else state = parseInt(state);
		if (state >= this.charmedTime) return false;
		if (!cond) return false;
		
		addLinkToPlace(mdCache, "that was not all the 'good news'", 46, 'type=' + evt + '&stage=' + stage + '&state=' + this.charmedTime);
		return true;
	};
	
	perYou.addEndGamePregnanciesBase = function(md)
	{
		hideSidebars();
		
		this.charmedTime=1; if (this.addEndGamePregnancy((isCharmedBy("MrsGranger") || isCharmedBy("Kate")) || isCharmedBy("Diane"), "endgame1dianegrangers")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("AdeleRoss") || checkPersonFlag("Catherine", 5) || (isCharmedBy("AmyRoss") || checkPersonFlag("AmyRoss", 9)), "endgame1rosssisters")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy((perBeasley.getPersonGender() == "woman" && perBeasley.getCharmedLevel() == 2) || isCharmedBy("Didi"), "endgame1beasleydidi")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Carol") || isCharmedBy("Ellie"), "endgame1carolellie")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Abby") || isCharmedBy("Miku"), "endgame1abbymiku")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Alison") || isCharmedBy("Jenny"), "endgame1alisonjenny")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Anita") || isCharmedBy("Melissa"), "endgame1anitamelissa")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy((isCharmedBy("Mayor") && !per.isMan()) || isCharmedBy("Angela"), "endgame1townhall1")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Tammy") || isCharmedBy("Emily"), "endgame1townhall2")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Madison") || isCharmedBy("Zoey") || isCharmed("Nina"), "endgame1delivery")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Hannah") || isCharmedBy("Camryn"), "endgame1hannahcamryn")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Pamela") || isCharmedBy("Donna"), "endgame1donnapamela")) return true;
		this.charmedTime++; if (this.addEndGamePregnancy(isCharmedBy("Victoria") || isCharmedBy("Nella"), "endgame1victorianella")) return true;

		// Add other pregnancies from person objects, excluding you, town, kurndorf, or ronald
		var p;
		for (i = 0, ie = arPeople.length - 4; i < ie; i++) {
			this.charmedTime++;
			p = arPeople[i];
			var s = p.checkEndGamePregnancy();
			if (s != '') {
				if (this.addEndGamePregnancy(true, s)) return true;
			}
		}
		
		// Others
		var stage = getQueryParam("stage");
		this.addEndGameOthers(md, stage);
	};
	
	perYou.showEventEndGame = function() 
	{
		var md, ar, stage, bExp, img, no, stg, bPreg, p;

		if (sType == "endgame1harem") {
			// End Game 1 - scenes of your harem
			// Random image
			hideSidebars();
			stage = getQueryParam("stage");
			ar = [];
			var ps;
			p = findPerson("Tracy");
			if (p.getCharmedLevel() == 2 && isExplicit(true)) ar.push("Explicit/" + p.getImgS("endgame1-harem1.gif"));
			if (isCharmedBy("MrsGranger")) {
				if (isCharmedBy("MsJones")) ar.push("endgame1-harem4.jpg");
				if (checkPersonFlag("Catherine", 5)) ar.push("endgame1-harem5.jpg");
				if (isCharmedBy("Alison")) ar.push("endgame1-harem13.jpg");
			}
			if (checkPersonFlag("Catherine", 5)) {
				findPerson("Mayor")
				if (per.isCharmedBy() && !per.isMan()) ar.push("endgame1-harem7.jpg");
				if (isCharmedBy("Sarah")) ar.push("endgame1-harem11.jpg");
				if (isCharmedBy("MsJones") && isCharmedBy("Louise")) ar.push(per.getImgS("endgame1-harem15.jpg"));
			}
			p = findPerson("Gina");
			if (isCharmedBy("MsTitus")) {
				if (p.dress == "Shyla" && p.isCharmedBy()) ar.push("endgame1-harem2shyla.jpg");
				else if (isCharmedBy("AuntBrandi")) ar.push("endgame1-harem2brandi.jpg");
				else if (findPerson("Melissa").dress == "Eva" && per.isCharmedBy()) ar.push("endgame1-harem2melissa.jpg");
				else if (isCharmedBy("Didi")) ar.push("endgame1-harem21.jpg");
				else ar.push("endgame1-harem2.jpg");
			}

			if (isCharmedBy("Hannah") && isCharmedBy("Camryn")) ar.push("endgame1-harem3.jpg");
			if (isCharmedBy("Diane")) {
				if (isCharmedBy("MrBeasley") && per.checkFlag(12) && perBeasley.dress == "Bimbo2") ar.push("endgame1-harem6.jpg");
			}
			if (isCharmedBy("MrsRobbins")) {
				p = per;
				if (per.dress == "Maria" && isCharmedBy("NurseMegan")) ar.push(p.getImgS("endgame1-harem8.jpg"));
				else if (per.dress == "Charley" && isCharmedBy("Monique")) ar.push(p.getImgS("endgame1-harem8.jpg"));
			}
			if (isCharmedBy("Victoria")) ar.push("endgame1-harem12.jpg");
			p = findPerson("MissLogan");
			if (isCharmedBy("MsJones") && p.isCharmedBy() && isCharmedBy("MrsTanika")) ar.push(per.getImgS(p.getImgS("endgame1-harem14.jpg")));
			if (isCharmedBy("Tess") && isCharmedBy("Monique")) ar.push("tessmonique.jpg");
			ar.push("endgame1-harem16.jpg");
			ar.push("endgame1-harem17.jpg");
			p = findPerson("Lauren")
			if (isMurderPath() && isCharmedBy("Sarah") && p.dress == "Shay") ar.push("endgame1-harem18.jpg");
			//else if (!isMurderPath() && isCharmedBy("Lauren")) ar.push("endgame1-harem18.jpg");
			if (isCharmedBy("Mayor") && !per.isMan() && p.isCharmedBy()) ar.push("endgame1-harem19.jpg");
			findPerson("Jessica");
			if ((per.isRival() || per.getRivalry() > 2) && isCharmedBy("Desiree")) ar.push("endgame1-harem20.jpg");
			if (isCharmedBy("Didi") && isCharmedBy("MsTitus")) ar.push("endgame1-harem21.jpg");
			if (perYou.isMaleSex() && isExplicit(true) && isCharmedBy("MsTitus") && isCharmedBy("Monique")) ar.push("Explicit/endgame1-harem23.jpg");
			if (checkPersonFlag("Catherine", 5) && isCharmedBy("MsJones")) ar.push("endgame1-harem24.jpg");
			if (isCharmedBy("Melissa") && isCharmedBy("Betty")) ar.push("endgame1-harem25.jpg");
			
			if (isCharmedBy("Vampyre")) {
				if (isCharmedBy("Alison")) ar.push("meetalison.jpg");
				if (isMurderPath() && isCharmedBy("Sofia")) ar.push("endgame1-harem9.jpg");
			}
			
			// Image and stage
			stg = stage == "random" ? Math.floor(Math.random() * ar.length) + 1 : parseInt(stage, 10);
			img = ar[stg - 1];
			bExp = img.indexOf("Explicit/") != -1;
			if (bExp) img = img.split("Explicit/").join("");
			if (img == "tessmonique.jpg") {
				no = 100;
				ps = "Tess";
			} else if (img == "meetalison.jpg") {
				no = 101;
				ps = "Vampyre";
			} else if (img == "endgame1-harem19.jpg") {
				no = 19;
				ps = "Lauren";
			} else {
				var sa = img.split("endgame1-harem");
				if (sa.length > 1) no = parseInt(sa[1], 10);
				else no = 99999;
			}
			if (no == 5 || no == 7 || no == 24) bExp = isExplicit() && perYou.isMaleSex();

			md = WritePlaceHeader();
			if (ps != undefined) findPerson(ps).showPerson(img);
			else if (bExp) AddImage("Endings/Explicit/" + img);
			else AddImage("Endings/" + img);
			addPlaceTitle(md, "Enjoying Life With Those You Know");

			if (stage == 'random' || stg == 1) {
				md.write(
					'<p>You have a comfortable situation, you have substantial influence, or control if you prefer, over the town. You have defeated Davy, the ghost of Kurndorf and an actual Demon! You have learned quite a lot of magic and know how to source magic and money.</p>' +
					'<p>You have a number of people who call you either their lover or ' + perYou.getMaster()
				);
				if (isCharmedBy("Tracy") || isCharmedBy("Mom", "You")) md.write(' including your own family. ');
				md.write('They are willing to do anything for you. All your dreams of sexual desire can be satisfied in any number of combinations');
				if (stage != "random") md.write(" and you want to explore every possible combination.</p><p><i>In particular this time...</i></p>");
				else md.write('.</p><p><i>In particular...</i></p>');
			} else {
				md.write(
					'<p>They are willing to do anything for you. All your dreams of sexual desire can be satisfied in any number of combinations and you want to explore every possible combination.</p>' +
					'<p><i>In particular this time...</i></p>'
				);				
			}

			switch(no) {
			case 1:
				// Tracy threesome with unidentified blond
				md.write(
					'<p>Tracy is a beautiful and playful sister and lover, exactly as you have always desired.</p>' +
					'<p>At times she brings home friends tp \'play\' but she usually likes to playfully tell you that they are \'hers\'.</p>'
				);
				break;
			case 2:
				// Ms Titus
				if (img == "endgame1-harem2shyla.jpg") {
					// and Gina (Shyla Stylez model)
					md.write(
						'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all. She is enthusiastic about playing with others of your harem, often with the security guard Gina and without your asking as well.</p>' +
						'<p>Both are lovely large breasted slaves for your harem with no complexities or jealousies. They will do anything you want, at anytime and with anyone!</p>'
					);
				} else if (img == "endgame1-harem2brandi.jpg") {
					// and Aunt Brandi
					md.write(
						'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all. She is enthusiastic about playing with others of your harem, often with the security guard Gina and without your asking as well.</p>' +
						'<p>Both are lovely large breasted slaves for your harem with no complexities or jealousies. They will do anything you want, at anytime and with anyone!</p>'
					);					
				} else if (img == "endgame1-harem2melissa.jpg") {
					// and Melissa
					md.write(
						'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all. She is enthusiastic about playing with others of your harem, often with the security guard Gina and without your asking as well.</p>' +
						'<p>Both are lovely large breasted slaves for your harem with no complexities or jealousies. They will do anything you want, at anytime and with anyone!</p>'
					);
				} else {
					// Fallbak, no one else
					md.write(
						'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all.</p>'
					);
				}
				break;
			case 3:
				// Hannh and Camryn
				md.write(
					'<p>The sisters Hannah and Camryn make wonderful girlfriends or slaves as you prefer, beautiful and buxom. Small jealousies and rivalries do crop up, they are sisters after all, but the charm spell helps to keep these minor and controllable, like the women themselves. Still it adds a spice to life, along with some delightful sister/sister threesomes.</p>'
				);
				break;
			case 4:
				// Ms Jones and Mrs Granger
				md.write(
					'<p>Mrs. Granger is no matter how you think of her, a bit of a slut, and more so since you charmed her. You still think of her as <b>Mrs.</b> Granger not just Marie as you like to consider her your MILF slut and she goes along with this completely.</p>' +				
					'<p>Ms. Jones, your teacher, your slave, your immortal slut, once a demon\'s plaything and now yours. She is completely dedicated to you and very, very experienced in <b>everything</b> and willing to do <b>anything or anyone.</b></p>' +
					'<p>While bringing the two of them together is an obvious paring, the mortal and the immortal slut, there are times you are uncomfortable with them. They bring you incredible pleasure but the contrasts of them and their dedication is odd to you, one utterly dedicated and unquestioning, one naturally passionate and caring, so you only enjoy them together on special occasions.</p>'
				);
				break;
			case 5:
				// Catherine and Mrs Granger
				md.write(
					'<p>Mrs. Granger is no matter how you think of her, a bit of a slut, and more so since you charmed her. You till think of her as <b>Mrs.</b> Granger not just Marie as you like to consider her your MILF slut and she goes along with this completely.</p>' +
					'<p>Catherine on the other hand you have always considered promiscuous, a woman who loves sex and happily indulges in it where safe and enjoyable. What the difference between her and Ms. Granger in this matter is more terminology, and practise. Catherine actively seeks partners for fun, but Mrs. Granger will do the same with any partner but is more happy to be sought after!</p>' +
					'<p>It is obvious to get the two women together and they love every time you request it, and you know they meet regularly without you, once met there is no way they would stay apart! This is fine by you, let them has as much fun as they like as long as they are hot and available for you any time you want!</p>'
				);
				break;
			case 6:
				// Diane 
				if (img == "endgame1-harem6beasleyamy") {
					// and Ms Beasley (Bimbo2)
					md.write(
						'<p>At one time you became suspicious that Diane White and Mr. Beasley may have some sort of association or relationship, some of the matters around the Book and the investigations were a little suspicious to you.</p>' +
						'<p>You got your two slaves together to investigate this, but the bimbo that Beasley is now just assumed it was time for a threesome, not that she was wrong of course. Diane denied any association with Mr. Beasley, but you are still unsure given his talents of hypnosis.</p>' +
						'<p>Still having two big breasted sluts together was fun but just in case you keep them from meeting without you present, and then just for a repeat threesome.</p>'
					);
				} else if (img == "endgame1-harem6beasleydanni") {
					// and Ms Beasley (Bondage)
					md.write(
						'<p>At one time you became suspicious that Diane White and Mr. Beasley may have some sort of association or relationship, some of the matters around the Book and the investigations were a little suspicious to you.</p>' +
						'<p>You got your two slaves together to investigate this, but the bimbo that Beasley is now just assumed it was time for a threesome, not that she was wrong of course. Diane denied any association with Mr. Beasley, but you are still unsure given his talents of hypnosis.</p>' +
						'<p>Still having two big breasted sluts together was fun but just in case you keep them from meeting without you present, and then just for a repeat threesome.</p>'
					);
				} else if (img == "endgame1-harem6brandi") {
					// and Aunt Brandi
					md.write(
						'<p>At one time you became suspicious that Diane White and Mr. Beasley may have some sort of association or relationship, some of the matters around the Book and the investigations were a little suspicious to you.</p>' +
						'<p>You got your two slaves together to investigate this, but the bimbo that Beasley is now just assumed it was time for a threesome, not that she was wrong of course. Diane denied any association with Mr. Beasley, but you are still unsure given his talents of hypnosis.</p>' +
						'<p>Still having two big breasted sluts together was fun but just in case you keep them from meeting without you present, and then just for a repeat threesome.</p>'
					);
				} else if (img == "endgame1-harem6cherry") {
					// and Cherry
					md.write(
						'<p>At one time you became suspicious that Diane White and Mr. Beasley may have some sort of association or relationship, some of the matters around the Book and the investigations were a little suspicious to you.</p>' +
						'<p>You got your two slaves together to investigate this, but the bimbo that Beasley is now just assumed it was time for a threesome, not that she was wrong of course. Diane denied any association with Mr. Beasley, but you are still unsure given his talents of hypnosis.</p>' +
						'<p>Still having two big breasted sluts together was fun but just in case you keep them from meeting without you present, and then just for a repeat threesome.</p>'
					);
				} 
				break;
			case 7:
				// Catherine and Mayor Thomas
				md.write(
					'<p>Catherine, Catherine, Catherine...your promiscuous friend and ally. You know she has fucked a lot of people, good for her, but you did not realise she had played with Mayor Thomas. Sure a casual thing for them both and you have no plans to change this relationship, it is just strange how small a town Glenvale can be at times!</p>'
				);
				break;
			case 8:
				if (findPerson("MrsRobbins").dress == "Maria") {
					// Nurse Megan and Mrs Robbins
					md.write(
						'<p>Some time later you learned that Geraldine, or Mrs. Robbins as you also think of your MILF slave, knows the nurse Megan quite well. They are friends who meet occasionally, not very close but enough to have lunch or go out for drinks at times.</p>' +
						'<p>Since you charmed them you have made sure they have gotten closer, at least sexually with you and them present. You do not think this has lead to anything more when you are not around, sometime you may have to encourage things there.</p>'
					);
				} else {
					// Monique and Mrs Robbins
					md.write(
						'<p>Some time later you learned that Geraldine, or Mrs. Robbins as you also think of your MILF slave, knows Monique quite well. They are friends who meet occasionally but usually with other mutual friends.</p>' +
						'<p>Since you charmed them you have made sure they have gotten closer, at least sexually with you and them present. You do not think this has lead to anything more when you are not around, sometime you may have to encourage things there.</p>'
					);
				}	
				break;
			case 9:
				// Lilith and Sofia
				md.write(
					'<p>Lilith still claims to be your loyal slave in heart and soul, but she will still not tell you her true name, or answer most questions about her. A loyal slave, who is clearly using you in some way, but you are happy to use her as well.</p>' +
					'<p>Sofia the chauffuer is under your control, no matter how reluctantly she is yours. You were surprised one day when you saw her talking with Mrs. Granger at the shopping center. It seems she was allowed to hire out the limousine when it was not otherwise used. You have no difficulties with this now, and it seems Mrs. Granger likes to ride in style at times.</p>' +
					'<p>Well, this has opened up some encounters with the two of them, with Lilith firmly dominating Sofia, but you have been so far careful to not tell Sofia about Lilith\'s true nature.</p>'
				);
				break;				
			case 11:
				// Sarah and Catherine + other
				md.write(
					'<p>Since the heiress to the Gates fortune is your slave, you have had opened up a world of wealth and upper-class parties. Sarah is a loyal slave and you have encouraged her to experience these things both with yourself and other of your slaves. Catherine is one you like to indulge, she willingly came to you and embraced her place with you and your harem.</p>' +
					'<p>Sometimes Sarah can bring friends of hers to keep you entertained, and sometimes Catherine will pickup someone for you all to enjoy. Sometimes these people will become a new slave, and other times just a toy for the night.</p>'
				);
				break;
			case 12:
				// Victoria + Nella
				md.write(
					'<p>Victoria, owner of the Antiques Store, she is your perfect aid and assistant. You were surprised one day to visit and you found her with the security guard from the bank. You were even more surprised to see they were bound and gagged and clearly enjoying themselves.</p>' +
					'<p>Nella, the guard is her close friend and they both enjoy bondage. It is a surprise that this interest of Victoria had not come up before, but you were happy to indulge her interest as often as she wished, along with your new slave, her friend Nella</p>'
				);
				break;
			case 13:
				// Mrs Granger and Alison
				md.write(
					'<p>Mrs. Granger is no matter how you think of her, a bit of a slut, and more so since you charmed her. You still think of her as <b>Mrs.</b> Granger not just Marie as you like to consider her your MILF slut and she goes along with this completely.</p>' +				
					'<p>Alison has retained some of her independence from her defensive spell and still likes to be in charge of things when you are with her. It is of no concern to you, she is somewhat insatiable so she requires little more than sex, sex and more sex. Certainly the spell helped with this but a lot is just her nature.</p>' +
					'<p>These two woman are both insatiable sluts, who completely accept this as part of their nature, with a little help from the spells. OF course this means the times you have had with them have been intense fuck-fests, little else could be discussed!</p>'
				);
				break;
			case 14:
				// Ms Jones, Mrs Tanika, Miss Logan
				md.write(
					'<p>Ms. Jones, your teacher, your slave, your immortal slut, once a demon\'s plaything and now yours. She is completely dedicated to you and very, very experienced in <b>everything</b> and willing to do <b>anything or anyone</b>. Especially with her fellow teachers and since you have also charmed the once cold Mrs. Tanika and the friendly Miss. Logan school-life has been a lot more fun!</p>'
				);
				break;
			case 15:
				// Ms Jones, Catherine, Louise
				md.write(
					'<p>Ms. Jones, your teacher, your slave, your immortal slut, once a demon\'s plaything and now yours. She is completely dedicated to you and very, very experienced in <b>everything</b> and willing to do <b>anything or anyone</b>.</p>' +
					'<p>Catherine on the other hand you have always considered promiscuous, a woman who loves sex and happily indulges in it where safe and enjoyable. What the difference between her and Ms. Granger in this matter is more terminology, and practise. Catherine actively seeks partners for fun, and you have found her with Ms. Jones a number of times.</p>' +
					'<p>One day while they where playing you decided on a whim to ask Louise to join in. She turned up looking uncertain but your other sluts eagerly made her welcome.</p>'
				);
				break;
			case 16:
				// Jesse and Lucy (Thrall)
				md.write(
					'<p>Once Jesse recovered you found out that she had a particular affinity with the demon thralls. They know she is not the demon but still obey her in all ways as if she is still the demon.</p>' +
					'<p>This creates an interesting dynamic, once you were able to make Jesse your slave as well!</p>'
				);
				break;
			case 17:
				// Jesse and Seraphina (Thrall)
				md.write(
					'<p>Once Jesse recovered you found out that she had a particular affinity with the demon thralls. They know she is not the demon but still obey her in all ways as if she is still the demon.</p>' +
					'<p>This creates an interesting dynamic, once you were able to make Jesse your slave as well!</p>'
				);
				break;
			case 18:
				// Sarah and Lauren
				md.write(
					'<p>Sarah is now your loyal slave, the beautiful heiress of the Gates fortune. Her maid Lauren is also your slave, but Sarah is very possessive of her and has asked to have exclusive access to her. You have of course refused, Lauren is a lovely maid and can serve your needs as well as Sarah\'s.</p>' +
					'<p>You try to stop Sarah\'s possessiveness but eventually you give up, when you are not there they can continue their games, but when you are around they will both serve you!</p>'
				);
				break;
			case 19:
				// Mayor Thomas and Lauren
				md.write(
					'<p>The maid Lauren spends most of her time serving her Mistress Sarah in an odd relationship. You try to give her a break at times, personally serving you elsewhere, or loaning her to another of your slaves.</p>' +
					'<p>You have loaned her a number of times to Mayor Thomas as they seem to get on well, they both know their place as your slaves and lovers and they are grateful for being allowed to spend time together.</p>'
				);
				break;
			case 20:
				// Jessica and Sister Desiree
				md.write(
					'<p>One odd encounter you had was meeting the Witch Jessica talking to Sister Desiree but realise they have a lot in common. Sister Desiree is fascinated by the paranormal, the occult and Jessica <b>is</b> the occult personified here in Glenvale. Jessica on the other hand has an other time respect for the church and a romantic, or is it erotic, interest in Nuns.</p>' +
					'<p>You are quite happy for them to have a friendship, well maybe a little closer than that, but make it clear to Jessica that Sister Desiree is yours foremost. Jessica agrees completely and never crosses that line in respect for you saving her from imprisonment.</p>'
				);
				break;
			case 21:
				// Ms Titus and Didi
				md.write(
					'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all. She is enthusiastic about playing with others of your harem, frequently with the lovely Didi and without your asking as well.</p>' +
					'<p>Both are lovely large breasted slaves for your harem with no complexities or jealousies. They will do anything you want, at anytime and with anyone!</p>'
				);
				break;	
			case 22:
				// Ms Jones, Monique
				md.write(
					'<p>Ms. Jones, your teacher, your slave, your immortal slut, once a demon\'s plaything and now yours. She is completely dedicated to you and very, very experienced in <b>everything</b> and willing to do <b>anything or anyone</b>.</p>' +
					'<p>Monique on the other hand is utterly devoted to you, focused on your needs and desires. A nervous but complex woman, interested in the occult, but also frightened of it. A person who loves cars and friends with Hannah, but who does not own a car.</p>' +
					'<p>They only get together when you arrange it, Monique is so focused on you but she is also afraid of Ms. Jones of her complex and to her frightening past.</p>'
				);
				break;
			case 23:
				// Ms Titus and Monique
				md.write(
					'<p>The librarian Karen Titus is a complete submissive, a slave for you who will do anything you ask of her, anything at all. She is enthusiastic about playing with others of your harem, and she welcomed being able to play with her fellow librarian Monique.</p>' +
					'<p>Monique on the other hand is utterly devoted to you, focused on your needs and desires. A nervous but complex woman, interested in the occult, but also frightened of it. A person who loves cars and friends with Hannah, but who does not own a car.</p>' +
					'<p>Karen is enthusiastic, but Monique only plays with her to pleasure or entertain you, but still the sight of the two librarians at your feet is a rush of pleasure and power.</p>'
				);
				break;
			case 24:
				// Ms Jones, Catherine
				md.write(
					'<p>Ms. Jones, your teacher, your slave, your immortal slut, once a demon\'s plaything and now yours. She is completely dedicated to you and very, very experienced in <b>everything</b> and willing to do <b>anything or anyone</b>.</p>' +
					'<p>Catherine, Catherine, Catherine...your promiscuous friend and ally. You know she has fucked a lot of people, good for her, and you found it interesting when you found her with Ms.Jones. You have no difficulty with this, especially as they enthusiastically invited you to join them.</p>'
				);
				break;
			case 25:
				// Melissa and Betty
				md.write(
					'<p>One time when you visit Melissa you learn she is friends with Betty the farmers daughter. This creates many opportunities for you to play with your two large breasted slaves.</p>'
				);
				break;				
			case 100:
				// Tess and Monique
				md.write(
					'<p>Tess is such a beautiful and nice woman, one of your first...magically enhanced girlfriends. You are touched with how devoted and loving she is, and you like to daydream about how you may of been able to make her yours even without the spell...a dream but not really likely.</p>' +
					'<p>Monique on the other hand is utterly devoted to you, focused on your needs and desires. A nervous but complex woman, interested in the occult, but also frightened of it. A person who loves cars and is friends with Hannah, but who does not own a car.</p>' +
					'<p>Even with these differences these two were friends before the spells, and now you can have them become a lot closer. Tess would always prefer to just be alone with you, but is willing to go along with other activities for your pleasure. Monique has no reservations, and you suspect this may of been so before the spell, but you will never know that now.</p>'
				);
				break;				
			case 101:
				// Alison and Lilith
				md.write(
					'<p>Alison has retained some of her independence from her defensive spell and still likes to be in charge of things when you are with her. It is of no concern to you, she is somewhat insatiable so she requires little more than sex, sex and more sex. Certainly the spell helped with this but a lot is just her nature.</p>' +
					'<p>Lilith on the other hand, still claims to be your loyal slave in heart and soul, but she will still not tell you her true name, or answer most questions about her. A loyal slave, who is clearly using you in some way, but you are happy to use her as well.</p>' +
					'<p>You found you could have Lilith the vampyre indulge her lusts with ALison after feeding and both seem to very much enjoy their encounters.</p>'
				);
				break;	
			}
			md.write(
				'<p>...</p>' +
				'<p>Still your existing lovers, or slaves if you will, are not all there is for you to play with...</p>'
			);
			startQuestions();
			if (stage != "random" && (stg < (ar.length - 1))) {
				// Move to next editing
				addLinkToPlace(md, "It is time to enjoy more", 46, "type=endgame1harem&stage=" + (stg + 1));
			} else {
				// Finished all the possible endings (or just picking one)
				// Extra bits for your harem
				if (getCharmedLevel("MissLogan") == 2 && checkPersonFlag("MissLogan", 1)) addLinkToPlace(md, 'there was some good news...you think', 46, 'type=endgame1logan&preg=1' + (stage == "random" ? "&stage=random" : "&stage=1"));
				else {
					// Things that failed 
					if (isDemonGone() || wherePerson("Kate") == 9999) addLinkToPlace(md, 'but not everything went well...', 46, 'type=' + (isDemonGone() ? 'endgame1demonloose' : 'endgame1kategone') + (stage == "random" ? "&stage=random" : "&stage=1"));
					else this.addEndGameOthers(md, stage);
				}
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1logan") {
			// End Game - Bred Miss Logan
			md = WritePlaceHeader();
			findPerson("Miss Logan").showPerson("pregnant.jpg");
			addPlaceTitle(md, "A Lesson in Reproduction");

			md.write(
				'<p>A few weeks later, after quite a few lessons in reproduction Miss Logan joyfully informed you that you had a top grade in reproduction, and that she is pregnant with your child!</p>' +
				'<p>You suppose this was inevitable with her obsession and that using birth control something that did not cross your mind, not with so many willing, if mind-controlled, women. Unless you plan to populate Glenvale with your children you must take care in future. There is also the possibility of less pleasant things like disease.</p>' +
				'<p>Despite this Miss Logan talks to you about earning bonus grades, and mentions her fellow teachers, friends at school, your mother and sister. She clearly wants you to impregnate every woman you possibly can'
			);
			if (isSpellKnown("Transform")) md.write(', and with the Transform spell, some of the men you know as well');
			md.write(
				'.</p><p>In the end you have to play along with her obsession, but of course there is little stopping you from actually doing as she wants. Such are the temptations and corruptions of these forbidden spells, after all at least two families here in Glenvale are descended from Kurndorf!</p>'
			);
			if (isCharmedBy("OfficerSmith")) md.write('<p>Coincidentally, some time later Becky Smith also became pregnant by you. An accident but Miss Logan was overjoyed by her plan coming together and you breeding others as well. Becky was less ecstatic but in the end quite happy, and changing her hair style and colour to reflect the change in her life.</p>');
			if (isDemonGone() || wherePerson("Kate") == 9999) md.write('<p>Unfortunately there were some less pleasant things...</p>');
			else md.write('<p>There are also more pleasant things to play with...or in Miss Logan\'s obsession, impregnate...</p>');
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);

			if (isCharmedBy("OfficerSmith")) {
				AddPeopleColumnLarge(md);
				findPerson("OfficerSmith").showPerson("pregnant.jpg");
			}					
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "endgame1dianegrangers") {
			// End Game - Bred Mrs Granger AND Kate and/or Diane
			md = WritePlaceHeader();
			if (isCharmed("MrsGranger") && isCharmed("Kate")) findPerson("MrsGranger").showPerson("!pregnantfamily.jpg");
			else if (isCharmed("MrsGranger")) findPerson("MrsGranger").showPerson("!pregnant.jpg");
			else findPerson("Diane").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Contagious Lesson?");

			if (isCharmed("MrsGranger") && isCharmed("Kate")) {
				md.write(
					'<p>One more mixed bit of news was when Kate told you she is pregnant, and with everything you went through for her you are actually happy for this bit of news. The fact she is charmed does temper this somewhat.</p>' +
					'<p>Things get way more complicated when her mother Marie tells you she is <i>also</i> pregnant. She clearly knows about Kate but as they are both charmed you can manage this situation but you dread to think what would of happened if one of both were not charmed!</p>'
				);				
			} else if (isCharmed("MrsGranger")) {
				md.write(
					'<p>One more mixed bit of news that promises to get very complicated when Mrs. Granger tells you she is pregnant. She clearly concerned about how Kate will react...and so are you!</p>'
				);				
			}
			if (isCharmedBy("Diane")) {
				if (!(isCharmed("MrsGranger") || isCharmed("Kate"))) md.write('<p>A less pleasant announcement ');
				else md.write('<p>Some time later and ');	
				md.write('when visiting the Police Station, Diane White takes you aside and tells you matter of factly that she is pregnant and that you are the father of the child. She talks about maternity leave and other things but lose focus, what is happening, you are not trying here to single handedly impregnate all of Glenvale!</p>');
			}
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);

			if (isCharmed("MrsGranger") && isCharmedBy("Diane")) {
				AddPeopleColumnLarge(md);
				findPerson("Diane").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1rosssisters") {
			// End Game - Bred Catherine and/or Adele
			var rtot = isCharmed("AmyRoss") || checkPersonFlag("AmyRoss", 9) ? 1 : 0;
			if (checkPersonFlag("Catherine", 5)) rtot++;
			if (isCharmedBy("AdeleRoss")) rtot++;
			
			md = WritePlaceHeader();
			if (isCharmed("AmyRoss") || checkPersonFlag("AmyRoss", 9)) findPerson("AmyRoss").showPerson(isCharmed("AmyRoss") ? "pregnantc.jpg" : "pregnantu.jpg");
			else if (checkPersonFlag("Catherine", 5)) findPerson("Catherine").showPerson(isCharmed("Catherine") ? "pregnant-charmed.jpg" : "pregnant-uncharmed.jpg");
			else findPerson("AdeleRoss").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Sisterly Contagious Lesson?");

			if (rtot == 3) findPerson("Catherine").showPerson(isCharmed("Catherine") ? "pregnant-charmed.jpg" : "pregnant-uncharmed.jpg", "35%", "right");
			if (checkPersonFlag("Catherine", 5)) {
				md.write(
					'<p>A few weeks later, Catherine tells you with some embarrassment that she is pregnant. While she is hardly a one-man woman she tells you it is likely you are the father, though suggests a test to confirm. This is quite confusing, given her promiscuous nature she is very careful with birth-control, and it is not clear how this has happened. She is still her good natured self but promises this will be the only child she has and it had better not ruin her figure!</p>'
				);				
			}
			if (isCharmedBy("AdeleRoss")) {
				if (checkPersonFlag("Catherine", 5)) md.write('<p>As she says this Adele also tells you');
				else md.write('<p>Some time later and Adele tells you');	
				md.write(' she is pregnant. Catherine is enormously amused ');
				if (checkPersonFlag("Catherine", 5))  md.write('welcoming her sister to motherhood');
				else md.write('at her sister\'s condition');
				md.write('.');
			}
			if (isCharmed("AmyRoss") || checkPersonFlag("AmyRoss", 9)) {
				md.write("<p>You notice Amy " + (rtot > 1 ? "watching from" : "at") + " the door to her bedroom quietly, and you go to speak to her. She closes the door and explains that she is " + (rtot > 1 ? "also" : "") + " pregnant!</p>");
				md.write("<p>You notice Amy " + (rtot > 1 ? "watching from" : "at") + " the door to her bedroom quietly, and you go to speak to her. She closes the door and explains that she is " + (rtot > 1 ? "also" : "") + " pregnant!</p>");
			}
			if (rtot == 3) md.write("<p>While it was not your intention it seems you have all the Ross sisters pregnant. Miss Logan would be proud...</p>");
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (rtot > 1) {
				AddPeopleColumnLarge(md);
				if (isCharmedBy("AdeleRoss")) findPerson("AdeleRoss").showPerson("pregnant.jpg");
				else findPerson("AmyRoss").showPerson(isCharmed("AmyRoss") ? "pregnantc.jpg" : "pregnantu.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1beasleydidi") {
			// End Game - Bred Beasley or Didi
			md = WritePlaceHeader();
			if (!isCharmedBy("Didi")) perBeasley.showPerson("pregnant.jpg");
			else findPerson("Didi").showPerson("!pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson?");

			if (perBeasley.getPersonGender() == "woman" && perBeasley.getCharmedLevel() == 2) {
				md.write(
					'<p>Some time later your now transformed teacher Miss Beasley told you she was pregnant, ' + (perBeasley.checkFlag(12) ? 'you had neglected to order her to use birth control' : 'she is too much of a ditz to remember to use birth control') + '.</p>' +
					'<p>You find this troubling for some reason, more so than Miss. Logan, is it because she was a he, or because <b>he</b> was so much of a lecherous slime. Or is it because Catherine was so overjoyed and gloated over the news, almost demanding you keep Miss. Beasley bare-foot and pregnant for the rest of her life! Catherine certainly wants her revenge but this seems too much, especially as <b>she</b> is also pregnant!</p>'
				);				
			}
			if (isCharmedBy("Didi")) {
				if (!isCharmedBy("Didi")) md.write('<p>A more pleasant announcement ');
				else md.write('<p><p>Some time later and ');
				md.write('Didi tells you she is pregnant. She says she was sure she was taking care of her birth-control and cannot quite account for it. She is certain the child is yours and decides for some reason it is the magic of her tattoo from the fae, or y Tylwyth Teg, as fertility magic is a big thing for them. She warns to take care of changelings but that is more in humour.</p>');
			}
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if ((perBeasley.getPersonGender() == "woman" && perBeasley.getCharmedLevel() == 2) && isCharmed("Didi")) {
				AddPeopleColumnLarge(md);
				perBeasley.showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1carolellie") {
			// End Game - Bred Carol or Ellie
			md = WritePlaceHeader();
			if (!isCharmedBy("Carol")) findPerson("Ellie").showPerson("pregnant.jpg");
			else findPerson("Carol").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson for a Family?");

			if (isCharmedBy("Carol")) {
				md.write(
					'<p>Some time later when visiting Carol and Ellie, Carol takes you out to the pool and show you her swelling stomach, explaining that she is pregnant, to you!</p>'
				);				
			}
			if (isCharmedBy("Ellie")) {
				if (isCharmedBy("Carol")) md.write('<p>Some time later her daughter Ellie also tells you she is pregnant. This is a complicated situation, mother and daughter both!</p>');
				else md.write('A more pleasant announcement Ellie also tells you she is pregnant, a delightful if slightly troubling announcement.</p>');
			}
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (isCharmed("Carol") && isCharmed("Ellie")) {
				AddPeopleColumnLarge(md);
				findPerson("Ellie").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1abbymiku") {
			// End Game - Bred Abby or Miku
			md = WritePlaceHeader();
			if (!isCharmedBy("Abby")) findPerson("Miku").showPerson("pregnant.jpg");
			else findPerson("Abby").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson of Asian Studies?");

			if (isCharmedBy("Abby")) {
				md.write(
					'<p>Some time later Abby asks to meet you in the Park and she shows you a growing bump, she is also pregnant, by you!</p>'
				);				
			}
			if (isCharmedBy("Miku")) {
				if (!isCharmedBy("Abby")) md.write('<p>A more pleasant announcement ');
				else md.write('<p><p>Some time later and ');
				md.write('Miku also tells you she is pregnant. This is somewhat complicated and thoughts of kittens not babies crosses your mind!</p>');
			}
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (isCharmed("Abby") && isCharmed("Miku")) {
				AddPeopleColumnLarge(md);
				findPerson("Miku").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}		
				
		if (sType == "endgame1alisonjenny") {
			// End Game - Bred Alison and Jenny
			md = WritePlaceHeader();
			if (isCharmedBy("Jenny")) findPerson("Jenny").showPerson("pregnant" + (per.checkFlag(4) ? "-futa" : "") + ".jpg");
			else findPerson("Alison").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "Ordering A Very Contagious Lesson?");

			if (isCharmedBy("Jenny")) {
				md.write(
					'<p>Some time later when visiting the restaurant Jenny talks to you in one of the back rooms and she shows you a large bump, she is also pregnant, by you!</p>'
				);				
			}
			if (isCharmedBy("Alison")) {
				if (!isCharmedBy("Jenny")) md.write('<p>A more pleasant announcement ');
				else md.write('<p><p>Some time later and ');
				md.write('Alison also tells you she is pregnant, well that is a \'waitress full house\'. </p>');
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (isCharmed("Jenny") && isCharmed("Alison")) {
				AddPeopleColumnLarge(md);
				findPerson("Alison").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "endgame1anitamelissa") {
			// End Game - Bred Anita and Melissa
			md = WritePlaceHeader();
			if (isCharmedBy("Anita")) findPerson("Anita").showPerson("pregnant.jpg");
			else findPerson("Melissa").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson?");

			if (isCharmedBy("Anita")) {
				md.write(
					'<p>Some time later your subordinate Anita reports to you that she will have to take some maternity leave soon, but she will be off-duty for as short a time as possible.</p>'
				);				
			}
			if (isCharmedBy("Melissa")) {
				if (!isCharmedBy("Anita")) md.write('<p>A more pleasant announcement ');
				else md.write('<p><p>Some time later and ');
				md.write('when you meet Melissa at the pool after a time neglecting her. You clearly see she is <i>very</i> pregnant, and you are reminded to keep a closer eye on your slaves.</p>');
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (isCharmed("Anita") && isCharmed("Melissa")) {
				AddPeopleColumnLarge(md);
				findPerson("Melissa").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "endgame1townhall1") {
			// End Game - Bred the people at Town Hall part 1
			var bMayor = isCharmed("Mayor") && !per.isMan();
			var ttot = bMayor ? 1 : 0;
			if (isCharmedBy("Angela")) ttot++;
			
			md = WritePlaceHeader();
			if (bMayor) findPerson("Mayor").showPerson("pregnant.jpg");
			else if (isCharmedBy("Angela")) findPerson("Angela").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Definitely Contagious Mayoral Lesson?");

			if (bMayor) {
				md.write(
					'<p>A few weeks later when you visit the Town Hall, the Mayor tells you confidently that she is pregnant.</p>'
				);				
			}
			if (isCharmedBy("Angela")) {
				if (bMayor) md.write('<p>As she says this Angela peeks her head in and also tells you');
				else md.write('<p>When you are visiting Town Hall Angela tells you');	
				md.write(' she is pregnant. The Mayor is dismissive telling her to not let it get in the way of her work.');
				md.write('.');
			}
			if (ttot == 2) md.write("<p>While it was not your intention it seems you have impregnated much of Town Hall! Miss Logan would be proud...</p>");
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (ttot > 1) {
				AddPeopleColumnLarge(md);
				if (isCharmedBy("Angela")) findPerson("Angela").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1townhall2") {
			// End Game - Bred the people at Town Hall part 2
			var ttot = isCharmed("Emily") ? 1 : 0;
			if (isCharmedBy("Tammy")) ttot++;
			
			md = WritePlaceHeader();
			if (isCharmedBy("Emily")) findPerson("Emily").showPerson("!pregnant.jpg");
			else if (isCharmedBy("Tammy")) findPerson("Tammy").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Definitely Contagious Civic Lesson?");

			if (isCharmedBy("Emily")) {
				md.write(
					"<p>You meet Emily in the break room, and she closes the door and explains that she is pregnant!</p>"
				);				
			}
			if (isCharmedBy("Tammy")) {
				if (isCharmedBy("Emily")) md.write('<p>As she says this Tammy peeks her head in and also tells you');
				else md.write('<p>When you are visiting Town Hall Tammy tells you');	
				md.write(' she is pregnant');
				md.write('.');
			}
			if (ttot == 2) md.write("<p>While it was not your intention it seems you have impregnated the rest of the Town Hall! Miss Logan would be proud...</p>");
			
			startQuestions();
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (ttot > 1) {
				AddPeopleColumnLarge(md);
				if (isCharmedBy("Tammy")) findPerson("Tammy").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "endgame1delivery") {
			// End Game - Bred Madison and Zoey
			var dtot = isCharmed("Madison") ? 1 : 0;
			if (isCharmedBy("Zoey")) dtot++;
			if (isCharmedBy("Nina")) dtot++;

			md = WritePlaceHeader();
			if (isCharmedBy("Madison")) findPerson("Madison").showPerson("pregnant.jpg");
			else if (isCharmedBy("Zoey")) findPerson("Zoey").showPerson("pregnant.jpg");
			else findPerson("Nina").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson Delivered?");
			if (dtot == 3) findPerson("Nina").showPerson("pregnant.jpg", "30%", "right");
			if (isCharmedBy("Madison")) {
				md.write(
					'<p>Some time later your delivery girl Madison asks to meet you and you join her in some stables outside of town. Madison it appears is a keen horse-rider, but that is not what she has called you about. You see she is clearly pregnant, and it looks like her next \'delivery\' will be rather differemt.</p>'
				);				
			}
			if (isCharmedBy("Zoey")) {
				if (isCharmedBy("Madison")) md.write('<p>Another announcement is ');
				else md.write('<p><p>Some time later and ');
				md.write('when you meet Zoey at her home and you see she is preparing to deliver a surprise for you in the near future.</p>');
			}
			if (isCharmed("Nina")) {
				md.write("<p>You later meet Nina at the TV Station, and she does an impromptu strip-tease showing she is " + (dtot > 1 ? "also" : "") + " pregnant!</p>");
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (dtot > 1) {
				AddPeopleColumnMed(md);
				if (dtot == 3) findPerson("Zoey").showPerson("pregnant.jpg");
				else if (isCharmedBy("Zoey")) findPerson("Zoey").showPerson("pregnant.jpg");
				else findPerson("Nina").showPerson("pregnant.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "endgame1hannahcamryn") {
			// End Game - Bred Hannah and Camryn
			md = WritePlaceHeader();
			if (isCharmedBy("Hannah") && isCharmed("Camryn")) findPerson("Hannah").showPerson("pregnantsisters.jpg");
			else findPerson("Hannah").showPerson("pregnant.jpg");
			
			addPlaceTitle(md, "A Very Contagious Lesson?");

			md.write(
				'<p>When you visit Hannah at her apartment, you see clearly from catching a ride on her a while ago she has picked up a passenger.'
			);				
			if (isCharmedBy("Camryn")) {
				md.write(' As you think about what to say Camryn joins her and you see she has been a \'bad girl\' or is it \'good\'?</p>');
			} else md.write('</p>');
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "endgame1donnapamela") {
			// End Game - Bred Donna and Pamela
			md = WritePlaceHeader();
			if (isCharmedBy("Donna")) findPerson("Donna").showPerson("pregnant.jpg");
			else findPerson("Pamela").showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Red-Heads?");

			if (isCharmedBy("Donna")) {
				md.write(
					'<p>One evening you visit Donna in her hotel room and she poses in the setting sunlight, clearly showing the growing bump, showing Miss. Logan\'s teachings have spread to her as well!</p>'
				);
			}
			if (isCharmedBy("Pamela")) {
				if (isCharmedBy("Donna")) md.write('<p>Another time you visit your other red-headed slave Pamela');
				else md.write('<p>You stop by Pamela in her small home');
				md.write(' and you see her cradling her swollen belly, it seems your \'treatments\' for her condition have been quite effective just not in the way intended, unless you are Miss Logan that is.</p>');
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			
			if (isCharmed("Pamela") && isCharmed("Donna")) {
				AddPeopleColumnLarge(md);
				findPerson("Pamela").showPerson("pregnant.jpg");
			}			
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "endgame1enough") {
			// End Game - No more pregnancies
			this.charmedTime = 999;
			md = WritePlaceHeader();
			AddImage("Endings/endgame1enough.jpg");
			addPlaceTitle(md, "Enough, enough!");

			md.write('<p>Enough good news! For a while you will avoid any more news from Miss Logan!</p>');
			
			startQuestions();	
			// Add pregnancies/other
			var stage = getQueryParam("stage");
			this.addEndGameOthers(md, stage);		
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "endgame1demonloose") {
			// End Game - Demon Fled
			stage = getQueryParam("stage");
			hideSidebars();
			md = WritePlaceHeader();
			findPerson("Jesse").showPerson("endgame1-legion.jpg");
			addPlaceTitle(md, "A Demon Loose on the World");

			md.write(
				'<p>The demon Legion escaped from Glenvale, taking with it your friend Leanne\'s soul...</p>' +
				'<p>For a while you hear little, some odd rumours of weird events but these <i>could</i> be just the normal tall tales and internet rubbish. Then you received a message on your phone. Jesse...no Legion standing naked with an ominous figure behind her. The message read,</p>' +
				'<p><i><b>We are Legion, each of us shall take a body, a corpse, a beast, forms fair and foul. Death and corruption shall be in our wake, thanks to you</b></i></p>' +
				'<p>She is right, but what can you do now, it is far, far too late...</p>'
			);
			if (wherePerson("Kate") == 9999) md.write('<p>That was not all, and for you not the worst...</p>');
			else md.write('<p>You have to put this out of your mind, and turn it to more pleasant things.</p>');
			startQuestions();
			if (wherePerson("Kate") == 9999) addLinkToPlace(md, 'then there was Kate...', 46, 'type=endgame1kategone&stage=' + stage);
			else this.addEndGameOthers(md, stage);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1kategone") {
			// End Game - Kate Gone
			stage = getQueryParam("stage");
			hideSidebars();
			md = WritePlaceHeader();
			findPerson("Kate").showPerson("endgame1-kate.jpg");
			addPlaceTitle(md, "Kate Left You");

			md.write(
				'<p>Kate fled from Glenvale, you could not convince or force her to stay. This is your greatest regret, while you have all the others Kate was your first infatuation or even love but you have lost her.</p>' +
				'<p>At times you wonder where she is, how she is living now and earning a living. She is in hiding, you have failed to locate her, so she has probably changed her name and maybe her appearance, but most likely she is just far away in a large city.</p>' +
				'<p>You have tried your magic and once got a vision of her, dressed as an exotic dancer, it is her new job, or just some sort of party? The vision was brief and all too little, nothing telling you where she might be now!</p>' +
				'<p>You have to put her out of your mind, and turn it to more pleasant things.</p>'
			);
			startQuestions();
			this.addEndGameOthers(md, stage);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1family1") {
			// Mom and Tracy
			stage = getQueryParam("stage");
			hideSidebars();
			var perMom = findPerson("Mom");
			var perTracy = findPerson("Tracy");
			bPreg = (getCharmedLevel("MissLogan") == 2 && checkPersonFlag("MissLogan", 1));
			md = WritePlaceHeader();
			if (perMom.getCharmedLevel() == 4 && perTracy.getCharmedLevel() == 2) perMom.showPeople(perTracy, bPreg ? "pregnant-momdaughter.jpg" : "endgame1-family.jpg");
			else if (perMom.getCharmedLevel() == 4 && bPreg) perMom.showPersonRandom("pregnant", 2);
			else perMom.showPerson("mom-breakfast-fun1.jpg");
			addPlaceTitle(md, "Your Family");			
			md.write('<p>Things have changed a lot at home');
			if (getCharmedLevel("Gabby") == 1 && perMom.getCharmedLevel() != 1) findPerson("Gabby").showPerson("pregnant.jpg", "15%");
			if (perMom.place < 998) md.write(', Mom and Tracy are now much closer ');
			if (perMom.getCharmedLevel() == 4 && perTracy.getCharmedLevel() == 2) {
				md.write(
					'since you charmed them. While they have not changed, mostly, except they are now your lovers. To your surprise and delight they have embraced being your lovers without reservation or jealousy of each other. While you have at times fantasised about a mother-daughter threesome, the idea of one with your own mother and sister had not previously crossed your mind!'
				);
				if (bPreg) md.write('</p><p>You were very conflicted when they <b>both</b> announced their pregnancies. Miss Logan was delighted but this going to be so very, very complicated!');
			} else if (perTracy.getCharmedLevel() == 2) {
				md.write('since you charmed Tracy as your lover.');
				if (perMom.place < 998) md.write('You have had some awkward talks with Mom but ');
				md.write('Tracy is yours now and nothing is going to change that.');
				if (bPreg) md.write('</p><p>You were very conflicted when Tracy announced her pregnancy, Miss Logan was delighted. You have yet to discuss his with Mom, this is going to be so very,very complicated! A strange thought came to mind the other night, about how Mom will feel left out, but you put that aside...');
				
			} else if (perMom.getCharmedLevel() == 4) {
				md.write('that you have charmed Mom to be your lover. Tracy is certainly aware, but she is discrete and avoid you when you are having your alone time with Mom.');
				if (bPreg) md.write('</p><p>When you hear Mom is now pregnant you felt very, very conflicted, though a strange thought came to mind, about how Tracy must feel left out. You put that aside and just feel worried...');
			} else {
				md.write(
					' as their experiences with Davy and Legion have made them much more relaxed and open to increased intimacy. Nothing sexually, not quite, but almost...'
				);
			}
			md.write('</p>');
			if (perMom.place >= 998) md.write('<p>Unfortunately you seldom hear from Mom, she has run away with her lover, her old assistant Gabby. From what you have heard she is uncharacteristically submissive in the relationship...</p>');
			else if (getCharmedLevel("Gabby") == 1 && perMom.getCharmedLevel() != 1) md.write("<p>Gabby is still with Mom and also appears to have been listening to Miss Logan</p>");
			
			startQuestions();
			this.addEndGameOthers(md, stage);
			
			if (perMom.getCharmedLevel() != 4 || perTracy.getCharmedLevel() != 2) {
				AddPeopleColumnLarge(md);
				if (perTracy.getCharmedLevel() == 2 && bPreg && perMom.getCharmedLevel() != 4) perTracy.showPersonRandom("pregnant", 2);
				else perTracy.showPerson("tracylunch3.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1family2") {
			// Kylie and Aunt Brandi
			stage = getQueryParam("stage");
			hideSidebars();
			var perKylie = findPerson("Kylie");
			var perAunt = findPerson("Brandi");
			bPreg = (getCharmedLevel("MissLogan") == 2 && checkPersonFlag("MissLogan", 1));
			md = WritePlaceHeader();
			if (perAunt.isCharmedBy() && perKylie.isCharmedBy()) perAunt.showPerson(bPreg ? "pregnant-auntcousin.jpg" : "endgame1-familyextended.jpg");
			else if (perKylie.isCharmedBy() && bPreg) perKylie.showPerson("pregnant.jpg");
			else perKylie.showPerson("kyliesms3b.jpg");
			addPlaceTitle(md, "Your Extended Family");			
			md.write('<p>Things have changed also for the other members of your family, your cousin Kylie and Aunt Brandi. ');
			if (perKylie.isCharmedBy() && perAunt.isCharmedBy()) {
				md.write(
					'Since you charmed them their dynamic is a bit different. Kylie is still energetic and cute, but Aunt Brandi is less controlling and more sharing.'
				);
				if (bPreg) md.write('</p><p>You were very conflicted when they <b>both</b> announced their pregnancies. Miss Logan was delighted but this going to be so very, very complicated!');
			} else if (perKylie.isCharmedBy()) {
				md.write(
					'Since you charmed Kylie as your lover you have so far had to keep it secret from her mother and anyone else in the family. You will have to arrange something with Aunt Brandi, something magical....'
				);
				if (bPreg) md.write('</p><p>You were very conflicted when Kylie announced her pregnancy, Miss Logan was delighted. You are troubled, Aunt Brandi is very controlling...');
			}
			md.write('</p>');
			
			startQuestions();
			this.addEndGameOthers(md, stage);
			
			if (!perAunt.isCharmedBy() || !perKylie.isCharmedBy()) {
				AddPeopleColumnLarge(md);
				if (perAunt.isCharmedBy()) perAunt.showPerson("pregnant.jpg");
				else perAunt.showPerson("endgame1.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}
	
		
		if (sType == "endgame1cult") {
			// End Game - Cult
			stage = getQueryParam("stage");
			hideSidebars();
			md = WritePlaceHeader();
			bPreg = (getCharmedLevel("MissLogan") == 2 && checkPersonFlag("MissLogan", 1));
			if (isExplicit()) AddImageRandom("Church/Explicit/endgame1-cult", 4);
			else AddImageRandom("Church/endgame1-cult", 6);
			addPlaceTitle(md, "Mother Superior's Cult");

			md.write(
				'<p>Mother Superior, or Daria as she prefers when being intimate, has pushed ahead with her plan to form a cult of <b>you</b> treating you as some sort of holy being. It feels at times a little too messiahanical and this seems the route to attracting too much attention and following Kurndorf into madness and lust for power.</p>' +
				'<p>Still regularly Mother Superior calls for you to induct another of her nuns into the cult, and for you to show your power, and charm them. You have to admit having a group of nuns dedicated to your ' + (this.isMaleSex() ? 'cock' : 'pussy') + ' is enormously appealing.</p>' +
				'<p>This is still a path you have to take care with, to avoid Kurndorf\'s fate and temptations.</p>'
			);
			startQuestions();
			if (bPreg)  addLinkToPlace(md, "there was also some other 'good news' from them", 46, 'type=endgame1cultpreg&stage=' + stage);
			else this.addEndGameOthers(md, stage);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "endgame1cultpreg") {
			// End Game - Cult
			stage = getQueryParam("stage");
			hideSidebars();
			md = WritePlaceHeader();
			findPerson("Desiree").showPerson("pregnant.jpg");
			addPlaceTitle(md, "Mother Superior's Cult");
			AddImage("Church/pregnant1.jpg", "30%", "right");
			md.write(
				'<p>Miss Logan\'s influence spreads to Mother Superior\'s cult, notably to your devoted acolyte Sister Desiree. She proudly shows you the sign of her devotion and explains that some of the initiates are also following in her footsteps.</p>' +
				'<p>Mother Superior proudly announced her pregnancy to you and her cult, and at times she acts almost like the child will be special. She likes to be "tied to the cross" though really it is bondage based sex-play, she really has a fetish for that sort of thing considering her disciplining of Desiree!</p>'
			);

			startQuestions();
			this.addEndGameOthers(md, stage);
			AddPeopleColumnMed(md);
			findPerson("Daria").showPerson("pregnant.jpg");
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "endgame1other") {
			// End Game 1 - Others
			stage = getQueryParam("stage");
			// Random image
			hideSidebars();
			ar = [];
			ar.push("endgame1-other1.jpg");
			ar.push("endgame1-other2.jpg");
			ar.push("endgame1-other3.jpg");
			ar.push("endgame1-other4.jpg");
			if (this.isMaleSex() && isExplicit(true)) ar.push("Explicit/endgame1-other5.gif");
			ar.push("endgame1-other6.jpg");
			ar.push("endgame1-other7.jpg");
			ar.push("endgame1-other8.jpg");
			if (isExplicit() && perYou.isMaleSex()) ar.push(Math.random() < 0.5 ? "Explicit/endgame1-other9a.jpg" : "Explicit/endgame1-other9b.jpg");
			else ar.push("endgame1-other9.jpg");
			ar.push("endgame1-other10.jpg");
			// Stage
			stg = stage == "random" ? Math.floor(Math.random() * ar.length) + 1 : parseInt(stage, 10);
			img = ar[stg - 1];
			bExp = img.indexOf("Explicit/") != -1;
			if (bExp) img = img.split("Explicit/").join("");
			no = parseInt(img.split("endgame1-other").join("").split(".jpg").join("").split(".gif").join(""), 10);
			md = WritePlaceHeader();
			if (bExp) AddImage('Endings/Explicit/' + img);
			else AddImage("Endings/" + img);
			addPlaceTitle(md, "Enjoying Life More");

			md.write(
				'<p>While the idea of enslaving <b>everyone</b> has an appeal there also seems to be a danger there. The history of Kurndorf and others show that sort of excess will lead to your downfall.</p>' +
				'<p>So you take care with your indulgences, acquiring new \'girlfriends\' rarely, but that does not stop you from the occasional charm spell and then freeing them afterwards. They will usually assume a one-off night of passion or bad judgment as the case maybe.</p>'
			);
			if (stage == "random") md.write('<p><i>In particular...</i></p>');
			else md.write('<p><i>In particular this time...</i></p>');

			switch(no) {
			case 1:
				// Old Vampire model
				md.write(
					'<p>These three you met at fancy dress party one Halloween night. '
				);
				if (isCharmed("Vampyre")) {
					md.write(
						' You were initially careful but you are quite sure the raven haired woman is <b>not</b> a vampire! She does though remind you of Lilith in some way, maybe they have met in the past?</p>'
					)
				} else md.write(' The raven haired woman was rather familiar but you cannot quite place where you mau of met her before.</p>');
				md.write(
					'<p>They were quite familiar with each other and you were happy to involve yourself in their games!</p>'
				);
				break;
			case 2:
				// 3 outside
				md.write(
					'<p>The Park is a good place for a brief encounter, you have to regularly visit to replenish your mana and you can often find groups of friends or family picnicking. These three were a fond member, you think two of them were sisters but you did not really question them much, this was just an encounter with three beautiful women in a lovely natural setting.</p>'
				);
				break;
			case 3:
				// mixed race 5
				md.write(
					'<p>Diversity is a wonderful thing, and while you did not seek out such a mixed group, when the opportunity presented itself you had to take it, and them!</p>'
				);
				break;
			case 4:
				// Campers
				md.write(
					'<p>The campers you have met in the Wild Ranges were some of the first you recruited once you had decided to relax. A lovely group of ladies, though somehow the phrase \'Jack\'s House\' comes to mind when you think of them...</p>'
				);
				break;
			case 5:
				// double blowjob (male/futa player)
				md.write(
					'<p>These two lovelies you played with a number of times, you have kept it somewhat anonymous, you are uncertain of their relationship with each other. You think they may be related, possibly even mother and daughter and it is that thought that keeps you coming back to them.</p>'
				);
				break;
			case 6:
				// Church lit by stained glass
				md.write(
					'<p>The church is an interesting place to visit but given encounters with demons and other spirits you feel uncomfortable there. Still occasionally you can visit and give a parishioner a revelation about their new ' + (perYou.isBornMale() ? 'Lord' : 'Lady') + ' and ' + perYou.getMaster() + '</p>'
				);
				break;
			case 7:
				// blonde triplets
				md.write(
					'<p>These three you met at the pool, a set of sisters and triplets. There was no way you were going to pass them by, expensive in mana, but three beautiful sister-slaves was irresistible!</p>'
				);
				break;
			case 8:
				// exhibitionist from the shop
				md.write(
					'<p>The woman you have seen flashing herself in the general store is one you have played with reguarly. She delights in public nudity and you have had her indulge in a little more than that at times.</p>' +
					'<p>One strange thing though, for no reason you can quite pin down, she reminds you a lot of Leanne, a slightly older version, not her mother, but like another version...</p>'
				);
				break;
			case 9:
				// Interracial BJ
				if (bExp) {
					// Male/explicit
					md.write(
						'<p>These two friends you met in the park for a pleasurable encounter.</p>'
					);					
				} else {
					// Any gender/non-explicit
					md.write(
						'<p>These two friends you met in the park for a pleasurable encounter.</p>'
					);
				}
				break;
			case 10:
				// Mother/Daughter
				md.write(
					'<p>From your experiences with the families you have encountered so far you have found you have a taste for mother/daughter pairings and seldom pass the opportunity to experience that delight.</p>'
				);
				break;				
			}
			md.write(
				'<p>...</p>' +
				'<p>These pleasures are a diversion, you always have your core group...well you might as well call it what it is...your harem of beautiful slaves.</p>'
			);
			startQuestions();
			if (stage != "random" && (stg <= (ar.length - 1))) {
				// Move to next editing
				addLinkToPlace(md, "It is time to enjoy more", 46, "type=endgame1other&stage=" + (stg + 1));
			} else addLinkToPlace(md, 'and finally', 46, 'type=endgame1final');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1final") {
			// End Game Final
			hideSidebars();
			md = WritePlaceHeader();
			img = perYou.isBornMale() ? 'endgame1-final-male' : perYou.getPersonGender() == "woman" ? 'endgame1-final-female' : isExplicit(true) ? Math.random() < 0.5 ? 'Explicit/endgame1-final-futa1' : 'Explicit/endgame1-final-futa2': 'endgame1-final-futa1';
			AddImage("Endings/" + img + ".jpg");
			addPlaceTitle(md, "The End of This Road!");

			md.write(
				'<p>You have control of the Sacred Book of Control, you now have a harem of beautiful women'
			);
			if (isCharmedBy("Tracy") || isCharmedBy("Mom")) md.write(', including your own family,');
			md.write(
				' and life is good. You have as much power as you desire, and your harem to satisfy your carnal desires.</p>' +
				'<p>As long as you can avoid the temptation for more and more power you are assured your place of dominance and control. You know the path Kurndorf took and you just have to avoid those excesses and straying into the areas of magic that corrupted him. Demons are much too powerful as are most supernatural beings, it would be best to keep yourself to mortals only'
			);
			if (isCharmedBy("Vampyre") || (isCharmedBy("Tina") && per.isVampyre()) || isCharmedBy("Ghost")) {
				var s = isCharmedBy("Vampyre") ? "the vampyre" : (isCharmedBy("Tina") && per.isVampyre()) ? "Tina" : "Keana";
				md.write('...then again there is ' + s + ' so you have already crossed that line..');
			}
			md.write(
				'.</p>' +
				'<p>Well, that is it, your adventure is essentially complete, while there might of been more you could do, you have done all that is needed for your protection and power!</p>'
			);

			startQuestions();
			addOptionLink(md, 'Thank you for playing', 'DoNewGame()');
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	// Dancing in the club
	perYou.showDancing = function()
	{
		var md = WritePlaceHeader();
		perYourBody.showPersonRandom("poledance", 1);
		addPlaceTitle(md, "Your Dance");
		md.write(
			'<p>You take the stage dressed in the most appropriate exotic wear you have, not much really, Tracy has always been more of a dancer than you are.</p>' +
			'<p>You are not an experienced dancer and try to entertains the audience and you think you do well. THen you see Jade watching, smiling broadly...</p>' +
			'<p>After you collect some tips and see Jade walking almost dismissively into her office.</p>'
		);
		AddCash(10);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after your dance', Place);
		WritePlaceFooter(md);
	};

	// Event when swimming in a pool
	perYou.showSwimming = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		perYourBody.showPerson("pool.jpg");
		addPlaceTitle(md, "Swimming in the Pool");
		if (Place == 269) {
			// Hotel Pool
			md.write(
				'<p>You go for a swim in the hotel pool, it is an excellent heated pool, comfortable all times of the day and year-round.</p>'
			);
		} else {
			// Carol's Pool			
			md.write(
				'<p>Carol\'s pool is a nice backyard pool. heated and immaculately clean. You have a pleasant swim and notice Carol watching as you do.</p>'
			);
		}
		startQuestions();
		addLinkToPlace(md, 'dry off and get dressed', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType === "" && this.checkFlag(50) && this.checkFlag(54)) {
			var p;
			for (var i = 0, ie = arPeople.length - 5; i < ie; i++) {
				p = arPeople[i];
				if (!p.isHere()) continue;
				if (p.isCharmedBy()) {
					md.write('<p>' + p.getPersonName() + ' only recognizes you due to the connection the spell provides. They are confused by your appearance and behavior, and it doesn\'t look like they have a way of helping you aside from elevating some of your sexual urges.</p>');
					break;
				}
			}			
		}
	};
	
	// Questions/options in places
	perYou.showPersonChat = function(md)
	{			
		// Invisible options (with improved invisibility) for general cases
		if (Place == 70 && isShopOpen(2) && this.checkFlag(28)) {
			// At school and it is open
			addPopupLinkI(this.isBornMale() ? 'check the womens locker rooms' : 'check the mens locker rooms', 'Invisible in he Lockerrooms', 
				(this.isBornMale() ? gameState.perTown.addPersonRandomString("school-lockerroom-female", 3, "height:max%", "right") : gameState.perTown.addPersonRandomString("school-lockerroom-male", 3, "height:max%", "right")) +
				'You walk into the \'forbidden\' lockerroom, well not allowed as you are the wrong gender. Now that you are invisible there is nothing preventing you seeing if it lives up to your fantasies.</p>' +
				'<p>There is no ' + (this.isBornMale() ? 'lesbian' : 'homosexual') + ' orgy going on, so your fantasies were wrong there, not really surprising. Still there are some appealing sights!',
				false
			);
		}
		
		if (sType !== "") return;
		
		if (isPossess() && perYourBody.getPersonAddress(true) == Place) {
			// At the person's home you are possessing
			if (perYourBody.uid == "gina" && perYourBody.extra[0] < 3) return;
			addLinkToPlace(md, "have a shower", Place, 'type=possessshower');
		}
		
		if (Place == 269 || (Place == 423 && isCharmed("Carol"))) {
			// Swimming
			addLinkToPlace(md, "go for a swim in the pool", Place, 'type=poolswim&who=you');
		}
		if (this.checkFlag(38) && !isDay() && getDay() == "Sunday") {
			if (wherePerson("Tess") == 46 && isPersonHere("Tess")) addLinkToPlaceC(md, "talk about relaxing from your exploration", 46, 'type=endgame1start');
			else if (isPersonHere("Tracy")) addLinkToPlaceC(md, "talk about relaxing from your exploration", 46, 'type=endgame1start');
		} 
	};

	// Cast a spell on yourself
	perYou.handleItem = function(no, cmd)
	{
		var lst, idx;
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (this.checkFlag(29)) {
				if (sType == "contemplate") {
					// Special case - hydromancy
					if (CastClairvoyanceSpell(undefined, 2)) {
						dispPlace(Place, 'type=hydromancy');
						return "nofooter";
					}
				}
			}
		}

		// Casting the transform spell in the Hidden Room, only valid place to cast it on yourself
		else if (no == 18 && cmd == 2 && Place == 53) {
			if (!CastTransform(1)) return "handled";
			// It can be cast
			setCommentsNoClick(
				'<div class="' + getConverseBubbleClass() + '" style="cursor:default">' +
				'<table><tr><td width="80%"><p>You decide to try the transformation spell on yourself. As you start to recite the spell your attention is drawn to...</p>'
			);
			addOptionLink("comments", 'your ' + (perYou.isMan() ? 'masculine' : 'feminine') + ' face', "ClearComments();dispPlace(" + Place + ",'type=transformgenderyou')");
			if (this.checkFlag(30)) {
				addOptionLink("comments", 'your general appearance', "ClearComments();dispPlace(" + Place + ",'type=transformavataryou')");
				if (!perYou.isMan()) addOptionLink("comments", this.checkFlag(13) ? 'your too large breasts' : 'your breasts', "ClearComments();dispPlace(" + Place + ",'type=transformbreastsyou')");
				addOptionLink("comments", (perYou.isMaleSex() ? 'your ' + (this.checkFlag(57) ? 'large' : '') + ' cock' : 'your groin'), "ClearComments();dispPlace(" + Place + ",'type=transformcockyou')");
			}
			addComments('</td><td width="20%">' + this.addPersonString("charmedbydavy-resisting.jpg") + '</td></tr></table>');
			return "handled";
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() { return false; };
	
	perYourBody = perYou;
	perYou.startQuest(4);
	nMana = 0; 									// Starting Mana, really should stay as 0
	nMoney = 20;								// Starting Money, $20
}