import TileLayer from 'ol/layer/Tile'
import {OSM, XYZ, TileArcGISRest} from 'ol/source'
import TileWMS from 'ol/source/TileWMS';
import Projection from 'ol/proj/Projection'
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
// 0 表示部署的离线瓦片地图，1表示OSM, 2表示使用Arcgis在线午夜蓝地图服务
const maptype = 1
//天地图卫星影像
const tian_di_tu_satellite = new TileLayer({
    title: "天地图卫星影像",
    source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=248a86d3c2b032cb39f7aa036b9b797c'
    })
});
//天地图注记
const tian_di_tu_annotation = new TileLayer({
    title: "天地图文字标注",
    source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=248a86d3c2b032cb39f7aa036b9b797c'
    })
});

const streetmap = function () {
    let maplayer
    switch (maptype) {
        case 0:
            return [tian_di_tu_satellite]
        case 1:
            //准备加载wmts服务
            var gridNames = ['SCSG2000:0', 'SCSG2000:1', 'SCSG2000:2', 'SCSG2000:3', 'SCSG2000:4', 'SCSG2000:5', 'SCSG2000:6', 'SCSG2000:7', 'SCSG2000:8', 'SCSG2000:9', 'SCSG2000:10'];
            //切片大小
            var resolutions = [0.143984375,0.0719921875,0.03599609375,0.017998046875,0.0089990234375,0.00449951171875,0.002249755859375,0.0011248779296875,5.624389648437E-4,2.812194824219E-4,1.406097412109E-4];
            //设置地图投影
            var projection = new Projection({
                code: 'EPSG:4490',//投影编码
                units: 'degrees',
                axisOrientation: 'neu'
            });
            //定义一个瓦片图层
            maplayer =new TileLayer({
                source: new WMTS({
                    //服务地址
                    url: 'http://192.168.1.189:8080/geoserver/gwc/service/wmts',
                    layer: 'shengting:zhej',
                    //切片集
                    matrixSet: 'SCSG2000',
                    format: 'image/png',
                    projection: projection,
                    //切片信息
                    tileGrid: new WMTSTileGrid({
                        tileSize: [256, 256],
                        EXTENT: [73.62, 16.7, 134.77, 53.56],//范围
                        origin: [73.62, 53.56],
                        resolutions: resolutions,
                        matrixIds: gridNames,
                    }),
                    wrapX: false
                }),

            })
            return [ tian_di_tu_satellite,maplayer]
    }
}
const mapconfig = {
    streetmap: streetmap
}
export default mapconfig
