// Event: Bartel Home Lounge room

function ShowPlace422(stype)
{
	var perCarol = findPerson("Carol");
	var bCarolCharmed = perCarol.isCharmedBy();
	var perEllie = findPerson("Ellie");
	var herName = perEllie.getPersonName();
	var clvE = perEllie.isCharmedBy() ? perEllie.getCharmedLevel() : 0;
	var myName = clvE == 4 ? perYou.getMaster() : perYou.getPersonName();
	var sHere = getQueryParam("here");
	
	var md = WritePlaceHeader();

	// Visit Ellie in the lounge room
	if (sHere == "leigh") {
		perEllie.showPerson("Carla!ellieandleigh.jpg");
		addPlaceTitle(md, "Ellie and Leigh in the Living-room");		
	} else {
		perEllie.showPersonRandom("ellie16", 2);
		addPlaceTitle(md, "Ellie in the Living-room");
	}

	if (stype == "visitcb") {
		// Visiting while Carol is busy with Kristin
		md.write('<p>You knock on the door to the Bartel home and after a little ' + herName + ' answers and she leads you into the living room. She is not wearing very much at all.</p>');
		if (clvE == 4) md.write('<p>"Hello ' + myName + ' this slave is sorry for being so slow, her mother is currently busy with a friend of hers, the Bank Manager Kristin."</p>');
		else md.write('<p>"Hello my love! Sorry I took so long, I thought my mother was going to answer the door. Then I remembered she is busy with her friend Kristin". You notice she looks a little unhappy. You reassure her that it will be alright and she smiles and kisses you.</p>');
	} else if (stype == "visitc") {
		if (!bCarolCharmed) {
			md.write(
				'<p>Carol tells you that Ellie is in the lounge room, and steps aside as you enter the house. Before you have a chance to do anything else, she has already moved into another room and closes the door. "I just leave you two alone." You hear her comment from behind the door in a teasing voice.</p>' +
				'<p>Once again, you are surprised at the speed of the women of this family, what are they all? Hyperactive? You go to Ellie\'s room, and she greets you wearing little more than a rather sexy corset.</p>'
			);
		}
	} else {
		// Visiting at another time
		if (clvE == 4) {
			md.write(
				'<p>You request to talk with your slave in private for a bit, and Carol gives the two of you a knowing wink before she excuses herself into the Kitchen to prepare a snack.</p>' +
				'<p>Ellie opens the door to her room, obediently waiting for you to enter with her eyes still downcast, and locks it behind her.</p>' +
				'<p>You sit down on a nearby couch and watch her as she slips onto her knees again, both legs slightly spread and her arms resting on her tights, palms upward in a strangely specific looking way.</p>' +
				'<p>"How may this slave be of service to you, ' + perYou.getMaster() + '?" She asks submissively, not daring to look at you directly.</p>'
			);
		} else {
			md.write(
				'<p>' + herName + ' is sitting on the lounge, and she is not wearing very much at all.</p>' +
				'<p>"Hello my love! I am really happy to see you again!!</p>'
			);
		}
		if (sHere == "leigh") {
			md.write(
				'<p>You see Leigh looking in from the hallway leading to her room, and you invite her in to join Ellie and you.</p>'
			);
		}
	}

	// Questions
	startQuestions();
	//addLinkToPlaceO(md, 'wait for a while', 422);
	if (bCarolCharmed) addLinkToPlaceO(md, "leave with Ellie to join Carol", 420);
	addLinkToPlace(md, 'leave the house', 5);

	WritePlaceFooter(md);
}