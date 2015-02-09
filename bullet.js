// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates a bullet particle
function bullet(x) 
{
	Sprite.call(this);
    this.image = Textures.load("snake_bullet copy.png");
    this.width = 20;
    this.height = 20;
    
    this.x = x;
    this.y = 0;
    
    this.lifetime = 0;
    this.velocity = new Vector(0,3);
    this.blendfunc = BLEND_ADD;   
}

bullet.prototype = new Sprite();

//updates bullet particles
bullet.prototype.update = function(d) 
{
    this.y += this.velocity.y;
};