// Place: Mansion Entryhall and Upstairs

function ShowPlace18(stype)
{
	var md = WritePlaceHeader();
	var perSarah = findPerson("Sarah");
	var perLauren = findPerson("Lauren");
			
	var marea = getQueryParam("area");
	
	if (marea == "upstairs" || marea == "upstairsafter") {
		// Upstairs hallway
		addPlaceTitle(md, "Upstairs Hallway", "hallway1.jpg");
		md.write('<p>A hallway mostly leading to bedrooms, but the layout is quite old-fashioned with some common rooms like a shared bathroom.</p>');

		if (perSarah.place == 192 && perSarah.other == 101) md.write('<p>You notice a door is ajar and you hear the noise of running water.</p>');
		if (perSarah.place == 192 && (perSarah.other == 114 || perSarah.other == 117 || perSarah.other == 120)) md.write('<p>You do not see Lauren in the hallway. she must already be in Sarah\'s room.</p>');
		// Questions
		startQuestions();
		visitSarah(md);
		if (isPlaceKnown("MansionGuestRoom")) addLinkToPlace(md, "go to the guest room", 290);
		if (perSarah.place == 192 && perSarah.other == 101) {
			addLinkToPlaceO(md, "check the room", 291, 'stage=sarahlauren1');
			addLinkToPlace(md, "go downstairs", 18, 'area=entry', 'As you leave you hear a voice &quot;It appears this will be a boring visit&quot;', '', 'LeaveNoBath()');
			if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16, '', 'As you leave you hear a voice &quot;It appears this will be a boring visit&quot;', '', 'LeaveNoBath()');
		} else {
			addLinkToPlace(md, "go downstairs", 18, 'area=entry');
			if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
		}

	} else if (marea == "locked") {
		// Front door locked
		if (perLauren.dress == "") perLauren.dress = "Shay";	
		addPlaceTitle(md, "Locked Front Door", "door4.jpg");
		perLauren.setFlag(8);
		md.write('<p>You attempt to open the front door to leave and you find it is securely locked and dead-bolted. As you consider what to do, a person interrupts you, ');
		if (perSarah.place != 192) md.write(' a maid dressed rather scantily,');
		else md.write(' it is Lauren, Sarah\'s maid, dressed a bit differently,');
		md.write(
			'</p><p>"' + perLauren.getYourNameFor() + ' I am sorry to tell you the mansion is strictly locked at night, and the doors will not be unlocked until sunrise.".</p>' +
			'<p>She notices your glances at her skimpy dress, and she blushes, but says nothing.</p>' +
			'<p>With some embarrassment she leaves, heading upstairs.</p>'
		);

		// Questions
		startQuestions();
		addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		addLinkToPlace(md, "go upstairs", 18, 'area=upstairs');
		AddPeopleColumnMed();
		perLauren.showPersonDN("lauren1b.jpg");
		WritePlaceFooter(md);
		return;
		
	} else if (marea === "" || marea === "entry") {
		// Entry hall
		if (perSarah.place == 192 && marea === "") {
			// Counter for events, ideally once per visit to mansion
			if (perSarah.other > 102 && perSarah.other < 115) perSarah.other = Math.floor(perSarah.other + 1);
			else if (perSarah.other > 115 && perSarah.other < 122) perSarah.other = Math.floor(perSarah.other + 1);
		}
		addPlaceTitle(md, "Entry Hall", "mansionentry.jpg");
		md.write('<p>The entry way for the Mansion, a grand room to show-off the mansion. From here you can go upstairs or to ' + perGates.getPersonNameShort() + '\'s study.</p>');
		
		if (isInvisible()) {
			showPopupWindow("Wards?",
				addImageString("mansionentry.jpg", "30%") +
				'<p>What...you should be invisible still, you know "The unseen" training and should still be invisible, but you certainly are <b>not</b>. There must be some sort of ward to protect against the invisible!',
				"endInvisibility();dispPlace(Place,'type=entry')"
			);
			WritePlaceFooter(md);
			return;
		}
		
		// Questions
		startQuestions();
		if (!isMurderPath() && !isConspiracyPath()) addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		addLinkToPlace(md, "go upstairs", 18, 'area=upstairs', '', '', '', 'moveblock');
		addLinkToPlaceM(md, "visit the basement", 19);
		if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
	}

	WritePlaceFooter(md);
}

