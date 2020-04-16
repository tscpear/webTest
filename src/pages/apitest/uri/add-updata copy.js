import React, { Component } from "react";
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox
} from 'antd'
import { ArrowLeftOutlined, PlusCircleTwoTone, CloseCircleTwoTone, PlusSquareTwoTone, MinusSquareTwoTone } from '@ant-design/icons';
import header from "../../../components/header";
const { Item } = Form
const { TextArea } = Input
const { Option } = Select





/**
 * 新增和编辑
 */
export default class UriAddUpdata extends Component {
    state = {
        uriValues: {
            display1: 'none',
            display2: 'none'
        },
        headerValues: {
            type: 'headerValues',
            display: 'none',
            tabList: [],
            tab1: 1,
            key: 'headerValue1',
            headerValue1: [
                {

                    type: 'headerValue1',
                    name1: '请输入参数名',
                    name2: '请输入参数值',
                },
            ],
            headerValue2: [{
                type: 'headerValue2',
                name: '请输入依赖接口',
                cards: [{
                    type: 'headerValue2s',
                    name1: '请输入参数名',
                    name2: '请输入参数值',
                }]
            },
            {
                type: 'headerValue2',
                name: '请输入依赖接口',
                cards: [{
                    type: 'headerValue2s',
                    name1: '请输入参数名',
                    name2: '请输入参数值',
                }]
            },
            {
                type: 'headerValue2',
                name: '请输入依赖接口',
                cards: [{
                    type: 'headerValue2s',
                    name1: '请输入参数名',
                    name2: '请输入参数值',
                },
                {
                    type: 'headerValue2s',
                    name1: '请输入参数名',
                    name2: '请输入参数值',
                }]
            }],
            headerValue3: [
                {
                    type: 'headerValue3',
                    name1: '请输入参数名',
                    name2: '请输入默认值',
                },
            ],



        },
        data: {
            headerType: ['0']

        },

    }
    updataState = (values) => {
        if (values.type === 'headerValues') {
            this.setState({ headerValues: values })
        }
    }

    uriValueChange = e => {
        const { uriValues } = this.state
        if (e.target.value === '0' || e.target.value === '3') {
            uriValues.display1 = 'none'
            uriValues.display2 = 'none'
            this.setState({ uriValue: uriValues })
        }
        if (e.target.value === '1') {
            uriValues.display1 = 'block'
            uriValues.display2 = 'none'
            this.setState({ uriValue: uriValues })
        }
        if (e.target.value === '2') {
            uriValues.display1 = 'none'
            uriValues.display2 = 'block'
            this.setState({ uriValue: uriValues })
        }

    }
    headerTypeOnChange = (e, data, values) => {
        let length = e.length
        let es = ['0']
        values.tabList = []
        if (length === 0) {

        } else {
            if (e[length - 1] === '0') {
                data.headerType = ['0']
            } else {

                let i = 0
                e.map((item) => {
                    if (!(item == 0)) {
                        es[i] = item
                        i++
                    }

                })
                if (e[length - 1] === '1') {
                    values.key = 'headerValue1'
                }
                if (e[length - 1] === '2') {
                    values.key = 'headerValue2'
                }
                if (e[length - 1] === '3') {
                    values.key = 'headerValue3'
                }

            }

            es = es.sort()
            data.headerType = es
            if (es[0] === "0") {
                values.display = 'none'
            } else {
                values.display = 'block'
                es.map(item => {
                    if (item == 1) {
                        values.tabList.push({
                            key: 'headerValue1',
                            tab: this.tabTitleStyle('固定参数')
                        })

                    }
                    if (item == 2) {
                        values.tabList.push({
                            key: 'headerValue2',
                            tab: this.tabTitleStyle('继承参数')
                        })

                    }
                    if (item == 3) {
                        values.tabList.push({
                            key: 'headerValue3',
                            tab: this.tabTitleStyle('自定义参数')
                        })

                    }
                })
            }
            this.setState({ data: data })
            this.updataState(values)

        }

    }
    tabTitleStyle = (value) => {
        return (
            <div style={{ fontSize: '15px', color: 'green' }}>
                {value}
            </div>
        )
    }

    onTabChange = (key, values) => {
        values.key = key
        this.updataState(values)
    }






    vv = (item) => {
        let value
        if (item.type.indexOf('headerValue') >= 0) {
            value = this.state.headerValues
        }
        return value
    }

    vvv = (item, value, indexs) => {
        let v
        if (item.type === 'headerValue1') {
            v = value.headerValue1
        } else if (item.type === 'headerValue2') {
            v = value.headerValue2
        } else if (item.type === 'headerValue3') {
            v = value.headerValue3
        } else if (item.type === 'headerValue2s') {
            v = value.headerValue2[indexs].cards
        }
        return v
    }






    del = (item, index, indexs) => {
        let value = this.vv(item)
        let v = this.vvv(item, value, indexs)
        v.splice(index, 1)
        this.updataState(value)

    }

    add = (item, index, indexs) => {
        let value = this.vv(item)
        let v = this.vvv(item, value, indexs)
        let newItem
        let cards
        if (item.type === 'headerValue2s') {
            newItem = {
                id: indexs,
                type: 'headerValue2s',
                name1: '请输入参数名',
                name2: '请输入参数值',
            }
            cards = Object.assign([], v)
            cards.push(newItem)
            value.headerValue2.map((item, index) => {

                if (index === indexs) {
                    item.cards = cards
                    console.log(item)
                }
                console.log(item)
            })
        } else {
            v.push(item)
        }


        this.updataState(value)
    }

    render() {
        const { uriValues, headerValues, data } = this.state
        const title = (
            <span>
                <a onClick={() => this.props.history.push('/apitest/uri')}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px' }}>
                    编辑
                </span>
            </span>

        )




        const formItemLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 10 },
        }

        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };


        const twoInput = (item, index) => (
            <div style={{ padding: '0px 0px 2px 0px' }}>
                <Input style={{ width: '30%' }} placeholder={item.name1} />
                <Input style={{ width: '65%' }} placeholder={item.name2} />
                <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
                    {addDel(item, index)}
                </a>
            </div>
        )


        const threeInput = (item, indexs) => (
            <div style={{ padding: '5px 0px 5px 5px', border: '1px solid gray', margin: '5px 0px' }}>
                <div>
                    <Input style={{ width: '95%' }} placeholder={item.name} />
                    <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
                        {addDel(item, indexs)}
                    </a>
                </div>
                {item.cards.map((item, index) => {
                    return (
                        <div>
                            <Input style={{ width: '30%' }} placeholder={item.name1} />
                            <Input style={{ width: '65%' }} placeholder={item.name2} />
                            <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
                                {addDel(item, index, indexs)}
                            </a>
                        </div>
                    )
                })}
            </div>
        )






        const addDel = (item, index, indexs) => {
            if (index === 0) {
                if (item.type === 'headerValue2s') {
                    return (
                        <PlusSquareTwoTone twoToneColor='#2E8B57' onClick={() => this.add(item, index, indexs)} />
                    )

                }
                return (
                    <PlusCircleTwoTone onClick={() => this.add(item, index)} />
                )
            } else {
                if (item.type === 'headerValue2s') {
                    return (
                        <MinusSquareTwoTone twoToneColor='#CD5555' onClick={() => this.del(item, index, indexs)} />
                    )
                }
                return (
                    <CloseCircleTwoTone twoToneColor='#EEC900' onClick={() => this.del(item, index)} />
                )
            }

        }




        const contentList = {
            headerValue1:
                <Item>
                    {
                        headerValues.headerValue1.map((item, index) => {
                            return (
                                <div>
                                    {twoInput(item, index)}
                                </div>
                            )
                        })
                    }

                </Item>,

            headerValue2: <Item>
                {
                    headerValues.headerValue2.map((item, index) => {
                        return (
                            <div>
                                {threeInput(item, index)}
                            </div>
                        )
                    })
                }
            </Item>,

            headerValue3: <Item>
                {
                    headerValues.headerValue3.map((item, index) => {
                        return (
                            <div>
                                {twoInput(item, index)}
                            </div>
                        )
                    })
                }
            </Item>,

        };



        return (



            <Card title={title} >
                <Form {...formItemLayout}>
                    <Item label='接口路径' name='uri'>
                        <Input />
                    </Item>
                    <Item label='设备终端' name='device'>
                        <Select>
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
                    </Item>
                    <Item label='请求方式' name='method'>
                        <Radio.Group>
                            <Radio value='1'><Tag color="gold">GET</Tag></Radio>
                            <Radio value='2'><Tag color="purple">POST</Tag></Radio>
                            <Radio value='3'><Tag color="cyan">PUT</Tag></Radio>
                        </Radio.Group>
                    </Item>
                    <Item label='描述' name='mark'>
                        <Input />
                    </Item>
                    <Item label='路径传参' name='uripar'>
                        <Card>
                            <div>
                                <Radio.Group onChange={this.uriValueChange}>
                                    <Radio value='0'><Tag color="orange">无传参</Tag></Radio>
                                    <Radio value='1'><Tag color="orange">固定参数</Tag></Radio>
                                    <Radio value='2'><Tag color="orange">继承参数</Tag></Radio>
                                    <Radio value='4'><Tag color="orange">自定义参数</Tag></Radio>
                                </Radio.Group>
                            </div>
                            <div style={{ padding: '15px 0px', display: uriValues.display1 }}>
                                <Input placeholder='请填写路径固定参数' />
                            </div>
                            <div style={{ padding: '15px 0px', display: uriValues.display2 }}>
                                <Item label='依赖接口'>
                                    <Input />
                                </Item>
                                <Item label='依赖参数'>
                                    <Input />
                                </Item>
                            </div>

                        </Card>

                    </Item>
                    <Item label='header'>
                        <Card>
                            <div>
                                <Checkbox.Group onChange={(e) => this.headerTypeOnChange(e, data, headerValues)} value={data.headerType}>
                                    <Checkbox value='0'><Tag color="purple">无传参</Tag></Checkbox>
                                    <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                                    <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                                    <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                                </Checkbox.Group>
                            </div>
                            <div style={{ padding: '15px 0px', display: headerValues.display }}>
                                <Card
                                    style={{ width: '100%' }}
                                    tabList={headerValues.tabList}
                                    activeTabKey={headerValues.key}
                                    onTabChange={key => {
                                        this.onTabChange(key, headerValues);
                                    }}
                                >
                                    {contentList[headerValues.key]}
                                </Card>
                            </div>
                        </Card>
                    </Item>
                    <Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>



                </Form>
            </Card >
        )
    }
}