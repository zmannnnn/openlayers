<template>
  <div class="openlayer">
    <div style="top: 126px; left: 560px; position: absolute;z-index: 1" class="navContianer" ref="info">全省</div>
    <div id="map" ref="rootmap">
      <!-- 弹出窗体 -->
      <MapPopup :position="mapPopupData.position" :title="mapPopupData.title" :offset="mapPopupData.offset"
                :mapShow="mapPopupData.show" @close="mapPopupClose" :className="'map-popup'">{{ popupText }}
      </MapPopup>
      <!-- 点标注，如果只想用文字标注label，可以把图片设置成一个像素的透明图片，如果只想用图标就label设置为null，单独的懒得封装了,-->
      <MapIconMark :position="mapIconData.position" :label="mapIconData.label" :icon='mapIconData.icon'
                   :elementName="mapIconData.elementName" :className="mapIconData.className"></MapIconMark>
      <!--GeoJSON文件数据-->
      <MapFeature :geoFeature="geoFeature" @switchLayerChangeName="switchLayerChangeName"></MapFeature>
      <!-- 折线 -->
      <!--      <MapLineString :pointList="mapLineStringData.pointlist" :lineColor="mapLineStringData.lineColor" :lineWidth="mapLineStringData.lineWidth" :lineDash="mapLineStringData.lineDash" :elementName="mapLineStringData.elementName" :className="mapLineStringData.className"></MapLineString>-->
      <!-- 多边形 -->
      <!--      <MapPolygon :pointList="mapPolygonData.pointlist" :fillColor="mapPolygonData.fillColor" :lineColor="mapPolygonData.lineColor" :lineWidth="mapPolygonData.lineWidth" :lineDash="mapPolygonData.lineDash" :elementName="mapPolygonData.elementName" :className="mapPolygonData.className"></MapPolygon>-->
      <!-- 圆形 -->
      <!--      <MapCircle :position="mapCircleData.position" :radius="mapCircleData.radius" :fillColor="mapCircleData.fillColor" :lineColor="mapCircleData.lineColor" :lineWidth="mapCircleData.lineWidth" :lineDash="mapCircleData.lineDash" :elementName="mapCircleData.elementName" :className="mapCircleData.className"></MapCircle>-->
      <!-- 自定义覆盖物 -->
      <!--      <MapOverlay :position="mapOverlayData.position" :className="mapOverlayData.className"><div><img :src="mapOverlayData.img" alt=""></div></MapOverlay>-->
      <!-- 海量点 -->
      <!--      <MapPointCollection :pointList="mapPointCollectionData.pointlist" :distance="mapPointCollectionData.distance" :fillColor="mapPointCollectionData.fillColor" :fontColor="mapPointCollectionData.fontColor" :zIndex='mapPointCollectionData.zIndex' :offset="mapPointCollectionData.offset"></MapPointCollection>-->
      <!-- 循环使用的方法 -->
      <!--      <template v-for="(item,index) of pointlist">-->
      <!--        <MapIconMark :position="item" :icon='iconImg' :key="index" :label="'标记点' + String(index)"></MapIconMark>-->
      <!--      </template>-->
      <!-- 路径示例 -->
      <!--      <MapLineString :pointList="pointlist" :lineColor="'red'" :lineWidth="5" :lineDash="null" :elementName="'轨迹'" :className="'map-road'"></MapLineString>-->
    </div>
    <div class="click-center">{{ clickCenter }}</div>
  </div>
</template>
<script>
// @ is an alias to /src
import 'ol/ol.css'
import {Map, View} from 'ol'
import * as olControl from 'ol/control'
import MapPopup from '@/components/MapPopup'
import MapIconMark from '@/components/MapIconMark'
import MapFeature from '@/components/MapFeature'
import MapLineString from '@/components/MapLineString'
import MapPolygon from '@/components/MapPolygon'
import MapCircle from '@/components/MapCircle'
import MapOverlay from '@/components/MapOverlay'
import MapPointCollection from '@/components/MapPointCollection'
import mapconfig from '@/mapconfig'
import zhejiang_geoJson from "@/components/geojson/zhejiang_full"
import hangzhou_geoJson from "@/components/geojson/hangzhou_full"

const cityNames = ["浙江省", "杭州市"];

export default {
  name: 'openlayer',
  data() {
    return {
      geoFeature: zhejiang_geoJson,
      // 弹出窗体图层数据
      mapPopupData: {
        position: [120.06919853061095, 30.52312915135971], // 弹窗中心点 Array[array]， 必须
        title: '弹窗标题', // 弹窗标题 String，非必须，默认为 ' '
        show: false, // 弹窗显隐 Boolean，必须，默认为 true
        offset: [0, 0], // 弹窗偏移 Array[number]，必须，默认为 [0, 0]
        className: 'map-popup' // 图层的class String，非必须，默认为 'map-popup'
      },
      // 点标注图层数据
      mapIconData: {
        position: [120.07228950670621, 30.524837614865916], // 标注中心点 Array， 必须
        icon: require('@/assets/mark.png'), // 文件地址 String[url] ，必须 ，默认为 null，
        label: '这个是中心位置', // 标注点名称 String， 非必须， 默认为 null
        elementName: '点标识ID', // 标注点识别名称 String， 可以通过 feature.get('name') 获取到， 非必须， 默认为 'el-mapIconMark'
        className: 'map-icon-mark' // 图层的class String， 非必须，默认为 'map-icon-mark'
      },
      // 折线图层数据
      mapLineStringData: {
        pointlist: [
          [120.07167206985183, 30.5232403088372],
          [120.07770027654792, 30.523326106333492],
          [120.07195557462218, 30.518950434022546],
          [120.07445489299245, 30.52480331540012],
          [120.07624544943681, 30.519340980469103],
          [120.07167206985183, 30.5232403088372]
        ], // 线条所有的点数组 Array[array]， 必须
        elementName: '地图线条', //弹窗标识别名 String， 非必须，默认为 'el-mapLineString'
        lineColor: '#409eff', // 线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2, // 线条宽度 Number，非必须，默认为 2
        lineDash: [10], // 虚线 Array[number]， 是否使用虚线，默认为 null
        className: 'map-line-string', // 图层的class String， 非必须， 默认 "map-line-string"
        zIndex: 300 // 图层z轴高度， 非必须， 默认 300
      },
      // 多边形图层数据
      mapPolygonData: {
        pointlist: [
          [120.06763153723739, 30.523766343504477],
          [120.07099169050478, 30.523803784736963],
          [120.06770308108405, 30.521172327154904],
          [120.0693165842837, 30.524608688036995],
          [120.07017607779578, 30.521397632712155]
        ],
        fillColor: 'rgba(255,0,0,0.8)', // 多边形填充颜色，非必须，默认为 'rgba(0,0,0,0.8)'
        elementName: '地图多边形', // 多边形识别名称 String, 非必须，默认为 'el-mapPolygon'
        lineColor: 'rgba(0,0,0,0.5)', // 多边形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2,// 多边形线条宽度 Number，非必须，默认为 2
        lineDash: null, // 多边形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-polygon' // 图层的class String, 非必须，默认为 'map-polygon'
      },
      // 自定义图层数据
      mapOverlayData: {
        position: [120.07439169364486, 30.525032349827814], // 标注中心点 Array, 必须
        className: 'map-overlay', // 设置自定义图层的class String ，非必须， 默认 'map-overlay'
        offset: [200, 200], // 设置自定义图层的偏移量 Array[number] ，非必须,默认[0, 0]
        img: require('@/assets/hot.gif') // slot
      },
      // 海量点图层数据
      mapPointCollectionData: {
        pointlist: [
          [120.06923493949402, 30.5240832382725],
          [120.0682861161323, 30.523565093192584],
          [120.06995237746318, 30.523445526204714],
          [120.0685676099809, 30.522193726398406],
          [120.06969098007714, 30.522269498868212]
        ],
        distance: 100, // 收起点的间距  number，必须，默认为 40
        zIndex: 500, // 图层z轴高度， 非必须， 默认 400
        offset: [0, 2], // 文字偏移距离 [x,y]， 非必须， 默认 [0,0]
        fontColor: '#ffeb00', // 文字的颜色 string （色彩标识，支持rgba），默认'#fff'(如果去掉文字那么直接rgba透明度设置为0)
        fillColor: '#06d073', // 文字的背景颜色 string（色彩标识，支持rgba），默认'#f00'(如果去不要背景颜色那么直接rgba透明度设置为0)
        bgImg: require('@/assets/mark.png') // 设置背景图，如果设置了此那么文字背景可以不设置
      },
      mapCircleData: {
        position: [120.07446296239873, 30.524805291947303], // 圆中心点 Array， 必须
        radius: 150, // 圆半径 number ，默认为 100
        fillColor: 'rgba(255,255,255,0.5)', // 圆形填充颜色，非必须，默认为 'rgba(255,255,255,0.5)'
        elementName: '圆形叠加', // 圆形识别名称 String, 非必须，默认为 'el-mapCircle'
        lineColor: '#409eff', // 圆形线条颜色 String，非必须，默认为 '#409eff'
        lineWidth: 2,// 圆形线条宽度 Number，非必须，默认为 2
        lineDash: [20, 5], // 圆形虚线 Array[number], 是否使用虚线 ，默认为 null
        className: 'map-circle' // 图层的class String, 非必须，默认为 'map-circle'
      },
      mapData: null,
      mapCenter: [120.07228950670621, 30.524837614865916],
      mapZoom: 8,
      clickCenter: [0, 0],
      popupText: '弹窗初始化文字',
      iconImg: require('@/assets/mark.png'), // 文件地址 String[url]
      pointlist: [
        [120.07871607950588, 30.52222782549443],
        [120.07844961562236, 30.52315316542209],
        [120.07696995439895, 30.524754342150676],
        [120.08107178741518, 30.524136654355292]
      ]
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const mapContainer = this.$refs.rootmap
      // 控件展示
      const FullScreen = new olControl.FullScreen() // 全屏控件
      const ScaleLine = new olControl.ScaleLine() // 比例尺控件
      // const MousePosition = new olControl.MousePosition() // 鼠标经过位置坐标指示
      // const ZoomSlider = new olControl.ZoomSlider() // 滑动缩放
      // const ZoomToExtent = new olControl.ZoomToExtent() // 特定程度上更改地图视图
      const Zoom = new olControl.Zoom() // 放大缩小按钮
      const map = new Map({
        layers: mapconfig.streetmap(),
        controls: [FullScreen, ScaleLine, Zoom],
        target: mapContainer,
        view: new View({
          projection: "EPSG:4326",
          center: this.mapCenter,
          zoom: this.mapZoom
        })
      })

      // 添加鼠标点击事件
      map.on('click', this.mapClick)
      // 添加鼠标经过事件
      map.on('pointermove', this.mapPointerMove)
      // 保存地图
      this.mapData = map
    },
    // 鼠标点击地图事件
    mapClick(evt) {
      // 获取点击中心点
      this.clickCenter = evt.coordinate
      // 移动地图
      this.mapData.getView().animate({
        center: evt.coordinate,
      })
      // this.mapOverlayData.position = [ 120.07446564886402, 30.524799941013985 ]
      // 这个做了一个点击改变中心点的操作
      setTimeout(() => {
        this.mapIconData.position = [120.07438338675577, 30.522278765283236]
        this.mapData.getView().animate({
          center: [120.07438338675577, 30.522278765283236],
        })
      }, 5000)
    },
    // 鼠标划过地图事件
    mapPointerMove(evt) {
      if (evt.dragging) {
        return
      }
      // 获取地图上的重叠像素（用来获得叠加图层）
      const pixel = this.mapData.getEventPixel(evt.originalEvent)
      const hit = this.mapData.hasFeatureAtPixel(pixel)
      // 获取地图上的feature
      const feature = this.mapData.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature
      })
      // 获取叠加图层对像素叠加图层（hit）设置鼠标样式（给标注点添加鼠标经过样式）
      this.mapData.getTarget().style.cursor = hit ? 'pointer' : ''
      // 鼠标移动到点标注的时候显示弹出窗体，feature.get('name') 可以获取标注标题，如果设置了的话
      if (feature && feature.get('name') === this.mapIconData.elementName) {
        // 显示弹出窗体
        this.mapPopupData.show = true
        // 弹出窗体的内容
        this.popupText = `当前坐标${this.mapIconData.position}`
        // 弹出窗体的位置
        this.mapPopupData.position = this.mapIconData.position
      }
    },
    // 关闭弹出窗体事件
    mapPopupClose(e) {
      this.mapPopupData.show = false
      this.popupText = ''
    },
    /**
     * 选中图层，修改名字
     * @param checkName 城市名称
     */
    switchLayerChangeName(checkName) {
      this.$refs.info.innerHTML = checkName
    },
    /**
     * 点击图层，修改图层
     * @param checkName 城市名称
     */
    switchLayer(checkName,center) {
      //todo
      if (checkName == cityNames[1]) {
        this.geoFeature = hangzhou_geoJson
        this.mapData.getView().animate({
          center: center,
          zoom:9
        })
      } else {
        this.geoFeature = zhejiang_geoJson
        this.mapData.getView().animate({
          center: this.mapCenter,
          zoom:this.mapZoom
        })
      }

    }
  },
  components: {
    MapPopup,
    MapIconMark,
    MapFeature,
    // MapLineString,
    // MapPolygon,
    // MapCircle,
    // MapOverlay,
    //     MapPointCollection
  },
}
</script>
<style lang="scss" scoped>
.openlayer {
  height: 100vh;
  width: 100vw;
}

#map {
  height: 100%;
  width: 100vw;
  background: #f2f2f2;
}

.click-center {
  position: absolute;
  top: 10px;
  right: 60px;
  padding: 10px;
  z-index: 2;
  background: rgba($color: #000000, $alpha: .5);
  color: #fff;
  border-radius: 4px;
}

.navContianer {
  position: fixed;
  background: rgba(29, 61, 95, .8);
  top: 12.7% !important;
  //left: calc(100vw * 610/1920) !important;
  color: #00b4ff !important;
  padding: 10px 20px;
  font-size: calc(100vw * 22 / 1920);
  /* border: 1px solid #0693ec; */
  border-radius: 4px;
  height: 30px;
}
</style>
