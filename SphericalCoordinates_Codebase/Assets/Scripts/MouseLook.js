var lookSpeed:float=10;
var scrollSpeed:float=10;
var parent:Transform;
var minDist:float=10;
var maxDist:float=40;
var distance:float=10;
private var mouseY:float=0;

function Start(){
	distance=Vector3.Distance(transform.position,Vector3.zero);
}
function Update () {
	if(Input.GetMouseButton(1)){//When we are holding the rightclick
		mouseY+=Input.GetAxis("Mouse Y")*Time.deltaTime*lookSpeed*distance;
		mouseY=Mathf.Clamp(mouseY,-80,80);
		parent.localRotation.eulerAngles.x=mouseY;
		parent.rotation.eulerAngles.y+=Input.GetAxis("Mouse X")*Time.deltaTime*lookSpeed*distance;
	}
	
	//Scrollwheel
	distance-=Input.GetAxis("Mouse ScrollWheel")*scrollSpeed*Time.deltaTime;
	distance=Mathf.Clamp(distance,minDist,maxDist);
	transform.localPosition.z=distance;
}