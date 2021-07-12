export class Sheep{
    constructor(img, stageWidth) {// 양이 처음 등장할 때 오른쪽 끝에서 등장하도록 하기 위해 넓이를 받아옴
        this.img = img;

        this.totalFrame = 8; //그린 양의 프레임이 8
        this.curFrame = 0;// 현재 프레임

        this.imgWidth = 360;
        this.imgHeight = 300;

        this.sheepWidth = 180; // 레티나 디스플레이를 감안해서 절반 사이즈로
        this.sheepHeight = 150;

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.x = stageWidth + this.sheepHeight; // 양의 x값
        this.y = 0; //양의 y값
        this.speed = Math.random() * 2 + 1;

        this.fps = 24; // 어도비에서 양그릴때 썻던 fps 
        this.fpsTime = 1000/ this.fps; // 타임스탬프와의 비교값이 된다.
    }

    draw(ctx, t, dots){
        if(!this.time) { //time이 정의되어 있지 않다면
            this.time = t;
        }
        /*내가 원하는 시간에만 frame(그림의 순서)을 올려준다(바꿔준다).*/
        const now = t - this.time;
        if (now > this.fpsTime) {
            this.time = t;
            this.curFrame += 1;
            if (this.curFrame == this.totalFrame){
                this.curFrame = 0;
            }
        }

        this.animate(ctx,dots);
    }

    animate(ctx, dots){
        /* 양의 중심을 하단 가운대로 잡아야 언덕의 곡선을 따라간다.*/
        this.x -= this.speed;
        const closest = this.getY(this.x, dots);
        console.log(closest);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(closest.rotation);
        ctx.fillStyle = '#000000';
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.sheepWidthHalf, //x
            -this.sheepHeight + 20, //y , 20 : 그림에서 생기는 여유공간
            this.sheepWidth, //넓이
            this.sheepHeight //높이
        );
        ctx.restore(); //저장했던 캠버스를 복귀
    }

    /*양의 x값에 맞는 y값을 찾는 함수들 구현 */

    getY(x, dots){
        for (let i = 1; i <dots.length; i++){
            if (x >= dots[i].x1 && x <= dots[i].x3){
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y : 0,
            x : 0,
            rotation : 0
        };
    }

    getY2(x, dot){
        const total = 200;
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x;
        for (let i = 1; i < total; i++){
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);
            
            if (x >= prevX && x <= pt.x){
                return pt;
            }
            prevX = pt.x;
        }

        return pt;
    }

    getQuadValue(p0, p1, p2, t){
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t *p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t){
        const tx = this.quadTangent(x1,x2,x3,t);
        const ty = this.quadTangent(y1,y2,y3,t);
        //atan2 : 각도를 구하는 함수, 수직의 각도를 구하는 방법임으로 수평으로 바꾸기 위해 90도를 더해줌)
        const rotation = -Math.atan2(tx,ty) + (90 * Math.PI / 180); 
        return {
            x: this.getQuadValue(x1,x2,x3,t),
            y: this.getQuadValue(y1,y2,y3,t),
            rotation : rotation,      
        };
    }
    /* 곡선의 기울기 구하는 공식 : 양이 경사를 올라갈때의 표현을 위해 */
    quadTangent(a, b, c, t){
        return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
    }

}