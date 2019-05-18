int timePassed;
int result = 0;

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 32 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
#define OLED_RESET     -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
#define NUMFLAKES     10 // Number of snowflakes in the animation example

void setup() {
  Serial.begin(9600);

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C for 128x32
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  // Clear the buffer
  display.clearDisplay();
  display.drawPixel(10, 10, WHITE);
  display.display();
  delay(2000);
  display.invertDisplay(true);
  delay(1000);
  display.invertDisplay(false);
  delay(1000);

//  testanimate(logo_bmp, LOGO_WIDTH, LOGO_HEIGHT); // Animate bitmaps
}

void loop() {
  timePassed = millis();
  if (timePassed < 15000){
    loading();
  } else{
    showResult();
  }  
}
void loading(void) {
  disappear();
  display.setTextSize(2); // Draw 2X-scale text
  display.setTextColor(WHITE);
  display.setCursor(25, 0);
  display.println("Loading");
  display.setCursor(25, 17);
  display.println("DNA.");
  display.display(); 
  delay(1000);

  disappear();
  display.setTextSize(2); // Draw 2X-scale text
  display.setTextColor(WHITE);
  display.setCursor(25, 0);
  display.println("Loading");
  display.setCursor(25, 17);
  display.println("DNA..");
  display.display(); 
  delay(1000);

  disappear();
  display.setTextSize(2); // Draw 2X-scale text
  display.setTextColor(WHITE);
  display.setCursor(25, 0);
  display.println("Loading");
  display.setCursor(25, 17);
  display.println("DNA...");
  display.display(); 
  delay(1000);

}

void disappear(void){
  display.clearDisplay();
  display.setTextSize(1); // Draw 2X-scale text
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println(".");
  display.display(); 
  delay(800);
  }

  void showResult(void) {
    if (result == 1){
      pregnant();
    } else {
      notPregnant();
    }
    
}

void pregnant(void) {
  display.clearDisplay();
  for(int16_t i=0; i<display.height(); i+=1) {
    // The INVERSE color is used so rectangles alternate white/black
    display.drawLine(73, 0, 73, i, INVERSE);
    display.drawLine(74, 0, 74, i, INVERSE);
    display.drawLine(75, 0, 75, i, INVERSE);
    
    display.drawLine(99, 0, 99, i, INVERSE);
    display.drawLine(100, 0, 100, i, INVERSE);
    display.drawLine(101, 0, 101, i, INVERSE);

  }
  display.display();
  delay(2000);
}

void notPregnant(void) {
  display.clearDisplay();
  for(int16_t i=0; i<display.height(); i+=1) {
    // The INVERSE color is used so rectangles alternate white/black
    display.drawLine(73, 0, 73, i, INVERSE);
    display.drawLine(74, 0, 74, i, INVERSE);
    display.drawLine(75, 0, 75, i, INVERSE);
    
    display.drawLine(99, 0, 99, i, INVERSE);
    display.drawLine(100, 0, 100, i, INVERSE);
    display.drawLine(101, 0, 101, i, INVERSE);
  }

   for(int16_t i=0; i<128; i+=1) {
    // The INVERSE color is used so rectangles alternate white/black
    display.drawLine(0, 30, i, 30, INVERSE);
    display.drawLine(0, 31, i, 31, INVERSE);
    display.drawLine(0, 32, i, 32, INVERSE);
  }
  display.display();
  delay(2000);
}
