import React from 'react'
import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish.jsx'
import usePublish from '../../../components/publish-manage/usePublish.js'

export default function SunSet() {
  const { dataSource, handleDelete } = usePublish(3)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            danger
            onClick={() => {
              handleDelete(id)
            }}
          >
            删除
          </Button>
        )}
      ></NewsPublish>
    </div>
  )
}
