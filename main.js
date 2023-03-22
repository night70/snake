
class snake{
    #snakeLength;
    #snakeSpeed;
    #snakeColor = "black";
    #direction = null;
    #location ;
    #snakeLocation = {x:null,y:null}
    constructor(){}
    drawTheHead(x,y){
        let canvas = document.getElementById("playingField");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x,y,10,0,2*Math.PI);
        ctx.fill();  
        ctx.stroke();
    }
    start(){
        //here is get two random x = 10 to 290 and y =10 to 140
        let x = (Math.floor(Math.random()*280)) + 10;
        let y = (Math.floor(Math.random()*130 )) + 10;
        player.setLocation(x,y);
        this.drawTheHead(x,y);
    }
    set length(value){
        this.#snakeLength = value;
    }
    get length(){
        return this.#snakeLength;
    }
    set direction(value){
        this.#direction = value;
    }
    get direction(){
        return this.#direction;
    }
    setLocation(xinput,yinput){
        this.#snakeLocation.x = xinput;
        this.#snakeLocation.y = yinput;

    }
    getLocation(){
        return this.#snakeLocation;
    }
    move(dir){

    }
}

const player = new snake();
player.start();
