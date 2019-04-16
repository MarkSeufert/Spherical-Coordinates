using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//Move elements depending on the screen size

public class ScreenSizeScaler : MonoBehaviour {
	public float direction = 1;
	// Use this for initialization
	void Start () {
		double aspectRatio = (double)Screen.height / (double)Screen.width;
		double moveAmount = aspectRatio - (9.0 / 16.0);
		moveAmount *= direction;
		transform.localPosition = new Vector3 (transform.localPosition.x + (float)moveAmount, transform.localPosition.y, transform.localPosition.z);
	}
}
