// Place: Gate's Mansion Basement

function ShowPlace19(stype)
{
	var md = WritePlaceHeader();
	
	addPlaceImage(md, "gatesbasement.jpg");
	AddImage("Items/metalbowl.jpg", "50%", "left", '', '', undefined, md, 'noall');
	addPlaceTitle(md, "Gates's Mansion Basement");
	md.write(
		'<p>The basement is a well kept area with a ritual pentagram on the floor. You see a table to one side with various arcane items, including a metal bowl filled with water.</p>'
	);

	startQuestions();
	if (perYou.checkFlag(29) && perYou.checkFlag(61)) addLinkToPlaceC(md, "meditate on the bowl", Place, 'type=contemplate');
	addLinkToPlace(md, "return upstairs", 18, 'area=entry');
	WritePlaceFooter(md);
}