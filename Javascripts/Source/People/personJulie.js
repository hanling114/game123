/**********************************************
Julie Luna
freelance reporter
***********************************************/

function initialiseJulie()
{
	addPerson("Julie", 477, "Julie", '', false, false);
	
	per.getPersonName = function(full) {
		if (full === true) return "Julie Luna";
		return this.sCharmedBy == "You" && !this.isLover() ? "Slave Julie" : this.name;
	};
	
	per.getPossessionFace = function() { return "faceu"; };
	
	per.showEventPopup = function()
	{					
		if (sType == "conferencecallout") {
			showPopupWindow("A Reporter",
				this.addPersonString("julie1.jpg", "height:max%", "right") +
				"You actually recognize this woman.</p>" +
				"<p>Julie Luna, at least that's her pen-name, is a writer for the Midwestern Gazette, a tabloid popular especially among fans of the arcane and paranormal. The paper itself deals mostly in celebrity gossip and strange conspiracy stories around haunted areas, occult rituals and the ever popular Alien abductions, but occasionally they do hit gold with a story. Julie's articles in particular are usually quite entertaining and as well researched as the subject matter allows. She did manage to earn some renown for it, and many question why she would waste her talent writing stories about Bigfoot's dietary habits instead of shooting for a bigger publication.</p>" +
				"<p>Still, to see someone like her here is surprising, you'd think Mayor Thomas would want to avoid gossipers and tabloids right now. ",
				'dispPlace(Place,"type=conferencetalkjulie1")'
			);
			return true;			
		}
		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, stage, bSarah;
		
		// Lunch interview (murder)
		if ((Place == 124 && this.checkFlag(3) && !this.checkFlag(2) && getHour() == 12) || sType == "lunchinterview") {
			setQueryParams("type=lunchinterview");
			this.setFlag(2);
			md = WritePlaceHeader();
			this.showPerson("lunch.jpg");
			addPlaceTitle(md, "Interview Over Lunch");
			md.write(
				'<p>You arrive in the hotel and see the reporter Julie and greet her. She shakes your hand and leads you through to the outdoor dining area. She sits and you start to ask her what she wants and she gestures, and says "Call me Julie, but in a little I am hungry, my employer is paying so order what you like" A waiter steps over and takes your order. Julie avoids talking about much before the food arrives but makes some comments and you understand she knows the history of the hotel.</p>' +
				'<p>After eating you tell Julie how you know of the gazette and read it regularly, she smiles and replies,</p>' +
				'<p>“Glenvale has always been a place of interest for myself and our readers, with the Kurndorf myth and the towns lively past, but right now the place seems abuzz with rumors of strange happenings from ghost sightings to people vanishing under mysterious circumstances.”</p><p>'
			);
			perJesse.showPerson("jesse-photo.jpg", "10%", "left");	
			md.write(
				'“In fact.” Her expression turns more serious. “A local blogger I wanted to meet is among those missing as well, a girl named Jesse.”</p>' +
				'<p>You really hope she did not notice how your stomach just made a double back-flip when you heard the name, but if she did, she doesn\'t show it and gladly gives you more information.</p>' +
				'<p>“Yes, she was last seen at the Broken Inn and completely went off the grid a few days back with not even her father knowing where she is.” She shows you a photo on her smartphone, and your heart sinks even further seeing an all too familiar face.</o>' +
				'<p>“It\'s also part of the real reason I wanted to talk to you. '
			);
			startQuestions();
			addLinkToPlaceC(md, 'try to answer her', Place, 'type=lunchinterview2');
			WritePlaceFooter(md);
			return true;				
		}
		if (sType == "lunchinterview2") {
			md = WritePlaceHeader();
			this.showPerson("lunch2.jpg");
			addPlaceTitle(md, "Interview Over Lunch");
			md.write(
				'<p>You say you think you met the young lady but only as a passing conversation with an attractive woman in a bar. Julie clearly does not believe you,.</p>' +
				'<p>“Really? What about the events she posted about, or the other sightings around town?”</p>' +
				'<p>You avoid talking about Jesse and just mention general things around town, and refer to the witch covens in the past and the Kurndorf cult and the sacred book...You change your topic realising you may of said too much. Julie can clearly see something and tries to ask more but you just answer in general things. She looks annoyed, "Alright I think this interview is over <b>for now</b>"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'end the interview', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		// Conference (apprentice path)
		if (sType == "conferencetalkjulie1") {
			// Stopped by Julie 1
			stage = getQueryParam("stage");
			bSarah = checkPersonFlag("Gabby", 12);		// Here with Sarah
			setPersonFlag("MsCharles", 5);
			this.setFlag(1);
			var perMayor = findPerson("Mayor");
			md = WritePlaceHeader();
			this.showPerson("julie1.jpg");
			addPlaceTitle(md, "A Reporter");
			switch(stage) {
				case "":
					md.write(
						'<p>The journalist\'s eyes are inquisitive, but she approaches you with a friendly smile and open demeanor.</p>' +
						'<p>“Julie Luna, from the Midwestern Gazette.” She immediately introduces herself. “Excuse my boldness, but I had thought I\'d know every face I would meet here, so you kind of picked my curiosity.”</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, 'introduce yourself', Place, 'type=conferencetalkjulie1&stage=stage2');
					break;
				case "stage2":
					md.write(
						'<p>You think about sending her away, but if her reputation is anything to go by, this will only make her more curious. So you politely introduce yourself using your cover story.</p>'
					);
					if (bSarah) md.write('<p>“So, you are Miss Gates\'s new assistant?” Her interest is clearly perked now. “This makes you about 30% more interesting than anyone else in here, including the mayor.”</p>');
					else md.write('<p>“So you are ' + perMayor.getMiss() + ' Thomas\'s new Aide?” She gives you a curious one-over. “I\'m impressed, ' + perMayor.getHeShe() + ' has a reputation for being picky and pretty tough on ' + perMayor.getHisHer() + ' staff, you must have made quite the impression.”</p>');
					startQuestions();
					addLinkToPlaceC(md, 'ask about her own work', Place, 'type=conferencetalkjulie1&stage=stage3');
					break;
				case "stage3":
					md.write(
						'<p>You try to lead the conversation away from yourself and ask Julie about her own work. After all, the gazette is not really known to take an interest in politics and housing projects.</p>' +
						'<p>“You see right through me.” She smirks. “Glenvale has always been a place of interest for myself and our readers, with the Kurndorf myth and the towns lively past, but right now the place seems abuzz with rumors of strange happenings from ghost sightings to people vanishing under mysterious circumstances.”</p>' +
						'<p>“In fact.” Her expression turns more serious. “A local blogger I wanted to meet is among those missing as well, a girl named Jesse.”</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"A local blogger?"', Place, 'type=conferencetalkjulie2');
					break;					
			}
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencetalkjulie2") {
			// Stopped by Julie 2
			stage = getQueryParam("stage");
			bSarah = checkPersonFlag("Gabby", 12);		// Here with Sarah
			md = WritePlaceHeader();
			perJesse.showPerson("jesse-photo.jpg");
			addPlaceTitle(md, "A Reporter");
			md.write(
				'<p>You really hope she did not notice how your stomach just made a double back-flip when you heard the name, but if she did, she doesn\'t show it and gladly gives you more information.</p>' +
				'<p>“Yes, she was last seen at the Broken Inn and completely went off the grid a few days back with not even her father knowing where she is.” She shows you a photo on her smartphone, and your heart sinks even further seeing an all to familiar face.</o>' +
				'<p>“It\'s also part of the real reason I wanted to talk to you. '
			);
			if (!bSarah) md.write('The mayors staff is always tight-lipped about everything, but I\'m sure they are well-informed, and if you overhear something, I would appreciate it if you can give me a hint.</p>');
			else md.write('The Gates family has a reputation for being involved in the paranormal, but they don\'t exactly speak with our paper. If my gut feeling is right and Jesse\'s disappearance is linked to the weird things happening around town, they might hear something, in that case I would appreciate a hint.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'try to answer her', Place, 'type=conferencetalkjulie3', 'You are not sure how to answer this, so it\'s probably a stroke of luck that you are interrupted the moment you try to.');
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencetalkjulie3") {
			// Stopped by Julie 3
			stage = getQueryParam("stage");
			bSarah = checkPersonFlag("Gabby", 12);		// Here with Sarah
			md = WritePlaceHeader();
			if (bSarah) findPerson("Sarah").showPerson("sarah14.jpg");
			else findPerson("Angela").showPerson('!angela15' + (isCharmedBy("Angela") ? 'a' : 'b') + '.jpg');
			addPlaceTitle(md, "An Interruption");
			if (bSarah) {
				md.write(
					'<p>“' + perYou.getPersonName() + ', Miss Luna.” Sarah gives Julie a very terse nod before turning to you. “It is time for the interview, we should be going.”</p>' +
					'<p>“Of course, Miss Gates, but I never meant to infringe on your staff for too long and shall take my leave.” The two women exchange brief glances before Julie bids you farewell and vanishes back into the crowd while Sarah takes you with her to the back of the future hotel.</p>' +
					'<p>“Be careful around the press, especially her.” Sarah remarks with a neutral voice, but it doesn\'t look like she wishes to talk more about Julie. “For now, let\'s focus on getting that naughty little hypnotist on your side, I\'ve been looking forward to it all night.”</p>'
				);
			} else {
				md.write(
					'<p>“' + perYou.getPersonName() + '.” Angela interrupts you before you are able to say anything. “' + perMayor.getMiss() + ' Thomas wishes to let you know that you are needed during the next appointment, please follow me.”</p>' +
					'<p>“You apologies to Julie for cutting the talk short, but she is quite understanding and quickly vanishes into the crowd as Angela leads you to the back of the Town hall.</p>'
				);
			}
			startQuestions();
			addPopupLinkToPlaceC(md, 'follow ' + (bSarah ? 'Sarah' : 'Angela'), 97, 'type=conferencegabby', "Break Room",
				'<img src="Images/door1.jpg" style="width:25%;float:right;margin-left:5px" alt="Dress">' +
				'You follow ' + (bSarah ? 'Sarah' : 'Angela') + ' through a long corridor, past several doors and way from the prying eyes of the crowd until you stand in front of a door to a break room of the Town Hall. ' +
				(bSarah ? 'Sarah goes in first, telling you to give her a few minutes before following to make sure she has Gabby\'s full attention.'
						  : 'Angela tells you that your “appointment” is waiting inside and takes her leave to help with preparations, and you take a short look around to make sure that really no one is watching.') +
				'</p><p>You open the door....</p>'
			);
			WritePlaceFooter(md);
			return true;		
		}
		
		return false;
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (sType.indexOf("conferencetalkjulie") != -1) {
				// Conference meeting
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here.  It\'s too public.");
				else addComments(this.addPersonFace() + 'The spell fails completely, Julie does not seem to notice.');
				return "handled";
			}
			if (sType.indexOf("lunchinterview") != -1) {
				// Lunch interview
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here.  It\'s too public.");
				else addComments(this.addPersonFace() + 'The spell fails completely, Julie does not seem to notice.');
				return "handled";
			}				
		}
		
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 1) {
				// Examine the Silver Ring
				if (sType.indexOf("conferencetalkjulie") != -1 || sType.indexOf("lunchinterview") != -1) {
					noeffectSilverRing();
					return "handled";
				}
			}
			return '';
		}
		return "";		// do nothing
	};
	
	per.isPhoneable = function(msg) { return false; };
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(3) && isDemonFreed() && isMurderPath() && !isDay()) {
			if (this.makeCall(true, 440)) this.setFlag(3);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 440) {
			return receiveSMS('JulieLuna', 'I am Julie Luna of the Midwestern Gazette, I would like to interview you about occult events in town, I have been told you are one expert on these. Please meet me tomorrow for lunch at the Broken Inn Hotel.', 'sms1.jpg') + 
					 replyToSMS('I have heard of you and you reputation in the paranormal field, I suppose but there are others with more knowledge') +	
					 receiveSMS('JulieLuna', 'Unfortunately one is dead and the other I tried is a sleaze');
		}
		return '';
	};

}
