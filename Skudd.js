class Skudd {
    constructor(x, y, w, h, fart, type){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fart = fart;

        if(type == "PLAYER"){
            this.dir = -1;
        } else {
            this.dir = 1;
        }
        
        this.type = type;
    }

    update(){

        this.show();
        this.y += this.fart * this.dir;

    }

    show(){
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);
    }

    kollider(sec){

        return !(  this.x + this.w < sec.x 
                || this.x > sec.x + sec.w
                || this.y + this.h < sec.y
                || this.y > sec.y + sec.h);

                

    }
}