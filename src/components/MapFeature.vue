<script>
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {Fill, Stroke, Style, Text} from 'ol/style'
import mapconfig from '@/mapconfig'
const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.3)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
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
      this.$parent.$data.mapData.addLayer(this.polygonLayer)
    }
  }
}
</script>

<style scoped>

</style>
