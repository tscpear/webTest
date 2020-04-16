import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import ApiTestUri from '../apitest/uri/uri.jsx'
import ApiTestCase from '../apitest/case/case'
/**
 * 登录的路由组件
 */
const { Footer, Sider, Content } = Layout


export default class Admin extends Component {

    render() {


        const user = memoryUtils.user
        if (!user || !user.userId) {
            return <Redirect to='/login' />
        } return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider style={{position:'fixed', minHeight: '100%'}}><LeftNav /></Sider>
                <Layout style={{marginLeft:'200px'}}>
                    <Header style={{position:'relative',top:0}}>

                    </Header>
                    <Content style={{ mbackgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} ></Route>
                            <Route path='/apitest/uri' component={ApiTestUri}></Route>
                            <Route path='/apitest/case' component={ApiTestCase}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>

                    <Footer style={{textAlign: 'center' ,position:'fixed',bottom:0,width:'100%'}}>唐胖传奇</Footer>
                </Layout>
            </Layout>
        )


    }
}