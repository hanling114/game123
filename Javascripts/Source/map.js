// Map display functions

function checkVis(svg, id, label) {
	var place = svg.getElementById(id);
	var vis = "hidden";
	if (isPlaceKnown(label)) vis = "visible";
	//alert('checkVis: ' + id + ' ' + label + ' set ' + vis);
	place.setAttribute("visibility", vis);
}

function filterByValue(svg, keyvalue_pairs, list) {
	var generateExpression = function(key, value) {
		var parseValue = function(value) {
			var result = "";
			switch(value[0]) {
				case '!': case '<': case '>': case '=':
					result += value[0] + '=';
					value = value.substr(1);
					break;
				default:
					result += '==';
					break;
			}
			result += '"' + value + '"';
			return result;
		};
		var test = "";
		switch(typeof value) {
			case "object":
				test += '(';
				for (var i in value) {
					var val = value[i];
					if (Number(i))	test += "||";
					test += 'o["' + key + '"]' + parseValue(val);
				}
				test += ')';
				break;
			case "string":
				test += 'o["' + key + '"]' + parseValue(value);
				break;
		}

		return test;
	};
	var result = [];
	var keys = Object.getOwnPropertyNames(keyvalue_pairs);

	// generate code string for all objects in list
	var test = "";
	for (var k in keys) {
		var key = keys[k];
		if (Number(k))	test += "&&";
		test += '(o.hasAttribute("' + key + '")';
		var value = keyvalue_pairs[key];
		switch(typeof value) {
			case "object": case "string":
				test += "&&" + generateExpression(key, value) + ')';
				break;
			case "null":
				test += ")";
				break;
		}
	}
	for (var i in list) {
		var o = list[i];
		//var j = keys.length - 1;
		if (typeof o != "object") continue;
		if (eval(test)) result.push(o);
	}
	return result;
}

function getLayers(svg) {
	var groups = svg.getElementsByTagName("g");
	return filterByValue(svg, {"onload": "!"}, groups);
}

function checkMap()
{
	var mapd = document.getElementById("map");
	var map = null;
	try {
		if (isChrome()) map = mapd === null ? null : mapd;
		else map = mapd === null ? null : mapd.contentDocument;
		if (!map) map = mapd;
	}
	catch(err) { map = mapd === null ? null : mapd; }
	if (map === null) return;
	mapd.style.visibility = 'hidden';
	var list = getLayers(map);
	for (var i in list)
	{
		var o = list[i];
		if (typeof o != "object") continue;
		if (/\d/.test(o.id)) continue;

		if (o.hasAttribute("inkscape:label")) checkVis(map, o.id, o.getAttribute("inkscape:label"));
	}
	mapd.style.visibility = 'visible';
}

var oPlaceMap = {
	// Individual places
	"2"  : { ar: [3,7,8,29] },
	"9"  : { ar: [10,11,12,69,70,71,72,73,74,75,76,77,78,144,145,234,252] },
	"16" : { ar: [14,15,17,18,20,21,65,192,290,291,293,296,297,298] },
	"25" : { ar: [24] },
	"26" : { ar: [34,86,247,248,249] },
	"45" : { ar: [40,41,46,122,154,156,374,408] },
	"50" : { ar: [51] },	
	"52" : { ar: [53,54] },	
	"60" : { ar: [61] },
	"63" : { ar: [87] },
	"94" : { ar: [95,96,97,98,99,100,101,102,110] },
	"112": { ar: [113,114] },
	"123": { ar: [124,125,161,181,182,184,185,186,193,267,269,339,340,341,342,343,375] },
	"131": { ar: [132] },
	"167": { ar: [168,169,172,175,260,261] },
	"176": { ar: [81,82,83] },
	"177": { ar: [139] },
	"215": { ar: [213,214,275,278,441,442,443,444,445] },
	"225": { ar: [223,224,226] },
	"230": { ar: [231] },
	"238": { ar: [239,240,241,242,243,244,245,246] },
	"279": { ar: [237,283] },
	"282": { ar: [280,281] },
	"302": { ar: [303] },
	"317": { ar: [318,319,320,321,322,323,326,327,332,382,383,384,385] },
	"345": { ar: [346,347,348] },
	"355": { ar: [356] },
	"360": { ar: [361,362,363,364] },	
	"370": { ar: [366,367,371,372,412,413,414,415,416,417] },
	"390": { ar: [391,392] },
	"400": { ar: [401,402] },
	"420": { ar: [422,423,425] },
	"435": { ar: [434] },
	"455": { ar: [456,457,458,459,460,461,462,463,464,465,466,490,491,492,493,494] },
	"470": { ar: [471,472,473] },
	"480": { ar: [481,482] },
	
	// Containers, ie locations with multiple places like stores
	// AND where the places can be separately listed 
	"194": { container: true, ar: [195,196,197,198,199,203,224,225,237,280,281,282,283,284,344,345,346,347,348,355,356] }

};

function isAtLocation(plc, at)
{
	if (at === undefined) at = Place;
	if (at == plc) return true;
	var plclist = Object.getOwnPropertyNames(oPlaceMap);
	plc = oPlaceMap[plc + ""];
	if (plc === undefined || plc.ar === undefined) return false;
	return plc.ar.indexOf(at) != -1;
}

function getLocation(at)
{
	if (at === undefined) at = Place;
	var plc;
	var plclist = Object.getOwnPropertyNames(oPlaceMap);
	var w = 0;
	for (var i = 0, ie = plclist.length; i < ie; i++) {
		plc = oPlaceMap[plclist[i]];
		if (plc === undefined || plc.ar === undefined) continue;
		if (plc.ar.indexOf(at) != -1) {
			if (w !== 0 && plc.container !== undefined) continue;
			w = parseInt(plclist[i], 10);
		}
	}
	if (w !== 0) return w;
	return at;
}

function getLocationOnMap(map)
{
	var plc;
	var plclist = Object.getOwnPropertyNames(oPlaceMap);
	var w = 0;
	for (var i = 0, ie = plclist.length; i < ie; i++) {
		plc = oPlaceMap[plclist[i]];
		if (plc === undefined || plc.ar === undefined) continue;
		if (plc.ar.indexOf(Place) != -1) {
			if (w !== 0 && plc.container === undefined) continue;
			w = parseInt(plclist[i], 10);
		}
	}
	if (w !== 0) return w;

	// check existing places/buildings
	if (map !== undefined) {
		for (var obj in map) {
			if (!map.hasOwnProperty(obj)) continue;
			if (map[obj].id == Place) return Place;
			if (!map[obj].show()) continue;
			var plcid = 0;
			map[obj].buildings.forEach(function(b) {
				if (b.id == Place) plcid = Place;
			});
			if (plcid !== 0) return Place;
		}


		// Fallback
		if (gameState.nLastOut !== 0) return gameState.nLastOut;
	}
	return Place;
}

function addPlace(id, name, color, d, text_x, text_pos, classes, hide, construction, pos)
{
	this.id			= id;	// place id
	this.name		= name;	// road name
	this.color		= color;	// road, text and building outline color
	this.d			= d;		// path coordinates
	this.text_x		= text_x;   // text starting point on path
	this.text_pos	= text_pos; // text 'up':over path, 'down' under path, number: position depending on number
	this.classes	= classes;  // additional classes - like "dash"
	this.show		= function() { return isPlaceKnown(this.id) || isPlaceKnown(this.name.replace(/_/g,'')); }; // checks if the place should be printed
	this.hide		= hide;  // hide if not visited or show grayed out?
	this.construction = construction; // position of construction sign; none if false;
	this.pos			= pos;	// Location for 'Here You are' image
	this.buildings	= [];   // buildings

	this.addBuilding = function(id, name, img, size, pos, romb1, rec, romb2, p2)
	{
		// function to add buildings
		var building = {};
		building.id		= id;	// id number
		building.name	= name;	// name of the place
		building.img	= img;	// image url
		building.size	= size;	// image size (x,y)
		building.pos	= pos;	// x,y position of top left corner of the img
		building.romb1	= romb1;	// position of romb on the road
		building.p2 = p2;
		building.romb2	= romb2;	// position of romb on the road
		building.rect = rec !== false;	// Show a border rectangle
		building.show	= function() {
			// checks if the building should be printed
			var bOk = true;
			if (gameState.plcTitle == "Teleport") {
				// Special cases
				if (isPlaceAttuned(53) && this.id == 52) return true;
				else if (isPlaceAttuned(319) && this.id == 317) return true;
				bOk = isPlaceAttuned(this.id) || this.id == 45;		// Attuned or is your home!
				if (perYou.checkFlag(21)) {
					if (this.id == 52 || this.id == 26 || this.id == 123 || this.id == 176 || this.id == 177 || this.id == 230 || this.id == 9) bOk = true;
				}
			} else bOk = isPlaceKnown(this.name.replace(/_/g, ''));
			return bOk;
		};
		this.buildings.push(building); // add building to the place
	};
}

function addHereHex(id, plc, x, y, clk, bHexHere, hexsize, hx, hy)
{
	if (hx === undefined) hx = x + 18;
	if (hy === undefined) hy = y + 18;
	var svg = (plc == id ? '<image id="here" x="' + x + '" y="' + y + '" height="60" width="60" xlink:href="UI/map/here.png"/>' : '');
	if (bHexHere) svg += '<image x="' + hx + '" y="' + hy + '" height="' + hexsize + '" width="' + hexsize + '" xlink:href="UI/themes/theme0/symbol1.png"' + (clk !== '' && plc != id && gameState.plcTitle == "Teleport" ? ' cursor="pointer" onclick="' + clk + '"': '') + '/>';
	var pm = perMod;
	while (pm !== undefined) {
		svg += pm.addMapIcon(id, x, y);
		pm = pm.perMod;
	}
	return svg;
}

function renderPlace(p, plc, clkfn)
{
	// p:place
	// returns svg for the road p
	// if the road is not yet visible then depending on p.hide it's printed grayed out (hide:false) or not at all (hide:true)
	// if the road is visible then it's printed in color defined for the road and with name
	// visibility is checked with p.show() which fires isPlaceKnown() for p.id nad p.name
	var text_pos;
	switch (p.text_pos) {
		case 'up': text_pos = -3; break;
		case 'down': text_pos = 8; break;
		default: text_pos = p.text_pos; break;
	}
	var classes = p.classes ? 'class="' + p.classes + '"' : "";
	var color = p.show() ? p.color : "#b3b3b3";

	if (!p.show() && p.hide) return "";

	var clk = '';
	if (clkfn !== undefined) clk = clkfn(p.id);

	var pm = perMod;
	var tname = p.name.split('').join(' ').replace(/_/g,' ');
	while (pm !== undefined) {
		tname = pm.replaceText(tname);
		pm = pm.perMod;
	}	
	var svg = '<path id="' + p.name + '" ' + classes + ' style="stroke:' + color + ';" d="' + p.d + '"/>';
	if (p.show()) svg += '<text xml:space="preserve" dx="' + p.text_x + '" dy="' + text_pos + '" fill="' + p.color + '" ><textPath xlink:href="#' + p.name + '">' + tname + '</textPath></text>';
	if (p.pos !== undefined) svg += addHereHex(p.id, plc, p.pos.x, p.pos.y, clk, isPlaceAttuned(p.id), 24);
	
	if (p.show() && p.construction) {
		var romb = addRomb(p,p.construction, true);
		var romb2 = addRomb(p,p.construction + 70, true);
		return svg + '<rect x="' + (romb.p.x - 1) + '" y="' + (romb.p.y - 1) + '" width="' + (romb2.p.x - romb.p.x + 2.5) + '" height="' + (romb2.p.y - romb.p.y + 2.5) + '" fill="url(#construction)" />' + romb.print + romb2.print + '<text xml:space="preserve" dx="' + (p.construction + 10) + '" dy="-3" fill="url(#construction)" ><textPath xlink:href="#' + p.name + '">Construction</textPath></text>';
	}
	return svg;
}

function renderBuilding(p, b, plc, clkfn)
{
	// p:place; b:building;
	// returns svg for building b with romb on road p - connected with line to the center of the image of building
	if (!b.show()) return "";
	var bOk = gameState.plcTitle == "Teleport";

	var svg = "";

	if (b.romb1 >= 0) {
		var romb1 = addRomb(p, b.romb1, false);
		var pos2 = { x: (b.pos.x + (b.size.x / 2)), y: (b.pos.y + (b.size.y / 2)) };
		svg = '<line x1="' + romb1.p.x + '" y1="' + romb1.p.y + '" x2="' + pos2.x + '" y2="' + pos2.y + '" style="stroke:' + p.color + '; stroke-width:2;" />' + romb1.print;
	}
	if (b.romb2 >= 0) {
		var romb2 = addRomb(b.p2, b.romb2, false);
		var pos2 = { x: (b.pos.x + (b.size.x / 2)), y: (b.pos.y + (b.size.y / 2)) };
		svg += '<line x1="' + romb2.p.x + '" y1="' + romb2.p.y + '" x2="' + pos2.x + '" y2="' + pos2.y + '" style="stroke:' + b.p2.color + '; stroke-width:2;" />' + romb2.print;
	}	
	// Add Onclick?
	var clk = '';
	if (clkfn !== undefined) clk = clkfn(b.id);
	//svg+= '<rect  x="'+b.pos.x+'" y="'+b.pos.y+'" height="'+b.size.y+'" width="'+b.size.x+'" style="stroke:none; fill:#ffffff; " />'; // white background behind images in case the dimensions aren't right;
	var tname = b.name.replace(/_/g,' ');
	var img = b.img;
	if (perMod !== undefined) {
		var pm = perMod;
		while (pm !== undefined) {
			tname = perMod.replaceText(tname);
			img = perMod.replaceText(img, "map");
			pm = pm.perMod;
		}
	}

	var sn = capitalize(b.name.split(gameState.sTown + ' ').join('').split(getShopStore()).join('').split(getShopStore(true)).join('').split("Apartments").join(''));
	svg +=
		'<image x="' + b.pos.x + '" y="' + b.pos.y + '" height="' + b.size.y + '" width="' + b.size.x + '" xlink:href="' + img + (plc != b.id && clk !== '' ? '" cursor="pointer" onclick="' + clk : '') + '"> <title role="tooltip">' + tname + '</title></image>' +
		(b.rect ? '<rect  x="' + b.pos.x + '" y="' + b.pos.y + '" height="' + b.size.y + '" width="' + b.size.x + '" style="stroke:' + p.color + '; stroke-width:2; fill:none; " />' : '') +
		'<text font-size="0.4em" font-weight="bold" style="fill:yellow;stroke:black;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0.5" x="' + b.pos.x + '" y="' + (b.pos.y + b.size.y) + '">' + sn + '</text>';
	
	return svg + addHereHex(b.id, plc, (b.pos.x - 23), (b.pos.y + b.size.y - 60), '', bOk, 18, b.pos.x, b.pos.y)
}

function addRomb(p, x, construction)
{
	// adds romb on road
	// if construction is set to false it's the same color as road with white fill
	// if construction is set to true it's red romb with exclamation
	// p - place; x - position on road; construction - true if construction romb
	// returns svg for printing (.print) and position of the center of the romb (.p.x, .p.y)
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttributeNS(null, "d", p.d);
	var point = path.getPointAtLength(x);
	var rombsize = 3;
	var color = construction ? "#860000" : p.color;
	var fill  = construction ? "#ff0000" : "#ffffff";

	var svg = '<g transform="translate(' + (point.x - rombsize) + ',' + (point.y - rombsize) + ')">' +
		'<path style="fill:' + fill + '; stroke:' + color + ';stroke-width:1;" d="m' + rombsize + ',0 L' + (2 * rombsize) + ',' + rombsize + ' L' + rombsize + ',' + (2 * rombsize) + ' L0,' + rombsize + ' Z"/>' +
		(construction ? '<path style="fill:#ffffff;stroke:none;" d="M2.8,3.1L2.7,2.1c0-0.2,0-0.3,0-0.4c0-0.1,0-0.2,0.1-0.3S2.9,1.4,3,1.4c0.1,0,0.2,0,0.2,0.1s0.1,0.2,0.1,0.3 		c0,0.1,0,0.2,0,0.3l-0.1,1c0,0.1,0,0.2-0.1,0.3S3.1,3.4,3,3.4c-0.1,0-0.1,0-0.1-0.1S2.8,3.2,2.8,3.1z M3,4.4c-0.1,0-0.1,0-0.2-0.1 	S2.7,4.2,2.7,4.1c0-0.1,0-0.1,0.1-0.2S2.9,3.8,3,3.8s0.2,0,0.2,0.1S3.3,4,3.3,4.1c0,0.1,0,0.2-0.1,0.2S3.1,4.4,3,4.4z"/>' : '') +
		'</g>';
	return { print:svg, p:point };
}

function renderMap(clkfn)
{
	var map = {};
	var tnm = gameState.sTown;

	// streets definitions
	map['Amaranth_Place']	= new addPlace(38,	'Amaranth_Place',		'#ff0066', "M569.1,542.8v-29.4c0-5.1,2.5-9,9-9l173-0.1", 15, 'up', false, false, false, {x:600, y:450});
	map['Cherise_Road']		= new addPlace(37,	'Cherise_Road',		'#0066ff', "M305.8,576.9h48.8c4.3,0,8-4,8-8V445.7 c0-4.5-3.1-8.3-8.3-8.3h-83.1", 85, 'up', false, false, false, {x:335, y:400});
	map['Tunnel']				= new addPlace(249,	'Tunnel',				'#000080', "M271.1,187.1l-0.3-96.7", 45, 'up', "dash", true, false);
	map['Catacomb_Tunnel']	= new addPlace(323,	'Catacomb_Tunnel',	'#202090', "M516.3,482.4h180.9c7.7,0,10.2-2.6,10.2-10.2l0-61.9", 115, "down", "dash", true, false);
	map['Park_Bridge']		= new addPlace(216,	'Park_Bridge',			'#9a00c0', "M271.1,240.8h81,", 5, 'down', false, false, false);
	map['Park']					= new addPlace(47,	'Park',					'#cd00ff', "M271.1,318.4V187.1", 45, 'up', false, false, false);
	map['Kollam_Street']		= new addPlace(44,	'Kollam_Street',		'#ff0000', "M271.1,318.4v180.6", 55, 'down', false, false, false, {x:241, y:330});
	map['Scholastic_Road']	= new addPlace(2,		'Scholastic_Road',	'#01fa01', "M271.1,318.4h187.5", 45, 'down', false, false, false);
	map['Rathdown_Road']		= new addPlace(229,	'Rathdown_Road',		'#aa0088', "M458.5,543.8h110.6", 5, 'up', false, false, false, {x:500, y:490});
	map['Dervish_Road']		= new addPlace(5,		'Dervish_Road',		'#00aa88', "M128.4,499.6l-0.1,77.1c0,16.4,7.6,18.6,18.3,18.6 h140.3c12.1,0,18.9-4.2,18.9-18.3", 115, 'up', false, false, false, {x:168, y:560});
	map['Alleyway']			= new addPlace(52,	'Alleyway',				'#000080', "M154.3,369.4l116.8-0.1", 5, 'up', false, true, false);
	map['Church_Lane']		= new addPlace(317,	'Church_Lane',			'#00ccff', "M751.1,356.1v148.3", 5, 'up', false, false, 80);
	map['Broken_Oar_Street']= new addPlace(123,	'Broken_Oar_Street',	'#ff00cc', "M458.6,318.4v224.8", 5, 'up', false, false, false);
	map['Main_Street']		= new addPlace(94,	'Main_Street',			'#ff6600', "M458.6,318.1l86.4,0c48.4,0,59.3,38.3,99.7,38.2 l106.3-0.3", 120, 'up', false, false, 230);
	map['Shopping_Center']	= new addPlace(194,	'Shopping_Center',	'#00ffcc', "M128.4,498.9l168.2,0.3c6.5,0,9.2,2.8,9.2,10v67.8", 5, 'down', false, false, false);
	map['Yoolaroo_Drive']	= new addPlace(43,	'Yoolaroo_Drive',		'#800000', "M178.4,498.9l-0.1-38.6c0-19.1-34.4-22.9-34.4-59.1 l0.4-22.4c0,0.9-9.3-4.9-9.3-9.3c0-4.4,4.9-9.3,9.3-9.3c3.9,0,9.4,5.3,9.6,9.3c0.2,4.4-9.6,9.3-9.6,9.3", 25, 'down', false, false, false, {x:115, y:350});
	map['Oakpine_Road']		= new addPlace(1001,	'Oakpine_Road',		'#0b830b', "M458.5,318.3v-79.9c0-54.5,86.1-47.5,86.1-81.1V90.5", 100, 'up', false, false, false);
	map['Parkview_Road']		= new addPlace(1002,	'Parkview_Road',		'#000000', "M64.7,90.5h479.7", 60, 'down', false, false, 409.3);

	map['Radio_Drive']		= new addPlace(1003,	'Radio_Drive',			'#aa4300', "M545,318.4v82.8c0,19.9,17.4,13.5,17.4,39.5", 5, 'up', false, false, false);
	map['Celeste_Road']		= new addPlace(455,	'Celeste_Road',		'#4b834b', "M544.6,109.2h236.8v91", 5, 'up', false, false, false, {x:594,y:69});

	// buildings definitions
	map['Oakpine_Road'].addBuilding(		360,	tnm + " Aquarium",			"Images/aquarium1.jpg",	{x:90, y:60 }, {x:445, y:100}, 228);
	map['Oakpine_Road'].addBuilding(		238,	tnm + " Museum",				"Images/museum.jpg",		{x:72, y:60 }, {x:555, y:120}, 215);

	map['Celeste_Road'].addBuilding(		456,	"Celeste Apartments",		"Images/apartments1.jpg",{x:60, y:60 }, {x:555, y:35}, 41);

	map['Kollam_Street'].addBuilding(	45,	"Home",							"Images/house4.jpg",		{x:70, y:44}, {x:280, y:330}, 33);
	map['Kollam_Street'].addBuilding(	112,	"Kellys' House",				"Images/house7.jpg",		{x:70, y:44}, {x:280, y:380}, 83);
	map['Kollam_Street'].addBuilding(	50,	"Heather's House",			"Images/house19.jpg",	{x:40, y:55}, {x:220, y:375}, 83);
	
	map['Alleyway'].addBuilding(			53,	"Hidden",						"Images/hiddenroom.jpg",{x:39, y:59}, {x:170, y:369.5}, -1); //width="460" height="600"
	map['Church_Lane'].addBuilding(		317,	"Lady of Our Heavenly Father","Images/church1.jpg",{x:80, y:79}, {x:665, y:365}, 45); // width="737" height="721"
	
	map['Main_Street'].addBuilding(		94,	tnm + " Town Hall",			"Images/cityhall1.jpg", 	{x:60, y:(60/472*576)}, {x:540, y:240}, 77);// width="472" height="576"
	map['Main_Street'].addBuilding(		105,	"Firestation",					"Images/firestation.jpg", 	{x:68, y:43}, {x:465, y:270}, 42);// width="472" height="576"

	map['Cherise_Road'].addBuilding(		435,	"Gym",							"Images/gymoutside1.jpg",{x:55, y:(55/785*600)}, {x:280, y:445}, 270); // width="785" height="600"
	map['Cherise_Road'].addBuilding(		440,	"Logan House",					"Images/house16.jpg",	{x:70, y:48}, {x:378, y:432}, 174); // width="600" height="400"	
	map['Cherise_Road'].addBuilding(		436,	"Ross' House",					"Images/house11.jpg",	{x:70, y:48}, {x:373, y:490}, 114); // width="600" height="400"
	map['Cherise_Road'].addBuilding(		400,	"Aunt's House",				"Images/house12.jpg",	{x:70, y:53}, {x:373, y:550}, 50); // width="600" height="400"
	map['Cherise_Road'].addBuilding(		432,	"Melanie's",					"Images/house17.jpg",	{x:50, y:60}, {x:317, y:585}, 39); // width="600" height="400"

	map['Park'].addBuilding(				47,	tnm + " Park",					"Images/park1.jpg",		{x:45, y:60}, {x:280, y:250}, 38); // width="450" height="600"
	map['Park'].addBuilding(				63,	"Park Pathway",				"Images/park3.jpg",		{x:35, y:(35/256*375)}, {x:225, y:226}, 90.5); // width="256" height="375"
	map['Park'].addBuilding(				60,	"Barn",							"Images/barn2.jpg",		{x:30, y:(25/256*375)}, {x:195, y:226}, -1); // width="256" height="375"
	map['Park'].addBuilding(				26,	"Wild Ranges",					"Images/stones.jpg",		{x:70, y:70}, {x:190, y:150}, 140); //width="439" height="434"
	map['Park'].addBuilding(				25,	"Campsite",						"Images/campsite3.jpg",	{x:27, y:45}, {x:162, y:150}, -1); //width="439" height="434"	
	map['Park'].addBuilding(				25,	"Cabin",							"Images/cabin1.jpg",		{x:30, y:20}, {x:144, y:129}, -1); //width="439" height="434"		
	map['Park'].addBuilding(				23, 	tnm + " Lake", 				"Images/lake.png", 		{x:140, y:130}, {x:55, y:165}, -1, false);

	map['Scholastic_Road'].addBuilding(	9,		tnm + " High School",		"Images/school1.jpg",	{x:60, y:(60/491*600)}, {x:200, y:283}, 0); //width="491" height="600"
	map['Scholastic_Road'].addBuilding(	2,		"Glenvale Library",			"Images/library1.jpg",	{x:86, y:56}, {x:350, y:255}, 70); //width="660" height="440"
	map['Park_Bridge'].addBuilding(		215,	tnm + ' Hospital',			"Images/hospital1.jpg",	{x:88, y:(88/640*427)}, {x:340, y:135}, 1000, undefined, 200, map['Oakpine_Road']);// width="640" height="427"
	map['Park_Bridge'].addBuilding(		220,	"Zali's House",				"Images/house18.jpg",	{x:64, y:40}, {x:380, y:209}, 1000);// width="640" height="427"
	//map['Park_Bridge'].addBuilding(		216,	"Park Bridge",					"Images/park2.jpg",		{x:48, y:(48/665*799)}, {x:280, y:172}, 33);// width="665" height="799"
	map['Broken_Oar_Street'].addBuilding(325,	tnm + " Graveyard",			"Images/graveyard.jpg",	{x:67, y:43}, {x:468, y:440}, 143); // width="800" height="528"
	map['Broken_Oar_Street'].addBuilding(123,	"Broken Inn Hotel",			"Images/hotel1.jpg",		{x:80, y:65}, {x:365, y:360}, 76); // width="500" height="400"

	map['Yoolaroo_Drive'].addBuilding(	177,	"Granger's House",			"Images/house3.jpg",		{x:70, y:44}, {x:50, y:347}, 145); // width="600" height="365"
	map['Yoolaroo_Drive'].addBuilding(	176,	"Robbins' House",				"Images/house1.jpg",		{x:70, y:44}, {x:60, y:396}, 91); // width="600" height="377"
	map['Yoolaroo_Drive'].addBuilding(	460,	"Tanika's House",				"Images/house15.jpg",	{x:65, y:48}, {x:85, y:445}, 28); // width="600" height="377"

	map['Dervish_Road'].addBuilding(		420,	"Bartel's House",				"Images/house2.jpg",		{x:70, y:53}, {x:45, y:532}, 60); //width="800" height="600"
	map['Dervish_Road'].addBuilding(		430,	"Kristin's House",			"Images/house8.jpg",		{x:70, y:48}, {x:45, y:595}, 83);// width="600" height="412"
	var s = findPerson("Charley").getPersonNameShort();
	map['Dervish_Road'].addBuilding(		427,	s + "'s Salon",				"Images/salon-" + (s == "Charley" ? "charley" : "karley") + ".jpg",	{x:60, y:32}, {x:125, y:610}, 117);
	map['Dervish_Road'].addBuilding(		390,	"Principal's House",			"Images/house16.jpg",	{x:70, y:48}, {x:191, y:610}, 184);
	
	map['Shopping_Center'].addBuilding(	194,	"Shopping Center",			"Images/shops1.jpg",		{x:(50/123*189), y:50}, {x:270, y:515}, -1); //width="189" height="123"
	map['Shopping_Center'].addBuilding(	470,	"Haven Apartments",			"Images/apartments2.jpg",{x:50, y:50 }, {x:195, y:440}, 92);
	map['Shopping_Center'].addBuilding(	344,	"New Age Store",				"Images/newage.jpg",		{x:38, y:57 }, {x:225, y:510}, 118);
	//map['Shopping_Center'].addBuilding(	355,	"Theatre",						"Images/theatre.jpg",	{x:60, y:40 }, {x:135, y:510}, 35);
	//map['Shopping_Center'].addBuilding( 600,	"Cafe",							"Images/cafe.jpg",		{x:140, y:130}, {x:55, y:165}, -1, false);	
	
	map['Parkview_Road'].addBuilding(	16,	"Mansion",						"Images/mansion.jpg",	{x:93.6, y:60}, {x:280, y:22}, 215); // width="936" height="600"
	map['Parkview_Road'].addBuilding(	141,	"Sacred Clearing",			"Images/stones3.jpg",	{x:98, y:60}, {x:170, y:22}, 207); // width="491" height="301"
	map['Parkview_Road'].addBuilding(	131,	"Ursula's House",				"Images/house20.jpg",	{x:70, y:44}, {x:80, y:38}, 50);
	map['Parkview_Road'].addBuilding(	135,	"Charles's House",			"Images/house21.jpg",	{x:65, y:44}, {x:45, y:100}, 12);	
	map['Tunnel'].addBuilding(				249,	"Tunnel",						"Images/tunnel1.jpg",	{x:50, y:42.6}, {x:271, y:105}, -1); // width="250" height="213"

	map['Rathdown_Road'].addBuilding(	230,	"Adams' House",				"Images/house5.jpg",		{x:70, y:44}, {x:535, y:553}, 130);// width="600" height="377"
	map['Rathdown_Road'].addBuilding(	302,	"Gina's House",				"Images/house6.jpg",		{x:70, y:44}, {x:454, y:553}, 31);//  width="720" height="466"
	map['Rathdown_Road'].addBuilding(	228,	"Ms Titus's House",			"Images/house13.jpg",	{x:70, y:44}, {x:478, y:488}, 55);//  width="720" height="466"

	map['Amaranth_Place'].addBuilding(	450,	"Leanne's House",				"Images/house10.jpg",	{x:70, y:53}, {x:740, y:513}, 210);// width="600" height="450"
	map['Amaranth_Place'].addBuilding(	452,	"Gabby's House",				"Images/house9.jpg",		{x:70, y:53}, {x:660, y:513}, 157);// width="600" height="450"
	map['Amaranth_Place'].addBuilding(	451,	"Lola's House",				"Images/house11.jpg",	{x:70, y:48}, {x:765, y:440}, 260);// width="600" height="450"
	
	map['Radio_Drive'].addBuilding(		167,	"Police Station",				"Images/police1station.jpg", {x:50, y:(50/215*287)}, {x:485, y:325}, 40);// width="215" height="287"
	map['Radio_Drive'].addBuilding(		370,	"TV &amp; Radio Station",	"Images/radio1.jpg",		{x:75, y:(75/277*237)}, {x:570, y:405}, 1000); //width="277" height="237"
	map['Radio_Drive'].addBuilding(		366,	tnm + " Herald",				"Images/newspaper.jpg",	{x:60, y:42}, {x:560, y:357}, 58); //width="277" height="237"

	if (perMod !== undefined) {
		var pm = perMod;
		while (pm !== undefined) {
			pm.addMapLocations(map);
			pm = pm.perMod;
		}
	}
	
	var cPS = 20; // constructionPatternSize

	// svg definitions
	var mapSvg =
		"<?xml version=\"1.0\" encoding=\"utf-8\"?><svg class=\"shadow\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"100%\" viewBox=\"0 0 860 660\" xml:space=\"preserve\"><defs>" + 
		'<pattern id="construction" patternUnits="userSpaceOnUse" width="' + cPS + '" height="' + cPS + '"><rect x="0" y="0" width="' + cPS + '" height="' + cPS + '" fill="#000000" /><path style="stroke:#ffff00; stroke-width:' + (cPS / 3) + ';" d="M-4,4 l8,-8 M0,' + cPS + ' l' + cPS + ',-' + cPS + ' M' + (cPS - 4) + ',' + (cPS + 4) + ' l8,-8\" /></pattern>' +
		"<style type=\"text/css\">	path {fill: none;stroke-width:2;stroke-linecap: round;stroke-linejoin: round;} text {font-family:Tahoma, Arial;font-size:8px;font-weight:bold;letter-spacing:0px;stroke:none;} #outside {stroke:#b3b3b3;} .dash {stroke-dasharray:5,4;}</style></defs>" +
		// dashed outside roads
		'<g id="outside" class="dash">' +
			'<path d="M124,90.5v57.7 c0,10.3,1.4,24.5-23.4,24.4c-70.5-0.2-73.1,125.7,0,125.7h44.2V360"/>' +
			(Place >= 480 && Place <= 481 ? addHereHex(Place, Place, 30, 200, '', isPlaceAttuned(Place), 24) : '') +
			'<path d="M683.5,356.2V224.6h-37.2"/>' +
			'<path d="M683.5,246.6h107.7"/>' +
		'</g>';

	var plc = getLocationOnMap(map);

	// print roads
	for (var obj in map) {
		if (map.hasOwnProperty(obj)) mapSvg += renderPlace(map[obj], plc, clkfn);
	}

	// print visible buildings
	for (var objb in map) {
		if (!map.hasOwnProperty(objb)) continue;
		if (!map[objb].show()) continue;
		map[objb].buildings.forEach(function(b) { mapSvg += renderBuilding(map[objb], b, plc, clkfn); });
	}

	if (mapSvg.indexOf("here.png") != -1) return mapSvg + '<use xlink:href="#here"><title role="tooltip">You are here</title></use></svg>';
	return mapSvg + '</svg>';
}

function getMapHTML(wid, hei, clkfn)
{
	if (isSafari()) return '<object height="' + hei + '" width="' + wid + '" style="visibility:hidden" id="map" type="image/svg+xml" data="UI/map/map.svg"></object>';

	var parser = new DOMParser();
	var doc = parser.parseFromString(renderMap(clkfn), "image/svg+xml");
	if (doc.documentElement.outerHTML === undefined) {
	  var temp = document.createElement('div');
	  //temp.style.cssText = 'height:' + hei +';width:' + wid;
	  temp.style.width = wid;
	  temp.style.height = hei;
	  var dnode = doc.documentElement.cloneNode(true);
	  temp.appendChild(dnode);
	  return temp.innerHTML;
	}
	return doc.documentElement.outerHTML;
}
