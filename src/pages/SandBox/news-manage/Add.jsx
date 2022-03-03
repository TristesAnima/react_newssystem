import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import NewEditor from '../../../components/news-manage/NewEditor.jsx'

const { Step } = Steps
const { Option } = Select

export default function Add() {
  let navigate = useNavigate()

  const [current, setCurrent] = useState(0)
  const [cates, setCates] = useState([])
  const formRef = useRef(null)
  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState('')

  const handleNext = () => {
    if (current === 0) {
      formRef.current.validateFields().then((res) => {
        setFormInfo(res)
        setCurrent(current + 1)
      })
    } else {
      if (content === '' || content.trim() === '<p></p>') {
        message.error('输入内容不能为空')
      } else {
        setCurrent(current + 1)
      }
    }
  }

  const handlePrevious = () => {
    setCurrent(current - 1)
  }

  const cateGory = () => {
    React.$api.cateGory().then((val) => {
      setCates(val)
    })
  }

  useEffect(() => {
    cateGory()
  }, [])

  const handleSave = (auditState) => {
    React.$api.save(formInfo, content, auditState).then((val) => {
      navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
      notification.info({
        message: '通知',
        description: `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
        placement: 'topRight',
      })
    })
  }

  return (
    <div>
      <PageHeader className="site-page-header" title="撰写新闻" />

      <Steps current={current}>
        <Step title="基本信息" description="新闻标题,新闻分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或提交审核" />
      </Steps>

      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : style.active}>
          <Form ref={formRef} name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} initialValues={{ remember: true }} autoComplete="off">
            <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="新闻分类" name="categoryId" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Select>
                {cates.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : style.active}>
          <NewEditor
            getContent={(val) => {
              setContent(val)
            }}
          ></NewEditor>
        </div>
        <div className={current === 2 ? '' : style.active}></div>
      </div>

      <div style={{ marginTop: '50px' }}>
        {current === 2 && (
          <span>
            <Button
              type="primary"
              onClick={() => {
                handleSave(0)
              }}
            >
              保存草稿箱
            </Button>
            <Button
              danger
              onClick={() => {
                handleSave(1)
              }}
            >
              提交审核
            </Button>
          </span>
        )}
        {current < 2 && (
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        )}
        {current > 0 && <Button onClick={handlePrevious}>上一步</Button>}
      </div>
    </div>
  )
}
