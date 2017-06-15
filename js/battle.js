var currentEnemyArray = [];
var enemyCounter = 0;
var numEnemies = 0;

var turn = 1;
var currentActions = $("#currentActions");

var currentAttack = {
	name: "",
	power: "",
	speed: "",
	cost: "",
	index: "",
};

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

var attackTarget;
var lastAttack;

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
		sprite.attr("position", "absolute");
		sprite.attr("bottom", 0);
		$("#position" + numEnemies).append(sprite);
		console.log(this);
		this.id = this.name + enemyCounter;
		this.index = enemyCounter;
		this.enemyAlive = true;
		this.class = "Enemy";
		var self = this;
		var enemyHealthBar = $("<progress max=" + this.health + "></progress>")
		$("#position" + numEnemies).append(enemyHealthBar);
		var target = sprite.click(function() {
			if (playerCharacter.actions >= currentAttack.speed) {
			self.health = (self.health - currentAttack.power);
			$(this).attr("class", "enemy");
			playerCharacter.sanity = (playerCharacter.sanity - currentAttack.cost)
			playerCharacter.actions = (playerCharacter.actions - currentAttack.speed);
			newBattleMessage("You hit " + self.name + " with " + currentAttack.name + " for " + currentAttack.power + " damage.")
			enemyHealthBar.attr("value", self.health);
			currentActions.text(playerCharacter.actions);
			attackTarget = self;
			lastAttack = currentAttack.name
				if (currentAttack.name === "Revolver") {
					playerCharacter.inventory[currentAttack.index].charges--;
					$("li:contains('Revolver:')").text(playerCharacter.inventory[currentAttack.index].name + ": " + playerCharacter.inventory[currentAttack.index].charges);

				}
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
				currentEnemyArray = [];
				$("#nextButton").fadeIn();
				addEventListeners();
				enemyCounter = 0;
			} 	
  	})
		 enemyCounter++;

  };
};

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
};

var endBattle = function () {
	$("#playerPosition").empty();
	$("#theFeed").empty();
	battleDiv.fadeOut();
	actionDiv.fadeOut();
	feedDiv.fadeOut();
	narrativeBox.fadeIn();
	choiceBox.fadeIn();
};


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
							var self = $(this);
							console.log(self);
							if (playerCharacter.inventory[index].charges > 0 && playerCharacter.inventory[index].name !== "Revolver") {
								var effect = playerCharacter.inventory[index].use();
								console.log(playerCharacter.inventory[index].name);
								playerCharacter.inventory[index].charges--;
								$($(".itemMove")[index]).text(playerCharacter.inventory[index].name + ": " + playerCharacter.inventory[index].charges);
								playerCharacter.actions = playerCharacter.actions - 1;
								currentActions.text(playerCharacter.actions);
								$("#playerHealthBar").attr("value", playerCharacter.health);
								currentAttack.index = index;
							} else if (playerCharacter.inventory[index].charges > 0 && playerCharacter.inventory[index].name === "Revolver") {
								var effect = playerCharacter.inventory[index].use();
								currentActions.text(playerCharacter.actions);
								$("#playerHealthBar").attr("value", playerCharacter.health);
								currentAttack.index = index;
							}
							 else {
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