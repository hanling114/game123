// Guest room in the Gates' Estate

function ShowPlace290(stype)
{
	var md = WritePlaceHeader();

	var perLauren = findPerson("Lauren");
	var myLord = perLauren.getYourNameFor();
	perLauren.setFlag(3);
	setPlaceKnown("MansionGuestRoom", false);
	
	if (perLauren.isCharmedBy()) {
		if (isMurderPath()) perLauren.showPerson("lauren4.jpg");
		else perLauren.showPersonDN("lauren6.jpg");
	} else if (stype == "escort") perLauren.showPersonDN("lauren1a.jpg");
	else addPlaceImage(md, "mansionguestroom.jpg");

	addPlaceTitle(md, "Guest Room");

	if (isMurderPath()) {
		// Murder Path version
		if (!perLauren.isCharmedBy()) {
			if (!perLauren.checkFlag(4)) {
				// This line is only said once when you first follow the maid back to her room
				md.write('<p>Following her discreetly, you watch as the maid enters one of the various guest rooms, her ass swaying slightly beneath the frills of the skirt, brought alluringly into view by the fabric\'s material. Pausing a moment, you wait for her to fully enter the room, watching the door frame as you speculatively look about, not expecting to see anyone else but wanting to be sure nonetheless. Finally, sure that you are indeed unlikely to come across any other people, you slip into the room.  The aloof servant is in an ensuite bathroom, and your entrance gains first a look of surprise then one of cool disdain.</p>');
				perLauren.setFlag(4);
			}
			md.write('<p>"Just what do you think you are doing here?" she asks, her voice ice-cold as she stares down at you as if you were little more than vermin she could exterminate without a moment\'s thought or care. "This is a private bedroom.  Leave now or I will call the police!"</p>');
		} else if (isInvisible()) md.write('<p>Lauren, the maid, followed you to the guest room and is waiting to serve you, despite your invisible state! Somewhere, deep down, she still has an independent spirit - only the magic has stripped away any reason she may have had to resist before you charmed her.</p>');
		else md.write('<p>Lauren, the maid, is waiting to serve you. Somewhere, deep down, she still has an independent spirit - only the magic has stripped away any reason she may have had to resist before you charmed her.</p>');
		
	} else {
		// Apprentice Path
		if (stype == "escort") {
			// First visit with Lauren
			if (getQueryParam("charm") == "yes") CharmLauren(md);
			else {
				// Just arrived
				perLauren.extra[0] = 0;
				if (getPersonOther("Sarah") == 100) setPersonOther("Sarah", 101);
				md.write('<p>Lauren escorts you to the room. It is a slightly old fashioned looking room, but everything is expensive and of fine quality. She shows you where things are including some spare clothes and night-attire. She waits a little to answer any questions.</p>');
			}
		} else md.write('<p>A slightly old fashioned room, but everything is expensive and of fine quality.</p>');
		
	}
	
	startQuestions();

	if (stype == "escort") addLinkToPlaceC(md, '"Thank you Lauren, that will be all"', 290);

	if (!isDay()) {
		if (!perLauren.isCharmedBy()) {
			perYou.addSleepLink(md, "go to bed for the night", "Goodnight", '<p style="position:absolute;left:50%;top:10%;cursor:pointer;font-size:1.1em;width:50%;color:white">You retire to bed for the night.</p>', 
				'bed.jpg'
			);
			//addLinkToPlace(md, "go to bed for the night", '', '', 'You retire to bed for the night', '', "WaitForDayNight()");
		}
	} else addOptionLink(md, 'wait for darkness', 'WaitForDayNight()');
	
	if (isMurderPath()) addOptionLink(md, "exit the guest room", "visitSarah()");
	else addLinkToPlace(md, "exit the guest room", 18, 'area=upstairs');

	WritePlaceFooter(md, isMurderPath() ? "Script by EH" : "");
}