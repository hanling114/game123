// Celeste Road

function ShowPlace455()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Celeste Road", "street5.jpg");

	md.write('<p>Celeste Road consists of several recently build apartment houses located in the town\'s outer ring and maintained by a local company, the area has a reputation to provide quality housing for singles, students and low income families.</p>');

	startQuestions();
	addLinkToPlace(md, 'enter the north apartments', 456);
	addLinkToPlace(md, 'enter the south apartments', 490);
	addLinkToPlaceWest(md, "walk to Oakpine Rd", 212);

	WritePlaceFooter(md);
}