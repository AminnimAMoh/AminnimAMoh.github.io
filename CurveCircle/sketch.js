var p=[];
var m;
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
background(0);
var rTwo=180;
for (var c=0; c<4; c++){
for (var i=0; i<TWO_PI; i+=0.01){
var r=400;
p.push(new Ball(i,r,rTwo));
rTwo-=20;
}
}
background(0);
}

function draw() {
    // background(0);
m=map(mouseX,0,width,0.1,2);
if (mouseIsPressed){
  fill(255);
  noStroke();
  text(nf(m,1,3),mouseX+10,mouseY);
}
for (var ball of p){
ball.update();
ball.display();
}
//noLoop();
}

function Ball(a,r){

this.r=r;
this.a=a;
this.x=width/2+this.r*cos(this.a);
this.y=height/2+this.r*sin(this.a);
this.xSub=width/2+this.r*cos(this.a);
this.ySub=height/2+this.r*sin(this.a);

var r=255;
var g=255;
var b=255;
var re=1;
this.display= function(){
beginShape(POINTS);
stroke(r,g,b,1);
noFill();
strokeWeight(3);
// curveVertex(this.xSub,this.ySub);
curveVertex(this.x,this.y);
endShape();
}

this.update= function(){
this.r-=map(noise(frameCount),0,1,0.01,0.5)*re;
var n=map(noise(cos(frameCount*0.0001),sin(this.a),this.r*0.01),-1,1,-200,200);
this.x=width/2+this.r*cos(this.a)+n;
this.y=height/2+this.r*sin(this.a)+n;
if (this.r<50){
re*=-1;
// this.r=400;
g-=50;
r-=30;
if (r<0){
  noStroke();
  fill(255);
  text("Done!!",width-100,height-10);
  noLoop();
}else if(g<0){
  g=0;
}
}else if(this.r>400){
  re*=-1;
}
}
}
