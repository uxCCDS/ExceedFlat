(function(){
var WIN = $(window);
var Nav = function(routeData){
    this.Con = $('#con_nav');
    this.BtnFold = this.Con.find('.flex_1');
    this.SubCon = this.Con.find('.con_nav_sub');

    var btns = this.Con.find('>A');

    this.BtnPre = $(btns[0]);
    this.BtnNext = $(btns[1]);

    this.SubBtns = this.SubCon.find('A');

    this.IsShow = false;
    this.IsUnfold = false;
    
    this.initData(routeData);
    this.init();
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
        if(this.Index===-1){
            this.go(0);
        }
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
        if(index>=0 && index<this.Len){
            location.hash = this.Hash[index];
            this.Index = index;
        }
    }
};


window.MNav = Nav;

})();











