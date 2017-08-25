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

var MusicalAlphabet = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    MusicalStep = [0,2,4,5,7,9,11],
    RollCallName=['do','re','mi','fa','sol','la','si'];

var MelodyGroup = function(root,w,h,left,hz){
    this.Root = root;
    this.Top = 0;
    this.Left = left;
    this.Hz = hz;

    this.W = w;//840
    this.H = h;
    this.Nw = 50;
    this.Nh = 40;
    this.Nt = (this.H-this.Nh)/2>>0;
    this.Gap1 = this.W/12-this.Nw>>0;
    this.Gap2 = this.W/7-this.Nw>>0;

    this.Notes=[];

    this.State = this.Left === 0 ? 0 :1;
    this.Lock = false;
    this.init();

};
MelodyGroup.prototype={
    reset:function(){
        this.State = this.Left === 0 ? 0 :1;
        this.Lock = false;
    },
    _createCon:function(){
        var con = document.createElement('DIV');
        con.className= 'con_melody_group';

        con.style.display = this.Left === 0 ? '' :'none';
        con.style.top = this.Top+'px';
        con.style.left = this.Left+'px';

        this.Con = con;
        this.Root[0].appendChild(con);
    },
    _createTag:function(){
        var tag = document.createElement('H1');
        tag.innerHTML =  this.Hz + ' hz';
        tag.style.top = this.Nt+220+'px';
        tag.style.left= 9*(this.Gap1+this.Nw)- ((120-this.Nw)/2>>0)+'px';
        tag.style.opacity = 0;
        var line = document.createElement('DIV');
        line.className = 'line';
        line.style.left= 9*(this.Gap1+this.Nw) + (this.Nw/2>>0)+'px';
        line.style.top = this.Nt+80+'px';
        line.style.opacity = 0;
        this.Tag = tag;
        this.Line = line;
        this.Con.appendChild(line);
        this.Con.appendChild(tag);
    },
    _createNotes:function(){
        var note,j;
        for(var i=0,l=MusicalAlphabet.length;i<l;i++){
            note = document.createElement('SPAN');
            note.innerHTML = MusicalAlphabet[i];
            note.style.top = this.Nt+'px';
            if(this.Left=='0'){
                j= MusicalStep.indexOf(i);
                if(j==-1){
                    note.style.display='none';
                    note.style.left = i*(this.Gap1+this.Nw)+'px';
                }else{
                    note.style.left = j*(this.Gap2+this.Nw)+'px';                    
                }
            }else{                
                note.style.left = i*(this.Gap1+this.Nw)+'px';
                //note.style.opacity = 0.2;
            }
            this.Notes.push(note);
            this.Con.appendChild(note);   
        }
    },
    _create:function(){
        this._createCon();
        this._createNotes();
        this._createTag();
    },
    initAsh:function(){
        var me=this,
            _arr=[],
            i,
            j,
            t=20,
            l=this.Notes.length;

        for(var i=0,l;i<l;i++){
            j= MusicalStep.indexOf(i);
            if(j!==-1){
                _arr.push({
                    dom:this.Notes[i],
                    css:[{left:j*(this.Gap2+this.Nw)+'px'},{left:i*(this.Gap1+this.Nw)+'px'}],
                    time:t
                });
            } else{
                _arr.push({
                    dom:this.Notes[i],
                    css:[{left:i*(this.Gap1+this.Nw)+'px',display:'',opacity:0,transform: 'scale(0.3)'},{opacity:1,transform: 'scale(1)'}],
                    time:t
                });
            }
        }
        this.Ash = new Ash.S(_arr,1,function(){
            me.State = 1
            me.Lock= false;
        });
        this.AshShow = new Ash.S([{
            dom:me.Con,
            css:[{display:'',opacity:0},{opacity:0.2}],
            time:t
        }],1,function(){

        });
        this.AshShowTag = new Ash.S([{
            dom:me.Tag,
            css:[{opacity:0,transform: 'scale(0.3)'},{opacity:1,transform: 'scale(1)'}],
            time:t,
            delay:10
        },{
            dom:me.Line,
            css:[{opacity:0},{opacity:1}],
            time:10
        }],1,function(){

        });
    },
    init:function(){
        var me = this;

        this._create();
        this.initAsh();
        
        /*
        $(this.Notes[0]).bind('click',function(){
            me.play();
        });
        */
    },
    show:function(){
        this.AshShow.play();
    },
    showTag:function(){
        this.AshShowTag.play();
    },
    play:function(){
        if(!this.Lock && this.State==0){
            this.Lock =true;
            this.Ash.play();
        }
    }
};

var N = function(rollcall,duration,freqIndex,hasDot,isPart){
    return new Jsonic.Melody.Note(rollcall,duration,freqIndex,hasDot,isPart);
};

var Melody = function(){
    this.Con = $('#con_melody');
    this.H2 = $('#formula12');
    
    this.W = this.Con.width();//840
    this.H = this.Con.height();

    this.Player = new Jsonic.Melody.Track();

    this.Group =[];

    //this.Gap = this.Con/this.MusicalAlphabet.length- this.Nw;
    //this.

    this.init();
};
Melody.prototype={
    prepareMelody:function(){
        var m = new Jsonic.Melody.MusicScore('G#','major','4/4');
        m.w(N(7,1/16,1),N(1,1/16,2),N(3,1/16,1),N(7,1/8,1),N(1,1/8,2,true),N(7,1/16,1),N(1,1/16,2),N(3,1/16,1),N(1,1/8,2),N(7,1/8,1),N(2,1/16,2));
        m.w(N(6,1/16,1),N(7,1/16,1),N(2,1/16,1),N(6,1/8,1),N(7,1/8,1),N(2,1/16,1),N(5,1/4,1),N(4,1/4,1));
        m.w(N(7,1/16,1),N(1,1/16,2),N(3,1/16,1),N(7,1/8,1),N(1,1/8,2,true),N(1,1/16,2),N(7,1/16,1),N(3,1/16,1),N(1,1/8,2),N(7,1/8,1),N(2,1/16,2));
        m.w(N(6,1/16,1),N(7,1/16,1),N(2,1/16,1),N(6,1/8,1),N(7,1/8,1),N(2,1/16,1),N(5,1/4,1),N('4#',1/8,1,true),N('3',1/16));
        //start with 3
        m.w(N(3,1/8),N(3,1/8),N(3,1/8),N(3,1/16),N(3,1/16),N(3,1/16),N(2,1/16),N(1,1/16),N(1,1/8,0,true),N(1,1/16),N(2,1/16));
        m.w(N(2,1/16),N(2,1/4),N(1,1/16),N(7,1/16,-1),N(6,1/16,-1),N(6,1/4,-1),N(0,1/8,0,true),N(3,1/16));
        m.w(N(3,1/16),N(3,1/16),N(3,1/16),N(3,1/8,0,true),N(5,1/16),N(5,1/16),N(3,1/16),N(3,1/8,0,true),N(0,1/8),N(2,1/16),N(2,1/16))
        m.w(N(2,1/16),N(3,1/8,0,true),N(0,1/16),N(2,1/16),N(1,1/16),N(2,1/8,0,true),N(0,1/4,0,true));
        
        m.w(N(0,1/8),N(3,1/16),N(3,1/8),N(5,1/8),N(6,1/8),N(5,1/8),N(3,1/8),N(5,1/8),N(5,1/16));
        m.w(N(5,1/16),N(5,1/8),N(4,1/16),N(3,1/16),N(3,1/8),N(4,1/16),N(3,1/4),N(0,1/4));
        m.w(N(0,1/8),N(3,1/16),N(3,1/16),N(2,1/16),N(1,1/8),N(2,1/8),N(0,1/16),N(3,1/16),N(3,1/16),N(2,1/8),N(1,1/8));
        m.w(N(0,1/8),N(6,1/4,-1,true),N(0,1/2));

        m.w(N(0,1/8),N(2,1/16),N(2,1/8),N(5,1/8),N(5,1/8),N(2,1/8),N(2,1/8),N(6,1/8),N(6,1/16));
        m.w(N(6,1/8),N(6,1/16),N(5,1/16),N(6,1/16),N(6,1/8),N(6,1/16),N(6,1/16),N(7,1/8),N(1,1/8,1),N(7,1/8),N(7,1/16));
        m.w(N(7,1/16),N(0,1/16),N(2,1/8),N(2,1/8),N(5,1/8),N(5,1/8),N(0,1/16),N(2,1/16),N(2,1/8),N(6,1/8),N(6,1/16));
        m.w(N(6,1/2,0,true),N(0,1/8),N(5,1/16),N(6,1/16));

        
        m.w(N(6,1/16),N(7,1/8,1,true),N(1,1/2,1),N(0,1/16),N(6,1/16),N(7,1/16),N(1,1/16,1));
        m.w(N(1,1/4,1),N(6,0/16),N(5,1/16),N(5,1/16),N(2,1/8,0,true),N(0,1/8),N(1,1/16,1),N(6,1/16));
        m.w(N(6,1/16),N(6,1/16),N(6,1/8),N(6,1/16),N(7,1/8),N(1,1/16,1),N(1,1/4,1),N(0,1/16),N(6,1/16),N(7,1/16),N(1,1/16,1));
        m.w(N(1,1/4,1),N(0,1/16),N(3,1/16,1),N(3,1/8,1),N(2,1/8,1,true),N(0,1/16),N(1,1/16,1),N(2,1/16,1),N(3,1/16,1));

        m.w(N(3,1/16,1),N(3,1/8,1),N(4,1/16,1),N(3,1/8,1),N(2,1/16,1),N(1,1/16,1),N(2,1/16,1),N(1,1/8,1,true),N(1,1/8,1));
        m.w(N(5,1/8,1),N(3,1/16,1),N(3,1/8,1),N(2,1/16,1),N(2,1/4,1),N(0,1/8),N(1,1/8,1),N(1,1/8,1));
        m.w(N(5,1/16,1),N(3,1/8,1),N(3,1/8,1),N(1,1/16,1),N(1,1/4,1),N(0,1/4),N(1,1/8,1));
        m.w(N(7,1/8),N(5,1/8),N(5,1/8),N(5,1/8),N(5,1/4),N(0,1/8,0,true),N(4,1/16));

        m.w(N(4,1/8),N(4,1/16),N(3,1/16),N(4,1/16),N(3,1/16),N(4,1/16),N(4,1/16),N(3,1/16),N(1,1/8,0,true),N(0,1/4));
        
        m.compile();
        this.LetItGo = m;
    },
    playMusic:function(){
        if(!this.IfStartMusic){
            this.IfStartMusic =true;
            this.Player.play(this.LetItGo,68);        
        }
    },
    stopMusic:function(){
        if(this.IfStartMusic){
            this.Player.stop(); 
            this.IfStartMusic =false;        
        }
    },
    init:function(){
        var me = this;
        this.prepareMelody();
        this.create();
        this.reset();

        this.AshH2 = new Ash.S([{
            dom:me.H2,
            css:[{opacity:0,display:''},{opacity:1}],
            time:20
        }]);

        this.Con.bind('click',function(){
            me.next();
        });
    },
    next:function(){
        switch(this.State){
            case 0:
                this.Group[1].play();
                break;
            case 1:
                this.Group[0].show();
                this.Group[2].show();
                break;
            case 2:
                this.Group[0].showTag();
                this.Group[1].showTag();
                this.Group[2].showTag();
                break;
            case 3:
                this.AshH2.play();
            case 4:
                this.playMusic();
                break;
        }   
        this.State++;
    },
    create:function(){
        this.Group.push(new MelodyGroup(this.Con,this.W,this.H,-this.W,220));
        this.Group.push(new MelodyGroup(this.Con,this.W,this.H,0,440));
        this.Group.push(new MelodyGroup(this.Con,this.W,this.H,this.W,880));
    },
    reset:function(){
        this.State =0;
        this.Group[1].reset();
    }
};

var Rule = function(){
    this.Con = $('#rule');
    this.Len = 1000;
    this.All = 25000;
    this.StepL = this.Len/this.All;
    this.Pos = [1000,5000,10000,15000,20000,22000];
    this.Imgs = [];
    this.Lock = false;
    this.init();
};
Rule.prototype={
    initAsh:function(){
        var me=this,
            t = 20;
        this.AshShowTag= new Ash.S([{
            dom:me.Imgs,
            css:[{display:'',opacity:0},{opacity:1}],
            time:t
        }],1,function(){
            me.Lock = false;
        });
        this.AshSHideTag= new Ash.S([{
            dom:me.Imgs,
            css:[{opacity:1},{display:'none',opacity:0}],
            time:t
        }],1,function(){
            me.Lock = false;
        });
    },
    showTag:function(){
        if(!this.Lock){
            this.Lock = true;
            this.AshShowTag.play();
        }
    },
    hideTag:function(){
        if(!this.Lock){
            this.Lock = true;
            this.AshSHideTag.play();
        }
    },
    init:function(){
        this.create();
        this.createTags();
        this.initAsh();
    },
    create:function(){
        var node,
            val;
        for(var i=0,l=this.Pos.length;i<l;i++){
            node = document.createElement('I');
            val = this.Pos[i];
            node.innerHTML= val;
            node.style.left= val*this.StepL +'px';
            this.Con[0].appendChild(node);
        }
    },
    createTags:function(){
        var HZ = ['20','1700','3600','8000'],
            img;
        for(var i=0,l=HZ.length;i<l;i++){
            img = document.createElement('IMG');
            img.src = '../img/hz'+HZ[i]+'.svg';
            img.style.display = 'none';
            img.style.left = HZ[i]*this.StepL +'px';
            this.Imgs.push(img);
            this.Con[0].appendChild(img);
        }
    }
};



var Sonic = function(){
    this.Con = $('#con_ultrasound');
    this.init();
    this.reset();
};
Sonic.prototype={
    init:function(){
        var me = this;
        this.Rule = new Rule();
        this.Con.bind('click',function(){
            me.next();
        });
    },
    reset:function(){
        this.Rule.Lock = false;
        this.State = 0;
    },
    next:function(){
        switch(this.State){
            case 0:
                this.Rule.showTag();
                break;
        }   
        this.State++;
    }
};

//window.CONNECTCENTER = new ConnectCenter();
window.ConnectCenter = new ConnectCenter();
window.MNav = Nav;
window.MMelody = Melody;
window.MSonic = Sonic;

})();











