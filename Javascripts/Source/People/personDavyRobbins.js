/****************************************************************
			Davy Robbins
****************************************************************/
var perDavy;	// Davy Robbins

// Default actions when Davy is defeated
function DefeatDavy()
{
	var perKate = findPerson("Kate");
	perDavy.place = 184;		// Default to Davy in the room 101 (unconscious)
	perKate.place = 9999;		// Kate leaves town
	perKate.unCharmThem();		// Kate not charmed by Davy
	perKate.other = 100;
	setPlaceFlag("Hotel", 8);		// Fallback in case the seance path has not started
	if (isMurderPath()) {
		// Fallbacks for Khan/Sarah/Anita
		var perKhan = findPerson("OfficerKhan");
		if (perKhan.getPath() == 2) {
			var perS = findPerson("Sarah");
			if (perS.place === 0) {
				perS.moveThem(1); // Sets Sarah Gates (Sir Ronald's Niece in town)
				movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
				setPersonFlag("AdeleRoss", 1);
			}
		}
		var perAnita = findPerson("Anita");
		if (perAnita.other != 101 && perAnita.other < 900) {
			perAnita.other = 100;
			perAnita.place = 252;
			movePerson("MsJones", 145);
			setPlaceKnown("FrenchClassroom");  // Set Ms Jones, French Classroom as known
		}
	}
}

// Has Davy been defeated?
function isDavyDefeated() { return perDavy.isDead() || perDavy.getQuestBlueBottle() == 20 || perDavy.getQuestBlueBottle() == 21 || perDavy.other == 8 || perDavy.checkFlag(8); }
function isDavyCaptive() { return !perDavy.isDead() && perDavy.place != 9999 && !perDavy.checkFlag(6) && !perDavy.checkFlag(7) && (perDavy.getQuestBlueBottle() == 20 || perDavy.getQuestBlueBottle() == 21 || perDavy.other == 8 || perDavy.checkFlag(8)); }

function DavyEscapes()
{
	if (!perDavy.checkFlag(8)) perDavy.setFlag(6);
}

// Move Davy to the hotel to open the Hotel Cellar and the Seance
function moveDavyToHotel1()
{
	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	// Add access to the hotel
	if (!checkPersonFlag("Bambi", 10)) setPersonFlagAfterTime("Bambi", 3, undefined, Math.ceil(Math.random() * 6));	// Trigger a message from the hotel

	if (isDavyDefeated() || isDavyCaptive()) return;
	if (perDavy.other < 5) perDavy.other = 5;	// Advance Davy's Path
	perDavy.place = 124;  // Place Davy @ the hotel.
}

// Move to the hotel with Kate
function canMoveDavyToHotel2()
{
	if (isDavyDefeated() || isDavyCaptive() || perDavy.other !== 6) return false;
	var perKate = findPersonNC("Kate");
	if (perKate.place == 999) return true;
	return perKate.checkFlag(40) && perKate.checkFlag(41);
}

function moveDavyToHotel2()
{
	if (isDavyDefeated() || isDavyCaptive() || perDavy.checkFlag(6)) return;

	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	// Add access to the hotel
	setPlaceFlag("Hotel", 8);		// Fallback just in case you missed him at the Hotel so you can persue the seance
	if (perDavy.other != 8) perDavy.other = 10; // Advance Davy's Path
	perDavy.place = 184; // Place Davy in the room
	movePerson("Kate", 184); // Place Kate @ the Hotel
	setPersonOther("Kate", 99);  // Move her past trying to kill you at home
}



// Initialise
function initialiseDavyRobbins()
{
	// Davy
	perDavy = addPerson("Davy", 9, "Davy", "Male/Uncharmed", false);
	per.extra = [0, 0, 0];		// 1 = Blue Bottle. 2 = Hellgate

	per.getPersonName = function(full) { return "Davy Robbins"; };
	per.getPersonAddress = function(n) { return isPlaceKnown("RobbinsHouse") ? n === true ? 176 : '36 Yoolaroo Dr, Glenvale' : n === true ? 0 : ''; };
	
	per.getPossessionFace = function() { return this.isMaleSex() ? (this.isCharmedBy() ? "Male/Charmed!endgame1-davy" : "Male/Uncharmed!davy1") : (!this.isCharmedBy() ? "Female/Uncharmed!endgame1-davy" : "Female/Charmed!charm1"); };

	// Gender
	per.getPersonGender = function() { return this.checkFlag(11) ? "woman" : "man"; };
	per.isBornMale = function() { return true; };

	per.getQuestBlueBottle = function() { return this.extra[1]; };
	per.setQuestBlueBottle = function(no) { this.extra[1] = no; };

	per.getPathHellgate = function() { return this.extra[2]; };
	per.setPathHellgate = function(no) { this.extra[2] = no; };
	
	per.passTimeDay = function() {
		this.setFlag(13);
		return '';
	};
	
	per.showEventPopup = function()
	{
		// Arriving home
		if (Place == 176 && sType == "davyhome") {
			setPlaceKnown("DavysRoom");
			this.place = 81;
			showPopupWindow("The Robbins Home",
				this.addPersonString(this.checkFlag(18) ? "home1-bound.jpg" : "home1-free.jpg", "height:max%", "right") +
				"You arrive at the Robbins home with Davy " + (this.checkFlag(18) ? "lightly bound" : "free of " + this.getHisHer() + " bonds") +
				" and you are met by Geraldine who looks very pleased to see Davy and rushes around making " + this.getHimHer() + " comfortable, but making no comment otherwise of how, why, wearing what and so on. You had thought Davy was probably her favourite and this confirms it.</p>" + 
				(!findPerson("Tina").isVampyre() || !isDay() ? "<p>You see Tina watching, but somewhat pointedly looks away and focuses her attention completely on you.<p>" : "") +
				"<p>You allow them to sort things out for a while" + (!this.isMan() ? ", including some clothes for Davy now <b>she</b> is here" : "") + " and say you will return later",
				"dispPlace(43)"
			);
			return true;
		}
		return false;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 81 && this.isHere() && sType === "") {
			return this.showPerson("home2-" + (perDavy.checkFlag(18) ? "bound" : "free") + ".jpg", '', '', '', '', false, "string");
		}		
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 81 && this.isHere()) {
			if (this.checkFlag(18)) {
				md.write(
					'<p>Geraldine brings Davy though and arranges ' + this.getHimHer() + ' on the bed ready for you.</p>'
				);				
			} else {
				md.write(
					'<p>Davy sits on ' + this.getHisHer() + ' bed waiting for you.</p>'
				);
			}
		}
	};
	
	
	per.showEventHotelRoom = function()
	{
		var md, perB;
		
		// -----------------
		// Davy restrained in the room
		// AFTER the confrontation
		// -----------------
		if (sType === "checkphone") {
			// Checking Davy's phone
			md = WritePlaceHeader();
			for (var i = 241; i < 250; i++) addSMSToPhotos(i);
			AddImage(perYou.isBornMale() ? "phoneb.jpg" : "phoneg.jpg");
			addPlaceTitle(md, "Checking Davy's Phone");
			md.write(
				'<p>You pickup Davy\'s phone, he seems to have been taking photos and it is still active. You quickly check and see he has a few of his mother and sister, and a lot of photos and short videos of Kate, though he does seems to have been fascinated with photographing her submissive to him'
			);
			if (isExplicit()) md.write(' and showing it...orally');
			md.write(
				'</p><p>You quickly send copies of the more interesting images to your phone. You then try checking other things, like his SMS\'s or other data but as you do his phone locks up asking for a code. You doubt you will get it from him, so give up for now. You leave the phone here with the rest of his items.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (this.checkFlag(6) || sType == "escaped") {
			// Davy was unconscious but has escaped!
			md = WritePlaceHeader();
			setQueryParams("type=escaped");		// For saving or checking some other pages
			AddImage("bedroom4.jpg");
			addPlaceTitle(md, "Davy has Escaped!");
			this.place = 9999;
			this.setFlag(7);
			md.write('<p>You see the room is empty, is seems Davy has escaped, who knows where.</p>');

			startQuestions();
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return;

		} 
		
		perB = findPerson("Bambi");
		var myLord = perB.getYourNameFor();	// Bambi's way of addressing you
		
		if (perB.place == 184 || sType == "looking") {
			// Bambi dominates Davy, one off event
			md = WritePlaceHeader();
			setQueryParams("type=looking");		// For saving or checking some other pages
			this.setFlag(3, false);
			perB.place = 124;
			if (isExplicit()) this.showPersonRandomX("davy4", 2);
			else this.showPerson("davy4.jpg");

			addPlaceTitle(md, "Bambi Looking After Davy");
			md.write(
				'<p>You go to check on Davy, wondering why Bambi is not at the hotel bar, maybe she is doing something to look after him. As you enter the room you hear,</p>' +
				'<p>"..lick it faster scum! You are nothing, a pale shadow of ' + myLord + ', but you have one use. Ahh..that is better...Ahhhh!"</p>' +
				'<p>You see Bambi is sitting on Davy\'s face, forcing him to lick her, and she just came hard on his face. She looks at you, a guilty expression forms on her face and she says.</p>'
			);
			if (checkPlaceFlag("Hotel", 8)) md.write('<p>"' + myLord + ' he asked for something to drink..."</p>');
			else {
				md.write(
					'<p>"' + myLord + ' he asked for something from the cellar, but that place has been closed for years, I am not even sure where the door to it is. I doubt there is any decent wine there, so I decided he deserved something nicer..."</p>' +
					'<p>You doubt he was asking for wine, so what was he after in the cellar? You need to see if you can locate more recent sets of plans for the Broken Inn Hotel.</p>'
				);
				setPlaceFlag("Hotel", 8);
			}
			md.write('<p>You can see from her talk previously about customers odd tastes, she must share them as well. She climbs off Davy and re-gags him.</p>');

			if (!perYou.isMaleSex()) md.write('<p>She asks you, "He has some skill but he needs more training. Would you like to train him?"');

			startQuestions();
			if (!perYou.isMaleSex()) addLinkToPlace(md, 'train Davy', 184, 'type=training');
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType === "training") {
			// You train Davy
			md = WritePlaceHeader();
			var bFirst = !this.checkFlag(4);
			this.setFlag(4);

			this.showPersonRandomRorX("davy5", 2);

			addPlaceTitle(md, "Training Davy");

			if (bFirst) {
				md.write(
					'<p>Well, Davy certainly needs to be controlled and dominated, so some more training seems a good idea, and you are feeling aroused from watching Bambi with him. You briefly talk to Bambi in another room to get suggestions and tips for training Davy and she gives you some expert information.</p>' +
					'<p>Bambi provides you with a whip and you use it on his ass while talking about how he has failed and is now worthless, that you have taken his family, and freed all the people he had charmed. You tell him how he is a complete failure, only worth serving you and your servant Bambi.</p>' +
					'<p>After a while Bambi repositions him and removes his gag. Before he can speak you sit on him, filling his mouth with your pussy and you order him "Lick"</p>' +
					'<p>Sometime later, after Davy has satisfied you, you redress and notice Bambi reward Davy, stroking his cock until he cums. You leave Davy to Bambi\'s expert attentions.</p>');
			} else {
				md.write('<p>You return to further train Davy as your slave</p>');
			}

			startQuestions();
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;

		} 
		
		if (sType === "restrain") {
			// You ask for Bambi's help with Davy
			md = WritePlaceHeader();
			this.place = 184;		// Put Davy explicitly in this room
			this.setFlag(8);
			startTimedEvent("BambiDominatesDavy()", 10);
			this.showPerson("davy3.jpg");
			addPlaceTitle(md, "Restraining Davy");
			if (!checkPersonFlag("Kate", 22) && !checkPersonFlag("Kate", 23)) md.write('<p>Kate leaves the room, saying "I am going home to pack, do not follow me!".</p>');
			md.write(
				'<p>You look at the unconscious Davy and you want to stop him from starting this all over again once he regains more Mana. While he is free from the influence of Kurndorf you have no doubt he will resume Charming people where he can and interfering with you.</p>' +
				'<p>You use the phone in the room to call the hotel bar and you ask Bambi to join you in the room, you hope she can help with Davy.</p>' +
				'<p>An excited Bambi enters the room a little later, and as she steps in she is already starting to undo her clothes, expecting something more carnal. You explain about how you need to restrain Davy for a while and ask if you can lock him in the room. She looks at Davy, and you see a grin form on her face,</p>' +
				'<p>"' + myLord + ' I know what to do here, excuse me for a few minutes while I get something"</p>' +
				'<p>She unplugs the phone in the room and gathers all of Davy\'s possessions, commenting she will lock these away.</p>' +
				'<p>About 5 minutes later she returns with a collection of ropes and other items and proceeds to expertly tie and gag Davy, tightly restraining him. As she does so she explains,</p>' +
				'<p>"' + myLord + ', I have had customers with odd tastes and I have a range of items to satisfy their needs."</p>' +
				'<p>You can see she must have had many such customers! She completes the rope work and she assures you that she will look after Davy for you.</p>');

			startQuestions();
			addLinkToPlace(md, 'you notice Davy\'s phone on a table', 184, 'type=checkphone');
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType === "restrainlater") {
			// You ask for Bambi's help with Davy
			md = WritePlaceHeader();
			if (this.checkFlag(6)) {
				// Davy was unconscious but has escaped!
				AddImage("bedroom4.jpg");
				addPlaceTitle(md, "Davy has Escaped!");
				this.place = 9999;
				this.setFlag(7);
				md.write('<p>You take Bambi to the room but it is empty, is seems Davy has escaped, who knows where.</p>');
			} else {
				this.place = 184;		// Put Davy explicitly in this room
				this.setFlag(8);
				startTimedEvent("BambiDominatesDavy()", 10);
				this.showPerson("davy3.jpg");
				addPlaceTitle(md, "Restraining Davy");
				md.write(
					'<p>You and Bambi go to room 101, and Bambi gets more and more excited as you approach, and as you open the door she is already starting to undo her clothes.</p>' +
					'<p>You explain about how you need to restrain Davy for a while and ask if you can lock him in the room. She looks at Davy, and you see a grin form on her face,</p>' +
					'<p>"' + myLord + ' I know what to do here, excuse me for a few minutes while I get something"</p>' +
					'<p>She unplugs the phone in the room and gathers all of Davy\'s possessions, commenting she will lock these away.</p>' +
					'<p>About 5 minutes later she returns with a collection of ropes and other items and proceeds to expertly tie and gag Davy, tightly restraining him. As she does so she explains,</p>' +
					'<p>"' + myLord + ', I have had customers with odd tastes and I have a range of items to satisfy their needs."</p>' +
					'<p>You can see she must have had many such customers! She completes the rope work and she assures you that she will look after Davy for you.</p>' +
					'<p>In passing you notice Davy\'s phone on a side table but it is locked and you doubt you could get him to give you the code.</p>'
				);

			}
			startQuestions();
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "roomservice") {
			// Bambi distracts Davy - technically a Bambi event but logical to put here
			md = WritePlaceHeader();
			perB.showPersonRorX("bambi13.jpg");

			addPlaceTitle(md, "Room Service");

			md.write(
				'<p>You ask Bambi to distract Davy with a little "room-service" and she eagerly agrees. You watch from nearby as she knocks on the door and enters a moment later. You wait for a discrete time and follow her into the room</p>' +
				'<p>Inside you see Bambi expertly giving Davy some complimentary "room-service". You can see Davy is quite absorbed, close to his..end of service.</p>' +
				'<p>You have a few moments to decide what to do, otherwise the angry Kate will take matters into her own hands.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=bambi');

			AddPeopleColumn();
			findPerson("Kate").showPerson("kate15a.jpg");
			WritePlaceFooter(md);
			return true;
		}
	};
	
	per.showEventDavysRoom = function() {
		var md;
			
		var herName = this.getPersonName();
		if (sType == "davyfuck") {
			// Davy fucks you (male Davy only)
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPerson("fuckba.jpg");
			else this.showPerson("fuckga.jpg");

			addPlaceTitle(md, herName);

			md.write(
				'<p>' + herName + ' fucks you</p>' +
				'<p></p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "talk more with Davy", Place);
			addLinkToPlaceO(md, "go and talk to Geraldine", 176);
			addLinkToPlace(md, 'leave the house', 43);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "davybj") {
			// Blowjob/Lick
			md = WritePlaceHeader();
			if (!isExplicit() || (this.isMan() && isExplicit())) this.showPersonRandomBG("bj", 1);
			else this.showPersonRandomXBG("bj", this.isMan() ? 3 : perYou.isMaleSex() ? 4 : 2);

			addPlaceTitle(md, herName);

			if (perYou.isMaleSex()) md.write('<p>' + herName + ' gives you a blowjob</p>');
			else md.write('<p>' + herName + ' licks you</p>');
			startQuestions();
			addLinkToPlaceC(md, "talk more with Davy", Place);
			addLinkToPlaceO(md, "go and talk to Geraldine", 176);
			addLinkToPlace(md, 'leave the house', 43);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "davyfucked") {
			// Male or Female player only
			md = WritePlaceHeader();
			if (isExplicit() && !this.isMan()) this.showPersonRandomXBG("fucked", perYou.isMaleSex() ? 4 : 1);
			else if (perYou.isFuta() && this.isMan()) this.showPerson("fuckedfa.jpg");
			else this.showPersonRandom("fuckedb", this.isMan() ? 2 : 1);

			addPlaceTitle(md, herName);

			md.write(
				'<p>You fuck ' + herName + '</p>' +
				'<p></p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "talk more with Davy", Place);
			addLinkToPlaceO(md, "go and talk to Geraldine", 176);
			addLinkToPlace(md, 'leave the house', 43);
			WritePlaceFooter(md);
			return true;
		} 
				
		return false;
	};

	// Events for Davy
	per.showEvent = function()
	{
		if (Place == 184) return this.showEventHotelRoom();
		
		var md, idx, sHe, sHis, sHim;

		if (Place == 144 && sType == 'follow') {
			// Follow to the sports fields
			setPlaceKnown("SchoolField");
			md = WritePlaceHeader();
			addPlaceTitle(md, "Davy at the School Sports Fields", "schoolfield1.jpg");

			// Follow Davy
			md.write(
				'<p>You realise Davy is taking a shortcut to the school sporting fields so you hurry along a slightly different path to avoid being seen by him. You quickly get a clear view of the playing fields, but Davy is nowhere to be seen. You quickly double back, and for a moment you thought you saw him, but you lose sight of him. A moment later you hear him speak to you from off to one side,</p>' +
				'<p>"' + perYou.getPersonName() + ', he warned me about you, told me to stay away from you. But I have to tell you, ' + (isCharmedBy("Kate", "Davy") ? 'they are both mine, I didn\'t lie' : 'she will be mine as well') + ' and you cannot stop me."</p>' +
				'<p>You see him vaguely in the trees and then he steps out of sight. You think he says something but you cannot hear it clearly.</p>' +
				'<p>Strange how he spoke, like he was taunting you.</p>'
			);
			startQuestions();
			startAlternatives(md, "How do you react?");
			addLinkToPlaceO(md, "approach Davy", Place, 'type=followhurt');
			if (perGates.other == 600) addLinkToPlaceO(md, "retreat, this might be an ambush", 9, '', 'Davy might have his woman hiding around here somewhere, so you quickly retreat to the public areas in front of the school. Nothing happens, there is no sign that you were followed');
			addLinkToPlaceO(md, "what was that he said?", Place, 'type=followok');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;

		}
		if (Place == 144 && (sType == 'followok' || sType == 'followhurt')) {
			// Davy's trap
			md = WritePlaceHeader();
			this.setFlag(9);
			addPlaceTitle(md, "Stormwater Drain", "drain.jpg");

			if (sType == 'followok') {
				md.write(
					'<p>You hesitate, Davy said something odd it sounded like an arcane word, maybe. Suddenly you feel a hand on your back shove you but you just stumble a little. You notice in front of you a stormwater drain, open with no protective grate! You look around to see Davy somehow now standing behind you. He looks disappointed and says after a pause,</p>' +
					'<p>"Look out for the drain", and before you can react he just walks away. You try to follow and you hear him say the words again and lose sight of him, you look around but Davy is gone, you have no idea where he went. You wonder if the slime was trying to push you into the drain?</p>' +
					'<p>You move the protective grate mostly back in place over the drain, and then make a quick phone call to the school admin office to report the problem.</p>'
				);

			} else {
				// Stumble and slightly hurt
				perYou.health = 90;
				this.setFlag(10);
				setPlaceKnown('NursesOffice',false);
				md.write(
					'<p>You step towards Davy to confront him about what he was talking about and stumble on the edge of an open stormwater drain right in front of you, you almost fell in! Suddenly you feel a hand on your back shove you but while you fall, you do not fall in to the drain. There is a sharp pain in your ankle and you look around to see Davy, somehow now standing behind you. He looks disappointed and says after a pause,</p>' +
					'<p>"Look out for the drain", and before you can react or stand he walks away. With some pain you get back to your feet, it does not feel like anything is broken or seriously hurt but you will have a bit of a limp for a while. Davy is gone, you have no idea where he went, but the slime pushed you! You would not be surprised if he opened the drain as well, there should be a protective grate over it, but you see it has been pushed aside.</p>' +
					'<p>With some pain you move the protective grate mostly back in place over the drain, and then make a quick phone call to school admin to report the problem and actually speak to Catherine who is handling these things at the moment. She asks if you are hurt and suggests you meet her in the <b>nurses office</b> for her to check your injury. Then again Tracy has handled most first aid for your home and she usually handles minor injuries like this and you could just go <b>home</b> and ask her to check it.</p>'
				);
			}
			md.write(
				'<p><img style="float:right;width:5%;margin-left:5px" src="' + getThemeFolder() + 'symbol1.png" alt="Hexagram" title="Hexagram">After a quick but nervous check of the area, all you can find is carved on an ancient tree near to where you think you saw him a glyph of some sort, a symbol you think you have seen in a book somewhere but do not recognise. It is very old, the bark has almost grown back over it, but it does appear to have been crudely re-cut recently.</p>'
			);
			startQuestions();
			if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
			if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
			addLinkToPlace(md, "return to the front of the school", 9);
			WritePlaceFooter(md);
			return true;

		}
		
		if (sType == "endgame1davy") {
			// End Game - Davy
			var stage = getQueryParam("stage");
			hideSidebars();
			var bMale = this.getPersonGender() == "man";
			md = WritePlaceHeader();
			if (checkPersonFlag("MissLogan", 1) && getCharmedLevel("MissLogan") == 2 && this.isCharmedBy() && !bMale) this.showPerson("pregnant.jpg");
			else if (this.place == 81) this.showPerson("goinghome.jpg");
			else this.showPerson("endgame1-davy.jpg");
			addPlaceTitle(md, "Davy Robbins");
			var hh = this.getHimHer();

			md.write('<p>Davy Robbins, once your rival for Kate and for the Book of Control, now ');
			if (bMale) md.write('he');
			else md.write('<b>she</b>');
			if (this.place == 81) {
				md.write(
					' is your your slave. Once also your prisoner ' + this.getHeShe() + ' is now back at home with ' + this.getHisHer() + ' mother and sister.</p>' +
					'<p>So far ' + this.getHeShe() + ' is well under control, but you have had Tina keep an eye on ' + hh + ' as you can trust her absolutely. Geraldine mostly too but she has seemed overly fond of Davy even when not charmed by ' + hh + '.</p>'
				);
			} else {
				md.write(' is your prisoner, well lets be truthful, your slave. ');
				if (!bMale) md.write('Yes, <b>she</b> now that you have used the Transform spell on him/her. You wonder if at times you should now call him something else, Daphne or something, but that is for another time. ');
				md.write(
					'</p></p>Still ' + this.getHeShe() + ' is you bound slave, too dangerous just to let go free, still at least partly under the influence of Kurndorf.</p>' +
					'<p>A more permanent solution eludes you, '
				);
				if (this.isCharmedBy()) md.write('you have charmed ' + hh + ' but you are not that sure if you can trust ' + hh + ', the influence of Kurndorf may still be there.');
				else md.write('you have to work out how to properly charm ' + hh + ', at this time it seems the only solution now, but the influence of Kurndorf is preventing that.');
				md.write(
					'</p><p>For now ' + this.getHeShe() + ' will have to stay in the Hotel Cellar...well Dungeon...under the expert care of Bambi.</p>'
				);
			}
			if (checkPersonFlag("MissLogan", 1)) md.write('<p>Then again...the influence of Miss Logan extended even to Davy, you are going to have to reconsider things...</p>');
			startQuestions();
			perYou.addEndGameOthers(md, stage);
			WritePlaceFooter(md);
			return true;
		}
		
		
		if (sType == "transformgender") {
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				this.dress = "Female/" + (this.isCharmedBy() ? "Charmed" : "Uncharmed");
				showPopupWindow("Transformation",
					addImageRandomString('GenericSex/tgm2f', oImages.GenericSex.tgm2f, "50%") +
					'<p>You cast the spell and Davy cries out, muffled by his gag. As you watch his body changes, growing thinner and your see his cock shrinking. His chest expands as you see breasts grow and his face softens to a feminine appearance.</p>' +
					'<p>After some time you can no longer call Davy a <b>he</b>, now <b>she</b> is very definitely female, nothing masculine is left, she is completely a woman! <i>She</i> looks at you shocked at the transformation.'
				);
			} else {
				this.setFlag(11, false);
				this.dress = "Male/" + (this.isCharmedBy() ? "Charmed" : "Uncharmed");
				showPopupWindow("Transformation", 
					addImageRandomString('GenericSex/tgf2m', oImages.GenericSex.tgf2m, "50%") +
					"<p>You cast the spell and Davy cries out, muffled by his gag. As you watch his body changes, growing larger and your see his cock growing. His chest diminishes as you see breasts disappear and his face hardens to a masculine appearance.</p>" + 
					"<p>After some time you can no longer call Davy a <b>she</b>, now <b>he</b> is very definitely male, nothing feminine is left, he is completely a ,an! <i>SHe</i> looks at you relieved at the transformation."
				);
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 81) return this.showEventDavysRoom();
		if (Place != 161) return false;
		
		sHe = this.getHeShe();
		sHis = this.getHisHer();
		sHim = this.getHimHer();

		if (sType == "checkdavy") {
			md = WritePlaceHeader();
			if (this.isMan()) {
				if (this.isCharmedBy()) this.showPersonRorX("davycellar-bound1.jpg");
				else this.showPerson("davycellar-bound1.jpg");
			} else this.showPersonRandom("davycellar-bound1", 2);
			addPlaceTitle(md, "Davy in the Cellar");
			md.write(
				'<p>Well, Davy is your prisoner here in the Hotel cellar...well now dungeon. ' + (this.isMan() ? "He" : "She") + ' has been securely bound by Bambi, you keep being impressed by Bambi\'s skills!</p>'
			);
			if (this.isCharmedBy() && isCharmedBy("MrsRobbins") && isCharmedBy("Tina")) md.write('<p>Now that Davy is charmed you could free ' + perDavy.getHimHer() + ' from the \'cellar\' and say return back to ' + perDavy.getHisHer() + ' home?</p>');
			if (isPersonHere("Bambi")) md.write('<p>Bambi is here taking care of Davy, strict and with lots of discipline.</p>');
			if (isPersonHere("Anita")) md.write('<p>Anita is here guarding Davy, you can see her dislike of Davy, bordering on hatred.</p>');

			startQuestions();
			if (isPersonHere("Bambi")) addLinkToPlace(md, 'ask Bambi to train Davy', 161, 'type=playdavybambi');
			if (wherePerson("Anita") == 161) {
				addLinkToPlace(md, 'tell Anita "Show me how Bambi has trained you"', 161, 'type=playdavyanita');
				if (isPersonHere("Bambi")) addLinkToPlace(md, 'ask Bambi and Anita team up to train Davy', 161, 'type=playdavyteam');
			}
			if (this.isCharmedBy() && isCharmedBy("MrsRobbins") && isCharmedBy("Tina") && isVisible()) {
				addPopupLinkC(md, 'take Davy back to ' + this.getHisHer() + " home and family", "Home Davy",
					this.addPersonString("goinghome.jpg", "height:max%", "right") +
					"You call Bambi to arrange Davy so you can take " + this.getHisHer() + " back to her home and family. She starts adjusting Davy\'s bondage so you can lead " + this.getHimHer() + " and suggests she call you a taxi, as leading a bound person though Glenvale may attract some attention! You have to agree with this!</p>" +
					(getSlavesInDungeon() === 0 ? '<p>You also will have stop the guarding arrangements for the dungeon, there is no need anymore.</p>' : '') +
					"<p>While she arranges this it does cross your mind once home if you should totally free Davy or leave in some light bondage as a reminder. You are sure Geraldine and Tina will not mind one way or the other. " +
					"This idea of your rival bound in front of " + this.getHisHer() + " family has an appeal! You could always change your mind at a later time?</p>" +
					addOptionLink("string", 'light bondage', "perDavy.moveThem(81);perDavy.setFlag(18);dispPlace(176,'type=davyhome')", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", 'free', "perDavy.moveThem(81);perDavy.setFlag(18,false);dispPlace(176,'type=davyhome')", "chatblock", "width:50%;margin-left:10%"),
					false, '', true
				);
			}
			addLinkToPlace(md, 'that is all for now', 161);
			WritePlaceFooter(md);			
			return true;
		}
			
		if (sType == "charmdavy1") {
			// Charm in the Hotel Cellar 1		
			this.dress = (this.checkFlag(11) ? "Female" : "Male") + "/Charmed";
			md = WritePlaceHeader();
			this.showPerson("charm1.jpg");
			addPlaceTitle(md, "Finally, Davy Under A Charm Spell");
			
			md.write(
				'<p>Finally Davy is free of the leftover magic from Kurndorf, and ' + sHe + ' is powerless and unable to defend ' + sHim + 'self magically. You tell Davy, "It is time" and you cast the charm spell.</p>' +
				(this.checkFlag(11) ? '<p>You remove her ball-gag and ' : '<p>') +
				'Davy sighs in a sort of resigned way, ' + sHe + ' knows there is nothing ' + sHe + ' can do and has no defence. ' + capitalize(sHe) + ' says,</p>' +
				'<p>"Is this revenge for Kate? I know you always wanted her but I got her before you" and weakly laughs. You reply,</p>' +
				'<p>"And I \'got\' Tina before you, and you are now mine as well"</p>' +
				'<p>You watch and ' + sHis + ' eyes change to a green colour as the spell more strongly takes effect ' + 
				(this.checkFlag(11) ? 'and you replace her ball-gag</p>' : '</p>')
			);

			startQuestions();
			addLinkToPlaceC(md, 'time to finish this', Place, 'type=charmdavy2');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "charmdavy2") {
			// Charm in the Hotel Cellar 2
			md = WritePlaceHeader();
			this.showPerson("charm2.jpg");
			addPlaceTitle(md, "Davy Under A Charm Spell, Final");
			
			md.write(
				'<p>Davy looks at you ' + sHe + ' has given up, and you tell ' + sHim + ' firmly that ' + sHe + ' is your slave now, to use and command as you want. You pause, and say,</p>' +
				'<p>"Yes this is revenge for Kate, I will make you do all the perverted things you did to her over and over. You are my slave now"</p>' +
				'<p>While you feel guilty for a moment, gloating like that felt really good! Davy is completely defeated, and yours. For now you will leave ' + sHim + ' bound here. There is still a nagging suspicion that maybe the residue of Kurndorf may affect ' + sHim + ' but given time you will gain confidence in your new slave.<p>' +
				'<p><i>nothing more implmentented</i></p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all, Davy is your slave', 161);
			WritePlaceFooter(md);
			return true;		
		}		

		if (sType == "playdavyanita") {
			// Play with Davy
			if (this.isMan()) {
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX("davycellar-male-train2", 2);
				else this.showPerson("davycellar-male-train2.jpg");
			} else {
				idx = String.fromCharCode(Math.floor(Math.random() * 4) + 97);
				md = WritePlaceHeader();
				this.showPerson("davycellar-female-train1" + idx + ".jpg");
			}
			addPlaceTitle(md, "Anita with Davy");

			if (this.isMan()) {
				md.write(
					'<p>Davy is clearly afraid of Anita, and you can\'t really blame him for it. Hell, you are, too at times, and she is your devoted slave, but it is probably this fear that makes him fall in line so easily. Anita doesn\'t so much “train” him as that she is throwing him around, dragging him from place to place all while spitting demeaning expletives in his face.</p>' +
					'<p>You know that Bambi has restricted usage of the more painful and probably damaging tools in her arsenal, and Anita often makes her frustration about that known. Her hands are tightly wrapped around Davy\'s balls while she sits on his face and explains what she will do to him if he is unable to bring her to climax, and you have to admit you occasionally feel sorry for the poor guy, but not much.</p>'
				);
			} else {
				md.write(
					'<p>Davy is clearly afraid of Anita, and you can\'t really blame her for it. Hell, you are, too at times, and she is your devoted slave, but it is probably this fear that makes her fall in line so easily. Anita doesn\'t so much “train” her as that she is throwing her around, dragging her from place to place all while spitting demeaning expletives in her face.</p>' +
					'<p>You know that Bambi has restricted usage of the more painful and probably damaging tools in her arsenal, and Anita often makes her frustration about that known. She sits on Davy\'s face and explains what she will do to her if she is unable to bring her to climax, and you have to admit you occasionally feel sorry for the poor girl, but not much.</p>'
				);
			}
			if (isMurderPath()) md.write('<p>Still, it makes you think. Anita very clearly hates Davy for what he did to her and is pretty much only held back from doing him serious harm by your orders. The thought that she might ever be freed off the spell and that hatred shifts to you is... chilling.</p>');
			else md.write('<p>Still, it makes you think. Davy is Anita\'s enemy because you told her he is, and that order alone seems to be enough to make her hate him with scary passion. The thought that she might ever be freed off the spell and that hatred shifts to you is... chilling.</p>');


			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "playdavybambi") {
			// Play with Davy
			if (this.isMan()) {
				if (isExplicit()) {
					md = WritePlaceHeader('td-left-med');
					this.showPersonRandomX("davycellar-male-train1", 3);
				} else {
					idx = String.fromCharCode(Math.floor(Math.random() * 2) + 97);
					md = WritePlaceHeader(idx == 'a' ? 'td-left-med' : '');
					this.showPerson("davycellar-male-train1" + idx + ".jpg");
				}
			} else {
				idx = String.fromCharCode(Math.floor(Math.random() * 4) + 97);
				md = WritePlaceHeader();
				this.showPerson("davycellar-female-train1" + idx + ".jpg");
			}
			addPlaceTitle(md, "Bambi with Davy");

			md.write(
				'<p>“I know you are still unwilling to submit to our ' + perYou.getLord() + ', my ' + this.getSex() + '.” Bambi\'s fingers tenderly touch Davy\'s naked chest, slide over ' + this.getHisHer() + ' neck and caress ' + this.getHisHer() + ' cheek. “But I am sure you will not mind if we perform a little... show for ' + perYou.getHimHer() + ', do you?”</p>' +
				'<p>Davy\'s body trembles under her touch' + (this.isMaleSex() ? ', and you can see his cock twitching a little' : '') + ', yet ' + this.getHeShe() + ' remains hesitant. ' + capitalize(this.getHisHer()) + ' eyes spitefully rest on you and ' + this.getHeShe() + ' refuses to answer.</p>' +
				'<p>“I see.” Bambi smiles cruelly. “Perhaps I should get miss Anita to...”</p>' +
				'<p>“No!” Davy shouts hastily. “N... no need...”</p>' +
				'<p>Bambi\'s frowns at ' + this.getHimHer() + (this.isMaleSex() ? ', her fingers starting to constrict around Davy\'s scrotum without a word' : ', her fingers starting to painfully pinch her nipple without a word') + '.</p>' +
				'<p>“No need, Ma\'am!” ' + capitalize(this.getHeShe()) + ' quickly adds, and Bambi\'s fingers relax. “I... play along.”</p>' +
				'<p>“Good ' + capitalize(this.getSex()) + '.”</p>'
			);
			if (this.isMaleSex()) {
				md.write(
					'<p>Bambi\'s lips barely touch Davy\'s in a fleeting kiss before she gives you a wink and turns away to get a few items, and even though Davy is less than pleased with his treatment, you can see his manhood already standing halfway at attention and his body trembling all over as he follows the sway of her hip.</p>' +
					'<p>In the next minutes, Bambi demonstrates the depths of her skills and experience. Her whip strikes Davy\'s shoulders, chest and tights with finesse and precision, never breaking skin or leaving lasting marks but definitely letting ' + this.getHimHer() + ' feel the sting of its impact.</p>' +
					'<p>Davy twitches, screams, and occasionally moans in pleasure whenever Bambi grants ' + this.getHimHer() + ' a moment of respite to tenderly caress his by now rock-hard cock or place soft kisses to his skin, and as the scene goes on, his body seems to fall deeper into a haze of pain and pleasure.</p>' +
					'<p>Clamps are being attached to his nipples and other parts, a flogger hits his increasingly reddened skin... You expect him to protest when Bambi gets the strap on for the grand finale. But his mind seems barely there when she uses it to finally bring him to climax and force him to shoot his load all over his own body.</p>'
				);
			}
			md.write(
				'<p>When Bambi is done with ' + this.getHimHer() + ', ' + this.getHeShe() + ' looks as if slowly awakening from a weird dream, ' + this.getHisHer() + ' eyes glassy and watching her in a mix of fear and adoration as she tends to ' + this.getHisHer() + ' bruises, ' + this.getHisHer() + ' resistance broken down a little more.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "playdavyteam") {
			// Play with Davy
			if (this.isMan()) {
				md = WritePlaceHeader();
				this.showPerson("davycellar-male-train3a.jpg");
			} else {
				md = WritePlaceHeader();
				this.showPerson("davycellar-female-train3a.jpg");
			}

			addPlaceTitle(md, "Bambi and Anita with Davy");
			md.write(
				'<p>Anita and Davy team up to train Davy</p>' +
				'<p style="font-size:x-small">Actual scenes to be implemented</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showPersonChat = function(md)
	{
		if (Place == 161 && this.isHere() && sType === "") {
			// Cellar only
			addLinkToPlace(md, 'check on Davy', 161, 'type=checkdavy');
		}

		if (Place == 81 && this.isHere() && sType === "") {
			// Davy's bedroom
			addPopupLinkC(md, 'change Davy\'s bondage', this.checkFlag(18) ? "Removing Davy\'s bonds" : "Tying up Davy",
				this.addPersonString("home3-" + (perDavy.checkFlag(18) ? "free" : "bound") + ".jpg", "height:max%", "right") +
				"You reconsider Davy\'s bondage and call Geraldine in to rearrange it. You notice how happy and expert Geraldine is at this...",
				false, "perDavy.setFlag(18,!perDavy.checkFlag(18));dispPlace()"
			);			

			if (this.isMan()) {
				if (perYou.isMaleSex()) {
					addLinkToPlaceO(md, 'fuck Davy', Place, 'type=davyfucked');
					addLinkToPlaceO(md, 'have Davy fuck you', Place, 'type=davyfuck');
					addLinkToPlaceO(md, 'have Davy give you a blowjob', Place, 'type=davybj');
				} else {
					addLinkToPlaceO(md, 'have Davy fuck you', Place, 'type=davyfuck');
					addLinkToPlaceO(md, 'have Davy lick you', Place, 'type=davybj');
				}
			} else {
				if (perYou.isMaleSex()) {
					addLinkToPlaceO(md, 'fuck Davy', Place, 'type=davyfucked');
					addLinkToPlaceO(md, 'have Davy give you a blowjob', Place, 'type=davybj');
				} else {
					if (perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck her with your strap-on', Place, 'type=davyfucked');
					addLinkToPlaceO(md, 'have Davy lick you', Place, 'type=davybj');
				}				
			}
			this.addSleepLink(md, "go to bed for the night with Davy", "Going to Bed with Davy",
				'<p style="position:absolute;left:35%;top:1em;cursor:pointer;font-size:1.1em;width:62%">An odd thing to go to bed with your once hated rival?',
				'bed-' + (this.checkFlag(18) ? 'bound' : 'free') + '.jpg', true
			);			
		}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Using the silver ring
		if (no == 32 && cmd == 2) {
			if (Place == 184) {
				if (perDavy.other != 8 && perDavy.getQuestBlueBottle() != 20 && perDavy.getQuestBlueBottle() != 21) {
					// Have not used the ring or blue bottle on him
					useSilverRingStart();
					AddMana(20);
					perDavy.other = 8; //Hide the 'go to room 101' entry.
					addComments('<p>You clasp the ring with your fist. It glows, far brighter than ever before, and you have to shield your eyes.  Across the room you hear Davy give a strangled grunt, as mana flows from him to you.');
					if ((perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7))) || perDavy.checkFlag(8)) {
						// Unconscious or restrained
						addComments('</p></td></tr></table>');
						return "handled";
					} else {
						addComments('<p>You clasp the ring with your fist. It glows, far brighter than ever before, and you have to shield your eyes.  Across the room you hear Davy give a strangled grunt, as mana flows from him to you.</p></td></tr></table>');
						dispPlace(267, '');	//Go to the final scene with Kate.
						return "nofooter";
					}
				} else {
					addComments('You have already drained him of his power.</p></td></tr></table>');	
					return "handled";
				}
			}
		}
		
		// Using the blue bottle
		if (no == 33 && cmd == 2) {
			if (Place == 184) {
				if (perDavy.other != 8 && perDavy.getQuestBlueBottle() != 20 && perDavy.getQuestBlueBottle() != 21) {
					// Have not used the ring or blue bottle on him
					perDavy.setQuestBlueBottle(20);
					addComments('You aim the bottle at Davy and pull open the stopper. In an spray of blue light Kurndorf\'s power is drawn from Davy\'s body and into the bottle, leaving him defenseless against you.');
					if ((perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7))) || perDavy.checkFlag(8)) {
						// Unconscious or restrained
						return "handled";
					}
					dispPlace(267, '');
					return "nofooter";
				} else {
					addComments('You have already drained him of his power.');
					return "handled";
				}
			}
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (!this.isHere()) return '';
			
			if (Place == 161 && this.place == 161) {
				// In the cellar
				if (CastClairvoyanceSpell()) {
					if (!this.checkFlag(14)) addComments('<p>The spell reveals Davy is under a powerful spell.</p>');
					else if (!this.checkFlag(15)) addComments('<p>The spell reveals Davy is under a moderate spell.</p>');
					else if (this.sCharmedBy == "You") addComments('<p>The spell reveals that Davy is under the influence of <b>your</b> charm spell.</p>');
					else addComments('<p>The spell reveals Davy has a small residual magical effect but very little.</p>');
					return "handled";
				}
			}
			addComments('<p>The spell reveals Davy is under a powerful spell.</p>');
			return "handled";
		}
		
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (Place != 161 && Place != 81) examineItem(no, 'The ' +  s + ' trembles slightly, maybe it would react better in another location with Davy.');
					else if (!this.isMan() && !perYou.checkFlag(30)) examineItem(no, 'The ' +  s + ' trembles, maybe if you had better control over the transform spell it would react better.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Davy, you feel you can transform ' + this.getHimHer());
					return "handled";
				}
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			// In the cellar?
			if ((Place == 161 || Place == 81) && this.isHere() && this.isCharmedBy()) {
				if (!CastTransform(1, true, !this.isMan())) return "handled";

				ClearComments();
				dispPlace(Place, 'type=transformgender');
				return "nofooter";
			}
			// Is he present somewhere else?
			if (this.isHere()) {
				if (!CastTransform(1, true)) return "handled";		// You cannot cast the spell
				addComments("The spell does not work, but there is an effect, you believe it may work at another time or place.");
				return "handled";
			}
		}
		
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (Place == 184) {
				//Hotel Room 101; Davy and Kate
				addComments("You read the spell, but nothing happens.  Davy must have some sort of magical protection.");
				return "handled";
			}
			if (Place == 161 && this.place == 161) {
				if (!this.checkFlag(16) || this.checkFlag(13)) {
					if (!this.checkFlag(16)) addComments("Davy seems to be under a powerful spell that is blocking the charm spell");
					else addComments("The spell fails, Davy seems to have some sort of defense, possibly he can use his mana to protect him?");
					return 'handled';
				}
				CastCharmSpell("Davy", Place, 1, "type=charmdavy1");
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() { return false; };

}
