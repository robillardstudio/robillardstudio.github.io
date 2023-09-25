let fichier = ['data/edisem.arcanes.ca-items-full-1.csv']
let table;
let tint =['#3782fa','#27c488','#ffc31f', '#9518d9']

let r_template;
let r_classe;
let title;

let concepts = 0;
let indexvid = 0;
let actants = 0;
let autres = 0;

let r1;
let r2;

function preload() {
  table = loadTable(fichier[0], 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  print(table.getColumn('dcterms:title'));

  //cycle through the table
  // save("img"+(random(1000))+".jpg")

  for (let r = 0; r < table.getRowCount(); r++){
    r_template = table.getString(r, 1)
    r_classe = table.getString(r, 2)
    title = table.getString(r, 5)

    // COUNT
    if (r_template == "Concept et mots-clés" || r_classe == "skos:Concept"){
      concepts++;
    }
    else if(r_template == "Indexation vidéo"){
      indexvid++;
    }
    else if(r_template == "Actant" || r_classe == "jdc:Actant"){
      actants++;
    }
    else{
      autres++;
    }
  }
    
}

function draw(){

  background(255);
  noStroke();
  let posx = 0;
  let posy = 10;
  let cl = 60;

  for (let r = 0; r < table.getRowCount(); r++){
    r_template = table.getString(r, 1)
    r_classe = table.getString(r, 2)
    title = table.getString(r, 5)
    // color pattern
    // check o:resource_template
    if (r_template == "Concept et mots-clés" || r_classe == "skos:Concept"){
      fill(tint[1]);
      r1 = randomGaussian(windowWidth/2-cl,100);
      r2 = randomGaussian(windowHeight/2-cl,100);
    }
    else if(r_template == "Indexation vidéo"){
      fill(tint[2]);
      r1 = randomGaussian(windowWidth/2+cl,100);
      r2 = randomGaussian(windowHeight/2-cl,100);
    }
    else if(r_template == "Actant" || r_classe == "jdc:Actant"){
      fill(tint[3]);
      r1 = randomGaussian(windowWidth/2-cl,100);
      r2 = randomGaussian(windowHeight/2+cl,100);
    }
    else{
      fill(tint[0]);
      r1 = randomGaussian(windowWidth/2+cl,100);
      r2 = randomGaussian(windowHeight/2+cl,100);
    }


    rect(r1,r2,12);

    // // the text
    // let offs = 140;

    // if (title==0){
    //   rect(posx+3, posy-4, 40, 1);
    // }
    // else{
    //   text(title, posx, posy);
    // }

    // posy += 13; // interligne

    // if(posy >= windowHeight){
    //   posx += offs;
    //   posy = 10;
    //   // print('NEXT')
  
    // }
  }
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Check if the key pressed is 'S' (key code 83 for 'S')
  if (key === 'S' || key === 's') {
    // Save the canvas as an image
    saveCanvas('img'+(random(1000)), 'png');
  }
}