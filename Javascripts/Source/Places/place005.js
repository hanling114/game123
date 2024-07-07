// Place: Dervish Rd

function ShowPlace5()
{
	var md = WritePlaceHeader();

	// Placing the pictures

	if (isPlaceKnown("KristinsHouse")) addPlaceImage(md, "house2.jpg", "90%", "", "Kristin's House", undefined, true);
	if (isPlaceKnown("BartelHouse")) addPlaceImage(md, "house8.jpg", "90%", "", "Bartel House", undefined, true);
	else if (!isPlaceKnown("KristinsHouse")) addPlaceImage(md, "street1.jpg", undefined, undefined, undefined, undefined, true);
	if (isPlaceKnown("PrincipalsHome")) addPlaceImage(md, "house12.jpg", "90%", "", "Ms. Reagan's House", undefined, true);


	// Description
	addPlaceTitle(md, "Dervish Road");
	
	md.write('<p>A more expensive part of town, the houses are larger and well tended ');
	if (isDay()) md.write('but there are very few children around playing.</p>');
	else md.write('and there are very few people around at this time of night.</p>');
	if (isPlaceKnown("KristinsHouse")) md.write('<p>You can see 10 Dervish Rd, Kristin\'s house.<br>It\'s rather gothic, a strange looking and probably old house. You get a slightly odd feeling about the house.<br>');
	if (isPlaceKnown("BartelHouse")) md.write('<p>You can see 12 Dervish Rd, the Bartel\'s house.<br>The house is quite luxurious' + (checkPersonFlag("Carol", 1) ? '' : ', you would guess Ellie is not the owner of the house') + '.<br>');
	md.write('<p>There is a hair dressing salon on the corner of Cherise and Dervish and it is ' + (isShopOpen(2, 0, true) ? 'open' : 'closed') + ', opening times listed as 8am to 8pm.</p>');
	if (isCharmedBy("Charley")) md.write('<p>' + per.getPersonNameShort() + "'s home is near the salon at 2 Dervish Rd</p>");
	if (isPlaceKnown("PrincipalsHome")) md.write('<p>You can see 20 Dervish Rd, Ms. Reagan\'s house.<br>It is a clean and new looking home, the grounds are immaculately maintained.<br>');
	startQuestions();

	if (isPlaceKnown("KristinsHouse")) addLinkToPlace(md, "enter Kristin\'s Residence", 430);
	if (isPlaceKnown("BartelHouse")) addLinkToPlace(md, "enter the Bartel\'s Residence", 420);
	var nm = findPerson("Charley").getPersonNameShort();
	if (isShopOpen(2, 0, true)) addLinkToPlace(md, "visit " + nm + "\'s Salon", 427);
	if (isCharmedBy("Charley")) addLinkToPlace(md, "enter " + nm + "\'s House", 428);
	nm = findPerson("MsReagan").getPersonNameShort();
	if (isPlaceKnown("PrincipalsHome")) addLinkToPlace(md, "enter " + nm + "\'s House", 390);

	if (isPlaceKnown("Alley")) addLinkToPlaceNorth(md, "walk to Yoolaroo Drive", 43);
	if (isPlaceKnown("CheriseRd")) addLinkToPlaceNorthEast(md, "walk to Cherise Rd", 37);
	addLinkToPlaceEast(md, "walk to the shops", 194);

	WritePlaceFooter(md);
}