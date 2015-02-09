// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates a link to be used as a section of the snake
function link()
{
	Sprite.call(this);
	this.height = 20;
	this.width = 20;
	this.image = Textures.load("snake_snake copy.png");
	world.addChild(this);
};

link.prototype = new Sprite();

//creates and initial link to be used as the head of the snake
function initialLink()
{
	Sprite.call(this);
	this.x = 250;
	this.y = 500;
	this.height = 20;
	this.width = 20;
	this.image = Textures.load("snake_snake copy.png");
	world.addChild(this);
}

initialLink.prototype = new Sprite();
