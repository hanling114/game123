// Place: Mayors Office

function ShowPlace110()
{
	var md = WritePlaceHeader();

	var perAbby = findPerson("Abby");
	var perAngela = findPerson("Angela");
	var perKhan = findPerson("OfficerKhan");
	var perMayor = findPerson("Mayor");
	var sCharmedBy = perMayor.sCharmedBy;
	var sShe = perMayor.getHeShe();
	var sHer = perMayor.getHisHer();
	var bMayorYours = sCharmedBy == "You";
	var bMayorDavy = sCharmedBy == "Davy";

	if (!bMayorYours) {
		// NOT charmed
		perMayor.showPerson("mayor1.jpg");
	} else {
		// IS charmed
		perMayor.showPerson("mayor5.jpg");
	}

	//******* Mayor Thomas, v15/v16/p6 (1==in office) ****************

	addPlaceTitle(md, "Mayor Thomas");
	md.write('<p>Mayor Thomas greets you as you enter ' + sHer + ' office');

	if (!bMayorYours) // Not Charmed
	{
		md.write(', ' + sShe + ' looks quite concerned and unsure of your visit.</p>');
		if (isMurderPath()) // On Murder Path
		{
			if (perMayor.other == 6 || perMayor.other == 11) {
				if (!perMayor.checkFlag(6)) md.write('<p>' + capitalize(sShe) + ' looks at you expectantly.  "So, did you bring the book with you this time?" ' + sShe + ' asks, running ' + sHer + ' tongue over ' + sHer + ' lips as if she is about to win a prize.<p>');
				else md.write('<p>' + capitalize(sShe) + ' looks at you expectantly.  "Well, go and get the book" she asks, running ' + sHer + ' tongue over ' + sHer + ' lips.<p>');
			}
			if (!bMayorDavy) md.write('<p>"What happened, ' + perYou.getPersonName() + '?  That boy, Davy...  Why did I?" ' + sShe + ' says, shaking ' + sHer + ' head in confusion.  "Everything was so fuzzy, but now I can think clearly again!</p>');
		}
	} else {
		if (perMayor.isMan()) {
			md.write(
				'. The once cold leader of the town is now rubbing his groin through his underwear for you, ready to serve your every desire.</p>' +
				'<p>"Welcome ' + perYou.getMaster() + '! Please take a seat. How can I be of service?", he lovingly asks as he still plays with his cock, it’s his way of welcoming you.</p>'
			);
		} else {
			md.write(
				'. The once cold leader of the town is now rubbing her tits and pussy through her black panties for you, ready to serve your every desire.</p>' +
				'<p>"Welcome ' + perYou.getMaster() + '! Please take a seat. How can I be of service?", she lovingly asks as she still plays with her pussy, it’s her way of welcoming you.</p>'
			);
		}
	}

	startQuestions();

	if (perMayor.other == 3) addQuestionC(md, 'say hello to the mayor', "Mayor", 1603);

	if (isMurderPath() && perMayor.other > 3 && bMayorDavy) // Sir Ronald MURDERED && introduced
	{
		if (perMayor.other == 4 && perKhan.other < 10) {
			// Haven't apologized and haven't already offered to help.
			addQuestionC(md, 'ask to help out with the murder investigation', "Mayor", 5310);
		}
		if (perMayor.other == 4) addQuestionC(md, 'apologize for bothering ' + perMayor.getHimHer(), "Mayor", 1601);
		else if ((perMayor.other == 5  || perMayor.other == 10) && perYourBody.FindItem(4) > 0)  {
			// Mayor UNDER DAVY's control and you have the book
			addQuestionC(md, 'tell the mayor that you have the book', "Mayor", 1602);
		}	else if (!perMayor.checkFlag(6) && (perMayor.other == 6 || perMayor.other == 11))	{
			if (perYourBody.FindItem(4) > 0) {
				startAlternatives(md);
				addQuestionC(md, 'tell the Mayor you have the book right here in your backpack', "Mayor", 16999);
			}
			addQuestionC(md, 'tell the Mayor that you don\'t have it on you at the moment', "Mayor", 1606);
			if (perYourBody.FindItem(4) > 0) endAlternatives(md);
		}
		if (perMayor.other < 10 && getPersonOther("Tina") >= 4) {
			// Didn't apologize before, and Tina can un-charm people
			addQuestionC(md, 'tell the mayor to go to the Robbins house', "Mayor", 6104);
		}

	} else {
			// Apprentice path
	}

	if (bMayorYours && sType === "") // if Mayor is charmed
	{
		addLinkToPlace(md, 'ask Mayor Thomas for more', 110, 'type=askmore');

		if (isMurderPath() && perKhan.other < 10) {
			//Haven't apologized and haven't already offered to help.
			addQuestionC(md, 'ask to help out with the murder investigation', "Mayor", 5310);
		}

		if (checkPlaceFlag("Hospital", 3) && !checkPlaceFlag("Hospital", 4)) addQuestionC(md, 'ask the Mayor for a key to the hospital basement', "Mayor", 44201);
		if (checkPlaceFlag("Park", 6) && !checkPlaceFlag("Park", 5)) addQuestionC(md, 'ask the Mayor for a key to the construction site', "Mayor", 44202);
	}

	addLinkToPlace(md, 'go to the reception', 95);

	WritePlaceFooter(md);
}