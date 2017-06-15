var playerCharacter = {
	health: 10,
	sanity: 25,
	strength: 5,
	deputy: 0,
	doctor: 0,
	professor: 0,
	fight: [punch = {
				name: "punch",
				power: 3,
				speed: 1,
				cost: 0
			},
			kick = {
				name: "kick",
				power: 5,
				speed: 2,
				cost: 0
			}],
	inventory: [whiskey = {
					name: "Whiskey",
					charges: 1,
					use: function () {
						playerCharacter.sanity += 5
					}
				},
				bandages = {
					name: "Bandages",
					charges: 1,
					use: function () {
						playerCharacter.health += 5
					}
				}],
	spells: [],
	actions: 2,
	choice: 0,
	alive: true,
	experience: 0,
	chapter: 1,
	museum: "discovered"
};



var car = "undamaged";

var numCultists = 3;


//All of this functionality is the choose your own adventure component
var narrativeText = $("#narrativeText");

var narrativeBox = $("#narrativeBox");
var choiceBox = $("#choiceBox");
var choiceItems = $(".choiceElement");

var choiceText = $($(".choiceText"));
var choiceText1 = $("#choiceText1");
var choiceText2 = $("#choiceText2");
var choiceText3 = $("#choiceText3");

var	choiceButton1 = $("#choiceButton1");
var	choiceButton2 = $("#choiceButton2");
var	choiceButton3 = $("#choiceButton3");

var choiceArray = [
	choiceButton1, choiceButton2, choiceButton3
	]

var nextButton = $("#next");


var gameOver = function () {
	battleDiv.hide();
	feedDiv.hide();
	actionDiv.hide();
	narrativeBox.show();;
	choiceBox.show();
	choiceText2.text("");
	choiceText1.empty();
	choiceText1.text("Ready to try again?")
	choiceText2.empty();
    choiceText1.append("<button id='reset'>Reset</button>")
    var resetButton = $("#reset");
    $(".choiceButton").remove();
    console.log("game over is running");

    resetButton[0].addEventListener("click", function () {
    	currentEnemyArray = [];
    	playerCharacter.actions = 2;
    	playerCharacter.choice = 0;
    	enemyCounter = 0;
    	numEnemies = 0;
    	numCultists = 3;
    	$("#theFeed").empty();
    	narrativeText.text("You wake up from a strange dream, feverish and sweating. The details immediately slip away from you and the only thing you can remember is a dull chant in a language you've never heard. Your head is still pounding to its rhythm. You look up from bed and realize that, against all logic, the door has disappeared from your bedroom. What do you do?");
    	choiceText1.text("Go back to sleep");
    	choiceText2.text("Search the room");
    	choiceText3.text("Jump out the window");
    	choiceText1.append(choiceButton1[0]);
    	choiceText2.append(choiceButton2[0]);
    	choiceText3.append(choiceButton3[0]);
    	$("#playerPosition").empty();
    	$("#position1").empty();
    	$("#position2").empty();
    	$("#position3").empty();
    	choiceItems.fadeIn();
    	resetButton.remove();
    	addEventListeners();
    	playerCharacter.health = 10;
    	playerCharacter.sanity = 15;
    	playerCharacter.strength = 5;
    	playerCharacter.alive = true;
    	$("#playerHealthBar").attr("value", playerCharacter.health);
    	initialChoice0();
    	initialChoice1();
    	initialChoice2();
    	var uDead = setInterval(function() {
			if (playerCharacter.health <= 0) {
			updateNarrative("You have died. Sorry!")
			newBattleMessage("You have been killed.")
			playerCharacter.actions = 0;
			gameOver();
			clearInterval(uDead);

	}

}, 100)
	})
}



var updateNarrative = function(newText) {
	narrativeText.text(newText)
};


var createNewButton = function (choiceNum) {
	var newButton = $("<button></button");
	newButton.addClass("choiceElement choiceButton");
	newButton.text("Choose");
	console.log(newButton);
	choiceArray.push(newButton);
};

var initialChoice0 = function () {
	choiceArray[0].click(function () {
	updateNarrative("Doors don't just disappear, and even if they did you have nowhere to go. You roll over in your bed and try to go back to sleep, hoping it will help combat your pounding headache. As you slip into sleep your senses are assualted, rapidfire, with a torrent of unspeakable images. Grotesque and malformed creatures whose very bodies shift and rearrange themselves as you look upon them. You're jolted back awake with a further reduced on reality. The door is still gone.")
	playerCharacter.sanity = playerCharacter.sanity - 5;
	})
};

var initialChoice1 = function () {
	choiceArray[1].click(function() {
	updateNarrative("You push yourself out of bed and begin to pace through your bedroom. You switch on your bedside light, but it does little to illuminate the oppressive darkness. In the context of your dream even this familiar place feels strange and sinister. You run your hand over where the door used to be and only feel soft wood. You take a step back and find your feet sinking into the ground. You look down - a rug that has never been in your room has appeared. It's adorned with unfamiliar symbols. The pounding in your head reaches an intense crescendo and you find yourself dumped into a hallway on the first floor. From your kitchen you hear voices - they're chanting the same otherwordly litany from your dream! What do you do?");
	playerCharacter.location = "hallway"
	choiceItems.fadeOut();
	choiceText1.text("You've had enough of this. Go confront them")
	choiceText2.text("Something weird is going around - sneak around and see what you can find out.")
	choiceText3.text("");
	createNewButton(4);
	createNewButton(5);
	choiceArray[0].remove();
	choiceArray[1].remove();
	choiceText1.append(choiceArray[3]);
	choiceText2.append(choiceArray[4]);
	choiceText.fadeIn();
	choiceArray[3].fadeIn();
	choiceArray[4].fadeIn();
	playerCharacter.choice = 1;
	addEventListeners();
	})
};

var initialChoice2 = function () {
	choiceArray[2].click(function() {
	updateNarrative("Really? You're going straight out your window? Jeez man, you're nuts. But I admire the dedication. You roll out of bed, stretch your legs for a second, open your window, and then leap outside. You hit the ground hard and the wind is knocked out of you. As you roll over and try to regain your composure you see a hooded figure on your porch gesturing towards you and shouting towards someone inside. What do you do?");
	choiceItems.fadeOut();
	playerCharacter.health -= 3;
	choiceText1.text("They should be scared of you. You just jumped out a window. Press the attack!");
	choiceText2.text("You didn't jump out of a window to get into more trouble. You're out of here");
	choiceText3.text("");
	createNewButton(4);
	createNewButton(8);
	choiceArray[0].remove();
	choiceText1.append(choiceArray[3])
	choiceArray[1].remove();
	choiceText2.append(choiceArray[4])
	choiceText.fadeIn();
	choiceArray[3].fadeIn();
	choiceArray[4].fadeIn();
	playerCharacter.choice = 3;
	addEventListeners();
	})
};


var addEventListeners = function () {
	if (playerCharacter.choice === 0) {
		updateNarrative("You wake up from a strange dream, feverish and sweating. The details immediately slip away from you and the only thing you can remember is a dull chant in a language you've never heard. Your head is still pounding to its rhythm. You look up from bed and realize that, against all logic, the door has disappeared from your bedroom. What do you do?");
		choiceText1.text("Go back to sleep");
		choiceText2.text("Search the room");
		choiceText3.text("Jump out the window");
		choiceText1.append(choiceArray[0]);
		choiceText2.append(choiceArray[1]);
		choiceText3.append(choiceArray[2]);
	}
	else if (playerCharacter.choice === 1) {
		choiceArray[4][0].addEventListener("click", function() {
			updateNarrative("You begin to sneak down the hallway, your untrained feet bring squeals from the old floorboards but the monotonous chanting drowns out the sound. As you approach the kitchen you see a hooded figure with his back turned towards you. You think you might be able to sneak up behind him and knock him out before he knows what's happening - alternatively, you keep a baseball bat by your backdoor, you could sneak over and grab it.");
			choiceItems.fadeOut();
			choiceText1.text("Take that sucker out")
			choiceText2.text("This seems like a good time to have a baseball bat")
			createNewButton(6);
			createNewButton(7);
			choiceArray[3].remove();
			choiceArray[4].remove();
			choiceText1.append(choiceArray[5])
			choiceText2.append(choiceArray[6])
			choiceText.fadeIn();
			choiceArray[5].fadeIn();
			choiceArray[6].fadeIn();
			playerCharacter.choice = 2;
			addEventListeners();
		})
		choiceArray[3].click(function() {
			updateNarrative("This is getting ridiculous. They've woken you up, they're in your house, and somehow they stole your DOOR. You stride down into the hallway, the chanting getting louder as you approach the kitchen. You round the corner and see a trio of hooded cultists doing god knows what near your island. Their eyes register a moment of surprise before they lunge towards you");
				playerCharacter.choice = 9;
				addEventListeners();
				initiateBattle(numCultists, "Cultist", 7,2,5, "imgs/pixelCultist.gif");

		})
	}
	else if (playerCharacter.choice === 3) {
		choiceArray[3].click(function() {
			updateNarrative("You're a mad man! You charge at the hooded figure.")
				playerCharacter.choice = 9;
				addEventListeners();
			initiateBattle(numCultists, "Cultist", 7,2,5, "imgs/pixelCultist.gif");
		})
		choiceArray[4].click(function() {
			updateNarrative("You sprint away from your house. Behind you there's shouting as the intruders begin to give chase. You have a choice, try to lose them in the woods or run towards town?");
			choiceItems.fadeOut();
			choiceText1.text("The woods! Lose em in the trees!");
			choiceText2.text("Spooky woods? No thanks. You're headed to civilization")
			createNewButton(9);
			createNewButton(10);
			choiceArray[3].remove();
			choiceArray[4].remove();
			choiceText1.append(choiceArray[5])
			choiceText2.append(choiceArray[6])
			choiceText.fadeIn();
			choiceArray[5].fadeIn();
			choiceArray[6].fadeIn();
			playerCharacter.choice = 4;
			addEventListeners();
		})
	}
	else if (playerCharacter.choice === 4) {
		choiceArray[5].click(function () {
			updateNarrative("You run through the trees with reckless abandon, the branches whipping your arms and face as you plow ahead. You can't stop, you can hear them moving behind you, cursing and panting as their thick robes catch on roots and branches. You as you move deeper into the woods you hear a deep rumbling. In a second the forest seems to turn against you - the roots take on a life of their own shifting and darting to harass you and make you fall. You trip and the forest roots coil around your ankles, arms, and neck. You fight as hard as you can but there is no denying the implacable strenght of the possessed roots. The air is choked from your body and you die. Sad!")
			playerCharacter.alive = false;
			choiceItems.fadeOut();
			gameOver();
			//add a reset button to appear
		})
		choiceArray[6].click(function() {
			updateNarrative("You leap the fence at the edge of your property towards town. You can hear the cultists behind you, but their heavy robes and their tendency to read latin instead of exercising leaves you with a distinct edge. After a frantic mile of running, you've lost them. You make it into town, scared but alive. What were they doing at your house? What kind of dark horror are they going to visit on the world? What the hell happened to your door? You'll never know and spend the rest of yuor life trying to forget that this happened.");
			choiceItems.fadeOut();
			gameOver();
			//add a reset button to appear
		})
	}
	else if (playerCharacter.choice === 2) {
		choiceArray[5].click(function() {
			updateNarrative("You creep up behind the hooded figure. You wouldn't normally consider yourself a morning person, and usually wouldn't dream of sneaking up behind a cultist and knocking him out before you've had your coffee, but adrenaline and rage can accomplish some incredible things. You put him in the rear naked choke and the sucker is passed out in no time. Unfortunately, as you're lowering him to the floor one of his friends turns around, spots you, and charges you.");
			numCultists--;
			playerCharacter.experience += 5;
			playerCharacter.choice = 9;
			addEventListeners();
			initiateBattle(numCultists, "Cultist", 7,2,5, "imgs/pixelCultist.gif");
			//add a battle button
		})
		choiceArray[6].click(function() {
			updateNarrative("You sneak away from the figures in your kitchen. Your progress is agonizing as you expect one of them to shout in discovery at any moment, but whether through guile our luck you make your way to the back door and grab the baseball bat. Nice work! Now what are you going to do with it?");
			var Bat = {
				name: "Baseball Bat",
				power: 7,
				speed: 2,
				cost: 0
			};
			playerCharacter.fight.push(Bat);
			playerCharacter.strength = 8;
			choiceItems.fadeOut();
			choiceText1.text("Alright, time for some batting practice. Head back into the kitchen and show those intruders what's up")
			choiceText2.text("Cool. You've got a bat. You're still not wild about fighting three spooky dudes at once. You're getting out of here.")
			createNewButton(8);
			choiceArray[5][0].remove();
			choiceArray[6][0].remove();
			choiceText1.append(choiceArray[3][0]);
				choiceArray[3].click(function() {
					playerCharacter.choice = 9;
					addEventListeners();
					initiateBattle(numCultists, "Cultist", 7,2,5, "imgs/pixelCultist.gif");

				})
			choiceText2.append(choiceArray[7][0]);
			choiceText.fadeIn();
			playerCharacter.choice = 5;
			addEventListeners();
			}

		)
	}
	else if (playerCharacter.choice === 5) {
		choiceArray[7].click(function() {
			updateNarrative("You sprint away from your house. Behind you there's shouting as the intruders begin to give chase. You have a choice, try to lose them in the woods or run towards town?");
			choiceItems.fadeOut();
			choiceText1.text("The woods! Lose em in the trees!");
			choiceText2.text("Spooky woods? No thanks. You're headed to civilization")
			createNewButton(9);
			createNewButton(10);
			choiceArray[3].remove();
			choiceArray[7].remove();
			choiceText1.append(choiceArray[8]);
			choiceText2.append(choiceArray[9]);
			choiceText.fadeIn();
			choiceArray[8].fadeIn();
			choiceArray[9].fadeIn();
			playerCharacter.choice = 6;
			addEventListeners();
		})

	}
	else if (playerCharacter.choice === 6) {
		choiceArray[8].click(function () {
			updateNarrative("You run through the trees with reckless abandon, the branches whipping your arms and face as you plow ahead. You can't stop, you can hear them moving behind you, cursing and panting as their thick robes catch on roots and branches. As you move deeper into the woods you hear a deep rumbling. In a second the forest seems to turn against you - the roots take on a life of their own shifting and darting to harass you and make you fall. You trip and the forest roots coil around your ankles, arms, and neck. You fight as hard as you can but there is no denying the implacable strenght of the possessed roots. The air is choked from your body and you die. Sad!")
			playerCharacter.alive = false;
			gameOver();
			choiceItems.fadeOut();


		})
		choiceArray[9].click(function() {
			updateNarrative("You leap the fence at the edge of your property towards town. You can hear the cultists behind you, but their heavy robes and their tendency to read latin instead of exercising leaves you with a distinct edge. After a frantic mile of running, you've lost them. You make it into town, scared but alive. What were they doing at your house? What kind of dark horror are they going to visit on the world? What the hell happened to your door? You'll never know and spend the rest of yuor life trying to forget that this happened.");
			gameOver();
			choiceItems.fadeOut();

		})
	}
	else if (playerCharacter.choice === 9) {
		updateNarrative("You throw the last intruder over the countertop of your kitchen, scattering pots everywhere. He raises his hand to ward off your final blow but it connects and sends him slumping to the ground. Adrenaline is pumping through veins. Curious to know more about what bought these strangers into your house, you lean down and search his robes. Inside you find two unusual items - an ancient leather bound book as well as a heavy iron key. The book carries an aura of heavy malice. You need to get out of here and report what happened in town - but the book may help you gain more information. Do you open it?");
		choiceText1.text("Open the book");
		choiceText2.text("You've had enough weirdness. The book can wait, head into town.")
		var openBookButton = $("<button id='openBook' class='choiceButton'>Choose</button>")
		var goToTown = $("<button id='townButton' class='choiceButton'>Choose</button>")
		choiceText1.append(openBookButton);
		openBookButton.click(function() {
			updateNarrative("The alien script seems to crawl as you run your eyes over it. For a split second you feel a presence occupying your mind, and have insight into a place on the other side of the world. It is a cold and dead place where the sun never touches. Creatures of darkness call it their home - celebrating cruelty and survival above all else. Spiteful as they may be - they are advanced, and travel the universe making other creatures their playthings. Humans are one of their favorite targets. You snap back into reality with a traumatic new experience, but also with the ability to leverage some of the cosmic power that these beings would use against you. (You've gained the spell 'Shrivel!' Using it will reduce your sanity, but help you win difficult fights in a pinch)")
		var shrivel = {
					name: "Shrivel",
					use: function () {
					currentAttack.name = "Shrivel";
					currentAttack.power = 10;
					currentAttack.speed = 1;
					currentAttack.cost = 5;
					}
				}
			playerCharacter.spells.push(shrivel);
			playerCharacter.sanity -= 5;
			openBookButton.remove();
			choiceText1.text("You're ready, head into town.")
			choiceText1.append(goToTown);
			choiceText2.text("");
		});
		choiceText2.append(goToTown);
		goToTown.click(function() {
			updateNarrative("You're not sure what the cult is doing on your property, but if anymore of them show up you're going to be in serious trouble. You head into town to see if you can learn more.");
			choiceText1.text("Proceed to the next chapter");
			goToTown.remove();
			var nextChapter = $("<button id='chapter2Button' class='choiceButton'>Choose</button>");
			choiceText1.append(nextChapter);
			choiceText2.text("");
				nextChapter.click (function () {
					playerCharacter.chapter = 2;
					playerCharacter.choice = 0;
					chapter2UpdateChoices();
				})
	})
	}
}

var clearChoiceBox = function() {
	choiceText1.empty();
	choiceText2.empty();
	choiceText3.empty();
}

var newChapter2Button = function (id, choiceText) {
	var newButton = $("<button id='" + id + "' class='choiceButton'>Choose</button>");
	newButton.appendTo(choiceText);
}


chapter2UpdateChoices = function() {
	if (playerCharacter.choice === 0) {
		updateNarrative("You run out to you car and hop behind the wheel, itching to put this nightmare behind you. You peel out onto the country road and begin to accelerate. You're finally starting to calm down when, in a flash, something white darts into the road. What do you do?");
		choiceText1.text("Accelerate.")
		var accelerateButton = $("<button id='accelerate' class='choiceButton'>Choose</button>")
		choiceText1.append(accelerateButton);
			accelerateButton.click(function () {
				playerCharacter.choice = 1;
				car = "damaged";
				chapter2UpdateChoices();
			})
		choiceText2.text("Swerve to avoid it!")
		var swerveButton = $("<button id='accelerate' class='choiceButton'>Choose</button>");
		choiceText2.append(swerveButton);
		swerveButton.click(function() {
			playerCharacter.choice = 2;
			chapter2UpdateChoices();
		})
	} else if (playerCharacter.choice === 1) {
		clearChoiceBox();
		updateNarrative("You step on the gas and plow into some kind of monster. You only catch a glimpse of it before it's dragged under your car, but it's massive claws rend several marks down the hood of your car before it is slammed into the road and kicked out somewhere behind you. Your car is damaged, but functional, and you can continue on.")
		choiceText1.text("Head into town")
		playerCharacter.choice = 3
		var keepDriving = $("<button id='keepDriving' class='choiceButton'>Choose</button>");
				choiceText1.append(keepDriving);
				keepDriving.click(function() {
					chapter2UpdateChoices();
				})

	} else if (playerCharacter.choice === 2) {
		var crash = Math.random();
		console.log(crash);
			if (crash > .5) {
				clearChoiceBox();
				updateNarrative("You swerve around whatever it was blocking your path and frantically work to regain control of the vehicle. After a breathless moment you find yourself crusing back along the road - car and body intact.")
				choiceText1.text("Whew. Keep driving!")
				playerCharacter.choice = 3
				var keepDriving = $("<button id='keepDriving' class='choiceButton'>Choose</button>");
				choiceText1.append(keepDriving);
				keepDriving.click(function() {
					chapter2UpdateChoices();
				})

			} else {
				clearChoiceBox();
				updateNarrative("You jerk your steering wheel to the side and run directly into a tree. Miraculously, you're basically unharmed. You turn your head and see the creature from the middle of the road scrambling towards you. It's humanoid but malformed - its ivory skin shines in the moonlight and its monstrous mouth voraciously flaps open and shut. Despite it's lightning fast movement it has no legs, and uses its arms to dart towards you. You have no choice but to fight.");
				choiceText1.text("Time to fight");
				choiceText2.empty();
				var fightGhoul = $("<button id='fightGhoul' class='choiceButton'>Choose</button>");
				choiceText1.append(fightGhoul);
				fightGhoul.click(function() {
					initiateBattle(1, "Ghoul", 15,3,10, "imgs/ghoul.gif");
					playerCharacter.choice = 4;
					chapter2UpdateChoices();
				})
			}
	} else if (playerCharacter.choice === 3) {
		clearChoiceBox();
		updateNarrative("It hasn't been easy but you crest a hill and are greeted by the comforting lights of civilization. You expect the feeling of spine tingling dread to abate, but feel no sense of relief. Whatever is happening to you is real - you and everyone in town might be threatened. Where do you want to go?")
		choiceText1.text("Head to the police station, the authorities need to know.")
		choiceText2.text("Someone has to know what this book means, head over to the 'Linguistics' department of the local university")
		choiceText3.text("You're banged up, you need some medical attention before considering anything else.")
		var policeStation = ("<button id='policeStation' class='choiceButton'>Choose</button>")
		var university = ("<button id='university' class='choiceButton'>Choose</button>")
		var hospital = ("<button id='hospital' class='choiceButton'>Choose</button>")
		choiceText1.append(policeStation);
		choiceText2.append(university);
		choiceText3.append(hospital);
		//event listeners for the choices go here
		$("#policeStation").click(function() {
			playerCharacter.choice = 6;
			policeStationUpdateChoices();
		})
		$("#university").click(function() {
			playerCharacter.choice = 0;
			updateUniversityChoices();
		})
		$("#hospital").click(function() {
			playerCharacter.choice = 0;
			hospitalUpdateChoices();
		})

	} else if (playerCharacter.choice === 4) {
		updateNarrative("You stand over the creatures body, hard to believe you're alive. At least you have physical proof that the horrible events aren't only in your head. Nothing to do now but continue on towards town - and hopefully safety.")
		playerCharacter.choice = 3;
		choiceText1.text("Onwards to town!")
		var keepDriving = $("<button id='keepDriving' class='choiceButton'>Choose</button>");
				choiceText1.append(keepDriving);
				keepDriving.click(function() {
				chapter2UpdateChoices();
		})
	}
}

var policeStationUpdateChoices = function() {
	if (playerCharacter.choice === 0) {
		clearChoiceBox();
		updateNarrative("You slowly walk across the lobby, nerves clenched for a sudden surprise. Finally you get close enough to look over the front desk and with a mix of apprehension and excitement crane your head over. You see... nothing. Behind the desk is totally normal and empty, like the person using it had just cleared out for lunch. The only irregular facet is that, upon closer inspection, there is a service revolver on the ground, kicked partially under the desk. You pick it up and discover that it only has five bullets - somebody fired this gun. (Revolver has been added to your inventory). What do you do next?")
		var revolver = {
					name: "Revolver",
					charges: 5,
					use: function () {
					currentAttack.name = "Revolver";
					currentAttack.power = 10;
					currentAttack.speed = 1;
					currentAttack.cost = 0;
					}
				}
		playerCharacter.inventory.push(revolver);
		choiceText1.text("Call out to see if anyone is there");
		choiceText2.text("Leave");
		var callOut = $("<button id='callOut' class='choiceButton'>Choose</button>");
		choiceText1.append(callOut);
		var leave = $("<button id='leave' class='choiceButton'>Choose</button>");
		choiceText2.append(leave);
		//Event for calling out
		callOut.click(function () {
			playerCharacter.choice = 1;
			policeStationUpdateChoices();
		})
		//Event for heading deeper
		leave.click(function() {
			playerCharacter.choice = 3;
			policeStationUpdateChoices();
		})
	} else if (playerCharacter.choice === 1) {
		clearChoiceBox();
		var result = Math.random();
		if (result > .5) {
			updateNarrative("'Hello? Is anyone there?' At first there is silence, and then, a surprised 'Are you human?' Before you can formulate a response a wild eyed sheriffs deputy pokes his head out from one of the offices. 'Thank God, when they came I hid under my desk. They... they took everyone. It was horrible.");
			choiceText1.text("You don't trust this guy, back away slowly and get out of the police station.")
			choiceText2.text("'Slow down, what happened here? Let's work together and figure this out.'")
			var leaveStation = $("<button id='leaveStation' class='choiceButton'>Choose</button>");
			choiceText1.append(leaveStation);
			var workTogether = $("<button id='workTogether' class='choiceButton'>Choose</button>");
			choiceText2.append(workTogether);
			//Event for leaving station
			leaveStation.click(function () {
				playerCharacter.choice = 3;
				policeStationUpdateChoices();
			})
			//Event for working together
			workTogether.click(function () {
				playerCharacter.choice = 4;
				policeStationUpdateChoices();
			})
		} else {
			clearChoiceBox();
			updateNarrative("'Hello? Is anyone there?' For a moment there's silence, and then you hear the shuffling of feet. To your horror two shambling zombies round the corner and immediately beeline towards you!")
			choiceText1.text("You have no choice but to fight these creatures")
			var fightZombies = $("<button id='fightZombies' class='choiceButton'>Choose</button>");
			choiceText1.append(fightZombies);
			fightZombies.click(function () {
				playerCharacter.choice = 5;
				policeStationUpdateChoices();
				initiateBattle(2, "Zombie", 15,1,5, "imgs/zombie.gif");

			})
		}
	} else if (playerCharacter.choice === 3) {
		clearChoiceBox();
		updateNarrative("You leave the police station. Where do you go now?");
		choiceText1.text("Head to the university");
		choiceText2.text("Head to the hospital");
		var university = $("<button id='university' class='choiceButton'>Choose</button>")
		var hospital = $("<button id='hospital' class='choiceButton'>Choose</button>")
		choiceText1.append(university);
		choiceText2.append(hospital);
		//Event listener for hospital
		hospital.click(function () {
			playerCharacter.choice = 0;
			hospitalUpdateChoices();
		}) 
		university.click(function () {
			playerCharacter.choice = 0;
			universityUpdateChoices();
		})
		if (playerCharacter.museum === "discovered") {
			choiceText3.text("Museum");
			var museum = $("<button id='museum' class='choiceButton'>Choose</button>")
			choiceText3.append(museum);
			museum.click(function() {
				playerCharacter.choice = 0;
				museumUpdateChoices();
			})

		}

	} else if (playerCharacter.choice === 4) {
		clearChoiceBox();
		updateNarrative("The Deputy takes a deep breath. 'What's going on? That's a tough question. One second I was minding my own business, the next there are creatures all over the police station. Horrible tentacled bastards swinging our boys around. We tried to fight but there was way too many - we didn't last one. Before we knew it they had us all dead or unconcious and started carting the bodies somewhere outside. I'm not proud, but at that point I just hid under my desk and waited for it to be over. Guess I'm not much of a cop eh? At least I can still help you. Here, let me patch you up.'' (You've been fully healed.) He continues, 'I don't know who you are, but if you're trying to stop this thing I heard them say that they were headed to the museum to perform 'the Ritual' whatever that means it can't be good. I don't know what you're doing - but I'll head over there. Meet me when you're ready to put a stop to this.")
		playerCharacter.health = 10;
		playerCharacter.deputy = 1;
		playerCharacter.museum = "discovered";
		choiceText1.text("There isn't much time to lose, lets head over to the museum.");
		var museum = $("<button id='museumButton' class='choiceButton'>Choose</button>");
		choiceText1.append(museum);
		choiceText2.text("Running in there blind is too dangerous - keep searching the town.")
		var keepSearching = $("<button id='keepSearchingButton' class='choiceButton'>Choose</button>");
		choiceText2.append(keepSearching);
		//Head to the museum event listener
		museum.click(function() {
			playerCharacter.choice = 0;
			museumUpdateChoices();
		})
		//Keep Searching event listener
		keepSearching.click(function () {
			playerCharacter.choice = 3
			policeStationUpdateChoices();
		})

	} else if (playerCharacter.choice === 5) {
		clearChoiceBox();
		updateNarrative("The zombies are dead and all is quiet in the police station. After a second, a timid deputy sticks his head around the corner of one of the offices. 'You killed them? Thank god. They had me stuck in my office for the last hour.'");
			choiceText1.text("You don't trust this guy, back away slowly and get out of the police station.")
			choiceText2.text("'Slow down, what happened here? Let's work together and figure this out.'")
			var leaveStation = $("<button id='leaveStation' class='choiceButton'>Choose</button>");
			choiceText1.append(leaveStation);
			var workTogether = $("<button id='workTogether' class='choiceButton'>Choose</button>");
			choiceText2.append(workTogether);
			//Event for leaving station
			leaveStation.click(function () {
				playerCharacter.choice = 3;
				policeStationUpdateChoices();
			})
			//Event for working together
			workTogether.click(function () {
				playerCharacter.choice = 4;
				policeStationUpdateChoices();
			})
		//code about killing the zombies and discovering the ritual,
	}  else if (playerCharacter.choice === 6) {
		clearChoiceBox();
		updateNarrative("You pull up in front of the police station, a squat concrete building near the center of town. You rush from your car through the front doors and find the front desk and lobby conspicuously empty. Even more concerning, you don't hear any noise from deeper in the station. The place is dead quiet")
		choiceText1.text("Nope, you're out of here");
		var goBack = $("<button id='goBack' class='choiceButton'>Choose</button>");
		var frontDesk = $("<button id='frontDesk' class='choiceButton'>Choose</button>");
		choiceText1.append(goBack);
		choiceText2.text("Look behind the front desk and see what you can find");
		choiceText2.append(frontDesk);
		goBack.click(function () {
			playerCharacter.choice = 3;
			policeStationUpdateChoices();
		})
		frontDesk.click(function() {
			playerCharacter.choice = 0;
			policeStationUpdateChoices();
		})


	}
}



var hospitalUpdateChoices = function () {
	if (playerCharacter.choice === 0) {
		clearChoiceBox();
		updateNarrative("You arrive at the hospital. As you pull up you see a decided lack of activity - from the outside the hospital looks completely abandoned. There is an ambulance outside, do you want to search it or head inside?");
		choiceText1.text("Search the ambulance");
		choiceText2.text("Head straight into the hospital");
		choiceText3.text("This is creepy. Leave");
		var searchAmbulance = $("<button id='searchAmbulance' class='choiceButton'>Choose</button>");
		var intoHospital = $("<button id='intoHospital' class='choiceButton'>Choose</button>");
		var leaveHospital = $("<button id='leaveHospital' class='choiceButton'>Choose</button>");
		choiceText1.append(searchAmbulance);
		choiceText2.append(intoHospital);
		choiceText3.append(leaveHospital);
		searchAmbulance.click(function () {
			playerCharacter.choice = 1;
			hospitalUpdateChoices();
		});
		intoHospital.click(function () {
			playerCharacter.choice = 2;
			hospitalUpdateChoices();
		});
		leaveHospital.click(function() {
			playerCharacter.choice = 3;
			hospitalUpdateChoices();
		})
	} else if (playerCharacter.choice === 1) {
		clearChoiceBox();
		updateNarrative("You head to the ambulance and open the back. It's deserted as expected, but there's a number of useful supplies here! You find a large cache of bandages and enough equipment to patch yourself up.");
		playerCharacter.health = 10;
		playerCharacter.inventory[1].charges = 3;
		choiceText1.text("Head deeper into the hospital");
		choiceText2.text("Let's not press our luck, get out of there.")
		var intoHospital = $("<button id='intoHospital' class='choiceButton'>Choose</button>");
		var leaveHospital = $("<button id='leaveHospital' class='choiceButton'>Choose</button>");
		choiceText1.append(intoHospital);
		choiceText2.append(leaveHospital);
		intoHospital.click(function () {
			playerCharacter.choice = 2;
			hospitalUpdateChoices();
		});
		leaveHospital.click(function() {
			playerCharacter.choice = 3;
			hospitalUpdateChoices();
		});
	} else if (playerCharacter.choice === 2) {
		clearChoiceBox();
		updateNarrative("You head into the deserted hospital. The lobby is empty and the air feels heavy under the oppressive glare of the flickering flourescent lights. You've barely entered when you hear a scream from further down the hallway. What do you do?")
		choiceText1.text("I don't place text based adventure games to be a big WUSS. I run towards it.")
		choiceText2.text("Sounds like a good way to die. I'm getting out of here.")
		var charge = $("<button id='chargeButton' class='choiceButton'>Choose</button>");
		var leaveHospital = $("<button id='leaveHospital' class='choiceButton'>Choose</button>");
		choiceText1.append(charge);
		choiceText2.append(leaveHospital);
		charge.click(function() {
			playerCharacter.choice = 4;
			hospitalUpdateChoices();
		})
		leaveHospital.click(function() {
			playerCharacter.choice = 3;
			hospitalUpdateChoices();
		}); 
	} else if (playerCharacter.choice === 3) {
		clearChoiceBox();
		updateNarrative("You decide to leave the hospital, what are you going to do now?")
			choiceText1.text("Police Station");
			choiceText2.text("University");
			var policeStation = $("<button id='policeStation' class='choiceButton'>Choose</button>")
			var university = $("<button id='university' class='choiceButton'>Choose</button>")
		choiceText1.append(policeStation);
		choiceText2.append(university);
		//Event listener for hospital
		policeStation.click(function () {
			playerCharacter.choice = 6;
			policeStationUpdateChoices();
		}) 
		university.click(function () {
			playerCharacter.choice = 0;
			universityUpdateChoices();
		})
		if (playerCharacter.museum === "discovered") {
			choiceText3.text("Museum");
				var museum = $("<button id='museum' class='choiceButton'>Choose</button>")
			choiceText3.append(museum);
			museum.click(function() {
				playerCharacter.choice = 0;
				museumUpdateChoices();
			})

		}
	} else if (playerCharacter.choice === 4) {
		clearChoiceBox();
		updateNarrative("You rush down the hallway and careen around the corner. You see a Doctor using a stool to try and keep two ghouls at bay. Her eyes widen in surprise at seeing you, drawing the creatures attention to you. They immediately shift their focus off of her and close on you!");
		choiceText1.text("Let's get ready to ruuuuuumble");
		var fightGhouls = $("<button id='fightGhouls' class='choiceButton'>Choose</button>");
		choiceText1.append(fightGhouls);
		fightGhouls.click(function () {
			playerCharacter.choice = 5;
			initiateBattle(2, "Ghoul", 15,3,10, "imgs/ghoul.gif");
			hospitalUpdateChoices();
		})
	} else if (playerCharacter.choice === 5) {
		clearChoiceBox();
		updateNarrative("You finish off the ghouls. As the sounds of the fight fade the Doctor pokes her head out from behind the desk. 'Thank god you showed up. I was worried that I was the last one. I've been searching the hospital for other survivors, but it looks like the cult picked it clean and took everyone. I wish we had more time to talk - but all I know is that a bunch of psycho's in something called 'The Cult of the Worm' are planning some kind of big sacrifice at the museum. We need to stop it! I'll meet you there. But first take this, it might be useful.' (You recieved two shots of adrenaline, you can consume them to gain extra actions during combat!)")
			var adrenaline = {
				name: "Adrenaline",
				charges: 2,
				use: function () {
					playerCharacter.actions += 3;
					}
				}
		playerCharacter.inventory.push(adrenaline);
		playerCharacter.doctor = 1;
		choiceText1.text("Head out");
		var leave = $("<button id='leave' class='choiceButton'>Choose</button>");
		choiceText1.append(leave);
		leave.click(function() {
			playerCharacter.choice = 3;
			hospitalUpdateChoices();
		})
	}
};

var universityUpdateChoices = function () {
	if (playerCharacter.choice === 0) {
		clearChoiceBox();
		updateNarrative("You pull up outside of the linguistics department at the local university, it's about as quiet as you'd expect. You can see a light on in one of the second story offices.");
		choiceText1.text("Head inside to see who you can find.");
		choiceText2.text("You have a bad feeling about this, leave.");
		var headInside = $("<button id='headInside' class='choiceButton'>Choose</button>");
		var leave = $("<button id='leave' class='choiceButton'>Choose</button>");
		choiceText1.append(headInside);
		choiceText2.append(leave);
		headInside.click(function () {
			playerCharacter.choice = 1;
			universityUpdateChoices();
		})
		leave.click(function() {
			playerCharacter.choice = 2;
			universityUpdateChoices();
		})
	} else if (playerCharacter.choice === 1) {
		clearChoiceBox();
		updateNarrative("You step inside and make your way up to the lit office. The door plaque reveals it's the workplace of 'H.P. Daniels' a professor specializing in the ancient Egyptian language. You knock on the door and are greeted by an alarmed, 'Whose there?!'");
		choiceText1.text("'Something insane is going on and I need to know more! I've got this creepy book I was hoping you could help me translate it'");
		choiceText2.text("No games, kick down the door.");
		var answer = $("<button id='answer' class='choiceButton'>Choose</button>");
		var kickDoor = $("<button id='kickDoor' class='choiceButton'>Choose</button>");
		choiceText1.append(answer);
		choiceText2.append(kickDoor);
		answer.click(function () {
			playerCharacter.choice = 3;
			universityUpdateChoices();
		})
		kickDoor.click(function() {
			playerCharacter.choice = 6;
			universityUpdateChoices();
		})
	} else if (playerCharacter.choice === 2) {
		clearChoiceBox();
		updateNarrative("You decide to leave the university, what are you going to do now?")
			choiceText1.text("Police Station");
			choiceText2.text("Hospital");
			var policeStation = $("<button id='policeStation' class='choiceButton'>Choose</button>")
			var hospital = $("<button id='hospital' class='choiceButton'>Choose</button>")
		choiceText1.append(policeStation);
		choiceText2.append(hospital);
		//Event listener for hospital
		policeStation.click(function () {
			playerCharacter.choice = 6;
			policeStationUpdateChoices();
		}) 
		hospital.click(function () {
			playerCharacter.choice = 0;
			hospitalUpdateChoices();
		})
		if (playerCharacter.museum === "discovered") {
			choiceText3.text("Museum");
			var museum = $("<button id='museum' class='choiceButton'>Choose</button>")
			choiceText3.append(museum);
			museum.click(function() {
				playerCharacter.choice = 0;
				museumUpdateChoices();
			})

		}
	} else if (playerCharacter.choice === 3) {
		clearChoiceBox();
		updateNarrative("'A book you say? Well what are you waiting for! Bring it in here.' You head into the office and see the professor was pouring over a number of ancient scrolls. 'I must admit, this is compelling timing. These ancient texts describe tonight as one of great cosmological power - I'm a man of science, but the things I've seen procuring these scrolls... never mind that. How did you find the book?' You explain the insane events of your evening and hand over the book. A short while later he looks up with a wild look in his eyes. 'This book is written in an alien derivative of Egyptian script - I can't make 100% sense of it. But there are instructions for some kind of ritual. It can only be performed at a place that meets very specific criteria - if what you've told me about your night is true the cult must be there right now attempting their ritual! We must stop them. Before we leave - there are some arcane secrets in this book that might be useful in the battle ahead - but they were not meant for man to know. Would you like me to teach you?'");
		playerCharacter.professor = 1;
		choiceText1.text("You're gonna need every edge you can get. Time for some magic lessons.");
		choiceText2.text("Ancient magic screwing with your head? Hard pass");
		var embraceMagic = $("<button id='embraceMagic' class='choiceButton'>Choose</button>");
		var rejectMagic = $("<button id='rejectMagic' class='choiceButton'>Choose</button>");
		playerCharacter.museum = "discovered";
		choiceText1.append(embraceMagic);
		choiceText2.append(rejectMagic);
		embraceMagic.click(function() {
			playerCharacter.choice = 4;
			universityUpdateChoices();
		})
		rejectMagic.click(function() {
			playerCharacter.choice = 5;
			universityUpdateChoices();
		})
	} else if (playerCharacter.choice === 4) {
		clearChoiceBox();
		updateNarrative("The professor gives you a crash course in ancient, forbidden magic. You learned the spell heal. It allows you to use some of your sanity to restore your health.")
		var heal = {
			name: "heal",
			use: function () {
				playerCharacter.health = 10;
				playerCharacter.sanity -= 5;
			}
		}
		playerCharacter.spells.push(heal);
		choiceText1.text("Not much time to lose, head to the museum");
		choiceText2.text("There might be more useful things to find in town. Head out.")
		var museum = $("<button id='museum' class='choiceButton'>Choose</button>");
 		var backToTown = $("<button id='backToTown' class='choiceButton'>Choose</button>");
 		choiceText1.append(museum);
 		choiceText2.append(backToTown);
 		museum.click(function() {
 			playerCharacter.choice = 0;
 			museumUpdateChoices();
 		})
 		backToTown.click(function() {
 			playerCharacter.choice = 2;
 			universityUpdateChoices();
 		})
	} else if (playerCharacter.choice === 5) {
		updateNarrative("Smart man steering clear of the supernatural. Well, I might have something else that might be useful. At least take this bowie knife.");
		var bowieKnife = {
				name: "Bowie Knife",
				power: 4,
				speed: 1,
				cost: 0
			};
		playerCharacter.fight.push(bowieKnife);
		choiceText1.text("Not much time to lose, head to the museum");
		choiceText2.text("There might be more useful things to find in town. Head out.")
		var museum = $("<button id='museum' class='choiceButton'>Choose</button>");
 		var backToTown = $("<button id='backToTown' class='choiceButton'>Choose</button>");
 		choiceText1.append(museum);
 		choiceText2.append(backToTown);
 		museum.click(function() {
 			playerCharacter.choice = 0;
 			museumUpdateChoices();
 		})
 		backToTown.click(function() {
 			playerCharacter.choice = 2;
 			universityUpdateChoices();
 		})
	} else if (playerCharacter.choice === 6) {
		clearChoiceBox();
		updateNarrative("You kick down the door and scare the shit out of a kindly out man in glasses. He starts to protest but you cut him short, 'I need you to look at this book. Now.'")
		choiceText1.text("Investigate the book with the professor")
		var bookLearning = $("<button id='investigate' class='choiceButton'>Choose</button>");
		choiceText1.append(bookLearning);
		bookLearning.click(function() {
			playerCharacter.choice= 3;
			universityUpdateChoices();
		})
	}
}

var museumUpdateChoices = function () {
	if (playerCharacter.choice === 0) {
		clearChoiceBox();
		updateNarrative("You pull up to the site of the ritual - the museum. Even from a distance you can hear the strange chanting from your dreams. You're not exactly sure what they're planning, but you're positive about one thing - they have to be stopped. You prepare yourself to head inside");
		choiceText1.text("Head inside");
		var headIntoTheMuseum = $("<button id='headIntoTheMuseum' class='choiceButton'>Choose</button>");
		choiceText1.append(headIntoTheMuseum);
		headIntoTheMuseum.click(function () {
			playerCharacter.choice = 1;
			museumUpdateChoices();
		})
	} else if (playerCharacter.choice === 1 && playerCharacter.deputy === 1) {
		clearChoiceBox();
		updateNarrative("As you head into the museum you are immediately confronted by three ghouls - they rush towards you only to be intercepted by the deputy. He combats one of the ghouls as you begin fighting the other two.");
		choiceText1.text("Time to fight");
		var fightGhouls = $("<button id='fightGhouls' class='choiceButton'>Choose</button>");
		choiceText1.append(fightGhouls);
		fightGhouls.click(function() {
			playerCharacter.choice = 2;
			initiateBattle(2, "Ghoul", 15,3,10, "imgs/ghoul.gif");
			museumUpdateChoices();
		})
	} else if(playerCharacter.choice === 1 && playerCharacter.deputy === 0) {
		clearChoiceBox();
		updateNarrative("As you head into the museum you are immediately confronted by three ghouls - they rush towards you!");
		choiceText1.text("Time to fight");
		var fightGhouls = $("<button id='fightGhouls' class='choiceButton'>Choose</button>");
		choiceText1.append(fightGhouls);
		fightGhouls.click(function() {
			playerCharacter.choice = 2;
			initiateBattle(3, "Ghoul", 15,3,10, "imgs/ghoul.gif");
			museumUpdateChoices();
		})
	} else if(playerCharacter.choice === 2 && playerCharacter.doctor === 1) {
		clearChoiceBox();
		updateNarrative("You stand over the ghouls, beaten, bloody, but victorious. Luckily, the doctor is there to patch you up. She restores you to full health. You've made it past the perimeter - now you need to get to the center of this ritual and stop it.")
		playerCharacter.health = 10;
		choiceText1.text("Head to the final battle");
		var finalBattle = $("<button id='finalBattle' class='choiceButton'>Choose</button>")
		choiceText1.append(finalBattle);
		finalBattle.click(function() {
			playerCharacter.choice = 3;
			museumUpdateChoices();
		})
	} else if (playerCharacter.choice === 2 && playerCharacter.doctor === 0) {
		clearChoiceBox();
		updateNarrative("You stand over the ghouls, beaten, bloody, but victorious. You've made it past the perimeter - now you need to get to the center of this ritual and stop it.")
		choiceText1.text("Head to the final battle");
		var finalBattle = $("<button id='finalBattle' class='choiceButton'>Choose</button>")
		choiceText1.append(finalBattle);
		finalBattle.click(function() {
			playerCharacter.choice = 3;
			museumUpdateChoices();
		})
	} else if (playerCharacter.choice === 3 && playerCharacter.professor === 1) {
		clearChoiceBox();
		updateNarrative("You step into the chamber and see a massive pentagram surrounded by three hooded figures. A twisting, horrible moster is slowly emerging, becoming more and more solid as the chant nears completion. The professor begins to chant, and his words fill you with strength. Your sanity is fully restored as you prepare to fight the Abomination.")
		choiceText1.text("Fight the monster");
		playerCharacter.sanity = 20;
		var fightMonster = $("<button id='fightMonster' class='choiceButton'>Choose</button>");
		choiceText1.append(fightMonster);
		fightMonster.click(function () {
			playerCharacter.choice = 4;
			initiateBattle(1, "Abomination", 40,4,10, "imgs/MonsterThing.gif");
			museumUpdateChoices();
		})
	} else if (playerCharacter.choice === 3 && playerCharacter.professor === 0) {
		clearChoiceBox();
		updateNarrative("You step into the chamber and see a massive pentagram surrounded by three hooded figures. A twisting, horrible moster is slowly emerging, becoming more and more solid as the chant nears completion. It's time to fight the abomination.")
		choiceText1.text("Fight the monster");
		var fightMonster = $("<button id='fightMonster' class='choiceButton'>Choose</button>");
		choiceText1.append(fightMonster);
		fightMonster.click(function () {
			playerCharacter.choice = 4;
			initiateBattle(1, "Abomination", 40,4,10, "imgs/MonsterThing.gif");
			museumUpdateChoices();
		})
	} else if (playerCharacter.choice === 4) {
		clearChoiceBox();
		updateNarrative("The abomination lets out a piercing shriek as it leaves the world. The psychic link it built with the cultists overloads their brains and instantly (and conveniently) kills all of them. In the center of the pentagram a single object is left - the point of your search, and something you'll never take for granted again - your bedroom door. Congratulations!")
		choiceText1.text("Congratulations! Do you want to play again?")
		choiceText1.append("<button id='reset'>Reset</button>")
    	var resetButton = $("#reset");
    	$(".choiceButton").remove();
    	    resetButton[0].addEventListener("click", function () {
    	currentEnemyArray = [];
    	playerCharacter.actions = 2;
    	playerCharacter.choice = 0;
    	enemyCounter = 0;
    	numEnemies = 0;
    	numCultists = 3;
    	$("#theFeed").empty();
    	narrativeText.text("You wake up from a strange dream, feverish and sweating. The details immediately slip away from you and the only thing you can remember is a dull chant in a language you've never heard. Your head is still pounding to its rhythm. You look up from bed and realize that, against all logic, the door has disappeared from your bedroom. What do you do?");
    	choiceText1.text("Go back to sleep");
    	choiceText2.text("Search the room");
    	choiceText3.text("Jump out the window");
    	choiceText1.append(choiceButton1[0]);
    	choiceText2.append(choiceButton2[0]);
    	choiceText3.append(choiceButton3[0]);
    	$("#playerPosition").empty();
    	$("#position1").empty();
    	$("#position2").empty();
    	$("#position3").empty();
    	choiceItems.fadeIn();
    	resetButton.remove();
    	addEventListeners();
    	playerCharacter.health = 10;
    	playerCharacter.sanity = 15;
    	playerCharacter.strength = 5;
    	playerCharacter.alive = true;
    	$("#playerHealthBar").attr("value", playerCharacter.health);
    	initialChoice0();
    	initialChoice1();
    	initialChoice2();
    	var uDead = setInterval(function() {
			if (playerCharacter.health <= 0) {
			updateNarrative("You have died. Sorry!")
			newBattleMessage("You have been killed.")
			playerCharacter.actions = 0;
			gameOver();
			clearInterval(uDead);

	}

}, 100)
	})
	}
} 

//programming for the battle component of the game starts here
var battleDiv = $("#battleDiv");
var actionDiv = $("#actionDiv");
var feedDiv = $("#feedDiv");
var nextButton = $("#nextButton")

//These are the buttons that live inside the actionDiv
var fightButton = $("#fightButton");
var magicButton = $('#magicButton');
var itemButton = $("#itemButton");


nextButton.on("click", function(choiceNum) {
	endBattle();
	playerCharacter.choice = choiceNum;
	addEventListeners()
	nextButton.fadeOut();
})

initialChoice0();
initialChoice1();
initialChoice2();
