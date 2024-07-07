var sComment = '';		// Current comment
var bChat;
var bChatLeft;

//**********************************************
// This one is for the chat links
//**********************************************
function Converse(s, nRequest)
{
	checkInvisible();	//Checks Invisibility and turns it OFF

	if (nRequest > 0) WriteCommentsHeader();
	else ClearComments();
	saveUndo(true);

	bChat = true;
	bChatLeft = true;
	var ret = true;
	if (findPerson(s) !== null && per.Replies !== undefined) {
		if (nRequest > 0) {
			addComments(
				(gameState.bShowSpeaker ? per.addPersonFace() : '') +
				'<p style="margin-top:0em; margin-bottom:0.5em;font-size:large"><b>' + per.getPersonName() + '</b></p>'
			);
		}
		ret = per.Replies(Math.abs(nRequest));
	} else {
		bChat = false;
		switch(s.toLowerCase()) {
			case "libraryresearch":
				ret = RepliesLibraryResearch(Math.abs(nRequest));
				break;
			case "misc":
				ret = RepliesMisc(Math.abs(nRequest));
				break;
			case "trial":
				ret = RepliesTrial(Math.abs(nRequest));
				break;
		}
	}
	if (nRequest > 0) WriteCommentsFooter(bChat, bChatLeft);
	if (ret) dispPlace();
}

function isCommentsShown() { return sComment !== ''; }

function setComments(s, click)
{
	var cdiv = document.getElementById('commentdiv');
	if (cdiv) {
		cdiv.innerHTML = '';
		if (click === false) cdiv.onclick = undefined;
	}
	sComment = s;
}
function setCommentsNoClick(s) { setComments(s, false); }

function addComments(s) { sComment += s; }

function resetComments(s) { sComment = s; }

function ClearComments(nt)
{
	if (nt !== true) sComment = '';
	var cdiv = document.getElementById('commentdiv');
	if (cdiv) {
		cdiv.style.display='none';
		cdiv.innerHTML = '';
	}
	bPopupShown = false;
}

function getConverseBubbleClass() 
{
	return isScreenSmall() ? 'conversebubble_small' : 'conversebubble';
}

function WriteCommentsHeader(click)
{
	//setComments('<span onclick="ClearComments()" class="zoom-icon" style="color:black;top:0em;right:0.1em;font-size:3em">&#215;</span><div class="' + getConverseBubbleClass() + '">', click);
	setComments((click !== false ? '<span class="zoom-icon" style="color:black;top:0em;right:0.1em;font-size:3em">&#215;</span>' : '') + '<div class="' + getConverseBubbleClass() + '">', click);	
}

function WriteCommentsFooter(chat, left)
{
	if (bPopupShown || sComment === '') {
		ClearComments();
		return;
	}
	bPopupShown = true;

	bChat = chat;
	bChatLeft = left;
	
	var cdiv = document.getElementById('commentdiv');
	if (!cdiv) return;

	if (gameState.sMod !== "" && perMod !== undefined) {
		var p = perMod;
		var so = sComment;
		do {
			so = p.replaceText(so, 'txt');
			p = p.perMod;
		} while (p != undefined);
		sComment = so;
	}

	if (bChat === true) {
		if (bChatLeft !== false) cdiv.style.backgroundImage = "url(" + getThemeFolder() + "speechgrey.png)";
		else cdiv.style.backgroundImage = "url(" + getThemeFolder() + "speechgrey-right.png)";
	} else cdiv.style.backgroundImage = "url(" + getThemeFolder() + "bubblegrey.png)";
	if (sComment.indexOf("<b>") == -1) cdiv.innerHTML = '<br>' + sComment + '</div>';
	else cdiv.innerHTML = sComment + '</div>';
	cdiv.style.display = 'block';
}

function WriteComments(sText, by, click)
{
	// suppress sText == undefined?
	//if (sText === undefined) return;
	WriteCommentsHeader(click);
	if (by !== undefined && by !== "") addComments('<p style="margin-top:1em;margin-bottom:.5em;font-size:large;cursor:pointer;"><b>' + GetPersonName(by) + '</b></p>' + sText);
	else addComments(sText);
	WriteCommentsFooter(bChat, bChatLeft);
}

function alterComments(top, mxheight, click)
{
	var cdiv = document.getElementById('commentdiv');
	if (!cdiv) return;
	if (top !== undefined && !gameState.bCommentLL) cdiv.style.top = top;
	if (mxheight !== undefined) cdiv.style.maxHeight = mxheight;
	if (click !== undefined) cdiv.onclick = click;
}

// Generally reply to a question
function Reply(txt, ps, js, par, rf)
{
	bChatLeft = js !== undefined ? js.indexOf('bChatLeft=false') == -1 : true;
	var bc = false;
	if (ps !== undefined && txt.indexOf('"pname"') == -1) {
		var pf = '';
		if (gameState.bShowSpeaker) {
			var p = findPersonNC(ps);
			if (p !== null) {
				bc = true;
				pf = p.addPersonFace();
				if (txt.indexOf(pf) != -1) pf = '';
			}
		}
		txt = pf + '<p id="pname" style="margin-top:0em;margin-bottom:0.5em;font-size:large"><b>' + GetPersonName(ps) + '</b></p>' + txt;
	}
	if (txt !== undefined && txt !== "") {
		if (txt.indexOf('conversebubble') == -1 && txt.indexOf("zoom-icon") == -1) {
			WriteCommentsHeader();
			addComments(txt);
		} else setComments(txt);
	}
	if (js !== undefined) {
		saveUndo(true);
		eval(js);
	}
	WriteCommentsFooter(bc, bChatLeft);

	passTime(true);
	if (rf === false) return;
	dispPlace(undefined, par);
}

function startAlternatives(doc, txt)
{
	gameState.bAltStarted = true;
	if (!doc) doc = mdCache;
	if (!txt) txt = "Choose <b>one</b> of the following";
	
	var s = '<fieldset class="gblocknf alternatives' + (gameState.pclr == "white" ? 'black' : '') +'" style="border:1px solid red;padding-bottom:0.8em;margin-top:1em;margin-bottom:-0.3em"><legend>' + txt + '</legend><div style="margin-top:-1.2em">';
	if (doc !== "string") doc.write(s);
	return s;
}
function endAlternatives(doc)
{
	gameState.bAltStarted = false;
	if (!doc) doc = mdCache;
	var s = '</div></fieldset>';
	if (doc !== "string") doc.write(s);
	return s;
}

function addTextForQuestions(doc, txt, alg)
{
	if (!doc) doc = mdCache;
	if (!alg) alg = "left";
	var s = '<p class="gblock" style="padding-left:1em;padding-top:1em;padding-bottom:0;margin-bottom:-0.7em;margin-top:0px;text-align:' + alg + ';">' + txt + '</p>';
	if (doc !== "string") doc.write(s);
	return s;
}

function startQuestionsOnly(txt, clr, doc)
{
	if (bQuestionsShown) return;
	if (!doc) doc = mdCache;

	// Add the questions prompt
	if (txt === undefined) txt = "Do you want to:";
	if (clr !== '' && clr !== undefined) {
		if (clr == "br") {
			doc.write('<br>');
			clr = '';
		} else clr = clr == "clear" ? 'clear:both' : 'color:' + clr;
	} else clr = ''; //'clear:both';
	if (isScreenSmall() && clr.indexOf("clear:both") == -1) clr = (clr === '' ? 'clear:both' : clr + ';clear:both');
	
	if (gameState.sQuestionWidth !== '') doc.write('<div style="width:' + gameState.sQuestionWidth + '">');
	doc.write('<p class="gblock" style="line-height:1em;padding-top:0;padding-bottom:0;margin-bottom:-6px;margin-top:-4px;font-size:medium;' + clr +'"><b>' + txt + '</b></p>');
	doc.write('<div id="startquestions"></div>');
	bQuestionsShown = true;
}
function startQuestionsText(doc)
{
	if (!doc) doc = mdCache;

	var bHex = isPlaceEnscribed(Place);
	if (Place != 43 && bHex && (perDavy.checkFlag(9) || isSpellKnown("Teleport")) && sType === "") {
		doc.write('<p><img draggable="false" style="float:left;height:1.5em" src="' + getThemeFolder() + (isPlaceAttuned(Place) ? 'symbol2' : 'symbol1') + '.png" alt="Hexagram" title="Hexagram"> ');
		if (Place == 53) doc.write('You see a symbol embossed into the base of the statue.</p>');
		else if (Place == 26 || Place == 141) doc.write('You see a symbol chiseled into one of the stones.</p>');
		else doc.write('You see a symbol carved into a tree nearby.</p>');
	}

	if (sPossess == "cast") {		// IsPossess('cast')
		//*********** IS POSSESSION CAST **************
		doc.write('<p style="text-align:center;color:#FF0000"><b>Possession Spell Cast</b></p>');
	}

	// Any text to show for any person here
	if (sType !== "") {
		// Special case for Jessica currently
		findPersonNC("Jessica").showPersonTextHere(doc);
		return;
	}
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		p.showPersonTextHere(doc);
	}
}

var bQuestionsShown;

function startQuestions(txt, clr, doc, np)
{
	if (bQuestionsShown) return;
	if (!doc) doc = mdCache;

	// Any text to show for any person here
	startQuestionsText(doc);

	// Question header
	startQuestionsOnly(txt, clr, doc);

	// Add any questions/actions
	if (np !== true) showQuestionsPeople(doc);
}
function startQuestionsNP(txt, clr, doc) { startQuestions(txt, clr, doc, true); } 
function startQuestionsWidth(wid, txt, clr, doc, np)
{
	gameState.sQuestionWidth = (wid === undefined ? "75%" : wid);
	startQuestions(txt, clr, doc, np);
}

function showQuestionsPeople(doc)
{
	// Add any questions/actions
	var shid = '';
	perYou.showPersonChat(doc);
	var p;
	for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
		p = arPeople[i];
		p.showPersonChat(doc);
		if (p.isCharmedBy() && p.isHere()) shid += (shid === '') ? p.uid : ',' + p.uid;
	}
	if (shid !== '' && !isVisible()) {
		if (shid.indexOf(",") == -1) {
			p = findPerson(shid);
			addQuestionRI(md, 'become visible and greet ' + p.getPersonName(),
				"<p>You end the spell and " + p.getPersonName() + " smiles, \"Hello " + p.getYourNameFor() + ", sorry I did not see you come in\".",
				p.uid,
				"endInvisibility()"
			);
		} else {
			addQuestionRI(md, 'become visible and greet them',
				"<p>You end the spell and they smile and greet you.",
				'',
				"endInvisibility()"
			);			
		}
	}
}

function addQuestionR(doc, lnk, txt, ps, js, par, rf, pclass)
{
	if (pclass === undefined) pclass = "chatblock";

	var sc = "Reply(\'" + txt.split('"').join("&quot;").split("'").join("&rsquo;") + "\',";
	if (ps !== undefined && ps !== '') sc += '\'' + ps + '\'';
	else sc += "undefined";
	sc += ',\'' + js + '\'';
	if (par !== undefined) sc += ',\'' + par + '\'';
	if (rf !== undefined) {
		if (par === undefined) sc += ",undefined";
		if (rf !== undefined) sc += ',' + rf;
	}
	return addOptionLink(doc, lnk, sc + ');', pclass);
}
function addQuestionRO(doc, lnk, txt, ps, js, par, rf) { return addQuestionR(doc, lnk, txt, ps, js, par, rf, "optionblock"); }

function addQuestionC(doc, lnk, per, chc, pclass)
{
	if (!isVisible()) return '';
	if (pclass === undefined) pclass = "chatblock";
	return addOptionLink(doc, lnk, "Converse('" + per + "'," + chc + ")", pclass);
}
function addQuestionCO(doc, lnk, per, chc) { return addQuestionC(doc, lnk, per, chc, 'optionblock'); }

function addQuestionRI(doc, lnk, txt, ps, js, par, rf, pclass)
{
	if (!isVisible()) gameState.sInvisibleChoices += addQuestionR("string", lnk, txt, ps, js, par, rf, pclass);
}

function addOptionLink(doc, lnk, js, pclass, sty, id)
{
	//if (!doc) doc = mdCache;
	var nv = true;
	var bMove = (lnk.indexOf("sneak ") != -1 || lnk.indexOf("walk ") != -1 || lnk.indexOf("exit ") != -1 || lnk.indexOf("return ") != -1 || lnk.indexOf("leave ") != -1 || lnk.indexOf("follow ") != -1 /*|| lnk.indexOf("go to ") != -1 || lnk.indexOf("visit ") != -1 */);
	if (pclass === undefined || pclass === "") {
		if (bMove) pclass = "moveblock";
		else if (lnk.indexOf("speak to ") != -1 || lnk.indexOf("order ") != -1 || lnk.indexOf("ask ") != -1 || lnk.indexOf("'talk' ") != -1 || lnk.indexOf("talk ") != -1 || lnk.indexOf("tell ") != -1 || lnk.indexOf('"') != -1) pclass = "chatblock";
		else pclass = "optionblock";
	} else if (pclass == pclass.toUpperCase()) {
		pclass = pclass.toLowerCase();
		nv = (nv != "chatblock");
	} else if (pclass == "chatblock" && lnk.indexOf("say goodbye to ") != -1) pclass = "optionblock";
	if (pclass.indexOf("moveblock") != -1) bMove = true;
	if ((lnk.indexOf('"') != -1 || (nv && !bMove)) && doc !== "ss" && doc !== "string" && doc !== "top") {
		if ((sType === "" || sType.indexOf("private") != -1 || sType.indexOf("check") != -1) && Place != 10 && Place != 214 && Place != 444 && Place != 442) {
			if (!isVisible() && ((lnk.indexOf("that is all ") == -1 && lnk.indexOf("finish ") == -1 && lnk.indexOf("check ") == -1 && lnk.indexOf("visit ") == -1 && lnk.indexOf("wait ") == -1 && lnk.indexOf("meditate ") == -1 && lnk.indexOf("relax ") == -1 && lnk.indexOf("sit on ") == -1 && lnk.indexOf("search ") == -1 && lnk.indexOf("enter ") == -1 && lnk.indexOf("look ") == -1 && lnk.indexOf("go to ") == -1 && lnk.indexOf("go back ") == -1 && lnk.indexOf("go in ") == -1) || lnk.indexOf('"') != -1)) return '';
		}
	}
	lnk = '<span>' + lnk + '</span>';
	if (bMove) {
		nv = '';
		if (pclass.indexOf("southeast") != -1) nv = "<b style='color:white'>\uD83E\uDC7E</b>";
		else if (pclass.indexOf("southwest") != -1) nv = "<b style='color:white'>\uD83E\uDC7F</b>";
		else if (pclass.indexOf("south") != -1) nv = "<b style='color:white'>\uD83E\uDC7B</b>";
		else if (pclass.indexOf("northeast") != -1) nv = "<b style='color:white'>\uD83E\uDC7D</b>";
		else if (pclass.indexOf("northwest") != -1) nv = "<b style='color:white'>\uD83E\uDC7C</b>";
		else if (pclass.indexOf("north") != -1) nv = "<b style='color:white'>\uD83E\uDC79</b>";
		else if (pclass.indexOf("east") != -1) nv = "<b style='color:white'>\uD83E\uDC7A</b>";
		else if (pclass.indexOf("west") != -1) nv = "<b style='color:white'>\uD83E\uDC78</b>";
		lnk = nv + "<img draggable='false' src='UI/walk.png' style='height:10px;height:0.8em' alt='walk'>&nbsp;" + lnk.split(" <").join("&nbsp;<").split("> ").join(">&nbsp;");		// Needed as as the bglock class since using flexbox seems to lose spaces around italics or bold terms. Unknown why;
	}
	//lnk = lnk.split(" <").join("&nbsp;<").split("> ").join(">&nbsp;");		// Needed as as the gblock class since using flexbox seems to lose spaces around italics or bold terms. Unknown why
	var adj = '';
	var st = '';
	if (gameState.bAltStarted) sty = sty !== undefined ? sty + ';width:95%' : 'width:95%';
	else 	if (gameState.lFloat !== '') sty = (sty !== undefined ? sty + ';' : '') + "margin-left:calc(10% + " + gameState.lFloat + ");width:calc(80% - " + gameState.lFloat + ")";
	else if (gameState.rFloat !== '') sty = (sty !== undefined ? sty + ';' : '') + "width:calc(80% - " + gameState.rFloat + ")";	

	if (sty !== undefined) st = ' style=\'' + sty + '\'';
	if (id !== undefined) st += ' id=\'' + id + '\'';

	if (js.indexOf("loadUnDo") == -1) js = "saveUndo();"  + js;
	if (doc === "ss") return '<p class=\'gblock ' + pclass + '\'' + st + ' onClick=\'' + js + '\'>' + lnk + '</p>';
	st = '<p class=\'gblock ' + pclass + '\'' + st + ' onClick="' + js + '">' + lnk + '</p>';

	if (doc == "comments") addComments(st);
	else if (doc == "top") mdCache.sPage = mdCache.sPage.split(' id="startquestions">').join(' id="startquestions">' + st);
	else if (doc && doc != "string") doc.write(st);
	return st;
}
function addOptionLinkC(doc, lnk, js) { return addOptionLink(doc, lnk, js, 'chatblock'); }
function addOptionLinkI(lnk, js) {
	if (!isVisible()) gameState.sInvisibleChoices += addOptionLink("string", lnk, js, 'chatblock');
}
function addOptionLinkIx(lnk, js) {
	if (perYou.checkFlag(28) && !gameState.bLastOutVisible) addOptionLinkI(lnk, js);
}

function addPopupLink(doc, lnk, title, body, blk, onclose, noclick, pclass, psty, sb)
{
	var st = addOptionLink(doc, lnk, "sctopFunction();showPopupWindowNow" + gameState.nUId + "();", pclass);
	return st === '' ? st : st + addPopupWindow(doc === "top" ? mdCache : doc, title, body, onclose == undefined ? "saveUndo(true)" : "saveUndo(true);" + onclose, psty, blk, noclick, undefined, sb);
}
function addPopupLinkC(doc, lnk, title, body, blk, onclose, noclick, psty) { return addPopupLink(doc, lnk, title, body, blk, onclose, noclick, 'chatblock', psty); }
function addPopupLinkI(lnk, title, body, blk, onclose, noclick, psty) {
	if (!isVisible()) gameState.sInvisibleChoices += addPopupLink("string", lnk, title, body, blk, onclose, noclick, 'chatblock', psty);
}
function addPopupLinkIx(lnk, title, body, blk, onclose, noclick, psty) {
	if (perYou.checkFlag(28) && !gameState.bLastOutVisible) addPopupLinkI(lnk, title, body, blk, onclose, noclick, psty);
}

/**************************************************************************
			Misc Response Base:  Museum, etc...
 **************************************************************************/
function RepliesMisc(nR)
{
	if (nR == 11300)
	{
		bChat = false;
		setPlaceFlag("Museum", 3, false);	// Set safe as Open   SAFE CLOSED = FALSE
		moveItem(29, 244);  // Place the Vase in that location
		Place = 244;
		addComments('<p><b>Museum</b></p>You open the safe.');
	}
	else if (nR == 63)
	{
		bChat = false;
		PlaceI(37, 63);
		addComments('<p><b>Kite in a Tree</b></p>You pull on the string causing the kite and small branch to fall. Unfortunately the kite is wrecked, beyond repair.');
	}
	if (nR == 182)
	{
		findPerson("MsTitus");
		per.other = 3;
		bChat = false;
		passTime(false, true);
		passTime(false, true);
		passTime(false, true);
		addComments('<img src="UI/books/thothbook.jpg" style="width:' + (isScreenSmall() ? '30%' : '15%') + ';float:right;margin-left:5px;margin-bottom:1em" alt="Book of Thoth">You spend a while checking novels, not because you believe the book is a fiction, but in case there are references to it that may give you some clues.</p><p>You realise quickly that you could spend days running through books or stories influenced by this, say the infamous Necronomicon, the Book of Thoth, and many other books of power in fiction.</p><p>The only consistent thing you see before giving up is that these books are always written in a cipher of some sort and that all the books you looked at had been checked out by two people, recently <b>Davy Robbins</b>, and in the more distant past <b>Sarah Gates</b>.');
		if (!perYou.isQuestComplete(1)) addComments('</p><p>During your search you hear Ms. Titus take a phone call, it is just so quiet in the library. You hear her say something like "...see you when you get back Mrs Clutz...", but shortly after she returns to reading her book with a sigh.');
	}
	else if (nR == 13206)
	{
		bChat = false;
		addComments('<p><b>Ghost in the Alley</b></p><p>The ghost almost seems to smile at you, then turns and walks <i>through</i> the painting and into the wall.</p>');
		if (!isSpellKnown("Pass")) {
			// Do not know Pass yet
			addComments('<p>You check the wall and it is completely solid, you wonder how you might be also to follow the ghost. Maybe the book can help but you will have to <b>study</b> it more.</p>');
		}
		movePerson("Kurndorf", 1000);
	}
	else if (nR == 30300)
	{
		addComments('<p><b>Hiding the Heirloom</b></p><p>You very carefully slip off the necklace and hide it at the back of one of the drawers beneath the sink.</p>');
		perYourBody.DropItem(43); // Place the necklace in the room
	}
	else if (nR == 376) //Stone in the Alley
	{
		bChat = false;
		addComments('<p><b>Stone in the Alley</b></p>');
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			if (checkPlaceFlag("Alley", 6))
			{
				perYourBody.PutItem(5); //Give you a stone
				setPlaceFlag("Alley", 6, false); //Gave you the stone
			}
			usingItem(5, 'You reach down and pick up the stone...  Score!');
		}	else addComments('<p>You reach to pick up the stone, but realize you don\'t have room in your bag for it.</p>');
	}
	else if (nR == 1506) //Stone in the Gina's Bathroom
	{
		bChat = false;
		addComments('<p><b>Gina\'s Bathroom</b></p>');
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			if (checkPlaceFlag("GinasHouse",6))
			{
				perYourBody.PutItem(6); //Give you a stone (20 mana)
				setPlaceFlag("GinasHouse", 6, false); //Gave you the stone
			}
			usingItem(6, 'You reach down and pick up the stone...  Score!');
		}
		else addComments('<p>You reach to pick up the stone, but realize you don\'t have room for it in your bag.</p>');
	}
	else if (nR == 1891) //Stone in Gates' Attic
	{
		bChat = false;
		addComments('<p><b>Stone in the Attic</b></p>');
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			if (!perYou.checkFlag(4))
			{
				perYourBody.PutItem(6); //Give you a stone
				perYou.setFlag(4); //Picked up the stone already.
			}
			usingItem(6, 'You reach down and pick up the stone...  Score!');
		}
		else addComments('<p>You reach to pick up the stone, but realize you don\'t have room in your bag for it.</p>');
	}	
	else if (nR == 9950) {
		setPersonOther("Nella", 1);
		setPersonFlag("Nella", 7);	// Asked after her
		addComments(
			'You ask around about Nella, when she is due to perform. The bartender tells you “Nella? We do not have a dancer of that name, but they often use different names". They ask you to describe her, and you give a brief description and mention she also works as a security guard. They answer,</p>' +
			'<p>"Oh sure that\'s Jana, she performs sometime around 1am, though sometimes earlier or later, basically after midnight. She only works Friday to Sunday, I guess she has a day job."</p>' +
			'<p>You check if by Friday they mean the early hours of Friday morning, or the following. They explain they meant after midnight on Friday so actually Saturday morning!'
		);
	}
	return true;
}

// Watch TV somewhere
function addWatchTVLink(md, lnk, title, body, img, js)
{
	img = img.replace(".mp4", ".jpg");
	js = js ? js + ';' : '';
	var s;
	if (img.indexOf(".mp4") != -1) s = '<video width="99%" muted autoplay loop style="display:block;position:relative;height:60vh;max-width:99%;border-width:0;border-style:none;top:0.5em;right:0;margin-left:auto;margin-right:auto;padding:0"><source src="Images/' + img + '" type="video/mp4"></video>';
	else s = '<span width="99%"><img onerror="onerrorImage(this)" style="display:block;position:relative;height:60vh;max-width:99%;border-width:0;border-style:none;top:0.5em;right:0;margin-left:auto;margin-right:auto;padding:0" src="Images/' + img + '" alt="' + img + '"></span>';
	addPopupLink(md, lnk, title,
		'<table style="width:100%;height:80vh"><tr style="vertical-align:top"><td style="width:30%;padding-right:8px">' + body +
		'</td><td style="width:70%">' + s + '<img style="border:none;position:absolute;width:70%;border-width:0;border-style:none;top:2em;right:0;margin:0px 0px 0px 0px;padding:0" src="UI/tv.png" alt="TV"></td></tr></table>',
		true,
		js + 'WaitHere(3)'
	);
}

// Watch Video on a phone somewhere
function addWatchPhoneVideoLink(md, lnk, title, body, img, js)
{
	img = img.replace(".mp4", ".jpg");
	js = js ? js + ';' : '';
	var s;
	if (img.indexOf(".mp4") != -1) s = '<video width="80%" muted autoplay loop style="display:block;position:relative;height:75vh;max-width:99%;border-width:0;border-style:none;top:0.5em;right:0;margin-left:auto;margin-right:auto;padding:0"><source src="Images/' + img + '" type="video/mp4"></video>';
	else s = '<span width="99%"><img style="display:block;position:relative;height:75vh;max-width:80%;border-width:0;border-style:none;top:0.5em;right:0;margin-left:auto;margin-right:auto;padding:0" src="Images/' + img + '" alt="' + img + '"></span>';
	addPopupLink(md, lnk, title,
		'<table style="width:100%;height:80vh"><tr style="vertical-align:top">' +
			'<td style="width:40%;padding-right:4px">' + body + '</td>' + 
			'<td style="width:52%">' + s + '<img onerror="onerrorImage(this)" style="border:none;position:absolute;width:55%;max-height:83vh;border-width:0;border-style:none;top:2em;right:0;margin:0px 0px 0px 0px;padding:0" src="UI/phonevid.png" alt="Video"></td>' + 
		'</tr></table>',
		true,
		js + 'WaitHere(3)'
	);
}