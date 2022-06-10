<template>
    <div class="wrap-searchalbum">
        <div class="searchalbum-section">
            <div class="searchalbum-list clear">
                <div class="img fl">
                    <img v-lazy=""/>
                </div>
                <div class="name fl">
                    
                </div>
                <div class="artist">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import { postJson } from "@/api/apiConfig"
import { getsearch } from "@/api/api"
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
export default defineComponent({
    name:'searchalbum',
    setup () {
        let state = reactive({
            dataList:[],
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">

</style>