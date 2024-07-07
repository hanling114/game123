/********************* Places **************************************************************************/

function getPlaceName(plc)
{
	switch (Math.abs(plc)) {
		case 2:  return "Library";	
		case 5:  return "Dervish Road";
		case 9:  return "School";
		case 16: return perGates.getPersonName() + "\' house";
		case 26: return "Wild Ranges";
		case 37: return "Cherise Road";		
		case 38: return "Amaranth Place";		
		case 43: return "Yoolaroo Drive";
		case 44: return "Kollam Street";
		case 45: return "your home";
		case 47: return "Park Entrance";
		case 48: return "Massage Parour";
		case 52: return "Alley";		
		case 53: return "Hidden Room";
		case 60: return "Farm";
		case 63: return "Park Pathway";
		case 69: return "Nurse's Office at School";
		case 87: return "Park Walkway";		
		case 94: return "Town Hall";	
		case 105: return "Firestation";
		case 124: return "Broken Inn Hotel Bar";
		case 123: return "Broken Inn Hotel";	
		case 125: return "Broken Inn Tennis Courts";
		case 141: return "Sacred Clearing";
		case 144: return "School Field";
		case 167: return "Police Station";
		case 176: return "Robbins Home";
		case 177: return "Granger Home";
		case 194: return "Shopping Center";		
		case 195: return "General " + getShopStore(true);
		case 196: return "Bavaria Hut Restaurant";
		case 197: return "Antique and Artifact " + getShopStore(true);
		case 199: return "Laundromat";
		case 200: return "Cafe";
		case 215: return "Hospital";
		case 225: return "Friendly Loan Company";
		case 238: return "Museum";		
		case 229: return "Rathdown Road";
		case 237: return "Hannah's apartment";
		case 279: return "Mechanic\'s Workshop";
		case 282: return "Avernus Club";
		case 317: return "Lady of Our Heavenly Father Church";
		case 325: return "Graveyard";	
		case 345: return "New Age Store";
		case 350: return "Chakra Chachkies " + getShopStore(true);
		case 360: return "Aquarium";
		case 366: return "Glenvale Herald";
		case 370: return "Radio & Television Station";
		case 427: return "Salon";
		case 435: return "King's Gym";
		case 455: return "Celeste Road";
		case 480:
		case 481: return "Construction Site";
	}
	return '';
}

function getPlaceIdx(ps)
{
	ps = ps + '';
	switch (ps.split(" ").join("").split(gameState.sTown).join("").split("Place").join("Pl").split("Drive").join("Dr").split("Road").join("Rd").split("Home").join("House").split(".").join("").split("'").join("").split("&rsquo;").join("").trim()) {
		case "GinasHouse":
			return 1;
		case 'TownHall':
			return 2;
		case "FrenchClassroom":
			return 3;
		case "AnatomyClassroom":
			return 4;
		case "KurndorfsCrypt":
		case "Crypt":
			return 5;
		case "SacredClearing":
			return 6;
		case "RobbinsHouse":
			return 7;
		case "Alley":
		case "Alleyway":
			return 8;
		case 'Museum':
			return 9;
		case "GrangersHouse":
		case "GrangerHouse":
			return 10;
		case "KellysHouse":
		case "KellyHouse":
			return 11;
		case "ShoppingCenter":
			return 12;
		case 'BrokenInnHotel':
		case "Hotel":
			return 13;
		case 'PoliceStation':
			return 14;
		case "Hospital":
			return 15;
		case "WildRanges":
			return 17;
		case "MechanicsShop":
			return 18;
		case "RathdownRd":
			return 19;
		case "CheriseRd":
			return 21;
		case "AmaranthPl":
			return 22;
		case "DervishRd":
			return 23;
		case "NewAgeStore":
			return 24;
		case "TVStation":
		case "RadioStation":
		case "TV&RadioStation":
			return 25;
		case "Aquarium":
			return 26;
		case "Park":
		case "ParkPathway":
		case "ParkBridge":
			return 27;
		case 'LadyofOurHeavenlyFatherChurch':
		case "LadyofOurHeavenlyFather":
		case "Church":
			return 28;
		case "Graveyard":
			return 29;
		case "Library":
			return 30;
		case "HistoryClassroom":
			return 20;
		case "CelesteRd":
			return 31;
	}
	return 0;
}

function getPlaceNameIdx(idx)
{
	switch (idx) {
		case 1: return "Gina's House";
		case 2: return "Town Hall";
		case 3: return "French Classroom";
		case 4: return "Anatomy Classroom";
		case 5: return "Kurndorf\'s Crypt";
		case 6: return "Sacred Clearing";
		case 7: return "Robbins House";
		case 8: return "Alley";
		case 9: return "Museum";
		case 10: return "Granger's House";
		case 11: return "Kelly House";
		case 12: return "Shopping Center";
		case 13: return "Broken Inn Hotel";
		case 14: return "Police Station";
		case 15: return "Hospital";
		case 17: return "Wild Ranges";
		case 18: return "Mechanic's Shop";
		case 19: return "Rathdown Rd";
		case 20: return "History Classroom";
		case 21: return "Cherise Rd";
		case 22: return "Amaranth Pl";
		case 23: return "Dervish Rd";
		case 24: return "New Age Store";
		case 25: return "TV & Radio Station";
		case 26: return "Aquarium";
		case 27: return "Park";
		case 28: return "Lady of Our Heavenly Father Church";
		case 29: return "Graveyard";
		case 30: return "Library";
		case 31: return "Celeste Rd";
	}
	return '';
}


function isPlaceKnownBase(ps)
{
	var idx = getPlaceIdx(ps);
	if (idx == 30) return true;
	if (idx !== 0) return (arPlaces[idx] & 1) !== 0;

	if (typeof ps == 'number') {
		ps = getPlaceName(ps);
		if (ps === '') return false;
		return isPlaceKnownBase(ps);
	}
	ps = ps.split(" ").join("").split(gameState.sTown).join("").split("Place").join("Pl").split("Drive").join("Dr").split("Road").join("Rd").split("Home").join("House").split(".").join("").split("'").join("").split("&rsquo;").join("").trim();
	if (ps == (perGates.getPersonName().split(" ").join("") + "House")) ps = "Mansion";

	switch (ps) {
		case "YoolarooDr":
			return isPlaceKnownBase("GrangerHouse") || isPlaceKnownBase("RobbinsHouse") || isPlaceKnownBase("TanikasHouse");
		case "SirRonaldGatesHouse":
		case "SirRonaldGateshouse":
		case "Mansion":
			return perYou.getExperience() > 0; // || (isPlaceKnownBase("SacredClearing") && isPlaceKnownBase("Tunnel"))
		case "DuckPond":
			return checkPlaceFlag("Park", 2);
		case "ConstructionSite":
			return checkPlaceFlag("Park", 4);			
		case "Barn":
			return checkPlaceFlag("Park", 9);			
		case "CatacombTunnel":
		case "ChurchTunnel":
			return checkPlaceFlag("Graveyard", 5);
		case "Mausoleum":
			return checkPlaceFlag("Graveyard", 7);
		case "DavysRoom":
			return checkPlaceFlag("RobbinsHouse", 7);
		case "TinasRoom":
			return checkPlaceFlag("RobbinsHouse", 5);
		case "HiddenRoom":
		case "Hidden":
			return checkPlaceFlag("Alley", 7);
		case "HotelCellar":
			return checkPlaceFlag("Hotel", 10);
		case "TennisCourts":
			return checkPlaceFlag("Hotel", 13);			
		case "ChurchSecretDoor":
			return checkPlaceFlag("Church", 6);
		case "ChurchCourtyard":
			return checkPlaceFlag("Church", 10);
		case "MotherSuperiorsSecretRoom":
			return checkPlaceFlag("Church", 8);
		case "MotherSuperiorsRoom":
			return checkPlaceFlag("Church", 9);
		case "WitchesPrison":
			return getPersonOther("Jessica") > 0 && perKurndorf.getQuestRitual() < 200;
		case "Room113":
			return perJesse.whereNow() == 8 || isDemonQuestDone();
		case "AdamsHouse":
			return getPersonOther("Tess") >= 25 || checkPlaceFlag("RathdownRd", 2);
		case "AnitasLair":
			return checkPlaceFlag("FrenchClassroom", 2);
		case "DonnasRoom":
			return checkPlaceFlag("Hotel", 7);
		case "SeraphinasRoom":
			return checkPlaceFlag("Hotel", 14);
		case "SchoolField":
			return checkPlaceFlag("HistoryClassroom", 4);
		case "NursesOffice":
			return checkPlaceFlag("HistoryClassroom", 13);
		case "PrincipalsOffice":
			return checkPlaceFlag("HistoryClassroom", 14);	
		case "SchoolAdmin":
			return checkPlaceFlag("HistoryClassroom", 15);
		case "SchoolLibrary":
			return checkPlaceFlag("HistoryClassroom", 16);
		case "KristinsHouse":
			return checkPlaceFlag("DervishRd", 2);
		case "BartelsHouse":
		case "BartelHouse":
			return checkPlaceFlag("DervishRd", 3);
		case "BartelsSpareRoom":
		case "BartelSpareRoom":
			return checkPlaceFlag("DervishRd", 4);	
		case "PrincipalsHouse":
		case "Reagans":
			return checkPlaceFlag("DervishRd", 5);				
		case "JohnAdamsOffice":
			return checkPlaceFlag("TownHall", 2);
		case "BreakRoom":
			return checkPlaceFlag("TownHall", 3);
		case "EmilyOffice":
			return checkPlaceFlag("TownHall", 4);	
		case "TammyOffice":
			return checkPlaceFlag("TownHall", 5);
		case "Firestation":
			return checkPlaceFlag("TownHall", 10);			
		case "HospitalICU":
			return checkPlaceFlag("Hospital", 5);
		case "DoctorKaysOffice":
			return checkPlaceFlag("Hospital", 6);	
		case "ZaliHouse":
		case "ZalisHouse":
			return checkPlaceFlag("Hospital", 7);				
		case "AuntsHouse":
			return checkPlaceFlag("CheriseRd", 2);
		case "LogansHouse":
		case "LoganHouse":
			return checkPlaceFlag("CheriseRd", 5);
		case "CharliesOffice":
			return checkPlaceFlag("CheriseRd", 7);
		case "CharliesHouse":
			return checkPlaceFlag("CheriseRd", 8);
		case "MelaniesHouse":
		case "Melanies":
			return checkPlaceFlag("CheriseRd", 10);			
		case 'PoliceInterrogationRoom':
			return checkPlaceFlag("PoliceStation", 2);
		case "JailCell":
			return checkPlaceFlag("PoliceStation", 3);
		case "Tunnel":
			return checkPlaceFlag("WildRanges", 3);
		case "WalkingTrail":
			return checkPlaceFlag("WildRanges", 5);
		case "MsTitussHouse":
		case "MsTitusHouse":
			return checkPlaceFlag("RathdownRd", 3);
		case "Apartments":
			return checkPlaceFlag("CelesteRd", 2) || checkPlaceFlag("CelesteRd", 4) || checkPlaceFlag("CelesteRd", 5) || checkPlaceFlag("CelesteRd", 6) || checkPlaceFlag("CelesteRd", 7) || checkPlaceFlag("CelesteRd", 8) || checkPlaceFlag("CelesteRd", 9) || checkPlaceFlag("CelesteRd", 10);
		case "CamrynsApartment":
			return checkPlaceFlag("CelesteRd", 2);
		case "MiasApartment":
			return checkPlaceFlag("CelesteRd", 4);
		case "AbbysApartment":
		case "AbbyApartment":
			return checkPlaceFlag("CelesteRd", 5);
		case "AngelasApartment":
		case "AngelaApartment":
			return checkPlaceFlag("CelesteRd", 6);
		case "EmilysApartment":
		case "EmilyApartment":
			return checkPlaceFlag("CelesteRd", 7);
		case "NinasApartment":
		case "NinaApartment":
			return checkPlaceFlag("CelesteRd", 8);
		case "LouisesApartment":
		case "LouiseApartment":
			return checkPlaceFlag("CelesteRd", 9);
		case "AlisonsApartment":
		case "AlisonApartment":
			return checkPlaceFlag("CelesteRd", 10);
		case "MadisonsApartment":
		case "MadisonApartment":
			return checkPlaceFlag("CelesteRd", 11);
		case "ZoeysApartment":
		case "ZoeyApartment":
			return checkPlaceFlag("CelesteRd", 12);
		case "JennysApartment":
		case "JennyApartment":
			return checkPlaceFlag("CelesteRd", 13);
		case "MelissasApartment":
		case "MelissaApartment":
			return checkPlaceFlag("CelesteRd", 14);			
		case "TanikasHouse":
		case "TanikaHouse":
			return checkPersonFlag("MrsTanika", 3);	
		case "HavenApartments":
			return checkPlaceFlag("ShoppingCenter", 3);
		case "AvernusClub":
			return checkPlaceFlag("ShoppingCenter", 5);
		case "MayorsApartment":
		case "MayorApartment":
			return checkPlaceFlag("ShoppingCenter", 6);	
		case "LoanOffice":
			return checkPlaceFlag("ShoppingCenter", 8);				
		case "DianesApartment":
		case "DianeApartment":
			return checkPersonFlag("Diane", 30);
		case "GabbysHouse":
		case "GabbyHouse":
		case "HalliwayHouse":
			return checkPlaceFlag("AmaranthPl", 2);	
		case "LolasHouse":
			return checkPlaceFlag("AmaranthPl", 3);				
		case "Campsite":
			return isPlaceKnown("WildRanges");
		case "Cabin":
			return checkPersonFlag("Karma", 1);			
		case "EsmeraldasHouse":
		case "EsmeraldaHouse":			
			return checkPlaceFlag("NewAgeStore", 2);
		case "NewspaperOffice":
		case "Herald":
		case "GlenvaleHerald":
			return checkPlaceFlag("RadioStation", 2);	
		case "HeathersHouse":
		case "HeatherHouse":
		case "Heathers":
			return checkPlaceFlag("KellysHouse", 3);
		case "MelinHouse":
		case "UrsulasHouse":
			return checkPlaceFlag("SacredClearing", 4);
		case "MansionGuestRoom":
			return checkPlaceFlag("SacredClearing", 5);	
		case "MansionSwimmingPool":
			return checkPlaceFlag("SacredClearing", 6);
		case "MsCharlesHouse":
		case "CharlessHouse":			
		case "CharlesHouse":
			return checkPlaceFlag("SacredClearing", 7);			
	}
	return true;
}
function isPlaceKnown(ps)
{
	return isPlaceKnownBase(ps);
}


function setPlaceKnownBase(ps, notify)
{
	var ops = ps;
	var idx = getPlaceIdx(ps);
	if (idx !== 0) {		
		if ((arPlaces[idx] & 1) === 0) gameState.arNewPlaces = gameState.arNewPlaces + (gameState.arNewPlaces !== "" ? "," : "") + getPlaceNameIdx(idx);
		arPlaces[idx] = arPlaces[idx] | 1;
		
		// Related locations
		if (idx == 29) setPlaceKnown("Broken Inn Hotel");		// Graveyard 29
		else if (idx == 13) setPlaceKnown("Town Hall");			// Hotel 13
		return;
	}

	if (typeof ps == 'number') ps = getPlaceName(ps);
	
	if (!isPlaceKnown(ps) && notify !== false && ps.indexOf("Apartment") == -1 && ps.indexOf("House") == -1 && ps.indexOf("Office") == -1) {
		console.log("new place " + ps);
		gameState.arNewPlaces = gameState.arNewPlaces + (gameState.arNewPlaces !== "" ? "," : "") + ps;
	}

	switch (ps.split(" ").join("").split(gameState.sTown).join("").split("Place").join("Pl").split("Drive").join("Dr").split("Road").join("Rd").split("Home").join("House").split(".").join("").split("'").join("").split("&rsquo;").join("").trim()) {
		case "DuckPond":
			setPlaceFlag("Park", 2);
			return;
		case "ConstructionSite":
			setPlaceFlag("Park", 4);
			return;
		case "Barn":
			setPlaceFlag("Park", 9);
			return;			
		case "CatacombTunnel":
		case "ChurchTunnel":
			setPlaceFlag("Graveyard", 5);
			return;
		case "ChurchCourtyard":
			setPlaceFlag("Church", 10);
			return;
		case "Mausoleum":
			setPlaceFlag("Graveyard", 7);
			return;
		case "DavysRoom":
			setPlaceFlag("RobbinsHouse", 7);
			return;
		case "TinasRoom":
			setPlaceFlag("RobbinsHouse", 5);
			return;
		case "HiddenRoom":
			setPlaceFlag("Alley", 7);
			return;
		case "ChurchSecretDoor":
			setPlaceFlag("Church", 6);
			return;
		case "MotherSuperiorsSecretRoom":
			setPlaceFlag("Church", 8);
			return;
		case "MotherSuperiorsRoom":
			setPlaceFlag("Church", 9);
			return;
		case "AnitasLair":
			setPlaceFlag("FrenchClassroom", 2);
			return;
		case "DonnasRoom":
			setPlaceFlag("Hotel", 7);
			return;
		case "TennisCourts":
			setPlaceFlag("Hotel", 13);
			return;
		case "SeraphinasRoom":
			setPlaceFlag("Hotel", 14);
			return;
		case "SchoolField":
			setPlaceFlag("HistoryClassroom", 4);
			return;
		case "KristinsHouse":
			setPlaceFlag("DervishRd", 2);
			return;
		case "BartelsHouse":
		case "BartelHouse":
			setPlaceFlag("DervishRd", 3);
			return;
		case "BartelsSpareRoom":
		case "BartelSpareRoom":
			setPlaceFlag("DervishRd", 4);
			return;
		case "PrincipalsHouse":
			setPlaceFlag("DervishRd", 5);
			return;
		case "JohnAdamsOffice":
			setPlaceFlag("TownHall", 2);
			return;
		case "BreakRoom":
			setPlaceFlag("TownHall", 3);
			return;
		case "EmilyOffice":
			setPlaceFlag("TownHall", 4);
			return;
		case "TammyOffice":
			setPlaceFlag("TownHall", 5);
			return;
		case "Firestation":
			setPlaceFlag("TownHall", 10);
			return;
		case "AdamsHouse":
			setPlaceFlag("RathdownRd", 2);
			setPlaceKnown("Rathdown Rd");		// Also know Rathdown Rd
			return;
		case "HospitalICU":
			setPlaceFlag("Hospital", 5);
			return;
		case "DoctorKaysOffice":
			setPlaceFlag("Hospital", 6);
			return;
		case "ZaliHouse":
		case "ZalisHouse":
			setPlaceFlag("Hospital", 7);
			return;
		case "AuntsHouse":
			setPlaceFlag("CheriseRd", 2);
			return;
		case "LogansHouse":
		case "LoganHouse":
			setPlaceFlag("CheriseRd", 5);
			return;	
		case "CharliesOffice":
			setPlaceFlag("CheriseRd", 7);
			return;
		case "CharliesHouse":
			setPlaceFlag("CheriseRd", 8);
			return;	
		case "MelaniesHouse":
			setPlaceFlag("CheriseRd", 10);
			return;
		case 'PoliceInterrogationRoom':
			setPlaceFlag("PoliceStation", 2);
			return;
		case "JailCell":
			setPlaceFlag("PoliceStation", 3);
			return;
		case "Tunnel":
			setPlaceFlag("WildRanges", 3);
			return;
		case "WalkingTrail":
			setPlaceFlag("WildRanges", 5);
			return;
		case "MsTitussHouse":
		case "MsTitusHouse":
			setPlaceFlag("RathdownRd", 3);
			return;
		case "CamrynsApartment":
		case "CamrynApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 2);
			return;
		case "MiasApartment":
		case "MiaApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 4);
			return;
		case "AbbysApartment":
		case "AbbyApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 5);
			return;
		case "AngelasApartment":
		case "AngelaApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 6);
			return;
		case "EmilysApartment":
		case "EmilyApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 7);
			return;
		case "NinasApartment":
		case "NinaApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 8);
			return;
		case "LouisesApartment":
		case "LouiseApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 9);
			return;			
		case "AlisonsApartment":
		case "AlisonApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 10);
			return;
		case "MadisonsApartment":
		case "MadisonApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 11);
			return;
		case "ZoeysApartment":
		case "ZoeyApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 12);
			return;
		case "JennysApartment":
		case "JennyApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 13);
			return;
		case "MelissasApartment":
		case "MelissaApartment":
			setPlaceKnown("CelesteRd");
			setPlaceFlag("CelesteRd", 14);
			return;			
		case "TanikasHouse":
		case "TanikaHouse":
			setPersonFlag("MrsTanika", 3);		
			return;
		case "DianesApartment":
		case "DianeApartment":
			setPersonFlag("Diane", 30);
			setPlaceKnown("Haven Apartments");	// and Haven Apartments if not known
			return;
		case "GabbysHouse":
		case "GabbyHouse":
		case "HalliwayHouse":
			setPlaceFlag("AmaranthPl", 2);
			return;
		case "LolasHouse":
			setPlaceFlag("AmaranthPl", 3);
			return;
		case "AvernusClub":
			setPlaceFlag("ShoppingCenter", 5);
			return;
		case "MayorsApartment":
		case "MayorApartment":
			setPlaceFlag("ShoppingCenter", 6);
			setPlaceKnown("Haven Apartments");	// and Haven Apartments if not known
			return;
		case "HavenApartments":
			setPlaceFlag("ShoppingCenter", 3);
			return;
		case "LoanOffice":
			setPlaceFlag("ShoppingCenter", 8);
			return;			
		case "NursesOffice":
			setPlaceFlag("HistoryClassroom", 13);
			return;
		case "PrincipalsOffice":
			setPlaceFlag("HistoryClassroom", 14);
			return;	
		case "SchoolAdmin":
			setPlaceFlag("HistoryClassroom", 15);
			return;
		case "SchoolLibrary":
			setPlaceFlag("HistoryClassroom", 16);
			return;			
		case "EsmeraldasHouse":
		case "EsmeraldaHouse":
			setPlaceFlag("NewAgeStore", 2);
			return;
		case "NewspaperOffice":
		case "GlenvaleHerald":
		case "Herald":
			setPlaceFlag("RadioStation", 2);
			return;
		case "HeathersHouse":
		case "HeatherHouse":
			setPlaceFlag("KellysHouse", 3);
			return;
		case "UrsulasHouse":			
		case "MelinHouse":
			setPlaceFlag("SacredClearing", 4);
			return;
		case "MansionGuestRoom":
			setPlaceFlag("SacredClearing", 5);
			return;
		case "MansionSwimmingPool":
			setPlaceFlag("SacredClearing", 6);
			return;
		case "MsCharlesHouse":
		case "CharlessHouse":
		case "CharlesHouse":
			setPlaceFlag("SacredClearing", 7);
			return;
	}
}
function setPlaceKnown(ps, notify)
{
	setPlaceKnownBase(ps, notify);
}

function isPlaceBreakIn(ps) { return checkPlaceFlag(ps, 31); }
function setPlaceBreakIn(ps, nVal) { setPlaceFlag(ps, 31, nVal); }

function checkPlaceFlag(ps, flg)
{
	var idx = getPlaceIdx(ps);
	if (idx !== 0) return checkBitFlag(arPlaces[idx], flg);
	return false;
}
function setPlaceFlag(ps, flg, nVal)
{
	var idx = getPlaceIdx(ps);
	if (idx !== 0) arPlaces[idx] = setBitFlag(arPlaces[idx], flg, nVal);
}

function dispPlace(plc, params, txt, ps, click)
{
	if (gameState.bSidebarsHidden) showSideBars();
	if (!plc) plc = Place;
	if (params === undefined) params = sPlaceParams;
	else sPlaceParams = params;

	if (plc !== undefined && !isNaN(plc)) {
		if (nFromPlace != Place) {
			if (nFromPlace == 900) showRightBar(2);
			nFromPlace = Place;
		}
		Place = plc;
	}
	// Reset general page state variables
	sType = getQueryParam("type");
	sWho = getQueryParam("who");
	gameState.startPlace();
	bPopupShown = false;
	iNewSMS = 0;
	bQuestionsShown = false;
	
	if (!isAtLocation(317) && Place < 800 && isPossess() && !perYou.checkFlag(69) && isOutside(Place) != isOutside(nFromPlace)) {
		if (txt === undefined) txt ='';
		else if (txt !== '') txt += '<br><br>';
		txt += 'The possession spell ends as you walk though to doorway and you wake at the Sacred Clearing...';
		CancelPossession();
		Place = 141;
		gameState.startPlace();
	}
	
	ie = arPeople.length;
	for (var ir = 0; ir < ie - 1; ir++) {
		p = arPeople[ir];
		p.shown = false;
		p.infoid = 0;
	}

	// Does a custom event happen?
	// Only one is allowed
	var bEvt = false;
	var pe;
	for (var i = 0; i < ie; i++) {
		pe = arPeople[i];
		if (sType == "clubdancing" && (pe.uid != sWho && pe.uid != "ghost")) continue;
		if (sType == "poolswim" && pe.uid != sWho) continue;
		bEvt = pe.showEvent();
		if (bEvt) {
			if (sType == "momghcharmfail1") txt = '';
			break;
		} else if (sType == "clubdancing" && pe.uid != "ghost") {
			// The dance event, can be default or overridden
			WaitHereOnly(3);
			pe.showDancing();
			bEvt = true;
		} else if (sType == "poolswim") {
			// The swimming event, can be default or overridden
			WaitHereOnly(6);
			pe.showSwimming();
			bEvt = true;
		}
	}
	// No person specific special events, any core game ones?
	if (!bEvt && sType == "hydromancy") bEvt = CastingHydromancy();
	else if (!bEvt && sType == "generalevent") bEvt = GeneralEvent();
	
	if (!bEvt) {
		// No special events, show the place normally
		try {
			if (sType.indexOf("dream") != -1 && txt !== undefined) sComment = txt;
			if (typeof window["ShowPlace" + Place] == 'function') { 
				eval("ShowPlace" + Place +"('" + sType + "')");
			}
		} catch(e) {
			console.log("Error in place " + Place);
			console.log(e);
			//gotoPlace(46);
			return;
		}
	}
	if (sType.indexOf("dream") != -1) return;
	if (txt !== undefined && txt !== '') {
		bChat = ps !== "" && ps !== undefined;
		var pf = '';
		if (bChat && gameState.bShowSpeaker) {
			p = findPersonNC(ps);
			if (p !== null) {
				pf = p.addPersonFace();
				if (txt.indexOf(pf) != -1) pf = '';
			}
		}
		if (sComment !== '') WriteComments(pf + txt + '<p class="gblock" style="width:99%;background-color:Gray;color:black">Additionally</p><br>' + sComment, ps, click);
		else WriteComments(pf + txt, ps, click);
	} else if (sComment !== '') {
		if (sComment.indexOf('conversebubble') != -1) WriteCommentsFooter(bChat, bChatLeft);
		else WriteComments(sComment);
	} else bChat = false;
}

function gotoPlace(plc, params, txt, ps, click)
{
	sType = '';
	Leave(false);
	// Has an event been triggered from passTime or similar, we only detect cases here for type= events
	if (sType !== "") {
		params = sPlaceParams;
		txt = '';
	} 
	if (params !== undefined) sType = getQueryParam("type", params);
	// Extra time?
	if (sType.indexOf("bondage") != -1 || sType.indexOf("threesome") != -1 || sType.indexOf("lesbian") != -1 || sType.indexOf("anal") != -1 || sType.indexOf("fuck") != -1 || sType.indexOf("sex") != -1 || sType.indexOf("bj") != -1 || sType.indexOf("lick") != -1 || sType.indexOf("strapon") != -1 || sType.indexOf("tf") != -1) sexEvent();

	sPlaceParams = "";
	dispPlace(plc, params, txt, ps, click);
}

var gt = '';
function gotoPlaceDelayed(plc, params, txt, ps, click)
{
	gt = "gotoPlace(" + plc + ",'" + (params === undefined ? '' : params) + "','" + (txt === undefined ? '' : txt) + "','" + (ps === undefined ? '' : ps) + "'" + (click === undefined ? '' : ',' + click) + ")";
	setTimeout(delayEV, 10);
}
function dispPlaceDelayed(plc, params, txt, ps, click)
{
	gt = "dispPlace(" + plc + ",'" + (params === undefined ? '' : params) + "','" + (txt === undefined ? '' : txt) + "','" + (ps === undefined ? '' : ps) + "'" + (click === undefined ? '' : ',' + click) + ")";
	setTimeout(delayEV, 10);
}
function delayEV() { eval(gt); gt = ''; }

function gotoPlaceQuick(plc)
{
	if (Math.abs(plc - Place) < 20) WaitHereOnly(3);
	else if (Math.abs(plc - Place) > 150) WaitHereOnly(8);
	else WaitHereOnly(6);
	gotoPlace(plc, '', 'You walk there quickly, talking little notice of anything on the way');
}


// Links

function addLinkToPlace(doc, lnk, plc, param, txt, ps, js, pclass, psty, nc)
{
	if (!plc) plc = Place;
	if (param !== undefined && param !== "") plc = plc + ",'" + param + "'";
	else if (txt !== undefined && txt !== '') plc = plc + ",''";
	if (txt !== undefined && txt !== '') {
		if (nc === true) plc = plc + ",'" + txt + "'";
		else plc = plc + ",'" + txt.split('"').join("&quot;").split("'").join("&rsquo;") + "'";
		if (ps !== undefined && ps !== '') plc = plc + ",'" + ps + "'";
	}
	if (js !== undefined && js !== '') js = js + ";";
	else js = '';

	return addOptionLink(doc, lnk, js + 'gotoPlace(' + plc + ');', pclass, psty);
}

function addLinkToPlaceM(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock", psty); }
function addLinkToPlaceNorth(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock north", psty); }
function addLinkToPlaceNorthEast(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock northeast", psty); }
function addLinkToPlaceNorthWest(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock northwest", psty); }
function addLinkToPlaceSouth(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock south", psty); }
function addLinkToPlaceSouthEast(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock southeast", psty); }
function addLinkToPlaceSouthWest(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock southwest", psty); }
function addLinkToPlaceEast(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock east", psty); }
function addLinkToPlaceWest(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "moveblock west", psty); }


function addLinkToPlaceC(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "chatblock", psty); }
function addLinkToPlaceO(doc, desc, plc, param, txt, ps, js, psty) { return addLinkToPlace(doc, desc, plc, param, txt, ps, js, "optionblock", psty); }
function addLinkToPlaceI(desc, plc, param, txt, ps, js, psty) {	// NO doc parameter!!!
	if (!isVisible()) gameState.sInvisibleChoices += addLinkToPlace("string", desc, plc, param, txt, ps, js, "optionblock", psty);
}
function addLinkToPlaceIx(desc, plc, param, txt, ps, js, psty) {
	if (perYou.checkFlag(28) && !gameState.bLastOutVisible) addLinkToPlaceI(desc, plc, param, txt, ps, js, psty);
}

function addPopupLinkToPlace(doc, lnk, plc, param, title, body, onclose, psty, blk, noclick, pclass)
{
	if (!plc) plc = Place;
	return addPopupLink(doc, lnk, title, body, blk, "saveUndo(true);" + (onclose === undefined ? "" : onclose + ';') + 'gotoPlace(' + plc + (param === undefined ? '' : ',"' + param + '"') + ')', noclick, pclass, psty);
}
function addPopupLinkToPlaceC(doc, lnk, plc, param, title, body, onclose, psty, blk, noclick) { return addPopupLinkToPlace(doc, lnk, plc, param, title, body, onclose, psty, blk, noclick, "chatblock"); }
function addPopupLinkToPlaceO(doc, lnk, plc, param, title, body, onclose, psty, blk, noclick) { return addPopupLinkToPlace(doc, lnk, plc, param, title, body, onclose, psty, blk, noclick, "optionblock"); }
function addPopupLinkToPlaceI(lnk, plc, param, title, body, onclose, psty, blk, noclick) {
	if (!isVisible()) gameState.sInvisibleChoices += addPopupLinkToPlace("string", lnk, plc, param, title, body, onclose, psty, blk, noclick, "chatblock");
}
function addPopupLinkToPlaceIx(lnk, plc, param, title, body, onclose, psty, blk, noclick) {
	if (perYou.checkFlag(28) && !gameState.bLastOutVisible) ddPopupLinkToPlaceI(lnk, plc, param, title, body, onclose, psty, blk, noclick);
}

// Leave a place
function Leave(noev)
{
	//Clears the comment section of the game && resets some spells
	//if (isPossess("cast")) CancelPossession();
	if (sPossess == "cast") CancelPossession();
	ClearComments();
	if (Place != 375 && Place != 316) perJesse.setFlag(11, false);	//Un-annoint the Relic

	perYou.setFlag(16, false);		// Not hiding
	checkInvisible();
	passTime(noev);
}

// Images

// Outside locations
var arOutside = [481,480,470,455,421,370,360,344,327,325,324,320,319,317,281,238,229,219,216,215,212,194,167,144,141,125,123,94,87,86,63,60,52,47,44,43,38,37,26,25,24,23,16,15,9,5,2];
function isOutside(plc, foy) {
	if (plc === undefined) plc = Place;
	// Hardcoded values length 46 and first value < 150 at index 21 (mid point-ish)
	//var lenOut = arOutside.length;
	var op;
	for (var i = plc < 150 ? 23 : 0, ie = arOutside.length; i < ie; i++) {
		op = arOutside[i];
		if (op <= plc) return op == plc;
	}
	if (foy === true) return Place == 456 || Place == 471;
	return false;
}
// Add a new outdoor location
function addOutsidePlace(plc)
{
	arOutside.push(plc);
	arOutside.sort(function(a, b){return b - a});
}


function addPlaceDescription(md, txt1, txt2, plcid, flg)
{
	var moreable;
	if (typeof plcid === "string") moreable = checkPlaceFlag(plcid, flg);
	else moreable = plcid;
	
	if (moreable !== true || !txt2) {
		md.write('<p>' + txt1 + (txt2 ? txt2 : '') + '</p>');
		if (typeof plcid === "string") setPlaceFlag(plcid, flg);
		return;
	}
	
	md.write(
		'<script>function updateMoreable' + gameState.nUId + '(){' +
		'var cpar=document.getElementById("moreable' + gameState.nUId + '");' +
		'if(cpar)cpar.innerHTML="' + (txt1 + " " + txt2).split('"').join("&quot;") + '"' +
		'}</script>'
	);
	//var sc1 = txt1.split('"').join("&quot;").split("'").join("&apos;").split("<").join("&lt;").split(">").join("&gt;");
	md.write('<p id="moreable' + gameState.nUId + '">' + txt1 + ' <a onclick="updateMoreable' + gameState.nUId + '()"><font size="-1">...more...</font></a></p>');
	gameState.nUId++;
	if (typeof plcid === "string") setPlaceFlag(plcid, flg);
}

function addPlaceImage(doc, img, wid, alg, title, lit, nopeople)
{
	//if (!doc) doc = mdCache;
	if (wid === undefined || wid === "") wid = "95%";
	if (alg != "right") alg = "left";

	if (lit === undefined) {
		// Check list of outdoor places if it is night, otherwise assume lit
		lit = true;
		if (!isDay() && Place == gameState.nLastOut) lit = false;
	}
	var bgc = lit ? "transparent" : "black";
	var op = lit ? "" : ";filter:alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6";
	if (img.indexOf("UI/") == -1) img = gameState.getImagesFolder() + img;

	var s = '';
	var pm = perMod;
	var ad = false;
	while (pm !== undefined) {
		var st = pm.addImageIcon(img);
		if (st !== '') {
			if (s === '') {
				s = "<div style='float:" + alg + ";vertical-align:top;max-height:99%;border-width:2px;border-style:solid;width:" + wid +";margin: 0px 4px 0px 0px'>";
				wid = "100%;";
				ad = true;
			}
			s += st;
		}
		pm = pm.perMod;
	}
	if (!lit) {
		s += "<div style='background:" + bgc + ";float:" + alg + ";vertical-align:top;max-height:99%;border-width:2px;border-style:solid;width:" + wid +";margin: 0px 4px 0px 0px'>";
		wid = "100%;";
	} else wid += ';margin: 0px 4px 0px 0px;border-width:2px;border-style:solid';

	s += "<img draggable='false' style='float:" + alg + ";position:relative;max-height:99%;vertical-align:top;padding:0;width:" + wid + op + "' src='" + img + "' alt='" + img + "'";
	if (title !== undefined && title !== "") {
		s += " title='" + title.split('"').join("&quot;") + "'>" +
			  "<div style='float:right;margin-top:-12px;font-size:x-small;color:white'><span>" + title + "&nbsp;</span></div>";
	} else s += '>';

	if (!lit) s += '</div>';
	if (ad) s += '</div>';

	// Add any images for people as well as this image
	if (nopeople !== true) {
		var p;
		var sp;
		for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
			p = arPeople[i];
			sp = p.addPlaceImageLeft(lit, sp !== '');
			if (sp !== '') s += sp;
		}
	}
	
	// Special items shown in a location but not actual items as such that can be picked up etc
	var th = '<br><b>' + (isScreenSmall() ? "Items:" : "Things here:") + '</b><span style="font-size:small">';
	var found = 0;
	if ((Place == 436 && sType === "") || (Place == 242 && sType == "egypt")) {
		s += th + '<div style="clear:both;text-align:left"><b>Painting</b><br><img draggable="false" style="float:left;max-width:80%;max-height: 80" src="Images/amyancestor1.jpg" height="100" alt="Painting"/><br><a href="javascript:examinePainting()">Examine</a></div>';
		found++;
	} else if (Place == 345 && checkPersonFlag("Jessica", 26)) {
		s += th + '<div style="clear:both;text-align:left"><b>Painting</b><br><img draggable="false" style="float:left;max-width:80%;max-height: 80" src="Images/People/Jessica/' + (isExplicit(true) ? 'Explicit/' : '') + 'jessica_painting.jpg" height="100" alt="Painting"/><br><a href="javascript:examineJessicaPainting()">Examine</a></div>';
		found++;		
	} else if (Place == 139 && checkPersonFlag("Kate", 1) && !checkPersonFlag("Kate", 36)) {
		s += th + '<div style="clear:both;text-align:left"><b>Painting</b><br><img draggable="false" style="float:left;max-width:80%;max-height:80" src="Images/People/Kate/holidayphoto1.jpg" height="100" alt="Photo"/><br><a href="javascript:examineKatePhoto()">Examine</a></div>';
		found++;		
	}
	if (found > 0) s += '</span>';

	if (doc == "comments") addComments(s);
	else if (doc && doc != "string" && doc != "ss") doc.write(s);
	return s;
}

function addPlaceTitle(doc, tit, img, taxichance, notable, clr, lit, wid)
{
	gameState.plcTitle = tit;
	gameState.lFloat = '';
	gameState.rFloat = '';

	// Add any images for people, replacing standard place image
	var p;
	var sp;
	var bAnyImg = false;
	for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
		p = arPeople[i];
		sp = p.addPlaceImageLeft(lit);
		if (sp !== '') {
			doc.write(sp);
			bAnyImg = true;
		}
	}

	if (img !== undefined && img !== '' && !bAnyImg) addPlaceImage(doc, img, wid, "", gameState.plcTitle, lit);
	if (taxichance !== undefined && taxichance > 0) showTaxi(doc, (Math.random() * 100) > taxichance);
	
	gameState.bLeftCol = false;

	if (clr !== undefined && clr !== "") gameState.pclr = clr;
	if (notable === undefined || notable === false) {
		if (isScreenSmall()) doc.write('</td></tr><tr><td class="td-center">');
		else doc.write('</td><td class="td-center">');
	}
	if (gameState.pclr !== '') doc.write('<p style="text-align:center;font-size:x-large;color:' + gameState.pclr + ';margin-bottom:-1px;margin-top:0px"><b>' + gameState.plcTitle + '</b></p><div style="color:' + gameState.pclr + '">');
	else doc.write('<p style="text-align:center;font-size:x-large;margin-bottom:-1px;margin-top:0px"><b>' + gameState.plcTitle + '</b></p>');
	
	ShowItems();
}

function WritePlaceHeaderNI(nt, alg, clr, ss, bgimg)
{
	return WritePlaceHeader(nt, alg, clr, ss, bgimg, true);
}
function WritePlaceHeaderNP(nt, alg, clr, ss, bgimg)
{
	return WritePlaceHeader(nt, alg, clr, ss, bgimg, false, true);
}
function WritePlaceHeaderNIP(nt, alg, clr, ss, bgimg)
{
	return WritePlaceHeader(nt, alg, clr, ss, bgimg, true, true);
}

function WritePlaceHeader(nt, alg, clr, ss, bgimg, noitems, nopeople)
{
	if (gameState.nLastOut == -1) noitems = true;
	if (noitems === true) gameState.bNoItems = true;
	if (nopeople === true) gameState.bNoPeople = true;
	
	// Any custom css?
	if (ss !== undefined && ss !== '') ss = '<style>' + ss + '</style>';
	else ss = '';

	// Build page header
	gameState.nWidth = getWidth(document);
	var bgc;
	if (clr !== undefined) {
		bgc = clr;
		if (clr === "black") gameState.pclr = "white";
		else if (clr === "white") gameState.pclr = "black";
	} else if (nTheme === 0) {
		// Background colour varias based on the time of day
		var hr = getHour();
		if ((hr > 4 && hr < 8) || (hr > 17 && hr < 21)) {
			var tm = nTime % 288;
			if (tm > 144) tm = 312 - tm;
			tm = 216 + (Math.sin(Math.PI * ((tm - 60) / 72)) * 32);
			bgc = '#' + byte2Hex(tm) + byte2Hex(tm) + 'FF';
		} else bgc = hr > 5 && hr < 20 ? '#F8F8FF' : '#D8D8FF';
	}
	if (bgimg !== '' && bgimg !== undefined) bgc = (bgc === undefined ? '' : bgc) + ';background-image:url(' + bgimg + ');background-size:cover;';

	mdCache.open();

	var rm = gameState.getRightBarWidth();
	var lm = gameState.getLeftBarWidth();

	mdCache.write(ss +
		'<script type="text/javascript">initLightbox();document.onkeypress = stopRKey;window.scrollTo(0,0);</script>' +
		//"<div id='leftbar' class='sidebarleft' style='float:left;vertical-align:top;z-index:45;background-image:url(" + getThemeFolder() + "background.jpg);width:" + lm + "'>" +
		"<div id='leftbar' class='sidebarleft' style='position:fixed;left:0;top:0;vertical-align:top;z-index:45;background-image:url(" + getThemeFolder() + "background.jpg);width:" + lm + "'>" +
		getLeftBarContents() +
		"</div>" +
		'<div id="lsdbig1" style="position:absolute;top:0px;left:25px;width:15%;min-width:100px;display:none;z-index:1000">' + getLSD() + '</div>'
	);


	// Build the standard body
	mdCache.write(
		'<div style="position:fixed;z-index:-2;width:100%;height:100vh;top:0px;left:0px;;overflow-x:hidden;margin:0px 0px 0px 0px' + (bgc !== '' && bgc !== undefined ? ';background-color:' + bgc : '') + '"></div>' +
		//'<div class="mainblock" id="mainbar" style="float:left;vertical-align:top;z-index:45;width:calc(100% - ' + lm + ' - 10px - ' + rm + ')">'
  	   '<div class="mainblock" id="mainbar" style="position:absolute;left:' + lm + ';top:0;vertical-align:top;z-index:45;width:calc(100% - ' + lm + ' - 10px - ' + rm + ')">'
	);
	if (isInvisible()) mdCache.write("<style>.mainblock:before {content:' ';display:block;position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;opacity:" + (nTheme === 0 ? "0.1" : "0.4") + ";background-image:url(UI/invisiblebg.png);background-repeat:no-repeat;background-position:87% 0%;background-size:auto 100vh}</style>");
	if (nt !== true) {
		if (isScreenSmall()) alg = 'class="td-center"';
		else {
			gameState.bLeftCol = true;
			if (gameState.sLeftColSize !== '') alg = 'class="' + gameState.sLeftColSize + '"';
			else if (alg === undefined || alg === "") alg = 'class="td-left"';
			else if (alg.indexOf("td-") != -1) alg = 'class="' + alg + '"';
		}
		mdCache.write('<table id="maintable" class="table-main"><tr><td id="mainleft" ' + alg + '>');
	}
	return mdCache;
}

function WritePlaceFooter(doc, credits)
{
	if (!doc) doc = mdCache;
	gameState.lFloat = '';
	gameState.rFloat = '';
	
	// End of center table
	endMain(doc);

	// Add people/items
	if (!gameState.bNoPeople) ShowPeople();
	doc.finaliseRightCol();
	ShowPopupEvents(gameState.bNoPeople);
	
	// add credits
	addCredits(doc, credits);
	if (gameState.pclr !== '') doc.write('</div>');
	doc.write(
		'</td></tr></table></div>' +
		'<div id="hinticond" style="display:none;position:absolute;top:0;left:0;width:100vw;height:100vh;overflow-x:hidden;overflow-y:auto;z-index:81;background-size:100% 100%;background-color:transparent;cursor:none;pointer-events:none;margin:0 0 0 0"></div>' +
		'<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments()"' + (isScreenSmall() ? ' style="left:15%"' : '') + '></div>'		// onclick="ClearComments();dispPlace()"
	);

	// Build the right bar
	var rm = gameState.getRightBarWidth();

	if (gameState.nRightBarState > 0) doc.write('<div id="rightbar" class="sidebarright inventbar" style="position:fixed;top:0px;right:0;' + (gameState.nRightBarState == 2 ? 'overflow-y:hidden;' : '') + 'width:' + rm + '">' + (gameState.nRightBarState < 3 ? getInventoryContents() : getPhoneContents()) + '</div>');
	else doc.write('<div id="rightbar" class="sidebarright inventbar" style="position:fixed;top:0px;right:0;width:' + rm + ';display:none"></div>');

	// End the page
	doc.close();
}

/***************** Initialise ******************************************************************************/

// Some important variables, not arrays
var Place; 			// The location in which the player is right now
var nFromPlace;
var sPlaceParams;
var sOldPlaceParams;
var arPlaces;
var arHexagrams;

function initialisePlaces()
{
	arHexagrams = [];
	arPlaces = new MakeArray(31, 0);
	Place = 0;
	nFromPlace = 0;
	sPlaceParams = "";
	sOldPlaceParams = ""

	setPlaceKnown("Cherise Road");
	setPlaceKnown("DuckPond");
	setPlaceEnscribed(144);
	setPlaceEnscribed(123);
	setPlaceEnscribed(325);
	setPlaceEnscribed(317);
	setPlaceEnscribed(9);
	setPlaceEnscribed(194);
	setPlaceEnscribed(16);
	setPlaceEnscribed(26);
	setPlaceEnscribed(43);
	setPlaceEnscribed(53);
	setPlaceEnscribed(141);

}
