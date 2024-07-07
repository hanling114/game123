// Place: Catherine's Room

function ShowPlace438()
{
	var md = WritePlaceHeader();

	var perCatherine = findPerson("Catherine");

	perCatherine.showPersonRandom(perCatherine.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu", 2);
	addPlaceTitle(md, "Catherine\'s Bedroom");

	md.write('<p>Catherine strips quickly down to her cute pink underwear and kneels on her bed,</p>');
	
	if (isVisible()) md.write('<p>"' + perYou.getPersonName() + ' I hope you are not just here for a conversation, you know I am ready for <i>anything</i> you want!”</p>');
	else md.write('<p>Catherine follows you into the room, she seems somehow aware of you, or at least something, her familiy has a strong occult bloodline. She sits there waiting...</p>');

	// Questions
	startQuestions();

	addLinkToPlace(md, 'leave the bedroom', 436);
	addLinkToPlace(md, 'leave the house', 37);

	WritePlaceFooter(md);
}