function PuzzleGoldWorm(doc, bTrue)
{
	var perTess = findPerson("Tess");
	if (bTrue !== true) {
		bTrue =  (perTess.checkFlag(33) && ((doc.Puzzle.answera.selectedIndex + doc.Puzzle.answerb.selectedIndex) * 25 / 40) == 24.375) ||
					(perTess.checkFlag(34) && doc.Puzzle.answera.selectedIndex == 3);
	}
	if (bTrue) {
		perTess.other = 20;    // Got it right
		AddMana(20);
		perYou.addExperience(3);
	}	else {
		perTess.other = 15;   // Got it wrong
	}
	//perTess.place = 194;     // Move Tess Adams to the Shops
	gotoPlace(186, 'type=answer1');
}

// Event: Tess in the hotel room
// stype == "" - initial visit
//       == "expose" - ask her to strip

function ShowPlace186(stype)
{
	var md = WritePlaceHeader();

	var perTess = findPerson("Tess");
	if (sType == "wormpuzzle") md.write('<img src="Images/goldworm1.png" alt="Gold Worm">');
	else if (sType === "") perTess.showPerson("tess10.jpg");
	else perTess.showPerson("tess11a.jpg");

	addPlaceTitle(md, (sType == "wormpuzzle") ? "Golden Worm Puzzle" : "Mrs. Adams In Hotel Room");

	if (sType === "") {
		// Initial visit to the room
		md.write(
			'<p>"What do you think of my outfit?" gushes Mrs. Adams. ' +
			'"I picked it especially for you. As you are so young and all, I thought that you might like a cheerleader."</p>' +
			'<p>There is a strange object on the table. It kind of looks like a worm with a human head. You could be ' +
			'mistaken in thinking that the thing is actually moving. "What is it?" you ask Mrs. Adams.</p>' +
			'<p>"Oh, you saw my little surprise. This is what my..husband found. The silly thing keeps asking questions ' +
			'that I don\'t know the answer to. He said that it might be magical but I think that it is annoying."</p>'
		);
		startQuestions();
		addLinkToPlace(md, "ask Mrs. Adams to show off more of herself", Place, "type=expose");

	} else if (sType == "wormpuzzle") {
		
		if (!perTess.checkAnyFlags(33, 34)) perTess.setFlag(Math.floor(Math.random() * 2) + 33);

		md.write(
			'<p>&quot;Another stupid creature,&quot; says the magical worm. ' +
			'You wouldn\'t believe that a such a creature could exist but it does. It adds,</p>' +
			'<p>&quot;You do not have any chance of solving this riddle. Nobody ever has, but if you should do so, magic will be bestowed upon you.&quot;</p>'
		);

		if (perTess.checkFlag(33)) {
			md.write(
				'<p style="text-align:center">Insert the missing number and letter:</p>' +
				'<form method="POST" name="Puzzle">' +
						'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0;border-width:0;margin:auto">' +
							'<tr>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">I</p></td>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">9</p></td>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">P</p></td>' +
								'<td><select name="answera" size="1">' +
											'<option selected value="1">1</option>' +
											'<option>2</option>' +
											'<option>3</option>' +
											'<option>4</option>' +
											'<option>5</option>' +
											'<option>6</option>' +
											'<option>7</option>' +
											'<option>8</option>' +
											'<option>9</option>' +
											'<option>10</option>' +
											'<option>11</option>' +
											'<option>12</option>' +
											'<option>13</option>' +
											'<option>14</option>' +
											'<option>15</option>' +
											'<option>16</option>' +
											'<option>17</option>' +
											'<option>18</option>' +
											'<option>19</option>' +
											'<option>20</option>' +
											'<option>21</option>' +
											'<option>22</option>' +
											'<option>23</option>' +
											'<option>24</option>' +
											'<option>25</option>' +
											'<option>26</option>' +
											'<option>27</option>' +
											'<option>28</option>' +
											'<option>29</option>' +
											'<option>30</option>' +
									'</select></td>' +
							'</tr>' +
							'<tr>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">5</p></td>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">L</p></td>' +
								'<td style="text-align:center;width:30px"><p style="text-align:center">14</p></td>' +
								'<td><select name="answerb" size="1">' +
										'<option>A</option>' +
										'<option>B</option>' +
										'<option>C</option>' +
										'<option>D</option>' +
										'<option>E</option>' +
										'<option>F</option>' +
										'<option>G</option>' +
										'<option>H</option>' +
										'<option>I</option>' +
										'<option>J</option>' +
										'<option>K</option>' +
										'<option>L</option>' +
										'<option>M</option>' +
										'<option>N</option>' +
										'<option>O</option>' +
										'<option>P</option>' +
										'<option>Q</option>' +
										'<option>R</option>' +
										'<option>S</option>' +
										'<option>T</option>' +
										'<option>U</option>' +
										'<option>V</option>' +
										'<option>W</option>' +
										'<option>X</option>' +
										'<option>Y</option>' +
										'<option>Z</option>' +
								'</select></td>' +
							'</tr>' +
						'</table>' +
						'</div><p style="text-align:center">'
			);
		} else {
			md.write(
				'<p style="text-align:center">Insert the next number in the sequence:</p>' +
				'<form method="POST" name="Puzzle">' +
						'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0;border-width:0;margin:auto">' +
							'<tr>' +
								'<td style="text-align:center" width="8"><p>1,11,21,1211,111221,312211&nbsp;</p></td>' +
								'<td><select name="answera" size="1">' +
											'<option selected>1</option>' +
											'<option>11113121</option>' +
											'<option>22331111</option>' +
											'<option>13112221</option>' +
											'<option>21113112</option>' +
											'<option>31112111</option>' +
											'<option>13121122</option>' +
											'<option>41112211</option>' +
											'<option>11141121</option>' +
											'<option>41112121</option>' +
									'</select></td>' +
							'</tr>' +
						'</table>' +
						'</div><p style="text-align:center">'
			);
		}

		md.write('<input type="button" name="button" value="Go" onClick="PuzzleGoldWorm(document)"></p></form>');

		startQuestions('If it is too hard then:');
		addLinkToPlace(md, "go to the hotel bar", 124);

		AddPeopleColumnMed();
		if (getQueryParam("expose") == "expose") perTess.showPerson("tess11a.jpg");
		else perTess.showPerson("tess10.jpg");
		WritePlaceFooter(md);
		return;
	} else {
		// After asking her to strip
		md.write(
			'<p>Mrs Adams removes her top to reveal her firm breasts.</p>' +
			'<p>"You are so cheeky darling," says the librarian. "I just know that we are going to have so much fun together."</p>'
		);
		startQuestions();
	}

	if (!isPuzzles()) addOptionLink(md, "try to solve the worm\'s puzzle", "PuzzleGoldWorm(document, true)");
	else addLinkToPlace(md, "try to solve the worm\'s puzzle", Place, "type=wormpuzzle&expose=" + sType);
	addLinkToPlace(md, "exit the room?", 124);

	WritePlaceFooter(md);
}