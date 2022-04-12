<template>
    <div class="wrap-title">
        <span :class="['title',arrow ? 'arrow' : '']" @click="goUrl(href)">{{title}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent,toRefs } from 'vue'
export default defineComponent({
  	name:'titlemm',
  	components:{
		
  	},
	props:{
		title: String,
		arrow: Boolean,
		href: String,
	},
  	setup(props){
		const { title,arrow,href } = toRefs(props)
		function goUrl(href:string) {
			console.log(href)
		}
		return{
			title,
			arrow,
			href,
			goUrl
		} 
  	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-title{
	margin-bottom: 5px;
	.title{
		font-size: 20px;
        font-weight: bold;
        color: $font-color;
		cursor: pointer;
        line-height: 40px;
	}
	.title:hover{
		color: $font-hovercolor;
	}
	.arrow{
		background: url("../../assets/img/arrow-title.png") center right no-repeat;
		background-size: 45px;
		padding-right: 35px;
	}
}
</style>
