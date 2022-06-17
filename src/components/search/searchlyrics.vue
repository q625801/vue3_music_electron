<template>
    <div class="wrap-searchlyrics">
        
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import { postJson } from "@/api/apiConfig"
import { getsearch } from "@/api/api"
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
export default defineComponent({
    name:'searchlyrics',
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
.wrap-searchlyrics{
    
}
</style>