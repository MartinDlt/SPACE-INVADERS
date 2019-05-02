class Enemy{
    constructor(x, y, w, h, fart, image){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fart = fart;
        this.img = image;
    }

    update(dirMod){ //dirMod = direction modifier | dirMod = -1 => retning = venstre | dirMod = 1 => retning = høyre
        this.beveg(dirMod);
        this.show();
    }
    beveg(dirMod){ 
        this.x += this.fart * dirMod;
    }

    show(){
        fill(0,200,200);
        image(this.img, this.x, this.y, this.w ,this.h);
        //rect(this.x, this.y, this.w, this.h);
    }

}