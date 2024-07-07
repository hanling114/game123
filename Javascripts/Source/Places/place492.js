// Sharon's home

function ShowPlace492()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	var clvS = perSharon.getCharmedLevel();
	var bHere = perSharon.isHere();
	var bMan = perYou.isMaleSex();
	
	if (bHere) perSharon.showPerson(isInvisible() ? "sharonbath.jpg" : "sharonhome.jpg");

	addPlaceTitle(md, "Sharon\'s apartment", bHere ? '' : "sharonhouse.jpg");

	md.write(
		'<p>Sharon\'s home is nicely furnished and feels pretty cozy. Not surprising for someone who specializes in relaxation.</p>'
	);
	if (bHere) {
		if (isInvisible()) md.write('<p>Sharon is having a relaxing bath when you arrive.</p>');
		else md.write('<p>Sharon is already kneeling on her bed with her breasts exposed. She knows that her body pleases you so she never wants to make you wait to see it.</p>');
	} else md.write('<p>Sharon is at the Massage parlor now.</p>');

	startQuestions();

	if (bHere) {
		addLinkToPlaceC(md, 'take a bath with her', Place, 'type=sharonhomebath');
		addLinkToPlaceC(md, 'fuck her', Place, 'type=sharonhomefuck');
		if (bMan) addLinkToPlaceC(md, 'fuck her ass', Place, 'type=sharonhomeassfuck');

		if (bMan && isExplicit()) {
			perSharon.addSleepLink(md, "sleep while she sucks", "Attentive Servant",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Sharon is careful not to go too hard while you sleep because she knows you need your rest.</b>',
				'Explicit/sharonsleepb.jpg', true
			);
		} else {
			perSharon.addSleepLink(md, "sleep with Sharon", "Attentive Servant",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Sharon knows you need your rest.</b>',
				'sharonsleep.jpg', false
			);
		}
	}

	addLinkToPlace(md, "leave her apartment", 490);

	WritePlaceFooter(md);
}