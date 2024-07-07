// Place: Outside City Hall

function ShowPlace94()
{
	var md = WritePlaceHeader();
	
	var perAngela = findPerson("Angela");
	var perMayor = findPerson("Mayor");
	
	setPlaceBreakIn("TownHall", false);
	if (perAngela.isCharmedBy()) perAngela.setFlag(2);
	if (perMayor.isCharmedBy("You")) perMayor.setFlag(3);
	
	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");							// Access to Hotel
	if (!isPlaceKnown("Firestation")) setPlaceKnown("Firestation");			// Access to Firestation

	addPlaceTitle(md, "Glenvale Town Hall", "cityhall1.jpg", 25);

	if (perAngela.isCharmedBy() && perMayor.isCharmedBy("You")) {
		md.write(
			'<p>Glenvale’s town hall proudly stands as a symbol of your power and authority. Not from the outside, as it still looks the same fifty-four years old building as always. ' +
			'Instead, what’s inside of it changed that matters. Mayor ' + perMayor.getPersonNameShort() + ' Thomas has had a change of heart recently and decided to become your slave and ' +
			perMayor.getHisHer() + ' secretary, Angela, also joined ' + perMayor.getHimHer() + '. The Town Hall is officially one of your strongholds, with your slaves working for you tirelessly inside it.</p>'
		);
	} else {
		md.write(
			'<p>Glenvale\'s town hall proudly stands as a symbol of unity in the community. Only fifty-four years old, the building has been occupied ' +
			'by many of the finest council management officials, including the current Mayor ' + perMayor.getPersonNameShort() + ' Thomas. Just passing by the town ' +
			'center gives you a comfortable feeling of security and reliability.</p>'
		);
	}
	md.write(
		'<p>You see nearby the firestation for the fire-fighters for Glenvale. It is a small volunteer servive run on a part-time basis. People are only here rarely.</p>'
	);
	
	if (!isShopOpen(0)) {
		md.write('<p>The town hall has a sign noting that it is closed, hours of business 8am to 6pm Monday to Friday.</p>');
	}
	md.write('<p>The firestation has a sign noting that it is closed</p>');

	// Dialogue Options
	startQuestions();
	if (isShopOpen(0)) {
		if (checkPersonFlag("Angela", 6) && !checkPersonFlag("Mayor", 4)) addLinkToPlace(md, "enter the Town Hall for the meeting", 100, 'type=eventa');
		else addLinkToPlace(md, "enter the Town Hall", 95);
	}
	if (isPlaceKnown("Museum")) addLinkToPlaceNorth(md, "walk to Oakpine Rd", 212);
	if (!checkPlaceFlag("TownHall", 11)) addLinkToPlace(md, 'check the Firestation', 94, '', 'There is no-one in, it is a voluntee service, operated part-time<br><i>not implemented</i>.', '', "setPlaceFlag('TownHall', 11)");
	addLinkToPlaceWest(md, "walk to the Library", 2);
	addLinkToPlaceSouthWest(md, "walk to the Hotel", 123);
	if (isPlaceKnown("PoliceStation")) addLinkToPlaceSouth(md, "walk down Radio Dr to the Police Station", 167);
	if (isPlaceKnown("TVStation")) addLinkToPlaceSouth(md, "walk further down Radio Dr to the TV Station", 370);	// Know about the Tv Station

	WritePlaceFooter(md);
}