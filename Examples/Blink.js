var PIN = 10; //for now the pin has to be 10
var NUM_LEDS = 60;
var BRIGHTNESS = 255;

var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

function setup() {
  strip.setBrightness(BRIGHTNESS);
  strip.begin();
}

function loop() {
    strip.setPixelColor(0, 0xFF0000);
    strip.show();
    delay(1000);
    strip.setPixelColor(0, 0x00FF00);
    strip.show();
    delay(1000);
}