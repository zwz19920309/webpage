<template>
  <div>
    <el-dialog :title="cDatas.page.pagetitle" :visible.sync="dialogShow">
      <div class="webList">
        <div class="item" v-for="item in cDatas.list">
          <span @click="openLink(item)">标题:{{item.title}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      cDatas: { list: [], page: { pagetitle: '' } }
    }
  },
  methods: {
    open() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    },
    openLink(item) {
      window.open(item.href)
    }
  },
  props: ['datas'], // isEdit false: 只显示：true: 可操作
  watch: {
    'datas': function (newVal, oldVal) {
      this.cDatas = newVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.webList {
  text-align: left;
  font-size: 14px;
}
.webList .item {
  padding: 8px 10px;
  cursor: pointer;
}
</style>
