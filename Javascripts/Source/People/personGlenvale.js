/**********************************************
The Town of Glenvale
***********************************************/

// General Puzzles
function FindItTablet(doc)
{
	var sText = doc.FormChar.research.value.toLowerCase().trim();
	if ((checkPlaceFlag("Crypt", 3) && sText == "modest") ||
		 (checkPlaceFlag("Crypt", 4) && sText == "mason") ||
		 (checkPlaceFlag("Crypt", 5) && sText == "garlic"))
	{
		if (perKurndorf.getQuestCrypt() == 18) perKurndorf.setQuestCrypt(19); // Bambi path set to "have entered crypt"
		setPlaceKnown("Crypt");  // Sets it so you can Enter the Crypt
		var perMonique = findPerson("Monique");
		perMonique.setFlag(5, false);
		gotoPlace(247, '', 
			"Correct! The ground shakes as the great tablet before you crumbles to dust beneath your feet. You have discovered an ancient crypt.</p>" +
			'<p>"You feel a flash of magic, some sort of spell was broken when you open the door to the crypt. You can feel it was some sort or ward but no other details.'
		);
	}
}

function PuzzleComputer(doc)
{
	if ((perDavy.checkFlag(33) && doc.FormChar.research.value.toLowerCase().trim() == 'e') ||
		 (perDavy.checkFlag(34) && doc.FormChar.research.value.split(" ").join("").split("'").join("").toLowerCase().trim() == 'butiwontdothat') ||
		 (perDavy.checkFlag(35) && doc.FormChar.research.value.toLowerCase().trim() == 'sandman')) {
		gotoPlace(81,"type=passwordright");
	} else gotoPlace(81,"type=passwordwrong");
}

function FindIt105(doc)
{
	if (isRunes()) Research("Spell", "ShioStinMur", "time1.jpg", 81);
	else ResearchOLD("P", doc.FormChar.research.value);
}

function PuzzleRadio(doc)	{
	var perMadison = findPerson("Madison");
	if ((perMadison.checkFlag(33) && (doc.Puzzle.answera.selectedIndex * 44 / 25) == 1.76) ||
		 (perMadison.checkFlag(34) && doc.Puzzle.answera.value == 5) ||
		 (perMadison.checkFlag(35) && doc.Puzzle.answera.value == 3))	{
		gotoPlace(45, "type=radiocorrect");
	} else {
		gotoPlace(45, "type=wradiorong");
	}
}

function FindItCupboard2(doc)
{
	var sBody = doc.FormChar.research.value.toLowerCase().trim();
	var perMonique = findPerson("Monique");
	if ((perMonique.checkFlag(33) && sBody == "one word") ||
		 (perMonique.checkFlag(34) && sBody == "bookkeeper") ||
		 (perMonique.checkFlag(35) && sBody == "balance"))
	{
		setPlaceFlag("Hotel", 6);
		perMonique.setFlag(3, false);
		sBody = "Correct, wise one! You may now attempt to learn a new spell.  May your wisdom serve you well.";
		Place = 161;
	} else {
		sBody = "Incorrect. Try again.";
	}
	gotoPlace(Place, '', sBody);
}


// General events for the twon of Glenvale

function initialiseGlenvale()
{
	// The Town
	gameState.perTown = addPerson("GlenvaleTown", 0, 'GlenvaleTown', '', false, false);

	//per.extra = [0, 0, 0];
	per.name = "Glenvale";
	
	per.getPossessionFace = function() { return "shops-nudist1"; };
	
	per.passTimeDay = function() {
		this.flags[0] = 0;
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return;
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		var bPublic = id > 70;
		var bNude = id > 40 && id < 71;

		switch (Place) {		
		case 26:
			if (!bNude) md.write('<p>You see some people hiking along a track.</p>');
			break;
		case 2:
		case 94:
		case 194:
		case 238:
		case 360:
		case 455:
			md.write('<p>The streets near the center of Glenvale are busiest in the daytime, there are people walking around nearby.</p>');
			break;
		case 63:
			md.write('<p>The park can be quite busy on sunny days, people walking or just sitting in the sun.</p>');
			break;
		case 70:
			md.write('<p>You notice through a classroom door a student teacher you have seen around school. You have never been in one of his classes and you cannot quite remember his name.</p>');
			break;
		case 125:
			md.write('<p>Some people are playing a game on one of the courts.</p>');
			break;			
		case 144:
			md.write('<p>Some sporty students are around playing on the fields.</p>');
			break;
		case 195:
			if (id == 1) md.write('<p>An affectionate couple are browsing at one of the counters.</p>');
			else if (id == 2) md.write('<p>You pass a scantily clad young woman trying to decide on an item. Perhaps unfairly the word "Bimbo" comes to mind...</p>');
			break;
		case 199:
			md.write("<p>You notice some people are doing their laundry.</p>");
			break;
		case 239:
			if (id == 1) md.write('<p>You see a number of people studying the exhibits.</p>');
			else if (id == 2) md.write('<p>You see an older couple taking a rest.</p>');
			break;
		case 282:
			if (id == 1) md.write('<p>You see a young woman serving drinks, but she is rather exotically dressed, maybe she likes cosplay?</p>');
			else if (id == 2) md.write('<p>You see two young women dressed quite oddly, maybe they are cosplayers. As you look they glance back at you seductively, and leave. A few minutes later they take to the stage, so they were exotic dancers!</p>');
			else if (id == 3) md.write('<p>A blonde dancer is on the stage, looking happy and fit!</p>');
			else if (id == 4) md.write('<p>An attractive woman is doing a pole dance, you hear one of the other customers comment that she is from Australia.</p>');
			break;
		case 318:
			if (id == 1) md.write('<p>You see a young lady near the stained glass windows, illuminated by them.' + (isVisible() ? ' She looks at you briefly but returns to her prayers.' : '') + '</p>');
			else if (id == 5) {
				var nun = Math.floor(Math.random() * oChurch.cult.length) + 1;
				var cult = getPersonOther("Daria");
				if (nun <= cult) md.write('<p>You see one of the nuns you have inducted into Mother Superior\'s cult. She also sees you and adjusts her habit as a token offering.</p>');
				else md.write('<p>You see on of the nuns moving around doing some work in the church.</p>');
			} else md.write('<p>You see some people praying in the church.</p>');
			break;
		case 361:
		case 369:
		case 370:
			if (id == 8) md.write('<p>You see the busty woman you met before, still wandering around and clearly enjoying the glances of people at her figure.</p>');
			else md.write('<p>A couple is near one of the tanks, the aquarium is one of the towns major date spots.</p>');
			break;
		case 435:
			md.write("<p>The gym can be quite busy at times, you see a number of people working-out.</p>");
			break;
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return '';
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		if (id > 70) id = '-public' + (id - 70);
		else if (id > 40) id = '-nudist' + (id - 40);

		if (Place == 282) return this.showPersonAnon("stripclub" + id + ".jpg", '', '', '', '', false, "string");
		else if (Place == 318 && id == 5) {
			var nun = Math.floor(Math.random() * oChurch.cult.length) + 1;
			var cult = getPersonOther("Daria");
			this.health = nun;
			this.shown = true;
			return addImageString("Church/Nun" + nun + "/" + (nun <= cult ? "after.jpg" : "start.jpg"));
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return Math.floor(this.place) == Place && sType === "";		//  && !this.shown;
	};

	per.showPlaceImageRight = function(md)
	{
		var idn = Math.round((this.place - Math.floor(this.place)) * 100);
		var id = idn;
		if (id > 70) id = '-public' + (id - 70);
		else if (id > 40) id = '-nudist' + (id - 40);
		
		switch (Place) {			
		case 26:
			this.showPersonAnon("wildranges" + id + ".jpg");
			break;
		case 63:
			this.showPersonAnon("park" + id + ".jpg");
			break;
		case 70:
			this.setFlag(3);
			this.showPersonAnon("school1.jpg");
			break;
		case 125:
			this.showPersonAnon("tennis" + id + ".jpg");
			break;			
		case 144:
			this.showPersonAnon("sportsfields" + id + ".jpg");
			break;
		case 199:
			this.showPersonAnon("laundromat" + id + ".jpg");
			break;			
		case 269:
			this.showPersonAnon("pool" + id + ".jpg");
			break;			
		case 194:
		case 238:
		case 360:
		case 94:
		case 455:
		case 2:
			this.showPersonAnon("street" + id + ".jpg");
			break;
		case 195:
			if (idn == 9) this.showPersonAnon("generalstore-exh1.jpg");
			else this.showPersonAnon("generalstore" + id + ".jpg");
			break;
		case 239:
			if (idn == 1) {
				this.showPersonAnon("museum2.jpg");
				this.setFlag(1);
			} else if (idn == 2) this.showPersonAnon("museum1.jpg");
			else this.showPersonAnon("museum" + id + ".jpg");
			break;
		case 318:
			this.showPersonAnon("church" + id + ".jpg");
			this.setFlag(2);
			break;
		case 361:
		case 369:
		case 370:
			if (idn == 9) {
				this.showPersonAnon("aquarium-busty2.gif");
				this.setFlag(5);
			} else this.showPersonAnon("aquarium" + id + ".jpg");
			break;
		case 435:
			this.showPersonAnon("gym" + id + ".jpg");
			break;			
		}
	};

	per.showEventPopup = function()
	{
		if (Place == 1 && nFromPlace != 1 && sType === "") {
			showPopupWindow("",
				'<img src="UI/logo.png" style="width:90%;margin:auto"><br>' +
				"This is an adults only game and please do not go any further if you are under 18 years old.<br><br>" +
				"This game's mission is to find a mysterious book of magic and learn the spells within " +
				"to improve your relations with the locals, your friends and relatives, or just to simply gain power over them.<br><br>" +
				"If you find any mistakes or have ideas of your own then join the <a href='https://hypnopics-collective.net/smf_forum/index.php' target='_top'>Hypnopics Collective Forums</a> and join the discussion.<br><br>" +
				'<b>Some notes on game play</b><br><br>' +
				'<b>Items:</b> you will find many items around in the town in right of the screen. You pick them up by clicking the "pick up" link or the hand icon <img src="UI/themes/theme1/pickup.png" style="max-width:40px;height:1em;margin-right:2px" title="Pick Up" alt="Pick Up">. You may wish to examine them as well with the "examine" link or magnifying glass icon <img src="UI/themes/theme1/examine.png" style="max-width:40px;height:1em;margin-right:2px" title="Examine"></a>.<br><br>' +
				'<b>Item Inventory:</b> once picked up the items are in your inventory, in a bag you are carrying, pockets or similar. You can open the inventory in several ways, these depend on a setting in the game you can change in the Apps in your phone.<br>' +
				'&nbsp;&nbsp;&nbsp;- a bag icon <img draggable="false" src="UI/themes/theme1/bag.png" style="width:24px" title="Inventory" alt="Inventory"> click this and it will open your inventory in a tab on the right. Click again to close.<br>' +
				'&nbsp;&nbsp;&nbsp;- the bag icon can also popup your inventory in a new window. This is the default for a mobile device.<br>' +
				'&nbsp;&nbsp;&nbsp;- a bar is on the right with icons for key things, click <img src="data:image/gif;base64,R0lGODlhKAAoAOMKAKioqKmpqaqqqqurq6ysrLm5ubq6uru7u/39/f7+/v///////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAA8ALAAAAAAoACgAAAT+8Jkgqr046xzMO8JAbWR5BYMABqjpkuJothbLXuJrpqFc8zzdbOMTlooYpDFZQY2czaVrEGNRpcdaIKFQJG5R7OnU7fqUwmBvUFaI1OosJUCAvgXttcBZ3/tJMnEVeRlBaGE/eylUXF5XOTljOyGIbGWGFYs6KXMYKXlxnYKeI5ylFI0Jik0UPDQlIl5ts7RlXK87AbUKCF5cvbW4LrJdjcTGyAovQALJbQnGxbaU1LCITm1QYaOFpZSdeGVRrdTC3ThqhJlq5jiZJwBB6gMAPswbQa6R4V0/3u9ScuiCpmAONzEy1B1CWCEVIjE4fPhSlghiE0w1LOyz6AkgRw4jfs6E/JgRkI4WCy22QgGApIl431yCTFGgnUwRBSSk5NjhQQQAOw==" width="24px"/> to expand and see more details.<br><br>' +
				'<b>Spells:</b> you must always choose to cast a spell, the game will not prompt you to do this. You must have sufficient mana to cast a spell and then,<br>' +
				'&nbsp;&nbsp;&nbsp;- Open your inventory and click the cast link, or magic wand icon <img draggable="false" src="UI/themes/theme1/mana.png" style="width:24px" title="Mana" alt="Mana">.<br>' +
				'&nbsp;&nbsp;&nbsp;- Click on the mana icon in the left side bar <img draggable="false" src="UI/themes/theme1/mana.png" style="width:24px" title="Mana" alt="Mana">. This opens a quick list of all known spells, click the one to cast.<br><br>' +
				'<b>Your Phone:</b> you have a low spec mobile phone with some basic apps and features like a camera, notes, local map. You should check these at times,<br>' +
				'&nbsp;&nbsp;&nbsp;- <img src="UI/apps.png" width="30"/> Apps, check here for settings and your alarm clock. Other settings change the appearance or behaviour of your inventory.<br>' +
				'&nbsp;&nbsp;&nbsp;- <img src="UI/addressbook.png" width="30"/> Address Book , this lists all the people you know, and can allow you to give them a phone call if the icon is blue. You can filter out messages from people if wanted.<br>' +
				'&nbsp;&nbsp;&nbsp;- <img src="UI/map.png" width="30"/> Map, this shows a local map. It updates as you learn of new places.<br>' +
				'&nbsp;&nbsp;&nbsp;- <img src="UI/notes.png" width="30"/> Notes, this contains a list of information, notes of things you know or are looking for. Check for information on what you are doing and need to do. This <b>does not</b> list anything you have not found out in game play.<br>' +
				'<br>Other Things:<br>' +
				'<img src="UI/walk.png" width="30"/> - these choices buttons move you to another place.<br>' +
				'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE8CAMAAABq2/00AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4ODg4eHh4uLi4+Pj5OTk5eXl5ubm5+fn6Ojo6enp6urq6+vr7Ozs7e3t7u7u7+/v8PDw8fHx8vLy8/Pz9PT09fX19vb29/f3+Pj4+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAAAAAAluOFBgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTXdYP5PAAAYR0lEQVR4Xu2deYAVxZnAawZQB5BLcbgcBC9EGBCIK7qYeG1WN8PhwSqSlVVxUUlAZTl0iGfUVTa4ImhURA2CUVcXRE0kJvEGBBEQBLmHYZiLGeZ6r6v6j9nvq/4ec7033e91V79uqF8MMK+r66vvN1Xd1edj9ZqU0fJcoOW5QMtzgZbnAi3PBVqeC7Q8F2h5LtDyXKDluUDLc4GW5wItzwVangu0PBdoeS7Q8lyg5blAy3OBlucCLc8FWp4LtDwXaHku0PJcoOW5QMtzQTrkjWLeM4rq9hWf5U3sRMmqoNNEiuIXfsqL9bgO51xx/aS7Z8x0zqxG0EcS/HnGXbdcf9XZJ1HdORTLF/yTl4u5dbrojqXfVwtTAKYp/3ICFD0KfSSxfjYFFzWblt4xorPP+nySl58DaZ10/oMbi6IxFbHk3SNMLrhp1hV/99DAE/E3REGV44u8bOwRHSd8VEXZKkMc+dPELIiVW19/J8VWiR/yclgm63nnHoHdQy3QA8XeX51m6VOPD/JgB9t2zLd1psENylEZ8PvhonbD2Hagz4ddr3J5UyGP4e/UGdgpPNrGJQZjAJG3hmb6sedQLa8DYyeML6XcfEOUjG+XwTKpDcpQLA92sl0WHVHe45rDRcWCbuoPO9TKg7nd6WsM9cO1OTB8+Ze9YINB7VCE0urhkOKszzk3/O95ZpSLz88Ee6NU7jdUyoMxO2yT8ulJIoTx3fAMlpGh0J5CeeCu7y7ue6+LAccd2/swlhlKeXkZrPfHsPGhXHwH5PGPezKWR+1RgDp5cCy7SsD0jnLxHWHATnfFCSp3GsqqZqzNvAjlkT6iTzKWQS3yHlXy8lnGpYfT1uti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" width="30"/> - click this icon on images showing it to take a photo and set as your wallpaper image in your phone.<br>' +
				'<img src="UI/themes/theme0/bookred.png" width="30"/> - if the book turns red or blinks try examining at it.<br>' +
				'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEUAAAD+/v7///89+DgTAAAAAXRSTlMAQObYZgAAAVZJREFUeNptU7sVwyAMlClcMAIjeArPwxSMQJ3KhV8eaMqgk4RJXlSY8xn9zhIRvd5kpmhnrvpu6GBuShjiYUooCnIUeTcU5agWgvmi9O1yS6RBw+Rys0gx98uiZomwCTwlSicghoEncYtKXBKQ7GS2L4MoG5udAUG1Iq1Pgjb3YEA6bsnxLuElKVKjVIN2h2O/KZbdBBmeNVwUSpLSho1kdyj4Mi7s1QC6Hn0dDd2aUONe7o7kwDU8CmTpTmRIFU17hP9LJDxBxKGx00Y0EMWJYN6nE9uS3G5o8oWYJa3P/0T4JeIvcSDcQmQV60mrM+Jpi1fnWp1yjWbpaO5oNJtD+3ul2X7ymXMi+mR/a/pFdCeyVcNOzGqKvjtaR9tCzQVSsA7MulnPrvEzdDw3y8bS5mOxS10fa6i3P4RKePl6RP/ZvkD+s8lXjOAicvp6Q1rIqWsq+AM8u0pummQWSgAAAABJRU5ErkJggg==" width="30"/> - you wake at 6am, but you can change this in your phone in Apps and the alarm clock.',
				"WaitHereOnly(1);dispPlace(Place,'type=modstart')", '', true
			);
			nFromPlace = 1;
			return true;
		}
		
		if ((Place == 1 && sType === "modstart") || sType === "selectmodels") return selectModels(undefined, sType === "selectmodels");		
		
		if (Place == 161 && sType == "useplans") {
			// Use the plans in the hotel and appear in the cellar
			perYourBody.RemoveItem(23); //Drop the Hotel Plans, remove plans from the game and set as "USED" - checked for future access
			setPlaceFlag("Hotel", 10);

			showPopupWindow("Hotel Cellar",
				"<img src='Images/door2.jpg' style='width:45%;float:right;margin-left:5px' alt='Hotel Cellar'>" +
				'The plans show a small cellar door behind a corridor leading from the bar. It does not look to be used much, there were some boxes piled up here but they have been pushed aside, no idea when. You go through the door.</p>' +
				"<p>The hotel plans get caught in the door and are torn in half.  Ruined but hopefully you will not need them anymore."
			);
			return true;
		}
	
		
		if (sType !== "") return false;

		// Initial meeting with the busty woman
		if (((Place == 369 && this.place == 369.09) || (Place == 370 && this.place == 370.09)) && !this.checkFlag(38)) {
			this.setFlag(38);
			this.setFlag(5);
			showPopupWindow("A Well-endowed Woman",
				this.addPersonString("aquarium-busty1.gif", "40%", "right") +
				"<img src='Images/aquarium-busty1.gif' class='imgpopup' alt='Woman'>" +
				"You see a happy looking woman walking near one of the displays, your eyes are drawn to her bust, it is barely contained in her dress.</p>" +
				"<p>As she notices your glance she happily gives a little dance and then walks away clearly wanting to look at her and proud of her figure!"
			);
			return true;
		}		
		// Initial meeting with the exhibitionist
		if (Place == 195 && this.place == 195.09 && !this.checkFlag(35)) {
			this.setFlag(35);
			showPopupWindow("A Vaguely Familiar Woman",
				this.addPersonString("generalstore-exh2.jpg", "height:max%", "right") +
				"A young woman approaches you and she is very familiar to you. For a moment you thought she was Leanne, she sort of looked like her for a moment.</p>" +
				"<p>You start to ask her what she wants and she suddenly exposes her breasts to you! You are quite sure you did not say 'show us your tits' and she quickly covers up and walks away without saying a word."
			);
			return true;
		}
		
		if (!this.checkFlag(41) && isSpellKnown("Possession")) {
			this.setFlag(41);
			showPopupWindow("Possession Spell",
				'<div style="position:absolute;bottom:0;right:0;width:100%;z-index:-1">' +
				addImageString(addBGSuffix("possession.jpg"), "100%", "rightpopup", '', '', '', 'noall') +
				"</div><div style='height:98%;height:calc(100% - 1.5em);width:60%;cursor:pointer;margin-bottom:-4px;font-size:1.1em;margin-top:1.5em'>" +
				"<p>The spell of possession is a form of Astral Projection but where you can project yourself to another person that you have a <b>magical link</b> to and take control of their body. Normally they will not be conscious of this, but some strong willed people might be aware in some way.. " +
				'A common magical link is a <b>personal possession</b> they have owned for a substantial time, but a <b>lock of hair</b> is even better.</p>' +
				'<p>The spell can <b>bypass</b> some forms of magical defense and things like strong will do not matter at all. As such the spell can be useful to have people remove or move their items.</p>' +
				'<p>The possession will be limited to the building they are currently in, crossing boundaries in or out of a property will disrupt the spell or you maybe unable to cross! Also dawn will end the possession spell like many magical spells.</p>' +
				'<p>Take care, you have heard legends of people having the silver cord that ties them to their body severed, either killing them or making them a soulless thing...'
			);
			return true;
		}
		return false;
	};

	per.setEventIdRorX = function(type, bNudist, bPublic, bExplicit)
	{
		var oBase = bExplicit === true ? oImages.People.GlenvaleTown.Explicit : oImages.People.GlenvaleTown;
		var cnt = 0;
		if (bNudist === true) {
			cnt = getImageOCnt(oBase, type + "nude");
			if (cnt != 0) this.place = Place + (Math.floor(Math.random() * cnt + 41) / 100);
		}
		if (bPublic === true && cnt === 0) {
			cnt = getImageOCnt(oBase, type + "public");
			if (cnt != 0) this.place = Place + (Math.floor(Math.random() * cnt + 71) / 100);
		}		
		if (cnt === 0) {
			cnt = getImageOCnt(oBase, type);
			if (cnt !== 0) this.place = Place + (Math.floor(Math.random() * cnt + 1) / 100);
		}
	};
	
	per.setEventId = function(type, chance, bNudist, bPublic)
	{
		if (chance !== undefined && chance > 0) {
			if (Math.random() >= chance) return false;
		}
		if (isExplicit()) {
			this.setEventIdRorX(type, bNudist, bPublic, true);
			if (this.place != 0) return;
		}
		this.setEventIdRorX(type, bNudist, bPublic, false);
	};
	
	per.showEvent = function()
	{
		var md, perMadison, img;
		
		if ((Place == 327 || Place == 269 || Place == 282) || sType.indexOf("cultnun") != -1) {
			var cult = getPersonOther("Daria");
			var nun = getQueryParam("nun");
			if (nun === "" || nun > cult) return false;
			var oNun = oChurch.cult[nun - 1];
			if (oNun === undefined) return false;
			var sName = oNun.name;
			
			if (sType == "cultnunsex") {
				md = WritePlaceHeader();
				img = getImageO("Church/Nun" + nun + "/" + (perYou.isMaleSex() ? "straight" : "lesbian"), -9);
				
 				AddImage(img);
				addPlaceTitle(md, sName + ' in her cell');

				md.write('<p>You fuck ' + sName + '.</p>');

				startQuestions();
				addLinkToPlace(md, "talk more with " + sName, Place, 'type=cultnuncell&nun=' + nun);
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "cultnuncell") {
				md = WritePlaceHeader();
				AddImage("Church/Nun" + nun + "/after.jpg");
				addPlaceTitle(md, sName + '\'s cell');

				md.write('<p>You look around and see ' + sName + ' and ask her to take you to her cell.</p>');

				startQuestions();
				img = getImageO("Church/Nun1/" + (perYou.isMaleSex() ? "straight" : "lesbian"), -9);
				if (img !== "") addLinkToPlace(md, "practice what you preach", Place, 'type=cultnunsex&nun=' + nun);
				addSleepLink(md, "spend the night with " + sName, "Cloistered with " + sName,
					'<p style="position:absolute;left:2%;top:10%;cursor:pointer;font-size:1.1em;width:90%">You take Desiree back her her cell and join her for the night. She worships you and your body until you both fall into an exhausted sleep.<br><br>In the morning you see her lying next to you almost like an angel!.',
					"Church/Nun" + nun + "/bed.jpg", true
				);
				addLinkToPlace(md, "return to the cloisters", 327);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (Place == 269 && sType == "cultnunpool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
 				AddImageGM("Church/Nun" + nun + "/pool.jpg");
				addPlaceTitle(md, "Swimming with " + sName);
				md.write(
					'<p>' + sName + ' arrives, dressed is an attractive swimsuit, you are a little surprised she even owns one!</p>'
				);
				startQuestions();
				img = getImageO("Church/Nun" + nun + "/pool-sex", -9);
				if (img !== "") addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=cultnunpoolsex&nun=' + nun);
				addLinkToPlaceC(md, 'say goodbye to ' + sName, Place);
				WritePlaceFooter(md);
				return true;
			}
			if (Place == 269 && sType == "cultnunpoolsex") {
				md = WritePlaceHeader();
				img = getImageO("Church/Nun" + nun + "/pool-sex");
				AddImage(img);
				addPlaceTitle(md, "Being Discrete and Private with " + sName);
				md.write(
					'<p>You ask your disciple to play with you more privately, and she seductively removes most of her bikini and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to ' + sName, Place);
				WritePlaceFooter(md);
				return true;
			}		
			
			if (Place == 282 && sType == "cultnunclubdancing") {
				md = WritePlaceHeader();
				AddImage("Church/Nun" + nun + "/poledancea.jpg");
				addPlaceTitle(md, sName + "'s Dance");
				md.write(
					'<p>' + sName + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
					'<p>' + sName + ' is not an experienced dancer but she entertains the audience well. ' + sName + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
					'<p>After she collects her tips and offers them to you, but you feel ' + sName + ' deserves her tips.</p>'
				);
				if (checkPersonFlag('Jade', 8)) md.write('<p>Besides which your deal with Jade for Seraphina means this is a free dance anyway.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
				WritePlaceFooter(md);
				return true;
			}	
		}
		
		if (Place == 81) {
		
			if (sType == "passwordpuzzle") {
				md = WritePlaceHeader(true);

				if (!perDavy.checkAnyFlags()) perDavy.setFlag(Math.floor(Math.random() * 3) + 33);

				addPlaceTitle(md, "Davy\'s Computer", '', 0, true);

				if (!isSpellKnown("Teleport")) {
					// if we don't already have the spell
					findPerson("Monique");
					per.setFlag(4);  // Set it to "have read the puzzle, need help.
				}

				md.write(
					'<p>You turn the computer on and access requires you to logon to the account. You try to guess a password but it is wrong, and a hint is shown for the correct one. If you can crack the meaning of the hint you will have access to Davy\'s files.</p>' +
					'<table class="table-main">' +
					'<tr><td class="td-left">' +
						'<img src="Images/time1.jpg" style="float:left;border-width:1px;width:95%" alt="Time">' +
					'</td>' +
					'<td class="td-center">' +
						'<p>Solve the problem:</p>' +
						'<div style="text-align:left">' +
						'<table class="table-main">' +
							'<tr><td style="text-align:center;background-image:url(' + getThemeFolder() + 'background.jpg)">'
				);
				if (perDavy.checkFlag(33)) md.write('<p style="text-align:center">What is at the beginning of eternity, the	end of time, the beginning of every end, and the end of every place?</p>');
				else if (perDavy.checkFlag(34)) md.write('<p style="text-align:center">Complete this line "I\'d do anything for love ..."</p>');
				else if (perDavy.checkFlag(35)) md.write('<p style="text-align:center">Complete this title "Enter ..."</p>');
				md.write('</td>' +
							'</tr>' +
							'<tr><td>' +
									'<form name="FormChar" onsubmit="PuzzleComputer(document);return false">' +
										'<input type="text" size="20" name="research">' +
										'<input type="submit" value="enter">' +
									'</form>' +
								'</td>' +
							'</tr>' +
						'</table>' +
						'</div><br>'
				);

				startQuestions();
				addLinkToPlace(md, "forget the password", 81);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType === "passwordright") {

				md = WritePlaceHeader(false);
				addPlaceTitle(md, "Right Answer", '', 0, true);
				if (!perDavy.checkFlag(12)) addWallpapers(11, oImages.fixed.phonewallpapers);

				findPerson("Monique");
				per.setFlag(4, false);  // Gave the right answer, don't need help anymore

				md.write(
					'<p>You enter the correct password into the laptop and after browsing for a while you find a couple of interesting images that you upload into your phone as wallpapers.</p>' +
					'<p>You then find a document that is called <b>"Spell to be deciphered"</b>. You examine the document and start working to decipher the spell.</p>'
				);
				if (!isRunes()) {
					md.write(
						'<div style="text-align:center">' +
							'<p style="margin-bottom:0">Unscramble the letters: hot rum is sin</p>' +
							'<table class="table-main">' +
								'<tr>' +
									'<td>' +
										'<form method="POST" name="FormChar">' +
											'<input type="text" size="20" name="research">' +
											'<input type="button" name="button" value="enter" onClick="FindIt105(document)">' +
										'</form>' +
									'</td>' +
								'</tr>' +
							'</table>' +
						'</div><br>');
				}

				startQuestions();

				if (isRunes()) addOptionLink(md, 'try to learn the spell', "FindIt105(document)");

				addLinkToPlace(md, 'forget the spell for now', 81);
				AddRightColumnLarge();
				AddImage('time1.jpg');				
				WritePlaceFooter(md);				
				return true;

			}
			
			if (sType == "passwordwrong") {
				md = WritePlaceHeader(false);
				addPlaceTitle(md, "Wrong Answer", '', 0, true);

				md.write('<p>You didn\'t get it right. Better luck next time.</p>');

				startQuestions();
				addLinkToPlace(md, "leave Davy\'s room", 176);
				AddRightColumnLarge();
				AddImage('time1.jpg');
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 45) {
			if (sType == "radiopuzzle") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");

				if (!perMadison.checkAnyFlags(33, 35)) perMadison.setFlag(Math.floor(Math.random() * 3) + 33);

				if (perYou.getQuestRustyKey() < 3) perYou.setQuestRustyKey(3); 	//  Set the Variable to "Trying the puzzle"
				if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");	//Know about the radio station after trying the puzzle

				addPlaceTitle(md, "Phone Call", getThemeFolder() + 'antenna.png');

				md.write(
					'<p>You listen to the phone message.</p>' +
					'<p>"Hi," says a clear male voice. "This is local radio station MC 550. You are our lucky random call. Can you guess the answer to this puzzle for a prize stereo?"</p>'
				);

				if (!isPuzzles()) {
					md.write('<p>The person asks you to answer a word game, and you are fairly sure you know the answer.</p>');
					startQuestions();
					addLinkToPlace(md, "answer confidently", 45, "type=radiocorrect");
					addLinkToPlace(md, "ummmm...on second thoughts I do not know", 45, "type=radiowrong");
					WritePlaceFooter(md);
					return true;
				}

				if (perMadison.checkFlag(33)) {
					md.write(
						'<p>What comes next in this sequence:</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>Dog, Cat, Mouse, Mole, Deer, Pig,&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">Cow</option>' +
										'<option value="2">Llama</option>' +
										'<option value="3">Rabbit</option>' +
										'<option value="4">Frog</option>' +
									'</select>'
					);
				} else if (perMadison.checkFlag(34)) {
					md.write(
						'<p>What mathematical symbol can be put between 5 and 9, to get a number bigger than 5 and smaller than 9?</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>+-*/.|&amp;,&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">+</option>' +
										'<option value="2">-</option>' +
										'<option value="3">/</option>' +
										'<option value="4">*</option>' +
										'<option value="5">.</option>' +
										'<option value="6">|</option>' +
										'<option value="7">&amp;</option>' +
									'</select>'
					);
				} else {
					md.write(
						'<p>Two men decided to take a fishing trip. Both had one son and brought him along. Everyone on the trip caught and kept at least one fish. What\'s the fewest number of fish that could have been kept?</p>' +
						'<form method="POST" name="Puzzle">' +
							'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
							'<tr>' +
								'<td>How many?&nbsp;</td>' +
								'<td> ' +
									'<select name="answera" size="1">' +
										'<option selected value="1">1</option>' +
										'<option value="2">2</option>' +
										'<option value="3">3</option>' +
										'<option value="4">4</option>' +
									'</select>'
					);
				}

				md.write(	'</td>' +
							'<td> ' +
								'<input type="button" name="button" value="Answer" onClick="PuzzleRadio(document)">' +
							'</td>' +
						'</tr>' +
						'</table>' +
						'</div>' +
					'</form><br>'
				);

				startQuestions();
				addLinkToPlace(md, "give up", 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "radiocorrect") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");					
				if (perYou.getQuestRustyKey() < 5) perYou.setQuestRustyKey(5);
				perYou.setFlag(1);
				addPlaceTitle(md, "Correct Answer!", getThemeFolder() + "antenna.png");

				if (!isPuzzles()) md.write('<p>"You got it!"</p>');
				else {
					if (perMadison.checkFlag(33)) md.write('<p>"You got it! Llama! The length of each word is the same length of the numbers one, two, three, four, five, six, etc."</p>');
					else if (perMadison.checkFlag(34)) md.write('<p>"You got it! It\'s a trick, you put a Decimal Point, 5.9 works nicely"</p>');
					else md.write('<p>"You got it! There were only three people. The son, his father, and his grandfather."</p>');
				}

				md.write('<p>"Congratulations, your prize will be delivered very soon by \'G.R USX Deliveries\' a subsidiary of MC 550 Radio!"</p>');
				startQuestions();
				addLinkToPlace(md, "Hang up the phone", 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "radiowrong") {
				md = WritePlaceHeader();
				perMadison = findPerson("Madison");					
				if (perYou.getQuestRustyKey() < 900) perYou.setQuestRustyKey(900);
				addPlaceTitle(md, "Wrong Answer!", getThemeFolder() + "antenna.png");

				md.write(
					'<p>"Bad luck. Now for our next caller..."</p><p>The person hangs up, you have lost your chance for a new stereo.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "Hang up the phone", 45);
				WritePlaceFooter(md);
				return true;
			}				
		}		

		if (Place == 161) {
			if (sType == "learnwealth") {
				// Learn Wealth
				if (isRunes()) {
					Research("Spell", "DertPher", "", 161);
					return true;
				}
				md = WritePlaceHeader();
				addPlaceTitle(md, "Cupboard Spell", "cellar1.jpg");
				md.write(
					'<form method="POST" name="FormChar">' +
					'<p>What is the meaning of wealth? Enter the correct words to find the spell:</p>' +
					'<p><input type="text" size="20" name="research">'
				);
				md.write('<input type="button" name="button" value="please" onClick="ResearchOLD(\'W\', document.FormChar.research.value)"></p></form>');
				startQuestions("or give up for now");
				addLinkToPlace(md, 'Never mind...', 161);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "cupboardpuzzle") {
				md = WritePlaceHeader();
				
				var perMonique = findPerson("Monique");
				perMonique.setFlag(3);
				if (!perMonique.checkAnyFlags(33, 35)) perMonique.setFlag(Math.floor(Math.random() * 3) + 33);
						
				// Title
				addPlaceTitle(md, "Cupboard Puzzle", "cupboard.jpg");

				// Description
				md.write(
					'<p style="text-align:center">Only the wise one could know the meaning of the word.</p>' +
					'<form method="POST" name="FormChar">'
				);
				
				if (perMonique.checkFlag(33)) md.write('<p style="text-align:center">How would you rearrange the letters in the words new door to make one word?</p>');
				else if (perMonique.checkFlag(34)) md.write('<p style="text-align:center">If it\'s information you seek, come and see me. If it\'s pairs of letters you need, I have consecutively three. Who am I?</p>');
				else md.write('<p style="text-align:center">A natural state, I\'m sought by all. Go without me, and you shall fall. You do me when you spend, and use me when you eat to no end. What am I?</p>');
				
				md.write(
						'<p style="text-align:center"><input type="text" size="20" name="research">' +
						'<input type="button" name="button" value="please" onClick="FindItCupboard2(document)"></p>' +
					'</form>'
				);

				startQuestions();
				addLinkToPlace(md, "look around the cellar", 161);

				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "tabletpuzzle") {
			// Tablet puzzle to access the crypt
			md = WritePlaceHeader();
			var perMonique = findPerson("Monique");
			perMonique.setFlag(5);

			addPlaceTitle(md, "Tablet Puzzle", "Items/tablet.jpg");

			if (!checkPlaceFlag("Crypt", 3) && !checkPlaceFlag("Crypt", 4) && !checkPlaceFlag("Crypt", 5)) setPlaceFlag("Crypt", Math.floor(Math.random() * 3) + 3);
			
			md.write('<p>Embossed are the words, ');
			if (checkPlaceFlag("Crypt", 3)) md.write('&quot;One is vain by nature, <b>teomds</b> by necessity.&quot;');
			else if (checkPlaceFlag("Crypt", 4)) md.write('&quot;A maker of tablets, often said to be free <b>amnos</b>.&quot;');
			else md.write('&quot;A guard against the dead and often the living, <b>aiglcr</b>.&quot;');

			md.write(
				'</p><form method="POST" name="FormChar"><p>Unscramble the letters:</p>' +
				'<p><input type="text" size="20" name="research"><input type="button" name="button" value="please" onClick="FindItTablet(document)"></p></form>'
			);

			startQuestions();
			addLinkToPlace(md, 'go to the Wild Ranges?', 26);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "cultoffering") {
			// Offering from a nun in the church
			md = WritePlaceHeader();
			this.place = 0;		// Prevent the event happening again
			AddImage("Church/Nun" + this.health + "/charm2.jpg");

			addPlaceTitle(md, "An Offering");

			md.write(
				'<p>You call the nun over and she leads you to a small store area out of sight of the public, and she makes you an offering, her body!</p>' +
				'<p>After she leaves the church to other duties elsewhere in the abbey.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'return to the main area of the church', Place);

			WritePlaceFooter(md);
			return true;
		}

		if (sType !== "") return false;

		// Select a new event?
		if (Place == Math.floor(this.place)) return false;
		if (this.place !== 0 && !isOutside(Math.floor(this.place)) && !isAtLocation(123)) return false;	// no change of event when inside
		
		this.place = 0;		// New location, allow new encounter
		
		var nDaysNude = Math.floor((nTime - this.other) / 24);
		if (nDaysNude > 8) nDaysNude = 8;
		else if (nDaysNude < 2) nDaysNude = 2;
		var bNudist = this.checkFlag(37) ? (Math.random() * 10) < nDaysNude : false;
		var nDaysPublic = Math.floor((nTime - this.extra[0]) / 24);
		if (nDaysPublic > 8) nDaysPublic = 8;
		else if (nDaysPublic < 1) nDaysPublic = 1;
		var bPublic = this.checkFlag(40) ? (Math.random() * 10) < nDaysPublic : false;

		// Is there an encounter here?
		// Open museum
		if (Place == 239 && isShopOpen(2, 0, true) && !checkPlaceFlag("Museum", 8) && Math.random() < 0.2) {
			// Museum main hall and it is open
			this.setEventId("museum", 0.1, bNudist, bPublic);
		}
		// Church
		else if (Place == 318 && Math.random() < 0.2 && !this.checkFlag(2)) {
			// Church cathedral/main area
			if (!this.checkFlag(33)) this.place = 318.01;
			else this.setEventId("church", 1, bNudist, bPublic);
			return false;  // override default small size
		}
		// General Store
		else if (Place == 195 && checkPersonFlag("Leanne", 25) && Math.random() < 0.2) {
			if (!this.checkFlag(35)) this.place = 195.09;
			else if (this.checkFlag(1)) this.place = 195.01;
			else this.setEventId("generalstore", 0.1, bNudist, bPublic);
		}
		// School
		else if (Place == 70 && isShopOpen(2) && Math.random() < 0.05 && !this.checkFlag(3)) this.place = 70;	// Student Teacher
		// Streets
		else if (isDay() && (Place == 194 || Place == 238 || Place == 360 || Place == 94 || Place == 455 || Place == 2)) this.setEventId("streets", 0.15, bNudist, bPublic);
		// Wild Ranges
		else if (Place == 26 && isDay()) this.setEventId("wildranges", 0.1, bNudist, bPublic);
		// Aquarium
		else if (isShopOpen(2, 0, true) && (Place == 361 || Place == 362 || Place == 363) && Math.random() < 0.2) {
			if (!this.checkFlag(38) && (Place == 362 || Place == 363)) this.place = Place + 0.09;
			else if (this.checkFlag(38) && !this.checkFlag(5) && (Place == 362 || Place == 363) && Math.random() < 0.3) this.place = Place + 0.08;
			else this.place = Place + (Math.floor(Math.random() * 3 + 1) / 100);
		}
		// Sports field
		else if (Place == 144 && wherePerson("Kylie") != 144 && isShopOpen(2)) this.setEventId("sportsfield", 0.2, bNudist, bPublic);
		// Park Pathway
		else if (Place == 63 && isDay()) this.setEventId("park", 0.1, bNudist, bPublic);
		// Hotel Pool
		else if (Place == 269 && isDay()) this.setEventId("pool", 0.1, bNudist, bPublic);
		// Tennis Court
		else if (Place == 125 && isDay()) this.setEventId("tennis", 0.1, bNudist, false);		
		// Laundromat
		else if (Place == 199) this.setEventId("laundromat", 0.1, false, false);
		// Gym
		else if (Place == 435 && Math.random() < 0.1) {
			if (isPersonHere("Alison") || isPersonHere("OfficerKhan")) return false;
			this.setEventId("gym", 0.1, bNudist, bPublic);
		// Avernus club
		} else if (Place == 282 && perJade.isClubOpen()) this.setEventId("stripclub", 0.1, false, false);
		// Library
		else if (Place == 7 && isShopOpen(2, 1, true)) this.setEventId("library", 0.1, bNudist, bPublic);
		// Shops
		else if (Place == 194 && isDay()) this.setEventId("shops", 0.1, bNudist, bPublic);
		
		// Set the image size for the event
		if (this.place !== 0) SetRightColumnSize("");

		return false;
	};
	
	per.showPersonChat = function(md)
	{
		if (sType !== "" || Math.floor(this.place) != Place) return;
		
		var id = Math.round((this.place - Math.floor(this.place)) * 100);
		var bPublic = id > 70;
		var bNude = id > 40 && id < 71;

		switch (Place) {		
		case 318:
			if (id == 5) {
				var cult = getPersonOther("Daria");
				if (this.health <= cult) addLinkToPlaceC(md, 'ask the nun over to make a full offering', Place, 'type=cultoffering');
			}
			break;
		}
	};
	
	per.getPersonSMS = function(id) {
		if (id == 80) return receiveSMS('Broken Inn Hotel', 'Congratulations you have been selected to receive a free nights accommodation at the historic Broken Inn Hotel. Our friendly staff will be happy to cater to all your needs. Ask about our wedding packages! ', 'hotel3.jpg');
		return '';
	};

}
