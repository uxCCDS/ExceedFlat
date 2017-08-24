<template>
    <div class='con'>
        <div class='con con_hd'>
            <div class='center con_melody' id='con_melody'>
                <h2 style="display:none;" id='formula12'>A# = A * 2 ^ 1/12</h2>
            </div>
        </div>
        <div class='con con_mobile'>
            <p>Rock Up?</p>
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
            if(!this.Inited){
                this.Melody = new MMelody();
                this.Inited = true;
            }
            this.Melody.reset();
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

</style>