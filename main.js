Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    
    });
}
console.log('ml5 version: ', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R4O46yydE/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    gesture=results[0].label;
    toSpeak="";
    if(gesture=="peace") {
        toSpeak="The hand gesture is peace";
        document.getElementById("update_gesture").innerHTML="&#9996;";
    }
    else if(gesture=="thumbs up") {
        toSpeak="The hand gesture is a thumbs up";
        document.getElementById("update_gesture").innerHTML="&#9757;";
    }
    else if(gesture=="hi") {
        toSpeak="The hand gesture is hello";
        document.getElementById("update_gesture").innerHTML="&#128077;";
    }
    speak();
}
}

