<template>
    <div class="wrap-popularpodcat">
        <Titlemm :title="'热门播客'" :arrow="true" :href="'xxx'"/>
        <div class="popularpodcat-section" v-if="popularpodcat.length > 0">
            <div class="popularpodcat-list clear">
                <div class="popularpodcat-left fl">
                    <div class="popularpodcat-img">
                        <img src=""/>
                    </div>
                </div>
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {postJson} from "@/api/apiConfig";
import { getPopularPodcast } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
export default defineComponent({
    name:'loading',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup(){
        let state = reactive<any>({
            popularpodcat:[],
        })
        onMounted(() => {
           getData() 
        })
        function getData(){
            postJson(getPopularPodcast,{},(res:any) =>{
                if(res.code == 200){
                    state.popularpodcat = res.result
                }
            },(err:any) => {

            })
        }
        return{
			...toRefs(state),
		} 
    }
})
</script>
<style scoped lang="scss">

</style>