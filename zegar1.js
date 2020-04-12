SVG = {
  promien : 0,
  Tablica : [],
  MainCanvas: 0,
  width:0,
  Maincontainer:0,
  createCanvas : function( width, height, containerId ){
    var container = document.getElementById( containerId );
    Maincontainer = container;
	var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    canvas.setAttribute('width',Math.min(height, width));
    canvas.setAttribute('height', Math.min(height, width));
	
    container.appendChild( canvas );
	SVG.promien =0.90*Math.min(height, width)/2;	
	SVG.width = Math.min(height, width);
    MainCanvas = canvas;
	return canvas;
  },
  resize : function (val){
	 var value = val || 1; 
	 var t ="scale(" + val + ") translate("+ ((-val)*SVG.width/2) +" "+ ((-val)*SVG.width/2) +")";
	 MainCanvas.style.transform = "scale(" + val + ") translate("+ ((-1-val)*SVG.width/2) +"px, "+ ((-1-val)*SVG.width/2) +"px)"; 

  },
  createLine : function (x1, y1, x2, y2, color, w, deg,id) {
    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    aLine.setAttribute('x1', x1);
    aLine.setAttribute('y1', y1);
    aLine.setAttribute('x2', x2);
    aLine.setAttribute('y2', y2);
	aLine.setAttribute('id', id);
    aLine.setAttribute('stroke', color);
    
	if(id=='min'){aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x2 + ' ' + y2 +') translate(44 44)');aLine.setAttribute('stroke-width', 2);}else if(id=='hour'){aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x2 + ' ' + y2 +') translate(34 34)');aLine.setAttribute('stroke-width', 3);}else{aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x2 + ' ' + y2 +') translate('+ 0.64*SVG.width/2 +' '+0.64*SVG.width/2+')');aLine.setAttribute('stroke-width', w);}
	
    return aLine;
  },
  createCircle : function (x, y, r, klasa) {
    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    aLine.setAttribute('cx', x);
    aLine.setAttribute('cy', y);
    aLine.setAttribute('r', r);
    aLine.setAttribute('class', klasa);
	aLine.setAttribute('id', klasa);
	//aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x2 + ' ' + y2 +') translate(64 64)');
    return aLine;
  },
  createText : function (val,x, y,id) {
    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    aLine.setAttribute('x', x);
    aLine.setAttribute('y', y);
	 aLine.setAttribute('id', id);
    aLine.setAttribute('class', 'zegar_text_line4');
	aLine.textContent = (val == '0' ? '' : val);
	//aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x + ' ' + y +') translate(50 50)');  
	return aLine;
  },
  createTextBig : function (val,x, y, klasa,id) {
    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    aLine.setAttribute('x', x);
    aLine.setAttribute('y', y);
	aLine.setAttribute('id', id);
    aLine.setAttribute('class', klasa);
	aLine.textContent = (val == '0' ? '' : val);
	//aLine.setAttribute('transform', 'rotate('+(deg)+ ' '+ x + ' ' + y +') translate(50 50)');  
	return aLine;
  },
  createClockFace : function(canvas) {
    var radius = SVG.promien - 10;
	SVG.Tablica['cien_hour'] = document.createElementNS("http://www.w3.org/2000/svg", "path");
	SVG.Tablica['cien_min'] = document.createElementNS("http://www.w3.org/2000/svg", "path");
	SVG.Tablica['cien_sec'] = document.createElementNS("http://www.w3.org/2000/svg", "path");
	
	var hr =3;
	var len_podzialka =4;
    var //fields = $('.field'), 
    width = canvas.getBoundingClientRect()['width'], 
	height = canvas.getBoundingClientRect()['height'],
    angle = 0, step = (2*Math.PI) / 60,
	angleB = 0, stepB = (2*Math.PI) / 12;
	SVG.Tablica['obwodka'] =SVG.createCircle(width/2+len_podzialka,width/2+len_podzialka,SVG.promien+2,'obwodka');
	canvas.appendChild( SVG.Tablica['obwodka']);
	for (i = 1; i < 61; i += 1) {
		var x = Math.round(width/2 + radius * Math.cos(angle))+1;
		var y = Math.round(height/2 + radius * Math.sin(angle))+6;
		var xB = Math.round(width/2 + (radius -15) * Math.cos(angleB))-3;
		var yB = Math.round(height/2 + (radius -15) * Math.sin(angleB))+10;
		txtElement =  SVG.createText( (i<46 ? i+14 : i-46), x, y, 'MinNumer_'+(i<46 ? i+14 : i-46)); 
		if(i%5==0){
			txtElementBig =  SVG.createTextBig( (hr<13 ? hr : hr-12), xB, yB, 'zegar_text_line_big', 'HrNumer_'+ (hr<13 ? hr : hr-12));
			SVG.Tablica['HrNumer_'+ (hr<13 ? hr : hr-12)] = txtElementBig;
			canvas.appendChild( txtElementBig );
			hr++;angleB += stepB;
			}
		SVG.Tablica['MinNumer_'+ (i<46 ? i+14 : i-46)] = txtElement;
		
		canvas.appendChild( txtElement );
        angle += step;
		
		x1 = 20,
		lineElement =  SVG.createLine(width/2, width/2, width/2+len_podzialka, width/2+len_podzialka, 'rgb(0,0,' + x1 + ')', 1,3+ 6*(i),'podzialka_'+i);
		SVG.Tablica['podzialka_'+ i] = lineElement;
		canvas.appendChild( lineElement );
	}
	
	SVG.Tablica['hours'] =SVG.createCircle(width/2+len_podzialka,width/2+len_podzialka,SVG.promien-1,'hours');	
	canvas.appendChild( SVG.Tablica['hours'] );
	SVG.Tablica['minutes'] =SVG.createCircle(width/2+len_podzialka,width/2+len_podzialka,SVG.promien,'minutes');	
	canvas.appendChild( SVG.Tablica['minutes'] );
	SVG.Tablica['seconds'] =SVG.createCircle(width/2+len_podzialka,width/2+len_podzialka,SVG.promien,'seconds');
	canvas.appendChild(SVG.Tablica['seconds']);
	
	SVG.Tablica['sec'] = SVG.createLine(width/2-width/4, width/2-width/4, width/2+len_podzialka, width/2+len_podzialka, 'rgb(0,0,0)', 1,3+ 6*(i),'sec');
	SVG.Tablica['min'] = SVG.createLine(width/2-width/4+10, width/2-width/4+10, width/2+len_podzialka, width/2+len_podzialka, 'rgb(0,0,0)', 1,3+ 6*(i),'min');
	SVG.Tablica['hour'] = SVG.createLine(width/4+20, width/4+20, width/2+len_podzialka, width/2+len_podzialka, 'rgb(0,0,0)', 1,3+ 6*(i),'hour');
	SVG.Tablica['digital_text'] = SVG.createTextBig( 0, width/2-25, width*0.7, 'zegar_text_digital', 'digital_text');
	canvas.appendChild(SVG.Tablica['sec']);
	canvas.appendChild(SVG.Tablica['min']);
	canvas.appendChild(SVG.Tablica['hour']);
	canvas.appendChild(SVG.Tablica['digital_text']);
	canvas.appendChild(SVG.Tablica['cien_hour']);
	canvas.appendChild(SVG.Tablica['cien_min']);
	canvas.appendChild(SVG.Tablica['cien_sec']);
	canvas.addEventListener("mousemove",function(evt){
		Maincontainer.style.transform = "scale(" + 2 + ") translate(20px, 30px)";
		},false);
	canvas.addEventListener("mouseout",function(evt){
		Maincontainer.style.transform = "scale(" + 1 + ")";
		},false);	
	},
	r: function(el, deg) {
			el.setAttribute('transform', 'rotate('+(45+ deg) +' '+(SVG.width/2 +4) +' '+(SVG.width/2 +4)+')')
	},
	calc_d: function(el,radius,value,klasa) {
		
		var x = Math.cos((2 * Math.PI)/(100/value));
		var y = Math.sin((2 * Math.PI)/(100/value));
		//should the arc go the long way round?
		var longArc = (value <= 50) ? 0 : 1;
		//d is a string that describes the path of the slice.
		var d = "M" + radius + "," + radius + " L" + radius + "," + 0 + " A" + radius + "," + radius + " 0 " + longArc + ",1 " + (radius + (y*radius)) + "," + (radius -( x*radius)) + " z";		
		el.setAttribute('d',d);
		el.setAttribute('class',klasa);
		el.setAttribute('transform','rotate(0 '+(SVG.width/2+4)+' '+(SVG.width/2+4)+') translate('+(SVG.width/2 - radius+4)+' '+(SVG.width/2 - radius+4)+')');
		//el.setAttribute('opacity','0.2');
		
	},	
	runClock : function() { 
		var t = new Date(),
		// Set values for svg clock
		Shours = Math.round( t.getHours()% 12 * SVG.promien*2*Math.PI/12,2), // t.getHours()% 12 * 13.58
		Sminutes = t.getMinutes() * SVG.promien*2*Math.PI/60,
		Sseconds = t.getSeconds() * SVG.promien*2*Math.PI/60;
		
		// Set values for text clock
		Thours = t.getHours(),
		Tminutes = t.getMinutes(),
		Tseconds = t.getSeconds();
		
		SVG.r(SVG.Tablica['sec'], 6*Tseconds)  
		SVG.r(SVG.Tablica['min'], 6*Tminutes)
		SVG.r(SVG.Tablica['hour'], 30*(Thours%12) + Tminutes/2)
		
		SVG.calc_d(SVG.Tablica['cien_hour'], SVG.promien -42, ((30*(Thours%12) + Tminutes/2)/360)*100,'cien_hours');		
		SVG.calc_d(SVG.Tablica['cien_min'], SVG.promien -28, (6*Tminutes/360)*100,'cien_minutes');	
		SVG.calc_d(SVG.Tablica['cien_sec'], SVG.promien -15, (6*Tseconds/360)*100,'cien_seconds');		
		// Output svg clock stroke positions
		SVG.r(SVG.Tablica['hours'],-135);
		SVG.Tablica['hours'].style.strokeDasharray = ( Shours) + "," +(  SVG.promien*2*Math.PI);
		SVG.r(SVG.Tablica['minutes'],-135);
		SVG.Tablica['minutes'].style.strokeDasharray =Sminutes + "," + SVG.promien*2*Math.PI;
		SVG.r(SVG.Tablica['seconds'],-135);
		SVG.Tablica['seconds'].style.strokeDasharray =Sseconds + "," + SVG.promien*2*Math.PI;
		//SVG.Tablica['podzialka_'+ (Tseconds +37 <=60 ? Tseconds +37 : Tseconds -23)].style.stroke = '#FB5860';
		SVG.Tablica['MinNumer_'+ (Tseconds < 60 ? Tseconds : 0)].style.fill = '#FB5860';
		//SVG.Tablica['podzialka_'+ (Tseconds +36 <=60 ? Tseconds +36 : Tseconds -24)].style.stroke =  '#141212';
		SVG.Tablica['MinNumer_'+ ( Tseconds-1 == -1 ? 59 : Tseconds-1 )].style.fill = '#141212';
		
		// Pad the hours, minutes and seconds with leading zeros for text clock
		Thours = ( Thours < 10 ? "0" : "" ) + Thours;
		Tminutes = ( Tminutes < 10 ? "0" : "" ) + Tminutes;
		Tseconds = ( Tseconds < 10 ? "0" : "" ) + Tseconds;
    
    // Output text clock values
	  SVG.Tablica['digital_text'].textContent = Thours+":"+Tminutes+":"+ Tseconds;
		setTimeout(SVG.runClock, 1000);
		
	}
	
	
}
