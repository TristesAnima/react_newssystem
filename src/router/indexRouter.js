import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

const Login = lazy(() => import('../pages/Login/Login.jsx'))
const NewSandBox = lazy(() => import('../pages/SandBox/SandBox.jsx'))
const Home = lazy(() => import('../pages/SandBox/Home/Home.jsx'))
const UserList = lazy(() => import('../pages/SandBox/User-manage/UserList.jsx'))
const RoleList = lazy(() => import('../pages/SandBox/Right-manage/RoleList.jsx'))
const RightList = lazy(() => import('../pages/SandBox/Right-manage/RightList.jsx'))
const NoPermission = lazy(() => import('../pages/SandBox/NoPermission/NoPermission.jsx'))
const NewsAdd = lazy(() => import('../pages/SandBox/news-manage/Add.jsx'))
const NewsDraft = lazy(() => import('../pages/SandBox/news-manage/Draft.jsx'))
const NewsCateGory = lazy(() => import('../pages/SandBox/news-manage/CateGory.jsx'))
const NewsPreview = lazy(()=> import('../pages/SandBox/news-manage/NewsPreview.jsx'))
const NewsUpdate = lazy(() => import('../pages/SandBox/news-manage/NewsUpdate.jsx'))
const Audit = lazy(() => import('../pages/SandBox/audit-manage/Audit.jsx'))
const AuditList = lazy(() => import('../pages/SandBox/audit-manage/List.jsx'))
const Unpublished = lazy(() => import('../pages/SandBox/publish-manage/UnPublished.jsx'))
const Published = lazy(() => import('../pages/SandBox/publish-manage/Published.jsx'))
const Sunset = lazy(() => import('../pages/SandBox/publish-manage/SunSet.jsx'))

export default function indexRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <>
            Loading......
            <LoadingOutlined />
          </>
        }
      >
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
            <Route path="news-manage">
              <Route path="add" element={<NewsAdd />}></Route>
              <Route path="draft" element={<NewsDraft />}></Route>
              <Route path="category" element={<NewsCateGory />}></Route>
              <Route path="preview/:id" element={<NewsPreview />}></Route>
              <Route path="update/:id" element={<NewsUpdate />}></Route>
            </Route>
            <Route path="audit-manage">
              <Route path="audit" element={<Audit />}></Route>
              <Route path="list" element={<AuditList />}></Route>
            </Route>
            <Route path="publish-manage">
              <Route path="unpublished" element={<Unpublished />}></Route>
              <Route path="published" element={<Published />}></Route>
              <Route path="sunset" element={<Sunset />}></Route>
            </Route>
            <Route path="*" element={<NoPermission />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
