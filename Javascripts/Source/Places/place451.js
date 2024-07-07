// Lola's home

function ShowPlace451()
{
	var md = WritePlaceHeader();

	var perLola = findPerson("Lola");
	var clvL = perLola.getCharmedLevel();

	if (perLola.isHere()) perLola.showPerson(isInvisible() ? "lolahome3.jpg" : clvL == 4 ? "lolahome1.jpg" : "lolahome2.jpg");

	addPlaceTitle(md, "Lola\'s Home", perLola.isHere() ? "" : "livingroom5.jpg");

	md.write(
		'<p>Lola\'s home is nicely furnished and elegant. The woman clearly cared about appearances and design.</p>'
	);
	if (perLola.isHere()) {
		if (isInvisible()) md.write('<p>Lola is lying sensually, you assume thinking of you and waiting your arrival.</p>');
		else if (clvL == 4) md.write('<p>Lola greets you as you walk in. You see that she has truly embraced her primal nature as she is completely nude and crouched on a tiger print cushion.</p>');
		else md.write('<p>Lola greets you as you walk in, it seems she saw you approaching and she greets you in her living room, completely naked.</p>');
	} else md.write('<p>Lola is at the Museum now.</p>');

	if (isItemHere(45)) md.write('<p>You see an un-opened box containing a strap-on. Lola will not miss it if you want to take it.</p>');
	
	startQuestions();

	if (perLola.isHere()) {
		addLinkToPlaceC(md, clvL == 4 ? 'have her suck again' : 'ask her ' + (perYou.isMaleSex() ? 'for a blowjob' : 'to lick your pussy'), Place, 'type=lolahomebj');
		if (clvL == 4 && perYou.isMaleSex()) {
			addLinkToPlaceC(md, "spread her apart", Place, 'type=lolahomespread');
		}
		if (perYou.isMaleSex()) {
			addLinkToPlaceC(md, 'fuck her ass', Place, 'type=lolahomeass');
		}
		addLinkToPlaceC(md, 'how about some normal fucking', Place, 'type=lolahomefuck');

		perLola.addSleepLink(md, "take her to bed", clvL == 4 ? "Faithful servant" : "Lola, your charmed lover",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Lola now craves being used by you, and lies on the bed ready for you to take her however you choose.</b>',
			'lolasleep.jpg', true
		);
	}
	
	addLinkToPlace(md, "leave her house", 38);
	WritePlaceFooter(md);
}