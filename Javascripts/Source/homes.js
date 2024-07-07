/********************* Homes **************************************************************************/

function showGeneralPlace(title, img, desc, exitlabel, exitto, exitlabel2, exitto2, wid, clr, dir)
{
	var md = WritePlaceHeader(false, wid, clr);

	addPlaceTitle(md, title, img, 0, false, clr === "black" ? "white" : "");

	if (desc !== undefined && desc !== '') md.write('<p>' + desc + '</p>');

	startQuestions();

	if (exitto != 0) {
		// Prevent a duplicate link
		if (md.sPage.indexOf("gotoPlace(" + exitto + ",") == -1) addLinkToPlace(md, exitlabel === undefined ? 'exit' : exitlabel, exitto, '', '', '', '', dir === undefined ? '' : "moveblock " + dir);
	}
	if (exitlabel2 !== undefined && exitlabel2 !== '') {
		// Prevent a duplicate link
		if (md.sPage.indexOf("gotoPlace(" + exitto2 + ",") == -1) addLinkToPlace(md, exitlabel2, exitto2, '', '', '', '', dir === undefined ? '' : "moveblock " + dir);
	}

	WritePlaceFooter(md);
}

function addEntry(md, lnk, plc, params, vis, empty, key, lockmsg, invismsg, msg)
{
	if (!vis) return;
	
	if (isInvisible()) addLinkToPlace(md, lnk, plc, params, invismsg);
	else addLinkToPlace(md, lnk, plc, params, msg);		// Normal entry
}
