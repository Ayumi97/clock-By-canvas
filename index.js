var myCanvas=document.getElementById("clock");
var cxt=myCanvas.getContext("2d");
var width=cxt.canvas.width;
var height=cxt.canvas.height;
var r=parseInt(width/2);
var rem=width/200;

function drawBackground(){
	cxt.save();
	cxt.translate(r,r);
	cxt.beginPath();
	cxt.lineWidth=10*rem;
	cxt.arc(0,0,r-cxt.lineWidth/2,0,2*Math.PI,false);
	cxt.stroke();
	// 外圆

	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
	cxt.font=18*rem+"px Arial";
	cxt.textAlign="center";
	cxt.textBaseline="middle";
	hourNumbers.forEach(function(number,i){
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*rem);
		var y=Math.sin(rad)*(r-30*rem);
		cxt.fillText(number,x,y);

	});

	for(var i=0;i<60;i++){
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-18*rem);
		var y=Math.sin(rad)*(r-18*rem);
		cxt.beginPath();
		if( i%5 ===0){
			cxt.fillStyle="#000";
			cxt.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		else{
			cxt.fillStyle = "#ccc";
			cxt.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		cxt.fill();
	}
}

function drawHour(hour,minite){
	cxt.save();
	cxt.beginPath();
	cxt.lineWidth=6*rem;
	cxt.lineCap='round';
	var rad=2*Math.PI/12 * hour;
	var mrad=2*Math.PI/12/60 * minite;
	cxt.rotate(rad+mrad);
	cxt.moveTo(0,10*rem);
	cxt.lineTo(0,-r/2);
	cxt.stroke();
	cxt.restore();
}
function drawMinite(minite){
	cxt.save();
	cxt.beginPath();
	cxt.lineWidth=3*rem;
	cxt.lineCap='round';
	var rad=2*Math.PI/60*minite;
	cxt.rotate(rad);
	cxt.moveTo(0,10*rem);
	cxt.lineTo(0,-r+15*rem);
	cxt.stroke();
	cxt.restore();
}

function drawSecond(second){
	cxt.save();
	cxt.beginPath();
	cxt.fillStyle="red";
	var rad=2*Math.PI/60*second;
	cxt.rotate(rad);
	cxt.moveTo(-2*rem,20*rem);
	cxt.lineTo(2*rem,20*rem);
	cxt.lineTo(1,-r+18*rem);
	cxt.lineTo(-1,-r+18*rem);
	cxt.fill();
	cxt.restore();
}
function drawDot(){
	cxt.beginPath();
	cxt.fillStyle="#fff";
	cxt.arc(0,0,3,0,2*Math.PI,false);
	cxt.fill();
}


function draw(){
	cxt.clearRect(0,0,width,height);
	var now=new Date();
	var hour=now.getHours();
	var minite=now.getMinutes();
	var second=now.getSeconds();
	drawBackground();
	drawHour(hour,minite);
	drawMinite(minite);
	drawSecond(second);
	drawDot();
	cxt.restore();
}
draw();
setInterval(draw,1000);
