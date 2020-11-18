<script>
// 多边形组件
import { Vector as SourceVec, Cluster } from "ol/source"
import { Feature } from "ol"
import { Style, Stroke, Fill } from "ol/style"
import { Vector as LayerVec } from "ol/layer"
import { Polygon } from 'ol/geom'
export default {
  name: "MapPolygon",
  render() {
    return this.$parent.preventChildrenRender;
  },
  props: {
    pointList: { type: Array },
    elementName: { type: String },
    className: { type: String },
    lineColor: { type: String },
    lineWidth: { type: Number },
    lineDash: { tyep: Array },
    fillColor: { type :String },
    zIndex: { type: Number }
  },
  data() {
    return{
      polygonLayer: null
    }
  },
  watch: {
    pointList:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    className:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    fillColor:{
      handler () {
        this.MapPolygon()
      },
      deep: true
    },
    zIndex:{
      handler(){
        this.MapPolygon()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.MapPolygon()
    });
  },
  methods: {
    MapPolygon() {
      const _that = this
      // 清除原来的
      if(_that.polygonLayer){
        _that.polygonLayer.getSource().clear()
      }
      // 创建一个 source图层
      const source = new SourceVec()
      // 所有点共同构成一个 feature
      const feature = new Feature({
        name: _that.elementName || 'el-mapPolygon',
        geometry: new Polygon([this.pointList]),
      })
      // 然后把feature添加到source里
      source.addFeature(feature)
      this.polygonLayer = new LayerVec({
        className: _that.className || "map-polygon",
        source: source,
        zIndex: _that.zIndex || 200,
        style: function (feature, resolution) {
          const style = [
            new Style({
              stroke: new Stroke({
                color:  _that.lineColor || '#409eff',
                width: _that.lineWidth || 2,
                lineDash: _that.lineDash || null,
                lineDashOffset: 0
              }),
              //填充样式
              fill: new Fill({
                color: _that.fillColor || 'rgba(0,0,0,0.8)' //颜色、渐变或图案
              })
            }),
          ];
          return style;
        },
      })
      this.$parent.$data.mapData.addLayer(this.polygonLayer)
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
