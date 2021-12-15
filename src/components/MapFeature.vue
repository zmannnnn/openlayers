<script>
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {Fill, Stroke, Style, Text} from 'ol/style'
// 图层普通样式
const style = new Style({
  fill: new Fill({
    color: 'rgba(2, 220, 2, 0.3)',
  }),
  stroke: new Stroke({
    color: '#fff',
    width: 2,
  }),
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});
// 图层选中高亮样式
const highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(4, 116, 7, 0.6)',
  }),
  stroke: new Stroke({
    color: '#eeb60f',
    width: 2,
  }),
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});
export default {
  name: "MapFeature",
  render() {
    return this.$parent.preventChildrenRender;
  },
  data() {
    return {
      polygonLayer: null
    }
  },
  props: {
    geoFeature: {type: Object},
  },
  watch: {
    geoFeature: {
      handler() {
        this.MapPolygon()
      },
      deep: true
    },
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
      if (_that.polygonLayer) {
        _that.polygonLayer.getSource().clear()
      }
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(this.geoFeature),
      });
      this.polygonLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          style.getText().setText(feature.get('name'));
          return style;
        }
      });
      let map=this.$parent.$data.mapData
      map.addLayer(this.polygonLayer)
      this.switchLayer(map)

    },
    /**
     * 图层切换
     * @param map 地图组件
     */
    switchLayer(map){
      const featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function (feature) {
          highlightStyle.getText().setText(feature.get('name'));
          return highlightStyle;
        },
      });

      let highlight;
      const displayFeatureInfo = (pixel)=> {
        const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
            //调用父组件方法
            this.$emit('switchLayerChangeName',feature.get('name'))
          }
          highlight = feature;
        }
      };

      map.on('pointermove', function (evt) {
        if (evt.dragging) {
          return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });
      map.on('click', function (evt) {
        displayFeatureInfo(evt.pixel);
      });
    }
  }
}
</script>

<style scoped>

</style>
