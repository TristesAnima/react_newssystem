import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import axios from 'axios'
import './index.css'

const { Sider } = Layout
const { SubMenu } = Menu

export default function SideMenu() {
  let navigate = useNavigate()
  let location = useLocation()
  const selectedKeys = [location.pathname]
  const openKeys = [`/${location.pathname.split('/')[1]}`]

  const [menu, setMenu] = useState([])
  const getRigths = async () => {
    const { data: res } = await axios.get('/rights?_embed=children')
    setMenu(res)
  }

  useEffect(() => {
    getRigths()
  }, [])

  const checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} title={item.title}>
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
          >
            {item.title}
          </Menu.Item>
        )
      )
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">全球新闻发布管理系统</div>
        <div style={{ flex: '1', overflow: 'auto' }}>
          <Menu defaultOpenKeys={openKeys} theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
