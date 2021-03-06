class App {
    constructor(){
        // canvas만들기
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

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

    }
    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
    }
}

window.onload = () =>{
    new App();
}