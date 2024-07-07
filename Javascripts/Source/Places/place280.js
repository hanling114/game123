// Place: Strip Club - Jade's Room

function ShowPlace280(stype)
{
	var md = WritePlaceHeader();
	
	// TITLE LINE
	addPlaceTitle(md, !perJade.isCharmed() || perJade.isLover() ? "Jade's Room" : "Club Office", "dungeon.jpg");

	md.write('<p>The room is outfit as a stylised dungeon, a fantasy of BDSM and other gear.</p>');

	if (isInvisible()) {
		// Invisibility cancelled!
		showPopupWindow("Visible Again",
			(!perJade.isCharmedBy() ? perJade.addPersonString("roomu.jpg", "height:max%", "right") : "") +
			"Suddenly the invisibility spell ends and you are completely visible!</p><p>" + 
			(perJade.isCharmedBy() ? (perJade.checkFlag(2) ? 'It seems the protections in this room also prevents this spell working!' : 'You are not sure why?')
			                       : 'Jade says "Don\'t do that again, this room is warded against tricks like that"'),
			"endInvisibility();dispPlace(280)"
		);
		WritePlaceFooter(md);
		return;
	}
	
	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (perJade.isClubOpen()) addLinkToPlace(md, "return to the main area of the club", 282);
	if (perJade.isCharmedBy() || perJade.isCharmedBy("Vampyre")) addLinkToPlace(md, "leave the club through the side door", 281);

	WritePlaceFooter(md);
}