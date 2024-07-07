// Place: Tunnel

function ShowPlace249()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Tunnel", "tunnel1.jpg");

	md.write('<p>Through the limestone of Glenvale you walk in the	gloomy tunnel, a tunnel that must have been carved by the first inhabitants of the town.</p>');

	startQuestions();
	addLinkToPlaceNorth(md, "go to the sacred clearing", 141);		
	addLinkToPlaceSouth(md, "go to the Wild Ranges", 26);
	WritePlaceFooter(md);
}