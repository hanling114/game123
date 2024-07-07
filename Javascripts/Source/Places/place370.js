// Place: Glenvale Radio & Television Station

function ShowPlace370()
{
	var md = WritePlaceHeader();

	if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.
	if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");	//  Know the TV station if you don't already.
	if (!isPlaceKnown("GlenvaleHerald")) setPlaceKnown("GlenvaleHerald");	//  Know the Newpaper office if you don't already.

	addPlaceTitle(md, "Glenvale Radio & Television Station", "radio1.jpg");

	addPlaceDescription(md, 
		'Glenvale\'s single Radio and Television station.', 
		'It may not look like much, but inside are some relatively cutting-edge radio productions and the town\'s ' +
		'very own news channel, MC Channel 4 at 10 O\'Clock. Not the highest-rated news show on TV, but it does have some colorful faces.</p>' +
		'<p>One of those faces happens to be your Mother\'s. Well, she isn\'t on the TV so much as a part of the production crew.</p>' +
		'<p>The building also houses the recording and production offices for the local radio station MC 550 and a small package delivery company.',
		"TVStation", 3
	);
	addPlaceDescription(md, 
		'On the way to the station you pass the small office for the Glenvale Herald local newspaper.',
		'You cannot recall looking at the paper, but you have seen your mother often reading it.',
		"TVStation", 3
	);
	
	startQuestions();

	addLinkToPlace(md, "enter the TV station", 371);
	if (wherePerson("MrsRobbins") == 366) addLinkToPlace(md, 'enter the newspaper office', 366);
	else addLinkToPlace(md, 'enter the newspaper office', 370, '', 'There is no-one in the office, you guess they are out \'reporting\' on stories.');
	addLinkToPlace(md, "walk to the police station", 167);

	WritePlaceFooter(md);
}