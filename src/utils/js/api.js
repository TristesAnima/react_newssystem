import axios from 'axios'

// RightList
export const getRightList = async () => {
  const { data: res } = await axios.get('/rights?_embed=children')
  return res
}

export const deleteItem = (id) => {
  axios.delete(`/rights/${id}`)
}

export const deleteSecondItem = (id) => {
  axios.delete(`/children/${id}`)
}

export const switchMethod = (id, pagepermisson) => {
  axios.patch(`/rights/${id}`, {
    pagepermisson: pagepermisson === 1 ? 0 : 1,
  })
}

export const switchSecondhMethod = (id, pagepermisson) => {
  axios.patch(`/children/${id}`, {
    pagepermisson,
  })
}

// RoleList
export const getRoleList = async () => {
  const { data: res } = await axios.get('/roles')
  return res
}

export const deleteRole = (id) => {
  axios.delete(`roles/${id}`)
}

export const getRoleRightList = async () => {
  const { data: res } = await axios.get(`/rights?_embed=children`)
  return res
}

export const changeRightLists = async (id, rights) => {
  const { data: res } = await axios.patch(`roles/${id}`, {
    rights,
  })
  return res
}

// userList
export const getUserList = async () => {
  const { data: res } = await axios.get(`/users?_expand=role`)
  return res
}

export const RegionList = async () => {
  const { data: res } = await axios.get(`/regions`)
  return res
}

export const addPerson = async (val) => {
  const { data: res } = await axios.post(`/users`, {
    ...val,
    roleState: true,
    default: false,
  })
  return res
}

export const deleteUser = async (id) => {
  const { data: res } = await axios.delete(`/users/${id}`)
  return res
}

export const changeState = async (item) => {
  const { data: res } = await axios.patch(`/users/${item.id}`, {
    roleState: !item.roleState,
  })
  return res
}

export const updateUser = async (currnet, value) => {
  const { data: res } = await axios.patch(`/users/${currnet.id}`, value)
  return res
}
