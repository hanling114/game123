/**************************************************************************
			Mother Superior
 **************************************************************************/
 
var oChurch = {
"cult": [
	{
		// Nun 1
		name: "Sister Charlotte",
		available: function() { return getPersonOther("Daria") === 0; },
		update: function() { setPersonOther("Daria", 1); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun1/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Charlotte and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun1/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun1/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 2
		name: "Sister Kay",
		available: function() { return getPersonOther("Daria") === 1; },
		update: function() { setPersonOther("Daria", 2); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun2/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a dark eyes nun steps into the room and she seems to have more makeup than you would assume nuns wear. She immediately asks if she is here to be disciplined, she seems to be a bit of a trouble maker, but she is quite beautiful!</p>" +
				"<p>Mother Superior explains that she has a new set of teachings to explain and rules of behaviour. The nun looks annoyed at the reference to 'rules'.</p>" +
				"<p>The nun looks suspiciously at you, you are clearly no church official. Daria introduces her to you as Sister Kay and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun2/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her rebellious nature and convince her, aided by the spell, that you are changing things and taking over from Mother Superior. You emphasise how she will be freeer if she follows you and you only.!",
			event : {
				image: "Images/Church/Nun2/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and you ask for her help in this new organisation and to obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>You then ask her to make an offering, an offering of her body and the nun eagerly gives you her all, her body and devotion!"
			}					
		}
	},
	{
		// Nun 3
		name: "Novice Priss",
		available: function() { return getPersonOther("Daria") === 2; },
		update: function() { setPersonOther("Daria", 3); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun3/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and young nun steps into the room dressed a little differently. Mother Superior explains to you that she is a novice, not yet a full nun.</p>" +
				"<p>The novice looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Novice Priss and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun3/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on the novices curiosity and eagerness to learn and promise to help teach her about the new order that is being formed and how she can become a full nun with some effort!",
			event : {
				image: "Images/Church/Nun3/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young novice will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young novice eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 4
		name: "Sister Sarah",
		available: function() { return getPersonOther("Daria") === 3; },
		update: function() { setPersonOther("Daria", 4); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun4/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Sarah and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun4/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun4/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 5
		name: "Sister Marie",
		available: function() { return getPersonOther("Daria") === 4; },
		update: function() { setPersonOther("Daria", 5); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun5/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and an older and rather buxom nun steps into the room smiling. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The nun looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Marie and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun5/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her experience and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is rather proud of her breasts and emphasise how she can serve the new order with her breasts too!",
			event : {
				image: "Images/Church/Nun5/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 6
		name: "Sister Riley",
		available: function() { return getPersonOther("Daria") === 5; },
		update: function() { setPersonOther("Daria", 6); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun6/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Riley and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun6/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun6/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 7
		name: "Sister Lea",
		available: function() { return getPersonOther("Daria") === 6; },
		update: function() { setPersonOther("Daria", 7); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun7/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Lea and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun7/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun7/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 8
		name: "Sister Hannah",
		available: function() { return getPersonOther("Daria") === 7; },
		update: function() { setPersonOther("Daria", 8); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun8/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun8/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun8/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 9
		name: "Sisters Alegra and Nikki",
		available: function() { return getPersonOther("Daria") === 8; },
		update: function() { setPersonOther("Daria", 9); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun9/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and two nuns step into the room looking very cute. Mother Superior explains a little jokingly that the sisters are sisters, as in they are blood related sisters and Sisters. She leaves aside the \"who's on first\" confusion and they tells them that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The sisters both look curiously at her and then you, you are clearly no church official. Daria introduces you to them and their names as Sisters Alegra and Nikki. Mother Superior hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun9/charm1.jpg",
			title: "Two Nuns Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell expecting to need to cast it twice, but it seems to affect both of the sisters. You build on their devotion and passion for the church into a passion for you and Mother Superior and their sister and sister nuns. You notice they are <b>very</b> receptive to the idea of passion with each other!",
			event : {
				image: "Images/Church/Nun9/charm2.jpg",
				title: "New Members",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the nuns will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in their bodies and minds.</p>" +
						"<p>Mother Superior then commands them to make an offering, an offering of their bodies, first with each other and then with you!"
			}					
		}
	},
	{
		// Nun 10
		name: "Sister Anna",
		available: function() { return getPersonOther("Daria") === 9; },
		update: function() { setPersonOther("Daria", 10); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun10/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Anna and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun10/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun10/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 11
		name: "Sister Chanel",
		available: function() { return getPersonOther("Daria") === 10; },
		update: function() { setPersonOther("Daria", 11); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun11/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Chanel and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun11/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun11/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},	
	{
		// Nun 12
		name: "Sister Alexa",
		available: function() { return getPersonOther("Daria") === 11; },
		update: function() { setPersonOther("Daria", 12); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun12/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Alexa and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun12/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun12/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 13
		name: "Sister Maia",
		available: function() { return getPersonOther("Daria") === 12; },
		update: function() { setPersonOther("Daria", 13); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun13/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Maia and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun13/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun13/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 14
		name: "Sister Li",
		available: function() { return getPersonOther("Daria") === 13; },
		update: function() { setPersonOther("Daria", 14); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun14/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Li and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun14/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun14/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	},
	{
		// Nun 15
		name: "Sister Summers",
		available: function() { return getPersonOther("Daria") === 14; },
		update: function() { setPersonOther("Daria", 15); setPersonFlag("Daria", 14); AddMana('charm'); },
		image: "Images/Church/Nun15/start.jpg",
		title: "Initiation into the Cult",
		text: "Mother Superior calls and a rather cute young nun steps into the room looking very pious. Mother Superior explains that she has a new set of teachings to explain and rules of behaviour.</p>" +
				"<p>The young woman looks curiously at her and then you, you are clearly no church official. Daria introduces her to you as Sister Summers and hesitates...",
		button: "you cast the charm spell",
		event : {
			image: "Images/Church/Nun15/charm1.jpg",
			title: "A Nun Under a Charm Spell",
			button: "the cult has grown",
			text: "You recite the spell and build on her devotion and passion for the church into a passion for you and Mother Superior and her fellow nuns. You notice she is <b>very</b> receptive to the idea of passion and her fellow nuns!",
			event : {
				image: "Images/Church/Nun15/charm2.jpg",
				title: "A New Member",
				button: "Mother Superior asks her to leave for now",
				text: "Mother Superior explains about the cult and her complete devotion to you and how the young nun will help her in all things and obey you above <b>all</b> others. You reinforce this as the spell builds the arousal in her body and mind.</p>" +
						"<p>Mother Superior then commands her to make an offering, an offering of her body and the young nun eagerly gives you her all, her body and mind!"
			}					
		}
	}	
]
};

function RepliesMotherSuperior(nR)
{
	switch (nR) {
	case 15101:
		setPlaceFlag("Church", 7); // Set Mother Superior as having stopped you.
		setQueryParams('type=stopped&from=chalice');
		break;

	case 15102:
	case 15103:
	case 15104:
		if (!checkPlaceFlag("Church", 7)) {
			setPlaceFlag("Church", 7); // Set Mother Superior as having stopped you.
			setQueryParams('type=stopped&from=' + nR);
		} else {
			bChatLeft = false;
			if (!gameState.bShowSpeaker) addComments(per.addPersonFace());
			addComments('Mother Superior appears before you wagging her finger as if to wield a sword against you.  "And just where do you think <i>you\'re</i> going?" she asks.  "You have no business other than here in this place of God."</p>');
		}
		break;

	case 3000:
		//<ask about moving the ghost>
		setPersonFlag("Ghost", 12);
		addComments(
			'You ask the Mother Superior about ghosts and what keeps them tied to a particular place, and if they can move from that place,</p>' +
			'<p>"My ' + perYou.getWitch(true) + ' the church does not acknowledge the existence of ghosts, the dead go to their eternal reward. Demons and evil spirits can walk the earth but an exorcist is needed to handle them.</p>' +
			'Except, you may wish to speak to Sister Desiree, before she became a Nun she had some experience with ghosts as a so-called ghost hunter."</p>'
		);
		break;
	}

	return true;
}


/***************** Initialise ******************************************************************************/

function initialiseMotherSuperior()
{
	// Mother Superior
	addPerson("Daria", 382, "MotherSuperior", '', false);
	per.Replies = RepliesMotherSuperior;
	
	per.getCultMembers = function() { return this.other; };

	per.isPersonInfo = function() { return this.checkFlag(12);	};
	per.getPersonInfo = function() {
		return this.addPersonString("mothersuperior5a.jpg", "height:max%", "right") +
			"Daria, the Mother Superior, is the zealous leader of the Cult of Flesh. A religious group believing that you are their " + (perYou.isBornMale() ? 'God' : 'Goddess') + ". She serves you without ever questioning your will and would go miles just to please you in the slightest way.<br><br>" +
			"Daria was strangely unresponsive to your suggestions. It was her faith and strong will that guided her against you. It was a rocky road to charm her, but you’ve done it. Immediately after you enslaved her, she begged for forgiveness. She told you that you are her " + (perYou.isBornMale() ? "God" : "Goddess") + " and that she wishes to convert herself to a completely new religion. This religion accepts you as the one true " + (perYou.isBornMale() ? 'God' : 'Goddess') + " who should lead all mankind.<br><br>" +
			"This is all surrealistic to you. People who think you are some kind of demigod…You think Daria is crazy and the charm spell you’ve put on her altered too much of her personality. Still, she is madly in love with you and you can use her fine body anytime. So something good come out of it, right?";
	};
	
	per.getPersonNameShort = function(uncharmed) {
		return "Mother Superior";
	};

	per.getPersonAddress = function(n) { return (checkPlaceFlag("Church", 5) || checkPlaceFlag("Church", 7)) ? n ? this.place : 'Lady of our Heavenly Father Church' : n ? 0 : ''; };

	per.getPersonGender = function() { return this.checkFlag(10) ? "futa" : "woman"; };
	per.getPossessionFace = function() { return this.isCharmedBy() ? "mothersuperior6" : "mothersuperior-face"; };

	per.possessThem = function() {
		// Are we post Leanne events?
		if (!this.checkFlag(1)) {
			if (this.checkFlag(6) && wherePerson("Leanne") != 382) {
				// You did not take the thrall the first time you possessed her
				addComments("You try to complete the spell and once again possess the Mother Superior, and you feel an incredible sensation of utter rejection. You realise you will never be able to possess the Mother Superior again!");
				return false;
			} else {
				// No, so possess normally
				Place = 382;
				addComments("<p>You possess the Mother Superior from the Lady of Our Heavenly Father. You may move her within the Church grounds.</p>");
				return true;
			}
		} else if (!this.checkFlag(2) && !this.checkFlag(3) && !this.checkFlag(5)) {
			if ((nTime - this.extra[0]) < 288) {
				// Less than 1 day after 'taking' Leanne and leaving her alone
				addComments("You try to complete the spell and once again possess the Mother Superior, and you start to see through her eyes as the spell takes effect. You then feel her very confused emotions, and turbulent mixture of lust, regret and anger. You are suddenly rejected and return to your own body. The spell would have worked but she is just too troubled and strong willed. You may be able to succeed, but you should wait more time, maybe tomorrow?");
				return false;
			} else {
				// More than 1 day later
				Place = 382;
				AddMana(10);		// reduce cost
				addComments("<p>You possess the Mother Superior from the Lady of Our Heavenly Father. You may move her within the Church grounds.</p>");
				return true;
			}
		} else if (!this.isCharmedBy()) addComments("You try to possess the Mother Superior again, but it fails. It seems she is either resisting it now, or she has been affected by your previous attempts. You should try visiting her in person");
		else {
			Place = 384;
			addComments("<p>You possess the Mother Superior from the Lady of Our Heavenly Father. You may move her within the Church grounds.</p>");
			return true;
		}
		return false;
	};

	per.dispossessThem = function() {
		if (this.isCharmedBy()) return true;
		var nPossession = this.checkFlag(6) ? 2 : 1;
		addComments("You end the spell and after a moment of disorientation, you return to your own body.</p><p>");	
		if (nPossession == 1) {		
			if (whereItem(48) == 383) addComments("You did not find the relic, maybe you could of tried one of your spells, they should still work even if you are possessing someone.</p>");
			if (!this.checkFlag(1)) addComments("<p>You " + (whereItem(48) == 38 ? 'also ' : '') + "wonder if you should of done more, this was an opportunity to influence Mother Superior and the Leanne...the thrall was willing. You could repeat the possession.</p>");
			else if (whereItem(48) != 382) addComments('<p>You think you have done all you can then. Mother Superior was definitely affected. You think you could repeat again for more of an effect, but you should wait a while so she can think things over.</p>');
		} else addComments('<p>You think that may be enough to weaken Mother Superior\'s resolve but maybe not the charm spell on it\'s own...</p>');
		this.setFlag(6);
		return true;
	};
	
	per.passTimeDay = function() {
		this.setFlag(14, false);
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		// Futa reaction
		if (this.isHere() && this.isCharmedBy() && !this.checkFlag(13) && perYou.isFuta(true) && !perYou.isBornMale() && !this.isFuta()) {
			this.setFlag(13);
			showPopupWindow("Daria and Your Changes",
				this.addPersonString("mothersuperior10b.jpg", "height:max%", "right") +
				'“This is marvelous!” Daria falls to her knees the moment you reveal your new cock to her. “You continue to astonish me, my Goddess.”</p>' +
				'<p>Daria\'s devotion continues to be both impressive and mildly unsettling, and of course she is not deterred even when you remind her that you have just used simple magic to transform yourself.</p>' +
				'<p>“My Goddess, you have changed your body to experience the pleasures of flesh anew in ways you could not have before.” She keeps her head bowed submissively. “Who else but you could even dream of such?”</p>' +
				'<p>You had never really thought about it like that. Al Mass is a rare spell even among witches, that is true, but you quickly remind yourself, and Daria, that this, or any of your magic powers does not make you a goddess.</p>' +
				'<p>“And humble, too, as a goddess should be.”</p>' +
				'<p>And of course Daria is undeterred. Arguing these topics with her is really pointless. As devoted as she is to you, she really doesn\'t listen when something you say contradicts her new worldview.</p>' +
				'<p>“But you are right. We should not just praise your divinity, we should experience it together. Please my goddess, anoint me with your seed.”'
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 269) {
			if (sType == "dariapool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Daria...or should it be Mother Superior");
				md.write(
					'<p>Daria arrives, dressed is an attractive bikini, you are a little surprised she even owns one!</p>'
				);
				startQuestions();
				if (this.getCharmedLevel() != 4) addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=dariapoolsex');
				addLinkToPlaceC(md, 'say goodbye to Daria', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "dariapoolsex") {
				md = WritePlaceHeader();
				if (!isExplicit()) this.showPerson("pool-sexa.jpg");
				else this.showPersonXBG("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Daria");
				md.write(
					'<p>You ask your slutty nun to play with you more privately, and she seductively removes most of her bikini and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Daria', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		if (Place == 385) {
			if (sType == "altcharmstart") {
				// Hypnotise while she is listening to music
				md = WritePlaceHeader();
				this.setFlag(15);
				this.showPerson("altcharm0p.jpg");
				addPlaceTitle(md, "Mother Superior Listening.");
				md.write(
					'<p>You press the resume button on Desiree\'s phone and you can softly hear the music. You wait for an appropriate point and softly speak calming words to reassure her and slowly weave her into a trance-like state. A couple of times your hear a voice in the music track and you pause. When it stops you try to continue on a similar vein but still aimed at bringing her into a trance or at least something trance-like.</p>' +
					'<p>After a while you have done all you can do from here, you will have to go to the room and fully entrance her.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, "hang up the call and return to the courtyard", 319, '' ,"", 'A moment later Sister Desiree joins you, fully dressed in her habit');
				WritePlaceFooter(md);
				return true;
			} 			
		}
		
		if (Place != 384) return false;

		var md, idx, img;
		var perSister = findPerson("Desiree");
		var be = this.checkFlag(11) ? "-be" : "";
		var futa = this.getPersonGender() == "futa" ? "f" : "g";
		var fb = futa + be;
		var perLeanne = findPerson("Leanne");
		
		if (sType == "newcultmember") return GeneralEvent(oChurch, undefined, "cult");
		
		if ((this.checkFlag(15) && sType === "") || sType == "altcharm0") {
			// Not charmed, partially hypnotised
			setPersonFlag("Leanne", 27);
			setQueryParams('type=altcharm0');
			this.setFlag(15, false);
			md = WritePlaceHeader();
			this.showPerson('altcharm0.jpg');
			addPlaceTitle(md, "Mother Superior in a Light Trance");
			md.write(
				'<p>You see Mother Superior listening intently to the music, she appears to be in a very light trance, you think it will be enough to let the charm work but it is difficult to say for sure.</p>' +
				'<p>You think she will stay this way for a time but not very long...</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, "forget it and leave the room", 327);
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "altcharm1") {
			// Alt Charm 1
			md = WritePlaceHeader();
			this.showPerson("altcharm1.jpg");
			addPlaceTitle(md, "Mother Superior Under A Charm Spell.");
			md.write(
				'<p>While the Mother Superior is still in the trance you recite the words of the charm spell, and you hear her call out something incoherent. She sits up and opens her eyes, the trance is broken!</p>' +
				'<p>She looks a little confused, but then almost stares at you. You are unsure if she has noticed that she some of her clothes while under the trance, especially as she raises her hands. She stops and addresses you,</p>' +
				'<p>"This is my private cell, I do not want visitors, please leave now"</p>' +
				'<p>You notice her words are less harsh than before, not telling you to leave but asking you. You start to speak but she speaks at the same time, lost in thought,</p>' +
				'<p>"I know you, I can feel it in my heart and soul, who are you?"</p>' +
				'<p>You explain that you are a friend of Leanne\'s and as you do she looks startled,</p>' +
				'<p>"It was you, in my head making me do those naughty things! What are you, how can you do such things? You must be a demon!"</p>'
			);

			startQuestionsOnly();
			addLinkToPlaceC(md, '"I am a ' + perYou.getWitch() + ' and your heart is mine"', Place, 'type=altcharm2');
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "altcharm2") {
			// Alt Charm 2
			md = WritePlaceHeader();
			this.showPerson("altcharm2.jpg");
			addPlaceTitle(md, "Mother Superior Being Enslaved By A Charm Spell.");
			md.write(
				'<p>"I am a ' + perYou.getWitch() + ' and I have completely controlled your heart and soul. Everything you did was by my will and for my desires."</p>' +
				'<p>Daria responds shocked, "Your desires! You are a servant of evil..."</p>' +
				'<p>Forcefully you shout "Shut up! I serve no one, I owe allegiance to nothing. You on the other hand are mine and only mine! Your body and soul"</p>' +
				'<p>Daria looks shocked, "No..no...please help me G..."</p>' +
				'<p>Again you force the issue,</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, '"You can only ask me for help!"', Place, 'type=altcharm3');
			WritePlaceFooter(md);
			return true;
		} 	
		
		if (sType == "altcharm3") {
			// Alt Charm 3
			md = WritePlaceHeader();
			this.showPerson("altcharm3.jpg");
			addPlaceTitle(md, "Mother Superior, Your Slave.");
			md.write(
				'<p>Daria nervously says "Please release me...", and you know you have her. There is no choice in your reply,</p>' +
				'<p>"No, you are mine, forever more to do anything I want with you or your body. I shall grant your request in another way and \'release\' your desires"</p>' +
				'<p>Daria sighs, surrendering completely. She removes her clothing ready for her new ' + perYou.getWitch() + ' ' + perYou.getMaster() + '</p>' +
				'<p>You take your new slave nun, enjoying her body and her submission!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "talk to Daria more", 384);
			WritePlaceFooter(md);
			return true;
		} 
	
		
		if (sType == "mswander") {
			// Masturbate scene for Mother Suerior
			
			md = WritePlaceHeaderNIP();
			this.showPerson('mothersuperior5b.jpg');
			addPlaceTitle(md, "Mother Superior Taking a Stroll");
			this.setFlag(3);
			this.moveThem(384);
			if (perLeanne.isCharmedBy("Demon")) wanderLeanne(450);

			md.write(
				'<p>You think that it is best to finish dressing back in your room, and that there is no-one else around. Daria seems shocked at this thought,</p>' +
				'<p><i>"..n..no..I couldn\'t just walk through the church naked!...It is so naughty...sinfull..."</i></p>' +
				'<p>You agree, it\'s so naughty, but it is not a sin is it? If no-one is around then is it just walking somewhere after all?</p>' +
				'<p>Daria steps out of the vestry into the church proper, and she starts to walk nervously down the central pathway, despite common assumptions this is not called the aisle!</p>' +
				'<p>Daria\'s nerves settle down as she walks towards the archway leading to the cloisters and her room, but she hesitates looking around the church, and you can feel she is enjoying this naughty experience.</p>' +
				'<p>Suddenly there is a noise, the main door of the church opens, and with a burst of speed Daria runs out of the church, along the cloister pathway and quickly into her room and slams the door shut behind her.</p>' +
				'<p><i>"Who was that...a parishoner...Pamela...a Sister...I am so embarrassed"</i></p>' +
				'<p>Despite her thoughts, you can feel her excitement and arousal. You try to encourage her further, but as you start the feelings fade...</p>'
			);
			
			startQuestions("Your vision fades");
			addOptionLink(md, "...and the spell ends", "Dispossession()");
			addLinkToPlace(md, "No!!! Concentrate on her arousal and Leanne", 384, 'type=msmast');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (sType == "msmast") {
			// Masturbate scene for Mother Suerior
			md = WritePlaceHeaderNIP(false, "td-none", "black");
			addPlaceTitle(md, "Remembering Leanne", '', 0, false, 'white');
			this.showPersonRandomRorX('mothersuperior3', 2, "30%", "left");
			this.setFlag(2);
			this.moveThem(384);
			if (perLeanne.isCharmedBy("Demon")) {
				if (perLeanne.whereNow() == 382) wanderLeanne(384);
			}

			md.write(
				'<p>You do your best to remember when you had sex with the thrall while possessing Daria, about the pleasure and your and the Mother Superiors orgasms. As you do you can feel a building arousal in Daria/your body, your thoughts are having an effect! Daria again interrupts,</p>' +
				'<p><i>"I...I...should not dwell on this, it has been difficult to stop thinking about...I am feeling the sinful lust again.."</i></p>' +
				'<p>You try to continue thinking but now more about satisfying your current lust. About there is nothing sinful really, it is just how you act on lust that may be sinful. Bodies are created to feel this way, so why not....</p>' +
				'<p><i>"...I do not think that is right...but it is so hard to think clearly recently...I really want to..."</i></p>' +
				'<p>You push again, why not, we were created to feel this way, and it is a glorious feeling, and that is it. You feel Daria stop resisting and her hands move to her groin and she starts to urgently masturbate. In your determination to encourage her you had not noticed how very, very aroused she/you were becoming.</p>' +
				'<p>You can hear her incoherent thoughts, and then brokenly <i>"God...Leanne..."</i>, and you are shocked by her intense orgasm</p>' +
				'<p>Her fingers gently rub and caress her pussy and you hear her think "<i>maybe once more..</i>" and you insistently think "twice" and you hear her, <i>"well..let\'s be damned for more...twice"</i></p>' +
				'<p>She starts to more urgently rub, but as she does you can feel her thoughts fade....</p>'
			);
			startQuestions("Your vision fades");
			addOptionLink(md, "...and the spell ends", "Dispossession()");

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "fuck") {
			// Fuck Mother Superior
			md = WritePlaceHeader();
			this.showPersonRorX("mothersuperior9b" + fb + ".jpg");
			addPlaceTitle(md, "Daria");
			md.write(
				'<p>It is time for the real deal. You push her down to her knees down into ground and tear the nun dress apart. You push and pull your dick as quick as you can. From Daria’s face it’s obvious she feels like she is in heaven and her God is destroying her pussy with the biggest dick in the universe. She doesn’t moan nor make any faces while you practically bang her brains out because you haven’t told her so. She is like some kind of a doll and doesn’t even dare to move. You order her to enjoy the sex and she let’s out a loud shriek following it with small squeals. You commend her of her sins by releasing your sperm into her body. You can’t stop there! You push your somewhat tired penis into her other hole and enjoy a sweet little anal. The encounter ends with both of you on the floor, but Daria bumps back to her feet and offers you a hand to get up. It is amazing to see how strong she is as she helps you back on your feet.</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to Daria", Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "titfuck") {
			// Tit-Fuck Mother Superior
			md = WritePlaceHeader();
			this.showPersonRandomRorX("tf", 1);
			addPlaceTitle(md, "Daria\'s Breasts");
			md.write(
				'<p>Daria or Mother Superior has a nice set of breasts, and you put them to good use!</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to Daria", Place);
			WritePlaceFooter(md);
			return true;
		} 		

		if (sType == "lesbianboth") {
			// Lesbian with Sister Desiree
			md = WritePlaceHeader();			
			if (!isExplicit()) this.showPerson("mothersuperiordesiree1" + (this.isFuta() ? "f" : "g") + "a.jpg");
			else this.showPersonRandomX("mothersuperiordesiree1" + (this.isFuta() ? "f" : "g"), 2);
			addPlaceTitle(md, "Your Disciples Worshipping Each Other");
			md.write(
				'<p>You tell your disciples that you would like them to show you their devotion to you through worship. In particular worshipping each other and glorying in their bodies.</p>' +
				'<p>Daria as always takes the lead '
			);
			if (this.isFuta()) {
				md.write(
					'and it is clear she wants Sister Desiree to worship the cock you gave her.</p>'
				);
			} else {
				md.write(
					'as she kisses Sister Desiree, positioning so you have a clear view of them.</p>'
				);
			}	
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to them", Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "fuckboth") {
			// Threesome with Sister Desiree			
			if (isExplicit()) idx = Math.floor(Math.random() * 2) + 1;
			else idx = 1;
			md = WritePlaceHeader();
			if (!isExplicit()) this.showPerson("mothersuperiordesiree3a.jpg");
			else this.showPersonX("mothersuperiordesiree3b" + futa + String.fromCharCode(idx + 96) + ".jpg");
			addPlaceTitle(md, "Anointing your Disciples");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>You tell them jokingly that you wish to anoint them with you. At first you think they wouldn’t understand what you are referring to, but to your surprise both nuns jump at you, ready to have sex with the most important person in their life. Daria is the quick one, grabbing your \"holy\" penis and shoving it right into her pussy. Sister Desiree starts to lick your \"glorious\" balls in the heat. Daria is just as insane in bed as you thought. You enjoy yourself on her fit body and ride her all the way to heaven. Under the two of you, Sister Desiree still sucking your balls like there is no tomorrow. This goes on for a while and it is obvious who is in charge of this group. Daria doesn’t let the young priestess to you, keeping you all to herself. She rigorously tries to please you. The Mother Superior selfishly moves her hips at a faster rate, to annoy Desiree. When you are ready to cum, Daria climbs herself from you, kneeling in a position where she could get most of your delightful seed. At the last minute you decide that Desiree should receive your gift. They clean themselves up, wanting more, but you are drained for the moment.</p>'
				);
			} else {
				md.write(
					'<p>You have a threesome with Daria and Desiree</p>' +
					'<p></p>'
				);
			}	
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to them", Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "bj") {
			// Oral
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("mothersuperior10b" + futa + ".jpg");
				else this.showPerson("mothersuperior10b.jpg");
			} else this.showPersonRandomRorX("mothersuperior10g", isExplicit() ? 2 : 3);
			addPlaceTitle(md, "Daria Worshiping You");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You just don’t have enough time for a full fuck, so it is for the best if you just get a blowjob from Daria, your crazy priestess. She knows her job well enough servicing you like you are royalty. She keeps the eye contact, just to see if you are satisfied with her service. Between each fifteen second sucking part she takes time to recite the prayer she come up with. It goes on as she recite it verse by verse, mostly talking about how perfect you are and how everything you touch or do is law. It is astonishing to see that she doesn’t stop saying the prayer even when her mouth is full of your glorious cum. A bit spill out on her dress, you know she will not wash that dress for months because of it.</p>'
				);
			} else {
				md.write(
					'<p>You issue out a single word order to Daria; lick. She knows what she has to do and is already on her knees, servicing your \"holy trophy\". That’s the name of your pussy, she name it that  way out of pure honor, still it sounds a bit off. She is a damn licker though, that’s clear. The action goes on for a few more minutes and explodes into a great end. You squirm all the way, while she pushes your body to it’s limit. She goes the extra mile and you have a fantastic orgasm. Crazy or not, Daria sure knows how to pleasure her Goddess!</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to Daria", Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "bjboth") {
			// Oral
			if (isExplicit()) {
				idx = Math.floor(Math.random() * 4) + 1;
			}

			md = WritePlaceHeader();
			if (isExplicit()) {
				if (perYou.isMaleSex()) this.showPersonX("mothersuperiordesiree2" + String.fromCharCode(idx + 96) + (idx == 4 ? ".gif" : ".jpg"));
				else this.showPerson("mothersuperiordesiree2g.jpg");
			} else {
				if (perYou.isMaleSex()) this.showPerson("mothersuperiordesiree2b.jpg");
				else this.showPerson("mothersuperiordesiree2g.jpg");
			}
			addPlaceTitle(md, "A Double Blessing");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>You don’t have time to ask for the full service, so you order your two fanatic slaves to give a you a blowjob. They start slowly, building up a great chemistry between them. They change every ten seconds or so, thus you can receive the best experience. Both of them keep an eye contact with you, so if you ever wish something different they are ready for it. You enjoy this simple, short blowjob from two experienced women, their mouth sucking your penis like a vacuum cleaner. It is obvious that they were practicing on each other while you are away from them. It doesn’t take long for you to come on their pretty faces. Both nuns lick each other furiously while you pull your jeans up. They stay on the ground, kneeling, ready for your next wish.</p>'
				);
			} else {
				md.write(
					'<p>You issue a single order to both them; lick. They understand what you mean by that. As usual, Daria is the fast and strong, pushing Desiree away a bit. She caresses the \"holy trophy\", that’s how Daria calls your pussy. You don’t have the time nor the energy to focus on the origin of your pussy’s newfound title as Daria pushes her tongue deep. She is damn fine licker, that is clear. While Desiree still tries to put her head near your vagina, she finally wins and joins in licking you. Desiree turns her attention to your buttcheek and brushes her warm tongue into new territory. The fun stays the same for a while, but you decide to end it. You dry your wet pussy by rubbing it into Daria’s nun dress. She couldn’t be more happy to receive your blessing.</p>'
				);
			}	
			startQuestionsOnly();
			addLinkToPlace(md, "talk more to them", Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "laterdiscipline") {
			perSister = findPerson("Desiree");
			perSister.moveThem(384);
			perSister.setFlag(14);
			if (perLeanne.whereNow() == 382 && perLeanne.isCharmedBy("Demon")) wanderLeanne(384);

			md = WritePlaceHeader();
			perSister.showPerson("sister12a.jpg");
			addPlaceTitle(md, "Disciplining Desiree, the Disciple of Desire");
			md.write(
				'<p>You talk to Daria about Desiree mention her reluctance to obey Daria in the past and suggest that Daria chastise her for her reluctance to obey.</i></p>' +
				'<p>She summons Desiree and when she arrives Mother Superior sternly speaks,</p>' +
				'<p>"Sister Desiree, enough of this talk of a revelation and your private prayer outside. You have your duties, and it is time for me to apply some discipline to your behind as nothing else is working. Bend over and raise the hem of your habit!"</p>' +
				'<p>Sister Desiree looks a little surprised, "Mother Superior I know my duties, and those I owe to you" and she does exactly as ordered, leaning against a tree and exposing her ass. Daria and you can both see she is not wearing any underwear at all!</p>' +
				'<p><b>Smack</b>, "Pray for forgiveness Sister", <b>smack</b>, "Follow my orders, Sister".</p>' +
				'<p>Sister Desiree groans, "Ohh yes, Mother Superior", <b>smack</b>, "Please Mother Superior", <b>smack</b> "Ohhh, yes Mother Superior, yes, yes!"</p>' +
				'<p>As she very obviously orgasms you can see she was covertly rubbing herself to the smacks, and she finally calls out "Thank you Mother Superior!", and Daria stops, looking at her confused.</p>' +
				'<p>You can see Daria\'s arousal, and how very, very much she enjoyed that, and she tells Desiree,</p>' +
				'<p>"Until I tell you otherwise your place is here in my chambers, to obey me and be disciplined when I feel you need it!"</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, "talk to them both now", Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType.substr(0, 5) == "charm") {
			// Charm spell
			md = WritePlaceHeaderNP();
			var bWitch = getQueryParam("witch") == "true";
			perSister = findPerson("Desiree");

			idx = parseInt(sType.charAt(5), 10) + 5;
			if (sType == "charm2") this.showPerson("mothersuperior7g.jpg");
			else if (sType == "charm3" && perYou.isMaleSex() && isExplicit()) this.showPersonX("mothersuperior8bg.jpg");
			else this.showPerson("mothersuperior" + idx + ".jpg");
			addPlaceTitle(md, "Mother Superior Under a Charm Spell");

			if (sType == "charm1") {

				setPersonFlag("Leanne", 27);
				md.write(
					'<p>While the Mother Superior is still in the trance you recite the words of the charm spell, and you hear her call out something incoherent. She sits up and opens her eyes, the trance is broken!</p>' +
					'<p>She looks a little confused'
				);
				if (perSister.isHere()) md.write(', and glances at Sister Desiree, and then intensely back at you.');
				else md.write(', but then almost stares at you.');
				md.write(
					' You are unsure if she has noticed that she has removed a lot of her habit while under the trance, especially as she raises her hands. Maybe she is planning to rearrange her habit, but she stops and addresses you,</p>' +
					'<p>"This is my private cell, I do not want visitors, please leave now"</p>' +
					'<p>You notice her words are less harsh than before, not telling you to leave but asking you. You start to speak but she speaks at the same time, lost in thought,</p>' +
					'<p>"I know you, I can feel it in my heart and soul, who are you?"</p>' +
					'<p>You explain that you are a friend of Leanne\'s and as you do she looks startled,</p>' +
					'<p>"It was you, in my head making me do those naughty things! What are you, how can you do such things? You must be a demon!"</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Not at all, you did everything"', 384, "type=charm2");
				addLinkToPlaceC(md, '"I am a ' + perYou.getWitch() + ' and your heart is mine"', 384, "type=charm2&witch=true");

			} else if (sType == "charm2") {

				if (bWitch) {
					this.charmThem(4);
					md.write(
						'<p>"I am a ' + perYou.getWitch() + ' and I have completely controlled your heart and soul. Everything you did was by my will and for my desires."</p>' +
						'<p>Daria responds shocked, "Your desires! You are a servant of evil..."</p>' +
						'<p>Forcefully you shout "Shut up! I serve no one, I owe allegiance to nothing. You on the other hand are mine and only mine! Your body and soul"</p>' +
						'<p>Daria looks shocked, "No..no...please help me G..."</p>' +
						'<p>Again you force the issue,</p>'
					);

				} else {
					md.write('<p>"I did not make you do anything, as just present astrally watching. Everything you did was because you wanted to. You desired Leanne and gave into temptation');
					if (perSister.isHere()) md.write(' and you dominated Sister Desiree for your own pleasure.');
					else md.write(' and the second time you did those naughty things because you wanted to.');
					md.write(
						'<p> I was able to subtly influence you to get help to defeat the demon that had affected Leanne. We are actually allies!"</p>' +
						'<p>Daria replies, "No, that is not possible...", and you tell her,</p>' +
						'<p>"Yes it was, I banished the demon and now I need more help now"</p>' +
						'<p>She looks at you uncertain, the spell is affecting her but she has not surrendered to it yet.</p>'
					);
				}
				startQuestions();
				if (bWitch) addLinkToPlaceC(md, '"You can only ask me for help!"', 384, "type=charm3&witch=true");
				else addLinkToPlaceC(md, '"Help me"', 384, "type=charm3");

			} else if (sType == "charm3") {

				if (bWitch) {
					md.write(
						'<p>Daria nervously says "Please release me...", and you know you have her. There is no choice in your reply,</p>' +
						'<p>"No, you are mine, forever more to do anything I want with you or your body. I shall grant your request in another way and \'release\' your desires"</p>' +
						'<p>Daria sighs, surrendering completely. She removes her clothing ready for her new ' + perYou.getWitch() + ' ' + perYou.getMaster() + '</p>' +
						'<p>You take your new slave nun, enjoying her body and her submission!</p>'
					);

				} else {
					md.write(
						'<p>Daria asks "Help you in what way", as she looks you up and down.</p>' +
						'<p>You reply with a passionate kiss that takes her by surprise, but she does not resist.</p>' +
						'<p>You mutually explore each others bodies and experience considerable pleasure with each other.</p>' +
						'<p>After Daria says "You can ask for the churches, and my help, again at any time"</p>'
					);
				}
				md.write("<p>You think it may be best to leave her for a little while, to think about things and you a bit. Maybe return in an hour or two, or tomorrow?</p>");
				if (perLeanne.whereNow() == 382) {
					if (perLeanne.other < 25) perLeanne.other = 25;
					perLeanne.charmThem(8, "Demon");
					movePerson("Leanne", 384);
				}
				
				startQuestions();
				addLinkToPlaceC(md, "talk to Daria more", 384);
				addLinkToPlace(md, "leave the room", 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '');

			}

			WritePlaceFooter(md);
			return true;

		} else if (getQueryParam("trance") == "yes") {
			md = WritePlaceHeader();
			AddMana(-1);
			this.charmedTime = nTime;
			this.showPerson('mothersuperior4b.jpg');
			addPlaceTitle(md, "Mother Superior in a Trance");

			md.write(
				'<p>You tell Daria "Is that a purple carrot" as you touch her arm as you gesture. As you do you use the augmented hypnotic technique to drop her immediately into a hypnotic trance. In seconds she drowsily falls into the trance.</p>' +
				'<p>As a test you tell her it is very hot in here and she needs to remove some clothing, and without hesitation she removes part of her habit. For the moment you have her <b>will under your control!</b></p>' +
				'<p>You are about to ask her something else but she starts the mutter, you can hear and see she is resisting, the trance will end soon!</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, 'she wakes up', 327, '', isInvisible() ? 'Your invisibility fades as you cross the archway into the cloisters...' : '', '', "wanderLeanne(450)");
			WritePlaceFooter(md);
			return true;
		} else if (sType == "dariatransformcock") {
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(10)) {
				this.setFlag(10);
				showPopupWindow("Transformation",
					this.addPersonStringRorX("mothersuperior11.jpg", "35%", "left") +
					'<p>You cast the spell and Daria cries out, "God, what is this" and pulls apart her habit. You see a large cock growing from her groin above where her pussy is.</p>' +
					'<p>As she groans you can distinctly hear someone laughing but it is drowned out as Daria cries out in ecstasy as her new cock spasms in her first male ejaculation.</p>' +
					'<p>Daria is confused why you did this and you cannot help but wonder if it was a good thing, but then again as you watch her stroking her new cock you put these worries out of your mind.'
				);
			} else {
            this.setFlag(10, false);
            md = WritePlaceHeader(true, '', 'black');
            showPopupWindow("Transformation",
                this.addPersonString("mothersuperior4b.jpg", "35%", "left") +
                '<p>You cast the spell and Daria cries out, "God, what is this" and pulls apart her habit. You see her large cock disappearing from her groin above where her pussy is.</p>' +
                '<p>As she groans you can distinctly hear someone laughing but it is drowned out as Daria cries out in ecstasy as her pussy spasms in her female ejaculation.</p>' +
                '<p>Daria is confused why you did this and you cannot help but wonder if it was a good thing, but then again as you watch her fingering her pussy you put these worries out of your mind.'
            );				
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;

		} else if (sType == "dariatransformbreasts") {
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				showPopupWindow("Transformation",
					addImageString('GenericSex/be d.jpg', "35%") +
					'<p>You cast the spell and Daria cries out, "God, what is this" and pulls apart her habit. You see her breasts swelling, growing larger and larger.' + (perYou.isMaleSex() ? ' It crosses your mind they are now amply large enough for a good tit-fucking!' : '') + '</p>' +
					'<p>As she groans you can distinctly hear someone laughing but it is drowned out as Daria cries out in ecstasy as her breasts stop growing.'
				);
			} else {
            this.setFlag(11, false);
            showPopupWindow("Transformation",
					addImageString('GenericSex/bs d.jpg', "35%") +
                '<p>You cast the spell and Daria cries out, "God, what is this" and pulls apart her habit. You see her breasts diminishing, getting smaller and smaller.' + (perYou.isMaleSex() ? ' It crosses your mind they are not really large enough to tit-fuck.' : '') + '</p>' +
                '<p>As she groans you can distinctly hear someone laughing but it is drowned out as Daria cries out in ecstasy as her breasts stop diminishing.'
            );				
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "troubled") {
			this.setFlag(12);
			this.setFlag(14);
			md = WritePlaceHeader();
			var be = this.checkFlag(11) ? "-be" : "";
			var futa = this.getPersonGender() == "futa" ? "f" : "g";
			var fb = futa + be;
			this.showPerson('mothersuperior7' + fb + '.jpg');
			addPlaceTitle(md, "Daria is Troubled");

			perSister = findPerson("Desiree");
			var bDesireeHere = perSister.isHere() && !perSister.checkFlag(1);

			var sTitle = perYou.isBornMale() ? 'Lord' : 'Goddess';

			md.write(
				'<p>You ask "There is something bothering you, Daria, out with it my slave."</p>' +
				'<p>Daria answers, "Ohh, ' + perYou.getPersonName() + '! I’ve been so wrong.  I was following the bad road all along. I thought you were a demon, a witch who only brings chaos to our world."</p>' +
				'<p>You reply, "Well, you were stubborn one, that’s obvious. You were one of the hardest woman to enslave I’ve ever met so far.  Also, stopping me from entering the church…now that was harsh, wasn’t it?"</p>' +
				'<p>Daria tells you, "Aww, how stupid was I…I am a sinner, ' + perYou.getMaster() + '! I am useless to you. Forgive me for all the trouble I’ve caused. Punish me whenever you want and however you want. I need to atone for my actions."</p>' +
				'<p>You reply, "Don’t worry, I’ll make sure you are properly punished…Now was there anything else?"</p>' +
				'<p>Daria answers, "Yes, ' + perYou.getPersonName() + '! An important one. Please, I beg of you, listen to my full story, ohh, your holiness. During the process of my enslavement, which you have guided me through marvelously might I add, you awoken something in me. My whole life I’ve worshipped the wrong god, I served the wrong religion. I now see that I need to change, convert to something different…"</p>' +
				'<p>You reply, "Your holiness”…”convert to something different”….I don’t follow you, my slave…"</p>' +
				'<p>Daria answers, "Forgive me, forgive this stupid slut for her ramblings…I mean I understand who you are now…you are the Messiah I’ve been waiting for..."</p>' +
				'<p>You reply, "Hey there! That’s definitely something I’ve never heard before! Elaborate!"</p>' +
				'<p>Daria answers, "You handle powers I’ve never seen before! You’ve already gathered dozens of slaves in such a small of period of time. Everywhere you go, people bow their heads to you. You bring a new order into Glenvale, I can see that perfectly! You are the one whom I wish to worship…You are MY ' + (perYou.isBornMale() ? 'God' : 'Goddess') + '! If you ever let me, I will forever serve you with ALL I have. Nothing, beside obeying EVERYTHING you say, is important to me anymore."</p>' +
				'<p>You reply, "My god, Daria, what are you  talking about…this is completely new…"</p>' +
				'<p>Daria answers, "Ohh, how naive you are. Still thinking that there is someone above, still don’t see that you are the one…You see, ohh almighty, you see…that I’ve lived my life believing in the Christian God and Jesus. This God never showed himself to me, never gave a slight reference that he exists, but I believed in Him…Not anymore…not anymore; you have proven to me that you are the ONE I have to follow…and I shall do it, if YOU, let me, oh your holiness.:"</p>' +
				'<p>You reply, "You are definitely crazy. I’m just a regular ' + (perYou.isBornMale() ? 'guy' : 'gal') + ' who happens to have magical powers. That doesn’t mean I am your ' + (perYou.isBornMale() ? 'god' : 'goddess') + '…"</p>' +
				'<p>Daria answers, "To me, you are, and you can’t change that…Just let me believe in YOU, my ' + sTitle + '! I will never disturb you if you wish so…"</p>' +
				'<p>You reply, "All right, I will think about it…What would change anyway?"</p>' +
				'<p>Daria answers, "Ohh, not much, my Creator. Nothing that would ever harm you. To show you my seriousness, I hereby offer you everything I have and more. This church, everyone and everything in it is forever yours. Let your new religion be called; The Faith of Flesh."</p>' +
				'<p>You reply, "What? Faith of Flesh? What does that even mean?!"</p>' +
				'<p>Daria answers, "You control anyone by thought. You can use their bodies, alter their minds. You are the God of Flesh…It is appropriate to name your cult after you and power."</p>' +
				'<p>You reply, "Okkkayyy…cult, what kind of cult?"</p>' +
				'<p>Daria answers, "So silly…so young…so funny…Ahh, my ' + sTitle + ', you are perfect in every way. I was talking about the Cult of Flesh, your religious followers. If you let me, I would gladly lead them. No greater honor I could achieve in my existence."</p>' +
				'<p>You reply, "Whatever Daria. Just don’t convert and advertise this cult of yours openly…"</p>' +
				'<p>Daria answers, "Ohhh, no, your Holiness! I would never do that. I would never do anything without your blessing."</p>' +
				'<p>You reply, "Are we finished, Daria? Anything you want to talk about?"</p>'
			);

			if (bDesireeHere) {
				md.write(
					'<p>Daria answers, "This one, ohh, Holiness. What do you wish to do with her?", Daria points at the nun who is still hanging on a rope, mouth pecked. She is talking about Desiree, obviously.</p>' +
					'<p>You reply, "I don’t have plans with her for now. Do as you wish."</p>' +
					'<p>Daria tells you, "May I offer her to you as your second follower, my ' + (perYou.isBornMale() ? 'Lord' : 'Goddess') + '? She is obviously eager to join The Faith of Flesh, am I right, slave?". Daria scornfully eyes the young nun. Sister Desiree bows her up and down as fast as she can, you can read her devotion to you from her face.</p>' +
					'<p>Daria continues, "It is done then. I will look after myself that she is properly educated in her faith…Thank you for accepting us as your servants. We will not fail you!"</p>'
				);
			} else {
				md.write(
					'<p>Daria answers, "The young sister, Desiree has already received your blessing, my ' + (perYou.isBornMale() ? 'Lord' : 'Goddess') + '. May I take her as a follower of the one, true faith?" Daria speaks a bit angrily about Desiree. It’s obvious she would like to regulate her a bit.</p>' +
					'<p>You tell her, "I don’t have plans with her for now. Do as you wish."</p>' +
					'<p>Daria answers, "It is done then. I will look after myself that she is properly educated in her faith…"</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'talk more with Daria', 384);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(md)
	{
		if (sType === "" && this.isCharmedBy() && this.isHere()) {
			if (!this.checkFlag(12)) addLinkToPlaceC(md, '"There is something bothering you, Daria, out with it my slave."', 384, 'type=troubled');
		}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere() && !(this.checkFlag(10) || this.checkFlag(11))) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to the Mother Superior before it will work.');
					else 	examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Daria.');
					return "handled";
				}
			}
		}
		
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Church
			if (Place == 318) {
				if (this.isHere() || ((checkPlaceFlag("Church", 5) || checkPlaceFlag("Church", 7)) && !isPossess("Daria") && !this.checkFlag(4))) {
					addComments('You attempt to cast the spell on the meddlesome nun, but it bounces off of her - its as if her faith itself were protecting her.  Impressive... if not exceptionally annoying. Then again, you do not actually know her name, just what she is, her position not her name.');
					return "handled";
				}
			}
			// Mother Superiors Room
			if (Place == 384) {
				if (this.isCharmedBy()) addComments('You have already charmed Daria.');
				else if (sType == "altcharm0") CastCharmSpell("Daria", 384, 4, "type=altcharm1");
				else if (getQueryParam("trance") == "yes") CastCharmSpell("Daria", 384, 1, "type=charm1");
				else {
					this.setFlag(8);
					this.charmedTime = nTime;
					addComments('You try the spell but it fails, her will is still too strong for it to affect her. She looks at you curiously,</p><p>"What gibberish was that! I said get out!"</p>');
					return "refresh";
				}
				return "handled";
			}
			// Mother Superiors Room
			if (Place == 382) {
				if (wherePerson("Leanne") == 382) {
					addComments('You try to cast the spell, but as you expected it has no effect at all on the thrall.');
					return "handled";
				}
				if (!isPossess()) {
					if (this.isHere()) {
						addComments('You try to cast the spell, but she <i>still</i> too strong willed and in such confusion and distress. It is pointless to try now.');
						return "handled";
					}
				}
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {
			// In her room
			if (Place == 384 && this.place == 384) {
				if (!CastTransform(1, true, this.checkFlag(11))) return "handled";
				if (!this.isCharmedBy()) addComments("The spell does not work, but there is an effect, you believe it may work at another time. You probably need to completely control her first.");
				else {
					// It can be cast
					setCommentsNoClick(
						'<div class="' + getConverseBubbleClass() + '" style="cursor:default">' +
						'<table><tr><td width="80%"><p>You decide to try the transformation spell on Daria and tell her to prepare herself. As you start to recite the spell she falls into a sort of trance, her habit falling open. As it does your attention is drawn to...</p>'
					);
					addOptionLink("comments", this.checkFlag(11) ? 'her overly large breasts' : 'her breasts', "ClearComments();dispPlace(" + Place + ",'type=dariatransformbreasts')");
					if (perYou.checkFlag(30)) addOptionLink("comments", this.checkFlag(10) ? 'her cock' : 'her groin', "ClearComments();dispPlace(" + Place + ",'type=dariatransformcock')");
					addComments('</td><td width="20%"><img src="Images/' + this.getImg('mothersuperior4b.jpg') + '" style="width:95%;" alt="Transform"></td></tr></table>');
					return "handled";
				}
				return "handled";		// Ignore any standard action otherwise
			}
			// Is she is present somewhere else?
			if (this.isHere()) {
				if (!CastTransform(1, true)) return "handled";		// You cannot cast the spell
				addComments("The spell does not work, but there is an effect, you believe it may work at another time. You probably need to completely control her first.");
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.addCultQuestions = function() {
		var clv = this.getCharmedLevel();
		if (clv === 0) return;
		var nun = Math.floor(Math.random() * this.other) + 1;
		var be = this.checkFlag(11) ? "-be" : "";
		var futa = this.getPersonGender() == "futa" ? "f" : "g";
		var fb = futa + be;
		
		if (this.checkFlag(12) && !this.checkFlag(14) && this.other < oChurch.cult.length) {
			if (nMana >= (perYou.checkFlag(17) ? 9 : 10)) addLinkToPlaceC(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, "type=newcultmember");
			else addLinkToPlaceC(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, '', 'Unfortunately you do not have enough mana at the moment to charm a new member of the cult');
		}	
		
		if (this.other > 2 && !this.checkFlag(16)) {
			addPopupLinkC(md, "inquire about cult activities", "Cult Affairs",
				this.addPersonString("mothersuperior7" + fb + ".jpg", "30%") +
				'"How goes my new cult, Daria?"</p>' +
				'<p>The woman blushes and smiles coyly. "Very well, your Holiness. I\'ve been further instructing your disciples. The lessons have been very... stimulating."</p>' +
				'<p>You nod imaging Daria\'s instructions with Desiree applied ot the other women you\'ll charmed around the church. "I\'m still not entirely clear on what I\'m getting out of this cult of yours though."</p>' +
				'<p>The woman pouts. "Why, the undying devotion of a harem of beautiful nuns, of course. Ready and willing to dedicate their bodies to you without question."</p>' +
				'<p>You nod. "But only in the church."</p>' +
				'<p>Daria considers for a moment. "If you have duties for any of your cult members, your Holiness, you need only to ask. I believe you have my phone number. Simply contact me and I\'ll assign one of your disciples to whatever task you desire."</p>' +
				'<p>You smile. "I\'ll be sure to do that, Daria."',
				false, 'setPersonFlag("Daria",16);dispPlace()'
			);
		}
		
		if (perJade.isDanceAvailable() && this.checkFlag(16)) {
			if (clv == 4) {
				addPopupLink(md, 'talk to Daria about dancing in the club', "Reluctant Mother Superior",
					this.addPersonString("mothersuperior7" + fb + ".jpg", "30%", "rightpopup") +
					'The woman frowns: "I\'m sorry, your Holiness, but I am still the mother superior of this church, I should try to maintain some level of public decorum if you want to keep the cult secret. I could send one of your other disciples in my stead if you\'d prefer, however."</p>' +
					addOptionLink("string", '"I suppose that will have to do"', "perJade.setDancer('nun" + nun + "');dispPlace()", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", '"Never mind then"', "dispPlace()", "chatblock", "width:50%;margin-left:10%"),
					true, '', true
				);
			} else {
				addPopupLink(md, 'talk to Daria about dancing in the club', "Reluctant Mother Superior",
					this.addPersonString("mothersuperior7" + fb + ".jpg", "30%", "rightpopup") +
					'The woman smiles: "I\'d love to demonstrate my faith publicly, your holiness. Though I\'ll have to be... discreet if you want to keep the cult secret."</p>' +
					addOptionLink("string", '"I\'m sure you\'ll think of something"', "perJade.setDancer('daria');dispPlace()", "chatblock", "width:50%;margin-left:10%") +						
					addOptionLink("string", '"Send one of my disciples instead"', "perJade.setDancer('nun" + nun + "');dispPlace()", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", '"Never mind then"', ";dispPlace()", "chatblock", "width:50%;margin-left:10%"),
					true, '', true
				);					
			}
		}
	};
	
	// Phone calls
	
	per.isPhoneable = function(msg) {
		// Can you call them?
		if (!this.isCharmedBy()) return false;
		if (msg === true) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		if (isAtLocation(282) && perJade.isDanceAvailable()) return true;	// Strip club

		// Miss Logan not bred and is a breeder
		return Place == 440 && !checkPersonFlag("MissLogan", 1) && per.getCharmedLevel() == 2 && this.isFuta();
	};

	per.callThem = function() {
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
		if (Place == 269) {
			if (!this.checkFlag(16)) {
				gotoPlace(Place, 'type=dariapool');
				receiveCall('','You call Mother Superior and tell her, "Daria, I desire company at the pool at the Broken Inn Hotel, would you please join me here", and she immediately agrees.'); 
				WriteCommentsFooter(bChat, bChatLeft);
				return;
			}
			while(true) {
				var nun = Math.floor(Math.random() * this.other) + 1;
				img = getImageO("Church/Nun" + nun + "/pool", -9);
				if (img === "") continue;
				receiveCall('',
					'You call Mother Superior and tell her, "Daria, I desire company at the pool at the Broken Inn Hotel."</p>' +
					'She replies "Of course, your Holiness, I\'ll send someone right over.".</p>' +
					addOptionLink("string", "\"I'll be waiting\"", "gotoPlace(Place,'type=cultnunpool&nun=" + nun + "')", "chatblock", "width:60%;margin-left:10%") +
					addOptionLink("string", "\"Actually, why don't you come yourself\"", "gotoPlace(Place,'type=dariapool')", "chatblock", "width:60%;margin-left:10%")
				);
				WriteCommentsFooter(bChat, bChatLeft);
				return;
			}
		}
		if (isAtLocation(282)) this.addDancingCall();
	};

}