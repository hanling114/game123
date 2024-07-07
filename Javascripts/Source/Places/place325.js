// Place: Graveyard

function ShowPlace325(stype)
{
	var md = WritePlaceHeader();

	// Image of the graveyard
	//addPlaceImage(md, "graveyard.jpg", "", "", "Graveyard");
	addPlaceTitle(md, "Graveyard", "graveyard.jpg");

	// Description
	md.write(
		'<p>The large graveyard of the city.  Many of the graves are so old and broken down that they must have been from the original settlers of the city before it was <i>rebuilt</i>.</p>' +
		'<p>There are any number of graves of different types, including more than a few mausoleums of people whose families were rich enough to not force their loved ones to endure interment <i>within</i> the earth, but rather above it.</p>'
	);
	if (!checkPlaceFlag("Graveyard", 2)) {
		setPlaceFlag("Graveyard", 2);
		showPopupWindow("The Graveyard",
			addImageString("graveyard2.jpg", "height:max%", "right") +
			"The town graveyard has a strange feel as you walk in the gate. A fog briefly rolls through the area, it is in a bit of a hollow but it is definitely creepy.</p>" +
			'<p>The strange feelings briefly intensify, and you get the impression of hidden mysteries. You know you once heard tales of <b>secret passages</b> but always considered those to talk about the Wild Ranges, but in this place now you are not sure. You have heard about escape tunnels from some old places, even from some churches!</p>' +
			(isDay() ? '<p>The fog is quickly blown away and the sun comes out.' : '<p>The fog is quickly blown away and the moon comes out.') + (isSpellKnown("Clairvoyance") ? ' You wonder if a spell would reveal anything?' : '')
		);
	}

	// Choices
	startQuestions();

	// Common choices/images
	if (isPlaceKnown("Mausoleum")) {
		//Know about Mausoleum (via clairvoyance spell from Graveyard or otherwise)
		addLinkToPlace(md, "inspect the Mausoleum", 324);
	}
	addLinkToPlaceNorthWest(md, "walk to the Broken Inn Hotel", 123);
	WritePlaceFooter(md);
}