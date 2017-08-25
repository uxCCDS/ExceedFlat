<template>
    <div class='con'>
        <div class='con con_hd' id='con_ultrasound'>
            <div class='center con_ultrasound'>
                <div class='rule' id='rule'></div>
            </div>
        </div>
        <div class='con con_mobile'>
            <p>20000HZ</p>
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
                this.Sonic = new MSonic();
                this.Inited = true;
            }
            this.Sonic.reset();
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