/***************** People ********************************************************************************/
var per, p, ie, clv;		// Last found person

function Person(nm, plc, fldrin, drs, dance)
{
	this.uid = nm.split(" ").join("").split(".").join("").toLowerCase().trim();		// Just for efficiency of lookup (not saved)
	this.name = nm;			// Their name (not saved)
	this.folder = fldrin !== undefined ? fldrin : '';		// Folder in People for their images (not saved)

	this.place = plc === undefined ? 0 : plc;		// where are they
	this.flags = [0];		// arbitrary switches
	this.charmed = 0;			// switches when charmed. If this is -1 they are uncharmable
	this.charmedTime = 0;	// time when they were charmed
	this.sCharmedBy = '';	// Who has charmed them
	this.other = 0;			// arbitrary number
	this.extra = [0];			// more arbitrary data, default 1 entry. NOTE: saves limit this to a maximum length of 36 elements
	this.health = 100;		// How healthy they are

	this.Items = new MakeArray(0, 0);				// Inventory
	this.NoItems = 0; 		// Number of things in the inventory
	this.MaxItems = 10;		// Maximum number of items.

	this.dress = drs !== undefined ? drs : '';	// The subfolder of their current dress

	// Following variables are not saved
	this.shown = false;			// have they been shown
	this.infoid = 0;				// information popup id for current place
	this.sLastSexy = '';			// Last sms sent (non id based)

	// Functions
	
	// General state
	this.isDead = function() { return this.health === 0; };		// Their health
	this.isUndead = function() { return this.health < 0; };		// A Ghost, vampire etc
	
	// Number of hours since something, based on a variable passed in, defaults to this.other
	this.hoursSince = function(uv) {
		return Math.floor((nTime - (uv === undefined || isNaN(uv) ? this.other : uv)) / 12);
	};
	
	this.isLover = function() { return false; };		// Are they your lover, only set by overriding
	
	// what do they call you (Master,your name etc)
	this.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv < 2) return perYou.getPersonName();
		if (clv < 4) return "my Love";
		return perYou.getMaster();
	};

	// Charm state

	// Are the charmed by a specific person (defaults to "You")
	this.isCharmedBy = function(by) {
		if (this.charmed <= 0) return false;
		if (by === undefined) return this.sCharmedBy == "You";
		if (by.indexOf("!") != -1) return by.substr(1) != this.sCharmedBy;
		return by == this.sCharmedBy;
	};
	
	// What style of charm are the under (0 means not charmed, 4 is standard 'slave')
	this.getCharmedLevel = function(by) {
		if (this.charmed <= 0) return 0;
		if (by !== undefined) {
			if (this.sCharmedBy != by) return 0;
		} else if (this.sCharmedBy != "You") return -1;
		// following are inlined checkBitFlag calls
		if ((this.charmed & 8) !== 0) return 4;		// Slave
		if ((this.charmed & 1) !== 0) return 1;		// Minimal
		if ((this.charmed & 2) !== 0) return 2;		// Servant/friends with benefits
		if ((this.charmed & 4) !== 0) return 3;		// Not specified (character specific, commonly lover/girlfriend)
		if ((this.charmed & 16) !== 0) return 5;		// Other (generally cat/puppy)
		if ((this.charmed & 128) !== 0) return 8;		// Demon Slave
		return this.charmed;
	};
	
	// Are they charmed by anyone
	this.isCharmed = function() { return this.charmed > 0; };
		
	// Basic charm them (use rarely), mainly used to set a flag against their this.charmed variable
	this.charmThemF = function(no) {
		this.charmedTime = nTime;
		this.charmed = setBitFlag(this.charmed, no === undefined ? 4 : no);
	};
	// Charm them!
	// no = level, by - who (default You)
	this.charmThem = function(no, by) {
		this.charmed = 0;
		this.charmThemF(no);
		this.sCharmedBy = by === undefined || by === '' ? "You" : by;
	};
	// Remove the charm spell from them
	this.unCharmThem = function() {
		this.charmed = 0;
		this.charmedTime = 0;
		this.sCharmedBy = '';
	};
	// Number of hours they have been charmed
	this.hoursCharmed = function(by) {
		if (by !== "skip" && !this.isCharmedBy(by)) return 0;
		return Math.floor((nTime - this.charmedTime) / 12);
	};

	// Flags
	// A set of boolean flags, numbered 1 to x where x is at most 36 * 32
	// flag 64 is reserved to block SMS messages for this person

	// Return true if the flag is set
	this.checkFlag = function(no) {
		// Copy of checkBitFlag, copied here for speed
		var idx = Math.floor((no - 1) / 32);
		if (idx > this.flags.length) return false;
		return (this.flags[idx] & (1 << (no - 1 - (idx * 32)))) !== 0;
	};
	// Set the flag, pass false to nVal to reset the flag, if not passed then detaults to true
	this.setFlag = function(no, nVal) {
		var idx = Math.floor((no - 1) / 32);
		if (idx > this.flags.length) {
			for (var i = this.flags.length; i <= idx; i++) this.flags.push(0);
		}
		this.flags[idx] = setBitFlag(this.flags[idx], no - (idx * 32), nVal);
	};
	
	this.setFlagRange = function(no1, no2, nVal) {
		if (no2 < no1) {
			var i = no1;
			no1 = no2;
			np2 = t;
		}
		var idx2 = Math.floor((no2 - 1) / 32);
		if (idx2 > this.flags.length) {
			for (i = this.flags.length; i <= idx2; i++) this.flags.push(0);
		}
		for (i = no1; i <= no2; i++) this.setFlag(i, nVal);
	};

	// Are any of the flags between nof and not set?
	this.checkAnyFlags = function(nof, not) {
		if (not < nof) return false;
		for (var i = nof; i <= not; i++) {
			if (this.checkFlag(i)) return true;
		}
		return false;
	};
	
	// Are all of the flags between nof and not set?
	this.checkAllFlags = function(nof, not) {
		if (not < nof) return false;
		for (var i = nof; i <= not; i++) {
			if (!this.checkFlag(i)) return false;
		}
		return true;
	};	

	// Location

	// Are they here, with you now
	this.isHere = function() {
		if (isPossess() && this == perYourBody && this != perYou) return false;
		var w = this.whereNow(); 
		return w == Place || w == -1;
	};
	this.hasLeft = function() {
		//return (gameState.sWasHere.indexOf(this.uid + ',') != -1 && gameState.sIsHere.indexOf(this.uid + ',') == -1);
		return (gameState.sWasHere.indexOf(this.uid + ',') != -1 && !this.isHere());
	};

	// Where are they at the moment
	this.whereNow = function() { return this.place; };		// 'virtual' for abstract locations like 'home' for some people
	// Where are they at the moment, returns a string name/description
	this.whereNowNameBase = function() {
		//if (Place == 269 && sType.indexOf(p.uid + "pool") != -1) return "here at the pool with you";
		//if (this.isHere()) return "here with you!";
		if (this.place > 900) return "";
		var w = this.whereNow();
		if (w == 0) return "";
		var s = getPlaceName(w);
		if (s === "") s = getPlaceName(getLocation(w));
		if (s !== "") return "at the " + s;
		return "";
	};
	this.whereNowName = this.whereNowNameBase;
	
	// Relocate them to the selected location (can be an abstract number or a place number)
	this.moveThem = function(np) { this.place = np; };

	// Items

	// Return the state of the item in this persons inventory. NO existance test or range checking
	this.getInventoryItem = function(no) { return this.Items[no]; };

	// Function that drops objects from the inventory
	// Drop to a place or to another person, plc can be a number or can be a persons name
	this.DropItem = function(no, plc, nowi)
	{
		if (typeof no == "string") no = getItemNo(no);
		var bFnd = false;
		for (var i = 1; i <= this.NoItems ; i++) {
			if (this.Items[i] == no) {
				// On the i-th position is the object we want to get rid of
				if (!PlaceI(this.Items[i], plc)) return false;
				if (i != this.NoItems) {
					// If it is not the last object in the inventory
					for (var j = i; j <= (this.NoItems - 1); j++) this.Items[j] = this.Items[j+1];
				}
				var itm = getBaseItemObj(no);
				if (itm.drop !== undefined) itm.drop(this);
				this.NoItems--;
				bFnd = true;
			}
		}
		if (bFnd && nowi !== true) updateRightBar();
		return true;
	};

	// Drops everything 1-9 and 21+  (Spells are in the range 10 to 20, and are not dropped)
	this.DropAllItems = function(at)
	{
		var i;
		if (typeof at == "string") {
			// Handle item overflows
			// TODO should prevent players exceeding their max limits
			var perTo = findPerson(at);
			if (perTo !== null) {
				if (perTo.Items.length === 0) perTo.Items = new MakeArray(this.MaxItems, 0);
				if (this.NoItems > perTo.MaxItems) {
					for (i = perTo.MaxItems; i < this.NoItems; i++) {
						perTo.Items[i] = 0;
						perTo.length++;
					}
					if (this.NoItems > perTo.MaxItems) perTo.MaxItems = this.NoItems;
				}
			}
		}

		var itemlist = Object.getOwnPropertyNames(oBaseItems);
		for (i = 0; i < itemlist.length; i++) {
			var no = parseInt(itemlist[i], 10);
			if ((no < 10 || no > 20) && this.FindItem(no) > 0) {
				if (!this.DropItem(no, at, true)) return false;
			}
		}
		updateRightBar();
		return true;
	};

	// Function that puts objects into the inventory, it is not taken from the current location/person, it is just created as such
	this.AddItem = function(no, drp)
	{
		if (this.NoItems == this.MaxItems) {
			alert('You cannot carry more than ' + this.MaxItems + ' objects at the same time, you are not strong enough!');
			if (drp === true) PlaceI(no);		// Drop the item here
			return false;
		} else {
			if (typeof no == "string") no = getItemNo(no);
			if (no < 1) return;
			this.NoItems++;
			if (this.Items.length === 0) this.Items = new MakeArray(this.MaxItems, 0);
			this.Items[this.NoItems] = no;
			var itm = getBaseItemObj(no);
			if (itm.pickup !== undefined) itm.pickup(this);
			return true;
		}
	};

	// Function that puts objects into the inventory
	// The item is removed from whereever it is (anywhere at all) and placed in your inventory
	// NOTE: items you can have more than one, like the Old Stone, this will eliminate any that are dropped somewhere!
	this.PutItem = function(no, nore, nowr)
	{
		if (this.NoItems == this.MaxItems) {
			if (this == perYourBody) alert('You cannot carry more than ' + this.MaxItems + ' objects at the same time, you are not strong enough!');
			return false;
		}
		if (typeof no == "string") no = getItemNo(no);
		if (no < 1) return false;
		this.NoItems++;
		var itm = getBaseItemObj(no);
		if (itm.pickup !== undefined) itm.pickup(this);
		if (this.Items.length === 0) this.Items = new MakeArray(this.MaxItems, 0);
		this.Items[this.NoItems] = no;
		PlaceI(no, 0);	// Remove the item from the current location
		if (nowr !== true) updateRightBar();
		if (nore !== true) reShowItems();
		return true;
	};

	// Function that drops objects from the inventory
	// The item is destroyed, it is not placed anywhere
	this.RemoveItemSL = function(no)
	{
		if (no < this.NoItems) {
			// If it is not the last object in the inventory
			for (var j = no; j <= this.NoItems - 1; j++) {
				this.Items[j] = this.Items[j+1];
			}
		}
		this.Items[this.NoItems] = 0;		// Not strictly needed, helpful for debugging
		this.NoItems--;
		var itm = getBaseItemObj(no);
		if (itm.drop !== undefined) itm.drop(this);
		updateRightBar();
	};

	// Function that drops objects from the inventory
	// The item is destroyed, it is not placed anywhere
	this.RemoveItem = function(no)
	{
		var isl = this.FindItem(no);
		if (isl !== 0) this.RemoveItemSL(isl);
	};

	// Do you have the item in your inventory
	// A return of 0 means that you do not have the object in your INVENTORY
	// was originally function FindI(no) { return perYourBody.FindItem(no); }
	this.FindItem = function(no)
	{
		if (typeof no == "string") no = getItemNo(no);
		for (var i = 1, ie = this.NoItems; i <= ie; i++) {
			if (this.Items[i] == no) return i;
		}
		return 0;
	};

	// Move an inventory object up in line in the displayed inventory
	this.MoveIup = function(no)
	{
		if (no == 1) return;
		var it = this.Items[no];
		var iSwap = no - 1;
		for (var i = 1 ; i <= this.NoItems ; i++) {
			if (this.Items[i] == 4) continue;
			if (it > 9 && it < 21) {
				if (i == no || (this.Items[i] < 10 || this.Items[i] > 20)) continue;
			} else {
				if (i == no || (this.Items[i] > 9 && this.Items[i] < 21)) continue;
			}
			iSwap = i;
		}
		if (no <= iSwap) iSwap = no - 1;

		this.Items[no] = this.Items[iSwap];
		this.Items[iSwap] = it;

		updateRightBar();
	};

	// Move an inventory object down in line in the displayed inventory
	this.MoveIdown = function(no)
	{
		if (no == this.NoItems) return;

		var it = this.Items[no];
		var iSwap = no + 1;
		for (var i = 1 ; i <= this.NoItems ; i++) {
			if (this.Items[i] == 4) continue;
			if (it > 9 && it < 21) {
				if (i == no || (this.Items[i] < 10 || this.Items[i] > 20)) continue;
			} else {
				if (i == no || (this.Items[i] > 9 && this.Items[i] < 21)) continue;
			}
			iSwap = i;
			if (i > no) break;
		}
		if (no >= iSwap) iSwap = no + 1;

		this.Items[no] = this.Items[iSwap];
		this.Items[iSwap] = it;

		updateRightBar();
	};

	// Load/Save Person details

	this.savePerson = function()
	{
		var i, ie;
		var s = saveVar(this.uid) + saveVar(this.place);
		s += saveVarShortNo(this.flags.length);
		for (i = 0, ie = this.flags.length; i < ie; i++) s += saveVar(this.flags[i]);
		s += saveVar(this.dress);
		s += saveVar(this.charmed) + saveVar(this.charmedTime) + saveVar(this.sCharmedBy) + saveVar(this.other) + saveVar(this.health) + saveVarShortNo(this.extra.length);
		for (i = 0, ie = this.extra.length; i < ie; i++) s += saveVar(this.extra[i]);
		s += saveVar(this.NoItems);
		s += saveVar(this.MaxItems);
		if (this.NoItems > 0) {
			for (i = 1; i <= this.NoItems; i++) s += saveVar(this.Items[i]);
		}
		return s;
	};

	this.loadPerson = function(s, type)
	{
		// uid loaded in game.js (well sort of)
		var el, i;
		i = GetNo(s);
		if (i !== 0) this.place = i;
		el = GetNoShort(s);
		for (i = 0; i < el; i++) {
			if (i === 0) this.flags[i] = GetNo(s);
			else this.flags.push(GetNo(s));
		}
		var drs = GetStr(s);
		if (drs !== "") this.dress = drs;
		this.charmed = GetNo(s);
		this.charmedTime = GetNo(s);
		this.sCharmedBy = GetStr(s);
		this.other = GetNoStr(s);
		this.health = GetNo(s);
		// Extra array can vary in length depending on the person, default to 1 entry
		el = GetNoShort(s);
		var cel = this.extra.length;
		for (i = 0; i < el; i++) {
			if (i < cel) this.extra[i] = GetNoStr(s);
			else GetStr(s);
		}
		this.NoItems = GetNo(s);
		this.MaxItems = GetNo(s);
		if (this.NoItems === 0) {
			this.Items = new MakeArray(0, 0);
			return;
		}
		this.Items = new MakeArray(this.MaxItems > this.NoItems ? this.MaxItems : this.NoItems, 0); 	// Inventory  - Hard limit of 32 items...  "able" limit of 20, not counting spells
		for (i = 1; i <= this.NoItems; i++) this.Items[i] = GetNo(s);
	};

	// Show Images for the person
	this.getImageOCntRorX = function(img) {
		var obj = oImages.People[this.uid];
		if (obj === undefined) return 0;
		var cnt = 0;
		if (isExplicit()) {
			if (obj.Explicit !== undefined) cnt = getImageOCnt(obj.Explicit, img);
		}
		return cnt > 0 ? cnt : getImageOCnt(obj, img);
	};
	this.getImageOCntX = function(img) {
		var obj = oImages.People[this.uid];
		if (obj === undefined) return 0;
		return getImageOCnt(obj.Explicit, img);
	};
	this.getImageOCnt = function(img) {
		return getImageOCnt(oImages.People[this.uid], img);
	};
	
	// Get the path of an image for this person using the folder, dress etc for the person
	// the parameter img has some special characters/usage
	//   dress!imagename = use a specific dress for this person
	//   !imagename 		= do not use the dress folder for this person
	//   [person]image 	= use instead an image from "person". Mainly useful for sms messages, but usable anywhere
	//   these can be combined if needed, eg [person]!imagename
	//   img starting "GenericSex, Items, Player are a fallback for errors using the wrong person object
	this.getImg = function(img, dn, tdress, np) {
		if (!img) return img;
		if (img.indexOf("GenericSex/") != -1 || img.indexOf("Items/") != -1 || img.indexOf("Player/") != -1) return img;		// Show really using AddImage, but just in case we used showPerson() etc
		
		var sp = img.split("]");
		var s;
		if (sp.length > 1) {
			s = sp[0];
			if (s.charAt(0) == '!') s = s.slice(1);
			if (s.charAt(0) == '[') s = s.slice(1);
			s = findPersonNC(s);
			if (s !== null) return s.getImg(sp[1], dn, tdress, np);
		}
		
		s = '';
		if (img.substr(0, 9) == "Explicit/") {
			s = "Explicit/";
			img = img.substr(9);
		}
		
		// Special cases
		// dress!image
		// explicit dress set to use
		// !image will use NO dress set, the image is in the base folder
		sp = img.split("!");
		if (sp.length > 1) {
			img = sp[1];
			tdress = sp[0];
		}
		if (dn === true) {
			var ar = img.split(".");
			var ext = ar[ar.length - 1];	// Extension of the image
			if (ar.length > 1 && ['jpg', 'mp4', 'gif', 'png'].indexOf(ext) >= 0) {
				ar.pop();
				img = ar.join(".");
				ext = '.' + ext;
			} else ext = '';
			img = img + (isDay() ? '-day' : '-night') + (ext !== '' ? ext : '');
		}
		if (this.folder !== '') {
			if (np !== true) s = (this == perYou ? "Player/" : "People/") + this.folder + "/" + s;
			else s = this.folder + "/" + s;
		}
		//if (this.folder !== '') s = (this == perYou ? "Player/" : "People/") + this.folder + "/" + s;
		if (tdress !== undefined) {
			if (tdress !== '') return s + this.getDressBase(img) + tdress + "/" + img;
		} else if (this.getDress(img) !== '') return s + this.getDressBase() + this.getDress(img) + "/" + img;
		return s + this.getDressBase(img) + img;
	};
	this.getImgS = function(img, dn, tdress) { return this.getImg(img, dn, tdress, true); };
	//this.getImgX = function(img, dn, tdress) { return "Explicit/" + this.getImg(img, dn, tdress); };
	//this.getImgRorX = function(img, dn, tdress) { return (isExplicit() ? "Explicit/" : "") + this.getImg(img, dn, tdress); };
	this.showPerson = function(img, widh, alg, imgbig, title, dn, doc) { return AddImage(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonS = function(img, widh, alg, imgbig, title, dn) { return AddImage(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "string"); };
	this.showPersonAnon = function(img, widh, alg, imgbig, title, dn, doc) { this.shown = true; return AddImage(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), title, undefined, doc); };
	this.showPersonRandom = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	this.showPersonRandomS = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, alpha) { return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "string", undefined, alpha); };	
	this.showPersonRandomAnon = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { this.shown = true; return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };	
	this.showPersonX = function(img, wid, alg, imgbig, title, dn, doc) {	return AddImage(this.getImg("Explicit/" + img, dn), wid, alg, this.getImg(imgbig, dn), title, undefined, doc); };
	this.showPersonRandomX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg("Explicit/" + imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	this.showPersonRandomXAnon = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg("Explicit/" + imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, undefined, doc, undefined, alpha); };
	this.showPersonRorX = function(img, wid, alg, imgbig, title, dn, doc, alpha) { return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + img, dn), wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc, undefined, alpha); };
	this.showPersonRandomRorX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") +imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	this.showPersonDN = function(img, widh, alg, imgbig, title, doc) { return AddImage(this.getImg(img, true), widh, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc, alpha) { return AddImageRandom(this.getImg(imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	this.showPersonXDN = function(img, wid, alg, imgbig, title, doc) { return AddImage(this.getImg("Explicit/" + img, true), wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomXDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc, alpha) { return AddImageRandom(this.getImg("Explicit/" + imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	this.showPersonRorXDN = function(img, wid, alg, imgbig, title, doc) { return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + img, true), wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomRorXDN = function(imgbase, no, wid, alg, imgbig, title, baseno, doc, alpha) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, true), no, wid, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, baseno, this, doc, undefined, alpha); };
	
	this.showPersonString = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this); };
	this.showPersonRandomString = function(img, no, widh, alg, imgbig, title, baseno, dn, alpha) { return addImageRandomString(this.getImg(img, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, undefined, alpha); };		
	this.addPersonString = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonStringDN = function(img, widh, alg, imgbig, title) { return addImageString(this.getImg(img, true), widh, alg, this.getImg(imgbig, true), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonStringAnon = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, undefined, "noinfo"); };	
	this.addPersonRandomString = function(img, no, widh, alg, imgbig, title, baseno, dn, alpha) { return addImageRandomString(this.getImg(img, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", alpha); };	
	this.addPersonStringX = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg("Explicit/" + img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };	
	this.addPersonRandomStringX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn, alpha) { return addImageRandomString(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", alpha); };
	this.addPersonStringRorX = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg((isExplicit() ? "Explicit/" : "") + img, dn), widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonRandomStringRorX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn, alpha) { return addImageRandomString(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", alpha); };	
	
	this.showPersonArray = function(choices, widh, alg, imgbig, title, dn, doc) { return AddImageArray(choices, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonArrayX = function(choices, wid, alg, imgbig, title, dn, doc) {
		if (choices.length === 0) return '';
		var img = choices[Math.floor(choices.length*Math.random())];
		return AddImage(this.getImg("Explicit/" + img), wid, alg, imgbig, title, this, doc);
	};
	this.showPersonArrayRorX = function(choices, wid, alg, imgbig, title, dn, doc) {
		if (choices.length === 0) return '';
		var img = choices[Math.floor(choices.length*Math.random())];
		return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + img, dn), wid, alg, imgbig, title, this, doc);
	};	
	this.showPersonBG = function(img, widh, alg, imgbig, title, dn, doc) { return AddImage(this.getImg(addBGSuffix(img), dn), widh, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonXBG = function(img, widh, alg, imgbig, title, dn, doc) { return AddImage(this.getImg("Explicit/" + addBGSuffix(img), dn), widh, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRorXBG = function(img, wid, alg, imgbig, title, dn, doc) { return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + addBGSuffix(img), dn), wid, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, doc); };
	this.showPersonRandomBG = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg(addBGSuffix(imgbase), dn), no, wid, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonRandomRorXBG = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") + addBGSuffix(imgbase), dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	this.showPersonRandomXBG = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) { return AddImageRandom(this.getImg("Explicit/" + addBGSuffix(imgbase), dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc); };
	
	this.addPersonStringBG = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg(addBGSuffix(img), dn), widh, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, "noinfo"); };
	this.addPersonStringXBG = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg("Explicit/" + addBGSuffix(img), dn), widh, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, "noinfo"); };	
	this.addPersonStringRorXBG = function(img, widh, alg, imgbig, title, dn) { return addImageString(this.getImg((isExplicit() ? "Explicit/" : "") + addBGSuffix(img), dn), widh, alg, this.getImg(addBGSuffix(imgbig), dn), !title ? this.getPersonName() : title, this, "noinfo"); };

	this.showPersonRandomInt = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, false); };
	this.showPersonRandomIntAnon = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { this.shown = true; return AddImageRandom(this.getImg(imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, false); };	
	this.showPersonRandomIntX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg("Explicit/" + imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, false); };
	this.showPersonRandomIntXAnon = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg("Explicit/" + imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, undefined, doc, undefined, false); };
	this.showPersonRandomIntRorX = function(imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) { return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") +imgbase, dn), no, wid, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, doc, undefined, false); };
	this.addPersonRandomIntString = function(img, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg(img, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", false); };	
	this.addPersonRandomIntStringX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", false); };
	this.addPersonRandomIntStringRorX = function(imgbase, no, widh, alg, imgbig, title, baseno, dn) { return addImageRandomString(this.getImg((isExplicit() ? "Explicit/" : "") + imgbase, dn), no, widh, alg, this.getImg(imgbig, dn), !title ? this.getPersonName() : title, baseno, this, "noinfo", false); };	

	// Show an image for two people together 
	this.showPeople = function(perOther, img, widh, alg, imgbig, title, dn, doc) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImage(this.getImg(perOther.getImgS(img, dn), dn), widh, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, this, doc); 
	};
	this.showPeopleX = function(perOther, img, widh, alg, imgbig, title, dn, doc) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImage(this.getImg("Explicit/" + perOther.getImgS(img, dn), dn), widh, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, this, doc); 
	};	
	this.showPeopleRorX = function(perOther, img, widh, alg, imgbig, title, dn, doc) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImage(this.getImg((isExplicit() ? "Explicit/" : "") + perOther.getImgS(img, dn), dn), widh, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, this, doc); 
	};
	this.showPeopleRandom = function(perOther, imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImageRandom(this.getImg(perOther.getImgS(imgbase, dn), dn), no, wid, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, baseno, this, doc, undefined, alpha);
	};
	this.showPeopleRandomX = function(perOther, imgbase, no, wid, alg, imgbig, title, baseno, dn, doc, alpha) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImageRandom(this.getImg("Explicit/" + perOther.getImgS(imgbase, dn), dn), no, wid, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, baseno, this, doc, undefined, alpha);
	};
	this.showPeopleRandomRorX = function(perOther, imgbase, no, wid, alg, imgbig, title, baseno, dn, doc) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return AddImageRandom(this.getImg((isExplicit() ? "Explicit/" : "") + perOther.getImgS(imgbase, dn), dn), no, wid, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName() : title, baseno, this, doc);
	};	
	this.showPeopleString = function(perOther, img, widh, alg, imgbig, title, dn) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return addImageString(this.getImg(perOther.getImgS(img, dn), dn), widh, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName()  : title, this);
	};	
	this.addPeopleString = function(perOther, img, widh, alg, imgbig, title, dn) {
		if (typeof perOther == "string") perOther = findPersonNC(perOther);
		return addImageString(this.getImg(perOther.getImgS(img, dn), dn), widh, alg, this.getImg(perOther.getImgS(imgbig, dn), dn), !title ? this.getPersonName() + " " + perOther.getPersonName()  : title, this, "noinfo");
	};

	this.addPersonSimple = function(img, nd, esc, wid) {
		img = this.getImg(img);
		if (sCurrency === "\u00A3") img = img.split("Setting/").join("UK/");
		else img = img.split("Setting/").join("US/");
		if (!wid) wid = '';
		var ar = img.split(".");
		if (ar.length == 1) img += '.jpg';
		if (esc === true) return '<img src=\\\'' + gameState.getImagesFolder() + img + '\\\' style=\\\'float:left' + wid + ';margin:0 10px 2em 0\\\'' + (nd === false ? 'alt=\\\'' + this.uid + '\\\' title=\\\'' + this.getPersonName() + '\\\'' : '') + '>';
		return '<img src="' + gameState.getImagesFolder() + img + '" style="float:left' + wid + ';margin:0 10px 2em 0"' + (nd === false ? ' alt="' + this.uid + '" title="' + this.getPersonName() + '"' : '') + '>';
	};
	this.addPersonFace = function(esc, wid, full) {
		if (!wid) wid = ";width:20%";
		else wid = ";width:" + wid;
		return this.addPersonSimple(this.getPossessionFace(full), false, esc, wid);
	};
	this.showPersonFace = function(wid, alg, imgbig, title, doc) { this.showPerson(this.getPossessionFace() + '.jpg', wid, alg, imgbig, title, doc); };

	// Dress
	// This ie either
	// a) a dress worn in scenes like "White" or "Black" or "Turquoise"
	// b) the model used for all images, like "Zoey" or "Riley" for the character Zoey
	// Setting like UK/us is appended to the member 'folder' eg 'Adele/Setting' to use a UK/US subfolder of the Adele folder. Dress is applied after this
	// DressBase is a selector between folder and the dress, acting as a higher level selector. Currently used for seleting younger and older versions of a character, so folders like MrsGranger/Normal/Turquoise for folder/base/dress
	// To have a model selector usually this is set in dress. To use model + dress do exactly that 'Riley/DeliveryGirl' say
	this.getDress = function(img, sdrs) { return sdrs !== undefined ? sdrs : this.dress; };
	this.getDressBase = function(img) { return ""; };		// A base/common folder, could be 'Normal' where age changes happen, commonly blank
	this.getNextDress = function(drs) { return ''; };	
	this.getModels = function(bSel) { return ''; };		// A comma separated list of the models for this character, commonly available dresses but may involve base as well, e.g. Zoey,Riley
	
	// Information when clicking on their info icon, or used for an introduction
	// In general DO NOT override, do this with isPersonInfo and getPersonInfo
	this.showPersonInfo = function(doc) {
		if (this.isPersonInfo() && this.getPersonInfo() !== '') {
			if (this.shown) doc.write('<script type="text/javascript">showPopupWindowNow' + this.infoid + '();</script>');
			else this.infoid = showPopupWindow(this.getPersonName(), this.getPersonInfo(), '', '', false);
		}
	};
	
	this.pickModel = function(txt, img, drs1, drs2, chc1, chc2, stype, tit) {
		showPopupWindow(tit !== undefined ? tit : "Someone is there",
			(isScreenSmall() ? 
			  '<p>' + txt + '</p>' +
			  "<img src='Images/People/" + this.folder + "/" + this.getDress('', drs1) + "/" + img + ".jpg' class='imgpopup' alt='Who' title='" + img + "'><br>" +
			  "<img src='Images/People/" + this.folder + "/" + this.getDress('', drs2) + "/" + img + ".jpg' class='imgpopup' alt='Who' title='" + img + "'>"
			: "<img src='Images/People/" + this.folder + "/" + this.getDress('', drs1) + "/" + img + ".jpg' style='float:left;max-width:30%;max-height:100%;height:auto;margin-right:5px' alt='Who' title='" + img + "'>" +
			  "<img src='Images/People/" + this.folder + "/" + this.getDress('', drs2) + "/" + img + ".jpg' class='imgpopup' style='max-width:30%;;margin-left:5px' alt='Who' title='" + img + "'>" +
			  '<p>' + txt + '</p>') +
			//'<p>For a moment you are confused, is she the...' +
			addOptionLink("string", (isScreenSmall() ? '' : '&#8592; ') + chc1, "findPerson('" + this.uid + "').dress='" + drs1 + "';dispPlace(" + Place + (stype !== "" ? ",'type=" + stype + "'" : '') + ")", "chatblock", isScreenSmall() ? "left:5%;width:80%" : "width:30%;margin-left:35%") +
			addOptionLink("string", chc2 + (isScreenSmall() ? '' : '&#8594;'), "findPerson('" + this.uid + "').dress='" + drs2 + "';dispPlace(" + Place + (stype !== "" ? ",'type=" + stype + "'" : '') + ")", "chatblock", isScreenSmall() ? "left:5%;width:80%" : "width:30%;margin-left:35%"),
			'', '', true, true, true
		);
	};
	
	this.pickModelMore = function(txt, img, stype, tit) {
		var m = this.getModels(false);
		var ar = m.split(",");
		if (ar.length == 2) {
			var drs1 = '';
			var drs2 = '';
			var chc1 = '';
			var chc2 = '';
			for (i = 0; i < ar.length; i++) {
				ad = ar[i].split("|");
				if (i == 0) {
					drs1 = ad[0];
					chc1 = ad.length < 3 ? "left" : ad[2];
				} else {
					drs2 = ad[0];
					chc2 = ad.length < 3 ? "right" : ad[2];					
				}
			}
			if (drs2 !== '') this.pickModel(txt, img, drs1, drs2, chc1, chc2, stype, tit);
			return;
		}
		var i,ad;
		var s = isScreenSmall() ? '<p>' + txt + '</p>' : '<p>' + txt + '</p><p>For a moment you are confused, is she the...</p>';		
		if (!isScreenSmall()) {
			//console.log('not small');
			s += '<table style="width:100%"><tr>';
			for (i = 0; i < ar.length; i++) {
				ad = ar[i].split("|");
				if (ad.length > 2) s += '<td>' + addOptionLink("string", ad[2], "findPerson('" + this.uid + "').dress='" + ad[0] + "';dispPlace(" + Place + (stype !== "" ? ",'type=" + stype + "'" : '') + ")", "chatblock", "width:60%;margin-left:35%") + '</td>';
			}
			s += '</tr>';
		}
		for (i = 0; i < ar.length; i++) {
			ad = ar[i].split("|");
			if (isScreenSmall()) {
				s += "<img src='Images/People/" + this.folder + "/" + this.getDress('', ad[0]) + "/" + img + ".jpg' class='imgpopup' alt='Who' title='" + img + "'><br>";
			} else {
				s += "<td style='vertical-align:top'><a href='javascript:findPerson(\"" + this.uid + "\").dress=\"" + ad[0] + "\";dispPlace(" + Place + (stype !== "" ? ",\"type=" + stype + "\"" : '') + ")'><img src='Images/People/" + this.folder + "/" + this.getDress('', ad[0]) + "/" + img + ".jpg' style='float:left;max-width:99%;max-height:100%;height:auto;margin-right:5px' alt='Who' title='" + img + "'></a></td>";
			}
		}
		if (isScreenSmall()) {
			//console.log('small');
			s += '<p>For a moment you are confused, is she the...<br>';
			for (i = 0; i < ar.length; i++) {
				ad = ar[i].split("|");
				if (ad.length > 2) s += addOptionLink("string", ad[2], "findPerson('" + this.uid + "').dress='" + ad[0] + "';dispPlace(" + Place + (stype !== "" ? ",'type=" + stype + "'" : '') + ")", "chatblock", "left:5%;width:80%");
			}
		} else md.write('</tr></table>');
		showPopupWindow(tit !== undefined ? tit : "Someone is there", s, '', '', true, true, true);
	};	

	// Conversation
	this.addQuestionC = function(doc, lnk, chc, pclass) {
		if (pclass === undefined) pclass = "chatblock";
		addOptionLink(doc, lnk, "Converse('" + this.uid + "'," + chc + ")", pclass);
	};	
	this.addQuestionCO = function(doc, lnk, chc) { this.addQuestionC(doc, lnk, chc, 'optionblock'); };
	
	this.addQuestionR = function(doc, lnk, txt, js, par, rf, pclass) { addQuestionR(doc, lnk, txt, this.uid, js, par, rf, pclass); };
	this.addQuestionRF = function(doc, flag, lnk, txt, js, par, rf, pclass) {
		if (!this.checkFlag(flag)) addQuestionR(doc, lnk, txt, this.uid, (js !== undefined ? js + ';' : '') + 'setPersonFlag(\\\'' + this.uid + '\\\',' + flag + ')', par, rf, pclass);
	};
	this.addLinkToPlaceF = function(doc, flag, desc, plc, param, txt, js, pclass, psty) {
		if (!this.checkFlag(flag)) addLinkToPlace(doc, desc, plc, param, txt, this.uid,  (js !== undefined ? js + ';' : '') + 'setPersonFlag(\'' + this.uid + '\',' + flag + ')', pclass, psty);
	};
	this.addPopupLinkF = function(doc, flag, lnk, title, body, blk, onclose, noclick, pclass, psty) {
		if (!this.checkFlag(flag)) addPopupLink(doc, lnk, title, body, blk, (onclose !== undefined ? onclose + ';' : '') + 'setPersonFlag(\'' + this.uid + '\',' + flag + ');dispPlace()', noclick, pclass, psty);
	};		
	
	// Overloadable functions (Well any can be but these are intended)

	// Mod related overrides
	this.perMod = undefined;											// Linked list of mods. NOT SAVED
	this.replaceText = function(s, where) { return s; };		// Only called for mods to change text globally
	this.addMapLocations = function(map) { };						// Add map locations, strrets/buildings
	this.addMapIcon = function(plc, x, y) { return ''; };		// Add an icon to a map location
	this.addImageIcon = function(img) { return ''; };			// Add an icon to an image
	this.addModel = function(md, nm, img, desc) { return false; };	// Override credits list of models or add additional ones
	this.updateLocale = function()  { };							// Update the general town detai;s
	this.getHoliday = function(list) { return ''; }				// To say if it is a holiday today. None in the base game, mainly for use in setting dates in the phone
	
	// Pregnancy
	this.checkEndGamePregnancy = function() { return ''; };		// Do we show end game pregnancy? Return the event id to show for the pregnancy or '' for no pregnancy

	// Visiting
	// You have just visited them
	this.visitThem = function() {  };		// Can override for setting flags/events at certain places

	// Gender
	this.getPersonGender = function() { return "woman"; };

	this.isMaleSex = function() { return this.getPersonGender() != "woman"; };		// Male sex organs, could also have female ones too
	this.isMan = function() { return this.getPersonGender() == "man"; };		// Are they a man, and not female or futa
	this.isFuta = function(bXF) {
		// Are they a futa
		if (this.getPersonGender() != "futa") return false;
		if (bXF !== true) return false;
		return true;
	};
	this.isBornMale = function() { return this.getPersonGender() == "man"; };	// Generally override this if it can change
	this.getGenitals = function() { return this.getPersonGender() != "woman" ? "cock" : "pussy"; };		// Sex organs

	this.getManWoman = function() { return this.getPersonGender() == "man" ? "man" : "woman"; };
	this.getHeShe = function(upr) { return this.getPersonGender() != 'man'? upr === true ? "She" : "she" : upr === true ? "He" : "he"; };
	this.getHimHer = function() {	return this.getPersonGender() != 'man' ? "her" : "him"; };
	this.getHisHer = function() { return this.getPersonGender() != 'man' ? "her" : "his"; };
	this.getSex = function() { return this.getPersonGender() != 'man' ? "girl" : "boy"; };
	this.getMaster = function() { return this.getPersonGender() != 'man' ? "Mistress" : "Master"; };
	this.getSir = function() { return this.getPersonGender() == "man" ? "Sir" : "Ma'am"; };
	this.getLord = function() { return this.getPersonGender() == 'man' ? "My Lord" : "My Lady"; };
	this.getMiss = function() { return this.getPersonGender() == 'man' ? "Mr" : "Miss"; };
	this.getWitch = function(upr, slav) {
		if (slav === true) {
			if (upr === undefined || upr === false) return this.getPersonGender() == "man" ? "volkhov" : "vedma";
			return this.getPersonGender() == "man" ? "Volkhov" : "Vedma";
		}
		if (upr === undefined || upr === false) return this.getPersonGender() == "man" ? 'warlock' : 'witch';
		return this.getPersonGender() == "man" ? 'Warlock' : 'Witch';
	};

	this.getPersonAddress = function(n, k) { return n ? 0 : ""; };		// Their address

	// Their name, can vary if they are charmed
	this.isNameKnown = function() { return true; };						// Do you know their name?
	this.getPersonName = function(full) { return full !== true && this.sCharmedBy == "You" ? "Slave " + this.name : this.name; };		// Can be 'virtual' and overloaded to vary their name
	this.getPersonNameShort = function(uncharmed) { return this.name; };		// Abbreviated name or a nickname
	this.getPersonTitle = function() { return ""; };					// Title/description like 'Sir ' or 'your lover '

	// Information html block to show if the info icon is clicked or showPersonInfo is called
	this.isPersonInfo = function() { return false; };		// 'virtual' to be overloaded for any people who use this
	this.getPersonInfo = function() { };						// 'virtual' to be overloaded for any people who use this

	// Add a phone call/sms
	this.addPersonPhoneCall = function() { return false; };		// 'virtual' to be overloaded for any people who call the player. Return true to prevent any additional calls (generally for a phone call not an SMS)
	this.getPersonSMS = function(id) { return ''; };				// 'virtual' to be overloaded to get the text for a SMS for a given message
	this.isSMSImageDressVersion = function(id) { return false; };		// Does this vary by dress selected?
	this.isSMSImportant = function(id) { return false; };			// Is this important and cannot be blocked
	// Make a call/SMS
	// from is a text string for phone calls, the person's name
	// for SMS's it is a number id
	// txt is only used for phone calls
	this.makeCall = function(bSMS, from, txt, eok) {
		if (sType !== "" && eok !== true) return false;
		if (bSMS) {
			if (iNewSMS > 0) return false;
			if (this.checkFlag(64) && !this.isSMSImportant(from) || isPossess()) return true;		// SMS blocked but flagged as sent
			addSMS(from, true);
			iNewSMS = from;
			//nUnreadSMS = from;
		} else {
			if (isPossess()) return false;		// No phone calls when possessed
			receiveCall(from, txt, false);
		}
		return true;
	};
	// Default call events
	this.isKnowPhoneNumber = function() { return this.isCharmedBy(); };		// Do you know their phone number
	
	// Override this if they are not available at certain times or do not implement these events
	this.isPhoneable = function(msg) { 	// Can you call them?
		if (!this.isCharmedBy()) return false;
		if (msg === true) return true;
		if (checkPlaceFlag("Hotel", 11) && Place == 269) return true;		// Hotel pool
		return isAtLocation(282) && perJade.isDanceAvailable();				// Strip club
	};
	// Preferably replace/override this to customise the text for the calls
	this.callThem = function() {								// Phone them
		if (Place == 269) {
			gotoPlace(Place, 'type=' + this.uid + 'pool');
			receiveCall('','You call ' + this.getPersonName() + ' and invite them to join you at the pool, and ' + this.getHeShe() + ' agrees.'); 
			WriteCommentsFooter(bChat, bChatLeft);
		}
		if (isAtLocation(282)) this.addDancingCall();		
	};
	this.messageThemBase = function(type) {								// SMS them, default as if you can always message them
		if (type === "where") {
			var w = this.whereNow();
			var wm = this.getPersonAddress(true, true);
			var nm;
			if (Place == 269 && sType.indexOf(p.uid + "pool") != -1) nm = "here at the pool with you";
			else if (w == -1 || this.isHere()) nm = "right here with you";
			else if (w > 0 && w == wm) nm = "at home";
			else if (w == 46) nm = "in your bedroom";
			else nm = this.whereNowName();
			if (nm !== "" && this.isPhoneable(true)) {
				showSMSTemp(this, '"I\'m ' + nm + '"');
			} else WriteComments("&nbsp;After a while there is no reply, you guess they are busy" + (!this.isCharmedBy() ? " or do not want to talk to you" : "") + "?");
		} else if (type === "sexy") {
			var w = -1;
			function getSexyImage(p) {
				w = -1;
				var s = getImageO(p.isCharmedBy() || p.isLover() ? "smssexy" : "smsselfie", -9, 0, p);
				if (s === "") s = getImageO(p.isCharmedBy() || p.isLover() ? "!smssexy" : "!smsselfie", -9, 0, p);
				if (s === "" && (p.isLover())) s = getImageO("smsselfie", -9, 0, p);
				if (s === "") s = getImageO("!smsselfie", -9, 0, p);
				if (s === "" && (p.isCharmedBy() || p.isLover())) {
					s = getImageO("poledance", -1, 0, p);
					if (s !== "") w = 0;
				}
				return s;
			}
			var img;
			var i = 0;
			while (i < 4) {
				img = getSexyImage(this);
				if (img === '') break;
				if (this.sLastSexy !== '') {
					if (img != this.sLastSexy) break;
					i++;
					continue;
				}
				break;
			}
			if (img !== '' && this.sLastSexy !== '' && img == this.sLastSexy) img = '';
			if (img === "") WriteComments("&nbsp;After a while there is no reply, you hope they will send one later but maybe they have nothing" + (this.sLastSexy === '' ? '' : ' more') + '?');
			else {
				this.sLastSexy = img;
				showSMSTemp(this, '', (this.isSMSImageDressVersion(w) ? "" : "!") + img);
			}
		}
	};
	this.messageThem = this.messageThemBase;
	
	// Conversation
	this.Replies = undefined; //function(nR) { };		// Legacy for use by Converse() and addQuestionC()

	// If they are a vampire
	this.isVampyre = function() { return false; };			// Are they a vampire
	this.fedUponEvent = function(by) { return false; };	// Event if they are fed on by someone
	this.feedOnEvent = function(whoon) { };					// Event if they feed on someone
	this.enterChurch = function(plc, s) { return s; };		// Text returned when they try to enter the church/other holy place

	// Possession
	this.possessThem = function() { return false; };	// Called when the person is possessed. Return true if it is possible and works
	this.dispossessThem = function() { return true; };					// Called when the person is dispossessed, return true if the spell ends, false to prevent it
	this.getPossessionFace = function() { return this.uid + '-face'; };		// Image filename to display, no extension, it will always be .jpg

	// Passage of time
	this.passTimeNight = function() { return ''; };		// Called when night falls
	this.passTimeMidnight = function() { return ''; };	// Called after midnight
	this.passTimeDay = function() { return '';	};		// Called when day breaks
	this.passTimeHour = function(hr) { return '';	};	// Called every hour of the day

	// Add an image in the left column, the 'place' column
	this.addPlaceImageLeft = function(lit, other) { return ''; };		// 'virtual' to be overloaded to shown an image here. Return the text of the image html code (ie return of AddImage) or '' for no display

	// The image to show in the right column. Does any AddImage etc calls needed to show the image.
	// By default does nothing, overload to implement
	this.isPlaceImageRight = function() { return false; };
	this.showPlaceImageRight = function(md) { };

	// Events - called as a page/place is shown
	// in all cases return true if an event happens, false if nothing happens
	// Note: called every page, try to be efficient, avoid findPerson or complex iterations in testing if an event is needed where possible
	// - Event that replaces the page usually via type= parameter. Does not technically have to but should
	this.showEvent = function() { return false; };
	// - Event after page is built, uses popup window to show the event
	//   Also used in some cases to set a variable when a place is visited, just set variable and returns false
	this.showEventPopup = function() { return false; };
	
	// Event for dancing in the Avernus club
	this.bDanceDefault = (dance !== false);		// Simple flag that will add a question to ask them to dance before the sleep link in places where it can be asked. NOT SAVED
	
	// Add a link to ask them to dance in the strip club, ony shown if this is enabled and no one else is doing so tonight, and they are charmed
	this.addDancingLink = function(md, lnk, body, charm) {
		if (charm !== false && !this.isCharmedBy() ) return;		// Must be charmed in general
		if (!perJade.isDanceAvailable() || !isVisible()) return;						// Jade must allow it and only one person a day, and must be visible
		addQuestionR(md, lnk === '' || lnk === undefined ? 'talk to ' + this.getPersonName() + ' about dancing in the club' : lnk,
			body,
			this.uid,
			"perJade.setDancer(\\'" + this.uid + "\\')"
		);
	};
	
	this.addDancingCall = function(txt) {
		// Strip club
		perJade.setDancer(this.uid);
		dispPlace();	
		p = getClubManager();
		receiveCall('', txt !== undefined ? txt : ('You call ' + this.getPersonName() + ' and ask ' + this.getHimHer() + ' to join you at the Avernus club to dance for you. You make arrangements with ' + p.getPersonName() + ' for the dance.'));
		WriteCommentsFooter(bChat, bChatLeft);	
	}	
	
	this.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, nm + "'s Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but ' + this.getHeShe() + ' entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After ' + this.getHeShe() + ' collects ' + this.getHisHer() + ' tips and offers them to you, but you feel ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		if (checkPersonFlag('Jade', 13) && !perJade.checkFlag(12)) md.write('<p>Besides which your deal with Jade for Seraphina means this is a free dance anyway.</p>');
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + this.getHisHer() + ' dance', Place);
		WritePlaceFooter(md);
	};
	
	// Event when swimming in a pool
	// Can be from a phone call or adhoc swim
	// Can be at the hotel (place 269) or the Bartel house (423)
	this.showSwimming = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPerson("!pool.jpg");
		addPlaceTitle(md, "Swimming with " + nm);
		md.write(
			'<p>' + nm + ' arrives, dressed in a cute bikini, and she seductively poses for you before you go swimming together.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'say goodbye to ' + nm, Place);
		WritePlaceFooter(md);
	};
	
	// - Event when you go to bed for the night
	//   note either just set a variable, or use dispPlace(plc, params) to redirect to a page/event to happen when the sleep wondow closes
	//	  If you return true the standard wait for daytime DOES NOT happen, do it yourself in any event as needed
	//   wt is the time until you wake up in 5 minute units
	this.showEventSleep = function(wt, plc, s, param, who) { return false; };
	
	this.addSleepLink = function(md, lnk, title, body, img, white, plc, params, txt, sty, cnt, wid, js) {
		if (this.bDanceDefault && !gameState.bDanceLink) {
			if (getClubManager() != null) {
				this.addDancingLink(md, 'talk to ' + this.getPersonName() + ' about dancing in the club',
					'You ask ' + this.getPersonName() + ' about the Avernus club and about dancing there for you,</p>' +
					'<p>&quot;Of course ' + this.getYourNameFor() + ' I will do anything you ask!&quot; and with that you call ' + getClubManager().getPersonName() + ' to arrange a dance for ' + this.getPersonName() + '.'
				);
			}
			gameState.bDanceLink = true;
		}
		if (gameState.bSleepLink) return;
		addSleepLink(md, lnk, title, body, this.getImg(img), white, plc, params, txt, sty, cnt, this, wid, js);
		/*
		addQuestionRI(md, 'become visible and greet ' + this.getHimHer(),
			"<p>You end the spell and " + this.getPersonName() + " smiles, \"Hello " + perYou.getYourNameFor() + ", sorry I did not see you come in\".",
			this.uid,
			"endInvisibility()"
		);
		*/
		if (!isDay() || !isVisible() || this == perYou || this.uid == "lauren") return; // || (sType !== "" && sType.indexOf("private") == -1 && sType.indexOf("xxx") == -)) return;
		addOptionLink(md, "spend some time with " + this.getPersonName(), 'hangOut(&quot;' + this.uid + '&quot;)');

	};	
	this.addSleepLinkRandom = function(md, lnk, title, body, img, cnt, white, plc, params, txt, sty, wid) {
		this.addSleepLink(md, lnk, title, body, img, white, plc, params, txt, sty, cnt, wid);
	};
	
	// Any text to add for the current location?
	this.showPersonTextHere = function(doc) { };		// 'virtual' to be overloaded for any people who use this to add questions/actions for an area

	// Can you chat with a person
	// Add any questions/options to chat with them
	this.showPersonChat = function(doc) {  };			// 'virtual' to be overloaded for any people who use this to add questions/actions for an area

	// Add custom taxi destinations
	this.showPersonTaxi = function() { return ''; };			// 'virtual' to be overloaded for any people who add a custom taxi destination
	
	// Use an item, cast a spell
	// no is the standard item number, see oBaseItems in items.js
	// cmd 1=examine, 2=use, 3=give, 4=pickup, 5=drop
	// in practise 1,2,3 would only ever be handled.
	// return
	//		""				= not handled
	// 	"default"	= do the standard action for the item
	// 	"defaultnc"	= do the standard action for the item, but show no text, assumed to have been done here
	// 	"handled"	= action handled, any comments will be shown
	//  "public" = for spells (charm specificially), will show the message 'Don\'t cast the spell here. It is too public.'. Otherwise the same as "handled"
	// 	"nofooter"	= action handled, but do not show any comments, assumed to have been done internally
	// 	"nofooterrefresh" = as above, minor variation, and redisplay the current location (to alter conversation options or images)
	// 	"refresh"	= action handled and redisplay the current location (to alter conversation options or images)
	this.handleItem = function(no, cmd) { return ""; };			// 'virtual' to be overloaded for any people who use this to have a custom effect for an item
}

// Global function for person objects

// Get the object for a specific person via theur uid
function findPerson(ps)
{
	var s = ps.split(" ").join("").split(".").join("").toLowerCase().trim();
	if (per !== null && per.uid == s) return per;

	for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
		if (arPeople[i].uid == s) {
			per = arPeople[i];
			return per;
		}
	}
	if (s == "you") {
		per = perYou;
		return per;
	}

	// Alternate names
	if (s == "mothersuperior") return findPerson("Daria");
	if (s == "mayorthomas") return findPerson("Mayor");
	if (s == "keana") return findPerson("Ghost");
	if (s == "vampire") return perLilith;
	//if (s == "geraldine") return findPerson("MrsRobbins");
	//if (s == "doctortina" || s == "nursetina") return findPerson("DoctorKay");
	//if (s == "amy") return findPerson("AmyRoss");
	return null;
}

function findPersonNC(ps)
{
	p = per;
	var pr = findPerson(ps);
	per = p;
	return pr;
}

// Add a new person, for internal game use
function addPerson(nm, plc, fldr, drs, dance, charmable)
{
	per = new Person(nm, plc, fldr, drs, dance);
	if (charmable === false) per.charmed = -1;
	arPeople.push(per);
	return per;
}
// Add a new person at the top, so is checked for events etc first
function addPersonTop(nm, plc, fldr, drs, dance, charmable)
{
	per = new Person(nm, plc, fldr, drs, dance);
	if (charmable === false) per.charmed = -1;
	arPeople.unshift(per);
	return per;
}

function checkPersonFlag(ps, flg)
{
	if (findPerson(ps) !== null) return per.checkFlag(flg);
	return false;
}
function checkPersonFlagNC(ps, flg)
{
	p = per;
	var pr = findPerson(ps);
	per = p;
	if (pr !== null) return pr.checkFlag(flg);
	return false;
}
function setPersonFlag(ps, flg, nVal)
{
	p = per;
	var pr = findPerson(ps);
	per = p;
	if (pr !== null) pr.setFlag(flg, nVal);
}
function setPF(ps, flg, nVal) { setPersonFlag(ps, flg, nVal); }

function getPersonOther(ps, idx)
{
	if (findPerson(ps) !== null) {
		if (idx !== undefined && idx > 0) return per.extra[idx - 1];
		return per.other;
	}
	return 0;
}
function setPersonOther(ps, nVal, idx)
{
	if (findPerson(ps) !== null) {
		if (idx !== undefined && idx > 0) per.extra[idx - 1] = nVal;
		else per.other = nVal;
	}
}

function movePerson(ps, plc)
{
	if (findPerson(ps) !== null) per.moveThem(plc);
}

function wherePerson(ps)
{
	if (findPerson(ps) !== null) return per.whereNow();
	return 0;
}
function wherePersonNC(ps)
{
	p = findPersonNC(ps);
	if (p !== null) return p.whereNow();
	return 0;
}

function isPersonHere(ps)
{
	if (ps === undefined) {
		// is anyone here at all?
		var p;
		for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
			p = arPeople[i];
			if (p.place == -1) continue;
			if (p.isHere()) {
				if (p.uid == "ghost" && p.place == -64) continue;
				console.log("here: " + p.uid);
				return true;
			}
		}
	} else {	
		// same as wherePerson(ps) == Place
		if (findPerson(ps) !== null) return per.isHere();
	}
	return false;
}

function getTotalPeopleHere(nofollowers, plc)
{
	if (plc === undefined) plc = Place;
	var tot = 0;
	var p;
	for (var i = 0, ie = arPeople.length - 3; i < ie; i++) {
		p = arPeople[i];
		if (p.place == -1) {
			if (nofollowers === true) continue;
			if (plc == Place)	tot++;
		} else if (p.whereNow() == plc) tot++;
	}
	if (perKurndorf.whereNow() === plc) tot++;
	return tot;
}

function setPersonVisited(ps)
{
	if (findPerson(ps) !== null) per.visitThem();
}


function EnterChurch(plc, nogo)
{
	var s;
	if (plc == 318) s = "As you approach the entry to the church";
	else if (plc == 326) s = "As you approach the secret passage";
	else if (plc == 319) {
		if (nogo === true) s = "You cast the spell and you fade out and then appear in the courtyard of the Church.";
		else s = "As you approach the entry to the church";
	} else if (plc == 323) s = "As you approach the secret tunnel";
	else s = "As you enter";
	var bs = s;

	var p;
	for (var i = 0, ie = arPeople.length - 3; i < ie; i++) {
		p = arPeople[i];
		if (p.place == -1 && p.isVampyre()) s = p.enterChurch(plc, s);
	}

	if (s == bs) s = '';
	if (nogo !== true) gotoPlace(plc, undefined, s);
	return s;
}

function ShowPeople(so, txt)
{
	if (gameState.bNoPeople) return;
	var b = false;
	var p;

	// Images to show?
	for (var i = 0, ie = arPeople.length - 3; i < ie; i++) {
		p = arPeople[i];
		if (!b && p.isPlaceImageRight() && !p.shown && p.health !== 0) {
			if (so === true && p.whereNow() != -1 && !p.isCharmedBy("You")) continue;
			b = true;
		}
	}
	if (!b) return;

	var md = mdCache;
	if (!gameState.bRightCol) AddPeopleColumnMed(md, txt);
	else {
		b = gameState.bPeopleCol;
		AddPeopleColumn(md, gameState.sRightColSize, txt);
		if (b && Place != 192) md.write('<br>');
	}
	gameState.bPeopleCol = true;

	for (i = 0, ie = arPeople.length - 2; i < ie; i++) {
		p = arPeople[i];
		if (p.isPlaceImageRight() && !p.shown && p.health !== 0) {
			if (so === true && p.whereNow() != -1 && !p.isCharmedBy("You")) continue;
			p.showPlaceImageRight(md);
		}
	}
}

function ShowPopupEvents(np)
{
	if (bPopupShown || (sComment !== '' && sType.indexOf("dream") == -1)) return;
	
	if (getQueryParam("showinventory") !== "") {
		gameState.nRightBarState = 1.1;
		sPlaceParams = sPlaceParams.split("&showinventory=yes").join("");
		showPopupWindow("Inventory",
			getInventoryContents(1),
			'gameState.nRightBarState=1;dispPlace(Place,sOldPlaceParams)',
			isScreenSmall() ? 'width:65%' : 'width:50%', false, true, true);
		return;
	} else if (getQueryParam("showspells") !== "") {
		sPlaceParams = sPlaceParams.split("&showspells=yes").join("&showspells=" + gameState.nUId);
		showPopupWindow("",
			getInventoryContents(2),
			'dispPlace(Place,sOldPlaceParams)',
			'width:50px;left:' + gameState.getLeftBarWidth() + ';top:20%;height:66%', false, true, true, false);
		return;		
	} 
	if (np === true) return;
	
	if (getQueryParam("playagame") !== "") {
		// Initial time you play a game in your phone
		perYourBody.setFlag(15);
		sPlaceParams = sPlaceParams.split("&playagame=yes").join("");
		showPopupWindow("Games",
			"<img src='UI/phonegame.jpg' style='width:40%;float:right;margin-left:5px' alt='Games'>" +
			'Your phone has some simple games installed, very simple as your phone is fairly basic.<br><br>' +
			'When you play a game an Autosave will be immediately done and you will take 1 hour to play the game (no matter how long you actually play for)',
			'dispPlace(Place,sOldPlaceParams);usePhone(\'games\')'
		);
		return;
	}

	// Does a custom event happen - post standard location in a popup?
	var p;
	// One event only is allowed
	for (var i = 0, ie = arPeople.length; i < ie; i++) {
		p = arPeople[i];
		//console.log('popup: ' + p.uid + " " + Place);
		if (p.showEventPopup()) {
			//console.log('event for ' + p.uid);
			return;
		}
	}

	if (bPopupShown || perYourBody.FindItem(2) === 0 || isCommentsShown()) return;	// sPlaceParams !== '' || 

	// Any phone calls?
	for (i = 0, ie = arPeople.length - 2; i < ie; i++) {
		// any incoming phone calls
		p = arPeople[i];
		if (!p.isHere()) {
			if (p.addPersonPhoneCall()) break;
		}
	}
	if (iNewSMS > 0) {
		if (!checkPersonFlag('Glenvale',36)) newSMS();
		else playSound('sms.mp3');
		return;
	}
	
	// Any new locations
	if (gameState.arNewPlaces !== '') {
		var ar = gameState.arNewPlaces.split(",");
		if (ar.length > 0) {
			playSound('sms.mp3');
			if (isCommentsShown()) addComments("Your phone chimes that " + (ar.length > 1 ? "new locations are" : "a new location is") + " available on your map:");
			else setComments("Your phone chimes that " + (ar.length > 1 ? "new locations<br>are" : "a new location<br>is") + " available on your map:");
		}
		for (var i = 0; i < ar.length; i++) {
			if (ar[i] !== "") addComments("<br>&nbsp;-&nbsp;<b>" + ar[i] + "</b>");
		}
		gameState.arNewPlaces = '';
	}
}

/***************** People ******************************************************************************/

function GetPersonName(ps, full)
{
	if (findPerson(ps) !== null) return per.getPersonName(full);
	return ps;
}

function AddPeopleColumn(doc, pclass, txt)
{
	if (gameState.bPeopleCol) return;
	if (!doc) doc = mdCache;
	gameState.bPeopleCol = true;
	AddRightColumn(doc, pclass);
	if (txt === undefined || txt === '') txt = 'People here';
	doc.write('<p style="clear:both;text-align:center;margin-bottom:4px;margin-top:0"><b>' + txt + '</b>');
}
function AddPeopleColumnMed(doc, txt) { AddPeopleColumn(doc, "td-right-med", txt); }
function AddPeopleColumnMed2(doc, txt) { AddPeopleColumn(doc, "td-right-med2", txt); }
function AddPeopleColumnLarge(doc, txt) { AddPeopleColumn(doc, "td-right-large", txt); }

/******************* Models ******************************************/

function buildModelRow(p)
{
	var m = p.getModels();
	var pc = p.charmed;
	if (p.charmed > 0) p.charmed = -1;
	var sn = m.indexOf("|") != -1 ? '<div style="height:2em"><b>choose later</b></div>' : '';
	var s = '<td>' + p.getPersonName(true) + '</td><td style="width:10vw;vertical-align:top"><a onclick="selthis(this)">' + sn + '<img src="' + getThemeFolderI(1) + 'unknown.png" style="width:90%;' + (p.dress === '' ? 'border:5px solid yellow' : 'border:5px solid black') + '"></a></td>';
	var ar = m.split(",");
	var o = p.dress;
	
	// First build a list of selected models
	var arThis;
	var prev = [];	
	for (i = 0; i < arPeople.length; i++) {
		var pn = arPeople[i];
		if (p === pn) continue;
		var mt = pn.getModels();
		var arn = mt.split(",");
		for (var j = 0; j < arn.length; j++) {
			arThis = arn[j].split("|");
			if (pn.dress == arThis[0] && arThis.length > 1) prev.push(arThis[1]);
		}
	}
	
	for (j = 0; j < ar.length; j++) {
		arThis = ar[j].split("|");
		p.dress = arThis[0];
		var img = p.addPersonFace(false,'90%;margin-left:9%;' + (o == arThis[0] ? 'border:5px solid yellow' : 'border:5px solid black'), true);
		var oc = '<a onclick="selthis(this)">'; //<span></span>';
		sn = arThis.length > 1 ? '<div style="height:2em"><b>' + arThis[1] + '</b></div>' : '';
		if (sn !== '') {
			for (i = 0; i < prev.length; i++) {
				if (arThis[1] == prev[i]) {
					oc = '';
					img = '<img src="UI/noicon.png" style="width:90%;margin-left:9%;border:5px solid black"/>';
					//console.log(img);
					break;
				}
			}
		}
		s += '<td id="' + arThis[0] + '" style="width:10vw;vertical-align:top;text-align:right">' + oc + sn + img + (oc !== '' ? '</a>' : '') + '</td>';
		p.dress = o;
	}
	p.charmed = pc;
	return s;
}

function updateModels(op)
{
	// Count characters with selectable models
	var par = [];
	var i, p;
	for (i = 0; i < arPeople.length; i++) {
		p = arPeople[i];
		if (p.getModels() !== '') par.push(p.uid);
	}
	par.sort();
	if (par.length == 0) return;		// Do nothing
		
	var ar = op.getModels().split(",");
	
	for (i = 0; i < par.length; i++) {
		p = findPerson(par[i]);
		var bFnd = false;
		for (var j = 0; j < ar.length; j++) {
			var dar = ar[j].split("|");
			if (p.getModels().indexOf(dar[0] + "|") != -1) {
				bFnd = true;
				break;
			}
		}
		if (!bFnd) continue;
		var el = document.getElementById(p.uid);
		if (el) el.innerHTML = buildModelRow(p);
	}
}

function selectModels(drs, sh)
{
	// Count characters with selectable models
	var par = [];
	var i, p;
	for (i = 0; i < arPeople.length; i++) {
		p = arPeople[i];
		if (p.getModels(true) !== '') par.push(p.uid);
	}
	par.sort();
	if (par.length == 0) return false;		// Do nothing
	
	var s =	'<img src="Images/People/Bambi/bambipick.jpg" class="imgpopup" style="width:30%"/>' +
				'<p>You may select the models used in the game, except where they are preselected by a mod, or there is no choice! Select the unknown icon <img src="' + getThemeFolderI(1) + 'unknown.png" style="width:24px;padding-top:0.25em"> to choose when you first meet the character. </p>' +
				'<p>If you do not select here you will use the game default models, or select them when you first meet. Models can be changed later in the game, spells can be powerfull that way, or cheaters can alter them.</p>' +
				addOptionLink("string", 'select models', "var el=getElementById(\'spoilerdiv\');if (el){if (el.style.display==\'none\')el.style.display=\'block\';else el.style.display=\'none\'}", "chatblock", (isScreenSmall() ? "left:5%;width:80%" : "width:30%;margin-left:20%") + ';text-shadow:none') +
				'<div id="spoilerdiv" style="display:' + (sh === undefined || sh === false ? 'none' : 'inline') + '"><br>' +
		'<script>' +
			'function selthis(el){' +
				'var tdel = el.parentNode;' +
				'if (!tdel) return;' +
				'var ttr = tdel.parentNode;' +
				'if (!ttr) return;' +
				'var p = findPerson(ttr.id);' +
				'p.dress = tdel.id;' +
				'updateModels(p);' +
			'}' +
		'</script>' +
		'<table style="width:90%">'; //<tr style="vertical-align:bottom">';
				
	for (i = 0; i < par.length; i++) {
		p = findPerson(par[i]);
		var so = '<tr id="' + p.uid + '">' + buildModelRow(p) + '</tr>';
		//console.log(so);
		s += so;
	}

	showPopupWindow("Models for Characters",
		s +
		'</table></div>' +
		(sType !== "selectmodels" ? addOptionLink("string", 'start the game', "WaitHereOnly(1);dispPlace(1,'')", "optionblock", (isScreenSmall() ? "left:5%;width:80%" : "width:30%;margin-left:20%") + ';text-shadow:none') : addOptionLink("string", 'done', "WaitHereOnly(1);dispPlace(Place,'')", "optionblock", (isScreenSmall() ? "left:5%;width:80%" : "width:30%;margin-left:20%") + ';text-shadow:none')) + '<br>',
		'', '', true, true, true
	);
	return true;
}


/***************** Initialise ******************************************************************************/
// Creates the variables - arrays that will later be accessed from other pages
var arPeople;

function initialisePeople()
{
	arPeople = [];

	// Define all people
	
	// Ghost (first to allow for an event override)
	initialiseGhost();

	// Abby
	initialiseAbby();

	// Angela
	// Mayor Thomas
	initialiseAngela();
	initialiseMayorThomas();
	
	// Ms. Charles
	initialiseAmaraCharles();
	initialiseJulie();

	// Mr Beasley
	initialiseBeasley();
	
	// Jade
	initialiseJade();

	// Ross Family
	// Adele Ross
	// Amy Ross
	// Catherine Ross
	initialiseAdeleRoss();
	initialiseAmyRoss();
	initialiseCatherineRoss();
	
	// Aunt Brandi
	// Kylie
	initialiseKylie();
	initialiseAuntBrandi();

	// Anita
	initialiseAnita();

	// Bambi
	initialiseBambi();
	initialiseMia();

	// Carol
	// Ellie
	initialiseCarol();
	initialiseEllie();
	initialiseLeigh();

	// Charlie
	initialiseCharlie();

	// Debra Kelly
	// Janet Kelly
	initialiseJanetKelly();
	initialiseDebraKelly();

	// Didi
	initialiseDidi();
	
	// Emily (and her recruits)
	initialiseEmily();
	initialiseTammy();

	// Gina
	initialiseGina();

	// Hannah the Mechanic
	// Camryn, her sister
	initialiseCamryn();
	initialiseHannah();

	// Alison
	// Jenny
	initialiseAlison();
	initialiseJenny();

	// Kate & Mrs Granger
	initialiseKateGranger();
	initialiseMrsGranger();

	// Kristin
	initialiseKristin();

	// Leanne
	// Louise
	initialiseLeanne();
	initialiseLouise();

	// Gabby
	// Madison
	// Nina
	// Zoey
	initialiseGabby();
	initialiseMadison();
	initialiseNina();
	initialiseZoey();

	// Monique
	initialiseMonique();

	// Mom
	initialiseMom();

	// Tracy
	initialiseTracy();

	// Melissa
	initialiseMelissa();

	// Mother Superior
	// Sister Desiree
	initialiseMotherSuperior();
	initialiseSisterDesiree();
	
	// Ported from bologna44's mod (part 1)
	initialiseKellie();	
	
	// School staff (non-teacher)
	initialisePenelope();
	initialiseHeather();
	// Principal
	initialisePrincipalReagan();
	
	// Teachers
	// Ms Jones
	// Miss Logan
	// Mrs Tanika
	initialiseMsJones();
	initialiseMissLogan();
	initialiseMrsTanika();

	// Ms Titus
	initialiseTitus();

	// Miku
	initialiseMiku();

	// Nella
	initialiseNella();
	
	// Nurse Megan
	// Nurse Sandra
	initialiseNurseMegan();
	initialiseNurseSandra();
	initialiseDoctorKay();

	// Diane White
	// Officer Batton
	// Officer Smith
	// Officer Khan
	initialiseDianeWhite();
	initialiseOfficerBatton();
	initialiseOfficerSmith();
	initialiseOfficerKhan();

	// Pamela
	initialisePamela();

	// John Adams
	// Tess Adams
	initialiseJohnAdams();
	initialiseTessAdams();

	// Victoria and Cherry
	initialiseVictoria();
	initialiseCherry();

	// Gates household
	initialiseLauren();
	initialiseSarah();
	initialiseSofia();
	
	// Donna
	initialiseDonna();

	// Robbins Family
	initialiseDavyRobbins();
	initialiseMrsRobbins();
	initialiseTina();
	
	// Ported from bologna44's mod (part 2)
	initialiseAsh();
	initialiseBetty();
	initialiseKarley();
	initialiseKarma();	
	initialiseLola();
	initialiseMelanie();
	initialiseSharon();
	initialiseSavanna();

	//Emma
	initialiseEmma()
	
	// Zali
	initialiseZali();
	
	// Ursula
	initialiseUrsula();

	// Vampyre
	// Must be after any person who can be fed upon
	initialiseVampyre();

	// After this point people CANNOT currently be charmed, or use a very different mechanism (Elian notably)
	// length - 14
	
	// Campers
	initialiseCampers();

	// Elian
	initialiseElian();
	
	// Tony
	initialiseMrTanika();

	// Jesse and Legion and the thralls
	initialiseJesse();
	initialiseLucy();
	initialiseSeraphina();
	
	// Jessica the Witch
	// New Age Store Owner
	initialiseEsmeralda();
	initialiseJessica();

	// Sir Ronald Gates
	initialiseGates();

	// The Town
	initialiseGlenvale();

	// Kurndorf
	// Note: must be last before You
	initialiseKurndorf();

	// You
	// Note: must be last!
	initialiseYou();

}