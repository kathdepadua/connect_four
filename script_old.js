 
rot = 1
gelb = 2
ausserhalb = 3
leer = 0

feld =  new Array(0,0,0,0,0,0,0);
feld[0] = new Array(0,0,0,0,0,0);
feld[1] = new Array(0,0,0,0,0,0);
feld[2] = new Array(0,0,0,0,0,0);
feld[3] = new Array(0,0,0,0,0,0);
feld[4] = new Array(0,0,0,0,0,0);
feld[5] = new Array(0,0,0,0,0,0);
feld[6] = new Array(0,0,0,0,0,0);

hoehe =  new Array(5,5,5,5,5,5,5); 

function get(spalte, zeile)
{
	if ((spalte < 0) || (spalte > 6) || (zeile < 0) || (zeile > 5)) 
	{
		return ausserhalb
	}
	else 
	{
		return (feld[spalte][zeile])
	} 
}       

function put(spalte,farbe)
{
	if (farbe == rot) 
		document.getElementById("IEschreiben").innerHTML = document.getElementById("IEschreiben").innerHTML + 
		'<div style="position:absolute; top:'+(hoehe[spalte]*60+68)+'px; left:'+(spalte*60+3)+'px;"><img src="red-circle.gif" width=55 height = 55> </div>';

	if (farbe == gelb) 
		document.getElementById("IEschreiben").innerHTML = document.getElementById("IEschreiben").innerHTML + 
		'<div style="position:absolute; top:'+(hoehe[spalte]*60+68)+'px; left:'+(spalte*60+3)+'px;"><img src="yellow-circle.gif" width=55 height = 55> </div>';
}


var gewonnen = false;

function gesetzt(spalte)
{
	if (hoehe[spalte] == -1) 
		alert("column full")
	else
	{
		feld[spalte][hoehe[spalte]] = rot;
		hoehe[spalte] = hoehe[spalte] - 1;
		put(spalte,rot);
		if (pruefe(spalte,hoehe[spalte]+1,4,rot,false) == true) 
		{
			gewonnen=true;
			alert("You win");
			location.reload();
		}
		if (
			(hoehe[0] == -1) && 
			(hoehe[1] == -1) && 
			(hoehe[2] == -1) && 
			(hoehe[3] == -1) && 
			(hoehe[4] == -1) && 
			(hoehe[5] == -1) && 
			(hoehe[6] == -1)) 
		{
			alert("Draw Game");
			location.reload();
		}
		if (gewonnen != true) computer();       	
	}
}

/*
 *      function pruefe
 *      Beschreibung: sucht an Koordianten "x,y", ob "menge" Steine in der "farbe" waagrecht,diagonal oder senkrecht aufzufinden sind.
 *      und ob noch die restlichen Stellen für die Erschaffung eines Vierers ausreichen
 *      pruefe_bei_2: prüft ob 4. Stein gleich gesetzt werden kann(ansonsten könnte der Gegner den werdenden Vierer gleich zerstören)
 */

function pruefe(x, y, menge, farbe, pruefe_bei_2)
{
	var i,j,k;
	var summe1,summe2,summe3,summe4;
	var summe12,summe22,summe32,summe42;
	var farbe2;
	var ja=false;

	if (farbe == rot) /* Gegnerfarbe bestimmen */
	{
		farbe2 = gelb
	} else 
	{
		farbe2 = rot
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
			if (get(x-k+j,y) == farbe) {summe1++};
			if (get(x,y-k+j) == farbe) {summe2++};
			if (get(x-k+j,y-k+j) == farbe) {summe3++};
			if (get(x+k-j,y-k+j) == farbe) {summe4++};
			if (get(x-k+j,y) == farbe2) {summe12++};
			if (get(x,y-k+j) == farbe2) {summe22++};
			if (get(x-k+j,y-k+j) == farbe2) {summe32++};
			if (get(x+k-j,y-k+j) == farbe2) {summe42++};
			if (get(x-k+j,y) == ausserhalb) {summe12++};
			if (get(x,y-k+j) == ausserhalb) {summe22++};
			if (get(x-k+j,y-k+j) == ausserhalb) {summe32++};
			if (get(x+k-j,y-k+j) == ausserhalb) {summe42++};
		}
		if ((summe1 >= menge) && (summe12 == 0)) {ja = true} else
		if ((summe2 >= menge) && (summe22 == 0)) {ja = true} else
		if ((summe3 >= menge) && (summe32 == 0)) {ja = true} else
		if ((summe4 >= menge) && (summe42 == 0)) ja = true;


		if ((ja == true) && (pruefe_bei_2 == true))
		{
			summe12 = 0;
			summe22 = 0;
			summe32 = 0;
			summe42 = 0;
			feld[x][y] = farbe;
			hoehe[x]--;

			for(j=0;j<=3;j++)
			{
				if ((summe1 >= menge) && (get(x-k+j,y) == leer) && (get(x-k+j,hoehe[x-k+j]+1) == leer)) summe12++;
				if ((summe2 >= menge) && (get(x,y-k+j) == leer) && (get(x,hoehe[x]+1) == leer)) summe22++;
				if ((summe3 >= menge) && (get(x-k+j,y-k+j) == leer) && (get(x-k+j,hoehe[x-k+j]+1) == leer)) summe32++;
				if ((summe4 >= menge) && (get(x+k-j,y-k+j) == leer) && (get(x+k-j,hoehe[x+k-j]+1) == leer)) summe42++;
			}
			if ((summe12 == 1) || (summe22 == 1) || (summe32 == 1) || (summe42 == 1)) ja = false;
			hoehe[x]++;
			feld[x][y] = leer;
		}
	}
	return ja;
}

function computer()
{
	var x,i,j,k;
	var spalte;
	var zaehler;
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
		if (hoehe[i] < 0) 
			chance[i] = chance[i]-30000;
	}
	
	for (i=0;i<=6;i++)
	{
		//Gewonnen
		if (pruefe(i,hoehe[i],3,gelb,false) == true) chance[i] = chance[i] + 20000;

		//anderer versucht zu gewinnen
		if (pruefe(i,hoehe[i],3,rot,false) == true) chance[i] = chance[i] + 10000;

		//ber einem 3 rot
		if (pruefe(i,hoehe[i]-1,3,rot,false) == true) chance[i] = chance[i] -4000;

		//ber einem 3 gelb
		if (pruefe(i,hoehe[i]-1,3,gelb,false) == true) chance[i] = chance[i] -200;

		//2 auf 3 verhindern
		if (pruefe(i,hoehe[i],2,rot,false) == true) chance[i] = chance[i] +50+Math.random()*3;

		//2 auf 3 ermöglichen, aber nicht wenn anderer die 3 ausschalten kann
		if ((pruefe(i,hoehe[i],2,gelb,true) == true) && (hoehe[i] > 0))
		{
			feld[i][hoehe[i]] = gelb;
			hoehe[i]--;
			zaehler = 0;
			for(j=0;j<=6;j++) if(pruefe(j,hoehe[j],3,gelb,false) == true) zaehler++;
			if (zaehler == 0) {chance[i] = chance[i] +60+Math.random()*2} else {chance[i] = chance[i] - 60}
			hoehe[i]++;
			feld[i][hoehe[i]] = leer;
	}


		//nein wenn rot drüber
		if (pruefe(i,hoehe[i]-1,2,rot,false) == true) chance[i] = chance[i] -10;

		//nein wenn gelb drüber
		if (pruefe(i,hoehe[i]-1,2,gelb,false) == true) chance[i] = chance[i] -8;

		//1 auf 2 verhindern
		if (pruefe(i,hoehe[i],1,rot,false) == true) chance[i] = chance[i] +5+Math.random()*2;

		//1 auf 2 ermöglichen
		if (pruefe(i,hoehe[i],1,gelb,false) == true) chance[i] = chance[i] +5+Math.random()*2;
	

		//nein wenn rot drüber
		if (pruefe(i,hoehe[i]-1,1,rot,false) == true) chance[i] = chance[i] -2;


		//ja wenn gelb drüber
		if (pruefe(i,hoehe[i]-1,1,gelb,false) == true) chance[i] = chance[i] +1;


		//möglichkeit zum austricksen suchen
		if ((pruefe(i,hoehe[i],2,gelb,true) == true) && (hoehe[i] > 0)) 
		{
			feld[i][hoehe[i]] = gelb;
			hoehe[i]--;
			for(k=0;k<=6;k++)       
				if ((pruefe(k,hoehe[k],3,gelb,false) == true) && (hoehe[k] > 0)) 
				{
					feld[k][hoehe[k]] = rot;
					hoehe[k]--;
					for(j=0;j<=6;j++) 
						if (pruefe(j,hoehe[j],3,gelb,false) == true) chance[i] = chance[i] + 2000;
					hoehe[k]++;
					feld[k][hoehe[k]] = leer;
				}
			hoehe[i]++;
			feld[i][hoehe[i]] = leer;
		}

		//prüfen ob anderer austricksen kann
		if ((pruefe(i,hoehe[i],2,rot,true) == true) && (hoehe[i] > 0)) 
		{
			feld[i][hoehe[i]] = rot;
			hoehe[i]--;
			for(k=0;k<=6;k++)
				if ((pruefe(k,hoehe[k],3,rot,false) == true) && (hoehe[k] > 0)) 
				{
					feld[k][hoehe[k]] = gelb;
					hoehe[k]--;
					for(j=0;j<=6;j++)
						if (pruefe(j,hoehe[j],3,rot,false) == true) chance[i] = chance[i] + 1000;
					hoehe[k]++;
					feld[k][hoehe[k]] = leer;
				}
			hoehe[i]++;
			feld[i][hoehe[i]] = leer;
		}       


		//prüfen ob anderer austricksen kann wenn ich ins feld reingehe
		if ((pruefe(i,hoehe[i]-1,2,rot,true) == true) && (hoehe[i] > 1))
		{
			feld[i][hoehe[i]] = rot;
			hoehe[i]--;
			for(k=0;k<=6;k++)
				if ((pruefe(k,hoehe[k]-1,3,rot,false) == true) && (hoehe[k] > 0))
				{
					feld[k][hoehe[k]] = gelb;
					hoehe[k]--;
					for(j=0;j<=6;j++)
						if (pruefe(j,hoehe[j]-1,3,rot,false) == true) chance[i] = chance[i] - 500;
					hoehe[k]++;
					feld[k][hoehe[k]] = leer;
				}
			hoehe[i]++;
			feld[i][hoehe[i]] = leer;
		}


	} // for

	spalte = 0;
	x = -10000;
	for(i=0;i<=6;i++)
	if (chance[i] > x)
	{
		x = chance[i];
		spalte = i;
	}

	feld[spalte][hoehe[spalte]] = gelb;
	hoehe[spalte] = hoehe[spalte] - 1;
	put(spalte,gelb);
	if (pruefe(spalte,hoehe[spalte]+1,4,gelb,false) == true) 
	{
		alert("You have lost");
		location.reload();
	}
	if ((hoehe[0] == -1) && (hoehe[1] == -1) && (hoehe[2] == -1) && (hoehe[3] == -1) && (hoehe[4] == -1)  && (hoehe[5] == -1) && (hoehe[6] == -1)) 
	{
		alert("Draw game");
		location.reload();
	}
}

