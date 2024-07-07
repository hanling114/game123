// Images for events/scenes
// NOTE: if an image is named like home-event.jpg use an object here home_event
var oImages = {
	
// fixed: images in the game with set filenames controlled in sourcecode. Person independent
fixed: {
	magazines_hard: 23,	// Magazines in your storage chest, hardcore. Numeric suffix, no limit, last image is fixed, female player only
	magazines_soft: 16,	// Magazines in your storage chest, softore.  Numeric suffix, no limit
	occult_books: 17,		// Occult books to study with Sir Ronald. Note: strictly a-z suffix supported currently, so 26 max
	monsters: 8,			// Monsters in the Sacred Clearing. a-z suffix
	phonewallpapers: 20,	// Wallpaper images in your phone, max 32
	tvplain: 1,				// Boring TV shows at home. Numeric suffix, unlimited
	tvkink: 8				// More kinky TV shows. Numeric suffix, unlimited. id 1,2 should be news type programs
},

// Church: images for members of the cult of flesh
Church: {
	Nun1: {
		Explicit: {
			straight: 1
		},
		pool: 1,
		straight: 1,
		lesbian: 1,
		pool_sex: 1
	},
	Nun2: {
		Explicit: {
			straight: 1
		},
		pool: 1,		
		straight: 1,
		lesbian: 1,
		pool_sex: 1
	},
	Nun3: {
		Explicit: {
			straight: 1
		},
		pool: 1,		
		straight: 1,
		lesbian: 1,
		pool_sex: 1
	},
	Nun4: {
		Explicit: {
			straight: 1
		},
		pool: 1,		
		straight: 1,
		lesbian: 1,
		pool_sex: 1
	},
	Nun5: {
		pool: 1,		
		straight: 1,
		lesbian: 1,
		pool_sex: 1
	},
	Nun6: {
		Explicit: {
			straight: 1
		},
		pool: 1,
		pool_sex: 1,
		straight: 1,
		lesbian: 1
	},
	Nun7: {
		Explicit: {
			straight: 1
		},
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	},
	Nun8: {
		straight: 1,
		lesbian: 1
	},
	Nun9: {
		Explicit: {
			straight: 1
		},
		straight: 1,
		lesbian: 1
	},
	Nun10: {
		Explicit: {
			straight: 1
		},		
		pool: 1,
		straight: 1,
		lesbian: 1
	},
	Nun11: {
		Explicit: {
			straight: 1
		},		
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	},
	Nun12: {
		Explicit: {
			straight: 1
		},			
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	},
	Nun13: {
		Explicit: {
			straight: 1
		},			
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	},
	Nun14: {
		Explicit: {
			straight: 1
		},			
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	},
	Nun15: {
		Explicit: {
			straight: 1
		},			
		straight: 1,
		lesbian: 1,
		pool: 1,
		pool_sex: 1
	}
},

// Generic images for use in sex scenes
GenericSex: {
	breastexpansion: 4,
	breastreduction: 4,
	cockexpansion: 1,
	cockshrinking: 1,
	creampie: 2,
	foursome: 2,
	femalefemale: {
		lick: 1,
		trib: 2
	},
	futafemale: {
		pussy: 1
	},
	malefemale: {
		blowjob_blackhair: 1,
		blowjob_blondehiar: 2,
		blowjob_brownhair: 2,
		blowjob_redhair: 2,
		lick: 3,
		pussy: 3
	},
	threesome: {
		mff: 2,
		mmf_blondehair: 1,
		all: 2
	},
	tgm2f: 1,
	tgf2m: 1,
	
	Explicit: {
		femalefemale: {
			analstrapon: 2,
			doubledildo: 2,
			lick: 7,
			strapon: 8,
			trib: 6
		},
		futafemale: {
			pussy: 1
		},
		malefemale: {
			analstrapon: 3,
			anal: 4,
			blowjob: 5,
			pussy: 8,
			titfuck: 2
		},
		malemale: {
			anal: 2
		},
		threesome: {
			fff: 4,
			mff: 8,
			mff_red: 1,
			mff_oral: 5,
			mmf: 5
		}
	}
},

// Characters, child objects are named for the folders, then dress, then explicit
// Note: this can be added to in a persons initialisation, also mods can update/overwrite
// Allowed formats:
// image: x						- image with x variations imagea.jpg, imageb.jpg etc. No more than 36 allowed
// image: "file1,files" 	- logical image (as used in code), will show a random one of file1.jpg or file2.jpg. Arbitrary number allowed
// these can be missing for a model in that case it will show image.jpg or whatver the code dictates
People: {
	Abby: {
		Agnes: {
			shower: "showerb",
			smssexy: "smssexya"
		},
		Asa: {
			smssexy: "smssexya"
		}
	},	
	Adele: {
		Adele: {
			pool: "adele-pool",
			shower: "sms1"
		},
		Denise: {
			pool: "adele-pool",
			shower: "sms1"
		}
	},
	Alison: {
		shower: "smssexyb",
		smssexy: 4
	},
	Amy: {
		Blonde: {
			pool: "poolu",
			shower: "datec"
		},
		Brunette: {
			pool: "poolu",
			shower: "datec"			
		}
	},
	Angela: {
		Large: {
			pool: "angela-pool",
			shower: "angela10",
			smssexy: "smssexya,smssexyb,poledancea"
		},
		Small: {
			pool: "angela-pool",
			shower: "smssexya",
			smssexy: "smssexya,smssexyb,poledancea"
		}
	},
	Anita: {
		pool: "anita-pool",
		shower: "anita-shower1",
		smssexy: 2
	},	
	Ash: {
		smsselfie: "smsselfiea",
		smssexy: "smssexya"
	},	
	Betty: {
		bath: 3,
		bondageplay: 5,
		cluboffice_sexb: 1,
		home_bjb: 1,
		home_bjg: 1,
		home_fuckb: 1,
		home_fuckg: 1,
		home_tf: 1,
		pool: "bettypool",
		poledance: 2,
		shower: "batha",
		smssexy: 3,
		Explicit: {
			cluboffice_sexb: 3,
			home_bjb: 3,
			home_bjg: 3,
			home_fuckb: 3,
			home_tf: 4,
			strapon: 2
		}
	},
	Brandi: {
		poledance: 2,
		shower: "sms1",
		smssexy: "charm5s,brandi0a,smssexya,smssexyb,smssexyc"
	},
	Camryn: {
		pool: "camryn-pool",
		shower: "camryn21",
		smssexy: "smssexya,smssexyb,smssexyc"
	},
	Carol: {
		Carol: {
			pool: "carol-poola",
			shower: "recharm",
			smssexy: 4
		},
		Summer: {
			pool: "carol-poola",
			shower: "recharm",
			smssexy: 4
		}
	},
	Catherine: {
		pool: "catherine-pool",
		smssexy: 6
	},	
	Charley: {
		pool: "poola",
		shower: "charleyhaira"
	},
	Cherry: {
		shower: "smssexylovera",
		smssexylover: 2,
		smssexyslave: 2
	},
	Diane: {
		pool: "diane-pool",
		shower: "smssexyb",
		smssexy: 3
	},	
	Didi: {
		pool: "poolu",
		smssexy: 2
	},	
	DoctorKay: {
		poledance: 2,
		pool: "tinapool",
		smssexy: 4
	},
	Donna: {
		Britney: {
			poledance: 2,
			pool: "donna1",
			smssexy: 2
		},
		Elle: {
			poledance: 2,
			pool: "donna1",
			smssexy: 2
		}			
	},	
	Ellie: {
		Carla: {
			poledance: 2,
			smssexy: 2
		},
		Alix: {
			poledance: 2,
			smssexy: 2
		}			
	},	
	Emily: {
		smssexy: 2
	},	
	Emma: {
		smssexy: 3
	},	
	Geraldine: {
		Charley: {
			office_sexb: 1,
			office_sexg: 1,
			poledance: 3,
			smssexy: 3,
			Explicit: {
				office_sexb: 2,
				office_sexg: 1
			}
		},
		Maria: {
			office_sexb: 1,
			office_sexg: 1,
			poledance: 3,
			smssexy: 3,
			Explicit: {
				office_sexb: 2,
				office_sexg: 1
			}			
		}
	},	
	Gina: {
		Bridgette: {
			poledance: 2,
			shower: "ginashower4",
			smssexy: 3
		},
		Shyla: {
			poledance: 2,
			shower: "ginashower4",
			smssexy: 3
		}
	},	
	GlenvaleTown: {
		aquarium: 6,
		aquariumnude: 1,
		church: 5,
		churchnude: 1,		
		generalstore: 2,
		generalstorenude: 1,
		generalstorepublic: 1,
		gym: 3,
		gymnude: 1,
		laundromat: 4,
		library: 2,
		librarynude: 3,
		librarypublic: 4,
		museum: 4,
		museumnude: 3,
		museumpublic: 3,
		park: 7,
		parknude: 7,
		parkpublic: 9,
		pool: 7,
		poolnude: 12,
		poolpublic: 5,
		shops: 3,
		shopsnude: 2,
		shopspublic: 2,
		streets: 10,
		streetsnude: 7,
		streetspublic: 5,
		sportsfield: 3,
		sportsfieldnude: 4,
		stripclub: 5,
		tennis: 4,
		tennisnude: 2,
		wildranges: 3,
		wildrangesnude: 2
	},
	Hannah: {
		poledance: 3,
		smssexy: 3
	},		
	Heather: {
		poledance: 1,
		smssexy: 3
	},	
	Jade: {
		Aiden: {
			poledance: 2,
			poledanceul: 3,
			smssexy: 3,
			Explicit: {
				pool_sexb: 2,
				pool_sexg: 1,
				roombjb: 7,
				roombjg: 3,
				roomsexb: 6,
				roomsexg: 1
			},
			roombjb: 1,
			roombjg: 1,
			rooms: 2,
			roomsexb: 1,
			roomsexg: 1
		},
		JadeTiger: {
			poledance: 2,
			smssexy: 3,
			Explicit: {
				pool_sexb: 2,
				pool_sexg: 1,
				roombjb: 1,
				roombjg: 1,
				roomsexb: 4,
				roomsexg: 1
			},
			roombjb: 1,
			roombjg: 1,			
			roomsexb: 1,
			roomsexg: 1
		}			
	},	
	JanetKelly: {
		pool: "janet-pool",
		poledance: 2,
		shower: "smssexyb",
		smssexy: 2
	},
	Karma: {
		poledance: 2,
		smssexy: 3
	},
	Kate: {
		shower: "smssexye",
		poledance: 2,
		pool: "kate-poolu",
		smssexy: 5
	},
	Kellie: {
		smssexy: 2
	},
	Kristin: {
		smssexy: 3
	},		
	Kylie: {
		Kylie: {
			poledance: 1,
			pool: "poola",
			smssexy: 2
		},
		Paige: {
			poledance: 1,
			pool: "poola",
			smssexy: 2
		}			
	},
	Leanne: {
		Anna: {
			poledance: 2,
			smssexy: 4
		},
		Veruca: {
			poledance: 2,
			smssexy: 4
		}		
	},	
	Leigh: {
		Carla: {
			poledance: 2,
			smssexy: 2
		},
		Alix: {
			poledance: 2,
			smssexy: 2
		}			
	},
	Lola: {
		smssexy: 2
	},		
	Louise: {
		Monica: {
			louise12b: 1,
			louise12g: 2,
			Explicit: {
				louise12b: 1,
				louise12g: 1,
				home_sexb: 1,
				louise_pool_sexb: 3,
				louise_pool_sexg: 1				
			},
			smssexy: 3
		},
		Kayla: {
			louise12b: 1,
			louise12g: 2,
			Explicit: {
				louise12b: 3,
				home_sexb: 3,
				home_sexg: 2,
				louise_pool_sexb: 3,
				louise_pool_sexg: 1
			},
			smssexy: 3
		}
	},
	Madison: {
		Aletta: {
			pool: "madison-pool",
			poledance: 3,
			shower: "sms1"
		},
		Maria: {
			pool: "madison-pool",
			poledance: 3,
			shower: "sms1"
		}
	},
	Mayor: {
		Eddie: {
			poledance: 1,
			smssexy: 2
		},
		Rachel: {
			poledance: 2,
			smssexy: 2
		}
	},	
	Melanie: {
		smssexy: 3
	},
	Mia: {
		Lisa: {
			smssexy: 2
		},
		Mia: {
			smssexy: 2
		}
	},	
	Miku: {
		smssexy: 2
	},
	MissLogan: {
		Kate: {
			pc: 20,
			pctitus: 20,
			pctanika: 2
		}
	},
	Mom: {
		Elexis: {
			poledance: 2
		},
		Syren: {
			poledance: 2
		}
	},	
	Monique: {
		Mariah: {
			poledance: 2,
			smssexy: 3
		}
	},	
	MotherSuperior: {
		poledance: 2,
		shower: 2
	},
	MrsGranger: {
		hotelroomb: 1,
		hotelroomg: 1,
		Explicit: {
			hotelroomb: 1
		},
		smssexy: 4
	},
	MsCharles: {
		home_bjb: 1,
		home_bjg: 1,
		home_fuckb: 1,
		home_fuckg: 2,
		home_tf: 1,
		office_bjb: 1,
		office_bjg: 1,
		office_fuckb: 1,
		office_fuckg: 1,
		office_tf: 1,
		poledance: 2,
		pool: "poola-day",
		smssexy: 4,
		Explicit: {
			home_bjb: 3,
			home_bjg: 3,
			home_fuckb: 4,
			home_tf: 4,
			office_bjb: 3,
			office_bjg: 3,
			office_fuckb: 3,
			office_tf: 3
		}		
	},		
	MsTitus: {
		poledance: 3,
		smssexy: 4,
		Explicit: {
			pool_sexb: 2,
			pool_sexg: 1
		}
	},	
	MsReagan: {
		smssexy: 5
	},
	Nella: {
		smssexy: 4
	},
	OfficerBatton: {
		Breanne: {
			poledance: 2,
			smssexy: "polb4,trioeventoffbatton6,smssexya,smssexyb,smssexyc"
		},
		Katarina: {
			poledance: 2,
			smssexy: "polb6,trioeventoffbatton5,smssexya,smssexyb,smssexyc"
		}
	},
	Pamela: {
		Lauren: {
			homebjb: 1,
			homebjg: 1,
			homefuckb: 1,
			homefuckg: 1,			
			poledance: 2,
			shower: "pamelasms1",
			smssexy: 3,
			Explicit: {
				homebjb: 4,
				homebjg: 1,
				homefuckb: 3,
				homefuckg: 3				
			}
		},
		Piper: {
			homebjb: 1,
			homebjg: 1,
			homefuckb: 1,
			homefuckg: 1,				
			poledance: 2,
			shower: "pamelasms1",
			smssexy: 3,
			Explicit: {
				homebjb: 4,
				homebjg: 1,
				homefuckb: 3,
				homefuckg: 3				
			}
		}
	},
	Penelope: {
		poledance: 3,
		pool: "poolc",
		shower: "shower1",
		smssexy: 4
	},
	Sarah: {
		smsselfie: "selfiea,selfieb,selfiec,selfied,[Lauren]poledanceb,[Lauren]selfiea,[Lauren]selfieb,[Lauren]selfiec"
	},
	Savanna: {
		smssexy: 3
	},
	Seraphina: {
		Normal: {
			cluboffice_dance: 2,
			home_bjb: 1,
			home_bjg: 1,
			home_sex: 3,
			smssexy: 3,
			Explicit: {
				home_bjb: 3,
				home_bjg: 2,
			}
		}
	},
	Sharon: {
		smssexy: 3
	},	
	Tammy: {
		smssexy: 2
	},
	Tess: {
		poledance: 4,
		pool: "tess-poola",
		shower: "tess-shower2",
		smssexy: 3
	},
	Tracy: {
		Ariel: {
			poledance: 2,
			smsselfie: 3,
			smssexy: 3
		},
		Casey: {
			poledance: 2,
			smsselfie: 3,
			smssexy: 3
		}
	},	
	Ursula: {
		poledance: 2,
		smssexy: 3,
		Explicit: {
		}
	},	
	VampyreLilith: {
		poledance: 2,
		movie: 3
	},
	Victoria: {
		smssexy: 3
	},
	Zali: {
		smssexy: 5
	},	
},

// Player avatars, left blank at this time
Player: {}
};
