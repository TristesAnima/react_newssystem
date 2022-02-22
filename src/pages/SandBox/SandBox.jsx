import React from 'react'
import { Outlet } from 'react-router-dom'
import TopHeader from '../../components/SandBox/TopHeader.jsx'
import SideMenu from '../../components/SandBox/SideMenu.jsx'
// css
import './sandbox.css'
// antd
import { Layout } from 'antd'
const { Content } = Layout

export default function SandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
