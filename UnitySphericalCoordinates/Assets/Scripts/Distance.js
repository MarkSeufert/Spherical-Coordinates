var point1:Point;
var point2:Point;
var distanceText:GameObject;
var functions:Functions;
var earthRadius:float=6371;//The actual radius of the earth, which is 6371 km
var distance:float=0;
var vertices:int=90;
var theVerts:Vector3[];
var mouseScript:MouseLook;
function Start(){
	theVerts=new Vector3[vertices+1];
}
function Change(){
	if(point1.sphereCoord!=Vector2.zero&&point2.sphereCoord!=Vector2.zero){//Calculate the distance if we have both points on the sphere
		var sideA:float=(90-point1.sphereCoord.x)*Mathf.Deg2Rad;//90-latitude1
		var sideB:float=(90-point2.sphereCoord.x)*Mathf.Deg2Rad;//90-latitude2
		var angleC:float=(point1.sphereCoord.y-point2.sphereCoord.y)*Mathf.Deg2Rad;//Difference in longitudes
		distance=Mathf.Cos(sideA)*Mathf.Cos(sideB)+Mathf.Sin(sideA)*Mathf.Sin(sideB)*Mathf.Cos(angleC);
		distance=Mathf.Acos(distance)*earthRadius;
		distanceText.GetComponent.<TextMesh>().text="Distance: "+distance.ToString("F2")+" Km";
		
		//Calculate the bearing, which we need for the points on the greatcircle
		var bearing:float;
		bearing=Mathf.Cos(sideB)-Mathf.Cos(sideA)*Mathf.Cos(distance/earthRadius);
		bearing/=Mathf.Sin(sideA)*Mathf.Sin(distance/earthRadius);
		
		//This next portion is important for drawing the distance.
		//Since acos has a range of 180 but the longitude has a range of 360, we must double the range.
		//This is done by appluing a + or a - to the sign (direction) of the distance
		var longitudeScaler:float=1;
		var tmp1=point1.sphereCoord.y;
		var tmp2=point2.sphereCoord.y;
		tmp2-=tmp1;
		tmp1=0;
		if(tmp2>180){
			tmp2=-360+tmp2;
		}else if(tmp2<-180){
			tmp2=360+tmp2;
		}
		if(tmp2<0){
			longitudeScaler=-1;
		}
		
		//Now, calculate each point on the greatcircle and store it into the array of vertices
		for(var i:float=0;i<=vertices;i++){
			var subDistance:float=distance*i/earthRadius/parseFloat(vertices);
			var lati:float=Mathf.Cos(sideA)*Mathf.Cos(subDistance)+Mathf.Sin(sideA)*Mathf.Sin(subDistance)*bearing;
			lati=Mathf.Acos(lati);
			var longi:float=Mathf.Cos(subDistance)-Mathf.Cos(sideA)*Mathf.Cos(lati);
			longi/=Mathf.Sin(sideA)*Mathf.Sin(lati);
			longi=Mathf.Acos(longi)*longitudeScaler;
			if(i==0){//Beginning case sometimes doesn't work, but this does
				theVerts[i]=functions.sphereToCart(point1.sphereCoord);
			}else if(i==vertices){//End case sometimes doesn't work, but this does
				theVerts[i]=functions.sphereToCart(point2.sphereCoord);
			}else{
				theVerts[i]=functions.sphereToCart(Vector2(90-lati*Mathf.Rad2Deg,longi*Mathf.Rad2Deg+point1.sphereCoord.y));
			}
		}
	}
}
function OnPostRender(){
	for(var i:int=0;i<vertices;i++){
		if(Vector3.Distance((theVerts[i]+theVerts[i+1])/2,transform.position)<mouseScript.distance-1.8){//1.8 is just a constant, you can change it to fit your game better
			functions.drawLine(theVerts[i],theVerts[i+1]);
			functions.drawLine(theVerts[i],theVerts[i+1]);
			functions.drawLine(theVerts[i],theVerts[i+1]);
			functions.drawLine(theVerts[i],theVerts[i+1]);
			functions.drawLine(theVerts[i],theVerts[i+1]);
			functions.drawLine(theVerts[i],theVerts[i+1]);
		}
	}
}