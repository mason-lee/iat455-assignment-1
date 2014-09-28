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
			if (tempHue > 360) {
				tempHue = 0;
			}  
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
/**
 * Question 3
 */
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
		/**
		 * The kernels are calculated from the tool which can be found at http://www.embege.com/gauss/
		 */
		
		// Sigma value = 1.5 
		"five": [
			0.00792907595681521, 0.021553463089881937, 0.03008028089187349, 0.021553463089881937, 0.00792907595681521, 
			0.021553463089881937, 0.05858838705758786, 0.08176668094332218, 0.05858838705758786, 0.021553463089881937, 
			0.03008028089187349, 0.08176668094332218, 0.11411459588254977, 0.08176668094332218, 0.03008028089187349, 
			0.021553463089881937, 0.05858838705758786, 0.08176668094332218, 0.05858838705758786, 0.021553463089881937, 
			0.00792907595681521, 0.021553463089881937, 0.03008028089187349, 0.021553463089881937, 0.00792907595681521
		],
		// Sigma value = 2.0
		"seven": [
			0.0009047055384620063, 0.003157732604747521, 0.006684919976708802, 0.00858360715861769, 0.006684919976708802, 0.003157732604747521, 0.0009047055384620063, 
			0.003157732604747521, 0.011021569758527914, 0.023332663361901054, 0.02995973279569968, 0.023332663361901054, 0.011021569758527914, 0.003157732604747521, 
			0.006684919976708802, 0.023332663361901054, 0.04939524872476185, 0.06342475482620671, 0.04939524872476185, 0.023332663361901054, 0.006684919976708802, 
			0.00858360715861769, 0.02995973279569968, 0.06342475482620671, 0.08143899724403758, 0.06342475482620671, 0.02995973279569968, 0.00858360715861769, 
			0.006684919976708802, 0.023332663361901054, 0.04939524872476185, 0.06342475482620671, 0.04939524872476185, 0.023332663361901054, 0.006684919976708802, 
			0.003157732604747521, 0.011021569758527914, 0.023332663361901054, 0.02995973279569968, 0.023332663361901054, 0.011021569758527914, 0.003157732604747521, 
			0.0009047055384620063, 0.003157732604747521, 0.006684919976708802, 0.00858360715861769, 0.006684919976708802, 0.003157732604747521, 0.0009047055384620063 
		],
		// Sigma value = 2.5
		"nine": [
			0.00010658789159211511, 0.00043223521445037895, 0.001174937129060544, 0.002140875032138046, 0.002614870669129642, 0.002140875032138046, 0.001174937129060544, 0.00043223521445037895, 0.00010658789159211511, 
			0.00043223521445037895, 0.0017528002273082366, 0.004764605006810784, 0.00868167635934459, 0.01060382345075739, 0.00868167635934459, 0.004764605006810784, 0.0017528002273082366, 0.00043223521445037895, 
			0.001174937129060544, 0.004764605006810784, 0.012951539209798522, 0.023599243088168492, 0.028824180598381217, 0.023599243088168492, 0.012951539209798522, 0.004764605006810784, 0.001174937129060544, 
			0.002140875032138046, 0.00868167635934459, 0.023599243088168492, 0.04300062450593714, 0.05252108137416124, 0.04300062450593714, 0.023599243088168492, 0.00868167635934459, 0.002140875032138046, 
			0.002614870669129642, 0.01060382345075739, 0.028824180598381217, 0.05252108137416124, 0.06414939365195506, 0.05252108137416124, 0.028824180598381217, 0.01060382345075739, 0.002614870669129642, 
			0.002140875032138046, 0.00868167635934459, 0.023599243088168492, 0.04300062450593714, 0.05252108137416124, 0.04300062450593714, 0.023599243088168492, 0.00868167635934459, 0.002140875032138046, 
			0.001174937129060544, 0.004764605006810784, 0.012951539209798522, 0.023599243088168492, 0.028824180598381217, 0.023599243088168492, 0.012951539209798522, 0.004764605006810784, 0.001174937129060544, 
			0.00043223521445037895, 0.0017528002273082366, 0.004764605006810784, 0.00868167635934459, 0.01060382345075739, 0.00868167635934459, 0.004764605006810784, 0.0017528002273082366, 0.00043223521445037895, 
			0.00010658789159211511, 0.00043223521445037895, 0.001174937129060544, 0.002140875032138046, 0.002614870669129642, 0.002140875032138046, 0.001174937129060544, 0.00043223521445037895, 0.00010658789159211511
		]
	};
}
 
KernelEffect.prototype = {
	draw: function () {
		var canvas = this.canvas;
		var width = MEDIA.width;
		var height = MEDIA.height;
		
		var controls = this.controls.Kernel.value;

		var kernel = 1;

		switch(controls) {
			// When the slider value is 1, use kernel size 5x5
			case 1: 
				kernel = this.kernel.five;
				break;
			// When the slider value is 2, use kernel size 7x7
			case 2:
				kernel = this.kernel.seven;
				break;
			// When the slider value is 3, use kernel size 9x9
			case 3:
				kernel = this.kernel.nine;
				break;
			default:
				kernel = this.kernel.five;
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
			// Get column and row of the pixel
			var col = i % width;
			var row = Math.floor(i / width);
 
			var accumR = 0;
			var accumG = 0;
			var accumB = 0;
 			
			for (var j = 0; j < kernelLength; j++) {
				// Column of the kernel
				var x = j % kernelDimension;
				// Row of the kernel
				var y = Math.floor(j / kernelDimension);
 				// Includes the neighbours of our pixel & the pixel itself
				var lookupX = col + x - kernelHalf; if (lookupX < 0) {lookupX = 0;}
				var lookupY = row + y - kernelHalf; if (lookupY < 0) {lookupY = 0;}
 
				var index = lookupX + (lookupY * width);
 
				var pixel = pixels[index];
 
				var r = pixel & 255;
				var g = (pixel >> 8) & 255;
				var b = (pixel >> 16) & 255;
 				// Apply the kernel processing to the RGB channel of the pixel
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