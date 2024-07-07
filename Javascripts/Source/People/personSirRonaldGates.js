/****************************************************************
		Sir Ronald Gates
 ****************************************************************/
var perGates;	// Sir Ronald Gates global instance


// Conversation responses
function RepliesSirRonald(nR)
{
	var myName = perYou.getPersonName();
	if (perGates.other > 0) myName = perYou.getSex();
	var ret = true;

	if (nR == 30)  //  Have the option of demanding the book until you accept the apprenticeship.
	{
		addComments('"Well then, nice to meet you ' + myName + '," he says as he regards you for a moment.  "Such a polite youngster. You just might be exactly what I have been looking for."<br>');
		perGates.other = 1;
	}
	else if (nR == 31)
	{
		addComments('"Time is running out, dear ' + myName + ', and I must find an apprentice. Someone of integrity. Someone who wouldn\'t just abuse the gift for their own nefarious ends.  Do you think you could be that person?"');
		perGates.other = 2;
	}
	else if (nR == 32)
	{
		addComments('"Magic, my ' + myName + '!" he says, casting a mischievous smile your way.  "Are you interested in learning the ancient arts?"');
		perGates.other = 3;
	}
	else if (nR == 33)
	{
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit
		addComments(
			'<p><img src="Images/Items/stone1.png" style="width:15%;float:right;margin-left:5px;margin-bottom:1em" alt="Citadel">"Wonderful!" exclaims the old man. "We can start your training immediately. You must learn the art of reading magic. Find a magical stone for me and I will teach you the magic scripts. These stones can look like an old weathered stone or a small piece of sculpture with a rune engraved on it." He shows you drawing in a book of such a stone.<br><br>' +
			'You ask where you can find these stones and he smiles "That would hardly be a test for my apprentice now would it?" You agree but wonder if Mr. Beasley might be able to help?</p>' +
			'<p>He continues, "I can offer you some mundane assistance in your apprenticeship, you are welcome to ask when you need it"</p>' +
			'<p>He continues, "You are free to use my library and also there is a ritual space set up in the basement you may use anytime." He hands you a key to the basement, but you notice <b>not</b> to the front door.'
		);
		perYou.startQuest(1);
		perGates.other = 9;
		findPerson("Sarah").charmed = -1;
	}
	else if (nR == 35) // done
	{
		perYourBody.AddItem(27, true); // place letter of credit in your inventory (or here)
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit
		addComments('"You\'re welcome, my ' + myName + '. Please accept this letter of credit. It should help you in the future." He hands you a document ');
		if (whereItem(27) > 0) addComments('but as you cannot carry it now he puts it on a table for you to get later.<br>');
		else addComments('and you put it in your bag.<br>');
	}
	else if (nR == 37) // done
	{
		perGates.setFlag(2);
		addComments('"Simple financial aid, when you are short of money I can offer you some help.');
		if (nMoney < 20 && isItemNotHere(27, 17)) {
			perYourBody.AddItem(27, true); // place letter of credit in your inventory (or here)
			addComments(' Please accept this letter of credit. It should help you in the future."  He hands you a document ');
			if (whereItem(27) > 0) addComments('but as you cannot carry it now he puts it on a table for you to get later.');
			else addComments('and you put it in your bag.');
		} else addComments('"');
		addComments('</p>He continues "You are also welcome to study the books in my library, I have an extensive collection of occult works."');

	}
	else if (nR == 314)
	{
		if (perYourBody.FindItem(4) === 0)
		{
			perYourBody.PutItem(4);  // Put the book in your inventory
			perYou.completeQuest(4);
			addComments('"Very well then my apprentice. Take this book and learn your first spell."');
			perGates.other = 15;
		}
		else
		{
			addComments('"Very well then, my apprentice.  Ready to try again?"');
		}
		if (!isRunes()) setQueryParams("type=learnclairvoyance");
		else {
			Research("Spell", "TuoDuo");
			ret = false;
		}
	}
	else if (nR == 400) //   ask about spells in a place of power
	{
		addComments('"Ah yes, my ' + myName + ' a <i>place of power</i> like the Sacred Clearing increases the power of spells to a degree, strengthing some and allowing others to work that cannot work elsewhere."');
		perYou.setFlag(68);
	}	
	else if (nR == 499) //   Starts the MURDER PATH
	{
		addComments('"My book? How dare you demand my property!');
		if (perGates.other > 0) addComments(' I guess I was wrong about you.  ');
		addComments(' I suggest that you leave here before I call the police."');
		perGates.other = 500;
	}
	else if (nR == 500)
	{
		addComments('"Never! It is too dangerous for someone such as you.  There is no end to the evil that you could unleash!"');
		perGates.other = 501;
	}
	else if (nR == 501)
	{
		addComments('You wrestle for the gun and CRACK! The gun fires.<br><br>You check your body to see if you are wounded. Blood is on your shirt but it isn\'t yours. ' + perGates.getPersonNameShort() + ' crumples to the floor, gasping for air. Blood drips from his lips as he quickly dies.');
		perGates.setFlag(1);  // Starts Murder Path
		perYou.startQuest(1);
		perYou.addCorruption(5);
		charmPerson("Anita", 1, "Davy");
		charmPerson("Mayor", 1, "Davy");

		PlaceI(4, 17);  // places book in the room
		PlaceI(22, 17);  // places $10 letter in the room
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit

		perGates.other = 502;
		setQueryParams('type=postmurder');
		Place = 17;  // Sir Ronald is Dead but before Police show up.
		//return false;
	}
	else if (nR == 600)
	{
		bChat = false;
		addComments(
			'"My dear ' + myName + ' there is something dangerous outside at night that seeks my family. I cannot allow anyone in or out of my home.</p><p>Do not worry I will make a spare room available for you for whenever you are here."</p>' +
			'<p>He makes a quick call you can only hear parts of it "the guest room...yes my dear..as soon as you can Lauren..."</p>' +
			'<p>When he hangs up he tells you sternly,</p>' +
			'<p>"My ' + myName + ' do not try to use magic on Lauren, I have protected her, it is a limited protection, and you could bypass it with persistence. If you do my niece and I will never forgive you and your apprenticeship will be over."</p>' +
			'<p>A moment later the maid enters the room and escorts you upstairs to a guest room.</p>'
		);
		perGates.setFlag(3);  // Open the guest room
		setPlaceKnown("MansionGuestRoom", false);
		Place = 290;
		setQueryParams("type=escort");
	}
	else if (nR == 666)
	{
		addComments(
			'"My dear ' + myName + ' I do not consort with demons, and avoid the study of them, this was the province of the damned Kurndorf. I have studied some defences but the best is to refuse any offer and never deal with them."</p>' +
			'<p>He hesitates, "There was a <i>woman</i> who once met with me". You can hear the contempt in his voice. "She was a skilled demonologist, and was not yet a demon-slave. She knew much of them and wanted to but certain magics from me. I refused, she had some strange ideas about prices"</p>' +
			'<p>You ask more about this woman, and he answers,</p>' +
			'<p>"She called herself Mistress Jade" he shakes his head, and continues, "apparently she is based out of a \'gentleman\'s club\' in town. I have no idea where that place is, I doubt it is listed publicly, try asking someone else where it is."</p>' +
			'<p>Strange, you have never hear of such a club in town, it must be very private!</p>'
		);
		perGates.setFlag(6);
	}
	else if (nR == 667)
	{
		addComments(
			'"My dear ' + myName + ' there are creatures that live along side out workd, and can travel here through <i>thin</i> places as the ancient Celts called them. Often you find standing stones marking the places."</p>' +
			'<p>He pauses and continues "There is such a place in the Sacred Clearing but how <i>thin</i> it is varies, the end of the year is when it is thinnest, but not <b>our</b> year but at Samhain and All Hallows Eve."</p>' +
			'<p>He looks at you "Other things will also affect it, like powerful magics, seances, and other summonings. There is also the Hellgate". You ask about the Hellgate, and he looks thoughful.</p>' +
			'<p>"Another time my dear ' + myName + '" and will not further discuss it.'
		);
		perGates.setFlag(11);
	}	
	else if (nR == 700)
	{
		addComments(
			'You tell ' + perGates.getPersonNameShort() + ' about seeing Leanne in the Mother Superiors room and your concern to rescue your friend. He looks thoughtful and replies,</p>' +
			'<p>"My dear ' + myName + ', I have not studied much the ways of demonology, it smacks too much of the ways of Kurndorf.</p>' +
			'<p>So I cannot directly help you, aside from telling you I believe it is possible I have read of people being freed from demons and their slavery, but I do not know the process.</p>' +
			'<p>You need to research the ways of demonology. The lovely owner of the Antiques ' + getShopStore(true) + ' in town is very knowledgable on matters of the occult, she may have some suggestions."</p>' +
			'<p>You thank him for the information.</p>'
		);
		setPersonFlag("Leanne", 7);
	}
	else if (nR == 800) //   Starts the Soft MURDER PATH
	{
		addComments(' I guess I was wrong about you. We have nothing more to discuss, please leave my house. ');
		perGates.other = 499;
		findPerson("Sarah").charmed = -1;
	}
	else if (nR == 999) // Lost the book
	{
		if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.
		setPlaceKnown("TownHall");	/* Access town hall */
		addComments('"Oh dear. This is very bad my ' + myName + '. You must go to the police immediately but be careful.  It sounds like those working against us may have learned magic."');
	}
	else if (nR == 901) // v9 = Aftane plot
	{
		perYou.setQuestAftane(10);
		PlaceI(41, 17); // Set the Aftane in the room w/ you.
		addComments('"A very important artifact, my ' + myName + '. It is the best weapon and protection against the undead and evil spirits." He says, looking at you thoughtfully for a moment before setting it on his desk.  "I want you to take it for the dangers ahead."</p>');
	}
	else if (nR == 910)
	{
		addComments('"Keep it with you at all times." He says, "Eventually my greatest enemy will find a way to resurrect himself.  As my apprentice, you must have the talisman to stop him in my stead."');
		perYou.setQuestAftane(11);
	}
	else if (nR == 911)
	{
		addComments('<p>' + perGates.getPersonNameShort() + ' raises his eyebrow, "And how do you know this?"</p>');
		perYou.setQuestAftane(12);
	}
	else if (nR == 912)
	{
		addComments('<p>' + perGates.getPersonNameShort() + ' looks at you with an understanding gaze.  "Fear not, my ' + myName + '," He says, attempting to reassure you.  "Such a thing was innevitable.  At least I am still here to help.  What has he requested of you?"</p>');
		perYou.setQuestAftane(15);
	}
	else if (nR == 913)
	{
		addComments('<p>"Tricked you did she?" He asks suspiciously.  "She could do nothing from her prison underneath the hotel.  Unless you helped her that is," He says, raises his eyebrow.  "It matters little either way.  His return was innevitable.  What has he requested?"</p>');
		perYou.setQuestAftane(15);
	}
	else if (nR == 915)
	{
		addComments('<p>"Hmmm," He says rubbing his chin as he thinks for a moment.  "According to my research, he was not attempting to cast any major ritual at the time of his death.  It must be a ruse of some kind.  Did he attempt anything at the séance?"</p>');
		perYou.setQuestAftane(20);
	}
	else if (nR == 916)
	{
		addComments('<p>"Most odd," He says rubbing his chin as if deep in thought.  "Most unexpected.  Did he try anything during the séance then?"</p>');
		perYou.setQuestAftane(20);
	}
	else if (nR == 920)
	{
		addComments('<p>"Good.  I\'m most pleased you were able to find that key then.  Otherwise I\'m afraid we would be in a most dire-some situation." ' + perGates.getPersonNameShort() + ' says quite seriously.  "Kurndorf had many... <i>creatures</i> under his command.  Things could have been much worse."');
		perYou.setQuestAftane(25);
	}
	else if (nR == 925)
	{
		addComments('<p>"Good.  I was afraid that he might summon a minion of some sort upon failing to possess your body.  This seemed to have worked in our favor then."</p>');
		perYou.setQuestAftane(50);
	}
	else if (nR == 926)
	{
		addComments('<p>"Oh no...  I was afraid of this.  Did he summon a creature, a demon perhaps?"</p>');
		perYou.setQuestAftane(30);
	}
	else if (nR == 930)
	{
		addComments('<p>"I\'m afraid I will be of little use in fighting demons...  Normal objects are quite useless against them... perhaps if it was a blessed item...  A gun perhaps?  I wish I could say more."</p>');
		perYou.setQuestAftane(50);
	}
	else if (nR == 950)
	{
		addComments('<p>"Hmm..." I am not sure what he is planning, but it sounds nothing like any charm spell I am aware of." He says thoughtfuly.  "Perhaps I may have a trick for you though."</p>');
		perYou.setQuestAftane(51);
	}
	else if (nR == 951)
	{
		addComments('<p>"He spoke of a skull in his ritual as well as a <i>personal</i> item.  Perhaps, if you could find <i>his</i> skull, you may be able to use it against him!"</p>');
		perYou.setQuestAftane(60);
	}
	//else if (nR == 960)
	//{
	//	addComments('<p>' + perGates.getPersonNameShort() + ' nods, "I only sometimes use it on the weekends, you are welcome, just do not make a habit of it"</p>');
	//	setPersonFlag("Brandi", 20);
	//}	
	else if (nR == 1901)
	{
		setPersonFlag("Brandi", 20);
		addComments('You ask ' + perGates.getPersonNameShort() + ' to borrow his limo for the evening for your Mom and Aunt to enjoy limo ride on the weekend. He replies, "Fear not, my ' + myName + ' I seldom need it on the weekend, it is yours". You discuss details of when to arrive and so on and the thank him for his help.');
	}
	else if (nR == 3000)
	{
		//<ask about moving the ghost>
		setPersonFlag("Ghost", 11);
		addComments(
			'You ask ' + perGates.getPersonNameShort() + ' about ghosts and what keeps them tied to a particular place, and if they can move from that place,</p>' +
			'<p>"Well ' + myName + ' are you having problems with a simple ghost, they are almost always harmless, unless you are in a Place of Power?"</p>' +
			'<p>You explain a little about Nurse Keana and wanting to free her from the hospital basement, but not anything more. ' + perGates.getPersonNameShort() + ' sits back and thinks for a few minutes and answers,</p>' +
			'<p>"There are a number of ways, but exorcism is not what you seem to want. Just to move a ghost is simple, as long as you have a magical tie to them. Either an item of personal importance or a magical binding or a link of other sort. If you do, take them by the hand, and lead them where-ever you desire and keep them there until dawn. The following night they will be there again and will stay there. In some cases you may need to repeat, but mostly they will stay."'
		);
	}
	else if (nR == 5904)
	{
		addComments('<p>"A little blue bottle, eh my ' + myName + '?" He asks, a curious expression on his face.  "And why would you need it?"</p>');
		perDavy.setQuestBlueBottle(5);
	}
	else if (nR == 5905)
	{
		addComments('<p>"Well then," He says with an almost prideful look on his face as he pulls the bottle out and sets it on his desk.  "By all means, do what you must.  Just be careful...  There <i>used</i> to be quite a lot of power within this little trinket..."</p>');
		perDavy.setQuestBlueBottle(9);
		PlaceI(33);  //Put the blue bottle here
	}

	return ret;
}

// Gates Family

function initialiseGates()
{
	// Sir Ronald Gates
	perGates = addPerson("Sir Ronald", 0, "SirRonald", '', false);

	per.getPersonGender = function() { return "man"; };
	per.Replies = RepliesSirRonald;

	per.isPersonInfo = function() { return isCharmedPath() && this.other > 8 && this.other != 499 && this.other != 500; };
	per.getPersonInfo = function()
	{
		return this.addPersonString("gates6.jpg", "40%") +
			this.getPersonName() + ', your mentor and guide who helps you in your quest to get rid of the evil surrounding the area. He proves to be a powerful warlock who certainly has some magic spells in his pocket. He told you about his story in bits, because he is not the talkative type. He is part of a family that is decades old and been fighting demons for generations. He mentioned you about the other candidates for the apprenticeship. They all failed at some point and he felt he will never find the "true one". But when he first saw you he saw something in you, something otherwordly.<br><br>' +
			this.getPersonNameShort() + ' is looking out at the two sided windows behind his desk at the moment, frequently sniffing into his pipe contemplating about you and your quest. What should you tell him?';
	};

	per.getPersonName = function() { return this.name + " Gates"; };
	per.getPersonNameShort = function() { return this.name; };
	
	per.getPossessionFace = function() { return "gates6"; };
	
	per.showEventPopup = function()
	{
		// Lift with the limo driver
		// TODO vary for Sofia events
		if (sType == "limolift") {
			showPopupWindow("A Limo Ride",
				"<img src='Images/limo.jpg' style='float:right;width:45%;margin-left:5px' alt='Limo'>" +
				'<p>"No problems my ' + perYou.getSex() + ' I can have my driver drop you off in town. Unfortunately they are not here at the moment, once they return I will immediately have them drive you into town. Meanwhile feel free to study or we can talk more of magic."</p><p>You spend the rest of the ' +
				(isDay() ? 'day' : 'night') + ' at the Mansion, either chatting, reading or napping. After a time ' + this.getPersonNameShort() + ' tells you the limo is ready and walks with you to the from of the mansion.You are surprised how he comes with you, like he is keeping an eye on you. He personally opens the door of the limo for you, the driver is already in the limo but you can only make out a vague figure through the tinted windows.</p>' +
				'<p>You enjoy a short drive in the limo and it pulls up you realise in front of your home. A voice says you may leave the limo now, again odd that they do not open the door for you or similar. You get out and close the door and the limo drives away</p>'
			);			
			return true;
		}
		
		if (Place == 16) {
			if (sType == "startsoftmurder") {
				showPopupWindow("Locked Out",
					"<img src='Images/ghost2.png' style='float:right;width:25%;margin-left:5px' alt='Ghost'>" +
					'As you leave you hear a loud clacking as multiple locks are secured on the front door. It seems you are not welcome back. You are not surprised after your confrontation with ' + this.getPersonNameShort() + ' but he has the Book! How can you get it?</p>' +
					'<p>As you walk away from the door, deep in thought, you see a ghostly figure standing a distance away from the mansion, possibly a man, but it is so indistinct and barely visible.. The figure beckons to you and moves to lead you somewhere into the trees at one side of the mansion. As you do not immediately follow the figure waits, very slowly gesturing for you to follow.</p>' +
					'<p>A ghost! What is happening here, as you look at the vision you hear a loud noise inside the mansion, but so muffled by distance you have no idea what it was.</p>' +
					'<p>The figure beckons...'
				);			
				return true;
			}
			if (sType == "startconspiracy") {
				showPopupWindow("Locked Out",
					"<img src='Images/door6.jpg' style='float:right;width:25%;margin-left:5px' alt='Door'>" +
					'As you leave you hear a loud clacking as multiple locks are secured on the front door. It seems you are not welcome back, you guess ' + this.getPersonNameShort() + ' does not allow second chances. Maybe he will reconsider later, or maybe you will. Then again the idea of being his apprentice...essentially being his servant...just does not appeal.</p>' +
					'<p>The trouble is that he has the Book! How can you get access to it now? You will have to reconsider your options, maybe it is best to return home, have a snack and think it through.<p>' +
					'<p>You see the taxi is still waiting for you...'
				);			
				return true;
			}
		}
		
		if (sType !== "" || Place != 17) return false;
		
		// Popup for the quest for the rusty key
		if (this.other == 16 && !this.checkFlag(4)) {
			this.setFlag(4);
			showPopupWindow("Clairvoyance and The Next Quest",
				this.addPersonString('gates7.jpg', "height:max%") +
				getSpellDescription("Clairvoyance") + '</p>' +
				'<p>Now you know the spell ' + this.getPersonNameShort() + ' congratulates you, "You are doing well my apprentice." and he hands the Book to you, "You will need this to continue your studies". With some pleasure you pick up the Book, finally!</p>' +
				'<p>' + this.getPersonNameShort() + ' interrupts your contemplation of the Book, "Now use your power to find me a special artifact. It is an <b>old key</b> that was stolen from me two years ago, I think by an employee who left my service at that time."</p>' +
				'<p>You ask about the person but he dismisses your query "No, no, nothing useful there, it is lost somewhere, that I can tell. Use your brains and your magic!"'
			);
			return true;
		}
		
		if (isCharmedBy("Lauren") && Math.random() < 0.2) {
			this.other += 300;
			if (this.other >= 700) this.other = 300;
			unCharmPerson("Lauren");
			showPopupWindow("Apprenticeship Over!",
				this.addPersonString('angry.jpg', "40%", "right") +
				'Sir Ronald is looking extremely angry and he immediately confronts you,</p>' +
				'<p>"You enspelled Lauren! Sarah will never forgive you for that and nor will I! I am going to have to call in a favour and have the spell removed from her!"</p>' +
				'<p>"You are no longer my apprentice, get out of my house, get out!"</p>' +
				'<p>He escorts you out of the mansion and slams the front door behind you. You doubt you will be able to return or seek his advice ever again!',
				"dispPlace(16)"
			);
			return true;			
		}
		
		if (perLilith.place == -1 && !this.checkFlag(12)) {
			this.setFlag(12);
			showPopupWindow("Sir Ronald and the Vampyre",
				this.addPersonString('gates7.jpg', "height:max%", "left") +
				perLilith.addPersonString('notinvited.jpg', "height:max%", "right") +
				'Sir Ronald starts to ask "So who is this young woman you have brought to see...." but he stops and clearly casts a spell. He pauses and asks Sarah,</p>' +
				'<p>"Is this the one", and she replies "Yes Uncle Ronnie", and he then asks you "This is in your control?"</p>' +
				'<p>You confirm and say Sarah taught you the spell and how there seemed no choice, Lilith was going to attack and kill Sarah otherwise. Sir Ronald sits down and says,</p>' +
				'<p>"All right then..." and he directly looks at Lilith and says "You may never again enter this room. Please leave now". You tell Lilith to wait outside in the hallway, and she quietly leaves the room.'
			);			
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 19 && sType == "contemplate") {
			// Contemplate the bowl
			md = WritePlaceHeader();
			AddImage("Items/metalbowl.jpg");
			addPlaceTitle(md, "Meditating on the bowl");
			md.write('<p>You look at the metal bowl of water but meditation has never been a thing for you.</p>');
			startQuestions();
			addLinkToPlaceC(md, "that is enough", Place);
			WritePlaceFooter(md);
			return true;	
		}
		
		if (sType == "askcharm") {
			md = WritePlaceHeader();
			this.setFlag(7);
			var nSlaves = 0;
			var p;
			for (var i = 0; i < arPeople.length - 3; i++) {
				p = arPeople[i];
				if (p.isCharmedBy()) nSlaves++;
			}

			this.showPerson("charm.jpg");
			addPlaceTitle(md, "The Forbidden Charm Spell");
			md.write(
				'<p>You confess to ' + this.getPersonNameShort() + ' about learning the spell you found, the forbidden Charm spell,</p>' +
				'<p>' + this.getPersonNameShort() + ' shakes his head, "The worst of the excesses of the warlock Kurndorf were owed to that foul spell. I had hoped it was a lost spell but it seems there was a copy hidden away. my ' + perYou.getSex() + ' you must resist temptation, never, never cast it!"</p>'
			);
			if (nSlaves > 0) md.write('<p>You hesitate, remembering it was forbidden, and you have crossed the line and actually used it.<p>');
			
			startQuestions();
			startAlternatives(md);
			addLinkToPlace(md, 'promise to never cast the spell', Place, 'type=askcharmtruth');
			addLinkToPlace(md, 'promise to never cast the spell knowing you are lying', Place, 'type=askcharmlie');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "askcharmtruth") {
			md = WritePlaceHeader();
			this.showPerson("gates6.jpg");
			addPlaceTitle(md, "Your Promise");
			md.write(
				'<p>You promise to never cast the spell, fully intending to avoid the excesses of Kurndorf. You hope you can avoid the temptation!!</p>' +
				'<p>' + this.getPersonNameShort() + ' looks pleased and changes the topic of the conversation to something inconsequential.</p>'
			);
			this.setFlag(8);		// Good Path
			// Now set people as charmed by Davy

			startQuestions();
			addLinkToPlace(md, 'talk of something else', Place);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "askcharmlie") {
			md = WritePlaceHeader();
			this.showPerson("gates7.jpg");
			addPlaceTitle(md, "Your Hollow Promise");
			md.write(
				'<p>You realise you can never talk about the spell or using it with him! You promise to never cast the spell, fully realising you will to achieve your goals!</p>' +
				'<p>' + perGates.getPersonNameShort() + ' looks pleased and changes the topic of the conversation to something inconsequential.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'guiltily talk of something else...', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "learnclairvoyance") {
			// Learn Clairvoyance
			md = WritePlaceHeader();
			if (!isCharmedPath()) {
				// Sarah is teaching you.
				findPerson("Sarah").showPerson("sarah9a.jpg");
			}	else {
				// Sir Ronald Gates is teaching you
				this.showPerson("gates6.jpg");
			}
			addPlaceTitle(md, "New Spell Research");
			md.write(
				'<form method="POST" name="FormChar">' +
				'<p>I want to look up the word(s):</p>' +
				'<p><input type="text" size="20" name="research">' +
				'<input type="button" name="button" value="please" onClick="ResearchOLD(\'C\', document.FormChar.research.value)"></p></form>'
			);
			addLinkToPlace(md, 'Never mind...', isCharmedPath() ? 17 : 192);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 17) {
			if (sType == "softmurder") {
				md = WritePlaceHeader();
				// Enter the study after he is killed by Anita
				movePerson('Kurndorf', 0);
				updatePath();
				if (!this.checkFlag(1)) {
					this.setFlag(1);  // Starts Murder Path
					perYou.startQuest(1);
					this.other = 600;
					charmPerson("Anita", 4, "Davy");
					charmPerson("Mayor", 1, "Davy");
					PlaceI(4, 17);  // places book in the room
					PlaceI(22, 17);  // places $10 in the room
				}
				if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit

				addPlaceTitle(md, "Through the Looking Glass...Door", "gatesstairs1.jpg");

				md.write(
					'<p>It was a strange feeling walking <i>through</i> the door, but you are now back inside the mansion. Hopefully you can convince ' + perGates.getPersonNameShort() + ' to let you study the book, or maybe apologise to him.</p>' +
					'<p>You hear voices, one of them sounds like Davy Robbins, the other you do not recognise,</p>' +
					'<p>"..did you find it?"</p>' +
					'<p>"No Sir, he refused to tell me so I dealt with him"</p>' +
					'<p>"What..I mean..<i>he</i> wanted that..but I did not tell you to...Look let\'s get out of here, I do not know if the spell will work again, I think it is distorted, or just I learned it wrong, we could only go here or back, not anywhere."</p>' +
					'<p>He calls out a strange word and you see them both fade from view and just vanish! You wonder what the woman meant by \'dealt with\' and walk over to where they were. You immediately stumble and fall, and you land on the dead body of ' + perGates.getPersonName() + ' shot through the heart!</p>' +
					'<p>Your shirt is covered in his blood as you scramble back to your feet, and you realise there is no-one who is going to believe you walked through a closed door to witness the killers vanish into thin air!!</p>' +
					'<p>A murder scene is not the place to be and you are frightened of someone entering the room and blaming you, but you are still obsessed with the book. You look around where you saw it before, and notice a drawer nearby, you open it and inside you see the Book!!</p>'
				);

				startQuestions();
				addLinkToPlace(md, "exit the house", 16);
				WritePlaceFooter(md);
				return true;
			}
		}
			
		if (Place == 297 && sType == "readdiary") {
			// Sir Ronald's Diary
			md = WritePlaceHeader(true);

			if (getPersonOther("Tracy") < 4) {
				setPersonOther("Tracy", 4); // move Tracy to the laundry
				if (wherePerson("Tracy") === 0) movePerson("Tracy", 1);		// Very unlikely but possible
			}

			addPlaceTitle(md, perGates.getPersonNameShort() + "\'s Diary", '', 0, true);

			md.write(
				'<div style="text-align:center"><br><table style="width:99%">' +
					'<tr>' +
						'<td style="background-image:url(UI/books/booktopleft.jpg);width:30px">&nbsp;</td>' +
						'<td style="background-image:url(UI/books/booktop.jpg)">&nbsp;</td>' +
						'<td style="background-image:url(UI/books/booktopright.jpg);width:30px">&nbsp;</td>' +
					'</tr><tr>' +
						'<td style="background-image:url(UI/books/bookleftside.jpg);width:30px">&nbsp;</td>' +
						'<td style="background-image:url(UI/books/bookbackground1.jpg);text-align:left;padding:0 5px 0 5px;color:black">26 August' +
						  '<p>He visited me again today and again he asked for ' +
						  'the artifact. He knows that I have it now and he knows ' +
						  'that his power is limited until I surrender my artifact.</p>' +
						  '<p>All these years I hoped that Beasley forgave my ' +
						  'ancestors for the ownership. Only recently did I witness ' +
						  'his jealousy. Maybe it has been within him all along his ' +
						  'training in the arts. Worse yet, his apprentice Davy ' +
						  'has an influence I like not. That young man has ambitions ' +
						  'which I am scared to tell Beasley. They have no ' +
						  'appreciation of the meaning of guardianship of the most powerful book on earth.</p>' +
						  '<p>I fear that they will send someone to steal my ' +
						  'artifact. So much that I have taken to wearing a loaded ' +
						  'gun. God help us if the book should fall into the wrong hands.</p>' +
						  '<p>I told the authorities about my danger. Mayor Thomas ' +
						  'guaranteed me that she would protect my life. I hope that she can do so.</p>' +
						'</td>' +
						'<td style="background-image:url(UI/books/bookrightside.jpg);width:30px">&nbsp;</td>' +
					'</tr><tr>' +
						'<td style="background-image:url(UI/books/bookbottomleft.jpg);width:30px">&nbsp;</td>' +
						'<td style="background-image:url(UI/books/bookbottom.jpg)">&nbsp;</td>' +
						'<td style="background-image:url(UI/books/bookbottomright.jpg);width:30px">&nbsp;</td>' +
					'</tr>' +
				'</table></div><br>'
			);

			startQuestions("Close the book and then...");
			addLinkToPlace(md, "return to the attic", Place);

			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.showPersonChat = function(md)
	{
		if (Place != 17 || isMurderPath() || sType !== "") return;
		
		if (perGates.other == 500) addQuestionC(md, '"I <i>must</i> have the book!"', "SirRonald", 500);
		else if (perGates.other == 501) addQuestionCO(md, 'wrestle for the gun', "SirRonald", 501);
		if (perGates.other > 5 && perGates.other < 499 && !perGates.checkFlag(2)) addQuestionC(md, '"What sort of mundane assistance can you offer?"', "SirRonald", 37);

		if (perGates.other < 5) {
			startAlternatives(md);
			addQuestionC(md, '"I <i>demand</i> you give me the book!"', "SirRonald", 499);
		}
		if (perGates.other === 0) addQuestionC(md, "introduce yourself", "SirRonald", 30);
		else if (perGates.other == 1) addQuestionC(md, '"What do you mean, looking for someone?"', "SirRonald", 31);
		else if (perGates.other == 2) addQuestionC(md, '"What <i>gift</i> are you talking about?"', "SirRonald", 32);
		else if (perGates.other == 3) {
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I accept your apprenticeship"', "SirRonald", 33);
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I refuse your apprenticeship"', "SirRonald", 800);
		}
			
		//The Blue Bottle Path Questions
		if (perDavy.getQuestBlueBottle() == 4) {
			//Know that Mrs Robbins sold the bottle to Sir Ronald Gates
			addQuestionC(md, '"' + perGates.getPersonNameShort() + '...  Did you recently, uh...  acquire  a little blue bottle?"', "SirRonald", 5904);
		} else if (perDavy.getQuestBlueBottle() == 5) {
			addQuestionC(md, '"I think that it was the source of Davy\'s power... I may be able to stop him with it."', "SirRonald", 5905);
		}
		
		//if (perGates.other < 5)	addOptionLinkC(md, "exit the house", 'LeaveMansionStudy()');
		if (perGates.other < 5)	endAlternatives(md);
		
		// Stuck!
		if (perYou.isStuck()) addOptionLink(md, '"' + perGates.getPersonNameShort() + ', I am not sure how to get back to town?"', "WaitForDayNight('', 194,'type=limolift')");
				
		// Learn clairvoyance
		if (perGates.other == 14 || perGates.other == 15) addQuestionCO(md, 'try and learn the spell', "SirRonald", 314);
		else if (whereItem(4) == 999) {
			// Lost the book when shot
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I have lost the book!"', "SirRonald", 999);
		}
		
		// Charmed spell query
		if (isSpellKnown("Charm") && !perGates.checkFlag(7)) addLinkToPlace(md, 'ask ' + perGates.getPersonNameShort() + ' about the Charm spell', Place, "type=askcharm");

		if (perYourBody.FindItem(39) > 0) {
			//Have the Rusty Key
			addOptionLink(md, "give " + perGates.getPersonNameShort() + " the old rusty key", "HandleItem(39,3,false)");
		}

		if (perYou.getQuestAftane() == 1) addQuestionC(md, '"What is in the safe?"',"SirRonald", 901);
		else if (perYou.getQuestAftane() == 10) addQuestionC(md, '"What am I supposed to do with the talisman?"', "SirRonald", 910);
		
		//if (checkPersonFlag("Brandi", 15) && (!per.checkFlag(17) && !per.checkFlag(18) && !per.checkFlag(19) && !per.checkFlag(20))) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' to borrow his limo on the weekend', "SirRonald", 960);
		if (checkPersonFlag("Brandi", 15) && (!per.checkFlag(17) && !per.checkFlag(18) && !per.checkFlag(19) && !per.checkFlag(20))) addQuestionC(md, "ask " + perGates.getPersonNameShort() + " to use his limo for an evening","SirRonald", 1901);
		
		if (perYou.checkFlag(67) && !perYou.checkFlag(68)) addQuestionC(md, 'ask about spells in a place of power', "SirRonald", 400);
		
		//If you've accepted his apprenticeship && Haven't Demanded the book,
		//and Have < $20, and don't already have Letter of Credit && its not already here
		if (perGates.other > 5 && perGates.other < 499 && perGates.checkFlag(2)) {
			if (nMoney < 20 && isItemNotHere(27, 17)) addQuestionC(md, '"Thanks again, ' + perGates.getPersonNameShort() + ', can I ask for some more assistance."', "SirRonald", 35);
			
			// Study books		
			addPopupLink(md,  "study the books in " + perGates.getPersonNameShort() + "'s library", "Fascinating",
				'<img src="UI/books/occult' + String.fromCharCode(Math.floor(Math.random() * oImages.fixed.occult_books) + 97) + '.jpg" class="imgpopup" alt="Occult Book">You read some of the occult works, occasionally asking questions of ' + perGates.getPersonNameShort() + '. Time flies by and ' + (this.checkFlag(9) ? 'an hour passes' : 'it is late night before you know it. You definitely gained some insights into the occult!'),
				false, this.checkFlag(9) ? "WaitHere(6);dispPlace();" : "perYou.addExperience(1);WaitForMidnight();perGates.setFlag(9);dispPlace()"
			);
		}
	};

}