// Event: Take Bambi to room - Charmed version

function ShowPlace182(stype)
{
	var perBambi = findPerson("Bambi");
	var md = WritePlaceHeader(undefined, undefined, undefined, undefined, undefined, !perBambi.checkFlag(8));
	
	if (!perBambi.isCharmedBy()) {
		// Uncharmed
		perBambi.showPerson("bambi1.jpg");
		addPlaceTitle(md, "Meeting Bambi");

		md.write(
			'<p>The barmaid escorts you to her hotel room, then excuses herself to freshen up. When she returns she is the icon of beauty.</p>' +
			'<p>&quot;You have made the right decision, ' + perYou.getPersonName() + '&quot; she says as softly as the wind. ' +
			'&quot;Not many people in this town can afford my company, especially students.&quot;</p>' +
			'<p>You gulp. &quot;I think that I did as well Miss Bambi. Where do we start?&quot;</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"Do... do we make love now?"', 182, 'type=askmakelove');
		WritePlaceFooter(md);
		return;
	}
	
	var myLord = perBambi.getYourNameFor();
	var myName = perYou.getMaster();

	// Entered the room with her
	perBambi.showPerson("bambi17" + perBambi.getSuffix() + ".jpg");

	if (perBambi.checkFlag(4)) perBambi.showPersonAnon(findPerson("Mia").getImgS("bambimother.jpg"), "40%");

	addPlaceTitle(md, "Bambi's Room");
	if (perBambi.whereNow() == 182) {
		md.write(
			'<p>Bambi is so overwhelmed that you are visiting her bedroom.  She can\'t wait to show you just how good a slave she can be, quickly preparing herself for your use.</p>' +
			'<p>"Oh ' + myLord + '," she says in a soft moan. "I\'ve never loved anyone as much as I love you. Please command me ' + myName + ', I live to serve you, and only you..."</p>'
		);
		
	} else {
		md.write(
			'<p>Bambi is so overwhelmed by your invitation to the bedroom.  She can\'t wait to show you just how good a slave she can be, quickly preparing herself for your use.</p>' +
			'<p>"Oh ' + myLord + '," she says in a soft moan. "I\'ve never loved anyone as much as I love you. Please command me ' + myName + ', I live to serve you, and only you..."</p>'
		);
	}
	
	if (!perBambi.checkFlag(8)) {
		// Just charmed her, haven't taken the stone yet
		md.write('<p>You notice a familiar stone in Bambi\'s room.  It would seem that such stones make excellent paper weights... or book ends.</p>');
	} 

	startQuestions("Accept her devotion and...");
	addLinkToPlace("top", 'enjoy Bambi\'s services', 182, 'type=bambifuck');
	if (perYou.isMaleSex()) addLinkToPlace("top", 'get a blowjob', 182, 'type=bambibj');
	else addLinkToPlace("top", 'have her lick you', 182, 'type=bambibj');

	//*******************************************************************
	// Common questions when meeting charmed Bambi
	startQuestions();
	addLinkToPlace(md, 'go back down to the bar', 124);

	WritePlaceFooter(md);
}