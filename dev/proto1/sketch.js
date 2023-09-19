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

  for (let r = 0; r < table.getRowCount(); r++){
    r_template = table.getString(r, 1)
    r_classe = table.getString(r, 2)
    title = table.getString(r, 5)
    // color pattern
    // check o:resource_template
    if (r_template == "Concept et mots-clés" || r_classe == "skos:Concept"){
      fill(tint[1]);
    }
    else if(r_template == "Indexation vidéo"){
      fill(tint[2]);
    }
    else if(r_template == "Actant" || r_classe == "jdc:Actant"){
      fill(tint[3]);
    }
    else{
      fill(tint[0]);
    }

    // if (r%30 == 0){
    //   fill (tint[index])
    //   index++;
    //   if (index == tint.length){
    //     index = 0;
    //   }
    // }
    // print(posx)

    let offs = 140;

    // if (mod == 0){
    //   posx += offs;
    // }

    // the text
    if (title==0){
      rect(posx+3, posy-4, 40, 1);
    }
    else{
      text(title, posx, posy);
    }

    posy += 13; // interligne

    if(posy >= windowHeight){
      posx += offs;
      posy = 10;
      // print('NEXT')
  
    }
  }

  // STATS
  fill(255);
  rect(windowWidth,windowHeight,-500,-200);

  fill(0);
  text('STATISTIQUES',windowWidth-480,windowHeight-180+12);
  fill(tint[1]);
  text('concepts '+ concepts,windowWidth-480,windowHeight-180+24);
  fill(tint[2]);
  text('indexvid '+ indexvid,windowWidth-480,windowHeight-180+36);
  fill(tint[3]);
  text('actants '+ actants,windowWidth-480,windowHeight-180+48);
  fill(tint[0]);
  text('autres '+ autres,windowWidth-480,windowHeight-180+60);

  fill(0);
  text('fichier '+fichier,windowWidth-480,windowHeight-180+100);
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