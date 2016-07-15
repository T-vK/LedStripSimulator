//Here is an example
var PIN = 10; //for now the pin has to be 10
var NUM_LEDS = 60;

//ws2812b with Arduino Uno
var strip = new Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

var patternInterval = 20; // time between steps in the pattern
var lastUpdate = 0; // for millis() when last update occoured
var intervals = [ 20, 20, 50, 100 ]; // speed for each pattern
var modeDuration = 5000; // duration of each mode

function setup() {
  strip.begin(); // This initializes the NeoPixel library.
  wipe(); // wipes the LED buffers
}

function loop() {
  var now = millis();
  if(now > loop.lastModeChange+modeDuration) {
    loop.pattern++ ; // change pattern number
    if(loop.pattern > 3) loop.pattern = 0; // wrap round if too big
    patternInterval = intervals[loop.pattern]; // set speed for this pattern
    wipe(); // clear out the buffer
    loop.lastModeChange = now;
  }

  if(millis() - lastUpdate > patternInterval) updatePattern(loop.pattern);
}
loop.lastModeChange = 0; //c++-like static variable for the loop function 
loop.pattern = 0; //c++-like static variable for the loop function 

function updatePattern(pat){ // call the pattern currently being created
  switch(pat) {
    case 0:
        rainbow();
        break;
    case 1:
        rainbowCycle();
        break;
    case 2:
        theaterChaseRainbow();
        break;
    case 3:
         colorWipe(strip.Color(255, 0, 0)); // red
         break;     
  } 
}

function rainbow() { // modified from Adafruit example to make it a state machine
  for(var i=0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, Wheel((i+rainbow.j) & 255));
  }
  strip.show();
  rainbow.j++;
  if(rainbow.j >= 256) rainbow.j=0;
  lastUpdate = millis(); // time for next change to the display
}
rainbow.j = 0;

function rainbowCycle() { // modified from Adafruit example to make it a state machine
  for(var i=0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + rainbowCycle.j) & 255));
  }
  strip.show();
  rainbowCycle.j++;
  if(rainbowCycle.j >= 256*5) rainbowCycle.j=0;
  lastUpdate = millis(); // time for next change to the display
}
rainbowCycle.j = 0;

function theaterChaseRainbow() { // modified from Adafruit example to make it a state machine
  if (theaterChaseRainbow.on) {
    for (var i=0; i < strip.numPixels(); i=i+3) {
      strip.setPixelColor(i+theaterChaseRainbow.q, Wheel( (i+theaterChaseRainbow.j) % 255));    //turn every third pixel on
    }
  } else {
    for (var i=0; i < strip.numPixels(); i=i+3) {
      strip.setPixelColor(i+theaterChaseRainbow.q, 0);        //turn every third pixel off
    }
   }
  theaterChaseRainbow.on = !theaterChaseRainbow.on; // toggel pixelse on or off for next time
   strip.show(); // display
   theaterChaseRainbow.q++; // update the theaterChaseRainbow.q variable
   if(theaterChaseRainbow.q >=3 ){ // if it overflows reset it and update the theaterChaseRainbow.J variable
     theaterChaseRainbow.q=0;
     theaterChaseRainbow.j++;
     if(theaterChaseRainbow.j >= 256) theaterChaseRainbow.j = 0;
   }
  lastUpdate = millis(); // time for next change to the display   
}
theaterChaseRainbow.j = 0;
theaterChaseRainbow.q = 0;
theaterChaseRainbow.on = true;

function colorWipe(c) { // modified from Adafruit example to make it a state machine
  strip.setPixelColor(colorWipe.i, c);
  strip.show();
  colorWipe.i++;
  if(colorWipe.i >= strip.numPixels()){
    colorWipe.i = 0;
    wipe(); // blank out strip
  }
  lastUpdate = millis(); // time for next change to the display
}
colorWipe.i = 0;

function wipe() { // clear all LEDs
  for (var i=0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(0,0,0));
  }
}

function Wheel(WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}