// Place: Teacher's Lounge

function ShowPlace72()
{
	var bOpen = isShopOpen(2);		// is school open

	// Only see Tanika if Mayor is charmed
	var perT = findPerson("MrsTanika");
	var clv = perT.getCharmedLevel();
	// Only here before Ms. Tanika and after learning charm
	var perJ = findPerson("MsJones");

	var bTanika = perT.place == 72 && bOpen;
	var bJones = perJ.isHere() && bOpen;

	if (perYou.getQuestRustyKey() == 5) perYou.setQuestRustyKey(7);	// Advance the "Rusty Key" Path

	// Images
	var md = WritePlaceHeader();
	if (bTanika) perT.showPerson(clv > 0 ? "tanika2.jpg" : "tanika1.jpg");
	else if (bJones) perJ.showPerson("!jones15.jpg");
	else addPlaceImage(md, "school4.jpg");

	// Description
	addPlaceTitle(md, "Teacher\'s Lounge");
	md.write('<p>The tea room is often the meeting place for the staff of Glenvale High. Other than the tables and chairs in the room, you can see some plants in the far corner. A blue lounge is against one wall and a small desk was setup some time ago when a teachers office was under repair, and then staff never bothered removing the desk after that.</p><p>');

	if (bJones) md.write('<p>Ms. Jones is busy grading student homework, but seeing you enter the room, she greets you with a welcoming smile.</p>');
	else if (bTanika) {
		// Only see Tanika if Mayor is charmed
		if (clv > 0) {
			if (clv == 2) {
				md.write(
					'<p>As you enter her classroom, Mrs. Tanika, is sitting reviewing some papers, completely naked. She rises from her desk and spins to you. She hugs and kiss you for a few seconds that feels an eternity in heaven to you, her boobs touching your chest in the process.</p>' +
					'<p>Mrs. Tanika, your math teacher, and now lover. She is still strict and stand-offish to others, but she is your lover now! You’ve learned that she was a mathematician before coming to your school. She was working for a technology leading company where she was assisting them with all the computational techniques, algorithms, and the latest computer technology she knew. She’s quite smart and pretty… what more could a ' + (perYou.isBornMale() ? 'guy' : 'gal') + ' want? Well, she is extremely fond of you and seems really attached to your presence. She’s constantly offering you private lessons and good grades when you two are together. That means you don’t have to worry about math anymore. That’s awesome! You always hated that subject!</p>'
				);
			} else md.write('<p>Mrs. Tanika, is sitting reviewing some papers, completely naked, waiting for your return.</p>');
		} else md.write('<p>Mrs. Tanika, your math teacher, is relaxing and reading some papers. She tries to ignore you so that you will leave.</p>');
	}

	startQuestions();
	if (bTanika) {
		if (clv > 0) {
			// She is charmed
			addLinkToPlaceC(md, 'talk to Mrs. Tanika', Place, 'type=tanikaprivate');
			addLinkToPlace(md, "relax for a while with Mrs. Tanika", '', '', 'You kill some time chatting with Mrs. Tanika', '', 'WaitHere(3);');
		}
	} else if (bJones) addLinkToPlace(md, "relax for a while with Ms. Jones", '', '', 'You spend some time chatting with Ms. Jones', '', 'WaitHere(3);');
	else addLinkToPlace(md, "relax for a while", '', '', 'You kill some time for an hour, you have a coffee from the machine here the teachers use', '', 'WaitHere(5);');

	if (bJones && perJ.checkFlag(16)) {
		addPopupLinkToPlace(md, "exit the room", 78, '', "Leaving",
			perJ.addPersonString("!jones16.jpg", "height:max%", "right") +
			'“Oh, could you please \'old ze door open for me?” Ms Jones rises from her chair and gathers her papers in both hands while you wait for her.</p>' +
			'<p>Merci beaucoup, ' + perYou.getPersonName() + '!” She moves past you with a wide smile. “I am -very much- looking forward to seeing the results of your studies, I know you \'ave talent, so do not let minor setbacks discourage you.”</p>' +
			'<p>You think she gave you a wink as she said that, but before you are able to say anything, Ms Jones is already on her way outside.',
			'movePerson("MsJones",0)', '', true
		);	
	} else addLinkToPlace(md, 'exit the room', 78);

	WritePlaceFooter(md);
}