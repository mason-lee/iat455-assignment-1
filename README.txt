CONTENTS OF THIS FILE
---------------------
 * Introduction
 * Modules
 * Maintainers

INTRODUCTION
------------
This is the assignment 1 of the class IAT455 in 2014 Fall semester.
All the effects are working fine though the kernel effects(Gaussian blur) seems a bit slow. 

MODULES
--------
main.js: main script that includes the implementation of the 3 effects, 
	1. ScanlineEffect 
	      - Control the colour of the scanline using HSV controls. 
	2. ImageHsvEffect 
	      - Control the colour of the image using HSV controls.
	3. KernelEffect
		- Apply a gaussian blur to an image and allow the user choose between a 	
		5x5, 7x7, or 9x9 kernel sizes using a slider with range 1-3.


hsv-to-rgb.js: includes a function(hsv2rgb) that converts HSV color model to RGB color model.

rgb-to-hsv.js: includes a function(rgb2hsv) that converts RGB color model to HSV color model.


MAINTAINERS
-----------
This assignment is done by Mason Lee(https://github.com/mason--lee) with the help of Salehen Shovon Rahman(https://github.com/shovon) and Matt Lockyer(https://github.com/mattlockyer)

