<script>
// 点标注组件
import { Vector as SourceVec, Cluster} from 'ol/source'
import { Feature } from 'ol'
import { Circle } from 'ol/geom'
import { Style, Icon, Stroke, Fill, Text } from 'ol/style'
import { Vector as LayerVec } from 'ol/layer'
export default {
  name: 'MapIcon',
  render () {
    return this.$parent.preventChildrenRender
  },
  props: {
    position: { type: Array },
    radius: {type: Number },
    elementName: { type: String },
    className: { type: String },
    lineColor: { type: String },
    lineWidth: { type: Number },
    lineDash: { tyep: Array },
    fillColor: { type :String },
    zIndex: { type: Number }
  },
  data(){
    return {
      circleLayer: null
    }
  },
  watch:{
    position:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    radius:{
       handler () {
        this.MapCircle()
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    className:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    fillColor:{
      handler () {
        this.MapCircle()
      },
      deep: true
    },
    zIndex:{
      handler(){
        this.MapCircle()
      }
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.MapCircle()
    })
  },
  methods:{
    // 圆形叠加图层
    MapCircle() {
      const _that = this
      if(_that.circleLayer){
        _that.circleLayer.getSource().clear()
      }
      // 圆的半径换算
      let metersPerUnit = _that.$parent.$data.mapData.getView().getProjection().getMetersPerUnit()
      let circleRadius =  ( _that.radius || 100) / metersPerUnit
      // 创建矢量容器
      const centerRadius = new Circle(_that.position, circleRadius)
      const vectorSource = new SourceVec({})
      //创建图标特性
      const circleFeature  = new Feature({
        type: 'mapCircle',
        name: _that.elementName || 'el-mapCircle',
        geometry: centerRadius,
      })
      // 图标特性添加到矢量容器
      vectorSource.addFeature(circleFeature)
      //创建矢量层
      _that.circleLayer = new LayerVec({
        className: _that.className || 'map-circle',
        source: vectorSource,
        zIndex: _that.zIndex || 200,
        //创建圆的样式
        style: new Style({
          stroke: new Stroke({
            color:  _that.lineColor || '#409eff',
            width: _that.lineWidth || 2,
            lineDash: _that.lineDash || null,
            lineDashOffset: 0
          }),
          //填充样式
          fill: new Fill({
            color: _that.fillColor || 'rgba(255,255,255,0.5)' // 颜色、渐变或图案
          })
        })
      })
      _that.$parent.$data.mapData.addLayer(_that.circleLayer)
    }
  }
}
</script>
