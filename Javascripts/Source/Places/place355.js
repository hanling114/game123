// Place: Movie Theatre Lobby

function ShowPlace355()
{
	var md = WritePlaceHeader();

	addPlaceImage(md, "theatre.jpg");
	addPlaceTitle(md, "Movie Theatre");

	md.write('<p>The local Cinema. Its a nice place but times are tough and it has been less and less busy recently. It has gottan a bit run down but it usually has the newest big releases.</p>');

	startQuestions();

	addLinkToPlace(md, "visit the Adults only section of the Theatre.", 356);
	addLinkToPlace(md, "leave the Theatre", 344);
	WritePlaceFooter(md);
}
