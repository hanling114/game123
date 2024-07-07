/**************************************************************************
Leanne
**************************************************************************/
function RepliesLeanne(nR)
{
	WriteCommentsHeader();
	clv = per.getCharmedLevel();
	var cost = clv > 0 && per.isHere() ? 0 : 1;
	
	if (nR == 100) //ask about the relic
	{
		setPlaceKnown("MotherSuperiorsSecretRoom");
		addComments(
			'<b>Thrall</b></p>' +
			'<p>"There is a concealed room that the nun did not want this thrall to know about. The thrall cannot enter it, it reeks of holyness."</p>' +
			'<p>The thrall shows you the mechanism for the door before lying back onto the bed seductively.</p>'
		);
	}
	else if (nR == 416) //Picking up the stone in the shop
	{
		addComments('<p><b>Lost and Found</b></p>');
		if (perYourBody.NoItems < perYourBody.MaxItems)
		{
			findPerson("Louise");
			addComments('You grab the stone from the bin.');
			if (!per.checkFlag(6))	{
				per.setFlag(6);
				perYourBody.PutItem(5);
			}
		}	else addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');

	}
	else if (nR == 211)
	{
		var perLea = findPerson("Leanne");
		if (perLea.other < 2)
		{
			setQueryParams();
			AddCash(20);
			addComments(
				'<p><b>General ' + getShopStore(true) + '</b></p>' +
				'You sneak the ' + sCurrency + '20 into your pocket before Leanne returns. <br>'
			);
			perLea.other = 5;  // Took the $20
		}
		Place = 195;
	}
	else if (nR == 19555)
	{
		addComments('<p><b>Buying the Scissors</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > (cost * 4)) {
			AddCash(-5 * cost);
			perYourBody.PutItem(55);
			addComments('You pay ' + sCurrency + (cost * 5) + ' and tuck the scissors into your backpack.');
		}
		else if (nMoney < 5) addComments('You do not have enough money. The scissors cost ' + sCurrency + '5.');
	}
	else if (nR == 19556)
	{
		addComments('<p><b>Buying the Sports Bag</b></p>');
		if (nMoney > (cost * 9) && perYourBody.FindItem(47) === 0) {
			AddCash(-10 * cost);
			perYourBody.MaxItems += 20;
			perYourBody.PutItem(47);
			addComments('You pick up the sports bag and sling it over your shoulder, you should be able to carry more things now.');
		}
		else if (nMoney < 10) addComments('You do not have enough money. The bag costs ' + sCurrency + '10.');
	}
	else if (nR == 19557)
	{
		addComments('<p><b>Buying Some Garlic</b></p>');
		if (nMoney > (cost * 1)) {
			AddCash(-2 * cost);
			perYourBody.PutItem(62);
			addComments('You buy a string of garlic and put it in your bag.');
		}
		else if (nMoney < 10) addComments('You do not have enough money. The bag costs ' + sCurrency + (cost * 10) + '.');
	}
	else if (nR == 19530)
	{
		addComments('<p><b>Buying the Shovel</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		else if (nMoney > (cost * 14))	{
			addComments('<p>You tuck the shovel under your arm and pay ' + sCurrency + (cost * 15) + '.</p>');
			AddCash(-15 * cost);
			perYourBody.PutItem(30);

		}
		else if (nMoney < 15 && perYourBody.FindItem(30) === 0) {
			//Don't have enough money, nor the shovel
			addComments('<p>You do not have enough money. The shovel cost ' + sCurrency + (cost * 15) + '.</p>');
		}
	}
	else if (nR == 19528)
	{
		addComments('<p><b>Buying the Paperweight</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) {
			addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		}
		else if (nMoney > (cost * 2) && perYourBody.FindItem(28) === 0)
		{
			addComments('You put the object into your bag and pay ' + sCurrency + (cost * 3) + '.');
			AddCash(-3 * cost);
			perYourBody.PutItem(28);

		}
		else if (nMoney < 3) addComments('You do not have enough money. The paper weight costs ' + sCurrency + '3.');
	}
	WriteCommentsFooter();
	return true;
}

function wanderLeanne(plc)
{
	var perLeanne = findPerson("Leanne");
	if (plc !== undefined) {
		if (wherePerson("Louise") != 195) movePerson("Louise", 195);
		if (!perLeanne.isCharmedBy("Demon") && plc !== 450) perLeanne.charmThem(8, "Demon");
		if (perLeanne.other < 25) perLeanne.other = 25;
		perLeanne.place = plc;
		perLeanne.setFlag(1);
		return;
	}
	
	if (Place == 325 && perLeanne.isHere() && perJesse.getDemonPath() >= 50) {
		// Meeting with Jesse at the park has happened, if not already a thrall make her so
		perLeanne.charmThem(4, "Demon");
		
	}
	
	// Is she at the General Store
	if (perLeanne.place == 195) {
		if (perLeanne.other >= 1 && perLeanne.other <= 25) {
			perLeanne.other += 5;
			if (perLeanne.other > 25) perLeanne.other = 25;
			if (perLeanne.other >= 20 && nTime > 576) {
				// move her to the graveyard and Louise to the shop
				perLeanne.setFlag(1);
				perLeanne.other = 25;
				perLeanne.place = 325;
				if (isDemonFreed()) perLeanne.charmThem(8, "Demon");
				movePerson("Louise", 195);
			}
		}
	}
	if (isDemonFreed() && Place != 325 && perLeanne.other < 25) {
		if (wherePerson("Louise") != 195) movePerson("Louise", 195);
		// Once the demon in loose, then move her to the graveyard and Louise to the shop
		perLeanne.setFlag(1);
		perLeanne.other = 25;
		if (perLeanne.place == 450 && perLeanne.getCharmedLevel() == 0) return;		// Freed
		perLeanne.place = 325;
		perLeanne.charmThem(8, "Demon");
	}
}

function influenceLeanne(no)
{
	findPerson("Leanne");
	per.setInfluenced(per.getInfluenced() + no);
}

function initialiseLeanne()
{
	// Leanne
	addPerson("Leanne", 195, "Leanne", "");

	per.extra = [0, 0];
	// How much she was influenced by her possession and then by you
	per.getInfluenced = function() { return this.extra[1]; };
	per.setInfluenced = function(no) { this.extra[1] = no; };
	per.hadSexYourself = function() { return this.checkFlag(12) || this.checkFlag(5); };

	per.isRecovered = function() {
		var perMS = findPersonNC("Daria");
		// nTime - perMS.extra[0] = How long ago was she freed from the Church (as a thrall or herself again)
		return (nTime - perMS.extra[0]) > 575;
	};
	
	per.Replies = RepliesLeanne;
	
	per.getPersonName = function(full) { return full !== true && this.sCharmedBy == "You" ? (this.getCharmedLevel() == 1 ? "Charmed Girlfriend " + this.name : "Slave " + this.name) : this.name; };

	per.getPersonAddress = function(n) { return n ? 450 : "3 Amaranth Pl, Glenvale"; };
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (this.isCharmedBy("Demon")) {
			return this.addPersonString("homet.jpg", "height:max%", "right") +
				'<p>Leanne has been turned into a thrall...</p>' +
				'<p>Your best friends soul has been taken by the demon you accidentally helped to summon into this world and her body is being used as bait to lure others into the creatures grasp.</p>' +
				'<p>The thought alone is enough to make your innards constrict violently.</p>' +
				'<p>You know little about what actually happens to the ones Legion claims. Leanne\'s... the thralls eyes  are blank and empty, and while it speaks with your friends voice, it is clear that unlike those under the influence of the charm spell, there is nothing left of her personality.</p>' +
				'<p>Worst of all, being in her... the thralls mere presence makes your body shiver with desire. You have always found Leanne to be attractive, but only now do you realize how beautiful and sexy she actually is, and you are not quite sure what to make of these new feelings.</p>' +
				'<p>You hope that the real Leanne is still somewhere in there and can be saved, but for now, you will have to find out more about the Demon and what exactly it did to her first.</p>';

		}
		//	Description if she is the players slave.
		if (this.getCharmedLevel() == 4) {
			return this.addPersonString("shopmeet.jpg", "height:max%", "right") +
				'<p>Leanne used to be your best friend, and now she is one of your favorite slaves, sometimes things take a weird turn.</p>' +
				'<p>You are still not quite sure what suddenly made you desire a girl for whom you have never felt anything but friendship, but it doesn\'t matter anyway. She is now yours and both of you could not be happier.</p>' +
				'<p>You are often visiting your slave at home or work and take great care to teach her how to serve you properly, and every day she rewards you by turning more and more into your perfect little slut and serving with enthusiasm like you would never have expected from her, even under your spell.</p>' +
				'<p>She has begun teaching you about the ins and out of managing her ' + getShopStore() + ' so you can one day take over and she may devote all her time to be your perfect slave, and while it will be awhile until you are able to use it to supplement your personal income, you believe you do have a few ideas to ensure employee motivation.</p>';
		} else if (this.getCharmedLevel() == 1) {
			//Description if she is the players' lover.
			return this.addPersonString("shopmeet.jpg", "height:max%", "right") +
				'<p>You would never have dreamed that your relationship with Leanne would turn out this way, but with a little magical help she has all but forgotten her time under Legions control and turned out to be a really sweet, loving girlfriend with the type of fun and kinda bubbly personality you had almost forgotten she used to have every day.</p>' +
				'<p>Still, you are not sure you made the right choice. Leanne was always strictly a friend, even though it turned out she had hidden feelings for you, but you have really broken her trust by charming her and do wonder how much of your sudden desire to add her to your harem was your own and not influenced by the thralls glamour.</p>' +
				'<p>You know you can never go back to the way things were between you two, but on the other hand, why would you want to?</p>' +
				'<p>Leanne is really happy to be with you and no longer troubled by the aftermath of her possession. Also, you would lie to say your feelings for her have not changed in the last days and you thoroughly enjoy every minute spend with her as she is now.</p>';
		} else if (this.checkFlag(16) && this.getInfluenced() === 0) {
			// Description if she and the player are still friends without the charm (0 points)
			return this.addPersonString("shopmeet.jpg", "height:max%", "right") +
				'<p>Not much has changed between you and Leanne, and you are thankful for it.</p>' +
				'<p>Thanks to your help, Leanne is still the same person she was before her encounter with Legion, and while she makes it clear that she is not happy about a lot of the things you use your magic for, she still believes in you as a person and the two of you still share a strong bond of friendship.</p>' +
				'<p>Still, not everything is as it was. Both of you still feel the aftereffects of the thralls glamour, weak as it is now, and the two of you have to decide how to deal with these new feelings sooner or later, and while Leanne is lenient when it comes to you using your magic to enthrall people, she makes it clear that she does not approve of it and will often try to, more or less subtly, steer you into what she believes to be the right direction.</p>' +
				'<p>All things aside though, it feels good to have someone like her to talk to. Leanne doesn\'t mince words and there are preciously few people who know about your magical abilities and are not spellbound to treat everything you say as pure gold, so maybe she has a point and you should be more careful with the charm.</p>' +
				'<p>Maybe.</p>';
		}
		// Default
		return this.addPersonString("shopmeet.jpg", "height:max%", "right") +
			"Leanne is you good friend and you originally met her when she became good friends with your sister Tracy. While they are still friends they are no longer as close as they were." +
			"<br><br>" +
			"Leanne\'s parents owned and ran this " + getShopStore() + ", but unfortunately they died in an accident last year. It was over this tragedy that you became close friends with her and became aware of her religious beliefs, something she had never discussed before. Leanne has been running the " + getShopStore() + " since then, and after a rough start she is doing well. At times she complains about wanting something different, but she also enjoys dealing with people and generally running the business." +
			"<br><br>" +
			"You consider her to be your best friend now, and you have never had any romantic thoughts towards her. She has been in a number of non-serious relationships, occasionally double dating with Tracy.";
	};
	
	per.getPossessionFace = function() { return "face" + (this.isCharmedBy() ? "c" : (this.isCharmedBy("Demon") ? "t" : "u")); };	
	
	per.getModels = function() { return "Anna|Anna Tatu,Veruca|Veruca James"; };

	per.whereNow = function()
	{
		if (this.place == 325) {
			if (this.isCharmedBy("Demon")) return 325;
			if (!isDay()) return 0;
		} else if (this.checkFlag(29) && isShopOpen(2, 1, true) && !isMorning(1, 2)) return 195;
		return this.place;
	};
	
	per.isLover = function() { return this.getCharmedLevel() == 1; };	

	per.passTimeDay = function() {
		if (this.place == 450 && this.checkFlag(16)) {
			if (this.getInfluenced() > 4 && !this.isCharmedBy()) {
				if (!this.checkFlag(20)) this.setFlag(20);
				else this.place = 9999;		// Gone
			} else if (!this.checkFlag(20)) this.setFlag(20);
		}
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 325 && this.isHere()) {
			if (this.isCharmedBy("Demon") && !bPopupShown) {
				if (!this.checkFlag(3)) {
					perYou.startQuest(5);
					this.setFlag(3);
					md.write(
						'<p>You see Leanne is still here, leaning against a wall. She seems to have had a problem with her clothes, her belt must have broken or the lower part ripped. You approach her to offer some assistance and she looks at you, a smile on her face. You are about to talk to her and you see her eyes, blank like the Demon Legion\'s thralls. Did the demon take your friend, turning her into a soul-less being of pure desire, with no free-will a puppet of the demon? As you look at her in horror, she speaks, her voice still that of Leanne but different, more sensual,</p>' +
						'<p>"Mistress told this thrall to wait here but not for you. This one once here wanted you but would not take you, some pointless things called \'friendship\' and \'family\'. Mistress took that. Now this thrall waits for one of the brides to come here and submit to <b>her</b>. They come here, sneaking though a secret way, when they want to escape that place and the laws they must follow."</p>' +
						'<p>She looks at you, and you call for Leanne to resist the demons influence');
					if (perYourBody.FindItem(32) > 0) md.write(', and try the silver ring but it fails to do anything');
					md.write(
						'. Leanne, or is it the thrall, replies,</p>' +
						'<p>"Quiet, all of that one is gone, Mistress has her to devour when it is time to <i>leave</i>."</p>' +
						'<p>The thrall, you can no longer call her Leanne, looks at you hungrily,</p>' +
						'<p>"Desire remains and this thrall has time, this body is yours"</p>' +
						'<p>The thrall removes the rest of Leanne\s clothing and lies down on them, waiting for you.</p>'
					);
				} else md.write('<p>You see the thrall in Leanne\'s body lying on her clothes, naked and waiting sensuously, for you, or for her prey.</p>');
			} else if (!this.checkFlag(2)) {
				md.write('<p>You see Leanne near a ruined mausoleum, or maybe it is a disused part of the old church. She is walking thoughtfully towards her family graves, where her parents are buried and those of several generations of her kin. She has not noticed you yet.</p><p>You feel sad for your friend, she regularly visits the graves, probably too often but she takes some comfort here.</p>');
				this.setFlag(2);
			} else if (this.checkFlag(4)) md.write('<p>You see Leanne is still here visiting her families graves, you cannot think of a reason to interrupt her again.</p>');
			else md.write('<p>You see Leanne is still here visiting her families graves.</p>');
		}
		else if (Place == 382 && this.isHere() && sType === "") {
			// Common text (while Leanne is here)
			md.write('<p>How can you help Leanne? You doubt you could just walk with her out of here, and even if you did, you have no hold over her. ');
			if (isDemonInTown()) md.write('After all the demon is still in Glenvale and would just take control over her again, so you would just be freeing her for the demon to use.');
			else if (perYou.checkFlag(21)) md.write('You could teleport with her out of here but where to and how to free Leanne of the spell. At least here she is safe and unable to harm others. You really need to seek other peoples <b>advice</b>.</p>');
		}
	};

	per.showEventPopup = function()
	{
		if (Place == 195 && this.place == 195 && !this.checkFlag(1)) {
			if (this.dress === "") {
				this.pickModel('You see two women at the counter of the store, one is your friend Leanne. Is she...', "shopmeet", "Anna", "Veruca", "Blonde", "Brunette", "", "Leanne's Store");
			} else {
				this.setFlag(1);
				showPopupWindow("Leanne",
					this.addPersonString("shopmeet.jpg", "height:max%", "right") +
					"This " + getShopStore() + " is run by a good friend of yours, Leanne. You originally met her when she became good friends with your sister Tracy. While they are still friends they are no longer as close as they were." +
					"<br><br>" +
					"Leanne\'s parents owned and ran this " + getShopStore() + ", but unfortunately they died in an accident last year. It was over this tragedy that you became close friends with her and became aware of her religious beliefs, something she had never discussed before. Leanne has been running the " + getShopStore() + " since then, and after a rough start she is doing well. At times she complains about wanting something different, but she also enjoys dealing with people and generally running the business." +
					"<br><br>" +
					"You consider her to be your best friend now, and you have never had any romantic thoughts towards her. She has been in a number of non-serious relationships, occasionally double dating with Tracy."
				);
			}
			return true;
		}
		
		if (Place == 384 && this.place == 450 && !this.checkFlag(27) && this.isCharmedBy("Demon")) {
			this.setFlag(27);
			showPopupWindow("Where is Leanne?",
				this.addPersonString("homet.jpg", "height:max%", "right") +
				"You look around and see Leanne is missing, how did she get out of here, but then again you have been \'distracting\' Mother Superior a lot recently. " +
				'<p>You ask Daria and she says Leanne took her red dress and left while she was distracted. You see Daria touch herself and realise her arousal after the spell meant she was not watching Leanne</p>' +
				'<p>You are unsure how Leanne crossed the sacred grounds of the church, but it seems she must of somehow, maybe some shortcut or something? You wonder where she will of gone, the only places you can thing of would be her home or her shop.</p>'				
			);
			return true;			
		}
		
		if (Place == 450 && !this.isRecovered() && !this.checkFlag(16) && !isDay() && sType === "") {
			showPopupWindow("Where is Leanne?",
				this.addPersonString("homeusays.jpg", "height:max%", "right") +
				"Politely but firmly Leanne asks you to leave for now, she would prefer to be alone this evening.</p>" +
				'<p>You of course agree, you can always return another <b>day</b>.'
			);
			return true;
		}
		return false;
	};


	// events for Leanne
	per.showEvent = function()
	{
		if (Place == 2 || Place == 9 || (Place == 63 && sType == "jessepark") || Place == 325 || Place == 374) wanderLeanne();

		var md, s, nInf, stage;
		
		if (sType == "endgame1leanne") {
			// End Game - Leanne
			md = WritePlaceHeader();
			stage = this.isCharmedBy("Demon");	// Thrall Leanne is here
			this.showPerson("pregnant" + (stage ? "t" : "c") + ".jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for " + (stage ? "Thralls/" : "") + "Friends?");

			if (stage) {
				md.write(
					'<p>You only occasionally visit Leanne since...she became a demonic thrall. Unfortunately one of those visits was \'fruitful\' and you are efinitely unsure this is a good thing. Actually you are fairly sure it is not!</p>'
				);
			} else {
				md.write(
					'<p>One day when you visit Leanne you see she her pregnancy is developing well. You have often visited her so you knew all along about the \'happy?\' news.</p>' +
					'<p>This is one case where you are unsure if this was a case where you should of payed attention to Miss Logan.</p>'
				);
			}
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);				
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 53 && (sType == "teleportthrall" || sType == "vampabduct")) {
			// Attempt the Ritual of Return 
			md = WritePlaceHeader();
			this.setFlag(27);
			this.extra[1] = 0;
			if (sType !== "vampabduct") {
				AddMana(-1);
				setPersonOther("Daria", nTime, 1);
			}
			if (isDemonGone()) {
				// FAILED: Demon has left town with the relic, so it cannot be done
				this.moveThem(450);
				//addPlaceImage(md, "hiddenroom1b.jpg");
				this.showPerson("msroomleave.jpg");
				addPlaceTitle(md, "Freeing the Thrall");
				AddImageNI("hiddenroom1d.jpg", "25%", "right");
				md.write(
					'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
					'<p>"Yes, I will reward you to our pleasure.", she tells you seductively.</p>' +
					'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue. You tell her,</p>' +
					'<p>"Leave here, your former Mistress is gone, she has abandoned you. You promised to reward me, go somewhere, I will find you, until then do nothing, you must reward me first!". She looks at you and replies,</p>' +
					'<p>"Of course, this thrall knows the demon has left, this thrall is of no use any more. What is a thrall with no Mistress?", and she leaves the Hidden Room.</p>'
				);

			} else if (perYourBody.FindItem(48) === 0) {
				// FAILED: Here but without the relic, cannot be done
				this.moveThem(450);
				//addPlaceImage(md, "hiddenroom1b.jpg");
				this.showPerson("msroomleave.jpg");
				addPlaceTitle(md, "Attempting the Ritual of Return");
				AddImageNI("hiddenroom1d.jpg", "25%", "right");
				md.write(
					'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
					'<p>"Yes, I will reward you to our pleasure.", she tells you seductively.</p>' +
					'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue. You quickly start to prepare for the ritual, but you realise you do not have the relic with the demon bound into it. The thrall laughs,</p>' +
					'<p>"Foolish ' + perYou.getWitch() + '!", and she runs out of the door into the alleyway. You try to follow but she is very fast and quick gets out of your sight.</p>' +
					'<p>Well, you have messed up, where would the thrall go, back to the graveyard, or somewhere else?</p>'
				);

			} else {
				// WORKED: Here with the relic, it is locked here (for now)
				perYourBody.DropItem(48, -53);
				this.moveThem(53);
				this.unCharmThem();
				//addPlaceImage(md, "hiddenroom1d.jpg");
				this.showPerson("msroomleave.jpg");
				if (sType == "vampabduct") {
					// Brought here from Leanne's home by Lilith
					addPlaceTitle(md, "The Vampyre and The Ritual of Return");
					AddImageNI("hiddenroom1d.jpg", "25%", "right");
					md.write(
						'<p>You tell the vampyre to go inside Leanne\'s house and grab the thrall. For a moment she looks at you with distaste and then in a blur of inhuman speed the vampyre enters the house and has embraced the thrall from behind, holding her securely, and somewhat sensually. You follow and see the thrall looking perplexed,,</p>' +
						'<p>"This is not necessary, this body is yours, or that of your undead slave, though it is unlikely she will feed on this body". The vampyre looks a little disgusted,</p>' +
						'<p>"This body is tainted, I will not feed on her. Do you want this thing slain ' + perYou.getMaster() + '?"</p>' +
						'<p>You tell here to bring the thrall with you, and you leave Leanne\'s house and quickly cross the town to the Hidden Room. The thrall makes no effort to struggle initially, but as you get near to the alley she starts to try to break free, pointlessly. The vampyre has her securely held with overwhelming strength. Fortunately it is night time and few people around to notice your odd little group.</p>' +
						'<p>In the Hidden Room you tell the vampyre to keep the thrall held but unharmed. You quickly start to prepare for the ritual, and you hang the relic on claws of the statue, the only place it will easily fit. The thrall starts to speak, but the relic glows as you also start to recite the words Ms. Jones taught you. As you do the thrall seems to freeze, and you see an eerie image form in one of the mirrors. A ghostly figure that is only visible in the mirror, an indistinct female figure, it has to be Leanne!</p>' +
						'<p>You call out the last of the words and the thrall lets out a muffled cry, and slumps in the vampyre\'s arms and vomits. After a short vomit she looks up,</p>' +
						'<p>"' + perYou.getPersonName() + ' I am free, you saved me, thank you, thank you!"</p>' +
						'<p>You tell the vampyre to release Leanne and then ask Leanne how she is feeling and what she remembers,'
					);
				} else {
					// Teleported from Mother Superior's room
					addPlaceTitle(md, "The Ritual of Return");
					AddImageNI("hiddenroom1d.jpg", "25%", "right");
					md.write(
						'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
						'<p>"Yes, I will reward you to our pleasure.", she tells you seductively as she throws on something simple.</p>' +
						'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue.</p>' +
						'<p>You quickly start to prepare for the ritual, and you hang the relic on claws of the statue, the only place it will easily fit. The thrall starts to speak, but the relic glows as you also start to recite the words Ms. Jones taught you. As you do the thrall seems to freeze, and you see an eerie image form in one of the mirrors. A ghostly figure that is only visible in the mirror, an indistinct female figure, it has to be Leanne!</p>' +
						'<p>You call out the last of the words and the thrall lets out a muffled cry, and slumps to the ground and vomits. After a short vomit she looks up,</p>' +
						'<p>"' + perYou.getPersonName() + ' I am free, you saved me, thank you, thank you!"</p>' +
						'<p>You ask how she is feeling and what she remembers,'
					);
				}
				if (this.hadSexYourself()) md.write(' especially how you had had sex with her when she was the thrall,');
				md.write(
					'<p>"I remember everything...it is like I was asleep but when I woke up I could remember this very vivid dream, but I know it was real, just not what I was doing...'
				);
				if (this.hadSexYourself()) {
					md.write(
						'I remember what you did with <i>her</i> very clearly."</p>' +
						'<p>She looks at you very embarrassed, and continues,</p>' +
						'<p>"We will never speak of it."</p>'

					);
				} else md.write('"</p>');
				md.write('<p>You tell Leanne it would be best if she return home and clean up and that you will visit her later.');
				if (this.hadSexYourself()) md.write(' She blushes and agrees.</p>');
				else md.write(' She agrees readily.</p>');
				perYou.completeQuest(5);
			}
			startQuestions();
			if (this.place == 53) addOptionLink(md, "say goodbye to Leanne for now", "movePerson('Leanne',450);gotoPlace(53)");
			else addLinkToPlace(md, "well that did not work as you hoped", 53);
			if (sType == "vampabduct") {
				AddPeopleColumnMed(md);
				perLilith.showPerson("vamp1b.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 195) {
			if (sType == "mindstore") {
				md = WritePlaceHeaderNIP();

				if (this.other === 0) this.other = 1; // Offered to help Leanne
				addPlaceTitle(md, "General " + getShopStore(), "generalshop1.jpg");

				md.write(
					'<p>Leanne thanks you for the help and exits to the back of the ' + getShopStore() + '.</p>' +
					'<p>You are left "supervising" the ' + getShopStore() + ', which isn\'t much of a problem because there are no customers around. The till is partly open and you can see a ' + sCurrency + '20 bill peeking out.</p>'
				);

				startQuestions();
				addQuestionCO(md, 'take the ' + sCurrency + '20 from the till', "Leanne", -211);
				addLinkToPlaceO(md, 'leave the ' + sCurrency + '20 and wait for Leanne to return', 195, '', '', '', 'ExitGeneralShop()');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "leannebreak") {
				// Play/repeat sex
				md = WritePlaceHeaderNI();
				this.showPersonRandomRorXBG("shopbreak.jpg", isExplicit() ? 2 : 1);

				addPlaceTitle(md, "Playing With your " + (this.isLover() ? 'Lover' : 'Slave'));

				if (this.isLover()) {
					md.write(
						'<p>"I\'m so glad we became lovers" Leanne says, her hands moving seemingly without her direction to undress herself.</p>' +
						'<p>"I want to be with you whenever you like and I know you won\'t take me for granted and every moment with you is pure bliss. Shall we make love now?"</p>' +
						'<p>"Yes", you say honestly.</p>'
					);
					
				} else {
					md.write(
						'<p>"I\'m so glad I decided to be your slave, ' + perYou.getMaster() + '," Leanne says, her hands moving seemingly without her direction to undress her.</p>' +
						'<p>"Now I can be available for you whenever you like and I won\'t care for a moment if you take me for granted and every moment of obedience is pure bliss.  Do you wish to take me now?"</p>' +
						'<p>"Yes", you say honestly.</p>'
					);
				}

				startQuestions();
				addLinkToPlace(md, 'leave your ' + (this.isLover() ? 'lover' : 'slave') + ' to clean up', 194);
				WritePlaceFooter(md, "Script by Tilde (modified for Leanne)");
				return true;

			} 			
		}
		
		if (Place == 269) {
			if (sType == "leannepool") {
				clv = this.getCharmedLevel();
				WaitHereOnly(6);
				md = WritePlaceHeader();
				if (this.place == 150) this.showPerson("poolua.jpg");
				else if (this.isCharmedBy()) this.showPerson("poolc.jpg");
				else this.showPerson("poolub.jpg");
				addPlaceTitle(md, "Swimming with Leanne");
				if (clv == 0) md.write('<[>Leanne arrives in a top and shorts, a favourite casual outfit for her. She say she is not really interested in swimming but just wants to hang-out with you at the pool.</p>');
				else if (clv == 4) md.write('<p>Your slave Leanne arrives and changes into her swimsuit and happily wades out into the pool with you.</p>');
				else md.write('<p>Leanne arrives and changes into her swimsuit and happily wades out into the pool with you.</p>');
				startQuestions();
				if (this.isCharmedBy()) addLinkToPlaceC(md, '"I didn\'t want to swim anyway"', Place, 'type=leannepoolsex');
				addLinkToPlace(md, 'say goodbye to Leanne', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "leannepoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandom("pool-sex", 2);
				addPlaceTitle(md, "Leanne at the pool");
				if (perYou.isMaleSex()) md.write('<p>Leanne is quite content to just suck your cock by the water.</p>');
				else md.write('<p>Leanne is quite content to just lick your pussy by the water.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Leanne', Place);
				WritePlaceFooter(md);
				return true;
			}
		}	
		
		if (Place == 325) {
			if (sType == "leannetalk") {
				// Talk to Leanne
				md = WritePlaceHeader();
				this.setFlag(4);
				this.showPerson("graveyardub.jpg");

				addPlaceTitle(md, "Leanne at the Graveyard");
				md.write(
					'<p>You approach Leanne and she looks at you sadly. Without a word you place an arm around her shoulders. After a little while you speak words of sympathy and comfort as best as you can. Leanna smiles in a slightly strained way and in a slightly broken voice,</p>' +
					'<p>"Sorry, it is just I keep hearing strange rumours, Louise said she saw a ghost the other day, and I heard someone saw weird shapes in the park and heard an unearthly scream like a banshee. It got me to thinking about death and the dead..."</p>' +
					'<p>You try to reassure her, but she continues,</p>' +
					'<p>"You know my father\'s, great-grandfather, or was it great-great-grandfather...I can never remember this ancestry stuff...he was in the coven, a servant of that warlock Kurndorf. My mother\'s ancestors were even there too, but in a less...corrupt way...as..servants.. This talk of ghosts and banshee makes me think of these and my family..."</p>' +
					'<p>You try to change the topic of the conversation, it is too close to what is going on for comfort, and Leanna tells you,</p>' +
					'<p>"It\'s alright, when I am finished here I think I will go and seek God\'s guidance, the Mother will help as always."</p>' +
					'<p>You talk a little more with her, nothing of import, just to try to help her if you can. After a little while you part company with your friend.</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlace(md, "walk through the Graveyard", 325);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "thrallfuck") {
				// Take the Thrall
				md = WritePlaceHeader();
				this.setFlag(5);
				if (perYou.isMaleSex()) this.showPerson("graveyardtfuckb.jpg");
				else this.showPerson("graveyardtfuckg.jpg");
				addPlaceTitle(md, "Thrall at the Graveyard");
				md.write(
					'<p>You tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne. You keep telling yourself that as you approach her.</p>' +
					'<p>You are rather confused and disturbed, you do not know if your friend is like this permanently, but you have always felt attracted to her, not that you would ever of considered doing anything before this. As you hesitate you see Leanne...the thrall smile and gesture for you to approach.</p>' +
					'<p>You step onto the stony wall or is it a decaying scarcophagus, and kneel awkwardly on part of Leanne\'s dress. You smell a faint hint of sulphur and look uncertainly at the thrall. She reaches up and undoes your pants, and then ' + (perYou.isMaleSex() ? 'strokes your hardening cock' : 'rubs your moistening pussy') + ' and says "You want this body, take it"</p>' +
					'<p>Your hesitation evaporates, though not all your discomfort and you push the thrall down and '
				);
				if (perYou.isMaleSex()) {
					md.write(
						'sink your hard cock into her hot and very wet pussy. She lewdly moans and rakes her fingernails over your back. You pound your cock into her, fucking her with wild abandon, this is just your lust for Leanne..the thrall, a being driven by lust. You feel you climax rapidly approaching and the thrall painfully digs her nails into your back and you feel her orgasm, strong pulsations of her pussy and you grunt as you cum, unloading your lust and balls deeply into her.</p>'
					);
				} else {
					md.write(
						'straddle her face. She eagerly and skillfully licks your pussy lips and clit. You are aware she is masturbating herself but this is about lust and about the thrall satisfying your lust for Leanne..the thrall, a being driven by lust. Your orgasm builds quickly and irresistibly, and your scream of passion echoes through the graveyard. You slump and then see her pussy as she lowers it onto your face. You reach up to lick and at the touch of your tongue the thrall lewdly moans and you see her pussy intensely orgasm, pulsing with small squirts of unnaturally hot liquid.</p>'
					);
				}
				md.write(
					'<p>Awkwardly and a little embarrassed you climb off her and redress. She looks at you "Desire remains, always"</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlace(md, "walk through the Graveyard", 325);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 382) {
			// Mother Superior's Room
			if (sType == "metleanne") {
				// Initial meeting with Leanne
				md = WritePlaceHeader();
				this.showPerson("msroom.jpg");
				addPlaceTitle(md, "Leanne in Mother Superior\'s Bed");

				md.write(
					'<p>The woman\'s appearance changes and you see Leanne lying on the bed, or at least the thrall in her body. You can see no sign of the rosary she had a moment ago. She laughs and speaks to you,</p>' +
					'<p>"So, this thrall\s Mistress is not the only one who can take a body. Did you enjoy devouring her soul?"</p>' +
					'<p>You deny harming Mother Superior and tell the thrall you are just borrowing her body, her mind and soul are unconscious...and then you hear something, it is the confused voice of the Mother Superior wondering what Leanne is talking about. The voice fades away as if she falls asleep. ' +
					'You are unsure what this means, it seems that she is still partly conscious. The Mother Superior is of such a strong will, or some other magical or spiritual effect, or even the presence of the thrall must allow her some awareness. As you consider this the thrall continues speaking,</p>' +
					'<p>"Are you here then to save this thrall, it cannot leave here, the holyness is oppressive, and this woman has promised to save her and she dragged this body here." She laughs cruelly, "As if that is possible". You dimly hear the Mother Superior <i>"...so hard to get an exorcist..could be weeks..I will save you Leanne..."</i></p>' +
					'<p>You ask the thrall how she came to be here, did she try to seduce one of the Brides of Christ, a nun, and she smiles,</p>' +
					'<p>"Tried, but it was this woman and she knows this body and recognised the presence of this thrall and sealed it here"</p>' +
					'<p>You hear the voice of the Mother Superior <i>"...Leanne, I need to save her, I just wish she would keep her clothes on, she is so very beautiful.."</i>. You ask the thrall about the glamour she had when you first saw her,</p>' +
					'<p>"To make this body as desirable as possible to the woman you have taken, to tempt her lust", you dimly hear the Mother Superior again <i>"..so very.."</i></p>' +
					'<p>You look at the thrall and vow to find a way to help Leanne, but as you do you hear the thrall,</p>' +
					'<p>"This body is full of lust, take it now using that woman!" and you dimly hear <i>"no..I could not..."</i></p>'
				);
				
				startQuestions();
				if (isPlaceKnown("MotherSuperiorsSecretRoom")) addLinkToPlace(md, 'enter the secret room', 383);	//Know about the secret room
				addLinkToPlace(md, 'walk back to the cloisters', 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '');
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "takeleanne") {
				// Take the Thrall
				md = WritePlaceHeaderNIP();
				this.showPerson("msroomtake1.jpg");
				addPlaceTitle(md, "Thrall and Mother Superior");
				if (this.checkFlag(5)) md.write('<p>Once again you tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne.');
				else md.write('<p>You tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne. You keep telling yourself that as you approach her.');
				md.write(' Furthermore this is the Mother Superior not you who will be doing it, you wonder how the Mother Superior will react to this act of carnality, especially as she seems to not quite be aware that you are possessing her body, or more sharing her body.');
				if (perYou.isBornMale()) md.write(' You do feel a bit nervous, you are possessing a woman and are going to have lesbian sex with the thrall possessing your best friend. You hope the porn you have seen helps here, as will the thrall.');
				
				md.write(
					'</p><p>You are unsure how the robes of the nun\'s habit tied or fastened and as you start to fumble you hear the Mother Superior <i>"...I suppose I should rest.."</i> and you feel your/her hand more surely move to remove the robes. The thrall watches with considerable relish, and you see her fingers start to caress her pussy.</p>' +
					'<p>As you remove the last layers you realise the Mother Superior is wearing almost no underwear just a simple shift, and you also can feel she has a rather nice figure. You hear her think <i>"..got to keep fit..but wait Leanne is here..Daria what were you thinking, keep focus..."</i>. Despite that her words fade away, at least you know now her given name is Daria and she still seems unaware of your presence.</p>' +
					'<p>Maybe you should stop, but then again this may help to <b>weaken</b> the Mother Superiors resolve as she seems to think she is doing this herself!</p>'
				);
				
				startQuestions();
				addLinkToPlaceC(md, '"No", stop this', 382);
				addLinkToPlaceC(md, '"<i>We</i> will do this"', 382, 'type=takeleanne2');
				WritePlaceFooter(md, '', true, true);
				return true;

			} else if (sType == "takeleanne2") {
				// Take the Thrall
				md = WritePlaceHeader();
				this.setFlag(6);
				findPerson("Daria").setFlag(1);
				this.showPerson("msroomtake2.jpg");
				addPlaceTitle(md, "Take the Thrall with Mother Superior");
				
				if (perYou.isBornMale()) md.write('<p>You approach the thrall, still nervous as to how to do this, but you trust the thrall will lead the way and maybe Mother Superior too.</p>');
				md.write(
					'<p>You reach out and embrace the thrall, as you do she passionately kisses the Mother Superior...you..and you are aware of the hot lust in her lips and body.</p>' +
					'<p>You can hear the Mother Superior trying to deny this and you can sense she is fully feeling everything, but still seems unaware of your presence. You decide to try something, you break the kiss and tell the thrall,</p>' +
					'<p>"I want you, and I am so aroused", and the thrall replies seeming to understand what you are trying to do,</p>' +
					'<p>"Everyone feels desire, our bodies need sex and we should give in to desire", and with that she lies you down and buries her face in your groin. licking and kissing with great expertise. You hear the Mother Superior, and her words almost echo yours. <i>I had not thought Leanne was bi-sexual..</i> and her words tail away into incoherent sounds of pleasure.</p>' +
					'<p>The thrall teases you and Daria, the Mother Superior, bringing you near to ecstasy and then pulling back and kissing you for a time, then bringing you to the brink again. She repeat this until you both are begging her to let you cum, the Mother Superior stridently in your head, and you loudly.</p>' +
					'<p>With a wicked grin the thrall takes you to a powerful orgasm, and barely had you recovered and she repositions herself so her pussy is above your face for you to do the same to her, except you immediately realise she is more positioned so you can both pleasure each other.</p>' +
					'<p>Later as you are relaxed in the after-glow of your orgasms, and the thrall is lying content from hers, you realise the Mother Superior had stopped resisting, and denying thing and was actively enjoying the experience, and you dimly hear her words <i>..well, I do not believe I gave in to temptation so easily, and loved it so much..</i></p>' +
					'<p>You wonder if maybe you could do this again, and \'train\' her to be less inhibited and more receptive to you. Then again, the thrall is probably going to be an issue, wanting to corrupt the Mother Superior for her Mistress, not...well...for you. It would probably be best to first save Leanne!</p>'
				);
				startQuestions();
				if (isPlaceKnown("MotherSuperiorsSecretRoom")) addLinkToPlace(md, 'enter the secret room', 383);	//Know about the secret room
				addLinkToPlace(md, 'walk back to the cloisters', 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '');
				WritePlaceFooter(md);
				return true;				
			}
		}

		if (Place != 450) return false;
		
		// Thrall or as herself?
		if (this.isCharmedBy("Demon") && !this.checkFlag(13) && sType === "") {
			md = WritePlaceHeader();
			var bLost = isDemonGone();		// Leanne is lost forever

			// First meeting after she arrived here
			this.setFlag(13);
			this.setFlag(27);
			this.showPerson("hometmeet.jpg");
			addPlaceTitle(md, "The Thrall in Leanne\'s Living Room");

			md.write('<p>Uncertain what you will find you push Leanne\'s front door open and call out her name, except you know she is not here, her body might be as controlled by the thrall, but not Leanne herself.');
			if (bLost) md.write(' You also know that Leanne will never be here again, she is lost forever.');
			md.write('</p><p>You cautiously enter the living room and your suspicion is confirmed, the thrall is standing there, dressed in some kind of red latex dress. She looks at you and unzips the front of her dress as she walks towards you,</p>');
			if (bLost) {
				// Demon has left the town, thrall is here permanently
				this.setFlag(28);
				md.write(
					'<p>"This thrall is here as you commanded, and this body shall be the reward promised"</p>' +
					'<p>You reply, "Well, that is something you have offered before, what else can you offer? I saw you use a power I do not have in the Mother Superior\'s room, can you teach me this, or something similar?"</p>' +
					'<p>She looks at you almost sadly, "This thrall does not know how it does those abilities, it can just do them. The thrall\'s Mistress gave it small powers to seduce and tempt but little a ' + perYou.getWitch() + ' like you could not.", she pauses and continues<br>' +
					'<p>What is a slave without an owner, a thrall with no Mistress? They are nothing, this body is all that can be offered or the abilities of this thrall to seduce"</p>' +
					'<p>You reply forcefully, "Then that is it, I will give you a purpose, you will reward me with your eternal service, your slavery to me as your ' + perYou.getMaster() + '"</p>' +
					'<p>You say this as a way to control her, you have the slight hope that someday you have be able to find the demon and free Leanne, but you also know this is a false hope, she is <i>almost</i> certainly lost. At least you can prevent the thrall in her body doing harm or at least spoiling Leanne\'s good name. The thrall looks at you,</p>' +
					'<p>"The contract is agreed, this thrall, is now <i>your</i> thrall to use in any way you desire."</p>'
				);

			} else {
				// Leanne is still saveable (but you did not have the relic)
				md.write(
					'<p>"This thrall should have realised you would know this place, one place strongly in this bodies memories. Know this, you will not trick this thrall again, while this thrall\'s Mistress is gone, her orders remain."</p>' +
					'<p>You reply, "Your orders to try to corrupt the church have failed", though you are not sure that is really true considering the Mother Superior and Sister Desiree. You continue, "You have no Mistress and no purpose any more!"</p>' +
					'<p>She replies a little sadly, "You speak the truth, this thrall has no purpose and no Mistress. This thrall will stay here, another will arrive to claim it from the <i>gate</i>."</p>' +
					'<p>Well you think this is best as it will keep her from harming others, until you can work out how to free Leanne. You just need to get the thrall back to the Hidden Room some other way, teleport will not work any more.'
				);
				if (perYourBody.FindItem(48) === 0 && perYourBody.FindItem(48) != -53) md.write(' Then again you still do not have the relic...');
				md.write('</p>');
			}
			startQuestions();
			addLinkToPlace(md, "leave the house", 38);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "fuckthrallleanne") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("hometfuckb", isExplicit() ? 2 : 1);
			else this.showPerson("hometfuckg.jpg");
			addPlaceTitle(md, "Fucking Leanne the Thrall");

			md.write(
				'<p>You tell your thrall ' +
				(perYou.isMaleSex() ? 'to bend over so you can fuck her. She quickly removes her clothes and presents herself to you, smiling but with her blank eyeys.'
										  : 'to lick and be licked. She strips her clothes and spreads her legs ready for you, smiling if her blank eyed way') +
				'</p><p>You enjoy your thrall but still there are nagging thoughts of your friend Leanne, but you have given up on her and the thrall is yours now.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "give more orders to the thrall", 450);
			WritePlaceFooter(md);
			return true;
		}

		if (sType.substr(0, 5) == "charm") {
			// Charm spell
			md = WritePlaceHeaderNP();
			nInf = this.getInfluenced();
			if (sType == "charm1") {
				this.showPerson("homecharm1.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				if (nInf < 5) {
					md.write(
						'<p>You chat with her for a while and wait for an opportunity to arise, and as Leanne moves to the fridge to get herself something to drink, you quietly whisper the words of the spell and guide a small portion of your mana into her body.</p>' +
						'<p>Leanne gasps, her cheeks flushing red as a wave of arousal begins to spread inside her, but for now, she seems more concerned that you might notice it than with the fact that it is happening.</p>' +
						'<p>From now on, there is no going back, Leanne, your best friend, will be bound by your spell, and you can only decide what you want her to be.</p>'
					);
				} else {

					md.write(
						'<p>Dai Chu, Leanne! You make no attempt to hide the casting of your spell, Leanne may know about your magic, but you catch her by surprise and she is not Kate, so it is not like she will be able to do anything to stop you from completing it.</p>' +
						'<p>You see confusion in Leanne\'s eyes as the mana begins to spread within her, then fear as she realizes what you did and backs away, her cheeks flushing red with arousal and her breathing increasing in pace while you calmly watch the spell taking hold. She may not have the same feelings she had for you anymore, but it does not matter.</p>'
					);
				}

				startQuestions();
				if (nInf < 5) addLinkToPlaceO(md, 'reinforce her existing feelings for you and let her be your lover', 450, "type=charm2lover");
				addLinkToPlaceO(md, 'let the spell fully dominate her mind, she will make a wonderfully slutty slave', 450, "type=charm2slave");

			} else if (sType == "charm2lover") {
				this.showPerson("homecharm2l.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				md.write(
					'<p>You ask Leanne if everything is alright and she hastily nods.</p>' +
					'<p>“Yes... yes. I have been having these... feelings ever since you freed me from the demon, this is just a little... stronger than usual.”</p>' +
					'<p>Leanne sits back down, but nervously slides over the stool while trying her best to find a way back into the conversation and keep her eyes averted from your crotch/chest.</p>' +
					'<p>“Maybe I should leave?” You finally suggest with fake concern, explaining that your presence might be making things worse, and Leanne quickly blurts out a loud “No!” seemingly surprised by her reaction herself.</p>' +
					'<p>“I mean, no need to, it\'s alright... why would you make things worse?” Leanne is clearly squeezing her legs together now, her eyes loosing focus, but she is still determined to not show you her arousal.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'remind her of what the Thrall told you', 450, "type=charm3lover");

			} else if (sType == "charm3lover") {
				this.showPerson("homecharm3l.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				md.write(
					'<p>“It\'s just, the Thrall told me you had feelings for me... before all this, feelings you never spoke about.” You explain to her that you are “worried” your presence might make her desire even worse, and Leanne brushes it off with a giggle.</p>' +
					'<p>“Don\'t joke about this, it\'s enough to constantly have Tracy send me naughty pictures and suggestive messages without you joining in, too...” She casually pushes her top down and gives you a beautiful view of her breasts.</p>' +
					'<p>“I am just... really hot and need to cool off a little.”</p>'
				);
				addLinkToPlaceO(md, 'suggest that she undresses fully', 450, "type=charm4lover");

			} else if (sType == "charm4lover") {
				this.showPerson("homecharm4l.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				md.write(
					'<p>Leanne hesitates for a few seconds to contemplate your suggestion, but in the end, agrees. “Well... there is nothing on me you have not had plenty of time to see, no?”</p>' +
					'<p>A part of her likely realized that something can not be right, but thanks to her own stalling, the mana had enough time to muddle her mind, and she happily takes off her clothes and stretches herself before you, completely naked and even more sexy than you remember her when she was a thrall.</p>' +
					'<p>“Better?” You slowly let your eyes wander over her body as you ask, and Leanne shivers visibly. “No... If any, I feel even more...” She bites her lower lip, her eyes wandering to your ' + (perYou.isMaleSex() ? 'crotch' : 'chest') + ' for a second.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'Push her to accept her feelings', 450, "type=charm5lover");

			} else if (sType == "charm5lover") {
				this.showPerson("homecharm5.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				md.write(
					'<p>“Maybe I can help.” You rise from your own seat and take a step toward her. “But you will need to be honest with your feelings, Leanne.”</p>' +
					'<p>Her body is taken by a shudder as you speak her name and step closer, she opens her lips in protest, but you press a finger to them. “I am not teasing you or making jokes, and I do not think the thrall lied to me, so...” You place both elbows on her shoulders, move your lips close to hers as you push her onto the stool behind her and whisper softly: “Do you love me... Leanne?”</p>' +
					'<p>“Yes...” She breathes the answer in a barely audible whisper. “Deep inside, I always did... but I was afraid to act... I didn\'t want to ruin our friendship...”</p>' +
					'<p>Many things make sense now in retrospect, but you admit you never would have even dreamed she harbored these feelings, much less of reciprocating them. But your own feelings changed when you found her in the ruined mausoleum and you suddenly saw her not as your friend, but as a woman, naked, beautiful and undeniably sexy.... and you just had to have her.</p>' +
					'<p>Your head moves forward and the two of you share a brief kiss, soft and hesitant, but it sends both your hearts racing.</p>' +
					'<p>“You did something to me, did you? With your magic...” She suddenly asks and you nod, watching as a brief expression of sadness and betrayal in her eyes is quickly washed away by blissful devotion and a soft pink glow as the spell finishes claiming her mind.</p>' +
					'<p>“You are an asshole, ' + perYou.getPersonName() + '” She says with a laughter, and it likely is not meant as a joke and may be the first time to hear her insult someone that directly. “But for now, I\'m just glad to be with you.”</p>' +
					'<p>Her lips touch yours again and you share another kiss, deep and passionate this time, her naked body pushing against yours.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'help her release some of her pend up desires', 450, "type=charm6lover");

			} else if (sType == "charm6lover") {
				this.showPerson("homecharm6l.jpg");
				addPlaceTitle(md, "Leanne Under a Charm Spell");

				md.write(
					'<p>Leanne helps you undress and you guide her to lay down on the stairs, where she eagerly presents herself to you, her legs spreading to lewdly show her shaved pussy.</p>' +
					'<p>You drive your fingertips over her tights and to her sides as you lean in and softly kiss her above the bellybutton while she spreads her arms with a soft moan, clearly enjoying your attention. “I can\'t believe this is really... ahhh..”</p>' +
					'<p>Her body twitches as you move your lips down and begin teasing her clit with your tongue, a needful moan leaves her lips and only encourages you to go on and spread her labia with two fingers.</p>' +
					'<p>“Please ' + perYou.getPersonName() + '...” She gasps. “Don\'t make me wait any longer, I want... I need to feel you in me/your full body against mine.</p>' +
					'<p>You pull Leanne into your embrace and before you know, the two of you find yourself on the floor, your bodies passionately intertwined, touching, gasping, moaning softly as you finally seize the chance to touch and explore each other.</p>' +
					'<p>Finally, you spread her legs, guide ' + (perYou.isMaleSex() ? 'your shaft into her sex and begin to slowly roll your hips against hers' : 'your clit against hers and begin to gently rub your bodies together') + '.</p>' +
					'<p>Leanne seems to be in haven, her hands desperately holding on to one of the stools and every little motion seems to lure a new blissful noise from her lips, panting, moaning, gasping every second you take her.</p>' +
					'<p>As she reaches her orgasm, the first of many today, her arms wrap around you as if unwilling to let you go, and the two of you share another kiss.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, "talk to Leanne more", 450);
				addLinkToPlace(md, "leave the house", 38);

			} else if (sType == "charm2slave") {
				this.charmThem(4);		// Slave
				this.showPerson("homecharm2s.jpg");
				addPlaceTitle(md, "Slave Leanne Under a Charm Spell");

				md.write(
					'<p>“' + perYou.getPersonName() + '... I\'m...” You notice your mana spreading through her body at a rapid pace, her possession potentially leaving her more attuned to its effects, and you smile as you interrupt her.</p>' +
					'<p>“...feeling horny? Your mind clouding by a haze of desire? A desire to serve?”</p>' +
					'<p>You put a strong emphasis on the last word and watch as your friends body trembles under a wave of pleasure, forceful enough that she needs to support herself on one of the stools. Her eyes are wide open as she realizes what is happening, focused on you “Why...?”</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'tell her it was destined to be', 450, "type=charm3slave");

			} else if (sType == "charm3slave") {
				this.showPerson("homecharm3s.jpg");
				addPlaceTitle(md, "Slave Leanne Under a Charm Spell");

				md.write(
					'<p>“Do you remember what you told me about your ancestors? How they were servants of Kurndorf.” You slowly move towards her, and as Leanne tries to get away, you simply order her in a firm voice to stay right where she is and not move or speak.</p>' +
					'<p>“I\'ve been thinking about it.” You explain as you push her skirt up and pull down her panties. “You are meant to serve a powerful warlock just as they did, Leanne.” She shivers as your hands travel over her tight and faintly brush along her nether-lips. “You were meant to serve me!”</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'order her to turn around and pull her dress up', 450, "type=charm4slave");

			} else if (sType == "charm4slave") {
				this.showPerson("homecharm4s.jpg");
				addPlaceTitle(md, "Slave Leanne Under a Charm Spell");

				md.write(
					'<p>Leanne follows your order without any hesitation and presents her by now glistering pussy to you, but you can still see resistance in her eyes. “' + perYou.getPersonName() + ', please, you can\'t...”</p>' +
					'<p>“Of course I can, Slave.” You silence her by placing a finger on her lips. “I am your ' + perYou.getMaster() + ', and you will address me as such.”</p>' +
					'<p>You see a plethora of emotions play on Leanne\'s face, defiance, anger, but most of all... sadness, and you watch as  they all fade the more her arousal increases, replaced with lust, need and desire as she looses the battle against your spell.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'remove the rest of her clothing and push her onto the stool', 450, "type=charm5slave");

			} else if (sType == "charm5slave") {
				this.showPerson("homecharm5.jpg");
				addPlaceTitle(md, "Slave Leanne Under a Charm Spell");

				md.write(
					'<p>Leanne only wore a light dress, and she does not fight back in the slightest as you push it over her shoulders and her naked body onto one of the stools.</p>' +
					'<p>“Now tell me what you are.” You tenderly caress her cheek and move your lips close to hers, looking deeply into her eyes.</p>' +
					'<p>“I am a slave...” she whispers, and you roughly push her back against the pillar.</p>' +
					'<p>“A slave, what?”</p>' +
					'<p>“I am a slave, ' + perYou.getMaster() + ', I am your slave, ' + perYou.getMaster() + '.” she blurts out, her body trembling under your touch.</p>' +
					'<p>“And why are you a slave?” You drive your free hand over her stomach and your fingers briefly caress her shaved mound.</p>' +
					'<p>“Because I want to be, ' + perYou.getMaster() + ', I was meant to be your slutty servant from the day we met!”</p>' +
					'<p>“And you will never desire anything more than to be mine with body heart and soul, to be the perfect slave you were always meant to be? A slut who is always wet, knowing that only I can and will satisfy her desires?”</p>' +
					'<p>“Oh please yes, ' + perYou.getMaster() + '.” She moans in delight. “Please make me yours forever.”</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'take your new slave', 450, "type=charm6slave");

			} else if (sType == "charm6slave") {
				this.showPerson("homecharm6s.jpg");
				addPlaceTitle(md, "Slave Leanne Under a Charm Spell");

				md.write(
					'<p>You spread Leanne\'s legs and drive your fingers over her slit to feel her wetness, and your slaves body twitches under your touch, her eyes filling with desire, following your hands and begging for more.</p>' +
					'<p>Please ' + perYou.getMaster() + '...” She whispers. “Don\'t make me wait...”</p>' +
					'<p>You ponder teasing her longer, but to be honest, you want her almost as much as she wants you by now.</p>' +
					'<p>It may be an aftereffect of the thralls glamour, but you don\'t care, within seconds, you have thrown your clothing to the floor and '
				);
				if (perYou.isMaleSex()) {
					md.write(
						'push your already rock-hard cock into her waiting mound.</p>' +
						'<p>“Leanne exhales a lustful groan as you push her head against the pillar again and roughly take her, pushing into her almost dripping sex again and again with force while manipulating the mana within her to keep her arousal at peak, close to climax but never quite there.</p>'
					);
				} else {
					md.write(
					'press your lips against her waiting folds.</p>' +
					'<p>Leanne moans blissfully as your tongue tickles her clit and your fingers begin to spread her sex, and you watch in delight as her body twitches and spasms with every motion, and quickly, it is no longer enough for you.</p>'
					);
				}
				md.write(
					'<p>She yelps in surprise as you drag her to the ground and straddle her face, but she immediately recognizes what she has to do and drags her tongue over your folds while you bow forward to once again tend to hers.</p>' +
					'<p>You make her repeat what she is again and again, your slave, your slut, your ever devoted servant, and she almost screams every word with ecstatic enthusiasm until you can finally no longer hold back, order her to cum with you and both your bodies are shaken by a mutual climax, the first of many.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, "talk to Leanne more", 450);
				addLinkToPlace(md, "leave the house", 38);
			}

			WritePlaceFooter(md);
			return true;

		}

		if (sType == "askher") {
			// Set initial influence
			stage = getQueryParam("stage");
			if (stage === "") {
				nInf = this.checkFlag(5) ? 3 : 0;
				if (this.checkFlag(6)) nInf++;
				this.setInfluenced(nInf);
			} else nInf = this.getInfluenced();

			md = WritePlaceHeader();
			this.showPerson("homeumeet.jpg");
			addPlaceTitle(md, "Talking to Leanne");

			md.write(
				'<p>&quot;I\'m feeling better, now, and I guess I\'m as fine as someone can be who had her body taken over by a demon, watched as it was put on public display and...” ' + (this.hadSexYourself() ? 'She seems to seek a good word. &quot;...”used” by her best friend.' : 'used to try to seduce some of her best friends.') + '..</p>' +
				'<p>It seems much of the glamours effect has finally worn off, so it has become more easy for both of you to be around each other and Leanne seems to have calmed down a little in the last days as well, ' + (this.hadSexYourself() ? 'at least enough for her to be wiling to talk to you again.' : 'and she looks a little better with a few days of rest.') +
				'<p>Her hands, however, are still fidgeting, she looks nervous, and you see her eyes lingering on your ' + (perYou.isMaleSex() ? 'crotch' : 'chest') + ' a little too long.</p>' +
				'<p>&quot;I\'m sorry...&quot; She blushes and turns her gaze away. &quot;Ever since you released me from that... thing I\'ve been having... desires I can\'t quite shake, and I still don\'t know what exactly that woman did to me.</p>' +
				'<p>But I think you do, right, ' + perYou.getPersonName() + '?&quot; Leanne looks at you intently, and you nod.</p>' +
				'<p>&quot;Then can you please tell me then what is happening with me... you... with the whole damn Town!&quot; Her voice grows louder as she speaks, but she quickly calms herself.</p>' +
				'<p>"Sorry... I did not mean to swear...&quot; She takes a breather and crosses her heart.</p>' +
				'<p>You assure her that you don\'t mind, but she probably does deserve to know what happened, the question is, how much are you willing to tell her?</p>'
			);

			startQuestions();
			startAlternatives(md);
			if (stage === "") {
				if (isCharmedPath()) {
					s = '&quot;So... Sir Ronald Gates himself made you his apprentice? Just like that?&quot;</p>' +
						'<p>Leanne&rsquo;s eyes fixate on you the way they always do when she is suspicious of you, sometimes you think that girl has a build in lie detector.</p>' +
						'<p>&quot;You are not joking.&quot;</p>' +
						'<p>You explain to her that things have been happening, going into some detail about Kurndorfs Ghost guiding you to new spells, Mr Beasley&rsquo;s rivalry with the Gates family and Davy starting to use his magic to try to attack you and your family. You assume Sir gates was in dire need of someone to carry on his work, but while he has been very supportive, you don&rsquo;t know much about what this work will entail, and you are not entirely sure why he has chosen a stranger over a relative like Sarah aside from his cryptic talk about seeing something special in you.</p>' +
						'<p>&quot;So... Davy is a... Warlock as well? Is that how he was suddenly able to make Kate and Tracy fall for him?&quot;</p>' +
						'<p>You nod.</p>' +
						'<p>&quot;Dear god... this explains why she had sent me those pictures... well, more pictures than usual.&quot; Leanne murmurs. &quot;Is this... something you can do as well?&quot;';
				} else if (isMurderPath(true)) {
					s = '&quot;Y...you were there when Sir Gates was murdered? And it was Davy?!?&quot;</p>' +
						'<p>Leanne&rsquo;s eyes fixate on you the way they always do when she is suspicious of you, sometimes you think that girl has a build in lie detector.</p>' +
						'<p>&quot;You are telling the truth... have you gone to the police?&quot;</p>' +
						'<p>You tell her about Davy\'s power and how he has started moving against you and even your family after you found the book. You were not sure who to trust, not to mention that the police would likely not believe your story about two people just appearing within the villa, shooting sir gates and vanishing, leaving you as the main suspect.</p>' +
						'<p>&quot;R..right.&quot; Leanne nods once in understanding. &quot;But if..Davy is a... warlock you called it, yes?&quot; You nod. &quot;Right... So he used magic to make Kate and Tracy fall for him, which explains a lot...&quot;</p>' +
						'<p>&quot;Is that something you can do as well?';
				} else if (isConspiracyPath()) {
					s = '<p>&quot;-The- Sarah Gates send you the book?&quot;</p>' +
						'<p>Leanne&rsquo;s eyes fixate on you the way they always do when she is suspicious of you, sometimes you think that girl has a build in lie detector.</p>' +
						'<p>&quot;Wow... she is a bit of a local celebrity, you don&rsquo;t really expect this sort of thing...&quot;</p>' +
						'<p>You explain Sarah&rsquo;s plot and how you got caught up in it. The meeting with Sir Gates and the offer that just seemed too good to be true, the later meeting with Sarah and her maid and her admission that she wants you to go out and learn spells without her uncle knowing to teach them to her.</p>' +
						'<p>You also tell her how it made you a target for Mr Beasley and Davy, a magic user himself, and of their attempts to take the book from you.</p>' +
						'<p>&quot;This is a lot to take in... but it explains how someone like Davy could make both Kate and Tracy fall for him... is that something you can do as well?&quot;';
				} else {
					s = '&quot;Leanne seems horrified as you tell her about the struggle with sir gates, the shot fired and how you took the book and ran.</p>' +
						'<p>&quot;' + perYou.getPersonName() + ' you... you killed someone... you killed someone and stole from him...!&quot;</p>' +
						'<p>You try to explain that it was an accident, that you only tried to get the gun before he could shoot you, but Leanne just shakes her head.</p>' +
						'<p>&quot;You have to go to the police! Maybe you can... I don&rsquo;t know...&quot;</p>' +
						'<p>You ask her if she wants you to go to jail, or worse, and she quickly shakes her head, her voice agitated and her hands twitching as she tries and clearly fails to come up with a solution. In the end, she breathes out a defeated sigh.</p>' +
						'<p>&quot;Don&rsquo;t you want to make this right...? For the mans family... for your conscience?&quot;</p>' +
						'<p>You tell her you are too deeply in this to go back now and tell her about Kurndorfs Ghost, Mr Beasley and Davy&rsquo;s hunt for the book as well as the many strange things that have been happening. You don&rsquo;t dare to give up the book, and frankly, you don&rsquo;t want to.</p>' +
						'<p>Leanne only gives a defeated sigh.</p>' +
						'<p>&quot;Okay... you said Davy has taken over Tracy&rsquo;s and Kate&rsquo;s mind with magic, which explains a lot... but is this something you can do as well?&quot;';
				}
				addQuestionR(md, 'tell her about the Book and how you got it', s,
					"Leanne",
					"influenceLeanne(" + (isMurderPath() ? 3 : 0) + ")",
					"type=askher&stage=second"
				);
				if (isMurderPath(false)) {
					addQuestionR(md, 'tell her about the Book, but lie about how you got it',
						'You make up a story about chasing the trail of the book to sir Gates and finding him dead in his room with a gunshot wound and the murderer nowhere to be found. He may have surprised a burglar, and you took the book to keep it from falling into the wrong hands.</p>' +
						'<p>Leanne&rsquo;s eyes fixate on you the way they always do when she is suspicious of you, sometimes you think that girl has a build in lie detector, and it may have gone off, you are not sure.</p>' +
						'<p>&quot;This is serious... have you gone to the police?&quot;</p>' +
						'<p>You tell her about Davies power and how he has started moving against you and even your family after you found the book. You suspect it was him who short sir Gates and were not sure who to trust, not to mention that the police would likely not believe your story about you just being there and finding him, leaving you as the main suspect.</p>' +
						'<p>&quot;R..right.&quot; Leanne nods once in understanding. &quot;But if..Davy is a... warlock you called it, yes?&quot; You nod. &quot;Right... At least I finally understand what happened with Kate and Tracy...&quot;</p>' +
						'<p>&quot;Is that something you can do as well?&quot;',
						"Leanne",
						"influenceLeanne(1)",
						"type=askher&stage=second"
					);
				}
				if (!this.checkFlag(26)) {
					addQuestionR(md, 'tell her about the Demon, but nothing about the book or the seance',
						'You tell her that a Demon called Legion made its way into this world and began taking the Souls of people around him, but carefully exclude your own involvement in its summoning as well as how you managed to get the relic and learn the ritual to free her.</p>' +
						'<p>Leanne listens closely, but doesn&rsquo;t look satisfied.</p>' +
						'<p>&quot;Okay, but how did you learn to Teleport? Or about that creepy room? Or knew what had happened to me at all?&quot;</p>' +
						'<p>&quot;I&rsquo;m very thankful for all you did, and I really don&rsquo;t mean to pry, but there are obviously things you are not telling me.&quot;',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',26)",
						"type=askher&stage="
					);
				}
				addQuestionR(md, 'refuse to tell her anything',
					'You make it clear that you are not obliged to tell her anything, your reasons and dealings are your own, and while Leanne seems startled, she will have to accept it.</p>' +
					'<p>Your refusal to clear things up leaves Leanne rattled and she is clearly on her guard now. She won&rsquo;t be very open to you, but depending on your plans for her that might not matter at all.',
					"Leanne",
					"influenceLeanne(5);setPersonFlag(\\'Leanne\\',16);setPersonFlag(\\'Leanne\\',17)",
					"type=askher&stage=refused"
				);
			} else if (stage == "second") {

				addQuestionR(md, 'no point in hiding it: Your answer is "Yes, and you like it"',
					'Each person charmed gave you power and influence in the city, and you would lie if you&rsquo;d claim you do not vastly enjoy having an entire harem of willing women and maybe even a few men at your disposal.</p>' +
					'<p>Leanne doesn&rsquo;t quite seem to share your enthusiasm though, and the more you speak, the more worried she seems to become.',
					"Leanne",
					"influenceLeanne(2)",
					"type=askher2"
				);
				addQuestionR(md, 'Yes, but you believe you are careful about who you charm',
					'You explain to Leanne that you mostly needed help against Davy, and those under your charm could not be taken by him and would help you gain power and deal with Kurndorf and Legion as well, but you have to admit that you have not been shy about enjoying the other benefits it provided, and Leanne seems to be worried by that admission.',
					"Leanne",
					"",
					"type=askher2"
				);
				addQuestionR(md, 'refuse to answer further questions',
					'You make it clear that you have no intent to answer any further questions, which is pretty much an admission of guild regarding the usage of the spell.</p>' +
					'<p>Leanne is clearly on her guard and won&rsquo;t be very open to you now, but depending on your plans for her that might not matter at all.',
					"Leanne",
					"influenceLeanne(5);setPersonFlag(\\'Leanne\\',16);setPersonFlag(\\'Leanne\\',17)",
					"type=askher&stage=refused"
				);
			} else if (stage == "refused") addLinkToPlace(md, "leave the house", 38);
			endAlternatives(md);

			WritePlaceFooter(md);
			return true;

		}

		if (sType == "askher2") {
			stage = getQueryParam("stage");
			nInf = this.getInfluenced();

			md = WritePlaceHeader();
			this.showPerson("homeusays.jpg");
			addPlaceTitle(md, "Talking to Leanne");

			md.write(
				'<p>"Okay..." After further explanations, Leanne takes a breather.</p>' +
				'<p>“To sum it up, you finally found the book you were searching for all this time, but Davy tried to take it from you and used a spell to charm people into doing his bidding."</p>' +
				'<p>“Then, you were taught this very spell by the ghost of Kurndorf, the powerful evil Warlock from our history books, and used it to fight back against Davy... and amuse yourself in the process."</p>' +
				'<p>You give Leanne a nod.</p>' +
				'<p>“You found the legendary witch from Kurndorfs story... Jessica, and in order to ' + (!this.hadSexYourself() ? 'free her' : 'learn the warlocks spells') + ', she helped you call his Ghost in a seance, but the Ghost summoned the demon, Legion... who proceeded to steal the souls of various people, including myself, threatened your family and blackmailed you into stealing an artifact from the Church, which you finally used to trick and banish it..."</p>' +
				'<p>Leanne rubs her temples, but again, your confirm the story.</p>' +
				'<p>“And finally, your french teacher, who is a 400 years old warrior-sexslave bound to a literal gate to hell right in our town..." Leanne\'s expression clearly underlines the ridiculousness of this statement, but she believes you." ...taught you how to free my soul, using a powerful relic you had to steal from the Museum."</p>'
			);

			startQuestions();
			if (stage === "") {
				addQuestionR(md, '"Quite the story, is it?"',
					'&quot;It is... and I&rsquo;m still not entirely sure what to think of it... or you...&quot;</p>' +
					'<p>She looks around nervously and finally back to you.</p>' +
					'<p>&quot;You have... tremendous power now... scary power. You have broken the law several times, but I appreciate that some of it was to help me, and you know yourself that what you do with these women is not right...&quot;</p>' +
					'<p>&quot;But what do you intent to do, now? What are your plans?&quot;',
					"Leanne",
					"",
					"type=askher2&stage=third"
				);
			} else if (stage == "third") {
				startAlternatives(md);
				addQuestionR(md, 'Jessica said you are destined to rule Glenvale, and you agree',
					'You remember Jessica&rsquo;s words all to well when she called you &quot;the one whose power will be even greater than hers&quot; and &quot;the true ' + perYou.getMaster() + ' of Glenvale.&quot; And she honestly is not the only one who seems to believe you are more than a simple warlock.</p>' +
					'<p>It is clear you are meant for greatness, and the book will give you the means to follow that destiny and take what- and whoever you desire, as long as you keep increasing your magical power.</p>' +
					'<p>As you finish speaking, Leanne seems terrified, and well, you may have gotten a little carried away by the moment as you explained the opportunities lying before you to her, but you certainly have the means to sway her to your side, if need be, so her next question is fitting:</p>' +
					'<p>&quot;Okay... and... what is my role in this going to be? Are you planning on using that spell on me as well?&quot;',
					"Leanne",
					"influenceLeanne(2)",
					"type=askher2&stage=forth"
				);
				addQuestionR(md, 'something is happening in this town, and you might need more power to protect it',
					'<p>Ghosts are returning from the dead, dangerous creatures wander the city outskirts, and you have seen enough episodes of Buffy the Vampire Slayer to know that having a gate to Hell open in your town is bad news.</p>' +
					'<p>You explain that it is clear something is happening, and with Glenvale&rsquo;s previous protector, Sir Gates, dead/too old to fight it, it may very well fall on you to face whatever comes. And to do so, you need Magic power, and maybe employ the help of people who would not cooperate under most circumstances.</p>' +
					'<p>Leanne seems unsettled by your statements, but listens carefully before finally speaking again.</p>' +
					'<p>&quot;It sounds like you want to fight demons by becoming one yourself, ' + perYou.getPersonName() + '...&quot;</p>' +
					'<p>You assure her that it is nothing like that, but reaffirm your belief that Glenvale does need someone ready to protect it from magical threats, and you feel like you can be that person, wielding magic is what you wanted to do all your life, after all.</p>' +
					'<p>Also, the &quot;benefits&quot; of the &quot;job&quot; have proven to be quite... pleasurable, though you keep that thought for yourself.</p>' +
					'<p>Leanne nods in understanding. &quot;Okay... one last question...&quot; She looks nervous. &quot;Are you planning to cast this charm on me as well?&quot;',
					"Leanne",
					"",
					"type=askher2&stage=forth"
				);
				addQuestionR(md, 'you actually just wanted to have fun with magic, but are not sure this is an option anymore',
					'You are honest in that you have no big plans. Using magic to walk through walls and teleport around just seemed like a lot of fun, making people fall in love with you after you found out it&rsquo;s possible even more so.</p>' +
					'<p>When things started to get serious you were just reacting, protecting your family from Davy and Legion, taking care of the things you&rsquo;ve unleashed and charming people because you either knew they would be able to help you or just to see how they react.</p>' +
					'<p>In a way, you are a little lucky you got as far as you did, but with all the talk about the hellgate and the &quot;destiny&quot; Jessica mentioned, it might be time to seriously think of the future and what you will do.</p>' +
					'<p>Leanne certainly agrees.</p>' +
					'<p>&quot;You will have to make a decision sooner or later about what you want to be and I pray to the lord that you will make the right one...&quot; She takes a deep, nervous breather.',
					"Leanne",
					"",
					"type=askher2&stage=forth"
				);
				addQuestionR(md, 'your plans are your own and don&rsquo;t concern anyone, not even her.',
					'It was a clear statement and while Leanne seems angry, she will have to accept, or so you think.</p>' +
					'<p>&quot;This concerns me very much, considering I nearly had my soul stolen by a Demon you accidentally helped summon on your quest for more magic and still get nightmares about what it did with my body...&quot; She takes a breather to calm herself.</p>' +
					'<p>&quot;Okay, one last question... that spell, are you planning to use it on me?',
					"Leanne",
					"influenceLeanne(1)",
					"type=askher2&stage=forth"
				);
				endAlternatives(md);
			} else if (stage == "forth") {
				startAlternatives(md);
				addQuestionR(md, '"Yes"',
					'Leanne seems devastated by your answer and is starring at you in disbelief. &quot;I can&rsquo;t believe you said that...&quot;</p>' +
					'<p>Did you just free me from that Demons control to do the same to me?&quot;</p>' +
					'<p>You calmly explain that it&rsquo;s not the same as you simply alter her mind and not take her soul, she will not even realize that she is under a spell, be protected from other Warlocks, free to live out her desires and no longer plagued by those nightmares... but those subtleties are lost on her.</p>' +
					'<p>&quot;' + perYou.getPersonName() + ', We&rsquo;ve been friends for so long, and you just told me to my face that you intent to cast a spell to control my mind... and for what? To make me yet another piece in your apparently steadily growing slave collection?&quot;',
					"Leanne",
					"influenceLeanne(2)",
					"type=askher3"
				);
				addQuestionR(md, '"Of course not!"',
					'You&rsquo;ve been friends with Leanne for a long time, and while dealing with her as a thrall and the books influence certainly have changed the way you look at her, you don&rsquo;t want her to go through the process of loosing her free will again.</p>' +
					'<p>Leanne seems a little suspicious, but as you looked into her eyes and repeated your promise, she calms down, even smiling again, albeit briefly.</p>' +
					'<p>&quot;Maybe you are still the ' + (perYou.isBornMale() ? 'Boy' : 'Girl') + ' I lo...liked, crazy mind control magic or not... I just wish you would extend that courtesy to others.&quot;',
					"Leanne",
					"setPersonFlag(\\'Leanne\\',18)",
					"type=askher3"
				);
				addQuestionR(md, 'you have considered it, it would keep her protected',
					'You explain to Leanne that you are worried about other warlocks and creatures taking her mind again. The spell would keep her protected from those and also help her shake off the memories of her possession, or any doubts she might have.</p>' +
					'<p>&quot;You may have the best intentions in mind.&quot; She says. &quot;Well... maybe... but I would forfeit my free will and be at the mercy of someone else, again. Someone who I&rsquo;m not sure I&rsquo;m able to fully trust anymore...&quot;',
					"Leanne",
					"influenceLeanne(1)",
					"type=askher3"
				);
				endAlternatives(md);
			}

			WritePlaceFooter(md);
			return true;

		}

		if (sType == "askher3") {
			this.setFlag(16);
			nInf = this.getInfluenced();

			md = WritePlaceHeader();
			this.showPerson(nInf > 4 ? "homeusays.jpg" : "homeumeet.jpg");
			addPlaceTitle(md, "Finishing Talking to Leanne");

			if (nInf === 0) {
				md.write(
					'<p>“Okay... this is still confusing... but I do think I am feeling a little better now.” Leanne seems to relax a bit after your talk, even letting her guard down somewhat. “I\'ve been lucky to have you and Daria look out for me, I think, I dare not imagine what might have happened had she not found and you not rescued me.” Leanne smiles to you.</p>' +
					'<p>“I was really loosing faith, but knowing I can rely on my friends, that even during this someone still does watch out for me... it feels good.”</p>' +
					'<p>You ask her if all is well between the two of you and her answer is “Mostly.”</p>' +
					'<p>“There is a probably a good reason you were given these powers, sometimes he works in mysterious ways, after all, but I still don\'t like the thought of you going around and using your magic to take advantage of people.”</p>' +
					'<p>You are about to reply, but Leanne interrupts you.</p>' +
					'<p>“Just think about it, alright?” She holds up one hand. “You can do so much more good with your powers like... teleporting me to work or helping me find missing keys.”</p>' +
					'<p>You two share a brief laughter and it feels good to see her returning a little to her bubbly self again, and who knows, maybe she does have a point and you should dial back on using the spell... sometime.</p>'
				);
			} else if (nInf < 5) {
				md.write(
					'<p>Leanne seems to be somewhat guarded around you, but it doesn\'t look like you left too bad of an impression for now.</p>' +
					'<p>“I think those were all the questions I had... and you certainly don\'t get yourself into messes halfheartedly, do you?”</p>' +
					'<p>“Apparently not.” You shake your head, and the two of you share a relaxing laugh before Leanne\'s face turns serious again.</p>'
				);
				if (!this.checkFlag(18)) md.write('<p>"' + perYou.getPersonName() + ', I can\'t stop you from using the spell on me, but remember what that would mean for us. You are still a good person, maybe you were given those powers for a reason, and I hope that you will, in the long run, make the decision to use your new gift the right way.</p>');
				else md.write('<p>I think you are still a good person, I trust your promise and maybe people are right and you were given your powers for a reason.”</p><p>“But I\'m sure deep down you know that what you do with these women is wrong, and I pray that you will do the right thing in the end.</p>');
			} else {
				md.write(
					'<p>Leanne apparently didn\'t like what she heard in the last minutes and she is clearly on her guard now.</p>' +
					'<p>“You have changed...” She finally says nervously. “I don\'t know if it is because of the book, the magic or because of what happened to you, but you are no longer the person I used to know and honestly... you scare me, ' + perYou.getPersonName() + '.</p>'
				);
				if (!this.checkFlag(19)) {
					startQuestions();
					startAlternatives(md);
					addQuestionR(md, '"So what?"',
						'&quot;Right... what did I expect...&quot; she shakes her head. &quot;Fine, if that is what our friendship is worth to you, go on, do what you think you have to, but remember, our sins will at one point come back to haunt us, if not now, then in the next life.&quot;',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',19)"
					);
					addQuestionR(md, 'assure her you are still the same',
						'&quot;Then act like it.&quot; She says firmly. &quot;If you truly want to prove you&rsquo;re still the friend I knew, you will stop abusing your magic to amuse yourself at others expense. If you can&rsquo;t do that, then you better do what you want to do with me and be done with it.&quot;',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',19)"
					);
					endAlternatives(md);
				}
			}

			startQuestions();
			addLinkToPlace(md, "leave the house", 38);
			WritePlaceFooter(md);
			return true;

		}
		if ((!this.isCharmedBy("Demon") && !this.checkFlag(13)) || sType == "firstvisit") {
			// First meeting after she arrived home
			setQueryParams('type=firstvisit');
			this.setFlag(13);
			md = WritePlaceHeader();
			this.showPerson("homeumeet.jpg");
			addPlaceTitle(md, "Leanne has Returned Home");

			md.write(
				'<p>You knock and the door to Leanne\'s house and she opens the door and wordlessly gestures for you to come in.</p>' +
				'<p>You can see she is troubled by what happened but also happy to be free.</p>' +
				'<p>"Thank you, thank you ' + perYou.getPersonName() + ' I do not understand everything of what happened or you had to go through, but I know you freed me.</p>' +
				'<p>It is so strange, I can remember what happened when that thing was controlling me, but it is like a dream, it was not like I was aware or out of control in some way, it is just like I can remember someone elses memories."</p>'
			);
			if (this.checkFlag(6)) {
				md.write(
					'<p>She hesitates, but continues,</p>' +
					'<p>"That thing did something wrong with my friend Daria...the Mother Superior at the Church...I do not know how to talk to her, she might think it was me...but she did seem to think I was possessed..."</p>'
				);
			}

			if (this.hadSexYourself()) {
				md.write(
					'<p>She looks at you with greatly embarrassed,</p>' +
					'<p>"While that thing was in my body, you..you..had sex with it! How could you!!"</p>' +
					'<p>You unconvincingly try to explain about how it was an attempt to find out more about the thrall possessing her, she does not seem to believe you and looks away embarrassed.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "leave the house", 38);

			WritePlaceFooter(md);
			return true;

		}

		if (sType == "pass") {
			// First meeting after she arrived home
			md = WritePlaceHeader();
			this.showPerson("homeusays.jpg");
			addPlaceTitle(md, "Using Pass to Enter Leanne\'s Home");

			md.write(
				'<p>You cast the spell and literally walk through the door into the house to find a startled Leanne starring at you.</p>' +
				'<p>“' + perYou.getPersonName() + ' What are you...” Her voice stocks as she realizes why you are likely here.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell her you just want to speak with her", 38, '', '&quot;I think we have spoken enough for now, please, give me some time to come to terms with what has been happening.&quotl Leanne still looks very anxious, and you breaking into her home did not make things better. You decide it is best to leave immediately');
			addLinkToPlace(md, "Excuse yourself and leave", 38, '', 'You apologize for startling her and just turn to leave the house, probably scarring Leanne half to death and not helping her to trust you again.');

			WritePlaceFooter(md);
			return true;

		}

		if (sType == "gone") {
			// First meeting after she arrived home
			md = WritePlaceHeader();
			this.setFlag(21);
			addPlaceTitle(md, "Leanne's Living Room", "livingroom6.jpg");

			md.write(
				'<p>You walk through the wall and look around, quickly noticing a few personal Items, photographs and clothes missing, and finally, you find her mobile phone, and a letter addressed to you.</p>' +
				'<p>The letter is written with a shaky hand and several parts seem to have been erased and rewritten, but you clearly recognize Leanne\'s handwriting</p>' +
				'<div style="background-image:url(UI/paper.jpg);text-align:left;padding:0 5px 0 5px;font-family: cursive;color:black">' +
				'<p>' + perYou.getPersonName() + ', I am sorry to let it end like this, but I can not just sit here, wait and pray that you will not decide to add me to your slave collection, so I have decided to leave Glenvale for good.</p>' +
				'<p>I will always remember the person who was my friend fondly, but your newfound power has changed you, and you are walking down a dark path I do not want to be part of.</p>' +
				'<p>You may think this is selfish after all you did to free me, but being under the demons control was one of the most horrible experiences in my life, and I can not risk it happening again.</p>' +
				'<p>I will pray every day that you will abandon this dark path, but for now, this is goodbye.</p>' +
				'<p>Leanne.</p>' +
				'<p>PS: I have told no one where I am going, I will do nothing to interfere with your plans, and if our friendship still means anything to you, you will not try to track me down.</p></div>'
			);
			startQuestions();
			addLinkToPlace(md, "leave the house", 38);
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "sexytime") {
			// Sexy times (Lover Charm)
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("homelsexyb.jpg");
			else this.showPersonRandom("homelsexyg", 2);
			addPlaceTitle(md, "Sexy Time with Leanne");

			md.write(
				'<p>You guide Leanne directly into the living room and in between tender hugs and passionate kisses, the two of you leave behind a trail of discarded clothes all the way to the couch you finally fall onto.</p>' +
				'<p>“I\'ve been so horny all day without you...” Leanne whispers as she straddles you, her fingers moving down to caress your ' + (perYou.isMaleSex() ? 'manhood' : 'folds') + '. “How can you be so cruel and leave me alone?” The two of you share a laugh before you pull your lover into another kiss and tell her the wait makes it all the more sweet when you are finally back together, making her laugh even more. “You are not going to sweet-talk your way out of this, ' + perYou.getPersonName() + '!” She says with a grin. “I expect you to make up for the wait.”</p>' +
				'<p>Of course, you “give in” to her demands. Her closeness is intoxicating and with her fingers constantly caressing your ' + (perYou.isMaleSex() ? 'shaft' : 'sex') + ', it doesn\'t take long for you to be ready to take her... or be taken by her, and Leanne eagerly guides ' + (perYou.isMaleSex() ? 'you' : 'your fingers') + ' into her waiting folds with a playful, over-exaggerated moan.</p><p>' +
				(perYou.isMaleSex() ? 'You just lean back to let her ride you, both arms wrapped tightly around her body to hold her close, fondle her breasts and caress her clit,' :
					                'You carefully move your fingers to find her sweet-spots, twisting them occasionally and covering her neck and cheeks in soft kisses') +
				'to drive her further and further forward until you draw her into a deep kiss right as you are ready to reach your peak.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "talk more to Leanne", 450);
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "takelead") {
			// Let her Take the Lead (Lover Charm)
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("homeltakeleada.jpg");
			else this.showPersonRandom("homelsexyg", 2);
			addPlaceTitle(md, "Leanne Takes The Lead");

			md.write(
				'<p>Leanne guides you to her bedroom, Kicks the door shut with one leg and pushes you onto the bed with a smile.</p>' +
				'<p>You follow her lead this time, curious what she has in store and watching as she slowly removes her clothes, flinging her top into a corner and deliberately bending forward to remove her pants and underwear, giving you a good view of her buttocks.</p>' +
				'<p>You applaud the show and Leanne bows with a deep flourish before crawling onto the bed herself and coming to rest on top of you, her lips brushing over yours briefly, before she almost tears of your top and commits to a deep kiss.</p>' +
				'<p>You return her affections, your tongues playfully mingling while you help her undress you as well and lay back with a soft sigh while her lips wander down to your exposed neck.</p>' +
				'<p>“I would have never even dreamed of doing this...” She whispers with a soft giggle. “We really have  a lot to catch up on, do we?”</p>'
			);
			if (perYou.isMaleSex()) {
				md.write(
					'<p>“We do.” A pleasant shudder rushes through your body as her lips touch your neck, and you close your eyes while Leanne begins to move deeper down to your chest and collarbone.</p>' +
					'<p>You feel her fingers exploring your body, massaging your chest and shoulders, tracing your bicep and sliding back down to the sides, Leanne\'s lips always close enough to your skin to allow you to feel her breath.</p>' +
					'<p>“You\'re good at this...” You whisper softly, and hear a giggle from her. “I\'ve played through this in my head many times, and I\'m going to savor it.”</p>' +
					'<p>She shifts her position to straddle you and focus her attention fully on your cock, her fingers tracing the sensitive veins to get you hard, not that it took much by now, and finally guiding it to her folds.</p>' +
					'<p>You hear a moan as you enter her, her hip pushing down, rolling a little as she gets used to the sensation before she begins to ride you, slowly moving her body up and down but quickly growing faster and more passionate the closer the two of you get to your climax.</p>'
				);
			} else {
				md.write(
					'<p>You simply nod, and feel her fingers driving over your stomach in-between your legs. “Then let us not waste time.” She presses another kiss to your lips and feel her fingers pushing past your folds, a muffled moan vibrating into the kiss while she explores your sex, carefully at first, but soon growing bolder, relishing every single moan or gasp she lures from your lips while your body twitches with every wave of pleasure she sends into you.</p>' +
					'<p>“You practiced...” You say in-between gasps, and Leanne laughs. “Just for you, and there\'s more.” You try to answer but your speech is cut short as she finds a particular sensitive spot and uses her free hand to stimulate your clit, making you feel like a jolt of electricity rushed through you.</p>' +
					'<p>“Leanne...” You manage to bring out, but she seems too eager to push you to the edge now to slow down, her motion growing faster, rougher, driving you further and further forward until you finally reach your orgasm , your lover beaming with pride.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to Leanne", 450);
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "slavepussy") {
			// Present your pussy (Slave Charm)
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonXBG("homesslavepussy.jpg");
			else this.showPerson("homeltakeleada.jpg");
			addPlaceTitle(md, "Leanne Takes The Lead");

			md.write(
				'<p>Leanne follows your order with enthusiasm, even wiggling her ass playfully into your direction, keeping her legs spread and playing with her pussy until you order her to stop.</p>' +
				'<p>“Look how wet you already are, my little slut.” You drive your fingers over her glistering folds and watch as her entire body shudders blissfully.</p>' +
				'<p>“This pussy is always wet for you, ' + perYou.getMaster() + '.” She breathes out the words, and you chuckle to yourself thinking back to how even simple lewdities would turn her head into a shining tomato.</p>' +
				'<p>“And what do you want me to do with it?” You ask, and Leanne doesn\'t even hesitate anymore before she blurts out the answer.</p>' +
				'<p>“I want you to fuck it, ' + perYou.getMaster() + '!” She seems ready to burst from excitement. ”' + (perYou.isMaleSex() ? 'Please stick your cock into my pussy and fuck me!' : 'Please use this to fuck me!') + '”</p>'
			);
			if (perYou.isMaleSex()) {
				md.write(
					'<p>You grin and unzip your pants to free your cock and begin to rub the tip against her sex. “Tell me again what you are...” You place a slap onto her rear and she gives a cute yelp.</p>' +
					'<p>“I am ' + perYou.getPersonName() + '\'s obedient little slaveslut.” She almost shouts into the room, grinding her hip back against you “I love to serve him, and I love it when he rewards my slutty pussy with his cock.”</p>' +
					'<p>“That\'s right.” You grin. “And never forget that, my little slut.” You push your hip forward and drive your cock into her  using one hand to push her roughly against the couch and finally fuck her.</p>'
				);
			} else {
				md.write(
					'<p>She hands you a dildo of surprising size and you are still kind of amazed the always so restrained Leanne even has something like this.“Tell me again what you are...” You place a slap onto her rear and she gives a cute yelp.</p>' +
					'<p>“I am ' + perYou.getPersonName() + '\'s obedient little slaveslut.” She almost shouts into the room, wiggling her hip to entice you into giving her another slap. “I love to serve her, and I love it when she rewards my slutty pussy.”</p>' +
					'<p>“That\'s right.” You grin. “And never forget that, my little slut.” You pin her head onto the ground with one hand and push the dildo deeply into her wet pussy, twisting it around and slowly starting to drive it in and out of her.</p>'
				);
			}
			md.write(
				'<p>Whatever answer she had is barely eligible, swallowed up in a stream of moans, screams and lewd profanity as she repeats that she is yours over and over again and you sate your desire on her body. When you finally reach your peak, you once again focus on the mana within her body to sync your  orgasms and Leanne happily collapses onto the couch, a blissful smile on her lips.</p>' +
				'<p>"Thank you ' + perYou.getMaster() + '. I love you..."</p>'
			);
			startQuestions();
			addLinkToPlace(md, "talk more to Leanne", 450);
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "oralservice") {
			// Oral Service (Slave Charm)
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("homesoralservice", perYou.isMaleSex() && isExplicit() ? 2 : 1);
			addPlaceTitle(md, "Leanne\s Oral Service");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“With pleasure, ' + perYou.getMaster() + '!” Leanne slips off the couch and seductively crawls towards you on all fours while you just move both hands to your back and wait for her to work.</p>' +
					'<p>“I trust your are nice and wet, my little slut?” You ask as she opens your pants, and she just smiles up to you. “I am always wet when I think about you, Master, and I always think about you.” She laughs and pulls down your pants, her eyes focusing on your half erect cock and her tongue sliding over her upper lip.</p>' +
					'<p>“Good little slut. How would you like to be allowed to finger yourself while you suck my cock?” You gently caress her cheek and slip your thumb past Leanne\'s lips. “It would make your slut very happy, ' + perYou.getMaster() + '.”</p>' +
					'<p>“Then begin, and do not slack off if you want to be allowed to masturbate for the rest of the week.”</p>' +
					'<p>“Yes ' + perYou.getMaster() + '!” Leanne doesn\'t seem phased in the slightest by your little threat, and to be honest, it is an empty one, since she will always fully focus on pleasing you, no matter what. But you enjoy these little exchanges with her and she seems to have taken a liking to them as well.</p>' +
					'<p>As she has to your cock.</p>' +
					'<p>Leanne isn\'t the most skilled or experienced of your slaves, especially when it comes to anything outside of vanilla sex, but she is a fast learner and you are clearly reaping the benefits of it right now.</p>' +
					'<p>Her tongue slides over the thick veins on your cock and circles around the tip before she takes you into her mouth and begins to slowly move back and forth, one hand always between her legs, rubbing her clit feverishly while you slowly raise her arousal with your spell.</p>' +
					'<p>\It doesn\'t take long for you to reach your climax, Leanne always has that effect on you when you are around her, and without warning you take a hold of her hair to keep her head in place as you come into her mouth and make her swallow your seed.</p>'
				);
			} else {
				md.write(
					'<p>“With pleasure, Mistress!” Leanne slips off the couch and seductively crawls towards you on all fours while you just move both hands to your back and wait for her to work.</p>' +
					'<p>“I trust your are nice and wet, my little slut?” You ask as she opens your pants, and she just smiles up to you. “I am always wet when I think about you, Mistress, and I always think about you.” She laughs and pulls down your pants, her eyes focusing on your pussy and her tongue sliding over her upper lip.</p>' +
					'<p>“Good little slut. How would you like to be allowed to finger yourself while you lick me?” You gently caress her cheek and slip your thumb past Leanne\'s lips. “It would make your slut very happy, Mistress.”</p>' +
					'<p>“Then begin, and do not slack off if you want to be allowed to masturbate for the rest of the week.”</p>' +
					'<p>“Yes Mistress!” Leanne doesn\'t seem phased in the slightest by your little threat, and to be honest, it is an empty one, since she will always fully focus on pleasing you, no matter what. But you enjoy these little exchanges with her and she seems to have taken a liking to them as well.</p>' +
					'<p>As she has to your pussy.</p>' +
					'<p>Leanne isn\'t the most skilled or experienced of your slaves, especially when it comes to anything outside of vanilla sex, but she is a fast learner and you are clearly reaping the benefits of it right now.</p>' +
					'<p>Her tongue slides over the lips of your pussy before she starts to focus on your clit, one hand always between her legs, rubbing her clit feverishly while you slowly raise her arousal with your spell.</p>' +
					'<p>\It doesn\'t take long for you to reach your climax, Leanne always has that effect on you when you are around her, and without warning you take a hold of her hair to keep her head in place as you orgasm.</p>'
				);	
			}
			startQuestions();
			addLinkToPlace(md, "talk more to Leanne", 450);
			WritePlaceFooter(md);
			return true;

		}
		return false;
	};

	per.showPersonChat = function(md)
	{
		if (Place == 195 && this.isHere() && sType === "") {
			if (this.place == 195) {
				// Restricted to before the demon events
				if (!this.checkFlag(22)) {
					addQuestionR(md, 'say Hello to Leanne',
						'"Hello ' + perYou.getPersonName() + '” Leanne smiles to you from behind the counter. “Taking some time of from studying to visit or are you looking to buy anything?”',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',22)"
					);
				} else if (!this.checkFlag(23)) {
					addQuestionR(md, 'you may need a few things, but mostly you just want to know how she\'s doing',
						'“Well, feel free to browse.” Leanne smiles brightly.</p>' +
						'<p>“I\'m stressed, but fine. Just making sure the inventory is all set up for next week and recovering from the last date Tracy organized.” ',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',23)"
					);
				} else if (!this.checkFlag(24)) {
					addQuestionR(md, '"A Date? Anything serious?"',
						'“No, he was not bad, but it just didn\'t click between us, so I\'m still waiting for the Mister right.” Leanne sighs briefly, then grins and leans forward over the counter, "How about you? Any cute girls in your life that I could get jealous over? Tracy is dropping hints, but she has been occupied of late.”' +
						(perYou.isMaleSex() ? '<p>You chuckle when you hear that, Leanne occasionally jokes  about other girls stealing you from her, but you know it\'s all in good fun.</p>' :
															'<p>You can\'t help but smile hearing that question. Leanne is very religious, and you had feared that it would drive a wedge between the two of you when you came out to her about your sexuality, but not only was she very supportive, it seems to have only brought the two of you closer together.'),
						"Leanne",
						"setPersonFlag(\\'Leanne\\',24)"
					);
				} else if (!this.checkFlag(25)) {
					var nSlaves = 0;
					for (i = 0; i < arPeople.length - 3; i++) {
						var p = arPeople[i];
						if (p.isCharmedBy()) nSlaves++;
					}
					addQuestionR(md, '"There is no one  special right now"',
					(nSlaves === 0 ? '<p>You explain that you have barely any time to focus on passing school, and with Ms. Tanika and Mr. Beasley being especially hard on you, you can\'t really afford to get caught up in dating or a relationship, no matter how much Tracy tries to hook you up.</p>' :
													 '<p>Of course, you can\'t just tell her about the book and what you are doing, at least not yet, so you make something up about a few casual flings, but claim that nothing is serious, which is not completely far from the truth.</p>') +
						'<p>“Well, we are at least in the same boat, I guess.” She looks like she is pondering something for a few seconds, but disregards the thought.</p>' +
						'<p>“Oh, I\'ve finally pushed myself to go over the crates in the back my parents had collected before they... you know...”</p>' +
						'<p>“Anyway, I intent to put some of it on the shelves, most of it is likely not of interest to you, like the 4 dozen different paperweights, but maybe there is something you like later on.”',
						"Leanne",
						"setPersonFlag(\\'Leanne\\',25)"
					);
				}
			} else if (this.isCharmedBy() && sType === "") addLinkToPlace(md, (this.isLover() ? 'ask' : 'tell') + ' your ' + (this.isLover() ? 'lover' : 'slave') + ' Leanne "Let\'s take a <b>play</b> break"', 195, 'type=leannebreak');

		}
		else if ((Place == 382 || Place == 384) && this.isHere() && sType !== "takeleanne2"  && sType !== "takeleanne") {
			// Is the thrall here
			var perMS = findPerson("Daria");
			var nPossession = isPossess() && perMS.checkFlag(6) ? 2 : (isPossess() ? 1 : 0);
			if (nPossession == 2) return;
			perYou.startQuest(5);		// Fallback in case you did not meet her in the Graveyard
			if (isPossess()) addLinkToPlace(md, 'take the thrall', Place, 'type=takeleanne');
			if (this.checkFlag(6) && !isPlaceKnown("MotherSuperiorsSecretRoom") && !isSpellKnown("Clairvoyance")) addQuestionC(md, '"Do you know where the relic is"', "Leanne", -100);
			if (isKnowRitualReturn() && !isPossess()) {
				if (nMana > 0 && isPlaceAttuned(53) && perYou.checkFlag(21) && whereItem(35) == -53 && !isPossess()) addLinkToPlace(md, 'teleport with the thrall to the Hidden Room', 53, 'type=teleportthrall');
				else addTextForQuestions(md, 'You know the ritual to save Leanne but not everything is ready for it');
			}
		}
		else if (Place == 450 && this.isHere() && sType === "") {
			if (this.isCharmedBy("Demon")) {		// Thrall Leanne is here
				if (isDemonGone() || this.checkFlag(28)) {
					addLinkToPlace(md, "fuck your thrall", Place, 'type=fuckthrallleanne');
				} else {
					addPopupLink(md, "enough trying to save her, tell the thrall \"I am your " + perYou.getMaster() + '"', "Giving up and Accept the Rewards",
						this.addPersonString("hometmeet.jpg", "height:max%", "right") +
						'You have had enough trying, why go through these lengths, Leanne is here and willing to obey me. What is so different to using the Charm spell after all.<p>' +
						'<p>Well you know the difference, but you will ignore that nagging thought. You command the thrall,</p>' +
						'<p>"I am your ' + perYou.getMaster() + ', to obey in all things!" She looks at you with her blank eyes and starts to remove her clothes and says,</p>' +
						'<p>"Yes ' + perYou.getMaster() + '"',
						true, "setPersonFlag('Leanne',28);dispPlace();"
					);
				}
				return;
			}

			var bRecovered = this.isRecovered();
			
			if (bRecovered && this.checkFlag(20) && !this.checkFlag(29) && this.getInfluenced() < 5) {
				this.addQuestionRF(md, 29, 'talk about the store',
					'You ask about the store and Leanne says,</p>' +
					'<p>"Louise has been handling the store fine, ' +
					(this.getCharmedLevel() != 4 ? 'but I think I will return to working there in the afternoons.' : 'may I return to working there in the afternoons?') +
					'"</p><p>You agree this is a good idea' +
					(isShopOpen(2, 1, true) && !isMorning(1, 2) ? ' and as the store is open now Leanne says she will go in to check on things now and you follow her out of the house and wave goodbye' : ''),
					"setPersonFlag(\\'Louise\\',11)" + (isShopOpen(2, 1, true) && !isMorning(1, 2) ? 'dispPlace(38)' : '')
				);
			}
			switch(this.getCharmedLevel()) {
				// Free/uncharmed
				case 0:
					if (bRecovered && !this.checkFlag(16)) addLinkToPlace(md, "ask how she is holding up", 450, 'type=askher');
					addQuestionRO(md, 'pass some time chatting',
						(bRecovered ? 'Leanne offers you a drink and the two of you spend some time talking about various topics, like the ' + getShopStore() + ', school or recent developments. You tend to avoid bringing up anything regarding your harem, but she is occasionally a little curious about your sexual adventures, too.</p>' 
						            : 'Leanne offers you a drink and the two of you spend some time talking about various topics, like the ' + getShopStore() + ', school or recent developments. You both avoid anything relating to magic, demons or touchy things like that.</p>') +
						'<p>In the end, an hour has quickly passed.',
						"Leanne",
						"WaitHere(12)"
					);
					this.addSleepLink(md, "spend the night at Leanne\s house", "",
						"<p style='position:absolute;top:62%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Sleeping At Leanne\'s Home</b></p>" +
						'<p style="position:absolute;left:2%;top:65%;cursor:pointer;font-size:1.1em;width:50%">' +
						'It had gotten late and Leanne offers you to spend the night in the guest room, and it\'s an offer you gladly take.<br><br>' +
						'You find the night mostly quiet, but it still takes you a while to fall asleep and you suddenly hear strange noises from inside the house.<br><br>' +
						'As you investigate, you catch a glimpse through Leanne\'s bedroom door and to your surprise, not only find it open but Leanne herself laying on top of her sheets and masturbating furiously with what seems to be no small amount of frustration about something.<br><br>' +
						'You contemplate going in, but decide that for now, it might be better to wait for her to approach you, if she even wants to, and quietly head back to bed before you are spotted.',
						"bed1.jpg"
					);
					break;

				// Lover Charm
				case 1:
					addLinkToPlace(md, "spend some sexy time with your lover", 450, 'type=sexytime');
					addLinkToPlace(md, "let her take the lead", 450, 'type=takelead');
					this.addSleepLink(md, "spend the night with Leanne", "",
						"<p style='position:absolute;top:62%;left:50%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Leanne</b></p>" +
						'<p style="position:absolute;left:50%;top:65%;cursor:pointer;font-size:1.1em;width:45%">The hour grows late, and you gladly accept Leanne\'s offer to spend the night in her bed while she nestles her body against yours with a sweet smile.',
						"bed2.jpg"
					);
					break;

				// Slave Charm
				case 4:
					addLinkToPlace(md, "order her to turn around and present her pussy to you.", 450, 'type=slavepussy');
					addLinkToPlace(md, "order her to get on her knees and service you with her mouth", 450, 'type=oralservice');
					this.addSleepLink(md, "spend the night with Leanne", "",
						"<p style='position:absolute;top:62%;left:50%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Leanne</b></p>" +
						'<p style="position:absolute;left:50%;top:65%;cursor:pointer;font-size:1.1em;width:45%">Leanne prepares the bed for the two of you and completely undresses before she slips in besides you, and the two of you spend the night in each others arms. ',
						"bed2.jpg"
					);
					break;
			}
		}
		else if (Place == 325 && this.isHere() && sType === "") {
			if (this.isCharmedBy("Demon")) addLinkToPlace(md, "take the thrall", Place, 'type=thrallfuck');
			else if (!this.checkFlag(4)) addLinkToPlaceC(md, "talk to Leanne", Place, 'type=leannetalk');
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 325 && this.isHere() && sType === "") {
			if (this.isCharmedBy("Demon")) return this.showPerson(!this.checkFlag(3) ? "graveyardta.jpg" : "graveyardtb.jpg", '', '', '', '', false, "string");
			if (!this.checkFlag(2)) return this.showPerson("graveyardua.jpg", '', '', '', '', false, "string");
		}
		else if (Place == 195 && this.isHere() && sType === "") {
			var wid = wherePersonNC("Louise") == 195 && wherePersonNC("Anita") == 195 ? "50%" : "";
			if (this.place == 195) return this.showPersonRandom("shop1", 2, wid, '', '', '', 0, false, "string");
			if (this.isCharmedBy()) return this.showPersonRandom("shop2c", 2, wid, '', '', '', 0, false, "string");
			return this.showPerson("shop2u.jpg", wid, '', '', '', false, "string");
		}

		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		if (Place == 325 && this.isHere() && sType === "") return true;
		return (Place == 382 || Place == 384) && this.isHere() && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		SetRightColumnSize("large");
		if (Place == 325) {
			// Graveyard
			if (this.isCharmedBy("Demon")) this.showPerson("graveyardtb.jpg");
			else this.showPerson("graveyardub.jpg");
		} else this.showPerson("msroom.jpg");
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the Pass Spell
		if (no == 11 && cmd == 2) {
				if (Place == 38 && this.getInfluenced() > 4 && this.checkFlag(16)) {
					CastPassSpell(450, this.place == 9999 && !this.checkFlag(21) ? 'type=gone' : 'type=pass');
					return "nofooter";
				}
		}
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At Leannes Home
			if (Place == 450) {
				if (this.isCharmedBy("Demon")) addComments("The spell fails, the thrall it seems cannot be affected by this spell, she is sort of charmed after all");
				else {
					findPerson("Daria");
					var tm = nTime - per.extra[0];
					if (tm < 288) addComments('You try to cast the spell, but it fails, and you smell a strong odour of brimstone. It seems she is still affected by some residue of the demon. Maybe if you try later?');
					else if (tm < 576) addComments('You try to cast the spell, but it fails, and you smell a faint odour of brimstone. It seems she is still a little affected by some residue of the demon. Maybe if you try later?');
					else if (this.checkFlag(16)) {
						if (this.getInfluenced() < 5 && this.checkFlag(18)) addComments('You entertain the idea of going back on your promise and charm her anyways for maybe a second before you decide against it.</p><p>You clearly gave your best friend your word, and you will stick by it.');
						else CastCharmSpell("Leanne", 450, 1, "type=charm1");		//Charm Leanne
					} else return "";
				}
				return "handled";		// Ignore any standard action otherwise
			}
			// At the Store
			else if (Place == 195 && this.isHere() && sType === "") {
				//Normal - still your friend
				this.setFlag(31);		// Tried tp charm her
				if (!isSpellKnown("Shielded Charm")) addComments('Leanne has been a good friend almost all your life, perhaps friendship should count for something. Even if it doesn\'t, the ' + getShopStore() + ' is too public, with people entering and leaving periodically.');
				else addComments('Leanne has been a good friend almost all your life, perhaps friendship should count for something? Well, it appears not, and you cast the spell with a slight twinge. To your annoyance or is it relief, nothing happens as the spell has absolutely no effect.');
				return "refresh";		// Ignore any standard action otherwise
			}
			// At the graveuard
			else if (Place == 325 && this.isHere()) {
				//Normal - still your friend
				this.setFlag(31);		// Tried to charm her
				if (!this.isCharmedBy("Demon")) addComments('Leanne has been a good friend almost all your life, perhaps friendship should count for something? Well, it appears not, and you cast the spell with a slight twinge. To your annoyance or is it relief, nothing happens as the spell has absolutely no effect.');
				else addComments('Leanne has been a good friend almost all your life, perhaps friendship should count for something? Well...she has been enthralled by the demon, so maybe you can help... To your annoyance or is it relief, nothing happens as the spell has no effect, is it she has no will, or dreadfully no soul?');
				return "handled";		// Ignore any standard action otherwise
			}
			// Hidden Room
			else if (Place == 53) {
				if (this.isHere() || (sType == "teleportthrall" || sType == "vampabduct")) {
					addComments('You attempt to cast the spell, but it seems there is something residual of the demon about her and it fails.');
					return "handled";
				}
			}
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {
			if (this.place != 195 && !this.isRecovered() && !this.isCharmedBy("Demon") && this.isHere()) {
				var perMS = findPersonNC("Daria");
				if ((nTime - perMS.extra[0]) < 575) {
					addComments('You sense there is something residual of the demon about her and it will probably be with her for ' + Math.ceil((575 - (nTime - perMS.extra[0])) / 12) + ' more hours');
					return "handled";
				}
			}
		}
		return "";		// do nothing
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() || this.isCharmedBy("Demon") ? "endgame1leanne" : "";
	};

	// Phone calls
	per.isKnowPhoneNumber = function() { return true; };
	
	this.isPhoneable = function(msg) { 	// Can you call them?
		if (this.isCharmedBy("Demon") || this.place == 9999) return false;
		if (!this.isCharmedBy()) {
			if (this.getInfluenced() > 4) return false;
			if (this.checkFlag(17)) return false;
			if (!this.checkFlag(16) && this.hadSexYourself()) return false;
		}
		if (msg) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		if (!this.isCharmedBy()) return false;
		return isAtLocation(282) && perJade.isDanceAvailable();				// Strip club
	};
	
	// Preferably replace/override this to customise the text for the calls
	this.callThem = function() {								// Phone them
		if (Place == 269) {
			if (this.whereNow() == 195) WriteComments("You go to call Leanne to invite her to join you at the pool for a swim, but you realise she is working at the shop and will not be able to get free.");
			else {
				gotoPlace(Place, 'type=' + this.uid + 'pool');
				clv = this.getCharmedLevel();
				if (clv == 0) receiveCall('','You call ' + this.getPersonName() + ' and invite them to join you at the pool, and ' + this.getHeShe() + ' agrees.'); 
				else if (clv == 4) receiveCall('','You call your slave Leanne and tell her to join you at the pool, and just replies "Yes ' + perYou.getMaster() + '".');
				else receiveCall('','You call Leanne and ask her to join you at the pool, and she of course agrees.'); 
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	
	per.addPersonPhoneCall = function() {
		if (this.hoursCharmed() > (24 + Math.random() * 4) && this.isCharmedBy() && !this.checkFlag(14)) {
			// SMS 1, 24+ hours after being charmed
			if (this.makeCall(true, 170)) {
				this.setFlag(14);
				setPersonFlagAfterTime("Leanne", 15, undefined, 6 + Math.floor(Math.random() * 6));
			}
		} else if (this.checkFlag(15)) {
			// SMS 1, 30mins to 1hr after above
			if (this.makeCall(true, 171)) this.setFlag(15, false);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 170) {
			// SMS 1 part 1
			return receiveSMS('Tracy', 'Hey lil ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ', Leanne just send me this beauty and I believe it was meant for you. ;)', 'leannesms1.jpg') +
				replyToSMS('Uhm, Thanks. ') +
				receiveSMS('Tracy', 'Anytime. :D Btw. Are you two finally an Item?? I\'ll win 30 bucks if you are.');
		}
		if (id == 171) {
			// SMS 1 part 2
			return receiveSMS('Leanne', 'This is so embarrassing! I hope Tracy really deletes that picture...') +
				replyToSMS('Knowing her she has it set as her wallpaper by now. ;)') +
				receiveSMS('Leanne', 'You\'re not helping! But I do have a little apology for my mistake ready. Plz enjoy. :)', 'leannesms2.jpg');
		}
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return true; };

}