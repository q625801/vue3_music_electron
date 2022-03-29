<template>
    <div class="wrap-banner">
        <div id="certify">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="http://p1.music.126.net/Q428EX_8dpXs3d7XdStx6A==/109951167210252542.jpg" /><p>非常难得又值钱的认证证书</p></div>
                <div class="swiper-slide"><img src="http://p1.music.126.net/Q428EX_8dpXs3d7XdStx6A==/109951167210252542.jpg" /><p>深圳市优秀互联网企业认定证书</p></div>
                <div class="swiper-slide"><img src="http://p1.music.126.net/Q428EX_8dpXs3d7XdStx6A==/109951167210252542.jpg" /><p>质量管理体系认证荣誉证书</p></div>
                <div class="swiper-slide"><img src="http://p1.music.126.net/Q428EX_8dpXs3d7XdStx6A==/109951167210252542.jpg" /><p>计算机软件著作权登记证书</p></div>
                <div class="swiper-slide"><img src="http://p1.music.126.net/Q428EX_8dpXs3d7XdStx6A==/109951167210252542.jpg" /><p>增值电信业务经营许可证</p></div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent,onMounted } from 'vue'
import { postJson } from "@/api/apiConfig";
import { banner } from "@/api/api"
import "@/assets/css/swiper.min.css"
import * as Swiper from "@/assets/js/swiper.min.js"
export default defineComponent({
  name:'Index',
  components:{
    
  },
  setup(){
      onMounted(() => {
            getbanner()
            let certifySwiper = new Swiper('#certify .swiper-container', {
	watchSlidesProgress: true,
	slidesPerView: 'auto',
	centeredSlides: true,
	loop: true,
	loopedSlides: 5,
	autoplay: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		//clickable :true,
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
				var translate = slideProgress * modify * 260 + 'px';
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

		}
	}

})
      })
      function getbanner(){
          postJson(banner,{},(res) => {
              console.log(res)
          },(err) => {
              console.log(err)
          })
      }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-banner{
    width: 762px;
    height: 200px;
}
.swiper-container {
    width: 100%;
    height: 100%;
}
.swiper-slide{
    width: 500px;
}
.swiper-slide img{
    width: 500px;
    height: 200px;
}
.swiper-slide-active,.swiper-slide-duplicate-active{
   
    z-index: 999;
}
</style>
