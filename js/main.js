/**
 * Question 1
 */
function ScanlineEffect() {
	this.canvas = new MEDIA.Canvas();
	this.name = 'Scanline HSV';
	this.controls = {
			Hue: {
				value: 80,
				min: 0,
				max: 360,
				step: 1
			},
			Saturation: {
				value: 100,
				min: 0,
				max: 255,
				step: 1
			},
			Value: {
				value: 23,
				min: 0,
				max: 100,
				step: 1
			}
		};
}

ScanlineEffect.prototype = {
	draw: function () {
		var canvas = this.canvas,		
			width = MEDIA.width,
			height = MEDIA.height,
			lineWidth = width*4, 
			thickness = 4;

		APP.drawImage(canvas); 
		// The getImageData() method returns an ImageData object that 
		// copies the pixel data for the specified rectangle on a canvas.
		var img = canvas.getImageData();
		// The color & alpha information is held in an array, 
		// and is stored in the data property of the ImageData object.
		var data = img.data;
		// use 16-bit unsigned integer (Typed array)
		var pixels = new Uint32Array(img.buffer);
		
		// Assign Hue, Saturation and Value values from sliders to variables
		var h = this.controls.Hue.value;
		var s = this.controls.Saturation.value;
		var v = this.controls.Value.value;

		// Convert hsv value to rgb
		var rgb = hsv2rgb([h,s,v]);
		// Get red, green and blue values from the array rgb
		var red = rgb[0];
		var green = rgb[1];
		var blue = rgb[2];

		for (var i = lineWidth; i < data.length; 	i += lineWidth * 2 * thickness) {
			for (var j = 0; j < lineWidth * thickness; j += 4) {
				// Assign rgb channels of the pixel to the the values from "rgb" array
				data[i + j] = red;
				data[i + j + 1] = green;
				data[i + j + 2] = blue;
			}
		}
		canvas.putImageData(img);
	}
};

/**
 * Question 2
 */
function ImageHsvEffect() {
	this.canvas = new MEDIA.Canvas();
	this.name = 'HSV Image Control';
	this.controls = {
			Hue: {
				value: 80,
				min: 0,
				max: 360,
				step: 1
			},
			Saturation: {
				value: 100,
				min: 0,
				max: 255,
				step: 1
			},
			Value: {
				value: 23,
				min: 0,
				max: 100,
				step: 1
			}
		};
	}

ImageHsvEffect.prototype = {
	draw: function () {
		var canvas = this.canvas;
		APP.drawImage(canvas);

		var img = canvas.getImageData();
	
		// use 32-bit unsigned integer (Typed array)
		var pixels = new Uint32Array(img.data.buffer);

		// Get the hsv values from the slider
		var hue = this.controls.Hue.value;
		var saturation = this.controls.Saturation.value;
		var value = this.controls.Value.value;

		for (var i = 0; i < pixels.length; i++) {
			var pixel = pixels[i];
			// Get rgba value of the pixel
			var red   = pixel & 255;
			var green = (pixel >> 8) & 255;
			var blue  = (pixel >> 16) & 255;
			var alpha = (pixel >> 24) & 255;
			
			// Convert rgb value of the pixel to
			// Hue, Saturation and Value
			var hsv = rgb2hsv([red, green, blue]);
			
			var tempHue = Math.floor(hsv[0]);
			var tempSaturation = Math.floor(hsv[1]);
			var tempValue = Math.floor(hsv[2]);

			// Change the Hue, Saturation and Value of the 
			// pixel with the values from the sliders
			tempHue = tempHue + hue;
			tempSaturation = tempSaturation * (saturation / 255);
			tempValue = tempValue * (value / 100);

			var rgb = hsv2rgb([tempHue, tempSaturation, tempValue]);
			
			red = rgb[0];
			green = rgb[1];
			blue = rgb[2];

			pixel =
				(red & 255) |
				((green & 255) << 8) |
				((blue  & 255) << 16) |
				((alpha & 255 ) << 24);

			pixels[i] = pixel;
		}
		canvas.putImageData(img);
	}
};

function KernelEffect() {
	this.canvas = new MEDIA.Canvas();
	this.name = 'Kernel';
	this.controls = {
		Kernel: {
			value: 1,
			min: 1,
			max: 3,
			step: 1
		}
	};
	// Kernel sizes
	this.kernel = 
	{
		"five": [
			0.00296901674395065, 0.013306209891014005, 0.02193823127971504, 0.013306209891014005, 0.00296901674395065, 
			0.013306209891014005, 0.05963429543618023, 0.09832033134884507, 0.05963429543618023, 0.013306209891014005, 
			0.02193823127971504, 0.09832033134884507, 0.16210282163712417, 0.09832033134884507, 0.02193823127971504, 
			0.013306209891014005, 0.05963429543618023, 0.09832033134884507, 0.05963429543618023, 0.013306209891014005, 
			0.00296901674395065, 0.013306209891014005, 0.02193823127971504, 0.013306209891014005, 0.00296901674395065
		],
		
		"seven": [
			0.00001965191612403453, 0.00023940934949729186, 0.0010729582649787318, 0.0017690091140439247, 0.0010729582649787318, 0.00023940934949729186, 0.00001965191612403453, 
			0.00023940934949729186, 0.002916602954386583, 0.013071307583189733, 0.021550942848268615, 0.013071307583189733, 0.002916602954386583, 0.00023940934949729186, 
			0.0010729582649787318, 0.013071307583189733, 0.058581536330607024, 0.09658462501856331, 0.058581536330607024, 0.013071307583189733, 0.0010729582649787318, 
			0.0017690091140439247, 0.021550942848268615, 0.09658462501856331, 0.1592411256906998, 0.09658462501856331, 0.021550942848268615, 0.0017690091140439247, 
			0.0010729582649787318, 0.013071307583189733, 0.058581536330607024, 0.09658462501856331, 0.058581536330607024, 0.013071307583189733, 0.0010729582649787318, 
			0.00023940934949729186, 0.002916602954386583, 0.013071307583189733, 0.021550942848268615, 0.013071307583189733, 0.002916602954386583, 0.00023940934949729186, 
			0.00001965191612403453, 0.00023940934949729186, 0.0010729582649787318, 0.0017690091140439247, 0.0010729582649787318, 0.00023940934949729186, 0.00001965191612403453
		],

		"nine": [
			Math.pow(1.79106360847764,-8), Math.pow(5.931188088149993, -7), 0.000007225666306368065, 0.000032383189711158964, 0.000053390853689904875, 0.000032383189711158964, 0.000007225666306368065, Math.pow(5.931188088149993, -7), Math.pow(1.79106360847764, -8), 
			Math.pow(5.931188088149993, -7), 0.00001964139741910877, 0.0002392812054380594, 0.0010723839631490409, 0.0017680622504015115, 0.0010723839631490409, 0.0002392812054380594, 0.00001964139741910877, Math.pow(5.931188088149993, -7), 
			0.000007225666306368065, 0.0002392812054380594, 0.0029150418401588836, 0.013064311154617904, 0.021539407687663305, 0.013064311154617904, 0.0029150418401588836, 0.0002392812054380594, 0.000007225666306368065, 
			0.000032383189711158964, 0.0010723839631490409, 0.013064311154617904, 0.058550180513145256, 0.0965329280153539, 0.058550180513145256, 0.013064311154617904, 0.0010723839631490409, 0.000032383189711158964, 
			0.000053390853689904875, 0.0017680622504015115, 0.021539407687663305, 0.0965329280153539, 0.15915589174187697, 0.0965329280153539, 0.021539407687663305, 0.0017680622504015115, 0.000053390853689904875, 
			0.000032383189711158964, 0.0010723839631490409, 0.013064311154617904, 0.058550180513145256, 0.0965329280153539, 0.058550180513145256, 0.013064311154617904, 0.0010723839631490409, 0.000032383189711158964, 
			0.000007225666306368065, 0.0002392812054380594, 0.0029150418401588836, 0.013064311154617904, 0.021539407687663305, 0.013064311154617904, 0.0029150418401588836, 0.0002392812054380594, 0.000007225666306368065, 
			Math.pow(5.931188088149993, -7), 0.00001964139741910877, 0.0002392812054380594, 0.0010723839631490409, 0.0017680622504015115, 0.0010723839631490409, 0.0002392812054380594, 0.00001964139741910877, Math.pow(5.931188088149993, -7), 
			Math.pow(1.79106360847764, -8), Math.pow(5.931188088149993, -7), 0.000007225666306368065, 0.000032383189711158964, 0.000053390853689904875, 0.000032383189711158964, 0.000007225666306368065, Math.pow(5.931188088149993, -7), Math.pow(1.79106360847764, -8)
		]
	};
}
 
KernelEffect.prototype = {
	draw: function () {
		var canvas = this.canvas;
		var width = MEDIA.width;
		var height = MEDIA.height;
		
		var controls = this.controls.Kernel.value;

		var kernel = 0;

		switch(controls) {
			case 1: 
				kernel = this.kernel.five;
				// console.log("5 " + kernel); 
				break;
			case 2:
				kernel = this.kernel.seven;
				// console.log("7 " + kernel);
				break;
			case 3:
				kernel = this.kernel.nine;
				// console.log("9 " + kernel);
				break;
			default:
				alert("Please select 1, 2 or 3.");
		}

		var kernelLength = kernel.length;
		var kernelDimension = Math.sqrt(kernelLength);
		var kernelHalf = Math.floor(kernelDimension / 2);
 
		APP.drawImage(canvas);
 
		var img = canvas.getImageData();
		var pixels = new Uint32Array(img.data.buffer);
 
		// Just an array. Don't get scared away by the word buffer.
		var buffer = [];
 
		for (var i = 0; i < pixels.length; i++) {
			var col = i % width;
			var row = Math.floor(i / width);
 
			var accumR = 0;
			var accumG = 0;
			var accumB = 0;
 			
			for (var j = 0; j < kernelLength; j++) {
				var x = j % kernelDimension;
				var y = Math.floor(j / kernelDimension);
 				
				var lookupX = col + x - kernelHalf; if (lookupX < 0) {lookupX = 0;}
				var lookupY = row + y - kernelHalf; if (lookupY < 0) {lookupY = 0;}
 
				var index = lookupX + (lookupY * width);
 
				var pixel = pixels[index];
 
				var r = pixel & 255;
				var g = (pixel >> 8) & 255;
				var b = (pixel >> 16) & 255;
 
				accumR += r * kernel[j];
				accumG += g * kernel[j];
				accumB += b * kernel[j];
			}
 
			// Ideally, perform a set of if-statements on the accumulators. Check to
			// see if they are less than 0, or greater than 255. If they are, well,
			// perform the necessary.
 
			if (accumR < 0) { accumR = 0; }
			if (accumR > 255) { accumR = 255; }
 
			if (accumG < 0) { accumG = 0; }
			if (accumG > 255) { accumG = 255; }
 
			if (accumB < 0) { accumB = 0; }
			if (accumB > 255) { accumB = 255; }
 
			buffer.push(
				(accumR & 255) |
				((accumG & 255) << 8) |
				((accumB & 255) << 16) |
				(255 << 24)
			);
		}
 
		for (var i = 0; i < pixels.length; i++) {
			pixels[i] = buffer[i];
		}
 
		canvas.putImageData(img);
	}
}


// Tell our library on how to set up the canvases
APP.setup({ w:640, h:480 });

// Our library is going to read all of the effects from this array.
APP.effects = [];
APP.effects.push(new ScanlineEffect());
APP.effects.push(new ImageHsvEffect());
APP.effects.push(new KernelEffect());

// Set up dat.gui controls
APP.setupControls();