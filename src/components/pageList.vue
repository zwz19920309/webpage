<template>
  <div>
    <el-table border :data="cDatas" stripe style="width: 100%">
      <el-table-column prop="pagetitle" label="网页名称">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.pagetitle"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.pagetitle }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="网页链接" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.pagesite"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.pagesite }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="真实网址">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.realtitle"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.realtitle }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="频道">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.channel"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.channel }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          <div v-if="!scope.row.editing">
            <span v-for="item in cCates">
              <span v-if="item.name == scope.row.cates">{{ item.name }}</span>
            </span>
          </div>
          <div v-else>
            <el-select v-model="scope.row.cates" @change="changeType" placeholder="请选择">
              <el-option
                v-for="item in cCates"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="优先级">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.priority"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.priority }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="请求头">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.headers"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.headers }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="抓取链接规则" width="280">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.linkrule"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.linkrule }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间间隔">
        <template slot-scope="scope">
          <div v-if="scope.row.editing">
            <el-input v-model="scope.row.deltatime"></el-input>
          </div>
          <div v-else>
            <span>{{ scope.row.deltatime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ctype" label="内容类型">
        <template slot-scope="scope">
          <div v-if="!scope.row.editing">
            <span v-for="item in cConts">
              <span v-if="item.type == scope.row.ctype">{{ item.name }}</span>
            </span>
          </div>
          <div v-else>
            <el-select
              v-model="scope.row.ctype"
              @change="changeType(scope.$index, scope.row)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in cConts"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="操作" width="480">
        <template slot-scope="scope">
          <div class="operate-groups">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              @click="handleSave(scope.$index, scope.row)"
              type="primary"
              v-if="scope.row.editing"
              icon="el-icon-success"
              size="mini"
            >保存</el-button>
            <el-button
              size="mini"
              @click="handleCancel(scope.$index, scope.row)"
              v-if="scope.row.editing"
              icon="el-icon-warning"
              type="warning"
            >取消</el-button>
            <el-button
              type="warning"
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleTest(scope.$index, scope.row)"
            >测试</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <web-list ref="webListRef" :datas="webList"></web-list>
  </div>
</template>

<script>
import { getCatesList, getContTypeList, deletePageNew, getSpiderInfo } from '@/common/api'
export default {
  data() {
    return {
      $index: 0,
      cDatas: [],
      cCates: [],
      cConts: [],
      webList: [],
      HANDLESTATUS: { EDIT: 1, DELETE: 4 }
    }
  },
  components: {
    'web-list': () => import('@/components/webList.vue')
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      let cates = await getCatesList({})
      let conts = await getContTypeList({})
      console.log('@@@cates: ', cates)
      this.cCates = cates.data.list
      this.cConts = conts.data.list
    },
    changeType(type) {
      this.$set(this.cDatas[this.$index], 'cates', type)
    },
    changeLinkType(type) {
      this.$set(this.cDatas[this.$index], 'ctype', type)
    },
    handleEdit($index, row) { // 编辑
      this.$index = $index
      this.$set(this.cDatas[$index], 'editing', true)
    },
    handleSave($index, row) { // 保存
      this.callBack && this.callBack(this.HANDLESTATUS.EDIT, row)
    },
    async handleDelete($index, row) { // 删除
      this.$confirm('确定要结束吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deletePageNew({ id: row.id })
        if (res.status === 200) {
          this.$message('删除成功')
          this.callBack && this.callBack(this.HANDLESTATUS.DELETE)
        } else {
          this.$message.error('删除失败');
        }
      }).catch((e) => {
        console.log('@@@error: ', e)
      })
    },
    handleCancel($index, row) { // 取消
      this.$set(this.cDatas[$index], 'editing', false)
    },
    async handleTest($index, row) { // 测试
      console.log('@@@@test: ', row)
      let res = await getSpiderInfo({ id: row.id })
      if (res.status === 200) {
        this.webList = res.data
        this.$refs.webListRef.open()
      }
    }
  },
  props: ['datas', 'callBack'], // isEdit false: 只显示：true: 可操作
  watch: {
    'datas': function (newVal, oldVal) {
      console.log('@@@@datas: ')
      this.cDatas = newVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
