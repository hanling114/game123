// Davy Defeated
// Used Blue Bottle perDavy.getQuestBlueBottle() == 20;
// Used Silver Ring perDavy.other == 8

function ShowPlace267(stype)
{
	var md = WritePlaceHeader();
	
	var perKate = findPerson("Kate");
	var plcKate = perKate.place;		// Where she is from, commonly 124 or 184
	var bKateCharmed = perKate.isCharmedBy("Davy");
	DefeatDavy();
	
	if ((stype === "" && bKateCharmed && !isKateTrusting()) || stype == "defeated1") {
		// Used Silver Ring/Blue Bottle on Davy + charmed Kate + she does NOT trust you
		setQueryParams("type=defeated1");		// For saving or checking some other pages
		perKate.showPerson("kate14a.jpg");

		addPlaceTitle(md, "Davy Defeated!!");

		md.write(
			'<p>Davy\'s power is drained, leaving him defenseless against your magic and weaponry. ' +
			'It would seem like he is completely at your mercy, and something about the look on his face tells ' +
			'you that he knows it. You doubt a charm spell will work on him, the residual effects from Kurndorf would probably confuse or event shield him, maybe tomorrow?</p>' +

			'<p>He seems about ready to plead his case when you are surprised by a flash of movement from behind him.</p>' +

			'<p>"Serves you right you <b>ASSHOLE</b>," She says still holding the <i>very heavy</i> book from the ' +
			'bookcase.  Dropping the book, she starts to put on a form-fitting blue dress. There is no trace of the spell left on her face.</p>' +

			'<p>"Now," She says, glaring at you as if this were all your fault.  "I know he was controlling me with some sort of spell." ' +
			'You are about to say something when she cuts you off before you can get a word out.  "AND..." She says, the look ' +
			'in her eyes enough of a warning to keep your trap shut.  "And I know that you can do the same thing...."</p>' +

			'<p><i>Yep, definitely not under his control anymore.</i> You think to yourself.</p>' +

			'<p>"So, here\'s what I suggest." She says, cocking her hip as she smiles at you.  "I am going to leave town, ' +
			'I don\'t care anymore.  This is just too <i>fucked up</i>.  My mom will be fine.  And you...  You will keep ' +
			'those lips shut or I <i>swear to god</i> I will knock you into next tuesday."</p>' +

			'<p>"Understand?" She asks...</p>'
		);

		startQuestions();
		startAlternatives(md);
		addLinkToPlaceC(md, 'nod your head "yes..." and then go back to the bar', 124);
		if (isCharmedBy("Bambi")) addLinkToPlaceC(md, 'nod your head "yes...but first I need to deal with Davy"', 184, 'type=restrain');
		else addLinkToPlaceC(md, 'nod your head "yes...but first I need to deal with Davy"', 124, '', 'You would like to do something with Davy so when he wakes he cannot flee but you do not know what to do');
		addLinkToPlaceC(md, 'nod your head "yes..." but all you can think is "That ungrateful bitch"', 184, "type=bitch");
		endAlternatives(md);
		WritePlaceFooter(md);
		return;

	} else if ((stype === "" && bKateCharmed && isKateTrusting()) || stype == "defeated2") {
		// Used Silver Ring/Blue Bottle on Davy + charmed Kate + Kate likes you
		setQueryParams("type=defeated2");		// For saving or checking some other pages
		perKate.showPerson("kate14d.jpg");

		addPlaceTitle(md, "Davy Defeated!!");

		md.write(
			'<p>Davy\'s power is drained, leaving him defenseless against your magic and weaponry. ' +
			'It would seem like he is completely at your mercy, and something about the look on his face tells ' +
			'you that he knows it. You doubt a charm spell will work on him, the residual effects from Kurndorf would probably confuse or even shield him, maybe tomorrow?</p>' +

			'<p>He seems about ready to plead his case when you are surprised by a flash of movement from behind him.</p>' +

			'<p>"Serves you right you <b>ASSHOLE</b>," She says still holding the <i>very heavy</i> book from the ' +
			'bookcase.  Dropping the book, she starts to put on a form-fitting blue dress. There is no trace of the spell left on her face.</p>'
		);
		
	} else {
		// Kate is NOT charmed
		if (stype == "kick") {
			// She runs in and kicks him!
			var safter = getQueryParam("after");
			perDavy.setFlag(5);
			startTimedEvent("DavyEscapes()", 40);
			perKate.showPerson("kate17c.jpg");

			addPlaceTitle(md, "Kate\'s Revenge");
			if (safter == "you") md.write('<p>You glance at Kate and she is looking impatient. You step towards Davy without any clear idea what to do, and he looks warily and quickly draws out a small silver dagger and waves it at you, clearly intent on stabbing you!</p>');
			else if (safter == "bambi") md.write('<p>In response to a glance from you Bambi "disengages" from Davy and moves back. Davy says, "What the hell...I\'m not finished you bitch!"</p>');
			else md.write('<p>Kate runs into the room, and you follow as quickly as you can. You see Davy using his phone, trying to call someone.</p>');
			
			md.write(
				'<p>Kate rushes at Davy with speed born of her rage at Davy, and with a swift high-kick to the face, she slams him to the ground. Davy is dazed and tries to say something, undoubtedly to call out a spell. Before he can say something coherent Kate kicks him with all her might in his groin, winding him with the considerable pain. Kate continues kicking him until you call her to stop!</p>' +
				'<p>You are rather shocked at the severity of Kate\'s attack, she was so very, very angry!</p>'
			);
			if (perKate.checkFlag(15)) md.write('<p>It would seem the necklace was not really necessary...<p>');

						
		} else if ((plcKate == 184 && !bKateCharmed && perKate.checkFlag(15)) || stype == "kickedown") {
			// Kate ran in and confronted Davy on her own AND is wearing the necklace
			setQueryParams("type=kickedown");		// For saving or checking some other pages
			if (isExplicit()) perKate.showPersonRandomX("kate14b", 2);
			else perKate.showPerson("kate14b.jpg");
			addPlaceTitle(md, "Kate\'s Revenge");
			md.write(
				'<p>You enter the room and you see Kate standing <b>on</b> a semi-conscious Davy.</p>'
			);
			
		} else if (stype === "" || stype == "defeated3") {
			// Used Silver Ring/Blue Bottle on Davy + uncharmed Kate 
			setQueryParams("type=defeated3");		// For saving or checking some other pages
			perKate.showPerson("kate17c.jpg");

			addPlaceTitle(md, "Davy Defeated!!");

			md.write(
				'<p>Davy\'s power is drained, leaving him defenseless against your magic and weaponry. ' +
				'It would seem like he is completely at your mercy, and something about the look on his face tells ' +
				'you that he knows it. You doubt a charm spell will work on him, the residual effects from Kurndorf would probably confuse or even shield him, maybe tomorrow?</p>' +

				'<p>He seems about ready to plead his case when you are surprised by a flash of movement from behind him.</p>' +

				'<p>Kate rushes at Davy with speed born of her rage at Davy, and with a swift high-kick to the face, she slams him to the ground. Davy is dazed and tries to say something, undoubtedly to call out a spell. Before he can say something coherent Kate kicks him with all her might in his groin, winding him with the considerable pain. Kate continues kicking him until you call her to stop!</p>' +
				'<p>You are rather shocked at the severity of Kate\'s attack, she was so very, very angry!</p>'
			);
		}
	}
	
	// Possible options for 'recruiting' Kate
	// She can be
	// - charmed and trust you
	// - uncharmed and trust you
	// - uncharmed and not trust you
	if (perKate.checkFlag(13)) {
		//13		- wait! protect
		if (perKate.checkFlag(15)) {
			// She has the necklace, Ally type charm
			perKate.setFlag(23);
			perKate.place = 1;
			md.write(
				'<p>She looks at you, there is still a hint of anger in her expression, but it is fading. She gives the unconscious Davy a kick and says,</p>' +
				'<p>"' + perYou.getPersonName() + ' you promised to protect me, and you have done exactly that, this necklace guarded me and you aided me!"</p>' +
				'<p>She smiles and you start to suggest going back to her place, but she looks at you and says,</p>' +
				'<p>"I think I will, I cannot stay here or else I will do something worse to this bastard"</p>' +
				'<p>Once again she gives the unconscious Davy a kick. Quickly she redresses and gives you an awkward wave goodbye, and leaves saying "See you there"</p>'
			);
			perKate.setFlag(23);
		} else {
			// She does not have the necklace
			// Does not trust you
			perKate.place = 1000;
			perKate.charmedTime = nTime;
			perKate.setFlag(24);
			md.write(
				'<p>She looks at you, there is still a hint of anger in her expression, but it is fading. She gives the unconscious Davy a kick and says,</p>' +
				'<p>"' + perYou.getPersonName() + ' you promised to protect me, and you have done exactly that, Thank you!"</p>' +
				'<p>She smiles and you start to suggest going back to her place, but she looks troubled, and says,</p>' +
				'<p>"I need to think about all this a bit more, please allow me some time.'
			);
		}
		
	} else if (perKate.checkFlag(14)) {
		//14		- wait! love you, embraced her
		// Lover
		perKate.place = 1;		// Kate back at home
		perKate.setFlag(22);
		md.write(
			'<p>She looks at you, there is still a hint of anger in her expression, but it is fading. She gives the unconscious Davy a kick and says,</p>' +
			'<p>"' + perYou.getPersonName() + ' you said you were doing everything for me, and you are here to rescue me!"</p>' +
			'<p>She says nothing more, as she embraces you and kisses you passionately. When you separate from her, you start to suggest returning to her place, but she interrupts,</p>' +
			'<p>"Let\'s leave here, if we do not I swear I am going to...really, really hurt this bastard! Give me a little while to clean the filth from me, and meet me at my place?"</p>' +
			'<p>Once again she gives the unconscious Davy a kick and then give you a quick kiss. Quickly she redresses and gives you a cute wave goodbye, and leaves saying "I\'ll be waiting"</p>'
		);
		
	} else {
		// Other, did not free her etc
		// Does not trust you
		perKate.place = 1000;
		perKate.setFlag(24);
		perKate.charmedTime = nTime;
		md.write(
			'<p>She looks at you, there is still a lot of anger in her expression. She gives the unconscious Davy a kick and says,</p>' +
			'<p>"' + perYou.getPersonName() + ' I think you might have been trying to help me before, Thank you for trying"</p>' +
			'<p>She smiles and you start to suggest going back to her place, but she looks troubled, and says,</p>' +
			'<p>"I need to think about all this a bit more, I am still not too sure about you as you can do the same things as Davy.'
		);
	}
	if (perKate.place == 1000) {
		md.write(
			' I will see you again, when I have cleared my head and can stop thinking about hurting this bastard!"</p>' +
			'<p>Once again she gives the unconscious Davy a kick. '
		)
		if (bKateCharmed) md.write('Quickly she redresses and leaves');
		else md.write('She walks towards the door');
		md.write(
			'saying "Bye for now, I am going to spend some time with some friends out of town"'
		)
		if (perKate.checkFlag(7)) md.write(' You wonder if they are the friends you saw in her potoalbum?');
		md.write('</p>She leaves and you hope to see her again but doubt it will be for some time, if ever?</p>');
		perKate.setFlag(32, false);		// Safety, just in case of old data etc
	}

	// Questions
	startQuestions();
	startAlternatives(md);
	if (!perKate.checkFlag(15) && !perKate.checkFlag(14)) addLinkToPlaceC(md, 'nod your head "yes..." but all you can think is "That ungrateful bitch"', 184, "type=bitch");
	if (isCharmedBy("Bambi")) addLinkToPlaceC(md, '"...but first I need to deal with Davy"', 184, 'type=restrain');
	else addLinkToPlaceC(md, '"...but first I need to deal with Davy"', 124, '', 'You would like to do something with Davy so when he wakes he cannot flee but you do not know what to do');
	addLinkToPlace(md, 'follow her back to the bar', 124);
	endAlternatives(md);
	
	WritePlaceFooter(md);
}