// =====================================
// Variables globales
// =====================================

// Clasificador preentrenado
let classifier;

// Imagen a clasificar
let img;

// Etiqueta resultante
let label = "clasificando...";

// =====================================
// preload()
// Cargar imagen y modelo
// =====================================
function preload() {
  // Cargar imagen local
  img = loadImage("image.jpg");

  // Cargar clasificador preentrenado
  classifier = ml5.imageClassifier("MobileNet");
}

// =====================================
// setup()
// =====================================
function setup() {
  createCanvas(640, 480);

  // Ejecutar la clasificación una sola vez
  classifier.classify(img, gotResult);
}

// =====================================
// draw()
// =====================================
function draw() {
  // Mostrar la imagen
  image(img, 0, 0, width, height);

  // Mostrar la etiqueta
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 30);
}

// =====================================
// gotResult()
// Recibir resultado del modelo
// =====================================
function gotResult(error, results) {
  if (error) {
    console.error(error);
    label = "error al clasificar";
    return;
  }

  // Guardar la etiqueta con mayor probabilidad
  label = results[0].label;
}
