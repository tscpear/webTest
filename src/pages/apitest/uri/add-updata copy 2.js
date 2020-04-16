import React, { Component } from "react";
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col
} from 'antd'
import { ArrowLeftOutlined, PlusCircleTwoTone, CloseCircleTwoTone, PlusSquareTwoTone, MinusSquareTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
            display2: 'none',
        },
        headerValues: {
            type: 'headerValues',
            display: 'none',
            tabList: [],
            tab1: 1,
            key: '1',
            name: ['headerFixedParam', 'headerRelyParam', 'headerManualParam']
        },
        param: {
            type: 'param',
            display: 'none',
            tabList: [],
            tab1: 1,
            key: '1',
            name: ["formFixedParam", 'formRelyParam', 'formManualParam']
        },
        boby: {
            type: 'boby',
            display: 'none',
            tabList: [],
            tab1: 1,
            key: '1',
            name: ['bobyFixedParam', 'bobRelyParam', 'bobyManualParam']
        },
        data: {
            headerType: ['0'],
            paramType: ['0'],
            bobyType: ['0'],


        },

    }
    updataState = (values) => {
        if (values.type === 'headerValues') {
            this.setState({ headerValues: values })
        } else if (values.type === 'param') {
            this.setState({ param: values })
        } else if (values.type === 'boby') {
            this.setState({ boby: values })
        }
    }

    uriValueChange = e => {
        const { uriValues, data } = this.state
        if (e.target.value === '0' || e.target.value === '3') {
            uriValues.display1 = 'none'
            uriValues.display2 = 'none'
            this.setState({ uriValue: uriValues, data: data })
        }
        if (e.target.value === '1') {
            uriValues.display1 = 'block'
            uriValues.display2 = 'none'
            this.setState({ uriValue: uriValues, data: data })
        }
        if (e.target.value === '2') {
            uriValues.display1 = 'none'
            uriValues.display2 = 'block'
            this.setState({ uriValue: uriValues, data: data })
        }

    }
    headerTypeOnChange = (e, data, values) => {
        let length = e.length
        let es = ['0']
        let cs
        let key1 = '1'
        if (values.type === 'headerValues') {
            cs = data.headerType
        } else if (values.type === 'param') {
            cs = data.paramType
        } else if (values.type === 'boby') {
            cs = data.bobyType
            key1 = '4'
        }
        values.tabList = []
        if (length === 0) {

        } else {
            if (e[length - 1] === '0') {
                es = ['0']
            } else {

                let i = 0
                e.map((item) => {
                    if (!(item == 0)) {
                        es[i] = item
                        i++
                    }

                })
                if (e[length - 1] === '1') {
                    values.key = key1
                }
                if (e[length - 1] === '2') {
                    values.key = '2'
                }
                if (e[length - 1] === '3') {
                    values.key = '3'
                }

            }

            es = es.sort()



            if (values.type === 'headerValues') {
                data.headerType = es
            } else if (values.type === 'param') {
                data.paramType = es
            } else if (values.type === 'boby') {
                data.bobyType = es
            }
            if (es[0] === "0") {
                values.display = 'none'
            } else {
                values.display = 'block'
                es.map(item => {
                    if (item == 1) {
                        values.tabList.push({
                            key: key1,
                            tab: this.tabTitleStyle('固定参数')
                        })

                    }
                    if (item == 2) {
                        values.tabList.push({
                            key: '2',
                            tab: this.tabTitleStyle('继承参数')
                        })

                    }
                    if (item == 3) {
                        values.tabList.push({
                            key: '3',
                            tab: this.tabTitleStyle('自定义参数')
                        })

                    }
                })
            }
            this.setState({ data: data })
            this.updataState(values)
            console.log(this.state.data.headerType)

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




    addListItem1 = (name, param, value) => {
        const rules = [{
            required: true,
            whitespace: true,
            message: "咋不填呢",
        }];
        return (
            <Form.List name={name} >
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Row key={field.key} >
                                    <Col style={{ width: '30%', padding: '0px 5px 0px 0px' }}>
                                        <Form.Item
                                            name={[field.name, 'name']}
                                            fieldKey={[field.fieldKey, 'name']}
                                            rules={rules}
                                        >
                                            <Input placeholder={param} />
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ width: '65%' }}>
                                        <Form.Item
                                            name={[field.name, "value"]}
                                            fieldKey={[field.fieldKey, "value"]}
                                            rules={rules}
                                        >
                                            <Input placeholder={value} />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="none" style={{ width: '5%' }} >
                                        <MinusCircleOutlined
                                            style={{ height: '15px', padding: '8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: "95%" }}
                                >
                                    <PlusOutlined /> 添加
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>
        )
    }


    addListItem2 = (name) => {
        return (
            <Form.List name={name}>
                {(fields, { add, remove }) => {
                    const rules = [{
                        required: true,
                        whitespace: true,
                        message: "咋不填呢",
                    }];
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Row key={field.key} >
                                    <Col style={{ width: '90%', padding: '0px 5px 0px 0px' }}>
                                        <Form.Item
                                            name={[field.name, 'api']}
                                            fieldKey={[field.fieldKey, 'api']}
                                            rules={rules}
                                        >
                                            <Input placeholder='请输入依赖接口' />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="none" style={{ width: '5%' }} >
                                        <MinusCircleOutlined
                                            style={{ height: '15px', padding: '8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Col>

                                    <Col style={{ width: '30%', padding: '0px 5px 0px 0px' }}>
                                        <Form.Item
                                            name={[field.name, 'name']}
                                            fieldKey={[field.fieldKey, 'name']}
                                            rules={rules}
                                        >
                                            <Input placeholder='参数名' />
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ width: '65%' }}>
                                        <Form.Item
                                            name={[field.name, "value"]}
                                            fieldKey={[field.fieldKey, "value"]}
                                            rules={rules}
                                        >
                                            <Input placeholder='依赖参数值' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '95%' }}
                                >
                                    <PlusOutlined /> 添加接依赖接口
                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>
        )
    }





    render() {
        const { uriValues, headerValues, data, param, boby } = this.state
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
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        }


        const contentList = (values) => {
            return (
                {
                    1:
                        <div >
                            {this.addListItem1(values.name[0], '参数名', '参数值')}
                        </div>,
                    2:
                        <div>
                            {this.addListItem2('values.name[1]')}
                        </div>,
                    3:
                        <div >
                            {this.addListItem1('values.name[2]', '参数名', '默认值')}
                        </div>,
                    4:
                        <div>
                            <Item name={values.name[0]}>
                                <Input.TextArea
                                    onChange={this.onChange}
                                    placeholder="亲~~~~~~~~~~~~~请输入json参数的基本格式"
                                    autoSize={{ minRows: 3, maxRows: 15 }}>
                                </Input.TextArea>
                            </Item>
                        </div>,

                }
            )

        };


        const onFinish = values => {
            let value = values
            value = values.headerType = this.state.data.headerType
            value = values.paramType = this.state.data.paramType
            value = values.bobyType = this.state.data.bobyType
            console.log('Received values of form: ', values);
        }

        //验证规则
        const rules = [{
            required: false,
            whitespace: true,
            message: "咋不填呢",
        }]

        // 一级累加输入框

        const fristInput=()=>{
            
        }
        return (



            <Card title={title} >
                <Form {...formItemLayout}
                    name="normal_login"
                    onFinish={onFinish}
                >
                    <Item label='接口路径' name='uri' rules={rules}>
                        <Input />
                    </Item>
                    <Item label='设备终端' name='device' rules={rules}>
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
                    <Item label='请求方式' name='method' rules={rules}>
                        <Radio.Group>
                            <Radio value='1'><Tag color="gold">GET</Tag></Radio>
                            <Radio value='2'><Tag color="purple">POST</Tag></Radio>
                            <Radio value='3'><Tag color="cyan">PUT</Tag></Radio>
                        </Radio.Group>
                    </Item>
                    <Item label='描述' name='mark' rules={rules}>
                        <Input />
                    </Item>
                    <Item label='路径传参' >
                        <Card>
                            <Item name='uriType'>
                                <Radio.Group onChange={this.uriValueChange} defaultValue='0'>
                                    <Radio value='0'><Tag color="orange">无传参</Tag></Radio>
                                    <Radio value='1'><Tag color="orange">固定参数</Tag></Radio>
                                    <Radio value='2'><Tag color="orange">继承参数</Tag></Radio>
                                    <Radio value='4'><Tag color="orange">自定义参数</Tag></Radio>
                                </Radio.Group>
                            </Item>
                            <div style={{ padding: '15px 0px', display: uriValues.display1 }}>
                                <Item name='uriFixedParam' rules={rules} >
                                    <Input placeholder='请填写路径固定参数' rules={rules} />
                                </Item>
                            </div>
                            <div style={{ padding: '15px 0px', display: uriValues.display2 }}>
                                <Item label='依赖接口' rules={rules} name='uriRelyUri'>
                                    <Input />
                                </Item>
                                <Item label='依赖参数' rules={rules} name='uriRelyParam'>
                                    <Input />
                                </Item>
                            </div>
                        </Card>

                    </Item>
                    <Item label='header'>
                        <Card>

                            <Checkbox.Group onChange={(e) => this.headerTypeOnChange(e, data, headerValues)} value={data.headerType}>
                                <Checkbox value='0'><Tag color="purple">无传参</Tag></Checkbox>
                                <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                                <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                                <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                            </Checkbox.Group>


                            <div style={{ padding: '15px 0px', display: headerValues.display }}>
                                <Card
                                    style={{ width: '100%' }}
                                    tabList={headerValues.tabList}
                                    activeTabKey={headerValues.key}
                                    onTabChange={key => {
                                        this.onTabChange(key, headerValues);
                                    }}
                                >
                                    {contentList(headerValues)[headerValues.key]}
                                </Card>
                            </div>
                        </Card>
                    </Item>
                    <Item label='param' name='paramType'>
                        <Card>
                            <div>
                                <Checkbox.Group onChange={(e) => this.headerTypeOnChange(e, data, param)} value={data.paramType}>
                                    <Checkbox value='0'><Tag color="purple">无传参</Tag></Checkbox>
                                    <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                                    <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                                    <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                                </Checkbox.Group>
                            </div>
                            <div style={{ padding: '15px 0px', display: param.display }}>
                                <Card
                                    style={{ width: '100%' }}
                                    tabList={param.tabList}
                                    activeTabKey={param.key}
                                    onTabChange={key => {
                                        this.onTabChange(key, param);
                                    }}
                                >
                                    {contentList(param)[param.key]}
                                </Card>
                            </div>
                        </Card>
                    </Item>
                    <Item label='boby'>
                        <Card>
                            <div>

                                4

                            </div>
                            <div style={{ padding: '15px 0px', display: boby.display }}>
                                <Card
                                    style={{ width: '100%' }}
                                    tabList={boby.tabList}
                                    activeTabKey={boby.key}
                                    onTabChange={key => {
                                        this.onTabChange(key, boby);
                                    }}
                                >
                                    {contentList(boby)[boby.key]}
                                </Card>
                            </div>
                        </Card>
                    </Item>

                    <Item label='依赖数据' name='relyValues' rules={rules}>
                        <Input.TextArea
                            onChange={this.onChange}
                            placeholder="亲~~~~~~~~~~~~~请输入json参数的基本格式"
                            autoSize={{ minRows: 3, maxRows: 15 }}>
                        </Input.TextArea>
                    </Item>
                    <Item label='返回示例' name='response' rules={rules}>
                        <Input.TextArea
                            onChange={this.onChange}
                            placeholder="亲~~~~~~~~~~~~~请输入json参数的基本格式"
                            autoSize={{ minRows: 3, maxRows: 15 }}>
                        </Input.TextArea>
                    </Item>
                    <Form.Item style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>



                </Form>
            </Card>
        )
    }
}