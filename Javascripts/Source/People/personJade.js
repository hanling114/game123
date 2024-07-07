/**********************************************
Jade, Demonologist
***********************************************/
var perJade;

function getAnyClubManager()
{
	// Only called if there actually is a manager
	if (checkPersonFlag("Seraphina", 14)) return per;
	if (checkPersonFlag("Betty", 4)) return per;
	if (checkPersonFlag("MrsRobbins", 7)) return per;
	if (checkPersonFlag("Nella", 16)) return per;

	return perJade;
}

function getClubManagersTotal()
{
	if (perJade.getCharmedLevel() < 4) return 1;

	// Slave or Ghoul, so not managing the club
	var tot = 0;
	if (checkPersonFlag("Seraphina", 14)) tot++;
	if (checkPersonFlag("MrsRobbins", 7)) tot++;
	if (checkPersonFlag("Nella", 16)) tot++;
	if (checkPersonFlag("Betty", 4)) tot++;
	return tot;
}

function getClubManager()
{
	if (perJade.getCharmedLevel() < 4) return perJade;
	
	// Jade is a Slave or Ghoul, so not managing the club
	var cm = getClubManagersTotal();				// can be 0 or more
	if (cm === 0) return null;						// No one is managing
	if (cm == 1) return getAnyClubManager();	// Only 1 just get any one assigned as a manager
	
	// Build a schedule for assigned people
	var di = getDayNo();								// Day of the week, 0 = Monday, 5 = Saturday
	// Nella handles the weekend if someone else is managing as well
	if (checkPersonFlag("Nella", 16)) {
		// She is managing so handles the weekend
		if (di > 4) return per;
		if (cm == 2) return getAnyClubManager();		// weekdaysk return the other person (Nella is last so will not be returned here)
		if (checkPersonFlag("MrsRobbins", 7)) {
			// Geraldine is assigned, only works Thur-Fri here
			if (di > 2) return per;
			return getAnyClubManager();
		}
		if (di > 2) return findPerson("Seraphina");
		return findPerson("Betty");
	} 
	
	// Nella not working
	if (checkPersonFlag("MrsRobbins", 7)) {
		// Geraldine is assigned, only works Thur-Fri here
		if (di > 2) return per;
		if (cm == 2) getAnyClubManager();
	}
	if (di > 4) return findPerson("Seraphina"); 
	return findPerson("Betty");
}

// Conversation responses
function RepliesJade(nR)
{
	var ret = true;
	var myName = perYou.getPersonName();
	
	if (nR == 666)
	{
		addComments(
			'"' + myName + '  do not consort with demons, you have neither the skill or training. No matter how beautiful they may be, they seek to enslave and little else. While I can work out bargains with them the cost can be very high."</p>' +
			'<p>She hesitates, "The warlock Kurndorf dealt with them but he has no compassion and would give any sacrifice for his deals"</p>' +
			'<p>You mention her calling for you,</p>' +
			'<p>"Those with magic, be they warlock, sorcerer, witch or whatever name you wish, are a great prize for demons. Refuse any offer they make, there is little way for you to safely deal with them!"</p>'
		);
		this.setFlag(6);
	}
	else if (nR == 667)
	{
		addComments(
			'You tell Jade vaguely about a demon called Elian and mention something about a dream, unwilling to explain everything,</p>' +
			'"' + myName + ', names are very important in the occult world. Names are power, true-names absolute power. Demons can tell you a part of their name, as a magical link. Never say the name, never use it when you cast a spell, if you do you give <i>them</i> power over you.</p>' +
			'<p>You ask if there is any protection or some way to still use magic but limit their power. She looks at you piercingly,</p>' +
			'<p>"Really, this succubus must have a considerable pull, but then again this is the way of those dream-demons. If you <b>must</b> try using her name reversed in the spell. It is still enough to allow some effect, but will restrict her power. You will still need other protections, but I will not help you there. If you are fool enough to respond to a summoning then figure out yourself what you need."'			
		);
		this.setFlag(7);
	}
	else if (nR == 668)
	{
		addComments(
			'"' + myName + ', there are ways but are very difficult and require rare insight into demons and how they possess people. I am not foolish enough to do demonic possessions, unlike you". You try to argue that it was not you who did it, but she dismisses you and continues speaking over you,.</p>' +
			'<p>"You need someone who has had first hand experience or is an idiot who dabbles in demonic possessions."</p>'
		);
		this.setFlag(8);
	}
	else if (nR == 669)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			perYourBody.PutItem(5); //Give you a stone
			this.setFlag(9); // Got it
			addComments(
				'<p>She steps over and picks it up, she weighs it in her hand and tosses it to you,</p>' +
				'<p>"I know of these, they are useless to me, have it ' + myName + '"'
			);
		} else addComments("You reconsider, you can barely carry the items you have now. You will ask her another time");
	}
	else if (nR == 670)
	{
		addComments(
			'"' + myName + ',  I have a full set of dancers for the club, but we can always fit in a \'special\' dancer, midnight seems an appropriate time for a person like you, or your \'friends\'. One person a night, just let me know in advance by phone. After the performance visit me for the performance fee, the dancer will keep any tips they earn of course."</p>' +
			'<p>Tonight we are full, but any other night I can schedule a dancer for you...or you can dance.'
		);
		this.other = 'done';
		this.setFlag(10);
	}
	else if (nR == 671)
	{
		addComments(
			'Jade hands over ' + sCurrency + this.extra[0] + ' with a smirk.</p>'
		);
		AddCash(this.extra[0]);
		this.extra[0] = 0;
	}
	else if (nR == 672)
	{
		addComments(
			'You ask if Jade knows Rachael, and for a moment she looks puzzled. She then says,</p>' +
			'<p>"You mean that one you have been having a drink with recently? I doubt her name is Rachael, it is a bit too...human"</p>' +
			'<p>Human? You ask her to explain more. She shakes her head,</p>' +
			'<p>"Once again you are consorting with things beyond your knowledge or power to control. I do not know her name, but I would guess a part of it is \'Elian\'. She is undoubtably the demon who called to you, now hunting your body and soul."</p>' +
			'<p>You ask what can you do, and she again shakes her head,</p>' +
			'<p>"Why do I care, you have little to offer now and without more of her name you are limited in what is possible. Take care around her, do not lose your soul!"</p>'
		);
		setPersonFlag("Elian", 9);
	}
	else if (nR == 673)
	{
		addComments(
			'You ask about binding demons, if you should know their complete, true name. She looks at you,</p>' +
			'<p>"Really, are you going to go the path of Kurndorf and wield the power of demons. Are you willing to make the sacrifices to learn the name and then to accept their nature?"</p>' +
			'<p>You hesitate, you certainly do not want to become another Kurndorf and have his fate, and you state that. Jade shakes her head,</p>' +
			'<p>"Demons are not human, do not expect one to become a cute "demon-girl" girlfriend, no matter how pretty and blonde they are. Their nature is torment, to punish, to spread chaos"</p>' +
			'<p>You are not sure this all applies to Elian but then again how much do you know about her. Still you want to know how to proceed and ask again. Jade answers simply,</p>' +
			'<p>"This a best done is a place of magical power, and have a large mirror to view their true nature. Invoke their true name and tell them the terms of your contract. What services you want, restrictions on them. They will tell you a price. Agree and it is done"</p> ' +
			'<p>Jade then tells you to leave her'
		);
		Place = 282;
		setPersonFlag("Elian", 26);
	}	
	else if (nR == 674)
	{
		addComments(
			'You tell Jade about the Ritual of Return and that you hope you can use it to save Seraphina. She looks at you skeptically,</p>' +
			'<p>"' + myName + ', I do not think this is possible for <b>anyone</b> and the longer they are thralls the less there might be to restore." She shakes her head and continues,</p>' +
			'<p>"Alright you may try but as in all things there is a price. The thrall is a dancer and a popular one, you will have to provide me other dancers <b>for free</b>. If you do this I will agree. Send me one as a start and the deal is done.".'
		);
		this.setFlag(10);
		this.setFlag(13);
		setPersonFlag('Seraphina', 6);
		setPersonFlag('Seraphina', 7);
		setPersonFlag('Seraphina', 8);
	}
	else if (nR == 676)
	{
		addComments(
			'You tell Jade that the demon is gone, left the town and how you feel responsible for Seraphina. She looks at you skeptically,</p>' +
			'<p>"' + myName + ', I doubt I think it more likely you want a demonic thrall sex slave" She shakes her head and continues,</p>' +
			'<p>"Alright, but as in all things there is a price. The thrall is a dancer and a popular one, you will have to provide me other dancers <b>for free</b>. If you do this I will agree. Send me one as a start and the deal is done.".'
		);
		this.setFlag(10);
		this.setFlag(13);
		this.extra[0] = 0;
		setPersonFlag('Seraphina', 6);
		setPersonFlag('Seraphina', 7);
		setPersonFlag('Seraphina', 8);
	}
	else if (nR == 675)
	{
		addComments(
			'You tell Jade about the dance and tell her you have fulfilled your part of the deal for Seraphina. She nods,</p>' +
			'<p>"' + myName + ', a deal is a deal, take her whenever you want." she pauses,</p>' +
			'<p>"Do not expect her to meekly follow you, I cannot give you any control over her. Thralls obey their Master or Mistress, and no one else"</p>' +
			'<p>You ask her how she controlled Seraphina and Jade replies dismissively "In ways I will not teach you, I will not help you walk the path of Kurndorf"'
		);
		if (isDemonBound()) {
			addComments(
				'<p>She pauses and continues, "The ritual you mentioned is impossible I am sure. A demon would never give the correct details, so if you bargained for it they lied and it is a trap. No one else has the knowledge"</p>' +
				'<p>You smile, as an ex-demon Ms. Jones told you the details, she has the insight from her possession and is <i>yours</i> so you can trust her instructions. You wonder if you can use this somehow both to free Seraphina and also to teach Jade a lesson!</p>'
			);
			if (this.checkFlag(17) && perYou.checkFlag(68)) addComments('<p>It crosses your mind about how the charm spell <b>almost</b> worked in the gym, and that you know spells are stronger when cast in a place of power. Maybe you could invite her to watch the Ritual?</p>');
			else if (this.checkFlag(17)) addComments('<p>It crosses your mind about how the charm spell <b>almost</b> worked in the gym, if only you could strengthen the spell then you could invite her to the Ritual....</p>');
		}
		this.setFlag(12);
		setPersonFlag("Seraphina", 9);
	}
	else if (nR == 680)
	{
		addComments(
			'You ask Jade about her protections, "' + myName + ' these are complicated, I was able to come to a deal with a demon, a very specific deal for a very specific price. I cannot give more details without breaking the pact and that would be <b>bad</b> but the exact wording I now realise was not precise enough, it mainly referred to protecting me <b>here</b>"</p>' +
			'<p>You try to ask about the price but she refuses saying she cannot again, but blood was involved, not mortally so!'
		);
		this.setFlag(33);
	}
	else if (nR == 681)
	{
		addComments(
			'You ask Jade more about Kurndorf, "This is a difficult topic, he is a demonologist too, but one with no morals or compassion. He has exploited the \'Hellgate\' and the <i>thin place</i> to his own ruination and death"'
		);
		this.setFlag(34);
	}	
	else if (nR == 682)
	{
		addComments(
			'You ask Jade about the thin place, "The ancients have long talked about these places, the old Celts talked of them as a way to enter the lands of the faerie folk, the Sidhe, but many other beings can also cross into our world though them. These seem to be natural, but vary in strength by time of the year and other events, Halloween or Samhain is a particularly <b>open</b> time."'
		);
		this.setFlag(35);
	}	
	else if (nR == 683)
	{
		addComments(
			'You ask Jade more about the Hellgate, "A portal that allows easy access to demons and their realm. It attracts people like Kurndorf and myself but it is something that should never stay open for long, but it has now been open much much too long"'
		);
		this.setFlag(36);
	}	
	return ret;
}

function initialiseJade()
{
	// Jade
	perJade = addPerson("Jade", 280, "Jade", '', false);
	per.Replies = RepliesJade;
	per.other = '';		// Current dancer
	
	perJade.isClubOpen = function(desc, nm) {
		if (nm === true) return isShopOpen(-2, -2, true, true);
		if (desc !== undefined) return "10pm to late";
		if (isShopOpen(-2, -2, true, true)) {
			if (this.checkFlag(26) && !this.checkFlag(20)) return false;
			return true;
		}
		return false;
	};
	per.getDancer = function() { return this.other + ''; };
	per.setDancer = function(s) { this.other = s + ''; };
	per.isDanceAvailable = function() {
		if (getClubManagersTotal() < 1) return false;
		return this.checkFlag(10) && this.other === '';
	};
	
	per.isGhoul = function() { return this.isCharmedBy("Vampyre"); };

	per.getYourNameFor = function() {
		if (this.getCharmedLevel() == 4) return perYou.getMaster();
		if (this.isLover()) return perYou.getPersonName();
		return this.checkFlag(4) ? '<i>' + perYou.getMaster() + '</i> ' + perYou.getPersonName() : perYou.getPersonName() ;
	};
	
	per.getPersonName = function(full) {
		if (this.getCharmedLevel() == 4) return (full !== true && this.sCharmedBy == "You" ? "Slave " : "") + "Jade";
		if (this.isGhoul()) return "Ghoul Jade";
		return "Jade";
	};
	
	per.getPersonAddress = function(n) { return this.checkFlag(1) ? n === true ? 280 : 'Avernus Club, Glenvale Shopping Center' : n === true ? 0 : ''; };
	
	per.getPossessionFace = function() {
		return this.isGhoul() ? "faceg" : this.isCharmedBy() ? "facec" : "faceu";
	};
	
	per.getModels = function() { return "JadeTiger|Jade Tiger,Aiden|Aiden Starr"; };
	
	per.isLover = function(unc) {
		if (unc === true) return this.checkFlag(24);
		if (unc === false) return this.getCharmedLevel() == 3;
		return this.checkFlag(24) || this.getCharmedLevel() == 3;
	};

	per.whereNow = function()
	{
		if (this.isGhoul()) return 247;
		if ((Place == 53 || Place == 141) && sWho == "jade") return Place;
		if (this.checkFlag(16) && (!this.isCharmedBy() || this.isLover())) {
			if (getHour() >= 18 && getHour() < 21) return 435;
		}
		return this.place;
	};

	per.passTimeDay = function() {
		// Can visit
		this.setFlag(3, false);
		// Reset dancer
		this.other = '';
		if (!this.checkFlag(18) && (this.getCharmedLevel() == 4 || this.isGhoul()) && !this.checkFlag(26)) this.setFlag(26);
		else if (this.checkFlag(19) && !this.checkFlag(20)) {
			if (getClubManagersTotal() > 0) this.setFlag(20);
		}
		this.setFlag(27, false);
		return '';
	};
	
	per.passTimeMidnight = function() {
		if (this.other !== '' && this.other != 'done') {
			if (this.checkFlag(13)) {
				if (!this.checkFlag(12)) this.extra[0] += -20;
				else this.extra[0] = 0;
			} else this.extra[0] += 20;
			this.other = 'done';
		}
		return '';
	};
		
	// Events for Jade
	per.addPlaceImageLeft = function(lit, other)
	{
		if (Place == 280 && this.isHere() && sType === "") {
			if (this.isLover(false)) return this.showPerson("rooml.jpg", '', '', '', '', false, "string");
			if (this.isLover(true)) return this.showPerson("roomul.jpg", '', '', '', '', false, "string");
			if (!this.isCharmedBy()) return this.showPerson("roomu.jpg", '', '', '', '', false, "string");
		}
		if (Place == 247 && this.isHere() && sType === "") return this.showPerson("ghoul.jpg", findPerson("Gabby").isHere() ? "46%;margin-left:2%" : "", 'left', '', '', false, "string");
		if (Place == 435 && this.isHere() && other !== true && sType === "") return this.showPersonRandom("gym" + (this.isCharmedBy() ? "c" : this.isLover(true) ? "ul" : "u"), this.isCharmedBy() ? 1 : (this.isLover(true) ? 1 : 2), "", '', '', '', 0, false, "string");
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		if (Place == 280 && this.isHere() && sType === "" && this.getCharmedLevel() == 4) return true;
		if (Place == 435 && this.isHere() && gameState.sIsHere.split("jade").join("") !== "" && sType === "") return true;
		if ((Place == 53 || Place == 141) && this.isHere()) return true;
		return false;
	};
	
	per.showPlaceImageRight = function(md)
	{
		if (Place == 280) {
			console.log("rooms");
			this.showPerson("rooms.jpg");
		}
		else if (Place == 435) this.showPersonRandom("gym" + (this.isCharmedBy() ? "c" : "u"), this.isCharmedBy() ? 1 : 2, "", '', '', '', 0, false, md);
		else if (Place == 53) this.showPerson("hidden1.jpg", "", '', '', '', false, md);
		else if (Place == 141) this.showPerson("sacred1.jpg", "", '', '', '', false, md);
	};
		
	per.showEventPopup = function()
	{
		// Meet Lilith
		if (Place == 280 && nFromPlace != 280 && isPersonHere("Vampyre") && per.place == -1 && sType === "" && this.checkFlag(1) && !this.checkFlag(14)) {
			this.setFlag(14);
			showPopupWindow("Jade and Lilith",
				this.addPersonString("meeting.jpg", "30%", "right") +
				'You notice Jade looking oddly at Lilith, and you see her pick up a crystal off a table and look through it at Lilith. She shakes her head, and you ask if there is a problem?</p>' +
				'<p>"No, it is just a feeling. Nothing demonic can enter this place but I thought I felt something odd from your companion." She looks expectantly at Lilith, probably hoping for her to explain in some way, but as usual Lilith says nothing and just looks back at her menacingly.</p>' +
				'<p>Jade seems to take this as a challenge and stands and picks up a whip. You decide you have to intervene and step between them and address Jade,</p>' +
				'<p>"My companion is my business, as is anything of her nature or is carrying. She is not a <b>demon</b> shall we leave it there?"</p>' +
				'<p>Lilith does not move or change her expression, but Jade lowers her whip, and just replies, "All right, that is enough for <b>now</b>"</p>' +
				'<p>While she is not showing <i>much</i> you do think Lilith is troubled by this room, but certainly not of Jade herself!</p>'
			);
			return true;			
		}
		
		if (Place == 280 && this.isLover(true) && sType === "" && this.isHere() && !this.checkFlag(25)) {
			this.setFlag(25);
			showPopupWindow("Jade's New Terms",
				this.addPersonString("terms.jpg", "30%", "right") +
				'You see Jade is dressed a bit differently than usual, more \'casual\' you think, or at least less worn. She looks at you again with a hint of a smile,</p>' +
				'<p>"Welcome ' + perYou.getMaster() + ' ' + perYou.getPersonName() + ' life as a Master or Mistress can be a difficult one, always punishing or ordering others. This is of course enjoyable, but there are times when it can be restful to relate to an equal. So let us relax together and if it comes to it dominate others together"</p>' +
				'<p>You get no hint of sarcasm in her words as you have so often before, she seems to now consider you an equal!</p>'
			);
			return true;			
		}
		
		if (Place == 281 && !this.checkFlag(18) && this.checkFlag(26) && this.isClubOpen(false, true)) {
			this.setFlag(18);
			// Pick a person to meet and tell you about the club. Usually it will be Catherine
			findPerson("Catherine");
			if ((per.checkFlag(1) && perBeasley.checkFlag(3)) || !perBeasley.checkFlag(3)) p = per;
			else p = findPerson("Tracy");
			
			showPopupWindow("Avernus Club is Closed?",
				p.addPersonString("clubmeet" + (p.isCharmedBy() ? "c" : "u") + ".jpg", "30%", "right") +
				'You see ' + p.getPersonName() + ' in front of the Avernus Club, she was talking to someone at the door. You see the door is closed and a sign up that it is closed temporarily.</p>' +
				'<p>You say Hi to ' + p.getPersonName() + ' and she smiles,</p><p>"' +
				(p.uid == "tracy" ? 'Hey Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ' the club is closed. It seems Mistress Jade is not around and she seems to manage things more than I knew. Until she returns the club is closed!" She smiles and says she will see you at home later!'
										: 'Hi ' + perYou.getPersonName() + ' the club is closed until further notice, Mistress Jade is not around and she manages some key parts of the club. I can\'t get in contact with her and until we can the club will be closed!" She shakes her head and says she might as well go home, but you see her checking her phone, you guess looking for someone available!') +
				'</p><p>It seems you will have to arrange something with Jade' + (this.isCharmedBy("Vampyre") ? ' or at least Lilith and Jade' : '') + '.'
			);
			return true;			
		}
		
		if (sType == "bindingjade") {
			setQueryParams();
			showPopupWindow("Jade the Slave",
				this.addPersonString("bind.jpg", "30%", "right") +
				'You arrive at the club with Jade and order her to open the private entrance and give you the key.</p>' +
				'<p>Inside you sort through the ropes, gags and start to tie up Jade, explaining to her it is appropriate a <b>slave</b> be bound, to remind her continually she is a <b>slave</b> and is completely powerless, a submissive bound slave!</p>' +
				'<p>While you are no rigger like Bambi you manage to bind Jade and leave her there for now, bound and helpless.</p>'
			);
			return true;			
		}
		
		if (sType == "jadetransformbodyaiden") {
			CastTransform(1);
			this.setFlag(30);
			this.dress = "Jade";	
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'You know the spell will likely fail at the club so ' + (this.isLover() ? 'offer to show Jade another of your powers and she agrees. You walk with her to the Hidden Room' : 'You lead Jade to the Hidden Room after loosening her bindings') +
				', and cast the transform spell. Jade\'s body starts to subtly change, slimming a little, especially in her breasts, and her hair darkens to black. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You ask if she is impressed, but she seems slightly confused as to what happened, she knows something happened but not quite what!',
				'dispPlace(280)'
			);
			return true;
		}	
		if (sType == "jadetransformbodyjadetiger") {
			CastTransform(1);
			this.setFlag(30);
			this.dress = "Aiden";
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'You know the spell will likely fail at the club so ' + (this.isLover() ? 'offer to show Jade another of your powers and she agrees. You walk with her to the Hidden Room,' : 'You lead Jade to the Hidden Room after loosening her bindings,') +
				' and cast the transform spell, Jade\'s body starts to subtly change, becoming curvier, her breasts growing, and her hair lightens to blonde. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You ask if she is impressed, but she seems slightly confused as to what happened, she knows something happened but not quite what!',
				'dispPlace(280)'
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 280) return this.showEventJadesRoom();
		
		var md;
		
		if (Place == 53 || Place == 141) {
			if (sType == "ritualtrap") {
				md = WritePlaceHeader();
				this.showPerson(Place == 53 ? "hidden1.jpg" : "sacred1.jpg");
				addPlaceTitle(md, "Jade and the Ritual of Return");

				if (Place == 53) md.write('<p>You wait for Jade in the alley and show her into the hidden room. She looks surprised and looks around in surprise. She makes a gesture and then checks a crystal in her pocket, "This is like the Sacred Clearing, a place of power. Amazing I did not know this place existed. I am almost impressed, almost."</p><p>She takes a seat against one wall ready for you to proceed.</p>' );
				else md.write('<p>Jade arrives at the Sacred Clearing dressed quite casually for her but I suppose you are in \'public\' as such. She leans against a tree and waits for you to proceed.</p>');
				
				md.write(
					'<p>You make some preparations for the ritual, knowing you have no intention of doing it.'
				);
				if (!isPersonHere("Seraphina")) md.write('Jade comments "Where is the thrall, she has to be here surely?"');
				md.write(
					'</p><p>You know you have to act else she will leave and <b>you will never have another chance</b> at this!</p>'
				);
				startQuestions();	
				addLinkToPlace(md, 'Jade gets impatient and leaves', Place, '', 'Jade snorts derisively and leaves!', 'perJade.setFlag(22)');
				WritePlaceFooter(md);
				return true;	
			}
			
			if (sType == "charmjade1") {
				// Charm Jade 1
				this.setFlag(11);		// Unlikely it is not set but just in case
				this.setFlag(3, false);
				md = WritePlaceHeader();
				this.showPerson(Place == 53 ? "hiddencharm1.jpg" : "sacredcharm1.jpg");
				addPlaceTitle(md, "Jade Under A Charm Spell!");	
				md.write(
				'<p>You recite the charm spell loudly so Jade is aware that you cast this spell, she looks at you and says "I am protec..." but stops as you see her eyes start to glow green and <b>stay</b> green. She exclaims "What is this?"</p>' +
				'<p>You look at her and tell her "Proof of my power and ability to completely dominate you and overwhelm your defences"</p>' +
				'<p>She says "Nonsense you are a weakling...but..but" and she starts to loosen her clothing. She continues, "But you did '
				);
				if (this.checkFlag(23)) md.write('know and use the Ritual and ');
				md.write(
					'use your magic and bypass my protection..."</p>' +
					'<p>You try some words to test how she will react to your shaping the charm '
				);
				if (this.checkFlag(23)) md.write('and she seems almost willing given how you seem to have impressed her with the ritual. So you could charm her into a lover of sorts or at least treat you as a <b>charmed equal</b> or even try and free her and do the same <b>without the spell</b>? She will likely be more restrictive without the charm of what she will do for or to you.');
				else md.write('and she is resistant to anything other than to be dominated, you did nothing to gain her respect for anything else to be possible.');
				md.write(' You can ' + (this.checkFlag(23) ? 'also ' : '') + 'dominate her as a slave, something she will be unable to resist but will hate it if you allow her to be aware!</p>');
				
				startQuestions();	
				if (perYou.checkFlag(26) && this.checkFlag(23)) startAlternatives();
				if (this.checkFlag(23) && perYourBody.FindItem(32) > 0) addLinkToPlaceO(md, 'cancel the charm proving your power to Jade', Place, 'type=uncharmedjadelover');
				addLinkToPlaceO(md, 'dominate Jade as your slave', Place, 'type=charmjade2slave');
				if (perYou.checkFlag(26) && this.checkFlag(23)) {
					addLinkToPlaceO(md, 'charm Jade as her equal', Place, 'type=charmjade2lover', '', '', "charmPerson('Jade',3);");
					endAlternatives();
				}
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "uncharmedjadelover") {
				// Uncharmed Equal, only possible in the hidden room
				this.unCharmThem();
				this.setFlag(24);
				md = WritePlaceHeader();
				this.showPerson("hiddenuncharmed.jpg");
				addPlaceTitle(md, "Proof of Power");	
				md.write(
				'<p>As you watch the spell taking effect you reach out with the silver ring and absorb the mana, cancelling the spell. You tell her,</p>' +
				'<p>"You could now be a slave to my will, but I have released you. You can see my power and I possess knowledge you do not have. You have power and knowledge, I have power and knowledge. We are equals in different areas, both ' + (perYou.isMan() ? 'Masters and Mistresses' : 'Mistresses') + '"</p>' +
				'<p>Jade stands and adjusts her clothing and admits,<p>' +
				'<p>"That you are, you are a ' + perYou.getMaster() + ' with unexpected power. That you released me shows you respect me and my power which is unexpected, I do not think I would of in your place"</p>' +
				'<p>She looks at you as if for the first time, a slight smile on her face and continues, "Let me consider this further, speak to me later at the club and we can come to terms in a different way than before"</p>' +
				'<p>With that she leaves looking thoughtful...</p>'
				);
				startQuestions();	
				addLinkToPlaceO(md, 'agree to meet her at the club later', Place);
				WritePlaceFooter(md);
				return true;				
			}
		
			if (sType == "charmjade2slave") {
				// Charm Jade 2 (Slave)
				md = WritePlaceHeader();
				this.showPerson(Place == 53 ? "hiddencharm2.jpg" : "sacredcharm2.jpg");
				addPlaceTitle(md, "Jade Being Enslaved By A Charm Spell");	
				md.write(
					'<p>Jade moves towards you an odd expression on her face, she is threatening but there is also seduction. She is fighting the arousal of the spell and moving to fight you!</p>' +
					'<p>You <b>command</b> her to stop and tell her how your magic is wrapping her in bindings of desire and submission, controlling her actions and even feelings in you so wish it. You are playing into her expressed attitudes of dominance or submission and you are the dominant one. She says in an angry whisper,</p>' +
					'<p>"No, no no! You are a weakling..." You again tell her to stop and she does, you then ask who is the weakling now, after all <b>your</b> spell is controlling her, turning her into <b>your</b> slave.</p>' +
					'<p>She gasps, "My pact..protections.." and you continue "are weaker here and my magic is stronger". You command her to sit, and slowly she does.</p>'
				);
				startQuestions();	
				addLinkToPlaceO(md, 'complete your domination', Place, 'type=charmjade3slave');
				WritePlaceFooter(md);
				return true;					
			}

			if (sType == "charmjade3slave") {
				// Charm Jade 3 (Slave)
				md = WritePlaceHeader();
				this.showPerson(Place == 53 ? "hiddencharm3.jpg" : "sacredcharm3.jpg");
				addPlaceTitle(md, "Jade Enslaved By A Charm Spell");	
				md.write(
					'<p>You tell Jade the she will obey your commands but she <b>was</b> a Mistress so you will allow her to retain her will and thoughts. You could completely control her, but you will let her struggle and resist being a slave but be <b>utterly</b> incapable of doing anything about it or to resist your orders.</p>' +
					'<p>You wonder for a moment is this is being a bit harsh, but then remember how she had degraded you, and treated you as a weakling and in fact just called you one a moment ago! So be it, you reinforce your complete domination over Jade, she tried to resist, to complain but you silence you <b>slave</b> with a word.</p>'
				);
				startQuestions();	
				addLinkToPlaceO(md, 'lead Slave Jade back to the Avernus Club', 280, 'type=bindingjade');
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "charmjade2lover") {
				// Charm Jade 2 (lover) - only possible in the hidden room AND you release Seraphina
				md = WritePlaceHeader();
				this.showPerson("hiddencharm2.jpg");
				addPlaceTitle(md, "Jade Being Impressed");	
				md.write(
					'<p>As you watch the spell taking effect you make an exaggerated gesture as if to cancel the spell, but <b>you do not</b>. You tell her,</p>' +
					'<p>"You could now be a slave to my will, but I have released you. You can see my power and I possess knowledge you do not have. We have power in different areas, both ' + (perYou.isMan() ? 'Masters and Mistresses' : 'Mistresses') + '"</p>' +
					'<p>Jade stands and admits, "That you are, you are a ' + perYou.getMaster() + ' with unexpected power. That you released me shows you respect me and my power, I do not think I would freed you in your place"</p>' +
					'<p>She looks at you but you can still see the spell working in her and you talk about your different powers and how power is greatly arousing!</p>'
				);
				startQuestions();	
				addLinkToPlaceO(md, 'to quote "Power is the ultimate aphrodisiac"', Place, 'type=charmjade3lover');
				WritePlaceFooter(md);
				return true;					
			}

			if (sType == "charmjade3lover") {
				// Charm Jade 3 (lover)
				md = WritePlaceHeader();
				this.showPerson("hiddencharm3.jpg");
				addPlaceTitle(md, "Jade Your Charmed Equal");	
				md.write(
					'<p>You talk a little about learning the ritual as you had promised to Jade before but mainly this is to emphasise your knowledge and power.</p>' +
					'<p>You also talk of power, lust and how as two people of power you can be comfortable in each others presence and indulge in your passions without the game of domination and submission. ' +
					'You immediately see some resistance from Jade but realise it is the reference to a game, for her domination and submission is a fact of life not a game. You alter your approach, but still emphasising passion and where possible that you have power she does not understand, implying you are more powerful than her, but talking care to not directly say that.</p>' +
					'<p>You can see the spell has fully taken hold and \'suggest\' Jade return to the club and you will meet her there later. Before she leaves she gives you a code to allow access to her private entry into the club.</p>'
				);
				startQuestions();	
				addLinkToPlaceO(md, 'promise to meet her at the club another time', Place);
				WritePlaceFooter(md);
				return true;					
			}			
		}
		
		if (sType == "endgame1jade") {
			// End Game - Jade
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for " + (this.isGhoul() ? "Ghouls" : (this.isLover() ? "" : "Ex-") + "Dominatrixes?"));

			md.write(
				'<p>One day you visit Jade and she strips off, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);	
			
			WritePlaceFooter(md);
			return true;				
		}
			
		if (Place == 269) {
			if (sType == "jadepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Jade");
				md.write(
					'<p>Jade arrives, dressed in a silver bikini, it might even be a fine metal mesh like chain mail by finer? She poses for a moment, as a demonstration of her seductive power.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'suggest she demonstrate her power to you in private', Place, 'type=jadepoolsex');
				addLinkToPlaceC(md, 'say goodbye to Jade', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "jadepoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandomRorXBG("pool-sex", isExplicit() && perYou.isMaleSex() ? 2 : 1);
				addPlaceTitle(md, "Jade's Proof");
				md.write(
					'<p>You ask Jade to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...Jade says goodbye to you', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
	
		if (Place == 282 && this.checkFlag(10) && this.other === '' && !this.checkFlag(3) && !this.checkFlag(11)) {
			// See her performing
			this.setFlag(11);
			md = WritePlaceHeader();
			this.showPerson("poledanceu.jpg");
			addPlaceTitle(md, "Jade\'s Performance");
			md.write('<p>You see on the stage an act must have started a while ago, it is a femdom sort of thing, a dominatrix and her submissive male slaves. ');
			if (perYou.isMan()) md.write('Not really your thing but you watch  for a little while getting a drink.');
			else md.write('Not exactly your thing, but then again it\'s not that far from what you are doing with the charm spell.');
			md.write(
				'<p>You are not that surprised when you recognise the dominatrix as Jade, this seems entirely her kink. It is only odd to you she is doing it here on stage, but maybe there was a cancellation, or that she gets off on dominating people and loves the attention while doing so. The more the think of it, it is the second, her desire for domination.</p>' +
				'<p>You wish you could work out a way to completely dominate her, but she seems to be strongly protected from magic.</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, 'Jade leaves the stage', 282);
			WritePlaceFooter(md);
			return true;					
		}
		
		if (Place == 247) {
			if (sType == "useghouljade") {
				// Use the ghoul
				md = WritePlaceHeader();
				this.showPersonRorXBG("ghoulsex.jpg");
				addPlaceTitle(md, "Use the Ghoul");
				md.write(
					'<p>Jade still knows how to use her tongue, maybe even better than before, who knows, but the whole act is still... kinda uncomfortable.</p>' +
					'<p>She never moans or makes any other noise and neither does she show disgust or enjoyment towards what she does.</p>' +
					'<p>She allows you to use her body and returns to her spot when she is done.'
				);
				startQuestions();
				addLinkToPlaceC(md, 'look around the crypt', Place);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "ghouljade1") {
				// Make Jade a Ghoul 1
				md = WritePlaceHeader();
				this.charmThem(8, "Vampyre");
				this.extra[0] = 0;
				this.setFlag(12, false);		// Deal for Seraphina over
				this.setFlag(13, false);		// Deal for Seraphina over
				this.setFlag(3, false);			// Technically can visit, and this allows the 'club closed' event
				this.setFlag(11);
				
				perLilith.showPerson("vamp11b.jpg");
				addPlaceTitle(md, "Taking Jade");
				md.write(
					'<p>You wait with Lilith near the employee entrance, you are feeling uncomfortable about this, there has to be another way. You look at Lilith about to call it off and she moves with incredible speed and you see she has grabbed Jade as she walked into a darkened area for a moment.</p>' +
					'<p>Before you can say anything she sinks her fangs into Jade\'s neck until it seems Jade must be dead. Lilith looks triumphant, glances at you, and then bites Jade again and as she does you see Jade regain some colour and start breathing again. Lilith steps back and says,</p>' +
					'<p>"She will be unconscious for a while, follow me" You do your best to reassert control here, and make her say where you are going, and she replies, "The Crypt"</p>' +
					'<p>Lilith picks up Jade and you walk <b>with</b> them to the park and into the Wild Ranges and into the Crypt, Lilith lays Jade on top on the scarcophagus. She then explains,</p>' +
					'<p>"When she awakens her will is mine, she will stay here but if needed can leave to do things for me..and you. Anything should be brief, she will be changed, some mortal illness can be offered."</p>' +
					'<p>You can see Lilith is quite happy at this, she did not like Jade. It sounds like Jade will no longer be able to do her normal duties at the Avernus club or the Gym.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'wait for Jade to wake', Place, 'type=ghouljade2');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "ghouljade2") {
				// Make Jade a Ghoul 2
				md = WritePlaceHeader();
				
				this.showPerson("ghoul.jpg");
				addPlaceTitle(md, "Jade the Ghoul");
				md.write(
					'<p>After what seemed hours but was probably more minutes, Jade opens her eyes and sits up. She draps a cloth, a shroud maybe, around her shoulders and stands. She glances at you and the looks at Lilith,</p>' +
					'<p>"Mistress, what is your will?" Lilith just smiles and looks at you asking, "What do you want?"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'look at the crypt as you consider your actions', Place);
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "ghoulmanagertalk") {
				md = WritePlaceHeader();
				this.setFlag(19);
				this.showPerson("ghoul.jpg");
				addPlaceTitle(md, "Jade and the Club");
				md.write(
					'<p>You tell Jade about the Avernus club being closed as she is not there handling some thing and she looks at Lilith, but answers,</p>' +
					'<p>"Yes it will not open without me", and Lilith continues, "and she cannot do her role anymore"</p>' +
					'<p>You ask if you can arrange someone to look after the management role she fills? Lilith tells Jade,</p>' +
					'<p>"Make arrangements with the club for someone ' + perYou.getPersonName() + ' arranges.", Jade nods her head, and just says "Tomorrow night"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'look at the crypt as you consider your actions', Place);
				WritePlaceFooter(md);
				return true;			
			}
			
		}
		
		if (Place == 435 && sType == "castcharmgym") {
			// Cast Charm on Jade at the gym
			this.setFlag(17);
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("gymca.jpg");
			addPlaceTitle(md, "Charming Jade..Well Trying");
			md.write(
				'<p>You approach as close as you can but still be out of Jade\'s line of sight, and you softly recite the charm spell. She reacts looking around, and you see her eyes start to glow green...but she shakes her head and they return to normal.</p>' +
				'<p>You see her looking around suspiciously and you cautiously retreat. She still has some protection but whatever it is was <b>just</b> enough to protect her!</p>' +
				'<p>You are going to have to get a more powerful spell...or take her somewhere spells are more powerful and there is plenty of mana, a <b>place of power</b>'
			);
			if (perLilith.isCharmedBy()) md.write('<p>Lilith could probably here or outside grab her or <i>something</i> you should ask her.</p>');
			startQuestions();
			addLinkToPlace(md, 'leave leave the gym before she sees you', 37, '', 'You think it best to avoid her this evening, just in case she asks an awkward question');
			WritePlaceFooter(md);
			return true;		
		}
		
		return false;
	};
	
	per.showEventJadesRoom = function()
	{
		var md;
			
		if (sType == "askjade" || sType == "askjadevamp") {
			// Meet Jade
			if (this.dress === "") {
				md = WritePlaceHeader();
				this.pickModel("You see two women in the room talking, both look the part of a dominatrix and either could be Jade. One of them leaves ignorng you, and the one who remains is...", "meeting", "JadeTiger", "Aiden", "black haired", "blonde", 'askjade', 'Who is Jade');
				WritePlaceFooter(md);
				return true;
			}
		
			this.setFlag(1);
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("feemoney.jpg");
			addPlaceTitle(md, "Meeting Jade");
			if (sType == "askjade") md.write('<p>You ask a few people about a woman named Jade and you are immediately corrected "Mistress Jade" and directed to a private room at the rear of the club</p><p>T');
			else md.write('<p>As Lilith dances you continue and enter the door, you see t');
			md.write('he room is outfit as a stylised dungeon, a fantasy of BDSM and other gear. A woman is sitting on a chair, more sprawled than sitting, looking at you with a condescending expression. Dressed in shiny leather she scream "Dominatrix" to you, especially as you were told she is "Mistress Jade"! ');
			if (sType == "askjadevamp") md.write('You notice a few video monitors of parts of the club, one in on the stage, and it is empty, Lilith is not there? It is true vampires cannot be seen by cameras? ');
			md.write(
				'As you are thinking this Jade states bluntly,</p>' +
				'<p>"You touched a demon", you start at her accurate statement. She continues "A possession here in Glenvale, like the old days"</p>' +
				'<p>You are at least a little ashamed of what happened to Jesse, and hesitate before asking her if she is a demonologist as you had been told. She looks at you,</p>' +
				'<p>"You survived the encounter, you must have some power, or luck. I think power but it is difficult to say. Yes I am a demonologist, but I am not fool enough to summon a demon and allow it to possess someone!"</p>' +
				(checkPersonFlag("Seraphina", 2) ? '<p>You ask about Seraphina the thrall and she smiles, "One of the results of your foolishness. She was sent to me to try and corrupt me and this place. I have dealt with that plan, she is mine now."</p>' : '') +
				'<p>You start to explain it was someone else, though it was partly your fault, and she interrupts,<p>' +
				'<p>"You want my help, I can do that, but everything has a price. Domination is what matters to demons, and to me. Submit to me in at least a token, and pay a fee of money, ' + sCurrency + '50 and I will answer your questions."<p>' +
				'<p>You ask about the token submission, and she smiles, "Lick my boots". She looks at you appraisingly, "You are young, so if money is short I am sure there is another way you can serve me instead of the payment"</p>' +
				'<p>You ask what sort of payment and she answers, "' + (perYou.isBornMale() ? 'My strap-on, your ass' : 'Dance for me in the club') + '". You look surprised, that is not something that had ever crossed your mind!</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, '"No way! I will not submit to you!"', Place, 'type=nosubmit');
			if (nMoney > 49) addLinkToPlace(md, 'pay the fee and lick her boots', Place, 'type=payfeemoney');
			addLinkToPlace(md, 'pay the other way and lick her boots', Place, 'type=payfeeother');
			addLinkToPlace(md, 'leave her for now', 282, '', 'As you leave she tells you to not waste her time, and the door is locked behind you. Hopefully she will allow you back another time, maybe tomorrow?');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "nosubmit") {
			// Meet Jade
			md = WritePlaceHeader();
			this.showPerson("meeting.jpg");
			addPlaceTitle(md, "Meeting Jade");
			this.setFlag(4);
			md.write(
				'<p>Jade looks at you with a mixture of anger and amusement,</p>' +
				'<p>"Someone so young to act like a ' + perYou.getMaster() + ' and you have done nothing to earn my respect", she looks at you and continues,</p>' +
				'<p>"I have to admire your attitude at least, all right, then ' + sCurrency + '200 and nothing else."</p>' +
				'<p>Well you have sort of negotiated just for a lot more money!' +
				(nMoney < 200 ? ' Except you do not have it of course.' : '')
			);
			startQuestions();
			if (nMoney > 199) {
				startAlternatives(md);
				addLinkToPlace(md, 'pay the fee', Place, 'type=payfeemoneyonly');
			}
			addLinkToPlace(md, 'leave her for now', 282);
			if (nMoney > 199) endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeemoneyonly") {
			// Meet Jade
			md = WritePlaceHeader();
			this.showPerson("feemoney.jpg");
			addPlaceTitle(md, "Paying Jade");
			if (!this.checkFlag(5)) AddCash(-200);
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she says "Our contract is complete, ask your questions or other requests"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeemoney") {
			// Meet Jade
			md = WritePlaceHeader();
			this.showPerson("feemoney.jpg");
			addPlaceTitle(md, "Paying Jade");
			if (!this.checkFlag(5)) AddCash(-50);
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she stands and puts her foot on a stool. You then see it is not really a stool, it is a crouched man, kneeling at the feet of his Mistress.</p>' +
				'<p>You hesitate, this is not something you have done before, but you quickly kneel down and give a tentative lick of her boot. As you do you feel the handle of her whip press into your back to tell you to keep doing it. You force yourself to continue until the handle is removed.</p>' +
				'<p>As you stand, she smiles "A defiant one aren\'t you, an aspiring ' + perYou.getMaster() + ' and not a submissive it seems. Our contract is complete, ask your questions or make your requests."</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeeother") {
			// Meet Jade
			md = WritePlaceHeader();
			if (perYou.isBornMale()) this.showPerson("feeother.jpg");
			else perYou.showPerson("poledancea.jpg");
			addPlaceTitle(md, "Paying Jade");
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she stands and put her foot on a stool. You then see it is not really a stool, it is a crouched man, kneeling at the feet of his Mistress.</p>' +
				'<p>You hesitate, this is not something you have done before, but you quickly kneel down and give a tentative lick of her boot. As you do you feel the handle of her whip press into your back to tell you to keep doing it. You force yourself to continue until the handle is removed.</p>' +
				'<p>As you stand, she smiles "A Defiant one aren\'t you, an aspiring ' + perYou.getMaster() + ' and not a submissive it seems. Now the rest"</p>'
			);
			if (perYou.isBornMale()) {
				md.write(
					'<p>She smiles and just states, "Strip". You are having second thoughts about this and hesitate, and she swats her whip on your jean-clad ass. She smiles and repeats, "Strip"</p>' +
					'<p>You grit your teeth and decide you may as well go through with it, and strip, she has you lie down on your back and puts on her strap-on and lubricates it to your relief.<p>' +
					'<p><i>scene to follow</i></p>' +
					'<p>After she finishes, she allows you to redress and says,</p>' +
					'<p>"Our contract is complete, ask your questions or requests"</p>'
				);				
			} else {
				AddCash(10);
				md.write(
					'<p>She offers you a changing room but you initially refuse until she says that you are wearing too much to dance properly. You quickly strip off some clothing and head bac to her room, she stops you, and gestures toward the main area of the club. She meant for you to dance publicly! You start to refuse but she stops you,</p>' +
					'<p>"You have come this far, show me your courage and your body", you suppose she is right, you might as well get this over with. You step out and Jade introduces you as "Everyone enjoy a new performer, the Witch ' + perYou.getPersonName() + '!" and there is a light applause.</p>' +
					'<p>While this is not something you have really done <b>much</b> of before, you did once play around with Tracy and she gave you a surprisingly good lesson but it was a while ago. You start out a bit tentatively but quickly get used to it and actually start to enjoy it.<p>' +
					'<p>You finish, panting to some more applause and actually a few tips! Jade escorts you back to her room and tells you,</p>' +
					'<p>"Our contract is complete, ask your questions or requests"</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
	
		if (sType == "payment") {
			// Meet Jade
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("feemoney.jpg");
			addPlaceTitle(md, "Meeting Jade");
			md.write(
				'<p>You visit the room used by Mistress Jade again, she is sitting waiting for you.</p>' +
				'<p>She is blunt, "My price is unchanged, ' +
				(this.checkFlag(4) ? sCurrency + '200' : sCurrency + '50, and lick my boots or the other way') + '</p>'
			);
			startQuestions();
			startAlternatives(md);
			if (this.checkFlag(4)) {
				if (nMoney > 199) addLinkToPlace(md, 'pay the fee', Place, 'type=payfeemoneyonly');
			} else {
				if (nMoney > 49) addLinkToPlace(md, 'pay the fee and lick her boots', Place, 'type=payfeemoney');
				addLinkToPlace(md, 'pay the other way and lick her boots', Place, 'type=payfeeother');
			}
			addLinkToPlace(md, 'leave her for now', 282, '', 'As you leave she tells you to not waste her time, and the door is locked behind you. Hopefully she will allow you back another time, maybe tomorrow?');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "castcharmroom") {
			// Cast Charm on Jade in her room
			this.setFlag(2);
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("meeting.jpg");
			addPlaceTitle(md, "Charming Jade");
			md.write(
				'<p>You whisper the words of the charm spell and <i>something</i> blocks it, Jade does not react except to smile,</p>' +
				'<p>"Domination and control is my expertise, that of people and demons. I know of that forbidden spell you just tried to use on me, and I am quite protected by a <b>contract</b>. You are a fool, you should control people of their own free will, it is so much more satisfying."</p>' +
				'<p>She steps over and slaps you and then orders you, "Get out"</p>' +
				'<p>You have no choice but to leave, hopefully she will calm down later.</p>' +
				'<p>You sit at the bar for a little watching the dancers and think about what happened. You are fairly sure Jade it is not Jade herself but an item or <i>entity</i> that protected her. ' +
				'Given her reference to a \'contract\' she is being warded by something, is this protection equally strong everywhere? It could very much depend on the wording of the \'contract\' and also anything that could protect from demonic influences...</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (this.checkFlag(2) && !this.checkFlag(16) && (sType === "" || sType == "jadelaundry")) {
			setQueryParams("type=jadelaundry");
			this.setFlag(16);
			md = WritePlaceHeader();
			this.showPerson("laundry.jpg");
			addPlaceTitle(md, "Jade's Laundry");
			md.write(
				'<p>You step in to speak to Jade' + (perLilith.isHere() ? ' silently followed by Lilith' : '') + ', Jade sits down and looks at you condescendingly as usual, she still has little respect for you.</p>' +
				'<p>She demands you tell her what you want, but she stops as a man enters the room, dressed in little other than leather underwear. He is carrying some folded laundry, you notice on the top is a uniform you recognise. Your friend Amy works part time at the Gym and you recognise the uniform as one worn by instructors there.</p>' +
				'<p>The man drops the laundry, pretending it is an accident but it is poorly acted, he did it deliberately. Jade looks at him scathingly,</p>' +
				'<p>"So you want me to punish you, but you did it on purpose, so that means <b>you</b> are ordering me to punish you!" You can see how her focus or obsession on dominance means this is very much a no-no!</p>' +
				'<p>She tells him to get out but he hesitates, Jade orders him to \'take the position\', he bends over and she whips his ass a few times. She orders him out and he immediately leaves, she calls after him "That was for hesitating when I gave an order slave!"</p>' +
				'<p>She looks at you and waits, you realise she wants you to pick up her clothing. In her eyes that is not an act of politeness but an act of submission to her, so you just look back at her. She smiles and picks up the clothing and puts it on a table and sits,</p>' +
				'<p>"He had better not soiled my uniform, I work at the gym for a few hours before the club opens to keep in shape and for more people to obey me. Now what did you want?"</p>' +
				'<p>You hesitate for a moment, she would be out of this room and if the protection is here <b>only</b>...'
			);
			startQuestions();
			addLinkToPlace(md, 'you consider your questions', 280);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "slavemanagertalk") {
			md = WritePlaceHeader();
			this.setFlag(19);
			this.showPerson("rooms.jpg");
			addPlaceTitle(md, "Jade and the Club");
			md.write(
				'<p>You ask your slave Jade about the Avernus club being closed as she is not there handling some things, and then loosen her bindings. She answers,</p>' +
				'<p>"Yes ' + perYou.getMaster() + ' with my current restrictions I cannot handle the club"</p>' +
				'<p>You order her to make arrangements for someone to look after the management role she fills, that is for someone <b>you</b> arrange.", Jade nods her head, and just says "I will make the arrangements ' + perYou.getMaster() + ', if you wish the club can reopen tomorrow night"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'rebind her for now', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "jadeofficefuck") {
			this.setFlag(27);
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("roomsex");
			if (this.isLover()) addPlaceTitle(md, "Jade's Massage");
			else addPlaceTitle(md, "Fucking your Slave Jade");
			if (this.isLover(true)) {
				// Uncharmed Equal
				md.write(
					'<p>Jade offers to give you an intimate massage which results in a lot of caressing and massaging of quite intimate parts of both of your bodies</p>'
				);				
			} else if (this.isLover(false)) {
				// Charmed Equal
				md.write(
					'<p>You suggest Jade gives you an intimate massage which results in a lot of caressing and massaging of quite intimate parts of both of your bodies</p>'
				);				
			} else {
				// Slave
				md.write(
					'<p>You fuck your slave Jade</p>'
				);
			}
			startQuestions();
			if (this.isLover()) addLinkToPlaceC(md, 'relax with Jade', Place);
			else addLinkToPlaceC(md, 'rebind her for now', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "jadeofficeebj") {
			this.setFlag(27);
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("roombj");
			if (this.isLover()) addPlaceTitle(md, "Jade's Help To Relax You");
			else addPlaceTitle(md, "Slave Jade's Oral Service");
			if (this.isLover(true)) {
				// Uncharmed Equal
				md.write(
					'<p>Jade offers to help you relax and it quickly becomes clear this is a demonstration of her oral stimulation and relaxation techniques. After a while you \'relax\' in her mouth.</p>'
				);				
			} else if (this.isLover(false)) {
				// Charmed Equal
				md.write(
					'<p>You suggest Jade help you relax and that this is a demonstration of her oral stimulation and relaxation techniques. After a while you \'relax\' in her mouth.</p>'
				);				
			} else {
				// Slave
				md.write(
					'<p>Your slave jade ' + (perYou.isMaleSex() ? 'gives you a blowjob' : 'licks you to orgasm') + '.</p>'
				);
			}
			startQuestions();
			if (this.isLover()) addLinkToPlaceC(md, 'relax with Jade', Place);
			else addLinkToPlaceC(md, 'rebind her for now', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "jadedanceu") {
			// Dance (uncharmed equal) Once only
			this.setFlag(27);
			this.setFlag(28);
			md = WritePlaceHeader();
			this.showPersonRandom("poledanceul");
			addPlaceTitle(md, "Private Dance");
			md.write(
				'<p>Jade shows a slight smile "Consider this a special favour, a one and only favour" She steps out of the room for a few minutes and returns dressed quite differently!</p>' +
				'<p>You had expected she was going to do something like her show before something BDSM orientated, and showing dominance and power. Instead she gives more a very personal performance, more as a dancer may give in a private room, which is really where you are now!</p>' +
				'<p>While she is not \'that sort\' of dancer she is still very capable and very skilled!</p>' +
				'<p>When she finishes she looks at you without saying anything but there is a clear offer in her pose and expression.</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'accept Jade\'s offer', Place, 'type=jadeofficefuck');
			addLinkToPlaceC(md, 'relax with Jade but nothing more', Place);
			WritePlaceFooter(md);
			return true;			
			
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("poledance");
		addPlaceTitle(md, nm + "'s Dance");
		if (this.getCharmedLevel() == 4) {
			// Slave
			md.write(
				'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
				'<p>' + nm + ' is an experienced dancer and ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
				'<p>After ' + this.getHeShe() + ' collects ' + this.getHisHer() + ' tips and offers them to you, but you feel ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
			);			
		} else {
			// Charmed Equal
			md.write(
				'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
				'<p>' + nm + ' is an experienced dancer and ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>'
			);
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after Jade\'s dance', Place);
		WritePlaceFooter(md);
	};
	
	// Text for a place
	per.showPersonTextHere = function(md)
	{
		if (Place == 280 && sType === "") {
			// Description
			if (this.isHere()) {
				if (this.getCharmedLevel() == 4) md.write('<p>Jade is sitting tied up, struggling futily due to the spell and waiting for you to give her a command.</p>');
				else if (isVisible()) {
					if (this.isLover(true)) {
						md.write('<p>Jade is sitting waiting for you to with a slight smile on her face.</p>');
						if (this.checkFlag(27)) md.write('<p>Jade mentions that while she enjoyed the passionate interlude, that is enough for a while for her.</p>');
					} else md.write('<p>Jade is sitting waiting for you to tell her what you want, knowledge or passion.</p>');
				} else md.write('<p>Jade is watching a video feed of the main area of the club.</p>');
			} else if (!this.isClubOpen()) md.write('<p>The room is empty at this time of day.</p>');
			if (!this.checkFlag(9)) md.write('<p>You notice a familiar looking stone sitting on a shelf.</p>');
		}
		if (Place == 282 && sType === "" && this.whereNow() == 280 && this.isClubOpen()) {
			if (this.checkFlag(3)) {
				if (!this.isCharmed() || this.isLover()) md.write('<p>Mistress Jade\'s private room seems to be closed.</p>');
			} else if (this.checkFlag(1)) md.write('<p>Mistress Jade\'s private room seems to be open.</p>');
		}		
		if (Place == 435 && sType === "" && this.isHere()) {
			clv = this.getCharmedLevel();
			if (clv == 0) md.write('<p>You see Jade leading a small group in a training session. You watch a little, unsurprisingly she is quite controlling but also seems to be a skilled instructor.</p>');
			else md.write('<p>You see Jade leading a small group in a training session. You watch a little, unsurprisingly she is quite controlling but also seems to be a skilled instructor.</p>');
		}
	};
	
	// Questions for Jade
	per.showPersonChat = function(md)
	{
		if (Place == 247 && this.isHere() && sType === "") {
			// Ghoul
			if (this.checkFlag(18) && perLilith.isHere() && getClubManagersTotal() === 0 && !this.checkFlag(19)) addLinkToPlace(md, "ask Jade and Lilith about the club being closed", Place, 'type=ghoulmanagertalk');
			addLinkToPlace(md, findPerson("Gabby").isHere() ? "use Jade the ghoul" : "use the ghoul", Place, 'type=useghouljade');
			return;
		}
		if (Place == 280 && this.checkFlag(5) && this.isHere() && sType === "") {
			if (this.getCharmedLevel() == 4) {
				// Slave Jade
				if (this.checkFlag(18) && getClubManagersTotal() === 0 && !this.checkFlag(19)) addLinkToPlace(md, "ask Jade about the club being closed", Place, 'type=slavemanagertalk');
				
				if (perLilith.other >= 60) {
					this.addQuestionRF(md, 15, "ask Jade your slave about vampires",
						"<p>You ask Jade what she knows about vampires and then quickly add also the undead. She looks at you curiously,</p>" +
						'<p>"Strange thing to ask a demonologist, the undead and vampires are not demons. I once tried to ask a <b>source</b> about them but it seems demons and the dead do not talk about one another. I do not think they are enemies, just completely different."</p>' +
						'<p>She shakes her head "I have not looked into them as not my area. why do you want to know?"</p>' +
						'<p>You echo her words about everything has a price, and she smiles and replies "Too much whatever it is for something I am barely interested in"</p>'
					);
				}
			} else {
				// Questions and bargains
				if (perLilith.other >= 60) {
					this.addQuestionRF(md, 15, "ask about vampires",
						"<p>You ask Jade what she knows about vampires and then quickly add also the undead. She looks at you curiously,</p>" +
						'<p>"Strange thing to ask a demonologist, the undead and vampires are not demons. I once tried to ask a <b>source</b> about them but it seems demons and the dead do not talk about one another. I do not think they are enemies, just completely different."</p>' +
						'<p>She shakes her head "I have not looked into them as not my area. why do you want to know?"</p>' +
						'<p>You echo her words about everything has a price, and she smiles and replies "Too much whatever it is for something I am barely interested in"</p>'
					);
				}
				// Manager queries
				if (!this.checkFlag(10)) addQuestionC(md, 'ask about dancing in the club', "Jade", 670);
				if (this.extra[0] !== 0) {
					if (this.checkFlag(13) && this.other == "done" && this.extra[0] < 0) {
						if (!this.checkFlag(12)) addQuestionC(md, 'complete the deal for Seraphina', "Jade", 675);
					} else if (this.extra[0] > 0) addQuestionC(md, 'ask for the performance fees', "Jade", 671);
				}
				
				if (this.checkFlag(12) && !this.checkFlag(21)) {
					this.addPopupLinkF(md, 21, "offer to show her the Ritual of Return", "An Offer",
						this.addPersonString("offer.jpg", "30%", "rightpopup") +
						'You tell Jade you are going to do the Ritual of Return to restore Seraphina' +
						(!isCharmedBy("Seraphina", "Demon") ? ' even though you cannot now, so this is a trap after all' : '') +
						', and again she expresses her opinion it is impossible. You tell her confidently you can and have done it before! She demands to know how you learned the ritual.</p>' +
						'<p>You just tell her you will explain the details at the time and even teach her the process. Jade looks doubtful but says if you do the attempt call her and she will join you at the ritual area.</p>'
					);
				}
			}
			// Common
			if (!this.checkFlag(6)) addQuestionC(md, 'ask Jade about demons', "Jade", 666);
			var perLeanne = findPerson("Leanne");
			if (perLeanne.place == 382 && !perLeanne.checkFlag(9)) addQuestionC(md, 'ask Jade about saving a person from demons', "Jade", 668);
			if (sType === "" && !this.checkFlag(9)) addQuestionC(md, 'ask Jade about the stone', "Jade", 669);
			if (this.isDanceAvailable() && (!this.isCharmed() || this.isLover())) {
				this.addQuestionR(md, 'ask to perform in the club',
					'You ask Jade to dance in the club, the money would be useflul to you. She agrees.' ,
					"perJade.setDancer(\\'You\\')"
				);	
			}
			if (this.isCharmedBy() || this.isLover()) {
				if (!this.checkFlag(33)) addQuestionC(md, 'ask about Jade\'s protections', "Jade", 680);
				else if (!this.checkFlag(34)) addQuestionC(md, 'ask more about Kurndorf and demons', "Jade", 681);
				else {
					if (!this.checkFlag(35)) addQuestionC(md, 'ask about the thin place', "Jade", 682);
					if (!this.checkFlag(36)) addQuestionC(md, 'ask about the Hellgate', "Jade", 683);
				}		
			}
			if (this.getCharmedLevel() == 4) {
				// Slave
				addLinkToPlaceO(md, 'fuck your slave Jade', Place, 'type=jadeofficefuck');
				addLinkToPlaceO(md, 'tell your slave Jade to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you'), Place, 'type=jadeofficeebj');

				if (this.isDanceAvailable()) {
					this.addQuestionR(md, 'order your slave Jade to dance for you in the club',
						'You order Jade to dance for you, another expression of your dominance over her. Not a BDSM performance but a poledance like all the other dancers!</p>' +
						'<p>You can see she hates the order but cannot refuse you. You make the arrangements and can watch her dance as you have with others before in the main area of the club' ,
						"perJade.setDancer(\\'" + this.uid + "\\')"
					);
				}
				this.addSleepLink(md, "go to bed for the night with Jade", "Going to Bed with Jade",
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You lead Jade to the bed and alter her bindings so they are more confortable to lie down in. You look at her smiling at your dominance over the once dominatrix.',
					'beds.jpg'
				);				
			} else if (this.isLover(true)) {
				// Uncharmed lover
				if (!this.checkFlag(27)) {
					if (!this.checkFlag(28) && this.checkFlag(11)) addLinkToPlaceO(md, 'suggest Jade performs like you saw before on the dance floor?', Place, 'type=jadedanceu');					
					addLinkToPlaceO(md, 'indulge in the passion of Jade\'s body', Place, 'type=jadeofficefuck');
					addLinkToPlaceO(md, 'suggest Jade can help you intimately relax in a different way', Place, 'type=jadeofficeebj');
				}
				
			} else if (this.isLover(false)) {
				// Charmed Lover
				addLinkToPlaceO(md, 'indulge in the passion of Jade\'s body', Place, 'type=jadeofficefuck');
				addLinkToPlaceO(md, 'suggest Jade can help you intimately relax in a different way', Place, 'type=jadeofficeebj');

				if (this.isDanceAvailable()) {
					this.addQuestionR(md, 'ask Jade if she would like to dance for you sometime',
						'You suggest Jade could show you her power by doing another performance in the club.</p>' +
						'<p>You can see she does not mind this given the spell but it is close!. She makes the arrangements and can watch her dance as you have with others before in the main area of the club' ,
						"perJade.setDancer(\\'" + this.uid + "\\')"
					);
				}
				this.addSleepLink(md, "go to bed for the night with Jade", "Going to Bed with Jade",
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You suggest retiring early and Jade shows you to her bed. She quickly makes some arrangements and joins you in bed a little while later..',
					'bedl.jpg'
				);				
			}
			return;
		}
		if (sType !== "" || Place != 282) return;
		if (this.isClubOpen() && !this.isCharmedBy("Vampyre")) {
			// Club is open
			if (this.getCharmedLevel() == 4) {
				if (getClubManagersTotal() === 0) addLinkToPlaceC(md, 'visit your slave Jade', 280);
			} else if (checkPersonFlag("Seraphina", 2)) {
				if (perLilith.isHere() && !this.checkFlag(15)) {
					if (this.checkFlag(1) && this.checkFlag(29)) {
						addPopupLinkToPlace(md, 'visit Mistress Jade', 280, '', "Still, what about Lilith?",
							perLilith.addPersonString("poledancec.jpg", "height:max%", "right") +
							'<p>As you walk towards Jade\'s room you remember Lilith and decide you should talk to Jade first about vampires. Once again you ask Lilith to wait here. She barely answers, just says briefly "Time to hunt"',
							"perLilith.place=247"
						);						
					} else if (!this.checkFlag(1)) {
						addPopupLinkToPlace(md, 'ask around for Jade', 280, 'type=askjadevamp', "What about Lilith?",
							perLilith.addPersonString("poledancec.jpg", "height:max%", "right") +
							'<p>You ask a few people about a woman named Jade and you are immediately corrected "Mistress Jade" and directed to a private room at the rear of the club</p>' +
							'<p>As you walk towards the room you notice Lilith looking around with a hungry? look in her eyes. It crosses your mind visiting a demonologist with a vampire in tow maybe...ummm...risky. You think you should ask Jade carefully about vampires!</p>' +
							'<p>As Lilith looks more interested in the club at the moment you tell her to wait out here for you. She starts removing her clothes as says, \"I will hunt, you will find me in the resting place\" and she walks to the currently empty stage. Her clothes are completely different, was she wearing these underneath or is it some sort of glamour?</p>' +
							'<p>You feel tempted to wait and watch as she starts to dance but decide you should go and speak to....Jade that\'s it...',
							"perLilith.setFlag(29);perLilith.place=247"
						);
					} else {
						addPopupLinkToPlace(md, 'visit Mistress Jade', 280, '', "What about Lilith?",
							perLilith.addPersonString("poledancec.jpg", "height:max%", "right") +
							'<p>You walk towards Jade\'s room you and notice Lilith looking around with a hungry? look in her eyes. It crosses your mind visiting a demonologist with a vampire in tow maybe...ummm...risky. You think you should ask Jade carefully about vampires!</p>' +
							'<p>As Lilith looks more interested in the club at the moment you tell her to wait out here for you. She starts removing her clothes as says, \"I will hunt, you will find me in the resting place\" and she walks to the currently empty stage. Her clothes are completely different, was she wearing these underneath or is it some sort of glamour?</p>' +
							'<p>You feel tempted to wait and watch as she starts to dance but decide you should go and speak to....Jade that\'s it...',
							"perLilith.setFlag(29);perLilith.place=247"
						);
					}
				} else if (!this.checkFlag(1)) addLinkToPlaceC(md, 'ask around for Jade', 280, 'type=askjade');
				else if (!this.checkFlag(3)) {
					if (this.checkFlag(5)) addLinkToPlaceC(md, 'visit Mistress Jade', 280);
					else addLinkToPlaceC(md, 'visit Mistress Jade', 280, 'type=payment');
				}
			}
			 
		}
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmed() || this.isLover() ? "endgame1jade" : "";
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (Place == 280 && this.isHere()) {
				// Visiting in her room
				if (this.isCharmedBy()) addComments(this.addPersonFace() + 'You have already <i>Charmed</i> Jade.');
				else if (this.checkFlag(24)) addComments("It seems pointless to try this here, besides you decided to <b>not</b> charm her!");
				else if (this.checkFlag(2)) addComments("It seems pointless to try this again, at least here!");
				else dispPlace(280, 'type=castcharmroom');
				return "handled";
			}
			if (Place == 435 && this.isHere()) {
				// Seeing her at the gym
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here.  It\'s too public.");
				else if (this.isCharmedBy()) addComments(this.addPersonFace() + 'You have already <i>Charmed</i> Jade.');
				else if (this.checkFlag(17)) addComments("It seems pointless to try this again, it is not going to work here");
				else dispPlace(435, 'type=castcharmgym');
				return "handled";
			}	
			if (Place == 247 && this.isHere()) {
				// Seeing her at the gym
				addComments(this.addPersonFace() + 'Jade is a ghoul of Lilith, you cannot charm her.');
				return "handled";
			}
			if ((Place == 53 || Place == 141) && ((sType.indexOf("ritualreturn") != -1 && sWho == "jade") || sType == "ritualtrap")) {
				CastCharmSpell("Jade", Place, 4, 'type=charmjade1');
				return "handled";
			}
		}
		
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell has no effect, Jade is still protected here.");
					return "handled";
				}
				if (!CastTransform(1, true, this.checkFlag(30))) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(53, 'type=jadetransformbody' + this.dress.toLowerCase());
				return "nofooter";
			}
		}		
		return "";		// do nothing
	};
	
	per.isKnowPhoneNumber = function() { return (this.checkFlag(21) && !this.checkFlag(22)) || this.isCharmedBy() || this.isLover(); };
	
	per.isPhoneable = function(msg) 
	{
		// Can you call them?
		if ((Place == 53 || Place == 141) && this.checkFlag(21) && !this.isCharmedBy() && !this.checkFlag(22) && !this.isHere()) return true;
		if (this.isLover() && msg === true) return true;
		if (this.isLover() || this.isCharmedBy()) {
			if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
			if (this.isDanceAvailable()) return true;
		}
		return false;
	};
	
	per.callThem = function() 
	{
		if ((Place == 53 || Place == 141) && wherePerson("Seraphina") != 282) {
			if (Place == 53 && whereItem(35) == -53 && isPersonHere("Seraphina") && (sType == "ritualreturnprepare" || sType === "")) {
				gotoPlace(Place, 'type=ritualreturnprepare&who=jade');
				receiveCall('', 'You call Jade and tell her you are ready for the ritual and to join you, giving directions to exactly where you are.');
			} else if (Place == 53 && whereItem(35) != -53) WriteComments("The Hidden Room is not a place of power, Jade will recognise this and be on her guard. You reconsider trying anything here now.");
			else {
				gotoPlace(Place, 'type=ritualtrap&who=jade');
				receiveCall('', 'You call Jade and lie telling her you are ready for the ritual and to join you, giving directions to exactly where you are.');
			}
			WriteCommentsFooter(bChat, bChatLeft);
			return;
		}
		if (this.isLover(true)) {
			if (Place == 269) {
				if (this.isLover(true)) WriteComments("You consider calling Jade, but decide not to, you do not think she would go swimming with you for fun.");
				else if (this.isLover(false)) {
					gotoPlace(Place, 'type=jadepool');
					receiveCall('', 'You call Jade to invite her to join you at the pool for a swim, and she answers that it is agreeable and will be there in a while.');
					WriteCommentsFooter(bChat, bChatLeft);
				} else WriteComments("While Jade would swim with you here is ordered, she is tied up back at the club so cannot join you here.");
				return;
			}
		}
	};
}
