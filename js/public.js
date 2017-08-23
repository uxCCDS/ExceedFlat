(function(){

	var CONNECTCENTER,
		MESSAGE;

	var ConnectCenter = function(){
		this.HasLogIn = false;
		this.init();
	};
	ConnectCenter.prototype={
		init:function(){
			this.initAuth();
			this.signIn();
		},
		initAuth:function(){
			var me=this,
				config = {
					apiKey: "AIzaSyDCojaEf_B256aLlMVwhiKwZvRLWsPxt_c",
					authDomain: "presentation-1073d.firebaseapp.com",
					databaseURL: "https://presentation-1073d.firebaseio.com",
					projectId: "presentation-1073d",
					storageBucket: "",
					messagingSenderId: "721051365312"
				};
			firebase.initializeApp(config);
			this.Auth = firebase.auth();

			this.Auth.onAuthStateChanged(function (user) {
				if (user) {
					me.User = user;
					me.HasLogIn = true;
					console.log(user);
					console.log('Get User');
					me.success();
				} else {

					if(me.HasLogIn){
						//WB.signOut();
					}

					console.log('No User');
					me.signIn();
					// No user is signed in.
				}
			});

		},
		signIn:function(){
			this.Auth.signInWithEmailAndPassword('yulhuang@cisco.com', 'yulhuang123').catch(function (error) {
				console.log('fail to sign in!');
			});
		},
		success:function(){
			if(!MESSAGE){
				MESSAGE = new Message();
				window.FBMESSAGE = MESSAGE;
			}
		}
	};

	var Message = function(){

		this.CanSend = true;
		this.init();
	};
	Message.prototype={
		init:function(roomName){
			var me=this,
				key = this.getUrlParam('key') || 'public',
				strDB = 'ExceedFlat/'+key+'/',
				strDBCurrent = strDB +'current';

			this.DBCurrent = firebase.database().ref(strDBCurrent);

			/*
			this.DBCurrent.once('value').then(function(snapshot){
				var _val = snapshot.val();
				if(_val!=null && _val!='undefined'){
					me.init('ExceedFlat/'+room+'/');
				}else{
					me.init('Test/MX/');
				}
			});
			this.DBCurrent.on('value',function(snapshot) {
				//console.log(snapshot.val());
				var funcName = 'func'+snapshot.val();
				if(typeof me[funcName] == 'function'){
					me[funcName]();
				}
			});
			*/

		},
		bind:function(func){
			var me = this;
			this.DBCurrent.on('value',function(snapshot) {
				var _val = snapshot.val();
				if(_val!=null && _val!='undefined'){
					func(_val);
				}
			});
		},
		update:function(val){
			this.DBCurrent.set(val);
		},
		getUrlParam:function(pName){
			var reg = new RegExp("(^|&)"+ pName +"=([^&]*)(&|$)"),
			      r = window.location.search.substr(1).match(reg); 
			return r!=null?  unescape(r[2]):null; 
		}
	};

  	// Initialize Firebase

var WIN = $(window);
var Nav = function(routeData){
    this.Con = $('#con_nav');
    this.BtnFold = this.Con.find('.flex_1');
    this.SubCon = this.Con.find('.con_nav_sub');
    this.Title = this.BtnFold.find('SPAN');
    this.BODY= $('#app')[0];

    var btns = this.Con.find('>A');

    this.BtnPre = $(btns[0]);
    this.BtnNext = $(btns[1]);

    this.SubBtns = this.SubCon.find('A');

    this.IsShow = false;
    this.IsUnfold = false;
    
    this.initData(routeData);
    this.init();
    this.initSync();
};
Nav.prototype = {
    initData:function(routeData){
        var hash = [];
        for(var i=0,l=routeData.length;i<l;i++){
            hash.push('#'+routeData[i].path);
        }
        this.Hash = hash;
        this.Len = hash.length;
        this.Index = hash.indexOf(location.hash);
    },
    _initSync:function(){
    	var me = this;
        
        if(!/mobile/i.test(navigator.userAgent)){
            MESSAGE.update(0);
        }
        
    	MESSAGE.bind(function(index){
    		me.go(index);
    	});
    },
    initSync:function(){
    	var me=this,
    	_clock = setInterval(function(){
	    	if(MESSAGE){
	    		me._initSync();
	    		clearInterval(_clock);
	    	}    		
    	},200);
    },
    init:function() {
        var me = this;
        
        this.BtnPre.bind('click',function(){
            me.pre();
        });
        this.BtnNext.bind('click',function(){
            me.next();
        });

        this.BtnFold.bind('click',function(){
            if(me.IsUnfold){
                me.fold();
            }else{
                me.unfold();
            }
        });
        this.SubCon.bind('click',function(){
            me.fold();
        });

        if(/mobile/i.test(navigator.userAgent)){
        	me.show();
        }else{
        	if(this.Index===-1){
            	this.go(0);
        	}
        }

        WIN.bind('keyup',function(e){
            switch(e.keyCode){
                case 37:
                    me.pre();
                    break;
                case 39:
                    me.next();
                    break;
                case 49:
                    if(me.IsShow){
                        me.hide();
                    }else{
                        me.show();
                    }
                    break;
                case 48:
                	if(me.BODY.webkitRequestFullScreen){
                		me.BODY.webkitRequestFullScreen();	
                	}                		
                	break;
            }
        });

    },
    show:function() {
        if(!this.IsShow){
            this.Con.css('display','');
            this.IsShow = true;
        }
    },
    hide:function(){
        if(this.IsShow){
            this.Con.css('display','none');
            this.IsShow = false;
        }
    },
    fold:function(){
        if(this.IsUnfold){
            this.SubCon.css('display','none');
            this.IsUnfold = false;
        }
    },
    unfold:function(){
        if(!this.IsUnfold){
            this.SubCon.css('display','');
            this.IsUnfold = true;
        }
    },
    next:function(){
        this.go(this.Index+1);
    },
    pre:function() {
        this.go(this.Index-1);
    },
    go:function(index){
        if(typeof index === 'number' && index>=0 && index<this.Len && index!==this.Index){
            location.hash = this.Hash[index];
            this.Title.html(this.Hash[index].slice(2));
            this.Index = index;
            if(MESSAGE){
            	MESSAGE.update(index);
            }
        }
    }
};

//window.CONNECTCENTER = new ConnectCenter();
window.ConnectCenter = new ConnectCenter();
window.MNav = Nav;



})();











