export default class Snake{
    #snakeLength = 0;
    #snakeSpeed;
    #snakeColor = "black";
    #direction = null;
    #snakeLocation = {x:null,y:null}
    constructor(){}
    drawTheHead(){
        let x = this.getLocation().x;
        let y = this.getLocation().y;
        // canvas = document.getElementById("playingField");
        // console.log(canvas.height);
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x * 20,y * 20, 10, 0, 2*Math.PI);
        ctx.fill();  
        ctx.stroke();
        // console.log(this.length);
    }
    randomLocation(){
        let x = (Math.floor(Math.random()*allWidthUnit)) + .5;
        let y = (Math.floor(Math.random()*(allHeightUnit-1 ))) + 1.5;
        this.setLocation(x,y);
    }
    start(){
        //here is get two random x = 10 to 290 and y =10 to 140
        this.randomLocation();
        this.drawTheHead();
    }
    addLength(){
        this.#snakeLength += 1;
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
        this.setLocation(this.getLocation().x - 1,this.getLocation().y);
        this.drawTheHead();
    }
    moveUp(){
        this.setLocation(this.getLocation().x,this.getLocation().y - 1);
        this.drawTheHead();
    }
    moveRight(){
        this.setLocation(this.getLocation().x + 1,this.getLocation().y);
        this.drawTheHead();
    }
    moveDown(){
        this.setLocation(this.getLocation().x,this.getLocation().y + 1);
        this.drawTheHead();
    }
    move(dir){
        console.log("in move : " +checkDirectionConflict());
        if(1){
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
}
class Food extends Snake{
    #location = [];
    #color = '';
    constructor(){
        super();
    }
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
    setFoodLocation(x,y){
        this.#location[0] = x;
        this.#location[1] = y;
    }
    getFoodLocation(){
        return this.#location;
    }
    randomLocation(){
        let x = Math.floor(Math.random() * allWidthUnit) + .5;
        let y = Math.floor(Math.random() * allHeightUnit-1) + 1.5;
        this.setFoodLocation(x,y);
    }
    drawFood(space){
        if (space!=" ") {
            let x = this.getFoodLocation()[0];
            let y = this.getFoodLocation()[1];
            // canvas = document.getElementById("playingField");
            let foodShape = canvas.getContext("2d");
            foodShape.fillStyle = "red";
            foodShape.beginPath();
            foodShape.arc(x * 20 ,y * 20 ,10,0,2*Math.PI);
            foodShape.fill();  
            foodShape.stroke();
        }
    }
    start(){
        this.randomLocation();
        this.drawFood();
    }
}
const canvas = document.getElementById("playingField");
const allWidthUnit = canvas.width / 20;
const allHeightUnit = canvas.height / 20;
var interval = null; // for handling last intervall and dont shelangtakhte
let arrowkey = null;
let oldDirection = "";
const player = new Snake();
const food = new Food();
player.start();
food.start();
document.addEventListener("keydown",(e)=>{
    arrowkey = e.key;
    if (arrowkey=="ArrowLeft" ||
    arrowkey=="ArrowRight" || arrowkey=="ArrowUp"||arrowkey=="ArrowDown"
    ||arrowkey==" ") {
        if(interval){
            clearInterval(interval);
        }
        if(checkDirectionConflict()){
            interval = setInterval(()=>{player.move(arrowkey);food.drawFood(arrowkey);},500);
        }
        else{
            interval = setInterval(()=>{player.move(oldDirection);food.drawFood(oldDirection);},500)
        }
    }
    if(checkDirectionConflict()){
        oldDirection = arrowkey;
    }
});
if(arrowkey!=" "){
    setInterval(()=>{
        let snakeLoc = player.getLocation();
        let foodLoc = food.getFoodLocation();
        if(snakeLoc.x == foodLoc[0] && snakeLoc.y == foodLoc[1]){
            food.randomLocation();
            player.addLength();
        }
        // console.log("check colide interval");
    },300);
}
function checkDirectionConflict(){
    let res = true;
    if (arrowkey == "ArrowLeft" && oldDirection == "ArrowRight") {
        res = false;        
    }
    else if(arrowkey == "ArrowRight" && oldDirection == "ArrowLeft"){
        res = false;
    }
    else if(arrowkey == "ArrowUp" && oldDirection == "ArrowDown"){
        res = false;
    }
    else if(arrowkey == "ArrowDown" && oldDirection == "ArrowUp"){
        res = false;
    }
    return res;
}
// console.log(player.length);