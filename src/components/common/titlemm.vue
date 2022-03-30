<template>
    <div class="wrap-title">
        <span :class="['title',arrow ? 'arrow' : '']">{{title}}</span>
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
		arrow: Boolean
	},
  	setup(props){
      	console.log(props.title,props.arrow)
		const { title,arrow } = toRefs(props)
		return{
			title,
			arrow
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
        color: #d6d6d6;
		cursor: pointer;
        line-height: 40px;
	}
	.title:hover{
		color: #ffffff;
	}
	.arrow{
		background: url("../../assets/img/arrow-title.png") center right no-repeat;
		background-size: 45px;
		padding-right: 35px;
	}
}
</style>
