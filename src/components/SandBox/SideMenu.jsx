import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.css'
import { connect } from 'react-redux'

const { Sider } = Layout
const { SubMenu } = Menu

function SideMenu(props) {
  let navigate = useNavigate()
  let location = useLocation()
  const selectedKeys = [location.pathname]
  const openKeys = [`/${location.pathname.split('/')[1]}`]

  const [menu, setMenu] = useState([])
  const getRights = async () => {
    const { data: res } = await React.$axios.get('/rights?_embed=children')
    setMenu(res)
  }

  const iconList = {
    '/home': <UserOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UserOutlined />,
    '/news-manage': <UserOutlined />,
    '/audit-manage': <UserOutlined />,
    '/publish-manage': <UserOutlined />,
  }

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    getRights()
  }, [])

  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }

      return (
        checkPagePermission(item) && (
          <Menu.Item
            key={item.key}
            onClick={() => {
              navigate(item.key)
            }}
            icon={iconList[item.key]}
          >
            {item.title}
          </Menu.Item>
        )
      )
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo" style={{ display: props.isCollapsed ? 'none' : 'block' }}>
          全球新闻发布管理系统
        </div>
        <div style={{ flex: '1', overflow: 'auto' }}>
          <Menu defaultOpenKeys={openKeys} theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

const mapStateProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  }
}

export default connect(mapStateProps)(SideMenu)
