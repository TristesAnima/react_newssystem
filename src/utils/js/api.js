import React from "react"
const user = JSON.parse(localStorage.getItem('token'))

// RightList
export const getRightList = async () => {
  const { data: res } = await React.$axios.get('/rights?_embed=children')
  return res
}

export const deleteItem = (id) => {
  React.$axios.delete(`/rights/${id}`)
}

export const deleteSecondItem = (id) => {
  React.$axios.delete(`/children/${id}`)
}

export const switchMethod = (id, pagepermisson) => {
  React.$axios.patch(`/rights/${id}`, {
    pagepermisson: pagepermisson === 1 ? 0 : 1,
  })
}

export const switchSecondhMethod = (id, pagepermisson) => {
  React.$axios.patch(`/children/${id}`, {
    pagepermisson,
  })
}

// RoleList
export const getRoleList = async () => {
  const { data: res } = await React.$axios.get('/roles')
  return res
}

export const deleteRole = (id) => {
  React.$axios.delete(`roles/${id}`)
}

export const getRoleRightList = async () => {
  const { data: res } = await React.$axios.get(`/rights?_embed=children`)
  return res
}

export const changeRightLists = async (id, rights) => {
  const { data: res } = await React.$axios.patch(`roles/${id}`, {
    rights,
  })
  return res
}

// userList
export const getUserList = async () => {
  const { data: res } = await React.$axios.get(`/users?_expand=role`)
  return res
}

export const RegionList = async () => {
  const { data: res } = await React.$axios.get(`/regions`)
  return res
}

export const addPerson = async (val) => {
  const { data: res } = await React.$axios.post(`/users`, {
    ...val,
    roleState: true,
    default: false,
  })
  return res
}

export const deleteUser = async (id) => {
  const { data: res } = await React.$axios.delete(`/users/${id}`)
  return res
}

export const changeState = async (item) => {
  const { data: res } = await React.$axios.patch(`/users/${item.id}`, {
    roleState: !item.roleState,
  })
  return res
}

export const updateUser = async (currnet, value) => {
  const { data: res } = await React.$axios.patch(`/users/${currnet.id}`, value)
  return res
}

// login page
export const login = async (value) => {
  const { data: res } = await React.$axios.get(`/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role`)
  return res
}

// Add
export const cateGory = async () => {
  const { data: res } = await React.$axios.get('/categories')
  return res
}

export const save = async (fromInfo, content, auditState) => {
  const user = JSON.parse(localStorage.getItem('token'))
  const { data: res } = await React.$axios.post('/news', {
    ...fromInfo,
    content,
    region: user.region ? user.region : '全球',
    author: user.username,
    roleId: user.roleId,
    auditState,
    publishState: 0,
    createTime: Date.now(),
    star: 0,
    view: 0,
    publishTime: 0,
  })
  return res
}

// draft
export const getDraft = async () => {
  const { data: res } = await React.$axios.get(`/news?author=${user.username}&auditState=0&_expand=category`)
  return res
}

export const submitCheck = async (id) => {
  const { data: res } = React.$axios.patch(`/news/${id}`, {
    auditState: 1,
  })
  return res
}

// NewsPreview
export const getArticleInfo = async (id) => {
  const { data: res } = await React.$axios.get(`/news/${id}?_expand=category&_expand=role`)
  return res
}

// NewsUpdate
export const save2 = async (fromInfo, content, auditState, id) => {
  const { data: res } = await React.$axios.patch(`/news${id}`, {
    ...fromInfo,
    content,
    region: user.region ? user.region : '全球',
    author: user.username,
    roleId: user.roleId,
    auditState,
    publishState: 0,
    createTime: Date.now(),
    star: 0,
    view: 0,
    publishTime: 0,
  })
  return res
}

// List
export const auditList = async () => {
  const { data: res } = await React.$axios.get(`/news?author=${user.username}&auditState_ne=0&publishState_lte=1&_expand=category`)
  return res
}

export const handleRervert = async (item) => {
  const { data: res } = await React.$axios.patch(`/news/${item.id}`, {
    auditState: 0,
  })
  return res
}

export const publish = async (id) => {
  const { data: res } = await React.$axios.patch(`/news/${id}`, {
    publishState: 2,
    publishTime: Date.now()
  })
  return res
}

// audit
export const getAuditList = async () => {
  const { data: res } = await React.$axios.get(`/news?auditState=1&_expand=category`)
  return res
}

// category
export const getCateGory = async () => {
  const { data: res} = await React.$axios.get(`categories`)
  return res
}

export const deleteCateGory = async (id) => {
  React.$axios.delete(`/categories/${id}`)
}


// Home
export const getMostView = async () => {
  const { data: res } = await React.$axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`)
  return res
}

export const getGood = async () => {
  const { data: res } = await React.$axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`)
  return res
}

export const getEchInfo = async () => {
  const { data: res } = await React.$axios.get(`/news?publishState=2&_expand=category`)
  return res
}