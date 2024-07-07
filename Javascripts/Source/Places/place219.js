// Place: Housing Estate near the hospital

function ShowPlace219()
{
	var md = WritePlaceHeader();

	// Placing the pictures
	var perZali = findPerson("Zali");

	addPlaceImage(md, "house2.jpg", "90%", "", "", undefined, true);
	perZali.showPersonAnon("mailbox.jpg", "50%");

	// Description
	addPlaceTitle(md, "Housing Estate");
	
	md.write('<p>An old housing estate near the hospital probably mainly used by hospital workers</p>');
	
	startQuestions();
	if (perZali.isCharmedBy()) addLinkToPlace(md, "enter Zali's home", 220);
	addLinkToPlace(md, "walk to the Hospital", 215);
	addLinkToPlace(md, "walk to the park bridge", 216);

	WritePlaceFooter(md);
}