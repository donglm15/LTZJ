<template>
  <div>
    <el-card class="content">
      <el-table :data="tableData" border style="width: 100%;text-align: center;">
        <el-table-column class="one" prop="id" label="产品名称" width="120" />
        <el-table-column prop="date" label="产品定位" width="360" />
        <el-table-column prop="function" label="产品功能" width="160" />
        <el-table-column prop="title" label="产品优势" width="260" />
        <el-table-column prop="content" label="政策支持" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'

export default {
  data() {
    return {
      form: {
        id: '',
        date: '',
        function: '',
        title: '',
        content: ''
      },
      tableData: []
    }
  },
  mounted() {
    // ajax---tableData
    const data = Mock.mock(
      {
        'result': [
          {
            'id': 'NB-IOT模组',
            'date': '物联网要实现物与物相连需要每个物都具备智能因素，因此每个物体需要配备一个模组作为通信设备。现今NB-IOT技术作为当今的热门话题得到了广泛的研究，在NB-IOT不断推广的过程中模组的需求也是越来越大。在智能世界的的大环境下，模组在未来两三年内的需求量将会大幅度提升，具有相当广阔的市场空间。模组提供基站与终端通讯端口，从基站或管理平台接收信号，将接收到的数据或指令传输给终端 ，并将终端回馈的数据或指令回传给基站或管理平台。',
            'function': '模组提供基站与终端通讯端口，从基站或管理平台接收信号，将接收到的数据或指令传输给终端 ，并将终端回馈的数据或指令回传给基站或管理平台。',
            'title': '稳定：由联通（福建）产业互联网公司自主研发，产品充分运用大数据等先进技术，产品稳定性能卓越；\n' +
              '灵活:通过提供通用模组、行业定制模组，提供端到端的NB-IOT整体解决方案。整合模组产业优质资源，形成全国统一的运营支撑流程，为客户提供低成本、通用型和定制化的模组服务。\n' +
              '自主研发力：基于自有的研发能力，可根据客户需求进行个性化定制及功能调整；',
            'content': '2015年3月印发了《福建省人民政府关于加快互联网经济发展十条措施的通知》，明确了八个方面的发展重点：电子商务、物联网产业、智慧云服务、文创传媒、互联网金融、互联网基础服务，提出“加快物联网产业园建设、提升智能终端产业水平和规模”的发展目标。为进一步贯彻落实《福建省人民政府关于加快物联网产业发展八条措施的通知》（闽政〔2016〕57号）精神，把握发展良机，针对福州市物联网产业发展实际，2017年8月福州市经信委制定出台了《关于加快物联网产业发展的三条措施》（以下简称《三条措施》）。支持公共服务平台建设、支持拓展应用领域、加大市场推广力度。'
          }
        ]

      }
    ).result
    this.tableData = data
  }
}
</script>
<style>
.content{
  margin: 30px 30px;
}
</style>
