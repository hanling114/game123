// Place: Bartel Home Pool

function ShowPlace423(stype)
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Bartel Swimming Pool", "pool2" + (isNight() ? "-night" : "") + ".jpg");
	
	md.write(
		'<p>The swimming pool looks very expensive, but it is empty at this time.</p>'
	);

	// Questions
	startQuestions();
	addLinkToPlace(md, 'leave the pool', 420);
	WritePlaceFooter(md);
}