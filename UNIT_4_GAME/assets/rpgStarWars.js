$(document).ready(function() {
    var characters = {
        "obi-wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120, 
            attack: 7,
            imageUrl: "../images/obi.jpg",
            enemyAttackBack:15
        },

        "Luke Skywalker": {
            name: "Luke skywalker",
            health: 100,
            attack: 12, 
            imageUrl:"..images/lukeskywalker.jpg",
            enemyAttackBack: 5,
        },
        "Darth Sidious": {
            name: "Darth Sidious", 
            health: 150, 
            attack: 6, 
            imageUrl:"../images/darthsidious.jpg", 
            enemyAttackBack: 5,
        }, 
        "Darth Maul": {
        name: "Darth Maul", 
        health: 180,
        attack: 5, 
        imageUrl: "../images/darthmaul.jpg",
        enemyAttackBack: 25
        },
    };
    console.log(characters);
    //this function will render a character card to the page 
    //the character redeed and the area they are rendered to. 
    var renderOne = function(character, renderArea){
        var charDiv = $("<div class='character' data-name'>" + character.name +"'>");
        var charName = $("<div class= 'character-name'>").text(character.name);
        var charImage = $("<img alt ='image' class 'character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div classes='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append (charHealth);
        $(renderArea).append(charDiv);
    }
    }
    var rendercharacters = function (charObj, areaRender) {
        if (arearender === "#character-section") {
            $(areaRender).empty();
            for (var jey in charObj) {
                if (charObj.hasOwnProperty(key)) {
                 renderOne(charObj[key], areaRender);
                }

            }
        }
    }
    rendercharacters(character, "#character-section");
});

var currSelectedCharacter;
var combatants= [];
var currDefender;
var turncounter = 1; 
var killCount = 0; 
// Functions 
//============================================================






//this function handles the rendering of characters card to the page.
//The character rendered and the are they are rendered to. 

var renderOne = function(character, renderArea, charStatus) {
    var charDiv = $("<div class='character' data-name'>" + character.name +"'>");
    var charName = $("<div class= 'character-name'>").text(character.name);
    var charImage = $("<img alt ='image' class 'character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div classes='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append (charHealth);
    $(renderArea).append(charDiv);
}

    // If the chatachter is an enemy or defender (the active opponent)
    if (charStatus === "enemy") {
        $(charDiv).addClass("enemy");
    }
    else if (charStatus === "defender") {
        currDefender = character; 
        $(charDiv).addclass ("target-enemy");
    }
};

    //function to handle rendering game messages. 
    
    var renderMessage = function(message) {
        //builds the message abd appends it to the page. 
        var gameMessageSet = $ ("#game-message");
        var newMessage = $("<div").text(message);
        gameMessageSet.append(newMessage);

        // if we get this specific message passed in, clear the message area. 
        if (message === "clearMessage" ) {
            gameMessageSet.text("");
        }
    };
            
        
        
    

    // this function handles the rendering of characters based on which  
    var renderCharacters = function (charobj,areaRender) {
    if (areaRender ==="#characters-section") {
        $(areaRender).empty();
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender,"");
            }
        }
    }

}

if (areaRender === "#selected-character") {
    renderOne(charObj, areaRender,"");
}


if (areaRender === "#available-to-attack-section") {
    for(var i = 0; i < charObj.length; i++) {
        renderOne(charObj[i],areaRender,"enemy");
    }

    $(document).on("click",".enemy",function() {
        var name = ($(this).attr("data-name"));

        if ($("#defender").children().length === 0) {
            renderCharacters(name, "#defender");
            $(this).hide();
            renderMessage ("clearMessage");
            }
        });
    }

   //"defender" is the div where the active oponent appears.
   //if true, render the selected enemy in this location.  
if (areaRender ==="#defender") {
    $(areaRender).empty();
    for (var i = 0; i <combatants.length;i++) {
        if (combatants[i].name === charObj) {
            renderOne(combatants[i], areaRender, "defender");
        }
    }
}


    // re-render defender when attacked. 
if (areaRender === "playerDamage"){
    $("#defender"),empty(); 
    renderOne(charObj, "#defender", "defender");
    }   

    //re-ender player characters when attacked. 
    if (areaRender === "enemyDamage") {
        $("#selected-character").empty();
        renderOne(charObj, "#selected-character", "");
    }

    //remove defeated enemy. 
    if (areaRender === "enemyDefeated") {
        $("#defender").empty();
        var gameStatMessage = "You have defeated" + charObj.name + ", you can choose to fight another enemy"
    }
};

//=====================================================================

//render all characters to the page when the game starts.
renderCharacters(characters, "#characters-section");

//on click event for selecting our character.
$(document).on ("click", ".character", function() {
    var name = $(this).attr("data-name");

    //if a player character has not yet been chosen... 

    if(!currSelectedCharacter) {
        currSelectedCharacter = characters[name];
        for (var key in character)  {
            if (key!== name) {
                combatants.push(characters[key]);
            }
        }

        console.log(combatants);
        $("#character-section").hide();

        renderCharacters(currSelectedCharacter, "#selected-character");
        renderCharacters(combatants, "#available-to-attack-section");
    }
});

// when you click the attack button, run the following game logic... 
$ ("#attack-button").on ("click", function ()   {
    if ($("#defender").children().length !==0){
        currDefender.health -=(currSelectedCharacter.attack=turncounter);
        if (currDefender.health > 0) {
            renderCharacters(currDefender, "playerDamage");
        currSelectedCharacter.health -= currDefender.enemyAttackBack;

        renderCharacters(currSelectedCharacter,"enemyDamage");

        }
    }
    //if the enemy has less than zero health they are defeated. 
    else {
        //remove your oponent's character card. 
        renderCharacters(currDefender, "enemyDefeated");
        //increment your kill count. 
        killCount++;
    }
    turncounter++; 
    });
});



    









    }
}
}


