import Vue from 'vue';
import VueRouter from 'vue-router';

import NavTool from '../vue/navTool.vue';
import RockUp from '../vue/rockUp.vue';
import SpeechRecognition from '../vue/speechRecognition.vue';
import SpeechRecognitionThinking from '../vue/speechRecognitionThinking.vue';
import DecorateSound from '../vue/decorateSound.vue';
import GuitarSpeakers from '../vue/guitarSpeakers.vue';
import SoundInSpace from '../vue/soundInSpace.vue';
import Essence from '../vue/essence.vue';
import Melody from '../vue/melody.vue';
import Ultrasound from '../vue/ultrasound.vue';

Vue.use(VueRouter);

window.LOCK_ANIMATION =false;

const router = new VueRouter({
  	routes:[{ 
        path: '/rockUp', component: RockUp
    },{ 
        path: '/speechRecognition', component: SpeechRecognition
    },{ 
        path: '/speechRecognitionThinking', component: SpeechRecognitionThinking
    },{
        path:'/decorateSound',component: DecorateSound
    },{
        path:'/guitarSpeakers',component: GuitarSpeakers
    },{
        path:'/soundInSpace',component: SoundInSpace
    },{
        path:'/essence',component: Essence
    },{
        path:'/melody',component: Melody
    },{
        path:'/ultrasound',component: Ultrasound
    }]
});

window.Router = router;

var vm = new Vue({
  	//el: '#app',
    data:function(){
        console.log(router);
        return {
            transitionName:'an_slide_left',
            router:router.options.routes
        }
    },
    components:{
        'nav-tool':NavTool
    },
    methods:{
        getIndex:function(obj){
            var l = this.router.length,
                i= l-1;
            for(;i>=0;i--){
                if(this.router[i].path === obj.path ){
                    return i;
                }
            }
            return i;
        }
    },
  	router:router,
    watch:{
        '$route':function(to,from) {
            if(this.getIndex(to) < this.getIndex(from)){
                this.transitionName = 'an_slide_right';
            }else{
                this.transitionName = 'an_slide_left';
            }
            //console.log(toLevel,fromLevel,this.transitionName);
        }
    }
});  

window.onload = function() {
	vm.$mount('#app');
	router.push('/rockUp');
};
