<template>
    <div class="wrap-banner">
        <div class="certify" v-if="bannerArr.length > 0">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in bannerArr" :key="index">
						<img :src="item.imageUrl + '?param=540y200'" />
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
        </div>
		<LoadingCpn v-else/>
    </div>
</template>

<script>
import { defineComponent,onMounted,ref,onUpdated } from 'vue'
import { postJson } from "@/api/apiConfig";
import { banner } from "@/api/api"
import "@/assets/css/swiper.min.css"
import * as Swiper from "@/assets/js/swiper.min.js"
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
  	name:'Index',
  	components:{
		LoadingCpn
  	},
  	setup(){
		let bannerArr = ref([])
      	onMounted(() => {
            getbanner()
      	})
		onUpdated(() => {
			swiperShow(bannerArr.length)
		})
      	function getbanner(){
          	postJson(banner,{},(res) => {
				if(res.code == 200){
					bannerArr.value = res.banners
				}  
          	},(err) => {
            	console.log(err)
          	})
      	}
	  	function swiperShow(length){
			new Swiper('.certify .swiper-container', {
				watchSlidesProgress: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        		observeParents:true,//修改swiper的父元素时，自动初始化swiper 
				loop: true,
				loopedSlides: length,
				autoplay: {
					delay: 3000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable :true,
				},
				on: {
					progress: function(progress) {
						for (let i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i);
							var slideProgress = this.slides[i].progress;
							var modify = 1;
							if (Math.abs(slideProgress) > 1) {
								modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
							}
							var translate = slideProgress * modify * 375 + 'px';
							var scale = 1 - Math.abs(slideProgress) / 5;
							var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
							slide.transform('translateX(' + translate + ') scale(' + scale + ')');
							slide.css('zIndex', zIndex);
							slide.css('opacity', 1);
							if (Math.abs(slideProgress) > 3) {
								slide.css('opacity', 0);
							}
						}
					},
					setTransition: function(transition) {
						for (var i = 0; i < this.slides.length; i++) {
							var slide = this.slides.eq(i)
							slide.transition(transition);
						}
					},
					paginationRender: () => {
						const pages = document.getElementsByClassName('swiper-pagination-bullet')
						for(let i = 0;i < pages.length;i++){
							pages[i].onmouseover = function(e){
								e.target.click()
							}
						}
					}
				}
			})
	  	}
		return{
			bannerArr
		} 
  	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-banner{
    width: 762px;
    height: 248px;
	box-sizing: border-box;
	padding-top: 15px;
	.certify{
		position: relative;
		width: 100%;
		height: 200px;
		.swiper-container {
			width: 100%;
			height: 100%;
			.swiper-slide{
				width: 540px;
				height: 200px;
				border-radius: 10px;
				overflow: hidden;
				.swiper-slide img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.swiper-button-prev{
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background: url("../../../assets/img/arrow-left2.png") center no-repeat;
			background-color: rgba(0,0,0,0.4);
			background-size: 32px;
			display: none;
		}
		.swiper-button-prev:hover{
			background: url("../../../assets/img/arrow-left.png") center no-repeat;
			background-color: rgba(0,0,0,0.4);
			background-size: 32px;
		}
		.swiper-button-next{
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background: url("../../../assets/img/arrow-right2.png") center no-repeat;
			background-color: rgba(0,0,0,0.4);
			background-size: 32px;
			display: none;
		}
		.swiper-button-next:hover{
			background: url("../../../assets/img/arrow-right.png") center no-repeat;
			background-color: rgba(0,0,0,0.4);
			background-size: 32px;
		}
		.swiper-pagination{
			bottom:-25px;
			left: 0;
    		right: 0;
		}
	}
	.certify:hover{
		.swiper-button-next,.swiper-button-prev{
			display: block;
		}
	}
}
</style>
<style>
.certify .swiper-pagination .swiper-pagination-bullet{
	width: 6px;
	height: 6px;
	margin-right:10px;
	background-color:#e6e6e6;
}
.certify .swiper-pagination .swiper-pagination-bullet:last-child{
	margin-right: 0;
}
.certify .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active{
	background-color:rgb(236,65,65);
}
</style>