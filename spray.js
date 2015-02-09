// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates a spray particle
function spray(x, angle) 
{
	Sprite.call(this);
    this.image = Textures.load("snake_spray copy.png");
    this.width = 20;
    this.height = 20;
    
    this.x = x;
    this.y = 0;
    
    this.lifetime = 0;
    if (angle == 45)
		this.velocity = new Vector(-3/2, 3);
	else if (angle == 67.5)
		this.velocity = new Vector(-3/4, 3);
	else if (angle == 90)
		this.velocity = new Vector(0, 3);
	else if (angle == 112.5)
		this.velocity = new Vector(3/4, 3);
	else if (angle == 135)
		this.velocity = new Vector(3/2, 3);
    this.blendfunc = BLEND_ADD;   
}

spray.prototype = new Sprite();

//updates spray particles
spray.prototype.update = function(d) 
{
    this.y += this.velocity.y;
    this.x += this.velocity.x;
};