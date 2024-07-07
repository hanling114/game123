// Place: Outside Hospital

function ShowPlace215()
{
	var md = WritePlaceHeader(false, "td-left-med");

	addPlaceTitle(md, "Glenvale Hospital", "hospital1.jpg", 50);

   md.write(
		'<p>Standing in front of the hospital you realize how old the town is. The hospital was erected more than 100 years ago.</p>'
	);
	if (isPlaceKnown("Museum")) md.write('<p>You notice an access road for traffic that leads to Oakpine Road, the road the Museum is on.</p>');

	setPlaceKnown("Hospital");

	startQuestions();

	addLinkToPlace(md, "enter the hospital", 214);
	if (isPlaceKnown("ZalisHouse") && wherePerson("Zali") != 1000) addLinkToPlaceSouth(md, "follow the path to the housing estate", 219);
	addLinkToPlaceWest(md, "walk to the park bridge", 216);
	if (isPlaceKnown("Museum")) addLinkToPlaceEast(md, "walk to Oakpine Rd", 212);

	WritePlaceFooter(md);
}