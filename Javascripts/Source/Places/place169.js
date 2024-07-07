// Officer Khan's Office

function ShowPlace169(stype)
{
	var md = WritePlaceHeader();

	var perOK = findPerson("OfficerKhan");

	// Visit her in the office
	perOK.showPerson("pol10a.jpg");

	addPlaceTitle(md, getOfficer() + " Khan\'s Office");

	md.write('<p>' + getOfficer() + ' Khan swoons over to you, seeking to satisfy your desire. Anything you ask for is yours.</p>');

	// Questions
	startQuestions();
	if (perOK.getPath() == 2 && !isDavyDefeated()) addQuestionC(md, 'tell her to arrest Davy and bring him here', "OfficerKhan", 522);

	addLinkToPlaceC(md, '"I desire you!"', 169, 'type=khandesire');

	addLinkToPlace(md, "exit " + getOfficer() + " Khan\'s office?", 168);

	WritePlaceFooter(md);
}