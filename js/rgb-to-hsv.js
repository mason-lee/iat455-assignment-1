function rgb2hsv(colour) {
	var r = colour[0] / 255;
	var g = colour[1] / 255;
	var b = colour[2] / 255;

	var h = 0; var s = 0; var v = 0;

	// TODO: do something to the h, s, and v values.
	var maxRGB = Math.max(r,g,b);
	var minRGB = Math.min(r,g,b);

	// Calculate Value
	v = maxRGB;
	diff = v - minRGB;
		
	// When r=g=b, or diff = 0
	// it's a shade of gray (black~white). 
	// There is no saturation and hue
	if (r==g && g==b &&  b==r || diff == 0) {
		h = s = 0;
	}
	
	else {
		//Calculate Saturation
		s = diff / v;

		// If red is max
		if(v === r) {
			h = (g - b)/(diff);
		}
		// If green is max
		else if(v === g){
			h = 2.0 + (b - r)/(diff);
		}
		// If blue is max
		else if(v === b) {
			h = 4.0 + (r - g)/(diff);
		}
		
		// Hue value sanitization. 
		// Prevent h becomes negative value
		h = h % 6;

		// convert it to degrees.
		if (h < 0) { 
			h = h + 6; 
		}                
	}  
	return [Math.floor(h * 60), s * 100, v * 100];
}

