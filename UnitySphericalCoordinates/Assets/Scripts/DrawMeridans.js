﻿var cameraScript:Functions;
var mouseScript:MouseLook;
private var theVerts:Vector3[];
private var lengthOfArray:int;

//For the circles
var ringAngleChange:float=10;//The angle between each ring, try to make it a multiple of 180
var numberOfVerts:float=20;//Number of verticies in each ring
private var ringAngle:float;

function Start(){
	ringAngle=360.0/numberOfVerts;
	lengthOfArray=(360/parseInt(ringAngleChange)+1)*(parseInt(numberOfVerts)/2+1);
	theVerts=new Vector3[lengthOfArray];//Here is our array of all the vertices. We made an array so we only have to calculate once.
	var counter:int=0;
	for(var longi:float=0;longi<=360;longi+=ringAngleChange){
		for(var lati:float=-90;lati<=90;lati+=ringAngle){
			var thePos:Vector3=cameraScript.sphereToCart(Vector2(lati,longi));
			theVerts[counter]=thePos;
			counter++;
		}
	}
}
function OnPostRender(){
	for(var i:int=0;i<lengthOfArray-1;i++){
		if(Vector3.Distance((theVerts[i]+theVerts[i+1])/2,transform.position)<mouseScript.distance-1.8)//1.8 is just a constant, you can change it to fit your game better
			cameraScript.drawLine(theVerts[i],theVerts[i+1]);
	}
}