/*
Séléctionner et explorer
 */

// bloc class
class bloc {
  constructor(x, y, w, h, name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;

    this.over = false;
  }

  //Check if mouse is over the bloc
  rollover(px, py) {
    let d = dist(px, py, this.x+(this.w/2), this.y);
    this.over = d < this.w/2;
    // print(this.over)
  }

  // rollover(px, py) {
  //   if (px >= this.x && py <= this.x + w && py >= this.y && py <= this.y + h == true){
  //     this.over = true
  //   }
  //   else {
  //     this.over = false
  //   }
  // }

  // Display the Bubble
  display() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    if (this.over) {
      fill(0);
      textAlign(CENTER);
      text(this.name, this.x, this.y);
    }
  }
}

let table; // Global object to hold results from the loadTable call
let bubbles = []; // Global array to hold all bubble objects

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() {
  table = loadTable("data/bubbles.csv", "header");
}

// Convert saved Bubble data into Bubble Objects
function loadData() {
  const bubbleData = table.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  const length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    // Get position, diameter, name,
    const x = bubbleData[i].getNum("x");
    const y = bubbleData[i].getNum("y");
    const w = bubbleData[i].getNum("w");
    const h = bubbleData[i].getNum("h");
    const name = bubbleData[i].getString("name");

    // Put object in array
    bubbles.push(new bloc(x, y, w, h, name));
  }
}

function setup() {
  createCanvas(640, 360);
  loadData();
}

function draw() {
  background(255);

  // Display all bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  }

  // Label directions at bottom
  textAlign(LEFT);
  fill(0);
  text("Click to add bubbles.", 10, height - 10);
}
