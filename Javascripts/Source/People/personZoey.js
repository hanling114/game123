/****************************************************************
		Zoey
****************************************************************/

// Initialise
function initialiseZoey()
{
	// Zoey
	addPerson("Zoey", 0, "Zoey", "");
	
	per.getPersonAddress = function(n) { return isPlaceKnown("ZoeysApartment") ? n ? 466 : 'Apartment 28, 42 Celeste Rd' : n ? 0 : ''; };	
	
	per.getPossessionFace = function() {
		if (this.dress === "") return "Zoe/zoey-faceu";
		return 'zoey-face' + (this.isCharmedBy() ? 'c' : 'u');
	};	
	
	per.getSuffix = function() {
		return (this.checkFlag(1) ? "-be" : "");
	};		

	per.whereNow = function() {
		if (Place == 414 || (Place == 412 && sType == "zoey") || sType == "callzoey" || sType.indexOf("callmadisonzoey") != -1) return Place;
		return isShopOpen() ? this.place : 466;
	};
	
	per.whereNowName = function() {
		if (Place == 269 && sType.indexOf(p.uid + "pool") != -1) return "here at the pool with you";
		if (this.isHere()) return "here with you!";
		if (this.whereNow() == 0) return "out doing deliveries";
		return this.whereNowNameBase();
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 466 && this.isHere() && sType === "") return this.showPerson("home1" + this.getSuffix() + ".jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.getModels = function() {
		return "Zoe|Zoe Smieszek,Riley|Riley Reid";
	};

	per.showEvent = function()
	{
		var md, perMadison;
		
		if (Place == 269) {
			if (sType == "zoeypool") {
				md = WritePlaceHeader();
				this.showPerson("pool" + this.getSuffix() + ".jpg");
				addPlaceTitle(md, "Pool-Girl Zoey");
				md.write(
					'<p>Zoey arrives and quickly changes into her cute yellow bikini and poses for you near one of the windows of the pool area.</p>' +
					'<p>You have a fun time relaxing and playing with your delivery-girl!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=zoeypoolsex');
				addLinkToPlaceC(md, 'say goodbye to Zoey', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "zoeypoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex" + this.getSuffix() + ".jpg");
				addPlaceTitle(md, "Being Discrete and Private with Zoey");
				md.write(
					'<p>You ask your delivery girl to play with you more privately, and she seductively removes most of her bikini, ready for you!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Zoey', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 465 || Place == 466) {
			if (sType == "callmadisonzoey") {
				// Madison/Zoey threesome in the apartment - start
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");
				this.showPeople(perMadison, "madisonzoey1.jpg");
				addPlaceTitle(md, "Madison and Zoey");
				if (Place == 465) {
					md.write(
						'<p>Zoey must have been in her apartment, it takes only a few minutes before she rings the doorbell and you let her in, much to Madison\'s delight. She pulls Zoey into the bedroom, throws her on the bed before the other woman had any chance to say something and quickly removes her clothes.</p>'
					);
				} else {
					md.write(
						'<p>Madison must have been in her apartment, it takes only a few minutes before she rings the doorbell and you let her in, much to Zoey\'s delight. She invites Madison into the bedroom, who immediate throws Zoey on the bed before she had any chance to say something and quickly removes her clothes.</p>'
					);
				}
				md.write(
					'<p>Zoey on her end, seems taken aback by her coworkers enthusiasm. An attempt to speak is muffled by a sudden kiss, and she soon finds herself pinned naked under Madison\'s body, who makes sure to spread her legs and expectantly looks to you over her shoulder.</p>' +
					'<p>“We are ready, ' + perYou.getMaster() + '!”</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'have both girls tend to you', Place, 'type=callmadisonzoeytend');
				addLinkToPlace(md, 'let your delivery girls put on a show', Place, 'type=callmadisonzoeyshow');
				if (Place == 465) addLinkToPlace(md, 'say goodbye to Zoey', Place, '', 'Zoey happily leaves, suggesting you can always call for another "delivery"');
				else addLinkToPlace(md, 'say goodbye to Madison', Place, '', 'Madison happily leaves, suggesting you can always call for another "delivery"');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "callmadisonzoeytend") {
				// Madison/Zoey threesome in the apartment - tend
				perMadison = findPerson("Madison");
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPeopleRorX(perMadison, "madisonzoey2.jpg");
				else this.showPeopleRorX(perMadison, "madisonzoey4.jpg");
				addPlaceTitle(md, "Madison and Zoey Tending to You");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You have used the time to undress as well and, having moved to the edge of the bed, beckon the two delivery girls towards your half erect manhood.</p>' +
						'<p>Madison is the first to reach out for it, tracing her tongue around the tip while Zoey wordlessly follows her lead and affectionately licks the base and fondles your ballsack.</p>' +
						'<p>Your manhood hardens quickly under their combined care and you enjoy the sensation of their soft lips squeezing your shaft amidst them and their tongues tracing every sensitive vein. You gasp as your manhood reaches its full length, and as your own arousal grows, so does theirs.</p>' +
						'<p>Soon, soft moans and the scent of sex fill the room, and you have one hand on each of the girls heads as they swap your cock between each other, taking you inside for several strokes and passing you on while the other kisses another part of your body.</p>' +
						'<p>When your climax finally rushes through your body you make sure to spray your load onto both of them, watching in delight as Madison shares it with her spellbound coworker in a deep, sensual kiss.</p>'
					);
				} else {
					md.write(
						'<p>You crawl onto the bed and both of your girls eagerly pull you into their embrace, trading sensual kisses with you and tenderly caressing your skin, their soft lips slowly exploring every inch of your body.</p>' +
						'<p>You allow yourself to fall back into their mutual embrace and let your spellbound slaves tend to your needs. Both of them are wonderfully experienced, but Madison is, as expected, the more active of the two, often guiding and commanding Zoey around, who dutifully and eagerly follows her lead.</p>' +
						'<p>You on occasion have to remind the little minx that Zoey is your pet, and not hers, and she will sheepishly tone it down before getting swept away by her passion again.</p>' +
						'<p>And it is easy to get swept away...</p>' +
						'<p>The smell of sex intensifies as the minutes pass. Eager lips touch your neck as gentle fingers caress your folds and clit, and you find yourself trading passionate affections with both girls while your tongue tastes their folds and lips, your nose takes in their scent and your lips release lewd moans whenever the blissful rush of another climax ravages your body anew.</p>' +
						'<p>In the end, the three of you come to rest on the bed, both girls resting next to you, bodies pressed against yours and their spellbound, eager eyes lingering on yours, hoping to go for just one more round.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison and Zoey', Place, 'type=callmadisonzoey');
				WritePlaceFooter(md);
				return true;					
			}	
			if (sType == "callmadisonzoeyshow") {
				// Madison/Zoey threesome in the apartment - show
				perMadison = findPerson("Madison");
				md = WritePlaceHeader();
				this.showPeopleRorX(perMadison, "madisonzoey3.jpg");
				addPlaceTitle(md, "Madison and Zoey Giving You a Show");
				md.write(
					'<p>“' + perYou.getMaster() + ' wants us to put on a show, Maddy.” Zoey turns her attention back to her coworker, who replies with a devilish grin.</p>' +
					'<p>“Then let\'s not keep ' + perYou.getHimHer() + ' waiting...”</p>' +
					'<p>Madison\'s fingers intertwine with Zoey\'s as she pushes the girls arms to the bed and the two share a deep kiss, long and passionate this time, drawing out every second into a sensual dance as their tongues playfully mingle and you watch their nubile bodies pressed against each other.</p>' +
					'<p>Madison clearly takes charge, her knee parting Zoey\'s thighs to expose her folds, and the other girls head rolls back with a soft gasp as her lips begin to wander down and place soft kisses on her neck and collarbones, sucking in her nipples and playfully rolling her tongue along the areola.</p>' +
					'<p>The two are suspiciously familiar with each other by now, and you can feel your manhood straining against your pants/Folds dampen slowly as you watch them.</p>' +
					'<p>Madison releases Zoey\'s hands and gives you a cheeky smile as she pulls her fingertips back over the other girls arms, and Zoey shivers visibly as she drags them along her armpits, kneads her breasts and pushes herself up to straddle her.</p>' +
					'<p>In the next 20 minutes, the two bring each other to several mutual orgasms. Madison straddles Zoeys face and pushes the girls lips against her sex, and Zoey dutifully tends to her coworkers needs, wrapping her arms around Maddy\'s thighs and skillfully caressing her sex. Blissful moans and gasps begin to fill the room. Madison is quick to repay the favor with a own tongue, and as the minutes pass both of them seem to almost get lost in their mutual pleasures, to the point that you may finally have to step in and stop them, or maybe join yourself...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison and Zoey', Place, 'type=callmadisonzoey');
				WritePlaceFooter(md);
				return true;					
			}				
			
		}
		
		if (Place == 466) {
			if (sType == "zoeyfuck") {
				// Sex scenes at her home
				var bStrap = perYou.FindItem(45) > 0 && Math.random() < 0.4 && !perYou.isMaleSex();
				md = WritePlaceHeader();
				if (bStrap) this.showPersonX("home-sex-strapon.jpg");
				else if (perYou.isMaleSex() && isExplicit()) this.showPersonX("home-sexba.jpg");
				else this.showPerson("home-sex" + this.getSuffix() + ".jpg");
				addPlaceTitle(md, "Zoey");
				if (bStrap) {
					md.write(
						'<p>You take out your strap-on and show it to Zoey, she says that she has never tried one of them, but she mentions Madison once talked about them, or was it Nina?</p>' +
						'<p>You put it on and she kneels down and helps to lubricate it, mostly using her mouth. You then gently push her down so you can fuck her with the now moist member. Zoey seems to enjoy the new experience, and you certainly do as you both orgasm loudly.</p>'
					);
				} else if (perYou.isMaleSex()) {
					md.write(
						'<p>You enjoy yourself with Zoey, she is not a very experienced lover but is eager to learn what you want.</p>'
					);
				} else {
					md.write(
						'<p>You enjoy yourself with Zoey, she seems not very familiar with the ways of sex with another woman. You are quite happy to teach her and she eagerly learns how to pleasure you.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Zoey', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}

		}
		
		if (Place == 414) {
			// Madisons Office, with Zoey
			if (sType === "officefuck") {
				// Fuck Zoey and Madison watching
				md = WritePlaceHeader();
				// Sex with Zoey
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("office-sexba.jpg");
				else this.showPerson("office-sex.jpg");
				
				addPlaceTitle(md, "Fucking Zoey");
				md.write(
					'<p>Zoey quickly changes into her delivery uniform and makes a show of her short skirt and in the end she shows off her panties as she waits for your touch.</p>' +
					'<p>You touch her, and more as you take her and yourself to the heights of ecstacy before you leave Zoey and Madison for now.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'return to the station reception', 371);
				// Madison is always present
				AddPeopleColumnMed(md);
				var perMadison = findPerson("Madison");
				perMadison.showPerson("madison18" + perMadison.getSuffix() + ".jpg");
				WritePlaceFooter(md);
				return true;
			}

			// Madisons Office and Zoey is present
			if (sType === "zoeymadisonthreesome") {
				// Threesome with Zoey and Madison
				perMadison = findPerson("Madison");
				md = WritePlaceHeaderNIP();
				if (!isExplicit()) AddImageGM("GenericSex/threesome any a.jpg");
				else if (perYou.isMaleSex()) this.showPeopleX(perMadison, 'office-zoeythreesome' + this.getSuffix() + '.jpg')
				else AddImageGM("GenericSex/Explicit/threesome fff a.jpg");
				
				addPlaceTitle(md, "Fucking Zoey and Madison");
				md.write(
					'<p>There is no need to just have Madison watch so you call her over to join in.</p>' +
					'<p>The three of you take each other to the heights of ecstacy before you leave Zoey and Madison for now.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the station reception', 371);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place == 414 || Place == 466 || Place == 465) {
			if (sType == "transformbreastszoey") {
				// BE Transformation
				CastTransform(1);
				md = WritePlaceHeaderNIP(true, '', 'black');
				if (!this.checkFlag(1)) {
					this.setFlag(1);
					showPopupWindow("Transformation",
						this.addPersonString("transform.jpg", "height:max%", "rightpopup") +
						addImageString('GenericSex/be a.jpg', "35%") +
						(sWho == "madison" ? 
							'<p>To your surprise you hear' :
							'<p>You cast the spell and') + 
						' Zoey cries out, "What the hell is happening?" and pulls apart her top. You see her breasts swelling, growing larger and larger, her modest sized breasts growing to quite large.</p>' +
						'<p>As she groans you thought you heard some laughing but maybe it was Nina. Zoey gasps as her breasts stop growing, and she remarks,<p>' +
						'<p>"Well, if this is permanent, I am going to need a new wardrobe.", and she rips her top off and continues, "How about giving them a spin!".</p>' +
						(sWho == "madison" ? '<p>It seems the transform spell can at times affect several people!' : ' You happily give them that and more.'),
						(sWho == "madison" ? 'dispPlace(Place,"type=callmadisonzoey")' : '')
					);
				} else {
					this.setFlag(1, false);
					showPopupWindow("Transformation",
						this.addPersonString("transform.jpg", "height:max%", "rightpopup") +
						addImageString('GenericSex/bs a.jpg', "35%") +
						(sWho == "madison" ? 
							'<p>To your surprise you hear' :
							'<p>You cast the spell and') + 
						' Zoey cries out, "What the hell is happening?" and pulls apart her top. You see her breasts diminishing, becoming smaller and smaller, her huge sized breasts growing to a modest size.</p>' +
						"<p>As she groans you thought you heard some laughing but maybe it was Nina. Zoey gasps as her breasts stop diminishing, and she remarks,<p>" +
						'<p>"Well, if this is permanent, I am going to need my old clothes back.", and she discards her loose top off and continues, "How about giving them a spin!".</p>' +
						(sWho == "madison" ? '<p>It seems the transform spell can at times affect several people!' : ' You happily give them that and more.'),
						(sWho == "madison" ? 'dispPlace(Place,"type=callmadisonzoey")' : '')
					);
	
				}
				setQueryParams("");
				WritePlaceFooter(md);
				return true;
			} else if (sType == "transformbodyzoey") {
				// Body transformation
				CastTransform(1);
				md = WritePlaceHeaderNIP(true, '', 'black');
				if (this.dress == "Zoe") {
					this.dress = "Riley";
					this.setFlag(1, false);
				} else this.dress = "Zoe";
				showPopupWindow("Transformation",
					this.addPersonString("zoey4-afternoon.jpg", "height:max%", "rightpopup") +
					'You cast the spell and Zoey cries out something inarticulate and you see her figure shifting and her face distorting. After a few minutes the changes settle down and she looks back at you smiling again, almost as it nothing happened.</p>' +
					'<p>She looks like a completely different person, even her clothing is different. You ask her if she is feeling good and she answers "Why ' + perYou.getMaster() + ' is there something wrong?".</p>' +
					'<p>She certainly seems to be the same Zoey she was before despite her different appearance.' +
					(sWho == "madison" ? '</p><p>It seems the transform spell can at times affect several people!' : ''),
					(sWho == "madison" ? 'dispPlace(Place,"type=callmadisonzoey")' : 'dispPlace()'),
					'', false
				);
				setQueryParams("");
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 371) {
		
			if ((isDay() && nFromPlace == 370 && this.isCharmedBy() && isCharmedBy("Nina") && !checkPersonFlag("Nina", 3)) || sType == "ninazoey" || sType == "ninazoey2") {
				md = WritePlaceHeader();
				var perNina = findPerson("Nina");
				if (!perNina.checkFlag(3)) {
					perNina.setFlag(3);
					setQueryParams('type=ninazoey');
				}
				this.showPeople(perNina, "ninazoey1.jpg");
				addPlaceTitle(md, "Slaves Practising");
				if (sType == "ninazoey") {
					md.write(
						'<p>You see the reception area is empty, Nina is not at her desk. You assume she is on a break and go to check the small break room your Mom once took you to when visiting. Before you take a few steps you hear some voices coming from the room so you check it out. The room has some large plants and some tea and coffee machines. It also has a naked Nina and a naked Zoey! You hear them whispering and hear Nina say,</p>' +
						'<p>"Don\'t worry, ' + perYou.getHeShe() + ' won\'t mind, it\'s like we are, you know, practising. So we are really good for ' + perYou.getHimHer() + '"</p>' +
						'<p>Zoey notices you and smiles, but Nina is very intent on seducing her and does not see you. Interesting, you remember Madison saying something about how "Nina really likes Zoey". You would guess the arousal of the Charm spell is letting them try things they may not of before. Alright, time to take some control here, so you interrupt,</p>' +
						'<p>"Nina! Yes you may by all means practice with Zoey, but you must ask my permission!"</p>' +
						'<p>Nina looks startled and stammers an apology and asks if they can practice for you? You of course agree and you watch the two as they caress and play with each others bodies. Nina is clearly besotted with Zoey, but while it seems Zoey likes her, it seems Zoey is more interested in performing for your enjoyment.</p>' +
						'<p>After a time you tell them that they have had enough practice and it is time to put their training to good use, on you!</p>'
					);
				} else {
					md.write(
						'<p>You tell Zoey that it is time for another practice session with Nina. You both step out to the reception area, leaving a disappointed Madison behind.</p>' +
						'<p>You tell Nina "practice makes perfect" and she immediately understands and heads for the break room, shedding her clothing.</p>' +
						'<p>In the break room you make sure they get plenty of practice in pleasuring each other, but mainly in pleasuring yourself.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'let them finish and return to the reception with Nina', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (sType == "callzoey") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("zoey-call-b.jpg");
			else this.showPerson("zoey-call-g.jpg");
			addPlaceTitle(md, "Dial-up Delivery Girl Zoey");
			md.write(
				'<p>Zoey arrives and she glances around and then gestures towards an out of the way place' + (perYou.isMaleSex() ? ', a small grassy area' : '') + '.</p>' +
				'<p>She removes her clothing, despite being in a public area and then she starts to do the same for you. Her intention is clear and you let her deliver her service to you, a skilled if very public ' + (perYou.isMaleSex() ? 'blowjob' : 'pussy-lick') + '.</p>'
			);
			startQuestions();
			this.addDancingLink(md, 'tell Zoey to dance for you in the club',
				'You tell your delivery-girl about the Avernus club and that you want her to dance for you there tonight,</p>' +
				'<p>&quot;Yes of course ' + perYou.getMaster() + '!&quot; and with that you call Jade to arrange a dance for Zoey.'
			);
			addLinkToPlace(md, 'let Zoey continue on her way', Place);
			AddRightColumnMed(md);
			this.showPerson("zoey0c.jpg");
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledance" + (this.checkFlag(1) ? "b" : "a") + ".jpg");
		addPlaceTitle(md, "Zoey's Dance");
		md.write(
			'<p>Zoey is wearing some black lingerie as she steps onto the stage, she acts shy, but you can see it is more a game, being a tease. She is a fairly skilled dancer, but not a very experienced stripper and she ignores the pole. Still, she is sexy and entertaining!</p>' +
			'<p>After she sits with you for a while, attentively serving you as needed!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 466 && this.isHere()) {
			if (isVisible()) md.write('<p>Zoey welcomes you, and invites you in.</p>');
			else md.write('<p>Zoey seems to be getting ready for bed.</p>');
		}
	};

	per.showPersonChat = function(md)
	{
		if (Place == 466 && this.isHere() && sType === "") {
			// Zoey's apartment
			if (this.dress === "") {
				this.pickModel('As you approach her front door, you forget for a moment what Zoey looks like. Is her uniform...', "zoey0b", "Zoe", "Riley", "Blue", "Red", "", "Someone is there");
			} else {
				addLinkToPlaceC(md, 'accept her hospitality', Place, 'type=zoeyfuck');
				this.addSleepLink(md, "go to bed with Zoey", "Sleeping with Zoey",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Zoey to bed for the night.</b>',
					'bed' + this.getSuffix() + '.jpg', true
				);
			}
		}
	};	

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere() && perKurndorf.getQuestRitual() >= 200) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Zoey before it will work.');
					else if ((Place != 414 && Place != 466) || sType != "visitzoey") examineItem(no, 'The ' +  s + ' trembles slightly, maybe it would react better in another location with Zoey.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Zoey.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			if (Place == 412) {
				// Zoey in Madisons Office
				if (sType == "madisonzoey" && !isCharmedBy("Zoey")) CastCharmSpell("Zoey", 414, 4, "type=charm1");
				else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// In the office at the TV Station
			if (Place == 466 || (Place == 414 && (sType == "visitzoey" || sType === ""))) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(1))) return "handled";

				// It can be cast
				setCommentsNoClick(
					'<div class="' + getConverseBubbleClass() + '" style="cursor:default">' +
					'<table><tr><td width="80%"><p>You decide to try the transformation spell on Zoey and tell her to prepare herself. As you start to recite the spell she falls into a sort of trance, her uniform falling down. As it does your attention is drawn to...</p>'
				);
				if (this.checkFlag(30)) addOptionLink("comments", 'her face', "ClearComments();dispPlace(" + Place + ",'type=transformbodyzoey')");
				addOptionLink("comments", 'her breasts', "ClearComments();dispPlace(" + Place + ",'type=transformbreastszoey')");
				addComments('</td><td width="20%">' + this.addPersonString(Place == 466 ? "home1.jpg" : "zoey1-noon.jpg") + '</td></tr></table>');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	
	// Phone calls
	
	per.isPhoneable = function(msg) {
		// Can you call them?
		return this.isCharmedBy() && !this.isHere();
	};

	per.callThem = function() {
		if (Place == 465) gotoPlace(Place, 'type=callmadisonzoey');
		else if (isAtLocation(282) && perJade.isDanceAvailable()) {
			// Strip club
			perJade.setDancer(this.uid);
			dispPlace();			
			receiveCall('','You call ' + this.getPersonName() + ' and ask ' + this.getHimHer() + ' join you at the Avernus club to dance for you. You make arrangements with Jade for the dance.');
			WriteCommentsFooter(bChat, bChatLeft);			
		} else if (!isDay()) WriteComments("You call Zoey but there is no answer, you would guess she is at home and the number you have for her is probably her work number.");
		else if (Place == 269) {
			gotoPlace(Place, 'type=zoeypool');
			receiveCall('', 'You call Zoey to invite her to join you at the pool for a swim, and she immediately answers, "' + (isDay() ? 'Sure, I can take a break, see you soon' : 'Sure, I can use a dip') + '"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (!isOutside()) WriteComments("You call Zoey but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
		else {
			gotoPlace(Place, 'type=callzoey');
			receiveCall('', 'You call Zoey and she immediately answers, and promises to be there in 15 minutes and deliver you something really <b>hot</b>');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (isMorning() && !this.checkFlag(2) && this.isCharmedBy()) {
			// SMS 79
			if (this.makeCall(true, 79)) {
				this.setFlag(2);
				setPlaceKnown("ZoeysApartment");
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 79) return receiveSMS('Zoey', perYou.getMaster() + ' cleaning up here, maybe I can clean something for you..or you', 'sms3.jpg') + replyToSMS("Where are you?") + receiveSMS('Zoey', perYou.getMaster() + ' at home, Apartment 33 North Celeste Apartments, visit me anytime');
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return true; };
}
