/*
 * @Author: 王誉
 * @Date: 2022-03-25
 * @Last Modified by: 王誉
 * @Last Modified time: 2022-03-25 17:42:41
 */
// const api = 'https://netease-cloud-music-api-orcin-seven.vercel.app';
const api = process.env.NODE_ENV === 'development' ? '/api' : 'https://netease-cloud-music-api-orcin-seven.vercel.app';

// ===================首页
export const banner:string = api + '/banner' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '') // 测试

// ===================导航
export const hotsearch:string = api + '/search/hot' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================推荐歌单
export const personalized:string = api + '/personalized' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================推荐新歌曲
export const newsong:string = api + '/personalized/newsong' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单详情
export const sddetail = api + '/playlist/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================歌单收藏者
export const subscribers = api + '/playlist/subscribers' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌单全部歌曲
export const sdsongAll = api + '/playlist/track/all' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================相关歌单推荐
export const related = api + '/related/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================音乐url
export const mp3url = api + '/song/url' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌曲详情
export const songsdetail = api + '/song/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌曲歌词
export const songlyric = api + '/lyric' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单评论
export const songdetaiilcomment = api + '/comment/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================用户详情
export const userdetail = api + '/user/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================专辑
export const getAlbum = api + '/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================专辑动态信息 
export const getAlbumDetailDynamic = api + '/album/detail/dynamic' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================歌手专辑
export const getArtistAlbum = api + '/artist/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================专辑评论
export const getCommentAlbum = api + '/comment/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单分类信息
export const getPlaylistCatlist = api + '/top/playlist/highquality' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================热门播客
export const getPopularPodcast = api + '/personalized/djprogram' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
