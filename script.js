document.getElementsByTagName("input")[0].onchange = function(){
	if(this.value < 1 || this.value > 120)
		return false;
	generate(this.value);
};
document.getElementsByTagName("input")[1].onclick = function(){
	generate(document.getElementsByTagName("input")[0].value);
};
function rColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) 
		color += letters[Math.floor(Math.random() * 16)];
	return color;
}
function generate(max){
	var pola = [];
	for(var i = 1; i <= max; i++){
		pola.push(rColor());
	}
	pola = pola.concat(pola);
	var set = "<tr>";
	var sq = Math.sqrt(pola.length);
	for(var i = 0; i < pola.length; i++){
		set += "<td></td>";
		if((i+1)%Math.round(sq)==0){
			set += "</tr>"+(i >= pola.length-1 ? "" : "<tr>");
		}
	}
	if(sq%2!==0)
		set += "</tr>";
	document.getElementById("mem").innerHTML = set;
	var save = [];
	var last = null;
	var first = null;
	var timer = null;
	var prev = null;
	var done = 0;
	var l = pola.length;
	for(var i = 0; i < l; i++){
		var rand = Math.floor(Math.random()*pola.length);
		save[i] = pola[rand];
		pola.splice(rand, 1);
		
		document.getElementsByTagName('td')[i].onclick = function(){
			if(this.innerHTML.length > 0)
				return false;
			if(timer != null){
				clearTimeout(timer);
				timer = null;
				prev.style.backgroundColor = "";
				prev.style.transform = "";
				last.style.transform = "";
				last.innerHTML = "";
				last.style.backgroundColor = "";
				last = null;
				timer = null;
				prev = null;
			}
			var val = save[this.parentNode.rowIndex*Math.round(sq)+this.cellIndex];
			if(last == null){
				if(first == null)
					first = Date.now();
				this.innerHTML = val;
				this.style.backgroundColor = val;
				this.style.transform = "rotateY(180deg)";
				last = this;
			}else if(last.innerHTML == val){
				this.innerHTML = val;
				this.style.backgroundColor = val;
				this.style.transform = "rotateY(180deg)";
				last = null;
				done += 2;
				if(done == l){
					d = new Date(Date.now()-first);
					d = d < 1000 ? d.getMilliseconds()+"ms" : (d.getMinutes()+"m"+d.getSeconds()+"s").replace("0m", "");
					setTimeout(function(){alert("Gratulacje wygrałeś!\nTwój czas to: "+d);},1000);
				}
			}else{
				prev = this;
				this.style.backgroundColor = val;
				this.style.transform = "rotateY(180deg)";
				timer = setTimeout(function(){
					prev.style.backgroundColor = "";
					prev.style.transform = "";
					last.style.transform = "";
					last.innerHTML = "";
					last.style.backgroundColor = "";
					last = null;
					timer = null;
					prev = null;
				},1000);
			}
		};
	}
}
