var red = 1
var yellow = 2
var outside = 3
var empty = 0
var win = false;

var field =  new Array(0,0,0,0,0,0,0);
var height =  new Array(5,5,5,5,5,5,5); 

$(document).ready(function(){

$.each(field, function( index, value ) {
  field[index] =  new Array(0,0,0,0,0,0,0);
});

console.log(field);

});


function get (column, row)
{
	if ((column <0) || (column> 6) || (row <0) || (row> 5))
	{
		return outside
	}
	else
	{
		return (field [column] [row])
	}
}

function put (column, color)
{ 
	if(color == red) 
	{
		$('#boardconnect').append('<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="red-circle.gif" width=55 height = 55> </div>');
	}
	if (color == yellow)
	{
		$('#boardconnect').append('<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="yellow-circle.gif" width=55 height = 55> </div>');
	} 
}

function set(column)
{
	if (height[column] == -1) 
		alert("column full")
	else
	{
		field[column][height[column]] = red;
		height[column] = height[column] - 1;
		put(column,red);
		if (check(column,height[column]+1,4,red,false) == true) 
		{
			win = true;
			alert("You win");
			location.reload();
		}
		if (
			(height[0] == -1) && 
			(height[1] == -1) && 
			(height[2] == -1) && 
			(height[3] == -1) && 
			(height[4] == -1) && 
			(height[5] == -1) && 
			(height[6] == -1)) 
		{
			alert("Draw Game");
			location.reload();
		}
		if (win != true) computer();       	
	}
}

function check(x, y, quantity, color, pruefe_bei_2)
{
	var i,j,k;
	var summe1,summe2,summe3,summe4;
	var summe12,summe22,summe32,summe42;
	var color2;
	var win=false;

	if (color == red) /* Determine opponents color */
	{
		color2 = yellow
	} else 
	{
		color2 = red
	}; 

	for (k=0;k<=3;k++)
	{
		summe1 = 0;
		summe2 = 0;
		summe3 = 0;
		summe4 = 0;
		summe12 = 0;
		summe22 = 0;
		summe32 = 0;
		summe42 = 0;

		for(j=0;j<=3;j++)
		{
			if (get(x-k+j,y) == color) {summe1++};
			if (get(x,y-k+j) == color) {summe2++};
			if (get(x-k+j,y-k+j) == color) {summe3++};
			if (get(x+k-j,y-k+j) == color) {summe4++};
			if (get(x-k+j,y) == color2) {summe12++};
			if (get(x,y-k+j) == color2) {summe22++};
			if (get(x-k+j,y-k+j) == color2) {summe32++};
			if (get(x+k-j,y-k+j) == color2) {summe42++};
			if (get(x-k+j,y) == outside) {summe12++};
			if (get(x,y-k+j) == outside) {summe22++};
			if (get(x-k+j,y-k+j) == outside) {summe32++};
			if (get(x+k-j,y-k+j) == outside) {summe42++};
		}
		if ((summe1 >= quantity) && (summe12 == 0)) {win = true} else
		if ((summe2 >= quantity) && (summe22 == 0)) {win = true} else
		if ((summe3 >= quantity) && (summe32 == 0)) {win = true} else
		if ((summe4 >= quantity) && (summe42 == 0)) win = true;


		if ((win == true) && (pruefe_bei_2 == true))
		{
			summe12 = 0;
			summe22 = 0;
			summe32 = 0;
			summe42 = 0;
			field[x][y] = color;
			height[x]--;

			for(j=0;j<=3;j++)
			{
				if ((summe1 >= quantity) && (get(x-k+j,y) == empty) && (get(x-k+j,height[x-k+j]+1) == empty)) summe12++;
				if ((summe2 >= quantity) && (get(x,y-k+j) == empty) && (get(x,height[x]+1) == empty)) summe22++;
				if ((summe3 >= quantity) && (get(x-k+j,y-k+j) == empty) && (get(x-k+j,height[x-k+j]+1) == empty)) summe32++;
				if ((summe4 >= quantity) && (get(x+k-j,y-k+j) == empty) && (get(x+k-j,height[x+k-j]+1) == empty)) summe42++;
			}
			if ((summe12 == 1) || (summe22 == 1) || (summe32 == 1) || (summe42 == 1)) win = false;
			height[x]++;
			field[x][y] = empty;
		}
	}
	return win;
}

function computer()
{
	var x,i,j,k;
	var column;
	var counter;
	chance = new Array(0,0,0,0,0,0,0);

	chance[0] = 13+Math.random()*4;
	chance[1] = 13+Math.random()*4;
	chance[2] = 16+Math.random()*4;
	chance[3] = 16+Math.random()*4;
	chance[4] = 16+Math.random()*4;
	chance[5] = 13+Math.random()*4;
	chance[6] = 13+Math.random()*4;

	for (i=0;i<=6;i++) 
	{
		if (height[i] < 0) 
			chance[i] = chance[i]-30000;
	}
	
	for (i=0;i<=6;i++)
	{
		//Win
		if (check(i,height[i],3,yellow,false) == true) chance[i] = chance[i] + 20000;

		//oothers tried to win
		if (check(i,height[i],3,red,false) == true) chance[i] = chance[i] + 10000;

		//red with a 3
		if (check(i,height[i]-1,3,red,false) == true) chance[i] = chance[i] -4000;

		//on a 3 yellow
		if (check(i,height[i]-1,3,yellow,false) == true) chance[i] = chance[i] -200;

		//2 prevent 3
		if (check(i,height[i],2,red,false) == true) chance[i] = chance[i] +50+Math.random()*3;

		//

		if ((check(i,height[i],2,yellow,true) == true) && (height[i] > 0))
		{
			field[i][height[i]] = yellow;
			height[i]--;
			counter = 0;
			for(j=0;j<=6;j++) if(check(j,height[j],3,yellow,false) == true) counter++;
			if (counter == 0) {chance[i] = chance[i] +60+Math.random()*2} else {chance[i] = chance[i] - 60}
			height[i]++;
			field[i][height[i]] = empty;
	}


		//nein wenn red drüber
		if (check(i,height[i]-1,2,red,false) == true) chance[i] = chance[i] -10;

		//nein wenn yellow drüber
		if (check(i,height[i]-1,2,yellow,false) == true) chance[i] = chance[i] -8;

		//1 auf 2 verhindern
		if (check(i,height[i],1,red,false) == true) chance[i] = chance[i] +5+Math.random()*2;

		//1 auf 2 ermöglichen
		if (check(i,height[i],1,yellow,false) == true) chance[i] = chance[i] +5+Math.random()*2;
	

		//nein wenn red drüber
		if (check(i,height[i]-1,1,red,false) == true) chance[i] = chance[i] -2;


		//ja wenn yellow drüber
		if (check(i,height[i]-1,1,yellow,false) == true) chance[i] = chance[i] +1;


		//möglichkeit zum austricksen suchen
		if ((check(i,height[i],2,yellow,true) == true) && (height[i] > 0)) 
		{
			field[i][height[i]] = yellow;
			height[i]--;
			for(k=0;k<=6;k++)       
				if ((check(k,height[k],3,yellow,false) == true) && (height[k] > 0)) 
				{
					field[k][height[k]] = red;
					height[k]--;
					for(j=0;j<=6;j++) 
						if (check(j,height[j],3,yellow,false) == true) chance[i] = chance[i] + 2000;
					height[k]++;
					field[k][height[k]] = empty;
				}
			height[i]++;
			field[i][height[i]] = empty;
		}

		//prüfen ob anderer austricksen kann
		if ((check(i,height[i],2,red,true) == true) && (height[i] > 0)) 
		{
			field[i][height[i]] = red;
			height[i]--;
			for(k=0;k<=6;k++)
				if ((check(k,height[k],3,red,false) == true) && (height[k] > 0)) 
				{
					field[k][height[k]] = yellow;
					height[k]--;
					for(j=0;j<=6;j++)
						if (check(j,height[j],3,red,false) == true) chance[i] = chance[i] + 1000;
					height[k]++;
					field[k][height[k]] = empty;
				}
			height[i]++;
			field[i][height[i]] = empty;
		}       


		//prüfen ob anderer austricksen kann wenn ich ins field reingehe
		if ((check(i,height[i]-1,2,red,true) == true) && (height[i] > 1))
		{
			field[i][height[i]] = red;
			height[i]--;
			for(k=0;k<=6;k++)
				if ((check(k,height[k]-1,3,red,false) == true) && (height[k] > 0))
				{
					field[k][height[k]] = yellow;
					height[k]--;
					for(j=0;j<=6;j++)
						if (check(j,height[j]-1,3,red,false) == true) chance[i] = chance[i] - 500;
					height[k]++;
					field[k][height[k]] = empty;
				}
			height[i]++;
			field[i][height[i]] = empty;
		}


	} // for

	column = 0;
	x = -10000;
	for(i=0;i<=6;i++)
	if (chance[i] > x)
	{
		x = chance[i];
		column = i;
	}

	field[column][height[column]] = yellow;
	height[column] = height[column] - 1;
	put(column,yellow);
	if (check(column,height[column]+1,4,yellow,false) == true) 
	{
		alert("You have lost");
		location.reload();
	}
	if ((height[0] == -1) && (height[1] == -1) && (height[2] == -1) && (height[3] == -1) && (height[4] == -1)  && (height[5] == -1) && (height[6] == -1)) 
	{
		alert("Draw game");
		location.reload();
	}
}