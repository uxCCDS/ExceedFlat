<template>
    <div class='con'>
        <div class='con con_hd'>
            <div class="center con_siri" id='con_siri'>
                <i class='icon_siri'></i>
                <h1 style="display:none;">Hello world</h1>
                <canvas style="display:none;" width="1000px" height="400px"></canvas>
            </div>
        </div>
        <div class='con con_mobile'>
            <p>Yes! Siri! I heard it!Steven Jobs brought it to the world in 2011 with IPhone 4S.From them on, the world started to pay more attention to the speech recognition area.</p>
            <p>And, we!! has already tried to add this technology to our prototype some times.</p>
            <p>I still remember that it's the first project in Cisco. It's a prototype for windows phone 8. Taya encouraged me to add something new outside the normal interaction.Then I touched face decetion and wrote a javascript library for speech recognition. It's so lucky for me to work with the talent people here.</p>
            <p>Here is a sample shows the how it works.</p>
            <p>This wave animation shows the voice's change. If the server gets my voice successfully, it will return a text. Command. </p>
        </div>
    </div>
</template>

<script>

var Siri = function(con){
    this.Con = con;
    this.Icon = con.find('I');
    this.H1 = con.find('H1');
    this.Canvas = con.find('CANVAS');

    if(!ICache.get('ATX_VOIX')){
        ICache.set('ATX_VOIX',new Jsonic.Voix());
    }
    this.Voix  = ICache.get('ATX_VOIX');

    this.Lock = false;
    this.IsOn = false;
    this.initAsh();
    this.initWave();
    this.init();
};
Siri.prototype={
    initAsh:function(){
        var me = this;

        this.Voix.onLog = function(msg){
            me.H1.html(msg);
        };

        this.Voix.bind(['next','next slide'],function(){
            window.Nav && window.Nav.next();
        });

        this.AshShow = new Ash.S([{
            dom:me.Canvas,
            css:[{display:'',opacity:0},{opacity:1}],
            time:10,
            dalay:10
        },{
            dom:me.H1,
            css:[{display:'',opacity:0,transform: 'scale(0.3)'},{opacity:1,transform: 'scale(1)'}],
            time:10,
            dalay:10
        },{
            dom:me.Icon,
            css:[{width:'205px',height:'341px'},{width:'102px',height:'170px'}],
            time:10     
        },{
            dom:me.Icon,
            css:[{top:'130px'},{top:'0px'}],
            time:20,
            tween:'easeIn',    
        },{
            dom:me.Icon,
            css:[{left:'398px'},{left:'0px'}],
            time:20,
            dalay:4,
            tween:'easeOut'     
        }],1,function(){
            me.Lock= false;
        });
        this.AshHide = new Ash.S([{
            dom:me.Canvas,
            css:[{opacity:1},{opacity:0,display:'none'}],
            time:10
        },{
            dom:me.H1,
            css:[{opacity:1,transform: 'scale(1)'},{opacity:0,display:'none',transform: 'scale(0.3)'}],
            time:10
        },{
            dom:me.Icon,
            css:[{width:'102px',height:'170px'},{width:'205px',height:'341px'}],
            time:10     
        },{
            dom:me.Icon,
            css:[{top:'0px'},{top:'130px'}],
            time:20,
            dalay:4,
            tween:'easeOut'   
        },{
            dom:me.Icon,
            css:[{left:'0px'},{left:'398px'}],
            time:20,
            tween:'easeIn'     
        }],1,function(){
            me.Lock = false;
        });
    },
    initWave:function(){
        var me = this,
            audioContext;

        if(!ICache.get('ATX_SIRI')){
            ICache.set('ATX_SIRI',new AudioContext());
        }
        audioContext = ICache.get('ATX_SIRI');


        me.Painter = new Jsonic.Painter();

        this.UserMedia = navigator.getUserMedia({
            audio:{optional:[{echoCancellation:false}]}
        },function(stream){
            var _input = audioContext.createMediaStreamSource(stream),
                _analyser = audioContext.createAnalyser();
            _input.connect(_analyser);

            me.Painter.attach(me.Canvas[0],_analyser,{'BF':{
                func:'wave',
                config:{
                    StrokeStyle:'255,255,255'
                }
            }});

        },function(){

        });
    },
    init:function(){
        var me = this;
        me.Icon.bind('click',function(){
            if(!me.Lock){
                me.Lock = true;
                if(me.IsOn){
                    me.AshHide.play();
                    me.stop();
                }else{
                    me.AshShow.play();
                    me.start();
                }               
            }
        });
    },
    start:function(){
        this.Voix.start();
        this.Painter && this.Painter.start();
        this.IsOn = true;
    },
    stop:function(){
        this.Voix.stop();
        this.Painter && this.Painter.stop();
        this.IsOn = false;
    }
};


export default {
    data() {
        //var id = this.$route.params.id;
        return {

        }
    },
    beforeRouteLeave:function(to, from, next){
        if(!window.IsMobile){
            this.Voice.stop(); 
        }
        next(); 
    },
    methods:{
        init:function(){
            if(!this.Inited){

                this.Voice = new Siri($('#con_siri'));
                
                this.Inited = true;
            }
        }
    },
    computed:{

    },
    mounted(){
        if(!window.IsMobile){
            this.init();
        }
        
        //this.initAsh();
        //console.log(this.$el);
    }
}
</script>

<style scoped>

</style>