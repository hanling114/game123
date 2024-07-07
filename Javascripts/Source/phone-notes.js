/**********************************************************************************
Your Phone's Notes
***********************************************************************************/

function getPhoneNotes(stype)
{
	var vis = perYou.extra[1];
	perYou.extra[1] = 0;
	
	var perSarah = findPerson("Sarah");
	
	var tnm = gameState.sTown;
	var ha = Math.round(0.072 * getHeight(document));
	var wtab = 5;
	if (!gameState.bPhoneLandscape || isScreenSmall()) wtab = 10;
	var iu = isScreenSmall() ? 'vw' : 'vh';

	function showQuestF(started, comp, desc, nobr, failed, desccomplete, hdr) {
		if (!started) return '';
		if (comp) {
			var ar = desccomplete != undefined ? desccomplete : desc;
			ar = ar.split('&nbsp;');
			ar[ar.length - 1] = '<span style="' + (hdr === true ? 'position:relative;top:0.25em;font-weight:bold;' : '') + 'text-decoration:line-through">' + ar[ar.length - 1] + '</span> ' + (failed === true ? '&#10006;' : '&#10004;');
			desc = ar.join('&nbsp;');
		} else if (hdr === true) desc = '<span style="position:relative;top:0.25em;font-weight:bold">' + desc + '</span>';
		if (nobr !== true) return desc + '<br>';
		return desc;
	}
	function showQuestFI(started, comp, desc, nobr, failed, desccomplete, hdr) {
		return showQuestF(started, comp, '&nbsp;&nbsp;&nbsp;' + desc, nobr, failed, desccomplete === undefined ? desccomplete : '&nbsp;&nbsp;&nbsp;' + desccomplete, hdr);
	}
	function showQuestFH(st, comp, desc, nobr, failed, desccomplete) { return showQuestF(st, comp, desc, nobr, failed, desccomplete, true); }
	function showQuestH(no, desc, failed, desccomplete) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, true); }
	function showQuest(no, desc, failed, desccomplete, hdr) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, hdr); }
	function addHeader(txt, s) {
		if (s !== undefined) {
			if (s === '') return '';
		} else s = '';
		return '<span style="position:relative;top:0.25em;font-weight:bold">' + txt + '</span><br>' + s;
	}
	
	// Notes header
	var sp = '';
	var s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
		'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46;border-style:none">' +
		'<div style="position:absolute;top:0px;left:0px;background-color:lightsteelblue;width:' + (wtab + 2) + '%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
		'<div style="position:absolute;top:0px;left:0px;background-color:lightblue;width:90%;height:92%;margin-left:' + (wtab + 4) + '%;margin-top:2%;"></div>' +
		"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
		addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%");
		
	if (!isScreenSmall()) s +=	'<span class="zoom-icon" style="position:absolute;top:0px;right:25px;width:7%;height:5%"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>';
	s += '<div id="notdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 1) + 'px -4px ' + ha + 'px ' + (wtab + 5) + '%;height:85vh;width:' + (isScreenSmall() ? "81" : (gameState.bPhoneLandscape ? "86" : "81")) + '%;overflow:auto;color:black">';
	
	// Notes in your phone
	if (stype === "notes1") {
		// Personal Notes
		s += getLSD(gameState.bPhoneLandscape || isScreenSmall() ? "20%" : "35%", 'margin-right:0.2em;') +
			  '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Personal Details:</p>' +
		     '<b>Name, Address</b><br>' + perYou.getPersonName() + ", 16 Kollam St, " + tnm + ", " + (isBritish() ? "UK" : "USA") + "<br>";
		
		if (perYou.getPersonGender() == "futa") s += "I am neither male or female, I am a fully functioning hermaphrodite.<br>";
		else s += "I am a " + perYou.getSex() + '.<br>';
		if (perYou.checkFlag(65)) s += "My family is descended from a renowned witch. I regenerate 10 mana per day.<br>";

		s += addHeader("Money");
		// Owe Mom money
		if (perYou.getBankBalance() !== 0) {
			s += "I have an account at the bank 'Friendly Loan Company'<br>" +
			     'I have ' + sCurrency + (perYou.getBankBalance() - 1) + ' in my account.<br>';
			var accountMax = perYou.checkFlag(9) ? -1 : (Math.floor(nTime / 288) > 30 ? -1 : 200);
			if (accountMax === -1) s += "There is no limit on my bank account.<br>";
			else s += "I can only deposit up to " + sCurrency + accountMax + " in my bank account.<br>";
		} else s += 'I do not currently have a bank account<br>';
		if (checkPersonFlag("Kristin", 13)) s += "I have a low-limit credit card.<br>";
		if (nMoney < 0) s += "I owe Mom " + sCurrency + Math.abs(nMoney) + " and will pay her back when I get some money.<br>";
		
		findPerson("MissLogan");
		sp = ''
		if (per.checkFlag(9)) sp += 'I have to do the neurology assignment for Miss Logan. I should check with her for more details.<br>';
		else if (per.checkFlag(8)) sp += 'I have to do the reproductive assignment for Miss Logan. I should check with her for more details.<br>';
		s += addHeader("School", sp);
		
		sp = '';
		if (checkPlaceFlag("Hospital", 4)) sp += "I have a key to the old hospital basement.<br>";
		if (checkPlaceFlag("Park", 5)) sp += "I have a key to the construction site.<br>";
		if (isCharmedBy("Ash")) sp += "I have a key to the construction site's office.<br>";
		if (isPlaceKnown("CharliesHouse")) sp += "I have a key to Charlie\s home.<br>";
		if (isCharmedBy("Hannah")) sp += 'I have a key to Hannah\'s apartment.<br>';
		if (getCharmedLevel("Leanne") == 4) sp += 'I have a key to Leanne\'s home.<br>';
		if (isPlaceKnown("MelissasApartment")) sp += "I have a key to Melissa\s home.<br>";
		if (isPlaceKnown("PrincipalsHome")) sp += "I have a key to Ms. Reagan\s home.<br>";
		s += addHeader("Keys", sp);
		
		s +=	'<br></div>'+		
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes2") {
		// Quests
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Things to do:</p>';

		if (perYou.getExperience() > 0) s += showQuest(4, "Find the Book, " + perGates.getPersonName() + " has it, I need to take a taxi there");
		else s += showQuest(4, "Find the Book");
		if (perYou.FindItem(1) > 0) s += '&nbsp;&nbsp;&nbsp;I have Mr. Beasley\'s paper, I should go a study it somewhere, maybe the library?<br>';

		if (!(isConspiracyPath() && !perSarah.checkFlag(3))) s += showQuest(1, (isMurderPath() || isConspiracyPath() ? "Where can I find mana" : "Find a magic stone for " + perGates.getPersonName()) + (perYou.isQuestComplete(1) ? "" : (findPerson("MrBeasley").other >= 3 ? ", Mr Beasley says to check the stones in the Wild Ranges." : ", maybe Mr. Beasley can help?")));
		if (isMurderPath()) s += showQuestF(perYou.isQuestStarted(1), perYou.FindItem(11) > 0, "How do I learn spells from the Book");
		s += showQuest(2, "Find an old key for " + perGates.getPersonName());
		s += showQuest(3, "Find a Magic Gem");
		s += showQuestF(getPersonOther("Mayor") > 0, getPersonOther("Mayor") > 3, "Get an appointment with Mayor Thomas");
		
		if (checkPersonFlag("Bambi", 7)) {
			findPerson("Mia");
			if (!per.isCharmedBy()) {
				var dc = Math.floor((nTime - per.charmedTime) / 288);		// Days charmed/since arrived
				showQuestFH(true, false, "Charm Mia after " + (7 - dc) + " days (or sooner)");
			} else showQuestFH(true, per.isCharmedBy(), "Charm Mia");
		}		
		
		if (perDavy.other > 0) {
			s += addHeader("Davy");
			s += "&nbsp;&nbsp;&nbsp;Davy Robbins and Mr. Beasley?<br>";
			if (perDavy.checkFlag(9)) s += "&nbsp;&nbsp;&nbsp;That bastard tried to hurt me!!!<br>";
			if (isMurderPath() && perGates.other == 600) s += '&nbsp;&nbsp;&nbsp;Davy\'s woman killed ' + perGates.getPersonName() + '<br>';
			s += showQuestFI(checkPlaceFlag("Hotel", 8), getPersonOther("Jessica") > 0, "Find out what Davy wanted in the Hotel Cellar");
			s += showQuestFI(true, isDavyDefeated(), perDavy.checkFlag(6) ? "Davy has Fled " + tnm : "Defeat Davy");
			if (isDavyCaptive()) {
				s += showQuestFI(true, false, "Davy is my captive!");
				s += showQuestFI(true, perDavy.isCharmedBy(), "Charm Davy");
			}
		}
		
		if (checkPersonFlag("Hannah", 8) && wherePerson("Camryn") !== 0) {
			findPerson("Camryn");
			s += addHeader("Rescue Camryn");
			s += showQuestFI(true, per.place != 801, "Possess Camryn");
			if (per.checkFlag(21) && !per.checkFlag(22)) s += showQuestFI(true, per.checkFlag(22), "Report to the Police");
			if (per.place == 457) s += showQuestFI(true, per.isCharmedBy(), "Charm Camryn");
		}
		
		if (checkPersonFlag("Jade", 1)) {
			findPerson("Jade");
			s += addHeader("Charm Jade");
			s += showQuestFI(true, per.isCharmedBy(), "Charm Jade");
			if (per.checkFlag(2))  s += "&nbsp;&nbsp;&nbsp;She has a <i>contract</i> that protects her<br>";
			if (per.checkFlag(17)) s += "&nbsp;&nbsp;&nbsp;Her protection is weaker outside of her room but still present<br>";			
		}		
		
		if (perKurndorf.getQuestSeance() >= 16) {
			s += addHeader('Jessica');
			findPerson("Jessica");
			s += showQuestF(true, perKurndorf.getQuestSeance() >= 50, "&nbsp;&nbsp;&nbsp;Summon the ghost of Kurndorf");
			if (!per.isRival()) {
				// Bound in cellar/ally
				var riv = per.getRivalry();
				if (riv >= 0) s += showQuestFI(isDemonFreed(), per.whereNow() != 161, "Free Jessica from the bindings");
				else s += showQuestFI(true, true, "Jessica is my " + (riv == -1 ? "prisoner" : 'witch-toy'));
			} else {
				// Rival
				s += showQuestFI(true, false, "Jessica is free, but is she a friend?");
			}
		}
		
		if (isDemonFreed()) {
			s += showQuestFH(isDemonFreed(), isDemonQuestDone(), "Deal with Legion");
			if (!isSpellKnown("Clairvoyance")) s+= "&nbsp;&nbsp;&nbsp;Learn a spell to help find Legion<br>";
			else if (isSpellKnown("Hydromancy") && !isDemonQuestDone()) s += showQuestFI(true, gameState.perTown.checkFlag(71), "cast hydromancy maybe it will help find Legion?");
			findPerson("Desiree");			
			s += showQuestFI(per.getQuestRelic() > 0, per.getQuestRelic() >= 100, "Get a Catholic Relic for Legion");
		}	
		
		s += showQuestFH(perKurndorf.getQuestGhost() >= 100, perKurndorf.getQuestRitual() >= 200, "Perform the Ritual for Kurndorf");
		if (perKurndorf.getQuestGhost() >= 100) {
			s += showQuestFI(true, perKurndorf.getQuestRitual() >= 200, "Use these in prison. Needed:", true);
			//s += '&nbsp;&nbsp;&nbsp;Use these in prison. Needed: ';
			s += showQuestF(true, perKurndorf.checkFlag(17), "Chalk", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(15), "Candles", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(12), "Chalice", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(13), "Quartz Crystal", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(14), "Silver Dagger", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(11), "Salt", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(16), "Hemlock", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(8), "Human Skull", true) + ', ';
			s += showQuestF(true, perYourBody.FindItem(56) > 0 || perKurndorf.getQuestRitual() >= 200, "Lock of your hair", true) + ', ';
			s += showQuestF(true, perYourBody.FindItem(4) > 0, "The Book");
			if (checkPlaceFlag("Crypt", 2)) s += showQuestF(true, isPlaceKnown("KurndorfsCrypt"), "&nbsp;&nbsp;&nbsp;Kurndorf's crypt is in a remote wild and magical place, protected by a stone tablet");
			if (perYou.getQuestAftane() >= 60 && !isMurderPath()) showQuestFI(true, perKurndorf.getQuestRitual() >= 200, perGates.getPersonName() + " said to use a piece of Kurndorf's own skull");
		}
		
		findPerson("Leanne");
		s += showQuestH(5, "Save Leanne", per.isCharmedBy("Demon"));
		var bRitualReturn = per.checkFlag(8);
		if (perYou.isQuestStarted(5) && !perYou.isQuestComplete(5) && bRitualReturn) {
			s += showQuestFI(true, !per.isCharmedBy("Demon"), "Needed: ", true);
			//s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, perYourBody.FindItem(48) !== 0 || perYou.isQuestComplete(5), "Possess the soul (in the relic)", true) + ', ';
			s += showQuestF(true, checkPersonFlag("Victoria", 9) || checkPersonFlag("Vampyre", 2), "Mirror of Souls", true) + ', ';
			s += showQuestF(true, whereItem(35) !== 0, "Dragon Gem", true) + ', ';
			s += showQuestF(true, whereItem(35) == -53, "Dragon Gem Bound", true) + ', ';
			s += showQuestF(true, perYou.checkFlag(21), "Can Teleport another person", true) + ', ';
			s += showQuestF(true, isPlaceAttuned(53), "Attuned the Hidden Room for teleporting", false);
		}
		
		if (perJesse.getDemonPath() >= 150) {
			var perLucy = findPerson("Lucy");
			s += showQuestFH(true, perLucy.isCharmedBy(), "Lucy");
			s += showQuestFI(true, perLucy.isCharmedBy(), "Lucy is a thrall of Legion");
		}	

		if ((perSarah.isCharmedBy() && isMurderPath()) || (perSarah.other > 39 && perSarah.other < 51) || (isConspiracyPath() && perYou.isQuestStarted(6))) s += addHeader(isConspiracyPath() && !perYou.isQuestComplete(6) ? 'Noble Ally' : 'Sarah');
		if (isConspiracyPath()) {
			s += showQuestH(6, "Visit 'Noble Ally', serphoni, midnight, Sacred Clearing");
			if (perYou.isQuestStarted(6) && !perYou.isQuestComplete(6)) {
				s += '&nbsp;&nbsp;&nbsp;Needed: ';
				findPerson("Bambi");
				if (per.checkFlag(5)) s += showQuestF(true, perYou.getQuestRustyKey() >= 999, "Find the Key (Park)", true) + ', ';
				s += showQuestF(true, perYou.FindItem(40) > 0, "Bottle of Fine Wine");
			}
		}		
		if (perSarah.isCharmedBy() && isMurderPath()) {
			findPerson("Lauren");
			s += showQuestF(true, per.flags[0] > 0 || whereItem(40) == 192 , "&nbsp;&nbsp;&nbsp;Give Sarah a fine bottle of wine");
		}
		
		if (perLilith.other > 1) {
			// Lilith
			s += showQuestFH(perYou.checkFlag(12), perLilith.isCharmedBy(), perLilith.other >= 3 ? "Vampyre" : "Undead?");
			s += showQuestFI(true, perLilith.other >= 3, "Investigate the undead rising. Maybe check the graveyard at night?");
			if (perLilith.other > 39 && perLilith.other < 51) s += showQuestFI(true, perLilith.other >= 51, "Sarah needs you to protect her within the next " + (51 - perLilith.other) + " days.");
			else if (perLilith.other == 51) s += showQuestFI(true, perLilith.other >= 51, "Sarah needs you to protect her <b>tonight</b>");
			else if (perLilith.other == 60) s += '&nbsp;&nbsp;&nbsp;Find and deal with the Vampyre as soon as you can, daytime would be best! Possibly in a tomb or graveyard?<br>';
			if (perLilith.other >= 60) s += '&nbsp;&nbsp;&nbsp;The Sacred Clearing is now <b>dangerous</b> at night!<br>';
			if (perLilith.isCharmedBy("Sarah")) s += "&nbsp;&nbsp;&nbsp;Sarah has control of the vampyre Lilith<br>";
		}
		
		if (perYou.checkFlag(12)) {
			s += showQuestFH(perYou.checkFlag(12), perYou.checkFlag(25), "Learn hypnosis techniques");
			s += showQuestFI(true, perYou.checkFlag(24) && perYou.checkFlag(25), "Needed: ", true);
			//s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, perYou.checkFlag(24), "Study the basics, find a book on hypnosis", true) + ', ';
			s += showQuestF(true, perYou.checkFlag(25), "Learn from Mr. Beasley (" + (perYou.canUseExperience(true) ? "experience available" : "more experience needed") + ")");
		}
		
		findPerson("Kate");
		if (per.place != 47) {
			sp = '';
			if (per.place == 9999) sp += '&nbsp;&nbsp;&nbsp;Kate has left ' + tnm + ' forever!!<br>';
			else {
				if (per.place === 3) sp += '&nbsp;&nbsp;&nbsp;Remember to meet Kate to study in the library<br>';
				if (per.checkFlag(36) && !per.checkFlag(7)) sp += '&nbsp;&nbsp;&nbsp;I would like to see her holiday photos<br>';
				if (per.checkFlag(36) && per.checkFlag(7) && per.checkFlag(8) && !per.checkFlag(9)) sp += '&nbsp;&nbsp;&nbsp;Where is the other photo album?<br>';
				if (per.checkFlag(24) && per.place == 1000) {
					if (per.checkFlag(16)) sp += '&nbsp;&nbsp;&nbsp;Kate is unsure about me, I just have to wait for her to decide<br>';
					else sp += '&nbsp;&nbsp;&nbsp;Kate is unsure about me. Where is she? Maybe ask her mother<br>';
				}
			}
			s += addHeader('Kate', sp);
		}
		findPerson("MrsGranger");
		if (per.other >= 2) {
			s += addHeader("Mrs Granger");
			s += showQuestFI(true, per.other >= 2.2, per.other < 2.2 ? "Mrs Granger is investigating the Wild Ranges." : "Mrs Granger investigated the Wild Ranges.");
			if (per.other == 5) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is looking for the Dragon Gem at the Museum.<br>';
			else if (Math.floor(per.place) == 275 || per.place == 278) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in the hospital.<br>';
			else if (per.place == 261) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in jail!<br>';
		}	
		
		findPerson("Miku");
		if (per.other < 0) {
			showQuestFH(true, per.isCharmedBy(), "Charm Miku");
			s += addHeader("Miku");
			if (per.other <= -1) s += showQuestFI(true, per.other < -1, "Research bloodlines");
			if (per.other < -1) s += showQuestFI(true, per.other <= -10, "Speak to the Gates family");
			if (per.other <= -20) s += showQuestFI(true, per.other == -100, "Transform Miku and charm her");
		}
		
		findPerson("MissLogan");
		if (per.checkFlag(8) || per.checkFlag(9)) {
			s += showQuestFH(true, per.getCharmedLevel() > 1, "Miss Logan");
			s += showQuestFI(true, per.checkFlag(17), "I should visit Miss Logan in the Anatomy Classroom ");
			if (per.isNeuro()) {
				s += showQuestFI(true, per.checkFlag(11), "check her tablet computer");
				if (per.checkFlag(11)) s += showQuestFI(true, per.getCharmedLevel() > 1, "hypnotically refocus her obsession on me");
			}
		}	
		
		var perAdele = findPerson("AdeleRoss");	
		if (perYou.isQuestStarted(8) || (perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))))) {
			findPerson("Catherine");
			s += showQuestH(true, "Ross Sisters", false);
			// Catherine
			if (per.checkFlag(4)) s += showQuestFI(true, per.checkFlag(5), "Wait for Catherine at the construction site at midday and call her");
			if (per.checkFlag(5)) s += showQuestFI(true, per.checkFlag(10), "Wait for Catherine's call");			
			// Adele
			s += showQuestF(perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))), perAdele.place != 16, "&nbsp;&nbsp;&nbsp;Get rid of Adele, the Police guard at the mansion");
			if (per.checkFlag(10) && !perAdele.checkFlag(6)) s += showQuestFI(true, false, "Visit Adele and charm her");
			if (perAdele.checkFlag(8)) s += showQuestFI(true, perAdele.isCharmedBy(), "Charm Adele again (need hypnotic technique)");			
			// Amy
			var perAmy = findPerson("AmyRoss");
			var perCharlie = findPerson("Charlie");
			s += showQuestFI(true, perCharlie.checkFlag(3), "Find Amy", undefined, undefined, "Find Amy - at Gym");
			s += showQuestFI(perCharlie.checkFlag(5), perCharlie.other >= 3, "Convince Charlie", true);
			if (perCharlie.other < 3 && perCharlie.checkFlag(5) && (perCharlie.checkFlag(6) || perCharlie.checkFlag(7) || perCharlie.checkFlag(8))) {
				s += 'by: ';
				if (perCharlie.checkFlag(6)) s += "have <b>her</b> arrested" + (perCharlie.checkFlag(7) || perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(7)) s += "disciplined by Bambi" + (perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(8)) s += "hypnosis";
				s += '<br>';
			} else if (perCharlie.checkFlag(5)) s += '<br>';
		}		
		
		if (perJesse.getDemonPath() >= 50) {
			var perSera = findPerson("Seraphina");
			s += showQuestFH(true, perSera.isCharmedBy(), "Seraphina");
			if (perSera.isCharmedBy("Demon")) s += showQuestFI(true, perSera.isCharmedBy("Demon"), "Free Seraphina, a thrall of Legion");
			else s += showQuestFI(true, perSera.isCharmedBy(), "Seraphina is freed from Legion", undefined, undefined, "Seraphina is charmed by me");
			s += showQuestFI(perSera.checkFlag(2), perSera.place != 282, "Seraphina is at the Avernus club", undefined, undefined, "Seraphina was at the Avernus club");
			s += showQuestFI(checkPersonFlag("Jade", 13), perSera.checkFlag(9), "Jade will agree to give her to me if I get someone to dance at the club for free");
			
		}

		findPerson("Sofia");
		if (perYou.isQuestStarted(7)) {
			s += showQuestH(7, "Charm " + per.name, per.whereNow() == 999);
			if (!perYou.isQuestComplete(7)) {
				s += showQuestF(true, per.checkFlag(11), "&nbsp;&nbsp;&nbsp;Find someone who can tell you more about " + per.name);
				if (isMurderPath()) {
					if (per.checkFlag(13)) s += showQuestFI(true, per.checkFlag(14), "Discuss your plan with someone who has authority");
					if (per.checkFlag(14)) s += showQuestFI(true, per.checkFlag(15), "Break into Sofia’s office and search for clues against her (only between 8-10 AM)");
					if (per.checkFlag(15)) s += showQuestFI(true, perYou.isQuestComplete(7), "Return to Kerry Batton with the information you have collected on Sofia");
				} else {
					s += showQuestFI(per.checkFlag(26), per.checkFlag(14), "Ask someone at the church for help");
					s += showQuestFI(per.checkFlag(14), per.checkFlag(13), "Ask someone at the church for help");
					s += showQuestFI(per.checkFlag(15), per.checkFlag(14), "Call Sister Desiree to pickup the Bible");					
				}
			}
		}
		
		var perMom = findPerson("Mom");
		findPerson("Gabby");
		if (perMom.checkFlag(34)) {
			s += addHeader("Mom and Gabby");
			s += showQuestFI(true, per.checkFlag(3) || per.checkFlag(4), "What is happening between Mom and Gabby");
			if (per.checkFlag(3) || per.checkFlag(4)) {
				s += showQuestFI(true, per.checkFlag(8) || per.checkFlag(10), "Find out about the necklace");
				if (perMom.place == 1000) s += "&nbsp;&nbsp;&nbsp;Mom and Gabby ran away together (BAD END)";
				else if (per.checkFlag(10)) {
					// Apprentice/Conspiracy
					if (!per.isCharmedBy()) {
						if (per.checkFlag(13)) s += showQuestFI(true, false, "Missed the press conference");
						else s += showQuestFI(true, false, "Attend the press conference " + (per.checkFlag(23) ? "today" : "tomorrow") + " at 6pm");
					} else s += showQuestFI(true, true, "Attend the press conference");
				}
				s += showQuestFI(true, per.isCharmedBy(), "Charm Gabby");
			}
		}
		
		findPerson("Brandi");
		if (per.checkFlag(4)) {
			s += showQuestFH(true, per.isCharmedBy(), "Aunt Brandi");
			s += showQuestFI(true, isPlaceKnown("AuntsHouse"), "I need to ask Mom so I can visit Kylie and Aunt Brandi\'s home");
			s += showQuestFI(per.checkFlag(7), per.isCharmedBy(), "Why can\'t I charm Aunt Brandi?");
			if (per.checkFlag(15)) {
				if (!per.checkFlag(17)) s += showQuestFI(true, per.checkFlag(16), "Watch Aunt Brandi teaching tennis");
				if (!per.checkFlag(16)) s += showQuestFI(true, per.checkFlag(17), "Arrange to be on one of her dates with Mom");
				if (per.checkFlag(18)) {
					s += "&nbsp;&nbsp;&nbsp;Aunt Brandi is a nymphomaniac<br>";
					s += showQuestFI(true, per.checkFlag(22), "Tease her with Kylie 1");
					s += showQuestFI(true, per.checkFlag(23), "Tease her with Kylie 2");
					s += showQuestFI(true, per.checkFlag(24), "Tease her with Kylie 3");
				} else if (per.checkFlag(19)) {
					s += "&nbsp;&nbsp;&nbsp;Aunt Brandi is exceptionally strong willed<br>";
					if (perYou.checkFlag(25)) {
						s += showQuestFI(true, per.checkFlag(21), "Try to hypnotise Aunt Brandi");
						if (per.checkFlag(21)) {
							s += showQuestFI(true, per.checkFlag(22), "Teach Kylie hypnosis 1");
							s += showQuestFI(true, per.checkFlag(23), "Teach Kylie hypnosis 2");
							s += showQuestFI(true, per.checkFlag(24), "Teach Kylie hypnosis 3");
						}
					}
				}
			}
		}
		
		if (gameState.perTown.checkFlag(67)) {
			// Elian, had the initial hydromancy vision
			findPerson("Elian");
			s += addHeader(per.checkFlag(1) ? 'Elian' : 'Demonic Visions');
			if (!per.checkFlag(1)) s += '&nbsp;&nbsp;&nbsp;That vision of the demon was real and she wants me! Maybe she will come for me in my dreams.<br>';
			else {
				if (!per.checkFlag(2)) {
					s += "&nbsp;&nbsp;&nbsp;You could teleport from the Sacred Clearing anytime at night to Elian.<br>";
					if (perJade.checkFlag(7)) s += "&nbsp;&nbsp;&nbsp;Jade says to reverse her name when using teleport to weaken her power.<br>";
				} else s += "&nbsp;&nbsp;&nbsp;I survived meeting Elian, this time!<br>";
				if (per.checkFlag(9)) s += '&nbsp;&nbsp;&nbsp;Rachael is Elian!<br>';
				if (per.checkFlag(14)) {
					s += "&nbsp;&nbsp;&nbsp;Elian's true name is: Elian" + (per.checkFlag(15) ? 'Iscariot' : '') + (per.checkFlag(16) ? 'Agos' : '') + (per.checkFlag(17) ? 'Omi' : '') + (per.checkFlag(18) ? 'Sayla' : '...') + '<br>';
					s += showQuestFI(true, per.checkFlag(18), "Elian's Challenges, I need defences!");
					s += showQuestFI(true, per.checkFlag(15), "&nbsp;&nbsp;&nbsp;Kiss her");
					s += showQuestFI(per.checkFlag(20), per.checkFlag(16), "&nbsp;&nbsp;&nbsp;Touch her");
					s += showQuestFI(per.checkFlag(21), per.checkFlag(17), "&nbsp;&nbsp;&nbsp;Lick her");
					s += showQuestFI(per.checkFlag(22), per.checkFlag(18), "&nbsp;&nbsp;&nbsp;Fuck her");
					s += showQuestFI(per.checkFlag(26), per.isCharmedBy(), "Enter a contract with Elian");
					if (per.isCharmedBy()) {
						s += "&nbsp;&nbsp;&nbsp;Elian is bound by a pact ";
						if (per.getCharmedLevel() == 4) s += "as your demon servant and seductress. You must pay 10";
						else if (per.getCharmedLevel() == 2) s += "and is your love-slave until you end the pact. You must pay 5";
						else s += "and is you demon bride. The pact cannot be ended but with a minimal cost of 1 mana per day if available.<br>";
						if (per.getCharmedLevel() != 3) s += ' mana per day to maintain the pact. If you do not have the mana at dawn the pact is ended and she will take one of your slaves.<br>';
						s += "&nbsp;&nbsp;&nbsp;You can visit her lair <b>anytime</b> using the teleport spell for no mana cost<br>";
					} else if (per.checkFlag(26)) {
						if (per.place == 9999) s += "&nbsp;&nbsp;&nbsp;You have told Elian to leave you alone and never return to Glenvale.<br>";
						else s += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You could teleport from the Sacred Clearing anytime at night to Elian using her true name.<br>";
					}
				}
			}
		}
		
		findPerson("Ursula");
		if (per.checkFlag(13)) {
			s += showQuestFH(true, per.isCharmedBy(), per.checkFlag(4) ? "Ursula" : per.checkFlag(1) ? "Melin?" : "Investigator?");
			s += showQuestFI(true, per.checkFlag(4), "Find out information on Melin");
			s += showQuestFI(true, per.checkFlag(7), "Visit Ursula at home on Parkview Rd");
		}
		
		findPerson("Zali");
		if (per.place == 220 && checkPersonFlag("Miku", 39)) {
			var perM = findPerson("Miku")
			findPerson("Zali");
			s += showQuestFH(true, per.isCharmedBy(), per.checkFlag(1) ? "Zali" : "Cat Lady");
			s += showQuestFI(true, perM.checkFlag(39), "Meet Miku at the park");
			s += showQuestFI(true, per.checkFlag(1), "What is her name?");
		}
		
		s += '<br></div>' +		
				'<span class="zoom-icon" style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(10' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes3") {
		// Magic Notes
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Magic:</p>';
		s += showQuest(4, "Find the Book");
		if (findPerson("MrBeasley").other >= 3) s += "Mana can be found in special stones" + (isCharmedPath() && perYou.isQuestComplete(1) ? ' and you use them at the Wild Ranges' : '') + '<br>';
		if (perYou.checkFlag(11)) s += "The book seems to glow red when I can learn a new magical training<br>";
		if (checkPersonFlag("MrsGranger", 17)) s+= 'The Wild Ranges have long been a center of magical cults<br>';
		if (getPersonOther("Vampyre") >= 60) s += 'The Sacred Clearing is now <b>dangerous</b> at night!<br>';
		if (perYou.checkFlag(10)) s += 'Use magic stones in the Wild Ranges to get mana<br>';
		if (getPersonOther("Tina") > 3) s += 'Tina can drain the mana powering spells<br>';
		if (checkPersonFlag("Tina", 2)) s += 'Witches bear a mark visible only to other witches, a small tattoo like mark<br>';
		if (whereItem(35) == -53) s += 'The Hidden Room is a place of power<br>';
		if (checkPlaceFlag("Park", 6)) s += "I saw strange symbol that frightened me<br>";
		if (isCharmedBy("Ghost")) s += "Ghosts can be a source of mana<br>";
		if (perYou.checkFlag(68)) s += 'Spells are stronger when cast in a place of power<br>';

		// Magic Experience
		sp = '';
		if (perYou.checkFlag(26)) sp += "I have fine control over the charm process<br>";
		if (perYou.checkFlag(17)) sp += "Expensive spells are 1 to 2 points cheaper<br>";
		if (perYou.checkFlag(18)) sp += "I can use Mana to block spells cast on me, I need at least 20 mana to do it<br>";
		if (perYou.checkFlag(19)) sp += "I can charm men as well as women<br>";
		if (perYou.checkFlag(20)) sp += "I get more mana from magic stones<br>";
		if (perYou.checkFlag(21)) sp += "I can use teleport to more places and I can carve hexagrams<br>";
		if (perYou.checkFlag(22)) sp += "The Wealth spell gives more money for me<br>";
		if (perYou.checkFlag(23)) sp += "I can charm spirits and ghosts<br>";
		if (perYou.checkFlag(27)) sp += "I know the tricks of deciphering spells<br>";
		if (perYou.checkFlag(28)) sp += "I can stay invisible for longer<br>";
		if (perYou.checkFlag(29)) {
			if (perYou.checkFlag(61)) sp += "I know <b>Hydromancy</b> and the basics of meditation, I can get visions of other places if I meditate on a pool of water and cast clairvoyance<br>";
			else sp += "I know <b>Hydromancy</b> but I am not familiar with the art of meditation<br>";
		}
		if (perYou.checkFlag(30)) sp += "I have a finer control of the Transform spell and more options are possible<br>";
		if (perYou.checkFlag(69)) sp += "I have better control over the Possession spell, doorways no longer dispell it.<br>";
		findPerson("Leanne");
		var bRitualReturn = isKnowRitualReturn();
		if (bRitualReturn) sp += "I know the Ritual of Return<br>";
		s += addHeader("Magical Knowledge:", sp);
		
		sp = '';
		if (perYou.checkFlag(24)) sp += "I understand the basics of hypnosis<br>";		
		if (perYou.checkFlag(25)) sp += "I can magically augment hypnosis<br>";
		s += addHeader("Hypnotic Knowledge:", sp);
		

		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(20' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes4") {
		// General Notes
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">General Notes:</p>';

		if (perBeasley.checkFlag(14)) s += "I have read Mr. Beasley's lecture on Carl Kurndorf<br>";
		if (perYou.isQuestStarted(1) && (isCharmedPath() || isGoodPath())) s += "I am " + perGates.getPersonName() + "'s apprentice!<br>";
		else if (isConspiracyPath()) s += perSarah.checkFlag(1) ? "Sarah Gates is helping my researches<br>" : "I have an anonymous friend helping my researches<br>";
		else if (isMurderPath()) {
			if (perGates.other == 600) s += perGates.getPersonName() + " is dead, killed by Davy\'s woman!<br>";
			else s += perGates.getPersonName() + " is dead!<br>";
		}
		
		s += addHeader("Places");
		if (gameState.bAllPlaces) s += "I know " + tnm + " very well, and know where almost every place is and how to get there.<br>";
		else s += 'I do not know ' + tnm + ' very well and often need directions on how to get places.<br>';
		if (checkPlaceFlag("Museum", 8)) s += "The Mayor has closed the museum.<br>";
		if (checkPersonFlag("Kristin", 9)) s += "Kristin has closed the bank.<br>";
		if (checkPlaceFlag("Library", 2))  s += "Ms. Titus has closed the library.<br>";
		if (isPlaceKnown("AvernusClub")) s += 'The Avernus Club is open late night near the shopping center.<br>';
		if (checkPlaceFlag("Hotel", 11)) s += "I can call people to go for a swim with me in the Hotel Pool.<br>";
		if (isPlaceKnown("TennisCourts")) s += "I have access to the tennis courts at the Hotel.<br>";
		findPerson("Brandi");
		if (!per.isCharmedBy() && per.checkFlag(8)) s += 'I am allowed to visit Kylie and Aunt Brandi\'s home in the evening, 8:30pm to 10:30pm.<br>';
		
		sp = '';
		if (perSarah.other > 0) sp += "Sarah Gates is now at the Mansion<br>";
		findPerson("MsTitus");
		if (per.isFreeSlave()) sp += "Ms. Titus is my willing slave<br>";
		findPerson("Heather");
		if (per.isFreeSlave()) sp += "Heather is my hypno-slut<br>";
		s += addHeader("People", sp);
		
		findPerson("Mayor");
		if (per.checkFlag(7) && gameState.perTown.checkFlag(37)) {
			sp = "Public nudity is legal in Glenvale<br>";
			if (gameState.perTown.checkFlag(40)) sp += "Public sex is allowed in Glenvale<br>";
			s += addHeader("Laws", sp);
		}
		
		s += addHeader("Transport");
		if (perYou.isQuestComplete(7) && isMurderPath()) s += "Sofia, your personal chauffeur comes to your house every morning. She can give you a lift anywhere around town. You can also call her anytime if you want her to come pick you up.<br>";
		else if (checkPersonFlag("Hannah", 17)) s += "Hannah can give you a ride anywhere you need, just visit her " + getShopStore() + " or apartment.<br>";
		else s += "Walking or the occasional taxi are the main way I get around.<br>";
		
		sp = '';
		if (perYou.checkFlag(38)) sp += "I have done almost everything I can in " + tnm + ". I could <b>end</b> my adventure for now on a <b>Sunday night at home</b>, talk to Tess or Tracy.<br>";
		s += addHeader("Other", sp);

		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(30' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';
				
	} else if (stype === "notes5") {
		// Schedules
		function addSchedule(nm, desc, flg, extra, extraleadin) {
			return '<span style="position:relative;top:0.5em"><b>' + nm + '</b> ' + desc + (flg === true ? (extraleadin === undefined ? " After these hours" : extraleadin) + " " + (extra === undefined ? per.getHeShe() + " is in " + per.getHisHer() + " home at " + per.getPersonAddress() : extra) + '<br>' : '<br>') + '</span>';
		}
			
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Schedules:</p>';

		// Places
		sp = '';
		if (isPlaceKnown("AvernusClub")) sp += 'The Avernus Club is open late night near the shopping center.<br>';
		s += addHeader("Places", sp);
		
		// People
		var cm = getClubManagersTotal();
		sp = '';
		// Abby
		findPerson("Abby");
		if (per.checkFlag(1)) sp += addSchedule('Abby', "works at the Aquarium 8am to 8pm 7 days a week.", isPlaceKnown("AbbysApartment"));
		// Alison
		findPerson("Alison");
		if (per.place != 0) sp += addSchedule('Alison', "works at the restaurant on weekends", per.isCharmedBy(), " and works out at the Gym afternoons on Tuesdays and Thursdays");
		// Angela
		findPerson("Angela");
		if (per.checkFlag(1)) sp += addSchedule("Angela", "works from 8am to 6pm Monday to Friday at the Town Hall.", isPlaceKnown("AngelasApartment"));
		// Angelica
		if (!isMurderPath() && isCharmedBy("Sofia")) sp += addSchedule("Angelica", "is busy working in the mornings from 8am but is free after midday.");
		// Bambi
		if (checkPersonFlag("Bambi", 7)) sp += addSchedule("Bambi", "is your night guard in the dungeon", findPerson("Anita").place == 161, " and Anita is your day guard");
		// Betty
		findPerson("Betty");
		if (per.checkFlag(4)) sp += addSchedule("Mistress Betty", "works in the Avernus club from 10pm to late on weekdays", true);		
		// Ms. Charles
		findPerson("MsCharles");
		if (per.place != 0) sp += addSchedule("Ms. Charles", "works from 9am to 4pm Monday to Wednesday at the Glenvale Herald.", isPlaceKnown("MsCharlesHouse"));				
		// Emily
		findPerson("Emily");	
		if (per.place == 99) sp += addSchedule("Emily", "works from 8am to 6pm weekdays at the TV Station.", isPlaceKnown("NinasApartment"));	
		// Jenny
		findPerson("Jenny");
		if (per.other > 0) sp += addSchedule('Jenny', "works in the restaurant 8am to 10pm weekdays.", isPlaceKnown("JennysApartment"));
		// Karley
		findPerson("Charley");
		if (per.checkFlag(1)) sp += addSchedule(per.getPersonNameShort(), "works in her Salon 8am to 8pm 7 days a week.", per.isCharmedBy());
		// Jade
		if (perJade.checkFlag(1)) {
			if (perJade.isCharmedBy("Vampyre")) sp += addSchedule("Jade", "stays in the crypt waiting her mistresses orders");
			else if (perJade.isCharmedBy()) sp += addSchedule("Jade", "is bound in her room 24hrs a day");
			else sp += addSchedule("Jade", "works in the Avernus Club from " + perJade.isClubOpen(true) + ".", per.checkFlag(16), "works as an instructor at the Gym from 6pm to about 9pm.", "Before this she");
		}
		// Kylie
		findPerson("Kylie");
		if (per.checkFlag(1)) sp += addSchedule("Kylie", "plays sports weekdays 12-2pm.", per.checkFlag(3), "you can call her in the morning on Cherise Rd to meet.");
		// Leanne & Louise
		findPerson("Leanne");
		if (per.checkFlag(1)) {
			if (per.place == 195) sp += addSchedule("Leanne", "works from 7am to 8pm 7 days a week at the General " +  getShopStore(true) + ".", true);
			else if (per.checkFlag(29)) {
				sp += addSchedule("Leanne", "works from midday to 8pm 7 days a week at the General " +  getShopStore(true) + ".", true);
				findPerson("Louise");
				sp += addSchedule("Louise", "works from 7am to midday 7 days a week at the General " +  getShopStore(true) + ".", isPlaceKnown("LouisesApartment"));
				if (per.checkFlag(13)) sp += addSchedule("Louise", "works out in the gym Monday afternoons.", false);
			} else {
				findPerson("Louise");
				if (per.checkFlag(1)) sp += addSchedule("Louise", "works from 7am to 8pm 7 days a week at the General " +  getShopStore(true) + ".", isPlaceKnown("LouisesApartment"));
			}
		}
		
		// Lola
		findPerson("Lola");
		if (per.checkFlag(1)) sp += addSchedule("Lola", "works from 8am to 8pm 7 days a week at the Museum.", isPlaceKnown("LolasHouse"));
		// Mayor
		findPerson("Mayor");
		if (per.checkFlag(1)) sp += addSchedule("Mayor Thomas", "works from 8am to 6pm Monday to Friday at the Town Hall.", checkPlaceFlag("ShoppingCenter", 6));
		// Melissa
		findPerson("Melissa");
		if (per.checkFlag(1)) sp += addSchedule("Melissa", "works night 7 days a week at the Aquarium.", isPlaceKnown("MelissasApartment"));
		// Mia
		findPerson("Mia");
		if (per.checkFlag(8)) sp += addSchedule("Mia", "works nights 7 days a week at the Broken Inn Hotel.", isPlaceKnown("MiasApartment"));
		// Mom
		if (checkPersonFlag("Mom", 45)) sp += addSchedule("Aunt Brandi", "teaches tennis lessons weekday mornings.");
		// Monique
		findPerson("Monique");
		if (per.other > 0) sp += addSchedule("Monique", "works from 7am to 8pm 7 days a week at the Glenvale Library.", per.isCharmedBy());
		// Mrs Robbins
		findPerson("MrsRobbins");
		if (per.checkFlag(9)) sp += addSchedule("Mrs. Robbins", "works from 9am to 4pm Monday to Wednesday at the Glenvale Herald.", true);
		if (per.checkFlag(7)) sp += addSchedule("Mistress Robbins", "works in the Avernus club from 10pm to late " + (cm == 1 ? "7 days a week" : "Monday to Wednesday"), true);
		// Ms MsTitus
		findPerson("MsTitus");
		if (per.other > 0) sp += addSchedule("Ms. Titus", "works from 7am to 8pm 7 days a week at the Glenvale Library.", isPlaceKnown("MsTitussHouse"));
		// Nella
		findPerson("Nella");
		if (per.checkFlag(3)) sp += addSchedule("Nela", "works as a security guard in the bank during business hours", per.checkFlag(15));
		if (per.checkFlag(16)) sp += addSchedule("Mistress Nella", "works in the Avernus club from 10pm to late on weekends", true);		
		// Nina
		findPerson("Nina");
		if (per.checkFlag(2)) sp += addSchedule("Nina", "works from 8am to 6pm weekdays at the TV Station.", isPlaceKnown("NinasApartment"));
		// Savanna
		findPerson("Savanna");
		if (per.checkFlag(1)) sp += addSchedule("Savanna", "works from 8am to 6pm Monday to Friday at the Town Hall.", per.isCharmedBy());
		// Seraphina
		findPerson("Seraphina");
		if (per.checkFlag(14)) sp += addSchedule("Mistress Sera", "works in the Avernus club from 10pm to late " + (cm == 1 ? "7 days a week" : cm == 2 ? "Wednesday to Sunday" : "Wednesday to Friday"), true);
		// Sharon
		findPerson("Sharon");
		if (per.checkFlag(2)) sp += addSchedule("Sharon", "works in her massage parlor 8am to 8pm 7 days a week.", per.isCharmedBy());
		// Tammy
		if (isPlaceKnown("TammyOffice")) sp += addSchedule('Tammy', "is only in Glenvale on Fridays 8am to 6pm at the Town Hall");
		// Lola
		findPerson("Victoria");
		if (per.checkFlag(8)) sp += addSchedule("Victoria", "works from 8am to 6pm week days in the Antiques " + getShopStore(), per.isCharmedBy());
		
		s += addHeader("People", sp);
		
		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(40' + iu + ' + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';
	}
	
	perYou.extra[1] = vis;
	return s;
}