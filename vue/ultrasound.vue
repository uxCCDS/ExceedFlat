<template>
    <div class='con'>
        <div class='con con_hd' id='con_ultrasound'>
            <div class='center con_ultrasound'>
                <h1 id='con_ultrasound_msg' class='con_ultrasound_msg'></h1>
                <canvas width="1024" height="400" id='cvs_utlrasound'></canvas>
                <div class='rule' id='rule'></div>
            </div>
        </div>
        <div class='con con_mobile con_ultrasound_mobile' id='con_ultrasound_mobile'>
            <input id='ultrasoundIpt' type="text" />
            <a>Send</a>
            <p>I've talked all! But that's not all. Geek not stop exploring the world. I tried to make more possibility  for our prototype.</p>
            <p>Look this! This line shows the frequency range of the sound that the computer can send. From 0 - 22050</p>
            <p>Our 440hz 'LA' is at the very begining of the line. And you can see the frequency of guitar, piano and singer.</p>
            <p>When you the frequency of sound is over 20000, it becomes ultrasound. People can not listen to it.</p>
            <p>Let's listen to the environment here.</p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    beforeRouteLeave:function(to, from, next){
        if(!window.IsMobile){
            this.Sonic.clear();               
        }
        next(); 
    },
    methods:{
        init:function(){
            if(!this.Inited){
                this.Sonic = new MSonic();
                this.Inited = true;
            }
            this.Sonic.reset();
        }
    },
    computed:{

    },
    mounted(){
        if(!window.IsMobile){
            this.init();
        }else{
            if(!this.Inited){
                this.UltrasoundSender = new UltrasoundSender();
                this.Inited = true;
            }
        }
        //this.initAsh();
        //console.log(this.$el);
    }
}
</script>

<style scoped>
</style>