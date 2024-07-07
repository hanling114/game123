// Tina Kay's room at the Hotel

function ShowPlace181()
{
	showGeneralPlace(checkPersonFlag("DoctorKay", 2) ? 'Tina\'s Room' : 'Hotel Room', 'hotel5.jpg',
		 (per.isHere() ? '' : (checkPersonFlag("DoctorKay", 2) ? 'Dr Tina Kay\'s room' : 'The room of the nurse Bambi mentioned.')),
		 'return to the bar', 124);
}