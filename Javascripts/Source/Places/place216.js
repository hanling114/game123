// Place: Park Bridge

function ShowPlace216()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Park Bridge", "park2.jpg");

	if (perYou.isShot()) {
		// Player has been shot
		md.write('<p>You enjoy the fresh air from the surrounding gardens and, for a moment, you forget about the pain in your shoulder.</p>');
	} else {
		// Other times
		md.write('<p>You enjoy the fresh air from the surrounding gardens as you cross the bridge over the river and leave the park.</p>');
	}
	md.write('<p>In the distance you see the hospital and off to one side a few secluded homes.</p>');

	startQuestions();
	
	if (nFromPlace == 47) {
		addOptionLink(md, "walk to the Hospital", 'LeaveKate4(215)', "moveblock northeast");
		addOptionLink(md, "return to the Park entrance", 'LeaveKate4(47)', "moveblock west");
	} else {
		addOptionLink(md, "walk to the Park entrance", 'LeaveKate4(47)', "moveblock west");
		addOptionLink(md, "return to the Hospital", 'LeaveKate4(215)', "moveblock northeast");	
	}
	WritePlaceFooter(md);
}