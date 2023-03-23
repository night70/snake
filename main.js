export default class Snake{
    #snakeLength;
    #snakeSpeed;
    #snakeColor = "black";
    #direction = null;
    #location ;
    #snakeLocation = {x:null,y:null}
    constructor(){}
    drawTheHead(){
        let x = this.getLocation().x;
        let y = this.getLocation().y;
        let canvas = document.getElementById("playingField");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
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
        this.setLocation(x,y);
        this.drawTheHead();
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
    moveLeft(){
        this.setLocation(this.getLocation().x - 20,this.getLocation().y);
        this.drawTheHead();
    }
    moveUp(){
        this.setLocation(this.getLocation().x,this.getLocation().y - 20);
        this.drawTheHead();
    }
    moveRight(){
        this.setLocation(this.getLocation().x + 20,this.getLocation().y);
        this.drawTheHead();
    }
    moveDown(){
        this.setLocation(this.getLocation().x,this.getLocation().y + 20);
        this.drawTheHead();
    }
    move(dir){
        switch (dir) {
            case "ArrowLeft":
                this.moveLeft();
                break;
            case "ArrowUp":
                this.moveUp();
                break;
            case "ArrowRight":
                this.moveRight();
                break;
            case "ArrowDown":
                this.moveDown();
                break;
        
            default:
                return;
        }
    }
}
class Food extends Snake{
    #location = [];
    #color = '';
    constructor(){}
    setFoodLocation(x,y){
        this.#location[0] = x;
        this.#location[1] = y;
    }
    set foodColor(value){
        this.#color = value
    }
    get foodColor(){
        return this.#color;
    }
    getFoodLocation(){
        return this.#location;
    }
    drawFood(){
        let canvas = document.getElementById("playingField");
        let shape = canvas.getContext("2d");

    }
}
var interval = null; // for handeling last intervall and dont shelangtakhte
const player = new Snake();
player.start();
document.addEventListener("keydown",(e)=>{
    let k = e.key;
    if (k=="ArrowLeft" || k=="ArrowRight" 
    || k=="ArrowUp"||k=="ArrowDown") {
        if(interval){
            clearInterval(interval);
        }
        interval = setInterval(()=>{player.move(k);},300)
    }
});
