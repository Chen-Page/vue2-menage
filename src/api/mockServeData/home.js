import Mock from "mockjs";
// 图表
let list = []

let nameList = ['小米', '苹果', '三星', 'oppo', '华为', '魅族']

export default {
    getStatisticalData: () => {
        let dataList = {}
        let videoData = []
        let tableData = []
        let userData = []
        nameList.map((item) => {
            dataList[`${item}|100-8000`] = 1
            videoData.push({
                name: item,
                [`value|1000-5000`]: 1
            })
            tableData.push({
                name: item,
                [`todayBuy|100-500`]: 1,
                [`monthBuy|500-2000`]: 1,
                [`totalBuy|2000-10000`]: 1
            })
        })
        for (let i = 0; i < 7; i++) {
            list.push(Mock.mock(dataList))
            userData.push({
                date: `周${i + 1}`,
                ['new|5-60']: 1,
                ['active|200-900']: 1
            })
        }
        videoData = Mock.mock(videoData)
        tableData = Mock.mock(tableData)
        userData = Mock.mock(userData)
        return {
            code: 20000,
            data: {
                videoData,
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: list
                },
                userData,
                tableData
            },
        }
    }
}