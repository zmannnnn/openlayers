<script>
import { Vector as SourceVec, Cluster } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon, Stroke, Fill, Text, Circle } from "ol/style";
import { Vector as LayerVec } from "ol/layer";
export default {
  name: "MapPointCollection",
  render() {
    return this.$parent.preventChildrenRender;
  },
  props: {
    pointList: { type: Array },
    distance: { type: Number },
    offset: { type: Array },
    fontColor: { type: String },
    fillColor: { type: String },
    zIndex: { type: Number },
    bgImg: { type: String },
    className: { type: String }
  },
  data() {
    return {
      clustersLayer: null,
    };
  },
  watch: {
    pointList: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    zIndex: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    distance: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    fontColor: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    fillColor: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    bgImg: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    offset: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
    className: {
      handler() {
        this.MapPointCollection();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.MapPointCollection();
    });
  },
  methods: {
    // 海量点
    MapPointCollection() {
      const _that = this;
      // 清除原来的
      if (_that.clustersLayer) {
        _that.clustersLayer.getSource().clear();
      }
      // 创建Feature对象集合
      const features = [];
      for (let i = 0; i < _that.pointList.length; i++) {
        features.push(new Feature({ geometry: new Point(_that.pointList[i]) }));
      }
      // 加载聚合标注的矢量图层
      const styleCache = {}; //用于保存特定数量的聚合群的要素样式
      _that.clustersLayer = new LayerVec({
        className: _that.className || "map-point-collection", // 设置容器的class
        zIndex: _that.zIndex || 400,
        // 聚合标注数据源
        source: new Cluster({
          distance: _that.distance || 40,
          // 矢量要素数据源
          source: new SourceVec({
            features: features,
          }),
        }),
        style: function (feature, resolution) {
          const size = feature.get("features").length; // 获取该要素所在聚合群的要素数量
          let style = styleCache[size];
          if (!style) {
            if (_that.bgImg) {
              style = [
                new Style({
                  image: new Icon({
                    src: _that.bgImg,
                  }),
                  // 文本设置
                  text: new Text({
                    text: size.toString(),
                    fill: new Fill({
                      color: _that.fontColor || "#fff",
                    }),
                    font: "14px Microsoft YaHei",
                    offsetX: _that.offset ? _that.offset[0] : 0,
                    offsetY: _that.offset ? _that.offset[1] : 0
                  }),
                }),
              ];
              styleCache[size] = style;
            } else {
              style = [
                new Style({
                  image: new Circle({
                    radius: 10,
                    // 边线
                    stroke: new Stroke({
                      color: "#fff",
                    }),
                    fill: new Fill({
                      color: _that.fillColor || "#f00",
                    }),
                  }),
                  // 文本设置
                  text: new Text({
                    text: size.toString(),
                    fill: new Fill({
                      color: _that.fontColor || "#fff",
                    }),
                    font: "14px Microsoft YaHei",
                    offsetX: _that.offset ? _that.offset[0] : 0,
                    offsetY: _that.offset ? _that.offset[1] : 0
                  }),
                }),
              ];
              styleCache[size] = style;
            }
          }
          return style;
        },
      });
      _that.$parent.$data.mapData.addLayer(_that.clustersLayer);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
