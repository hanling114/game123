// Place: Mrs. Robbins Bedroom

function ShowPlace82()
{
	var md = WritePlaceHeader();

	// ***********************************************************************

	addPlaceTitle(md, "Mrs. Robbins\' Bedroom", "bedroom10.jpg");

	if (wherePerson("Tina") != 82) md.write('<p>Mrs Robbins bedroom, nothing unusual except for the small whip you see poking out from under the bed.</p>');
	
	startQuestions();
	if (!(isCharmedBy("MrsRobbins", "Davy") && !perYou.isBornMale())) addLinkToPlace(md, 'exit the bedroom', 176);

	WritePlaceFooter(md);
}