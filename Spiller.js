class Spiller{
    constructor(x, y, w, h, liv, fart, bilde){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.score = 0;
        this.liv = liv;
        this.fart = fart;
        this.dir = 0;
        this.skudd = "nil";
        this.coolDown = 0;
        this.coolDownTime = 120;
        this.skytBar = true;
        this.img = bilde;
        this.dead = false;
    }

    beveg(){
        this.x += this.fart * this.dir;
    }

    die(){
        
        this.dead = true;
    }

    mistLiv(){
        if(this.liv == 0){
            this.die();
        }
        this.liv--;
        
    }

    update(){

        this.show();
        

        if(!this.skytBar && this.coolDown < this.coolDownTime){
            this.coolDown++;
        } else if(!this.skytBar && this.coolDown >= this.coolDownTime){
            this.coolDown = 0;
            this.skytBar = true;
            
        }


    }

    show(){
    
           

        if(this.skudd != "nil"){
            if(this.skudd.y + this.skudd.h <= 0){
                this.skudd = "nil";
                this.coolDown = 0;
                this.skytBar = true;
            } else {
                this.skudd.update();
            }
            

        }

        
        image(this.img, this.x, this.y, this.w, this.h);
        //fill(255);
        //rect(this.x, this.y, this.w, this.h);
        
    }

    skyt(){

        if(this.skytBar){
        
            this.skudd = new Skudd(this.x + this.w/2-2, this.y, 4, 12, 6, "PLAYER");
            this.skytBar = false;
        
        }
        

    }

}