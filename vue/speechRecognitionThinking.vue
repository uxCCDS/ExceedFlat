<template>
    <div class='con'>
        <div class='con con_hd'>
            <span class='s1'>Voice</span>
            <span class='center s2'>Text</span>
            <span class='s3'>Action</span>
        </div>
        <div class='con con_mobile'>
            <p>Here is a summary for speech recognition.</p>
            <p>-Voice-Text-Action</p>
            <p>At first, we start to listen to the environment and get sound data. Then the cloud server will convert the sound to text. Thanks to big data, it's more accurate now! Finally we can program with the text just like the normal input from keyboard.</p>
            <p>Remember it! </p>
            <p>This is the speech recognition. Differnet actions create different apps. Reading voice mail, translate different languages and so on.</p>
            <p>I also tried to use this in the app on the car.</p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods:{
        init:function(){

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
.s1,.s2,.s3{font-size: 64px;}
.s1{position: absolute; top: 50%; left: 20%; transform: translate(0%,-50%);}
.s3{position: absolute; top: 50%; right: 20%; transform: translate(0%,-50%);}
</style>