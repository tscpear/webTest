import React, { Component } from 'react'

import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch
} from 'antd'
import { ArrowLeftOutlined, PlusCircleTwoTone, CloseCircleTwoTone, PlusSquareTwoTone, MinusSquareTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
export default class AddUpdata extends Component {
    state = {
        //展示控制器
        apiRelyDispaly: 'none',
        apiFiexdDispaly: 'none',
        headerFiexdParamDisplay: 'none',
        headerRelyParamDisplay: 'none',
        headerHandleParamDisplay: 'none',
        webformFiexdParamDisplay: 'none',
        webformRelyParamDisplay: 'none',
        webformHandleParamDisplay: 'none',
        bodyFiexdParamDisplay: 'none',
        bodyRelyParamDisplay: 'none',
        bodyHandleParamDisplay: 'none',
        isRelyDispay: 'none',
        rules: [{
            required: true,
            whitespace: true,
            message: "这你都不填，你以为你是客服吗！",
        },]
    }
    //接口参数的点击展示控制器
    apiParamTypeOnChange = e => {
        let apiRelyDispaly = Object.assign({}, this.state.apiRelyDispaly);
        let apiFiexdDispaly = Object.assign({}, this.state.apiFiexdDispaly);
        if (e.target.value === '1') {
            apiFiexdDispaly = 'block';
        } else {
            apiFiexdDispaly = 'none';
        }

        if (e.target.value === '2') {
            apiRelyDispaly = 'block';
        } else {
            apiRelyDispaly = 'none';
        }

        this.setState({ apiFiexdDispaly, apiRelyDispaly });
    }

    //header参数点击展示控制器
    headerParamTypeOnChange = e => {
        let headerFiexdParamDisplay = 'none';
        let headerRelyParamDisplay = 'none';
        let headerHandleParamDisplay = 'none';
        e.map(item => {
            if (item === '1') {
                headerFiexdParamDisplay = 'inline-block';
            }
            if (item === '2') {
                headerRelyParamDisplay = 'inline-block';
            }
            if (item === '3') {
                headerHandleParamDisplay = 'inline-block';
            }
        })
        this.setState({ headerFiexdParamDisplay, headerRelyParamDisplay, headerHandleParamDisplay });
    }

    //webform参数点击展示控制器
    webformParamTypeOnChange = e => {
        let webformFiexdParamDisplay = 'none';
        let webformRelyParamDisplay = 'none';
        let webformHandleParamDisplay = 'none';
        e.map(item => {
            if (item === '1') {
                webformFiexdParamDisplay = 'inline-block';
            }
            if (item === '2') {
                webformRelyParamDisplay = 'inline-block';
            }
            if (item === '3') {
                webformHandleParamDisplay = 'inline-block';
            }
        })
        this.setState({ webformFiexdParamDisplay, webformRelyParamDisplay, webformHandleParamDisplay });
    }
    //boby参数点击展示控制器
    bobyParamTypeOnChange = e => {
        let bodyFiexdParamDisplay = 'none';
        let bodyRelyParamDisplay = 'none';
        let bodyHandleParamDisplay = 'none';
        e.map(item => {
            if (item === '1') {
                bodyFiexdParamDisplay = 'inline-block';
            }
            if (item === '2') {
                bodyRelyParamDisplay = 'inline-block';
            }
            if (item === '3') {
                bodyHandleParamDisplay = 'inline-block';
            }
        })
        this.setState({ bodyFiexdParamDisplay, bodyRelyParamDisplay, bodyHandleParamDisplay })
    }

    //是否被依赖控制器
    isRelyOnChange = e => {
        let isRelyDispay;
        if (e) {
            isRelyDispay = 'block';
        } else {
            isRelyDispay = 'none';
        }
        this.setState({ isRelyDispay })
    }

    render() {

        const {
            apiRelyDispaly,
            apiFiexdDispaly,
            headerRelyParamDisplay,
            headerHandleParamDisplay,
            headerFiexdParamDisplay,
            webformRelyParamDisplay,
            webformHandleParamDisplay,
            webformFiexdParamDisplay,
            bodyRelyParamDisplay,
            bodyHandleParamDisplay,
            bodyFiexdParamDisplay,
            isRelyDispay,
            rules,
        } = this.state


        //二级页面的标题
        const title = (
            <span>
                <a onClick={() => this.props.history.push('/apitest/uri')}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px' }}>
                    编辑
                </span>
            </span>)



        //提交表单数据
        const onFinish = values => {

            console.log('Received values of form: ', values);
        }


        //一级方法
        const frist = (name, fristPlaceholder, secondPlaceholder, addName) => {
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
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '30%', padding: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={rules}
                                            >
                                                <Input placeholder={fristPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '65%' }}>
                                            <Form.Item
                                                name={[field.name, "value"]}
                                                fieldKey={[field.fieldKey, "value"]}
                                                rules={rules}
                                            >
                                                <Input placeholder={secondPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col flex="none" style={{ width: '5%' }} >
                                            <MinusCircleOutlined
                                                style={{ height: '15px', padding: '4px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        className='do'
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        style={{ width: "95%", marginTop: '5px' }}
                                    >
                                        <PlusOutlined /> {addName}
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            )
        }

        //二级方法
        const second = (name, fristPlaceholder, secondPlaceholder, threePlaceholder, addName) => {
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
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '95%' }}>
                                            <Form.Item
                                                name={[field.name, 'apiPath']}
                                                fieldKey={[field.fieldKey, 'apiPath']}
                                                rules={rules}>
                                                <Input placeholder={threePlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '30%', padding: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={rules}
                                            >
                                                <Input placeholder={fristPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '65%' }}>
                                            <Form.Item
                                                name={[field.name, "value"]}
                                                fieldKey={[field.fieldKey, "value"]}
                                                rules={rules}
                                            >
                                                <Input placeholder={secondPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col flex="none" style={{ width: '5%' }} >
                                            <MinusCircleOutlined
                                                style={{ height: '15px', padding: '4px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        className='do'
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        style={{ width: "95%", marginTop: '5px' }}
                                    >
                                        <PlusOutlined /> {addName}
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            )
        }






        return (
            <Card title={title} className='myform contentMaxHeight'>
                <Form
                    name='form'
                    layout='inline'
                    onFinish={onFinish}
                    hideRequiredMark='true'
                    labelCol={{ span: 3 }}
                    labelAlign='left'
                >
                    <Form.Item className='item' label='接口路径' name='apiPath' rules={rules}>
                        <Input className='do' />
                    </Form.Item>
                    <Form.Item className='item' label='接口描述' name='apiMark'>
                        <Input className='do' />
                    </Form.Item>
                    <Form.Item className='item' label='设备终端' name='device' >
                        <Select dropdownClassName='do' autoFocus='true' defaultValue='0'>
                            <Select.Option value='0'>请选择设备</Select.Option>
                            <Select.Option value='1'>知轮后台</Select.Option>
                            <Select.Option value='2'>知轮商家</Select.Option>
                            <Select.Option value='3'>车服小程序</Select.Option>
                            <Select.Option value='4'>知轮车服</Select.Option>
                            <Select.Option value='5'>分仓终端</Select.Option>
                            <Select.Option value='6'>商城后台</Select.Option>
                            <Select.Option value='7'>店铺后台</Select.Option>
                            <Select.Option value='8'>知轮三包</Select.Option>
                            <Select.Option value='9'>知轮通</Select.Option>
                            <Select.Option value='10'>知轮互联</Select.Option>
                            <Select.Option value='11'>车服H5</Select.Option>
                            <Select.Option value='12'>知轮车队</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label='请求方式' name='apiMethod'>
                        <Radio.Group>
                            <Radio value='1'><Tag color="gold">GET</Tag></Radio>
                            <Radio value='2'><Tag color="purple">POST</Tag></Radio>
                            <Radio value='3'><Tag color="cyan">PUT</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className='items' label='接口传参' name='apiParamType' >
                        <Radio.Group onChange={this.apiParamTypeOnChange} defaultValue='0'>
                            <Radio value='0'><Tag color="orange">无传参</Tag></Radio>
                            <Radio value='1'><Tag color="orange">固定参数</Tag></Radio>
                            <Radio value='2'><Tag color="orange">继承参数</Tag></Radio>
                            <Radio value='4'><Tag color="orange">自定义参数</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div style={{ display: apiFiexdDispaly, width: '100%', margin: '0px 70px 0px 100px' }}>
                        <Form.Item className='item' name='apiFiexdParam'  >
                            <Input className='do' placeholder='请填写路径固定参数' />
                        </Form.Item>
                    </div>
                    <div style={{ display: apiRelyDispaly, width: '100%', margin: '0px 90px 0px 100px' }}>
                        <Form.Item className='item' style={{ width: '30%' }} name='apiRelyParamName'>
                            <Input className='do' placeholder='依赖接口' />
                        </Form.Item>
                        <Form.Item className='item' style={{ width: '20%' }} name='apiRelyParamValue'>
                            <Input className='do' placeholder='依赖参数' />
                        </Form.Item>
                    </div>
                    <Form.Item className='item' name='headerParam' label='Header' name='headerParamType' >
                        <Checkbox.Group onChange={e => this.headerParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: headerFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('headerFiexdParam', '参数名', '参数值', 'header固定参数')}
                        </div>
                        <div style={{ width: '30%', display: headerRelyParamDisplay, margin: '0px 10px', verticalAlign: 'top' }}>
                            {second('headerRelyParam', '参数名', '依赖参数名', '依赖接口路径', 'header依赖参数')}
                        </div>
                        <div style={{ width: '30%', display: headerHandleParamDisplay, verticalAlign: 'top', }}>
                            {frist('headerHandleParam', '参数名', '默认值', 'header自定义参数')}
                        </div>
                    </div>
                    <Form.Item className='item' name='webformParamType' label='webform' >
                        <Checkbox.Group onChange={e => this.webformParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: webformFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('webformFiexdParam', '参数名', '参数值', 'webform固定参数')}
                        </div>
                        <div style={{ width: '30%', display: webformRelyParamDisplay, margin: '0px 10px', verticalAlign: 'top' }}>
                            {second('webformRelyParam', '参数名', '依赖参数名', '依赖接口路径', 'webform依赖参数')}
                        </div>
                        <div style={{ width: '30%', display: webformHandleParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('webformHandleParam', '参数名', '默认值', 'webform自定义参数')}
                        </div>
                    </div>
                    <Form.Item className='item' name='bodyParamType' label='body' >
                        <Checkbox.Group onChange={e => this.bodyParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2'><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: bodyFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px', paddingRight: '35px' }}>
                            <Form.Item name='bodyFiexdParamDisplay'>
                                <Input.TextArea
                                    className='do'
                                    placeholder="基本参数格式"
                                    autoSize={{ minRows: 3, maxRows: 10 }}
                                />
                            </Form.Item>
                        </div>
                        <div style={{ width: '30%', display: bodyRelyParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {second('bodyRelyParam', '参数路径', '依赖参数名', '依赖接口路径', 'body依赖参数')}
                        </div>
                        <div style={{ width: '30%', display: bodyHandleParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('bodyHandleParam', '参数路径', '默认值', 'body自定义参数')}
                        </div>
                    </div>
                    <Form.Item label='是否被依赖' className='item' name='isRely'>
                        <Switch onChange={this.isRelyOnChange} />
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '50%', display: isRelyDispay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('relyValue', '依赖值名称', '依赖路径', '需要存起来的依赖值')}
                        </div>
                    </div>
                    <Form.Item className='item' name='responseBase' label='返回值样式'>
                        <Input.TextArea
                            className='do'
                            placeholder="返回值基本格式"
                            autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                    </Form.Item>
                    <Form.Item className='item' style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

