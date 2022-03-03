import React, { useState, useEffect } from 'react'
import {} from 'react-router-dom'
import { Table, Button, notification } from 'antd'
import axios from 'axios'

export default function Audit() {
  const [dataSource, setDataSource] = useState([])

  const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
  const roleObj = {
    1: 'superadmin',
    2: 'admin',
    3: 'editor',
  }

  const getAuditList = () => {
    React.$api.getAuditList().then((res) => {
      setDataSource(roleObj[roleId] === 'superadmin' ? res : [...res.filter((item) => item.author === username), ...res.filter((item) => item.region === region && roleObj[item.roleId] === 'editor')])
    })
  }

  useEffect(() => {
    getAuditList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
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
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return <div>{category.title}</div>
      },
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                handleAudit(item, 2, 1)
              }}
            >
              通过
            </Button>
            <Button
              danger
              onClick={() => {
                handleAudit(item, 3, 0)
              }}
            >
              驳回
            </Button>
          </div>
        )
      },
    },
  ]

  const handleAudit = (item, auditState, publishState) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState,
        publishState,
      })
      .then((val) => {
        notification.info({
          message: '通知',
          description: `您可以到【审核管理/审核列表】中查看您新闻的审核状态`,
          placement: 'topRight',
        })
        getAuditList()
      })
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
    </div>
  )
}
