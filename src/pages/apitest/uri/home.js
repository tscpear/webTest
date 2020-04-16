import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Pagination, Tag, Select, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getApiUriList } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'

const Option = Select.Option


export default class UriHome extends Component {
    state = {
        total: 0,
        uriList: [],
        loading: false,
        obj: {
            page: 1,
            uriValue: '',
            uriMark: '',
            device: '0',
            limit: PAGE_SIZE
        }
    }


    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '接口编号',
                dataIndex: 'uriId',
                key: 'uriId',
                width: 100,
                align: "center"
            },
            {
                title: '设备',
                dataIndex: 'device',
                key: 'device',
                align: "center",
                width: 100,
                render: device => {
                    let color
                    let value
                    if (device === 2) {
                        color = 'green'
                        value = '知轮商家'
                    } else if (device === 1) {
                        color = 'black'
                        value = '知轮后台'
                    }
                    return (
                        <Tag color={color} key={value}>
                            {value.toUpperCase()}
                        </Tag>
                    )

                }
            },
            {
                title: '接口路径',
                dataIndex: 'uri',
                key: 'uri',
            },
            {
                title: '请求方法',
                dataIndex: 'method',
                key: 'method',
                align: "center",
                width: 100,
                render: method => {
                    let color
                    let value
                    if (method === 1) {
                        color = '#2db7f5'
                        value = 'GET'
                    } else if (method === 2) {
                        color = '#87d068'
                        value = 'POST'
                    } else if (method === 3) {
                        color = '#108ee9'
                        value = 'PUT'
                    }
                    return (
                        <Tag color={color} key={value}>
                            {value}
                        </Tag>
                    )

                }
            },
            {
                title: '描述',
                dataIndex: 'mark',
                key: 'mark',


            },
            {
                title: '用例数量',
                dataIndex: 'testNum',
                key: 'testNum',
                align: "center",
                width: 100
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: () => {
                    return (<div >
                        <a style={{ padding: "0 5px" }}><PlusOutlined /></a>
                        <a onClick={()=> this.props.history.push('/apitest/uri/updata')} style={{ padding: "0 5px" }}><EditOutlined /></a>
                        <a style={{ padding: "0 5px" }}><DeleteOutlined twoToneColor="red" /></a>
                    </div>)

                }
            }
        ]

    }

    getUriList = async (obj) => {
        this.setState({ loading: true })
        const response = await getApiUriList(obj)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 0) {
            const uriList = result.data
            const count = result.count
            uriList.map((item, index) => {
                item.key = index
            })
            //更新状态
            this.setState({
                uriList,
                total: count
            })
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }

    //为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }
    //执行异步任务
    componentDidMount() {
        const { obj } = this.state
        this.getUriList(obj)
    }

    rearchChange = (value, type) => {
        const { obj } = this.state
        obj.page = 1
        if (type === 1) {
            obj.device = value
        } else if (type === 2) {
            obj.uriValue = value.target.value
        } else if (type === 3) {
            obj.uriMark = value.target.value
        }
        this.setState({ obj: obj })
        this.getUriList(obj)
        console.log(obj)

    }
    handleChange = (value) => {
        this.rearchChange(value, 1)
    }
    uriValueChange = (value) => {
        this.rearchChange(value, 2)
    }
    uriMarkChange = (value) => {
        this.rearchChange(value, 3)
    }
    clear = () => {
        console.log('你妈妈妈妈')
        const { obj } = this.state
        obj.device = '0'
        obj.uriValue = ''
        obj.uriMark = ''
        this.setState({ obj: obj })
        this.getUriList(obj)
    }

    render() {
        const { uriList, total, loading, obj } = this.state
        const title = (
            <span>
                <Select style={{ width: 150 }} defaultValue={obj.device} onChange={this.handleChange}>
                    <Option value='0'>请选择设备</Option>
                    <Option value='1'>知轮后台</Option>
                    <Option value='2'>知轮商家</Option>
                    <Option value='3'>车服小程序</Option>
                    <Option value='4'>知轮车服</Option>
                    <Option value='5'>分仓终端</Option>
                    <Option value='6'>商城后台</Option>
                    <Option value='7'>店铺后台</Option>
                    <Option value='8'>知轮三包</Option>
                    <Option value='9'>知轮通</Option>
                    <Option value='10'>知轮互联</Option>
                    <Option value='11'>车服H5</Option>
                    <Option value='12'>知轮车队</Option>
                </Select>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='路径' value={obj.uriValue} onChange={event => this.uriValueChange(event)}>
                </Input>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='描述' value={obj.uriMark} onChange={event => this.uriMarkChange(event)}>
                </Input>
                <Button type="primary" onClick={() => this.clear()}>
                    清空
                </Button>
            </span>
        )
        const extra = (

            <Button type="primary" color='pick' onClick={()=>this.props.history.push('/apitest/uri/add')}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table
                    columns={this.columns}
                    dataSource={uriList}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        onChange: (pageNum) => {
                            obj.page = pageNum
                            obj.limit = PAGE_SIZE
                            this.getUriList(obj)
                        }
                    }}
                />
            </Card>
        )
    }
}