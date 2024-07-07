// Mods for the game

// List of mods in the game
// In index.html it is the list of all possible mods
// In gameplay it is only the mod that is active
var oModsDetails = { };

// General person object for the mod, optional can be undefined
var perMod = undefined;

function getCurrMod(s) {
	if (s.indexOf("Mods/") == -1) return "";
	var ar = s.split("Mods/");
	return ar[ar.length - 1].split("/")[0];
}

function getNextMod(s) {
	var ar = gameState.sMod.split(",");
	if (ar.length < 2) return "";
	for (var i = 0; i < (ar.length - 1); i++) {
		if (ar[i] == s) return ar[i + 1];
	}
	return "";
}

function getNextToCurrMod(sc) {
	var s = getCurrMod(sc);
	if (s === "") return "";
	var ar = gameState.sMod.split(",");
	if (ar.length < 2) return "";
	for (var i = 0; i < (ar.length - 1); i++) {
		if (ar[i] == s) return ar[i + 1];
	}
	return "";
}

// Add the current mod
function addDetails(name, description, version, id, flags, uid) {
	uid = uid === undefined ? name.split(" ").join("") : uid;
	id = !id ? "" : id;
	flags = !flags ? "" : flags;
	oModsDetails[uid] = {
		"uid": uid,
		"name": name,
		"description": description,
		"version": version,
		"id": id,
		"flags": flags
	};
}

// Cheat menu, change mod for a current game
function toggleModNew()
{
	var modlist = Object.getOwnPropertyNames(oModsDetails);
	var ic = 0;
	if (gameState.sMod !== '') {
		for (var i = 0, ie = modlist.length; i < ie; i++) {
			var itm = oModsDetails[modlist[i]];
			if (gameState.sMod.indexOf(itm.uid) != -1) {
				ic = i + 1;
				break;
			}
		}
	}
	if (ic >= modlist.length) return 'Base Game';
	else return oModsDetails[modlist[ic]].uid;
}
function toggleMod(nm) {
	gameState.sMod = nm !== undefined ? nm : toggleModNew();
	if (gameState.sMod == "Base Game") gameState.sMod = '';
	var s = getSaveString("MODCHANGE");
	var d = LZString.decompressFromEncodedURIComponent(s);
	DoRestartAndLoad('', d);
}

// General function to setup the current mod in the game
function setupMods(mod) {
	//console.log("setupMods: " + mod);
	perMod = undefined;
	if (!mod) return;
	var ar = mod.split(",");
	for (var i = 0; i < ar.length; i++) {
		if (setupMod(ar[i])) continue;
		addPersonTop(ar[i] + "Mod", 0, "", '', false, false);
		per.getPossessionFace = function() { return "laptop"; };		// Inage shown in the cheat menu (no extension)
		var p = perMod;
		if (p === undefined) perMod = per;
		else {
			while (p !== undefined) {
				if (p.perMod !== undefined) p = p.perMod;
				else {
					p.perMod = per;
					break;
				}
			}
		}
	}
}

function setupMod(mod) {
	// Loop over all mods functions and call their initialisation function
	console.log("setupMod: " + mod);
	for (var m in window) {
		try {
			if (typeof window[m] == "function" && window.hasOwnProperty(m)) {
				if (window[m].name.indexOf("initialiseMod") != -1) {
					var pm = window[m](mod);
					if (pm === undefined) continue;
					var p = perMod;
					if (p === undefined) perMod = pm;
					else {
						while (p !== undefined) {
							if (p.perMod !== undefined) p = p.perMod;
							else {
								p.perMod = pm;
								break;
							}
						}
					}
					pm.getImg = function(img, dn, tdress, np) { return img; };
					pm.folder = "Mods/" + mod + "/";
					return true;
				}
			}
		} catch(e) {
			// do nothing
		}
	}
	return false;
}