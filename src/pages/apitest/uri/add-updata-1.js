import React, { Component } from "react";
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox
} from 'antd'
import { ArrowLeftOutlined, PlusCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
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
                    id: 0,
                }
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

    delHVI = (values, input, index) => {
        input[index] = undefined
        let inputs = []
        input.map(item => {
            if (item) {
                inputs.push(item)
            }
        })
        values.input2 = inputs
        this.updataState(values)

    }

    // addHVI = (values, input, title) => {
    //     console.log('你妈妈吗')
    //     let index = input.length
    //     if (title === '请输入依赖接口~~~~~~~亲') {
    //         const div = (
    //             <div style={{ padding: '5px 0px 5px 5px', border: '1px solid gray', margin: '5px 0px' }}  >
    //                 <div>
    //                     <Input style={{ width: '95%' }} placeholder='请输入依赖接口~~~~~~~亲' />
    //                     <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
    //                         <CloseCircleTwoTone twoToneColor='#EEC900' onClick={() => this.delHVI(values, input, index)} />
    //                     </a>
    //                 </div>
    //                 <div style={{ padding: '0px 0px 2px 0px' }}>
    //                     <Input style={{ width: '30%' }} placeholder='请输入参数名' />
    //                     <Input style={{ width: '65%' }} placeholder='请输入依赖值' />
    //                     <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
    //                         <PlusCircleTwoTone onClick={() => this.addHVI(values, input[index].input, '请输入依赖接口~~~~~~~亲')} />
    //                     </a>
    //                 </div>
    //                 {console.log('你爹')}
    //                 {(this.pVss())}
    //             </div>
    //         )
    //         input.push({ div: div, input: [] })
    //     } else {
    //         input.push(
    //             <div>
    //                 <Input style={{ width: '30%' }} placeholder='输入参数名' />
    //                 <Input style={{ width: '65%' }} placeholder={title} />
    //                 <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }}>
    //                     <CloseCircleTwoTone twoToneColor='#EEC900' onClick={() => this.delHVI(values, input, index)} />
    //                 </a>
    //             </div>
    //         )
    //     }
    //     // values.input.input2[index].input = input


    //     this.updataState(values)
    // }



    pV = (input) => {
        if (input) {
            let inputs = []
            input.map(item => {
                inputs.push(item)
            })
            return inputs
        }

    }

    pVs = (input) => {
        let inputs = []
        input.map(item => {
            inputs.push(item.div)
        })

        return inputs
    }


    pVss = () => {
        let inputs = []
        console.log('nimamm ')
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



        const contentList = {
            headerValue1:
                <Item>
                    {
                    headerValues.headerValue1.map((item) => {
                        <div style={{ padding: '0px 0px 2px 0px' }}>
                                <Input style={{ width: '30%' }} placeholder='输入参数名' />
                                 <Input style={{ width: '65%' }} placeholder='输入参数值' />
                                 <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }} onClick={() => this.addHVI(headerValues, headerValues.input1, '请输入参数')}>
                                     <PlusCircleTwoTone />
                                 </a>
                             </div>

                    })}
                </Item>,
            // <Item>
            //     <div style={{ padding: '0px 0px 2px 0px' }}>
            //         <Input style={{ width: '30%' }} placeholder='输入参数名' />
            //         <Input style={{ width: '65%' }} placeholder='输入参数值' />
            //         <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }} onClick={() => this.addHVI(headerValues, headerValues.input1, '请输入参数')}>
            //             <PlusCircleTwoTone />
            //         </a>
            //     </div>
            //     {this.pV(headerValues.input1)}
            // </Item>,
            headerValue2: <p>2</p>,
            // <Item>
            //     <div style={{ padding: '5px 0px 5px 5px', 'border': '1px solid gray', margin: '5px 0px' }}  >
            //         <div>
            //             <Input style={{ width: '95%' }} placeholder='请输入依赖接口~~~~~~~亲' />
            //             <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }} onClick={() => this.addHVI(headerValues, headerValues.input2, '请输入依赖接口~~~~~~~亲')}>
            //                 <PlusCircleTwoTone />
            //             </a>
            //         </div>
            //         <div style={{ padding: '0px 0px 2px 0px' }}>
            //             <Input style={{ width: '30%' }} placeholder='请输入参数名' />
            //             <Input style={{ width: '65%' }} placeholder='请输入依赖值' />
            //             <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }} onClick={() => this.addHVI(headerValues, headerValues.input4, '请输入默认值')}>
            //                 <PlusCircleTwoTone />
            //             </a>
            //         </div>
            //         {this.pV(headerValues.input4)}
            //     </div>
            //     {this.pVs(headerValues.input2)}
            // </Item>,
            headerValue3: <p>3</p>
            //  <Item>
            //     <div style={{ padding: '0px 0px 2px 0px' }}>
            //         <Input style={{ width: '30%' }} placeholder='请输入参数名' />
            //         <Input style={{ width: '65%' }} placeholder='输入默认值' />
            //         <a style={{ padding: '0px 0px 0px 5px', fontSize: '20px' }} onClick={() => this.addHVI(headerValues, headerValues.input3, '请输入默认值')}>
            //             <PlusCircleTwoTone />
            //         </a>
            //     </div>
            //     {this.pV(headerValues.input3)}
            // </Item>,
        };



        return (



            <Card title={title}>
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


                </Form>
            </Card>
        )
    }
}