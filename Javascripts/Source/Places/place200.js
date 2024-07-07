// Cafe

function ShowPlace200()
{
	var md = WritePlaceHeader();
	var perEmma = findPerson("Emma");
	var clvEm = perEmma.getCharmedLevel();
	
	if (clvEm == 0) {
		// Uncharmed
		perEmma.showPerson("emma0.jpg");
		addPlaceImage(md, "cafe.jpg", "33%");
		addPlaceTitle(md, "A Quiet Coffee Shop");
		md.write(
			'<p>You walk into the coffee shop, its empty right now except for yourself. The prices are quite reasonable ' + sCurrency + '3 for a cup of coffee, the same for a variety of teas.</p>' +
			'<p>You can\'t help but notice the georgeous barista reading a book over the counter, though you would much rather see her ' + (perYou.isMaleSex() ? 'with a cock in her hand' : 'on her kees before you') + '.</p>'
		);
		startQuestions();
		if (nMoney < 3) addLinkToPlace(md, 'order a coffee', Place, '', 'Well you could if you had the money!');
		addLinkToPlace(md, 'order a coffee', Place, 'type=ordercoffee');
		if (nMoney < 3) addLinkToPlace(md, 'order some tea', Place, '', 'Well you could if you had the money!');
		addLinkToPlace(md, 'order some tea', Place, 'type=ordertea');		
		addLinkToPlace(md, "exit to the shopping center", 194);

	} else if (clvEm == 3) {
		// Girlfriend
		perEmma.showPerson("emmalover.jpg");
		addPlaceTitle(md, "A Quiet Coffee Shop");
		md.write(
			'<p>Your lover Emma was standing behind the counter. She walks out and you realise she is wearning little besides her apron.</p>' +
			'<p>"I thought you might like something on our special menu" she says.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'make love to your girlfriend', Place, 'type=emmafuck');
		addLinkToPlaceC(md, 'ask her for the oral special', Place, 'type=emmabj');
		addLinkToPlace(md, "exit to the shopping center", 194);

	} else if (clvEm == 2) {
		// Bimbo
		perEmma.showPerson("emmabimbo.jpg");
		addPlaceTitle(md, "A Quiet Coffee Shop");
		md.write(
			'<p>Your mindless bimbo whore Emma stands behind the counter. She is completely naked and practicaly shaking at the thought of you pounding her pussy into submission</p>' +
			'<p>"' + perYou.getMaster() + ', how do you want to use me today?" she asks, practically moaning already</p>'
		);
		startQuestions();
		addLinkToPlace(md, '"I\'m going to fuck your brains out."', Place, 'type=emmafuck');
		addLinkToPlace(md, perYou.isMaleSex() ? '"Suck my cock, whore!"' : '"Lick my pussy, whore!"', Place, 'type=emmabj');
		addLinkToPlace(md, "exit to the shopping center", 194);
		
	} else if (clvEm == 1) {
		// Mistress
		perEmma.showPersonBG("emmadom1.jpg");
		addPlaceTitle(md, "A Quiet Coffee Shop");
		md.write(
			'<p>Your domineering mistress Emma stands behind the counter. She has her chain at the ready to wrap arround your ' + (perYou.isMaleSex() ? 'balls while she garggles your cum' : 'neck while you lick her pussy') + '!</p>' +
			'<p>"Are you ready to serve me?"</p>'
		);
		startQuestions();
		addLinkToPlace(md, '"Yes Ma\'am"', Place, 'type=charmemmaDom2');
		addLinkToPlace(md, '"Sorry Ma\'am I need to leave"', 194);
	};

	WritePlaceFooter(md);
};