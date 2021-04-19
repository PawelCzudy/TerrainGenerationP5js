
let cols, rows; // colums & rows of the grid
let scl = 20; // scale /- size of the grid
let w = 1200; // grids width
let h = 1900; // grids height
let terrain = []; // 2d Array to store the 'z' values of the Vertices
let xArr = 0; // variable used to initialize a 2d array
let flying = 0; // variable to increase the y-offset to simutalte the 'flying' effect


function setup() {
  createCanvas(600, 600, WEBGL);

  cols = w/scl;
  rows = h/scl;
  
}

function draw() {

  // pink ambient lighting for the mood ( ͡° ͜ʖ ͡°)

  pointLight(255, 255, 255, 0, 0,1000);
  ambientLight(244,122,158 );

  // increasing the y-offset for every draw()
  flying -= 0.2;

  // generating the z-coordinate with perlin-noise
  // saving the z-coordinate in a 2d array (terrain)
  let yoff  = flying;
  for(let y=0; y<cols; y++){
    let xoff  = 0.0; 
    for(let x=0; x<rows; x++){
      terrain[xArr]=[];
      terrain[x][y] = map(noise(xoff,yoff), 0, 1, -100, 100);
      xoff += 0.2;
      xArr++;
    }
    yoff += 0.2;
  }

  // translating to (-w/2,-h/2) and rotating on the x-axis to create a '3D-view'
  rotateX(PI/3);
  translate(-w/2,-h/2);

  background(0);
  stroke(255);
  fill(0);

  // drawing the grid with TRIANGLE_STRIP
  for(let y=0; y<cols; y++){
    beginShape(TRIANGLE_STRIP);
    for(let x=0; x<rows; x++){
      //rect(x*scl, y*scl, scl, scl)
      vertex(x*scl,y*scl, terrain[x][y]);
      vertex(x*scl,(y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}
