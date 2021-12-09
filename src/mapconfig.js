import TileLayer from 'ol/layer/Tile'
import {OSM, XYZ, TileArcGISRest} from 'ol/source'
import TileWMS from 'ol/source/TileWMS';
import WMTS from 'ol/source/WMTS';

// 0 表示部署的离线瓦片地图，1表示OSM, 2表示使用Arcgis在线午夜蓝地图服务
const maptype = 0
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
    let maplayer, tian_di_tu_annotation = null
    switch (maptype) {
        case 0:
            maplayer = new TileLayer({
                // extent: [-13884991, 2870341, -7455066, 6338219],
                source: new TileWMS({
                    url: 'http://localhost:8080/geoserver/shengting/wms',
                    params: {
                        'VERSION': '1.1.1',
                        'FORMAT': 'image/png8',
                        'exceptions': 'application/vnd.ogc.se_inimage',
                        'SRS': 'EPSG:4326',
                        'LAYERS': 'shengting:zhej',
                        'TILED': true
                    },
                    serverType: 'geoserver',
                    // Countries have transparency, so do not fade tiles:
                    transition: 0,
                }),
            })
            return [tian_di_tu_satellite, maplayer]
        case 1:
            maplayer = new TileLayer({
                // extent: [-13884991, 2870341, -7455066, 6338219],
                source: new TileWMS({
                    url: 'http://localhost:8080/geoserver/gwc/service/wms',
                    params: {
                        'VERSION': '1.1.1',
                        'FORMAT': 'image/png',
                        'SRS': 'EPSG:4326',
                        'LAYERS': 'shengting:zhej',
                        'TILED': true
                    },
                    serverType: 'geoserver',
                    // Countries have transparency, so do not fade tiles:
                    transition: 0,
                }),
            })
            return [ maplayer]
        case 2:
            maplayer = new TileLayer({
                source: new OSM()
            })
            return [maplayer]
        case 3:
            return [tian_di_tu_satellite]
    }
}
const mapconfig = {
    streetmap: streetmap
}
export default mapconfig
