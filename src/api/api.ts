/*
 * @Author: 王誉
 * @Date: 2022-03-25
 * @Last Modified by: 王誉
 * @Last Modified time: 2022-03-25 17:42:41
 */
const api = 'https://netease-cloud-music-api-orcin-seven.vercel.app';
// const api = process.env.NODE_ENV === 'development' ? '/api' : 'https://netease-cloud-music-api-orcin-seven.vercel.app';

// ===================首页
export const banner:string = api + '/banner?realIP=116.25.146.177' // 测试

// ===================导航
export const hotsearch:string = api + '/search/hot?realIP=116.25.146.177'

// ===================推荐歌单
export const personalized:string = api + '/personalized?realIP=116.25.146.177'
// ===================推荐新歌曲
export const newsong:string = api + '/personalized/newsong?realIP=116.25.146.177'

// ===================歌单详情
export const sddetail = api + '/playlist/detail?realIP=116.25.146.177'
// ===================歌单收藏者
export const subscribers = api + '/playlist/subscribers?realIP=116.25.146.177'
// ===================获取歌单全部歌曲
export const sdsongAll = api + '/playlist/track/all?realIP=116.25.146.177'

// ===================相关歌单推荐
export const related = api + '/related/playlist?realIP=116.25.146.177'

// ===================音乐url
export const mp3url = api + '/song/url?realIP=116.25.146.177'
// ===================获取歌曲详情
export const songsdetail = api + '/song/detail?realIP=116.25.146.177'
// ===================获取歌曲歌词
export const songlyric = api + '/lyric?realIP=116.25.146.177'

// ===================歌单评论
export const songdetaiilcomment = api + '/comment/playlist?realIP=116.25.146.177'

// ===================用户详情
export const userdetail = api + '/user/detail?realIP=116.25.146.177'

// ===================专辑
export const getAlbum = api + '/album?realIP=116.25.146.177'
// ===================专辑动态信息 
export const getAlbumDetailDynamic = api + '/album/detail/dynamic?realIP=116.25.146.177'
// ===================歌手专辑
export const getArtistAlbum = api + '/artist/album?realIP=116.25.146.177'
// ===================专辑评论
export const getCommentAlbum = api + '/comment/album?realIP=116.25.146.177'

// ===================歌单分类信息
export const getPlaylistCatlist = api + '/top/playlist/highquality?realIP=116.25.146.177'
