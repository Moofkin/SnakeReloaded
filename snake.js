// Snake Reloaded (CMPM 20-Assignment #2) -> Winter 2015
	// Coded by: Lauren Cunningham
	
//creates a the snake. Uses Brine's List class
function snake()
{
	List.call(this);
	world.addChild(this);
};

snake.prototype = new List();
snake.prototype.direction = "left";

//moves the snake depending on the direction of the last key press.
	//It updates the head with the direction of travel and each subsequent section with the pervious one's position
snake.prototype.update = function(d)
{
	var prevX;
	var prevY;
	var nextX;
	var nextY;
	if (this.direction == "left")
	{
		for (var i = this.head; i != null; i = i.link)
		{
			if (i == this.head)
			{
				prevX = i.item.x;
				prevY = i.item.y;
				if(i.item.x - 1 <= 0)
					i.item.x = 500;
				else
					i.item.x = i.item.x - 2;
			}
			else
			{
				nextX = prevX;
				nextY = prevY;
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.x = nextX;
				i.item.y = nextY;				
			}
			
		}
	}
	if (this.direction == "up")
	{
		for (var i = this.head; i != null; i = i.link)
		{
			if (i == this.head)
			{
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.y = i.item.y - 2;
			}
			else
			{
				nextX = prevX;
				nextY = prevY;
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.x = nextX;
				i.item.y = nextY;				
			}
			
		}
	}
	if (this.direction == "right")
	{
		for (var i = this.head; i != null; i = i.link)
		{
			if (i == this.head)
			{
				prevX = i.item.x;
				prevY = i.item.y;
				if (i.item.x + 1 >= 500)
					i.item.x = 0;
				else
					i.item.x = i.item.x + 2;
			}
			else
			{
				nextX = prevX;
				nextY = prevY;
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.x = nextX;
				i.item.y = nextY;				
			}
			
		}
	}
	if (this.direction == "down")
	{
		for (var i = this.head; i != null; i = i.link)
		{
			if (i == this.head)
			{
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.y = i.item.y + 2;
			}
			else
			{
				nextX = prevX;
				nextY = prevY;
				prevX = i.item.x;
				prevY = i.item.y;
				i.item.x = nextX;
				i.item.y = nextY;				
			}
			
		}
	}
};

//for listening to keypresses
gInput.addBool(37, "left");
gInput.addBool(38, "up");
gInput.addBool(39, "right");
gInput.addBool(40, "down");
