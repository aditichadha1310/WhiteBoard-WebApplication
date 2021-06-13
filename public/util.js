function createSticky(elem)
{
    
    let sticky = document.createElement("div");
    sticky.classList.add("sticky");
    //<div class="sticky-content"></div>

    let stickyNav = document.createElement("div");
    stickyNav.classList.add("sticky-nav");
    //<div class="sticky-nav"></div>

    let minimize = document.createElement("div");
    minimize.classList.add("minimize");
    //<div class="minimize"></div>

    let close = document.createElement("div");
    close.classList.add("close");
    //<div class="close"></div>

    let stickyContent = document.createElement("div");
    stickyContent.classList.add("sticky-content");
    //<div class="sticky-content"></div>

    
    stickyContent.append(elem);
    stickyNav.append(minimize);
    stickyNav.append(close);
    sticky.append(stickyNav);
    sticky.append(stickyContent);

    minimize.addEventListener("click",function()
    {
        stickyContent.style.display = stickyContent.style.display == "none"? "block" : "none";
    })

    close.addEventListener("click",function(){
        sticky.remove();
    })
    document.body.append(sticky);

    let isStickyHold = false;
    let initialX;
    let initialY;


    stickyNav.addEventListener("mousedown",function(e){
        isStickyHold = true;
        let x = e.clientX;//pointodown
        let y = e.clientY;
        initialX = x;
        initialY = y;

    })
    stickyNav.addEventListener("mousemove",function(e){
        if(isStickyHold)
        {
            let x = e.clientX;
            let y = e.clientY;
            
            let finalX = x;
            let finalY = y;
            
            let dx = finalX - initialX;
            let dy = finalY - initialY;

            let{ top , left } = sticky.getBoundingClientRect();

            sticky.style.left = dx + left + "px";
            sticky.style.top = dy + top + "px";

            initialX = finalX;
            initialY = finalY;

        }
    })
    stickyNav.addEventListener("mouseup",function(e){
        isStickyHold = false;
    })
}