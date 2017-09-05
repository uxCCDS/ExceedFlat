<template>
    <div class='con'>
        <div class='con con_hd'>
            <div class='center con_melody' id='con_melody'>
                <h2 style="display:none;" id='formula12'>A# = A * 2 ^ 1/12</h2>
            </div>
        </div>
        <div class='con con_mobile'>
            <p>So! What's this?! Musical alphabet</p>
            <p>Software engineers are thinking with 1 and 0 to build their utopia while musicians play with music notes to construct their Garden of Eden.</p>
            <p>The morden music is base on a famous temperament. Twelve-tone equal temperament!!!</p>
            <p>As we all know, sound wave is a kind of mechanical wave. Wave has its own frequency.</p>
            <p>According to twelve-tone equal temperament, 440 hz is the frequency of 'LA'. And we have a formula to get the frequency of the other note.</p>
            <p>Luckily, the browser enanbles us to create an Oscillator node to create a sound at any frequency the device can send.</p>
            <p>Guess what we can do!</p>
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
            this.Melody.stopMusic();   
        }
        next();
    },
    methods:{
        init:function(){
            if(!window.IsMobile){
                if(!this.Inited){
                    this.Melody = new MMelody();
                    this.Inited = true;
                }
                this.Melody.reset();                
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