//The animation and transition of tiles additional feature was implemented
//id: 620057710
var space=15; //Empty tile
var move="none";// direction
var div1;//Array of tiles
var counter=0;
var adder=0;
var str;
var continue1= false;//Is tile still moving..

//Loads tiles when webpage loads
window.onload = function(){
    var div = document.getElementById('puzzlearea').getElementsByTagName('div');
    div1=div;
    var shuf = document.getElementById('shufflebutton');
    shuf.onclick=shuffle;
    for(var i=0; i<div.length;i++){
        div[i].className = 'puzzlepiece';
        div[i].onmouseover = Move;
        div[i].onmouseout = clear;
        div[i].onclick = moveTile;

        if(i>=0 && i<=3){
            div[i].style.left+=i*100+'px';
            div[i].style.top=0+'px';
            div[i].style.backgroundPosition = -i*100+'px '+'0px';
        }else if(i>=4 && i<=7){
            div[i].style.left+=(i-4)*100+'px';
            div[i].style.top=100+'px';
            div[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
        }else if(i>=8 && i<=11){
            div[i].style.left+=(i-8)*100+'px';
            div[i].style.top=200+'px';
            div[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
        }else{
            div[i].style.left+=(i-12)*100+'px';
            div[i].style.top=300+'px';
            div[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
        }
        
    }
};

//Check if tile can move
function Move(){
    if(!continue1){
        if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top===getY()){
        this.className = this.className + " movablepiece";
        move="right";
        }else if(parseInt(this.style.left) === (parseInt(getX())+parseInt(this.offsetWidth)) && this.style.top===getY()){
            this.className = this.className + " movablepiece";
            move= "left";
        }else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            move= "down";
        }else if(parseInt(this.style.top) === (parseInt(getY())+parseInt(this.offsetHeight)) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            move= "up";
        }else{
            move= "none";
        }
    }
    

}

//remove .moveablepiece class when mouse exits tile
function clear(){
    this.className = 'puzzlepiece';
}

//Check method for shuffle
function canMove1(elmt){
    if((parseInt(elmt.style.left)+parseInt(elmt.offsetWidth)) === parseInt(getX()) && elmt.style.top===getY()){
        move="right";
        return "right";
    }else if(parseInt(elmt.style.left) === (parseInt(getX())+parseInt(elmt.offsetWidth)) && elmt.style.top===getY()){
        move= "left";
        return "left";
    }else if((parseInt(elmt.style.top)+parseInt(elmt.offsetHeight)) === parseInt(getY()) && elmt.style.left===getX()){
        move= "down";
        return "down";
    }else if(parseInt(elmt.style.top) === (parseInt(getY())+parseInt(elmt.offsetHeight)) && elmt.style.left===getX()){
        move= "up";
        return "up";
    }else{
        move= "none";
        return "none";
    }

}

//Animates tile movement
function shift(){
    var indx = 0;
    for(var i=0; i<div1.length;i++){
        if(div1[i].textContent===str){
            indx=i; 
        }
    }
    
    if(adder!=100){
        if(move==="left" || move==="right"){
            div1[indx].style.left=parseInt(div1[indx].style.left)+counter+'px';
        }else{
            div1[indx].style.top=parseInt(div1[indx].style.top)+counter+'px';
        }
        adder+=1;
        continue1=true;
        setTimeout("shift()", "1 * 1000");
    }else{
        adder=0;
        continue1=false;
        move="none";
    }   
    
}

//Gets direction and then calls shift() to move tile
function moveTile(){
    if(!continue1){
        switch(move){
        case "right":
        counter=1;
        space-=1;
        str=this.textContent;
        shift();
        break;
        case "left":
        counter=-1;
        space+=1;
        str=this.textContent;
        shift();
        break;
        case "down":
        counter=1;
        space-=4;
        str=this.textContent;
        shift();
        break;
        case "up":
        counter=-1;
        space+=4;
        str=this.textContent;
        shift();
        break;

    }
    }
}

//Move method for shuffle
function moveTile1(elmt){
    
    switch(move){
        case "right":
        elmt.style.left=parseInt(elmt.style.left)+100+'px';
        space-=1;
        break;
        case "left":
        elmt.style.left=parseInt(elmt.style.left)-100+'px';
        space+=1;
        break;
        case "down":
        elmt.style.top=parseInt(elmt.style.top)+100+'px';
        space-=4;
        break;
        case "up":
        elmt.style.top=parseInt(elmt.style.top)-100+'px';
        space+=4;
        break;

        default:


    }
}

//shuffles tiles
function shuffle(){

    var num=100;
    for(var i =0; i<num; i++){
        var lst = [];
        for(var i1 =0; i1<div1.length; i1++){
            if(canMove1(div1[i1])!="none"){
                lst.push(i1);
            }

        }
        if(lst.length!=0){
            var n = lst[Math.floor((Math.random()*lst.length)+0)];
            canMove1(div1[n]);
            moveTile1(div1[n]);
        }
    }
    move="none";
}

//Returns the corresponding X for the empty tile
function getX(){
        if(space>=0 && space<=3){
            return space*100+'px';
        }else if(space>=4 && space<=7){
            return (space-4)*100+'px';
            
        }else if(space>=8 && space<=11){
            return (space-8)*100+'px';
            
        }else{
            return (space-12)*100+'px';
            
        }
        //return 0;
}

//Returns the corresponding Y for the empty tile
function getY(){
    if(space>=0 && space<=3){
            return '0px';
        }else if(space>=4 && space<=7){
            return '100px';
            
        }else if(space>=8 && space<=11){
            return '200px';
            
        }else{
            return '300px';
            
        }
}
shuffle();