let photoUpload = document.querySelector("#photo-upload");
let photoIcon = document.querySelector("#photo");
let download = document.querySelector("#download");

photoIcon.addEventListener("click", function(){
    photoUpload.click();
})

photoUpload.addEventListener("change",function(e){
    let fileObject = e.target.files[0];
    let url = URL.createObjectURL(fileObject);
    let img = document.createElement("img");
    img.src = url;


    img.classList.add("style-image");
    createSticky(img);
    //document.body.append(img); 
})

download.addEventListener("click" , function(){
    let aTag = document.createElement("a");
    aTag.download = 'canvas.png';
    aTag.href = document.getElementById('canvas').toDataURL("image/png");
    //aTag.href = canvas.toDataURL("image/png");
    aTag.click();
})