<template>
  <div class="hello">
    <el-dialog title="添加监控" :visible.sync="dialogShow">
      <div>
        <el-form ref="form" :label-position="labelPosition" label-width="80px">
          <el-form-item label="页面标题">
            <el-input v-model="cData.pagetitle"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="cData.pagesite"></el-input>
          </el-form-item>
          <el-form-item label="真实网址">
            <el-input v-model="cData.realsite"></el-input>
          </el-form-item>
          <el-form-item label="频道">
            <el-input v-model="cData.channel"></el-input>
          </el-form-item>
          <el-form-item label="间隔">
            <el-input v-model="cData.deltatime"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="cData.ctype" @change="changeType" placeholder="请选择">
              <el-option
                v-for="item in cCates"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文字或链接" @change="changeLinkType">
            <el-select v-model="cData.link_unique_by" placeholder="请选择">
              <el-option
                v-for="item in cConts"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先级">
            <el-input v-model="cData.priority"></el-input>
          </el-form-item>
          <el-form-item label="请求头">
            <el-input v-model="cData.headers"></el-input>
          </el-form-item>
          <el-form-item label="抓取链接规则">
            <el-input v-model="cData.linkrule"></el-input>
          </el-form-item>
          <el-form-item label="当前编码">
            <el-input v-model="cData.encoding"></el-input>
          </el-form-item>
          <el-form-item label="附加参数">
            <el-input v-model="cData.extra"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="insure">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cData: {},
      cCates: [],
      cConts: [],
      username: '',
      dialogShow: false,
      type: 1,
      catesType: 1,
      contType: 1,
      labelPosition: 'left'
    };
  },
  methods: {
    open() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    },
    insure() {
      this.callBack && this.callBack(this.cData)
    },
    changeType(type) {
      this.cData.ctype = type
      //console.log('@@@@type: ', type)
    },
    changeLinkType(type) {
      this.cData.link_unique_by = type
      // console.log('@@@@type: ', type)
    }
  },
  props: ['cates', 'conts', 'data', 'callBack'], // isEdit false: 只显示：true: 可操作
  watch: {
    'data': function (newVal, oldVal) {
      //   console.log('@@@@cData: ')
      this.cData = newVal
    },
    'cates': function (newVal, oldVal) {
      // console.log('@@@@cCates: ')
      this.cCates = newVal
    },
    'conts': function (newVal, oldVal) {
      // console.log('@@@@cConts: ')
      this.cConts = newVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
