/***************** Time ******************************************************************************/
// one 'tick' is 5 minutes, so 12 per hour, 288 per day, day starts at 0 12:05am. midnight, 287
// Daytime is 6am to 8pm so 70 to 240
var nTime;
var vTimedEvent;
var nDay;
var nMonth;

// Get time as a number 1230 for 12:30pm
function getTime()
{
	var tm = nTime % 288;
	return Math.ceil((tm + 1) / 12 - 1) * 100 + (tm - Math.ceil((tm + 1) / 12 - 1) * 12) * 5;
}
function getHour()
{
	return Math.ceil((nTime % 288 + 1) / 12 - 1);
}
function getDay(shrt)
{
	var arDays;
	if (shrt === true) arDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	else arDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return arDays[Math.floor(nTime / 288) % 7];
}
function getDayNo()
{
	return Math.floor(nTime / 288) % 7;
}

function getMonth(shrt, all)
{
	var arMonths;
	if (shrt === true) arMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	else arMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return all === true ? arMonths : arMonths[nMonth - 1];
}

function getMonthDays(nm) {
	if (nm == 2) return 28;
	if (nm == 4 || nm == 6 || nm == 9 || nm == 11) return 30;
	return 31;
}


function getTimeOfDay()
{
	if (isNight()) return "night";
	if (!isDay()) return "evening";
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	if (hr < 12) return "morning";
	if (hr < 18) return "day";
	return "afternoon";
}	

// Is it Monday to friday
function isWeekDay() { return (Math.floor(nTime / 288) % 7) < 5; }

// Pass time, add 5/10 minutes
function passTime(noev, out)
{			
	// Are we inside?
	var nOut = out === true || isOutside() ? 2 : 1;
	var tm = nTime % 288;
	var hrBefore = Math.ceil((tm + 1) / 12 - 1);
	var s = '';
	if (tm > (288 - nOut)) {
		// Midnight passes!
		s = passTimeMidnight(false);
	}
	var bDay = tm > 71 && tm < 240;
	
	nTime += nOut; // Add ten minutes a turn out
		
	gameState.setIsHere();

	if (isDay() != bDay) {
		// We changed from day to night or visa versa
		if (bDay) s = passTimeNight();
		else s = passTimeDay();
	}

	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	console.log("Hour = " + hr + " Before = " + hrBefore);
	if (hr != hrBefore) {
		// Changed from one hour to the next
		for (var i = 0; i < ie; i++) {
			var sp = arPeople[i].passTimeHour(hr);
			if (sp !== '') s += sp;
		}
	}
	if (s !== '') WriteComments(s);


	if (noev !== true) checkTimedEvents();
}

// Time passes until nightfall
function passTimeNight()
{
	Save("Auto", "Autosave at night of day " + Math.ceil(nTime / 288));
	var tm = nTime % 288;
	if (tm < 240) nTime += 242 - tm;

	var s = '';
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		var sp = arPeople[i].passTimeNight();
		if (sp !== undefined && sp != '') s += sp;
	}
	if (isInvisible()) {
		s += (s !== '' ? '<br>' : '') + 'The invisibility spell ends as the sun sets...';
		endInvisibility();
	}
	if (isPossess()) setQueryParams("type=possessionendnight");
	return s;
}

// Time passes until midnight
function passTimeMidnight(nt, ah)
{
	if (ah == undefined) ah = 12;
	else ah = ah * 12;
	if (nt !== false) {
		var tm = nTime % 288;
		if (tm > (ah + 10)) nTime += 288 - tm;
		if (ah != undefined) nTime += ah;
	}
	nDay++;
	// Simple month change, ignore leap years
	if (nDay > getMonthDays(nMonth)) { 
		nDay = 1;
		nMonth++;
		if (nMonth > 12) nMonth = 1;
	}

	var s = '';
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		var sp = arPeople[i].passTimeMidnight();
		if (!sp) s += sp;
	}
	return s;
}

// Pass time umtil dawn
function passTimeDay(hr)
{
	Save("Auto", "Autosave at morning of day " + Math.ceil(nTime / 288));
	if (hr === undefined) hr = 0;
	var tm = nTime % 288;
	var mt = perYou.checkFlag(33) || hr == 7 ? 84 : (perYou.checkFlag(34) || hr == 8 ? 96 : 72);

	if (tm < mt) nTime += mt - tm;
	else if (tm > 239) nTime += mt + (288 - tm);

	var s = '';
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		var sp = p.passTimeDay();
		if (sp !== undefined && sp != '') s += sp;

		// Healing. 5 pts per day if they are not in the ICU or dead/undead
		// BUT will not exceed 99 to allow
		if (p.health > 0 && p.health < 100 && Math.floor(p.place) != 275) {
			p.health += 5;
			if (p.health >= 100) p.health = 99;
		} else if (p.isVampyre()) {
			if (p.health < 0) {
				p.health += 20;
				if (p.health > -1) p.health = -1;
			} else {
				p.health -= 20;
				if (p.health < 1) p.health = 1;
			}
		}
	}
	if (isInvisible()) {
		s += (s !== '' ? '<br>' : '') + 'The invisibility spell ends as the sun rises...';
		endInvisibility();
	}
	if (isPossess()) setQueryParams("type=possessionendday");

	gameState.sRecentImages = '';
	return s;
}

// Is it daytime?
// 6am to 8pm
function isDay() {
	var tm = nTime % 288;
	return tm > 71 && tm < 240;
}
// Is it night
// 10pm to 6am or if late == true then midnight to 6am
// NOTE isNight() is not the same as !isDay()
function isNight(late) {
	var tm = nTime % 288;
	if (late === true) return tm < 72;
	return tm < 72 || tm > 263;
}

// Morning (6 to 9am)
function isMorning(st, ed) {
	if (st === undefined) st = 0;
	if (ed === undefined) ed = 0;
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	return (hr > (5 + st)) && (hr < (10 + ed));
}

// Evening (6 to 9pm)
function isEvening() {
	var hr = Math.ceil((nTime % 288 + 1) / 12 - 1);
	return hr > 17 && hr < 22;
}

function isShopOpen(extc, exto, bWeekEnds, bNight) {
	// Standard 8am to 6pm, weekdays only (day) or 8pm to 6am, weekdays only (night)
	// extc is a bonus number of hrs open, after the default closing time
	// exto is a bonus number of hrs open, before the default opening time
	// bWeekEnds = open on weekends, defaults to false (not open)
	if (extc === undefined) extc = 0;
	if (exto === undefined) exto = 0;
	if (bWeekEnds === undefined || bWeekEnds === false) {
		if ((Math.floor(nTime / 288) % 7) > 4) return false;		// Closed on weekends
	}
	var tm = nTime % 288;
	if (bNight === true) return tm >= (240 - (exto * 12)) || tm < (72 + (extc * 12));
	return tm >= (96 - (exto * 12)) && tm < (216 + (extc * 12));
}

// Wait for the next dawn/nightfall
function WaitForDayNight(st, plc, param)
{
	var s;
	if (isDay()) s = passTimeNight();
	else s = passTimeDay();
	if (gameState.nRightBarState > 2) usePhone();
	if (s !== '') {
		if (st === undefined) st = s;
		else st += s;
	}
	gotoPlace(plc, param, st);
}

// Wait for midnight
function WaitForMidnight(st, plc, param)
{
	var tm = nTime % 288;
	var wt = 288 - tm;
	WaitHereOnly(wt);
	if (gameState.nRightBarState > 2) usePhone();
	gotoPlace(plc, param, st);
}

function WaitHereOnly(no)
{
	if (no === undefined) no = 1;
	if (no < 0) {
		nTime += (no + 1) * 2;
		passTime(false, true);
	} else {
		for (var i = 0; i < no; i++) passTime(false, true);
	}
	if (gameState.nRightBarState > 2) usePhone();
}

function WaitHere(no, plc)
{
	WaitHereOnly(no);
	if (plc !== undefined) gotoPlace(plc);
	else dispPlace();
}

function addRestLink(md, lnk, title, body, img, white, js, sty, cnt, per, wid)
{
	if (isInvisible()) return '';
	if (!wid) wid = '100%';
			
	if (sty === undefined) sty = ';overflow-y:hidden';
	else sty = ";overflow-y:hidden;" + sty;
	
	if (img !== undefined && img !== "") {
		//body += '<div style="position:absolute;bottom:-4px;right:0;width:100%;z-index:-1">';
		body += '<div style="position:absolute;bottom:0;right:0;width:100%;margin-bottom:-4px;z-index:-1">';
		var bs = per !== undefined && typeof per != "string" ? per.shown : false;
		if (cnt !== undefined) body += addImageRandomString(img, cnt, wid, "rightpopup", '', '', 0, per);
		else body += addImageString(img, wid, "rightbpopup", '', '', per);
		if (per !== undefined && typeof per != "string") per.shown = bs;
		body += "</div><div style='height:98%;height:calc(100% - 1.5em);width:100%;cursor:pointer;margin-bottom:-4px;font-size:1.1em;margin-top:1.5em'>";
	}
	return addPopupLinkC(md, lnk, title, body, true, js, false, "top:5vh;left:5%;width:85%;height:85vh;padding:0" + (white === true ? ";background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white" : "") + sty);
}

function addSleepLink(md, lnk, title, body, img, white, plc, params, txt, sty, cnt, per, wid, jsadd)
{
	if (isDay() || isInvisible()) return '';
	
	if (!gameState.bSleepLink) {
		if (isNight()) addTextForQuestions(md, "Then again, night has fallen...");
		else addTextForQuestions(md, "Then again, night is falling...");
		gameState.bSleepLink = true;
	}
	
	var bTxt = txt !== undefined && txt !== "";
	var bParams = params !== undefined && params !== "";
	var bPer = per !== undefined && per !== "";
	if (per === undefined) per = '';
	if (jsadd === undefined) jsadd = '';
	else jsadd += ';';
	var js = jsadd + "sleepForNight(" + (plc === undefined || plc === '' ? "undefined" : plc) + "," + (bTxt ? "'" + txt + "'" : "undefined") + "," + (bParams ? "'" + params + "'" : "undefined") + (bPer ? ",'" + (typeof per == "string" ? per : per.uid) + "'" : "") + ");";
	addRestLink(md, lnk, title, body, img, white, 'setQueryParams();' + js, sty, cnt, per, wid);
}

function sleepForNight(plc, s, param, who)
{
	// Show an optional event during the night
	var tm = nTime % 288;
	var mt = perYou.checkFlag(33) ? 84 : (perYou.checkFlag(34) ? 96 : 72);
	var wt = 0;		// time till you wake up
	if (isDay()) {
		if (tm < 240) wt = 242 - tm;
	} else {
		if (tm < mt) wt = mt - tm;
		else if (tm > 239) wt = mt + (288 - tm);
	}

	// Show an optional event during the night
	var p;
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		if (p.showEventSleep(wt, plc, s, param, who)) return;
	}

	// Night passes
	playAlarm();		// Alarm noise
	WaitForDayNight(s, plc, param + (who !== undefined ? (!param ? "&" : "") + "who=" + who : ""));
}

function hangOut(who)
{
	p = findPersonNC(who);
	WriteComments(
		'<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
		'<table><tr><td width="80%;margin-right:2em"><p>How long do you want to hang out with ' + p.getPersonNameShort() + ' for?</p>' +
		addOptionLink("string", '1 hour', "checkInvisible();setComments('You hang out with " + p.getPersonNameShort() + " for an hour');WaitHere(6)") +		// +addOptionLink(&quot;string&quot;,&quot;finished&quot;,&quot;ClearComments();dispPlace()&quot;)
		addOptionLink("string", 'until the end of the day', "checkInvisible();WaitForDayNight('You hang out with " + p.getPersonNameShort() + " for the rest of the day')") +
		addOptionLink("string", 'forget it', "ClearComments();dispPlace()") +				
		'<br></td><td width="20%">' + p.addPersonFace(false, "80%") + '</td></tr></table>',
		undefined, false
	);	
}
function killTime(s)
{
	WriteComments(
		'<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
		'<p>How long do you want to  ' + s + ' for?</p>' +
		addOptionLink("string", '1 hour', "checkInvisible();setComments('You " + s + " for an hour');WaitHere(6)") +
		addOptionLink("string", 'until the end of the day', "checkInvisible();WaitForDayNight('You " + s + " for the rest of the day')") +
		addOptionLink("string", 'forget it', "ClearComments();dispPlace()") +				
		'<br>',
		undefined, false
	);	
}


// Timed Events

function TimedEvent(evt, time)
{
	this.timer = time;		// Time the event will happen
	this.evnt = evt;			// Javascript to run when it happens

	this.checkEvent = function()
	{
		// Special events
		if (this.timer <= nTime) {
			// Timed event trigger
			try {
				eval(this.evnt);
			} catch(e) {
				console.log("Error in event: " + this.evnt);
				console.log(e);
			}
			return true;
		}
		return false;
	};
}

function startTimedEvent(evt, cnt, reset)
{
	if (evt.length > 1295) alert("Game error: startTimedEvent event string is too long");
	if (reset === true) removeTimedEvent(evt);
	var ev = new TimedEvent(evt, nTime + cnt);
	vTimedEvent.push(ev);
}

function checkTimedEvents()
{
	for (var i = 0, ie = vTimedEvent.length; i < ie; i++) {
		if (vTimedEvent[i].checkEvent()) {
			vTimedEvent.splice(i, 1);
			break;
		}
	}
}

function removeTimedEvent(evt)
{
	for (var i = 0, ie = vTimedEvent.length; i < ie; i++) {
		if (vTimedEvent[i].evnt == evt) {
			vTimedEvent.splice(i, 1);
			break;
		}
	}
}

function movePersonfterTime(ps, plc, cnt) { startTimedEvent("movePerson('" + ps + "'," + plc + ")", cnt); }
function setPersonFlagAfterTime(ps, flg, val, cnt) { startTimedEvent("setPF('" + ps + "'," + flg + (val === undefined ? "" : "," + val) + ")", cnt); }
function setPlaceFlagAfterTime(ps, flg, val, cnt) { startTimedEvent("setPlaceFlag('" + ps + "'," + flg + (val === undefined ? "" : "," + val) + ")", cnt); }

function initialiseTime()
{
	nTime = 100;
	var dt = new Date();
	nDay = dt.getDate();
	nMonth = dt.getMonth();
	vTimedEvent = [];
}