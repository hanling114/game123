// Place: Exploring the Stones

function ShowPlace86(stype)
{
	var md = WritePlaceHeader();

	addPlaceImage(md, "stones.jpg");
	if (checkPlaceFlag("WildRanges", 4)) addPlaceImage(md, "hawthorn.jpg");
	addPlaceTitle(md, "Searching the Stones");

	md.write(
		'<p>You search among the stones - between the massive boulders of the Wild Ranges and under the clumps of sticks and pebbles.</p>'
	);
	if (checkPlaceFlag("WildRanges", 4)) md.write("<p>A few hawthorn trees, well more like bushes, grow wild near the stones.</p>");
	
	// What do you find?
	if (perDavy.other === 0) {
		// Card to indicate Mr Beasley and Davy Robbins are working together
		perDavy.other = 1; // Start the Davy Robbins Path
		md.write(
			'<p>As you are about to you give up your quest you see a card. ' +
			'You turn the card over to see that it has Mr. Beasley\'s name on the front and some illegible writing in Davy Robbins\' handwriting on the back.</p>'
		);
		
	} else if (checkPersonFlag("Bambi", 5) && perYou.getQuestRustyKey() < 999) {
		// Key to the Wine Rack
		md.write('<p>You can see a dull rusty metallic object deep in a gap between two stones.</p>');
		
	} else if (checkPersonFlag("Vampyre", 10) && !checkPlaceFlag("WildRanges", 4) && checkPlaceFlag("HistoryClassroom", 11)) {
		addPlaceImage(md, "hawthorn.jpg", "20%");
		md.write('<p>You see a hawthorn tree near the stones as Esmeralda described. Well it is nearer a bush that a tree...</p>');
		setPlaceFlag("WildRanges", 4);
	} else {
		// Default, nothing special
		md.write('<p>You give up for now, there is nothing to find.</p>');
	}

	if (!isSpellKnown("Charm") && !checkPersonFlag("Seraphina", 1)) {
		startQuestions("You are surprised by a voice behind you");
		addLinkToPlaceC(md, '"Hello, is that yours?"', 86, 'type=thrall1');
	} else startQuestions();
	if (checkPlaceFlag("WildRanges", 4)) addLinkToPlace(md, "craft some stakes from hawthorn wood", Place, '', 'You find some pieces of fallen wood and trim them with a small pocket knife you have. You engrave the runes and place the stakes in your bag', '', 'bChatLeft=false;perYou.AddItem(65)');
	addLinkToPlace(md, "walk to the Wild Ranges", 26);

	WritePlaceFooter(md);
}