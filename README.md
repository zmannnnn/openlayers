# openlayer + vue

## 效果展示

See ![效果展示.jpg](https://upload-images.jianshu.io/upload_images/24062394-81004090b212b22f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 使用
```
<template>
  <div class="openlayer">
    <!--地图容器-->
    <div id="map" ref="rootmap">
      <!-- 弹出窗体 -->
      <MapPopup :position="mapPopupData.position" :title="mapPopupData.title" :offset="mapPopupData.offset" :mapShow="mapPopupData.show" @close="mapPopupClose" :className="'map-popup'"> 自定义弹出窗体的内 <slot> {{ popupText }} </MapPopup>
      <!-- 点标注，如果只想用文字标注label，可以把图片设置成一个像素的透明图片，如果只想用图标就label设置为null，单独的懒得封装了,-->
      <MapIconMark :position="mapIconData.position" :label="mapIconData.label" :icon='mapIconData.icon' :elementName="mapIconData.elementName" :className="mapIconData.className"></MapIconMark>
      <!-- 折线 -->
      <MapLineString :pointList="mapLineStringData.pointlist" :lineColor="mapLineStringData.lineColor" :lineWidth="mapLineStringData.lineWidth" :lineDash="mapLineStringData.lineDash" :elementName="mapLineStringData.elementName" :className="mapLineStringData.className"></MapLineString>
      <!-- 多边形 -->
      <MapPolygon :pointList="mapPolygonData.pointlist" :fillColor="mapPolygonData.fillColor" :lineColor="mapPolygonData.lineColor" :lineWidth="mapPolygonData.lineWidth" :lineDash="mapPolygonData.lineDash" :elementName="mapPolygonData.elementName" :className="mapPolygonData.className"></MapPolygon>
      <!-- 圆形 -->
      <MapCircle :position="mapCircleData.position" :radius="mapCircleData.radius" :fillColor="mapCircleData.fillColor" :lineColor="mapCircleData.lineColor" :lineWidth="mapCircleData.lineWidth" :lineDash="mapCircleData.lineDash" :elementName="mapCircleData.elementName" :className="mapCircleData.className"></MapCircle>
      <!-- 自定义覆盖物 -->
      <MapOverlay :position="mapOverlayData.position" :className="mapOverlayData.className"><div><img :src="mapOverlayData.img" alt=""></div></MapOverlay>
      <!-- 海量点 -->
      <MapPointCollection :pointList="mapPointCollectionData.pointlist" :distance="mapPointCollectionData.distance" :fillColor="mapPointCollectionData.fillColor" :fontColor="mapPointCollectionData.fontColor" :zIndex='mapPointCollectionData.zIndex' :offset="mapPointCollectionData.offset"></MapPointCollection>
      <!-- 循环使用的方法 -->
      <template v-for="(item,index) of pointlist">
        <MapIconMark :position="item" :icon='iconImg' :key="index" :label="'标记点' + String(index)"></MapIconMark>
      </template>
      <!-- 路径示例 -->
      <MapLineString :pointList="pointlist" :lineColor="'red'" :lineWidth="5" :lineDash="null" :elementName="'轨迹'" :className="'map-road'"></MapLineString>
    </div>
    <div class="click-center">{{clickCenter}}</div>
  </div>
</template>
<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import * as olControl from 'ol/control'
// 引入组件
import MapPopup from '@/components/MapPopup'
import MapIconMark from '@/components/MapIconMark'
import MapLineString from '@/components/MapLineString'
import MapPolygon from '@/components/MapPolygon'
import MapCircle from '@/components/MapCircle'
import MapOverlay from '@/components/MapOverlay'
import MapPointCollection from '@/components/MapPointCollection'
import mapconfig from '@/mapconfig'
export default {
  name:'openlayer',
  components: {
    // 引入组件
    MapPopup,
    MapIconMark,
    MapLineString,
    MapPolygon,
    MapCircle,
    MapOverlay,
    MapPointCollection
  },
  data() {
    return {
     // 地图初始化数据
     ...
    }
  }
}
</script>
```

### 点标注（MapIconMark）
```
<MapIconMark :position="mapIconData.position" :label="mapIconData.label" :icon='mapIconData.icon' :elementName="mapIconData.elementName" :className="mapIconData.className"></MapIconMark>
/**
* position // 标注点的位置 array [lng, lat]
* label // 标注点的标签 string | null ， 非必须 ，默认 null，
* icon // 标注点的图标 string(url) | 如果只要标签名称就设置成一个像素的透明图标, 必须
* elmentName // 通过feature.get('name') 方法可以获得该叠加图层，非必须， 默认 'el-mapIconMark'
* className // 设置class名称， 非必须， 默认 'map-icon-mark'
* zIndex // 图层z轴高度， 非必须， 默认 800
*/

```
### 折线（MapLineString）
```
<MapLineString :pointList="mapLineStringData.pointlist" :lineColor="mapLineStringData.lineColor" :lineWidth="mapLineStringData.lineWidth" :lineDash="mapLineStringData.lineDash" :elementName="mapLineStringData.elementName" :className="mapLineStringData.className"></MapLineString>
/**
* pointList // 组成线的点列表数组 array [[lng, lat],...]
* lineColor // 线条颜色 String，非必须，默认为 '#409eff' 
* lineWidth // 线条宽度 Number，非必须，默认为 2
* lineDash // 虚线 Array[number]， 是否使用虚线，默认为 null
* className // 图层的class String， 非必须， 默认 "map-line-string"
* zIndex // 图层z轴高度， 非必须， 默认 300
* elmentName // 通过feature.get('name') 方法可以获得该叠加图层
*/

```
### 多边形（MapPolygon）
```
<MapPolygon :pointList="mapPolygonData.pointlist" :fillColor="mapPolygonData.fillColor" :lineColor="mapPolygonData.lineColor" :lineWidth="mapPolygonData.lineWidth" :lineDash="mapPolygonData.lineDash" :elementName="mapPolygonData.elementName" :className="mapPolygonData.className"></MapPolygon>
/**
* pointList // 组成多边形的点列表数组 array [[lng, lat],...]
* fillColor // 多边形填充颜色，非必须，默认为 'rgba(0,0,0,0.8)'
* elementName // 多边形识别名称 String, 非必须，默认为 'el-mapPolygon'
* lineColor // 多边形线条颜色 String，非必须，默认为 '#409eff'
* lineWidth // 多边形线条宽度 Number，非必须，默认为 2
* lineDash // 多边形虚线 Array[number], 是否使用虚线 ，默认为 null
* className // 图层的class String, 非必须，默认为 'map-polygon'
*/

```
### 圆形（MapCircle）
```
 <MapCircle :position="mapCircleData.position" :radius="mapCircleData.radius" :fillColor="mapCircleData.fillColor" :lineColor="mapCircleData.lineColor" :lineWidth="mapCircleData.lineWidth" :lineDash="mapCircleData.lineDash" :elementName="mapCircleData.elementName" :className="mapCircleData.className"></MapCircle>
/**
* position // 圆中心点 Array， 必须
* radius // 圆半径 number ，默认为 100
* fillColor // 圆形填充颜色，非必须，默认为 'rgba(255,255,255,0.5)'
* elementName // 圆形识别名称 String, 非必须，默认为 'el-mapCircle'
* lineColor // 圆形线条颜色 String，非必须，默认为 '#409eff'
* lineWidth // 圆形线条宽度 Number，非必须，默认为 2
* lineDash // 圆形虚线 Array[number], 是否使用虚线 ，默认为 null
* className // 图层的class String, 非必须，默认为 'map-circle'
*/

```
### 自定义覆盖物（MapOverlay）
```
<MapOverlay :position="mapOverlayData.position" :className="mapOverlayData.className"><div><img :src="mapOverlayData.img" alt=""></div></MapOverlay>
/**
* position // 标注中心点 Array, 必须
* className // 设置自定义图层的class String ，非必须， 默认 'map-overlay'
* offset // 设置自定义图层的偏移量 Array[number] ，非必须,默认[0, 0]
*/

```
### 弹出窗体（MapPopup）
```
<MapPopup :position="mapPopupData.position" :title="mapPopupData.title" :offset="mapPopupData.offset" :mapShow="mapPopupData.show" @close="mapPopupClose" :className="'map-popup'">{{ popupText }}</MapPopup>
/**
* position // 弹窗中心点 Array[array]， 必须
* title // 弹窗标题 String，非必须，默认为 ' '
* mapShow // 弹窗显隐 Boolean，必须，默认为 true
* offset // 弹窗偏移 Array[number]，必须，默认为 [0, 0]
* className // 图层的class String，非必须，默认为 'map-popup'
* close() // 弹窗关闭事件
*/

```
### 海量点（MapPointCollection）
```
<MapPointCollection :pointList="mapPointCollectionData.pointlist" :distance="mapPointCollectionData.distance" :fillColor="mapPointCollectionData.fillColor" :fontColor="mapPointCollectionData.fontColor" :zIndex='mapPointCollectionData.zIndex' :offset="mapPointCollectionData.offset"></MapPointCollection>
/**
* pointlist // 组成多边形的点列表数组 array [[lng, lat],...]
* distance // 收起点的间距  number，必须，默认为 40
* zIndex // 图层z轴高度， 非必须， 默认 400
* offset // 文字偏移距离 [x,y]， 非必须， 默认 [0,0]
* fontColor // 文字的颜色 string （色彩标识，支持rgba），默认'#fff'(如果去掉文字那么直接rgba透明度设置为0)
* fillColor // 文字的背景颜色 string（色彩标识，支持rgba），默认'#f00'(如果去不要背景颜色那么直接rgba透明度设置为0)
* bgImg // 设置背景图，如果设置了此那么文字背景可以不设置
*/

```