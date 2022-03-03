import React from 'react'
import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish.jsx'
import usePublish from '../../../components/publish-manage/usePublish.js'

export default function UnPublished() {
  const { dataSource, handlePublish } = usePublish(1)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button
            type="primary"
            onClick={() => {
              handlePublish(id)
            }}
          >
            发布
          </Button>
        )}
      ></NewsPublish>
    </div>
  )
}
