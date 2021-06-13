let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions= document.querySelector("#eraser-options");

let pencilSizeInput = document.querySelector("#pencil-size");
let pencilColors = document.querySelectorAll(".pencil-colors div");
let eraserSizeInput = document.querySelector("#eraser-size");


let pencilSize = "1";
let eraserSize="1";

console.log(pencilColors);
for(let i = 0; i < pencilColors.length; i++) 
{
    pencilColors[i].addEventListener("click",function(e){
        //console.log(e);
        let color = e.target.classList.value;
        ctx.strokeStyle = color;
    })
}

pencilSizeInput.addEventListener("change",function(e){
    //console.log(pencilSizeInput.value);
    //ctx.lineWidth = e.
    //console.log(e.target.value);
    ctx.lineWidth = e.target.value;
    pencilSize = e.target.value;
})

eraserSizeInput.addEventListener("change",function(e){
    //console.log(pencilSizeInput.value);
    //ctx.lineWidth = e.
    //console.log(e.target.value);
    ctx.lineWidth = e.target.value;
    eraserSize = e.target.value;
})

pencil.addEventListener("click" ,function(){
    console.log("pencil clicked");
    if(pencil.classList.contains("active-tool"))
    {
        //pencil active hai
        // we will now display the options of the pencil or hide them depending on the number of clicks
        //toggle pencil options

        if(pencilOptions.classList.contains("hide"))
        {
            //hide options
            pencilOptions.classList.remove("hide");
        }
        else
        {
            //show options
            pencilOptions.classList.add("hide");
        }
    }
    else
    {
        ctx.strokeStyle ='black';
        ctx.lineWidth = pencilSize;
        //pencil isn't active
        //we need to make pencil active
        //we need to remove active class from eraser 
        //need to make pencil active
        eraser.classList.remove("active-tool");
        eraserOptions.classList.add("hide");
        pencil.classList.add("active-tool"); 
    }
})


eraser.addEventListener("click",function()
{
    console.log("eraser clicked");
    if(eraser.classList.contains("active-tool"))
    {
       
        //toggle options
        if(eraserOptions.classList.contains("hide"))
        {
            //hide options
            eraserOptions.classList.remove("hide");
        }
        else
        {
            //show options
            eraserOptions.classList.add("hide");
        }
    }
    else
    {
        //eraser not active
        //activate eraser
        //deactivate pencil
        ctx.strokeStyle ='white';
        ctx.lineWidth = eraserSize;
        pencil.classList.remove("active-tool");
        pencilOptions.classList.add("hide");
        eraser.classList.add("active-tool");
        
    }
})


redo.addEventListener("click",function()
{
    redoLines();
})

undo.addEventListener("click",function()
{
    undoLine();
})

function redoLines()
{
    if(redoDb.length)
    {
        let line = redoDb.pop();
        for(i = 0; i < line.length; i++ )
        {
            let pointObject = line[i];
            
            if(pointObject.id == "md")
            {
                ctx.strokeStyle = pointObject.strokeStyle;
                ctx.lineWidth = pointObject.lineWidth;
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else
            {
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }
        }
        db.push(line);
    }
}
function undoLine()
{
    if(db.length)
    {
    let latestLine = db.pop();
    redoDb.push(latestLine);
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    redrawLines();  
    console.log(db);
    }
}
function redrawLines()
{
    for(i = 0 ;i < db.length; i++)
    {
        let line = db[i];
        for(j = 0 ; j < line.length; j++)
        {
            let pointObject = line[j];
            
            if(pointObject.id == "md")
            {
                ctx.beginPath();
                ctx.strokeStyle = pointObject.strokeStyle;
                ctx.lineWidth = pointObject.lineWidth;
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else
            {
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }
        }
    }
}
