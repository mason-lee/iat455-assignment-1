function hsv2rgb(colour) {
	var h = (colour[0] / 60) % 6;
	var s = colour[1] / 255;
	var v = colour[2] / 100;
		
	if (h < 0) { h = h + 6; }

	// The reason why r, g, b = v, is because if h is undefined
	// r, g, b = v is the default fallback. See documentations on
	// HSV to RGB conversion.
	var r = v,
		g = v,
		b = v;

	// Temporary variable for calculation
	var temp1  = v * (1-s),
		temp2 = v * (1-(h-Math.abs(h))*s),
		temp3 = v * (1-(1-(h-Math.abs(h)))*s);
    
	if(h>=0 && h<1) {
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


























