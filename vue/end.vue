<template>
    <div class='con'>
        <div class='con con_hd black'>
            <div class='text_title center'>
                <h1><a href='https://uxccds.github.io'>uxccds.github.io</a></h1>              
            </div>
        </div>
        <div class='con con_mobile'>
            <p>prototype site</p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        //var id = this.$route.params.id;
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
.black{background: black;}
h1 a{text-decoration: none; font-size: 80px;}
</style>


