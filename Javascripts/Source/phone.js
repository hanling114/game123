/**********************************************************************************
Your Phone
***********************************************************************************/

//*********************************************************
// SMS's
var iNewSMS;		// Was a sms received just now
var arSMSImages;
var nUnreadSMS;

// An array of sms's by unique id's (they do not have to be contiguous)
// NOTE: currently max allowed is set in gameState.nSMSLimit, currently 480
var arSMS;
// Assigned id's
// Ms. Titus		: 1, 2, 3, 4, 5
// Janet Kelly		: 10, 11, 12
// Tracy				: 20, 21, 22, 23, 24, 29(about Ursula)
// Amy+Charlie 	: 30, 31, 32, 33 (Amy), 39 (Charlie)
// Ms.Jones			: 40, 41
// Miss Logan		: 42, 43, 44, 45
// Victoria			: 50, 51, 52, 53, 54, 55, 56
// Jesse				: 60, 61, 62, 63
// Madison + Zoey	: 70, 71, 72, 73 (Madison) 79 Zoey)
// Bambi + Mia		: 80, 81, 82, 83, (Mia) 88, 89
// Sarah				: 90, (Conspiracy only) 91, 92, (all) 98, 99
// Diane				: 100, 101, 102, 103, 104, 105(Victoria), 106
// Angela			: 110, 111, 112, 113, 114
// Donna				: 120, 121, 122
// Alison			: 130, 131, 132
// Ellie+Carol 	: 140, 141, 142(Carol), 143, 144 (Angelica/Sofia), 145, 146 (Leigh)
// Church			: 150, 151, 152(Desiree), 151(Pamela)
// Catherine		: 160, 161, 162, 163, 164, 165, 166, 167
// Leanne			: 170, 171, (Louise) 172, 173
// Hannah			: 180, 181, 182, 183
// Monique			: 190, 191, 192
// Mom				: 200, 201, 202, 203, (Ash) 206
// Kerry Batton	: 210, 211
// Mrs Granger		: 220, 221, 222
// Nina				: 230, 231, 232 (charmed), 233 (uncharmed)
// Kate				: 240, 241-249 (photo only), 255,256,257
// Abby				: 260, 261, 262
// Miku				: 270, 271, 272
//	Didi				: 280, 281
// Kylie				: 290, 291, 292, 293, 294, 295, 296
// Robbins			: 300, 301(Mrs)
// Kristin			: 310, 311
// Adamses			: 320, 321 (Tess) 325 (John)
// Emily				: 330, 331, 332, (Emily) 333, 334, 335 (Tammy)
// Nella+Betty		: 340, 341 (Nella), 349 (Betty)
// Elian+Melanie	: 346, 347, 348, 349, 350, 351, 352 (Elian) 355 (Melanie)
// Sharon+Savanna	: 360 (sharon), 365 (Savanna)
// Aunt Brandi 	: 370
// Kellie			: 380(l), 381(s), 382(l), 383(s), 384(l), 385(s)
// Cherry			: 390, 391(l), 392(s)
// Ms Reagan		: 401, 402, 403, 404, 405, 406, 407 (about Penelope)
// Penelope			: 400, 410, 411, 412, 413, 414, 415
// Heather+Ursula	: 420, 421, 422 (Heather) 425, 426 (Ursula)
// Ms. Charles		: 430 (from Geraldine), 431
// Julie				: 440 (murder path)

// People details
// Flag 64 set to block non-story SMS messages

// Popup to notify of an SMS
function newSMS()
{
	bChat = false;
	setTimeout(updateRightBar, 100);
	setCommentsNoClick('<table><tr><td style="width:15%"><img src="UI/smsblack.png" style="width:95%;float:left" alt="SMS"></td><td><p><b>Incoming SMS</b><br>Your phone chimes to indicate you have just received an SMS.</p>');
	addOptionLink("comments", 'check your SMS messages', "ClearComments();showRightBar(gameState.nRightBarState + 2,'sms')");
	addOptionLink("comments", 'not now', "ClearComments()", "optionblock", "padding-top:0.25em;line-height:0.75em;width:200px;max-width:20%;max-width:14vw;margin-top:0.75em");
	addComments('</td></tr></table>');
	console.log('sms id: ' + iNewSMS);
	
	playSound('sms.mp3');
}

// Incoming SMS from another (entire exchange)
// delimiters | ~ ^ `
function addSMS(id, unr)
{
	arSMS.push(id);
	if (unr === true) {
		//iNewSMS = id;
		nUnreadSMS = id;
	}
}

// Incoming SMS from another
function receiveSMS(from, txt, img, wid)
{
	if (img === undefined) img = '';
	return from + '^' + txt + '^' + img + (wid !== undefined ? '`' + wid : '') + '|';
}

// Your reply to anothers SMS
function replyToSMS(txt) { return '~' + txt + '~' + '|'; }

// A popup when you receive a phone call
function receiveCall(from, txt, nt)
{
	playSound('ring.mp3');
	bChat = false;
	if (nt !== true) {
		showRightBar(gameState.nRightBarState + 2);
	}
	setComments('<div class="' + getConverseBubbleClass() + '"><table><tr><td style="width:15%;vertical-align:top"><img src="UI/phonecall.png" style="width:95%" alt="Phone Call"></td><td><p style="margin-top:-0.5em">' + (from !== '' ? '<b>Phone call from ' + from + '</b><br>' : '') + txt + '</p></td></tr></table>', txt.indexOf("gblock") == -1);
}

function makePhoneCall(ps)
{
	if (findPerson(ps) !== null) {
		togglePhone();
		per.callThem();
	}
}

function sendMessage(ps, type)
{
	if (findPerson(ps) !== null) per.messageThem(type);
}

function addSMSToPhotos(id)
{
	var imdx = Math.floor((id - 1) / 32);
	arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
}

function addListenMessage(md, txt, ps, js, lnk)
{
	addQuestionR(md, lnk === undefined ? 'listen to the message' : lnk,
		'<div class="' + getConverseBubbleClass() + '"><table><tr><td style="width:15%;vertical-align:top"><img src="' + getThemeFolder() + 'phone2.png" style="width:95%" alt="Phone Message"></td><td><p>' +
		txt +
		'</p></td></tr></table>',
		ps, 
		js
	);
}


//*******************
// Phone Wallpapers
var nPhoneWallpapers;
var sPhoneImage;
var arPhotos;

function addWallpapers(wfrom, wto)
{
	for (var i = wfrom; i <= wto; i++) nPhoneWallpapers = setBitFlag(nPhoneWallpapers, i);
}
function removeWallpaper(wall)
{
	nPhoneWallpapers = setBitFlag(nPhoneWallpapers, wall, false);
}

// Phone wallpaper image
function saveWallpaper(img)
{
	if (img.substr(0, 7) == "Images/") img = img.substr(7);		// Strip leadimg Images/
	
	for (var j = 0; j < arPhotos.length; j++) {
		if (img == arPhotos[j]) break;
	}
	//console.log(img + ' ' + j);
	if (j >= arPhotos.length) {
		if (arPhotos.length >= gameState.nMaxPhotos) arPhotos.splice(0, 1);
	} else arPhotos.splice(j, 1);
	arPhotos.push(img);
	
	return img;
}
function setWallpaper(img, msg)
{
	perYou.extra[7] = -1;
	img = saveWallpaper(img);
	if (sPhoneImage === '' || sPhoneImage != img) sPhoneImage = img;
	if (gameState.nRightBarState >= 3) usePhone();
	var bPop = bPopupShown;
	bPopupShown = false;
	if (msg === undefined) WriteComments("Set as your wallpaper");
	else if (msg !== '') WriteComments(msg);
	bPopupShown = bPop;
}

function setWallpaperRef(els, msg)
{
	var el = els.parentNode;
	for (var i = 0; i < el.childNodes.length; i++) {
		var et = el.childNodes[i]; 
		if (et.style.display === "none") continue;
		var img = '';
		if (et.tagName.toLowerCase() == "img") img = et.src;
		else if (et.tagName.toLowerCase() == "span") {
			if (et.childNodes !== undefined) {
				if (et.firstChild.tagName.toLowerCase() == "video") {
					if (et.firstChild.firstChild.src != undefined) img = et.firstChild.firstChild.src;
				}
			}
		}
		if (img !== '') {
			if (img.indexOf("Mods/") != -1) img = "Mods/" + img.split("Mods/")[1];
			else img = img.split("Images/")[1];
			setWallpaper(img, msg);
			return;
		}
	}
}

//**********************************************
// Use the phone!
function showDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="block";
}
function hideDelete(doc, no) {
	var el = doc.getElementById("del" + no);
	if (el) el.style.display="none";
}

function rotatePhone()
{
	var sb = gameState.sPhoneState;
	gameState.bPhoneLandscape = !gameState.bPhoneLandscape;
	if (gameState.bPhoneLandscape) {
		hideSidebars();
		usePhone(sb);
	} else {
		showRightBar(-1 * gameState.nRightBarState);
		showLeftBar();
		gameState.sPhoneState = sb;
		updateGameDisplay();
		dispPlace();
	}
}

function togglePhone()
{
	if (Place < 2) return;
	if (gameState.nRightBarState < 3) {
		closeSpellList();
		showRightBar(gameState.nRightBarState + 2);
	} else showRightBar(gameState.nRightBarState - 2);
}
function openPhone()
{
	if (Place < 2) return;
	if (gameState.nRightBarState < 3) {
		closeSpellList();
		showRightBar(gameState.nRightBarState + 2);
	}
}
function openPhoneSMS()
{
	openPhone();
	usePhone("sms");
}

function phoneConfirm(msg)
{
	return confirm(msg);
}

function usePhone(stypein, no)
{
	gameState.sPhoneState = stypein === undefined ? "type=" : stypein.indexOf("type=") == -1 ? "type=" + stypein : stypein;
	var stype = getQueryParam("type", gameState.sPhoneState);

	var i;

	if (stype === "" || stype === undefined || stype == "alarm"|| stype == "date" || stype == "memory" || stype == "sms" || stype == "sendsms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "help" || stype == "games") {

		if (stype == "clear") {
			// Clear all sms's
			if (phoneConfirm('Are you sure you want to delete all SMS messages?')) {
				arSMS = new Array();
				gameState.sPhoneState = "";
			} else gameState.sPhoneState = "type=sms";
		} else if (stype == "delete") {
			// Delete an sms exchange
			if (phoneConfirm('Are you sure you want to delete this SMS message?')) {
				// no = the index to delete
				arSMS.splice(no, 1);
			}
			if (arSMS.length > 0) {
				gameState.sPhoneState = "type=sms";
			} else {
				gameState.sPhoneState = "";
			}
		} else if (stype == "game") gameState.sPhoneState = "type=game&id=" + no;
		else if (stype == "sms" && no !== undefined) {
			nUnreadSMS = 0;
			gameState.sPhoneState = "type=sms&id=" + no;
		}
		else if (stype == "sendsms" && no !== undefined) {
			var smsq = document.getElementById("smsinp");
			//console.log(smsq + " " + no);
			if (!smsq) {
				alterPerson(no);
				return;
			}
			var p = findPerson(no);
			smsq.innerHTML = 
				addOptionLink("string", '"Where are you?"', "sendMessage('" + no + "','where');usePhone('sms','" + no + "')", "replyblock", "position:relative") +
				//(p.isCharmedBy() ? addOptionLink("string", '"Send me a ' + (p.isCharmedBy() ? 'sexy picture' : 'selfie') + '"', "sendMessage('" + no + "','sexy');usePhone('sms','" + no + "')", "replyblock", "position:relative") : '') +
				addOptionLink("string", '"Send me a ' + (p.isCharmedBy() || p.isLover() ? 'sexy picture"' : 'selfie"'), "sendMessage('" + no + "','sexy');usePhone('sms','" + no + "')", "replyblock", "position:relative") +
				'<div id="smsq"></div>';
				setTimeout(function() {
					var myDiv=document.getElementById("smsq");
					if (myDiv) myDiv.scrollIntoView(false);
				}, 100);
			return;
		}
		updateRightBar(true);
		updateMain();
		
		if (perBeasley.checkFlag(14) && !perBeasley.checkFlag(17)) {
			showHintIcon("notesicon", "&nbsp;Notes", true, 0);
			perBeasley.setFlag(17);
		}
		
		return;
	}

	if (gameState.bPhoneLandscape) hideSidebars();

	if (stype == "gamebig") gameState.sPhoneState = "type=gamebig&id=" + no;
	else if (stype == "clearphotos") {
		// Clear all photos
		if (phoneConfirm("Delete all photos?")) {
			arSMSImages = new Array();
			for (i = 0; i < (gameState.nSMSLimit / 32); i++) arSMSImages.push(0);
			sPhoneImage = '';
			perYou.extra[7] = 0;
		}
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletephoto") {
		// Delete a photo
		if (phoneConfirm("Delete this image?")) {
			// no = the index to delete
			if (no == -1) {
				sPhoneImage = '';
				perYou.extra[7] = 0;
			} else if (no < 0) {
				arPhotos.splice((no * -1) - 1, 1);
			} else {
				i = Math.floor((no - 1) / 32);
				arSMSImages[i] = setBitFlag(arSMSImages[i], ((no - 1) % 32) + 1, false);
			}
		}
		//gameState.bLBNoShow = false;
		gameState.sPhoneState = "type=photos";
	}
	else if (stype == "deletewallpaper") {
		// Delete a wallpaper
		if (phoneConfirm("Delete this wallpaper?")) {
			// no = the index to delete
			removeWallpaper(no);
		}
		gameState.sPhoneState = "type=photos";
	}	

	if (gameState.bPhoneLandscape) updateMain(getPhoneContents());
	else {
		updateRightBar(true);
		updateMain();
	}
}

function showSMS(id, p, sDec, i) 
{
	//console.log(id + ' ' + p + ' ' + sDec + ' ' + i);
	var s = ''
	var bTo, sr, imdx;
	var ar = sDec.split('|');
	var bAdd = id === -1;
	for (var k = 0; k < ar.length; k++) {
		if (ar[k] === '') continue;
		bTo = ar[k].indexOf('~') != -1;
		if (!bAdd) {
			s += '<div onclick="usePhone(\'sms\',\'' + p.uid + '\')" onmouseover="showDelete(document,' + i + ')" onmouseout="hideDelete(document,' + i + ')" style="width:100%;cursor:pointer">' +
				'<div id="del' + i + '" style="display:none;width:100%;z-index:83"><a href="javascript:usePhone(\'delete\',' + i + ')"><img src="UI/themes/theme0/delete.png" style="height:1.2em;float:' + (bTo ? 'left' : 'right') + '" alt="Delete" title="Delete"></a></div>';
			bAdd = true;
		} else s += '<div onclick="usePhone(\'sms\',\'' + p.uid + '\')" style="cursor:pointer;width:100%">';

		if (bTo) {
			// To
			sr = ar[k].split('~');
			s += '<div class="smsto"><p class="smsp"><span style="font-size:x-small"><b>from: ' + (sr[0] === '' ? perYou.getPersonName() : sr[0]) + '</b></span><br>' + sr[1] + '</p></div>';
		} else {
			//from
			sr = ar[k].split('^');
			s +='<div class="smsfrom"><p class="smsp"><span style="font-size:x-small"><b>from: ' + sr[0] + '</b></span><br>' + sr[1] + '</p></div>';
		}
		s += '</div>';
		if (sr.length > 2 && sr[2] !== '') {
			// Flag the image is present
			if (id > 0) {
				imdx = Math.floor((id - 1) / 32);
				arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((id - 1) % 32) + 1);
			}
			// Show the image
			var sEx = p.isSMSImageDressVersion(id) || id == -1 ? '' : '!';
			if (sr[2].indexOf("`") == -1) {
				s += '<span>';
				if (id < 0) saveWallpaper(p.getImg(sEx + sr[2]));
				if (sr[2].indexOf(".mp4") != -1) s += '<span><video width="100%" autoplay muted loop style="width:60%;margin-left:15%"><source src="' + gameState.getImagesFolder() + p.getImg(sEx + sr[2]) + '" type="video/mp4"></video><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
				else s += '<img onerror="onerrorImage(this)" src="' + gameState.getImagesFolder() + p.getImg(sEx + sr[2]) + '" style="width:60%;margin-left:15%" alt="SMS"><span class="wp-icon" onclick="setWallpaper(\'' + p.getImg(sEx + sr[2]) + '\')"><img src="UI/wallpaperblack.png" width="24px" alt="Wall" title="Set as Wallpaper"></span>';
				s += '</span>';
			} else {
				var ir = sr[2].split("`");
				if (ir.length > 1) {
					s += '<span>';
					if (id < 0) saveWallpaper(p.getImg(sEx + ir[0]));
					if (ir[0].indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="width:' + ir[1] + ';margin-left:10%"><source src="' + gameState.getImagesFolder() + p.getImg(sEx + ir[0]) + '" type="video/mp4"></video>';
					else s += '<img onerror="onerrorImage(this)" src="' + gameState.getImagesFolder() + p.getImg(sEx + ir[0]) + '" style="width:' + ir[1] + ';margin-left:10%" alt="SMS">';
					s += '</span>';
				} else s += sr[2];
			}
		}
	}
	return s;
}

function showSMSTemp(p, txt, img)
{
	playSound('sms.mp3');
	if (!img) img = '';
	alterPerson(p.uid);
	setTimeout(function() {
		var smsq = document.getElementById('smsquery');
		if (!smsq) return;
		smsq.innerHTML += showSMS(-1, p, p.getPersonName() + '^' + txt + '^' + img, -1);
		smsq.style.display ='block';
		setTimeout(function() {
			var myDiv = document.getElementById("smsinp" + p.uid);
			if (myDiv) myDiv.scrollIntoView(false);
		}, 10);
	}, 100);
}

function PhoneChangeMonth()
{
	var om = nMonth;
	nMonth = parseInt(document.getElementById("Months").value, 10);
	if (nMonth == om) return;

	var days = document.getElementById("Days");
	days.options.length = 0;
	var lm = getMonthDays(nMonth);
	if (nDay > lm) nDay = lm;
	
	for (i = 1; i <= lm; i++) {
		days.options[i - 1] = new Option(i + '', i + '', nDay == i, nDay == i);
	}
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		arPeople[i].passTimeMidnight();
	}
	dispPlace();
}

function PhoneChangeDay()
{
	var od = nDay;
	nDay = parseInt(document.getElementById("Days").value, 10);
	if (nDay == od) return;
	
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		arPeople[i].passTimeMidnight();
	}
	dispPlace();
}

function getPhoneContents()
{
	var stype = getQueryParam("type", gameState.sPhoneState);
	var sno = getQueryParam("id", gameState.sPhoneState);
	var no = sno;
	var s, ss;

	var i;
	var img;
	var wpt = perYou.extra[7] == 1 ? "black" : "white";
	var wa = Math.round(0.045 * gameState.nWidth);
	var ha = Math.round(0.072 * getHeight(document));
	var la = Math.round(0.05 * gameState.nWidth);
	var lal = Math.round(0.1 * gameState.nWidth);
	var ratio = (screen.availWidth / document.documentElement.clientWidth);
	var zoomLevel = Number(ratio.toFixed(1).replace(".", "") + "0");
	var wtab = 5;
	var htab = Math.round(wtab * gameState.nWidth / 100);
	if (!gameState.bPhoneLandscape) {
		wa = wa / 2 - 4;
		la = la / 2 + 4;
		lal = lal / 2 + 4;
		wtab = 10;
		htab = Math.round(wtab * gameState.nWidth / 100 / 4);
	}
	htab = htab / zoomLevel;
	var imdx;
	var p;
	var sDec;
	var ar;
	var k;
	var sr;
	var bTo;
	var ir;
	var id;
	var hr;
	var hm;
	var min;
	
	if (stype == "notes1" || stype == "notes2" || stype == "notes3" || stype == "notes4" || stype == "notes5") s = getPhoneNotes(stype);  // Notes		
	else if (stype === "" || stype === undefined || stype == "memory"|| stype == "alarm" || stype == "date" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps" || stype == "game" || stype == "help" || stype == "games") {

		// Just opened the phone
		if (perYou.extra[7] == -1) img = sPhoneImage;
		else img = "phonewallpaper" + String.fromCharCode(perYou.extra[7] + 49) + '.jpg';
		if (!img.startsWith("Mods/")) img = "Images/" + img;

		s = '<script>document.onkeypress = stopRKey</script>' +
			'<div style="position:absolute;top:0;left:0;text-align:left;cursor:default;vertical-align:top;width:100%;height:100%;max-height:300vw;z-index:55;color:black">';
		if (img.indexOf(".mp4") != -1) s += '<video width="100%" autoplay muted loop style="position:absolute;width:95%;min-height:78%;max-height:78%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0"><source src="' + img + '" type="video/mp4"></video>';
		//if (img.indexOf(".mp4") != -1) s += '<div style="loat:left;position:relative;width:95%;height=78%;top:0;left:0"><video width="100%" autoplay muted loop style="float:left;position:relative;vertical-align:top;max-width:95%;max-height:78%;width:auto;height:auto;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0"><source src="Images/' + img + '" type="video/mp4"></video></div>';
		else s += '<img style="float:left;position:relative;vertical-align:top;width:95%;height:78%;object-fit:cover;object-position:9% 5%;border-width:0;border-style:none;top:9%;left:5%;margin: 0px 0px 0px 0px;padding:0" src="' + img + '" alt="' + img + '" onerror="onerrorImage(this)">';
		s += '</div><div style="position:absolute;top:0;left:0;text-align:left;cursor:default;vertical-align:top;width:100%;height:100%;max-height:300vw;z-index:56;color:black">';
		// Alternate: add bars at bottom as needed
		//max-width:95%;max-height:78%;width:auto;height:auto

		if (stype == "sms") {
			// View SMS's
			// no = uid of person viewing or '' for all
			//console.log("sms: " + nUnreadSMS);
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="smsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:76%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">';

			var cnt = 0;
			var ps = '';
			var j;
			s += addOptionLink("string", "<b>All</b>", "alterPerson('')", undefined, "width:80%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");

			var par = [];
			for (i = 0; i < arPeople.length; i++) {
				p = arPeople[i];
				//if (p.charmed == -1) continue;
				cnt = 0;
				for (j = 0; j < arSMS.length; j++) {
					if (p.getPersonSMS(arSMS[j]) !== '') {
						cnt = 1;
						if (nUnreadSMS > 0 && arSMS[j] == nUnreadSMS && no === "") no = p.uid;
					}
				}
				if (!p.isKnowPhoneNumber() && cnt === 0 && p.getPersonAddress() === "") continue;		// No messages this person		//  && p.getPersonAddress() === ""
				par.push(p.uid + (cnt > 0 ? "|" : ''));
			}
			par.sort();
			
			var pa;
			if (no === '') {
				// All SMS's sorted as received
				//console.log('all sms');
				s += '<div id="smsall">';
				cnt = 0;
				for (i = 0; i < arSMS.length; i++) {
					sDec = '';
					id = arSMS[i];
					for (j = 0; j < arPeople.length - 2; j++) {
						p = arPeople[j];
						sDec = p.getPersonSMS(id);
						if (sDec !== '') break;		// Found the id
					}
					if (sDec === '') continue;		// Invalid id
					cnt++;
					s += showSMS(id, p, sDec, i);
				}
				s += '</div>' + (cnt === 0 ? '<br>' : '');
				if (p.isPhoneable(true)) {
					s += "<div id='smsquery' style='display:none'></div>"
						+ "<div id='smsinp'><a id='smsinp" + p.uid + "' href='#' onclick='usePhone(\"sendsms\",\"" + p.uid + "\")' style='width:80%;float:right'><img src='UI/smssend.png' width='99%'></a></div>";
				}
				
				// Add buttons for all people
				for (j = 0; j < par.length; j++) {
					ar = par[j].split('|');
					//console.log(ar);
					pa = findPersonNC(ar[0]);
					if (ar.length == 2 && (!pa.isPhoneable(true) || pa.charmed === -1)) continue;
					s += addOptionLink("string", "<b>" + pa.getPersonNameShort() + "</b>", "alterPerson('" + pa.uid + "')", undefined, "width:80%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em");
				}
				
			} else {
				// Grouped by person
				//console.log('grouped by ' + no);
				cnt = 0;
				p = findPersonNC(no);
				for (j = 0; j < par.length; j++) {
					ar = par[j].split('|');
					pa = findPersonNC(ar[0]);
					if (pa.charmed === -1 && pa.uid !== "sarah" && pa.uid !== "julie") continue;
					var tc = 0;
					var ts = '';
					for (i = 0; i < arSMS.length; i++) {
						id = arSMS[i];
						sDec = pa.getPersonSMS(id);
						if (sDec === '') continue;		// Invalid id
						cnt++;
						tc++;
						ts += showSMS(id, pa, sDec, i) 
					}
					if (!pa.isPhoneable(true) && tc == 0) continue;
					s += addOptionLink("string", "<b>" + pa.getPersonNameShort() + "</b>", "alterPerson('" + pa.uid + "')", undefined, "width:80%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em" + (pa.uid == no ? ';margin-bottom:1px' : ''));
					if (pa.uid !== no) continue;		
					s += '<div id="sms' + p.uid + '">' + ts + '</div>' + (cnt === 0 ? '<br>' : '');
					if (pa.isPhoneable(true)) {
						s += "<div id='smsquery' style='display:none'></div>"
							+ "<div id='smsinp'><a id='smsinp" + pa.uid + "' href='#' onclick='usePhone(\"sendsms\",\"" + pa.uid + "\")' style='width:80%;float:right'><img src='UI/smssend.png' width='99%'></a></div>";
					} else s += "<div id='smsinp" + p.uid + "'></div>";
				}
			}
			s += 	'<script>' +
				'function alterPerson(x){usePhone("sms",x)};' +
				'var myDiv=document.getElementById("smsinp' + p.uid + '");' +
				'if (myDiv)myDiv.scrollIntoView(false);' +
				'</script>';
			
			nUnreadSMS = 0;
			s += '<br></div><p style="position:absolute;top:87vh;left:20%;font-size:small"><a href="javascript:usePhone(\'clear\')"><img id="clearicon" src="UI/trash.png" style="height:5vh;margin-right:0;margin-left:0" alt="Clear" title="Clear"></a></p>';

			//addOptionLink("string", "Clear", "usePhone(\'clear\')", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:20%;left:8%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;background-color:#5E5E5E;color:#FFFFFF;margin-top:1em");
			//+ " " + addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;margin-top:1em");
				
		} else if (stype == "addressbook") {
			// View your addressbook
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="addressdiv" style="position:absolute;top:9%;left:6%;width:88%;height:76%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<script>' +
				'function ChangeSMSOk(el) {' +
					'var id = el.parentNode.parentNode.getAttribute("id");' +
					'findPerson(id);' +
					'per.setFlag(64, el.checked !== true);' +
				'}' +
				'</script>' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr>' +
				'<td style="width:70%;vertical-align:top;border:1px solid black;font-size:smaller"><b>Person</b></td>' + 
				'<td style="width:5%;vertical-align:top;border:1px solid black;font-size:x-small"><img src="UI/smsblack.png" width="16px" style="display:block;margin:auto" title="Allow SMS Messages" alt="SMS"></td>' +
				'<td style="width:5%;vertical-align:top;border:1px solid black;font-size:x-small"><b>';
			if (isSpellKnown("Charm")) s += '<img src="UI/themes/theme0/mana.png" width="16px" style="display:block;margin:auto" title="Charmed" alt="Charmed">';
			else s += '<img src="UI/themes/theme0/book.png" width="16px" style="display:block;margin:auto" title="Other" alt="Other">';
			s += '</b></td></tr>';

			var par = [];
			var nSlaves = 0;
			for (i = 0; i < arPeople.length - 3; i++) {
				p = arPeople[i];
				var ad = p.getPersonAddress().split("Glenvale").join(gameState.sTown);
				var sp = "";
				/*
				var es = false;
				for (j = 0; j < arSMS.length; j++) {
					if (p.getPersonSMS(arSMS[j]) !== '') {
						es = true;
						break;
					}
				}
				*/
				if (p.isCharmedBy() || ad !== "") {
					sp = 	'<tr title="' + p.getPersonNameShort() + '" id="' + p.uid + '"><td style="padding-left:2px;border:1px solid grey">' +
							'<div style="float:right">';
					if (p.isKnowPhoneNumber()) {
						if (p.isPhoneable(true)) sp += '<a draggable="false" style="float:right" href="javascript:usePhone(\'sms\',\'' + p.uid + '\')"><img class="image-hover-highlight" draggable="false" src="UI/message.png" style="width:32px" title="Message" alt="SMS"></a>';
						else sp += '<img draggable="false" src="UI/messagedisabled.png" style="float:right;width:32px" title="Message" alt="SMS">';
						if (p.isPhoneable()) sp += '<a draggable="false" style="float:right" href="javascript:makePhoneCall(\'' + p.uid + '\')"><img class="image-hover-highlight" draggable="false" src="UI/phone2enabled.png" style="width:32px" title="Phone" alt="Phone"></a>';
						else sp += '<img draggable="false" src="UI/phone2disabled.png" style="float:right;width:32px" title="Cannot Call" alt="Phone">';
					}
					sp+= '</div><b>' + p.getPersonName(true) + '</b>';
					if (ad !== "") sp += '<br><span style="font-size:small"><b>Address</b>: ' + ad + '</span>';
					sp += '</td><td style="border:1px solid grey;text-align:center"><input style="cursor:pointer;float:left" type="checkbox" ' + (p.checkFlag(64) ? '' : 'checked ') + 'onchange="ChangeSMSOk(this)"></td>';
					if (p.isCharmedBy()) {
						nSlaves++;
						sp +=	'<td style="border:1px solid grey;text-align:center;font-size:larger">&#x2764;';
					} else sp += '<td style="width:5%;border:1px solid grey;text-align:center">&nbsp;';
					sp += '</td></tr>';
					par.push(sp);
				}
			}
			par.sort(function(aa, ab) {
				if (aa.indexOf("phone2enabled") != -1 && ab.indexOf("phone2enabled") == -1) return -1;
				if (aa.indexOf("phone2enabled") == -1 && ab.indexOf("phone2enabled") != -1) return 1;
				return aa.localeCompare(ab); // Sort by name
			});
			for (i = 0; i < par.length; i++) s += par[i];
			s += '<tr><td style="width:80%;border:1px solid grey"><b>Total: ' + (nSlaves > 0 ? nSlaves + ' of ' + par.length : par.length) + '</b></td></tr></table></div>';
					//+ addOptionLink("string", "Back", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;margin-top:1em");

			if (sno !== '') s += '<script>var el=getElementById("' + sno + '").scrollIntoView()</script>';

		} else if (stype == "apps") {
			// View your apps/settings
			var tms = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");
			ss = getHoliday();

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:76%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'alarm\')"><img style="width:95%" src="UI/alarmblack.png" alt="Alarm" title="Set your alarm clock"/></a>' +
				'<br><b>Alarm:<br></b>at: ' + tms + '</td>' +
				
				'<td style="width:33%"><a href=\"javascript:usePhone(\'date\')"><img style="width:95%" src="UI/date.png" alt="Date" title="Set the date"/></a>' +
				(ss !== '' ? '<br><b>Holiday:</b><br><span style="font-size:90%">' + capitalize(getHoliday()) + '</span>' : '') +
				'<p style="position:absolute;left:37%;top:5%;width:25%;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer" onclick=\"usePhone(\'date\')">' + nDay + '<br>' + getMonth(true) + '</p></td>' +	

				'<td style="width:33%"><a href=\"javascript:gameState.perTown.setFlag(36,!gameState.perTown.checkFlag(36));usePhone(\'apps\')"><img style="width:95%" src="UI/smsnotification.png" alt="SMS" title="Enable SMS Notifications"/></a>' +
				'<br><b>Alert new SMS\'s:</b><br>' + (gameState.perTown.checkFlag(36) ? "No" : "Yes") + '</td>' +

				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:setExplicit(!isExplicit(true));usePhone(\'apps\')"><img style="width:95%" src="UI/xrated.png" alt="Explicit" title="Explicit content filter"/></a>' +
				'<br><b>Explicit Filter</b><br>' + (isExplicit(true) ? "disabled" : "enabled") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleTheme();usePhone(\'apps\')"><img style="width:95%" src="UI/themes.png" alt="Theme" title="App to chamge the display theme"/></a>' +
				'<br><b>Theme:</b><br>' + (nTheme === 0 ? "White" : nTheme == 1 ? "Black" : nTheme == 2 ? "Dark Grey" : "Theme " + nTheme) + ' Theme</td>' +

				'<td style="width:33%"><a href=\"javascript:toggleIcons();usePhone(\'apps\')"><img style="width:95%" src="UI/icons.png" alt="Icon" title="App to change the item icon view"/></a>' +
				'<br><b>Inventory:</b><br>' + (gameState.nUseIcons == 1 ? "Icons" : (gameState.nUseIcons == 2 ? "Icons Compact" : "Text")) + '</td>' +
				
				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:toggleInventoryPopup();usePhone(\'apps\')"><img style="width:95%" src="UI/themes/theme0/bag.png" alt="Icon" title="Alter how the inventory is shown"/></a>' +
				'<br><b>Inventory:</b><br>' + (gameState.nInventoryMode == 1 ? "Popup" : (gameState.nInventoryMode == 0 ? "Sidebar" : "Right Tab")) + '</td>' +

				'<td style="width:33%"><a href=\"javascript:setRunes(' + (!isRunes()) + ');saveGlobalSettings();usePhone(\'apps\')"><img style="width:95%" src="UI/runes.png" alt="Runes" title="App to change runes to text when learning spells"/></a>' +
				'<br><b>Spell Runes:</b><br>' + (isRunes() ? "Runes" : "Text Names") + '</td>' +

				'<td style="width:33%"><a href=\"javascript:gameState.bAllowUndo=!gameState.bAllowUndo;updateLeftBar();usePhone(\'apps\')"><img style="width:95%" src="UI/undo.png" alt="UnDo" title="App to enable undo in actions"/></a>' +
				'<br><b>Undo:</b><br>' + (gameState.bAllowUndo ? "Yes" : "No") + '</td>' +

				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:toggleBubble();usePhone(\'apps\')"><img style="width:95%" src="UI/textpos.png" alt="Bubbles" title="App to change the location of text bubbles"/></a>' +
				'<br><b>Bubbles:</b><br>' + (gameState.bCommentLL ? "Lower Left" : "Centered") + '</td>' +
				
				'<td style="width:33%"><a href=\"javascript:usePhone(\'memory\')"><img style="width:90%" src="UI/memory.png" alt="Memory" title="Adjust memory settings"/></a>' +
				'<br><b>Memory:</b><font size=-2><br>photos: ' + gameState.nMaxPhotos + ' saves: ' + nMaxSaves + '</font></td>' +

				'<td style="width:33%"><a href=\"javascript:toggleSounds();usePhone(\'apps\')"><img style="width:90%" src="UI/sound' + (gameState.bSounds ? 'on' : 'off') + '.png" alt="Sounds" title="Sound settings"/></a></td>' +
				
				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:gameState.bShowLoadSave=!gameState.bShowLoadSave;saveGlobalSettings();updateLeftBar();usePhone(\'apps\')"><img style="width:90%" src="UI/loadsave.png" alt="Load/Save" title="Load/Save"/></a>' +
				'<br><b>Load/Save in Left SideBar:</b><br>' + (gameState.bShowLoadSave ? "Show" : "Hide") + '</td>' +
				
				'<td style="width:33%"><a href=\"javascript:toggleColumns();usePhone(\'apps\')"><img style="width:90%" src="UI/columns' + (gameState.bDisableRightCol ? '2' : '3') + '.png" alt="Cols" title="Columns in Main Window"/></a>' +
				'<br><b>Columns:</b><br>' + (gameState.bDisableRightCol ? "Two" : "Three") + '</td>' +
				
				'<td style="width:33%"><a href=\"javascript:gameState.bShowSpeaker=!gameState.bShowSpeaker;saveGlobalSettings();usePhone(\'apps\')"><img style="width:95%" src="UI/speaking.png" alt="Speaker" title="Show the speaker in popup dialogues"/></a>' +
				'<br><b>Show speaker:</b><br>' + (gameState.bShowSpeaker ? "Show" : "Don\'t") + '</td>' +

				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href=\"javascript:toggleFont();dispPlace();saveGlobalSettings();usePhone(\'apps\')"><img style="width:95%" src="UI/font.png" alt="Font" title="Font Size"/></a>' +
				'<br><b>Font size:</b><br>' + capitalize(gameState.sFontSize) + '</td>' +
				
				'</tr></table></div>';
				//addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;margin-top:1em");
				//'<p style="position:absolute;top:87vh;left:70%;font-size:small"><a href="javascript:usePhone()"><img id="doneicon" src="UI/back.png" style="height:5vh;margin-right:0;margin-left:0" alt="Back" title="Back"></a></p>';



		} else if (stype == "games") {
			// View your games

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:76%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pacman\')"><img style="width:95%" src="UI/pacman.jpg" alt="Pacman" title="Play Pacman"/></a>' +
				'<br><b>Pacman</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'tetris\')"><img style="width:95%" src="UI/tetris.png" alt="Tetris" title="Play Tetris"/></a>' +
				'<br><b>Tetris</b></td>' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'snake\')"><img style="width:95%" src="UI/snake.png" alt="Tetris" title="Play Snake"/></a>' +
				'<br><b>Snake</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'pong\')"><img style="width:95%" src="UI/pong.jpg" alt="Pong" title="Play Pong"/></a>' +
				'<br><b>Pong</b></td>' +
				
				'<td style="width:33%"><a href=\"javascript:usePhone(\'game\',\'flappybird\')"><img style="width:95%" src="UI/flappybird.jpg" alt="Flappy" title="Play Flappy Bird"/></a>' +
				'<br><b>Flappy Bird</b></td>' +

				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href=\"javascript:setPuzzles(!isPuzzles());usePhone(\'games\')"><img style="width:95%" src="UI/puzzles.png" alt="Puzzles" title="App to make puzzles trivially easy"/></a>' +
				'<br><b>Puzzles Helper</b><br>' + (isPuzzles() ? "disabled" : "enabled") + '</td>' +
				
				'<td style="width:33%"><a href="#" onclick="gameState.nLeftBarState=1;gameState.bCheatShown=true;updateLeftBar();updateMain()"><img style="width:95%" src="UI/cheat.png" alt="Cheat" title="Cheat"/></a>' +
				'<br><b>Cheat</b></td>' +

				//'<td style="width:33%"><a href=\"javascript:bCheating=!bCheating;dispPlace();usePhone(\'games\')"><img style="width:95%" src="UI/cheat.png" alt="Cheat" title="Assistance to cheating in games"/></a>' +
				//'<br><b>Cheat Helper</b><br>' + (bCheating ? "enabled" : "disabled") + '</td>' +
				
				'</tr><tr style="vertical-align:top">' +
				
				'<td style="width:33%"><a href="#" onClick="DoSave();return false"><img style="width:95%" src="' + getThemeFolder() + 'save.png" alt="Save" title="Save"/></a>' +
				'<br><b>Save</b></td>' +

				'<td style="width:33%"><a href="#" onClick="DoLoad();return false"><img style="width:95%" src="' + getThemeFolder() + 'load.png" alt="Load" title="Load"/></a>' +
				'<br><b>Load</b></td>' +

				'</tr></table></div><p style="position:absolute;top:80%;left:7%;color:black;text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;font-size:large;width:83%;text-align:right"><b> ';

				hr = getHour();
				hm = hr > 12 ? hr - 12 : hr;
				min = getTime() - (hr * 100);
				s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
				if (hr >= 12) s += "pm";
				else s += "am";
				s += ' </b></p>';
					 //+ addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;margin-top:1em");
					 //+ '<p style="position:absolute;top:87vh;left:70%;font-size:small"><a href="javascript:usePhone()"><img id="doneicon" src="UI/back.png" style="height:5vh;margin-right:0;margin-left:0" alt="Back" title="Back"></a></p>';

					  
		} else if (stype == "help") {
			// Help

			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:white"></div>' +
				'<div id="appsdiv" style="position:absolute;top:9%;left:6%;width:88%;height:72%;background-color:transparent;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
				'<table style="margin-left:5px;margin-right:5px;width:98%;vertical-align:top;border-collapse:collapse"><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href="#" onclick="helpGamePlayPage();return false""><img style="width:95%" src="UI/help.jpg" alt="Help" title="Help"/></a>' +
				'<br><b>General Help</b></td>' +

				'<td style="width:33%"><a href="#" onclick="javascript:showWalkthrough(true);return false"><img style="width:95%" src="' + getThemeFolderI(0) + 'walkthrough.png" alt="Walkthrough" title="Walkthrough"/></a>' +
				'<br><b>Walkthrough</b></td>' +
				
				'</tr><tr style="vertical-align:top">' +

				'<td style="width:33%"><a href="#" onclick="javascript:helpCreditsPage();return false"><img style="width:95%" src="' + getThemeFolderI(0) + 'credits.png" alt="Credits" title="Game Credits"/></a>' +
				'<br><b>Credits</b></td>' +
				
				'<td style="width:33%"><a href="#" onclick="javascript:gameState.bUIHints=!gameState.bUIHints;usePhone(\'help\')";return false"><img style="width:95%" src="UI/hints.png" alt="Hints" title="Show UI Hints"/></a>' +
				'<br><b>' + (gameState.bUIHints ? 'Show UI Hints' : 'Do not show UI Hints') + '</b></td>' +				

				'</tr></table></div><p style="position:absolute;top:80%;left:7%;color:black;text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;font-size:large;width:43%;text-align:left"><b> ';

				hr = getHour();
				hm = hr > 12 ? hr - 12 : hr;
				min = getTime() - (hr * 100);
				s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
				if (hr >= 12) s += "pm";
				else s += "am";
				s += ' </b></p>';
					  //+ addOptionLink("string", "Done", "usePhone()", undefined, "position:absolute;top:79%;top:calc(86% - 2.75em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em;margin-top:1em");

		} else if (stype == "alarm") {
			// Change alarm clock settings
			var tm = perYou.checkFlag(33) ? "7am" : (perYou.checkFlag(34) ? "8am" : "6am");
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;">' +
				'<p style="color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '"><b>Alarm Settings: ' + tm + '</b></p>' +
				addOptionLink("string", "6am", "perYou.setFlag(33,false);perYou.setFlag(34,false);usePhone('apps')", "phoneblock", "position:relative") +
				addOptionLink("string", "7am", "perYou.setFlag(33);perYou.setFlag(34,false);usePhone('apps')", "phoneblock", "position:relative") +
				addOptionLink("string", "8am", "perYou.setFlag(34);perYou.setFlag(33,false);usePhone('apps')", "phoneblock", "position:relative") +
				'</div>';
				//addOptionLink("string", "Done", "usePhone('apps')", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em") +
				//'</div>'
				
		} else if (stype == "date") {
			// Change date
			ss = getHoliday(true);
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;color:white;text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black">' +
				'<p><b>Date Settings</b></p>';
				
			ar = getMonth(false, true);
			s += '<select style="margin-top:0em;font-size:1em" name="Months" id="Months" size="1" onchange="PhoneChangeMonth()">' +
				'<optgroup style="font-size:1.1em" label="Month">';
			for (i = 0; i < ar.length; i++) {
				s += '<option value="' + (i + 1) + '"' + (nMonth == (i + 1) ? ' selected' : '') + '>' + ar[i] + '</option>';
			}
			s += '</optgroup></select> <select style="margin-top:0em;font-size:1em" name="Days" id="Days" size="1" onchange="PhoneChangeDay()">' +
				'<optgroup style="font-size:1.1em" label="Day of Month">';
			for (i = 1; i <= getMonthDays(nMonth); i++) {
				s += '<option value="' + i + '"' + (nDay == i ? ' selected' : '') + '>' + i + '</option>';
			}
			s += '</optgroup></select>';
			if (ss !== '') s += '<p>Holidays:<br>' + ss + '</p>';
			s += '</div>';
			//+ addOptionLink("string", "Done", "usePhone('apps')", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em") +	'</div>';
				
		} else if (stype == "memory") {
			// Change Mempry settings
			if (gameState.nMaxPhotos <= 0) gameState.nMaxPhotos = 1;
			//else if (gameState.nMaxPhotos > 255) gameState.nMaxPhotos = 255;
			if (nMaxSaves <= 0) nMaxSaves = 1;
			else if (nMaxSaves > 255) nMaxSaves = 255;
			saveGlobalSettings();
			
			var ps = '<p style="color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '">'
			s += '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<div style="position:absolute;top:9%;left:6%;width:80%;text-align:center;">' +
				'<p style="font-size:x-large;color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + '"><b>Memory Settings:</b></p>' +
				ps + '<br><b>Photo Slots: </b>' + gameState.nMaxPhotos + '</p>' +	
				addOptionLink("string", "-10", "gameState.nMaxPhotos-=10;usePhone('memory')", "phoneblock", "position:relative") +				
				addOptionLink("string", "+10", "gameState.nMaxPhotos+=10;usePhone('memory')", "phoneblock", "position:relative") +
				ps + '<br><b>Save Slots: </b>' + nMaxSaves + '</p>' +	
				addOptionLink("string", "-10", "nMaxSaves-=10;usePhone('memory')", "travelblock", "position:relative") +				
				addOptionLink("string", "+10", "nMaxSaves+=10;usePhone('memory')", "travelblock", "position:relative") +	
				ps + '<br>High values may cause problems with saves failing, use with care!</p></div>';
				//+ addOptionLink("string", "Done", "usePhone('apps')", undefined, "position:absolute;top:79%;top:calc(86% - 2.7em);width:36%;left:51%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;line-height:1em") +
				//'</div>';

		} else if (stype == "game") {
			// Play a game
			s +=  '<img style="position:absolute;width:100%;height:100%;display:inline-block;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
					'<div style="position:absolute;top:9%;left:6%;width:88%;height:77%;background-color:black"></div>' +
					addGame(sno) +
					'<script>playGame()</script>' +
					addOptionLink("string", "Finish", "finishPhoneGame()",  "chatblock", "position:absolute;top:79%;top:calc(86% - 2.7em);width:20%;left:70%;margin-right:auto;border-left-width:0;padding-top:0.25em;padding-bottom:0.25em;");

		} else {
			// Main screen for the phone
			s += '<img style="border:none;position:absolute;width:100%;height:100%;border-width:0;border-style:none;top:0;left:0;margin:0px 0px 0px 0px;padding:0" src="UI/phone3p.png" alt="phone">' +
				'<p style="position:absolute;z-index:75;top:7vh;left:45%;color:' + wpt + (perYou.extra[7] == 1 ? ";text-shadow:-1px 0px black, 0px 1px white, 1px 0px white, 0px -1px white;" : ";text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + ';font-size:large;width:48%;text-align:right"><b> ';

			hr = getHour();
			hm = hr > 12 ? hr - 12 : hr;
			min = getTime() - (hr * 100);
			s += getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
			if (hr >= 12) s += "pm";
			else s += "am";
			s += ' </b><br><span style="font-size:x-small;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none">' + nDay + ' ' + getMonth() + '</span></p>';

			//if (arSMS.length > 0) {
				s += '<p style="position:absolute;top:8.2vh;left:9%;font-size:small;width:19%"><a href="javascript:usePhone(\'sms\')"><img src="UI/messageapp.png" style="float:left;margin-right:0;margin-left:0;width:100%" alt="SMS" title="View SMS"></a></p>';
				if (nUnreadSMS > 0) s += '<p onclick="usePhone(\'sms\')" style="position:absolute;top:10vh;left:12%;font-size:x-small;border:1px solid Blue;background-color:PowderBlue;cursor:pointer"><b>new</b></p>';
			//}

			s +='<p style="position:absolute;top:75.5vh;left:11%;width:80%;font-size:small"><a href="javascript:usePhone(\'apps\')"><img id="appsicon" src="UI/apps.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Apps"></a></p>' +
				 '<p style="position:absolute;top:75.5vh;left:27%;width:80%;font-size:small"><a href="javascript:usePhone(\'addressbook\')"><img id="addressicon" src="UI/addressbook.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="Address Book"></a></p>' +
				 '<p style="position:absolute;top:75.5vh;left:43%;width:80%;font-size:small"><a href="javascript:usePhone(\'photos\')"><img id="cameraicon" src="UI/camera.png" style=height:8vh;width:19%;margin-right:0;margin-left:0" alt="Photos" title="View Photos"></a></p>' +
				 '<p style="position:absolute;top:75.5vh;left:59%;width:80%;font-size:small"><a href="javascript:usePhone(\'notes2\')"><img id="notesicon" src="UI/notes.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Notes" title="View Notes"></a></p>' +
				 '<p style="position:absolute;top:75.5vh;left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'map\')"><img id="mapicon" src="UI/map.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Map" title="Local Map"></a></p>';
			if (perYourBody.checkFlag(15)) s += '<p style="position:absolute;top:calc(66.6vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'games\')"><img id="gamesicon" src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';
			else s += '<p style="position:absolute;top:calc(66.5vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'games\')"><img id="gamesicon" src="UI/games.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Game" title="Play a Game"></a></p>';
			s += '<p style="position:absolute;top:calc(57.5vh + 4px);left:75%;width:80%;font-size:small"><a href="javascript:usePhone(\'help\')"><img id="helpicon" src="UI/help2.png" style="height:8vh;width:19%;margin-right:0;margin-left:0" alt="Help" title="Help"></a></p>';

		}
		if (stype !== "") s += '<p style="position:absolute;top:87vh;left:70%;font-size:small"><a href="javascript:usePhone(' + (stype == "alarm" || stype == "date" || stype == "memory" ? "'apps'" : '') + ')"><img id="doneicon" src="UI/back.png" style="height:5vh;margin-right:0;margin-left:0" alt="Back" title="Back"></a></p>';

		s += addOptionLink("string", "Off", "showRightBar(gameState.nRightBarState - 2)", "phoneblock", "left:37%;text-align:center;top:87vh;width:20%;background-color:transparent;color:white;") + '</div>';

	} else if (stype === "map") {
		// Town Map
		s = '<script>document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:56">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="mapdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-image:url(UI/map/mapbg.jpg);background-size:cover">' +
			getMapHTML("100%", "100%",
				function(id) {
					if (!perYou.checkFlag(66) || id == 317 || id == 105) return '';
					if ((id == 16 || id == 141) && !isPlaceKnown("Tunnel")) return '';
					if (id == 436 && !checkPersonFlag("Catherine", 1)) return "sctopFunction();WriteComments(&quot;You should just see Amy or Catherine at school, you have not been invited to visit&quot;)";
					if (id == 435 && !isShopOpen(4, 2, true) || checkPlaceFlag("CheriseRd", 6)) return '';
					if (id == 400) {
						var perAunt = findPerson("Brandi");
						if (!((perAunt.isCharmedBy() || !isAtLocation(400, perAunt.whereNow())) || (perAunt.checkFlag(25) && perAunt.isNympho()))) { 
							if (getHour() < 6) return "sctopFunction();WriteComments(&quot;There is no answer at the door, you were told to not return until tomorrow&quot;";
							else if (getHour() < 9 || getHour() > 21) return "sctopFunction();WriteComments(&quot;You knock on the door and Aunt Brandi reminds you that you can only visit in the evening.&quot;)";
							else if (isDay() || perAunt.whereNow() != 400) return "sctopFunction();WriteComments(&quot;There is no answer at the door, they must out, at work or school&quot;)";
						}
					}
					// On click of a place and can quick walk
					var sm = "sctopFunction();WriteComments(&quot;" +
					"<div style='margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default'>" +
					"<p style='text-align:center'>You could directly walk there, ignoring anything on the way?</p>" +
					addOptionLink("ss", 'Walk here?', "gotoPlaceQuick(" + id + ")") +
					addOptionLink("ss", 'Not now', "usePhone()") +
					'&quot;)';
					//console.log(sm);
					return sm.split('"').join('&quot;').split('<').join('&lt;').split('>').join('&gt;');
				}) + '</div>' +
			addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") +
			(isScreenSmall() ? '' : '<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>') +
			'</div>';

	} else if (stype == "photos") {
		// View Photos
		s = '<script>document.onkeypress = stopRKey;initLightbox();gameState.bLBNoShow=false;</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:56;border-style:none">' +
			'<div style="background-color:white;width:95%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="photosdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 2) + 'px ' + wa + 'px ' + ha + 'px ' + la  + 'px;height:85%;width:92%;overflow:auto">';

		var used = 99;
		var iwall = 0;
		for (i = 1; i < 33; i++) {
			if (!checkBitFlag(nPhoneWallpapers, i)) continue;
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			img = "phonewallpaper" + i + '.jpg';
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "wallpaper" + i);
				used += 32;
			}
			iwall++;
		}		
		for (i = 0; i <  1 + arPhotos.length; i++) {
			if (used > 66) {
				used = 0;
				if (iwall !== 0) s += '</div>';
				s += '<div style="clear:both">';
			}
			if (i == 0) img = sPhoneImage;
			else img = arPhotos[i - 1];
			if (img !== '') {
				s += addImageString(img , "32%", '', '', i + ' ' + img, undefined, "photo" + ((i + 1) * -1));
				used += 32;
			}
			iwall++;
		}		

		for (id = 1; id <= gameState.nSMSLimit; id++) {
			if (!checkBitFlag(arSMSImages[Math.floor((id - 1) / 32)], ((id - 1) % 32) + 1)) continue;

			sDec = '';
			for (k = 0; k < arPeople.length - 2; k++) {
				p = arPeople[k];
				sDec = p.getPersonSMS(id);
				if (sDec !== '') break;		// Unknown id
			}
			if (sDec === '') continue;		// Invalid id
			var sEx = p.isSMSImageDressVersion(id) ? '' : '!';

			ar = sDec.split('|');
			for (k = 0; k < ar.length; k++) {
				if (ar[k] === '') continue;
				bTo = ar[k].indexOf('~') != -1;

				if (bTo) sr = ar[k].split('~');
				else sr = ar[k].split('^');

				if (sr.length > 1 && sr[2] !== '') {
					if (sr[2].indexOf("<img") == -1) {
						ir = sr[2].split("`");
						if (ir.length > 1) {
							if (used > 35) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + ir[0]), '65%', '', '', '', undefined, "photo" + id);
							used += 65;
						} else {
							if (used > 66) {
								used = 0;
								s += '</div><div style="clear:both">';
							}
							s += addImageString(p.getImg(sEx + sr[2]), "32%", '', '', '', undefined, "photo" + id);
							used += 32;
						}
					} else {
						if (used > 66) {
							used = 0;
							s += '</div><div style="clear:both">';
						}
						s += sr[2].split("width:88").join("float:left;width:65");
						used += 32;
					}
				}
			}
		}
		s += '</div></div>' +
				addOptionLink("string", "Close", "showRightBar(-1*" + gameState.nRightBarState + ");showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%") + " " +
				addOptionLink("string", "Clear", "usePhone(\'clearphotos\')", "chatblock", "position:absolute;margin-top:0;top:6px;left:" + (isScreenSmall() ? "27" : "24") + "%;margin-left:4%;width:20%") +
				(isScreenSmall() ? '' : '<span class="zoom-icon" style="position:absolute;top:0px;right:5px"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>') +
				'</div>';

	} else if (stype === "gamebig") {
		// Play a Game in large screen
		s = '<script>document.onkeypress = stopRKey;initLightbox();</script>' +
			'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:56">' +
			"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
			'<div id="game" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 4) + 'px ' + (wa + 4) + 'px ' + ha + 'px ' + (la - 4) + 'px;height:85%;width:91%;overflow-y:auto;overflow-x:auto;background-color:white">' +
			addGame(sno) +
			'</div>' +
			addOptionLink("string", "Finish", "showRightBar(-1*gameState.nRightBarState);finishPhoneGame();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%",  "chatblock") +
			'</div>';
			
	}

	if (isBritish()) s = s.split("Setting/").join("UK/");
	else s = s.split("Setting/").join("US/");

	if (stype === "" || stype === undefined|| stype == "alarm" || stype == "date" || stype == "memory" || stype == "sms" || stype == "clear" || stype == "delete" || stype == "addressbook" || stype == "apps") return s;

	if (!gameState.bPhoneLandscape) s += '<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div><div id="fadeblack" class="black_overlay"></div>';

	return s;
}

// initialisation

function initialisePhone()
{
	arSMSImages = [];
	nUnreadSMS = 0;
	addWallpapers(1, 6);
	sPhoneImage = '';
	arSMS = [];
	arPhotos = [];
};
