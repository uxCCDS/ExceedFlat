<template>
    <div class='con'>
        <div class='con con_hd'>
            <div class='center con_ultrasound' id='con_ultrasound'>
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