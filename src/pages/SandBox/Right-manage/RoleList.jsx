import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, message, Tree } from 'antd'
import { DeleteOutlined, HddTwoTone, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])

  const RoleList = () => {
    React.$api.getRoleList().then((val) => {
      setDataSource(val)
    })
  }

  const roleRightList = () => {
    React.$api.getRoleRightList().then((val) => {
      setRightList(val)
    })
  }

  useEffect(() => {
    RoleList()
    roleRightList()
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
      title: '角色名称',
      dataIndex: 'roleName',
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
              type="primary"
              shape="circle"
              icon={<HddTwoTone />}
              onClick={() => {
                setIsModalVisible(true)
                setCurrentRights(item.rights)
                setCurrentId(item.id)
              }}
            />
          </div>
        )
      },
    },
  ]

  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: '注意！此操作不可逆',
      onOk() {
        deleteMethod(item)
        message.success('已成功删除')
      },
      onCancel() {
        message.warning('已取消')
      },
    })
  }

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id))
    React.$api.deleteRole(item.id)
  }

  const handleOk = () => {
    React.$api.changeRightLists(currentId,currentRights).then(() => {
      RoleList()
      message.success('更新状态成功')
      setIsModalVisible(false)
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} />
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree checkable checkStrictly={true} onCheck={onCheck} checkedKeys={currentRights} treeData={rightList} />
      </Modal>
    </div>
  )
}
