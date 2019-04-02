var planetRadius:float=10;
var cameraScript:Functions;
var hoverPosition:Vector3=Vector3.zero;
var hoverSphere:Vector2=Vector2.zero;//The spherical coordinates of the point we are hovering over
var latitudeText:GameObject;
var longitudeText:GameObject;
var sphericalCoords:Vector2=Vector2.zero;

function Update () {
	var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit:RaycastHit;
	if(Physics.Raycast(ray,hit)){
		if(hit.transform.gameObject.tag=="Planet"){
			hoverPosition=hit.point;
			hoverSphere=cameraScript.cartToSphere(hoverPosition);
		}
	}else{
		hoverPosition=Vector3.zero;
		hoverSphere=Vector2.zero;
	}
	outputCoords();
}

function outputCoords(){
	if(hoverPosition!=Vector3.zero){		
		//Latitude text
		var latString:String;
		if(hoverSphere.x>=0){
			latString=hoverSphere.x.ToString("F2")+" °N";
		}else{
			latString=(hoverSphere.x*-1).ToString("F2")+" °S";;
		}
		latitudeText.GetComponent.<TextMesh>().text=latString;
		
		//Longitude text
		var longString:String;
		if(hoverSphere.y>=0){
			longString=hoverSphere.y.ToString("F2")+" °E";
		}else{
			longString=(hoverSphere.y*-1).ToString("F2")+" °W";;
		}
		longitudeText.GetComponent.<TextMesh>().text=longString;
	}else{
		latitudeText.GetComponent.<TextMesh>().text="";
		longitudeText.GetComponent.<TextMesh>().text="";
	}
}