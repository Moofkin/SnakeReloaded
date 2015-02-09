// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham

//creates the food for the snake
function food()
{
	Sprite.call(this);
	this.width = 20;
	this.height = 20;
	this.x = (480 * Math.random());
	this.y = (250 + (320 * Math.random()));
	this.image = Textures.load("snake_food copy.png");
	world.addChild(this);
};

food.prototype = new Sprite();

//updates the food. On collision with the snake, it pushes a new sprite onto the snake and then changes position on the screen
food.prototype.update = function(d)
{
	if (checkCollision(theSnake.head.item, this))
	{
		theSnake.push(new link());
		this.changePosition();
		score = score + 100;
		scoreDisp.text = "Score: " + score;
	}
};

//function that changes the food's position
food.prototype.changePosition = function()
{
	this.x = 480 * Math.random();
	this.y = 250 + (320 * Math.random());
};