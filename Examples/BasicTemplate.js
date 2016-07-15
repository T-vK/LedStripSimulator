var PIN = 10; //for now the pin has to be 10
var NUM_LEDS = 60;
var BRIGHTNESS = 255;

var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

function setup() {
  strip.setBrightness(BRIGHTNESS);
  strip.begin();
  strip.show();
}

function loop() {
  
}