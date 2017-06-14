var playerCharacter = {
	health: 10,
	sanity: 15,
	strength: 5,
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
	chapter: 1
};

var car = "undamaged";

var currentEnemyArray = [];
var enemyCounter = 0;
var numEnemies = 0;

var numCultists = 3;

//Here are the variables that determine what turn it is
var turn = 1;
var currentActions = $("#currentActions");

var turnSwitch = setInterval(function(){
	if (playerCharacter.actions > 0) {
	} else if (playerCharacter.health <= 0) {
		clearInterval();
	} else {
		for (i = 0; i < currentEnemyArray.length; i++) {
			currentEnemyArray[i].attack();
		}
	turn = 1;
	playerCharacter.actions = 2;
	currentActions.text(playerCharacter.actions);
	}


}, 100);

var uDead = setInterval(function() {
	if (playerCharacter.health <= 0) {
		updateNarrative("You have died. Sorry!")
		newBattleMessage("You have been killed.")
		playerCharacter.actions = 0;
		gameOver();
		clearInterval(uDead);

	} else if (playerCharacter.sanity <= 0) {
		updateNarrative("You have gone totally, irrevocably bonkers")
		playerCharacter.actions = 0;
		gameOver();
		choiceText3.fadeOut();
		clearInterval(uDead);
	}

}, 100)

var newBattleMessage = function (str) {
			var newFeedItem = $("<li></li>");
			newFeedItem.text(str);
			$("#theFeed").append(newFeedItem);
			var feedDiv = $("#feedDiv");
  			feedDiv.scrollTop(feedDiv[0].scrollHeight);
};


function Enemy(name,hp,dmg,exp,img){
  this.name = name;
  this.health = hp;
  this.strength = dmg;
  this.xp = exp;
  this.img = img;
  this.id = "";
  this.attack = function () {
		playerCharacter.health = (playerCharacter.health - this.strength);
		newBattleMessage(this.name + " hit you for " + this.strength + " damage")
		$("#playerHealthBar").attr("value", playerCharacter.health);
		$("#playerHealthValue").text(playerCharacter.health);
	};

  this.spawn = function() {
  		numEnemies++;
		var sprite = $("<img/>");
		sprite.attr("src", this.img);
		sprite.attr("id", this.name + enemyCounter);
		$("#position" + numEnemies).append(sprite);
		console.log(this);
		this.id = this.name + enemyCounter;
		this.index = enemyCounter;
		this.enemyAlive = true;
		var self = this;
		var enemyHealthBar = $("<progress max=" + this.health + "></progress>")
		$("#position" + numEnemies).append(enemyHealthBar);
		sprite.click(function() {
			if (playerCharacter.actions >= currentAttack.speed) {
			self.health = (self.health - currentAttack.power);
			$(this).attr("class", "enemy");
			playerCharacter.sanity = (playerCharacter.sanity - currentAttack.cost)
			playerCharacter.actions = (playerCharacter.actions - currentAttack.speed);
			newBattleMessage("You hit " + self.name + " with " + currentAttack.name + " for " + currentAttack.power + " damage.")
			enemyHealthBar.attr("value", self.health);
			currentActions.text(playerCharacter.actions)
		} else if (playerCharacter.actions < currentAttack.speed && playerCharacter.actions > 0) {
			newBattleMessage("You don't have enough actions to make that attack, pick another.")
		} else {
			turn = 0;
		}
			if (self.health <= 0) {
				newBattleMessage(self.name + " has been killed.")
				playerCharacter.experience = (playerCharacter.experience + self.xp)
				delete self.id;
				currentEnemyArray.splice(self.index, 1);
				self.enemyAlive = false;
				$(self).removeAttr("class");
				numEnemies--;
				this.remove();
				enemyHealthBar.remove();
			}
			if (numEnemies <= 0) {
				newBattleMessage("You successfully defeated all the enemies!")
				$("#nextButton").fadeIn();
				addEventListeners();
				enemyCounter = 0;
			} 	
  })
		 enemyCounter++;

  };


}

//This array will hold the different kinds of enemies you can encounter in the game
enemyTypes = [];
//Let's create some different enemy types and push them into an array
	enemyTypes.push(new Enemy("Cultist",7,2,5,"imgs/cultist.gif"));
	enemyTypes.push(new Enemy("Ghoul",10,3,10));

var cultist = {
	name: "jerry",
	health: 10,
	strength: 2
};


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
    	$("#theFeed").empty();
    	narrativeText.text("You wake up from a strange dream, feverish and sweating. The details immediately slip away from you and the only thing you can remember is a dull chant in a language you've never heard. Your head is still pounding to its rhythm. You look up from bed and realize that, against all logic, the door has disappeared from your bedroom. What do you do?");
    	choiceText1.text("Go back to sleep");
    	choiceText2.text("Search the room");
    	choiceText3.text("Jump out the window");
    	choiceText1.append(choiceButton1[0]);
    	choiceText2.append(choiceButton2[0]);
    	choiceText3.append(choiceButton3[0]);
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
				power: 6,
				speed: 1,
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
				name: "shrivel",
				power: 10,
				speed: 2,
				cost: 5
			};
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
			playerCharacter.choice = 5;
			chapter2UpdateChoices();
		})
		$("#university").click(function() {
			playerCharacter.choice = 6;
			chapter2UpdateChoices();
		})
		$("#hospital").click(function() {
			playerCharacter.choice = 7;
			chapter2UpdateChoices();
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
};

//programming for the battle component of the game starts here
var battleDiv = $("#battleDiv");
var actionDiv = $("#actionDiv");
var feedDiv = $("#feedDiv");
var nextButton = $("#nextButton")

//These are the buttons that live inside the actionDiv
var fightButton = $("#fightButton");
var magicButton = $('#magicButton');
var itemButton = $("#itemButton");
var run;

var turn = 1;

var newChapter2Button = function (id, choiceText) {
	var newButton = $("<button id='" + id + "' class='choiceButton'>Choose</button>");
	newButton.appendTo(choiceText);
}



//use the 'arguments.' object similarly to this to pass multiple enemies to this function
//This function changes the gameboard to the battle arrangement and creates the buttons you use to fight
var initiateBattle = function (numEnemies, enemyName, enemyHealth, enemyStrength,enemyXP, enemyImg) {
	narrativeBox.hide();
	choiceBox.hide();
	battleDiv = $("#battleDiv");
	actionDiv = $("#actionDiv");
	feedDiv = $("#feedDiv");
	playerCharacter.actions = 2;
	currentActions.text(playerCharacter.actions);
	battleDiv.fadeIn();
	actionDiv.fadeIn();
	feedDiv.fadeIn();
	$("#playerPosition").append("<img id='playerImage' src='imgs/PixelDetective.gif'/>");
	$("#playerPosition").append("<div id='playerHealthSection'><progress id='playerHealthBar' value='' max='10'><span id='playerHealthValue'></span></progress></div>")
	$("#playerHealthBar").attr("value", playerCharacter.health);
	for (i = 0; i < numEnemies; i++) {
		var newEnemy = new Enemy(enemyName,enemyHealth,enemyStrength,enemyXP, enemyImg);
		currentEnemyArray.push(newEnemy);
		newEnemy.spawn();
	}
	//This section of code attaches event listeners to the four different action buttons
	//insert a ul that holds the different move categories
	//each of the li's in that ul hold an additional ul that gives options
	//selecting one of those UL's triggers the specified move
}

// spawnEnemy = function (num, kind) {
// 	for (i = 0; i < num; i++) {
// 		var enemy = new enemyTypes[kind];
// 		var sprite = $("<img/>");
// 		sprite.attr("src", enemyTypes[kind].img);
// 		battleDiv.append(sprite);
// 	}
// }

var endBattle = function () {
	$("#playerPosition").empty();
	$("#theFeed").empty();
	battleDiv.fadeOut();
	actionDiv.fadeOut();
	feedDiv.fadeOut();
	narrativeBox.fadeIn();
	choiceBox.fadeIn();
}

nextButton.on("click", function(choiceNum) {
	endBattle();
	playerCharacter.choice = choiceNum;
	addEventListeners()
	nextButton.fadeOut();
})

var attackFunction = function (target, name, power, speed) {
	target = 
	target.health -= power;
	playerCharacter.actions = (playerCharacter.actions - speed);
	var newFeedItem = $("<li></li>")
	newFeedItem.text("You hit " + target.name + " with " + name + " for " + power + " damage.")
	$("#theFeed").append(newFeedItem);
};

var currentAttack = {
	name: "",
	power: "",
	speed: "",
	cost: ""
}

var fightButtonEventListener = function () {
	fightButton.click(function (){
		if (fightMoves.length === undefined) {
			$("#magicMoves").empty();
			$("#itemMoves").empty();
			$('.magicMoves').remove();
			$(".itemMoves").remove();
			magicMoves.length = undefined;
			for (i = 0; i < playerCharacter.fight.length; i++) {
				var newMove = $("<li class='fightMove'></li>");
				newMove.text(playerCharacter.fight[i].name);
				$("#fightMoves")[0].append(newMove[0]);
				newMove.mouseenter(function () {
					var index = $(this).index();
					var newMovePower = playerCharacter.fight[index].power;
					var newMoveSpeed = playerCharacter.fight[index].speed;
					var newMoveCost = playerCharacter.fight[index].cost;
					var displayBox = $("<div id='displayBox'></div>")
					displayBox.text("Power: " + newMovePower + " Speed: " + newMoveSpeed + " Cost: " + newMoveCost);
					actionDiv.append(displayBox);
					displayBox.attr("background-color", "white");
				});
				newMove.mouseout(function () {
					$("#displayBox").remove();
				})
			}
			fightMoves = $(".fightMove");
			for (i = 0; i < fightMoves.length; i++) {
				var newMove = $(fightMoves[i]);
				newMove.click(function () {
					var index = $(this).index();
					currentAttack.name = playerCharacter.fight[index].name;
					currentAttack.power = playerCharacter.fight[index].power;
					currentAttack.speed = playerCharacter.fight[index].speed;
					currentAttack.cost = playerCharacter.fight[index].cost;
			}
		)
		}
		}
		
	})
}

var magicButtonEventListener = function () {
	magicButton.click(function (){
		if (magicMoves.length === undefined) {
			$("#fightMoves").empty();
			$("#itemMoves").empty();
			$('.fightMoves').remove();
			$(".itemMoves").remove();
			fightMoves.length = undefined;
			itemMoves.length = undefined;
			for (i = 0; i < playerCharacter.spells.length; i++) {
				var newSpell = $("<li class='magicMove'></li>");
				newSpell.text(playerCharacter.spells[i].name);
				$("#magicMoves").append(newSpell);
			}
			magicMoves = $(".magicMove");
			for (i = 0; i < magicMoves.length; i++) {
				var newMove = $(magicMoves[i]);
				newMove.click(function () {
					var index = $(this).index();
					currentAttack.name = playerCharacter.spells[index].name;
					currentAttack.power = playerCharacter.spells[index].power;
					currentAttack.speed = playerCharacter.spells[index].speed;
					currentAttack.cost = playerCharacter.spells[index].cost;;
				})
			}
		}
	})
}

var itemButtonEventListener = function () {
	itemButton.click(function (){
		if (itemMoves.length === undefined) {

			$("#fightMoves").empty();
			$("#magicMoves").empty();
			$('.fightMoves').remove();
			$("#magicMoves").remove();
			fightMoves.length = undefined;
			magicMoves = $("#magicMoves");
			magicMoves.length = undefined;
			for (i = 0; i < playerCharacter.inventory.length; i++) {
					var newItem = $("<li class='itemMove'></li>");
					newItem.text(playerCharacter.inventory[i].name + ": " + playerCharacter.inventory[i].charges);
					$("#itemMoves").append(newItem);
				}
			itemMoves = $(".itemMove");
				for (i = 0; i < itemMoves.length; i++) {
					var newMove = $(itemMoves[i]);
						newMove.click(function () {
							var index = $(this).index();
							var self = this;
							if (playerCharacter.inventory[index].charges > 0) {
								var effect = playerCharacter.inventory[index].use();
								playerCharacter.inventory[index].charges--;
								newItem.text(playerCharacter.inventory[index].name + ": " + playerCharacter.inventory[index].charges);
								playerCharacter.actions = playerCharacter.actions - 1;
								currentActions.text(playerCharacter.actions);
								$("#playerHealthBar").attr("value", playerCharacter.health);

							} else {
								newBattleMessage("That item is depleted, sorry!")
							}
					})
			}
		}
	})
}


fightButtonEventListener();
magicButtonEventListener();
itemButtonEventListener();
initialChoice0();
initialChoice1();
initialChoice2();
