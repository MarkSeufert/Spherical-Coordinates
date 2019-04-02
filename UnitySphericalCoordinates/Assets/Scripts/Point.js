var mouseHover:MouseHover;
var pointObject:Transform;
var sphereCoord:Vector2=Vector2.zero;
var theCamera:Distance;
var thePointMat:GameObject;
private var hovering:boolean=false;//Are we hovering over the point text?
private var selectPoint:boolean=false;
var point1LatandLong:TextMesh;
var hoverColor:Color;
var selectedColor:Color;

function OnMouseEnter() {
	hovering=true;
	if(!selectPoint){
		gameObject.GetComponent("TextMesh").color=hoverColor;
		thePointMat.GetComponent.<Renderer>().material.color=hoverColor;
	}
}

function OnMouseExit() {
	hovering=false;
	if(!selectPoint){
		gameObject.GetComponent("TextMesh").color=Color.white;
		thePointMat.GetComponent.<Renderer>().material.color=Color.white;
	}
}

function Update () {
	if(Input.GetMouseButtonDown(0)){//If we click...
		if(hovering){//If we clicked on the point text
			if(!selectPoint){
				gameObject.GetComponent("TextMesh").color=selectedColor;
				thePointMat.GetComponent.<Renderer>().material.color=selectedColor;
			}else{
				gameObject.GetComponent("TextMesh").color=hoverColor;
				thePointMat.GetComponent.<Renderer>().material.color=hoverColor;
			}
			selectPoint=!selectPoint;
		}else if(selectPoint){//If we clicked on the sphere
			if(mouseHover.hoverSphere!=Vector2.zero){
				sphereCoord=mouseHover.hoverSphere;
				pointObject.transform.position=mouseHover.hoverPosition;
				//Displaying this onto the text
				var latString:String;
				if(sphereCoord.x>=0){
					latString=sphereCoord.x.ToString("F2")+" °N";
				}else{
					latString=(sphereCoord.x*-1).ToString("F2")+" °S";;
				}				
				//Longitude text
				var longString:String;
				if(sphereCoord.y>=0){
					longString=sphereCoord.y.ToString("F2")+" °E";
				}else{
					longString=(sphereCoord.y*-1).ToString("F2")+" °W";;
				}
				point1LatandLong.text="("+latString+", "+longString+")";
				
				theCamera.gameObject.SendMessage("Change");
			}
			selectPoint=false;
			gameObject.GetComponent("TextMesh").color=Color.white;
			thePointMat.GetComponent.<Renderer>().material.color=Color.white;
		}
	}
}