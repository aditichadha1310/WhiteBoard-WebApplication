let myPenSize;
let myPenColor;
socket.on("mousedown" , function(pointObject)
{
    myPenSize = ctx.lineWidth;
    myPenColor = ctx.strokeStyle;
    ctx.lineWidth = pointObject.lineWidth;
    ctx.strokeStyle = pointObject.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(pointObject.x , pointObject.y);
    //console.log(pointObject);
    // ctx.lineWidth = myPenSize;
    // ctx.strokeStyle = myPenColor;

})
socket.on("mousmove",function(pointObject)
{
    // let myPenSize = ctx.lineWidth;
    // let myPenColor = ctx.strokeStyle;
    // ctx.lineWidth = pointObject.lineWidth;
    // ctx.strokeStyle= pointObject.strokeStyle;
    ctx.lineTo(pointObject.x , pointObject.y);
    ctx.stroke();
    //console.log(pointObject);

})
socket.on("mouseup",function(){
    ctx.lineWidth = myPenSize;
    ctx.strokeStyle = myPenColor;
})