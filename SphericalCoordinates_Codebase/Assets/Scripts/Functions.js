// Draws a line from "startVertex" var to the curent mouse position.
var mat : Material;
var theCam:Camera;
var planetRadius:float=10;

function Start(){
	theCam = GetComponent.<Camera>();
}

function toScreenPos(pos:Vector3){
	var screenPos:Vector3=theCam.WorldToScreenPoint(pos);
	screenPos.x/=Screen.width;
	screenPos.y/=Screen.height;
	screenPos.z=0;
	return screenPos;
}
function drawLine(pos1:Vector3,pos2:Vector3){
		GL.PushMatrix();
		mat.SetPass(0);
		GL.LoadOrtho();
		GL.Begin(GL.LINES);
		GL.Vertex(toScreenPos(pos1));
		GL.Vertex(toScreenPos(pos2));
		GL.End();
		GL.PopMatrix();
}
function sphereToCart(sphere:Vector2){
	var answer:Vector3;
	answer.y=planetRadius*Mathf.Sin(sphere.x*Mathf.Deg2Rad);
	answer.x=planetRadius*Mathf.Cos(sphere.x*Mathf.Deg2Rad)*Mathf.Cos(sphere.y*Mathf.Deg2Rad);
	answer.z=planetRadius*Mathf.Cos(sphere.x*Mathf.Deg2Rad)*Mathf.Sin(sphere.y*Mathf.Deg2Rad);
	return answer;
}
function cartToSphere(pos:Vector3){
	var answer:Vector2;
	answer.x=Mathf.Asin(pos.y/planetRadius)*Mathf.Rad2Deg;
	answer.y=Mathf.Atan2(pos.z,pos.x)*Mathf.Rad2Deg;
	return answer;
}