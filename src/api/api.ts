/*
 * @Author: 王誉
 * @Date: 2022-03-25
 * @Last Modified by: 王誉
 * @Last Modified time: 2022-03-25 17:42:41
 */
// const api = 'https://netease-cloud-music-api-orcin-seven.vercel.app'; vercel部署服务 115.236.44.178 116.25.146.177  https://netease-cloud-music-api-q625801.vercel.app
const api = process.env.NODE_ENV === 'development' ? '/api' : 'https://netease-cloud-music-api-orcin-seven.vercel.app';

// ===================首页
export const banner:string = api + '/banner' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '') // 测试

// ===================推荐歌单
export const personalized:string = api + '/personalized' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================推荐新歌曲
export const newsong:string = api + '/personalized/newsong' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单详情
export const sddetail:string = api + '/playlist/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================歌单收藏者
export const subscribers:string = api + '/playlist/subscribers' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌单全部歌曲
export const sdsongAll:string = api + '/playlist/track/all' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================相关歌单推荐
export const related:string = api + '/related/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================音乐url
export const mp3url:string = api + '/song/url' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌曲详情
export const songsdetail:string = api + '/song/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取歌曲歌词
export const songlyric:string = api + '/lyric' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单评论
export const songdetaiilcomment:string = api + '/comment/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================用户详情
export const userdetail:string = api + '/user/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================用户歌单
export const userplaylist:string = api + '/user/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================专辑
export const getAlbum:string = api + '/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================专辑动态信息 
export const getAlbumDetailDynamic:string = api + '/album/detail/dynamic' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================歌手专辑
export const getArtistAlbum:string = api + '/artist/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================专辑评论
export const getCommentAlbum:string = api + '/comment/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================热门播客
export const getPopularPodcast:string = api + '/personalized/djprogram' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================独家放送
export const getPrivateContent:string = api + '/personalized/privatecontent' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌手热门歌曲
export const getartists:string = api + '/artists' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================歌手描述
export const getartistsdesc:string = api + '/artist/desc' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================相似歌手
export const getartistssimi:string = api + '/simi/artist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================榜单分类
export const gettoplist:string = api + '/toplist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌单分类
export const getPlaylistCatlist:string = api + '/playlist/catlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================精品歌单标签列表
export const gethighqualitytags:string = api + '/playlist/highquality/tags' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取精品歌单
export const gethighquality:string = api + '/top/playlist/highquality' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================热门歌单分类
export const getplaylisthot:string = api + '/playlist/hot' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================获取热门歌单
export const gettopplaylist:string = api + '/top/playlist' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================歌手列表
export const getartistlist:string = api + '/artist/list' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================新歌速递
export const gettopsong:string = api + '/top/song' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================本周新碟
export const gettopalbum:string = api + '/top/album' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================默认搜索关键词
export const getsearchdefault:string = api + '/search/default' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================热搜榜
export const hotsearch:string = api + '/search/hot/detail' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================搜索建议
export const hotsearchsuggest:string = api + '/search/suggest' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================搜索你可能感兴趣
export const hotsearchmultimatch:string = api + '/search/multimatch' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')
// ===================搜索你可能感兴趣
export const getsearch:string = api + '/search' + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

