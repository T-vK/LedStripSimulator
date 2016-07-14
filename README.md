# LedStripSimulator
Simulates an LED strip and allows very NeoPixel-like access

## Ready to use online simulator
[Click here for a ready-to-use online simulator](http://htmlpreview.github.io/?https://github.com/T-vK/LedStripSimulator/blob/master/index.html)

## Usage
You'll wirte your code in JavaScript. But the syntax of original Adafruit_NeoPixel c++ class is simlulated as good as possible.  
Your original C++ code could for example translate like this:  
*C++*
``` c++
#define PIN 10
#define NUM_LEDS = 60
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin()
  strip.show()
  
  strip.setPixelColor(0, Color(255,0,0))
  strip.show()
}
```
*JavaScript*
``` javascript
const PIN = 10
const NUM_LEDS = 60
var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800)

function setup() {
  strip.begin()
  strip.show()
  
  strip.setPixelColor(0, Color(255,0,0))
  strip.show()
}
```

### Ported Arduino functions/callbacks
I implemented the functions `millis()`, `micros()` as well as the callback fucntions `setup()` and `loop()`.  
I might also add `delay()`, but a synchronous `delay()` always freezes the whole thread.  
And while you might not care about your Arduino being frozen, freezing your browser is a whole other story.

## Basic setup without the editor and jquery/bootstrap dependency
- Create a new folder
- copy Adafruit_NeoPixel.js into the folder
- copy Adafruit_NeoPixel.css into the folder
- create a new .html file with the following contents:
``` html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="Adafruit_NeoPixel.css">
  <script src="Adafruit_NeoPixel.js"></script>
  <script>
    //Your code goes here
    //For example:
    //function setup() {
    //  
    //}
    //function loop() {
    //  
    //}
  </script>
</head>
<body>
  <!-- In this section you can create new led strips. Remember to define a different "data-pin" for every led strip and use the pin numbers in your code. -->
  <div class="ledStrip" data-pin="10"></div>
</body>
</html>
```

#### Full example
The BasicExample.html file contains an example.  
``` html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="Adafruit_NeoPixel.css">
  <script src="Adafruit_NeoPixel.js"></script>
  <script>
    //USER
    const PIN = 10
    const NUM_LEDS = 60
    const BRIGHTNESS = 255

    //ws2812b, arduino pro mini
    var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800)

    function setup() {
      strip.setBrightness(BRIGHTNESS)
      strip.begin()
      strip.show()
    }

    var red = strip.Color(255, 0, 0)
    var yellow = strip.Color(255, 255, 0)
    var blue = strip.Color(0, 0, 255)
    var colors = [red,yellow,blue]
    var currentColorIndex = 0
    
    function loop() {
      var animationDone = colorWipe(colors[currentColorIndex])
      if (animationDone)
          currentColorIndex = (currentColorIndex>=colors.length-1 ? 0 : currentColorIndex+1)
    }

    
    function colorWipe(color) { 
      var now = millis()
      if (now > colorWipe.lastUpdate+colorWipe.delay) {
        strip.setPixelColor(colorWipe.currentLed, color)
        strip.show()
        colorWipe.currentLed = colorWipe.currentLed>=strip.numPixels()-1 ? 0 : colorWipe.currentLed+1
        colorWipe.lastUpdate = now
        
        if (colorWipe.currentLed === 0)
            return true;
      }
      return false
    } //c++-like static variables for this fucntion:
    colorWipe.delay = 10
    colorWipe.lastUpdate = 0
    colorWipe.currentLed = 0
    </script>

</head>
<body>
  <div class="ledStrip" data-pin="10"></div>
</body>
</html>
```

