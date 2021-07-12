export class Hill{
    
    constructor(color, speed, total){
        this.color = color;
        this.speed = speed;
        this.total = total; //언덕의 point 개수
    }

    resize(stageWidth,stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        /* point 개수 만큼 gap을 다 만들면, 양이 딱 화면에서 처음부터 끝까지만 움직인다.
         * 화면 밖에서부터 등장하는 모습을 만들 기 위해 2개를 빼고 만든다. */
        this.gap = Math.ceil( this.stageWidth/ ( this.total - 2 ) ); 

        for ( let i = 0 ; i < this.total; i++){
            this.points[i] = {
                x : i * this.gap ,
                y : this.getY()
            }
        }
    }
    
    draw(ctx){
        //ctx : canvas 2D
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed; //움직이는 언덕을 그리기 위해 속도를 추가

        if (cur.x > -this.gap){
            this.points.unshift({
                x: -(this.gap *2),
                y: this.getY()
            })
        } else if (cur.x > this.stageWidth +this.gap){
            this.points.splice(-1);
        }
        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for ( let i = 1 ; i < this.points.length; i++ ){
            cur  = this.points[i];
            cur.x += this.speed; //움직이는 언덕을 그리기 위해 속도를 추가
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y , cx, cy); // 곡선을 그림

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy
            })
             prev = cur;
             prevCx = cx;
             prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        

        return dots; // 곡선의 좌표 return; 
    }

    getY(){
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;


     }

}