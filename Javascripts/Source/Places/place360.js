// Place: Outside Aquarium

function ShowPlace360()
{
	var md = WritePlaceHeader();

	setPlaceBreakIn("Aquarium", false);
	
	addPlaceTitle(md, "Glenvale Aquarium", "aquarium1.jpg");

	md.write(
		'<p>Glenvale\'s Aquarium stands tall as one of the oldest aquariums in the area, and although its age may be somewhat obvious from the look and architecture outside, ' +
		'inside it is <i>the</i> most frequently remodeled aquarium - the city trustees spending a lot of time, and money, on making sure that ' +
		'they have the most modern and up-to-date scientific displays of oceanographic life.</p>' +
		'<p>It was also a great place to take a date on friday nights since the lighting was always kept so low.</p>' +
		'<p>The Aquarium is actually part of the Glenvale Museum, but it is a separate building. There are pathways connecting the aquarium and the museum, but they also have separate access roads.</p>'
	);
		
	if (!isShopOpen(2, 0, true)) md.write('<p>The Aquarium has a sign noting that it is closed, hours of business 8am to 8pm.</p>');

	startQuestions();
	if (isShopOpen(2, 0, true)) addLinkToPlace(md, 'enter the Aquarium', 361);
	else if (wherePerson("Melissa") != 494 && isCharmedBy("Melissa")) addLinkToPlace(md, 'ask Melissa to let you in', 361);
	
	addLinkToPlaceEast(md, 'walk to the Museum', 238);
	addLinkToPlaceEast(md, 'walk to Oakpine Rd', 212);
	
	WritePlaceFooter(md);
}