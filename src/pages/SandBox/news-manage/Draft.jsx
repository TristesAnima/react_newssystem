import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Modal, message, notification } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal

export default function RightList() {
  let navigate = useNavigate()

  const [dataSource, setDataSource] = useState([])
  const [showData, setshowData] = useState(false)

  const getDraft = () => {
    React.$api.getDraft().then((val) => {
      setDataSource(val)
    })
  }

  useEffect(() => {
    getDraft()
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
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (category) => {
        return category.title
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
              style={{ marginRight: '10px' }}
            />
            <Button
              shape="circle"
              icon={<EditOutlined />}
              style={{ marginRight: '10px' }}
              onClick={() => {
                navigate(`/news-manage/update/${item.id}`)
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              onClick={() => {
                handleCheck(item.id)
              }}
            />
          </div>
        )
      },
    },
  ]

  const handleCheck = (id) => {
    React.$api.submitCheck(id).then((val) => {
      navigate('/audit-manage/list')
      notification.info({
        message: '通知',
        description: `您可以到审核列表中查看您的新闻`,
        placement: 'topRight',
      })
    })
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
    axios.delete(`/news/${item.id}`)
    setshowData(false)
    getDraft()
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
        rowKey={(item) => item.id}
      />
    </div>
  )
}
