// ===============================
// Variables globales
// ===============================

// Video capturado desde la cámara
let video;

// Clasificador de Teachable Machine
let classifier;

// URL del modelo entrenado
let modelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';

// Etiqueta actual
let label = 'esperando...';

// ===============================
// STEP 1: Cargar el modelo
// ===============================
function preload() {
  classifier = ml5.imageClassifier(modelURL);
}

// ===============================
// STEP 2: Configuración inicial
// ===============================
function setup() {
  createCanvas(640, 520);

  // Activar la cámara
  video = createCapture(VIDEO);
  video.hide();

  // Iniciar clasificación
  classifyVideo();
}

// ===============================
// STEP 3: Clasificar el video
// ===============================
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// ===============================
// STEP 4: Dibujar resultados
// ===============================
function draw() {
  // Dibujar el video
  image(video, 0, 0);

  // Mostrar la etiqueta
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Emoji según la etiqueta
  let emoji = "🫷";
  if (label === "nighttime") {
    emoji = "☽";
  } else if (label === "daytime") {
    emoji = "🌞";
  }

  // Dibujar el emoji
  textSize(256);
  text(emoji, width / 2, height / 2);
}

// ===============================
// STEP 5: Recibir resultados
// ===============================
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Actualizar la etiqueta
  label = results[0].label;

  // Volver a clasificar el siguiente frame
  classifyVideo();
}
