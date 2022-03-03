import { useEffect, useState } from 'react'
import { notification } from 'antd'
import axios from 'axios'

function usePublish(type) {
  const { username } = JSON.parse(localStorage.getItem('token'))
  const [dataSource, setDataSource] = useState([])

  const getPublishInfo = async () => {
    const { data: res } = await axios.get(`/news?author=${username}&publishState=${type}&_expand=category`)
    setDataSource(res)
  }

  const handlePublish = (id) => {
    axios
      .patch(`/news/${id}`, {
        publishState: 2,
        publishTime: Date.now(),
      })
      .then((val) => {
        notification.info({
          message: '通知',
          description: `您可以到已发布中查看您的新闻`,
          placement: 'topRight',
        })
        getPublishInfo()
      })
  }
  const handleSunset = (id) => {
    axios
      .patch(`/news/${id}`, {
        publishState: 3,
      })
      .then((val) => {
        notification.info({
          message: '通知',
          description: `您可以到已下线中查看您的新闻`,
          placement: 'topRight',
        })
        getPublishInfo()
      })
  }
  const handleDelete = (id) => {
    axios.delete(`/news/${id}`).then((val) => {
      notification.info({
        message: '通知',
        description: `您已经删除了您的新闻`,
        placement: 'topRight',
      })
      getPublishInfo()
    })
  }

  useEffect(() => {
    getPublishInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete,
  }
}

export default usePublish
