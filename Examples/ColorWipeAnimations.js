var PIN = 10; //for now the pin has to be 10
var NUM_LEDS = 60;
var BRIGHTNESS = 255;

var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

function setup() {
  strip.setBrightness(BRIGHTNESS);
  strip.begin();
  strip.show();
}

var red = strip.Color(255, 0, 0);
var yellow = strip.Color(255, 255, 0);
var blue = strip.Color(0, 0, 255);
var colors = [red,yellow,blue];
var currentColorIndex = 0;

function loop() {
  var animationDone = colorWipe(colors[currentColorIndex]);
  if (animationDone)
      currentColorIndex = (currentColorIndex>=colors.length-1 ? 0 : currentColorIndex+1);
}


function colorWipe(color) { 
  var now = millis();
  if (now > colorWipe.lastUpdate+colorWipe.delay) {
    strip.setPixelColor(colorWipe.currentLed, color);
    strip.show();
    colorWipe.currentLed = colorWipe.currentLed>=strip.numPixels()-1 ? 0 : colorWipe.currentLed+1;
    colorWipe.lastUpdate = now;

    if (colorWipe.currentLed === 0)
        return true;
  }
  return false;
} //c++-like static variables for this fucntion:
colorWipe.delay = 10;
colorWipe.lastUpdate = 0;
colorWipe.currentLed = 0;