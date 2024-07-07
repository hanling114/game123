// Place: Library Reference Area

function ShowPlace8(stype)
{
	// any acts being done (if Monique present)
	var act = getQueryParam("act");

	var md = WritePlaceHeader();

	var perMonique = findPerson("Monique");
	var clv = perMonique.getCharmedLevel();
	var myName = perMonique.getYourNameFor();
	var perAbby = findPerson("Abby");
	var bOpen = isShopOpen(2, 1, true) || act !== "";

	var s;
	var i;

	// Images
	if (bOpen && perMonique.place === 8) // Monique is in the Library
	{
		// Monique's Image
		if (perMonique.isCharmedBy()) {
			// Monique is Charmed
			if (act === "bj") perMonique.showPersonRandomRorX("monique10b", isExplicit() ? 2 : 1);
			else if (act == "lick") perMonique.showPersonRandomRorX("monique10g", 2);
			else if (act === "fuck") perMonique.showPersonRandomRorX("monique11b", 2);
			else if (act == "strap") perMonique.showPerson("monique11gc.jpg");
			else perMonique.showPerson(clv > 1 ? "monique7.jpg" : "monique9.jpg");
		} else {
			// Not charmed
			perMonique.showPerson("monique1.jpg");
		}
	} else addPlaceImage(md, "library-referencedesk.jpg", "", "", "Reference Desk");		// No one here

	// Text here
	if (act == "endcharm") {
		// Final part of charming Monique
		addPlaceTitle(md, "Slave Monique");

		md.write(
			'<p>"Please command me, ' + perMonique.getYourNameFor() + '.  I live to serve, and I serve only you."' +
			'Monique says in a honeyed voice, her fingers lightly pinching her nipples and every pore of her being dripping sex.</p>' +
			'<p>You have added a servant to your harem. Monique is eager to do whatever you want, and to please you in any and every way she can. All you have to do is command her and she is yours.</p>'
		);

	} else if (act === "bj") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Sometimes, words are not needed. Monique stands in front of you at the ready, and as you open your pants and gesture to the ground before you, your ever faithful slave immediately understands and crouches down.</p>' +
			'<p>Monique\'s tongue begins to slide eagerly over your manhood, covering you in her saliva and using her hand to get you erect, and doing a good job at it. You place one hand on your hip and drive the other through her hair, watching her as her lips wrap over the tip and begin to slide back and forth, enjoying your slaves administration.</p>' +
			'<p>“You practiced, did you?” You ask her, and the response is a muffled grunt of confirmation before she takes you in all the way to the base as if to show of the results of it. You definitely approve.</p>' +
			'<p>It doesn\'t take her long to bring you close to the edge and when the moment comes, you take a hold of her hair to keep her in place and shoot your load into her mouth.</p>' +
			'<p>Monique waits patiently, swallowing every drop as ordered and eagerly cleaning when might be left with her tongue after you let go of her.</p>'
		);

	} else if (act == "lick") {
		// Female oral service
		addPlaceTitle(md, "Reference Area");
		if (Math.random() < 0.4) {
			md.write(
				'<p>You grab Monique\'s hair and pull the woman into a kiss as a greeting before simply sitting down on her chair and ordering her to knee in front of you.</p>' +
				'<p>Monique is taken aback by your directness at first, nervously fidgeting with her fingers before quickly following up on your order and helping to undress you.</p>' +
				'<p>You smile as you wait for her to finish and lazily lean back, one of your legs now resting on her desk to present your sex to her. “You know what to do, my pet.”</p>' +
				'<p>“Y...yes Mistress.” Monique clearly isn\'t used to such a treatment, and it does take her a moment to "find her flow" so to say, but with a few subtle pointers from you, she begins to lure the first subtle moans from your lips.</p>' +
				'<p>You praise her advances and she seems to grow more confident, her tongue now flicking over your clit before she sucks it inside with her lips and decides to use her fingers to help out.</p>' +
				'<p>Soon, her efforts bear fruit, you feel your body tremble a little as your climax begins to build up and firmly take a hold of Monique\'s hair and press her closer against your twitching fold as you finally reach your peak. Once again praising your eager pets success.</p>'
			);
		} else {
			md.write(
				'<p>It doesn\'t take much for Monique to understand what it is you wish her to do as you sit in front of her with your legs spread. Leaning back she quickly gets on her knees in front of you to service your pussy. Her fingers slowly stroke along its length as she looks up at you happily. Servicing you seems to bring her a great amount of joy. Absently her fingers begin to trace letters along your clit, resulting in a faint gasp as she focuses her attention on arousing you. It isn\'t long before her lips force themselves between your labia and begin kissing the confines beneath. Such an attentive servant!</p>' +
				'<p>Her tongue slides from her mouth to poke at your opening, tracing the tip along the outer edges as she inhales deeply of your scent. Your fingers reach out and grasp hold of her hair as she teases you so. But without a little teasing then how can one be truly pleased?</p>' +
				'<p>Monique shifts position and knees at your side, sucking your clit into her mouth. Holding it trapped between her lips as her tongue dances wildly over the tiny nub. Her right arm snakes up under your leg as her thumb begins stroking along the length of your cunt, pausing only to focus on pushing against your hole before continuing to tease your dampened flesh. Devoted onto her task of pleasing you, the woman focuses upon the sounds that you make as a gauge of how well her manipulation of your body is succeeding. She definitely picked this up from somewhere...</p>' +
				'<p>Ever attentive to your body, her thumb ends teasing you and is quickly replaced by two fingers. Each thrust inward is followed with her fingers curling to rub against the ridges just as your cunt\'s opening. All while her warm breath flows out against your body. Underneath such relentless assault it doesn\'t take long for your body to succumb to orgasm. Your hips thrusting up as you cry out in pleasure. Monique isn\'t quite done with you yet, however. As she continued her sucking, licking, and fingering throughout your orgasm, quickly sending you into another.</p>' +
				'<p>Finally stopping your cunt is provided with only a moment\'s break before the feeling of her lips again returns to it. This time a much more tender succession of kisses all along your exposed sex.</p>'
			);
		}

	} else if (act === "fuck") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Monique has a rather spacious desk, and you feel like it would be a shame to not make full use of it.</p>' +
			'<p>You order her to clear a small section and undress before you simply push her to lay down on it.</p>' +
			'<p>Your faithful slave quickly realizes what you intent to do and eagerly spreads her legs, using one of her pens to play with her clit while you open your pants and free your shaft.</p>' +
			'<p>You have the woman lick it thoroughly, holding her hair until it stands fully at attention and you are ready to take her, eagerly pushing into her already wet sex and satisfy your desires.</p>'
		);

	} else if (act == "strap") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Monique has a rather spacious desk, and you feel like it would be a shame to not make full use of it.</p>' +
			'<p>You order her to clear a small section and undress before you simply push her to lay down on it.</p>' +
			'<p>Monique seems unsure what exactly you are planning at first, until you get the strap-on and a tube of lube from your sports bag and show both with a grin, causing your pet to blush heavily.</p>' +
			'<p>Taking your time to prepare, you run the freshly lubed dildo over your pets mound, spreading her folds and teasing her clit while you slowly stir the mana inside her to raise her arousal and suddenly push into her rear.</p>' +
			'<p>There is a sharp yelp of surprise from her, but thanks to your preparation, the huge rubber shaft enters her rear painlessly, and soon, she seems to quite enjoy the unexpected flood sensations. Her moans slowly growing louder as you push into her, driving your pet to a surprisingly quick orgasm.</p>'
		);

	} else {
		// Standard visit (no events)
		addPlaceTitle(md, "Reference Area");
		md.write('<p>Glenvale Library is supposed to hold one of the biggest collections of books in the county, and you can well believe it just looking through the reference area.</p>');

		if (perYou.getExperience() < 1)
		{
			md.write(
				'<p>The difficulty of finding the tome you seek begins to sink in. ' +
				'Who knows, maybe someone else already has possession of the magic and will be willing to turn it against you if you find them. As you enter the reference section, you consider these problems but are determined to try anyway.</p>'
			);
		}

		if (!bOpen || perMonique.place !== 8) {
			// Monique not in Library
			md.write('<p>The reference area is deserted. You look along the bookshelves for a clue to the mystery of magic. There does not appear to be any material on the matter here.</p>');

		}	else {
			// Monique IS in the Library

			// If Need to ask Monique about Davy (Hellgate Path) and She's Not Yet Charmed
			if (perDavy.getPathHellgate() === 5 && !perMonique.isCharmedBy()) {
				// then set v11 (Hellgate) to allow you to ask.
				perDavy.setPathHellgate(10);
			}

			// Description of Monique
			if (perMonique.other < 1) {
				md.write('<p>An attractive woman is sitting at one of the computer terminals. She\'s familiar to you; one of the staff. As you approach she startles and, too quickly, spins around to face you. Nervously you approach the woman.</p>');
			}	else if (perMonique.isCharmedBy()) {
				// Monique is charmed
				if (clv > 1) md.write('<p>Monique, ever your faithful slave' + addVisible(', stands at attention -', 'is always') + ' ready to serve you in any way you desire.</p>');
				else md.write('<p>Monique, the database administrator and now your close friend ' + addVisible('turns to face you', 'starts and glances in your direction but turns back to her computer') + '.</p>');
			} else {
				md.write('<p>Monique, the database administrator, ' + addVisible('spins around to face you', 'starts and glances in your direction but turns back to her computer') + '.</p>');
			}
			if (perMonique.other == 2 && perYourBody.FindItem(1) > 0) md.write('<p>Maybe you could <b>give</b> Monique the paper written by Mr. Beasley?</p>');
		}
	}

	// Dialog Choices
	startQuestions();
	
	if (perAbby.getQuestDragonGem() === 1)
	{
		if (bOpen && perMonique.place === 8) {
			// Is Monique in the library?
			addQuestionC(md, 'ask Monique to look up magic gems', "Monique", 251);
		}	else {
			addQuestionCO(md, 'look for references about magic gems', "LibraryResearch", 251);
		}
	}

	if (perKurndorf.getQuestSeance() === 16 || perKurndorf.getQuestSeance() === 17) {
		if (bOpen && perMonique.place === 8) {
			// Is Monique in the library?
			addQuestionC(md, 'ask Monique to research séances', "Monique", 2717);
		} else {
			addQuestionCO(md, 'look for any reference about séances', "LibraryResearch", 2717);
		}
	}

	addLinkToPlace(md, "go to the library reception?", 3);

	WritePlaceFooter(md);
}