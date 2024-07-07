/****************************************************************
	NURSE SANDRA
 ****************************************************************/
function RepliesNurseSandra(nR)
{
	var perNS = per;
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var perGhost = findPerson("Ghost");

	if (nR == 921)
	{
		if (perNS.other < 2) perNS.other = 2;
		if (!bCharm) addComments('<p>"We found you with a bullet lodged in your shoulder and brought you straight to the hospital. You have been here for a day and you need a lot more rest."</p>');
		else addComments('<p>"Oh, ' + myName + '," she says with tears in her eyes. "You were found with a bullet lodged in your shoulder and brought straight to the hospital."  She reaches out and touches you longingly.  "You have been here for a day and need more rest, and perhaps some... special attention," she says with a glint in her eye.</p>');
		addComments('<p>You ask after your <b>possessions</b> and she tells you that there was <b>nothing with you when you were brought here</b> but your family or the police may have them.</p>');
		if (!this.checkFlag(2)) addComments("<p>You ask the nurse what is her name, and she smiles, \"Nurse Sandra, now take it easy for a while\"</p>");
		perNS.setFlag(2);
	}
	else if (nR == 922)
	{
		if (!perYou.checkInjury(7)) {
			perYou.setInjury(7);
			moveItem(4, 76); // Put the book in Beasley's "office" for you to get.
			if (wherePerson("MrBeasley") !== 11) movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
			perYou.setFlag(8);  // Set it so that you HAVE ASKED about the book
		}
		if (!bCharm) addComments('<p>"The barmaid at the Broken Inn Hotel found you unconscious and brought you straight to the hospital. You have only been here for about an hour and appear otherwise uninjured."</p>');
		else addComments('<p>"Oh, ' + myName + '," she says with tears in her eyes. "Bambi found you lying unconscious and brought straight to the hospital."  She reaches out and touches you longingly.  "You have only been here for an hour and appear otherwise uninjured, but perhaps you need some... special attention," she says with a glint in her eye.</p>');
		addComments('<p>You see your clothes and possessions on a chair nearby, but the Book is missing! You ask where is it and she says "Bambi was helped by a teacher of yours, a Mr. Beasley, you should ask one of them"');
		if (!this.checkFlag(2)) addComments("<p>You ask the nurse what is her name, and she smiles, \"Nurse Sandra, now take it easy for a while\"</p>");
		perNS.setFlag(2);
	}
	else if (nR == 93102)
	{
		var perS = findPerson("OfficerSmith");
		if (perS.other < 102) perS.other = 102;
		if (!bCharm) addComments('<p>"' + getOfficer() + ' Smith is in the intensive care unit. It looks like she may not pull through."</p>');
		else addComments('<p>"She is in the intensive care unit in critical condition, ' + myName + '," she says, quite concerned.  "So she is yours then?" she says hesitantly. "She calls for you in her sleep, ' + myName + '."</p>');
	}
	else if (nR == 100)
	{
		perGhost.setFlag(3);
		addComments('You tell Nurse Sandra about seeing the ghost in the old basement, and how it looked like her friend Keana.</p>');
		if (bCharm) {
			perGhost.setFlag(5);
			if (perGhost.checkFlag(4)) {
				addComments(
					'<p>Once again you ask Sandra about the ghost, and ask her about the ring.</p>' +
					'<p>"Boss, I gave this ring to her, it\'s cheap but all I could afford at the time. When I found her body, I..took it to remember her by. I know I shouldn\'t of but her family would not of missed it, and it has no value."</p>' +
					'<p>You realise this is probably what the ghost was looking for!</p>'
				);
			} else {
				addComments(
					'<p>"Now Boss, there is no way Keana would be haunting the basement!"</p>' +
					'<p>You describe how she seemed to be searching for something, and the nurse looks thoughtful</p>' +
					'<p>"Really Boss, well maybe..." and she touches a ring on one of her fingers. "Boss, I gave this ring to her, it\'s cheap but all I could afford at the time. When I found her body, I..took it to remember her by. I know I shouldn\'t of but her family would not of missed it, and it has no value."</p>' +
					'<p>You realise this is probably what the ghost was looking for!</p>'
				);
			}
			addComments('<p>You will have to take Sandra to the basement when it is night time and see if she can help.</p>');
			if (!isSpellKnown("Unlife Enspelled")) addComments('<p>Then again, you wonder if you can do anything once you can get the ghost\'s attention, is a <b>standard charm spell</p> enough? You probably will only have <b>one</b> chance at this.</p>');
		} else {
			perGhost.setFlag(4);
			var mm = perYou.isBornMale() ? "Mister" : "Miss";
			addComments(
				'<p>"Now look here ' + mm + ' I told you before she is a good woman and has no reason to haunt a place!"</p>' +
				'<p>You describe how she seemed to be searching for something, and the nurse looks thoughtful</p>' +
				'<p>"Really ' + mm + ', well maybe..." and she touches a ring on one of her fingers. She looks embarrassed and then refuses to talk about it more.</p>'
			);
		}
	}
	return true;
}


// Initialise

function initialiseNurseSandra()
{
	// Nurse Sandra
	addPerson("Nurse Sandra", 213, "NurseSandra", '', false);
	per.Replies = RepliesNurseSandra;
	
	per.getModels = function() { return "Paige|Paige Delight,Audrey|Audrey Bitoni"; };

	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Slave Sandra" : "Nurse Sandra"; };
	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the nurse"; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "sandra-facec" : "sandra-faceu"; };

	per.showEventPopup = function()
	{
		if (Place == 214 && sType == "meetsandra") {

			if (this.getDress() === '') {
				this.pickModelMore("As you look away from the picture, you almost bump into a few people, one speaks to you", 'sandra8', 'Oops!');
				return true;
			}
			
			// Meet Nurse Sandra
			var ele = isBritish() ? "lift" : "elevator";
			showPopupWindow("Passerby",
				this.addPersonString("sandra8.jpg", "height:max%", "right") +
				"As you look away from the picture, you almost bump into a " + (isBritish() ? 'cute' : 'buxom') + " red-haired woman. She tells you,<br><br>" +
				'"' + (perYou.isBornMale() ? "Mister" : "Miss") + ', Keana was a good friend, I only knew her briefly when I was a student nurse but I miss her. Now don\'t you listen to any stories you may hear, she was a good woman, and her death was an accident. There is no reason she would be haunting the basement!<br><br>I gotta go ' + (perYou.isMaleSex() ? "Mister" : "Miss") + ', my shift is due to start soon, bye now!"<br><br>' +
				'She glances at the ' + ele + ', its doors are just starting to close, and runs over and almost jumps into the ' + ele + ' before the doors close. You hear someone in the elevator say "Hi Sandra"'
			);
			this.setFlag(2);
			return true;
		}
		if (Place == 213 && this.getDress() === '') {
			console.log("pickModelMore");
			this.pickModelMore(
				((perYou.checkInjury(1) && !perYou.checkInjury(2)) || (perYou.checkInjury(5) && !perYou.checkInjury(6)) ?
					"You wake up from the blackness. Slowly your eyes make out shapes until you see that you are in a hospital ward, and you see a nurse approach..."
				:	"You see a couple of nurses talking, one leave the room and the other approaches you..."),
				"sandra8", 'Nurse'
			);
			return true;
		}
		
		if (sType == "sandratransformbodypaige") {
			CastTransform(1);
			this.setFlag(3);
			this.dress = "Audrey";	
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'Sandra\'s body starts to subtly change, her skin darkens and her hair turns raven black. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively ask if she is alright and she replies "Yes Boss", she is definitely still Sandra and the same person she was before',
				'dispPlace()'
			);
			return true;
		}	
		if (sType == "sandratransformbodyaudrey") {
			CastTransform(1);
			this.setFlag(3);
			this.dress = "Paige";	
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'Sandra\'s body starts to subtly change, her skin darkens and her hair turns a deep red. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively ask if she is alright and she replies "Yes Boss", she is definitely still Sandra and the same person she was before',
				'dispPlace()'
			);
			return true;
		}			
		
		return false;
	};
	
	per.showEvent = function()
	{
		if (sType === "") return false;

		var md;
		
		if (Place == 269 && sType == "sandrapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Swimming with Sandra");
			md.write(
				'<p>Sandra arrives, dressed in a bikini, and you have a pleasant swim together.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=sandrapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Sandra', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "sandrapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Sandra");
			md.write(
				'<p>You ask Sandra to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Sandra', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsandra1") {
			md = WritePlaceHeader();

			this.showPerson("sandra2.jpg");
			setPersonFlag("Ghost", 3, false);

			addPlaceTitle(md, "Nurse Sandra Under a Spell");

			md.write('<p>Sandra staggers from the spell. "What are you doing to me?" she asks in disbelief.</p>');

			startQuestions();

			addLinkToPlace(md, "wait for the spell to take effect", Place, 'type=charmsandra2');
			addLinkToPlace(md, "exit the ward", 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsandra2") {
			md = WritePlaceHeader();
			this.showPerson("sandra3.jpg");

			addPlaceTitle(md, "Nurse Sandra Under a Spell");

			md.write(
				'<p>You tell Sandra that she is feeling very sexy, so sexy that she has to do whatever you want.</p>' +
				'<p>"No!" she replies, fighting the magic. She spins, unable to control the sensation burning in her loins. ' +
				'"Oh god! I can\'t believe that I need it so much. My clothes... I can\'t stop myself."</p>'
			);

			startQuestions();
			addLinkToPlace(md, "see what happens next", Place, 'type=charmsandra3');
			addLinkToPlace(md, "exit the ward", 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsandra3") {
			md = WritePlaceHeader();

			this.showPerson("sandra4.jpg");

			addPlaceTitle(md, "Nurse Sandra Under a Spell");

			md.write(
				'<p>"So you want a piece of this, do you?" asks Sandra, hiking up her skirt to show you her slit. ' +
				'"You think that you can come in here and take whatever you want. I bet that you have never had what I can give."</p>' +
				'<p>The spell seems to have taken hold of the nurse. You take an uncertain step backward.</p>'
			);

			startQuestions();

			addLinkToPlace(md, "take what Sandra has", Place, 'type=charmsandra4');
			addLinkToPlace(md, "escape while you still can", 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsandra4") {
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("sandra7.jpg");
			else this.showPersonRorX("sandra6ga.jpg");

			addPlaceTitle(md, "Nurse Sandra Under a Spell");

			md.write(
				'<p>Sandra leans over the bed. "Alright, boss," she says. ' +
				'"Let\'s see what you can do."</p>' +
				'<p>You accept the nurse\'s offer and have one of the best times of your life.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "talk more to Sandra", 213);
			addLinkToPlace(md, "exit the ward", 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sandracheckupsex") {
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRandomRorX("sandra6b", isExplicit() ? 2 : 1);
			else this.showPersonRandomRorX("sandra6g", isExplicit() ? 2 : 1);
			
			if (perYou.isMaleSex()) {
				addPlaceTitle(md, "Nurse Sandra Checking Your Cum");
				md.write(
					'<p>Sandra kneels at your feet. "Alright, boss,", and you instruct her "Now slave, I want you to savor the taste."</p>' +
					'<p>Your nurse laps up every drop of your cum that she can find.</p>'
				);
			} else {
				addPlaceTitle(md, "A Checkup by Nurse Sandra");
				md.write(
					'<p>Sandra agrees. "Alright, boss, let me \'check\' everything you have".</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, "talk more to Sandra", 213);
			addLinkToPlace(md, "exit the ward", 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1sandra") {
			// End Game - Sandra
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Nurses?");

			md.write(
				'<p>One day you visit your Nurse-slave Sandra at her home' + (isBritish() ? ' and you' : ', you notice she has her hair dyed black again. She does this periodically and then changing back to red. You') + ' see she is holding her belly and she announces she is pregnant! Miss. Logan strikes again!</p>'
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
		if (Place == 213 && sType === "" && this.isHere()) {
			var perOS = findPerson("OfficerSmith");
			var perGhost = findPerson("Ghost");
			if (this.isCharmedBy()) {
				addLinkToPlace(md, 'have Sandra give you a checkup', Place, 'type=sandracheckupsex');
				if (perOS.place !== 213 && wherePerson("OfficerKhan") !== 213) {
					this.addDancingLink(md, '"Sandra, can you take a break and dance for me at the club?"', 
						'You ask Sandra about the Avernus club and about taking a break and dancing there for you,</p>' +
						'<p>&quot;Sure Boss, I can arrange someone to take over here for a time and have a break and dance for you!&quot; and with that you call Jade to arrange a dance for Sandra.'
					);
				}
				if (!isDay() && perGhost.checkFlag(5) && !perGhost.checkFlag(6)) addLinkToPlaceC(md, 'ask Sandra to come with you to the basement', 443, 'type=sandra');
			}
			if (perYou.checkInjury(6) && !perYou.checkInjury(7)) addQuestionC(md, 'ask the nurse what happened', "NurseSandra", 922);
			else if (this.other == 1) addQuestionC(md, 'ask the nurse what happened', "NurseSandra", 921);

			if (perOS.place == 213 && perOS.other == 101) addQuestionC(md, 'ask Nurse Sandra about Becky\'s condition', "NurseSandra", 93102);

			if (perGhost.checkFlag(2) && !perGhost.checkFlag(3)) addQuestionC(md, 'tell the nurse about seeing the ghost', "NurseSandra", 100);
		}
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() && !isCharmedBy("NurseMegan") ? "endgame1sandra" : "";
	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 213) {
				// Ward 1 East - Nurse Sandra (after being shot)
				if (!this.checkFlag(2)) addComments("You do not know the nurses name, so the spell will not work!");
				else CastCharmSpell("NurseSandra", Place, 4, 'type=charmsandra1');
				return "handled";
			}
		}
		
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her.");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(3))) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=sandratransformbody' + this.dress.toLowerCase());
				return "nofooter";
			}
		}

		return "";		// do nothing
	};
	
	// Phone calls

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=sandrapool');
			receiveCall('', 'You call Sandra to invite her to join you at the pool for a swim if she can take a break. She answers that she\'ll be there soon she can get another nurse to cover for her for a while.');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (isAtLocation(282)) this.addDancingCall();			
	};
	
	per.isSMSImageDressVersion = function(id) { return true; };
	
}
