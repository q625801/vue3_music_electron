<template>
    <div class="wrap-search">
        <Titlemm :title="'搜索 ' + keywords" :arrow="false"/>
        <SearchYWant :keywords="keywords"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,watch } from 'vue'
import Titlemm from "@/components/common/titlemm.vue"
import { useRouter } from 'vue-router'
import SearchYWant from "@/components/search/searchywant.vue"
export default defineComponent({
    name:'search',
    components:{
        Titlemm,
        SearchYWant
    },
    setup () {
        const router = useRouter()
        let state = reactive({
            keywords: router.currentRoute.value.query.keywords,
            type: router.currentRoute.value.query.type,
        })
        watch(() => router.currentRoute.value.query,(newValue) => {
            state.keywords = newValue.keywords
            state.type = newValue.type
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-search{
    padding: 15px 30px;
}
</style>