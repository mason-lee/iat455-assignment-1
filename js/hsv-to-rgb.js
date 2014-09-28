function hsv2rgb(colour) {
	var h = (colour[0] / 60) % 6;
	var s = colour[1] / 255;
	var v = colour[2] / 100;
	    
	if (h < 0) { h = h + 6; }

     // The reason why r, g, b = v, is because if h is undefined
     // r, g, b = v is the default fallback. See documentations on
     // HSV to RGB conversion.
     var r = v; var g = v; var b = v;

     var i = Math.floor(h * 6);
     var f = h * 6 - i;
     var p = v * (1 - s);
     var q = v * (1 - f * s);
     var t = v * (1 - (1 - f) * s);

      switch(i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
      }
    	
    	return [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
}