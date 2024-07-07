// Place: Outside New Age Shop

function ShowPlace344()
{
	var perJ = findPerson("Jessica");
	var md = WritePlaceHeader(false, "td-left-med");

	// TITLE LINE
	addPlaceTitle(md, "The New Age " + getShopStore(true) + "s", "newage2.jpg");

	// Description
	md.write(
		'<p>A small ' + getShopStore() + ' a short walk away from the rest of the shopping center.  Now that you think about it, you have heard stories of the psychic that owns the ' + getShopStore() + '.  It would seem she has a reputation of being the "real thing."</p>' +
		'<p>A few days ago you would have balked at such a statement. But with recent events, it leaves you wondering if perhaps she may be yet another magical individual in town.</p>' +
		'<p>Could she even be a threat?  Only time will tell.</p>'
	);
	if (!isShopOpen(-1, 1, true) || (perJ.place == 345 && perJ.checkFlag(27))) {
		md.write('<p>The New Age ' + getShopStore(true) + ' has a sign noting that it is closed, hours of business 7am to 6pm.');
		if (perJ.place == 345 && !perJ.checkFlag(27)) md.write(' Despite this you see the shop appears open.');
		md.write('</p>');
	}
	md.write(
		'<p>There is also a yoga studio here that also sells new age items, the "Chakra Chachkies" ' + getShopStore() + '.</p>'
	);
	if (!isShopOpen(-1, 1, true)) md.write('<p>The Chakra Chachkies ' + getShopStore(true) + ' has a sign noting that it is closed, hours of business 7am to 6pm.');

	if (!checkPlaceFlag("NewAgeStore", 3)) {
		setPlaceFlag("NewAgeStore", 3);
		md.write('<p>You had forgotten there was a movie theatre in town, a small cimema that looks a little run down, business must be difficult lately.</p>');
	} else md.write('<p>The movie theatre lies a bit further along the road, a small cimema that looks a little run down.</p>');
	
	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (perJ.place == 345 && perJ.checkFlag(27) && isShopOpen(-1, 1, true)) addLinkToPlace(md, "enter the New Age " + getShopStore(true), Place, '', 'The door is locked');
	else {
		if (isShopOpen(-1, 1, true) || perJ.place == 345) addLinkToPlace(md, "enter the New Age " + getShopStore(true), 345);
		if (perJ.place == 348) addLinkToPlace(md, "enter the Esmeralda's Home", 346);
	}
	if (isShopOpen(-1, 1, true) || isCharmedBy("Cherry")) addLinkToPlace(md, "enter the Chakra Chachkies " + getShopStore(true), 350);
	addLinkToPlaceWest(md, "walk to the movie theatre", 355);
	addLinkToPlaceEast(md, "walk back to the shopping center", 194);

	WritePlaceFooter(md);
}