<template>
  <div id="page_home">
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <el-card class="box-card">
          <div class="user">
            <img :src="user.headimg" alt="用户头像" class="headImg" />
            <div class="userInfo">
              <p class="name">
                Admin
              </p>
              <p class="access">
                超级管理员
              </p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2022年11月12日</span></p>
            <p>上次登录地点：<span>上海</span></p>
          </div>
        </el-card>
        <el-card class="history">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(item, key) in tableLabel" :key="key" :prop="key" :label="item">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <el-card v-for="(item, index) in countData" :key="index" :body-style="{ display: 'flex', padding: 0 }">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
            <div class="detail">
              <p class="price">
                ￥{{ item.value }}
              </p>
              <p class="desc">
                {{ item.name }}
              </p>
            </div>
          </el-card>
        </div>
        <div>
          <el-card style="height: 280px;">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px;"></div>
          </el-card>
        </div>
        <div class="graph">
          <el-card>
            <div ref="echarts2" style="height: 260px;"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" style="height: 240px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api/index'
import * as echarts from 'echarts'
export default {
  name: 'page_home',
  data() {
    return {
      user: { // 用户信息
        headimg: 'https://th.bing.com/th/id/OIP.JPaFw0vH2f6Qy44aUfZ4jgAAAA'
      },
      // 购买数据
      tableData: [],
      tableLabel: { // 购买记录表格渲染数据项
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [ // 购买记录
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'star-on',
          color: '#ffb980'
        }
      ]
    }
  },
  mounted() {
    getData().then(({ data }) => {
      console.log(data)
      const { tableData, orderData, userData, videoData } = data.data
      this.tableData = tableData
      // 初始化echart
      const echarts1 = echarts.init(this.$refs.echarts1)
      let echarts1Option = {}
      // 处理返回数据为echart需要的格式
      let xAxis = Object.keys(orderData.data[0])
      let xAxisData = {
        data: xAxis
      }
      console.log(xAxis)
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => {
            return item[key]
          }),
          type: 'line'
        })
      })
      console.log(echarts1Option)
      echarts1.setOption(echarts1Option)
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: userData.map((item) => {
            return item.date
          }),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          }
        },
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map((item) => {
              return item.new
            }),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map((item) => {
              return item.active
            }),
            type: 'bar'
          }
        ]
      }
      console.log(echarts2Option)
      echarts2.setOption(echarts2Option)
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  .headImg {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.history {
  margin-top: 20px;
  height: 460px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

  .icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .price {
      font-size: 30px;
      line-height: 30px;
      height: 30px;
      margin-bottom: 10px;
    }

    .desc {
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>