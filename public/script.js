
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(10,10,100,100);
        // // xoffset, yoffset,length,breadth

        //object destructuring
   
        let {top : canvasTop} = canvas.getBoundingClientRect();

        canvas.height = window.innerHeight-canvasTop;
        canvas.width = window.innerWidth;


        window.addEventListener("resize",function()
        {
        canvas.height = window.innerHeight-canvasTop;
        canvas.width = window.innerWidth;
        redrawLines();
        })
        
    
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let db = [];
        let redoDb = [];

        //tell canvas to start a new line
        // ctx.beginPath();

        // //satrting point of line
        // ctx.moveTo(10,10);

        // //points after the starting point
        // ctx.lineTo(200,10);
        // ctx.lineTo(200,100);
        // ctx.lineTo(50,50);
        // //actual draw the line between the points
        // ctx.stroke();

        let isMouseDown = false;
        let line = [];
        canvas.addEventListener("mousedown" , function(e){
            // console.log(e);
            isMouseDown= true;
            let x = e.clientX;
            let y = e.clientY - canvasTop;
            //console.log(x,y);
            ctx.beginPath();
            ctx.moveTo(x,y);
            let pointObject = {
                id:"md",
                x,
                y,
                lineWidth :ctx.lineWidth,
                strokeStyle :ctx.strokeStyle,
            }
            line.push(pointObject);
            socket.emit("md", pointObject);
            //console.log(pointObject);
        })
        canvas.addEventListener("mousemove" , function(e){
            if(isMouseDown)
            {
                if(redoDb.length)
                {
                    redoDb = [];
                }
                let x = e.clientX;
                let y = e.clientY - canvasTop;
                // console.log(x,y);
                ctx.lineTo(x,y);
                ctx.stroke();
                let pointObject = {
                    id:"mn",
                    x,
                    y,
                }
                line.push(pointObject);
                socket.emit("mm", pointObject);
                //console.log(pointObject);
            }

        })
        canvas.addEventListener("mouseup" , function(e){
            isMouseDown = false;
            db.push(line);
            line = [];
            socket.emit("mu");
        })
        