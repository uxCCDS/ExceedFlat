<template>
    <div class='con'>
        <div class='con con_hd'>
            <span class='s1'>Voice</span>
            <span class='center s2'>Text</span>
            <span class='s3'>Action</span>
        </div>
        <div class='con con_mobile'>
            <p>What's the thinking of speech recognition?</p>
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
        this.init();
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