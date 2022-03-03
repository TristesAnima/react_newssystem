import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Layout, Dropdown, Avatar } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

const { Header } = Layout

function TopHeader(props) {
  let navigate = useNavigate()
  const changeCollapsed = () => {
    // 改变state状态
    props.changeCollapsed()
  }

  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem('token'))

  const menu = (
    <Menu>
      <Menu.Item key={1}>{roleName}</Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          localStorage.removeItem('token')
          navigate('/login')
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />}
      <div style={{ float: 'right' }}>
        <span style={{ marginRight: '10px' }}>
          欢迎 <span style={{ color: '#1890ff' }}>{username} </span>回来
        </span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  }
}

const mapDispatchToProps = {
  changeCollapsed () {
    return {
      type: "change_collapsed"
    }
  }
}

export default connect(mapStateProps, mapDispatchToProps)(TopHeader)