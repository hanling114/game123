// Place: School Admin Hallway

function ShowPlace78()
{
	var bOpen = isShopOpen(2);

	var md = WritePlaceHeader();

	addPlaceTitle(md, "Administration Wing Hallway", "school-adminwing.jpg");

	md.write('<p>This is the part of the school for administration offices including the Principal\'s office. There is also a lounge reserved for the teachers to take a break away from students.</p>');


	// ********************************************************************

	startQuestions();

	addLinkToPlace(md, "go to the teacher\'s lounge", 72);
	if (isPlaceKnown("SchoolAdmin")) addLinkToPlace(md, "go to the administration office", 73);

	// Nurses Office
	if (isPlaceKnown("NursesOffice")) addLinkToPlace(md, "go to the Nurses office", 69, wherePerson("DoctorKay") == 69 && !isCharmedBy("DoctorKay") ? 'type=followntinalater' : '');
	if (isPlaceKnown("PrincipalsOffice")) {
		if (!bOpen)	addLinkToPlace(md, "go to the principal\'s office", 78, '', 'The Principal\'s Office is locked');
		else addLinkToPlace(md, "go to the principal\'s office", 71);
	}
	addLinkToPlace(md, "return to the main school hall", 70);

	WritePlaceFooter(md);
}