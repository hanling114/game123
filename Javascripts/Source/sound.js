// Sound effects

function toggleSounds() {
	gameState.bSounds = !gameState.bSounds;
	saveGlobalSettings();
}

function playSound(snd)
{
	if (!gameState.bSounds) return;
	var audio;
	if (gameState.sMod !== "") {
		audio = new Audio("Mods/" + gameState.sMod.split(",")[0] + "/Sound/" + snd);
		audio.onerror = function(){playError(this)};
	} else audio = new Audio('Sound/' + snd);
	audio.play();
}

function playError(el)
{
	var m = getCurrMod(el.src);
	var s = getNextMod(m);
	if (s != "") {
		// Try the next mod in the list
		el.src = el.src.split("Mods/" + m + "/").join("Mods/" + s + "/");
		el.play();
	} else if (m !== '') {
		// Fall back to base
		el.src = el.src.split("Mods/" + m + "/").join("");
		el.play();
	}
}

function playAlarm()
{
	if (!gameState.bSounds) return;
	if (isAtLocation(16)) playSound("alarm2.mp3");
	else if (isAtLocation(25) || isAtLocation(60)) playSound("alarm3.mp3");
	else playSound("alarm1.mp3");
}
