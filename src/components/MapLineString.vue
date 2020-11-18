<script>
// 折线组件
import { Vector as SourceVec, Cluster } from "ol/source"
import { Feature } from "ol";
import { Style, Stroke, Fill } from "ol/style"
import { Vector as LayerVec } from "ol/layer"
import { LineString } from 'ol/geom'
export default {
  name: "MapLineString",
  render() {
    return this.$parent.preventChildrenRender;
  },
  props: {
    pointList: { type: Array },
    elementName: { type: String },
    className: { type: String },
    lineColor: { type: String },
    lineWidth: { type: Number },
    lineDash: {tyep: Array },
    zIndex: { type: Number }
  },
  data() {
    return{
      lineStringLayer: null
    }
  },
   watch:{
    pointList:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    elementName:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    className:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    lineColor:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    lineDash:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    lineWidth:{
      handler () {
        this.MapLineString()
      },
      deep: true
    },
    zIndex:{
      handler(){ 
        this.MapLineString()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.MapLineString()
    });
  },
  methods: {
    MapLineString() {
      const _that = this
      // 清除原来的
      if(_that.lineStringLayer){
        _that.lineStringLayer.getSource().clear()
      }
      // 创建一个 source图层
      const source = new SourceVec();
      // 所有点共同构成一个 feature
      const feature = new Feature({
        name: _that.elementName || null,
        geometry: new LineString(this.pointList),
      });
      // 然后把feature添加到source里
      source.addFeature(feature);
      _that.lineStringLayer = new LayerVec({
        className: _that.className || "map-line-string",
        source: source,
        zIndex: _that.zIndex || 300,
        style: function (feature, resolution) {
          // console.log(feature)
          const style = [
            new Style({
              stroke: new Stroke({
                color: _that.lineColor || '#409eff',
                width: _that.lineWidth || 2,
                lineDash: _that.lineDash || null,
                lineDashOffset: 0
              })
            }),
          ];
          return style;
        },
      });
      _that.$parent.$data.mapData.addLayer(_that.lineStringLayer)
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
