// Charley's House

function ShowPlace428()
{
	var md = WritePlaceHeader();

	var perC = findPerson("Charley");
	var bHere = perC.isHere();
	var bMan = perYou.isMaleSex();
	var bBlonde = !perC.checkFlag(2);
	var nm = perC.getPersonNameShort();
	var clvC = perC.getCharmedLevel();

	if (bHere) {
		if (bBlonde) perC.showPerson("charleyhomea.jpg" );
		else perC.showPerson("charleyhomeb.jpg");
	}

	addPlaceTitle(md, nm + "\'s House", bHere ? '' : "bedroomc.jpg");

	md.write('<p>' + nm + '\'s house is modest but fairly cozy. You could see yourself spending some good quality time here.</p>');
	if (bHere) {
		if (isVisible()) {
			if (clvC == 1) md.write('<p>' + nm + ' reluctantly greets you as you walk in. She has her tits on full display as you have instructed her. She has no choice but to wait for your next command.</p>');
			else md.write('<p>' + nm + ' greets you as you walk in. She has her tits on full display as she knows you enjoy.</p>');
		}
	} else md.write('<p>' + nm + ' is across the street at the Salon now though.</p>');

	startQuestions();
	addLinkToPlace(md, "leave her house", 5);

	WritePlaceFooter(md);
}