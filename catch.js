var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//resim olusturma
var bg = new Image();
var sepet = new Image();
var ball = new Image();

bg.src = "images/forest.png";
sepet.src ="images/sepet.png";
ball.src ="images/red.png";

//ses olusturma
var yem = new Audio();
yem.src = "ses/yem.mp3";

var gameover = new Audio();
gameover.src = "ses/gameover.mp3";

//degiskenler
var sX = 350;
var sY = 550;
var life = 10;
var hiz = 0.5;
var skor = 0;
var hata = 0;
var hatasayisi = 10;

//ilk elma 
var elma = [];

elma[0] = {
   x: cvs.width,
   y: 0

};


//klavye kontrol
document.addEventListener("keydown",kontrol);

function kontrol(e){
    
    switch(e.keyCode){
        case 37:
            sX-=15;
            break;
        case 39:
            sX +=15;
            break;

        
    }
    
}


//hiz araliklarina göre elma olusturma
if (hiz <= 0.5) {
    setInterval(function(){ 
        elma.push({
            x : Math.floor(Math.random()*(cvs.width-50)),
            y : 0
     });
     }, 1000);
}

if (hiz > 0.5 && hiz <= 2) {
    setInterval(function(){ 
        elma.push({
            x : Math.floor(Math.random()*(cvs.width-50)),
            y : 0
     });
     }, 300);
}

if (hiz > 2 ) {
    setInterval(function(){ 
        elma.push({
            x : Math.floor(Math.random()*(cvs.width-50)),
            y : 0
     });
     }, 100);
}

//hiz araligi ve artisi
 setInterval(function(){ 
    if (hiz <= 4.75) {
        hiz += 0.25;
    }
 }, 7000);

 

//çizim islemleri

function draw(){

ctx.drawImage(bg,0,0);
ctx.drawImage(sepet,sX,sY,50,50);

for(var i = 0; i < elma.length; i++){

    ctx.drawImage(ball, elma[i].x, elma[i].y ,30,30);

      elma[i].y += hiz;


   
   if  (elma[i].y + ball.height >= sY +2 && elma[i].x + ball.width -10 >=  sX && elma[i].x +10 <= sX + sepet.width ){  
    
    yem.play();
    elma[i].y = sY;
    elma[i].x = 500;
    elma[i].y+=100; 
    skor++;
    
    

   }

   if(elma[i].y + ball.height >= cvs.height && elma[i].x >= 0 && elma[i].x + ball.width <= 400 ){
    hata++;
    
    elma[i].x = 500;
    elma[i].y+=100; 
    
   }

   //sepetin sag ve sol kisimlardan tasmamasi
   if (sX + sepet.width >= cvs.width) {
       sX = 350;
   }

   if (sX <= 0) {
       sX = 0;
   }
   

   //yazi olusturma
   ctx.font = " 30px Courier New";
   ctx.textalign = "center";
   ctx.textBaseline = "hanging";
   ctx.fillStyle = "white";
   ctx.fillText("Skor: " + skor,0,5);

  
   //hata kismi hatasayisina ulastiginda oyunun bitmesi
   if (hata == hatasayisi) {
    
    
    ctx.font = " 30px Courier New";
    ctx.textalign = "center";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "white";
    ctx.fillText("Hata: " + hata,0,50); 

    ctx.font = " 50px Arial";
    ctx.textalign = "center";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "pink";
    ctx.fillText("Game Over",65,275);
    
    gameover.play();
    draw.stop();

   }
   

}


if (hata <= 9) {
    ctx.font = " 30px Courier New";
    ctx.textalign = "center";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "white";
    ctx.fillText("Hata: " + hata,0,50);
    
   }
requestAnimationFrame(draw);
}

draw();















