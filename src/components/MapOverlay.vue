<template>
  <!-- Overlay start -->
  <div ref="overlayMain" class="overlay-main">
    <slot />
  </div>
  <!-- Overlay end -->
</template>
<script>
// 自定义覆盖物组件
import Overlay from 'ol/Overlay'
export default {
  name: 'MapOverlay',
  props: {
    position: { type: Array },
    className: { type: String },
    offset:{ type: Array }
  },
  data() {
    return {
      popupShow: true,
      dialogOverlay: null
    }
  },
  watch:{
    position: {
      handler (val) {
        this.reload()
      },
      deep: true
    },
    className: {
      handler (val) {
        this.reload()
      },
      deep: true
    },
    offset: {
      handler (val) {
        this.reload()
      },
      deep: true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.reload()
    })
  },
  methods:{
    reload(){
      if(this.dialogOverlay){
        this.dialogOverlay.getSource().clear()
      }
     this.dialogOverlay = new Overlay({
        element: this.$refs.overlayMain,
        stopEvent: false,
        offset: this.offset || [0, 0],
        className: this.className || 'map-overlay',
      })
      this.dialogOverlay.setPosition(this.position)
      this.$parent.$data.mapData.addOverlay(this.dialogOverlay)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
