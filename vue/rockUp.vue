<template>
    <div class='con'>
        <div class='con con_hd'>
            <div class='text_title center'>
                <h1>Rock Up!</h1>
                <h2 id='RockUpSub'>The Interaction of sound</h2>                
            </div>
        </div>
        <div class='con con_mobile'>
            <p>Thanks for Fiona to introduce the latest technology to us. It helps us to open the door of future.</p>
        </div>
    </div>
</template>

<script>

var Note = function(str){
    this.Dom = document.createElement('SPAN');
    this.Dom.innerHTML = str;
};
Note.prototype={
    getAsh:function(delay,time){
        return [{
            dom:this.Dom,
            css:[{top: '0px'},{top: '-30px'}],
            time:time,
            delay:delay
        },{
            dom:this.Dom,
            css:[{top: '-30px'},{top: '0'}],
            time:time,
            delay:delay+time  
        }];
    }
};
var Melody = function(dom){
    this.Dom = dom;
    this.Notes = [];
    this.init();
};
Melody.prototype={
    init:function(){
        var me=this,
            str= this.Dom.html(),
            note,
            arr=[],
            _a;
        this.Dom.html('');
        for(var i=0,l=str.length;i<l;i++){
            note = new Note(str[i]);
            this.Notes.push(note);
            this.Dom[0].appendChild(note.Dom);
            _a = note.getAsh(i*2,12)
            arr.push(_a[0]);
            arr.push(_a[1]);
        }
        this.Ash = new Ash.S(arr,1,function(){
            me.Lock = false;
        });

        this.Dom.bind('click',function(){
            me.play();
        });
    },
    play:function(){
        if(!this.Lock){
            this.Lock = true;
            this.Ash.play();
        }
    }
};

export default {
    data() {
        //var id = this.$route.params.id;
        return {

        }
    },
    methods:{
        init:function(){
            if(!this.Inited){
                this.Mel = new Melody($('#RockUpSub'));
                this.Inited = true;
            }
        },
        play:function(){
            var me = this;
            setTimeout(function(){
                me.Mel.play();
            },500);
        }
    },
    computed:{

    },
    mounted(){
        this.init();
        this.play();
        //this.initAsh();
        //console.log(this.$el);
    }
}
</script>

<style scoped>

</style>


