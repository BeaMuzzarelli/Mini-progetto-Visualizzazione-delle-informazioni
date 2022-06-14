var updateTime = 2500;
var counter = 1;
var keyPressed = false;
var svg = d3.select("body").append("svg").attr("width", 1500).attr("height", 700);
var globalDataSet;

var scaleX = d3.scaleLinear()

var scaleY = d3.scaleLinear()

function goBreathX(){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(globalDataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.x));
	counter = 1;
}

function goBreathY(){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(globalDataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.y));
	counter = 2;
}

function goBreathZ(){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(globalDataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.z));
	counter = 0;
}

function updateDrawX(){
	svg.selectAll("image").data(globalDataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.x));
	counter = 1;
}

function updateDrawY(){
	svg.selectAll("image").data(globalDataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.y));
	counter = 2;
}

function updateDrawZ(){
	svg.selectAll("image").data(globalDataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.z));
	counter = 0;
}

function drawAll(){
	svg.selectAll("image")
		.data(globalDataSet) 	
		.enter()       	
		.append("svg:image")
		.attr("x", function(d, i) { return scaleX(i * 50 + 50) })
		.attr("y", d => this.scaleY(d.x))
		.attr("width", 100)
		.attr("height", 100)
		.attr("xlink:href", "image/whale.png");
}

function updateDraw(){
	var elements = svg.selectAll("image").data(globalDataSet);
	elements.exit().remove();
	switch(counter) {
		case 0: {
			if(keyPressed)
				goBreathX();
			else
				updateDrawX();
			break;
		}
		case 1: {
			if(keyPressed)
				goBreathY();
			else
				updateDrawY();
			break;
		}
		case 2: {
			if(keyPressed)
				goBreathZ();
			else
				updateDrawZ();
			break;
		}
	}
}

d3.json("data/dati.json")
	.then(function(dataSet) {
		globalDataSet = dataSet;
		scaleX.domain([0,600])
		scaleX.range([0,1500])
		scaleY.domain([0, d3.max([
			d3.max(dataSet, function(d) {return d.x}),
			d3.max(dataSet, function(d) {return d.y}),
			d3.max(dataSet, function(d) {return d.z})])
			])
		scaleY.range([0,600])
		drawAll();
		document.addEventListener("keydown", function(e){
			if(e.key == "r")
				keyPressed = true;
		});
		document.addEventListener("keyup", function(){
			keyPressed = false;
		});
		document.querySelectorAll("image")?.forEach(el => {el.addEventListener("click", function(){
					updateDraw(dataSet);
		})});
	})
	.catch(function(error) {
		console.log(error);
  	});
