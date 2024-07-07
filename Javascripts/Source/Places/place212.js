// Place: Oakpine Rd

function ShowPlace212()
{
	var md = WritePlaceHeader();

	// Description
	
	addPlaceTitle(md, "Oakpine Road", "oakpinerd.jpg");
	
	md.write(
		'<p>Oakpine Road is lined with large trees, probably from the founding of Glenvale, you guess some kind of oak tree from the name of the road.</p>' +
		'<p>The road leads through the civic and business heart of the town with public buildings and office buildings hidden behind the trees.</p>'
	);
	if (isPlaceKnown("Museum")) md.write('<p>At the north end of the road lies the Glenvale Museum, with a long access road leading to the museum itself.</p>');
	if (isPlaceKnown("Aquarium")) md.write('<p>Glenvale\'s Aquarium is an annex of the Museum and can be accessed from there but it also has a long access road.</p>');

	startQuestions();
	if (isPlaceKnown("Museum")) addLinkToPlaceWest(md, 'walk to the Museum', 238);			// Know about the Museum
	if (isPlaceKnown("Aquarium")) addLinkToPlaceEast(md, 'walk to the Aquarium', 360);	// Know about the Aquarium

	if (isPlaceKnown("CelesteRd")) addLinkToPlaceNorthEast(md, 'walk down Celeste Road', 455);	// Know about Celeste Road
	if (isPlaceKnown("Hospital")) addLinkToPlaceWest(md, "walk to the Hospital", 215);	
	addLinkToPlaceSouthWest(md, "walk to the Library", 2);
	addLinkToPlaceSouthWest(md, "walk to the Town Hall", 94);

	WritePlaceFooter(md);
}