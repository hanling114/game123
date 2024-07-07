// Mother Superior's Room

function ShowPlace382(stype)
{
	var perMS = findPerson("Daria");
	var perLea = findPerson("Leanne");
	if (perLea.place != 382 && !perLea.checkFlag(27) && perLea.isCharmedBy("Demon")) wanderLeanne(382);		// Move her here (most likely from the Graveyard)
	
	var nPossession = isPossess() && (!perMS.checkFlag(5) && !perMS.checkFlag(2) && !perMS.checkFlag(3)) && perMS.checkFlag(6) ? 2 : (isPossess() ? 1 : 0);
	
	var td = '';
	if (nPossession == 2 && stype === '') td = 'td-none';
	var md;

	// General, no specific event
	
	// Popup events
	if (!isPossess() && !perMS.checkFlag(1)) {
		// Have never taken the thrall using Mother Superior
		md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
		showPopupWindow("Mother Superior",
			perMS.addPersonString("mothersuperior1d.jpg", "40%", "right") +
			"Mother Superior hears your enter her room and immediately forces you back out.<br>" +
			'"How dare you!" she cries, her voice breaking from the strain of her illness. "Get out, you perverted creature!"',
			"dispPlace(318)"
		);
		WritePlaceFooter(md, '', true, true);
		return;
	}
	// Have you been here before?
	if (!isPlaceKnown("MotherSuperiorsRoom")) {
		// No, meet en-thralled Leanne
		md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
		setPlaceKnown("MotherSuperiorsRoom");		// Visited her room
		showPopupWindow("Familiar Woman",
			perLea.addPersonString("msroommeet.jpg", "height:max%", "right") +
			"You become aware of standing in a room, dressed in heavy robes. You are in Mother Superior\'s body and her private room! " +
			"You did feel a great resistance as the spell completed and you became aware. Mother Superior has a very strong will and it seems unlikely you could possibly repeat this unless she were <b>weakened</b> in some way.</p>" +
			'<p>You hear a voice and see a familiar looking woman lying on her bed, naked except for a rosary, looking at you seductively, and she says</p>' +
			'<p>"It is you...no need for this glamour", and her appearance shimmers...',
			"dispPlace(382,'type=metleanne');"
		);
		wanderLeanne(382);		// Move her here (most likely from the Graveyard)
		WritePlaceFooter(md, '', true, true);
		return;
	}
	
	if (perMS.checkFlag(1) && !isPossess()) {
		// Visit after the first possession, as yourself, but before the second
		// Leanne may still be here
		md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
		perMS.showPerson('mothersuperior2.jpg');
		addPlaceTitle(md, "Mother Superior\' Penance");

		md.write('<p>Mother Superior is still in her room, her habit only partially replaced from your earlier possession of her. She seems lost deep in prayer.</p>');
		
	} else if (nPossession == 2) {
		// Second possession, Mother Superior on her own
		md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
		addPlaceTitle(md, "Mother Superior Changing", '', 0, false, 'white');
		perMS.showPerson('mothersuperior5a.jpg', "30%", "right");

		md.write(
			'<p>For a long while you experience nothing, just blackness and silence. Gradually you start to see and you are in some sort of room in the church. To your distress you have no control, you try to turn, reach out a hand and nothing happens. You then hear Daria, the Mother Superior\s thoughts,</p>' +
			'<p><i>"..he always leaves the vestry in a mess. I will have to get Desiree to tidy up here. She has been a problem lately, claiming to have a revelation but being unwilling to talk about it, just waiting there in the courtyard..."</i></p>' +
			'<p>You are clearly in her body, but it seems the possession has barely worked, her iron will seems to still be there and almost prevented you possessing her. It seems <b>unlikely</b> you will be able to possess her again.</p>' +
			'<p>Your thoughts are interrupted by Daria,</p>' +
			'<p><i>"in her body...Leanne...I should not think about that...."</i></p>' +
			'<p>Did she hear you, but she seemed to think it was her own thoughts. Then you feel a chill in her, your, both of your body,</p>' +
			'<p><i>"Blessed draft...I should finish dressing...", and she looks at a mirror and you see she is only partly dressed in the light from a large stained-glass window.</i></p>' +
			'<p>You wonder if you can influence her thoughts more...</p>'
		);
		startQuestions();
		if (perMS.checkFlag(1)) addLinkToPlace(md, 'remember sex with the Thrall Leanne', 384, 'type=msmast');
		addLinkToPlace(md, 'dress back in my room', 384, 'type=mswander');
		addLinkToPlace(md, 'discipline Desiree', 332, 'type=discipline');
		WritePlaceFooter(md, '', true, true);
		return;
		
	} else {
		// During the first possession
		md = WritePlaceHeader(false, td, td == "td-none" ? "black" : "");
		addPlaceTitle(md, "Mother Superior\'s Room", "nunroom1.jpg");

		md.write('<p>A very simple room decorated in a way that would most generously be called "spartan".</p><p>For a moment you are amazed at how few trappings these Nuns live with.</p>');
		if (perMS.checkFlag(4)) md.write('<p>A small bowl of chicken soup sits on a table next to the bed, evidently her way of nursing herself back to health.</p>');
	}

	// Choices
	startQuestions();
	
	if (isPlaceKnown("MotherSuperiorsSecretRoom")) addLinkToPlace(md, 'enter the secret room', 383);	//Know about the secret room
	addLinkToPlace(md, 'walk back to the cloisters', 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '');

	WritePlaceFooter(md);
}
