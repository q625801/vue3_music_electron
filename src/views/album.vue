<template>
    <div class="wrap-albumsongsheet">
        <AlbumSongsheetInfo/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AlbumSongsheetInfo from '@/components/common/album_songsheet_info.vue'
export default defineComponent({
    name:'handtailor',
    components:{
        AlbumSongsheetInfo
    },
    setup () {
        return {
        
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-albumsongsheet{
    padding: 30px;
}
</style>