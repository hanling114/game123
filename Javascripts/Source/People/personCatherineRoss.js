/***********************************************************************
Catherine Ross
***********************************************************************/

function initialiseCatherineRoss()
{
	// Catherine Ross
	addPerson("Catherine", 0, "Catherine", '', false);
	per.extra = [0, 0];
	
	per.getPersonName = function(full) { return full === true ? "Catherine Ross" : this.name; };
	per.getPersonAddress = function(n) { return n ? this.checkFlag(2) ? 438 : 0 : this.checkFlag(2) ? "5 Cherise Rd, Glenvale" : ""; };
	
	per.getPossessionFace = function() { return this.isCharmedBy() ? "catherine-bedroomc-sex-bjb" : "catherine-face"; };

	per.whereNow = function() {
		if (Place == 481 && sType == "meeting") return 0;
		if (this.place == 999 || this.place == 998) return this.place;
		if (whereItem(4) === 76) return 11;

		var pc = findPersonNC("AdeleRoss");
		if (pc.whereNow() == 436 && !pc.isCharmedBy()) return 438;

		if (perBeasley.checkFlag(3) && !perBeasley.checkFlag(18)) return Place == 438 ? 438 : this.place;
		pc = findPersonNC("Penelope");
		if (pc.whereNow() == 73 && !pc.isCharmedBy()) return Place == 438 ? 438 : this.place; 
		if (isWeekDay() && getHour() > 9 && getHour() < 12 && this.checkFlag(2)) return getDay(true) == "Fri" ? 69 : 73;
		if (Place == 438) return Place;
		return this.place;
	};
	
	per.whereNowName = function() {
		if (sType == "meeting") {
			gotoPlaceDelayed(481, 'type=catherinehere');
			return "behind you!";
		}
		var wh = this.whereNow();
		if (wh == 436) return "home " + this.getYourNameFor();
		if (wh == 438) return "in my bedroom " + this.getYourNameFor();		
		return this.whereNowNameBase();
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 73 && !isPersonHere("Penelope") && this.isHere() && sType === "") return this.showPerson("adminoffice" + (this.isCharmedBy() ? "c" : "u") + ".jpg", '', '', '', '', false, "string");
		else if (Place == 69 && this.isHere() && sType === "") return this.showPerson("nurse" + (this.isCharmedBy() ? "c" : "u") + ".jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		//if (Place == 69  && this.isHere() && sType === "") return true;
		if (Place == 73 && this.isHere() && isPersonHere("Penelope") && sType === "") {
			SetRightColumnSize("large");
			return true;
		}
		return false;
	};

	per.showPlaceImageRight = function(md)
	{
		if (Place == 73) this.showPerson("adminoffice" + (this.isCharmedBy() ? "c" : "u") + ".jpg");
		//else if (Place == 69) this.showPerson("nurse" + (this.isCharmedBy() ? "c" : "u") + ".jpg");
	};
	
	
	per.showEventPopup = function()
	{
		// First visit to Amy in her home
		if (Place == 436 && sType == "catherineleaves") {
			this.place = 999;
			showPopupWindow("Catherine is going out",
				this.addPersonString("goingout" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") +
				"As you walk towards Amy's bedroom Catherine calls out to you. Her party dress is rather provocative, as always,</p>" +
				'<p>"' + perYou.getPersonName() + ' I was just going out for the evening' + (wherePerson("AdeleRoss") == 999 ? ' and I have arranged with Adele for her to work tonight' : '') + '. You have the house to yourself, you do not have to worry about disturbing us!"</p>' +
				'<p>You interpret this Catherine-speak as "Fuck Amy, make her scream. Fuck her anywhere you like!". As you ponder this she waves goodbye and promises to return in the early hours sometime.',
				'dispPlace(437)'
			);
			return true;
		}
		
		//  Meet Catherine
		if (Place == 70 && !this.checkFlag(2) && isShopOpen(2) && getPersonOther("MrBeasley") > 0 && sType === "") {
			this.setFlag(2);
			this.place = 998;
			showPopupWindow("Catherine",
				this.addPersonString("catherine0.jpg", "height:max%", "right") +
				"You see Catherine walking down the hall, and she waves at you. She is the older sister of your friend Amy and she works at the school part-time in the administration offices. She also doubles as school-nurse when needed and she is available.</p>" +
				"<p>You have gotten to know her quite well, she is a friendly and outgoing person, and you have become friends with her since you met her visiting Amy\'s home. Catherine is, well, sexually liberated, enjoying a <i>wide</i> range of lovers and experiences, and enjoys chatting about them with Amy or yourself. You do know she keeps this side of her life separate from work, she strictly takes no students or teachers as lovers. She has not approached you, not wanting to damage her relationship with her sister Amy, but has commented that you are cute!</p>" +
				"<p>You say 'Hi' to her, but she only has a moment to chat. She mentions something about an appointment with 'that slime Beasley', and then going to have a coffee with her other sister Adele. You have only once met Adele in passing, she never seems to be home when you visit, you assume she lives somewhere else.</p>" +
				'<p>You do quickly ask her for her phone number again as you had lost all the data recently and she quickly gives you her information.'
			);
			return true;
		}
		
		if (Place == 78 && this.whereNow() == 73 && !this.checkFlag(20) && sType === "") {
			// Seen in admin office
			this.setFlag(20);
			setPlaceKnown("SchoolAdmin", false);
			showPopupWindow("Catherine Working",
				this.addPersonString("adminofficefirst.jpg", "height:max%", "right") +
				"You notice the door to the admin office is open and you see Catherine sitting at a desk doing some work. At most she works an hour or two a day in this office, commonly in the late mornings.</p>" +
				'<p>You wave and she smiles back, ' +
				(this.checkFlag(17) || perBeasley.checkFlag(3) ? 'but returns to work looking very bored. She has said work here is for money and enjoys being interrupted and chatting with anyone, anytime!'
				                    : 'and waves for you to join her. She has said work here is for money and enjoys being interrupted and chatting with anyone, anytime!'),
				this.checkFlag(17) || perBeasley.checkFlag(3) ? undefined : "gotoPlace(78, 'type=catherineadminflirt')"
			);
			return true;			
		}
		
		if (Place == 78 && sType == "catherineadminflirt") {
			this.setFlag(17);
			showPopupWindow("Catherine\'s First Aid",
				this.addPersonString("adminoffice-flirt.jpg", "height:max%", "right") +
				'You join Catherine and chat for a while, she starts by complaining about Davy Robbins who had visited recently and she said he was rude, almost ordering her around. She kicked him out of the office, it sounds like she was quite annoyed!</p>' +
				'<p>She changes the topic and starts to talk about a recent encounter with an office supply representative, clearly a sexual encounter, it is Catherine after all but she does not quite get to that point in her tale. She pauses and looks at you oddly, and she begins to adjust her clothes, and you realise she is more stripping than adjusting for comfort!</p>' +
				'<p>She asks, "How about these for ample office assets..." You are almost stunned, Catherine does not hit on students and definitely not on you! You ask has something changed with her policy and remind her about Amy. She looks shocked and seems to realise what she is doing. She quickly puts her top back on,</p>' +
				'<p>"Sorry I do not know what came over me, since I met Davy Robbins I have felt odd, but it is passing...please let me get back to work now"</p>' +
				'<p>You guess Davy tried something, ' + (isSpellKnown("Charm") ? 'probably the charm spell' : 'some magic you guess') + ' but it seems to have failed but affected her for a while. You decide it is best to leave her alone for now and leave the office.',
				'dispPlace(78)'
			);
		}
		
		if (Place == 78 && this.whereNow() == 69 && !this.checkFlag(16) && sType === "") {
			// Seen in nurses office
			this.setFlag(16);
			setPlaceKnown("NursesOffice", false);
			showPopupWindow("Catherine the School Nurse",
				this.addPersonString("nurse" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") +
				"You notice a student leaving the nurses office and see Catherine in there. She sometimes handles nursing work when needed though you think she may have some regular work here Friday mornings though you are not really sure what. Catherine does not really discuss her work as a nurse, she is very professional in her work here!"
			);
			return true;			
		}	
		
		if (Place == 69 && perYou.health < 100 && !checkPersonFlag("Tracy", 7) && sType === "") {
			setQueryParams('');
			setPersonFlag("Tracy", 7);
			perYou.health += 5;
			showPopupWindow("Catherine\'s First Aid",
				this.addPersonString("nurse-firstaid.jpg", "height:max%", "right") +
				'You arrive in the nurses office and Catherine meets you, she always wears the white overcoat when doing her nursing duties.</p>' +
				'<p>She gestures for you to sit down so she can she examine your ankle. You do and Catherine carefully checks' + (this.checkFlag(17) ? '' : ', her hands seem to caress your ankle and foot') + ', and announces that there is no problems with your ankle, and suggests some simple painkillers until it gets better. She hands you some and a glass of water to wash them down.</p>' +
				(this.checkFlag(17) || perBeasley.checkFlag(3) ? '<p>You immediately feel a bit better, probably more the attention and her gentle touch. You thank her and part, she will probably return to whatever else she was doing'
										  : '<p>You notice her looking at you a little oddly and you are getting a strange sensation from her....'),
				this.checkFlag(17) || perBeasley.checkFlag(3) ? 'dispPlace(78)' : "gotoPlace(69, 'type=catherinefirstaid2')"
			);
			return true;
		}
		
		if (Place == 69 && sType == "catherinefirstaid2") {
			this.setFlag(17);
			showPopupWindow("Catherine\'s First Aid",
				this.addPersonString("nurse-firstaid-flirt.jpg", "height:max%", "right") +
				'Catherine seems uncertain, less confident than usual and she asks you to wait for a minute for the painkillers to take effect. She steps behind a screen and from behind it she says she wants your opinion on something. She steps out, wearing <b>nothing</b> aside from her white overcoat, and she asks,</p>' +
				'<p>"How do you like this as a new uniform?" You are almost stunned, Catherine does not hit on students and definitely not on you! You ask has something changed with her policy and remind her about Amy. She looks shocked and seems to realise what she is doing. She almost runs back behind the screen and calls out,</p>' +
				'<p>"Sorry I do not know what came over me, since I met Davy Robbins a little while ago I have felt odd. He tried to order me around and I kicked his ass out of here, but it made me feel strange. It is passing...please just leave me for now"</p>' +
				'<p>You guess Davy tried something, ' + (isSpellKnown("Charm") ? 'probably the charm spell' : 'some magic you guess') + ' but it seems to have failed but affected her for a while. You decide it is best to leave her alone for now and leave the office. You doubt she will stay in the office, she will probably return to whatever she was doing before hand.',
				'dispPlace(78)'
			);
			
			return true;
		}
		
		if (Place == 70 && (this.whereNow() == 69 || this.whereNow() == 73) && this.checkFlag(23) && !this.checkFlag(24)) {
			this.setFlag(24);
			showPopupWindow("Is That Catherine?",
				(this.whereNow() == 73 ? this.addPersonString("adminoffice" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") : this.addPersonString("nurse" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right")) +
				"As you are walking down the hallway you see Catherine walk into school library, she was being a bit furtive and do not think she saw you.</p>" +
				'<p>Curious you follow and see a "do not disturb" sign on the closed door to the library. You try the door and it opens you remember the catch or lock has been unreliable for a while and the door is really never locked....',
				'dispPlace(77,"type=catherineheatherfirst")'
			);
			return true;			
		}
		
		if (isInvisible()) return false;
		
		if (this.isHere() && this.checkFlag(5) && (isCharmedBy("Heather") || per.isFreeSlave()) && !this.checkFlag(22) && sType === "" && !(Place == 436 && isPersonHere("AdeleRoss") && !per.checkFlag(6))) {
			this.setFlag(22);
			showPopupWindow("Catherine\'s Curiosity",
				findPerson("Heather").addPersonString("masturbatea.jpg", "height:max%", "right") +
				"Catherine approaches you and asks,</p>" +
				'<p>"I saw Heather earlier and she seemed happy and sensual, quite changed from recently. Something <b>felt</b> different about her...Adele once talked about feelings and senses but it was not the sort of feeling I wanted. Something about our family or other. Still Heather is different. Is she now with <b>us</b>, a new member of your harem?"</p>' +
				'<p>That\'s right there was talk of harem girls when you met Catherine at the construction site. It is interesting though she can feel some things, some sort of second sight or other magical sense that runs in her family? Maybe it explains her earlier dislike of Mr. Beasley, then again he is not very likeable!</p>' +
				'<p>You confess that Heather ' + (per.isCharmedBy() ? 'is now magically bound to you' : 'was hypnotised by you following a fantasy of hers. Catherine is curious about this and asks you to tell the story. You immediately get the impression hypnosis is not a thing for her, but she seems to have a little understanding of it. Maybe her medical training as hypnosis can sometimes be used there? You mention the trigger word for Heather "slutmode" and otherwise describe the process you did') + '.</p>' +
				'<p>Catherine seems satisfied with your explanation and that is that!'
			);
			return true;			
		}
		
		// First visit to Catherine's bedroom
		if (Place == 438 && !this.checkFlag(15) && sType === "") {
			this.setFlag(15);
			showPopupWindow("Catherine's Book",
				this.addPersonString("catherine-shoot1.jpg", "height:max%", "right") +
				"You follow Catherine into her bedroom and she goes and sits on her bed, but as she does she knocks a glossy book onto the floor with a rather theatrical \"Oops, silly me\" and she gestures for you to pick it up for her.</p>" +
				"<p>The book is an adult photoshoot, artistic and beautifully done, but full on lesbian erotica starring your friend Catherine here! You did not realise she had ever done this sort of thing, not that it surprises you in the least!</p>" +
				"<p>You compliment the shoot and of course Catherine and she explains that she did a few of these sort of shoots for the fun. She smiles and gestures to a shelf and some videos...",
				"dispPlace(Place,'type=catherineshoot2')"
			);
			return true;
		}
		if (Place == 438 && sType === "catherineshoot2") {
			showPopupWindow("Catherine's Videos",
				this.addPersonString("catherine-shoot2.jpg", "height:max%", "right") +
				'Catherine shows you a video, "I also did a few videos, some for money, others with some friends just for the fun"</p>' +
				"<p>Once again you are not surprised in the least, Catherine has always done whatever she wanted and can always look after herself. You are just surprised she had never bragged about it in the past!</p>" +
				"<p>She shows you a few of the titles and suggest that you could always watch one with her sometime."
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, s;
		
		if (Place == 269 && sType == "catherinepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("catherine-pool.jpg");
			addPlaceTitle(md, "Swimming with Catherine");
			md.write(
				'<p>Catherine arrives and for a moment you are surprised at how conservatively she is dressed, a red one piece. Then you see how it is almost transparent and you can only think "That\'s Catherine for you". Maybe swimming is a bad idea, then again it would be a lovely sight!</p>' +
				'<p>You also know she will not let you leave without something more physical than a swim...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '...Catherine has no modesty...', Place, 'type=catherinepoolsex');
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "catherinepoolsex") {
			md = WritePlaceHeader();
			if (isExplicit() && perYou.isMaleSex()) this.showPersonRandomX("catherine-pool-sexb", 2);
			else this.showPersonBG("catherine-pool-sex.jpg");
			addPlaceTitle(md, "Openly Fucking Catherine");
			md.write(
				'<p>Discretion has never been Catherine\'s way, so there is little need to find an out of the way place, aside from your own modesty that is. You do your best to not scandalise those few people around, but Catherine is vocal and obviously enjoying the attention and trying to attract attention!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Catherine', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 282) {
			if (sType == "catherineavernus") {
				md = WritePlaceHeader();
				this.setFlag(19);
				if (isExplicit() && perYou.isMaleSex() && Math.random() < 0.1) this.showPersonX("avernusa.jpg");
				else this.showPersonRandom("avernus", 7);
				addPlaceTitle(md, "Bondage Games with Catherine");
				md.write(
					'<p>Catherine leads you into a private room, she is very familiar with where things are, she has been her often before. She is a lot more familar with this sort of thing than you are!</p>' +
					'<p>Largely you follow her lead but it is always with her being submissive to your dominant role. She is normally so confident and in charge it is a little strange to have her acting like this, but it is acting a role she is playing and enjoying a lot. She does make sure you enjoy it a lot as well!</p>'
				);
				startQuestions();
				if (this.checkFlag(18) && wherePerson("MrsGranger") == 177) addLinkToPlaceC(md, 'call Mrs. Granger to join you and Catherine', 282, 'type=catherinegrangeravernus');
				addLinkToPlaceC(md, 'say goodbye to Catherine and leave the club', 281);
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "catherinegrangeravernus") {
				md = WritePlaceHeader();
				if (!this.checkFlag(18)) this.showPersonRandom("avernusgranger", 2);
				else this.showPersonRandom("avernusgranger", 4);
				if (!this.checkFlag(18)) {
					this.setFlag(18);
					addPlaceTitle(md, "Meeting Mrs. Granger");
					md.write(
						'<p>As you are walking towards the private room with Catherine you see Mrs. Granger just leaving another room. Catherine calls out "Hi Marie" and she replies "Dear Catherine.." but she stops when she sees you are there as well.</p>' +
						'<p>You explain Catherine is here with you and you are going to a private room. You can see Mrs. Granger looks quite interested and before you can say anything Catherine says, "Come on Marie join us" and she eagerly agrees!</p>' +
						'<p>In the room you find Catherine still prefers the submissive role, but Mrs. Granger varies, at times she is quite submissive and others she seems to like to dominate Catherine. From some exchanges you gather they have played here before, and Mrs. Granger was definitely the dominant partner!</p>' +
						'<p>Still, this is <b>your</b> party and make sure they attend to your pleasures as well as theirs, and that you are the dominant person if you are involved and not just watching their play.</p>' +
						'<p>Afterwards you arrange with Mrs. Granger to call her in future if you want to play with Catherine and herself.</p>'
					);					
				} else {
					addPlaceTitle(md, "Bondage Games with Catherine and Mrs. Granger");
					md.write(
						'<p>While Catherine is tied up and lying before you delightfully stuggling and writhing you call Mrs. Granger to join you.</p>' +
						'<p>About 15 minutes later she arrives, she must of taken a taxi to get here that quickly! In short order you have both of them bound and ready for more play!</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'say goodbye to Catherine and Mrs. Granger', 281);
				WritePlaceFooter(md);
				return true;				
			}				
			
		}

		if (sType == "catherinebusy" || (this.hoursSince(this.extra[0]) > (this.extra[0] === 0 ? 288 : 512) && (Place == 10 || Place == 72 || Place == 73) && nFromPlace != Place && Math.random() < 0.25)) {
			if (!checkPersonFlag("MrBeasley", 3) || this.whereNow() == 73) {
				if ((Place == 10 && wherePerson("Monique") != 10) || (Place == 72 && wherePerson("MrsTanika") != 72)) {
					// Catherine's quickie
					setQueryParams("type=catherinebusy");
					this.setFlag(9);
					this.extra[0] = nTime;
					md = WritePlaceHeader();
					this.showPersonRandomRorX("catherinequickie", 1);
					addPlaceTitle(md, "Catherine\'s Busy");
					md.write(
						'<p>You step into the ' + (Place == 10 ? 'classroom' : Place == 73 ? "office" : 'lounge') + ' and you see it is occupied. Catherine is here with a friend, well you assume a friend, you have never seen the man before. He does not work at the school and he is too old to be a student, then again you know Catherine has her rules about mixing work and play.</p>' +
						'<p>The man is enthusiastically fucking Catherine, so lost in his passion he does not notice you. Catherine does see you and smiles, then she gestures with one hand, a waggle to say "he is so-so".</p>' +
						'<p>She returns her attention to her lover, and you back away not wanting to interrupt them. You know based on previous experience with Catherine that you will likely never see the man again, a "so-so" means he is history!</p>'
					);
					startQuestions();
					addLinkToPlace(md, "leave them alone", Place == 73 ? 78 : 70);
					WritePlaceFooter(md);
					return true;
				}
			}
		} 
		
		if (Place == 481) {
			if (sType === "catherinehere") {
				// Here she is!
				this.setFlag(5);		// Met her
				if (wherePerson("MrsGranger") == 177) this.place = 177;
				else this.place = 999;
				md = WritePlaceHeader();

				this.showPerson("catherine2a.jpg");
				addPlaceTitle(md, "Catherine's Here As Promised");
				md.write(
					'<p>You turn around and there is Catherine standing next to a bulldozer dressed in some alluring shorts and top. She poses for you for a moment, and then quickly gives you a kiss,</p>' +
					'<p>"Thank you ' + perYou.getPersonName() + ' for saving Amy and me from that slimy bastard Beasley! Adele has been telling me about Kurndorf, forbidden magics and a whole lot of things. ' +
					'She makes you sound like a \'Kurndorf-in-training\', an aspiring ' + (perYou.isBornMale() ? 'warlock' : 'witch') + ' seeking everyone to be their sextoys and slaves", she laughs, but she has hit a bit close to the bone. While you would not ever think of the excesses or Kurndorf, a lot of that...</p>' +
					'<p>Unaware of your thoughts Catherine continues, "I don\'t care, I love being a sextoy or playing with them, both plastic or flesh and blood. If you want to rule this town then so what. I know you and trust you will not go too far."</p>' +
					'<p>She pauses, "If you want you can use your magic on me, but from what Adele says it is a sort of super-aphrodisiac that makes you really susceptible. Well, it won\'t change a thing in me, you know I am more or less a nymphomaniac already, and I will do anything you want, you saved us!"</p>' +
					'<p>Again she pauses, "I have never approached you in respect for Amy, but she can share, and my rule of never fucking at school I can break for you...But I ask two things of you...", she hesitates, and you ask her what,</p>' +
					'<p>"I do not care how you do it, make Beasley pay, fuck him up! ' + (isMurderPath() ? 'I do not mean hurt him or kill him, punish him!' : '') + '", you had never seen this vengeful side of Catherine before! She continues,</p>' +
					'<p>"While I would prefer if you leave Amy alone, I doubt you will, so please just be nice to her!". Well, the protective big sister emerges from Catherine you see. You ask her about Adele,</p>' +
					'<p>"Oh Adele, that stuck-up, over-protective prude! Let\'s turn her into a ' + (perYou.isMaleSex() ? 'cock-sleeve, an orgasming cock-ornament' : 'pussy-slave, a cunt-licker') + '...", you interrupt her, you get the point. You are curious, she wants to protect Amy, but not Adele, and Catherine explains,</p>' +
					'<p>"She has always tried to interfere with my hobby", you know she means fucking, "and thinks that as she is the oldest she is in charge always. She needs to loosen up, get fucked a lot, become a nice little sex-addicted slave!", you stop her again, you get her point, and again see her vengeful side.</p>' +
					'<p>Catherine smiles, she was probably just got carried away a bit, but it seems you have a new and completely willing ally. She closes her eyes and says,</p>' +
					'<p>"Ok, so waste your magic on me if you want some sort of completeness, if not let me reward you in the way I do best" and she starts unbuttoning her shorts.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "accept her reward", 481, 'type=reward1');
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "meeting" || (!this.checkFlag(5) && this.checkFlag(6) && getHour() == 12)) {
				// Where is she?
				setQueryParams('type=meeting');		// so you can save here
				md = WritePlaceHeader();

				addPlaceTitle(md, "Catherine is not here?", 'accessroad-site.jpg');
				md.write(
					'<p>You look around the site, it is the agreed time but Catherine is not here! You are surprised, Catherine is usually quite punctual, except where her libido gets in the way...Possibly she met someone cute, but it is unlike her to be late and not to call or SMS.</p>' +
					'<p>You suppose you could give her a phone call, you have her number in your phone\'s <b>address book</b>...or leave and return another day.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "leave disappointed", 481, '', 'You wait for a while, and then leave disappointed', 'WaitHereOnly(3)');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine1") {
				// Charm 1
				md = WritePlaceHeader();
				this.setFlag(12);
				this.showPerson("catherine3c.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You recite the spell and explain to Catherine that there is always an advantage to the spell, both in what you can learn from it, and that it protects her from others casting it on her themselves. She sighs,</p>' +
					'<p>"Wow ' + perYou.getPersonName() + ' that is one hell of a rush! Adele told me it was like a super aphrodisiac and she was not kidding!", as she talks she removes her shorts and unbuttons her top. You see her eyes start to change, taking on a greenish tint as she says, "So ' + perYou.getPersonName() + ' fuck me!"</p>' +
					'<p>Now it is how do you want to proceed, Catherine is a friend, she has always been a bit of a nymphomaniac, now a highly aroused nymphomaniac. It will be difficult to talk to her about much more than sex. You decide that just enslaving her just does not quite seem right, she is a friend, but she did show that image of her in bondage.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk about domination and submission', 481, 'type=charmcatherine2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine2") {
				// Charm 2
				md = WritePlaceHeader();
				this.showPerson("catherine4c.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You ask Catherine to talk about that bondage picture she sent and about embracing that sort of relationship with you,</p>' +
					'<p>"If that is the sort of games you want to play ' + perYou.getPersonName() + ' that is great with me, but variety is the spice of life. Fuck me in as many ways as you can, in as many places as you can!"</p>' +
					'<p>Well that sounds like the Catherine you have always known. As you consider, she strips the rest of her clothing and poses in front of the bulldozer and continues,</p>' +
					'<p>"I told you, fuck up Beasley and be nice to Amy and I will do anything, absolutely anything for you. I\'ll be your devoted slave girl, your fucktoy, anything you want!"</p>' +
					'<p>It seems the spell is only affecting her a little, aside from her talk about it\'s aphrodisiac properties, but your words are not shaping her thoughts and mind very much. Then again you are not really trying, she will give you anything you want!</p>' +
					'<p>She urgently asks, "Come on fuck me already!!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "take her", 481, 'type=charmcatherine3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine3") {
				// Charm 3 (Sex)
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("catherine5b.jpg");
				else this.showPerson(perYou.isMaleSex() ? "catherine5b.jpg" : "catherine5gc.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You have often fantasised about a sexual encounter with Catherine, but you have always considered it impossible. Now now!</p>' +
					'<p>You start to remove your clothes, and Catherine almost jumps on you in her eagerness to help. Quickly she strips you naked'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'and takes your manhood in hand and expertly licks and sucks you to a full erection, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, pushes you down and mounts herself on your cock. She gasps as she does, her hips jerking and she groans "cumming so quickly...". After a brief pause she starts to move, commenting "...but the more the merrier..."</p>' +
						'<p>She fucks herself on you, and you fuck her, changing her mounted to you on top as she has several orgasms. She is an amazing lover, skilled and passionate and you reach your peak and cum into her as she has yet another orgasm.</p>' +
						'<p>After she comments, "Wow that is one amazing aphrodisiac, if it lasts then I am not sure I will be able to concentrate on anything besides sex!", than again you are not sure if she ever did before</p>'
					);
				} else {
					md.write(
						'she kneels to start licking and playing with your pussy, to arouse you, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, and eagerly licks your pussy and clit while furiously masturbating herself. She rapidly has an orgasm, gasping into your pussy as she does, "cumming so quickly...". After a brief pause she continues licking, commenting "...but the more the merrier..."</p>' +
						'<p>She licks you to an incredible orgasm, she is an amazing lover, skilled and passionate, and you are sure she orgasms as well, again.</p>' +
						'<p>After she comments, "Wow that is one amazing aphrodisiac, if it lasts then I am not sure I will be able to concentrate on anything besides sex!", than again you are not sure if she ever did before</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, '"Let\'s discuss Adele"', 481, 'type=planadele');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward1") {
				// Reward 1
				md = WritePlaceHeader();
				this.showPerson("catherine3r.jpg");
				addPlaceTitle(md, "Catherine's Reward");
				md.write(
					'<p>You agree, there is no need to waste mana, Catherine is true to her word and you want to deal with Mr. Beasley. There is no problem being careful around Amy, she is your friend as well. You tell Catherine that you agree to her conditions and that there is no need to use the spell, you trust her.</p>' +
					'<p>Catherine looks at you with her best seductive expression, "Well then, this is something we have both thought about so let\'s do it!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"yes please"', 481, 'type=reward2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward2") {
				// Reward 1
				md = WritePlaceHeader();

				this.showPerson("catherine4r.jpg");
				addPlaceTitle(md, "Catherine's Reward");
				md.write(
					'<p>Catherine starts to strip the rest of her clothing, doing so in a exaggerated stripperish way, ending with one leg resting on the blade of the bulldizer. She looks at you and asks,</p>' +
					'<p>"Am I the only one going to be naked here?", you realise you had been so fascinated with her strip that you are still clothed. You quickly remove your clothing as well, more a quick rush than a performance like she did. As you do Catherine comments,</p>' +
					'<p>"It has been so difficult to stop myself from seducing you. It is what I do, but I have my code and there is Amy. You do know she likes you? I mean more than friends but not quite love but it was a possibility.". Your clothes are now removed and Catherine beckons to you,</p>' +
					'<p>"I had thought you were so obsessed with magic and that girl Kate, the idea of you becoming some sort of ' + perYou.getMaster() + ' of a harem...Well call me a harem-girl!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "take your harem girl", 481, 'type=reward3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward3") {
				// Reward 1
				md = WritePlaceHeader();

				if (perYou.isMaleSex()) this.showPersonRorX("catherine5b.jpg");
				else this.showPerson(perYou.isMaleSex() ? "catherine5b.jpg" : "catherine5gc.jpg");

				addPlaceTitle(md, "Catherine's Reward");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Catherine takes your manhood in hand and expertly licks and sucks you to a full erection, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, pushes you down and mounts herself on your cock. She gasps as she does, and then she starts to move, commenting "...fells like you are ready..."</p>' +
						'<p>She fucks herself on you, and you fuck her, changing her mounted to you on top as she has several orgasms. She is an amazing lover, skilled and passionate and you reach your peak and cum into her as she has yet another orgasm.</p>' +
						'<p>After she comments, "Wow, I guess magic is not the only thing you are good at!"</p>'
					);
				} else {
					md.write(
						'<p>Catherine kneels to start licking and playing with your pussy, to arouse you, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, and eagerly licks your pussy and clit while furiously masturbating herself. She rapidly has an orgasm, gasping into your pussy as she does, "cumming so quickly...". After a brief pause she continues licking, commenting "...but the more the merrier..."</p>' +
						'<p>She licks you to an incredible orgasm, she is an amazing lover, skilled and passionate, and you are sure she orgasms as well, again.</p>' +
						'<p>After she comments, "Wow, I guess magic is not the only thing you are good at!"</p>'
					);
				}

				startQuestions();
				addLinkToPlaceC(md, '"Let\'s discuss Adele"', 481, 'type=planadele');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "planadele") {
				// After, discuss Adele
				md = WritePlaceHeader();
				this.other = nTime;

				this.showPerson(this.isCharmedBy() ? "catherine6c.jpg" : "catherine6r.jpg");
				addPlaceTitle(md, "Now For Adele!");
				md.write(
					'<p>You start to redress, but Catherine makes no such move, just holding her breasts, clearly for your pleasure.</p>'
				);
				if (this.isCharmedBy()) {
					md.write(
						'<p>Catherine\'s eyes are closed, she seems to be concentrating on the feelings of the spell as it saturates her body, "Wow ' + perYou.getPersonName() + ' this magic is such a rush. Adele is going to love and hate this, she is a bit of the control freak, and she will hate becoming just a sextoy. She will love this feeling, she once told me she loved sex! It was nice to hear we had something in common!"</p>'
					);
				} else {
					md.write(
						'<p>Catherine is smiling at you, "' + perYou.getPersonName() + ', Adele is going to love and hate being your little harem-girl, you will have to use your magic on her. She is a bit of the control freak, and she will hate becoming just a sextoy. She will love the extreme aphrodisiac feeling, she one told me she loved sex! It was nice to hear we had something in common!"</p>'
					);
				}
				md.write(
					'<p>You explain that Adele had mentioned that she is protected from magic, probably some item descended from their ancestor Lady Elizabeth Ross. You think it is probably the earrings she was wearing but you cannot be sure. Catherine thinks for a moment,</p>' +
					'<p>"Probably, those earrings are very old, handed down the female line of our family. I think I can do something, there are some very similar ones we also have, I can swap them around and it should make her available to become your ' + (this.isCharmedBy() ? 'slave' : 'harem-slave') + '. It will take a while, at the very earliest tonight or tomorrow morning. I will give you a call when it is setup"</p>' +
					'<p>You ask Catherine about Amy, explaining it is more you are concerned if she is alright, and you immediately realise you should not of. It will just sound like you want to charm Amy as well...maybe you do but that is not what you meant. Catherine cautiously answers,</p>' +
					'<p>"She is tougher than you think. She is handling it well, but she did not return home. She is staying with a friend for now...friend, well sort of a friend...I would probably use a different word...Look once Adele is out of the way as such, I\'ll tell you more."</p>' +
					'<p>What was that? You thought you knew all of Amy\'s friends but it sounds complicated. You agree to leave the question of Amy alone for now, and ask Catherine to call you when things are ready for Adele.</p>' +
					'<p>She mentions she is going to go to a friend\'s place and return in the morning, she will work on Adele then as such!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "say goodbye for now", 481);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 69 || Place == 73) {
			var perPenelope = findPerson("Penelope");
			
			if (sType == "catherinebj") {
				// Blowjob/lick
				md = WritePlaceHeader();				
				s = (Place == 69 ? "nurse" : "adminoffice") + (this.isCharmedBy() ? "c" : "u");				
				if (perYou.isMaleSex()) {
					this.showPersonRandomRorX(s + "-sex-bjb", isExplicit() ? Place == 69 ? 3 : 3 : 1);
					addPlaceTitle(md, "Catherine");
					md.write('<p>Catherine');
					if (perPenelope.isHere()) md.write(' smiles at Penelope and');
					md.write(
						' kneels before you and undoes your pants. She strokes your cock to hardness and then gives you a very, very skilled blowjob.</p>'
					);

				} else {
					if (Place == 69) this.showPersonRandomRorX(s + "-sex-bjg", isExplicit() ? 3 : 1);
					else this.showPerson(s + "-sex-bjga.jpg");
					addPlaceTitle(md, "Catherine");
					md.write('<p>Catherine');
					if (perPenelope.isHere()) md.write(' smiles at Penelope and');					
					md.write(
						' gives you a kiss and she starts to remove your pants and panties. She kneels down and starts sucking and licking you. She is very skilled, she has received this many times before but clearly given this many times as well!'
					);
				}
				if (perPenelope.isHere()) md.write('<p>Penelope watches you and Catherine with some interest and arousal.</p>');
				startQuestions();
				addLinkToPlace(md, 'talk more to Catherine', Place);
				addLinkToPlace(md, 'leave the office', 78);
				if (perPenelope.isHere()) {
					AddPeopleColumnMed(md);
					perPenelope.showPerson("adminoffice-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "catherinefuck") {
				// fuck her
				s = (Place == 69 ? "nurse" : "adminoffice") + (this.isCharmedBy() ? "c" : "u");
				md = WritePlaceHeader();			
				if (perYou.isMaleSex()) {
					this.showPersonRandomRorX(s + "-sex-fuckb", isExplicit() ? Place == 69 ? 2 : 6 : 1);
					addPlaceTitle(md, "Catherine");
					md.write('<p>Catherine');
					if (perPenelope.isHere()) md.write(' smiles at Penelope and');	
					md.write(
						' she strips off her clothing and lies partly on one of the desks ready for you to fuck her.</p>'
					);

				} else {
					if (Place == 69) this.showPersonRandomRorX(s + "-sex-fuckg", 1);
					else this.showPerson(s + "-sex-fuckga.jpg");
					addPlaceTitle(md, "Catherine");
					md.write('<p>Catherine');
					if (perPenelope.isHere()) md.write(' smiles at Penelope and');						
					md.write(
						' she strips off her clothing and lies partly on one of the desks ready for you. You join her in a 69 position licking and being licked until you both orgasm.</p>'
					);
				}
				if (perPenelope.isHere()) md.write('<p>Penelope watches you and Catherine with some interest and arousal.</p>');
				startQuestions();
				if (this.isHere()) addLinkToPlace(md, 'talk more to Catherine', Place);
				else if (perPenelope.isHere()) addLinkToPlace(md, 'talk more to Penelope', Place);
				addLinkToPlace(md, 'leave the office', 78);
				if (perPenelope.isHere()) {
					AddPeopleColumnMed(md);
					perPenelope.showPerson("adminoffice-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "catherinetitfuck") {
				// tit-fuck her
				md = WritePlaceHeader();
				s = "adminoffice" + (this.isCharmedBy() ? "c" : "u");
				this.showPersonRandomRorX("adminoffice" + (this.isCharmedBy() ? "c" : "u") + '-sex-tf', isExplicit() ? 3 : 1);
				addPlaceTitle(md, "Catherine");
				md.write('<p>Catherine');
				if (perPenelope.isHere()) md.write(' smiles at Penelope and');	
				md.write(
					' kneels before you and undoes your pants and licks and sucks your cock to hardness. She slides your cock between her large breasts and you fuck Catherine\'s tits until you cum over her breasts.</p>'
				);

				if (perPenelope.isHere()) md.write('<p>Penelope watches you and Catherine with some interest and arousal.</p>');
				startQuestions();
				addLinkToPlace(md, 'talk more to Catherine', Place);
				addLinkToPlace(md, 'leave the office', 78);
				if (perPenelope.isHere()) {
					AddPeopleColumnMed(md);
					perPenelope.showPerson("adminoffice-watch.jpg");
				}
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "catherinepenelopethreesome") {
				// Threesome with Penelope
				md = WritePlaceHeader();
				if (isExplicit() && perYou.isMaleSex()) this.showPersonRandomX("catherinepenelope" + (this.isCharmedBy() ? "c" : "u") + 'b', 6);
				else this.showPersonBG("catherinepenelope.jpg")
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>You call on Catherine and Penelope to both tend to your administrative and sexual needs. Catherine says "Hell yeah", while Penelope '
				);
				if (perPenelope.isLover()) md.write('looks a little embarrassed but agrees');
				else md.write('meekly consents');
				md.write(
					'. Unsurprisingly Catherine takes the lead and largely directs Penelope as they attend to your and their needs and desires.</p>'
				);

				startQuestionsOnly();
				if (this.isHere()) addLinkToPlace(md, 'talk more to Catherine and Penelope', Place);
				else if (perPenelope.isHere()) addLinkToPlace(md, 'talk more to Penelope', Place);
				addLinkToPlace(md, 'leave the office', 78);
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "charmcatherinelater1") {
				// Charm 1
				md = WritePlaceHeader();
				this.showPerson("charm" + (Place == 69 ? "nurse" : "office") + "1.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You recite the spell and explain to Catherine that there is always an advantage to the spell, both in what you can learn from it, and that it protects her from others casting it on her themselves. She sighs,</p>' +
					'<p>"Wow ' + perYou.getPersonName() + ' that is one hell of a rush! Adele told me it was like a super aphrodisiac and she was not kidding!", as she talks she removes most of her underwear. You see her eyes start to change, taking on a greenish tint as she says, "So ' + perYou.getPersonName() + ' fuck me!"</p>' +
					'<p>Now it is how do you want to proceed, Catherine is a friend, she has always been a bit of a nymphomaniac, now a highly aroused nymphomaniac. It will be difficult to talk to her about much more than sex. You decide that just enslaving her just does not quite seem right, she is a friend, but she did show that image of her in bondage.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk about domination and submission', Place, 'type=charmcatherinelater2');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charmcatherinelater2") {
				// Charm 2
				md = WritePlaceHeader();
				this.showPerson("charm" + (Place == 69 ? "nurse" : "office") + "2.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You ask Catherine to talk about that bondage picture she sent and about embracing that sort of relationship with you,</p>' +
					'<p>"If that is the sort of games you want to play ' + perYou.getPersonName() + ' that is great with me, but variety is the spice of life. Fuck me in as many ways as you can, in as many places as you can!"</p>' +
					'<p>Well that sounds like the Catherine you have always known. As you consider, she takes out a few things from the table besides her bed, a ball-gag and a collar. She puts the collar on, and tells you,</p>' +
					'<p>"' + perYou.getMaster() + ', I am your slave to fuck whenever you want!", and with that she puts on the ball-gag and poses sexily for you!</p>' +
					'<p>Well, with that Catherine is your charmed slave, a perfectly willing slave and friend!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk to \'Charmed\' Catherine', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 438) return false;
		
		if (sType == "charmcatherinelater1") {
			// Charm 1
			md = WritePlaceHeader();
			this.showPerson("catherine-charmlater1.jpg");
			addPlaceTitle(md, "Catherine Under A Charm Spell");
			md.write(
				'<p>You recite the spell and explain to Catherine that there is always an advantage to the spell, both in what you can learn from it, and that it protects her from others casting it on her themselves. She sighs,</p>' +
				'<p>"Wow ' + perYou.getPersonName() + ' that is one hell of a rush! Adele told me it was like a super aphrodisiac and she was not kidding!", as she talks she removes most of her underwear. You see her eyes start to change, taking on a greenish tint as she says, "So ' + perYou.getPersonName() + ' fuck me!"</p>' +
				'<p>Now it is how do you want to proceed, Catherine is a friend, she has always been a bit of a nymphomaniac, now a highly aroused nymphomaniac. It will be difficult to talk to her about much more than sex. You decide that just enslaving her just does not quite seem right, she is a friend, but she did show that image of her in bondage.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk about domination and submission', Place, 'type=charmcatherinelater2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcatherinelater2") {
			// Charm 2
			md = WritePlaceHeader();
			this.showPerson("catherine-charmlater2.jpg");
			addPlaceTitle(md, "Catherine Under A Charm Spell");
			md.write(
				'<p>You ask Catherine to talk about that bondage picture she sent and about embracing that sort of relationship with you,</p>' +
				'<p>"If that is the sort of games you want to play ' + perYou.getPersonName() + ' that is great with me, but variety is the spice of life. Fuck me in as many ways as you can, in as many places as you can!"</p>' +
				'<p>Well that sounds like the Catherine you have always known. As you consider, she takes out a few things from the table besides her bed, a ball-gag and a collar. She puts the collar on, and tells you,</p>' +
				'<p>"' + perYou.getMaster() + ', I am your slave to fuck whenever you want!", and with that she puts on the ball-gag and poses sexily for you!</p>' +
				'<p>Well, with that Catherine is your charmed slave, a perfectly willing slave and friend!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk to \'Charmed\' Catherine', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "catherinebj") {
			// Blowjob/lick
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				if (isExplicit()) {
					this.showPersonRandomX("catherine-bedroom-sex-bjb", this.isCharmedBy() ? 5 : 4, '', '', '', '', this.isCharmedBy() ? 0 : 3);
				} else {
					md = WritePlaceHeader();
					this.showPerson((this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + "-sex-bjb.jpg");
				}
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine gives you a blowjob.</p>'
				);

			} else {
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-bjg", 2);
				else this.showPerson("catherine-bedroom-sex-bjg.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine licks you.</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "catherinefuck") {
			// fuck her
			md = WritePlaceHeader();			
			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-fuckb", this.isCharmedBy() ? 5 : 4);
				else this.showPerson("catherine-bedroom-sex-fuckb.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>You fuck Catherine.</p>'
				);

			} else {
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-fuckg", this.isCharmedBy() ? 2 : 1);
				else this.showPerson("catherine-bedroom-sex-fuckg.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine and you have a 69</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "catherinestraponfuck") {
			// strap-on fuck her
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-straponfuckg", this.isCharmedBy() ? 3 : 2);
			else this.showPerson("catherine-bedroom-sex-straponfuckg.jpg");
			addPlaceTitle(md, "Catherine");
			md.write(
				'<p>You fuck Catherine with your strap-on.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "catherinetitfuck") {
			// tit-fuck her
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-tf", this.isCharmedBy() ? 2 : 1);
			else this.showPerson((this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + "-sex-tf.jpg");
			addPlaceTitle(md, "Catherine");
			md.write(
				'<p>You fuck Catherine\'s tits.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
	
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img;
		if (this.isCharmedBy()) img = this.showPersonRandom("poledance", 2);
		else img = this.showPersonRandom("poledance", 2, '', '', '', '', 2);
		img = getImagePicked(img, "poledance");
		addPlaceTitle(md, "Catherine's Dance");
		md.write(
			'<p>You know Catherine is a regular in the Avernus club and when she arrives she spends a little while chatting with people and clearly turning down a few propostions. She waves and then leaves off stage to the changing rooms.</p>' +
			'<p>Catherine comes out on stage wearing '
		);
		if (this.isCharmedBy()) md.write('some exotic lingerie. She is looking happy and confident as she dances for you and everyone else. She is talented and really pleased to be performing!</p>');
		else if (img == "poledancec") md.write('a stylised construction uniform with a tight top as. She is looking happy and confident as she dances and strips for you and everyone else. She is talented and really pleased to be performing!</p>');
		else md.write('a stylised military uniform. She is looking happy and confident as she dances and strips for you and everyone else. She is talented and really pleased to be performing!</p>');
	
		md.write(
			'<p>After she sits with you for a while, chatting with other people here and there, but mostly with you. After a while she says,</p>' +
			'<p>There are private rooms available with a range of toys, ropes and many fun things. How about we have a play in one?"</p>'
		);
		startQuestions();
		if (this.checkFlag(19) && !this.checkFlag(18) && isCharmedBy("MrsGranger") && wherePerson("MrsGranger") == 177) addLinkToPlaceC(md, 'play with Catherine', 282, 'type=catherinegrangeravernus');
		else addLinkToPlaceC(md, 'play with Catherine', Place, 'type=catherineavernus');
		addLinkToPlaceC(md, 'tell her not tonight and part ways', 281, '', 'Catherine says she will stay for a while, and you decide to leave her for now');
		WritePlaceFooter(md);
	};

	per.passTimeDay = function() {
		if (this.checkFlag(4) && !this.checkFlag(5)) this.setFlag(6);
		if (this.checkFlag(22) && !this.checkFlag(23)) this.setFlag(23);
		if (this.place == 999 || this.place == 177) this.place = 436;
		return '';
	};
	
	per.passTimeNight = function() {
		if (this.place == 998) this.place = 0;
		return '';
	};	
	
	per.passTimeHour = function(hr)
	{
		if (Place == 73 || Place == 69) {
			if (this.hasLeft()) {
				return this.addPersonFace() + "Catherine notices the time and says she is done with work for today and waves goodbye!";
			}
		}
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 436 && this.isHere() && checkPersonFlag("AdeleRoss", 6) && sType === "") {
			if (wherePerson("AdeleRoss") == 436) md.write('<p>Catherine has joined Adele in the living room' + addVisible(' to greet you') + '.</p>');
			else md.write('<p>Catherine is in the living room' + addVisible(' to greet you') + '.</p>');
		}
		if (Place == 69 && this.isHere()) md.write('<p>Catherine is here, ready to give you a checkup.</p>');
		else if (Place == 73 && this.isHere()) {
			md.write(
				'<p>Catherine is working here in the administration office at the moment and she smiles at you as you enter, "Hi ' + perYou.getPersonName() + ' are you here to rescue me from all this work?"</p>'
			);
		}
	};

	per.showPersonChat = function(md)
	{
		if (!this.isHere() || sType !== "") return;
		
		if (this.place == 999 || this.place == 998 || Place == 177) return;
		
		if (checkPersonFlag("DoctorKay", 1) && !checkPersonFlag("DoctorKay", 2)) {
			addQuestionR(md, 'ask Catherine about the Nurse you saw at school',
				'You ask Catherine about the nurse you saw at school,</p>' +
				'<p>&quot;Yes, Tina is a friend of mine from a club we both hang-out at, she is a doctor at the hospital but she works limited hours there. As a favour I asked if she could handle my shifts as the school nurse until that slime is dealt with&quot;</p>' +
				(!isPlaceKnown("NursesOffice") ? '<p>You have almost never been to the Nurses Office at school and ask Catherine where it is again, and she shakes her head in frustration at your idiocy and gives you directions.' : ''),
				"Catherine",
				((Place == 73 && isPersonHere("Penelope")) || Place == 436 ? "bChatLeft=false;" : "") + "setPlaceKnown(\\'NursesOffice\\',false);setPersonFlag(\\'DoctorKay\\',2)"
			);
		}			

		if (!this.checkFlag(11) && perBeasley.checkFlag(3)) {
			addQuestionR(md, 'ask Catherine about Amy',
				'You ask Catherine about where is Amy? Catherine answers,</p>' +
				'<p>&quot;When we came home after..that slime Beasley..she grabbed a bag and immediately left. She refused to talk about what happened. I am fairly sure she went to stay with someone but I do not know who. She is refusing to take my phone calls. I think she blames me, thinking I was angling for a threesome or something, never with <i>him</i>, she should have known that!&quot;</p>' +
				'<p>She is clearly hurt and worried about Amy but there is nothing more you can ask really.</p>',
				"Catherine",
				((Place == 73 && isPersonHere("Penelope")) || Place == 436 ? "bChatLeft=false;" : "") + "setPersonFlag(\\'Catherine\\',11)"
			);
		}
		if (perGates.checkFlag(6) && !isPlaceKnown("AvernusClub")) {
			addQuestionR(md, '"Catherine, is there a gentleman\'s club in Glenvale?"',
				'You ask Catherine about the gentleman\'s club you were told about, if anyone knows Catherine has to. Catherine answers,</p>' +
				'<p>"Of course, I have attended a number of BDSM parties there. That image I accidentally sent you was sort of related. Take care, some of the Mistresses play rough!"</p>' +
				'<p>She gives you directions to the club, it is located in a side street off the shopping center. The club is open late at night until the early hours and is by invitation only. She quickly makes a phone call, and tells you,</p>' +
				'<p>"All set, you are now my personal guest for the club, you can visit any time you want"',
				"Catherine",
				((Place == 73 && isPersonHere("Penelope")) || Place == 436 ? "bChatLeft=false;" : "") + "setPlaceKnown(\\'AvernusClub\\',false)"
			);
		}
		
		if (isSpellKnown("Transform") && !this.checkFlag(21) && this.checkFlag(5)) {
			addPopupLink(md, 'tell Catherine you have an idea for Mr. Beasley', 'Idea for Catherine\'s Revenge',
				addImageString("transform.jpg", "height:max%", "right", undefined, undefined, undefined, "noall") +
				'You tell Catherine about the transform spell and how you can use it on Mr. Beasley and use it to punish him. The exact effect is uncertain and seems to depend on the attitude of the caster. She looks unsure,</p>' +
				'<p>"It had better really mess him around so he can never do what he did again!" She is quite angry, and you try to calm her down and tell her when you are ready you will call her to participate and help guide the spell. You are not really sure if this can work but you still tell Catherine this!</p>' +
				'<p>She looks a bit reassured and you promise to <b>call her</b> once you are ready to cast the spell on him.',
				true,	"setPersonFlag('Catherine', 21);dispPlace();"
			)
		}
		
		if (Place == 73 && this.checkFlag(5)) {
			// Admin office and have an agreement/charmed
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'have sex with Catherine', Place, 'type=catherinefuck');
				addLinkToPlace(md, 'have Catherine give you a blowjob', Place, 'type=catherinebj');
				addLinkToPlace(md, 'get a tit-fuck from Catherine', Place, 'type=catherinetitfuck');
			} else {
				addLinkToPlaceO(md, 'ask Catherine to lick you', Place, 'type=catherinebj');
				addLinkToPlace(md, 'have a 69 with Catherine', Place, 'type=catherinefuck');
			}
			if (isPersonHere("Penelope")) addLinkToPlace(md, 'ask Catherine and Penelope for some attention', Place, 'type=catherinepenelopethreesome');
		}
		
		if (Place == 69 && this.checkFlag(5)) {
			// Nurses office and have an agreement/charmed
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'have sex with her', Place, 'type=catherinefuck');
				addLinkToPlace(md, 'have her give you a blowjob', Place, 'type=catherinebj');
			} else {
				addLinkToPlaceO(md, 'ask her to lick you', Place, 'type=catherinebj');
				addLinkToPlace(md, 'lick each other', Place, 'type=catherinefuck');
			}			
		}		
		
		if (Place != 438) return;
		
		if (!checkPersonFlag("AdeleRoss", 6)) return;
		
		if (this.checkFlag(15)) {
			var ex = isExplicit() && Math.random() < 0.6;
			var img = (ex ? "Explicit/" : "") + "catherine-video" + Math.ceil(Math.random() * (ex ? 15 : 3)) + ".gif";
			addWatchTVLink(md, "watch one of Catherine\'s videos", "Catherine\'s Video",
				(img.indexOf("video4") != -1 || img.indexOf("video5") != -1 || img.indexOf("video6") != -1 ? 'You watch a scene of one of Catherine\'s videos, a threesome scene, but the other woman is very familiar, you could swear she is Mrs. Granger? You ask Catherine and she says</p>' +
														 '<p>"You mean Kate Granger\'s mother? Well she did not use that name when we shot this video, but then again I used a different name too!"'
									  : 'You watch one of Catherine\'s videos, she certainly did a wide range of different scenes, but we are talking here about Catherine!'),
				this.getImg(img)
			);
		}
		
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'have sex with her', 438, 'type=catherinefuck');
			addLinkToPlace(md, 'have her give you a blowjob', 438, 'type=catherinebj');
			addLinkToPlace(md, 'get a tit-fuck', 438, 'type=catherinetitfuck');
		} else {
			addLinkToPlaceO(md, 'ask her to lick you', 438, 'type=catherinebj');
			addLinkToPlace(md, 'lick each other', 438, 'type=catherinefuck');
			if (perYou.FindItem(45) > 0) addLinkToPlace(md, 'fuck her with your strap-on', 438, 'type=catherinestraponfuck');
		}
		
		if (getCharmedLevel("AdeleRoss") == 4 && wherePerson("AdeleRoss") == 436) addLinkToPlace(md, 'call for Adele to join you', 438, 'type=catherineadelethreesome1');
		
		this.addDancingLink(md, 'talk to Catherine about dancing in the club',
			'You ask Catherine about dancing at the Avernus club and she quickly answers,</p>' +
			'<p>&quot;I have before and I will again, so definitely ' + this.getYourNameFor() + '!&quot; and with that you call Jade to arrange a dance for Catherine. Jade welcomes Catherine to dance anytime.',
			false
		);	
		this.addSleepLink(md, "sleep with Catherine", "Sleeping with Catherine",
			'<p style="position:absolute;left:25%;top:5%;cursor:pointer;font-size:1.1em;width:40%"><b>You talk to Catherine about sleeping with her, and you mean sleeping, not having sex, well not <i>only</i> having sex.</b>',
			(this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + '-sleep.jpg', true
		);

	};

	// Cast a spell/use an item
	per.handleItem = function(no, cmd)
	{
		if (cmd != 2) return "";

		if (no == 14) {
			// Casting the charm spell
			// During her quickie event
			if (sType == 'catherinebusy') {
				addComments("There are too many people here and the spell will not work on any one person here.");
				return "handled";
			}
			if (Place == 73 && this.isHere()) {
				if (!this.checkFlag(5)) {
					addComments(
						'Catherine is a very good friend and it would likely alter her behaviour and attitude, would she still be the friend you know and trust?</p>' +
						'<p>Despite this you try the spell, but aside from Catherine glancing at you curiously nothing happens. This work environment must take some concentration and effort for her and it seems to prevent the spell working. You will have to try somewhere else.'
					);
					return "refresh";		// Ignore any standard action otherwise
				}
				CastCharmSpell("Catherine", 73, 1, 'type=charmcatherinelater1');
				return "handled";					
			}
			if (Place == 69 && this.isHere()) {
				if (!this.checkFlag(5)) {
					addComments(
						'Catherine is a very good friend and it would likely alter her behaviour and attitude, would she still be the friend you know and trust?</p>.' +
						'<p>Despite this you try the spell, but aside from Catherine glancing at you curiously nothing happens. This work environment must take some concentration and effort for her and it seems to prevent the spell working. You will have to try somewhere else.'
					);
					return "refresh";		// Ignore any standard action otherwise
				}
				CastCharmSpell("Catherine", 69, 1, 'type=charmcatherinelater1');
				return "handled";				
			}			
			if (Place == 481) {
				if (sType == "catherinehere") {
					CastCharmSpell("Catherine", 481, 1, 'type=charmcatherine1');
					return "handled";
				}
				if (sType == 'reward1' || sType == 'reward2' || sType == 'reward3' || sType == 'planadele') {
					if (!this.isCharmedBy()) addComments("Change your mind? Well, maybe, but how about another time?");
					else addComments("Catherine is already charmed!");
					return "handled";
				}
			} else if (Place == 438) {
				CastCharmSpell("Catherine", Place, 1, 'type=charmcatherinelater1', '', '', this.checkFlag(13));
				return "handled";
			} else if (Place == 436 && !this.isCharmedBy()) {
				addComments("It would be better to do this in the privacy of her bedroom");
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isKnowPhoneNumber = function() { return true; };

	per.isPhoneable = function(msg) {
		// Can you call them?
		if (sType == "meeting" && Place == 481) return true;
		if (!this.checkFlag(5)) return false;
		if (msg === true) return true;
		if (Place == 11 && this.checkFlag(21) && perBeasley.isHere() && CastTransform(1, true, !perBeasley.isMan()) && perBeasley.isCharmedBy()) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;
		return false;
	};

	per.callThem = function() {
		if (Place == 11 && this.checkFlag(21) && perBeasley.isHere() && perBeasley.isCharmedBy()) {
			if (!CastTransform(1, true, !this.isMan())) WriteComments('You go to call Catherine to do the transform process but you realise you cannot do the spell yet.');
			else if (!perYou.checkFlag(25)) WriteComments('You go to call Catherine to do the transform process but you feel there is something you need to sort out with Mr. Beasley before doing this..');
			else if (this.hoursSince(this.extra[1]) < 24) WriteComments("You think it best to not bother Catherine again today, if you want to use the transform spell again try again tomorrow");
			else {
				gotoPlace(Place, 'type=catherinesrevengephone');
				receiveCall('', 'You call Catherine and tell her you are ready for her revenge on Mr. Beasley. She says she will be there as quickly as she can!');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		} else if (isAtLocation(282)) this.addDancingCall();
		else if (sType == "meeting" && Place == 481) {
			gotoPlace(481, 'type=catherinehere');
			receiveCall('',
				'You call Catherine, and she immediately picks up,<br><br>' +
				'"Hi ' + perYou.getPersonName() + ', count to three and turn around!" and she hangs up.'
			);
			WriteCommentsFooter(bChat, bChatLeft);
		} else {
			if (!isDay()) WriteComments('You call Catherine to invite her to join you at the pool for a swim, and she answers enthusiastically, "I\'d love to, but how about in the daytime so I get get some sun as well?" You have no problems and agree to do this another time.');
			else {
				gotoPlace(Place, 'type=catherinepool');
				receiveCall('', 'You call Catherine to invite her to join you at the pool for a swim, and she answers enthusiastically, "I thought you\'d never ask!" and she says she will be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (this.checkFlag(2) && getHour() > 19 && !this.checkFlag(14)) {
			// SMS 1, after 10pm the night after meeting her
			if (this.makeCall(true, 160)) this.setFlag(14);
		}
		if (Place != 436 && checkPersonFlag("AdeleRoss", 5) && !this.checkFlag(4)) {
			// Phone call after meeting Adele and her rescue
			var sSor = (perYou.isMan() ? 'sorcerer' : 'sorceress');
			if (this.makeCall(false, "",
					'The call is from Catherine\'s number! You answer the call and yes, it is her,<br><br>' +
					'<b>Catherine</b><br>' +
					'"Hey there ' + perYou.getPersonName() + ' I heard you talking to Adele, she wouldn\'t let me see you. She is being an overprotective older sister, except I am the oldest. She thinks I am some sort of irresponsible slut...and I can be.<br><br>' +
					'And if you listen to her, you are some sort of figure from the old days of Kurndorf\'s coven, an evil ' + sSor + ' bent on sex and domination! ' +
					'Well so am I, well not the ' + sSor + ' part, but I do like either submission or domination, the whole range of the B and D and S and M. I just sent you an image to demonstrate and you got that one before!<br><br>' +
					'Look, I don\'t care, you are a friend and I have to properly thank you. Meet me tomorrow midday, I should be able to get away from Adele then. You know that road-works that leads off Yoolaroo Dr and runs along side the park? Take the access road for trucks off Yoolaroo, you might have to climb a fence or something.<br><br>' +
					'Take care and look forward to me" With that she hangs up.'))
			{
				this.setFlag(4);
				addSMS(161, true);
				setPlaceKnown("ConstructionSite");
				setTimeout("usePhone('sms')", 10);
				return true;
			}
		}
		if (this.checkFlag(6) && getHour() > 12 && !this.checkFlag(5)) {
			// Missed her
			if (this.makeCall(true, this.checkFlag(7) ? 163 : 162))	 {
				this.setFlag(6, false);
				if (this.checkFlag(7)) this.setFlag(8);
				else this.setFlag(7);
			}
		}
		if (this.checkFlag(5) && !this.checkFlag(10) && getHour() < 10 && this.hoursSince() > 24) {
			// Phone call after plotting to get Adele
			if (this.makeCall(true, this.isCharmedBy() ? 164 : 165)) this.setFlag(10);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 160) {
			// SMS 1
			return receiveSMS('Catherine', 'I gasp as you grab my hair and force your cock into my slutty mouth, lewdly smacking my lips and  sucking you off.<br><br>' +
													 '“Fuck me, sir!” I beg. “Fuck my throat and slap me like the slut I am!”', 'catherinesms1.jpg') +
				replyToSMS('WTF? O_O') +
				receiveSMS('Catherine', 'Shit! That wasn\'t meant for you!') +
				replyToSMS('You don\'t say') +
				receiveSMS('Catherine', 'You can keep the pic. And if you don\'t show it around I might have another later. ;)');
		}
		if (id == 161) return receiveSMS('Catherine', 'A bit of fun', 'catherinesms2.jpg');
		if (id == 162) return receiveSMS('Catherine', 'I missed you, I gotta leave or Adele will get suspicious. See what you missed!', 'catherinesms3.jpg');
		if (id == 163) return receiveSMS('Catherine', 'I missed you again, Not sure how many more times we can do this before she stops me. You are really missing out!!', 'catherinesms4.jpg');
		if (id == 164) return receiveSMS('Catherine', 'It is done', 'catherinesms4c.jpg');
		if (id == 165) return receiveSMS('Catherine', 'It is done', 'catherinesms4r.jpg');
		if (id == 167) return receiveSMS('Catherine', perYou.getPersonName() + ' found something, not an item but Adele talked about self-hypnosis. Could you turn that against her?', 'catherinesms5.jpg');
		return '';
	};

}
