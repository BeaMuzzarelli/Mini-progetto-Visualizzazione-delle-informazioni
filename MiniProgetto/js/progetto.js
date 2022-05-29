var updateTime = 2500;
var counter = 1;
var keyPressed = false;
var svg = d3.select("body").append("svg").attr("width", 1500).attr("height", 700);

var scaleX = d3.scaleLinear()
scaleX.domain([0,600])
scaleX.range([0,1500])

var scaleY = d3.scaleLinear()
scaleY.domain([0,600])
scaleY.range([0,600])

function goBreathX(dataSet){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(dataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.x));
	counter = 1;
}

function goBreathY(dataSet){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(dataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.y));
	counter = 2;
}

function goBreathZ(dataSet){
	svg.selectAll("image").transition().duration(updateTime).attr("y", function(d){ return 0;});
	svg.selectAll("image").data(dataSet).transition().delay(updateTime).duration(updateTime).attr("y", d => this.scaleY(d.z));
	counter = 0;
}

function updateDrawX(dataSet){
	svg.selectAll("image").data(dataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.x));
	counter = 1;
}

function updateDrawY(dataSet){
	svg.selectAll("image").data(dataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.y));
	counter = 2;
}

function updateDrawZ(dataSet){
	svg.selectAll("image").data(dataSet).transition().duration(updateTime).attr("y", d => this.scaleY(d.z));
	counter = 0;
}

function drawAll(dataSet){
	svg.selectAll("image")
		.data(dataSet) 	
		.enter()       	
		.append("svg:image")
		.attr("x", function(d, i) { return scaleX(i * 50 + 50) })
		.attr("y", d => this.scaleY(d.x))
		.attr("width", 100)
		.attr("height", 100)
		.attr("xlink:href", "image/whale.png");
}

function updateDraw(dataSet){
	var elements = svg.selectAll("image").data(dataSet);
	elements.exit().remove();
	switch(counter) {
		case 0: {
			if(keyPressed)
				goBreathX(dataSet);
			else
				updateDrawX(dataSet);
			break;
		}
		case 1: {
			if(keyPressed)
				goBreathY(dataSet);
			else
				updateDrawY(dataSet);
			break;
		}
		case 2: {
			if(keyPressed)
				goBreathZ(dataSet);
			else
				updateDrawZ(dataSet);
			break;
		}
	}
}

d3.json("data/dati.json")
	.then(function(dataSet) {
		drawAll(dataSet);
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
