import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import LoginBg from './LoginBg.jsx'
import './Login.css'

export default function Login() {
  let navigate = useNavigate()

  const onFinish = (value) => {
    React.$api.login(value).then((val) => {
      if (val.length === 0) {
        message.error('用户名或密码不匹配')
      } else {
        localStorage.setItem('token', JSON.stringify(val[0]))
        navigate('/home')
      }
    })
  }

  return (
    <div style={{ backgroundColor: 'rgb(35,39,65)', height: '100%' }}>
      <LoginBg></LoginBg>
      <div className="formContainer">
        <div className="logintitle">全球新闻发布管理系统</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
