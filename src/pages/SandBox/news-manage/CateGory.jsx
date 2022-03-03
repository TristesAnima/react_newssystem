import React, { useEffect, useState, useRef, useContext } from 'react'
import { Table, Button, Modal, message, Form, Input } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const EditableContext = React.createContext(null)

const { confirm } = Modal

export default function CateGory() {
  const [dataSource, setDataSource] = useState([])
  const [showData, setshowData] = useState(false)

  // 获取权限列表
  const getCateGory = async () => {
    React.$api.getCateGory().then((res) => {
      setDataSource(res)
    })
  }

  useEffect(() => {
    getCateGory()
  }, [])

  const handleSave = (record) => {
    axios
      .patch(`/categories/${record.id}`, {
        title: record.title,
        value: record.value,
      })
      .then((val) => {
        message.success('修改成功')
        getCateGory()
      })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),
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
      React.$api.deleteCateGory(item.id)
    }
  }

  // ---------------------------------------------------------------------
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }

  const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      if (editing) {
        inputRef.current.focus()
      }
    }, [editing])

    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      })
    }

    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({ ...record, ...values })
      } catch (errInfo) {
        console.log('Save failed:', errInfo)
      }
    }

    let childNode = children

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }

    return <td {...restProps}>{childNode}</td>
  }
  // ---------------------------------------------------------------------

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
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    </div>
  )
}
