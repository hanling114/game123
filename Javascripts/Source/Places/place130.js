// Place: Parkview Rd

function ShowPlace130()
{
	var md = WritePlaceHeader();

	// Placing the pictures

	// Your home
	if (isPlaceKnown("UrsulasHouse")) addPlaceImage(md, "house20.jpg");
	if (isPlaceKnown("MsCharlesHouse")) addPlaceImage(md, "house21.jpg");

	// Description
	addPlaceTitle(md, "Parkview Road", '', 25);
	md.write('<p>A private neighborhood and also one of the older parts of Glenvale.</p>');

	if (isPlaceKnown("UrsulasHouse")) md.write('<p>You see an old house near the end of the road it is the Melin ancestral home, now owned by the Hamilton\'s.</p>');
	if (isPlaceKnown("MsCharlesHouse")) md.write('<p>You see a slightly out of place home of a Mediterranean style, still fairly old. This is the home of Ms. Charles.</p>');

	startQuestions();

	// Houses
	if (isPlaceKnown("UrsulasHouse")) addLinkToPlace(md, "enter the Hamilton home", 131);
	if (isPlaceKnown("MsCharlesHouse")) {
		if (!isCharmedBy("MsCharles") && per.whereNow() != 135) addLinkToPlace(md, "knock on the door of the Charles home", 130, '', 'No one seems to be home!');
		else addLinkToPlace(md, "enter the Charles home", 135);
	}
	addLinkToPlaceSouthEast(md, "walk to the Mansion", 16);	

	WritePlaceFooter(md);
}