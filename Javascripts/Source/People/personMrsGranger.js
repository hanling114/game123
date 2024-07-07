/***********************************************
	Mrs Marie Granger
***********************************************/

function PuzzleParty(doc) {
	var perMG = findPerson("MrsGranger");
	if (perMG.checkFlag(33)) {
		if ((doc.Puzzle.answer.value * 40 / 5) == 56) gotoPlace(Place,'type=partyright');
		else gotoPlace(Place,'type=partywrong');
	} else {
		if (doc.Puzzle.answer.value == 3) gotoPlace(Place,'type=partyright');
		else gotoPlace(Place,'type=partywrong');
	}
}

function RepliesMrsGranger(nR)
{
	function mentionWildRanges()
	{
		setPersonFlag("MrsGranger", 17);
		addComments('<p>Mrs Granger comments "Did you know my dear that the Wild Ranges have long been the center of magical cults, those of the old witch covens and later the cult of Kurndorf. I keep meaning to properly investigate the area for possible archaeological sites."</p>');
	}
	var perMG = per;
	var bCharm = per.isCharmedBy();
	var clv = per.getCharmedLevel();
	var myName = per.getYourNameFor();
	var perKate = findPerson("Kate");
	var rnd = Math.random();

	if (nR === 1)
	{
		if (perKate.place === 1)
		{
			// Kate is home
			if (!bCharm) {
				// First visit?
				if (!checkPlaceFlag("GrangerHouse", 2)) {
					if (rnd < 0.5) addComments('<p>"Oh yes, she arrived home a short while ago. She mentioned that she had invited you to visit, her room is there" and she tells you where Kate\'s room is.</p>');
					else addComments('<p>"Yes dear, Kate\'s in her room, she mentioned she was hoping you would visit.". She then tells you where Kate\'s room is.</p>');
				} else {
					if (rnd < 0.5) addComments('<p>"Coming back for more punishment? Kate\'s in her room. Keep things friendly, no naughty stuff yet."</p>');
					else addComments('<p>"Oh yes, she arrived home a short while ago. No naughty stuff yet!"</p>');
				}
			} else {
				addComments('<p>"Oh yes ' + myName + ', she arrived home a short while ago. Would you like to play with <i>me</i> now?"</p>');
			}
			setPlaceFlag("GrangerHouse", 2);
		} else {
			// Kate is not home
			if (!bCharm) {
				addComments('<p>"Kate? No, she stepped out a bit ago and hasn\'t come home yet. Do you want to wait here for her, I\'ll make sure to text you when she returns?"</p>');
			} else {
				if (clv == 1) addComments('<p>"Kate? I\'m afraid not.  She left a little bit ago and hasn\'t come home yet. While she is gone ' + myName + ', let me help you relax.</p>');
				else if (rnd < 0.5) addComments('<p>"Kate? I\'m afraid not.  She left a little bit ago and hasn\'t come home yet. Why do you want her, ' + myName + ', when you could have her mother? I can do things Kate can\'t even imagine," she says jealously.</p>');
				else addComments('<p>"Kate? I\'m afraid not.  She left a little bit ago and hasn\'t come home yet. Why do you want her, ' + myName + ', when you could have her mother? I will do things for you she would never do!" she says jealously.</p>');
			}
		}
		perMG.setFlag(9);
		perKate.setFlag(16);
	}
	else if (nR == 240)
	{
		// Pretty
		perMG.extra[1] = 1;
		if (rnd < 0.33) addComments('<p>"How sweet of you to say nice things. Thank you."</p>');
		else if (rnd < 0.66) addComments('<p>"I am sure you should be saying those things to Kate, not me, but thank you anyway."</p>');
		else addComments('<p>"Kate gets her beauty from me after all! Just kidding, thank you for your nice words."</p>');
	}
	else if (nR == 241)
	{
		// Work out
		perMG.extra[1] = 2;
		if (rnd < 0.33) addComments('<p>"Work out? Oh I go to the gym regularly when I am not in the field on an archeology dig. The digs themselves are rather strenuous so are plenty of exercise. Thanks for noticing, I try to stay in shape."</p>');
		else if (rnd < 0.66) addComments('<p>"My work is very physical and I like to go dancing regularly. These help me to keep fit with the occasional trip to the gym. Thanks for noticing."</p>');
		else addComments('<p>"Kate is the fitness freak in this family, but I often work out with her. My work is also quite strenuous and helps me to maintain my figure. Thanks for noticing!"</p>');
		addComments('<p>She smiles, "I am partial to a good massage, they help after a good work-out or a hard days work."</p>');
	}
	else if (nR == 242)
	{
		// Found anything
		addComments(
			'<p>She explains about her work on the early settlement of this region but she does not try to bore you with technicalities. She mentions how they often find interesting artifacts. You ask her what she has found recently,</p>' +
			'<p>"Last week I found this old stone near the Wild Ranges. Here, do you want to see it?"  She hands you a stone from her mantle.</p>'
		);
		if (perMG.extra[1] < 10)	{
			perMG.extra[1] = 10;
			perYourBody.PutItem(5);
			addComments('<p>"It has no value or interest archaeologically, I just liked it. If you want you can have it"</p>');
		}
		if (!perMG.checkFlag(17)) mentionWildRanges();
	}
	else if (nR == 243)
	{
		// Water
		//if (rnd < 0.33) addComments('<p>She briefly leaves and returns with a glass of water</p>'); else
		if (rnd < 0.66) addComments('<p>She quickly gets you a glass of water and apologies "Sorry I cannot get you anything better, maybe when you are a little older".</p>');
		else addComments('<p>Sorry we do not have anything better, Kate does not like soft drinks and she does not like others using her sports-drinks. I prefer a nice wine, or a good coffee, but we are currently out.</p>');
		if (perMG.extra[1] == 1) perMG.extra[1] = 1.1;
	}
	else if (nR == 245)
	{
		// Help (Party)
		if (perMG.extra[1] < 5) perMG.extra[1] = 6;
		perMG.setFlag(33);
		addComments('<p>"Yes, you can help. I\'m having trouble organizing a party. Are you any good with puzzles? I have a reward for you if you can solve it."</p>');
		if (!checkPlaceFlag("Park", 3)) {
			setPlaceFlag("Park", 3);
			PlaceI(5, 26);
		}
	}
	else if (nR == 246)
	{
		// Help (Panty)
		if (perMG.extra[1] < 5) perMG.extra[1] = 6;
		perMG.setFlag(34);
		addComments('<p>"Yes, you can...help me. I have a little thing bothering me. Are you any good with puzzles? I have a pleasant reward for you if you can solve it."</p>');
		if (!checkPlaceFlag("Park", 3)) {
			setPlaceFlag("Park", 3);
			PlaceI(5, 26);
		}
	}
	else if (nR == 2415)
	{
		// Found anything
		addComments('<p>"Yes ' + myName + ', I believe I may have.  I found this last week near the Wild Ranges.  Here, take it.  All that I have is yours."</p>');
		if (perMG.extra[1] < 16)	{
			perMG.extra[1] = 16;
			perYourBody.PutItem(5);
		}
		if (!perMG.checkFlag(17)) mentionWildRanges();
	}
	else if (nR == 231)
	{
		// Explore the Wild Ranges
		perMG.other = 2;
		if (!gameState.bShowSpeaker) addComments(perMG.addPersonFace());
		if (clv == 1) addComments('"Well no my dear, have you heard there is something important there?", Mrs Granger replies. You tell her a little about what you have heard about the place and it\'s importance in the early days of Glenvale and the time of the covens.</p><p>"Alright dear, I have some free time, I will do a survey of the area. I will meet you back here if I find anything."</p>');
		else addComments('"Whatever you say dear", Mrs Granger replies. "I will meet you back here if I find anything."</p>');
		if (isDay()) {
			perMG.place = 26; // Put her in the Wild Ranges
			perMG.other = 2.1;
		} else addComments('<p>She notices that night has fallen, "I will go there first thing in the morning, dear. Maybe you would like to spend the night?"</p>');
	}
	else if (nR == 232)
	{
		if (Math.round(perMG.other * 10) < 22) {
			// Still searching
			addComments('"Oh sorry Hon, I have not finished the survey. It was definitely a site of importance to the witch covens but that is well know to local historians.," she says "Please let me have a little longer to continue the work tomorrow."</p>');
			perMG.other = 2;
		} else {
			// Done!
			if (!isPlaceKnown("Tunnel")) setPlaceKnown("Tunnel");	// know about the tunnel
			if (Math.round(perMG.other) == 2) perMG.other = 3;
			addComments(
				'"Oh what a marvelous discovery! I found a tunnel at the base of the Wild Ranges," she says in excitement. "It appears to be one I have seen mentioned in some old works and it is said to be the path to the \'Stones of Death\' most likely some old burial or funeral site. I could only do a brief check but it appears to be safe to use."</p><p>"The old tales and legends of this town talk about a place of the dead that no-one should dare enter without some sort of protection."</p><p>' +
				(clv == 1 ? '"So ' + myName + ', maybe we should celebrate in some way?"' : '"So Hon, maybe we should celebrate in each others arms?"') +
				'</p>'
			);
		}
	}
	else if (nR == 233)
	{
		PlaceI(5, 177);
		perMG.other = 4;
		addComments('"Yes, you would not believe there was another old stone there," she says.');
	}
	else if (nR == 333)
	{
		perMG.setFlag(19);
		addComments('"Strange you ask Hon, I spoke to someone recently at the library on the same thing. There has been a long history of vampire sightings and supposed killings through the history of Glenvale. I once excavated an ancient grave an the body had a stake through it\'s heart, but this is not exactly rare, but a lot more common in eastern Europe.</p><p>I know Kate once got into reading vampire stories, more erotica than horror stories though...sorry Hon I should not of mentioned that!"');
	}	
	else if (nR == 1000)
	{
		perMG.setFlag(7);
		addComments('"Well Kate could come home at any time, so we should call a rain-check for our celebration" she says a little regretfully.');
	}
	else if (nR == 2502) //Dragon Gem Path
	{
		setPlaceKnown("Museum");  // Museum Known
		perMG.other = 5;
		if (!gameState.bShowSpeaker) addComments(perMG.addPersonFace());
		addComments('<p>"A dragon gem," she says a little bewildered. "I have never heard of such a thing. Perhaps there might be something at the museum."</p>');
		if (isDay()) perMG.place = 1; // Puts Mrs Granger at the Museum
		else addComments('<p>She notices that night has fallen, "I will go there first thing in the morning, dear. Maybe you would like to spend the night?"</p>');

	}
	else if (nR == 2503)
	{
		setPlaceKnown("Museum");  // Museum Known
		if (perMG.other < 5) perMG.other = 5; //Advance Mrs Granger's Path
		if (!gameState.bShowSpeaker) addComments(perMG.addPersonFace());
		addComments('<p>"The dragon vase," she says a little bewildered. "If that\'s what you\'d like then of course I would be happy to do <i>anything</i> to help.  Off to the museum!"</p>');
		if (isDay()) perMG.place = 1; // Puts Mrs Granger at the Museum
		else addComments('<p>She notices that night has fallen, "I will go there first thing in the morning, dear. Maybe you would like to spend the night?"</p>');
	}
	else if (nR == 236)
	{
		bChat = false;
		perMG.place = 177; // Puts Mrs Granger back at home
		if (perMG.other == 5) perMG.other = 4; //Advance Mrs Granger's Path
		if (!gameState.bShowSpeaker) addComments(perMG.addPersonFace());
		addComments('<p>"Yes, my dear", she leaves you with a longing look</p>');
	}
	else if (nR == 2354)
	{
		if (perMG.other > 0 && perMG.other < 55) perMG.other = 55; //Mrs Granger Path
		var perAbby = findPerson("Abby");
		if (perAbby.getQuestDragonGem() < 6) perAbby.setQuestDragonGem(6);  //Dragon Vase Path

		setPlaceKnown("MechanicsShop", false); // Know of Mechanics

		if (bCharm) //CHARMED
		{
			addComments('<p>"The vase is worthless ' + myName + ' but, according to Glenvale history, something of value is inside. How odd, the vase is made of steel. It would be very hard to break. ');
			addComments('Take it to the mechanics workshop. They might be able to open it."</p>');
		}
		else  //NOT CHARMED
		{
			addComments('<p>"A dragon vase, huh?  Where did you get that?" She asks, taking a look at the vase.  "Huh... " She says at the curious metallic sound as she taps it.  "Made of metal?  You\'d have to have a mechanics workshop to get that thing open... wonder how they made it..."</p>');
		}
	}
	return true;
}

// Minimal charm
function LeaveMinMrsGranger(recharm)
{
	var perMG = findPerson("MrsGranger");
	if (recharm !== true) {
		perMG.charmThem(1);
		PlaceI(5, 43);
	}
	dispPlace(43, "");
	bChat = false;
	WriteComments(
		(!gameState.bShowSpeaker ? perMG.addPersonFace() : '') +
		'You tell Mrs Granger you have to leave now and exit the house. Mrs. Granger looks at you oddly as you leave as she starts to deal with the spell.</p>' +
		'<p>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.</p>' +
		(recharm !== true ?
		'<img src="UI/themes/theme0/stone.png" style="width:5%;float:right">' +
		'<p>As you step out of the house you see she is starting to peel off her dress and you trip over something on the door-step in your distraction. The door closes and you glance down, and see it a stone being used as a door-stop, it looks like a magic stone!'
		: '')
	);
}


// Initialise

function initialiseMrsGranger()
{
	// Mrs Granger
	addPerson("Mrs. Granger", 177, "MrsGranger", "Turquoise");
	per.extra = [0, 0];
	per.Replies = RepliesMrsGranger;
	
	per.whereNow = function() {
		if (this.place == 1) return Place == 241 ? 241 : 240;
		return this.place;
	};
	
	per.getDressBase = function(img, sdrs) {
		if (img !== undefined && img.indexOf("smssexy") != -1) return '';
		return (this.checkFlag(35) ? "Younger/" : "Natural/");
	};
	
	per.getNextDress = function(drs) {
		var clv = this.getCharmedLevel();
		if (clv == 3) return "ShinyBlue";
		else if (clv == 1) return "Leather";
		return "Turquoise";
	};

	per.getPersonName = function(full) {
		if (full === true) return "Mrs. Marie Granger";
		var clv = this.getCharmedLevel();
		if (clv == 4) return "your slave, Mrs Granger";
		if (clv == 3) return "Slut Mrs Granger";
		return "Mrs. Granger";
	};

	per.getPersonAddress = function(n) { return isPlaceKnown("GrangerHouse") && this.checkFlag(8) ? n ? 177 : '34 Yoolaroo Dr, Glenvale' : n ? 0 : ''; };

	per.getPossessionFace = function() { return this.isCharmedBy() ? "granger-face" : "granger-faceu"; };

	per.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv === 0) return perYou.getPersonName();
		if (clv == 1 || clv == 3) return "dear " + perYou.getPersonName();
		if (clv == 2) return "my Love";
		return perYou.getMaster();
	};

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
				return this.addPersonString("granger0.jpg", "height:max%", "right") + 
				"Mrs. Granger, the hot mother of Kate, very friendly and a bit flirty.";

		} else if (this.getCharmedLevel() > 1) {
			return this.addPersonString("granger-home-day.jpg", "height:max%", "right") + 
					 "Mrs. Granger, the hot mother of Kate is at your disposal and is an eager slave to you and only you! She already filled you in about the settlers and town’s history briefly, but she offered if you have the time and interest you can always visit her and have a talk about it over a tea or coffee or of course, after a hot sex. She became a sexual predator who’s only prey is you, she is more than willing to have a second or third round of sexual intercourse long after you exhausted yourself on her. She always ask for more! She has a great physique too and she endures even your hardest and longest \"pushes\".<br><br>" +
					 "Mrs. Granger is standing in the living room, hotter than ever, ready to bring you out of your clothes. You just have to say the word!";

		} else {
			return this.addPersonString("granger-home-day.jpg", "height:max%", "right") +
					 "By leaving the house, you have interrupted the charm process so she only got half of dose to make her a slave to you. She stuck in the middle, thus becoming kind of like your fuckbuddy over the days since you have charmed her. She’s a great friend too, by having her mind relatively free from your powers. She’s a sexual predator who’s only prey is you, she is more than willing to have a second or third round of sexual intercourse long after you exhausted yourself on her. She always ask for more! She has a great physique too and she endures even your hardest and longest \"pushes\"<br><br>" +
					 "Mrs Granger dresses a bit more \"open and freely\", but she still retains her style and doesn’t go full slut for you. She offers you treats and a glass of water which you gladly accept and the two of you sit down in the living room for a talk.";
		}
	};

	// Time of day
	per.passTimeDay = function() {
		if (this.place == 177 && this.other == 5) {
			this.place = 1;
			if (Place == 177) return this.addPersonFace() + "<p>In the morning Mrs Granger gives you a kiss and tells you she is off to the <b>Museum</b>.</p>";
		}
		if (this.place == 177 && Math.floor(this.other) == 2 && this.other < 2.2) {
			this.place = 26;
			this.other = 2.1;
			if (Place == 177) return this.addPersonFace() + "<p>In the morning Mrs Granger gives you a kiss and tells you she is off to the <b>Wild Ranges</b>.</p>";
		}
		if (this.dress != this.getNextDress()) {
			this.dress = this.getNextDress();
			this.setFlag(6, false);
		}
		return '';
	};

	per.passTimeNight = function() {
		// Is she at the museum, then return home for the night
		if (this.place == 1 && (this.other == 5 || this.other == 4)) {		// The 4 test is to address observed cases, unsure how
			this.place = 177;
			if (Place == 240) return this.addPersonFace() + "<p>As the museum starts to close Mrs. Granger tells you she will return <b>home</b> for the night and return tomorrow</p>";
		}
		// Is she at the Wild Ranges, then return home for the night
		if (this.place == 26 && Math.floor(this.other) == 2) {
			this.place = 177;
			if (Place == 26) return this.addPersonFace() + "<p>As night starts to fall Mrs. Granger tells you she will return <b>home</b> for the night and return tomorrow</p>";
		}
		return '';
	};

	// Events
	per.showEventPopup = function()
	{
		if (Place == 366 && this.other > 2 && this.isCharmedBy() && !this.checkFlag(22) && nFromPlace != 366 && nFromPlace != 367) {
			this.setFlag(22);
			showPopupWindow("Mrs. Granger Visiting",
				this.addPersonString("!herald.jpg", "height:max%", "right") +
				'As you approach the entrance to the Glenvale Herald you see Mrs. Granger leaving. She looks both surprised and delighted to see you,</p>' +
				'<p>"Hello Dear, what brings you here?" You say just visiting Geraldine and ask why she is here, and she says "Just checking some records with Amara, I am researching some historical events and had to check the archives"</p>' +
				'<p>Curious you ask what she is checking, she just says it was to do with tales and legends of demons and such creatures in Glenvale and comments, "Interesting most such tales started with the Kurndorf cult". With that she leaves, asking you to visit sometime?'
			);
			return true;
		}			
		if (Place == 177 && this.place === 177) {
			if (!this.isCharmedBy()) {
				if (!this.checkFlag(8)) {
					showPopupWindow("Mrs. Granger",
						this.addPersonString("granger0.jpg", "height:max%", "right") +
						'Smiling, Kate\'s mother greets you and asks you into the house. Looking around you can see Mrs. Granger is alone and you curse silently to yourself. Not wanting to appear rude you wait until you are in the front room.You once heard Kate mention that her mother works as an archaeologist, and you think she said her mother has a \'top\' position but only works part-time due to budget issues at her...university? Well that certainly explains where Kate got her brains from, and looking at Mrs. Granger now, at lot of her beauty as well!<br><br>' +
						'Mrs. Granger is quite the looker herself, Kate has similar traits and expressions to her mother, but they’re both different enough to you to know that you want to bang both of them. Hey, Mrs. Granger is an archaeologist, so she must know a lot about the local history and such! She seems helpful enough to give you some tips about where to look for old items or abandoned places of magic. However, it would be easier if you could get her to be more submissive and obedient to you, an ally whom you could always trust.',
						"setPersonFlag('MrsGranger',8)"
					);
					return true;
				}
			} else if (this.getCharmedLevel() != 4 && !this.checkFlag(6) && this.dress !== "Turquoise" && sType === "") {
				this.setFlag(6);
				var clv = this.getCharmedLevel();
				showPopupWindow("Mrs. Granger Charmed",
					this.addPersonString(isDay() ? "granger-home-day.jpg" : "granger-home-night.jpg", "height:max%", "right") +
					'Mrs. Granger invites you in and you see she had changed since you last visited and she is now wearing ' +
					(clv == 1 ?
					(isDay() ? 'a red top and some tight leather pants' : ' some tight exercise gear') +
					'. She looks at you with a slight blush as she notices your appreciative look, the spell is clearly affecting her. She smiles and says<br><br>' +
					'"I felt like a change, ' + perYou.getPersonName() + ' dear. Now is there anything I can do to make you comfortable?"<br><br>' +
					'She seems to be acting similar to before the spell, but more friendly and sensual.'					
					: (isDay() ? 'a revealing tight blue dress' : ' some blue lingerie') +
					'. She looks at you with an open look of desire, she is completely under the spell and embracing your earlier comments about being a slut. She smiles and says<br><br>' +
					'"I felt like a change, ' + perYou.getPersonName() + ' dear, something more to my taste and yours. Now is there anything I can do to make you comfortable?"'
					)
				);
				return true;
			}
			
			if (sType == "mrsgrangertransformagenatural") {
				CastTransform(1);
				this.setFlag(35);
				showPopupWindow("Rejuvenated!",
					this.addPersonString("!home-sex-tfa.jpg", "height:max%", "right") +
					'Mrs Granger\'s appearance shifts but it is only subtle, and after a minute you realise she is looking younger, like you have seen in old family photos. Nothing else is changed but she looks 10 maybe 20 years younger!</p>' +
					'<p>You ask how she is feeling and she replies she is feeling fit and energetic!',
					'dispPlace()'
				);
				return true;
			}	
			if (sType == "mrsgrangertransformageyounger") {
				CastTransform(1);
				this.setFlag(35, false);
				showPopupWindow("Restored!",
					this.addPersonString("!home-sex-tfa.jpg", "height:max%", "right") +
					'Mrs Granger\'s appearance shifts but it is only subtle, and after a minute you realise she is looking older, returning back to how she was before you cast the transform spell on her before, back to her natural age!</p>' +
					'<p>You ask how she is feeling and she replies she is feeling fine, maybe a little tired',
					'dispPlace()'
				);
				return true;
			}
			
			// Catherine visiting?
			if (wherePerson("Catherine") == 177 && !this.checkFlag(21)) {
				this.setFlag(21);
				showPopupWindow("Catherine is Visiting!",
					this.addPersonString("!catherinegranger" + (this.isCharmedBy() ? "" : "uncharmed") + (isCharmedBy("Catherine") ? "c" : "u") + ".jpg", "height:max%", "right") +
					'You are met at the door by Mrs. Granger and she apologies that she has a visitor, she appears to be wanting you to come back another time. You hear from another room Catherine call out,<p>' +
					'<p>"Don\'t be rude Marie, ' + perYou.getPersonName() + ' is a friend too!" and she lets you in. She takes you into a garage area that is in process of being rennovated into a spare room or maybe a games room.</p><p>' +
					(this.isCharmedBy() ? 'You see Catherine and Mrs Granger are wearing very little, they are certainly doing more than just chatting! You quickly get the impression that are not being intimate like lovers but more playing around like fuck-buddies, which is consistent with Catherine after all!'
					                    : 'You see Catherine and Mrs Granger just hanging out together, chatting and talking about past lovers and events. You sit and listen for a while and hear mention of a movie they were in but Mrs Granger refuses to discuss more with you around!'),
					'dispPlace(177,"type=catherinevisiting")'
				);
				return true;
			}
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, img, perCatherine;

		// Recovery from the hospital
		if (Place == 278 && this.health == 99 && sType === "") {
			// She is recovered and can leave hospital
			// Is she under arrest
			if (this.checkFlag(3)) {
				// Yes, she is being taken to the jail 1
				md = WritePlaceHeader();
				var bOk = wherePerson("OfficerKhan") == 278;
				this.showPerson("!granger14-arrest1.jpg");
				addPlaceTitle(md, "Arresting Mrs. Granger");
				md.write(
					'<p>As you enter the ward to visit Mrs. Granger you see a curtain around her bed and a nurse stops you and tells you that a police ' + getOfficer(false) + ' is with her, and is about to take her to jail. The doctors had given their clear for her to leave the hospital.</p>' +
					'<p>As you as talking to the nurse you hear Mrs. Granger\'s voice talking to the ' + getOfficer(false) + ' and some rustling and a grunt. You are worried she is going to get hurt again resisting arrest and run over and see '
				);
				if (bOk) md.write(getOfficer() + ' Khan standing to one side');
				else md.write('a police ' + getOfficer(false) + ' you do not recognise standing to one side');
				md.write(' and Mrs. Granger is sitting on the bed, her hands tied and a ball-gag in her mouth. For a moment she looks distressed, but quick smiles. ');
				if (bOk) md.write(getOfficer() + ' Khan quickly explains, ');
				else md.write('The ' + getOfficer(false) + ' explains with some discomfort, ');
				md.write(
					'"She asked to put on a show for you, before I arrest her. The \'items\' are all hers"</p>' +
					'<p>You remove her gag and she says dramatically "Oh Hon, I am being taken away in bondage dire, and not the nice, kinky kind!"</p>' +
					'<p>You glance and ' + (bOk ? getOfficer() + ' Khan' : 'the ' + getOfficer(false)) + ' pointedly taps on their watch but then looks away. You have a little time it seems, so you play along with Mrs. Gramger.</p>' +
					'<p>You replace her gag and whisper to her, "You mean kinky like this?" and remove her bra and start to slap her breasts. She dramatically moans, and you pinch her nipples, and you say something completely true. "You like this <b>slave</b>, don\'t you?", she nods her head...</p>'
				);

				startQuestions();
				if (wherePerson("OfficerKhan") == 278) addLinkToPlaceC(md, getOfficer() + ' Khan coughs...', 278, 'type=leaving2');
				else addLinkToPlaceC(md, 'the ' + getOfficer(false) + ' coughs...', 278, 'type=leaving2');

			} else {
				// No, she is free to return home 1
				md = WritePlaceHeader();
				this.showPerson("!granger14-leaving1.jpg");
				addPlaceTitle(md, "Discharging Mrs. Granger");
				md.write(
					'<p>Mrs. Granger is next to her bed and looks like she was dressing. She is almost glowing with health, and she is looking happy as she sees you. Immediately she starts to open her top to expose her breasts for you.</p>' +
					'<p>"Hi Hon, I got the clear to leave the hospital and go home, but I have this odd feeling in my chest. Maybe you should examine me?"</p>' +
					'<p>You see she is wearing a stethoscope, where did she find that? You play along and feel...examine her breasts, but after a little you feel conscious of how public it is here.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Shouldn\'t you get dressed?"', 278, 'type=leaving2');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 177 && sType === "catherinevisiting") {
			// Catherine and Mrs. Granger
			perCatherine = findPerson("Catherine");
			perCatherine.place = 999;
			md = WritePlaceHeader();
			this.showPerson("!catherinegranger" + (this.isCharmedBy() ? "" : "uncharmed") + (perCatherine.isCharmedBy() ? "c" : "u") + ".jpg");
			addPlaceTitle(md, "Catherine and Mrs. Granger");
			if (this.isCharmedBy()) {
				md.write(
					'<p>The two friends are now more interested in you and they ask what you would like to do to them, with them, or have them do!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'watch them play with each other', Place, 'type=watchcatherinemrsgranger');
				addLinkToPlace(md, 'enjoy a threesome with them', Place, 'type=threesomecatherinemrsgranger');
			} else {
				md.write(
					'<p>The two friends are sitting chatting with each other. While you would like to do something more intimate with them, Mrs Granger is not likely to agree to that at this time!</p>'
				);
				startQuestions();				
			}
			addLinkToPlace(md, 'leave them and exit the house', 43, '', 'As you are leaving you hear Catherine say she is going to leave as well, she kisses Mrs Granger on the cheek and says her goodbyes to her and yourself!');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType === "") return false;
		
		var clv;
		
		if (Place == 177) {
			perCatherine = findPerson("Catherine");
			
			if (sType == "watchcatherinemrsgranger") {
				md = WritePlaceHeader();
				this.showPersonRandomRorX("!catherinegranger" + (perCatherine.isCharmedBy() ? "c" : "u") + "-watch", isExplicit() ? 1 : 2);
				addPlaceTitle(md, "Catherine and Mrs Granger Playing");
				md.write(
					'<p>You ask them to play together as if you were not here. They embrace but they do not really ignore you, they are more playing for your attention and pleasure!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'join them', Place, 'type=threesomecatherinemrsgranger');
				addLinkToPlace(md, 'afterwards relax with them', 177, 'type=catherinevisiting');
				addLinkToPlace(md, 'leave them and exit the house', 43, '', 'As you are leaving you hear Catherine say she is going to leave as well, she kisses Mrs Granger on the cheek and says her goodbyes to her and yourself!');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "threesomecatherinemrsgranger") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!catherinegranger" + (perCatherine.isCharmedBy() ? "c" : "u") + "-threesomeb", isExplicit() ? 3 : 1);
				else this.showPerson("!catherinegranger-threesomeg", 2);
				addPlaceTitle(md, "Playing with Catherine and Mrs Granger");
				md.write(
					'<p>You tell them you will join them and Catherine says "About time!" and Mrs Granger says "Please do dear"!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'afterwards relax with them', 177, 'type=catherinevisiting');
				addLinkToPlace(md, 'leave them and exit the house', 43, '', 'As you are leaving you hear Catherine say she is going to leave as well, she kisses Mrs Granger on the cheek and says her goodbyes to her and yourself!');				
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 269) {
			if (sType == "grangerpool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson((this.checkFlag(42) ? "!" : "") + "granger-pool.jpg");
				addPlaceTitle(md, "Swimming with Mrs. Granger");
				if (this.checkFlag(42)) {
					md.write(
						'<p>Mrs. Granger arrives and changes into her bikini, and you swim for a while with her. At the end when she get out of the pool, you see her bikini has slipped off somehow, but from her smile you think it less an accident and more deliberate!</p>'
					);
					this.setFlag(42, false);
				} else {
					md.write(
						'<p>Mrs. Granger arrives and changes into her bikini, and looks at you smiling seductively, as she always does.</p>'
					);
					this.setFlag(42);				
				}
				if (!isDay()) md.write("<p>Mrs. Granger suggests \"Hun, it is getting late, what about if I get a room for the night. We can have dinner in the restaurant and then...\" It is clear what she means for later.</p>");
				
				startQuestions();
				if (this.dress != "Leather") addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=grangerpoolsex');
				if (!isDay()) addLinkToPlaceC(md, '"Sure let\'s make a night of it"', Place, 'type=grangerhotelsex');
				addLinkToPlaceC(md, 'say goodbye to Mrs. Granger', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "grangerpoolsex") {
				md = WritePlaceHeader();
				this.showPerson("granger-pool-sex.jpg");
				addPlaceTitle(md, "More Than Swimming With Mrs. Granger");
				if (this.checkFlag(42)) {
					md.write(
						'<p>You accept her implied seduction, and she removes the rest of her bikini ready for you to take her!</p>'
					);
				} else {
					md.write(
						'<p>You accept her implied seduction, and as she is not wearing her bikini she is ready for you to take her!</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Mrs. Granger', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "grangerhotelsex") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!hotelroomb");
				else this.showPersonRandom("!hotelroomg");
				addPlaceTitle(md, "Hotel Room With Mrs. Granger");
				md.write('<p>Mrs. Granger leaves to book the room for the night and returns a little while later and she says ');
				if (isCharmedBy("Bambi")) md.write('the cute girl said the room was free for you. She smiles but does not comment on anything between you andBambi.');
				else md.write('the room is ready.');
				md.write(
					'</p><p>You get changed and have a nice dinner with Mrs. Granger! Later you head up to the room for the night, but of course Mrs. Granger suggests more than just sleeping!</p>'
				);
				startQuestions();
				addOptionLink(md, 'in the morning kiss goodbye to Mrs. Granger', "WaitForDayNight('',124)");
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		if (Place == 161) {
			if (sType == "bondageplay") {
				WaitHereOnly(2);
				md = WritePlaceHeader();
				this.showPersonRandom("!bondage", 7);
				addPlaceTitle(md, "Bongage Games with Mrs. Granger");
				md.write(
					'<p>Mrs. Granger plays the role of your bound sumbissive very well, so well you are sure she has experience in this sort of play. When you ask she just hints she ha, but more from your side of the game.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'play a bit more', Place, 'type=bondageplay');
				addLinkToPlaceC(md, 'play a bit more intimately', Place, 'type=bondageplaysex');
				addLinkToPlace(md, 'that is enough for now', 177, '', 'You decide that will do for now and return back to the Granger home');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "bondageplaysex") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!bondage-sexb", 2);
				else this.showPerson("!bondage-sexga.jpg");
				addPlaceTitle(md, "Intimate Bondage Games");
				md.write(
					'<p>You tell your bound MILF that it is time to take it to the next level and she smiles, "It is about time Hon...' + perYou.getMaster() + '"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'that is enough for now', 177, '', 'You decide that will do for now and return back to the Granger home');
				WritePlaceFooter(md);
				return true;
			}			
		}

		if (Place == 177) {
			var perKate = findPerson("Kate");
			var bKateHere = this.checkFlag(13) && perKate.place == 1;
			
			if (sType == "vampgrangerparty") {
				md = WritePlaceHeader();
				bKateHere = bKateHere && (sWho === "" || sWho !== "comfortable");
				if (bKateHere) {
					if (perYou.isMaleSex()) perLilith.showPersonRandomRorX("vampgrangersb", isExplicit() ? 4 : 1);
					else perLilith.showPersonRandom("vampgrangersg", 3);					
				} else {
					if (perYou.isMaleSex()) perLilith.showPersonRandomRorX("vampmrsgrangerthreesomeb", isExplicit() ? 5 : 2);
					else perLilith.showPersonRandom("vampmrsgrangerthreesomeg", 2);
				}
				addPlaceTitle(md, bKateHere ? "Playing with Lilith and the Granger Family" : "Playing with Lilith and Mrs. Granger");

				if (sWho == "comfortable") md.write('<p>As you walk towards Mrs. Granger, Lilith steps over as well and embraces Mrs. Granger. It seems she does not wish to be left out. Mrs Granger smiles, "As I said she is a woman who gets straight to the point. Well Hon, it seems we have company!" Lilith says nothing as she looks at you, and you agree the more the merrier.</p>');
				else if (sWho !== "") md.write('<p>You talk to Kate and Mrs. Granger about some \'family time\' but as you do Lilith step over and puts her arms around each of them but says nothing. It seems she does not wish to be left out. Kate looks at her uncertain, but Mrs Granger tells her, "It\'s alright dear, let\'s just consider her part of the family for now". Well it seems the more the merrier!</p>');
				if (bKateHere) {
					md.write(
						'<p>Lilith, Kate and Mrs Granger, three experienced and devoted women ready to pleasure your ' + (perYou.isMaleSex() ? 'cock' : 'pussy') + ', heaven, hell and earthly delights in person.</p><p><b>Heaven</b> in the beautiful MILF who will do anything for you and to you.</p><p><b>Hell</b> in the hot, buxom vampire who could kill you in an instant and would except for the spell on her.</p><p><b>Earthly delights</b> in your hot school friend who is both violent and passionate a mixture of the two!</p>'
					);					
				} else {
					md.write(
						'<p>Lilith and Mrs Granger, two experienced and devoted women ready to pleasure your ' + (perYou.isMaleSex() ? 'cock' : 'pussy') + ', heaven and hell in person.</p><p><b>Heaven</b> in the beautiful MILF who will do anything for you and to you.</p><p><b>Hell</b> in the hot, buxom vampire who could kill you in an instant and would except for the spell on her!</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, "talk more to them", 177);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "charmmrsgranger1") {
				// Event: Charm Mrs Granger 1
				md = WritePlaceHeader();
				this.other = 1;
				if (this.extra[1] < 10) this.extra[1] = 15;	// Opens the option to ask her for magic item since you didn't get the one she normally offers
				AddCash(20);		//   Add $20 to your wallet
				// Image
				this.showPerson("granger2.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>You use the power of the words coupled with your mana to cast the charm spell upon her.</p>' +
					'<p>"Oh dear..." she says softly, shaking her head a bit in confusion as if to clear it, ' +
					'"I\'ve been so busy enjoying talking to you that I forgot just how much you mean to m- Kate...."</p>' +
					'<p>Her hands dig into her purse as she nervously lets her gaze dart to you, then away with a rising blush until she pulls out a crisp bill, ' +
					'"Here, if you are looking for Kate then take this ' + sCurrency + '20.  It might help you find her..."</p>' +
					'<p>As she says this her gaze darts towards you once more and she shifts her stance a bit, taking on a subtle sultriness.' +
					
					'"You know... a lot of ' + perYou.getSex() + 's find older women attractive... I\'ll bet you think I\'m attractive... Don\'t you, ' + perYou.getPersonName() + '?"</p>'
				);
				// Questions
				startQuestions();
				addLinkToPlaceC(md, "ask Mrs. Granger to remove her clothes", Place, 'type=charmmrsgranger2');
				addOptionLink(md, "leave the house and Mrs. Granger as she gets used to the spell?", 'LeaveMinMrsGranger(false)');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmmrsgranger2") {
				// Event: Charm Mrs Granger 2
				md = WritePlaceHeader();
				// Image
				this.showPerson("granger3.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>&quot;Take off my clothes?!&quot; her voice comes as a shocked gasp, an almost incredulity as she momentarily ' +
					'bats off the touch of the magic, &quot;Just what kind of woman do you think I am?&quot;</p>' +
					'<p>Her body feels a sudden flush as the magic presses its assault once more upon her, a heat slowly building within ' +
					'her, &quot;W-well... it... it is a bit warm here... All-right... I\'ll... lower my top... But nothing else!&quot;</p>'
				);
				// Questions
				startQuestions();
				if (perYou.checkFlag(26)) startAlternatives();
				addLinkToPlace(md, "wait for the spell to take more effect", Place, 'type=charmmrsgranger3lover');
				if (perYou.checkFlag(26)) {
					addLinkToPlaceC(md, "tell her to strip more", Place, 'type=charmmrsgranger3slave');
					endAlternatives();
				}	
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			
			if (sType == "charmmrsgranger3slave") {
				// Event: Charm Mrs Granger 3 - slave
				md = WritePlaceHeader();
				clv = this.getCharmedLevel();

				if (clv == 3) this.showPerson("granger5b.jpg");
				else {
					this.charmThem(4);		// Set slave level of charm
					this.showPerson("granger5a.jpg");
				}

				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>The magic courses through her, pulsing within her body, causing the heat to grow, ' +
					'stronger and stronger. Your order starts to shape her thoughts more towards ' +
					'accepting of more such commands, and linking this to the growing desire she feels. ' +
					'She can\'t help but let her gaze fasten upon you, her lips suddenly dry, ' +
					'beckoning her to give them a slow, nervous lick across their expanse.</p>' +
					'<p>  She draws a deep, staggering breath, teeth lightly biting into her lower ' +
					'lip, before releasing it in a slow, needy moan, her	voice trembling with hunger.</p>' +
					'<p>She hesitantly removes more of her clothing as you ordered, and you see she is not wearing ' +
					'any underwear at all, no bra, no panties. She places her hands to cover herself, but it ' +
					'more seems to you she is drawing your attention to her full breasts and delightful pussy.</p>'
				);

				startQuestions();
				if (clv != 3) addQuestionR(md, 'tell her she is a slut', 'You tell Mrs Granger that she is a bit of a slut for not wearing underwear. Your words beat into her consciousness and she sighs,<br/><i>&quot;I just like to do it sometimes, it is an exciting naughtyness to be so exposed when talking to people or almost showing myself at times.&quot;</i><br/>She pauses and her fingers lightly touch her pussy sliding up and down as your words sink in<br/><i>&quot;I suppose I am a bit of a slut..&quot;</i>', 'Mrs Granger', "charmPerson(\\'MrsGranger\\',3);");
				addLinkToPlaceC(md, "tell Mrs. Granger she needs more", Place, 'type=charmmrsgranger4slave');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			
			if (sType == "charmmrsgranger4slave") {
				// Event: Charm Mrs Granger 2
				md = WritePlaceHeader();
				clv = this.getCharmedLevel();
				this.showPersonRorX((isExplicit() ? "!" : "") + "granger19a.jpg");

				addPlaceTitle(md, "Mrs. Granger Under A Spell");

				// Initial version, she starts to dildo herself
				md.write(
					'<p>&quot;Mmm... yes... yes, I think I do...&quot; she half-moans as she looks at you, ' +
					'eyes pulsing with both the gleam of magic and an exploding passion. She quickly bends down and gets something out of her handbag ' +
					'&quot;Can you do me a favor? I think I need your help in a <i>very</i> special way...&quot;</p> ' +
					'<p>A thrilling pounding races through your heart, a rush of adrenaline at the thought of how close you are to taking her.</p>' +
					'<p>As you watch she rubs the dildo she picked up over her pussy and ass, but not inserting it, just playing to arouse her and you.</p>'
				);
				
				// Questions
				startQuestions();
				if (clv == 3) addLinkToPlaceC(md, "tell her to cum for you like the slut she is", Place, "type=charmmrsgranger5slavecum");
				else addLinkToPlaceC(md, "order her to play with herself", Place, 'type=charmmrsgranger5slave');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charmmrsgranger5slavecum" || sType == "charmmrsgranger5slave") {
				// Event: Charm Mrs Granger 5 (slave/slut)
				// attributes
				//	type
				//		= "charmmrsgranger5slave"			- slave
				//		= "charmmrsgranger5slavecum"		- slut
				md = WritePlaceHeader();

				if (sType == "cum") this.showPersonRorX((isExplicit() ? "!" : "") + "granger19b.jpg");
				else this.showPersonRorX((isExplicit() ? "!" : "") + "granger19a.jpg");

				addPlaceTitle(md, "Mrs. Granger Under A Spell");

				if (sType !== "cum") {
					// Slave Dildoing
					md.write(
						'<p>&quot;That.... That\'s not right,&quot; she frowns as ' +
						'she shakes her head a bit, &quot;I mean... I don\'t want to ' +
						'give you the wrong idea honey... you... you just can\'t go ' +
						'around telling people to do those sort of things...&quot; ' +
						'Even as she speaks, her hands have already followed your instruction as she rubs her pussy and slides the dildo into her ass.</p>' +
						'<p>In a small, almost nonexistent voice she whimpers, &quot;Can you...?&quot;</p>' +
						'<p>You firmly reply "Yes I can, you desire to submit to another, to do anything I say"</p>' +
						'<p>She moans and shudders in orgasm, and unsteadily cries "Yes...I do"</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, "order her to obey you always", Place, 'type=charmmrsgranger6slave');
				} else {
					// Slut dildoing
					md.write(
						'<p>"Mmm... yes... yes... no... no... I am not... what about Kate...", ' +
						' her eyes closing with passion but still pulsing with the gleam of magic</p>' +
						'<p>You tell her "Of course you are, only a slut would not wear underwear when her daughters friend visits and then strip and use a dildo in her ass"</p> ' +
						'<p>You hear her moan and her fingers rapidly rub her pussy and clit while she thrusts the dildo into her ass. As her orgasm approaches you see a hint of resistance as she whispers raggedly "but Kate..."</p>' +
						'<p>You look her in the eyes, "Kate and my relationship have nothing to do with the fact you are a wanton slut who craves sex and who\'s greatest joy in life is to orgasm"</p>' +
						'<p>She cries out something incoherent as she has a intense orgasm.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, "promise her all the sex she desires", Place, 'type=charmmrsgranger6slave');
				}
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "charmmrsgranger6slave") {
				// Event: Charm Mrs Granger 6 (slave/slut)
				md = WritePlaceHeader();
				clv = this.getCharmedLevel();

				this.showPerson("granger20.jpg");
				var yt = clv == 3 ? "lover" : perYou.getMaster();

				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>In the afterglow of her orgasm, the battle becomes too much for her impassioned mind. ' +
					'Her resistance melts away as she feels the enchanting warmth sweep across her body, ' +
					'filling her with a contented relaxation. Her will is utterly consumed and replaced ' +
					'with a heated energy, she stops trying to resist, and instead ' +
					'gives in to the pleasure. She stands and proudly displays her body and especially her ass for you.</p>' +
					'<p>&quot;Mmmm... you\'re right... I...  belong to you...&quot; ' +
					'she says, her body quivering. &quot;I really shouldn\'t worry about being so shy... ' +
					'especially around you... Any... friend of Kate\'s is welcome to be a ' + yt + ' of mine... ' +
					'After all... sharing is good... right?&quot;</p>'
				);
				startQuestions();
				if (clv == 3) addLinkToPlaceC(md, "ask her to have sex", Place, 'type=charmmrsgrangerfinal');
				else addLinkToPlaceC(md, "tell her to fuck you?", Place, 'type=charmmrsgrangerfinal');
				WritePlaceFooter(md, "Script by EH (tweaked for path)");
				return true;
			}
			
			if (sType == "charmmrsgranger3lover") {
				// Event: Charm Mrs Granger 3
				md = WritePlaceHeader();
				this.charmThem(2);	// Set moderate level of charm

				this.showPerson("recharm1-day.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>The magic courses through her, pulsing within her body, causing the heat to grow, stronger and stronger. ' +
					'She can\'t help but let her gaze fasten upon you, her ' +
					'lips suddenly dry, beckoning her to give them a slow, nervous lick across their expanse.</p>' +
					'<p>  She draws a deep, staggering breath, teeth lightly biting into her lower lip, before releasing it in a slow, needy moan, her voice trembling with hunger.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "ask if Mrs. Granger needs anything", Place, 'type=charmmrsgranger4lover');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmmrsgranger4lover") {
				// Event: Charm Mrs Granger 4
				md = WritePlaceHeader();
				this.showPerson("recharm2-day.jpg");

				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>"Mmm... yes... yes, I think I do..." she half-moans ' +
					'as she looks at you, eyes pulsing with both the gleam of magic and a building passion for you, ' +
					'"Can you do me a favor? I think I need your help in a <i>very</i> special way..."</p>' +
					'<p>A thrilling pounding races through your heart, a rush of adrenaline at the thought of how close you are to taking her.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "tell her to play with herself?", Place, 'type=charmmrsgranger5lover');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmmrsgranger5lover") {
				// Event: Charm Mrs Granger 5
				md = WritePlaceHeader();

				this.showPerson("granger8.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>&quot;That.... That\'s not right,&quot; she frowns as ' +
					'she shakes her head a bit, &quot;I mean... I don\'t want to ' +
					'give you the wrong idea honey... you... you just can\'t go ' +
					'around telling people to do those sort of things...&quot; ' +
					'Even as she speaks, her hands have already followed your instruction.</p>' +
					'<p>In a small, almost nonexistent voice she whimpers, &quot;Can you...?&quot;</p>'
				);

				 startQuestions();
				 addLinkToPlaceC(md, "ask her to play with herself", Place, 'type=charmmrsgranger6lover');
				 addLinkToPlaceC(md, '"Yes...  I can. Give in, Mrs. Granger.  You belong to me now."', Place, 'type=charmmrsgranger6loverbelong');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			if (sType == "charmmrsgranger6lover" || sType == "charmmrsgranger6loverbelong") {
				// Event: Charm Mrs Granger 6
				md = WritePlaceHeader();
				this.showPerson("granger9.jpg");
				
				var yt = sType === "" ? "friend" : perYou.getMaster();

				addPlaceTitle(md, "Mrs. Granger Under A Spell");
				md.write(
					'<p>At last, the battle becomes too much for her impassioned mind. Her resistance melts away as she feels ' +
					'the enchanting warmth sweep across her body, filling her with a ' +
					'contented relaxation. Her will utterly consumed and replaced ' +
					'with a heated energy, she stops trying to resist, and instead ' +
					'gives in to the pleasure.  She stops trying to cover up her breasts, instead thrusting them forward as she leans ' +
					'against the couch, putting herself on display for you.</p>' +
					'<p>&quot;Mmmm... you\'re right... I...  belong to you...&quot; ' +
					'she says, her body quivering.  &quot;I should...relax...&quot;</p>' +
					'<p>She purrs, her body legs spread wide and finger teasing her folds. ' +
					'&quot;I really shouldn\'t worry about being so shy... especially around you... Any... friend of ' +
					'Kate\'s is welcome to be a ' + yt + ' of mine... After all...sharing is good... right?&quot;</p>'
				);

				startQuestions();
				if (sType === "charmmrsgranger6lover") {
					addLinkToPlace(md, "ask her to make love with you?", Place, 'type=charmmrsgrangerfinal');
					this.charmThem(2);
				} else addLinkToPlace(md, "tell her to make love with you?", Place, 'type=charmmrsgrangerfinal');
				WritePlaceFooter(md, "Script by EH");
				return true;
			}			
			
			if (sType == "charmmrsgrangerfinal") {
				md = WritePlaceHeader();

				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("!granger17", 3);
					else this.showPerson("!granger17.jpg");
				} else this.showPersonRandomRorX("!granger18", isExplicit() ? 1 : 4);

				addPlaceTitle(md, "Mrs. Granger Under A Spell");

				md.write(
					'<p>"Oh... mmm.... ' + perYou.getMaster() + '..." Mrs. Granger practically drips as she leans back, looking at you lustfully, ' +
					'"I am going to show you such a good time... Why don\'t you come over here baby and give me the best fuck of my life."</p>' +
					'<p>The spell has totally consumed the will of the woman before you, her lust-filled body eagerly responding to ' +
					'you, spreading her legs, revealing in a soft motion the expanse of her inner thighs, before her hands snake out, ' +
					'threading through your hair as she pulls your face down to her lower lips. Her body shakes with a fervent ' +
					'passion against yours, again and again, the pleasure dancing across her mind before her lips part and she ' +
					'manages a whimpering beg to be allowed to do the same for you. With a seemingly unquenchable thirst for passion, ' +
					'she remains unrelenting in her need for your kiss, your touch, your feel.</p>' +
					'<p>She seems insatiable in her desire. Your bodies meet time and again, wild forces of aggressive need burning ' +
					'with a passion almost unknown. Still she cries out for more, her thirst still burning for another, and ' +
					'another. At last, you feel your body drained, your strength weakened, and your energy almost totally gone, ' +
					'and you can tell she is exhausted as well, and yet she begs you, pleads with you... anything for more.</p>' +
					'<p>"Oh...' + perYou.getMaster() + '...more, your Marie wants more...", you realise you had never known her given name, but she will still to you be your MILF Mrs. Granger.'
				);
				startQuestions();
				if (nMana < 20 && perYourBody.FindItem(5) === 0) addLinkToPlaceC(md, "ask her for an artifact", 177, 'type=askartifactpc');
				addLinkToPlace(md, "exit the house?", 43);
				WritePlaceFooter(md, "Script by EH");
				return true;
			}

			if (sType == "askartifactpc") {
				// Post charm - ask for an artifact
				md = WritePlaceHeader();

				this.showPerson(per.getCharmedLevel() == 3 ? "granger11b.jpg" : "granger11a.jpg");
				if (perYourBody.FindItem(5) === 0) perYourBody.PutItem(5, true);

				addPlaceTitle(md, "Mrs. Granger\'s Artifact");
				md.write(
					'<p>She eagerly hands you an artifact, a small sculpture that is definitely one of the magic stones. As she hands it to you a wide, predatory smile forms on her face as she slowly licks her lips.</p>' +
					'<p>Her hands linger on yours a bit too long as she purrs, "Please, take it... and anything else that you see that you like... Any time you want more just let me know... you\'re the best I\'ve ever had, Mmmm... ' + perYou.getMaster() + '.  Everything I am belongs to you now."</p>'
				);

				startQuestions();
				addLinkToPlace(md, "talk to her again", 177);
				addLinkToPlace(md, "exit the house?", 43);
				WritePlaceFooter(md, "Script by EH");
				return true;
			}
			
			if (sType == "recharm1") {
				// Re-charm Mrs Granger 1
				clv = this.getCharmedLevel();
				if (clv != 1) this.charmThem(1);
				else if (clv != 4) this.charmThem(4);
				else this.charmThem(3);
				md = WritePlaceHeader();
				this.showPersonDN("recharm1.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Charm Spell - Again");
				md.write(
					'<p>Once again the magic courses through her, pulsing within her body, causing the heat to grow, stronger and stronger. ' +
					'She can\'t help but let her gaze fasten upon you, her lips suddenly dry, beckoning her to give them a slow, nervous lick across their expanse.</p>' +
					'<p>She draws a deep, staggering breath, teeth lightly biting into her lower lip, before releasing it in a slow, needy moan, her voice trembling with hunger.</p>' +
					'<p>Without your asking she start to remove her top...</p>'
				);
				startQuestions();
				if (clv != 1) addOptionLink(md, "leave the house and Mrs. Granger as she gets used to the spell?", 'LeaveMinMrsGranger(false)');
				if (clv != 2) addLinkToPlaceC(md, "tell Mrs. Granger she needs more", Place, 'type=recharm2', '', '', "charmPerson('MrsGranger',2);");
				if (clv != 3) addLinkToPlaceC(md, 'tell her she is a slut', Place, 'type=recharm2', '', '', "charmPerson('MrsGranger',3);");
				if (clv != 4) addLinkToPlaceC(md, "order Mrs. Granger to strip", Place, 'type=recharm2', '', '', "charmPerson('MrsGranger',4);");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "recharm2") {
				// Re-charm Mrs Granger 2
				clv = this.getCharmedLevel();
				md = WritePlaceHeader();
				this.showPersonDN("recharm2.jpg");
				addPlaceTitle(md, "Mrs. Granger Under A Charm Spell - Again");
				switch(this.getCharmedLevel()) {
					case 2:
						// Lover
						md.write(
							'<p>"Mmm... yes... yes, I think I do..." she half-moans as she looks at you, eyes pulsing with both the gleam of magic and a building passion for you, ' +
							'"Can you do me a favor? I think I need your help in a <i>very</i> special way..."</p>'
						);						
						break;
					case 3:
						// Slut
						md.write(
							'<p> Your words beat into her consciousness and she sighs,</p>' +
							'<p>"I do like to be naughty at times, nearly exposing myself or flirting a lot"</p>'+
							'<p>She pauses and her fingers lightly touch her pussy sliding up and down as your words sink in</p>' +
							'<p>"I suppose I am a bit of a slut.."</p>'
						);						
						break;
					case 4:
						// Slave
						md.write(
							'<p>"Mmm... yes... yes, I will...' + perYou.getMaster() + '" she half-moans as she looks at you, eyes pulsing with both the gleam of magic and a building passion for you, ' +
							'"Can you do me a favor? I think I need your help in a <i>very</i> special way..."</p>'
						);						
						break;
				}
				startQuestions();
				addLinkToPlaceC(md, "talk more to her", 177);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "katejoin") {
				// Ask Kate to join
				md = WritePlaceHeader();
				this.setFlag(12);
				this.setFlag(13);
				if (perLilith.isHere()) perLilith.showPerson("vampgrangersmeet.jpg");
				else this.showPerson("!grangerfamily1a.jpg");
				addPlaceTitle(md, "The Granger Family" + (perLilith.isHere() ? ' and Lilith' : ''));
				md.write(
					'<p>You ask Mrs. Granger to invite Kate to join you, and you see a flash of jealousy pass over her face. She smiles after a moment and steps out of the room. Some time passes and you can just hear a little soft conversation before she returns with her daughter Kate.</p>' +
					'<p>Mrs. Granger tells you with Kate posed next to her, "Well Hon, we have talked about it, sharing you that is. Kate talked me around to it, so it\'s a family affair now".'
				);
				if (perLilith.isHere()) md.write(' As she is speaking Lilith steps over the her side just to emphasise that she is here and to be payed attention to. Mrs Granger smiles and continues "with our guest that is".');
				md.write('</p>');
				startQuestions();
				addLinkToPlaceC(md, "talk more to them", 177);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "familytimewatch") {
				// Ask Mrs Granger and Kate to play together
				md = WritePlaceHeader();
				this.showPersonRandomRorX("!grangerfamily3", isExplicit() ? 4 : 2);
				addPlaceTitle(md, "The Granger's at Play");
				md.write(
					'<p>You ask Mrs. Granger and Kate to play together. Interestingly Mrs. Granger is quite enthusiastic and takes a rather dominant role over Kate, making it clear that daughters should always help their mothers "first"</p>' +
					'<p>Despite this play, you can see they are more playing for your arousal and interest, so it is more like show than of two lovers allowing you to watch. That is fine by you, they are your slaves after all, and you had to go through a lot to get them and plan to enjoy them as much as you can!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "talk more to them", 177);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "familytimejoin") {
				// Threesome time!
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) {
					if (!isExplicit()) this.showPerson("!grangerfamily4.jpg");
					else this.showPersonRandomX("!grangerfamily4", isExplicit() ? 4 : 2);
				} else if (Math.random() < 0.4) this.showPersonRandom("!grangerfamily2", 2);
				else this.showPersonRandom("!grangerfamily3", 2);
				addPlaceTitle(md, "Playing with the Granger Family");
				md.write(
					'<p>After all you have been through for and with Kate and Mrs. Granger, it is time to enjoy the fruits of your efforts and the both of them! Time for your hot school friend and her equally hot mother to thank you properly with their bodies.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "talk more to them", 177);
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "comfortable") {
				// Getting comfortable
				md = WritePlaceHeader();
				this.showPersonDN("granger-comfort.jpg", "height:max");

				addPlaceTitle(md, this.getPersonName());

				if (!this.checkFlag(12) && perKate.place == 1 && (perKate.isCharmedBy("You") || perKate.checkFlag(22))) {
					// Kate is here and charmed by you or she is your lover
					md.write(
						'<p>Mrs. Granger makes herself comfortable for you. &quot;What are you waiting for, dear?&quot; she asks. Her invitation is clear, or would you prefer to just talk more to her.</p>' +
						'<p>You notice she glances over your shoulder towards Kate\'s room but she says nothing, you think she wishes you to herself.</p>'
					);
				} else if (perKate.place == 1) {
					// Kate is here and charmed by Davy
					md.write(
						'<p>Mrs. Granger makes herself comfortable for you, posing seductively. "We would have to be quiet if you wish to do something more than talk...Kate is in her room"</p>'
					);
					if (perKate.isCharmedBy("Davy")) {
						md.write(
							'<p>You can see her reluctance to do anything with Kate around, especially as you have not dealt with Davy and the uncertainty there. Maybe you should just talk more to her.</p>'
						);
					}
				} else md.write('<p>Mrs. Granger makes herself comfortable for you. &quot;What are you waiting for, dear?&quot; she asks. Her invitation is clear, or would you prefer to just talk more to her.</p>');
				
				// Questions
				startQuestions();
				if (!this.checkFlag(12) && perKate.place == 1 && (perKate.isCharmedBy("You") || perKate.checkFlag(22))) {
					if (perKate.isCharmedBy("You")) addLinkToPlace(md, 'ask Mrs. Granger to invite Kate to join us', 177, 'type=katejoin');
					else {
						addQuestionR(md, 'ask Mrs. Granger to invite Kate to join us',
							'You mention the idea of asking Kate joining you and Mrs. Granger, and you see a small flash of jealousy pass over her face. She smiles and says she will ask Kate, but you stop her,</p>' +
							'<p>You can see she would prefer to keep you to herself, but also you doubt Kate would go along with it, while she loves you, this will clearly show you have her mother under control and it will probably end badly!',
							"",
							"setPersonFlag(\\'MrsGranger\\',12)"
						);
					}
				} else if (perKate.place == 1 && perKate.isCharmedBy("Davy")) {
					addLinkToPlaceC(md, "talk to Mrs. Granger", 177);
					addLinkToPlace(md, "exit the house", 43);
					WritePlaceFooter(md);
					return true;					
				}
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'fuck her', Place, 'type=fuck');
					addLinkToPlace(md, 'fuck her mouth', Place, 'type=bj');
					addLinkToPlace(md, 'fuck her tits', Place, 'type=titfuck');
				} else {
					if (perYourBody.FindItem(45) > 0) addLinkToPlace(md, 'fuck her with your strap-on', Place, 'type=straponfuck');
					addLinkToPlace(md, 'have her lick you', Place, 'type=bj');
					addLinkToPlace(md, 'make love to her', Place, 'type=fuck');
				}
				if (checkPlaceFlag("Hotel", 9)) addLinkToPlace(md, 'play with her in the Hotel Cellar', 161, 'type=bondageplay', 'You invite Mrs Granger for a bit of bondage play and metion the area Bambi has setup at the hotel. She happily agrees and you both head over there immediately',  '', 'WaitHereOnly(2)');				

				addLinkToPlaceC(md, this.checkFlag(13) ? "talk more to them" : "talk to Mrs. Granger", 177);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;

			}
			if (sType == "fuck") {
				// Fuck her
				if (perYou.isMaleSex()) {
					md = WritePlaceHeader();
					if (isExplicit()) {
						var nd = (this.dress == "Leather" && !isDay()) || this.dress == "Turquoise";
						this.showPersonRandomX((nd ? "!" : "" ) + "granger17", 3, "height:max", '', '', '', 0, this.dress == "ShinyBlue" || (this.dress == "Leather" && isDay()));
					} else {
						this.showPerson((this.dress == "ShinyBlue" ? "" : "!") + "granger17.jpg", '', '', '', '', this.dress == "ShinyBlue");
					}
				} else {
					md = WritePlaceHeader();
					if (!isDay() && this.dress == "ShinyBlue") this.showPersonRandom("granger18", 2, '', '', '', '', 0, true);
					else this.showPersonRandomRorX("!granger18", isExplicit() ? 1 : 2);
				}

				addPlaceTitle(md, this.getPersonName());

				if (perYou.isMaleSex()) {
					md.write(
						'<p>After disrobing upon after following her into the bedroom, you catch sight of her, already nude and happy to see you have clearly come here for pleasure rather than business. You sit on her bed and motion for her to sit on your lap. She smiles and saunters over to server her beloved Master, and lowers herself upon your engorged cock. She grinds and slides around in your lap as you firmly thrust up into your slave\'s quivering pussy. Before long her gasps of delight are met with those of your own, and you cum deep within her.</p>' +
						'<p>"Thank you Hon" is all she says, the first words either of you have spoken during the entire exchange.</p>'
					);
				} else {
					md.write(
						'<p>You remember your first sexual experiments with another girl your age, and while it is a very pleasant memory, you recall a lot of awkward fiddling and trying to figure out what to do with each other.</p>' +
						'<p>Being with Mrs Granger is nothing like that.</p>' +
						'<p>Marie, as she likes to be called, really knows her body, and with the spell having removed any doubt or restrain she might have had from her mind, she is eager to use that knowledge for your pleasure as much as hers.</p>' +
						'<p>You usually allow the more experienced woman to take charge during your lust-filled encounters and have never regretted it. Her touch is at the same time tender and rough, often pinning you down possessively as she covers your body in kisses or slowly explores your most sensitive areas with her hands.</p>' +
						'<p>Right now, she has spread your legs and roughly pulled you close to her. Her eyes are watching your every reaction with hunger, and lustful noises from both of you fill the room every time she grinds her sex against yours, passionately carrying both of you to yet another climax.</p>' +
						'<p>You collapse on the bed and breath in deeply with your body still tingling from the aftermath, but there is little time for a break. Marie is already crawling on top of you and you feel her thigh sliding in-between your legs and her lips hovering above yours without saying a word, hoping you are ready for another round.</p>'
					);

				}

				// Questions
				startQuestions();
				addLinkToPlaceC(md, this.checkFlag(13) ? "talk more to them" : "talk to Mrs. Granger", 177);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;				
			} 
			
			if (sType == "straponfuck") {
				// Fuck her with a strapon
				md = WritePlaceHeader();
				this.showPersonRandomX("!home-sex-strapon", 2);

				addPlaceTitle(md, this.getPersonName());

				md.write(
					'<p>After disrobing upon after following her into the bedroom, you catch sight of her, already nude and happy to see you have clearly come here for pleasure rather than business. You take out your strap-on and start to put it on. Mrs. Granger comments, "I am more used to wearing one of those, but why not, if you want Hon I want it.". She kneels down and starts to lick it as if it were a real cock, both to arouse you and lubricate it. She then bends over and presents her large juicy ass and asks "Put it in my ass Hon". You are happy to oblige!</p>' +
					'<p>Some time later after a vigorous ass-fuck and mutual orgasms she sighs, "Thank you Hon"</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, this.checkFlag(13) ? "talk more to them" : "talk to Mrs. Granger", 177);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;				
			} 
			
			if (sType == "bj") {
				// Oral
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("!granger16b", 3);
					else this.showPerson("!granger16b.jpg");
				} else this.showPersonRandomRorX("!granger16g", isExplicit() ? 4 : 2);
				addPlaceTitle(md, this.getPersonName());

				if (perYou.isMaleSex()) {
					md.write(
						'<p>The change your spell brought forth within Kate\'s Mom is almost scary.</p>' +
						'<p>The way her eyes follow you whenever you visit remind you of a cat ready to pounce on its prey, and it takes her only seconds to follow your order to kneel in front of you and open your pants.</p>' +
						'<p>Mrs. Granger frees your shaft with shaky hands, spits on it and proceeds to use both hands to spread her saliva, constantly licking her upper lip and keeping her gaze locked on your manhood as it hardens under her touch.</p>' +
						'<p>She\'s obviously impatient and her eyes filled only with need and desire.</p>' +
						'<p>You groan in pleasure as your manhood finally reaches its full size, and almost immediately feel her lips wrap around the tip and her head moving forward. The woman\'s arms lock around your hip as she greedily pushes the entire length into her mouth, and you enjoy the tightness of her throat constricting around you as she pushes her lips all the way to the base.</p>' +
						'<p>A content sigh vibrates from her lips, her eyes closed, and she remains like this for several seconds, her fingertips digging into your asscheeks as if afraid you might pull away from her and she only allows herself to pull back when she finally needs to gasp for air.</p>' +
						'<p>You watch in fascination as she quickly recovers, presses her face against your manhood without letting go of your hip and steadies her breathing before she guides you right back into her mouth. Her entire body begins to roll back and forth in sensual, rhythmic motions, forcing your manhood in and out of her throat with greedy abandon, and even if you wanted to hold your orgasm back, you are not sure you could have.</p>' +
						'<p>Mrs Granger feels your climax approaching and tightens the grip around your hip, her head jerking back and forth violently the last seconds until you finally shoot your load into her mouth and she greedily drinks every single drop.</p>'
					);
				} else {
					md.write(
						'<p>You have barely finished giving the order as Mrs Granger already wordlessly throws you on a nearby couch and begins to take off your clothes, well, more like tearing them off.</p>' +
						'<p>You have to restrain her enthusiasm a little out off fear that you are left without anything to wear, and while she does slow down, her lack of patience is obvious. Your last remaining clothes are hastily pushed aside, and as your underwear finally flies into an undisclosed corner of the room, her lips are already firmly placed on your folds and her tongue slowly drags along their entire length.</p>' +
						'<p>You exhale a soft gasp as she flicks it over your clit and  allow your body to lie back, arms spread out behind you to let her tend to your needs.</p>' +
						'<p>Mrs Granger spreads your legs wide and takes in your scent. You enjoy the sensation of her fingers parting your folds, and your breath quickens as she begins to tickle your clit with her tongue. You close your eyes as the first waves of pleasure rush through your body and shiver blissfully as her thumbs gently massage your sensitive petals two fingers push into your warm canal to massage your inner walls, causing you to dig your own fingers into the pillows beneath.</p>' +
						'<p>In the following minutes, she watches every single of your reactions with delight, and you feel her fingers trailing over your legs and stomach to send pleasant shudders through your body, frequently tending to your sex while the motions of her tongue on your sensitive areas lure one lewd moan after another from your lips.</p>' +
						'<p>When you finally reach your peak, your entire body trembles under her touch while Mrs Granger greedily laps up your juices, and as you open your eyes again, her gaze is focused on you, eager, if not pleading, to continue, taste you again, and maybe even do more.</p>'
					);
				}

				// Questions
				startQuestions();
				addLinkToPlaceC(md, this.checkFlag(13) ? "talk more to them" : "talk to Mrs. Granger", 177);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;		
			}
			if (sType == "titfuck") {
				// Fuck her tits (male/futa only)
				md = WritePlaceHeader();
				this.showPersonRandomRorX("!home-sex-tf", isExplicit() ? 3 : 1);

				addPlaceTitle(md, this.getPersonName());

				md.write(
					'<p>After disrobing upon after following her into the bedroom, you catch sight of her, already nude and happy to see you have clearly come here for pleasure rather than business. You sit on her bed and gesture to her breasts and then your cock. She happily squeezes her breasts together before leaning in to lick your cock to full hardness. When you are she slips you cock between her large tits and you proceed to fuck your cock between them as she holds them help you stay in place and feel the presssure. In fairly quick order you speed up and then unload your cum over her breasts and some on her face as well!</p>' +
					'<p>"Thank you Hon" is all she says, the first words either of you have spoken during the entire exchange.</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, this.checkFlag(13) ? "talk more to them" : "talk to Mrs. Granger", 177);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "partyright") {
				md = WritePlaceHeader(true);
				
				addPlaceTitle(md, "Right Answer", '', 0, true);

				AddCash(5);
				this.extra[1] = 10;

				if (this.checkFlag(33)) {
					// Party
					md.write(
						'<table class="table-main"><tr><td style="width:70%">' +
						'<p>Mrs. Granger is overjoyed with the help that you gave her. <p>&quot;How did you figure it out?&quot; she asks. &quot;The party ' +
						'will consist of 2 little girls and a boy, their father and mother, and their father\'s father and mother. Now I ' +
						'can have a party with my family. Here, let me give you ' + sCurrency + '5 for your help.&quot;</p>' +
						'<p>You thank the lady for the money and slip the cash ' +
						'into your wallet. It might not be much but you never know when it will come in handy.</p>' +
						'<p>&quot;It\'s such a pleasure to have you visit ' + perYou.getPersonName() + ',&quot; Mrs. Granger says, smiling in gratitude.</p>' +
						'<p>She moves to sit down, but seems to have another idea, "One last question, what sort of hostess do you think I will make at the party?"</p>'
					);
					startQuestions("You answer");
					addLinkToPlaceC(md, '"An elegant hostess"', 177, "", "She smiles at your compliment and sits down to talk more with you", "Mrs. Granger");
					addLinkToPlaceC(md, '"A beautiful hostess"', 177, "", "She smiles at your compliment and sits down to talk more with you", "Mrs. Granger");
					addLinkToPlaceC(md, '"A sexy hostess"', 177, "", "She blushes, &quot;You should not let Kate hear you say that, Hon&quot; and leans in and gives you a kiss on your cheek. You notice she slipped an extra " + sCurrency + "5 in your pocket as she did.", "Mrs. Granger", "setPersonFlag('MrsGranger',2);AddCash(5);");
				} else {
					// Pantie
					md.write(
						'<table class="table-main"><tr><td style="width:70%">' +
						'<p>Mrs. Granger is overjoyed with the help that you gave her. <p>&quot;That makes sense, ' +
						'at the worst case I take out a white pair then a pink pair. The next pair will match one of the previous picks&quot; she says.' +
						'"Here, let me give you ' + sCurrency + '5 as a reward.&quot;</p>' +
						'<p>You thank the lady for the money and slip the cash into your wallet. It might not be much but you never know when it will come in handy.</p>' +
						'<p>&quot;It\'s such a pleasure to have you visit ' + perYou.getPersonName() + ',&quot; Mrs. Granger says, "Fortunately I do not <i>have</i> to work today".</p>' +
						'<p>She moves to sit down, and a wicked smile forms on her face, "One last question, what colour am I wearing today?"</p>'
					);
					startQuestions("You answer");
					addLinkToPlaceC(md, '"White"', 177, "", "She smiles &quot;Not today&quot; and sits down to talk more with you", "Mrs. Granger");
					addLinkToPlaceC(md, '"Pink"', 177, "", "She smiles &quot;Not today&quot; and sits down to talk more with you", "Mrs. Granger");
					addLinkToPlaceC(md, '"You are not wearing any"', 177, "", "She smiles and leans over and whispers in your ear, &quot;As if I would do that&quot; but does not correct your answer. She gives you a kiss on your cheek and returns to where she was sitting. You notice she slipped an extra " + sCurrency + "5 in your pocket as she did.", "Mrs. Granger", "setPersonFlag('MrsGranger', 2);AddCash(5);");
				}

				addLinkToPlace(md, "decline to answer and talk to Mrs. Granger some more", 177);
				AddPeopleColumnMed(md);
				this.showPerson("granger4b.jpg");
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "partywrong") {
				md = WritePlaceHeader(true);
				this.extra[1] = 9;

				addPlaceTitle(md, "Wrong Answer", '', 0, true);

				md.write(
					'<table class="table-main"><tr><td style="width:70%">' +
					'Mrs. Granger is disappointed..<p>&quot;Kate told me how clever you are!&quot; she sighs. &quot;Well maybe you are clever ' +
					'compared to the other youth of today but you are of no help to me.&quot;</p>' +
					'<p>Embarrassed about your mistake, you mumble apologies. It is a shame that you got the wrong answer. After a ' +
					'moment of discomfort Mrs. Granger smiles her forgiveness.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "talk to her some more", 177);
				AddPeopleColumnMed(md);
				this.showPerson("granger4b.jpg");
				WritePlaceFooter(md);
				return true;					
			} 
			if (sType == "partypuzzle") {
				md = WritePlaceHeader(true);

				if (this.extra[1] > 6) return dispPlace(177);

				addPlaceTitle(md, this.checkFlag(33) ? "Party Puzzle" : "Panty Puzzle", '', 0, true);
				
				if (this.checkFlag(33)) {
					// Party
					md.write(
						'<table class="table-main" style="vertical-align:top"><tr><td>' +
						'I want to invite a family to a party.<br><br>' +
						'The family has 1 grandfather, 1 grandmother, 2 fathers, 2 mothers, 4 children, 3 grandchildren, ' +
						'1 brother, 2 sisters, 2 sons, 2 daughters, 1 father-in-law, 1 ' +
						'mother-in-law, and 1 daughter-in-law.<br><br>A total of 23 ' +
						'people, you might think, but that\'s not correct. Oh, how ' +
						'many people are there?' +
						'<form method="POST" name="Puzzle">' +
							'<p style="text-align:center">Answer: <select name="answer" size="1">' +
								'<option selected value="1">1</option>' +
								'<option value="2">2</option>' +
								'<option value="3">3</option>' +
								'<option value="4">4</option>' +
								'<option value="5">5</option>' +
								'<option value="6">6</option>' +
								'<option value="7">7</option>' +
								'<option value="8">8</option>' +
								'<option value="9">9</option>' +
								'<option value="10">10</option>' +
								'<option value="11">11</option>' +
								'<option value="12">12</option>' +
								'<option value="13">13</option>' +
								'<option value="14">14</option>' +
								'<option value="15">15</option>' +
								'<option value="16">16</option>' +
								'<option value="17">17</option>' +
								'<option value="18">18</option>' +
								'<option value="19">19</option>' +
								'<option value="20">20</option>' +
								'<option value="21">21</option>' +
								'<option value="22">22</option>' +
								'<option value="23">23</option>' +
							'</select> ');
				} else {
					// Panty
					md.write(
						'<table class="table-main" style="vertical-align:top"><tr><td>' +
						'I am curious about getting dressed for work. I do like my short skirts and my job can be quite messy. So I <i>have</i> to wear panties to work and I usually take a spare pair in case of problems on a dig.<br><br>' +
						'My drawer contains 10 pairs of white panties and 10 pairs of pink panties and I usually get dressed when it is still a bit dark. I take one pair at a time and check their colour after I take them out of the drawer. How many pairs do I need to take out to be guaranteed I have two pairs the same colour?' +
						'<form method="POST" name="Puzzle">' +
							'<p style="text-align:center">Answer: <select name="answer" size="1">' +
								'<option selected value="1">1</option>' +
								'<option value="2">2</option>' +
								'<option value="3">3</option>' +
								'<option value="4">4</option>' +
								'<option value="5">5</option>' +
								'<option value="6">6</option>' +
								'<option value="7">7</option>' +
								'<option value="8">8</option>' +
								'<option value="9">9</option>' +
								'<option value="10">10</option>' +
								'<option value="11">11</option>' +
								'<option value="12">12</option>' +
								'<option value="13">13</option>' +
								'<option value="14">14</option>' +
								'<option value="15">15</option>' +
								'<option value="16">16</option>' +
								'<option value="17">17</option>' +
								'<option value="18">18</option>' +
								'<option value="19">19</option>' +
								'<option value="20">20</option>' +
							'</select> ');
				}

				md.write('<input type="button" name="button" value="Go" onClick="PuzzleParty(document)"></p></form>');

				AddPeopleColumnMed(md);
				this.showPerson("granger4a.jpg", "height:max");
				WritePlaceFooter(md);
				return true;
			}			

		}

		if (Place == 26 && sType.indexOf("mgstones") != -1) {
			// Meet Mrs Granger at the Wild Ranges
			md = WritePlaceHeader();

			var herName = this.getPersonName();
			var clv = this.getCharmedLevel();
			var sDH = clv == 1 ? "Dear" : "Hon";
			
			if (sType == "mgstones") {
				//this.place = 177; // Send her home
				this.other = 2.2;
				this.showPerson(clv == 1 ? "!grangerstones1b.jpg" : "!grangerstones1a.jpg");
				addPlaceTitle(md, herName + " Studying the Wild Ranges");

				md.write('<p>You approach Mrs. Granger and you see she had just been starting to pack away some of her archaeology equipment when you arrived. ');
				if (clv == 1) md.write('She stands to greet you and you see she is dresses quite..simply. She happily says,');
				else md.write('As she sees you she stands and poses for you seductively. She eagerly says,');
				md.write(
					'</p><p>"' + sDH + ', it&apos;s wonderful to see you, I was just about finished here, maybe we can go back to my place and I can ' + (clv == 1 ? 'help you' : 'make you real happy') + '."</p>' +
					'<p>You ask about her findings and if she has found anything more about this place that has been the center of magic for the area. She looks a bit disappointed when you ignore her offer,</p>' +
					'<p>"This is an interesting site ' + sDH + ', but I need to do some computer analysis of the resistivity scans, it won&apos;t take long but I need access to the University computers from my home."</p>'
				);
				if (clv == 1) {
					md.write(
						'<p>Mrs. Granger looks around from side to side in a theatrical way,</p>' +
						'<p>"It is very private here, and there is no chance Kate might interrupt us, no matter what we do?"</p>'
					);
				} else md.write('<p>Maybe you can gruntle your slightly disgruntled servant, or you can just meet her back at her home later.</p>');
				startQuestions();
				if (clv == 1) addLinkToPlaceC(md, '"What did you have on your mind?"', Place, 'type=mgstonesmind');
				else addLinkToPlaceO(md, "reward Mrs. Granger", Place, 'type=mgstonesreward');
			}
			if (sType == "mgstonesbj") {
				if (isExplicit()) this.showPersonX(perYou.isMaleSex() ? "!grangerstones3b.jpg" : "!grangerstones3g.jpg");
				else this.showPerson("!grangerstones3.jpg");
				addPlaceTitle(md, herName + " Studying the Wild Ranges");

				if (perYou.isMaleSex()) md.write('<p>You agree and she eagerly unzips your trousers and you quickly realise she is very, very skilled at this. You try to enjoy her skills but she is so very skilled and eager that you quickly cover her face with your cum. She licks it up with no reservations and some pleasure.</p>');
				//if (perYou.isMaleSex()) md.write('<p>You agree and she eagerly unzips your trousers and you quickly realise she is very, very skilled at this. You try to enjoy her skills but she is so very skilled and eager that you quickly fill her mouth with your cum. She swallows with no reservations and some pleasure.</p>');
				else md.write('<p>You agree and she eagerly unzips your pants and pulls them down and pushes your panties aside and you quickly realise she is not inexperiences at this. You are surprised by her skills and she is very eager. Her tongue and fingers quickly make you orgasm and she happily licks up all your juices</p>');
				md.write('<p>"Thanks ' + sDH + ', I should get back and run that analysis, if that is ok with you?"</p>');
				startQuestions();
			} 
			if (sType == "mgstonesreward") {
				this.showPerson("!grangerstones2a.jpg");
				addPlaceTitle(md, herName + " Studying the Wild Ranges");

				md.write(
					'<p>You tell Mrs. Granger that you are pleased with her study here and that she deserves a reward. She looks eagerly at you, and you tell her to pleasure herself for both of your enjoyment.</p>' +
					'<p>She looks a little surprised, clearly expecting a more personal touch from you. Still, she eagerly touches herself and brings herself to a fast, intense orgasm.</p>' +
					'<p>"Thanks Hon, you must be feeling hot, why don&apos;t you let me take care of that?"</p>' +
					'<p>She licks her lips while kneeling in front of you.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, perYou.isMaleSex() ? "let her suck you" : "let her pleasure you", Place, 'type=mgstonesbj');
			}
			if (sType == "mgstonesmind") {
				this.showPerson("!grangerstones2b.jpg");
				addPlaceTitle(md, herName + " Studying the Wild Ranges");

				md.write(
					'<p>You ask what she is suggesting, by the way she is standing and touching herself it seems clear at least partly what she wants,</p>' +
					'"I know you and Kate and I do not get involved in her relationships...it is just dear that...you do find me attractive and as long as we never tell anyone else, and <i>never</i> tell Kate. We can..play here."</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"I won\'t tell Kate"', Place, 'type=mgstonesbj');
			}
			// Common choice
			addLinkToPlaceO(md, "let her return home?", 26, '', '', '', "movePerson('MrsGranger',177)");
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 278 && sType == "mariefrisky") {
			// Feeling frisky in the hospital ward
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				if (this.checkFlag(10)) this.showPersonRorX("!granger14cb.jpg");
				else this.showPersonRorX("!granger14db.jpg");
			} else this.showPersonRandomRorX("!granger16g", isExplicit() ? 4 : 2);
			addPlaceTitle(md, "Frisky Mrs. Granger");
			if (perYou.isMaleSex()) {
				// Male player
				if (this.checkFlag(10)) {
					// Blowjob
					md.write(
						'<p>Mrs. Granger gives you a blowjob on the hospital bed</p>'
					);
				} else {
					// Fuck
					md.write(
						'<p>You fuck Mrs. Granger on the hospital bed</p>'
					);
				}
			} else {
				// Female player
				md.write(
					'<p>Mrs. Granger licks you and you play with her on the hospital bed</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, "open the curtains again", 278);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 278 && sType == "leaving2") {
			this.health = 100;	// Fully well
			if (this.checkFlag(3)) {
				// Yes, she is being taken to the jail 2
				md = WritePlaceHeader();
				this.place = 261;		// To jail
				this.showPerson("!granger14-arrest2.jpg");
				addPlaceTitle(md, "Arresting Mrs. Granger");
				md.write(
					'<p>You quickly untie and remove Mrs. Granger\'s gag. She partially re-dresses and then '
				);
				if (wherePerson("OfficerKhan") == 278) md.write(getOfficer() + ' Khan');
				else md.write('the ' + getOfficer(false));
				md.write(
					' secures and handcuffs Mrs. Granger. They then walk out of the ward, Mrs. Granger looking at you over her shoulder and calls out "Visit and we can play \'Jailbird and Prison Guard\'"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'follow them out of the ward', 214);

			} else {
				// No, she is free to return home 2
				this.place = 177;		// Return home
				md = WritePlaceHeader();
				this.showPerson("!granger14-leaving2.jpg");
				addPlaceTitle(md, "Mrs. Granger Leaving");
				md.write(
					'<p>Mrs. Granger looks a little disappointed, "Of course Hon, we can always play Doctors and Nurses at home"</p>' +
					'<p>She resumes dressing and gives you a kiss, explaining she has to go and speak to the nurses. You make arrangements to meet her back at her home when you can.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave the ward', 214);
			}
			if (wherePerson("OfficerKhan") == 278) movePerson("OfficerKhan", 168);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Mrs Granger's Dance");
		var clv = this.getCharmedLevel();
		switch (clv) {
			case 1:
				// Minimal
				md.write(
					'<p>Mrs. Granger takes the stage dressed in a stylist outfit from "Cabaret" or similar.</p>' +
					'<p>Mrs. Granger is a little tentative initially but quickly she gets into it and she enjoys the audiences attention and performs and exotic dance and partial strip-tease.</p>' +
					'<p>After she collects her tips and offers them to you saying she earns plenty otherwise, but you know Jade has a performance fee for you, and Mrs. Granger deserves her tips.</p>'
				);				
				break;
			case 2:
			case 4:
				// Lover/Slave
				md.write(
					'<p>Mrs. Granger takes the stage dressed in little more than a bikini!</p>' +
					'<p>Mrs. Granger seems quite skilled and a sexy dancer, but she does dance a bit more for you than the audience in general. By the end of the dance she is almost completely naked.</p>' +
					'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and Mrs. Granger deserves her tips.</p>'
				);				
				break;
			case 3:
				// Slut
				md.write(
					'<p>Mrs. Granger takes the stage dressed in quite slutty club-wear with fishnets, not that they last very long. She is completely uninhiblted and quickly srips naked as she drags other dancers to join her on stage. Quickly it becomes less exotic dancing and more a soft-lesbian performance on the stage!</p>' +
					'<p>After she looks completely happy and content and offers you her tips, but you know Jade has a performance fee for you, and Mrs. Granger deserves her tips.</p>'
				);
				break;
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 278 && this.place == 278) {
			if (this.health < 74) md.write('<p>Mrs. Granger is sitting up but she seems very weak. She smiles at you meekly and begs forgiveness for not being available to you.</p>');
			else {
				md.write('<p>Mrs. Granger is sitting up and she seems to be getting better, so much so she is looking almost...frisky. ');
				if (this.checkFlag(11)) md.write('You see her glasses on her bed-side table.</p>');
				else md.write('You see a pair of glasses sitting on a table next to her bed. You have never seen her wearing glasses before.</p>');
			}
		}
		if (Place == 275) {
			if (this.other >= 50 && this.other < 54 && this.place == 275.5) md.write('<p>Mrs. Granger is lying in one of the beds. She looks bad: a heart monitor measures her erratic pulse.</p>');
			else if (this.other >= 54 && perYourBody.FindItem(29) !== 0 && this.place == 278) {
				md.write('<p>Mrs. Granger is no longer in the unit. She must have been transported to one of the wards.</p>');
			}
		}
		if (Place == 177) {
			if (sType == "feedOn" && by == "vampyre" && sWho == this.uid) md.write('<p>Mrs Granger looks a bit tired but the talk of lusts seems to wake her up and she says "Don\'t count me out Hon!"</p>');
		}
	};

	per.showPersonChat = function(md)
	{
		if (Place == 278 && this.isHere()) {
			// Hospital ward
			if (this.other == 54) addQuestionC(md, 'ask Mrs. Granger about the vase', "MrsGranger", 2354);
			// How well is she?
			if (this.health > 74) {
				if (!this.checkFlag(11)) {
					addPopupLinkC(md, 'ask about the glasses', "Glasses?",
						this.addPersonString("!granger14e.jpg", "height:max%", "right") +
						"You ask Mrs. Granger about her glasses, you have never seen her wearing them before,<br><br>" +
						'"I usually wear contacts, but they were lost when I was..hurt. Do you like me wearing glasses?"<br><br>' +
						'"She stands up and puts on her glasses, as she does what little she is wearing falls away. She looks at you seductively, she is definitely feeling much better! You admire her figure and tell her how you very much like to see her wearing her glasses, and nothing else!<br><br>' +
						"She smiles and redresses and lies down a bit tiredly,<br><br>" +
						'"I do not really like wearing them, but if you like me in them Hon, I will wear them for you"<br><br>' +
						'She pauses and you ask if she is tired, and she smiles "Not enough for you to leave, or for us to be a bit more frisy if you want"',
						false, "setPersonFlag('MrsGranger',11);dispPlace()"
					);
				}	else {
					// Feeling frisky
					if (sType === "" && this.health != 99) addLinkToPlace(md, 'draw the curtain around Mrs. Granger\'s bed', 278, 'type=mariefrisky', '', "setPersonFlag('MrsGranger',10,!checkPersonFlag('MrsGranger',10))");
				}
			}

		} else if (Place == 275) {
			// Hospital ICU
			if (this.other == 50 && this.place == 275.5) {
				addPopupLinkC(md, 'ask about Mrs. Granger', "Intensive Care Nurse",
					findPerson("NurseMegan").addPersonString("megan1b.jpg", "height:max%", "right") +
					"You enter the public area of the ICU and you see a nurse there, she seems to be testing a piece of medical equipment. You ask her about Mrs. Granger,<br><br>" +
					'"Mrs Granger is in a very dangerous condition. I\'m sorry, but you are going to have to leave unless you are a relative of hers."<br><br>' +
					"There is no way you can claim to be a relative, after all you called her Mrs. Granger. While thinking you look at the nurse appreciatively, you have to admire the choice of uniforms in this hospital. " +
					"As you do the nurse looks at you knowingly,<br><br>" +
					'"There is a lot more to being a nurse than being some ' + perYou.getSex() + '\'s sexual fantasy, please leave and we will do our best for your friend"',
					false, "setPersonOther('MrsGranger', 51);dispPlace();"
				);
			}
		} 
		// Any where (not the ICU though)
		if (this.isHere() && wherePerson("Kate") == 1000 && !checkPersonFlag("Kate", 32) && this.checkFlag(16)) {
			addQuestionR(md, '"Can you talk to Kate for me?"',
				'You talk about your last meeting with Kate and how she is leaving town to visit friends. You ask Mrs. Granger to talk to Kate and put in a good word about you.</p>' +
				'<p>You do stress to not be too heavy handed and avoid discussing your relaionship with Mrs. Granger, but that is not a problem, you have noticed at times her jealousy of Kate and your desire for her.',
				"",
				"setPersonFlag(\\'Kate\\',32)"
			);
		}
		if (Place != 177 || !this.isHere()) return;
		
		// At home in the living room
		var perKate = findPerson("Kate");
		var bKateHere = this.checkFlag(13) && perKate.place == 1;
		
		if (sType == "feedOn" && by == "vampyre" && sWho == this.uid) addLinkToPlaceC(md, 'tell ' + (bKateHere ? 'everyone' : 'them') + ' "Let\'s All Help"', Place, 'type=vampgrangerparty');
		if (sType !== "") return;
		
		var clv = this.getCharmedLevel();
		var perAbby = findPerson("Abby");
		
		// Uncharmed (by you at least)
		if (this.extra[1] === 0) addQuestionC(md, 'tell Mrs. Granger that she is very pretty', "MrsGranger", 240);
		else if (this.extra[1] >= 1 && this.extra[1] < 2) {
			if (this.extra[1] == 1) addQuestionC(md, 'hopefully tell her you wouldn\'t mind a beer', "MrsGranger", 243);
			startAlternatives(md);
			addQuestionC(md, 'ask Mrs. Granger if she works out often', "MrsGranger", 241);
			addQuestionC(md, 'ask Mrs. Granger if you could help with anything', "MrsGranger", 245);
			addQuestionC(md, 'ask Mrs. Granger if you could do anything...for...her', "MrsGranger", 246);
			endAlternatives();
		} else if (this.extra[1] == 2) addQuestionC(md, 'ask Mrs. Granger about her work in archaeology', "MrsGranger", 242);
		else if (this.extra[1] == 6) {
			if (isPuzzles()) addLinkToPlace(md, 'try the puzzle', Place, 'type=partypuzzle');
			else addLinkToPlace(md, 'try the puzzle', Place, 'type=partyright', 'You discuss her problem and easily work out a solution for her');
		}		

		//  CHARMED OPTIONS
		if (clv > 0) {
			// Vampyre
			var vs = '';
			if (perLilith.isHere()) {
				if (perKate.isCharmedBy("You") && !bKateHere) addLinkToPlace(md, 'ask Mrs. Granger to invite Kate to join us', 177, 'type=katejoin');
				vs = 'vampgrangerparty&who=';
			} 
			// Mrs Granger only
			if (clv > 1) addLinkToPlaceC(md, this.other > 3 ? 'tell Mrs. Granger "Let\'s Celebrate"' : 'tell Mrs. Granger to get comfortable', Place, 'type=' + vs + 'comfortable');
			else if (this.other > 3 && clv == 1 && !this.checkFlag(7)) addQuestionC(md, '"Celebrate?"', "MrsGranger", 1000);
			// Kate and Mrs Granger
			if (bKateHere) {
				// Both here now
				addLinkToPlaceC(md, 'ask to watch some "Family Time"', 177, 'type=' + vs + 'familytimewatch');
				addLinkToPlaceC(md, 'ask to join some "Family Time"', 177, 'type=' + vs + 'familytimejoin');
			}
			
			// General conversation points for Mrs Granger
			if  (this.extra[1] == 15) addQuestionC(md, 'ask if she has ever found anything magical', "MrsGranger", 2415);

			if  (this.other == 1) addQuestionC(md, clv == 1 ? 'ask her if she has ever explored the Wild Ranges' : 'ask her to explore the Wild Ranges', "MrsGranger", 231);
			else if (Math.floor(this.other) == 2 && this.other > 2) addQuestionC(md, 'ask what she found in the Wild Ranges', "MrsGranger", 232);
			else if (this.other == 3) addQuestionC(md, 'ask if she found anything else', "MrsGranger", 233);
			else if ((perAbby.getQuestDragonGem() == 2 || perAbby.getQuestDragonGem() == 3) && this.other == 4 && !checkPlaceFlag("Museum", 8) && perAbby.getQuestDragonGem() > 0) {
				//Ready to be sent to the Museum && the museum is NOT CLOSED and have started the Dragon Vase Path
				if (perAbby.getQuestDragonGem() < 3) {
					// Haven't even SEEN the vase yet
					addQuestionC(md, 'ask her to find a dragon gem', "MrsGranger", 2502);
				}	else if (perAbby.getQuestDragonGem() == 3) {
					addQuestionC(md, clv == 1 ? 'ask her to check the museum to find the dragon vase' : 'tell her to go to the museum and find the dragon vase', "MrsGranger", 2503);
				}
			}
			if (this.checkFlag(22) && !this.checkFlag(23)) {
				addPopupLinkC(md, 'ask Mrs. Granger about her research', "Researches",
					this.addPersonString("!research.jpg", "height:max%", "right") +
					"You ask about the research she mentioned at the newspaper office. She leads you into a room obiously a study, and she says,</p>" +
					'<p>"There are an odd set of legends and stories in the Glenvale area stretching back to before the town was founded. Talk about a sleeping dragon either guarded or hunted by demonic or other malevolent beings. This areas is fairly stable geologically and no significant rivers near, so no clear source for a dragon legend"</p>' +
					'<p>She pauses for a moment, starting to strip off some of her clothing, "These legends are consistent though some refer to an artifact or ancient relic. Not as in a fragment of a saint or the such but something else, but all I can find is references to it being protected."</p>' +
					'<p>She removes most of the rest of her clothes, "It can be difficult to look into these things, the Gatess family has a lot of useful information but will not reveal it, the Glenvale Herald has until Amara\'s father been very conservative and never published anything controversial or even slightly supernatural."</p>' +
					'<p>She kneels and starts to remove your pants, "Of course it is also difficult to concentrate at times with so many attractive distractions, like you, but I will let you know if I find anything more..." and a break from the conversation seems in order!',
					false, "setPersonFlag('MrsGranger', 23);dispPlace();"
				);	
			}
			if (clv == 1) {
				this.addSleepLink(md, "ask Mrs Granger to spend the night", "",
					"<p style='position:absolute;top:3%;left:45%;width:55%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Sleeping over with Mrs. Granger</b></p>" +
					'<p style="position:absolute;left:45%;top:5%;cursor:pointer;font-size:1.1em;width:55%">You ask Mrs. Granger if they have a spare room and she immediately invites you,<br>' +
					'"Why not sleep with...spend the night here?", and she shows you to the spare bedroom. A little later you step out and see Mrs. Granger exercising in the lounge-room, completely naked. As you look appreciatively, she looks back and smiles,<br>' +
					'"I love working up a sweat! Could you help me to get off...I mean up"<br><br><br><br><br><br>' +
					'You find it a little harder to get to sleep after this encounter!',
					'granger-bed.jpg'
				);

			} else {
				this.addSleepLink(md, "go to bed for the night with Mrs Granger", "",
					"<p style='position:absolute;top:62%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Mrs. Granger</b></p>" +
					'<p style="position:absolute;left:2%;top:65%;cursor:pointer;font-size:1.1em;width:50%">You notice night has fallen, and as you look back at Mrs. Granger she reaches out and takes your hand and leads you into her bedroom. She changes into some delightful lingerie and lies down ready for you to join her.',
					'granger-bed.jpg'
				);
			}

		}

		// Charmed or uncharmed
		if (perAbby.getQuestDragonGem() == 5) addQuestionC(md, 'ask Mrs. Granger about the vase', "MrsGranger", 2354);

		if (checkPersonFlag("Vampyre", 26) && !this.checkFlag(19)) addQuestionC(md, 'ask Mrs. Granger what she knows about vampires', "MrsGranger", 333);

		if (perKate.checkFlag(24) && perKate.place == 1000 && !this.checkFlag(16)) {
			addPopupLinkC(md, 'ask Mrs. Granger if she has seen Kate', "Where is Kate?",
				this.addPersonString("askkate.jpg", "height:max%", "right") +
				"You ask Mrs Granger where is Kate, and briefly about your last meeting and how she talked about clearing her head. Mrs Granger replies,</p>" +
				'<p>"Kate told me she was going to stay with a friend for a few days, maybe a week. One of her old friends, out of town."</p>,' +
				(this.isCharmedBy() ?
					'<p>She looks at you with a mixed expression, and gestures for you to follow. You assume she is going to give you the address or other details. She leads you to her bedroom and strips off her clothing, looking at you seductively,</p>' +
					'<p>"Surely Hon I am enough for you, and we can do something to take your mind off my daughter. I know so much more and have so much more experience..."'
 				 : '<p>She smiles and asks if there is something else you wanted here instead?'
				),
				false, "setPersonFlag('MrsGranger',16);dispPlace();"
			);
			addLinkToPlaceC(md, 'ask Mrs. Granger if she has seen Kate', 177, 'type=askkateundecided');
		} else if (!(this.checkFlag(9) || perKate.checkFlag(16))) addQuestionC(md, 'ask Mrs. Granger if she has seen Kate', "MrsGranger", 1);

	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Granger House
			if (Place == 177 && this.place == 177) {
				CastCharmSpell("MrsGranger", Place, 1, 'type=charmmrsgranger1', '', 'type=recharm1');
				return "handled";
			}
		}
		
		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// At home and charmed
			if (Place == 177 && this.isHere() && (sType == "comfortable" || sType === "")) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true, this.getDressBase() == "/Younger")) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=mrsgrangertransformage' + this.getDressBase().toLowerCase().split("/").join(""));
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls

	per.callThem = function() {
		if (Place == 269) {
			if (this.place != 177) WriteComments("You call Mrs. Granger to invite her to join you at the pool for a swim, there is no answer.");
			else {
				gotoPlace(Place, 'type=grangerpool');
				receiveCall('', 'You call Mrs. Granger to invite her to join you at the pool for a swim, and she answers, "Of course, dear, I will get my things and meet you there"');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		} else if (isAtLocation(282)) this.addDancingCall();
	};
	
	per.addPersonPhoneCall = function() {
		// Only if she is home, charmed (any way) and you are not there
		if (!isAtLocation(177) && !this.isCharmedBy() && this.whereNow() == 177) return false;
		
		if (this.checkFlag(9)) {
			// SMS Kate is home (if she is home)
			findPerson("Kate");
			if (per.place == 1) {
				if (this.makeCall(true, 220)) this.setFlag(9, false);
			}
		}
		if (this.checkFlag(14) && isEvening() && this.hoursCharmed() > 48) {
			if (this.makeCall(true, 221)) this.setFlag(14);
		}
		if (this.checkFlag(15) && isMorning() && this.hoursCharmed() > 72) {
			if (this.makeCall(true, 222)) this.setFlag(15);
		}		
		return false;
	};
	
	per.isSMSImageDressVersion = function(w) {
		if (w < 1) return false;
		return true;
	};

	per.getPersonSMS = function(id) {
		if (id == 220) return receiveSMS('MarieMILF', 'My daughter is home, but her mother will do a lot more to you', 'grangersms1.jpg');
		if (id == 221) return receiveSMS('MarieMILF', 'Do you like this, if not I can take it off?', 'grangersms2.jpg');
		if (id == 222) return receiveSMS('MarieMILF', 'I cannot reach my back, pity you are not here to help', 'grangersms3.jpg');		
		return '';
	};
}