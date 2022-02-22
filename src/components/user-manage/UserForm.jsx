import React, { forwardRef, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

const UserForm = forwardRef((props, ref) => {
  const [isDisable, setIsdisable] = useState(false)

  useEffect(() => {
    setIsdisable(props.isUpdateDisabled)
  }, [props.isUpdateDisabled])
  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="region" label="区域" rules={isDisable ? [] : [{ required: true, message: 'Please input the title of collection!' }]}>
        <Select disabled={isDisable}>
          {props.regionList.map((item) => (
            <Option value={item.value} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="roleId" label="角色" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Select
          onChange={(val) => {
            if (val === 1) {
              setIsdisable(true)
              ref.current.setFieldsValue({
                region: '',
              })
            } else {
              setIsdisable(false)
            }
          }}
        >
          {props.roleList.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})

export default UserForm
