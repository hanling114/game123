// Place: Leanne's living room

function ShowPlace450(stype)
{
	var md = WritePlaceHeader();
	var perLeanne = findPerson("Leanne");
	var nInf = perLeanne.getInfluenced();		// current influence

	if (!perLeanne.isHere()) {
		// House is empty
		if (nInf > 4 && sType === "" && !perLeanne.checkFlag(21) && perLeanne.place === 9999) return gotoPlaceDelayed(38, '', '<img src=\"UI/knock.png\" style=\"float:left;width:10%;margin-right:5px\">No one answers your knock and you hear no one moving, but as you try to reach Leanne on her Mobile phone, you hear it ringing inside the house.');

		addPlaceTitle(md, "Leanne\'s Living Room", "livingroom6.jpg");
		md.write('<p>Leanne\'s very clean and stylish living room.</p>');
		startQuestions();
		addLinkToPlace(md, "leave the house", 38);
		WritePlaceFooter(md);
		return;
	}

	var bThrall = perLeanne.isCharmedBy("Demon");	// Thrall Leanne is here

	// Thrall or as herself?
	if (bThrall) {
		var bLost = isDemonGone();

		// Later visits
		perLeanne.showPerson("homet.jpg");
		addPlaceTitle(md, "The Thrall in Leanne\'s Living Room");

		if (isDemonGone() || perLeanne.checkFlag(28)) {				// Leanne is lost forever or you gave up!
			md.write(
				'<p>Your thrall is here ready to do anything you command.</p>'
			);
		} else {
			md.write('<p>The thrall is still here, you still have to work out how to deal with her');
			if (perYourBody.FindItem(48) === 0 && perYourBody.FindItem(48) != -53) md.write(', and you still do not have the relic..');
			md.write('.</p>');
		}

	} else {

		// Leanne as herself
		var clv = perLeanne.getCharmedLevel();
		var bRecovered = perLeanne.isRecovered();
		if (nInf > 4 && sType === "" && clv === 0) return gotoPlaceDelayed(38, '', '<img src=\"UI/knock.png\" style=\"float:left;width:10%;margin-right:5px\">You hear a rustle inside, but the door remains closed, it seems like Leanne doesn&rsquo;t want to see you right now.');

		if (clv == 1) perLeanne.showPersonDN("homecl.jpg");
		else if (clv == 4) perLeanne.showPersonDN("homecs.jpg");
		else if (perLeanne.hadSexYourself() && !perLeanne.checkFlag(16)) perLeanne.showPerson("homeusays.jpg");
		else perLeanne.showPersonDN("homeu.jpg");
		addPlaceTitle(md, "Leanne at Home");

		md.write('<p>Leanne has inherited a pleasant, modern home which she often laments is much to big for her to live in all alone by herself. She has openly contemplated selling it a few times, but in the end, she doesn\'t want to leave the memories behind and hopes that maybe one day it\'ll be filled with a family of her own.</p>');

		if (clv == 1) {
			md.write(
				'<p>Your lover greets you with a deep kiss right after you open the door and pulls you into the house.</p>' +
				'<p>“I missed you, ' + perYou.getPersonName() + '.” She says with a happy smile. “How have you been? Any sexy new slaves or girlfriends I should know about?”</p>'
			);

		} else if (clv == 4) {
			md.write(
				'<p>Your slave had given you a spare key to her house, and when you let yourself in and she is already expecting you. “Welcome home, ' + perYou.getMaster() + '.” She welcomes you with a soft smile, seductively lying on the sofa. “What can your little slut do for you?”</p>'
			);

		} else {
			if (perLeanne.checkFlag(17)) {
				md.write(
					'<p>Leanne asks you calmly, but rather firmly to please leave if you are not willing to help or even talk to her about it.</p>' +
					'<p>She has been rather mad about what you did during her possession/She was under enough stress after what happened, to begin with, and your unwillingness to help her surely didn\'t give you any bonus points here.</p>'
				);
			} else if (perLeanne.checkFlag(16)) {
				if (nInf === 0) md.write('<p>“Hey ' + perYou.getPersonName() + ', it\'s good to see you.” Leanne greets you with a warm hug and invites you in. “How are you, and how are your magic-stuff-studies coming along?”</p>');
				if (nInf < 5) md.write('<p>Leanne greets you warmly and invites you inside. She is still a bit guarded around you, but more calm and relaxed by now, asking you about your day and how your “magic-stuff-studies” are moving along.</p>');

			} else if (perLeanne.hadSexYourself()) {
				md.write(
					'<p>Leanne is still dealing with the aftermath of her possession and often nervous, especially while you are around. She has taken a few days off from work to deal with the dreams, anxiousness and... other feelings she is not yet willing to discuss.</p>' +
					'<p>You did offer your help, but she is understandably still rather upset with you and flatly says that the best way for you to help is giving her some time and space to work things out herself.</p>' +
					'<p>You figured it might be for the best to give her that space. The residual effect from the glamour the thrall used has not fully worn off, and the longer you are around her, the more you remember what you did when it offered her body to you, and the more you wonder what it would be like to have her again.</p>'
				);
			} else {
				md.write(
					'<p>Leanne is happy to see you, but the time as Legions thrall clearly took a toll on her.</p>' +
					'<p>She gladly asks you inside when you visit, but usually avoids talking about anything regarding the demon and often asks you to leave early or excuses herself on short notice.</p>' +
					'<p>You know that she has taken a few days off of work to deal with the dreams, anxiety and other... feelings she is unwilling to discuss, and you occasionally check in on her, but give her the space she needs, and for good reason.</p>' +
					'<p>The residual effect of the thralls glamour has still not worn off, and the longer you are with her, the more your mind drifts off, and you find it harder to not see her as she was back then, naked, beautiful, and all too willing to be taken by you.</p>'
				);
			}
		}
	}

	startQuestions();
	addLinkToPlace(md, "leave the house", 38);
	WritePlaceFooter(md);
}
