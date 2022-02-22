import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, message, Popover, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  const [showData, setshowData] = useState(false)

  // 获取权限列表
  const getRigthList = async () => {
    React.$api.getRightList().then((res) => {
      res.forEach((item) => {
        if (item.children.length === 0) return (item.children = '')
      })
      setDataSource(res)
    })
  }

  useEffect(() => {
    getRigthList()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color={'orange'}>{key}</Tag>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                confirmMethod(item)
              }}
              style={{marginRight: '10px'}}
            />
            <Popover
              content={
                <div style={{ textAlign: 'center' }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => {
                      switchMethod(item)
                    }}
                  ></Switch>
                </div>
              }
              title="配置项"
              trigger={item.pagepermisson === undefined ? '' : 'click'}
            >
              <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
            </Popover>
          </div>
        )
      },
    },
  ]

  const switchMethod = (item) => {
    if (item.grade === 1) {
      React.$api.switchMethod(item.id, item.pagepermisson)
    } else {
      React.$api.switchSecondhMethod(item.id, item.pagepermisson)
    }
    message.success('修改成功 请重新刷新页面')
    getRigthList()
  }

  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: '注意！此操作不可逆',
      onOk() {
        setshowData(true)
        deleteMethod(item)
        message.success('已成功删除')
      },
      onCancel() {
        message.warning('已取消')
      },
    })
  }

  // 删除一级
  const deleteMethod = (item) => {
    if (item.grade === 1) {
      setTimeout(() => {
        setshowData(false)
        setDataSource(dataSource.filter((data) => data.id !== item.id))
      }, 500)
      React.$api.deleteItem(item.id)
    } else {
      setTimeout(() => {
        setshowData(false)
        let list = dataSource.filter((data) => data.id === item.rightId)
        list[0].children = list[0].children.filter((data) => data.id !== item.id)
        setDataSource([...dataSource])
      }, 500)
      React.$api.deleteSecondItem(item.id)
    }
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        loading={showData}
      />
    </div>
  )
}
