// Inside Mansion - the Study with Ronald Gates

function ShowPlace17()
{
	var md;
	if (sType == "postmurder") {
		md = WritePlaceHeader();

		// Sir Roland's study, he is dead and no police yet
		addPlaceTitle(md, "Dead " + perGates.getPersonName() + "\'s House", perYourBody.FindItem(4) === 0 ? "gatesroom2.jpg" : "gatesroom1.jpg");

		var perKhan = findPerson("OfficerKhan");
		if (perKhan.getPath() < 2) {
			// haven't had Cheryl Khan drive you to police yet
			md.write('<p>' + perGates.getPersonName() + ' lies dead on the floor. A bullet hole in his chest oozes out blood.');
		}
		md.write('<p>A murder scene is not the place to be and you are frightened of someone entering the room.</p>');

		startQuestions();
		addLinkToPlace(md, "exit the house", 16);
		WritePlaceFooter(md);
		return;
	}
	
	if (isMurderPath()) return EnterMansion(); //  If Sir Ronald Gates is Dead - move to the "dead" version, redirect to the Gates "Front Door"

	md = WritePlaceHeader();

	var perSarah = findPerson("Sarah");
	var perLauren = findPerson("Lauren");
	var perLeanne = findPerson("Leanne");
	var bLocked = !isDay();

	// Meet Sir Ronald
	perGates.showPerson("gates2.jpg", isScreenSmall() ? "" : "30vw");
	addPlaceTitle(md, perGates.getPersonName());
	if (perGates.other === 0)
	{
		md.write(
			'<p>An elderly gentleman is sitting behind a large desk made from oak. The whole room is stuffed with things from the past. Paintings and pictures from 19th century decorate the walls and a great Chandelier hangs from the ceiling. The dark blue  color of the walls and the smell of old wood sets the mood of the place. It is certainly a very old room!</p>' +
			'<p>The old man must be ' + perGates.getPersonNameShort() + ' himself! He’s kind of a legend around here, becoming part of the mythos involving the witches and warlocks of the past. Some say he is a warlock himself who’s here to guard something very important. On a more earthly plane, some people claim that ' + perGates.getPersonNameShort() + ' served in army intelligence while others believe that he worked for S-Biomed, the elusive FBI branch dedicated to preempting chemical warfare. Nobody knows how he earned his knighthood and, if ' + perGates.getPersonNameShort() + ' has anything to do with it, they will never find out.</p>' +
			'<p>The moustached man looks at you with wise eyes. You can feel his commanding presence even though he looks to be in his 70’s. He has a wooden pipe in his hands, toying with it while glancing at you. After a while he stops, puts the pipe in his mouth, and lights it. Finally he gestures for you to approach. You know he can be an influential ally… or a powerful enemy if you anger him.</p>' +
			'<p>"Welcome," he says with a silvery voice. "I don\'t get to receive guests very often, and even less often do I receive uninvited guests. I am told you are interested in the Sacred Book of Control."</p>' +
			'<p>Something catches your eye; beside ' + perGates.getPersonNameShort() + '\'s desk is a book. Could it be the one? It is, you are sure it is!</p>'
		);
	}
	else if (perGates.other < 3) // Also means != 0 since its an If-Then-Else
	{
		md.write('<p>' + perGates.getPersonNameShort() + ' smiles warmly toward you. The old man has taken a liking to your good manners.');
	}
	else if (perGates.other == 3)
	{
		md.write('<p>The old man waits for you reply. Are you brave enough to accept his challenge?');
	}
	else if (perGates.other == 5)
	{
		md.write('<p>' + perGates.getPersonNameShort() + ' is very annoyed at your disturbance.');
	}
	else if (perGates.other >= 9 && perGates.other <= 13)
	{
		md.write(
			'<p>The old man is waiting for you, his apprentice, to return with a <b>magic stone</b> to prove your worth and begin your training.' +
			'<p>"Well then, my ' + perYou.getSex() + '," he says jovially.  "Have you found a stone yet?"</p>');
	}
	else if (perGates.other == 14)
	{
		md.write(
			'<p>' + perGates.getPersonNameShort() + ' gives you a warm smile.</p>' +
			'<p>&nbsp;"Ahh a young person with integrity," he says, "Thank you ' + perYou.getPersonName() + '. Now it is time for you to  your first spell."</p>' +
			'<p>"Are you ready?"<\p>');
	}
	else if (perGates.other == 15)
	{
		md.write('<p>"Go ahead," says ' + perGates.getPersonNameShort() + '. "Try to learn the spell"<\p>');
	}
	else if (perGates.other == 16)
	{
		md.write('<p>' + perGates.getPersonNameShort() + ' nods his head. "You are doing well my apprentice."</p><p>"Now use your power to find me a special artifact. It is an <b>old key</b> that was stolen from me two years ago."</p>');
	}
	else if (perGates.other == 17)
	{
		md.write('<p>' + perGates.getPersonNameShort() + ' nods his head in greeting. "You are doing well, my apprentice. Have you found the key that was stolen from me?."</p>');
	}
	else if (perGates.other > 18 && perGates.other < 21)
	{
		md.write('<p>The old man is very concerned. "My dear ' + perYou.getSex() + '," he says. "I have put you in grave danger. My enemy has broken into my vault, and even killed my guard in an attempt to steal the book.  Luckily I had already given it to you. I fear that my enemy will come after both of us."</p>');
		if (perYourBody.FindItem(39) === 0)
		{
			md.write(
				'<p>You are very confused by the statements and want to know more.<\p>' +
				'<p>' + perGates.getPersonNameShort() + ' dismisses your questions to order you, "Find the old key. It is our only hope."</p>');
		}
		else
			md.write('<p>"Do you have the key? Give it to me now!" says ' + perGates.getPersonNameShort() + '.<\p>');
	}
	else if (perGates.other >= 500 && !isMurderPath())  // Demanded book but still alive
	{
		md.write('<p>' + perGates.getPersonNameShort() + ' is taken aback by your rudeness and seems very intent on <i>not</i> allowing you to leave with the book.  He glares at you in an attempt to be menacing.  You\'re not sure if you should be laughing at him, or afraid of what he might do next.');
		if (perGates.other == 501)
		{
			md.write('<p>Unexpectedly, ' + perGates.getPersonNameShort() + ' stands up with a gun in his hand and aims it at your stomach. "I will <b>not</b> give you the book, and I suggest that you leave <b>immediately</b>!!" he declares defiantly.');
		}
	}
	else
	{
		if (perGates.other < 499) md.write('<p>' + perGates.getPersonNameShort() + ' greets his apprentice, "I hope that you are learning the magic arts." He gives you a wink. ');
		else md.write('<p>' + perGates.getPersonNameShort() + ' looks at you disappointed, waiting for you to leave his house. ');

		if (perGates.other < 23) md.write('"Whatever you do, never lose that book."<\p>');

		if (perYou.getQuestAftane() == 25) {
			md.write('<p>This is a most interesting and dangerous development.  Did anything else happen at the summoning of Kurndorf\'s spirit?"</p>');
		} else if (perYou.getQuestAftane() >= 50 && perKurndorf.getQuestRitual() < 200) {
			//ritual is ACTIVE
			md.write(
				'<p>' + perGates.getPersonNameShort() + ' looks at you, all humor gone from his face.  "As long as Kurndorf remains free in this realm he is a great threat to everyone in the city.  And beyond."</p>' +
				'<p>"You must go to him, offer to help him - but be warned," He says, waving a finger at you as if to stab you in the chest, "Kurndorf is a master manipulator.  He will lie, cheat, and steal to get his way."</p>' +
				'<p>"Trust <i>nothing</i> he says.  He will try to mislead you.  You <i>must</i> find a way to trick him and turn his plan against him." He says leaning back in his chair in exhaustion.  You find yourself realizing for the fist time how truly <i>old</i> ' + perGates.getPersonNameShort() + ' must be...  It is no wonder he was searching for your help.  He seems all but powerless to do much himself.</p>');
		}

		if (perYou.getQuestAftane() == 60 && perKurndorf.getQuestRitual() < 200)
		{
			if (!perKurndorf.checkFlag(1)) {
				md.write('<p>"You must find the skull from Kurndorf\'s own crypt," He says.  "You may be able to use it against him.  If only my own collection were complete," he rails, "I\'m afraid I do not have any history book that might give us a clue to its location."</p>');
			} else {
				md.write('<p>"You have it, don\'t you.  I can <i>feel</i> it on you." He says, motioning towards your backpack.  "Keep it close, and let us hope that Kurndorf is not paying close enough attention to recognize his own... face."</p>');
			}
		}

	}
	/**************************  Response Section  *************************/
	
	if (isInvisible()) {
		showPopupWindow("Wards?",
			addImageString("mansionentry.jpg", "30%") +
			'<p>What...you should be invisible still, you know "The unseen" training and should still be invisible, but you certainly are <b>not</b>. There must be some sort of ward to protect against the invisible!',
			"endInvisibility();dispPlace()"
		);
		WritePlaceFooter(md);
		return;
	}

	startQuestions();

	if (perKurndorf.getQuestGhost() >= 50) //Kurndorf Path (Seance and after)
	{
		if (perYou.getQuestAftane() == 11) addQuestionC(md, '"You know that enemy of yours?  I think he\'s back."', "SirRonald", 911);
		else if (perYou.getQuestAftane() == 12)
		{
			startAlternatives(md);
			addQuestionC(md, '"I... I was greedy. I summoned him with a seance. I\'m so sorry!"', "SirRonald", 912);
			addQuestionC(md, '"That witch <i>tricked</i> me!  She summoned him and he tried to kill me!"', "SirRonald", 913);
			endAlternatives(md);
		}
		else if (perYou.getQuestAftane() == 15)
		{
			startAlternatives(md);
			addQuestionC(md, '"He offered to teach me the spell he was about to cast before he was killed...  A mass charm spell."', "SirRonald", 915);
			addQuestionC(md, '"He offered me nothing.  I left him there to rot in his own prison."', "SirRonald", 916);
			endAlternatives(md);
		}
		else if (perYou.getQuestAftane() == 20)
		{
			addQuestionC(md, '"Yes. He would have taken over my body were it not for the Aftane."', "SirRonald", 920);
		}
		else if (perYou.getQuestAftane() == 25)
		{
			startAlternatives(md);
			addQuestionC(md, 'Lie - "No."', "SirRonald", 925);
			addQuestionC(md, 'Truth - "Well...  on the subject of creatures..."', "SirRonald", 926);
			endAlternatives(md);
		}
		else if (perYou.getQuestAftane() == 30) addQuestionC(md, '"Yes he did. I tried to stop it, but it possessed a young girl and got away.  How can I stop it?"', "SirRonald", 930);
		else if (perYou.getQuestAftane() == 50 && perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200) addQuestionC(md, 'tell him about the ritual Kurndorf described', "SirRonald", 950);
		else if (perYou.getQuestAftane() == 51 && perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200) addQuestionC(md, '"What trick? Please tell me."', "SirRonald", 951);
	}
	if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask ' + perGates.getPersonNameShort() + ' for help deciphering the passages in the book', 'spendExperience()');

	if (isDemonFreed() && !perGates.checkFlag(6)) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' about demons', "SirRonald", 666);
	if (perLilith.other > 3 && !perGates.checkFlag(11)) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' about vampires', "SirRonald", 667);
	
	if (!perGates.checkFlag(3) && (perLauren.checkFlag(8) || perGates.checkFlag(5))) addQuestionC(md, '"' + perGates.getPersonNameShort() + ' why is the Mansion locked at night?"', "SirRonald", 600);
	if (perLeanne.place == 382 && !perLeanne.checkFlag(7)) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' about saving Leanne', "SirRonald", 700);
		
	if (!perGates.checkFlag(3) && !perLauren.checkFlag(8) && bLocked) {
		addLinkToPlace(md, "go to the entry hall", 18, 'area=locked');
		addLinkToPlace(md, "exit the house", 18, 'area=locked');
	} else if (perSarah.place == 192 && perSarah.other >= 101) {
		addOptionLink(md, "go to the entry hall", 'LeaveMansionStudy(false)');
		//addLinkToPlace(md, "go to the entry hall", 18, 'area=entry');
		if (!bLocked) addOptionLink(md, "exit the house", 'LeaveMansionStudy()');
	} else if (perGates.other > 499) addOptionLink(md, "back down and exit the house", 'LeaveMansionStudy()');
	else if (perGates.other >= 5) {
		addOptionLink(md, "go to the entry hall", 'LeaveMansionStudy(false)');
		//addLinkToPlace(md, "go to the entry hall", 18, 'area=entry');
		if (!bLocked) addOptionLink(md, "exit the house", 'LeaveMansionStudy(' + (perSarah.other != 100) + ')');
	}

	WritePlaceFooter(md);
}