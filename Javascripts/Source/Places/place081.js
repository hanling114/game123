// Place: Davy's Room

function ShowPlace81(stype)
{
	var md = WritePlaceHeader();

	setPlaceKnown("DavysRoom"); //Have been into Davy's Room

	// No one here
	addPlaceTitle(md, "Davy's Room", "bedroom6.jpg");
	if (stype == "teleport") md.write("<p>The pass spell transfers you into Davy Robbins\' room. ");
	else md.write('<p>You slip into Davy Robbins\' room. ');
	md.write('There\'s a mess everywhere: games, clothes and papers clutter the tiny room, making it very difficult to move around.</p><p>There are a few posters on the wall and inside a cupboard, you guess Davy has a taste for hard rock and metal music across a wide range of periods. A poster for Meatloaf\'s "Bat Out of Hell II" is on the wall. as is one for "Metallica" and a little known parody band "Barbarion".</p>');
	if (checkPlaceFlag("RobbinsHouse", 8)) {
		md.write('<p>In the far corner you see a laptop');
		if (isSpellKnown("Teleport")) md.write(' but you have already found everything useful in it');
		md.write('.</p>');
	}
	// Questions
	startQuestions();

	if (!checkPlaceFlag("RobbinsHouse", 8)) addQuestionR(md, 'search the mess', 'You search through the mess and you find buried an old model laptop.', 'Search the Room', "setPlaceFlag(\\'RobbinsHouse\\', 8);");
	else if (!isSpellKnown("Teleport")) {
		if (isPuzzles()) addLinkToPlace(md, 'check the laptop', 81, 'type=passwordpuzzle');
		else addLinkToPlace(md, 'check the laptop', 81, 'type=passwordright', 'You remember one time at school Davy mentioned something about passwords, so you enter what he had mentioned');
	}

	// Common Questions
	if (!isCharmedBy("MrsRobbins", "You")) addTextForQuestions(md, "<b>as you are breaking in, leaving through the house is a bad idea</b>", "center");
	addLinkToPlace(md, isCharmedBy("MrsRobbins", "You") ? 'leave Davy\'s room' : 'run out of the house!', 176);

	WritePlaceFooter(md);
}