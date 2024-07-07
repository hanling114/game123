/****************************************************************
Lucy (Thrall 2)
****************************************************************/

/**************************************************************************
			Lucy Conversations
 **************************************************************************/
function RepliesLucy(nR)
{
	if (nR == 1848)
	{
		addComments('<p><b>Soulless Thrall</b></p>');
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			perYourBody.PutItem(5); //Give you a stone
			this.setFlag(1, false); //Doesn't want to give you a stone anymore
			addComments('<p>She hands the stone to you, placing it gently in your hand as she runs her fingers down your palm sending shivers of pleasure up your arm.</p>');
		}
		else addComments('<p>She tries to hand you the stone, but you realize you don\'t have enough room in your bag to carry it.  Perhaps if you got rid of something.</p>');
	}
	return true;
}


// Initialise

function initialiseLucy()
{
	// Thrall 2, Lucy
	addPerson("Lucy", 0, "Lucy", '', false);
	per.Replies = RepliesLucy;

	per.getPersonName = function(full) { return full !== true && this.isCharmedBy("Demon") ? "Thrall" : this.name; };
	
	per.getPossessionFace = function() { return this.isCharmedBy("Demon") ? "lucythrall2" : "lucy-face"; };

	per.isPersonInfo = function() { return this.checkFlag(2); };
	
	per.getDress = function(img, sdrs) {
		return (sdrs !== undefined ? sdrs : this.dress) + (this.isCharmedBy("Demon") ? "/Thrall" : "/Normal");
	};
	
	per.getModels = function() {
		return "Lucie|Lucie Lanssen,Whitney|Whitney Westgate"; 
	};
	
	per.getPersonInfo = function() {
		if (this.isCharmedBy("Demon")) {
			return this.addPersonString("lucy12a.jpg", "height:max%", "right") +
			'<p>You know very little about the woman before you, other than that she had been unlucky enough to catch the fancy of the demon Legion and has since been claimed by the creature.</p>' +
			'<p>The “Thralls”, as legion calls them, seem to be mere vessels, their eyes eerily blank and vacant after their souls had been taken by it and replaced with... something else.</p>' +
			'<p>Whatever it is, the thrall\'s mere presence has an arousing effect on everyone entering the room besides Jesse, the host of its former Mistress. It seems to exist for little more than to seduce and corrupt and always lewdly presents the woman\'s body to those visiting, promising them untold pleasure if they just give in to their lust.</p>' +
			'<p>You know the creature can not be allowed to roam free and have ordered Bambi to regularly bring food and something to drink, but otherwise make sure it does not leave the room while you work out what to do with it.</p>' +
			'<p>You have to admit that you feel sorry for the woman and maybe a bit of guilt, but for now, not even knowing as much as her name, there is nothing you can do for her aside from keeping an eye on her body.</p>';
		} else {
			return this.addPersonString("lucy-face.jpg", "height:max%", "right") +
			'<p>Lucy, once the thrall of Legion.</p>';
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 144 && sType === "" && isShopOpen(2) && !isSpellKnown("Charm") && !this.isCharmedBy("Demon") && !this.checkFlag(4)) {
			return this.showPerson("lucy0.jpg", '', '', '', '', false, "string");
		}		
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 144 && sType === "" && isShopOpen(2) && !isSpellKnown("Charm") && !this.isCharmedBy("Demon") && !this.checkFlag(4)) {
			// First glimpse
			if (this.dress === "") {
				this.pickModel('You notice a game being played on the oval, not a school or class thing. You see two officials discussion something. You sort of recognise one. Is she the one with...', "lucy0", "Lucie", "Whitney", "reddish hair", "darker brown hair", "", "Who is that umpire?");
				return true;
			}
			this.setFlag(4);
			md.write(
				'<p>You notice a game being played on the oval, not a school or class thing, just some students playing a game. The umpire is a girl you sort of recognise, but you cannot quite recall her name. You know she is <i>very</i> flitaceous with both boys and girls. Catherine called her a bi-slut, but for her this is a compliment!</p>' +
				'<p>You notice the umpire\'s top has slipped up, but then again you would not be surprise if she did it deliberately. What was her name again...Linda, Tracy...no something else...</p>'
			);
		}
	}

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "lucypoolsex") {
			md = WritePlaceHeader();			
			this.showPerson("lucy-pool-sex.jpg");
			addPlaceTitle(md, "Giving In To Lucy");
			md.write(
				'<p>The thrall is a creature of lust and delights in the exposure and exhibitionism of stripping naked and taking you here at the pool.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'take Lucy the Thrall back to the hotel room', 375, '', '', '', "setPersonFlag('Jesse',7,false)");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1lucythrall") {
			// End Game - Lucy/Sera as a Thrall
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Thralls?");

			if (isDemonGone()) md.write('<p>One day you visit Jesse you see her companion,');
			else md.write('<p>One day you visit you see');
			md.write(
				' the thrall Lucy and sitting looking at you peculiarly, you see her swelling belly showing she is pregnant! Pregnant but what with, your child, some demonic being, another thrall! This is very, very worrying!</p>'
			);
			if (isCharmedBy("Seraphina", "Demon")) md.write('<p>Equally worrying is when you check on the thrall Sera and see her equally swelling belly!</p>');
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
			if (isCharmedBy("Seraphina", "Demon")) {
				AddPeopleColumnLarge(md);
				findPerson("Seraphina").showPerson("pregnant.jpg");
			}
					
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (Place != 375) return false;
		
		if (this.dress === "") {
			md = WritePlaceHeader();
			this.pickModel('As you open the door, you see Jessie...Legion with a cute girl her appearance shimmering with some demonic glamour. It finally settles down as someone with hair that is...', "play1", "Lucie", "Whitney", "reddish", "darker brown", "", "Who is with Legion");
			WritePlaceFooter(md);
			return true;
		}

		// Sex scenes in Room 113 with the Thrall Lucy without Jesse
		if (sType == "lucysex") {
			// Have Given in to the Thrall's administrations
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("lucythrallsex1b.jpg");
			else this.showPersonRorX("lucythrallsex1g.jpg");
			addPlaceTitle(md, "Playing with Lucy the Thrall");
			if (isJesseOk()) md.write('<p>You ask Jesse if you can have a private word with Lucy and Jesse waves to you as she starts playing on her phone. You step into the bedroom and the thrall quietly follows you.</p>');
			md.write(
				'<p>The thrall lets out a low moan as you give in to her ministrations.  Within moments she has skillfully unfastened your pants and her hand quickly finds its target, quickly sending shivers of pleasure through you.</p>' +
				'<p>Moments later you can feel her soft supple lips kiss you as her tongue begins to explore your mouth - the heat from her body held so close against you raising your passions even further.</p>' +
				'<p>For a moment you worry that you have done something wrong - that <i>this</i> time the creature is going to devour your soul as the demon walks in the room cackling in delight...  But a moment later that fear is washed away as you feel an orgasm building toward its inevitable climax.</p>' +
				'<p><i>"If nothing else, she was right about one thing,"</i> you think to yourself.  <i>"This is a particularly fun pet to play with."</i></p>'
			);

			startQuestions();
			if (isPersonHere("Seraphina")) addLinkToPlace(md, 'ask Sera to join you', Place, 'type=lucyserathreesome');
			addLinkToPlace(md, isJesseOk() ? 'stop and re-join Jesse' : 'stop and push her away', 375);
			addLinkToPlace(md, 'walk back to the bar', 124);
			addLinkToPlace(md, 'leave the hotel', 123);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "lucyserathreesome") {
			md = WritePlaceHeader();
			this.showPerson("lucysera1.jpg");
			addPlaceTitle(md, "Playing with the Thralls");
			md.write(
				'<p>The thrall lets out a low moan as the other thrall, Sera, joins you.</p>' +
				'<p>They embrace but pay little attention to each other, being focussed on you is a disconcerting way!</p>'
			);

			startQuestions();
			addLinkToPlace(md, isJesseOk() ? 'stop and re-join Jesse' : 'stop and push them away', 375);
			addLinkToPlace(md, 'walk back to the bar', 124);
			addLinkToPlace(md, 'leave the hotel', 123);
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "askself") {
			// Ask the thrall about herself
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("lucythrall2.jpg");
			addPlaceTitle(md, "Talking to the Thrall");
			md.write(
				'<p>You ask the thrall to tell you her name and about herself before the demon. She presses more against you, her hands moving to remove your clothes and caress and arouse you. She seems to be driven by lust and nothing else, but she did give you that stone. As you are about to give up, she whispers in your ear, a voice full of lust but with an unearthly tone,</p>' +
				'<p>"This body was once called Lucy, not now. Mistress just calls it \'pussy toy\', ' + (perJesse.checkFlag(6) ? '\'cocksleeve\' and \'cumdump\'' : '\'cunt-licker\'') + '. A toy for Mistresses pleasure, nothing else. Lust is all that matters, nothing remains from before."</p>' +
				'<p>You push her back a bit and tell her that her Mistress is gone, ' +
				(isDemonBound() ?
					'but the thrall just looks over at the bathroom the exorcised Jesse is currently in. Again you despair of getting anything more, but she speaks again as she embraced you again, speaking in between kissing your neck,</p>' +
					'<p>"Mistress is gone but Mistress is here. Lust remains"</p>' :
					'but the thrall just continues to try and seduce you. Again you despair of getting anything more, but she speaks again as she embraces you again, speaking in between kissing your neck,</p>' +
					'<p>"Mistress is gone but Lust remains"</p>') +
				'<p>You try to ask her more about who she was, about Lucy, but she refuses to say anything more.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'give up for now', 375);
			addLinkToPlace(md, 'walk back to the bar', 124);
			addLinkToPlace(md, 'leave the hotel', 123);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

		// Popup evets for Bambi
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (!this.checkFlag(2) && isDemonQuestDone() && Place == 124 && isCharmedBy("Bambi")) {
			// Anita has been here and moved/killed Davy
			this.setFlag(2);
			var perB = findPerson("Bambi");
			var be = perB.checkFlag(16) ? "be" : "";
			showPopupWindow("Bambi and the Thrall",
				perB.addPersonString("bambi11b" + be + ".jpg", "height:max%", "right") +
				'You know the thrall can not be allowed to roam free so you speak to Bambi and ask her to regularly bring food and something to drink, but otherwise make sure it does not leave the room while you work out what to do with it. Bambi smiles,</p>' +
				'<p>"Of course ' + perYou.getLord() + ', your collection of toys grows larger!  Please try to keep the number of occupied rooms down, this hotel has to have normal customers as well!."  and she laughs.</p>' +
				'<p>Well the Thrall is taken care of for now, but Bambi continues, "I can lock the rooms but I cannot give her my close personal supervision all the time, unless you plan to make her an assistant for me?"<p>' +
				'<p>The thought of the Thrall as a barmaid just seems a horribly bad idea so you tell Bambi a definitive "No".</p>'
			);
			return true;
		}
		return false;
	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {
			if (!this.isCharmedBy("Demon") && this.isHere()) {
				addComments('You immediately smell brimstone and feel an emptyness about Lucy, but nothing else.');
				return "handled";
			}
		}	
		return "";		// do nothing
	};

	// Questions for Thrall Lucy
	per.showPersonChat = function(md)
	{
		if (Place != 375 || sType !== "" || perJesse.place == 8) return;

		//Dialogue/Action options with the Thrall after the Demon leaves
		addLinkToPlace(md, perJesse.getDemonPath() < 600 ? 'play with Lucy the thrall for a bit' : 'talk to \'Lucy\' privately', 375, 'type=lucysex');
		if (this.checkFlag(1)) {
			//Thrall has a stone for you
			addQuestionCO(md, 'take the offering from the thrall', "Lucy", 1848);
		} else if (this.checkFlag(2) && !this.checkFlag(3) && perJesse.getDemonPath() < 600) addLinkToPlaceC(md, 'ask the thrall about herself', 375, 'type=askself');

	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy("Demon") ? "endgame1lucythrall" : "";
	};
	
	// Phone calls
	per.isPhoneable = function() { return false; };

}
