import { Hill  } from "./hill.js";
import {SheepController} from "./sheep-controller.js";

class App {
    constructor(){
        // canvas만들기
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.hills = [
            new Hill('#ffa8a8',0.2,12),
            new Hill('#91a7ff',0.5,8),
            new Hill('#c0eb75',1.4,6)
        ];

        this.sheepController = new SheepController();

        //화면 사이즈를 가져 오기 위해 resize 
        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        // 레티나 디스플레이에서 선명하도록 사이즈 크기를 크게 해줌 
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        for ( let i = 0; i < this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);

    }
    animate(t){ //t : fps(1초에 보여질 프레임수)를 위한 타임스탬프, 이를 이용하면 fps를 정의할 수 있다.
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);

        let dots;
        for (let i = 0 ; i < this.hills.length ; i++){
            dots = this.hills[i].draw(this.ctx);
        } //dots : 언덕에 대한 정보
        this.sheepController.draw(this.ctx, t, dots);

    }
}

window.onload = () =>{
    new App();
}