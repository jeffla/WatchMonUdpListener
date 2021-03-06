﻿module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;
	
	// Category    = Hardware Configuration
	// Object      = Shunt
	// MsgLength   = 60
	// Description = Hardware shunt setup configuration
	// Version     = 3
	// Frequency   = 20 seconds
	// Support     = Current
	// Valid from  = SW 1.0.30
	this.parse_4c33 = function(msg) 
	{
		var status = new Parser()
		.skip(8)
		.uint8('HwShuntShuntType')  /* ShuntTypes
				None            				= 0,
				SFP102MOD 100uOhm 375A 150V 	= 1, 
				SFP101EVB 72uOhm 500A 150V     	= 2,
				SFP101EVB 25uOhm 1500A 150V 	= 3,
				SFP102MOD (4k) 375A 750V  		= 4, 
				SFP102MOD (3k) 375A 600V   		= 5, 
				SFP102MOD Negative volt sense  	= 6,
				SFP102MOD 50uOhm 750A 150V 		= 7, 
				ShuntMon2 50uOhm 500A 650V 		= 16, */
		.int16le('HwShuntScale16volt')
		.int16le('HwShuntScale16amp')
		.int16le('HwShuntChargeIdle',	{ formatter: (x) => {return x/100;}})   // amps
		.int16le('HwShuntDischgIdle',	{ formatter: (x) => {return x/100;}})	// amps
		.uint8( 'HwShuntSocCountLo', 	{ formatter: (x) => {return (x-5)/2;}}) // percent
		.uint8( 'HwShuntSocCountHi', 	{ formatter: (x) => {return (x-5)/2;}}) // percent
		.uint8( 'HwShuntSocLoRecal', 	{ formatter: (x) => {return (x-5)/2;}}) // percent
		.uint8( 'HwShuntSocHiRecal', 	{ formatter: (x) => {return (x-5)/2;}}) // percent
		.uint8( 'HwShuntMonitorSocLoRecal') 	// boolean 0 = Off , 1 = On
		.uint8( 'HwShuntMonitorSocHiRecal') 	// boolean 0 = Off , 1 = On
		.uint8( 'HwShuntMonitorInBypassRecal')	// boolean 0 = Off , 1 = On
		.floatle('HwShuntNomCapacity',	{ formatter: (x) => {return x/1000;}})	// Ah
		.floatle('HwShuntGainVolt')
		.floatle('HwShuntGainAmp')
		.floatle('HwShuntGainAcculm')	// mAh
		.floatle('HwShuntGainTemp') 	// temperature ºC
		.uint8( 'HwShuntReverseFlow') 	// boolean 0 = Off , 1 = On
		.uint8( 'HwShuntSetupVers') 
		.floatle('HwShuntGainVA')
		.floatle('HwShuntGainVAh')	
		.int16le('HwShuntMax16volt')
		.int16le('HwShuntMax16charge')
		.int16le('HwShuntMax16dischg')
		
		return status.parse(msg);
	}
}