
import {Snake} from './snake.js'
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
