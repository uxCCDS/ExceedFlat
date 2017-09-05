<template>
    <div class='con'>
        <div class='con con_hd'>
            <audio src="../img/LetItGo.mp3" preload loop='loop' id='LetItGo' style="display:none"></audio>
            <div class='con_space center' id='con_space'>
                <i class='avatar4'></i>
                <i class='avatar2' style="display:none;"></i>
                <i class='avatar3' style="display:none;"></i>
                <i class='avatar1' style="display:none;"></i>
                <i class='avatar1' style="display:none;"></i>
                <i class='avatar1' style="display:none;"></i>
                <i class='avatar2' style="display:none;"></i>
                <i class='avatar2' style="display:none;"></i>
            </div>
        </div>
        <div class='con con_mobile'>
            <p>What do you see?  A man ? Yes</p>
            <p>And now? Some people. This is like the current spark meeting. The active speaker is also in the center. All the people hear the same voice.</p>
            <p>OK! Let's try to do some changes! Now it is more like a round table meeting. </p>
            <p>Do you remeber the 360 camera and VR ?  You will have a 360 view! And the most important thing here is that different people should here different sound in different position.</p>
            <p>Try to enjoy the music! I am going to change to position of the sound source.</p>
            <p>Can you feel the sound come from right to left and front to back?!</p>
            <p>Sorry for disturbing you to enjoy music ! But, do you feel more curious about sound?</p>
        </div>
    </div>
</template>

<script>
var Space = function(){
    this.Sound  = new SoundSpace();

    this.Con = $('#con_space');
    this.Icons = this.Con.find('I');
    this.JIcons = Tool.buildJqueryArray(this.Icons);
    this.RTableR = 150;
    this.State = 0;

    this.Lock = false;
    this.initLoc();
    this.initAsh();
    this.init();
};
Space.prototype={
    initLoc:function(){
        var me=this,
            w = this.Con.width(),
            h = this.Con.height(),
            sw = 70,
            x1 = (w-sw)/2>>0,
            y1 = (h-sw)/2>>0,
            locs = [],
            i,           
            l = this.Icons.length;

        //s1
        for(i=0;i<l;i++){
            locs.push([{
                x:x1,
                y:y1
            }]);
        }
        //s2
        var gap =30;
        locs[0].push({
            x:x1,
            y:y1-sw-gap
        });

        for(i=1;i<4;i++){
            locs[i].push({
                x:x1+(i-2)*(gap+sw),
                y:y1+sw
            });
        }
        for(;i<l;i++){
            locs[i].push({
                x:x1+(sw+gap)/2+(i-6)*(gap+sw),
                y:y1+sw*2+gap
            });
        }   
        //s3
        var cx= w/2>>0,
            cy= h/2>>0,
            r = this.RTableR+10+sw/2;

        var _x,_y,
            current=null;

        for(i=0;i<l;i++){
            locs[i].push({
                x:(cx+r*Math.sin((1/8+i/4)*Math.PI)>>0)-sw/2,
                y:(cy-r*Math.cos((1/8+i/4)*Math.PI)>>0)-sw/2
            });
            (function(i){
                me.JIcons[i].bind('click',function(e){
                    if(me.State===2){
                        me.Sound.position((locs[i][2].x-500)/10>>0,(300-locs[i][2].y)/10>>0,0);
                        me.Sound.play();
                        if(current!=null){
                            me.JIcons[current].css('transform','scale(1)');
                        }
                        current = i;
                        me.JIcons[i].css('transform','scale(1.2)');
                    }
                    e.stopPropagation();
                });
            })(i);
            //initSound;
        }  

        this.Locs = locs;

    },
    initAsh:function(){
        var me=this,
            arr1 = [],
            arr2 = [],
            i,           
            l = this.Icons.length,
            t1= 24,
            t2=10,
            delay;

        for(i=0;i<l;i++){
            //a1
            delay = i*2;
            arr1.push({
                dom:me.Icons[i],
                css:[{'left':me.Locs[i][0].x+'px'},{'left':me.Locs[i][1].x+'px'}],
                tween:'easeIn',
                time:t1,
                delay:delay
            });
            arr1.push({
                dom:me.Icons[i],
                css:[{'top':me.Locs[i][0].y+'px'},{'top':me.Locs[i][1].y+'px'}],
                tween:'easeOut',
                time:t1,
                delay:2+delay
            });
            if(i!==0){
                arr1.push({
                    dom:me.Icons[i],
                    css:[{display:'',opacity:0,transform: 'scale(0.3)'},{opacity:1,transform: 'scale(1)'}],
                    time:t1,
                    delay:delay
                });                
            }
            //a2
            arr2.push({
                dom:me.Icons[i],
                css:[{'left':me.Locs[i][1].x+'px'},{'left':me.Locs[i][2].x+'px'}],
                tween:'easeIn',
                time:t1,
                delay:delay
            });
            arr2.push({
                dom:me.Icons[i],
                css:[{'top':me.Locs[i][1].y+'px'},{'top':me.Locs[i][2].y+'px'}],
                tween:'easeIn',
                time:t1,
                delay:2+delay
            });
        }

        this.Ash1 = new Ash.S(arr1,1,function(){
            me.State = 1;
            me.Lock = false;
        });

        this.Ash2 = new Ash.S(arr2,1,function(){
            me.State = 2;
            me.Lock = false;
        });
    },
    init:function(){
        var me = this;
        this.Con.bind('click',function(){
            me.Sound.stop();
        });
        $(this.Icons[0]).bind('click',function(){
            if(!me.Lock && me.State ===0){
                me.Lock=true;
                me.Ash1.play();
            }else if(!me.Lock && me.State ===1){
                me.Lock=true;
                me.Ash2.play();
            }
        });
    },
    loc:function(){
        this.Icons[0].style.left = this.Locs[0][0].x+'px';
        this.Icons[0].style.top = this.Locs[0][0].y+'px';
        this.State = 0;
    }
};

export default {
    data() {
        return {

        }
    },
    beforeRouteLeave:function(to, from, next){
        if(!window.IsMobile){
            this.Space.Sound.clear();               
        }
        next(); 
    },
    methods:{
        init:function(){
            if(!this.Inited){
                this.Space = new Space();
                this.Inited = true;
            }
        }
    },
    computed:{

    },
    mounted(){
        if(!window.IsMobile){
            this.init();
            this.Space.loc();            
        }
        //this.initAsh();
        //console.log(this.$el);
    }
}
</script>

<style scoped>

</style>