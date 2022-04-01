import React from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import TopHeader from '../../components/SandBox/TopHeader.jsx'
import SideMenu from '../../components/SandBox/SideMenu.jsx'
// css
import './sandbox.css'
// antd
import { Layout } from 'antd'
const { Content } = Layout

function SandBox(props) {
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
            overflow: 'auto',
          }}
        >
          <Spin size="large" spinning={props.isLoading}>
            <Outlet></Outlet>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateProps = ({ LoadingReducer: { isLoading } }) => {
  return {
    isLoading,
  }
}

export default connect(mapStateProps)(SandBox)
