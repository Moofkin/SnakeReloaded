// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates a beam particle
function beam(x) 
{
	Sprite.call(this);
    this.image = Textures.load("snake_beam copy.png");
    this.width = 50;
    this.height = 50;
    
    this.x = x;
    this.y = 0;
    
    this.lifetime = 0;
    this.velocity = new Vector(0,0);
    this.blendfunc = BLEND_ADD;   
}

beam.prototype = new Sprite();

//updates beam particles
beam.prototype.update = function(d) 
{
    this.velocity.y += 0.01 * this.width;
    this.y += this.velocity.y;
};