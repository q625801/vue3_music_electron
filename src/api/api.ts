/*
 * @Author: 王誉
 * @Date: 2022-03-25
 * @Last Modified by: 王誉
 * @Last Modified time: 2022-03-25 17:42:41
 */
// const api = 'https://netease-cloud-music-api-orcin-seven.vercel.app'; vercel部署服务 115.236.44.178 116.25.146.177  https://netease-cloud-music-api-q625801.vercel.app
const api = process.env.NODE_ENV === 'development' ? '/api' : 'https://yucloud.website/wyy';

// ===================首页
export const banner:string = api + '/banner' // 测试  + (api.indexOf('netease') > -1 ? '?realIP=116.25.146.177' : '')

// ===================推荐歌单
export const personalized:string = api + '/personalized'
// ===================推荐新歌曲
export const newsong:string = api + '/personalized/newsong'

// ===================歌单详情
export const sddetail:string = api + '/playlist/detail'
// ===================歌单收藏者
export const subscribers:string = api + '/playlist/subscribers'
// ===================获取歌单全部歌曲
export const sdsongAll:string = api + '/playlist/track/all'

// ===================相关歌单推荐
export const related:string = api + '/related/playlist'

// ===================音乐url
export const mp3url:string = api + '/song/url'
// ===================获取歌曲详情
export const songsdetail:string = api + '/song/detail'
// ===================获取歌曲歌词
export const songlyric:string = api + '/lyric'

// ===================歌单评论
export const songdetaiilcomment:string = api + '/comment/playlist'

// ===================用户详情
export const userdetail:string = api + '/user/detail'
// ===================用户歌单
export const userplaylist:string = api + '/user/playlist'

// ===================专辑
export const getAlbum:string = api + '/album'
// ===================专辑动态信息 
export const getAlbumDetailDynamic:string = api + '/album/detail/dynamic'
// ===================歌手专辑
export const getArtistAlbum:string = api + '/artist/album'
// ===================专辑评论
export const getCommentAlbum:string = api + '/comment/album'

// ===================热门播客
export const getPopularPodcast:string = api + '/personalized/djprogram'

// ===================独家放送
export const getPrivateContent:string = api + '/personalized/privatecontent'

// ===================歌手热门歌曲
export const getartists:string = api + '/artists'
// ===================歌手描述
export const getartistsdesc:string = api + '/artist/desc'
// ===================相似歌手
export const getartistssimi:string = api + '/simi/artist'

// ===================榜单分类
export const gettoplist:string = api + '/toplist'

// ===================歌单分类
export const getPlaylistCatlist:string = api + '/playlist/catlist'
// ===================精品歌单标签列表
export const gethighqualitytags:string = api + '/playlist/highquality/tags'
// ===================获取精品歌单
export const gethighquality:string = api + '/top/playlist/highquality'
// ===================热门歌单分类
export const getplaylisthot:string = api + '/playlist/hot'
// ===================获取热门歌单
export const gettopplaylist:string = api + '/top/playlist'

// ===================歌手列表
export const getartistlist:string = api + '/artist/list'

// ===================新歌速递
export const gettopsong:string = api + '/top/song'
// ===================本周新碟
export const gettopalbum:string = api + '/top/album'

// ===================默认搜索关键词
export const getsearchdefault:string = api + '/search/default'
// ===================热搜榜
export const hotsearch:string = api + '/search/hot/detail'
// ===================搜索建议
export const hotsearchsuggest:string = api + '/search/suggest'
// ===================搜索你可能感兴趣
export const hotsearchmultimatch:string = api + '/search/multimatch'
// ===================搜索你可能感兴趣
export const getsearch:string = api + '/cloudsearch'

