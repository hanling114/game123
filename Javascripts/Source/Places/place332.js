// Place: With Sister Desiree (still logically the courtyard 319)

function ShowPlace332(stype)
{
	// Is there STUFF here from Mother Superior?
	var perSister = findPerson("Desiree");	
	if (!perSister.isHere()) return dispPlace(319);	//Desiree is NOT here
	
	var bThereIsStuffHere = perSister.NoItems > 0;
		
	var md = WritePlaceHeader(false, "", '', '', '', !bThereIsStuffHere);

	if (perSister.other == 10) perSister.other = 9;  //Reset it so you can still ask for forgiveness

	/******************************************
	Sister Desiree
	*****************************************

	PICTURE REFERENCES */

	if (isPossess()) perSister.showPerson("sister2.jpg");		// While possessing Mother Superior the first time
	else if (perSister.isCharmedBy()) perSister.showPerson("sister1c.jpg");
	else perSister.showPerson("sister1u.jpg");

	/*  General Description */

	/* TITLE LINE */
	if (perSister.isCharmedBy()) //CHARMED
	{
		addPlaceTitle(md, "Desiree - Disciple of Desire");
		if (isPossess()) {
			//Possession Description
			md.write('<p>You can hear your disciple Desiree quickly putting her habit back on as you approach.  "Yes Mother Superior?" she asks, unable to completely mask the sound of the pleasure still coursing through her body.</p>');
		} else {   	// Normal CHARMED description
			if (isInvisible()) 	md.write('<p>As you approach you can see Desiree playing with herself and moaning in pleasure.  You smile with satisfaction at what her pleasure must mean.</p>');
			else if (perSister.getQuestRelic() == 20) {
				//Back from "Looking for the Relic" but didn't find it
				md.write('<p>Desiree sees you approach, the look on her face one of pure anguish.  You have a sinking suspicion that she could not find the relic.</p>');
			} else if (perSister.getQuestRelic() == 35 || perSister.getQuestRelic() == 36) {
				//Back from getting Mother superior's Rosary
				md.write('<p>As you approach you can see Desiree playing with herself and moaning in pleasure.  You smile with satisfaction at what her pleasure must mean.</p>');
			} else {
				md.write('<p>Your disciple\'s robes part the moment she sees that her Angel has returned.  Her crucifix is glistening wetly. "Hello, ' + perYou.getMaster() + '," she croons.  "What do you desire of me?"</p>');
			}
			md.write('<p> You\'re not sure why but you can\'t help but pause for a moment, almost taken aback by the strength of her faith in you.  Of course, you know it\'s all just the spell, but she seems to have taken it to such a level that it\'s almost...  palpable.  Impressive.  Even for you.</p>');
		}

		if (!isPossess() && bThereIsStuffHere) {
			//Possession Spell NOT Cast and STUFF IS HERE
			md.write('<p>You notice a few things hidden under a bush.  "Oh yes, my Angel, Mother Superior quite unexpectedly entrusted a few things to my care.  Of course you may take them if you wish, they are rightfully yours after all."</p>');
		}
	}
	else
	{
		addPlaceTitle(md, "The Good Sister");


		if (isInvisible()) md.write('<p>In this corner of the garden, near the hedge maze, a lovely nun stands in prayer.</p>');
		else if (perSister.other < 5) // haven't introduced yourself yet
		{
			md.write(
				'<p>In this corner of the garden, near the hedge maze, a lovely nun stands in prayer.  She stops when she sees you, evidently surprised to see anyone other than her sisters and the Mother Superior.</p>' +
				'"Hello," she says uncertainly.  "Are you lost?  This area is typically off-limits to outsiders'
			);
			if (perYou.isBornMale()) md.write(', particularly men');
			md.write(
				'."</p>' +
				'<p>"My name is ' + perYou.getPersonName() + '," you say.  "What\'s yours?"</p>' +
				'<p>"I am Sister Desiree," she says, then frowns.  "But I do not see why-"</p>' +
				'<p>"The Mother Superior sent me back here to speak with you," you interrupt, lying smoothly.</p>' +
				'<p>"Oh," she says, visibly relaxing.  "Then how can I be of service?"</p>'
			);
		}
		else
		{
			md.write(
				'<p>In this corner of the garden, near the hedge maze, the lovely Sister Desiree stands in prayer.  She stops when she sees you, evidently surprised to see anyone other than her sisters and the Mother Superior.</p>' +
				'<p>"Good morrow, ' + perYou.getPersonName() + '," the beautiful Sister greets you pleasantly, if a little formally.</p>'
			);
		}
	}

	//**********************************************************************
	startQuestions();
	addLinkToPlace(md, 'leave her be', 319, '', '', '', 'Exit332()');
	WritePlaceFooter(md);
}