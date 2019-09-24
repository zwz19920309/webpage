<template>
  <div>
    <!-- <el-button @click="openDialog">打开弹出框</el-button> -->
    <div>
      <h2>目标网页列表</h2>
    </div>
    <page-dialog ref="pageRef" :cates="cates" :conts="conttypes" :data="data" :callBack="addData"></page-dialog>
    <page-list ref="pageListRef" :datas="pageList" :callBack="handleStatus"></page-list>
    <div class="pad10 t-right">
      <el-button type="primary" @click="openDialog">新增网页</el-button>
    </div>
  </div>
</template>

<script>
import { getCatesList, getContTypeList, addPageNew, getPageNewList, editPageNew } from '@/common/api'
export default {
  data() {
    return {
      labelPosition: 'left',
      activeKey: 0,
      show: true,
      username: '',
      dialogTableVisible: true,
      type: 1,
      contType: 1,
      cates: [],
      conttypes: [],
      data: {},
      pageList: [{ pagetitle: '1' }],
      webList: [{ title: 'title1', href: 'href1' }]
    };
  },
  created() {
    this.initData()
  },
  components: {
    'page-dialog': () => import('@/components/page.vue'),
    'page-list': () => import('@/components/pageList.vue')
  },
  methods: {
    async getPageNewList() {
      let pages = await getPageNewList({})
      this.pageList = pages.data.list
    },
    async initData() {
      let pages = await getPageNewList({})
      let cates = await getCatesList({})
      let conts = await getContTypeList({})
      this.conttypes = conts.data.list
      this.cates = cates.data.list
      this.pageList = pages.data.list
      this.data = {
        pagesite: 'http://www.most.gov.cn/mostinfo/xinxifenlei/fgzc/',
        realsite: '',
        sitemd5: '',
        pagetitle: '科技部',
        status: '1',
        deltatime: 10000,
        channel: '法政法规',
        headers: '',
        cates: '港股',
        followlink: 0,
        ctype: 1,
        link_unique_by: 1,
        encoding: 'UTF-8',
        linkrule: '.rowInRecord table tr td a',
        titlerule: '',
        contentrule: '',
        priority: 50,
        foreign: 0,
        group: '1',
        extra: '',
        asSpecial: 0
      }
    },
    async addData(data) { // 新增监控网页
      this.$refs.pageRef.close()
      let res = await addPageNew(data)
      if (res.status === 200) {
        this.$message('添加成功')
        let pages = await getPageNewList({})
        this.pageList = pages.data.list
      } else {
        this.$message.error('错了哦，这是一条错误消息');
      }
    },
    async handleStatus(status, data) { // 处理回调数据
      console.log('status: --------', status)
      console.log('data: --------', data)
      if (status === 1) { // 编辑数据
        let res = await editPageNew({
          pagesite: data.pagesite,
          realsite: data.realsite,
          sitemd5: data.sitemd5,
          pagetitle: data.pagetitle,
          status: data.status,
          deltatime: data.deltatime,
          channel: data.channel,
          headers: data.headers,
          cates: data.cates,
          followlink: data.followlink,
          ctype: data.ctype,
          link_unique_by: 1,
          encoding: data.encoding,
          linkrule: data.linkrule,
          titlerule: data.titlerule,
          contentrule: data.contentrule,
          priority: data.priority,
          foreign: data.foreign,
          group: data.group,
          extra: data.extra,
          asSpecial: data.asSpecial,
          id: data.id
        })
      }
      let pages = await getPageNewList({})
      this.pageList = pages.data.list
    },
    openDialog() {
      this.$refs.pageRef.open()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pad10 {
  padding: 10px;
}
.t-center {
  text-align: center;
}
.t-right {
  text-align: right;
}
</style>
