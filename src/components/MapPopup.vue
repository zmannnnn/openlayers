<template>
  <!-- 弹窗 start -->
  <div ref="mapPopup" class="map-popup-all" v-show="popupShow">
    <div class="map-popup-closer" @click="closePopup">+</div>
    <h3>{{ title || ' ' }}</h3>
    <div id="popup-content"><slot /></div>
  </div>
  <!-- 弹窗 end -->
</template>
<script>
// 弹窗组件
import Overlay from 'ol/Overlay'
export default {
  name: 'MapOverlay',
  props: {
    position: { type: Array },
    className: { type: String },
    mapShow: { type: Boolean },
    title: {type: String },
    offset: { type: Array },
  },
  data() {
    return {
      popupShow: true,
      dialogOverlay: null
    }
  },
  watch:{
    position: {
      handler () {
        this.reload()
      },
      deep: true
    },
    className: {
      handler () {
        this.reload()
      },
      deep: true
    },
    title: {
      handler () {
        this.reload()
      },
      deep: true
    },
    offset: {
      handler () {
        this.reload()
      },
      deep: true
    },
    mapShow:{
      handler(val){
        this.popupShow = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.reload()
    })
  },
  methods:{
    reload(){
      if(this.dialogOverlay) {
        this.$parent.$data.mapData.removeOverlay(this.dialogOverlay)
      }
      this.dialogOverlay = new Overlay({
        element: this.$refs.mapPopup,
        stopEvent: false,
        offset: this.offset || [0, 0],
        className: this.className || 'map-popup',
        autoPanAnimation: {
          duration: 250,
        },
      })
      this.dialogOverlay.setPosition(this.position)
      this.$parent.$data.mapData.addOverlay(this.dialogOverlay)
    },
    closePopup(){
      this.$emit('close', false)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map-popup-all {
  position: absolute;
  z-index: 400;
  bottom: 20px;
  left: 50%;
  min-width: 150px;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  word-break: break-all;
  h3{
    font-size: 14px;
    margin-top: -4px;
    padding-right: 20px;
  }
  .map-popup-closer{
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    text-align: center;
    height: 20px;
    font-size: 26px;
    transform: rotate(45deg);
    color: #c5c5c5;
    cursor: pointer;
  }
  .map-popup-closer:hover{
    color: #888;
  }
}
.map-popup-all::before{
  content: ' ';
  width: 0;
  height: 0;
  border: solid 10px transparent;
  border-top-color: #fff;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
