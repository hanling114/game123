// Place: Church Courtyard

function ShowPlace319()
{
	var md = WritePlaceHeader();
	
	setPlaceKnown("ChurchCourtyard");

	// TITLE LINE
	addPlaceTitle(md, "Church Courtyard", "church3.jpg");

	// Description
	md.write(
		'<p>The inner courtyard of the Lady of our Heavenly Father.  It is almost unbelievable, the vista that lies before you.  Beautiful fountains, sculptures and even a large hedge maze all lie within a short walk.  Surprisingly there are not many people moving around such a large area, giving you the feeling of privacy even out in the open air.</p>' +
		'<p>A lovely fountain of crisp clear water bubbles away near the west wall of the courtyard.</p>'
	);

	// Choices
	startQuestions();

	addLinkToPlace(md, 'enter the cloisters', 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '');
	addLinkToPlace(md, 'walk back into the Church proper', 318);
	
	if (isPlaceKnown("ChurchSecretDoor") && !isPossess()) {
		//know about "back door" and NOT POSSESSED
		addLinkToPlace(md, 'walk out the secret door through the wall', 320);
	}

	WritePlaceFooter(md);
}