/* -- BALL PROTOTYPES ------------------------------------------------------------------------------------ */

    SVGCircleElement.prototype.dx = function (that)
      /*
        Returns the distance between the two x-coordinates of the ball centers.
      */ {
      return this.cx.baseVal.value - that.cx.baseVal.value;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    SVGCircleElement.prototype.dy = function (that)
      /*
        Returns the distance between the two y-coordinates of the ball centers.
      */ {
      return this.cy.baseVal.value - that.cy.baseVal.value;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    SVGCircleElement.prototype.d = function (that)
      /*
        Returns the distance between (the centers) of the two balls.
      */ {
      return Math.sqrt(this.dx(that) * this.dx(that) + this.dy(that) * this.dy(that)); // The distance between the center points of both balls, using the classic distance-between-two-points formula (for 2D points).
    }

    /* - - - - - - - - Moves this ball across the screen based on the ball's velocity. - - - -  */ 
    SVGCircleElement.prototype.move = function ()
	  {
		if (this.v != 'undefined')	{
		this.cx.baseVal.value += s2d(this.v.xc); // Given the x-component of the ball's velocity vector, make the ball move in the x-direction.
		this.cy.baseVal.value += s2d(this.v.yc); // Given the y-component of the ball's velocity vector, make the ball move in the y-direction.	
		}else{
		console.log('object has not defined velocity vector');		
		}  
    }
	function SvgGroupElement(el)
	{	
		this.grupa = el;
		this.grupa.collision =0;
		this.grupa.Wallcollision =0;
    }
	SvgGroupElement.prototype.move = function ()
	  {
		if (this.grupa.v != 'undefined')	{
			var transform = this.grupa.transform.baseVal.getItem(0);   
			var mat = transform.matrix;
			var x_m =s2d(this.grupa.v.xc, ( this.grupa.Wallcollision ==1 ? 1 : null ) );
			mat.e += x_m;  
			this.grupa.cx += x_m;
			var y_m = s2d(this.grupa.v.yc,  ( this.grupa.Wallcollision ==1 ? 1 : null ));
			mat.f += y_m; 
			this.grupa.cy += y_m;	
			transform.setMatrix( mat ); 
			console.log('cx: '+ this.grupa.cx + '; cy: '+this.grupa.cy + '; matrix: ' + mat);
			//console.log(this.grupa.v);
		}else{
		console.log('object has not defined velocity vector');		
		}  
    }
	SvgGroupElement.prototype.dx = function (that)
      /*
        Returns the distance between the two x-coordinates of the ball centers.
      */ {
      return this.grupa.cx - that.grupa.cx;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    SvgGroupElement.prototype.dy = function (that)
      /*
        Returns the distance between the two y-coordinates of the ball centers.
      */ {
      return this.grupa.cy - that.grupa.cy;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    SvgGroupElement.prototype.d = function (that)
    {
      return Math.sqrt(this.dx(that) * this.dx(that) + this.dy(that) * this.dy(that));
    }
	
	SvgGroupElement.prototype.isOverlapping = function (that)
    {
      var d = this.d(that); // The distance between the center points of both balls.
      return d <= (this.grupa.r + that.grupa.r); 
    }
    
	SvgGroupElement.prototype.processCollision = function (that)
    {
		if (this.grupa.v != 'undefined'){
			  // always do calculation for both
			   this.grupa.collision =1;
			   that.grupa.collision =1;
				if (this.grupa.Wallcollision == 0 || that.grupa.Wallcollision == 0){
				  var Vab = this.grupa.v.diff(that.grupa.v);         // The difference of vector ballA.v and ballB.v (i.e., ballA.v - ballB.v).
				  var n = collisionN(this, that);        // Calculates a unit vector that is normal to the point of ball-to-ball contact.
				  var Ma = radiusToMass(this.grupa.r); // Returns an appropriate value for the mass of ball A based on its radius.
				  var Mb = radiusToMass(that.grupa.r); // Returns an appropriate value for the mass of ball B based on its radius.

				  var f; // The magnitude of the collision "impulse" between ball A and ball B such that momentum is conserved.
				  var f_numerator; // Break the calculation for f into two parts, its numerator and denominator.
				  var f_denominator;
				  f_numerator = -(1+1 ) * Vab.dot(n); // For this and the remaining lines, see http://www.essentialmath.com/CollisionResponse.pps for details.
				  f_denominator = n.dot(n) * (1 / Ma + 1 / Mb);
				  f = f_numerator / f_denominator;

				 // Per the collision, change the direction of ball A appropriately.
				 
				}
				if (this.grupa.Wallcollision == 0){  // if hit one ball to another without hitting wall process, contrary , leave alone vector
					this.grupa.v = this.grupa.v.add(n.multi(f / Ma)); 
					//this.move();
				}else{
					// without changing vector
					//this.move();
					//this.grupa.v = new Vector(getRandomInteger(-20, 20),getRandomInteger(-30, 20));
				}
				if(that.grupa.Wallcollision == 0){
					that.grupa.v = that.grupa.v.diff(n.multi(f / Mb)); // Per the collision, change the direction of ball B 
					//that.move();
				}else{ // without changing vector
					//that.move();
					//that.grupa.v = new Vector(getRandomInteger(-20, 20),getRandomInteger(-30, 20));
				}	  
	    }else{
		console.log('object has not defined velocity vector');		
		}  
    }
	/* - - - - -  Returns true if this ball is touching or overlapping "that" ball. - - -  */

    SVGCircleElement.prototype.isOverlapping = function (that)
    {
      var d = this.d(that); // The distance between the center points of both balls.
      return d <= (this.r.baseVal.value + that.r.baseVal.value); 
    }
	
	/* Processes the collision of both balls based on the mathematics presented presented in the
     "Have Collision, Will Travel" section of http://www.essentialmath.com/CollisionResponse.pps*/
    SVGCircleElement.prototype.processCollision = function (that)
    {
		if (this.v != 'undefined'){
			  var Vab = this.v.diff(that.v);         // The difference of vector ballA.v and ballB.v (i.e., ballA.v - ballB.v).
			  var n = collisionN(this, that);        // Calculates a unit vector that is normal to the point of ball-to-ball contact.
			  var Ma = radiusToMass(this.r.baseVal.value); // Returns an appropriate value for the mass of ball A based on its radius.
			  var Mb = radiusToMass(that.r.baseVal.value); // Returns an appropriate value for the mass of ball B based on its radius.

			  var f; // The magnitude of the collision "impulse" between ball A and ball B such that momentum is conserved.
			  var f_numerator; // Break the calculation for f into two parts, its numerator and denominator.
			  var f_denominator;
			  f_numerator = -(1 ) * Vab.dot(n); // For this and the remaining lines, see http://www.essentialmath.com/CollisionResponse.pps for details.
			  f_denominator = n.dot(n) * (1 / Ma + 1 / Mb);
			  f = f_numerator / f_denominator;

			  this.v = this.v.add(n.multi(f / Ma)); // Per the collision, change the direction of ball A appropriately.
			  that.v = that.v.diff(n.multi(f / Mb)); // Per the collision, change the direction of ball B 
			  while (this.isOverlapping(that)) {
				this.move();
				that.move();
			  }
	    }else{
		console.log('object has not defined velocity vector');		
		}  
    }

/* Fabryczka SVG */
	
SVG_components = {
   /* -- circle helper ------------------------------------------------------------------------------------ */

	Circle_r : function (el)
	{
	  return el.r.baseVal.value;
	},
	Circle_cx : function (el)
	{
	  return el.cx.baseVal.value;
	},
	Circle_cy : function (el)
	{
	  return el.cy.baseVal.value;
	},
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	createSVGcanvas : function(containerId , options){
		var container = document.getElementById( containerId );
		Maincontainer = container;
		var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		canvas.setAttribute('xlink','http://www.w3.org/1999/xlink');
		canvas.setAttribute('width',(options.width));
		canvas.setAttribute('height', (options.height));
		canvas.setAttribute('id', (options.id));
		return canvas;
	},
	createGroup : function (options) {
		
		var grupa = document.createElementNS("http://www.w3.org/2000/svg", "g");
		grupa.setAttribute('id', options.id);
		grupa.setAttribute('transform', options.transform);
		return grupa;
	},
	
	createLine : function (options) {
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		aLine.setAttribute('x1', options.x);
		aLine.setAttribute('y1', options.y);
		aLine.setAttribute('x2', options.x1);
		aLine.setAttribute('y2', options.y1);
		aLine.setAttribute('id', options.id || '');
		aLine.setAttribute('class', options.klasa || '');
		aLine.setAttribute('transform',options.transform || '');
		return aLine;
	},
	createCircle : function (options) {
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		aLine.setAttribute('cx', options.x);
		aLine.setAttribute('cy', options.y);
		aLine.setAttribute('r', options.r);
		aLine.setAttribute('class', options.klasa || '');
		aLine.setAttribute('id', options.id || '');
		aLine.setAttribute('transform',options.transform || '');
		return aLine;
	},
	createRect : function (options) {
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		aLine.setAttribute('x', options.x);
		aLine.setAttribute('y', options.y);
		aLine.setAttribute('width', options.width);
		aLine.setAttribute('height', options.height);
		aLine.setAttribute('class', options.klasa || '');
		aLine.setAttribute('id', options.id || '');
		aLine.setAttribute('transform',options.transform || '');
		return aLine;
	},
	createUse : function (options) {
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		aLine.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href); 
		aLine.setAttribute('x', options.x);
		aLine.setAttribute('y', options.y);
		aLine.setAttribute('class', options.klasa || '');
		aLine.setAttribute('id', options.id || '');
		aLine.setAttribute('transform',options.transform || '');
		return aLine;
	},
	createPath : function (options) {
		var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
		p.setAttribute('id', (options.id));
		p.setAttribute('transform',options.transform || '');
		p.setAttribute('class', options.klasa || '');
		p.setAttribute('d',options.d || '');
		return p;
	},
	createText : function (options) {
		//val,x, y,id
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		aLine.setAttribute('x', options.x);
		aLine.setAttribute('y', options.y);
		aLine.setAttribute('id', options.id);
		aLine.setAttribute('class', options.klasa || '');
		aLine.setAttribute('transform', options.transform || '');
		aLine.textContent = options.content; 
		return aLine;
	},
	createTextSpan : function (options) {
		//val,x, y,id
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		aLine.setAttribute('x', options.x || '');
		aLine.setAttribute('y', options.y || '');
		aLine.setAttribute('dx', options.dx || '');
		aLine.setAttribute('dy', options.dy || '');
		aLine.setAttribute('id', options.id || '');
		aLine.setAttribute('class', options.klasa || '');
		aLine.textContent = options.content; 
		return aLine;
	},
	transform: function(el, options) {
		el.setAttribute('transform', options.transform)
	},
	calc_d: function(el, options) {
		//radius,value,klasa,transform
		options.value =  (options.value>100) ? 100 : options.value;
		var x = Math.cos((2 * Math.PI)/(100/options.value));
		var y = Math.sin((2 * Math.PI)/(100/options.value));
		//should the arc go the long way round?
		var longArc = (options.value <= 50) ? 0 : 1;
		//d is a string that describes the path of the slice.
		var d = "M" + options.radius + "," + options.radius + " L" + options.radius + "," + 0 + " A" + options.radius + "," + options.radius + " 0 " + longArc + ",1 " + (options.radius + (y*options.radius)) + "," + (options.radius -( x*options.radius)) + " z";		
		el.setAttribute('d',d);
		el.setAttribute('class',options.klasa);
		el.setAttribute('transform',options.transform);		
	}
	
	
}