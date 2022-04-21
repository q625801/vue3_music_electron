<template>
    <div class="wrap-info">
        <div class="info-section clear">
            <div class="info-img clear fl">
                <img v-lazy="'https://p2.music.126.net/iHbKrvHFfHb1y3Osu9EnPQ==/109951166726930602.jpg?param=300y300'"/>
            </div>
            <div class="info-topblk fl">
                <div class="topblk-tagtitle clear">
                    <span class="tag fl">歌单</span>
                    <span class="title fl">测试测试测试测试</span>
                </div>
                <div class="topblk-userinfo clear">
                    <div class="topblk-userinfo-img fl">
                        <img v-lazy="'http://p2.music.126.net/gnv74qVDZlI7jcA_TpHaVw==/109951164840438649.jpg' + '?param=100y100'"/>
                    </div>
                    <div class="topblk-userinfo-name fl">
                        三横一竖
                    </div>
                    <div class="topblk-userinfo-createtime fl">
                        2018-10-10创建
                    </div>
                </div>
                <div class="topblk-lable">
                    <div class="topblk-list">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:'handtailor',
    setup () {
        return {
        
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-info{
    .info-section{
        .info-img{
            width: 185px;
            height: 185px;
            border-radius: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .info-topblk{
            padding-left: 20px;
            width: calc(100% - 185px);
            box-sizing: border-box;
            padding-top: 5px;
            .topblk-tagtitle{
                span{
                    display: block;
                }
                .tag{
                    color:$musicNameOn;
                    font-size: 12px;
                    border:1px solid $musicNameOn;
                    padding: 3px 4px;
                    border-radius: 3px;
                }
                .title{
                    font-weight: bold;
                    color: $font-color;
                    font-size: 22px;
                    padding-left: 8px;
                }
            }
            .topblk-userinfo{
                padding-top: 10px;
                .topblk-userinfo-img{
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .topblk-userinfo-name{
                    font-size: 12px;
                    color: $albumsongsheetinfo_color;
                    cursor: pointer;
                    line-height:25px;
                    padding-left: 8px;
                }
                .topblk-userinfo-name:hover{
                    color: $albumsongsheetinfo_hovercolor;
                }
                .topblk-userinfo-createtime{
                    font-size: 12px;
                    color: $font-authorcolor;
                    line-height:25px;
                    padding-left: 8px;
                }
            }
        }
    }
}
</style>