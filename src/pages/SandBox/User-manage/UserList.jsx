import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Modal, message, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'

const { confirm } = Modal

export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [showData, setshowData] = useState(false)
  const [isAddvisible, setIsAddvisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const addForm = useRef(null)
  const [isUpdatevisible, setIsUpdatevisible] = useState(false)
  const updateForm = useRef(null)
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
  const [current, setCurrent] = useState(null)

  // 获取权限列表
  const getUserList = () => {
    React.$api.getUserList().then((res) => {
      setDataSource(res)
    })
  }

  const getRoleList = () => {
    React.$api.getRoleList().then((val) => {
      setRoleList(val)
    })
  }

  const getRegionList = () => {
    React.$api.RegionList().then((val) => {
      setRegionList(val)
    })
  }

  useEffect(() => {
    getUserList()
    getRoleList()
    getRegionList()
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map((item) => ({
          text: item.title,
          value: item.value,
        })),
        { text: '全球', value: '全球' },
      ],
      onFilter: (value, item) =>{
        if (value==='全球') {
          return item.region === ''
        }
        return item.region === value
      },
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => {
              handleChange(item)
            }}
          ></Switch>
        )
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
              disabled={item.default}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => {
                handleUpdate(item)
              }}
            />
          </div>
        )
      },
    },
  ]

  const handleChange = (item) => {
    React.$api.changeState(item).then((val) => {
      if (val.roleState === false) {
        message.info('用户已下线')
      } else {
        message.success('用户已上线')
      }
      getUserList()
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
      },
      onCancel() {
        message.warning('已取消')
      },
    })
  }

  // 删除用户
  const deleteMethod = (item) => {
    React.$api.deleteUser(item.id).then((res) => {
      message.success('success delete')
      getUserList()
      setshowData(false)
    })
  }

  const addFormOk = () => {
    addForm.current
      .validateFields()
      .then((res) => {
        setIsAddvisible(false)
        addForm.current.resetFields()
        React.$api.addPerson(res).then((res) => {
          message.success('添加成功')
          getUserList()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdate = (item) => {
    setTimeout(() => {
      setIsUpdatevisible(true)
      if (item.roleId === 1) {
        setisUpdateDisabled(true)
      } else {
        setisUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
    }, 0)
    setCurrent(item)
  }

  const updateFormOk = () => {
    updateForm.current
      .validateFields()
      .then((res) => {
        setIsUpdatevisible(false)
        React.$api.updateUser(current, res).then((res) => {
          message.success('更新成功')
          getUserList()
          setisUpdateDisabled(!isUpdateDisabled)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setIsAddvisible(true)
          getRegionList()
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        loading={showData}
        rowKey={(item) => item.id}
      />

      <Modal
        visible={isAddvisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddvisible(false)
          addForm.current.resetFields()
        }}
        onOk={() => {
          addFormOk()
        }}
      >
        <UserForm ref={addForm} regionList={regionList} roleList={roleList}></UserForm>
      </Modal>

      <Modal
        visible={isUpdatevisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdatevisible(false)
          setisUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => {
          updateFormOk()
        }}
      >
        <UserForm ref={updateForm} regionList={regionList} roleList={roleList} isUpdateDisabled={isUpdateDisabled}></UserForm>
      </Modal>
    </div>
  )
}
