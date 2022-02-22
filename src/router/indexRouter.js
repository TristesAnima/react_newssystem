import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login/Login.jsx'))
const NewSandBox = lazy(() => import('../pages/SandBox/SandBox.jsx'))
const Home = lazy(() => import('../pages/SandBox/Home/Home.jsx'))
const UserList = lazy(() => import('../pages/SandBox/User-manage/UserList.jsx'))
const RoleList = lazy(() => import('../pages/SandBox/Right-manage/RoleList.jsx'))
const RightList = lazy(() => import('../pages/SandBox/Right-manage/RightList.jsx'))
const NoPermission = lazy(()=> import('../pages/SandBox/NoPermission/NoPermission.jsx'))

export default function indexRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading......</>}>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" element={localStorage.getItem('token') ? <NewSandBox /> : <Navigate to="login" />}>
            <Route path="" element={<Navigate to="home" />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="user-manage">
              <Route path="list" element={<UserList />}></Route>
            </Route>
            <Route path="right-manage">
              <Route path="role/list" element={<RoleList />}></Route>
              <Route path="right/list" element={<RightList />}></Route>
            </Route>
            <Route path="*" element={<NoPermission />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
