// South Apartment building foyer

function ShowPlace490()
{
	var md = WritePlaceHeader(false, 'td-left-large');

	addPlaceTitle(md, "South Apartment Building", "apartments1b-foyer.jpg");

	setPlaceBreakIn("Apartments", false);
	setPlaceKnown("Apartments");  // Set the Apartments as known

	md.write('<p>The foyer of the south apartment building, surprisingly clean and well maintained. These are a mirror image of the north building</p>');

	startQuestions();
	if (isPlaceKnown("JennysApartment")) {
		if (wherePerson("Jenny") == 491) addLinkToPlace(md, 'visit Jenny\'s apartment', 491);
		else addLinkToPlace(md, "visit Jenny's apartment", 490, '', 'There is no answer at the bell, she is probably not home.');
	}	
	if (isCharmedBy("Sharon")) {
		if (wherePerson("Sharon") == 492) addLinkToPlace(md, 'visit Sharon\'s apartment', 492);
		else addLinkToPlace(md, "visit Sharon's apartment", 490, '', 'There is no answer at the bell, she is probably not home.');
	}

	addLinkToPlace(md, 'leave the apartment building', 455);

	WritePlaceFooter(md);
}