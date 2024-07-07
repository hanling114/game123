// Adult section of Movie Theatre

function ShowPlace356()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Adults only section", "movieadult.jpg");

	md.write(
	  '<p>This theatre has really gotten with the times. Well...It still looks like a dump but its adult section has really been well stocked to meet the needs of its customers.</p>'
	 );

	startQuestions();
	addLinkToPlace(md, 'Return to the lobby', 355);
	WritePlaceFooter(md);
}