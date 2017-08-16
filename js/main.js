import Vue from 'vue';
import VueRouter from 'vue-router';

import NavTool from '../vue/navTool.vue';
import Music from '../vue/music.vue';
import SpeechRecognition from '../vue/speechRecognition.vue';
import Ultrasound from '../vue/ultrasound.vue';

Vue.use(VueRouter);

window.LOCK_ANIMATION =false;

/*
const routeArr = [{ 
        path: '/music', component: Music
    },{
        path:'/speechRecognition',component:SpeechRecognition
    },{
        path:'/ultrasound',component:Ultrasound
    }];


for(var i=0,l=routeArr.length;i<l;i++){
    routeArr[i].Name = routeArr[i].slice(1);
}
*/

const router = new VueRouter({
  	routes:[{ 
        path: '/music', component: Music
    },{
        path:'/speechRecognition',component: SpeechRecognition
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
            transitionName:'an_fade',
            router:router.options.routes
        }
    },
    components:{
        'nav-tool':NavTool
    },
  	router:router,
    watch:{
        '$route':function(to,from) {
            //console.log(toLevel,fromLevel,this.transitionName);
        }
    }
});  

window.onload = function() {
	vm.$mount('#app');
	router.push('/music');
};
