// Draws a horizontal slider control that goes from 0 to 10.
var hSliderValue:float=0.0;
var theSkin : GUISkin;
var theText:UI.Text;

function OnGUI () {
	GUI.skin = theSkin;//This gives the slider its texture
	hSliderValue = GUI.HorizontalSlider (Rect (Screen.width-190, 20, 150, 30), hSliderValue, 0.0, 24.0);//Create the slider
	transform.rotation.eulerAngles.y=(15*hSliderValue)+180;//The sun's rotation depends on the time of day
}