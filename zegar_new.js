function load_zegar(nazwa){
	if (document.getElementById(nazwa)){
		var zegar = new Zegar(document.getElementById( nazwa ), { width:200,height:200, id:'new_zegar'});
		zegar.init();
		zegar.resize(0.4);
	}else{
		console.log('"container_zegar" for zegar class does not exists. insert div to html!')
	}
	
}

function Zegar(Maincontainer, options) {
  /* ustawienie zmiennych */
  var promien = 0.90*options.width/2,
  Tablica = [],
  SVG  = SVG_components, // musi byc klasa SVG_components, moze byc w innym pliku
  hr =3,
  len_podzialka =4,
  width = options.width,
  height = options.width,
  angle = 0, 
  step = (2*Math.PI) / 60,
  angleB = 0, stepB = (2*Math.PI) / 12;
  MainCanvas = SVG.createSVGcanvas(Maincontainer.id, {width: width, height: options.height ,id: 'SVGzegar'});
  
  this.Show = function() { Maincontainer.style.display = 'inline';}
  this.resize = function (val){
	 var value = val || 1; 
	 MainCanvas.style.transform = "scale(" + val + ") translate("+ (Math.log2(val)*width/2) +"px, "+ (Math.log2(val)*width/2) +"px)"; 
  }
  this.init = function() { 
  /* podłaczenie obiketru do kontenera */
	Maincontainer.appendChild( MainCanvas );
	var radius = promien - 10;
	Tablica['cien_hour'] = SVG.createPath({id: 'cien_hour'});
	Tablica['cien_min'] = SVG.createPath({id: 'cien_min'});
	Tablica['cien_sec'] = SVG.createPath({id: 'cien_sec'}); 
	Tablica['obwodka'] = SVG.createCircle({ x: width/2+len_podzialka, y: width/2+len_podzialka, r: promien+2, klasa: 'obwodka',id: 'obwodka'});
	MainCanvas.appendChild( Tablica['obwodka']);
	MainCanvas.appendChild(Tablica['cien_hour']);
	MainCanvas.appendChild(Tablica['cien_min']);
	MainCanvas.appendChild(Tablica['cien_sec']);
	Tablica['hours'] =SVG.createCircle({ x: width/2+len_podzialka, y: width/2+len_podzialka, r: promien-1, klasa: 'hours'});	
	MainCanvas.appendChild( Tablica['hours'] );
	Tablica['minutes'] =SVG.createCircle({ x: width/2+len_podzialka, y: width/2+len_podzialka, r: promien, klasa: 'minutes'});	
	MainCanvas.appendChild( Tablica['minutes'] );
	Tablica['seconds'] =SVG.createCircle({ x: width/2+len_podzialka, y: width/2+len_podzialka, r: promien, klasa: 'seconds'});
	MainCanvas.appendChild(Tablica['seconds']);
	
	/* -------------------    tarcza      -------------------*/
	
	for (var i = 1; i < 61; i += 1) {
		var x = Math.round(width/2 + radius * Math.cos(angle))+1;
		var y = Math.round(height/2 + radius * Math.sin(angle))+6;
		var xB = Math.round(width/2 + (radius -15) * Math.cos(angleB))-3;
		var yB = Math.round(height/2 + (radius -15) * Math.sin(angleB))+10;
		txtElement =  SVG.createText( { content: (i<46 ? i+14 : i-46),x: x,y: y, id: 'MinNumer_'+(i<46 ? i+14 : i-46), klasa:'zegar_text_line4'} ); 
		if(i%5==0){
			txtElementBig =  SVG.createText( {content: (hr<13 ? hr : hr-12),x: xB,y: yB, klasa:'zegar_text_line_big', id: 'HrNumer_'+ (hr<13 ? hr : hr-12)});
			Tablica['HrNumer_'+ (hr<13 ? hr : hr-12)] = txtElementBig;
			MainCanvas.appendChild( txtElementBig );
			hr++;angleB += stepB;
			}
		Tablica['MinNumer_'+ (i<46 ? i+14 : i-46)] = txtElement;
		
		MainCanvas.appendChild( txtElement );
        angle += step;
		
		x1 = 20,
		lineElement =  SVG.createLine({ x: width/2,y: width/2,x1: width/2+len_podzialka,y1: width/2+len_podzialka, transform: 'rotate('+ (3+ 6*i) +' '+ (width/2+len_podzialka) + ' ' + (width/2+len_podzialka) +') translate('+ (0.64*width/2) +' '+ (0.64*width/2) +')', id: 'podzialka_'+i,klasa:'zegar_podzialka_line4'});
		Tablica['podzialka_'+ i] = lineElement;
		MainCanvas.appendChild( lineElement );
	}
	/*  ------------------------------------------------------ */
	Tablica['sec'] = SVG.createLine({x: width/2-width/4, y: width/2-width/4, x1: width/2+len_podzialka, y1: width/2+len_podzialka, transform: 'rotate(363 '+ (width/2+len_podzialka) + ' ' + (width/2+len_podzialka) +') translate('+ (0.64*width/2) +' '+ (0.64*width/2) +')', klasa: 'sec',id: 'sec'});
	Tablica['min'] = SVG.createLine({x: width/2-width/4+10,y: width/2-width/4+10, x1: width/2+len_podzialka, y1: width/2+len_podzialka,  transform: 'rotate(363 '+ (width/2+len_podzialka) + ' ' + (width/2+len_podzialka) +') translate('+ (0.44*width/2) +' '+ (0.44*width/2) +')', klasa: 'min',id: 'min'});
	Tablica['hour'] = SVG.createLine({ x: width/4+20,y: width/4+20, x1: width/2+len_podzialka,y1: width/2+len_podzialka, transform: 'rotate(363 '+ (width/2+len_podzialka) + ' ' + (width/2+len_podzialka) +') translate('+ (0.34*width/2) +' '+ (0.34*width/2) +')' ,klasa: 'hour',id: 'hour'});
	Tablica['digital_text'] = SVG.createText( {content: '', x: width/2-25, y: width*0.7, klasa: 'zegar_text_digital', id: 'digital_text'} );
	MainCanvas.appendChild(Tablica['sec']);
	MainCanvas.appendChild(Tablica['min']);
	MainCanvas.appendChild(Tablica['hour']);
	MainCanvas.appendChild(Tablica['digital_text']);
	
	MainCanvas.addEventListener("mousemove",function(evt){
		Maincontainer.style.transform = "scale(" + 2 + ") translate(20px, 30px)";
		},false);
	MainCanvas.addEventListener("mouseout",function(evt){
		Maincontainer.style.transform = "scale(" + 1 + ")";
		},false);
	runClock();	
	console.log('Success: init finished');  
  }
  
  function runClock() { 
		var t = new Date(),
		// Set values for clock
		Thours = t.getHours(),
		Tminutes =  t.getMinutes(),
		Tseconds = t.getSeconds();
		Shours = Math.round( (Thours % 12 + Tminutes/60) * promien*2*Math.PI/12.1,5), //t.getHours()% 12 * 13.58
		Sminutes = Tminutes * promien*2*Math.PI/60,
		Sseconds = Tseconds * promien*2*Math.PI/60;
	
		SVG.transform(Tablica['sec'], {transform: 'rotate('+(45+ 6*Tseconds ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});  
		SVG.transform(Tablica['min'], {transform:'rotate('+(45+ 6*Tminutes ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});
		SVG.transform(Tablica['hour'],{transform: 'rotate('+(45+ 30*(Thours%12) + Tminutes/2 ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});
		
		SVG.calc_d(Tablica['cien_hour'],{radius: promien -42,value: ((30*(Thours%12) + Tminutes/2)/360)*100,klasa:'cien_hours', transform: 'rotate(0 '+(width/2+4)+' '+(width/2+4)+') translate('+(width/2 - promien +42+4)+' '+(width/2 - promien +42+4)+')'});
		SVG.calc_d(Tablica['cien_min'],{radius: promien -28,value: (6*Tminutes/360)*100,klasa:'cien_minutes', transform: 'rotate(0 '+(width/2+4)+' '+(width/2+4)+') translate('+(width/2 - promien +28+4)+' '+(width/2 - promien +28+4)+')'});
		SVG.calc_d(Tablica['cien_sec'],{radius: promien - 15,value: (6*Tseconds/360)*100,klasa:'cien_seconds', transform: 'rotate(0 '+(width/2+4)+' '+(width/2+4)+') translate('+(width/2 - promien +15+4)+' '+(width/2 - promien +15+4)+')'});		
		
		// Output svg clock stroke positions
		SVG.transform(Tablica['hours'],{transform: 'rotate('+(45-135 ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});
		Tablica['hours'].style.strokeDasharray = ( Shours) + "," +(  promien*2*Math.PI);
		SVG.transform(Tablica['minutes'],{transform: 'rotate('+(45-135 ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});
		Tablica['minutes'].style.strokeDasharray =Sminutes + "," + promien*2*Math.PI;
		SVG.transform(Tablica['seconds'],{transform: 'rotate('+(45-135 ) +' '+(width/2 +4) +' '+(width/2 +4)+')'});
		Tablica['seconds'].style.strokeDasharray =Sseconds + "," + promien*2*Math.PI;
		//SVG.Tablica['podzialka_'+ (Tseconds +37 <=60 ? Tseconds +37 : Tseconds -23)].style.stroke = '#FB5860';
		Tablica['MinNumer_'+ (Tseconds < 60 ? Tseconds : 0)].style.fill = '#FB5860';
		//SVG.Tablica['podzialka_'+ (Tseconds +36 <=60 ? Tseconds +36 : Tseconds -24)].style.stroke =  '#141212';
		Tablica['MinNumer_'+ ( Tseconds-1 == -1 ? 59 : Tseconds-1 )].style.fill = '#141212';
		
		Thours = ( Thours < 10 ? "0" : "" ) + Thours;
		Tminutes = ( Tminutes < 10 ? "0" : "" ) + Tminutes;
		Tseconds = ( Tseconds < 10 ? "0" : "" ) + Tseconds;
		Tablica['digital_text'].textContent = Thours+":"+Tminutes+":"+ Tseconds;
		setTimeout(runClock, 1000);
	}
	
}