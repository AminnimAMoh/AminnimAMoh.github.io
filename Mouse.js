let mouseCan;
let p=[];
let pNum=10;
let r=100;
let maxS=6;
let mpos;

function setup(){
    mouseCan=createCanvas(windowWidth,windowHeight);
    mouseCan.id("Mouse-Canvas")
    mouseCan.parent("#d3-container")
    mouseCan.style("position", "absolute")
    mouseCan.style("display", "block")
    mouseCan.style("z-index", "-2")
    let colors=["#12393D", "#9C3C41", "#5C3B42"]
    strokeWeight(10)

    for(let i=0; i<pNum; i++){
        let a=map(i, 0, pNum, -TWO_PI, TWO_PI)
        p.push(new Ball(a,colors[floor(random(0,colors.length))]));
    }
}

function draw(){
    background(6,22,33)
    mpos=createVector(mouseX,mouseY);
    for(b of p){
        b.run();
    }
}

function Ball(a, c){
    this.a=a;
    this.color=c;
    this.tail=[];
    this.pos=createVector(width/2,height/2);
    this.vel=p5.Vector.random2D();
    this.acc=createVector();

    this.run= function(){
        this.attraction();
        this.physic();
        this.display();
        this.posUpdate();
    }

    this.posUpdate= function(){
        this.tail.push(createVector(this.pos.x,this.pos.y));
        if(this.tail.length>100){
            this.tail.splice(0,1);
        }
    }

    this.attraction= function(){
        let dr=p5.Vector.sub(this.pos,mpos);
        let d=dr.mag();
        d=constrain(d,0.1,3);
        let g=10/(d*d);
        dr.setMag(-g);
        this.acc.add(dr);
    }

    this.physic= function(){
        this.vel.add(this.acc);
        this.vel.limit(maxS);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.display= function(){
        for(let i=0; i<this.tail.length; i++){
            let t=this.tail[i];
            let sw=map(i,0,this.tail.length,0,4)
            let sa=map(i,0,this.tail.length,0,255)
            strokeWeight(sw)
            let c=color(this.color);
            c.setAlpha(50)
            stroke(c);
        point(t.x,t.y)
    }
        point(this.pos.x,this.pos.y)
    }
}