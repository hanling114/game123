/********************************************************************
Lauren
*********************************************************************/
function CharmLauren(md)
{
	var perLauren = findPerson("Lauren");
	var myLord = perLauren.getYourNameFor();
	if (Place == 18) setPersonOther('Sarah', getPersonOther('Sarah') + 0.1);
	AddMana(-10);
	perLauren.extra[0] = perLauren.extra[0] + 1;
	if (perLauren.extra[0] == 1) {
		setQueryParams();		// and she leaves
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-1.jpg", "height:max%", "right") +
			"You attempt to cast the spell, and the maid starts to react looking at you with some desire, but then she shakes her head and touches a ring on one of her fingers.<br><br>" +
			"You see the protection you were told about is there, a weak protection, but sufficient.<br><br>" +
			"With some confusion Lauren leaves you, seeming to agree that you want her...to leave.</p>" +
			'<p>You do feel a bit uncertain, what if Sir Ronald or Sarah find out? Do you really think Sarah would allow it, or forgive you? What about Sir Ronald?'
		);
	} else if (perLauren.extra[0] == 2) {
		setQueryParams();		// and she leaves
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-2.jpg", "height:max%", "right") +
			"You attempt to cast the spell, and the maid definitely reacts as she looks at you with desire, but then she shakes her head and touches a ring on one of her fingers, fiddling with it, almost removing the ring.<br><br>" +
			"You see the protection you were told about is there, but only barely.<br><br>" +
			"With some confusion Lauren leaves you, seeming to agree that you want her...to leave.</p>" +
			'<p>You still feel uncertain, casting clairvoyane can tell if a person is charmed after all? Do you really think Sarah will allow you to complete the charm process, or forgive you if you do? What about Sir Ronald will he let you stay as his apprentice?'
		);
	} else {
		perLauren.charmThem(4);
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-3.jpg", "height:max%", "right") +
			"You cast the spell, and the maid reacts as she looks at you with lust, and she touches a ring on one of her fingers and purposely removes it. She proceeds to strip some of her clothing,</p>" +
			'<p>"Yes, ' + myLord + ' how may I serve you"</p>' +
			"<p>She seems completely under the influence of the spell, no slow submission, instantly your slave, with no real control or choice!</p>" +
			"<p>You are still nervous about Sarah and Sir Ronald and you give Lauren clear instructions to never tell either of them about this. In fact you tell her to avoid Sir Ronald when possible." +
			(Place != 290 ? "</p><p>Lauren takes you to the guest room so she can better <b>serve</b> you there." : ""),
			"gotoPlace(290,'type=laurenplay')"
		);
	}
}


// maid Lauren

function initialiseLauren()
{
	// Lauren
	addPerson("Lauren", 0, "Lauren", "");
	
	per.getYourNameFor = function() { return perYou.getLord(); };
	per.extra[0] = -1000;

	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("lauren1b.jpg", "height:max%", "right", undefined, '', true) +
			'Lauren is the faithful servant to the Gates family and now a devoted slave to you! Through serving Sarah she serves you because you ordered her to be a companion to Sarah and be with her. She was reluctant at first as her desire was to move into your Mother’s house to be YOUR family’s maid. Imagine a personal maid at your whim! Keeping the house fresh and clean, she can even cook some great food not mentioning the sexual services she could offer. Though the idea was tempting you talked Lauren out of this. You need someone who keeps an eye on ' + (isMurderPath() ? 'Sarah. She' : 'Sir Ronald and Sarah. Both') + ' can be quite secretive at times.<br><br>' +
			'Lauren has been working for Sir Gates for years and has and has a bizarre relationship with Sarah as she likes to describe it. She vaguely mentioned some kind of blackmailing involved between them, but she didn’t talk about more. You should ask her about that, because it really is strange that the Madame of such importance as Sarah would regularly have sex with a lowkeep servant like Lauren.<br><br>' +
			'Lauren curtsy you at the instant moment she sees you. She whispers you, her ' + perYou.getLord() + ', about what ' + (isMurderPath() ? 'Sarah has' : 'the Gates have') + ' been doing today, feeding you information about anything important she came across. She does this every time she meets you, so you can be up to date with what is happening at the Mansion.';
	};

	per.getPersonAddress = function(n) { return this.checkFlag(1) || this.checkFlag(10) || getPersonOther("Sarah") >= 101  ? n ? 18 : 'Gate\'s Mansion' : n ? 0 : ''; };

	per.getPossessionFace = function() { return 'lauren-face' + (this.isCharmedBy() ? 'c' : 'u'); };
	
	per.getModels = function() { return "Shay|Shay Laren,Holly|Holly Michaels"; };
	
	per.whereNow = function()
	{
		if (Place == 290) {
			if (isMurderPath() || this.isCharmedBy() || sType == "escort") return Place;
		}
		if (Place == 192) {
			if (isMurderPath() && !this.checkFlag(1)) return 0;
			return Place;
		}
		return this.place;
	};
	
	per.showEventPopup = function()
	{
		if ((Place == 18 || Place == 192) && getQueryParam("charm") == "yes") {
			CharmLauren(md);
			return true;
		}
			
		if (sType !== "" || Place != 124) return false;

		// Lauren options
		if (isConspiracyPath() && perYou.FindItem(26) > 0 && !this.checkFlag(10)) {
			// (Conspiracy Path)
			// You have the seance article and have not met Lauren here yet
			if (this.dress === "") {
				this.pickModel("You see a young woman in a maid outfit. For a moment you are confused. Is she...", "lauren1a2col-day", "Shay", "Holly", "shorter", "taller", '', "A Maid?");
				return true;
			}
			showPopupWindow("Meeting Lauren",
				this.addPersonString("lauren11a.jpg", "height:max%", "right") +
				'The Broken Inn Hotel has a few customers around the bar area, and your eyes are drawn to an attractive young lady. You have never seen her before, but she seems to know you as she walks towards you with clear purpose. For a moment you feel uncertain, is she working for Davy or someone else? You prepare for the worst,<br><br>' +
				'"Hello ' + perYou.getLord() + ', and \'' + (perYou.isBornMale() ? 'Mr' : 'Miss') + ' Not Apprentice\' I was asked to meet you by my Lady and she told me to call you that and say that she is your ally.", suddenly you realise she is from your mysterious benefactor and \'co-conspirator\'! You ask her who she is and what she wants, and she answers awkwardly,<br><br>' +
				'"' + perYou.getLord() + ' I am Lauren, Maid to Lady...to my Lady. I have been asked to deliver you a message but not here, there are too many people. My Lady ordered..told me that the pool is often empty and there are many private places to..to..talk. I will go there, please join me there when you can...I must...must change, my Lady <i>insisted</i>.."<br><br>' +
				'She blushes and looks very embarrassed but then covers up her discomfort and gives you a little curtsy and walks off towards the pool area.<br><br>' +
				'Odd, it seems this maid has a strange relationship with your \'noble ally\'. You wonder if she might be the young lady Victoria at the Antiques ' + getShopStore(true) + ' talked about who sold the old stone?'
			);
			this.place = 269;
			this.setFlag(10);
			return true;
		}
		return false;
	};

	per.showEventMansionEntry = function()
	{
		var md, chc;

		// Any path
		
		if (perGates.other === 0 && !perGates.checkFlag(10)) {
			// First Visit to the Mansion
			md = WritePlaceHeader();
			if (this.dress === "") {
				this.pickModel("You see a young woman in a maid outfit open the door. For a moment you are confused. Is she...", "lauren1a2col-day", "Shay", "Holly", "shorter", "taller", '', "A Maid?");
				WritePlaceFooter(md);
				return true;	
			}
			this.showPersonDN("lauren1b.jpg");
			addPlaceTitle(md, "The Gates Mansion");
			perGates.setFlag(10);
			md.write(
				'<p>You knock on the front door and a few minutes later a person opens the door,  a maid dressed rather scantily, and she asks what is your business here?</p>' +
				'<p>You give your name and ask to see ' + perGates.getPersonName() + ' to discuss a book called the Sacred Book of Control. She excuses herself saying she will check and closes the front door. A short time later she returns and invites you in. She is softly spoken and very formal in her speech.</p>' +
				'<p>As you follow you see she is very quiet and light on her feet and cannot help but look at her skimpy dress. She notices your glances, and blushes,</p>' +
				'<p>"Sorry, My Lady insists I wear a particular style of \'uniform\'"</p>' +
				'<p>You comment and say you thought ' + perGates.getPersonNameShort() + ' lived here on his own, and she says "I am just preparing some rooms for My Lady once she arrives", but she does not answer any other questions.</p>' +
				'<p>With some embarrassment she leads you towards a large study or library, but leaves you at the door and gestures for you to enter.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, "enter the study", 17);
			WritePlaceFooter(md);
			return true;
		}
		
		var perSarah = findPerson("Sarah");
		var marea = getQueryParam("area");

		// Apprentice Path
		
		if (perSarah.place == 192 && perSarah.other == 101 && marea !== "upstairs") {
			// Meet Lauren (properly) when Sarah arrives
			md = WritePlaceHeader();
			if (this.dress == "") this.dress = "Shay";	//	 Fallback largely for old saves
			this.showPersonDN("lauren1b.jpg");
			addPlaceTitle(md, "Stopped in the Entry Hall");
			md.write(
				'<p>You notice as you leave the study Sarah has left a few minutes previously. Out of curiosity you approach the huge and long stairs that would lead you to the second and third floor of the mansion. As you do '
			);
			if (isPlaceKnown("MansionGuestRoom")) md.write('the main Lauren');
			else md.write('a young woman');
			md.write(
				' walks down from the stairs in a stunning maid uniform. The uniform is the typical one which was worn by servants a hundred years ago with the only exception being this woman’s skirt which is far more revealing and shorter than usual. You can even see that she’s not wearing any panties! Well, she must be working here so you wait at the lowest steps of the stairs. She addresses you,</p>' +
				'"Please, ' + this.getYourNameFor() + '! I am Lauren, Lady Sarah\'s maid. My Lady has sent me to inform you of her arrival, but she is tired and need a special bath treatment and wishes to be alone! I am here to make sure you wait in your proper place for her! She told me to tell you that you are not to <i>go upstairs</i> to the third door on the right", she says in a slight english accent.</p>' +
				'Clearly, she is the lady’s personal maid assuming the Gates family has more servants and that means she is responsible for her Lady’s well being. A role which she fills with relentless loyalty and determination.</p>' +
				'<p>She turns to walk back up the stairs but turns and says quietly "My Lady would be <b>insulted</b> though if you did not exercise your curiosity...<i>though I would prefer you did not</i>..."</p>'
			);
			//md.write('<p>Just before you leave ' + perGates.getPersonNameShort() + ' you notice Sarah has left a few minutes before you.</p><p>As you enter the entry way you are met by a young woman dressed as a maid, looking a little nervous and clearly waiting for you</p>');
			//md.write('<p>"My Lady has asked me to tell you that she is very tired from her journey here and is retiring upstairs to take a bath. She told me to make it clear that you are not to <i>go upstairs</i> to the third door on the right."</p><p>She shakes her head and continues softly "Please don\'t"</p><p>With that she leaves and walks up the stair case, you cannot avoid noticing how short her skirt is and her complete lack of panties.</p>');
			// Questions
			startQuestions();
			if (isDay() || !this.checkFlag(8)) startAlternatives(md);
			addLinkToPlace(md, "as Sarah wishes follow her upstairs", 18, 'area=upstairs');
			if (isDay() || !this.checkFlag(8)) {
				addLinkToPlace(md, "respect Lauren\'s preference and exit " + perGates.getPersonNameShort() + "\'s House", 16, '', this.addPersonFace() + 'As you leave you hear the maid softly speak &quot;Thank you, but My Lady will be disappointed.&quot;', '', 'LeaveNoBath()');
				endAlternatives(md);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "landing") {
			// Talk to Lauren on the stairs
			md = WritePlaceHeader();
			if (this.dress == "") this.dress = "Shay";	
			var idx = 5;
			this.setFlag(15);
			if (this.checkFlag(5)) idx++;
			if (this.checkFlag(6)) idx++;

			this.showPersonDN("lauren1c.jpg");
			addPlaceTitle(md, "Landing on the Stairs");
			md.write(
				'<p>You follow the maid Lauren upstairs, and you meet her readjusting her clothing after stumbling. She nervously asks you,</p>' +
				'<p>"' + perYou.getLord() + ' I am in a hurry, as I said, I am summoned to Lady Sarah".</p>' +
				'<p>She blushes again, and looks at you as she takes a step up the next set of stairs,<br>');

			// Questions
			startQuestions();
			switch(idx) {
				case 5: addQuestionR(md, "tell me about yourself", "<p>She hesitates, &quot;I am sure " + perYou.getLord() + " I do not have the time, and surely you are more interested in Lady Sarah?&quot;. You follow her up the stairs, telling her that you also find her fascinating", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\')"); break;
				case 6: addQuestionR(md, "why do you do these unusual services for Sarah", "<p>She blushes, &quot;I have no choice " + perYou.getLord() + ", Lady Sarah has convinced me it is in my best interest to do what she desires&quot; You try to ask her more but she insists she <i>must</i> visit Sarah, and you follow her upstairs", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\')"); break;
				case 7: addQuestionR(md, "tell her she is pretty", "<p>She hesitates, &quot;My Lady Sarah would not like to hear you say that " + perYou.getLord() + ", but then again she has never been a person of <i>singular</i> tastes&quot; She smiles and continues walking upstairs", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\')"); break;
			}
			addLinkToPlaceO(md, "let her go upstairs", 18, 'area=upstairs');
			addLinkToPlace(md, "go downstairs", 18, 'area=entry', '', '', "setPersonOther(\\'Sarah\\', getPersonOther(\\'Sarah\\')+0.1);");
			addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17, '', '', '', "setPersonOther(\\'Sarah\\', getPersonOther(\\'Sarah\\')+0.1);");
			WritePlaceFooter(md);
			return true;
		}
		
		if ((perSarah.place == 192 && perGates.other != 300 && (perSarah.other >= 114 && perSarah.other <= 130 && ((perSarah.other - 114) % 3 == 0)) && !this.checkFlag(15)) || sType == "laurengoingattend") {
			// Meet Lauren later (prior to sex scene Lauren/Sarah)
			md = WritePlaceHeader();
			setQueryParams("type=laurengoingattend");
			this.setFlag(15);
			if (this.dress == "") this.dress = "Shay";	
			this.showPersonDN("lauren1b.jpg");
			addPlaceTitle(md, "Met in the Entry Hall");
			md.write(
				'<p>As you enter the entry hall you see Sarah\'s maid Lauren as she is just about to walk upstairs, she looks <b>very</b> embarrassed. You call out to her to say hello, and she almost jumps in surprise. She looks at you blushing,</p>' +
				'<p>"Sorry, My Lady has called me to her private room to...assist her with something".</p>' +
				'<p>She continues walking upstairs, and she hesitates,<br>' +
				'<p>"Please do not visit for a while...though My Lady would not mind, she would be amused...I would prefer...but she would be amused."</p>' +
				'<p>She almost runs upstairs, once again you notice her lack of panties as she stumbles on the first landing of the stairs...</p>');
			// Questions
			startQuestions();
			addLinkToPlace(md, "follow her upstairs", 18, 'type=landing');
			if (!this.checkFlag(14)) addLinkToPlace(md, "call after her and say you will not visit now", 290, 'type=nolanding', '', "setPersonOther('Sarah', getPersonOther('Sarah')+0.1)");
			else addLinkToPlace(md, "wait in the guest room for a little", 290, 'type=waiting', '' , "setPersonOther('Sarah', getPersonOther('Sarah')+0.1)");
			addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
			if (isDay() || !this.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
			WritePlaceFooter(md);
			return true;
		}
		
		if (perSarah.place == 192 && perSarah.other == 109) {
			// Meet Lauren after the apology message
			md = WritePlaceHeader();
			if (this.dress == "") this.dress = "Shay";	
			this.showPersonDN("lauren1b.jpg");
			addPlaceTitle(md, "Met in the Entry Hall");
			md.write(
				'<p>As you enter the entry way you are met by Sarah\'s maid Lauren again, she looks quite embarrassed.</p>'
			);
			if (this.checkFlag(2)) {
				md.write(
					'<p>"My Lady has asked me to tell you she has forgiven you for the mixup and that her private room is upstairs. I personally want to thank you, but please do not tell her I said that.".</p>' +
					'<p>She blushes and then she continues,</p>'
				);
			} else {
				md.write(
					'<p>"My Lady has asked me to tell you that her private room is upstairs, to the left of the <i>bathroom</i>".</p>' +
					'<p>She blushes as she mentions the bathroom, and she continues,</p>'
				);
			}
			perSarah.other = 110;
			md.write(
				'<p>"My Lady extends an invitation to visit when you are free."</p>' +
				'<p>With her message delivered she walks upstairs, once again you notice her lack of panties.</p>'
			);
			// Questions
			startQuestions();
			addLinkToPlace(md, "go upstairs", 18, 'area=upstairs');
			addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
			if (isDay() || !this.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
			WritePlaceFooter(md);
			return true;
		}
		
		// Conspiracy path
		if (!isConspiracyPath()) return false;
		
		if (perSarah.place == 192 && perSarah.other == 50) {
			// (Conspiracy Path) Met by Lauren on the way to meet Sarah
			md = WritePlaceHeader();
			if (this.dress == "") this.dress = "Shay";	
			this.showPersonDN("lauren1c.jpg");
			addPlaceTitle(md, "Lauren Meets you in the Entry Hall");
			md.write(
				'<p>You step through the wall but it feels very strange, different than the previous times you have used the Pass spell. It was difficult to move and it felt almost like you had to push through <i>something</i>.</p>' +
				'<p>You find you are standing in the entry way for the Mansion, a grand room to show-off the mansion. As you look around cautiously you hear some footsteps approaching, startled you look for the source, but you see it is the maid Lauren approaching. She is now dressed in a stylised and skimpy maid uniform. She looks at you and gestures towards the grand staircase,</p>'
			);
			if (perYou.FindItem(40) > 0) {
				perYou.completeQuest(6);
				md.write(
					'<p>"Good evening ' + perYou.getLord() + '! Do you have the gift for My Lady?", you show her the bottle of wine. Lauren nods, "My Mis..Lady asks we be quiet and join her in her room upstairs", she says in a slight english accent.</p>' +
					'<p>She leads the way upstairs, but after climbing only a few steps she stops and bends over to pick something up off the stairs. As she does you are in a perfect position to see up her very short skirt, and to see she is <i>not</i> wearing any panties. She stands back up and glances back at you, furiously blushing, and then continues upstairs without saying a word.</p>'
				);
				// Questions
				startQuestions();
				addLinkToPlace(md, "follow her upstairs", 192);
				
			} else {
				md.write(
					'<p>"Good evening ' + perYou.getLord() + '! Do you have the gift for My Lady?". Oops! you have forgotten the wine. Lauren shakes her head, "Please return another time when you have the gift"</p>' +
					'<p>She shows you to the front door and opens it, after disabling a complex security system. She politely waits for you to leave, but also making it clear that you have to leave.</p>'
				);
				// Questions
				startQuestions();
				addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s Mansion", 16);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "appearentry") {
			// (Conspiracy Path) Appeared via pass spell from outside, second or later times
			md = WritePlaceHeader();
			if (this.dress == "") this.dress = "Shay";
			this.showPersonDN("lauren1c.jpg");
			addPlaceTitle(md, "Lauren Meets you in the Entry Hall");
			md.write(
				'<p>You step through the wall but it feels very strange, different than the previous times you have used the Pass spell. It was difficult to move and it felt almost like you had to push through <i>something</i>.</p>' +
				'<p>You find you are standing in the entry way for the Mansion, a grand room to show-off the mansion. As you look around cautiously you hear some footsteps approaching, startled you look for the source, but you see it is the maid Lauren approaching. She is now dressed in a stylised and skimpy maid uniform. She looks at you and gestures towards the grand staircase,</p>' +
				'<p>"Good evening ' + perYou.getLord() + '! Please follow me", she says in a slight english accent.</p>' +
				'<p>She leads the way upstairs, but this time she does not bend over.</p>'
			);
			if (perLilith.isCharmedBy("Sarah") && !this.checkFlag(12)) {
				md.write(
					'<p>At the top of the stairs Lauren hesitates and you hear her mutter "blood bitch", you are quite sure who she means and you ask her if everything is alright,</p>' +
					'<p>"No ' + perYou.getLord() + ' the foul monster is determined to be the only person in my Lady\'s life, not..not that it is my place to complain...but death is not how I wish to leave this time of servitude", she shakes her head, "Please, My Lady is waiting for you"</p>'
				);
			}
			
			// Questions
			startQuestions();
			addLinkToPlace(md, "follow her upstairs", 192);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 18) return this.showEventMansionEntry();
		
		var md, chc, perSarah, marea;
		
		if (sType == "endgame1lauren") {
			// End Game - Lauren
			md = WritePlaceHeader();
			this.showPerson("pregnantc.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Maids?");

			md.write(
				'<p>One day when you are visiting Sarah you notice her acting oddly almost jealously. She dismisses you and suggest you visit the guest room.</p>' +
				'<p>In the room you see Lauren standing there, showing her swollen pregnant belly. Given how possessive Sarah is of Lauren you now understand her odd attitude.</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
				
		if (Place == 269) {
			// Hotel Pool
			var perDonna = findPerson("Donna");

			if (sType == "lauren1") {
				// (Conspiracy Path) Pool Meeting 1
				md = WritePlaceHeader();
				this.place = 0;		// Leave the hotel after this scene
				movePerson("Sarah", 1);
				movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
				setPersonFlag("AdeleRoss", 1);
				setPersonFlag("Mom", 8);
				perYou.startQuest(6);	// Start quest to visit Sarah

				this.showPerson("lauren11b.jpg");
				addPlaceTitle(md, "Hotel Pool with Lauren");

				if (!isDay()) md.write('<p>The pool area is brightly lit by lighting scattered around, and ');
				else if (perDonna.place != 269) md.write('<p>The pool area ');
				else md.write('<p>');

				if (isDay() && perDonna.place == 269) md.write('Lauren gestures to follow her to a more discrete place away from anyone else. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
				else md.write('is fairly empty now but you both move to a more discrete place. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
				md.write(
					'<p> She is wearing a very revealing bikini, little more than fishnets, almost completely exposing her breasts and privates. Lauren sees you looking at her swimsuit and deeply blushes, but you also observe her nipples stiffen a little. She hesitantly speaks,</p>' +
					'<p>"My Mistr...My Lady told me to wear this, as an appropriate attire for her servant and as a gift to you. Please can we not dwell on it....", she hesitates before taking a deep breath and continuing,</p>' +
					'<p>"My Lady has asked me to warn you that it is very dangerous trying to summon the dead. Her family has extensive history dealing with the Veil and the creatures who try to cross into this world...very extensive...very..She says that without powerful wards it would be impossible to safely deal with the more powerful spirits like the ghost of a witch or warlock."</p>' +
					'<p>She pauses, and you think she is troubled by what she just talked about, maybe she has had personal experience with the dead in some way. She looks at you and moves her arms to modestly cover her breasts but the gesture just accentuates her breasts, drawing your attention to them.</p>' +
					'<p>"My Lady believes it is time for you to meet her, but it is a delicate thing to do this, you will not be able to openly visit in the daytime and <i>all</i> doors of the <b>mansion</b> are closed at night. My Lady tells me that umm...Serphoni...will be needed, but it will only work during the midnight hour, when the shroud protecting the mansion is thinnest. You must also use the side entrance from the Sacred Clearing'
				);
				if (!isPlaceKnown("SacredClearing")) {
					md.write(
						'"</p><p>You interrupt and ask where the Sacred Clearing is, you have heard of it but do not know exactly where it is. Lauren explains,</p>' +
						'<p>"It is an ancient ritual area to the west of the mansion" and she gives some brief directions before continuing, "I am surprised, My Lady seemed to assume you knew of that place but I digress... '
					);
					setPlaceKnown("SacredClearing");
				}

				md.write(
					'My Lady asks that you visit so you may trade things you have learned and so she can offer a ward against the dead."</p>' +
					'<p>You heard her say <b>mansion</b> and you ask if she means the Gate\'s Mansion, does her Lady live there? You were not aware anyone else lived there other than ' + perGates.getPersonName() + '. Maybe your mother has heard something?</p>' +
					'<p>She just nods her head, "Yes, and My Lady asks one thing of you, a gift in return for what she has given you...and..and..me. You must bring her a bottle of the finest wine. Please bring it with you when you visit....", she trails off, ' +
					'and does not say anything as she looks at you. She is hesitating, unable or unwilling to say anything more.'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Is there anything more?"', Place, 'type=lauren2');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "lauren2") {
				// (Conspiracy Path) Pool Meeting 2
				md = WritePlaceHeader();
				this.showPerson("lauren11c.jpg");
				addPlaceTitle(md, "Hotel Pool with Lauren");

				md.write(
					'<p>She blushes and adjusts her bikini top or at least the collection of strings that she is wearing and exposes her breasts completely. She stretches and says nervously,</p>' +
					'<p>"My..my..Lady has ordered...asked...me to tell you that I am to offer you any service you desire now I have delivered my message, <i>any desire</i>.."</p>' +
					'<p>She is clearly aroused but also very nervous, expecting and possibly wanting you to take her up on her offer of <i>any desire</i>, but also reluctant and uncertain.</p>'
				);
				startQuestions("Will you accept her offer?");
				addLinkToPlace(md, "certainly!", Place, 'type=lauren3');
				addLinkToPlace(md, "refuse and go to the Hotel Bar", 124, '', 'An odd mixture of expressions pass over Lauren&rsquo;s face as you refuse and start to leave, relief and disappointment. She softly says &quot;Thanks...I think&quot;');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "lauren3") {
				// (Conspiracy Path) Pool Meeting 3
				md = WritePlaceHeader();
				this.setFlag(11);
				perYou.addCorruption(1);
				this.showPerson(perYou.isMaleSex() ? "lauren11db.jpg" : "lauren11dg.jpg");
				addPlaceTitle(md, "Lauren\'s Service");

				md.write(
					'<p>It would seem rude to refuse your ally and Lauren seems aroused and wants this too, she is just nervous. You tell her that you desire her, that this has nothing to do with her Lady, it is just your desire for her. You do not think she really believes you, but accepts your words.</p>' +
					'<p>She removes more of her \'swimsuit\' and makes a little bit of a show for you. She is clearly nervous still and is a little awkward as she displays herself.</p>' +
					'<p>You take her, she is passionate if awkward and uncertain at times. She is no virgin but a little inexperienced and despite her nerves orgasms quite strongly.</p>' +
					'<p>After, as she redresses in more normal clothes, you remember that at times her skin felt odd, and you swear you saw a faint glow when she orgasmed. As you are looking at her she blushes again, curtsies,</p>' +
					'<p>"' + perYou.getLord() + ' I must return to My Lady now", and she leaves the pool area.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);
				return true;
			}			
			return false;
		}
		
		if (Place != 290) return false;
		
		if (sType == "nolanding") {
			// (Apprentice Path) Did not follow to Sarah sex scene
			md = WritePlaceHeader();
			this.setFlag(14);
			setPlaceKnown("MansionGuestRoom", false);
			this.showPersonDN("happy.jpg");
			addPlaceTitle(md, "Lauren\'s Thanks");

			md.write(
				'<p>Lauren turns back and looks at you with a very happy look on her face. She hesitates for a moment and then seems to reach a decision,</p>' +
				'<p>"If you want there is a guest room near My Ladies room, you could wait there for a short time for me to...attend...to her."</p>' +
				'<p>Quickly she takes you to the room and gestures at a small bell on the bedside table,</p>' +
				'<p>"Ring this when you want to return to My Lady. ' + perYou.getLord() + ' I must go and server her now", and she leaves theroom.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "check the room", 290);
			WritePlaceFooter(md);
			return true;
		}

		// Guest Room at the mansion
		if (sType == "charmlauren1") {
			// (Murder Path) Charm Lauren 1
			md = WritePlaceHeader();
			this.showPerson("lauren2.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Giving her a bit of a smirk, you cross your arms and speak the simple syllables, &quot;Dai Chu Lauren!&quot;</p>' +
				'<p>A look of confusion flashes momentarily across her face as the first wave of desire lightly rises up within ' +
				'her, the power of the magic slowly causing her body to warm in spite of herself. Her lips suddenly dry, she takes ' +
				'a slow moment to lick them before resuming her hard stare, though the icy edge has dulled from across it, ' +
				'&quot;Look, take yourself and your sneezes somewhere else and I\'ll just forget about this, all right?&quot;</p>' +
				'<p>Even as she says this, her eyes are losing some of their determination, slowly losing focus as the force of ' +
				'the magic swells up within her. The mana slowly eating away ' +
				'at her resistance, yet she struggles, fighting against the sudden urges, eyes flashing with a confused anger as ' +
				'the sensations penetrate into the walls of her self-control, making her grow hotter and hotter. Finally, in a ' +
				'voice that almost trembles she manages to force out a command: &quot;Leave now! ... please...?&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell her to show her panties", Place, 'type=charmlauren2');
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren2") {
			// (Murder Path) Charm Lauren 2
			md = WritePlaceHeader();
			this.showPerson("lauren7.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Sensing the tremor of uncertainty that had entered her voice, you decide to push things a bit further as you ' +
				'tell her to show you her panties. Almost immediately she balks, eyes flashing angrily at your outrageous demand ' +
				'while her body almost immediately turns and bends over, ' +
				'one hand sliding the skirt up. She wasn\'t wearing any panties ' +
				'underneath the abbreviated skirt. As she notices her actions, her eyes take a wild look, trying to force her ' +
				'hands to drop the skirt back down, only to find them resistant, not following her commands as they instead ' +
				'continue to hold it high giving you a nice, long show.</p>' +
				'<p>Finally, a slow smile builds across her face as the magic tightens its grip upon her mind, pulsing ' +
				'again, causing her to wonder what she had been so upset about to begin with.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell her to show you her breasts", Place, 'type=charmlauren3');
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren3") {
			// (Murder Path) Charm Lauren 3
			md = WritePlaceHeader();
			this.showPerson("lauren3.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Seeing that the magic has increased its control over ' +
				'her, you tell her to drop her skirt down once more, then remove her top and hop on the counter.</p>' +
				'<p>As her hands eagerly move to carry out your command, her face loses its happy smile, her mind struggling free ' +
				'of the magic holding it for a moment, trying to escape ' +
				'the building fires of lust and submission. And, surprisingly for one who spends her days in the service ' +
				'of another, she fights back harder than any other you have yet enthralled. Still, her fight doesn\'t stop her ' +
				'instincts to obey, heightened by the magic of your spell, ' +
				'from quickly following any task you give it, her voice the only sign that she still resists as she crawls up onto the ' +
				'granite, kneeling there in her light stockings as she begins to slowly pull off her uniform.</p>' +
				'<p>&quot;S-stop.... Please...&quot; her eyes water as her ' +
				'voice breaks into a half sobbing plea, &quot;Please don\'t do this to me... please...&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "order her to submit to you", Place, 'type=charmlauren4');
			addLinkToPlace(md, "exit the guest room", 192);

			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren4") {
			// (Murder Path) Charm Lauren 4
			md = WritePlaceHeader();
			this.showPerson("lauren8.jpg");

			addPlaceTitle(md, "Lauren");

			md.write(
				'<p>Her pleas fall on deaf ears as you become drunk with the tantalizing power you hold over her. Not even the ' +
				'wild pleading of her eyes reaches you, so lost is your mind in the sea of magic flowing from between your bodies. As ' +
				'you order her down upon all fours on the bed, you can see the magic asserting itself, the spell finalizing its hold upon her panicked mind.</p>' +
				'<p>Still slightly caught up in her own rebellion against the seemingly unstoppable force of the spell, she watches ' +
				'helplessly as you approach her. A broken groan escapes her lips as she finds herself responding to your touch, ' +
				'and she closes her eyes. Her body has already been lost to the ' +
				'crashing waves of sensation you send through her, pounding against her sense of self, slowly eroding it bit ' +
				'by bit, weakening her resolve as she grows slick with anticipation.</p>' +
				'<p>When you at last take her, the crash of pleasure carries away that last bit of resistance, smashing it ' +
				'into oblivion as she begins to return your use with a hungry enthusiasm, though when her eyes open again they carry of a note of resigned sadness.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}			
		
		if (sType == "laurenplay") {
			// Repeat sex scene
			chc = Math.floor(Math.random() * 3);
			md = WritePlaceHeader();
			if (chc === 0) {
				if (isMurderPath()) this.showPerson("lauren5-day.jpg");
				else this.showPersonDN("lauren5.jpg");
			} else if (perYou.isMaleSex()) this.showPersonRandomRorX("lauren9b", isExplicit() ? 3 : 2);
			else this.showPersonRandomRorX("lauren9g", isExplicit() ? 3 : 2);

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>"I am so proud to service you," claims the maid. She breathes faster as you take her in your arms. Without pause her lips meet yours to plunge her tongue into your mouth.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, "talk to Lauren", 290);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "laurentfplay") {
			// Repeat tf sex scene
			md = WritePlaceHeader();
			this.showPersonRandomRorX("sex-tf", isExplicit() ? 2 : 1);

			addPlaceTitle(md, "Service with her Breasts");
			md.write(
				'<p>"I am so proud to service you," claims the maid. She breathes faster as you take her in your arms. Without pause her lips meet yours to plunge her tongue into your mouth and then your cock between her breasts.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, "talk to Lauren", 290);
			WritePlaceFooter(md);
			return true;
		}		
		
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() && !isCharmedBy("Sarah") ? "endgame1lauren" : "";
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 4);
		addPlaceTitle(md, "Lauren's Dance");
		md.write(
			'<p>Lauren takes the stage dressed in a version of exotic dancing wear, not that she keeps it on for long!</p>' +
			'<p>Lauren is a surprisingly experienced dancer and her large breasts and agile moves greatly appeal to the audience. Lauren seems to like the audience approval but in an awkward way, she is a lot more focused on you than the general audience!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and Lauren deserves her tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	// She is tried to be fed on
	per.fedUponEvent = function(perV) {
		if (perV.uid == "tina") return false;
		// Vampyre tries to feed on her
		var md = WritePlaceHeaderNIP(false, "", "black");
		this.setFlag(13);
		showPopupWindow("Feeding on Lauren",
			this.addPersonString("feedon.jpg", "height:max%", "right") +
			"You ask Sarah to allow Lilith to feed on Lauren, she hesitates but agrees. Lilith approaches Lauren and unusually she tears off Lauren's skirt exposing her lovely rear. Lauren cries out,</p><p>" +
			(isMurderPath() ? '"Please, no my Lady, please" and you call Lilith back. Lauren looks fearful and a little aroused, but she definitely does not wish to be fed upon!' 
								 : '"No! Never by that bitch, never!" and you call Lilith back. Lauren looks somewhat disgusted but still a little aroused. She was unusually forceful in her refusal!') +
			'</p><p>You decide it would be best to not try to have Lilith feed on her again'
		);
		WritePlaceFooter(md);
		return true;
	};
	
	// Can you chat with Lauren
	per.showPersonChat = function(md)
	{
		if (Place == 269 && this.place == 269) addLinkToPlace(md, 'speak to Lauren', Place, 'type=lauren1');
		
		if (Place != 290 || !this.isHere() || sType !== "") return;
		
		if (!this.isCharmedBy()) {
			return;
		}
		
		// Charmed in the guest room
		addLinkToPlaceC(md, "ask Lauren for service", 290, 'type=laurenplay');
		if (perYou.isMaleSex()) addLinkToPlaceC(md, "ask Lauren for service with her breasts", 290, 'type=laurentfplay');

		this.addSleepLink(md, "go to bed for the night", "Sleeping with some Service",
			'<p style="position:absolute;left:25%;top:15%;cursor:pointer;font-size:1.1em;width:50%">' +
			'You start to prepare for bed and as you do you see the maid Lauren silently start to remove her clothing and their lies on the bed awaiting you, ready to serve you however you wish.', 
			Math.random() < 0.5 ? "lauren-bed1.jpg" : "lauren-bed2.jpg", true
		);
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Pool
			if (Place == 269 && this.place == Place) {
				addComments('You attempt to cast the spell on Lauren, but it does nothing as if Lauren cannot be affected by the spell.');
				return 'handled';
			}
			// Guest Room @ Gates Mansion (the maid)
			if (Place == 290) {
				if (isMurderPath()) {
					CastCharmSpell("Lauren", Place, 4, 'type=charmlauren1');
					return "handled";
				}
				else if (getQueryParam("type") == "escort") {
					// Lauren
					if (nMana > 9) {
						dispPlace(Place, "type=escort&charm=yes");
						return "nofooter";
					} else addComments('You do not have enough mana to cast the spell.');
				} else addComments('You recite the spell.... but it fizzles.');
				return "handled";
			}
			if (Place == 192 && sType.indexOf("gameslauren") != -1) {
				// Lauren
				if (this.isCharmedBy()) addComments(this.addPersonFace() + 'You have already <i>Charmed</i> ' + this.getPersonNameShort() + '.');
				else if (nMana > 9) {
					ClearComments();
					dispPlace(Place, "type=&charm=yes");
					return "handled";
				} else addComments('You do not have enough mana to cast the spell.');
				return "handled";				
			}
			
			if (Place == 18) {
				var marea = getQueryParam("area");
				var ws = wherePerson("Sarah");
				var so = getPersonOther("Sarah");
				if (marea == "appear") {
					addComments('You attempt to cast the spell on the maid Lauren, but it does nothing as if she cannot be affected by the spell.');
					return "handled";
				} else if ((ws == 17 && so == 101) || marea == "locked") {
					// Lauren initial meeting (completely uncharmable)
					addComments('You attempt to cast the spell the maid starts to react but then she shakes her head and touches a ring on one of her fingers. You realise she is protected in some way, a weak protection, but sufficient.');
					return "handled";
				} else {
					// Is Lauren here
					if (ws == 192 && (sType == "landing") || (so == 110 || so == 114 || so == 117 || so == 120)) {
						if (!(this.checkFlag(8) || perGates.checkFlag(3))) addComments('You attempt to cast the spell the maid starts to react but then she shakes her head and touches a ring on one of her fingers. You realise she is protected in some way, a weak protection, but sufficient.');
						else if (this.isCharmedBy()) addComments(this.addPersonFace() + 'You have already <i>Charmed</i> ' + this.getPersonNameShort() + '.');
						else if (nMana > 9) {
							dispPlace(Place, "type=" + sType + "&charm=yes");
							return "nofooter";
						} else addComments('You do not have enough mana to cast the spell.');
						return "handled";
					}
				}
				addComments('You attempt to cast the spell, but it fizzles.');
				return "handled";
			}
		}
		
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() { return false; };
}