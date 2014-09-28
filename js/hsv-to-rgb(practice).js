function hsv2rgb(colour) {
	// when Hue is undefined
	var h = 0;
	
	// when Hue is less then 0
	if (colour[0] < 0) { 
		h = ((colour[0] / 60) % 6) + 6; 
	} else {
		// Convert the 360 degrees in a circle to 0 - 6
		h = (colour[0] / 60) % 6;	
	}

	var s = colour[1] / 255;
	var v = colour[2] / 100;

	// The reason why r, g, b = v, is because if h is undefined
    	// r, g, b = v is the default fallback. See documentations on
    	// HSV to RGB conversion.
    	var r = v; var g = v; var b = v;

	// Temporary variable for calculation
	var temp1  = v * (1-s),
		temp2 = v * (1-(h-Math.abs[h])*s),
		temp3 = v * (1-(1-(h-Math.abs[h]))*s);

	if(h===undefined) {
		temp2 = 0;
		temp3 = 0;
	}
	
	if(h===undefined) {
		r=v; g=v; b=v;
	}
	else if(h>=0 && h<1) {
		r=v; g=temp3; b=temp1;
	}
	else if(h>=1 && h<2) {
		r=temp2; g=v; b=temp1;
	}
	else if(h>=2 && h<3) {
		r=temp1; g=v; b=temp3;
	}
	else if(h>=3 && h<4) {
		r=temp1; g=temp2; b=v;
	}
	else if(h>=4 && h<5) {
		r=temp3; g=temp1; b=v;
	}
	else if(h>=5 && h<6) {
		r=v; g=temp1; b=temp2;
	}

	// Convert r, g, b to 8-bit by multiplying them with 255
	return [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
}


























