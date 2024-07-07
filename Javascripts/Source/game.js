/***************** Document **************4************************************************************/

// Cache for a page with similar interface to the DOM document object
function mainCache()
{
	this.getDocHead = function() { return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'; };	// HTML 5

	this.sPage = '';		// Buffered page
	this.sPageRight = '';	// Right-most col
	this.sLog = '';

	this.clear = function() {
		this.sPage = '';
		this.sPageRight = '';
		this.sLog = '';
	};

	this.write = function(s) {
		if (gameState.bMainEnded && gameState.bRightCol) this.sPageRight += s;
		else this.sPage += s;
	};

	this.open = function() {
		this.sPage = '';
		this.sPageRight = '';
	};

	this.close = function()
	{
		var md = document;
		md.close();
		this.updateElement(md.body, this.sPage);
		md.body.style.fontSize = gameState.sFontSize;
		this.sPage = '';		// technically not needed but seems safest
	};
	
	this.finaliseRightCol = function()
	{
		if (this.sLog !== '') this.sPage += '<p>' + this.sLog + '</p>';

		gameState.bRightCol = false;
		if (!gameState.bDisableRightCol) {
			this.sPage += '</td><td class="' + gameState.sRightColSize + '">';
			this.sPage += this.sPageRight;
		} else {
			var sz = gameState.sRightColSize == "td-right" ? "20%" : (gameState.sRightColSize == "td-right-med" ? "25%" : "30%");
			this.sPage = this.sPage.split('<div id="peoplehere">').join('<div id="peoplehere">' + this.sPageRight);
			this.sPage = this.sPage.split('id="peopleitems" style="float:right;width:20%').join('id="peopleitems" style="float:right;width:' + sz);
		}
		this.sPageRight = '';	
		this.sLog = '';
	};

	this.updateElement = function(el, s)
	{
		// Split out any javascript <script> blocks
		var so = '';
		var scr = '';
		var i = s.indexOf("<script");
		while (i != -1) {
			if (i > 0) {
				so += s.substr(0, i);
				s = s.substr(i);
			}
			if (s.indexOf(">") != -1) {
				s = s.substr(s.indexOf(">") + 1);
				var i2 = s.indexOf("</script>");
				if (scr !== "" && scr.substr(-1, 1) != ";") scr += ";";
				if (i2 != -1) {
					scr += s.substr(0, i2);
					s = s.substr(i2 + 9);
				} else {
					scr += s;
					s = '';
				}
			}
			i = s.indexOf("<script");
		}
		if (s !== '') so += s;
		if (gameState.sMod !== "" && perMod !== undefined) {
			var p = perMod;
			while (p !== undefined) {
				so = p.replaceText(so, 'txt');
				p = p.perMod;
			}
			el.innerHTML = so;
		} else el.innerHTML = so;
		if (scr !== "") setTimeout(function(){mdCache.addScript(el, scr);}, 50);
	};

	this.addScript = function(el, scr)
	{
		var script = document.createElement('script');
		script.type = 'text/javascript';
		try {
			script.appendChild(document.createTextNode(scr));
			el.appendChild(script);
		} catch (e) {
			script.text = scr;
			el.appendChild(script);
		}
	};
}
var mdCache = new mainCache();
var md = mdCache;

/* UNUSED
// Include a script file
function loadScript(url, callback)
{
    // Adding the script tag to the head
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = function() { callback(); };
    script.onload = function() { callback(); };
	 
    // Fire the loading
    head.appendChild(script);
}

function removejscssfile(filename, filetype) {
    var targetelement = (filetype=="js") ? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		 if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1) {
			  allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
		 }
	 }
}
*/

/***************** Game ******************************************************************************/

// Is this a mobile device
function mobileTest(agent) {
	// Simple check
	return (/Mobi|Android/i.test(agent));
	// More complex check
	//return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4)));
}
var bMobile = mobileTest(navigator.userAgent||navigator.vendor||window.opera);
 
function getVersion() { return "14.15"; }

// Status of the current game in play
function GameStatus()
{
	// Document details
	this.nWidth = 0;				// Width of the document
	this.nHeight = 0;				// Height of the document
	this.bMainEnded = false;	// Has the main colum ended
	
	// Conversation details
	this.pclr = '';				// Colour of the current page text
	this.nUId = 0;					// Id for last shown popup
	this.bCheatShown = false;	// Is the cheat menu shown
	this.bAltStarted = false;	// started an alternatives block
	this.bSleepLink = false;
	this.bDanceLink = false;
	this.sQuestionWidth = '';		// Width of questions shown
	this.sQuestionLeft = '';		// left margin for questions
	this.sInvisibleChoices = '';	// Options when invisible, added at the end of the list of questions
	
	// Center div/main table
	// Left column
	this.bLeftCol = false;		// Are we building the left column now
	this.sLeftColSize = '';
	
	// Right column
	this.bRightCol = false;			// Are we showing the right column
	this.sRightColSize = '';		// What size is it to be, to override the default
	this.bPeopleCol = false;		// Have people details been added
	this.bNoItems = false;
	this.bNoPeople = false;
	this.bDisableRightCol = undefined;// Disable the right col entirely
	
	// Images
	this.lFloat = '';
	this.rFloat = '';
	
	// Events
	this.bSex = false;		// Sex scene
	this.bLastSex = false;	// Last scene was a sex scene
	this.sexScene = function() { this.bSex = true; };
	this.sRecentImages = '';

	// Location
	this.plcTitle = '';				// Title of the last shown page
	this.nLastOut = 0;				// Last outside location
	this.bLastOutVisible = true;	// Were you visible there
	this.arNewPlaces = '';			// List of new place notifications
	this.sWasHere = '';				// People uid's that were here
	this.sIsHere = '';				// People uid's that are here
	
	this.sTown = '';					// Name of the town
	this.perTown = null;				// The current town object

	this.startPlace = function()
	{
		this.nWidth = getWidth(document);
		this.nHeight = getHeight(document);
		this.bMainEnded = false;
		this.plcTitle = '';
		this.pclr = '';
		this.nUId = 0;
		this.bAltStarted = false;
		if (isOutside(Place, true)) {
			this.nLastOut = Place;
			this.bLastOutVisible = perYou.extra[1] === 0; // inlined isVisible();
		}
		this.sInvisibleChoices = '';
		this.sRightColSize = '';
		this.bLeftCol = false;
		this.sLeftColSize = '';
		this.bRightCol = false;
		this.bPeopleCol = false;
		this.bSleepLink = false;
		this.bDanceLink = false;
		this.bExplicitNow = undefined;
		this.bNoClosePopup = false;
		this.lFloat = '';
		this.rFloat = '';
		this.bLastSex = this.bSex;
		this.bSex = (sType.indexOf("bondage") != -1 || sType.indexOf("threesome") != -1 || sType.indexOf("lesbian") != -1 || sType.indexOf("anal") != -1 || sType.indexOf("fuck") != -1 || sType.indexOf("sex") != -1 || sType.indexOf("bj") != -1 || sType.indexOf("lick") != -1 || sType.indexOf("strapon") != -1 || sType.indexOf("tf") != -1);
		this.bNoItems = false;
		this.bNoPeople = false;
		this.sQuestionWidth = '';
		this.sQuestionLeft = '';
		if (this.bDisableRightCol === undefined) this.bDisableRightCol = true; //isScreenSmall();
		if (this.nInventoryMode == undefined) this.nInventoryMode = 2;
		if (this.nRightBarState == 1.1) this.nRightBarState = 1;
	};
	
	this.setIsHere = function() {
		this.sWasHere = this.sIsHere;
		this.sIsHere = ',';
		var iel = arPeople.length;
		var ph;
		for (var ir = 0; ir < iel - 1; ir++) {
			ph = arPeople[ir];
			if (ph.isHere()) this.sIsHere += ph.uid + ',';
		}
		//console.log(this.sWasHere + " " + this.sIsHere);
	};

	// SideBars
	this.bSidebarsHidden = false;		// Are both sidebars hidden
	this.bSidebarsHiddenLB = true;	// saved state when a lightbox is shown
	
	// Left bar states
	// 0 - hidden (only this one hidden)
	// 1 - shown
	// 2 - minimised
	this.nLeftBarState = 2;

	this.getLeftBarWidth = function() {
		if (this.nLeftBarState === 0 || this.bSidebarsHidden) return "0px";
		if (this.nLeftBarState == 2) return "30px"; //"25px";
		if (isScreenSmall()) return "30%"; //"90px";
		return "8%";
	};

	// right bar state
	// 0 - hidden
	// 1 - inventory
	// 1.1 - popup inventory
	// 2 - inventory min
	//	3 - phone (was normal inventory state)
	// 4 - phone (was min inventory state)
	this.nRightBarState = 2;

	this.getRightBarWidth = function() {
		if (this.bSidebarsHidden || this.nRightBarState === 0 || (gameState.nRightBarState < 3 && gameState.nInventoryMode == 1) || (gameState.nRightBarState > 1 && gameState.nRightBarState < 3 && gameState.nInventoryMode == 2)) return "0px";
		if (this.nRightBarState == 2) return "30px"; //"25px";
		else if (this.nRightBarState == 1) {
			if (isScreenSmall()) return "35%";
			return "16%";
		} else if (isScreenSmall()) return "100%";
		else if (this.nRightBarState > 2) return !this.bPhoneLandscape && (this.sPhoneState == "type=notes" || this.sPhoneState == "type=photos" || this.sPhoneState == "type=map") ? "50%" : "25%";
		return "4px";
	};

	// Undo
	this.sUnDo = '';

	// Settings
	this.bExplicit = true;			// Show explicit content
	this.bExplicitNow = true;		// Show explicit content HERE
	this.nExplicitRatio = 0.8;		// When on show explicit content this much
	this.bAllPlaces = false;		// All Standard Places known
	this.bPuzzles = true;			// Are puzzles enabled
	this.bUseRuneMatching = true;	// Use the rune matching system for learning spells
	this.bAllowUndo = false;		// Can you undo bad ends
	this.bCommentLL = false;		// Are comments shown lower left of the screen
	this.nUseIcons = 2;				// Use icons in the inventory. 0 = no icons, 1 = original, 2 = compact
	this.bSounds = true;				// Sound effects
	this.bShowSpeaker = true;		// Show speaker in popup boxes
	this.sFontSize = "medium";		// Font size for the page
	this.bShowLoadSave = true;		// Show load/save icons in left bar
	this.bUIHints = true;			// Show arrow hints on UI functions
	
	// Inventory Mode
	// 0 = full right sidebar
	// 1 = popup
	// 2 = open on request, no minimal version
	this.nInventoryMode = 2; 		// Inventory popup
	
	// Mods
	this.sMod = '';					// Current Mod
	this.getImagesFolder = function() {
		if (perMod) return perMod.folder + 'Images/';
		if (gameState.sMod !== "") return "Mods/" + gameState.sMod.split(",")[0] + "/Images/";
		return 'Images/';
	};
	this.getBaseFolder = function() {
		if (perMod) return perMod.folder;
		if (gameState.sMod !== "") return "Mods/" + gameState.sMod.split(",")[0] + "/";
		return '';
	};	
	
	// Saves
	this.nCurrentQS = 0;				// Current Quick Save
	
	// Phone
	this.nMaxPhotos = 20;			// Max photos in your camera
	this.sPhoneState = '';			// Currently shown phone type
	this.bPhoneLandscape = true;	// Show noted/map/photos in landscape orientation
	this.nSMSLimit = 15 * 32;		// CONSTANT: Must be multiple of 32 and never changes in gameplay

	// LightBox
	this.bLBNoShow = false;			// Disable showing the lightbox
	this.bNoClosePopup = false;	// Disable closing popup window

	// Themes
	this.nMaxThemes = 2;				// Maxumium number of themes (0 based index)
}

function saveUndo(nc)
{
	if (nc !== true) ClearComments();
	if (gameState.bAllowUndo) gameState.sUnDo = getSaveString("UnDo");
}

/***************** Theme *****************************************************************************/
// 0 = white
// 1 = black
// 2 = grey
var nTheme = 2;
function getThemeFolder() { return 'UI/themes/theme' + nTheme + '/'; }
function getThemeFolderI(nt) { return 'UI/themes/theme' + nt + '/'; }

function toggleTheme() {
	nTheme++;
	if (nTheme > gameState.nMaxThemes) nTheme = 0;
	saveGlobalSettings();
	updateCSS();
	dispPlace();
}

function toggleFont() {
	if (gameState.sFontSize == "medium") gameState.sFontSize = "large";
	else if (gameState.sFontSize == "large") gameState.sFontSize = "small";
	else gameState.sFontSize = "medium";
}

/***************** Image Objects ******************************************************************************/

function getBaseImageObj(uid) {
	if (oImages.hasOwnProperty(uid)) return oImages[uid];
	return undefined;
}

function getImageRandom(imgbase, no, baseno, alpha, ext)
{
	// Get actual image using a letter suffix a+
	if (!baseno) baseno = 0;
	var idx = Math.ceil(Math.random() * no) + baseno;
	if (alpha !== false) idx = String.fromCharCode(idx + 96);		// Use a,b,c,d...
	if (imgbase.indexOf("-day") != -1) return imgbase.split("-day")[0] + idx + "-day" + (ext === undefined ? '.jpg' : ext);
	else if (imgbase.indexOf("-night") != -1) return imgbase.split("-night")[0] + idx + "-night" + (ext === undefined ? '.jpg' : ext);
   return imgbase + idx + (ext === undefined ? '.jpg' : ext);
}

function getImageOCnt(obj, img)
{
	if (obj === undefined) return 0;
	img = img.split("-").join("_").split(" ").join("");
	if (obj[img] !== undefined) return obj[img];
	return 0;
}

function getDecodedImageOCnt(obj, img)
{
	if (obj === undefined) return 0;
	
	// Decode any prefixes
	var ar = img.split(" ");
	switch(ar[0]) {
		case "sex-ff": obj = obj.femalefemale; img = ar[1]; break;
		case "sex-mf": obj = obj.malefemale; img = ar[1]; break;
		case "sex-fuf":obj = obj.futafemale; img = ar[1]; break;
		case "sex-mm" :obj = obj.malemale; img = ar[1]; break;
	}	
		
	// Decode/locate some specific names/folders
	switch(img) {
		case "be": 		return getImageOCnt(obj, "breastexpansion");
		case "bs": 		return getImageOCnt(obj, "breastreduction");
		case "cockex": return getImageOCnt(obj, "cockexpansion");
		case "cockdec":return getImageOCnt(obj, "cockshrinking");
	}

	return getImageOCnt(obj, img);
}

function getImageO(imgbase, noi, baseno, per, alpha, next)
{
	//console.log(imgbase + ", " + noi + ", " + baseno);
	// imagebase
	// can be
	// "GenericSex/tg"
	// "People/Anita/anita7b"
	// "Player/Ariana/image1"
	// "People/Bambi/Kiki/bambi5a"
	// or the above with a .ext
	var ar = imgbase.split('.');
	var ext = ar[ar.length - 1];	// Extension of the image
	if (ar.length > 1 && ['jpg', 'mp4', 'webm', 'gif', 'png'].indexOf(ext) >= 0) {
		ar.pop();
		imgbase = ar.join(".");
		ext = '.' + ext;
	} else ext = next;
	ar = imgbase.split("/");
	var img = imgbase.trim();
	var st = ar[0];
	var bGeneric = st == "GenericSex";
	// Determine base object for the images
	var obj = oImages;
	if (ar.length > 1) {
		if (bGeneric) obj = obj.GenericSex;
		else if (st == "Player" || (per !== undefined && per !== '' && per === perYou)) {
			obj = obj.Player[ar[1]];
			if (obj === undefined) obj = oImages;
		} 
		img = ar[ar.length - 1].trim();
	}
	if (st == "People" || (per !== undefined && per !== '')) {
		if (per === perYou) {
			if (ar.length > 1) obj = obj.Player[ar[1]];
			else obj = obj.Player;
			if (obj === undefined) obj = oImages;
		} else {
			obj = obj.People;
			var fld = per !== undefined ? per.folder : (ar.length > 0 ? ar[1] : '');
			if (fld !== '') {
				var arf = fld.split("/");
				var o = obj[arf[0]];
				if (o != undefined) {
					if (arf.length > 1 && arf[1] == "Setting") {
						var os = (sCurrency === "\u00A3") ? o.UK : o.US;
						if (os !== undefined) o = os;
					}
					if ((per !== undefined) && (per.getDress() !== '')) {
						var od = o[per.getDress()];
						if (od !== undefined) o = od;
					} 
					obj = o;
				}
			}
		}
	} else if (st === "Church") {
		obj = oImages.Church[ar[1]];
		if (obj === undefined) obj = oImages;
	}
	// Is this an explicit image (base on the image passed in NOT isExplicit() ?? Why - experiment if we do
	var bExplicit = isExplicit(); //false;
	if (imgbase.indexOf("Explicit/") != -1) bExplicit = true;
	
	// Get the number of available images
	var no = 0;
	if (bExplicit) {
		if (obj.Explicit !== undefined) no = bGeneric ? getDecodedImageOCnt(obj.Explicit, img) : getImageOCnt(obj.Explicit, img);
	}
	if (no === 0) no = bGeneric ? getDecodedImageOCnt(obj, img) : getImageOCnt(obj, img);
	if (typeof no == "string" || typeof no == "object") {
		if (Array.isArray(no)) ar = no;
		else ar = no.split(",");
		if (ar.length !== 0) {
			var ari = imgbase.split("/");
			imgbase = ar[Math.floor(ar.length*Math.random())];
			if (ari.length > 1) {
				ari.pop();
				img = ari.join("/") + "/";
			} else img = '';
			
			if (imgbase.indexOf("-day") != -1) return img + imgbase.split("-day")[0] + "-day" + (ext === undefined ? '.jpg' : ext);
			else if (imgbase.indexOf("-night") != -1) return img + imgbase.split("-night")[0] + "-night" + (ext === undefined ? '.jpg' : ext);
			return img + imgbase + (ext === undefined ? '.jpg' : ext);
			
		} else no = 0;
	}
	if (no === 0) {
		if (noi === -9) return '';
		if (noi === -1) noi = 1;
		else if (noi === 0 || noi === undefined) return imgbase + (ext === undefined ? '.jpg' : ext);
		no = noi; 
	}
	
	// no is the count of images
	return getImageRandom(bGeneric ? imgbase + " " : imgbase, no, baseno, alpha, ext);
}


/***************** User interface ******************************************************************************/

function addImageString(img, widh, alg, imgbig, title, per, ph)
{
	if (img.indexOf("UI/") == -1 && img.indexOf("Images/") == -1) img = gameState.getImagesFolder() + img;
	if (!imgbig) imgbig = img;
	else if (imgbig.indexOf("UI/") == -1) imgbig = "Images/" + imgbig;
	img = img.replace(".mp4", ".jpg");
	
	if (gameState.bSex || sType.indexOf("charm") != -1) {
		if (gameState.sRecentImages.indexOf(img) == -1) {
			var ar = gameState.sRecentImages.split(",");
			ar = ar.splice(0, 8);		// First 9 elements
			ar.unshift(img);				// Add to start
			gameState.sRecentImages = ar.join(",");
		}
	}
	
	if (!ph) ph = "";
	var algo = alg + '';
	if (!alg) alg = gameState.bRightCol ? "right;margin: 0px 0px 4px 4px" : "left;margin: 0px 4px 4px 0px";
	else if (alg == "right" || alg == "rightpopup") alg = "right;margin: 0px 0px 4px 4px";
	else if (alg == "rightb" || alg == "rightbpopup") alg = "right;margin: 0px 0px 0px 0px";
	else if (alg == "left" || alg == "leftpopup") alg = "left;margin: 0px 4px 4px 0px";
		
	if (sCurrency === "\u00A3") {		// inlined isBritish()
		img = img.split("Setting/").join("UK/");
		imgbig = imgbig.split("Setting/").join("UK/");
	} else {
		img = img.split("Setting/").join("US/");
		imgbig = imgbig.split("Setting/").join("US/");
	}

	var sAuto = '';
	if (!widh) {
		if (gameState.bLeftCol) {
			if (img.indexOf(".mp4") != -1 || img.indexOf(".webm") != -1) sAuto = ' onloadedmetadata="onloadVideo(this)"';
			else sAuto = ' onload="onloadImage(this)"';	
		}
		widh = gameState.bRightCol ? "width:100%" : "width:95%";
	} else if (widh === "auto") {
		if (gameState.bLeftCol) {
			if (img.indexOf(".mp4") != -1 || img.indexOf(".webm") != -1) sAuto = ' onloadedmetadata="onloadVideo(this)"';
			else sAuto = ' onload="onloadImage(this)"';
		}
		widh = gameState.bRightCol ? "width:100%" : "width:95%";
	} else if (widh.indexOf("height:") == -1) {
		if (algo === "right") gameState.rFloat = widh;
		else if (algo === "left") gameState.lFloat = widh;
		//sAuto = widh;
		widh = isScreenSmall() ? "width:100%" : "width:" + widh;
		//if (algo.indexOf("popup") != -1 && sAuto != "100%") widh += ";max-height:80vh;overflow-x:hidden;overflow-y:hidden";
		//sAuto = '';
	} else if (widh === "height:max%") widh = widh = isScreenSmall() ? "width:100%" : "height:99%;max-width:50%;max-height:100%;width:auto";
	else if (widh === "height:maxm%") widh = widh = isScreenSmall() ? "width:100%" : "height:99%;max-width:66%;max-height:100%"; //"height:99%;max-width:66%;max-height:100%;width:auto;vertical-align:top";
	else if (widh === "height:maxw%") widh = widh = isScreenSmall() ? "width:100%" : "height:99%;max-width:80%;max-height:100%;width:auto";
	else if (widh === "height:max") widh = widh = isScreenSmall() ? "width:100%" : "height:95%;height:calc(100vh - 12px); height: -moz-calc(100vh - 12px); height: -webkit-calc(100vh - 12px)";
	var widi = (widh.indexOf("height:") == -1) && (widh.indexOf("-height:") == -1) ? 'width:100%' : 'height:100%';

	var st;
	if (alg == "center") st = '<div style="text-align:center"';
	else st = '<div style="text-align:left;float:' + alg + ';display:inline-block;position:relative;' + widh + '"';
	st += ' onmouseover="gameState.bNoClosePopup=true" onmouseout="gameState.bNoClosePopup=false">';
	// image files version
	//st += '<a style="float:' + alg + '; position:relative; display:inline-block;' + widh + '" href="' + imgbig + '" rel="lightbox">';
	//st += '<span class="zoom-icon" style="left:6px"><img src="UI/' + (img == imgbig ? 'zoom.png' : 'eye.png') + '" width="24" height="24" alt="Zoom"></span>';
	// base64 version
	if (ph !== 'noall') st += '<a draggable="false" style="height:100%;display:inline-block;position:relative;' + (alg == "center" ? widh : 'width:100%') + '" href="' + imgbig + '" onclick="onclickImage(this)"' + (img.indexOf(".mp4") != -1 || img.indexOf(".webm") != -1 || isScreenSmall() ? '>' : ' rel="lightbox">');
	var tp = 0;
	if (!isScreenSmall() && ph !== 'noall') {
		st += '<span class="zoom-icon" style="left:6px"><img draggable="false" src="data:image/png;base64,' + (img == imgbig ? 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEr0lEQVRIx62UbWjVZRiHr+f/dvZ69uLEuemaTufcNE0UmjNpWlkqEUJRCyVFDK2IWFBEnyQUsQ8R5ScLSTRtqDNkKZZrNJXNqWs6X6ZN287ZznGbm2c7b/+3pw9OGOQZlv7g/nhfF/fN89yCR48KrBZCVE0tKCjPm5yXJ6WUfr+/2+frbgT2Ar8Ckv+RuampaS1r39kof2s4Lbv8ARnoG5DBvgHp670jT55qkG++vU56PJ7fgeljG8UjwJdPm1Fc+9XX36bNnVNKZ3cv530DjNguABmGysKpEynMn0RzywU++mBLv9/XtQK48CiCWU9NK2reu/+gN+bAyb8CzCstZunMfLKSDQD6wnEaOrq4fr2TlSVTiEVGWFv1RiDY2/MMEBhXoBvGqX0HD1c6SelcMTXWPFuGpqoIMbZNIl1J3HY4dPpPyrMMAl2dvLth7QEp5VvKOPzy1a++VpmRnUPLsMuishn0RC38o9UTu1/+qI0vahGM25TPK6E+MMLMWbNZ+nzl60DReBN898OBQxuuxjRyy+aQnOxB1zU0VUGIB7sVSCSuBMdxsCyb4ZEY4Y6rZIwE+HDLpu1aIvrUgqdWZOfkMhCIYJgOyZqDB4HquKhC8GBLUoIjJZYrGYxY9A5FGIpI1heXkpae/nIiQXpe/pT8weFh7ulekkwHy3BJEi66ItBG6abrEnVcRiyHobhDKGoyOBwnYqtE4yb5UwpKEgnSVE0nalqM2C7Jpo1iu0jhYCoCMboaAFeCrih4DVBcDcfQsAwD0zTRDSM5kWA4EongURWsqIXjSgSgqwpJqoKuCNTRKRwpMV1JzHYQjkNMVYgLF0VRiITD4USCEV/X312KohbkuFE8SFIU8OoqKZqKRxGoyn2B7UpM1yUMWELgQZKvSyLRGH5f15WEz7S/L1h3+VIbc1MEwrLRXZcUAZm6QpZHI9sYLY+GV1NJEhLdcRCWTWmSpKXpLPFYrC6RQAC+X34+RK7ikBa5hxuzUGwbD5CuCjJ1hQxdIVURGNJFWDZO3GRCbIgMaXHi2JEosFtLAN9ZUflSddn8hcTiJgvSdTqGBjCTNBxdRVEF+v0/TNyysWMmZiSOHrrLLMOm5scaOm9c2wH4tIfBn3thVfWmze9TkDeJvNyJ1NWfZYbXwQkpxGQmnqQcUoWClGC5LrHBIbIiITKtELVHa6k7vP8o8AWA9i/4i6uq12/czOyZhWRneLly4xaX2y7SdrGFFavXUFxUSO9wP+H0NKSEUCiEHoly+doNThytka3Njd8D7wHOWIEAdi5ZvrJ6/cbNPF1SRG5ONsH+QXqC/Zw720hr0x+7WpsaF08vmTM/v2A6ad5MpIThe3fx3b7JrY72M5ZpbgVOPGznXy5aslx+s6dGNl1sl909QXm+7Zrc89MxWbHsFQlsG3vCgXXAp8AnQBVQON5V3la6YLH8fMcuWXu8QbZf75TNre2J4P85mjdr4seLKpaRlelFUQQ3b3fjC/Sxb89uztQf3w589liCSDh0yXWdBaZlc/NWF4P3QtTV1nD+TP1jwwFU13Ha7/T6qjImTNaC/Xc5eewIbecanwh8bCo0w3PBm5VjAlufJPgf1fU7s1g5rIEAAAAASUVORK5CYII=' : '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') + '" width="24" height="24" alt="Zoom"></span>';
		tp = 24;
	}
	var psh = 0;
	if (per !== undefined && per !== "" && ph !== "noinfo" && ph !== 'noall') {
		if (typeof per == "string") per = findPerson(per);
		per.visitThem();
		if (!per.shown) {
			if (per.isPersonInfo()) {
				per.infoid = gameState.nUId;
				gameState.nUId++;
				// Image files
				//st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="showPopupWindowNow' + per.infoid + '()" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img src="UI/information.png" width="24" height="24" alt="Info"></span>';
				// Base64
				st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="showPopupWindowNow' + per.infoid + '()" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img draggable="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAMAAAD51ro4AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAABwcHDw8PHx8fKysrMzMzQ0NDT09PV1dXZ2dna2trd3d3xcXFxsbGx8fHyMjIycnJysrK19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4ODg4eHh4+Pj5OTk5eXl5+fn6Ojo6urq7Ozs7e3t7+/v8fHx////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqvgvmAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAAEnIAABJyAV5lW+MAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTXdYP5PAAAQ/0lEQVR4Xu2dC1fbuhKFXdqetpwkEKDtpRQKCXD//y/s3SPJwW/NHj0Id7FXyyPYenyeGcmSLDd/q6pRKhxeSTWzO0HtTr9Cn31Np/RZ/n6KH07CSTVUB4JUH/r2yX9vms16tTp7+G9HD2er1XoT/tx8+ua/10FRHoID8O8/rk7NZrULlV7QbhVg/POvfC0PoiyEDoCz9WOoo1KP6zM5rwaIghCEgAewVlz+ae3Wcr4DUZBDKQhCwAPYh/qYtfcg8L8UhyIQWgLb36Eeyfq9LcmhAAQg+ILibu5DBTLpXqIlEi6AITeEYATbzAS87mEPJcwhL4RgBL9CoQvoVwlzyAnBI9g8hfIW0hPcIjOGfBA8gutQ1KK6zowhE4QQCopEgindZw0OeSCcNKcfmia5R8Bo3zQfTjNRyAEBZvCp2RYOBWM9bZFtFgzpEHwsqI5A9JQpNqRC8AiqOkJXcIoMGBIhIBg0zW0o0avotkEREikkQXDB4EcozavpR3JoSIDgPSGU5FWV6hN2CM4T7kIxXll3aT5hheA84SqU4Qh0leITRgjODMzjRSW0SzAGG4QTdFqPyAy8rlAoGwULBOcKvfHy49CD1SUMEJwrhHyPTEaX4CGIK1S5Ybbo2uQSLATnCq/WS45rb3EJEsIRu0Irg0twEI6yVRiKbyUoCMLgJmR1xLphKTAQhMFRdZDmtCMpEBCEwXPI5sj1zFFQQ3DNQsjjDYhqJLQQ3kCz0BfTSCghiCtchuTfiC71LqGD8AYZMBRUEITB95D0G9J3LQUNhDfKQE9BAeHNMlBTUEBAmH1z8aDVJQofqrGg+CHoIGRn8LxuV+l1tVmts3fGLjXdhSiE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" width="24" height="24" alt="Info"></span>';
				tp += 24;
				psh = 1;
			}
			per.shown = true;
		}
	}
	if (ph !== "") {
		//Image files
		//st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="setWallpaper(\'' + img + '\')" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img src="UI/wallpaperwhite.png" width="24" height="24" alt="Wallpaper"></span>';
		//Base64
		if (ph !== "none" && ph !== 'noall') {
			st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="setWallpaperRef(this)" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img draggable="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABuBAMAAAAdXgYKAAAAG1BMVEUAAAD+/v/+/v77+/z9/f38/Pz6+vr6+vv9/f6gZmltAAAAAXRSTlMAQObYZgAAAkhJREFUeNrtmF1ugzAMxwNjax8BcQASpnaPU8UBYDzsddoJKk5Q9QSddvFByzfBcextmibyEImq+cf5JbYTC7G2ta1tbX+peSqR4SGw7lR8G/9AGn3trgoedXTdHSuBgm5AkKhK4J1hwCEQ4p5jgAzfhMMyIPEFz4BDKGTCkxCSBzESEc+AXAQ8iIEIeBArAR7ESoAHMfwZiGnlplsGxF1Wu7lLh3i6BZqCDLGNdFSIaSPgUiHGbbAtiBA7gZIIsRNwiBC7fOEQIXYCLhFi1grccSGeuRDz7rcXZQNx1woMzvaDlTtPT+K++pA27hxPDEiBHdG788QV6m3ZWMXE+ih4crwt0iompup1nMKFUPSY6EP3GEximTK1TSytbyhqYolAz0AklgwMkQiIRwGtwQxxL8AQaYb43McXGsSsvxKTIKaDO3VBgagGAi4eopzHt4Uwr4eY9Tll9C4okBDTPhiEI4ESCfFS/bf59EcCrkVMLMfnuGk4iKqfLJo8js74xOKOI/zyGhYTSzlypFYAAzEcbPrsgXdGQPT7ydKZgIOA2IIfXnaW16CBOEit/vyRaoa47ydTmlduboR46h7Ek3OsX8McYn/28lgjsDVBHIB3tC/1DwPEwayeVsAxQIyNtQIDRHO1AYYYIgRAiDGi3gFCzMwCGwhihCm5SABijBFwAYgnjMAGgIgrGwEQcQIARJwAADFDFb4AiClG4HMtQPxKAcIK4j8ohXk8AzJcoWO5i/U3YHz3HUVZ1hq4heVLE2YfaRJP9SXuCzR7PxspD0TSAAAAAElFTkSuQmCC" width="24" height="24" alt="Wallpaper"></span>';
			if (ph.indexOf("photo") != -1) st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="gameState.bLBNoShow=true;usePhone(\'deletephoto\',' + ph.substr(5) + ');return false" class="zoom-icon" style="cursor:pointer;right:0px"><img draggable="false" src="UI/themes/theme0/delete.png" width="48" height="48" alt="Delete"></span>';
			else if (ph.indexOf("wallpaper") != -1) st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="gameState.bLBNoShow=true;usePhone(\'deletewallpaper\',' + ph.substr(9) + ');return false" class="zoom-icon" style="cursor:pointer;right:0px"><img draggable="false" src="UI/themes/theme0/delete.png" width="48" height="48" alt="Delete"></span>';
		}

	} else {
		//Image files
		//st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="setWallpaper(\'' + img + '\',\'Photo taken and set as your phone wallpaper\')" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img src="UI/camera-white.png" width="24" height="24" alt="Camera"></span>';
		//base64
		if (perYourBody.FindItem(2) > 0) st += '<span onmouseover="gameState.bLBNoShow=true" onmouseout="gameState.bLBNoShow=false" onclick="setWallpaperRef(this,\'Photo taken and set as your phone wallpaper\')" class="zoom-icon" style="cursor:pointer;left:6px;top:' + tp + 'px"><img draggable="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE8CAMAAABq2/00AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4ODg4eHh4uLi4+Pj5OTk5eXl5ubm5+fn6Ojo6enp6urq6+vr7Ozs7e3t7u7u7+/v8PDw8fHx8vLy8/Pz9PT09fX19vb29/f3+Pj4+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAAAAAAluOFBgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTXdYP5PAAAYR0lEQVR4Xu2deYAVxZnAawZQB5BLcbgcBC9EGBCIK7qYeG1WN8PhwSqSlVVxUUlAZTl0iGfUVTa4ImhURA2CUVcXRE0kJvEGBBEQBLmHYZiLGeZ6r6v6j9nvq/4ec7033e91V79uqF8MMK+r66vvN1Xd1edj9ZqU0fJcoOW5QMtzgZbnAi3PBVqeC7Q8F2h5LtDyXKDluUDLc4GW5wItzwVangu0PBdoeS7Q8lyg5blAy3OBlucCLc8FWp4LtDwXaHku0PJcoOW5QMtzQTrkjWLeM4rq9hWf5U3sRMmqoNNEiuIXfsqL9bgO51xx/aS7Z8x0zqxG0EcS/HnGXbdcf9XZJ1HdORTLF/yTl4u5dbrojqXfVwtTAKYp/3ICFD0KfSSxfjYFFzWblt4xorPP+nySl58DaZ10/oMbi6IxFbHk3SNMLrhp1hV/99DAE/E3REGV44u8bOwRHSd8VEXZKkMc+dPELIiVW19/J8VWiR/yclgm63nnHoHdQy3QA8XeX51m6VOPD/JgB9t2zLd1psENylEZ8PvhonbD2Hagz4ddr3J5UyGP4e/UGdgpPNrGJQZjAJG3hmb6sedQLa8DYyeML6XcfEOUjG+XwTKpDcpQLA92sl0WHVHe45rDRcWCbuoPO9TKg7nd6WsM9cO1OTB8+Ze9YINB7VCE0urhkOKszzk3/O95ZpSLz88Ee6NU7jdUyoMxO2yT8ulJIoTx3fAMlpGh0J5CeeCu7y7ue6+LAccd2/swlhlKeXkZrPfHsPGhXHwH5PGPezKWR+1RgDp5cCy7SsD0jnLxHWHATnfFCSp3GsqqZqzNvAjlkT6iTzKWQS3yHlXy8lnGpYfT1uti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" width="24" height="24" alt="Camera"></span>';
	}
	var pm = perMod;
	while (pm !== undefined) {
		st += pm.addImageIcon(img);
		pm = pm.perMod;
	}
	if (img.indexOf(".mp4") != -1 || img.indexOf(".webm") != -1) st += '<video width="100%" autoplay muted loop style="' + widi + ';margin: 0px 0px"' + sAuto + '><source src="' + img + '" type="video/' + (img.indexOf(".mp4") != -1 ? "mp4" : "webm") + '"></video>';
	else {
		st += '<img draggable="false" src="' + img + '" style="' + widi + ';margin: 0px 0px" alt="' + img + '" onerror="onerrorImage(this)"' + sAuto;
		if (title !== undefined && title !== "") st += ' title="' + title + '">';
		else st += '>';
	}
	st += ph === 'noall' ? '</div>' : '</a></div>';
	if (psh > 0) {
		gameState.nUId = per.infoid;
		psh = gameState.sRecentImages;
		st += addPopupWindow('string', per.getPersonName(), per.getPersonInfo(), undefined, undefined, true);
		gameState.sRecentImages = psh;
	}
	return st;
}

function onloadImage(el)
{
	var elleft = document.getElementById('mainleft');
	if (!elleft) return;
	var wid = el.naturalWidth;
	if (!wid) wid = el.width;
	var hei = el.naturalHeight;
	if (!hei) hei = el.height;
	var ncls;
	if (wid > hei) ncls = "td-left-med";
	else ncls = (gameState.sLeftColSize === "" ? "td-left" : gameState.sLeftColSize);
	//console.log("onload: wid: " + wid + " hei: " + hei + " new class:" + ncls + " old class: " + elleft.className);
	if (ncls !== elleft.className) elleft.className = ncls;
}
function onloadVideo(el)
{
	var elleft = document.getElementById('mainleft');
	if (!elleft) return;
	var ncls;
	if (el.videoWidth > el.videoHeight) ncls = "td-left-med";
	else ncls = "td-left";
	if (ncls !== elleft.className) elleft.className = ncls;
}

function onclickImage(el)
{
	if (isScreenSmall()) {
		event.preventDefault()
		return false;
	}
	var img = el.href;	
	if (!img) return true;
	if (img.indexOf(".mp4") != -1 || img.indexOf(".webm") != -1) {
		if (gameState.bLBNoShow) {
			event.preventDefault();
			return false;
		}
	}
	return true;
}

// Handle failed image loading
// ONCE
// .jpg will load as .gif
// other extensions will load as .jpg
// Next time try .mp4 as <video>
function onerrorImage(el)
{
	// The image being loaded
	//console.log('failed: ' + img);
	var img = el.src;
	if (img === undefined) return;
	if (el.getAttribute("data-img") === null) {
		el.setAttribute('data-img', img);
		el.setAttribute('data-oimg', img);
	}

	// work out extension and new extension
	var ar = img.split('.');
	var ext = ar[ar.length - 1].split('#')[0];	// Extension of the image
	if (ext == "jpg") ext = "gif";
	else if (ext == "gif") ext = "png";
	else ext = "jpg";
	ar[ar.length - 1] = ext;
	
	// Set the new image
	img = ar.join('.');		// New image with new extension
	el.src = img;
	//console.log('..try image ' + img);
	var ppn = el.parentNode;	// containing a
	if (!ppn) return;
	var rel = ppn.getAttribute('rel');	// Is a lightbox set
	if (rel != null && ppn.getAttribute("data-rel") == null) {
		// This is an image using lightbox, so set via AddImage etc
		ppn.setAttribute('data-rel', rel);
		if (ppn.nodeType == Node.ELEMENT_NODE && ppn.tagName.toLowerCase() === "a") ppn.href = img;
		el.onclick = function() { return onclickImage(this); };
	}
	if (ext != "jpg") {
		// Not jpg so loop and try again
		el.onerror = function() { onerrorImage(this); }		// not strictly needed
		return;
	}
	el.onerror = function() {
		// Failed to load the replacement image(s), try as mp4 video instead
		var imgv = this.src;
		var imgl = this.getAttribute('data-img');
		var imgo = this.getAttribute('data-oimg');
		if (!imgo) imgo = '';
		if (!imgl) imgl = '';
		var arv = imgv.split('.');
		arv[arv.length - 1] = "mp4";
		imgv = arv.join('.');
		var sAuto = '';
		if (this.onload !== null) sAuto = ' onloadedmetadata="onloadVideo(this)"';

		this.style.display='none';
		var myVid = document.createElement("span");
		myVid.style.width = "99%";
		var rel = this.parentNode.getAttribute('rel');
		var wd = this.parentNode.style.width;
		var ht =  this.parentNode.style.height;
		if (wd === undefined || wd === '') wd = this.style.width;
		if (ht === undefined || ht === '') ht = this.style.height;
		var ml = this.parentNode.style.marginLeft;
		if (ml === undefined || ml === '') ml = this.style.marginLeft;
		//console.log('..try video ' + imgv);
		//var imgwm = imgv.split(".mp4").join(".webm");
		myVid.innerHTML = 
			'<video id="viderr" autoplay muted loop style="' + (wd != '' ? 'width:' + wd + ';' : '') + (ht != '' ? 'height:' + ht + ';' : '') + 'max-width:100%;margin:0px 0px' + (ml !== "" ? ';margin-left:' + ml : '') + '"' + sAuto + '>' +
				'<source src="' + imgv + '" type="video/mp4" onerror="onerrorVideo(this)" data-img="' + imgl + '" data-oimg="' + imgo + '">' +
				//'<source src="' + imgwm + '" type="video/webm" onerror="onerrorLastVideo(this)" data-img="' + imgl + '" data-oimg="' + imgo + '">' +
			'</video>';
		if (this.parentNode.tagName.toLowerCase() === "a" && rel != null) {
			this.parentNode.removeAttribute("rel");	// Disable lightbox and open video in new tab
			this.parentNode.target = '_blank';
			this.parentNode.href = imgv;
			this.parentNode.onclick = function() { return onclickImage(this); };
		}

		this.parentNode.appendChild(myVid);
	};
}
function onerrorVideo(el)
{
	var vidn = el.parentNode;
	if (vidn.id === "viderr") {
		// What is the current extension and image?
		var img = el.src;
		if (img === undefined) return;
		var ar = img.split('.');
		var ext = ar[ar.length - 1].split('#')[0];	// Extension of the image
		if (ext === "mp4") {
			// A mp4, now try a webm
			ar[ar.length - 1] = "webm";
			// Set the new image
			img = ar.join('.');		// New image with new extension
			el.src = img;
			el.type = "video/webm";
			vidn.load();
			vidn.play();
			return;
		}
		// Not mp4 (should be webm) we have failed
		// Fall back to
		// - other Mods is we are showing a mod image
		// - base game if we are showing a mod image
		// - Natural image set for models with Younger/Natural sets
		// - from Explicit to non-explicit
		el.onerror = undefined;
		if (el.onloadedmetadata !== null) el.onloadedmetadata = undefined;
		var vimg = el.getAttribute('data-img');
		var oimg = el.getAttribute('data-oimg');
		if (!vimg) vimg = '';
		if (!oimg) oimg = '';
		//console.log('vimg = ' + vimg);
		var pn = vidn.parentNode;	// containing span
		var ppn = pn.parentNode;	// containing a
		if (!ppn) return;
		ppn.removeChild(pn);
		for (var i = 0; i < ppn.childNodes.length; i++) {
			var curChild = ppn.childNodes[i];
			if (curChild.nodeType == Node.ELEMENT_NODE && curChild.tagName.toLowerCase() === "img") {
				var imgv = curChild.src;
				var imgl = curChild.getAttribute('data-img');
				var imgo = curChild.getAttribute('data-oimg');
				if (!imgo) imgo = '';
				if (imgo != oimg) {
					//console.log("different " + imgo + " " + imgl + " " + imgv);
					curChild.onerror = undefined;
					continue;		// Skip other images in the same parent. Possible if images were just added using <img> tags, and not using AddImage/showPerson etc
				}
				//console.log('imgo = ' + imgo);
				if (imgv.indexOf("Mods/") != -1 || imgv.indexOf("Explicit/") != -1 || imgv.indexOf("Younger/") != -1) {
					if (imgv.indexOf("Younger/") != -1) imgv = imgl.split("Younger/").join("Natural/");	// Fallback from Younger to Natural
					else if (imgv.indexOf("Explicit/") != -1) imgv = imgo.split("Explicit/").join("");	// Fallback from Explicit to non
					else {
						// A Mod related image, move to next or fallback to base Images
						var s = getCurrMod(imgl);
						var m = getNextMod(s);
						if (m !== "") {
							imgv = imgo.split("Mods/" + s + "/").join("Mods/" + m + "/");
						} else {
							imgv = imgo.split("Mods/" + s + "/").join("");	// Fallback to base images
						}
						imgo = imgv;
						curChild.setAttribute('data-oimg', imgo);
					}
					curChild.setAttribute('data-img', imgv);
					var ar = imgo.split('.');
					var ext = ar[ar.length - 1].split('#')[0];	// Extension of the image
					if (ext === null) ext = "jpg";
					curChild.src = imgv.split('.gif').join('.' + ext).split('.jpg').join('.' + ext).split('.mp4').join('.' + ext).split('.webm').join('.' + ext);
					//console.log('..video failed try image ' + imgv.split('.gif').join('.' + ext).split('.jpg').join('.' + ext).split('.mp4').join('.' + ext));
					var rel = ppn.getAttribute('data-rel');
					if (rel) {
						ppn.href = curChild.src;
						ppn.setAttribute("rel", rel);	// enable lightbox
					}
					curChild.style.display = 'inline';
					curChild.onerror = function() { onerrorImage(this); }
					return;
				}	 
			}
		}
	}

	//mdCache.sLog += 'Failed to load <br>' + (el.src.split("/").join(" / ")) + '<br>and other extenstions';
}


// General error handler for <img> tags and <source> tags
document.addEventListener('error', function (event) {
	var tag = event.target.tagName.toLowerCase();
	if ((tag !== 'img') && (tag !== 'source') || event.target.onerror !== null) return;		// Not an <img> or it has an onerror attribute, leave it to handle this
	// An error for an <img> tag without an onerror attribute, use the standard handler above
	var evt = event.target;
	if (tag == "img") setTimeout(function() { onerrorImage(evt); }, 1);
	else setTimeout(function() { onerrorVideo(evt); }, 1);
}, true);


function addImageRandomString(imgbase, no, wid, alg, imgbig, title, baseno, per, ph, alpha)
{
	// Get actual image using a letter suffix a+
	var img = getImageO(imgbase, no, baseno, per, alpha);
	if (img === "") return "";
	//var img = getImageRandom(imgbase, no, baseno) + ".jpg";
	// process width, a comma separated list of widths for each possible element
	// if an element does not have a matching width, use the last width in the list
	if (wid !== undefined && wid !== "") {
		var ar = wid.split(",");
		if (ar.length > 1) {
			var idx = 1;
			if (idx > ar.length - 1) wid = ar[ar.length - 1];
			else wid = ar[idx];
		}
	}
	return addImageString(img, wid, alg, imgbig, title, per, ph);
}

function getImagePicked(img, act)
{
	var pos = img.indexOf('/' + act);
	if (pos == -1) return '';
	var pos2 = img.indexOf('.', pos + 1);
	if (pos2 == -1) pos2 = pos + act.length;
	return img.substring(pos + 1, pos2);		// "poledancea" etc
}

function AddImageGM(img, widh, alg, imgbig, title, per, doc, ph)
{
	var st = addImageString(img, widh, alg, imgbig, title, per, ph);

	if (doc === undefined) mdCache.write(st);
	else if (doc == "comments") addComments(st);
	else if (doc && doc !== "string" && doc !== "ss") doc.write(st);

	return st;
}

function AddImage(img, widh, alg, imgbig, title, per, doc, ph)
{
	img = getImageO(img, 0, 0, per);
	console.log(img);
	return AddImageGM(img, widh, alg, imgbig, title, per, doc, ph);
}

function AddImageNI(img, widh, alg, imgbig, title, per, doc)
{
	return AddImage(img, widh, alg, imgbig, title, per, doc, "noall");
}

function AddImageRandom(imgbase, no, wid, alg, imgbig, title, baseno, per, doc, ph, alpha)
{
	// Get actual image using a letter suffix a+
	var img = getImageO(imgbase, no, baseno, per, alpha);
	if (img === "") return "";
	//var img = getImageRandom(imgbase, no, baseno) + ".jpg";
	// process width, a comma separated list of widths for each possible element
	// if an element does not have a matching width, use the last width in the list
	if (wid !== undefined && wid !== "") {
		var ar = wid.split(",");
		if (ar.length > 1) {
			var idx = 1;
			if (idx > ar.length - 1) wid = ar[ar.length - 1];
			else wid = ar[idx];
		}
	}
	return AddImageGM(img, wid, alg, imgbig, title, per, doc, ph);
}

function AddImageArray(choices, wid, alg, imgbig, title, per, doc, ph)
{
	if (choices.length === 0) return '';
	var img = choices[Math.floor(choices.length*Math.random())];
	if (per != undefined) img = per.getImg(img);
	return AddImageGM(img, wid, alg, imgbig, title, per, doc, ph);
}

function addBackgroundImageString(img, alg, bInvert, sty)
{
	if (isInvisible()) return '';
	if (alg === undefined ||alg === "") alg = "87% 0%"; //"right";
	if (bInvert === true) sty = (sty === undefined ? '' : sty) + "-webkit-filter:invert(100%);filter:invert(100%)";

	var altimg1, altimg2;
	if (img.indexOf('.jpg') != -1) {
		altimg1 = img.split('.jpg').join('.gif');
		altimg2 = img.split('.jpg').join('.mp4');
	} else if (img.indexOf('.gif') != -1) {
		altimg1 = img.split('.gif').join('.jpg');
		altimg2 = img.split('.gif').join('.mp4');
	} else {
		altimg1 = img.split('.mp4').join('.jpg');
		altimg2 = img.split('.mp4').join('.gif');
	}
		
	if (alg == "fill") return "<style>.mainblock:before {content:' ';display:block;position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;opacity:" + (nTheme === 0 ? "0.2" : "0.8") + ";background-image:url(" + img + "),url(" + altimg1 + "),url(" + altimg2 + ");background-size:cover" + (sty !== undefined ? ";" + sty : "") + "}</style>";
	return "<style>.mainblock:before {content:' ';display:block;position:absolute;left:0;" + (isScreenSmall() ? "bottom:0" : "top:0") + ";width:100%;height:100%;z-index:-1;opacity:" + (nTheme === 0 ? "0.2" : "0.8") + ";background-image:url(" + img + "),url(" + altimg1 + "),url(" + altimg2 + ");background-repeat:no-repeat;background-position:" + alg + ";background-size:auto 100vh" + (sty !== undefined ? ";" + sty : "") + "}</style>";
}
function addBackgroundImage(img, alg, sty, doc)
{
	var st = addBackgroundImageString(img, alg, sty);

	if (doc === undefined) mdCache.write(st);
	else if (doc == "comments") addComments(st);
	else if (doc && doc != "string" && doc != "ss") doc.write(st);

	return st;
}

function addBGSuffix(img)
{
	if (!img) return img;
	var ar = img.split(".");
	var idx = ar.length - 1;
	var ext = ar[idx];
	if (ar.length > 1 && ['jpg', 'mp4', 'webm', 'gif', 'png'].indexOf(ext) >= 0) idx--;
	ar[idx] += perYou.isMaleSex() ? "b" : "g";
	return ar.join(".");
}

function addImageStringBG(img, widh, alg, imgbig, title, per, ph)
{
	return addImageString(addBGSuffix(img), widh, alg, imgbig, title, per, ph);
}

function toggleIcons() {
	gameState.nUseIcons++;
	if (gameState.nUseIcons > 2) gameState.nUseIcons = 0;
	saveGlobalSettings();
	showRightBar(gameState.nRightBarState);
}

function toggleColumns() {
	gameState.bDisableRightCol = !gameState.bDisableRightCol;
	saveGlobalSettings();
	dispPlace();
}


function toggleInventoryPopup() {
	gameState.nInventoryMode++;
	if (gameState.nInventoryMode > 2) gameState.nInventoryMode = 0;
	saveGlobalSettings();
	updateLeftBar();
	showRightBar(gameState.nRightBarState);
}

function toggleBubble() {
	gameState.bCommentLL = !gameState.bCommentLL;
	saveGlobalSettings();
}


var bPopupShown;
function addPopupWindow(md, title, txt, onclose, sty, blk, noclick, nocloseb, sb, idin)
{
	if (isBritish()) txt = txt.split("Setting/").join("UK/");
	else txt = txt.split("Setting/").join("US/");

	var id;
	if (!idin) id = gameState.nUId;
	else id = idin;
	
	if (sty === undefined) sty = '';
	else sty = ";" + sty.split("height:80%").join("height:80vh");
	var bWhite = sty.indexOf('background-color:white') != -1;		// TODO: maybe parse the colour?
	var stxt = bWhite ? 'color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white' : 'color:white;text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black';
	var st = '<div id="light' + id + '" class="white_content" style="text-align:left;' + (noclick !== true ? 'cursor:pointer;' : '') + (bWhite ? '' : 'background-color:black;') + stxt + sty + '"';
	if (txt.indexOf("'gblock'") != -1) {		// The opoup contains a query of some sort, a option button like addOptionLink
		noclick = true;
		nocloseb = true;
	} else if (noclick !== true) st += ' onclick="closePopupWindowNow' + id + '()"';
	if (txt.indexOf("z-index:") == -1) st += "><div style='height:98%;height:calc(100% - 1.5em);width:100%;cursor:pointer;margin-bottom:-4px;font-size:1.1em;margin-top:1.5em'>" + txt + "</div>";
	else st += ">" + txt + "</div>";
	
	if (title !== "") st += "<p style='z-index:83;position:absolute;top:0.6em;left:5%;width:86%;text-align:center;" + (noclick !== true ? "cursor:pointer" : "") + ";margin-top:-12px;font-size:x-large'><b>" + capitalize(title) + "</b></p>";
	if (nocloseb !== true && !isScreenSmall()) {
		var stxtg = bWhite ? 'color:grey;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white' : 'color:grey;text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black';
		st += '<a style="z-index:83;position:absolute;top:5px;left:5px;line-height:10px;' + stxtg + '" href="#" ' + (noclick ? 'onclick="closePopupWindowNow' + id + '();return false"' : '') + '>' + (noclick !== true ? 'click anywhere to close' : 'close') + '</a>';
	}
	st +=	"</div><script>function showPopupWindowNow" + id + "() {";
	if (sb !== false) st += "hideSidebars();";
	st += "document.getElementById('light" + id + "').style.display='block';";
	if (blk !== false) st += "document.getElementById('fadeblack').style.display='block';";
	st += "};function closePopupWindowNow" + id + "(){if(gameState.bNoClosePopup||gameState.bLBNoShow)return;";
	if (blk !== false) st += "var fb=document.getElementById('fadeblack');if(fb){fb.style.display='none';};";
	st += "sOldPlaceParams=sPlaceParams;var fl=document.getElementById('light" + id + "');if(fl){fl.style.display='none\'};setQueryParams();bPopupShown=false;"
	if (sb !== false) st += "showSideBars();";
	if (onclose !== "" && onclose !== undefined) st += onclose;
	st += "}</script>";
	if (!idin) gameState.nUId++;

	if (md === undefined || md === "top") mdCache.write(st);
	else if (md == "comments") addComments(st);
	else if (md && md !== "string" && md != "ss") md.write(st);

	return st;
}

function getPopupWindowClose() { return "closePopupWindowNow" + gameState.nUId + "()"; }

function showPopupWindow(title, txt, onclose, sty, blk, noclick, nocloseb, sb)
{
	if (bPopupShown) return '';
	if (onclose === undefined || onclose === "") onclose = "dispPlace()";
	bPopupShown = true;
	mdCache.write(addPopupWindow('string', title, txt, onclose, sty, blk, noclick, nocloseb, sb) + "<script type='text/javascript'>showPopupWindowNow" + (gameState.nUId - 1) + "()</script>");
}

function sctopFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

//***********************************
// Game Display

function writePageFooter(doc)
{
	if (doc.sPageRight !== "") doc.write(doc.sPageRight);		// fallback
	doc.write('</body></html>');
	doc.close();
}

function hideSidebars()
{
	gameState.bSidebarsHidden = true;
	hideLeftBar();
	hideRightBar();
	ClearComments(true);
}

function showSideBars(param)
{
	if (sComment !== '') WriteCommentsFooter(bChat);
	showLeftBar();
	showRightBar(-1 * gameState.nRightBarState, param);
}

function updateGameDisplay()
{
	updateRightBar();
	updateLeftBar();
	updateMain();
}


// Right Bar
	// right bar state
	// 0 - hidden
	// 1 - inventory
	// 1.1 - popup inventory
	// 2 - inventory min

function updateRightBar(shw)
{
	var rb = document.getElementById('rightbar');
	if (!rb) return;
	if (gameState.nRightBarState < 3) {
		if (gameState.nInventoryMode == 1 || (gameState.nInventoryMode == 2 && gameState.nRightBarState > 1)) shw = "none";
	}
	if (shw !== undefined) {
		rb.style.display = shw;
		if (shw == "none") return;
	}
	var rm = gameState.getRightBarWidth();
	rb.style.width = rm;
	rb.style.overflowY = (gameState.nRightBarState == 2 ? "hidden" : "auto");
	// Inventory or phone?
	mdCache.updateElement(rb, gameState.nRightBarState < 3 ? getInventoryContents() : getPhoneContents());
}

function hideRightBar()
{
	updateRightBar("none");
}

function showRightBar(no, param)
{
	if (Place == 1) return;
	gameState.bSidebarsHidden = false;
	var orbs = gameState.nRightBarState;
	if (no !== undefined) {
		gameState.nRightBarState = Math.abs(no);
		if (gameState.nRightBarState > 4) gameState.nRightBarState = orbs;
		orbs = -1;
	}

	if (orbs != gameState.nRightBarState) {
		if (gameState.nRightBarState < 3) {
			gameState.sPhoneState = '';
			updateRightBar("block");
		} else {
			if (param !== undefined) gameState.sPhoneState = 'type=' + param;
			else gameState.sPhoneState = '';
			//usePhone(param);
			updateRightBar("block");
		}
	}
	updateMain();
}

function shrinkRightBar()
{
	if (gameState.bSidebarsHidden || gameState.nInventoryMode == 1) return;
	var orbs = gameState.nRightBarState;
	if (orbs == 3) orbs = 1;
	else if (orbs == 4) orbs = 2;
	else if (orbs == 2) {
		orbs = 0;
		updateLeftBar();
	} else orbs = gameState.nInventoryMode == 2 ? 0 : 2;
	showRightBar(orbs);
}

function expandRightBar()
{
	if (gameState.bSidebarsHidden) return;
	var orbs = gameState.nRightBarState;
	if (orbs == 0) orbs = gameState.nInventoryMode == 2 ? 1 : 2;
	else if (orbs == 2) orbs = 1;
	else return;
	showRightBar(orbs);
}

// Left bar

function updateLeftBar(shw)
{
	if (Place == 1) shw = "none";
	var lb = document.getElementById('leftbar');
	if (!lb) return;
	if (shw !== undefined) {
		lb.style.display = shw;
		if (shw == "none") return;
	}
	gameState.bSidebarsHidden = false;
	var lm = gameState.getLeftBarWidth();
	lb.style.width = lm;
	lb.style.backgroundImage = 'url(' + getThemeFolder() + "background.jpg)";
	mdCache.updateElement(lb, getLeftBarContents());
}

function hideLeftBar() { updateLeftBar("none"); }
function showLeftBar() { updateLeftBar("block"); }

function toggleLeftBar()
{
	gameState.nLeftBarState = gameState.nLeftBarState == 1 ? 2 : 1;
	saveGlobalSettings();
	updateLeftBar();
	updateMain();
}
function peekLeftBar(max)
{
	var nLeft = gameState.nLeftBarState;
	gameState.nLeftBarState = max === true ? 1 : nLeft;
	saveGlobalSettings();
	updateLeftBar(undefined, max);
	updateMain();
	gameState.nLeftBarState = nLeft;
}
function shrinkLeftBar()
{
	if (gameState.bSidebarsHidden) return;
	if (gameState.nLeftBarState > 0) {
		if (gameState.nLeftBarState == 1) gameState.nLeftBarState = 2;
		else if (gameState.nLeftBarState == 2) gameState.nLeftBarState = 0;
	}
	updateLeftBar();
	updateMain();
}

function expandLeftBar()
{
	if (gameState.bSidebarsHidden) return;
	if (gameState.nLeftBarState != 1) {
		if (gameState.nLeftBarState == 2) gameState.nLeftBarState = 1;
		else if (gameState.nLeftBarState == 0) gameState.nLeftBarState = 2;
	}
	updateLeftBar();
	updateMain();
}

function getLeftBarContents()
{
	var dn;
	var hr = getHour();
	if (hr > 5 && hr < 8) dn = "sunrise";
	else if (hr > 17 && hr < 20) dn = "sunset";
	else dn = hr > 5 && hr < 20 ? "day" : "night";
	var tm = hr < 12 ? hr + "am" : hr == 12 ? "Noon" : (hr - 12) + "pm";

	var hm = hr > 12 ? hr - 12 : hr;
	var min = getTime() - (hr * 100);
	var ts = getDay(true) + " " + hm + ":" + (min < 10 ? "0" + min : min);
	var ph = perYourBody.FindItem(2);
	
	if (gameState.nLeftBarState == 2) {
		// Minimised left bar
		var ir = perYourBody.FindItem(32);
		return '<div id="lsd" style="width:100%" onmouseover="peekLeftBar(true);return false">' + getLSD() + '</div>' +
			'<img draggable="false" class="lsdimg" style="margin-top:-8px" src="' + getThemeFolder() + dn + 'black.png" alt="' + dn + '" title="' +  getDay() + (dn == "day" ? "" : " " + dn) + ', ' + tm + '">' +
			'<p style="font-size:xx-small;text-align:center;margin-top:-4px"><b>' + ts + '</b></p>' +
			'<div id="skore" style="width:100%">' +
			(gameState.nInventoryMode == 2 ? '<a draggable="false" class="lsdimg" href="javascript:toggleSpellList()"><img id="manaicon" draggable="false" class="lsdimg" src="' + getThemeFolder() + 'mana.png" style="width:99%" title="Mana ' + nMana +'" alt="Mana"></a>'
			: '<img id="manaicon" draggable="false" class="lsdimg" src="' + getThemeFolder() + 'mana.png" style="width:99%" title="Mana ' + nMana +'" alt="Mana">') + 
			'<p style="font-size:x-small;text-align:center;margin-top:-4px"><b>' + nMana + '</b>' +
			'<img id="moneyicon" draggable="false" class="lsdimg" src="' + getThemeFolder() + (isBritish() ? 'moneyuk' : 'moneyus') + '.png" style="width:99%" title="Cash ' + sCurrency + perYou.getCashOnHand() +'" alt="Money"><br><p style="font-size:x-small;text-align:center;margin-top:-4px"><b>' + sCurrency + perYou.getCashOnHand() + '</b></p>' +
			'</div>' +
			(ph > 0 ? '<a draggable="false" class="lsdimg" href="javascript:togglePhone()"><img id="phoneicon" draggable="false" src="' + getThemeFolder() +  (arSMS.length > 0 ? 'phonesms' : "phone") + '.png" style="width:99%;margin-top:4px" title="' + (arSMS.length > 0 ? 'SMS Available' : 'Phone') + '" alt="Phone"></a><br>' : '') +
			(gameState.nInventoryMode != 0 ? 
				'<a draggable="false" class="lsdimg" href="javascript:toggleInventory()"><img id="inventicon" draggable="false" src="' + getThemeFolder() +  'bag.png" style="width:99%;margin-top:4px" title="Inventory" alt="Inventory"></a>' + (ir > 0 ? '<a draggable="false" href="javascript:HandleItem(' + ir + ',2)"><img draggable="false" src="' + getThemeFolder() + 'ring.png" style="width:99%;margin-top:4px" title="Silver Ring" alt="Ring"></a>' : '')
			   : '') +
			'<br><a id="qsavelink" href="#" onClick="QuickSave();return false"><img draggable="false" src="' + getThemeFolder() + 'quicksave.png" style="display:block;width:66%;margin-left:auto;margin-right:auto;margin-bottom:2px;margin-top:4px" title="Quick Save" alt="Quick Save"></a>' +
			(gameState.bShowLoadSave ?
				'<a id="savelink" href="#" onClick="DoSave();return false"><img draggable="false" src="' + getThemeFolder() + 'save.png" style="width:99%;margin-top:4px" title="Save Game" alt="Save"></a>' +
				'<a href="#" onClick="DoLoad();return false"><img draggable="false" src="' + getThemeFolder() + 'load.png" style="width:99%;margin-top:4px" title="Load Game" alt="Load"></a>' : '') +
			(gameState.bAllowUndo ? '<br><a href="#" onclick="loadUnDo();return false"><img draggable="false" src="UI/' + (gameState.sUnDo === "" ? 'undo-grey' : 'undo') + '.png" style="width:99%;margin-top:4px" title="Undo" alt="Undo"></a>' : '') +
			'<span class="zoom-icon" style="bottom:20px;left:0px;width:' + gameState.getLeftBarWidth() + '"><img draggable="false" style="cursor:pointer;width:100%" onclick="toggleLeftBar()" src="data:image/gif;base64,R0lGODlhKAAoAOMKAKioqKmpqaqqqqurq6ysrLm5ubq6uru7u/39/f7+/v///////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAA8ALAAAAAAoACgAAAT+8Jkgqr046xzMO8JAbWR5BYMABqjpkuJothbLXuJrpqFc8zzdbOMTlooYpDFZQY2czaVrEGNRpcdaIKFQJG5R7OnU7fqUwmBvUFaI1OosJUCAvgXttcBZ3/tJMnEVeRlBaGE/eylUXF5XOTljOyGIbGWGFYs6KXMYKXlxnYKeI5ylFI0Jik0UPDQlIl5ts7RlXK87AbUKCF5cvbW4LrJdjcTGyAovQALJbQnGxbaU1LCITm1QYaOFpZSdeGVRrdTC3ThqhJlq5jiZJwBB6gMAPswbQa6R4V0/3u9ScuiCpmAONzEy1B1CWCEVIjE4fPhSlghiE0w1LOyz6AkgRw4jfs6E/JgRkI4WCy22QgGApIl431yCTFGgnUwRBSSk5NjhQQQAOw==" alt="Open" title="Show Details"></span>';
	}

	// Full size left bar

	var s = '<span class="zoom-icon" style="z-index:41;position:absolute;bottom:12px;left:50px"><img draggable="false" src="UI/' + dn + '.png" width="42" height="42" alt="' + dn + '" title="' + getDay() + (dn == "day" ? "" : " " + dn) + ', ' + tm + '"><p style="font-size:xx-small;text-align:center;margin-top:-4px"><b>' + ts + '</b></p></span>' +
		"<span class='zoom-icon' style='z-index:41;position:absolute;bottom:20px;left:0px'><img draggable='false' style='cursor:pointer;' onclick='toggleLeftBar()' src='" + getThemeFolder() + "collapse.png' width='24' height='24' alt='Close'  title='Hide Details'></span>" +
		"<script>" +
		"function swap(shw) {" +
			"document.getElementById(shw).style.display = 'block';" +
			"for (var i = 1; i < swap.arguments.length; i++) document.getElementById(swap.arguments[i]).style.display = 'none';" +
		"}" +
		"function MoveTo() {" +
			"var sPlace = document.getElementById('Cheating').moveTo.value.split('?')[0];" +
			"var sPar = document.getElementById('Cheating').moveTo.value.split('?')[1];" +
			"if (sPlace !== '') dispPlace(parseInt(sPlace, 10), sPar !== undefined ? sPar : '');" +
		"}" +
		"</script>" +
		"<div id='lsdbig' style='width:100%;' onmouseout='peekLeftBar(false);return false'>" + getLSD() + "</div><div id='skore' style='width:100%'>" +

		'<table style="width:100%;padding:2px;border-collapse:collapse;border-spacing:0"><tr><td style="width:50%;vertical-align:top;text-align:left;font-size:1em"><b>Mana:</b><br><input id="manaicon" type="text" name="ManaText" value="' + nMana + '" size=3 maxlength=3 disabled="disabled" title="Your current mana for spells" style="font-weight:bold;width:90%;font-size:1em"></td><td style="width:50%;vertical-align:top;text-align:left;font-size:1em"><b>Cash:</b><br><input id="moneyicon" type="text" name="CashText" value="' + sCurrency + perYou.getCashOnHand() + '" size=3 maxlength=4 disabled="disabled" title="How much cash you have on hand" style="font-weight:bold;width:90%;font-size:1em"></td></tr></table><b>' +
		(ph > 0 ? '<a id="phoneicon" draggable="false" href="javascript:HandleItem(' + ph + ',2)" style="font-size:small;font-size:0.8em">Use your Phone</a>' : '') +
		(gameState.nInventoryMode != 0 ? '<br><a id="inventicon" draggable="false" href="javascript:toggleInventory()" style="font-size:small;font-size:0.8em;margin-top:-8px">Check Inventory</a>' +  addPopupWindow('string', "Inventory", getInventoryContents(1), '', 'width:50%', false, true) : '') +
		"</b></div><div id='barmain' style='text-align:center;width:100%" + (gameState.bCheatShown ? ";display:none" : "") + "'>" +
			"<hr>" +
			"<p style='margin-top:-6px;font-size:small;font-size:0.8em'>" +
			"<span style='font-size:x-small'>Version " + getVersion() + "</span><br><b>" +
			"<a href='index.html' target='_top'>Home</a><br>" +
			"<a href='#' onClick='DoRestart();return false'>Restart Game</a><br><br>" +
			"<a id='qsavelink' href='#' onClick='QuickSave();return false'>Quick Save</a><br>" +
			"<a id='savelink' href='#' onClick='DoSave();return false'>Save game</a><br>" +
			"<a href='#' onClick='DoLoad();return false'>Load game</a><br><br>" +
			(gameState.bAllowUndo ? "<a href='#' onclick='loadUnDo();return false'>Undo Last Move</a><br><br>" : "") +
			"<a href='http://www.hypnopics-collective.net/smf_forum/index.php' target='_top'><i>Collective</i> Forum</a><br>" +
			"<a href='http://www.tfgamessite.com/phpbb3/index.php' target='_top'><i>TF Games Site</i></a><br><br>";

	s += "</b></p></div>" +
		"<div id='cheat'" + (gameState.bCheatShown ? "" : " style='display:none'") + ">" +
			"<p style='font-size:small;font-size:0.8em;margin-top:4px;margin-bottom:-8px'><b>Cheater!</b> " +
			"<a href='' onclick='gameState.bCheatShown=false;swap(\"barmain\",\"cheat\");return false'><img draggable='false' class='lsdimg' src='UI/stop.png' style='width:20%' title='Stop' alt='Stop'></a></p>" +
			"<form method='GET' id='Cheating' action='.'>" +
				"<p style='font-size:small;font-size:0.8em'>Add <a href='' onclick='AddCash(20);return false'>money</a><br>" +
				"Add <a href='' onclick='AddMana(10);return false'>mana</a><br>" +
				"Add <a href='' onclick='perYou.addExperience(9);dispPlace();return false' title='Experience'>XP</a><br></p>" +
				"<p style='text-align:center;font-size:small'>" +
				"<a href='' onclick='writePersonDetails();return false'>View People</a>" +
				"<br><a href='' onclick='writeItemDetails();return false'>View Items</a>" +
				"<br><a href='' onclick='writePlaceDetails();return false'>View Places</a>" +				
				"<br><a href='' onclick='toggleLocale();return false' title='Where in the world'>Swap Locale</a>" +
				"<br><a href='' onclick='if(!confirm(\"Warning: this can break your game?\")){return false;}else{togglePath();updateLeftBar();return false;}' title='Path'>" + getPathName() + "</a>" +
				"<br><a href='' onclick='if(!confirm(\"Change to mod " + toggleModNew() + "\")){return false;}else{toggleMod();return false}' title='Mod'>" + (gameState.sMod === "" ? "Base Game" : gameState.sMod + ' Mod') + "</a>" +
				"<br><a href='' onclick='toggleTaxis();updateLeftBar();return false'>" + (bTaxiAlways ? "Taxis more" : "Taxis less") + "</a>" +
				"<br><a href='' onclick='WaitHere(6);return false'>pass 1 hr</a>" +
				"<br><a href='' onclick='WaitHere(-6);return false'>back 1 hr</a>" +
				"<br><a href='' onclick='WaitHere(138);return false'>pass 1 day</a>" +
				"<br><a href='' onclick='WaitHere(-146);return false'>back 1 day</a>" +				
				"<br><a href='' onclick='WaitForDayNight();return false'>wait for " + (isDay() ? "night" : "day") + "</a>" +
				"<br><a href='' onclick='dispPlace(Place,\"type=selectmodels\");return false'>Pick Models</a>" +						
				"<br><br><a id='qsavelink' href='#' onClick='QuickSave();return false'>Quick Save</a>" +
				"<br><a id='savelink' href='#' onClick='DoSave();return false'>Save game</a>" +
				"<br><a href='#' onClick='DoLoad();return false'>Load game</a>" +
				(gameState.bAllowUndo ? "<br><br><a href='#' onclick='loadUnDo();return false'>Undo Last Move</a>" : "") +
				"</p><p style='font-size:small;font-size:0.8em;text-align:center'><b><span id='cplace'>" +
				"Your location <a href='#' onclick='dispPlace();return false'>" + Place + (sPlaceParams !== "" ? "?" + sPlaceParams : "") + "</a>" +
				"</span></b><br>" +
				"<a href='' onclick='MoveTo();return false'>Move To</a> <input type='text' id='moveTo' size='3' value=''></p>" +
			"</form>" +
		"</div>";
	return s;
}
// Player Character Image


function getLSD(wid, mgn)
{
	if (!wid) wid = "100%";
	if (!mgn) mgn = '';
	var sChar = perYou.getPersonName();
	if (sChar === "undefined" || sChar === '') return '';
	var sResult = '<p style="width:' + wid + ';float:right;font-family:Arial;color:' + (perYou.checkFlag(54) ? 'pink' : '#FF0000') + ';text-align:center;line-height:16px;margin-top:0px;' + mgn + 'font-size:' + (isScreenSmall() ? "1em" : "1.5em") + '">';
	var fldr = "Player/" + perYou.folder;

	// Male or Female or Possessed or Invisible or Charmed
	var img;
	if (isPossess()) img = perYourBody.getImg(perYourBody.getPossessionFace());
	else if (perYou.checkFlag(54)) img = 'Player/Bimbo/bimboface1';
	else img = fldr + "/" + (perYou.checkFlag(31) ? "face3" : "face1");
	sResult += "<img draggable='false' " + (isInvisible() ? "class='grayscale' " : "") + "src='Images/" + img + ".jpg' onClick='toggleLeftBar();return false' title='" + sChar + ", yourself" + (isInvisible() ? " Invisible" : "") + "' style='width:100%;max-width:30vw' alt='Yourself'>";
	if (gameState.nLeftBarState == 2) return sResult + "</p>";
	if (isPossess()) sResult += "<br><span style='cursor:pointer'><b>" + sChar + "<br>Possessed";
	else if (isInvisible()) sResult += "<br><span style='cursor:pointer'><b>" + sChar + "<br>Invisible";
	else sResult += "<br><span style='cursor:default'><b>" + sChar;
	return sResult + "</b></span></p>";
}

function updateLSD()
{
	var lsd = document.getElementById('lsdbig');
	if (!lsd) lsd = document.getElementById('lsdbig1');
	if (!lsd) return;
	mdCache.updateElement(lsd, getLSD());
}

// Central columns

function updateMain(s)
{
	var rm = gameState.getRightBarWidth();
	var lm = gameState.getLeftBarWidth();

	var mb = document.getElementById('mainbar');
	if (!mb) return;
	mb.style.width = 'calc(100% - ' + lm + ' - 10px - ' + rm + ')';
	mb.style.left = lm;
	//mb.style.margin = '0px ' + rm + ' 0px ' + lm;
	if (s !== undefined) mdCache.updateElement(mb, s);
}

function endMain(doc)
{
	if (gameState.bMainEnded) return;
	gameState.bMainEnded = true;
	if (!doc) doc = mdCache;
	
	if (gameState.sInvisibleChoices != '') {
		var s = startAlternatives("string", '...as you are inivisble') + gameState.sInvisibleChoices + endAlternatives("string");
		gameState.sInvisibleChoices = '';
		doc.sPage = doc.sPage.split(' id="startquestions">').join(' style="margin-top:-0.5em;margin-bottom:1.1em" id="startquestions">' + s);
	}
	if (gameState.sQuestionWidth !== '') doc.write('</div>');
	if (!gameState.bPeopleCol) doc.write('<p style="font-size:0.5em;margin-top:0;margin-bottom:0">&nbsp;</p>');
	doc.write('<div id="fadeblack" class="black_overlay" style="display:none"></div>');
}

function SetLeftColumnSize(size) { gameState.sLeftColSize = "td-left" + (size !== "" && size !== undefined ? "-" + size : ""); }

function AddRightColumn(doc, pclass)
{
	if (gameState.bRightCol) return;
	if (!doc) doc = mdCache;
	endMain(doc);
	if (pclass === undefined) pclass = gameState.sRightColSize !== "" ? gameState.sRightColSize : "td-right";
	//doc.write('</td><td class="' + pclass + '">');
	gameState.sRightColSize = pclass;		// SetRightColumnSize(pclass)
	gameState.bRightCol = true;
}
function AddRightColumnMed(doc) { AddRightColumn(doc, "td-right-med"); }
function AddRightColumnLarge(doc) { AddRightColumn(doc, "td-right-large"); }
function SetRightColumnSize(size) { gameState.sRightColSize = "td-right" + (size !== "" && size !== undefined ? "-" + size : ""); }

function showHintIconDelayed(id, txt, dn)
{
	var el = document.getElementById(id);
	if (!el) return;
	var pos = getPositionInWindow(el);
	var hid = document.getElementById("hinticond");
	if (!hid) return;
	if (dn === undefined) dn = false;

	var t = pos.top + (pos.height / 2) - (dn ? ((pos.top < (window.innerHeight / 2)) ? 0 : 80) : 32);
	var l = pos.left + (pos.width / 2) - (dn ? 32 : 2);
	var stxt = nTheme === 0 ? 'color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white' : 'color:white;text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black';
	
	if (txt === undefined) txt = '';
	else txt = "<p style='position:absolute;top:" + (t + (dn ? 80 - (pos.height / 2) : 0)) + "px;width:40px;text-align:right;left:" + (pos.left + (dn ? 0 : (pos.width / 2) + 20)) + "px;" + stxt + "'/>" + txt + "</p>";
	
	if (dn) hid.innerHTML = "<img src='UI/yellowarrowdown.png' " + (pos.top < (window.innerHeight / 2) ? "class='flip-vertical' " : "") + "style='height:80px;position:absolute;top:" + t + "px;left:" + l + "px'/>" + txt;
	else hid.innerHTML = "<img src='UI/yellowarrow.png' " + (pos.left < (window.innerWidth / 2) ? "class='flip-horizontal' " : "") + "style='width:80px;position:absolute;top:" + t + "px;left:" + l + "px'/>" + txt;
	hid.classList.remove("blinking");
	hid.offsetWidth = hid.offsetWidth;
	hid.classList.add("blinking");
	hid.style.display = "block";
}
function showHintIcon(id, txt, dn, ms)
{
	if (!gameState.bUIHints) return;
	
	if (ms === undefined) return showHintIconDelayed(id, txt, dn);
	setTimeout('showHintIconDelayed("' + id + '","' + (txt === undefined ? '' : txt) + '",' + dn + ')', ms);
}
function showHintIconP(txt, dn) { showHintIcon("phoneicon", txt, dn, 0) }
function showHintIconI(txt, dn) { showHintIcon("inventicon", txt, dn, 0) }

/***************** Content ******************************************************************************/

// Puzzles
function isPuzzles() { return gameState.bPuzzles; }

function togglePuzzles(val) {
	setPuzzles(val);
	saveGlobalSettings();
	alert("Puzzles are now " + (gameState.bPuzzles ? "on" : "off"));
}
function setPuzzles(val) {
	gameState.bPuzzles = val === undefined ? !gameState.bPuzzles : val;
}

// Explicit Images/Scenes
function isExplicit(base) {
	if (base === true || !gameState.bExplicit) return gameState.bExplicit;
	if (gameState.bExplicitNow === undefined) gameState.bExplicitNow = Math.random() < gameState.nExplicitRatio;
	return gameState.bExplicitNow;
}

function toggleExplicit(val)
{
	setExplicit(val);
	saveGlobalSettings();
	alert('Explicit content is ' + (gameState.bExplicit ? 'on' : 'off'));
}

function setExplicit(val)
{
	gameState.bExplicitNow = undefined;
	gameState.bExplicit = val === undefined ? !gameState.bExplicit : val;
}

// Locale
function isBritish() {
	return sCurrency === "\u00A3";
}
function getCurrencyName() {
	return isBritish() ? 'pounds' : 'dollars';
}
function getProsecutor() {
	return isBritish() ? "Crown Prosecutor" : "District Attorney";
}
function getOfficer(upr) {
	if (upr !== false) return isBritish() ? "P.C." : "Officer";
	return isBritish() ? "constable" : "officer";
}
function getPoliceChief() {
	return isBritish() ? "Chief Inspector" : "Police Chief";
}
function getShopStore(upr) {
	return upr === true ? (isBritish() ? 'Shop' : 'Store') : (isBritish() ? 'shop' : 'store');
}

function toggleLocale() {
	sCurrency = isBritish() ? "$" : "\u00A3";
	updateLocale();
	dispPlace();		// to refresh left bar
	alert(gameState.sTown + " is now in the " + (isBritish() ? "UK" : "US"));
}
function updateLocale() {
	if (gameState.sMod !== "" && perMod !== undefined) {
		var p = perMod;
		while (p !== undefined) {
			p.updateLocale();
			p.charmed = -1;
			p = p.perMod;
		}
	}
	getBaseItemObj(22).image = isBritish() ? "moneyuk.png" : "moneyus.png";
	gameState.sTown = findPerson("GlenvaleTown").name;
}

function getHoliday(hol) {
	var s = '';
	if (gameState.sMod !== "" && perMod !== undefined) {
		var p = perMod;
		while (p !== undefined) {
			if (p.getHoliday !== undefined) {
				var ss = p.getHoliday(hol);
				if (ss !== '') {
					s = ss;
					break;
				}
			}
			p = p.perMod;
		}
	}
	return s
}

// Paths
function isMurderPath(bSoft) {
	if (bSoft === true) return perGates.checkFlag(1) && perGates.other == 600;
	return perGates.checkFlag(1);
}
function isCharmedPath() { return !perGates.checkFlag(1) && perGates.other != 700; }
function isGoodPath() { return perGates.checkFlag(8); }		// Implicitly && isCharmedPath()
function isConspiracyPath() { return perGates.other == 700; }

function getPathName() {
	if (isConspiracyPath()) return "Conspiracy";
	if (isMurderPath(true)) return "Soft Murder";
	if (isMurderPath(false)) return "Hard Murder";
	if (isGoodPath()) return "Good Apprentice";
	return "Apprentice";
}

function togglePath()
{
	if (isCharmedPath() && !isGoodPath()) perGates.setFlag(8);	// Good
	else if (isGoodPath()) {
		perGates.setFlag(8, false);
		perGates.other = 700;	// Conspiracy
	} else if (isConspiracyPath()) {
		perGates.setFlag(8, false);
		perGates.other = 10;
		perGates.setFlag(1);		// Hard Murder
	} else if (isMurderPath(false) && perGates.other != 600) {
		perGates.other = 600;
		perGates.setFlag(1);		// Soft Murder
	} else {
		perGates.setFlag(1, false);
		perGates.other = 10;
	}
}

function isBeasleyServant() { return perBeasley.extra[0] > 0; }
function getBeasleyServant() { return perBeasley.extra[0]; }
function setBeasleyServant(no) { perBeasley.extra[0] = no; }

function updatePath()
{
	getBaseItemObj(4).image = isMurderPath() ? "UI/books/book2.png" : "UI/books/book1.png";
}

function isMainStoryComplete(stage)
{
	if (stage === undefined) stage = '';
	
	// Are any rivals/menaces resolved. Elian is not counted here
	if (!(isDavyDefeated() || perDavy.checkFlag(6))) return false;
	if (!isDemonQuestDone()) return false;
	if (!isRitualComplete()) return false;
	if (!isCharmedBy("MrBeasley")) return false;
	if (stage === "main") return true;

	// Partial control of the town
	if (!isCharmedBy("Tess") || !isCharmedBy("Angela") || !isCharmedBy("Emily") || !isCharmedBy("Mayor") || !isCharmedBy("OfficerBatton") || !isCharmedBy("Gina") || !isCharmedBy("Victoria")) return false;
	if (!isCharmedBy("Diane") && !per.isDead()) return false;
	
	if (stage === "town") return true;
	
	// Key events resolved	// Jessica (is she in the cellar and not freed or enslaved)
	findPerson("Jessica");
	if (per.place == 161 && per.getRivalry() >= 0) return false;
	// Miku (at least met her)
	if (wherePerson("Miku") === 0) return false;
	
	// Diane White (done Missing Document)
	//if (!checkPersonFlag("Diane", 15)) return false;	
	// Resolved Camryn (lost or freed)
	//if (wherePerson("Camryn") == 0 || wherePerson("Camryn") == 801) return false;
	// Leanne (not resolved, out of Mother Superiors room)
	//if (wherePerson("Leanne") == 450) return false;

	return true;
}


/****************** Staring the Game *******************************************************************/

function DoRestart(nm, fldr, init)
{
	if (sGender === "") {
		DoNewGame();
		return;
	}
	if (nm === undefined && perYou !== undefined) nm = perYou.name;
	if (fldr === undefined && perYou !== undefined) fldr = perYou.folder;

	var s = mdCache.getDocHead() + '<title>Mind Control Adventures - A Spell For All</title>' +
		'<link rel="stylesheet" type="text/css" href="' + getThemeFolder() + 'game.css">' +
		'<script type="text/javascript" src="Javascripts/compiled.js"></script>' +		
		'<script type="text/javascript" src="Javascripts/Visions/visions.js"></script>' +
		'<script type="text/javascript" src="Javascripts/Visions/Explicit/visions.js"></script>' +
		'<script type="text/javascript" src="Javascripts/images.js"></script>';
		
	if (gameState.sMod !== "") {
		var ar = gameState.sMod.split(",");
		for (var i = 0; i < ar.length; i++) {
			var itm = oModsDetails[ar[i]];
			s += '<script type="text/javascript" src="Mods/' + ar[i] + '/Javascripts/compiled.js"></script>';
			if (itm.id !== "") s += '<script type="text/javascript" src="Mods/details' + itm.id + '.js"></script>';
			//console.log(s);
		}
	} else if (sGender == "LoadGame") {
		var modlist = Object.getOwnPropertyNames(oModsDetails);
		for (var i = 0, ie = modlist.length; i < ie; i++) {
			var itm = oModsDetails[modlist[i]];
			if (itm.id !== "") s += '<script type="text/javascript" src="Mods/details' + itm.id + '.js"></script>';
		}
	}
	document.write(s +
		'<script type="text/javascript" src="Mods/details.js"></script>' +
		'<script type="text/javascript" src="Javascripts/config.js"></script>' +
		'</head>' +
		'<body style="overflow-x:hidden" onload="StartThis()">' +
		'<script>' +
			'function StartThis() {' +
				(gameState.sMod !== "" ? 'initialiseGame("' + gameState.sMod + '");' : 'initialiseGame();') +
				'perYou.name="' + nm + '";sGender="' + sGender + '";setExplicit(' + isExplicit(true) + ');perYou.folder="' + fldr + '";' +
				'sCurrency="' + sCurrency + '";setRunes(' + isRunes() + ');setPuzzles(' + isPuzzles() + ');' +
				'gameState.nRightBarState=' + gameState.nRightBarState + ';gameState.nLeftBarState=' + gameState.nLeftBarState + ';nTheme=' + nTheme + ';gameState.nUseIcons=' + gameState.nUseIcons + ';' +
				'gameState.bAllPlaces=' + gameState.bAllPlaces + ';gameState.bAllowUndo=' + gameState.bAllowUndo + ';gameState.sMod="' + gameState.sMod + '";gameState.nMaxPhotos=' + gameState.nMaxPhotos + 
				';gameState.nInventoryMode=' + gameState.nInventoryMode + ';gameState.bDisableRightCol=' + gameState.bDisableRightCol +
				';gameState.nExplicitRatio=' + gameState.nExplicitRatio + ';gameState.bUIHints=' + gameState.bUIHints +
				(init !== undefined && init !== '' ? '' + init : '') +
				';startGame();' +
			'}' +
		'</script>' +
		'</body>' +
		'</html>'
	);
	document.close();
}
console.warn = () => {};

function DoRestartAndLoad(slot, s)
{
	var sd = mdCache.getDocHead() + '<title>Mind Control Adventures - A Spell For All</title>' +
		'<link rel="stylesheet" type="text/css" href="' + getThemeFolder() + 'game.css">' +
		'<script type="text/javascript" src="Javascripts/compiled.js"></script>' +		
		'<script type="text/javascript" src="Javascripts/Visions/visions.js"></script>' +
		'<script type="text/javascript" src="Javascripts/Visions/Explicit/visions.js"></script>' +
		'<script type="text/javascript" src="Javascripts/images.js"></script>';
		
	//console.log(gameState.sMod);
	//console.log(oModsDetails);
	if (gameState.sMod !== "") {
		var modlist = Object.getOwnPropertyNames(oModsDetails);
		for (var i = 0, ie = modlist.length; i < ie; i++) {
			var itm = oModsDetails[modlist[i]];
			if (itm.id !== "") sd += '<script type="text/javascript" src="Mods/details' + itm.id + '.js"></script>';
			//console.log(sd);
		}
		var ar = gameState.sMod.split(",");
		for (i = 0; i < ar.length; i++) {
			var itm = oModsDetails[ar[i]];
			if (itm == undefined) continue;
			sd += '<script type="text/javascript" src="Mods/' + ar[i] + '/Javascripts/compiled.js"></script>';
			if (itm.id !== "") sd += '<script type="text/javascript" src="Mods/details' + itm.id + '.js"></script>';
			//console.log(sd);
		}
	}
	sd += 
		'<script type="text/javascript" src="Mods/details.js"></script>' +
		'<script type="text/javascript" src="Javascripts/config.js"></script>' +
		'</head>' +
		'<body style="overflow-x:hidden" onload="setTimeout(function(){gameState=new GameStatus();loadGlobalSettings(StartThis);},100)">' +
		'<script>' +
			'function StartThis() {' +
				//'initialiseGame();' +
				'arPeople=[];perMod=undefined;' +
				'gameState.sMod="' + gameState.sMod + '";' +
				(slot !== '' && slot != undefined ? 'Load("' + slot + '");' : 'loadGameString("' + s + '");' ) +
			'}' +
		'</script>' +
		'</body>' +
		'</html>';
		
	document.write(sd);
	document.close();
}

function addRestartLink(md)
{
	startQuestionsOnly('You can only:');
	addOptionLink(md, "Restart the Game", "DoRestart()");
	// Hide the Save Game link
	gameState.nLastOut = -1;
	var sItem = document.getElementById('savelink');
	if (sItem !== null) sItem.style.display = 'none';
	sItem = document.getElementById('qsavelink');
	if (sItem !== null) sItem.style.display = 'none';

	if (gameState.bAllowUndo) addOptionLink(md, "Try again", "loadUnDo()");
}

function DoNewGame()
{
	top.location = 'index.html';
}

function startGame()
{
	if (sGender == "LoadGame") {
		sGender = "";
		DoLoad(true);
	} else setTimeout(startGame2, 100);		// Needed for Chrome, probably for page loading
}

function resizeWindow()
{
	gameState.nWidth = getWidth(document);
	gameState.nHeight = getHeight(document);
	updateCSS();
	updateGameDisplay();
}
	
function startGame2()
{
	// The town
	updateLocale();
	
	if (gameState.bAllPlaces) {
		// Unlock all non-secret places
		setPlaceKnown("SchoolField");
		setPlaceKnown("DuckPond");
		setPlaceKnown('TownHall');
		setPlaceKnown("Police Station");
		//setPlaceKnown("FrenchClassroom");
		//setPlaceKnown("AnatomyClassroom");
		//setPlaceKnown("SacredClearing");
		setPlaceKnown("Alley");
		setPlaceKnown('Museum');
		setPlaceKnown("ShoppingCenter");
		setPlaceKnown("Hotel");
		setPlaceKnown('PoliceStation');
		setPlaceKnown("Hospital");
		setPlaceKnown("WildRanges");
		setPlaceKnown("MechanicsShop");
		setPlaceKnown("RathdownRd");
		setPlaceKnown("CheriseRd");
		setPlaceKnown("AmaranthPl");
		setPlaceKnown("DervishRd");
		setPlaceKnown("TVStation");
		setPlaceKnown("Aquarium");
		setPlaceKnown("Park");
		setPlaceKnown("Church");
		setPlaceKnown("Graveyard");
		setPlaceFlag("Park", 4);
		setPlaceKnown("NewAgeStore");
		setPlaceKnown("CelesteRd");
		setPlaceKnown("HavenApartments");
		setPlaceFlag("NewAgeStore", 3);
	}
	gameState.arNewPlaces = '';		// Suppress notifications of new places
	
	// Are you futa
	if (perYou.getPersonGender() == "futa") perYou.setFlag(32);
	if (perYou.isFuta()) {
		// Set futa reactions as you have been one before the game started
		findPerson("Bambi").setFlag(18);
		findPerson("Jessica").setFlag(39);
		findPerson("Miku").setFlag(36);
		findPerson("MissLogan").setFlag(7);
		findPerson("Daria").setFlag(13);
		findPerson("MrBeasley").setFlag(15);
		findPerson("MsJones").setFlag(18);
		findPerson("Mom").setFlag(39);
		findPerson("Tracy").setFlag(14);
		findPerson("Hannah").setFlag(18);
	}
	
	// Set some initial model selections based on locale
	findPerson("OfficerKhan");
	if (isBritish()) per.dress = "Loulou";
	else per.dress = "Madison";	
	findPerson("OfficerBatton");
	if (isBritish()) per.dress = "Katarina";
	else per.dress = "Breanne";
	findPerson("AdeleRoss");
	if (isBritish()) per.dress = "Adele";
	else per.dress = "Denise";	
	
	// Set people initially charmed
	findPerson("OfficerBatton");
	per.charmThem(4, "Davy");
	findPerson("Lola");
	per.charmThem(4, "Davy");
	findPerson("Charley");
	per.charmThem(4, "Davy");
	findPerson("Tracy");
	per.charmThem(1, "Davy");
	findPerson("MrsRobbins");
	per.charmThem(4, "Davy");
	findPerson("Melanie");
	per.charmThem(4, "Davy");	
	findPerson("Melissa");
	per.charmThem(4, "Davy");	
	findPerson("MrsTanika");
	per.charmThem(4, "Davy");
	findPerson("MsReagan");
	per.charmThem(4, "Davy");
	per.extra[0] = -1;
	per.other = nTime;	
	findPerson("Heather");
	per.charmThem(4, "Davy");

	// Initial display
	window.addEventListener("resize", resizeWindow);
	gameState.nLeftBarState = 2;
	showRightBar(-2);
	
	// Start the introduction
	gotoPlace(1);
}

function DoReturn()
{
	if (sGender === "") DoNewGame();
	else {
		showSideBars();
		dispPlace();
	}
}


//***************** Switches *************************************************************************

function checkBitFlag(flg, nOffSet)
{
	return (flg & (1 << (nOffSet - 1))) !== 0 ? true : false;
}

function setBitFlag(flg , nOffSet, nVal)
{
	nOffSet--;
	if (nVal !== false) return flg | (1 << nOffSet);
	else return flg & (~(1 << nOffSet));
}


/***************** Utilities ******************************************************************************/


function setQueryParams(qp)
{
	sType = (sPlaceParams.indexOf("showspells") != -1);
	sPlaceParams = qp === undefined ? '' : qp;
	if (sType) sPlaceParams += "&showspells=yes";
	sType = getQueryParam("type");
	sWho = getQueryParam("who");
}
function addQueryParams(qp)
{
	if (sPlaceParams === '') sPlaceParams = qp;
	else sPlaceParams = sPlaceParams + '&' + qp;
	sType = getQueryParam("type");
	sWho = getQueryParam("who");
}

function getQueryParams(qs)
{
	if (qs === undefined) qs = sPlaceParams;
	qs = qs.split("+").join(" ");

	var params = {};
	var tokens;
	var re = /[?&]?([^=]+)=([^&]*)/g;

	while (true) {
		tokens = re.exec(qs);
		if (!tokens) break;
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

function getQueryParam(val, qs)
{
	var param = getQueryParams(qs);
	if (param[val] !== undefined) return param[val];
	return "";
}


// Browser Detection
function get_browser_info() {
	var ua = navigator.userAgent;
	var tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return {	name:'IE ', version:(tem[1] || '') };
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem !== null) {
			return { name:'Opera', version:tem[1] };
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	tem = ua.match(/version\/(\d+)/i);
	if (tem !== null) M.splice(1, 1, tem[1]);
	return {	name: M[0], version: M[1] };
}

function isChrome() {
	var isChromium = window.chrome;
	return (isChromium !== null && isChromium !== undefined && window.navigator.vendor === "Google Inc.");
}
function isOpera() {
	var bw = get_browser_info();
	return bw.name === "Opera" || bw.name == "OPR";
}
function getIEVersion()
{
    var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return match ? parseInt(match[1]) : undefined;
}
function isMicrosoftEdge()
{
	return (/Edge\//i.test(navigator.userAgent));
}
function isSafari()
{
	return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
}

// Force redraw of an element
function redrawElement(el)
{
	if (el === undefined || el === null) return;
	if (!(isOpera() || isChrome())) return;
	if (el.style === undefined) return;

	//	Hide and reshow the element
	el.style.display='none';
	var a = el.offsetHeight; // no need to store this anywhere, the reference is enough, BUT to quiet JSHint we load into a variable
	el.style.display='block';

	//	Set the scale of the element to 1.
	//	This doesn't actually change anything visually,	because by default everything in the browser is set to scale 1
	el.style.webkitTransform = 'scale(1)';
}

// For browsers that do not support trim() yet
if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}

function hideCol(tblid, col)
{
	var tbl = document.getElementById(tblid);
	if (tbl === null) return;

	if (col < 0 || col >= tbl.rows[0].cells.length) return;

	for (var i = 0; i < tbl.rows.length; i++) {
		for (var j = 0; j < tbl.rows[i].cells.length; j++) {
			tbl.rows[i].cells[j].style.display = "";
			if (j == col) tbl.rows[i].cells[j].style.display = "none";
		}
	}
	redrawElement(tbl);
}

function getWidth(bd)
{
	var win = bd.defaultView || bd.parentWindow;
   var e = bd.documentElement;
   var g = bd.getElementsByTagName('body')[0];
   return win.innerWidth || e.clientWidth || g.clientWidth;
}

function getHeight(bd)
{
	var win = bd.defaultView || bd.parentWindow;
   var e = bd.documentElement;
   var g = bd.getElementsByTagName('body')[0];
   return win.innerHeight || e.clientHeight || g.clientHeight;
}
 
function isScreenSmall() { return gameState.nWidth < 770; } //return bMobile && (gameState.nWidth < (gameState.nHeight * 1.1)); }

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function capitalizeFull(s) {
	var ar = s.split(" ");
	var ss = '';
	for (var i = 0; i < ar.length; i++) {
		ss += capitalize(ar[i]);
		if (i < (ar.length - 1)) ss += ' ';
	}
	return ss;
}

function replaceBulk(str, findArray, replaceArray, pref, prer)
{
	if (!pref) pref = '';
	if (!prer) prer = '';
	var regex = [];
	var map = {}; 
	for (var i = 0; i < findArray.length; i++) {
		var p = pref + findArray[i];
		regex.push(p.replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1'));
		map[p] = prer + replaceArray[i];
	}
	regex = regex.join('|');
	return str.replace(new RegExp(regex, 'g'), function(matched) { return map[matched]; });
}

function replaceObject(str, oReplace, pref, prer)
{
	if (!pref) pref = '';
	if (!prer) prer = '';
	var regex = [];
	var map = {}; 

	var rep, p, iec;
	for (var i = 0, ie = oReplace.length; i < ie; i++) {
		rep = oReplace[i];
		if (rep.place !== undefined) {
			if (Object.prototype.toString.call(rep.place) === '[object Array]') {
				p = false;
				for (var ic = 0, iec = rep.place.length; ic < iec; ic++) {
					if (rep.place[ic] == Place) {
						p = true;
						break;
					}
				}
				if (!p) continue;
			} else if (rep.place != Place) continue;
		}
		if (rep.stype !== undefined) {
			if (rep.stype.indexOf("*") != -1) {
				if (sType.indexOf(rep.stype.split("*").join("")) == -1) continue;
			} else if (rep.stype != sType) continue;
		}
		if (rep.gender !== undefined) {
			if (rep.gender == "malesex") {
				if (perYou.getPersonGender() == "woman") continue;
			} else if (perYou.getPersonGender() != rep.gender) continue;
		}
		if (rep.dress !== undefined) {
			var ar = rep.dress.split("!");
			p = findPersonNC(ar[0]);
			if (p !== null && ar.length > 1) {
				if (p.dress != ar[1]) continue;
			}
		}	
		if (rep.locale !== undefined) {
			p = rep.locale + ',';
			if (p.indexOf("US") == -1 && isBritish()) continue;
			if (p.indexOf("UK") == -1 && !isBritish()) continue;
		}
		if (rep.changes !== undefined) {
			var rep2;
			for (var ic = 0, iec = rep.changes.length; ic < iec; ic++) {
				rep2 = rep.changes[ic];
				if (rep2.stype !== undefined) {
					if (rep2.stype != sType) continue;
				}
				if (typeof rep2.from == "function") p = pref + rep2.from();
				else p = pref + rep2.from;
				regex.push(p.replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1'));
				if (typeof rep2.to == "function") map[p]= prer + rep2.to();
				else map[p] = prer + rep2.to;
			}
		} else {
			if (typeof rep.from == "function") p = pref + rep.from();
			else p = pref + rep.from;
			regex.push(p.replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1'));
			if (typeof rep.to == "function") map[p]= prer + rep.to();
			else map[p] = prer + rep.to;
		}

		//str = str.split(pref + rep.from).join(prer + rep.to);
	}
	if (regex.length === 0) return str;
	regex = regex.join('|');
	return str.replace(new RegExp(regex, 'g'), function(matched) { return map[matched]; });
}

/*
// Force the document to re-layout - unused now
function resizeGame()
{
	var resizeEvent = window.document.createEvent('UIEvents'); 
	resizeEvent.initUIEvent('resize', true, false, window, 0); 
	window.dispatchEvent(resizeEvent);
}

function getOS()
{
	// This script returns a string as follows
	// "Windows"    for all versions of Windows
	// "MacOS"      for all versions of Macintosh OS
	// "Linux"      for all versions of Linux
	// "UNIX"       for all other UNIX flavors
	// "Unknown OS" indicates failure to detect the OS
	if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
	if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
	if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
	if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";

	return "Unknown OS";
}

function parseCSV(str)
{
    var arr = [];
    var quote = false;  // true means we're inside a quoted field

    // iterate over each character, keep track of current row and column (of the returned array)
    for (var row = col = c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        // current character, next character
        arr[row] = arr[row] || [];             // create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline and we're not in a quoted field, move on to the next
        // row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}

function RGB2Color(r, g, b) { return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b); }

*/

// Reload the CSS file for the current page
function updateCSS()
{
   var allsuspects = document.getElementsByTagName("link");

   for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to update
		if (allsuspects[i] && allsuspects[i].getAttribute("href") !== null) {
			allsuspects[i].href = getThemeFolder() + "game.css";
			break;
		}
   }
	redrawElement(document.body);
}

function changeBgImage(image, element) { element.style.backgroundImage = "url('"+image+"')"; }

// Suppress enter key
function stopRKey(evt) {
	evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text")) return false;
}

function getPositionInDocument(el) {
	 var rect = el.getBoundingClientRect(),
	 scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	 scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	 return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width: rect.width, height: rect.height } 
}

function getPositionInWindow(el) {
	 var rect = el.getBoundingClientRect();
	 return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
}

function MakeArray(n, fill)
{
	this.length = n;
	for (var i = 1 ; i <= n ; i++) this[i] = fill;
	return this;
}

function dec2bin(dec) { return (dec >>> 0).toString(2); }

function byte2Hex(n)
{
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

Object.prototype.clone = function () {
    var i, newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i === 'clone') {
            continue;
        }
        if (this[i] && typeof this[i] === "object") {
            newObj[i] = this[i].clone();
        } else {
            newObj[i] = this[i];
        }
    }
    return newObj;
};

/*
function loadJSON(jsonfile, callback) {
	// Usage:    loadJSON('mydata.json', function(response) {
	  // Parse JSON string into object
	  //var actual_JSON = JSON.parse(response);
	//});
	//
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', jsonfile, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState === 4 && xobj.status === 200) {
			// Required use of an anonymous callback
			// as .open() will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		} else callback(undefined);
	};
	xobj.send(null);
}
^/

/***************** Initialise ******************************************************************************/

/* Creates the variables - arrays that will later be accessed from other pages */

var gameState;

var sType;		// Convenience variable for place's - 'type' attribute/parameter
var sWho;		// Convenience variable for events  - 'who' attribute

function initialiseGame(mod)
{
	gameState = new GameStatus();

	sType = '';
	sWho = '';
	perMod = undefined;

	initialiseTime();	
	initialisePeople();
	initialisePlaces();
	initialiseItems();	
	initialisePhone();
	setConfig();
	setupMods(mod);
	updateLocale();
	updatePath();
}