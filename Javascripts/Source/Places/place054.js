// Place: Relaxation Center

function ShowPlace54()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	perSharon.showPerson("stress.jpg");
	addPlaceTitle(md, "A Relaxation Center");

	md.write('<p>You enter the hidden door that Sharon told you about. You walk through into a dirty basement where Sharon greets you and welcomes you to her Relaxation center. She says that all their facilities are yours to use free of charge.</p>');

	startQuestions();

	addLinkToPlaceC(md, "have Sharon massage you", Place, 'type=sharonmassagerelax');
	addLinkToPlaceC(md, "turn Sharon into an exhibit", Place, 'type=sharonexhibitrelax');

	addLinkToPlace(md, "head back to the alley", 52);
	WritePlaceFooter(md);
}