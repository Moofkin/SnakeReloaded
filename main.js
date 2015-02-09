// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham

use2D = true;
initGame("canvas");

//------------------Declarations for variables, sprites and text boxes----------------
var started = false;

var background = new Sprite();
background.width = 500;
background.height = 600;
background.image = Textures.load("snake_background copy.png");
world.addChild(background);

//Prompts player to press the space bar to start or restart
var space = new TextBox();
space.fontSize = 30;
space.color = "White";
space.x = 60;
space.y = 260;
space.text = "Press the spacebar to start.";
world.addChild(space);

var score = 0;
var scoreDisp = new TextBox();
scoreDisp.color = "White";
scoreDisp.text = "Score: " + score;

//upper barrier
var barrier = new Sprite();
barrier.x = 0;
barrier.y = 250;
barrier.width = 500;
barrier.height = 10;
barrier.image = Textures.load("snake_barrier copy.png");

//lower barrier
var barrier2 = new Sprite();
barrier2.x = 0;
barrier2.y = 590;
barrier2.width = 500;
barrier2.height = 10;
barrier2.image = Textures.load("snake_barrier copy.png");

//game over text
var gameOver = new TextBox();
gameOver.fontSize = 60;
gameOver.color = "Red";
gameOver.x = 80;
gameOver.y = 190;
gameOver.text = "Game Over.";

//used to store/control active particles coming from the enemy
var beamArray = [];
var bulletArray = [];
var sprayArray = [];
beamPartsLeft = 100;
bulletPartsLeft = 1;
sprayPartsLeft = 5;
var sprayAngle = 45;

var theEnemy;
var theSnake;
var theFood;
//--------------------End variable, sprite and text box declarations------------------

world.update = function(d)
{
    //shows a relatively empty screen if the game has not started, or has been lost.
    	// this if statement starts/restarts the game on spacebar press (assuming the game isn't
    	// already running).
    if (gInput.space && started == false)
   	{
   		started = true;
   		initializeScreen();
   		world.removeChild(space);
   		world.removeChild(gameOver);
   		score = 0;
   	}
   	else if (started == true) //if the game is running...
   	{
    	if (theEnemy.type == "beam") //if the enemy is shooting a beam...
    	{
    		if(beamPartsLeft - beamArray.length > 0) //makes sure no more than 100 particles are on the screen
    		{
        		var newPart = new beam(theEnemy.x); //makes a new beam particle and adds it to the array
        		beamArray.push(newPart);
        		this.addChild(newPart);
        		for (var i = 0; i < beamArray.length; i++) //checks collisions with the particles and the snake's sprites
        		{
        			for (var j = theSnake.head; j != null; j = j.link)
        			{
        				if (checkCollision(j.item, beamArray[i]))
      						snakeDeath();
        			}
        		}       
    		} 
    	}
    	if (theEnemy.type == "bullet") //if the enemy is shooting a bullet...
    	{
    		if(bulletPartsLeft >= bulletArray.length) //creates a new bullet particle at regular intervals
    		{
        		var newPart = new bullet(theEnemy.x);
        		bulletArray.push(newPart);
        		this.addChild(newPart);       
    		}
    		for (var i = 0; i < bulletArray.length; i++) //checks for bullet-snake collisions
        	{
        		for (var j = theSnake.head; j != null; j = j.link)
        		{
        			if (checkCollision(j.item, bulletArray[i]))
        				snakeDeath();
        		}
        	}  
    	}
    	if (theEnemy.type == "spray") //if the enemy is shooting a spray...
    	{
    		if(sprayPartsLeft - sprayArray.length > 0) //shoots 5 particles in a spray pattern
    		{
        		var newPart = new spray(theEnemy.x, sprayAngle);
        		sprayArray.push(newPart);
        		this.addChild(newPart);
        		sprayAngle += 22.5;       
    		}
    		for (var i = 0; i < sprayArray.length; i++) //checks for spray-snake collisions
        	{
        		for (var j = theSnake.head; j != null; j = j.link)
        		{
        			if (checkCollision(j.item, sprayArray[i]))
        				snakeDeath();
        		}
        	}  
    	}
    
    	if(theSnake.head.item.y < 250 || theSnake.head.item.y > 580) //checks to make sure the snake has not travelled out of bounds
    		snakeDeath();    
    	
    	//changes the direction of the snake's travel based on key presses
    	if (gInput.left)
    	{
    		if (theSnake.direction != "right")
    			theSnake.direction = "left";
    	}
    	if (gInput.up)
    	{
    		if (theSnake.direction != "down")
    			theSnake.direction = "up";
    	}
    	if (gInput.right)
    	{
    		if (theSnake.direction != "left")
    			theSnake.direction = "right";
    	}
    	if (gInput.down)
    	{
    		if (theSnake.direction != "up")
    			theSnake.direction = "down";
    	}
    	
    	while (beamArray.length != 0 && beamArray[beamArray.length - 1].y > 600)
    		world.removeChild(beamArray.pop());
    	while (bulletArray.length != 0 && bulletArray[bulletArray.length - 1].y > 600)
    	{
    		world.removeChild(bulletArray.pop());
    		bulletPartsLeft = 0;
    	}

    	this.updateChildren(d);	
    }
};

//calls a function that changes the enemy's attack pattern. This function is called every 3.5 seconds
function changeAttack()
{
	theEnemy.changeType();
}

//this function resets the bullet attack every second, allowing for one bullet to be fired every second
function resetBullet()
{
	bulletPartsLeft = bulletPartsLeft + 1;
};

//checks sprite collisions
function checkCollision(sprite1, sprite2)
{
	var widthRange = sprite1.x + sprite1.width;
    var heightRange = sprite1.y - sprite1.height;
    if ((sprite2.x + (sprite2.width / 2)) > sprite1.x 
    		&& (sprite2.x + (sprite2.width / 2)) < widthRange 
            && (sprite2.y - (sprite2.height / 2)) < sprite1.y 
            && (sprite2.y - (sprite2.height / 2)) > heightRange)
    {
    	return true;
    }
};

//adds needed sprites to the world. This function is called when the game is started/restarted
function initializeScreen()
{
	theEnemy = new enemy();
	theSnake = new snake();
	theSnake.push(new initialLink());
	theFood = new food();
	world.addChild(scoreDisp);
	world.addChild(barrier);
	world.addChild(barrier2);
};

//This function is called in the case of player death. It removes moving objects from the world
	// and displays necessary components. Also makes the program once again wait for a spacebar to reinitialize
function snakeDeath()
{
	world.addChild(gameOver);
    while (theSnake.length > 1)
        world.removeChild(theSnake.pop());	
    world.removeChild(theSnake.tail.item);
    world.removeChild(theSnake);
    world.removeChild(theEnemy);
    world.removeChild(theFood);
    started = false;
    world.addChild(space);
   	bulletPartsLeft = 0;
};


//intervals for the changeattack and resetbullet functions
setInterval(changeAttack, 3500);
setInterval(resetBullet, 1000);

//looks for spacebar keyboard presses
gInput.addBool(32, "space");
