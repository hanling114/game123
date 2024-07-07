//"use strict";
var bCheating = false;		// Allow cheat option

function GenderToggle(uid)
{
	if (uid === undefined) uid = "you";
	var per = findPerson(uid);
	
	switch (uid) {
	case "you":
		if (sGender == "man") sGender = 'woman';
		else if (sGender == "woman") sGender = "futa";
		else sGender = 'man';
		alert('You are now a ' + sGender);
		break;
	case "charlie":
		if (per.dress == "Male") per.dress = "Female";
		else per.dress = "Male";
		alert('Charlie is now a ' + per.dress);
		break;
	case"mrbeasley":
		if (per.checkFlag(10)) {
			per.setFlag(10, false);
			per.setFlag(11);
			alert('Beasley is now a female (Bimbo2)');
		} else if (per.checkFlag(11)) {
			per.setFlag(11, false);
			per.setFlag(12);
			alert('Beasley is now a female (Bondage)');
		} else if (per.checkFlag(12)) {
			per.setFlag(12, false);
			alert('Beasley is now a male');
		} else {
			per.setFlag(10);
			alert('Beasley is now a female (Bimbo1)');
		}
		per.dress = per.getDress();
		break;
	case "johnadams":
		if (per.dress == "Male") {
			per.dress = "Female1";
			alert('John is now a female (Brandi)');
		} else if (per.dress == "Female1") {
			per.dress = "Female2";
			alert('John is now a female (Megan)');
		} else if (per.dress == "Female2") {
			per.dress = "Female3";
			alert('John is now a female (Cory)');		
		} else {
			per.dress = "Male";
			alert('John is now a male');
		}
		break;
	case "davy":
		if (perDavy.checkFlag(11)) perDavy.setFlag(11, false);
		else perDavy.setFlag(11);
		if (perDavy.isCharmedBy()) perDavy.dress = perDavy.isMan() ? "Male/Charmed" : "Female/Charmed";
		else perDavy.dress = perDavy.isMan() ? "Male/Uncharmed" : "Female/Uncharmed";
		alert('Davy is now ' + perDavy.getPersonGender());
		break;
	case "daria":
		if (per.checkFlag(10)) per.setFlag(10, false);
		else per.setFlag(10);
		alert('Mother Superior is now ' + per.getPersonGender());
		break;
	case "louise":
		if (per.checkFlag(5)) per.setFlag(5, false);
		else per.setFlag(5);
		alert('Louise is now ' + per.getPersonGender());	
		break;
	case "jenny":
		if (per.checkFlag(4)) per.setFlag(4, false);
		else per.setFlag(4);
		alert('Jenny is now ' + per.getPersonGender());
		break;
	case "mayor":
		if (per.dress == "Rachel") per.dress = "Eddie";
		else per.dress = "Rachel";
		alert('Mayor Thomas is now a ' + per.getManWoman());
		break;
	}
	ChangePersonLst(document);
}

function ChangeAvatar()
{
	perYou.folder = document.getElementById("pavatar").value;
	updateLSD();
	ChangePersonLst(document);
}

function cheatCharmGabby(lvl)
{
	var perGabby = findPerson("Gabby");
	switch (lvl) {
		case 0:
			perGabby.moveThem(415);
			perGabby.unCharmThem();
			PlaceI(67, 0);
			break;
		case 1:
			break;
		case 2:
			break;
		case 4:
			break;
		case 8:
			perGabby.charmThem(8, "Vampyre");
			perGabby.moveThem(247);
			break;
	}
	if (lvl != 0) {
		if (lvl != 8) {
			perGabby.charmThem(lvl);
			perGabby.moveThem(452);
		}
		if (whereItem(67) === 0) PlaceI(67, 452);
	}
}
function cheatCharmMom(lvl)
{
	var perMom = findPerson("Mom");
	switch (lvl) {
		case 0:
			perMom.moveThem(154);
			perMom.unCharmThem();
			cheatCharmGabby(0);
			return;
		case 1:
			break;
		case 4:
			break;
		case -1:
			perMom.moveThem(154);
			perMom.unCharmThem();
			perMom.setFlag(13, false);
			perMom.setFlag(14, false);
			perMom.setFlag(15, false);
			perMom.setFlag(16, false);
			perMom.setFlag(19, false);
			perMom.setFlag(20, false);
			perMom.setFlag(21, false);	
			perMom.setFlag(22, false);
			perMom.setFlag(23, false);
			perMom.setFlag(24, false);
			perMom.setFlag(25, false);
			perMom.setFlag(26, false);
			perMom.setFlag(31, false);
			perMom.setFlag(32, false);
			perMom.setFlag(33, false);
			perMom.setFlag(34, false);
			perMom.setFlag(35, false);
			perMom.setFlag(36, false);
			perMom.setFlag(37, false);
			perMom.setFlag(38, false);
			perMom.setFlag(3);
			perMom.setFlag(25);
			perMom.setFlag(27);
			perMom.charmedTime = 0;
			setPersonFlag("Tracy",11);
			cheatCharmGabby(0);
			var perGabby = findPerson("Gabby");
			perGabby.flags[0] = 0;
			return;
	}
	perMom.charmThem(lvl);
	perMom.moveThem(isDay() ? 415 : 154);
}
function cheatResetVampyre(val)
{
	perLilith.unCharmThem();
	perLilith.other = val === undefined ? 0 : val;
	perLilith.flags[0] = 0;
	perLilith.place = 0;
	setPersonFlag("MrsGranger", 19, false);
	setPersonFlag("MrsGranger", 20, false);	
	setPersonFlag("Alison", 7, false);
	setPersonFlag("Alison", 8, false);
	setPersonFlag("Jessica", 28, false);
	setPersonFlag("Lauren", 12, false);	
	setPersonFlag("Lauren", 13, false);
	setPersonFlag("Miku", 26, false);
	setPersonFlag("Miku", 27, false);
	setPersonFlag("Miku", 28, false);
	setPersonFlag("MsJones", 3, false);
	setPersonFlag("MsJones", 4, false);	
	setPersonFlag("MsLogan", 14, false);		
	setPersonFlag("MsLogan", 15, false);
	perGates.setFlag(11, false);	
	findPerson("Sarah");
	per.setFlag(10, false);	
	per.setFlag(12, false);	
	per.setFlag(13, false);	
	if (val == 0) {
		if (per.other == 11) oer.other = 10;
		else per.other = 115;
	} else if (per.other == 10) per.other = 11;
}

function cheatCharmDaria(lvl)
{
	var imdx;
	findPerson("Daria");
	switch (lvl) {
		case 0:
			per.unCharmThem();
			per.moveThem(382);
			per.setFlag(1, false);
			per.setFlag(2, false);
			per.setFlag(3, false);
			per.setFlagRange(5, 15, false);
			per.setFlag(4);
			per.extra[0] = 0;
			per.other = 0;
			if (Place == 384) Place = 319;
			movePerson("Desiree", 332);
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);	
			findPerson("Desiree");
			per.setFlagRange(4, 13, false);
			return;
		case -1:
			per.unCharmThem();
			per.moveThem(382);
			per.setFlag(6, false);
			per.setFlag(1, false);
			per.setFlag(2, false);
			per.setFlag(3, false);
			per.setFlag(5, false);
			per.setFlagRange(7, 15, false);
			per.setFlag(4);
			per.extra[0] = 0;
			per.other = 0;
			if (Place == 384) Place = 319;
			movePerson("Desiree", 332);	
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);	
			findPerson("Desiree");
			per.setFlagRange(4, 13, false);
			movePerson("Leanne", 382);
			charmPerson("Leanne", 4, "Demon");
			per.other = 25;
			movePerson("Louise", 195);
			setPlaceFlag("Church", 8, false);
			setPlaceFlag("Church", 9, false);
			return;
		case -2:
			per.unCharmThem();
			per.moveThem(382);
			per.setFlag(6);
			per.setFlag(1);
			per.setFlag(2, false);
			per.setFlag(3, false);
			per.setFlag(5, false);
			per.setFlagRange(7, 15, false);
			per.setFlag(4);
			per.extra[0] = 0;
			per.other = 0;
			if (Place == 384) Place = 319;
			movePerson("Desiree", 332);	
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);	
			findPerson("Desiree");
			per.setFlagRange(4, 13, false);			
			return;	
		case -3:
			per.unCharmThem(1);
			per.moveThem(384);
			per.setFlag(6);
			per.setFlag(1);
			per.setFlag(2);
			per.setFlag(4);
			per.setFlagRange(7, 15, false);
			per.other = 0;
			if (Place == 382) Place = 384;
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);
			findPerson("Desiree");
			per.setFlagRange(4, 13, false);			
			return;	
		case -4:
			per.unCharmThem(1);
			per.moveThem(384);
			per.setFlag(6);
			per.setFlag(1);
			per.setFlag(2);
			per.setFlag(4);
			per.setFlag(7);
			per.setFlag(8);
			per.setFlag(9);
			per.setFlagRange(10, 15, false);
			per.charmedTime = nTime - 290;
			per.other = 0;
			if (Place == 382) Place = 384;
			findPerson("Desiree");
			per.setFlag(4, false);
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);
			if (!isMorning()) alert('Wait for an evening SMS from Sister Desiree');
			findPerson("Desiree");
			per.setFlagRange(4, 13, false);			
			return;				
		case 1:
		case 4:
			per.charmThem(lvl);
			per.moveThem(384);
			per.setFlag(6);
			per.setFlag(1);
			per.setFlag(2);
			per.setFlag(4);
			per.setFlag(7);
			per.setFlag(9);
			per.setFlagRange(9, 15, false);
			if (Place == 382) Place = 384;
			imdx = Math.floor((152 - 1) / 32);
			arSMSImages[imdx] = setBitFlag(arSMSImages[imdx], ((151 - 1) % 32) + 1, false);	
			return;
	}
}

function cheatLeanne(lvl)
{
	findPerson("Leanne");
	
	switch (lvl) {
		case 0:
			per.unCharmThem();
			per.extra[1] = 0;
			if (!isDemonFreed()) {
				per.moveThem(195);
				per.other = 0;
				per.flags[0] = 0;
			} else {
				per.moveThem(450);
				per.other = 25;
				per.setFlag(8);
				per.setFlag(12, false);
				per.setFlag(13, false);
				per.setFlag(16, false);
			}	
			break;
		case 1:
			per.charmThem(1);
			per.moveThem(450);
			per.other = 25;
			per.setFlag(8);
			per.setFlag(12, false);
			per.setFlag(13);
			per.setFlag(16);
			per.extra[1] = 4;
			break;
		case 4:
			per.charmThem(4);
			per.moveThem(450);
			per.other = 25;
			per.setFlag(8);
			per.setFlag(12, false);
			per.setFlag(13);
			per.setFlag(16);
			per.extra[1] = 4;
			break;	
		case -1:
			per.charmThem(4, "Demon");
			per.moveThem(wherePerson("Daria"));
			per.other = 25;
			per.setFlag(8);
			per.setFlag(12, false);
			per.setFlag(13, false);
			per.setFlag(16, false);
			per.extra[1] = 0;
			break;	
		case -2:
			per.charmThem(4, "Demon");
			per.moveThem(450);
			per.other = 25;
			per.setFlag(8);
			per.setFlag(12, false);
			per.setFlag(13, false);
			per.setFlag(16, false);
			per.extra[1] = 4;
			break;
	}		
}

function resetSarahLauren(val)
{
	findPerson('Sarah');
	per.unCharmThem();
	if (val === undefined) {
		if (per.other > 100) per.other = 100;
		per.setFlag(3, false);
		per.setFlag(7, false);
		per.setFlag(9, false);
		per.setFlag(11, false);
		per.setFlagRange(15, 18, false);
		per.setFlagRange(20, 25, false);
		per.extra[0] = 0;
		per.extra[1] = 0;
		per.extra[2] = 0;
		per.setFlag(2, false);
		per.setFlag(5, false);
		per.setFlag(6, false);
		per.setFlag(7, false);
		per.setFlag(9, false);
		per.setFlag(14, false);
	} else {
		per.extra[2] = 6;
		per.setFlag(7);
		per.setFlag(15);
		per.setFlag(16);
		per.setFlag(17, false);
		per.setFlag(18, false);
		per.setFlagRange(20, 25);
		per.setFlagRange(33, 38);
	}
	findPerson("Lauren");
	per.unCharmThem();
	per.extra[0] = 0;
		
}

function cheatJade(val)
{
	if (val == -1) {
		perJade.unCharmThem();
		perJade.setFlag(23);
		perJade.setFlag(24);
		perJade.setFlag(22,false);
		perJade.setFlag(26,false);
		perJade.setFlag(3,false);	
		perJade.setFlag(1);
		perJade.setFlag(5);
		findPerson("Seraphina").setFlag(2);
	} else if (val == 8) {
		perJade.charmThem(8,'Vampyre');
		perJade.setFlag(23,false);
		perJade.setFlag(24,false)
		perJade.setFlag(1);
		perJade.setFlag(5);		
		perJade.setFlag(16);
		perJade.setFlag(17);
	} else if (val == 0) {
		perJade.unCharmThem();
		perJade.setFlag(3,false);	
		perJade.setFlag(22,false);
		perJade.setFlag(23,false);
		perJade.setFlag(24,false);
	} else if (val == 3) {
		perJade.charmThem(3);
		perJade.setFlag(23);
		perJade.setFlag(26,false);
		perJade.setFlag(3,false);	
		perJade.setFlag(1);
		perJade.setFlag(5);
		findPerson("Seraphina").setFlag(2);
	} else if (val == 4) {
		perJade.charmThem(4);
		perJade.setFlag(24,false);
		perJade.setFlag(26,false);
		perJade.setFlag(3,false);	
		perJade.setFlag(1);
		perJade.setFlag(5);
		findPerson("Seraphina").setFlag(2);
	}
}

function ChangePersonLst(md)
{
	function boldText(no, s, flg) {
		if (s === undefined) {
			if (no === 0) s = "Uncharmed";
			else if (no === 4) s = "Slave";
			else if (no === 3) s = "Lover";
			else if (no === 2) s = "Girlfriend";
		}
		if (flg === undefined) flg = true;
		if (flg && per.getCharmedLevel(per.sCharmedBy !== "" ? per.sCharmedBy : undefined) == no) return '<b>' + s + '</b>';
		return s;
	}
	var i;
	var j;
	var av = md.getElementById("peoplelst");
	var s = av.options[av.selectedIndex].value;
	if (s == "you") per = perYou;
	else if (findPerson(s) === null) return;
	md.getElementById("pimg").innerHTML = per.addPersonFace(false, "50%");
	s = '<b>' + per.getPersonName() + '</b>';
	if (per.uid == "you") {
		s += " : <a class='black' href='' onclick='var na=prompt(\"Name?\",perYou.getPersonName());if(na)perYou.name=na;updateLeftBar();ChangePersonLst(document);return false'>Rename</a>";
	} else if (per.uid == "charley") {
		s += ' : Change <a class="black" href="javascript:findPerson(\'Charley\').setFlag(3,false);ChangePersonLst(document)">Charley</a> or ' +
				'<a class="black" href="javascript:findPerson(\'Charley\').setFlag(3);ChangePersonLst(document)">Karley</a>';
	} else if (per.uid == "johnadams") {
		s += ' : Change <a class="black" href="javascript:findPerson(\'JohnAdams\').setFlag(5,false);ChangePersonLst(document)">John</a> or ' +
				'<a class="black" href="javascript:findPerson(\'JohnAdams\').setFlag(5);ChangePersonLst(document)">Joan</a>';
	}
	md.getElementById("pname").innerHTML = s;
	md.getElementById("uid").innerHTML = per.uid;
	md.getElementById("pgender").innerHTML = per.getPersonGender() + (per.uid == "you" && isPossess() ? ' (now ' + perYourBody.getPersonGender() + ')' : '') + (per.uid == "you" || per.uid == "charlie" || per.uid == "mrbeasley" || per.uid == "johnadams" || per.uid == "davy" || per.uid == "daria" || per.uid == "louise" || per.uid == "jenny"|| per.uid == "mayor" ? " <a class='black' href='' onclick='GenderToggle(\"" + per.uid + "\");return false'>Change</a>" : '');
	if (per.uid == "you") {
		s = "Change Avatar: <select name='pavatar' id='pavatar' size='1' onchange='ChangeAvatar()'>";
		var lst = perYou.sMaleFolderList.split(",");
		for (i = 0; i < lst.length; i++) s += '<option value="' + lst[i] + '"' + (lst[i] == perYou.folder ? ' selected' : '') + '>' + lst[i] + '</option>';
		lst = perYou.sFemaleFolderList.split(",");
		for (i = 0; i < lst.length; i++) s += '<option value="' + lst[i] + '"' + (lst[i] == perYou.folder ? ' selected' : '') + '>' + lst[i] + '</option>';
		s += '</select>';
	} else s = per.folder;
	md.getElementById("pfolder").innerHTML = s;
	s = (per.getNextDress() !== '' ? " <a class='black' href='' onclick='findPerson(\"" + per.uid + "\");var nxt=per.getNextDress(per.dress);if(nxt !== \"\"){per.dress=nxt;};ChangePersonLst(document);return false'>Change</a>" : '');
	var drb = per.getDressBase();
	md.getElementById("pdress").innerHTML = drb + per.getDress() + (per.dress != per.getDress() ? ' (base ' + per.dress + ')' : '') + s;
	if (per.uid == "you") s = (Place + (isPossess() ? ' (body ' + per.place + ')' : ''));
	else s = per.whereNow() + '(' + per.place + ')';
	md.getElementById("pplace").innerHTML = s;
	s = (per.sCharmedBy === '' ? 'No-one' : per.sCharmedBy) + ' (' + per.charmed + ')';
	if (per.uid == "adeleross") {
		s += ' : <a class="black" href="javascript:findPerson(\'AdeleRoss\').unCharmThem();ChangePersonLst(document)">' + boldText(0,"Uncharmed") + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AdeleRoss\').charmThem(1);ChangePersonLst(document)">' + boldText(1, "Partially Charmed") + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AdeleRoss\').charmThem(4);ChangePersonLst(document)">' + boldText(4, 'Charmed Slave') + '</a>';
	} else if (per.uid == "amyross") {
		s += ' : <a class="black" href="javascript:findPerson(\'AmyRoss\').unCharmThem();per.setFlag(9,false);ChangePersonLst(document)">' + boldText(0,"Uncharmed", !per.checkFlag(9)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').unCharmThem();per.setFlag(9);ChangePersonLst(document)">' + boldText(0, 'Uncharmed GF', per.checkFlag(9)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').charmThem(4);per.setFlag(9,false);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'AmyRoss\').charmThem(3);per.setFlag(9,false);ChangePersonLst(document)">' + boldText(3, 'Charmed GF') + '</a>';
	} else if (per.uid == "angela") {
		s += ' : <a class="black" href="javascript:findPerson(\'Angela\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Angela\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Angela\').charmThem(4);ChangePersonLst(document)">Charmed ' + boldText(4) + '</a>';		  				  
				  
	} else if (per.uid == "anita") {
		s += ' : <a class="black" href="javascript:findPerson(\'Anita\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Anita\').charmThem(3);ChangePersonLst(document)">' + boldText(3, 'Slut') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Anita\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';		  				  
	} else if (per.uid == "ash") {
		s += ' : <a class="black" href="javascript:findPerson(\'Ash\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Ash\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Ash\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "betty") {
		s += ' : <a class="black" href="javascript:findPerson(\'Betty\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Betty\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Betty\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "brandi") {
		s += ' : <a class="black" href="javascript:findPerson(\'Brandi\').unCharmThem();per.setFlagRange(16,21,false);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Brandi\').charmThem(4);per.setFlagRange(15,17);per.setFlag(19);per.setFlag(20);per.setFlag(18,false);ChangePersonLst(document)">' + boldText(4, 'Slave-Aunt') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Brandi\').charmThem(1);per.setFlagRange(15,17);per.setFlag(18);per.setFlag(20);per.setFlag(19,false);ChangePersonLst(document)">' + boldText(1, 'Slut-Aunt') + '</a>';
	} else if (per.uid == "charley") {
		s += ' : <a class="black" href="javascript:findPerson(\'Charley\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Charley\').charmThem(1);ChangePersonLst(document)">' + boldText(1,'Slave') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Charley\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "cherry") {
		s += ' : <a class="black" href="javascript:findPerson(\'Cherry\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Cherry\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Cherry\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';			  
	} else if (per.uid == "daria") {
		s += ' : <a class="black" href="javascript:cheatCharmDaria(0);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmDaria(-1);ChangePersonLst(document)">Ready Possession 1</a> or ' +
				  '<a class="black" href="javascript:cheatCharmDaria(-2);ChangePersonLst(document)">Ready Possession 2</a><br>' +
				  '<a class="black" href="javascript:cheatCharmDaria(-3);ChangePersonLst(document)">Ready to charm</a> or ' +
		  	  	  '<a class="black" href="javascript:cheatCharmDaria(-4);ChangePersonLst(document)">Ready alternate charm</a> or ' +
				  '<a class="black" href="javascript:cheatCharmDaria(1);ChangePersonLst(document)">' + boldText(1,'Charmed (Slut)') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmDaria(4);ChangePersonLst(document)">' + boldText(4,'Charmed (Slave)') + '</a>';				  
	} else if (per.uid == "davy") {
		s += ' : <a class="black" href="javascript:perDavy.unCharmThem();perDavy.dress=(perDavy.checkFlag(11)?\'Female\':\'Male\')+\'/Uncharmed\';ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:perDavy.charmThem(1);perDavy.dress=(perDavy.checkFlag(11)?\'Female\':\'Male\')+\'/Charmed\';ChangePersonLst(document)">' + boldText(1, 'Charmed') + '</a>'
	} else if (per.uid == "debrakelly") {
		s += ' : <a class="black" href="javascript:findPerson(\'DebraKelly\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'DebraKelly\').charmThem(1);ChangePersonLst(document)">' + boldText(1, 'Puppy') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'DebraKelly\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Girlfriend') + '</a>';
	} else if (per.uid == "elian") {
		s += ' : <a class="black" href="javascript:findPerson(\'Elian\').unCharmThem();per.place=900;ChangePersonLst(document)">' + boldText(0, 'No pact', per.place != 9999) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').unCharmThem();per.place=9999;ChangePersonLst(document)">' + boldText(0, 'Banished', per.place == 9999) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(4);ChangePersonLst(document)">' + boldText(4, 'Servant') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Love-Slave') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Elian\').charmThem(3);ChangePersonLst(document)">' + boldText(3, 'Demon-bride') + '</a>';
	} else if (per.uid == "ellie") {
		s += ' : <a class="black" href="javascript:findPerson(\'Ellie\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Ellie\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Girlfriend') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Ellie\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';
	} else if (per.uid == "emma") {
		s += ' : <a class="black" href="javascript:findPerson(\'Emma\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Emma\').charmThem(1);ChangePersonLst(document)">' + boldText(1, 'Mistress') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Emma\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Bimbo') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Emma\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "gabby") {
		s += ' : <a class="black" href="javascript:cheatCharmGabby(0);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(1);ChangePersonLst(document)">' + boldText(1, 'Mom\'s Lover') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(2);ChangePersonLst(document)">' + boldText(2, 'Love/Hate') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(4);ChangePersonLst(document)">' + boldText(4, 'Masochist') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmGabby(8);ChangePersonLst(document)">' + boldText(8, 'Ghoul') + '</a>';
	} else if (per.uid == "heather") {
		s += ' : <a class="black" href="javascript:findPerson(\'Heather\').unCharmThem();per.setFlag(2);per.setFlagRange(2,13,false);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Heather\').charmThem(4);per.setFlag(2);per.setFlagRange(2,13,false);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Heather\').charmThem(3);per.setFlag(2);per.setFlagRange(2,13,false);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Heather\').unCharmThem();per.setFlagRange(2,13);ChangePersonLst(document)">Hypno-slut</a>';
	} else if (per.uid == "jade") {
		s += ' : <a class="black" href="javascript:cheatJade(0);ChangePersonLst(document)">' + boldText(0, "uncharmed", !perJade.checkFlag(24)) + '</a> or ' +
				  '<a class="black" href="javascript:cheatJade(4);ChangePersonLst(document)">' + boldText(4, "dominated slave") + '</a> or ' +
 		  		  '<a class="black" href="javascript:cheatJade(3);ChangePersonLst(document)">' + boldText(3, "charmed equal") + '</a> or ' +
				  '<a class="black" href="javascript:cheatJade(-1);ChangePersonLst(document)">' + boldText(0, "uncharmed equal", perJade.checkFlag(24)) + '</a> or ' +
  				  '<a class="black" href="javascript:cheatJade(8);ChangePersonLst(document)">' + boldText(8, "Vampiric Ghoul", per.isCharmedBy("Vampyre")) + '</a>';  
	} else if (per.uid == "janetkelly") {
		s += ' : <a class="black" href="javascript:findPerson(\'JanetKelly\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'JanetKelly\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Lover') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'JanetKelly\').charmThem(3);ChangePersonLst(document)">' + boldText(3, 'Bimbo') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'JanetKelly\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'JanetKelly\').charmThem(5);ChangePersonLst(document)">' + boldText(5, 'Catgirl') + '</a>';
	} else if (per.uid == "karma") {
		s += ' : <a class="black" href="javascript:findPerson(\'Karma\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Karma\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Karma\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';	 			  
	} else if (per.uid == "kate") {
		s += ' : <a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').charmThem(2);per.setFlag(22,false);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">' + boldText(2, 'Charmed Lover') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').charmThem(4);per.setFlag(22,false);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">' + boldText(4, 'Charmed Slave') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();per.setFlag(22,false);per.setFlag(23);per.place=1;ChangePersonLst(document)">' + boldText(0, 'Uncharmed Ally', per.checkFlag(23)) + '</a> or ' + 
				  '<a class="black" href="javascript:findPerson(\'Kate\').unCharmThem();per.setFlag(22);per.setFlag(23,false);per.place=1;ChangePersonLst(document)">' + boldText(0, 'Uncharmed Lover', per.checkFlag(22)) + '</a>';
	} else if (per.uid == "kellie") {
		s += ' : <a class="black" href="javascript:findPerson(\'Kellie\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Kellie\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Kellie\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "lauren") {
		s += ' : <a class="black" href="javascript:findPerson(\'Lauren\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ';		
		if (isCharmedPath() && findPersonNC("Sarah").other > 114 && findPersonNC("Sarah").other < 499) {
			s +=	'<a class="black" href="javascript:findPerson(\'Sarah\').charmThem(4);ChangePersonLst(document)">Lover</a> or ' +
					'<a class="black" href="javascript:resetSarahLauren();ChangePersonLst(document)">Reset Meetings</a>';
		} else s += '<a class="black" href="javascript:findPerson(\'Lauren\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';

	} else if (per.uid == "leanne") {
		s += ' : <a class="black" href="javascript:cheatLeanne(0); ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:cheatLeanne(-1);ChangePersonLst(document)">' + boldText(4,'Thrall (with Daria)', per.isCharmedBy("Demon") && (per.place == 382 || per.place == 384)) + '</a> or ' +
		  	  	  '<a class="black" href="javascript:cheatLeanne(-2);ChangePersonLst(document)">' + boldText(4,'Thrall (home)', per.isCharmedBy("Demon") && per.place == 450) + '</a> or ' +
				  '<a class="black" href="javascript:cheatLeanne(1); ChangePersonLst(document)">' + boldText(1,'Charmed (Lover)') + '</a> or ' +
				  '<a class="black" href="javascript:cheatLeanne(4); ChangePersonLst(document)">' + boldText(4,'Charmed (Slave)', !per.isCharmedBy("Demon")) + '</a>';				  
	} else if (per.uid == "lola") {
		s += ' : <a class="black" href="javascript:findPerson(\'Lola\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Lola\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Lola\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "louise") {
		s += ' : <a class="black" href="javascript:findPerson(\'Louise\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Louise\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Louise\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';				  				  
	} else if (per.uid == "lucy") {
		s += ' : <a class="black" href="javascript:findPerson(\'Lucy\').unCharmThem();per.charmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Lucy\').charmThem(8);per.charmThem(8,"Demon");ChangePersonLst(document)">' + boldText(8, "Demon Thrall", per.isCharmedBy("Demon")) + '</a>';  
	} else if (per.uid == "melanie") {
		s += ' : <a class="black" href="javascript:findPerson(\'Melanie\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Melanie\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Melanie\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "melissa") {
		s += ' : <a class="black" href="javascript:findPerson(\'Melissa\').unCharmThem();per.setFlag(8,false);ChangePersonLst(document)">' + boldText(0, "Uncharmed", !per.checkFlag(8)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Melissa\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Melissa\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';		  				  
	} else if (per.uid == "misslogan") {
		s += ' : <a class="black" href="javascript:findPerson(\'MissLogan\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(1);per.setFlag(9);per.setFlag(8,false);ChangePersonLst(document)">Partly Charmed (Neurology)</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(4);ChangePersonLst(document)">' + boldText(4, 'Charmed') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MissLogan\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Charmed Breeder') + '</a>';
	} else if (per.uid == "mom") {
		s += ' : <a class="black" href="javascript:cheatCharmMom(0);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(1);ChangePersonLst(document)">' + boldText(1, 'Minimal') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(4);ChangePersonLst(document)">' + boldText(4, 'Charmed') + '</a> or ' +
				  '<a class="black" href="javascript:cheatCharmMom(-1);ChangePersonLst(document)">About go to Work</a>';
	} else if (per.uid == "monique") {
		s += ' : <a class="black" href="javascript:findPerson(\'Monique\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Monique\').charmThem(1);ChangePersonLst(document)">' + boldText(1, 'Minimal') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Monique\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';
	} else if (per.uid == "mrbeasley") {
		s += ' : <a class="black" href="javascript:findPerson(\'MrBeasley\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrBeasley\').charmThem(1);ChangePersonLst(document)">' + boldText(1, "Charmed") + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MrBeasley\').charmThem(2);ChangePersonLst(document)">' + boldText(2, "Charmed Lover") + '</a>';
	} else if (per.uid == "mrsgranger") {
		s += ' : <a class="black" href="javascript:findPerson(\'MrsGranger\').unCharmThem();per.dress=per.getNextDress();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(1);per.dress=per.getNextDress();ChangePersonLst(document)">' + boldText(1, 'Minimal') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(2);per.dress=per.getNextDress();ChangePersonLst(document)">' + boldText(2, 'Lover') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(3);per.dress=per.getNextDress();ChangePersonLst(document)">' + boldText(3, 'Slut') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsGranger\').charmThem(4);per.dress=per.getNextDress();ChangePersonLst(document)">' + boldText(4) + '</a>';
	} else if (per.uid == "mrsrobbins") {
		s += ' : <a class="black" href="javascript:findPerson(\'MrsRobbins\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsRobbins\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MrsRobbins\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "mscharles") {
		s += ' : <a class="black" href="javascript:findPerson(\'MsCharles\').unCharmThem();ChangePersonLst(document)">' + boldText(0, "Uncharmed", !per.checkFlag(8)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MsCharles\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MsCharles\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';		  				  
	} else if (per.uid == "msreagan") {
		s += ' : <a class="black" href="javascript:findPerson(\'MsReagan\').unCharmThem();per.setFlag(8,false);ChangePersonLst(document)">' + boldText(0, "Uncharmed", !per.checkFlag(8)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MsReagan\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MsReagan\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';		  
	} else if (per.uid == "mrstanika") {
		s += ' : <a class="black" href="javascript:findPerson(\'MrsTanika\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsTanika\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Lover') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsTanika\').charmThem(3);ChangePersonLst(document)">' + boldText(3, 'Fuck-toy') + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MrsTanika\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';		  
	} else if (per.uid == "mstitus") {
		s += ' : <a class="black" href="javascript:findPerson(\'MsTitus\').unCharmThem();per.setFlag(8,false);ChangePersonLst(document)">' + boldText(0, "Uncharmed", !per.checkFlag(8)) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'MsTitus\').charmThem(1);ChangePersonLst(document)">' + boldText(1, 'Slave') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'MsTitus\').unCharmThem();per.setFlag(8);ChangePersonLst(document)">' + boldText(0, 'Free Slave', per.checkFlag(8)) + '</a>';
	} else if (per.uid == "penelope") {
		s += ' : <a class="black" href="javascript:findPerson(\'Penelope\').unCharmThem();per.place=200;per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Penelope\').charmThem(4);per.setFlag(2);per.setFlag(3);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Penelope\').charmThem(3);per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(3) + '</a>';					  				  
	} else if (per.uid == "savanna") {
		s += ' : <a class="black" href="javascript:findPerson(\'Savanna\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Savanna\').charmThem(3);per.setFlag(4);ChangePersonLst(document)">' + boldText(3, 'Girlfriend') + '</a> or ' +		
				  '<a class="black" href="javascript:findPerson(\'Savanna\').charmThem(2);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(2, 'Subordinate') + '</a> or ' +		
 		  		  '<a class="black" href="javascript:findPerson(\'Savanna\').charmThem(4);per.setFlag(4,false);ChangePersonLst(document)">' + boldText(4, 'Slut') + '</a>';
	} else if (per.uid == "seraphina") {
		s += ' : <a class="black" href="javascript:findPerson(\'Seraphina\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Seraphina\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Seraphina\').charmThem(3);ChangePersonLst(document)">' + boldText(3) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Seraphina\').charmThem(8);ChangePersonLst(document)">' + boldText(8, "Demon Thrall", per.isCharmedBy("Demon")) + '</a>';
	} else if (per.uid == "tammy") {
		s += ' : <a class="black" href="javascript:findPerson(\'Tammy\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Tammy\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Slutty Girlfriend') + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Tammy\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a>';
	} else if (per.uid == "ursula") {
		s += ' : <a class="black" href="javascript:findPerson(\'Ursula\').unCharmThem();per.place=200;per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Ursula\').charmThem(2);per.setFlag(2);per.setFlag(3);ChangePersonLst(document)">' + boldText(2, "Bimbo") + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Ursula\').charmThem(4);per.setFlag(2);per.setFlag(3);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Ursula\').charmThem(3);per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(3) + '</a>';
	} else if (per.uid == "vampyre") {
		s += ' : <a class="black" href="javascript:findPerson(\'Vampyre\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Vampyre\').charmThem(1,\'Sarah\');ChangePersonLst(document)">' + boldText(4, 'Charmed By Sarah', per.isCharmedBy("Sarah")) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Vampyre\').charmThem(1,\'You\');ChangePersonLst(document)">' + boldText(4, 'Charmed By You', per.isCharmedBy()) + '</a> or<br>' +
				  '<a class="black" href="javascript:cheatResetVampyre(39);ChangePersonLst(document)">Reset to start of events (attack pending)</a> or ' +
				  '<a class="black" href="javascript:cheatResetVampyre(0);ChangePersonLst(document)">Reset to start of events (ask Sarah)</a>';
	} else if (per.uid == "victoria") {
		s += ' : <a class="black" href="javascript:findPerson(\'Victoria\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Victoria\').charmThem(4);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Victoria\').charmThem(2);ChangePersonLst(document)">' + boldText(2, 'Assistant') + '</a>';
	} else if (per.uid == "zali") {
		s += ' : <a class="black" href="javascript:findPerson(\'Zali\').unCharmThem();per.place=200;per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'Zali\').charmThem(4);per.setFlag(2);per.setFlag(3);ChangePersonLst(document)">' + boldText(4) + '</a> or ' +
 		  		  '<a class="black" href="javascript:findPerson(\'Zali\').charmThem(3);per.setFlag(2,false);per.setFlag(3,false);ChangePersonLst(document)">' + boldText(3) + '</a>';					  
	} else if (per.charmed >= 0) {
		i = 1;
		if ('bambi,camryn,charley,diane,didi,doctorkay,emily,gina,jenny,kristin,louise,msjones,nella,nina,nursemegan,nursesandra,officerbatton,officerkhan,officersmith,sharon,zoey,'.indexOf(per.uid + ',') != -1) i = 4;
		else if ('carol,charlie,johnadams,tracy,'.indexOf(per.uid + ',') != -1) i = 2;
		s += ' : <a class="black" href="javascript:findPerson(\'' + per.uid + '\').unCharmThem();ChangePersonLst(document)">' + boldText(0) + '</a> or ' +
				  '<a class="black" href="javascript:findPerson(\'' + per.uid + '\').charmThem(' + i + ');ChangePersonLst(document)">' + boldText(i, i != 4 ? 'Charmed' : undefined) + '</a>';
	} else s += ' : <b>not charmable</b>';
	md.getElementById("pcharm").innerHTML = s;
	md.getElementById("pcharmtime").innerHTML = per.charmedTime + ' (for ' + per.hoursCharmed(per.sCharmedBy) + 'hrs)';
	s = '';
	for (var k = 0; k < per.flags.length; k++) {
		// Build list of flags 32 to 1, eg 0001100001 etc
		var s1 = dec2bin(per.flags[k]);
		if (s1.length < 32) {
			j = s1.length;
			for (i = j; i < 32; i++) s1 = '0' + s1;
		}
		// Add hover title of the flag number
		var s2 = '';
		for (i = 0; i < 32; i++) s2 += '<span title="' + ((k * 32) + (32 - i)) + '">' + s1.charAt(i) + '</span>';
		if (k > 0) s += '<br>';
		s += s2;
	}
	md.getElementById("pflags").innerHTML = s;
	s = per.other;
	if (typeof s == "string") s = "'" + s + "'";
	for (i = 0; i < per.extra.length; i++) s += ', ' + per.extra[i];
	md.getElementById("pextra").innerHTML = s;
	md.getElementById("phealth").innerHTML = per.health + '';
	s = '';
	if (per.NoItems > 0) {
		for (i = 1; i <= per.NoItems; i++) {
			if (i > 1) s += ', ';
			s += getItemName(per.Items[i]);
		}
	}
	md.getElementById("pitems").innerHTML = s;
	
	// Character specific details
	s = '';
	if (per.uid == "ellie") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Ellie\').dress=\'Carla\';findPerson(\'Leigh\').dress=\'Alix\';ChangePersonLst(document)">Carla Brown</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Ellie\').dress=\'Alix\';findPerson(\'Leigh\').dress=\'Carla\';ChangePersonLst(document)">Alix Lynx</a></td>';															
	} else if (per.uid == "jessica") {
		var bnd = '';
		if (per.isRival()) bnd = 'Rival';
		else if (per.getRivalry() == 3) bnd = 'Free Ally';
		else if (per.getRivalry() == -1) bnd = 'Prisoner';
		else if (per.getRivalry() == -2) bnd = 'Witch-toy';
		else if (per.getRivalry() == 1 || per.getRivalry() == 1) bnd = 'Cellar bound';
		s = '<td style="width:33%"><b>Bound: ' + bnd + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').startRival();ChangePersonLst(document)">Rival</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').startAlly();per.setRivalry(3);per.place=183;ChangePersonLst(document)">Free Ally</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(-1);ChangePersonLst(document)">Prisoner</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(-2);ChangePersonLst(document)">Witch-toy</a> ' +
					'<a class="black" href="javascript:findPerson(\'Jessica\').setRivalry(1);ChangePersonLst(document)">Cellar bound</a></td>';
	} else if (per.uid == "johnadams" && per.dress != "Male") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'JohnAdams\').dress=\'Female1\';ChangePersonLst(document)">Brandy Robbins</a> or ' +
					'<a class="black" href="javascript:findPerson(\'JohnAdams\').dress=\'Female2\';ChangePersonLst(document)">Megan Rain</a> or ' +
					'<a class="black" href="javascript:findPerson(\'JohnAdams\').dress=\'Female3\';ChangePersonLst(document)">Corey Chase</a></td>'
	} else if (per.uid == "leanne") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Leanne\').dress=\'Anna\';findPerson(\'Leigh\').dress=\'Anna\';ChangePersonLst(document)">Anna Tatu</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Leanne\').dress=\'Veruca\';findPerson(\'Leigh\').dress=\'Veruca\';ChangePersonLst(document)">Veruca James</a></td>';					
	} else if (per.uid == "leigh") {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Ellie\').dress=\'Alix\';findPerson(\'Leigh\').dress=\'Carla\';ChangePersonLst(document)">Carla Brown</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Ellie\').dress=\'Carla\';findPerson(\'Leigh\').dress=\'Alix\';ChangePersonLst(document)">Alix Lynx</a></td>';																				
	} else if (per.uid == "mia") {
		s = '<td style="width:33%" valign="top"><b>Age: ' + (per.checkFlag(8) ? "Younger" : "Natural") + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').setFlag(8,false);;ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').setFlag(8);ChangePersonLst(document)">Younger<br>' +
			 '<b>Model: ' + per.dress + '</b> ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').dress=\'Mia\';ChangePersonLst(document)">Mia Robinson</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mia\').dress=\'Lisa\';ChangePersonLst(document)">Lisa Ann</a></td>';
	} else if (per.uid == "misslogan") {
		s = '<td style="width:33%"><b>Assignment: ' + (per.isNeuro() ? 'Neurology' : per.checkFlag(8) ? 'Reproduction' : '') + '</b><br><b>Age: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(8);per.setFlag(9,false);ChangePersonLst(document)">Reproduction Assignment</a> or ' +
				   '<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(9);per.setFlag(8,false);ChangePersonLst(document)">Neurology Assignment</a><br>' +
					'<b>Model: ' + per.dress + '</b> ' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(18,false);ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MissLogan\').setFlag(18,true);ChangePersonLst(document)">Younger</a></td>';
	} else if (per.uid == "mom") {
		s = '<td style="width:33%" valign="top"><b>Age: ' + (per.checkFlag(46) ? "Younger" : "Natural") + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').setFlag(46,false);ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').setFlag(46);ChangePersonLst(document)">Younger</a><br>' +
					'<b>Model: ' + per.dress + '</b> ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').dress=\'Elexis\';ChangePersonLst(document)">Elexis Monroe</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Mom\').dress=\'Syren\';ChangePersonLst(document)">Syren De Mer</a></td>';
	} else if (per.uid == "mrbeasley") {
		s = '<td style="width:33%"><b>Gender: ' + per.getDress() + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11,false);per.setFlag(12,false);per.setFlag(13,false);ChangePersonLst(document)">Male</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10);per.setFlag(11,false);per.setFlag(12,false);per.setFlag(13,false);ChangePersonLst(document)">Bimbo1</a> or ' +		
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11);per.setFlag(12,false);per.setFlag(13,false);ChangePersonLst(document)">Bimbo2</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11,false);per.setFlag(12);per.setFlag(13,false);ChangePersonLst(document)">Bondage1</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MrBeasley\').setFlag(10,false);per.setFlag(11,false);per.setFlag(12,false);per.setFlag(13);ChangePersonLst(document)">Bondage2</a></td>';					
	} else if (per.uid == "mrsgranger") {
		s = '<td style="width:33%"><b>Age: ' + drb.split("/").join("") + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MrsGranger\').setFlag(35,false);ChangePersonLst(document)">Original Age</a> or ' +
  		 		   '<a class="black" href="javascript:findPerson(\'MrsGranger\').setFlag(35);ChangePersonLst(document)">Younger</a></td>';
	} else if (per.uid == "mstitus") {
		s = '<td style="width:33%"><b>Age: ' + (per.checkFlag(23) ? 'Younger' : 'Natural') + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'MsTitus\').setFlag(23,false);ChangePersonLst(document)">Original Age</a> or ' +
					'<a class="black" href="javascript:findPerson(\'MsTitus\').setFlag(23);ChangePersonLst(document)">Younger</a></td>';
	} else if (per.uid == "tina") {
		s = '<td style="width:33%"><b>State: ' + per.dress + '</b></td><td style="width:66%"> ' +
					'<a class="black" href="javascript:findPerson(\'Tina\').dress=\'Malta\';ChangePersonLst(document)">Malta Flare (normal)</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Tina\').dress=\'Lana\';ChangePersonLst(document)">Lana Rhoades (normal)</a> or ' +
					'<a class="black" href="javascript:findPerson(\'Tina\').dress=\'Vampyre\';ChangePersonLst(document)">Vampyre</a></td>';
	} else if (per.getModels() != '') {
		s = '<td style="width:33%"><b>Model: ' + per.dress + '</b></td><td style="width:66%"> ';
		var m = per.getModels();
		var ar = m.split(",");
		for (var j = 0; j < ar.length; j++) {
			var arThis = ar[j].split("|");
			s += '<a class="black" href="javascript:findPerson(\'' + per.uid + '\').dress=\'' + arThis[0] + '\';ChangePersonLst(document)">' + arThis[1] + '</a>';
			if (j != (ar.length - 1)) s += ' or ';
		}
		s += '</td>';
	}
	md.getElementById("pspecial").innerHTML = s;
}

function writePersonDetails()
{
	if (isScreenSmall()) hideSidebars();
	var md = WritePlaceHeader(true);

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>People in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all defined people in the game.</p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">' +
		'<tr><td style="width:20%;vertical-align:top">' +
			'<select name="peoplelst" id="peoplelst" size="1" onchange="ChangePersonLst(document)">'
	);
	var p;
	var par = [];
	var i;
	var bSel = false;
	if (bSel) s += '>You</option>';
	else s += ' selected>You</option>';
	par.push('<option value="You">You</option>');
	for (i = 0; i < arPeople.length; i++) {
		p = arPeople[i];
		var s = '<option label="' + p.getPersonNameShort(true) + '" value="' + p.uid + '"';
		if (p.uid == "you") continue;
		if (p.isHere() && !bSel) {
			s += ' selected>' + p.getPersonNameShort(true) + '</option>';
			bSel = true;
		} else s += '>' + p.getPersonNameShort(true) + '</option>';
		par.push(s);
	}
	par.sort();
	for (i = 0; i < par.length; i++) md.write(par[i]);

	md.write(
		'</select><br><br><span id="pimg"></span></td><td style="width:80%"><table style="color:black">' +
		'<tr><td style="width:33%"><b>Person Name: </b></td><td style="width:66%"><span id="pname"></span> (id: <span id="uid"></span>)</td></tr>' +
		'<tr><td style="width:33%"><b>Gender: </b></td><td style="width:66%"><span id="pgender"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Folder: </b></td><td style="width:66%"><span id="pfolder"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Dress: </b></td><td style="width:66%"><span id="pdress"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Location: </b></td><td style="width:66%"><span id="pplace"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Charmed: </b></td><td style="width:66%"><span id="pcharm"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Charmed At: </b></td><td style="width:66%"><span id="pcharmtime"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Flags: </b></td><td style="width:66%"><span id="pflags"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Other + Extra: </b></td><td style="width:66%"><span id="pextra"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Health: </b></td><td style="width:66%"><span id="phealth"></span></td></tr>' +
		'<tr><td style="width:33%"><b>Items: </b></td><td style="width:66%"><span id="pitems"></span></td></tr>' +
		'<tr id="pspecial"></tr>' +
		'<tr><td><a class="black" href="" onclick="ChangeCharm();return false" title="person,level">Charm them</a> <input type="text" id="charmby" size="10" value=""></td>' +
		'<td><a class="black" href="" onclick="MoveThem();return false">Move them</a> <input type="text" id="moveto" size="10" value=""> <a class="black" href="" onclick="HealThem();return false">Heal them</a> <input type="text" id="heal" size="10" value=""></td></tr>' +
		'<tr><td><a class="black" href="" onclick="ChangeFlag();return false">Toggle Flag</a> <input type="text" id="tflag" size="10" value=""></td>' +
		'<td><a class="black" href="" onclick="ChangeOther();return false">Change Other/Extra</a> <input type="text" id="oextra" size="2" value=""> to <input type="text" id="oextravalue" size="10" value=""></td></tr>' +
		"</table></td></tr></table>" +
		"<script type='text/javascript'>" +
		"function ChangeFlag() {" +
			"var flg = document.getElementById('tflag').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"var no = parseInt(flg,10);" +
			"if (flg !== '') per.setFlag(no, !per.checkFlag(no));" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function ChangeOther() {" +
			"var flg = document.getElementById('oextra').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var no = 0;" +
			"if (no !== '') no = parseInt(flg,10);" +
			"var vals = document.getElementById('oextravalue').value;" +
			"if (vals !== '') setPersonOther(ps,parseInt(vals,10), no);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function ChangeCharm() {" +
			"var by = document.getElementById('charmby').value;" +
			"var ar = by.split(',');" +
			"var wby = ar[0];" +
			"var clv = 4;" +
			"if (ar.length > 1) clv = parseInt(ar[1], 10);" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"if (wby === '') per.unCharmThem();" +
			"else per.charmThem(clv, wby);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function MoveThem() {" +
			"var mto = document.getElementById('moveto').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"mto = parseFloat(mto);" +
			"if (per.uid == 'you') mto = Math.floor(mto);" +
			"per.moveThem(mto);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"function HealThem() {" +
			"var hl = document.getElementById('heal').value;" +
			"var ps = document.getElementById('uid').innerHTML;" +
			"var per = findPerson(ps);" +
			"if (per === null) return;" +
			"per.health = parseInt(hl, 10);" +
			"ChangePersonLst(document);" +
		"}\r" +
		"</script>" +
		"</div>"
	);
	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
	ChangePersonLst(document);
}

function writeItemDetails(val)
{
	if (isScreenSmall()) hideSidebars();
	var md = WritePlaceHeader(true);
	var i;

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<script type="text/javascript">' +
			"function AddItem() {" +
				"var sItem = document.getElementById('itemNo').value;" +
				"if (sItem !== '') {" +
					"if (sItem.toLowerCase().split(' ').join('') == 'shieldedcharm') learnSpell('Shielded Charm');" +
					"else {" +
						"var no;" +
						"if (parseInt(sItem, 10) > 0) no = parseInt(sItem, 10);" +
						"else no = getItemNo(sItem);" +
						"if (perYourBody.FindItem(no) === 0) {" +
							"if (no > 9 && no < 21) learnSpell(no);" +
							"else perYourBody.PutItem(no, true);" +
						"} else if (no <= 9 || no > 20) perYourBody.PutItem(no, true);" +
					"}" +
					"writeItemDetails(sItem)" +
				"}" +
			"}" +
			"function MoveItem(idx) {" +
				"var sItem = document.getElementById('itemNo' + idx).value;" +
				"if (sItem !== '') {" +
					"if (idx >= 0 && idx < T.length) T[idx].place = parseInt(sItem, 10);" +
					"writeItemDetails()" +
				"}" +
			"}" +
		'</script>' +
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>Items in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all items in the game.</p>' +
		// Your inventory
		'<p><b>Your Possessions</b></p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);
	if (perYou.NoItems > 0) {
		for (i = 1; i <= perYou.NoItems; i++) {
			md.write(
				'<tr><td style="width:25%;vertical-align:top"><b>' + getItemName(perYou.Items[i]) + '</b></td>'
			);
			if (perYou.Items[i] >= 10 && perYou.Items[i] <= 20) md.write('<td colspan=2>a spell</td>');
			else {
				md.write(
					'<td style="width:15%"><a class="black" href="" onclick="perYou.RemoveItemSL(' + i + ');writeItemDetails();return false">destroy</a></td>' +
					'<td style="width:65%"><a href="" class="black" onclick="perYou.DropItem(' + perYou.Items[i] + ');writeItemDetails();return false">drop</a></td>' +
					'</tr>'
				);
			}
		}
	}
	md.write(
		'</tr><tr><td colspan=3>&nbsp;</td></tr>' +
		"<tr><td colspan=3><b>Add an <a href=''class='black' onclick='AddItem();return false'>item</a></b> <input type='text' id='itemNo' size='20' value='" + (val !== undefined && val !== '' ? val : '') + "'></td>" +
		'</table>' +
		'<p><b>Items around in the game</b></p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);

	for (i = 0; i < T.length; i++) {
		md.write(
			'<tr><td style="width:25%;vertical-align:top"><b>' + getItemName(T[i].item) + '</b></td>' +
			'<td style="width:15%">Location: ' + T[i].place + '</td>' +
			'<td style="width:65%"><a class="black" href="" onclick="removeItemSL(' + i + ');writeItemDetails();return false">destroy</a> <input type="text" id="itemNo' + i + '" size="10" value=""> <a class="black" href="" onclick="MoveItem(' + i + ');return false">move</a></td>' +
			'</tr>'
		);
	}
	md.write('</table><p><b>Valid items in the game</b></p><p>');

	var itemlist = Object.getOwnPropertyNames(oBaseItems);
	var itm;

	for (i = 0; i < itemlist.length; i++) {
		itm = oBaseItems[itemlist[i]];
		if (itm.name === undefined) continue;
		var num = parseInt(itemlist[i], 10);
		md.write('<b>' + getItemName(num) + '</b> (' + num + ')');
		if (i != itemlist.length -1) md.write(', ');
	}

	md.write('</p></div>');

	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
}

function writePlaceDetails()
{
	if (isScreenSmall()) hideSidebars();	
	var md = WritePlaceHeader(true);
	var i;

	var cw = "100vw - 10px - " + gameState.getRightBarWidth();

	md.write(
		'<script type="text/javascript">' +
			"function SetFlag(ps,idx) {" +
				"var sItem = document.getElementById('placeNo' + idx).value;console.log(ps + ' - sItem: ' + sItem);" +
				"if (sItem !== '') {" +
					"setPlaceFlag(ps, parseInt(sItem, 10), !checkPlaceFlag(ps, parseInt(sItem, 10)));" +
					"writePlaceDetails()" +
				"}" +
			"}" +
		'</script>' +
		'<div style="width:100%;width:calc(' + cw + ')">' +
		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0;border-width:0"><tr style="width:100%"><td class="inventbar" style="vertical-align:top;width:100%"><p style="font-size:x-large"><b>Places in the Game</b></p></td></tr></table>' +
		'<p style="font-size:medium">These are the details for all defined places in the game.</p>' +
		'<table style="width:98%;background-color:lightcyan;color:black;text-align:left">'
	);
	for (i = 1; i <= arPlaces.length; i++) {
		var j;
		var s = dec2bin(arPlaces[i]);
		if (s.length < 32) {
			j = s.length;
			for (var z = j; z < 32; z++) s = '0' + s;
		}
		var nm = getPlaceNameIdx(i);
		if (nm !== "") {
			md.write(
				'<tr><td style="width:35%;vertical-align:top"><b>' + nm + '</b> ' + (isPlaceKnown(nm) ? '(known)' : "(unknown)") + '</td>' +
				'<td style="width:35%;vertical-align:top"><b>Flags:</b> ' + s + '</td>' +
				'<td style="width:30%"><input type="text" id="placeNo' + i + '" size="10" value=""> <a class="black" href="" onclick="SetFlag(\'' + nm.split(" ").join("").split(gameState.sTown).join("").split("Place").join("Pl").split("Drive").join("Dr").split("Road").join("Rd").split("Home").join("House").split(".").join("").split("'").join("").split("&rsquo;").join("").trim() + '\',' + i + ');return false">set flag</a></td>' +
				'</tr>'
			);
		}
	}
	md.write('</table></div>');

	addOptionLink(md, "return to the game", "DoReturn()");

	writePageFooter(md);
}
