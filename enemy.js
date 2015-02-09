// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates an enemy
function enemy()
{
	Sprite.call(this);
	this.image = Textures.load("snake_enemy copy.png");
	this.width = 50;
	this.height = 50;
	
	this.x = canvas.width/2;
	this.y = 0;
	
	this.velocity = new Vector(3, 0);
	world.addChild(this);
};

enemy.prototype = new Sprite();
enemy.prototype.type = "beam";

//moves the enemy back and forth unless it is firing a beam
enemy.prototype.update = function(d)
{
	if (this.type != "beam")
		this.x += this.velocity.x;
	
	if(this.x > canvas.width - this.width || this.x < 0)
	{
         this.velocity.x = this.velocity.x * (-1);
	}
};

//function that changes the attack pattern of an enemy and removes all previous particles from the world
enemy.prototype.changeType = function ()
{
	while(sprayArray.length != 0)
		world.removeChild(sprayArray.pop());
	bulletPartsLeft = 0;
	sprayAngle = 45;
	var change = Math.random();
	if (change < 0.2)
		this.type = "beam";
	else if (change >= 0.2 && change <= 0.6666)
		this.type = "bullet";
	else
		this.type = "spray";
};
