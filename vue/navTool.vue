<template>
	<div class='con_nav con_flex_row' id='con_nav' style='display: none'>
		<a class='flex_none'></a>
		<div class='flex_1'><span>{{ ppts[0].path.slice(1) }}</span><i></i></div>
		<ul class='con_nav_sub' style='display: none'>
			<li v-for='(item, index) in ppts'><a  v-on:click="go(index)" >{{ item.path.slice(1) }}</a></li>
		</ul>				
		<a class='flex_none'></a>
	</div>
</template>

<script>

export default {
    props:{
        router:{
            type: Array,
            default: function () {
                return ['1','2'];
            }
        }
    },
    data() {
        //var id = this.$route.params.id;
        return {
        	ppts: this.router
        }
    },
    methods:{
        init:function(){
            if(!this.Inited){
                this.Nav = new MNav(this.ppts);
                this.Inited= true;
            }
        },
        go:function(idx){
            this.Nav.go(idx);
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


