var people = [
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "m", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "f", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "f", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "m", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "f", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "m", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "m", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "f", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false},
	{iq:30 + Math.round((Math.random()-0.5)*2*10), strength:50 + Math.round((Math.random()-0.5)*2*10), communication:10 + Math.round((Math.random()-0.5)*2*4), age:0, maxAge:20 + Math.round((Math.random()-0.5)*2*3), illness:6 + Math.round((Math.random()-0.5)*2*2), gender: "f", selected: false, dead: false, canPopulate: false, dna: randomDNA(6), fighter: false}
];
var year = 0;

var ageRandom;
var output;
var continueIntro = true;

var malecolor = "#0072BB";
var femalecolor = "#FF4C3B";
var cantPopMaleColor = "#11A4E2";
var cantPopFemaleColor = "#F4857F";

var kidIQ;
var kidStrength;
var kidCommunication;
var kidMaxAge;
var kidIllness;
var kidGender;

var pop;

var fighters = [];
var playerFightStrenght;
var weapons = 0;
var fightSkills;
var fightCommunication;

var barbariansAreAttacking = false;
var lastBarbarianAttack = 1;
var barbarianStats = {};
var barbarianFightStrenght;

var barbarianspwnchnc = 0.1;




function nextYearButton()
{
	if (!barbariansAreAttacking && !continueIntro) {
		nextYear();
	}else if(barbariansAreAttacking && fighters.length == 0){
		var confirm_message = confirm("You have no defense! Do you really want to continue?");
		if (confirm_message) {
			nextYear();
		}
	}else if (barbariansAreAttacking) {
		var confirm_message = confirm("Are you ready to fight?");
		if (confirm_message) {
			nextYear();
		}
	}
}

function nextYear()
{
	lastBarbarianAttack++;
	if(lastBarbarianAttack == 1){
		//Barbarians attacked last round
		fight();
		fighters = [];
		barbarianStats = [];
		barbariansAreAttacking = false;
		$("#sendToWarButton").fadeOut("slow");
		$("#showBarbarianStats").fadeOut("slow");
	}else if(lastBarbarianAttack == 0) {
		//Barbarians attacked this round

	}


	year++;
	$('#year').html("<b>Year:</b> " + year);

	

	//output = "";
	for (var i = 0; i < people.length; i++) {
		people[i].fighter = false;
		ageRandom = Math.random();
		people[i].age++;
		if(people[i].age > people[i].maxAge - ageRandom * people[i].illness) {
			people[i].dead = true;
		}
		if (people[i].age > 11) {people[i].canPopulate = true}
	}
	// kill person after everybody was calculated
	for (var i = 0; i < people.length; i++) {
		if(people[i].dead) {
			people.splice(i,1);
		}
	}

	if(lastBarbarianAttack > 4 && year > 11){
		//barbarian attack
		if (Math.random() > 1-barbarianspwnchnc && people.length > 0) {
			barbarianAttack();
		}else{
			barbariansAreAttacking = false;
		}
	}

	if(year > 11){
		draw();
	}

	//all people dead
	if($.grep(people, function(e){return e;}).length == 0){
		print("");
		$('#output').html("<center><p id=\"nationDeath\">Your nation died!</p></center>");
	}
}

function populate()
{
	if ($.grep(people, function(e){return e.selected;}).length == 2 && $.grep(people, function(e){return e.selected;})[0].canPopulate && $.grep(people, function(e){return e.selected;})[1].canPopulate) {
		pop = $.grep(people, function(e){return e.selected;});

		if ((pop[0].gender == "m" && pop[1].gender == "f") || (pop[0].gender == "f" && pop[1].gender == "m")) {
			

			person(pop[0],pop[1]);
			deselectAll();
			draw();
		} else {
			print("You need to select a man and a woman.");
		}
		draw();
	}else{
		print("You need to select two people who can make a kid this year to populate.");
	}
}

function draw()
{
	output = "";
	for (var i = 0; i < people.length; i++) {
		if (people[i].selected) {
		//selected
			if (people[i].canPopulate) {
			//canPopulate
				if (people[i].gender == "f") {
				//femininum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton canPopFem selected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}else{
				//maskulinum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton canPopMask selected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}
			} else {
			//cant Populate
				if (people[i].gender == "f") {
				//femininum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton cantPopFem selected \"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}else{
				//maskulinum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton cantPopMask selected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}
			}
		}else{
		//not selected
			if (people[i].canPopulate) {
			//canPopulate
				if (people[i].gender == "f") {
				//femininum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton canPopFem notselected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}else{
				//maskulinum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton canPopMask notselected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}
			} else {
			//cant Populate
				if (people[i].gender == "f") {
				//femininum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton cantPopFem notselected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}else{
				//maskulinum
					output += "<button name=\"person" + i + "\" onclick=\"selct(" + i + ")\" class=\"peoplebutton cantPopMask notselected\"> iq:" + people[i].iq + ", strength:" + people[i].strength + ", communication:" + people[i].communication + ", age:" + people[i].age + ", max age:" + people[i].maxAge + ",illness: " + people[i].illness + ", gender:" + people[i].gender + "<br /><br /> DNA: -" + people[i].dna + "-</button>";
				}
			}
		}
	}


	$('#output').html(output);
}

function person(parent1,parent2){
	inceststrenght = incestcheck(parent1, parent2);
	if (inceststrenght > 0) {
		var confirm_message = confirm("Attention! They have a very similar DNA! Their DNA has " + inceststrenght + " similaritys.");
		if (confirm_message){
			for (var i = 0; i < people.length; i++) {
				if(people[i].selected){people[i].canPopulate = false;}
			}
			people.push(new inhibit(parent1,parent2));
		}else{
			
		}
	}else{
		for (var i = 0; i < people.length; i++) {
				if(people[i].selected){people[i].canPopulate = false;}
			}
		people.push(new inhibit(parent1,parent2));
	}
}

function inhibit(parent1,parent2){
	this.iq = Math.round((parent1.iq + parent2.iq) / 2 + (Math.random() - 0.5) * 1.2 * (parent1.iq - parent2.iq) + (Math.random()-0.5) * ((parent1.iq+parent2.iq)/20));
	this.strength = Math.round((parent1.strength + parent2.strength) / 2 + (Math.random() - 0.5) * 1.2 * (parent1.strength - parent2.strength) + (Math.random()-0.5) * ((parent1.strength+parent2.strength)/20));
	this.communication = Math.round((parent1.communication + parent2.communication) / 2 + (Math.random() - 0.5) * 1.2 * (parent1.communication - parent2.communication) + (Math.random()-0.5) * ((parent1.communication+parent2.communication)/20));
	this.illness = Math.round((parent1.illness + parent2.illness) / 2 + (Math.random() - 0.5) * 1.2 * (parent1.illness - parent2.illness) + (Math.random()-0.5) * ((parent1.illness+parent2.illness)/20));
	if(Math.random() > 0.5){
		this.gender = "f";
	}else{
		this.gender = "m";
	}
	this.maxAge = Math.round((parent1.maxAge + parent2.maxAge) / 2 + (Math.random() - 0.5) * 1.2 * (parent1.maxAge - parent2.maxAge) + (Math.random()-0.5) * ((parent1.maxAge+parent2.maxAge)/20));
	this.dna = [
		parent1.dna[Math.round(Math.random())],
		parent2.dna[Math.round(Math.random())],
		parent1.dna[Math.round(Math.random()+2)],
		parent1.dna[Math.round(Math.random()+4)],
		parent2.dna[Math.round(Math.random()+2)],
		parent2.dna[Math.round(Math.random()+4)]
	];
	this.age = 0;
	this.selected = false;
	this.dead = false;
	this.canPopulate = false;
	this.fighter = false;
	

	this.iq -= Math.round(inceststrenght * 2 * (Math.random()+0.5));
	this.strength -= Math.round(inceststrenght * 2 * (Math.random()+0.5));
	this.communication -= Math.round(inceststrenght * 2 * (Math.random()+0.5));
	this.illness += Math.round(inceststrenght * 2 * (Math.random()+0.5));
	this.maxAge -= Math.round(inceststrenght * 2 * (Math.random()+0.5));
	

	if(this.iq < 0){this.iq = 0;}
	if(this.strength < 0){this.strength = 0;}
	if(this.communication < 0){this.communication = 0;}
	if(this.illness < 0){this.illness = 0;}
	if(this.maxAge < 0){this.maxAge = 0;}
}

function selct(nr){
	if (!people[nr].selected) {
		people[nr].selected = true;
		draw();
	}else{
		people[nr].selected = false;
		draw();
	}
}

function incestcheck(parent1, parent2)
{
	var inceststrenght = 0 +
		$.grep(parent1.dna, function(e){return e == parent2.dna[0];}).length +
		$.grep(parent1.dna, function(e){return e == parent2.dna[1];}).length +
		$.grep(parent1.dna, function(e){return e == parent2.dna[2];}).length +
		$.grep(parent1.dna, function(e){return e == parent2.dna[3];}).length +
		$.grep(parent1.dna, function(e){return e == parent2.dna[4];}).length +
		$.grep(parent1.dna, function(e){return e == parent2.dna[5];}).length
	;

	return inceststrenght;
}

function randomLetter(){
	switch (Math.round(Math.random()*25)+1){
			case 1:
				return "a";
				break;
			case 2:
				return "b";
				break;
			case 3:
				return "c";
				break;
			case 4:
				return "d";
				break;
			case 5:
				return "e";
				break;
			case 6:
				return "f";
				break;
			case 7:
				return "g";
				break;
			case 8:
				return "h";
				break;
			case 9:
				return "i";
				break;
			case 10:
				return "j";
				break;
			case 11:
				return "k";
				break;
			case 12:
				return "l";
				break;
			case 13:
				return "m";
				break;
			case 14:
				return "n";
				break;
			case 15:
				return "o";
				break;
			case 16:
				return "p";
				break;
			case 17:
				return "q";
				break;
			case 18:
				return "r";
				break;
			case 19:
				return "s";
				break;
			case 20:
				return "t";
				break;
			case 21:
				return "u";
				break;
			case 22:
				return "v";
				break;
			case 23:
				return "w";
				break;
			case 24:
				return "x";
				break;
			case 25:
				return "y";
				break;
			case 26:
				return "z";
				break;
			
		}
}

function randomDNA(length){
	var finalDNA = [];
	for (var i = 0; i < length; i++) {
		finalDNA.push(randomLetter());
	}
	return finalDNA;
}

function deselectAll(){
	for (var i = 0; i < people.length; i++) {
		people[i].selected = false;
	}
	draw();
}

function barbarianAttack(){
	print("The barbarians attack!");
	barbariansAreAttacking = true;
	lastBarbarianAttack = 0;
	$("#sendToWarButton").fadeIn("slow");
	$("#showBarbarianStats").fadeIn("slow");


	barbarianStats = {
		fightSkills:Math.round((people[Math.round(Math.random()*(people.length-1))].iq + people[Math.round(Math.random()*(people.length-1))].iq*(Math.random()-0.5) + people[Math.round(Math.random()*(people.length-1))].strength + people[Math.round(Math.random()*(people.length-1))].strength*(Math.random()-0.5))/2),
		barbarianCount:Math.round(people.length/2 + Math.random()*(people.length-1)),
		barbarianCommunication:Math.round(people[Math.round(Math.random()*(people.length-1))].communication + people[Math.round(Math.random()*(people.length-1))].communication*(Math.random()-0.5)),
		barbarianWeapons:weapons + Math.round((Math.random()-0.5)*weapons)
	};
}

function print(message){
	$("#info").html(message);
	$("#info").fadeTo("fast", 1);
	setTimeout(function(){
		$("#info").fadeTo("slow", 0.6);
	},5000);
}


function start(){
	print("Loading, please wait... The simulation will start immediately!");

	if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 0");
	setTimeout(function(){
		if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 1");
		nextYear();
		setTimeout(function(){
			nextYear();
			if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 2");
			nextYear();
			setTimeout(function(){
				if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 3");
				nextYear();
				setTimeout(function(){
					if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 4");
					nextYear();
					setTimeout(function(){
						if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 5");
						nextYear();
						setTimeout(function(){
							if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 6");
							nextYear();
							setTimeout(function(){
								if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 7");
								nextYear();
								setTimeout(function(){
									if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 8");
									nextYear();
									setTimeout(function(){
										if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 9");
										nextYear();
										setTimeout(function(){
											if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 10");
											nextYear();
											setTimeout(function(){
												if(continueIntro){$("#output").html("Your Nation begins to grow... Year: 11");
												setTimeout(function(){
													continueIntro = false;
													print("Loading finished!");
													nextYear();
												},1000);}
											},500);}
										},250);}
									},300);}
								},300);}
							},400);}
						},500);}
					},600);}
				},700);}
			},800);}
		},900);}
	},1000);}

	$("#sendToWarButton").fadeOut(0);
	$("#showBarbarianStats").fadeOut(0);
}

function skipIntro()
{
	if (year < 12) {
		continueIntro = false;
		year = 11;
		for (var i = 0; i < people.length; i++) {
			people[i].age = 11;
		}
		print("Loading finished!");
		nextYear();
	}
}

function sendToWar()
{
	for (var i = 0; i < people.length; i++) {
		if(people[i].selected && people[i].canPopulate){
			fighters.push(people[i]);
			people[i].canPopulate = false;
			people[i].fighter = true;
		}
	}
	deselectAll();
	draw();
}

function showBarbarianStats()
{
	print("There are " + barbarianStats.barbarianCount + " barbarians with fightSkills of " + barbarianStats.fightSkills + " and communicationskills of " + barbarianStats.barbarianCommunication);

	console.log(barbarianStats);
}

function fight()
{
	fightSkills = 0;
	fightCommunication = 0;

	for (var i = 0; i < fighters.length; i++) {
		fightSkills += (fighters[i].iq + fighters[i].strength) / 2;
	}
	fightSkills /= fighters.length;

	for (var i = 0; i < fighters.length; i++) {
		fightCommunication += fighters[i].communication;
	}
	fightCommunication /= fighters.length;

	barbarianFightStrenght = Math.round(barbarianStats.fightSkills * barbarianStats.barbarianCount * (1.2 - Math.random()*0.4)) + Math.round(Math.random()*barbarianStats.barbarianCommunication) + barbarianStats.barbarianWeapons * barbarianStats.barbarianCount;
	playerFightStrenght = Math.round(fightSkills * fighters.length * (1.2 - Math.random()*0.4)) + Math.round(Math.random()*fightCommunication) + weapons * fighters.length;

	if (isNaN(playerFightStrenght)) {
		playerFightStrenght = 0;
	}

	console.log("barbarianFightStrenght: " + barbarianFightStrenght + "\n playerFightStrenght: " + playerFightStrenght);

	if (playerFightStrenght < barbarianFightStrenght) {
		print("You lose!");
		for (var i = 0; i < people.length; i++) {
			if(people[i].fighter){
				if (Math.random() > 0.15) {
					people.splice(i,1);
				}
			}
			if (Math.random() > 0.7) {
				people.splice(i,1);
			}
		}
	} else {
		print("You win!");
		for (var i = 0; i < people.length; i++) {
			if(people[i].fighter){
				people[i].strength += Math.round((Math.random())*(people[i].strength/4))
				if (Math.random() > 0.85) {
					people.splice(i,1);
				}
			}
		}
	}
}


start();