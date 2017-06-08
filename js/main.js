var playerCharacter = {
	health: 10,
	sanity: 15,
	strength: 5,
	inventory: [],
	spells: [],
	choice: 0,
	alive: true
};

var numCultists = 3;


var narrativeText = $("#narrativeText");


var choiceBox = $("#choiceBox");
var choiceItems = $(".choiceElement");

var choiceText = $($(".choiceText"));
var choiceText1 = $("#choiceText1");
var choiceText2 = $("#choiceText2");
var choiceText3 = $("#choiceText3");

var	choiceButton1 = $("#choiceButton1");
var	choiceButton2 = $("#choiceButton2");
var	choiceButton3 = $("#choiceButton3");

var choiceArray = $([
	choiceButton1, choiceButton2, choiceButton3
	])

var nextButton = $("#next");


var gameOver = setInterval(function(){startTime()},1000);
function startTime()
{
  if(playerCharacter.alive === false) {
    clearInterval(gameOver);
    alert("You've died. Sorry!")
    choiceBox.append("<button id='reset'>Reset</button>")
    
    var resetButton = $("#reset");
    $(".choiceButton").remove();

    resetButton[0].addEventListener("click", function () {
    	playerCharacter.health = 10;
    	playerCharacter.sanity = 15;
    	playerCharacter.strength = 5;
    	playerCharacter.choice = 0;
    	playerCharacter.alive = true;
    	choiceArray = $([choiceButton1, choiceButton2, choiceButton3])
    	narrativeText.text("You wake up from a strange dream, feverish and sweating. The details immediately slip away from you and the only thing you can remember is a dull chant in a language you've never heard. Your head is still pounding to its rhythm. You look up from bed and realize that, against all logic, the door has disappeared from your bedroom. What do you do?");
    	choiceText1.text("Go back to sleep");
    	choiceText2.text("Search the room");
    	choiceText3.text("Jump out the window");
    	choiceText1.append(choiceButton1[0]);
    	choiceText2.append(choiceButton2[0]);
    	choiceText3.append(choiceButton3[0]);
    	choiceItems.fadeIn();
    	resetButton.remove();
    })
  } else {

  }  
};



var updateNarrative = function(newText) {
	narrativeText.text(newText)
};

var updateChoices = function (newChoices) {
};


var createNewButton = function (choiceNum) {
	var newButton = $("<button></button");
	newButton.addClass("choiceElement choiceButton");
	newButton.text("Choose");
	console.log(newButton);
	choiceArray.push(newButton);
};

var openDoorChoicesText = ["continue down the hallway", "go back inside", "sit down"];

choiceArray[0][0].addEventListener("click", function () {
	updateNarrative("Doors don't just disappear, and even if they did you have nowhere to go. You roll over in your bed and try to go back to sleep, hoping it will help combat your pounding headache. As you slip into sleep you're senses are assualted, rapidfire, with a torrent of unspeakable images. Grotesque and malformed creatures whose very bodies shift and rearrange themselves as you look upon them. You're jolted back awake with a further reduced grasp on reality. The door is still gone.")
	playerCharacter.sanity = playerCharacter.sanity - 5;
})

choiceArray[1][0].addEventListener("click", function() {
	updateNarrative("You push yourself out of bed and begin to pace through your bedroom. You switch on your bedside light, but it does little to illuminate the oppressive darkness. In the context of your dream even this familiar place feels strange and sinister. You run your hand over where the door used to be and only feel soft wood. You take a step back and find your feet sinking into the ground. You look down - a rug that has never been in your room has appeared. It's adorned with unfamiliar symbols. The pounding in your head reaches an intense crescendo and you find yourself dumped into a hallway on the first floor. From your kitchen you hear voices - they're chanting the same otherwordly litany from your dream! What do you do?");
	playerCharacter.location = "hallway"
	choiceItems.fadeOut();
	choiceText1.text("You've had enough of this. Go confront them")
	choiceText2.text("Something weird is going around - sneak around and see what you can find out.")
	choiceText3.text("");
	createNewButton(4);
	createNewButton(5);
	choiceArray[0][0].replaceWith(choiceArray[3][0]);
	choiceArray[1][0].replaceWith(choiceArray[4][0]);
	choiceText.fadeIn();
	choiceArray[3].fadeIn();
	choiceArray[4].fadeIn();
	playerCharacter.choice = 1;
	addEventListeners();
});

choiceArray[2][0].addEventListener("click", function() {
	updateNarrative("Really? You're going straight out your window? Jeez man, you're nuts. But I admire the dedication. You roll out of bed, stretch your legs for a second, open your window, and then leap outside. You hit the ground hard and the wind is knocked out of you. As you roll over and try to regain your composure you see a hooded figure on your porch gesturing towards you and shouting towards someone inside. What do you do?");
	choiceItems.fadeOut();
	choiceText1.text("They should be scared of you. You just jumped out a window. Press the attack!");
	choiceText2.text("You didn't jump out of a window to get into more trouble. You're out of here");
	choiceText3.text("");
	createNewButton(4);
	createNewButton(8);
	choiceArray[0][0].remove();
	choiceText1.append(choiceArray[3][0])
	choiceArray[0][0].replaceWith(choiceArray[3][0]);
	choiceArray[1][0].remove();
	choiceText2.append(choiceArray[4][0])
	choiceText.fadeIn();
	choiceArray[3].fadeIn();
	choiceArray[4].fadeIn();
	playerCharacter.choice = 3;
	addEventListeners();
})


var addEventListeners = function () {
	if (playerCharacter.choice === 1) {
		choiceArray[4][0].addEventListener("click", function() {
			updateNarrative("You begin to sneak down the hallway, your untrained feet bring squeals from the old floorboards but the monotonous chanting drowns out the sound. As you approach the kitchen you see a hooded figure with his back turned towards you. You think you might be able to sneak up behind him and knock him out before he knows what's happening - alternatively, you keep a baseball bat by your backdoor, you could sneak over and grab it.");
			choiceItems.fadeOut();
			choiceText1.text("Take that sucker out")
			choiceText2.text("This seems like a good time to have a baseball bat")
			createNewButton(6);
			createNewButton(7);
			choiceArray[3][0].replaceWith(choiceArray[5][0]);
			choiceArray[4][0].replaceWith(choiceArray[6][0]);
			choiceText.fadeIn();
			choiceArray[5].fadeIn();
			choiceArray[6].fadeIn();
			playerCharacter.choice = 2;
			addEventListeners();
		})
		choiceArray[3][0].addEventListener("click", function() {
			updateNarrative("This is getting ridiculous. They've woken you up, they're in your house, and somehow they stole your DOOR. You stride down into the hallway, the chanting getting louder as you approach the kitchen. You round the corner and see a trio of hooded cultists doing god knows what near your island. Their eyes register a moment of surprise before they lunge towards you");
			//need to code you entering battle mode here
			choiceItems.fadeOut();
		})
	}
	else if (playerCharacter.choice === 3) {
		choiceArray[3][0].addEventListener("click", function() {
			updateNarrative("You're a mad man! You charge at the hooded figure.")
			//need to code entering battle mode here
		})
		choiceArray[4][0].addEventListener("click", function() {
			updateNarrative("You sprint away from your house. Behind you there's shouting as the intruders begin to give chase. You have a choice, try to lose them in the woods or run towards town?");
			choiceItems.fadeOut();
			choiceText1.text("The woods! Lose em in the trees!");
			choiceText2.text("Spooky woods? No thanks. You're headed to civilization")
			createNewButton(9);
			createNewButton(10);
			choiceArray[3][0].replaceWith(choiceArray[5][0]);
			choiceArray[4][0].replaceWith(choiceArray[6][0]);
			choiceText.fadeIn();
			choiceArray[5].fadeIn();
			choiceArray[6].fadeIn();
			playerCharacter.choice = 4;
			addEventListeners();
		})
	}
	else if (playerCharacter.choice === 4) {
		choiceArray[5][0].addEventListener("click", function () {
			updateNarrative("You run through the trees with reckless abandon, the branches whipping your arms and face as you plow ahead. You can't stop, you can hear them moving behind you, cursing and panting as their thick robes catch on roots and branches. You as you move deeper into the woods you hear a deep rumbling. In a second the forest seems to turn against you - the roots take on a life of their own shifting and darting to harass you and make you fall. You trip and the forest roots coil around your ankles, arms, and neck. You fight as hard as you can but there is no denying the implacable strenght of the possessed roots. The air is choked from your body and you die. Sad!")
			playerCharacter.alive = false;
			choiceItems.fadeOut();
			//add a reset button to appear
		})
		choiceArray[6][0].addEventListener("click", function() {
			updateNarrative("You leap the fence at the edge of your property towards town. You can hear the cultists behind you, but their heavy robes and their tendency to read latin instead of exercising leaves you with a distinct edge. After a frantic mile of running, you've lost them. You make it into town, scared but alive. What were they doing at your house? What kind of dark horror are they going to visit on the world? What the hell happened to your door? You'll never know and spend the rest of yuor life trying to forget that this happened.");
			choiceItems.fadeOut();
			//add a reset button to appear
		})
	}
	else if (playerCharacter.choice === 2) {
		choiceArray[5][0].addEventListener("click", function() {
			updateNarrative("You creep up behind the hooded figure. You wouldn't normally consider yourself a morning person, and usually wouldn't dream of sneaking up behind a cultist and knocking him out before you've had your coffee, but adrenaline and rage can accomplish some incredible things. You put him in the rear naked choke and the sucker is passed out in no time. Unfortunately, as you're lowering him to the floor one of his friends turns around, spots you, and charges you.");
			numCultists--;
			//add a battle button
		})
		choiceArray[6][0].addEventListener("click", function() {
			updateNarrative("You sneak away from the figures in your kitchen. Your progress is agonizing as you expect one of them to shout in discovery at any moment, but whether through guile our luck you make your way to the back door and grab the baseball bat. Nice work! Now what are you going to do with it?");
			playerCharacter.strength = 8;
			choiceItems.fadeOut();
			choiceText1.text("Alright, time for some batting practice. Head back into the kitchen and show those intruders what's up")
			choiceText2.text("Cool. You've got a bat. You're still not wild about fighting three spooky dudes at once. You're getting out of here.")
			createNewButton(8)
			choiceArray[5][0].replaceWith(choiceArray[3][0]);
			choiceArray[6][0].replaceWith(choiceArray[7][0]);
			choiceText.fadeIn();
			playerCharacter.choice = 5;
			addEventListeners();
			}

		)
	}
	else if (playerCharacter.choice === 5) {
		choiceArray[7][0].addEventListener("click", function() {
			updateNarrative("You sprint away from your house. Behind you there's shouting as the intruders begin to give chase. You have a choice, try to lose them in the woods or run towards town?");
			choiceItems.fadeOut();
			choiceText1.text("The woods! Lose em in the trees!");
			choiceText2.text("Spooky woods? No thanks. You're headed to civilization")
			createNewButton(9);
			createNewButton(10);
			choiceArray[3][0].replaceWith(choiceArray[8][0]);
			choiceArray[7][0].replaceWith(choiceArray[9][0]);
			choiceText.fadeIn();
			choiceArray[8].fadeIn();
			choiceArray[9].fadeIn();
			playerCharacter.choice = 6;
			addEventListeners();
		})

	}
	else if (playerCharacter.choice === 6) {
		choiceArray[8][0].addEventListener("click", function () {
			updateNarrative("You run through the trees with reckless abandon, the branches whipping your arms and face as you plow ahead. You can't stop, you can hear them moving behind you, cursing and panting as their thick robes catch on roots and branches. As you move deeper into the woods you hear a deep rumbling. In a second the forest seems to turn against you - the roots take on a life of their own shifting and darting to harass you and make you fall. You trip and the forest roots coil around your ankles, arms, and neck. You fight as hard as you can but there is no denying the implacable strenght of the possessed roots. The air is choked from your body and you die. Sad!")
			playerCharacter.alive = false;
			choiceItems.fadeOut();
			//add a reset button to appear
		})
		choiceArray[9][0].addEventListener("click", function() {
			updateNarrative("You leap the fence at the edge of your property towards town. You can hear the cultists behind you, but their heavy robes and their tendency to read latin instead of exercising leaves you with a distinct edge. After a frantic mile of running, you've lost them. You make it into town, scared but alive. What were they doing at your house? What kind of dark horror are they going to visit on the world? What the hell happened to your door? You'll never know and spend the rest of yuor life trying to forget that this happened.");
			choiceItems.fadeOut();
			//add a reset button to appear
		})
	}
}

// choiceButton.addEventListener("click", function () {
// 	updateNarrative("You opened the door");
// 	playerCharacter.health--;
// 	choicesItems = $(".choiceElement")
// 	choicesItems.fadeOut();
// 	for (i = 0; i < openDoorChoicesText.length; i++) {
// 		choiceText[i].innerHTML(openDoorChoicesText[i])
// 		console.log(openDoorChoicesText[i])
// 	}
// 	nextButton.fadeIn();
// 	}
// )

nextButton[0].addEventListener("click", function () {
	choicesItems = $(".choiceElement");
	choicesItems.fadeIn();
	nextButton.fadeOut();

})

