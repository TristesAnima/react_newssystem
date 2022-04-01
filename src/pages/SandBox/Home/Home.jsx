import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Row, Col, Card, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import _ from 'lodash'

const { Meta } = Card

export default function Home() {
  const [viewList, setViewList] = useState([])
  const [starList, setStarList] = useState([])
  const [allList, setAllList] = useState([])
  const [visible, setVisible] = useState(false)
  const [pieChart, setPieChart] = useState(null)
  const barRef = useRef(null)
  const pieRef = useRef(null)

  const getMostView = () => {
    React.$api.getMostView().then((val) => {
      setViewList(val)
    })
  }

  const getGood = () => {
    React.$api.getGood().then((val) => {
      setStarList(val)
    })
  }

  useEffect(() => {
    getMostView()
    getGood()
    React.$api.getEchInfo().then((val) => {
      renderBar(_.groupBy(val, (item) => item.category.title))
      setAllList(val)
    })
    return () => {
      window.onresize = null
    }
  }, [])

  const renderBar = (obj) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(barRef.current)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示',
      },
      tooltip: {},
      legend: {
        data: ['数量'],
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: '45',
          interval: 0,
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map((item) => item.length),
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)

    window.onresize = () => {
      myChart.resize()
    }
  }

  const renderPieView = (obj) => {
    // 数据处理
    var currentList = allList.filter((item) => item.author === username)
    var groupObj = _.groupBy(currentList, (item) => item.category.title)

    var list = []
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length,
      })
    }

    var myChart
    if (!pieChart) {
      myChart = echarts.init(pieRef.current)
      setPieChart(myChart)
    } else {
      myChart = pieChart
    }
    var option

    option = {
      title: {
        text: '当前用户新闻分类图示',
        // subtext: 'Fake Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    option && myChart.setOption(option)
  }

  const {
    username,
    region,
    role: { roleName },
  } = JSON.parse(localStorage.getItem('token'))
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最长浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[
              <SettingOutlined
                key="setting"
                onClick={() => {
                  setTimeout(() => {
                    setVisible(true)
                    renderPieView()
                  }, 0)
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : '全球'}</b>
                  <span style={{ paddingLeft: '30px' }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
      >
        <div ref={pieRef} style={{ width: '100%', height: '400px', marginTop: '30px' }}></div>
      </Drawer>

      <div ref={barRef} style={{ width: '100%', height: '400px', marginTop: '30px' }}></div>
    </div>
  )
}
