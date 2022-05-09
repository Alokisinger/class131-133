function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}
img = "";
status = "";
objects = [];
function preload() {
    img = loadImage('fruit.jpg');
}
function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : Object Detected  "+ objects.length;
            fill("#FF000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            strokeWeight(3.5)
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
}
function modelLoaded() {
    console.log("Model loaded!")
    status = true;
    objectDetector.detect(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

