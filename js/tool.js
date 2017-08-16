(function(argument) {
	
	Ash.Tween.easeInInt=function(t,b,c,d){
		return parseInt(c*(t/=d)*t + b);
	};
	Ash.Tween.easeOutInt=function(t,b,c,d){
		return parseInt(-c *(t/=d)*(t-2) + b);
	};
	
	
	var _weekyday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// body...
	var tool = new function(){
		this.buildJqueryArray=function(arr){
			var ret=[];
			for(var i=0,l=arr.length;i<l;i++){
				ret.push($(arr[i]));
			}
			return ret;
		};
		this.colorToRgb=function(color16){
			if(color16.indexOf('rgb')!==-1){
				return color16;
			}
			var r = parseInt(color16.slice(1,3),16),
				g = parseInt(color16.slice(3,5),16),
				b = parseInt(color16.slice(5,7),16);
			return 'rgb('+[r,g,b].join(',')+')';
		};
		this.position=function (pObj) {
            var _left = pObj.offsetLeft || 0,
                _top = pObj.offsetTop || 0;
            while (pObj = pObj.offsetParent) {
                _left += eval(pObj.offsetLeft);
                _top += pObj.offsetTop;
            }
            return { x: _left, y: _top };
        };
        this.easyRender=function(txt,data){
			for(var name in data){
				txt = txt.replace('<%= '+name+' %>',data[name]);
			}
			return txt;
		};
		this.getTimeShort = function(time){
			var h=time.getHours(),
				m = time.getMinutes(),
				tip = h < 12 ? 'AM' : 'PM',
				h12 =h%12,
				hstr = h12 >9? h12:'0'+h12,//?12
				mstr = m>9?m:'0'+m;  
			return hstr+':'+mstr+' '+tip;
		};
		this.getTimeString = function(time) {
			var now = new Date(),
				nowMonth = now.getMonth(),//0
				nowMonthDay = now.getDate(),
				nowYear = now.getFullYear(),
				nowWeekyDay = now.getDay(),
				timeMonth = time.getMonth(),//0
				timeMonthDay = time.getDate(),
				timeYear = time.getFullYear(),
				timeWeekyDay = time.getDay();//0
			if(nowYear == timeYear && nowMonth == timeMonth && nowMonthDay == timeMonthDay){

				var h=time.getHours(),
					m = time.getMinutes(),
					tip = h < 12 ? 'AM' : 'PM',
					h12 =h%12,
					hstr = h12 >9? h12:'0'+h12,//?12
					mstr = m>9?m:'0'+m;  
				return hstr+':'+mstr+' '+tip;

			}
			if((nowYear*10000+nowMonth*100+nowMonthDay)-(timeYear*10000+timeMonth*100+timeMonthDay)<7){
				return _weekyday[timeWeekyDay];
			}
			return time.toLocaleDateString();
		};

		var _regEmpty= /\r\n\s\t/g;

		this.isEmpty=function(txt){
			return txt==null || txt.replace(_regEmpty,'')==='';
		};

		this.compare = function(val1,val2,type){
			switch(type){
				case 'eq':
					return val1 == val2;
				case 'nt':
					return val2 != val2;
				case 'gt':
					return val1> val2;
				case 'lt':
					return val1 <val2;
				case 'none':
					return true;
				default:
					return val1 == val2;
			};
		};

		this.getUrlParam=function(pName){
			var reg = new RegExp("(^|&)"+ pName +"=([^&]*)(&|$)"),
			      r = window.location.search.substr(1).match(reg); 
			return r!=null?  unescape(r[2]):null; 
		};

		this.localJson = function(key,value){
			if(value){
				return localStorage.setItem(key,JSON.stringify(value));
			}else{
				var _v = localStorage.getItem(key);
				return _v ? JSON.parse(_v) : undefined;
			}
		};

		this.localData = function(key,value){
			if(value){
				return localStorage.setItem(key,value);
			}else{
				var _v = localStorage.getItem(key);
				return _v ? _v : undefined;
			}
		};

		this.getVueRouteViewName = function(url){
			var arr = url.split('/'),
				l=arr.length,
				last = l-1;
			return arr[last];
		};

	};

	$.fn.extend({
		swipe:function(elist,dalt,n){
			var _x1=0,
				_y1=0,
				_x2=0,
				_y2=0,
				_dalt=dalt||0,
				_dx=0,
				_dy=0;

			this.bind('touchstart',function(e){
				_x1=e.originalEvent.targetTouches[0].pageX;
				_y1=e.originalEvent.targetTouches[0].pageY;
				//e.preventDefault();
			});
			this.bind('touchmove',function(e){
				_x2=e.originalEvent.targetTouches[0].pageX;
				_y2=e.originalEvent.targetTouches[0].pageY;
				//e.preventDefault();
			});
			this.bind('touchend',function(e){
				if(_x2!==0 && _y2!==0){
					_dx=_x1-_x2;
					_dy=_y1-_y2;
					if(Math.abs(_dx) > Math.abs(_dy)){
						if(_dx < 0-_dalt && elist.right){
							elist.right(e);
						}else if(_dx>_dalt && elist.left){
							elist.left(e);
						}else if(_dx!==0){
							elist.backA && elist.backA(e);
						}					
					}else{
						if(_dy< 0-_dalt && elist.down){
							elist.down(e);
						}else if(_dy>_dalt && elist.up){
							elist.up(e);
						}else if(_dx!==0){
							elist.backV && elist.backV(e);
						}					
					}
					_dx=_dy=_x1=_x2=_y1=_y2=0;					
				}
			});
		}
	});

	window.Tool = tool;

})();

(function(){
	var WIN = $(window),
		DOC = $(document);
	var BounceScrollFix = function(){
		this.init();
	};
	BounceScrollFix.prototype={
		init:function(){
			var tar,
				needStop = true,
				sy,
				smax,
				y;

			DOC.bind('touchstart',function(e){
				tar = e.target;
				y = e.originalEvent.targetTouches[0].pageY;
				sy=0,
				smax=0;
				needStop = true;

				if(tar.className.indexOf('ENABLESCROLL')!==-1){
					sy = tar.scrollTop;
				}else{
					while(tar=tar.parentNode){
						if(tar && tar.className && tar.className.indexOf('ENABLESCROLL')!==-1){
							sy = tar.scrollTop;
							smax = tar.scrollHeight - tar.clientHeight;
							break;			
						}
					}
				}

			});

			DOC.bind('touchmove',function(e){
				if(tar){
					//console.log(e);
					var _y = e.originalEvent.targetTouches[0].pageY,
						_sy = sy+y-_y;
					if(_sy>=0 && _sy<=smax){
						needStop = false;	
					}else{
						needStop = true;
					}
				}
				needStop && e.preventDefault();
			});
		}
	};

	$(function(){
		new BounceScrollFix();
	});

})();