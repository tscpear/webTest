import React, { Component } from 'react'
import { withRouter,Link} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtil from '../../utils/storageUtils'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


var userName
class Header extends Component {
    getTitle = () => {
        //等到当前请求路径
        let path = this.props.location.pathname
        console.log(this.props)
        let title
        let titles = ''
        menuList.forEach(item => {
            if (item.key === path) {//如果当前item的对象与path匹配
                title = item.title
            } else if (item.children) {
                if(path.indexOf('/apitest/uri/updata')===0){
                    path = '/apitest/uri'
                    titles = '-编辑'
                }
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title + titles
                }
            }
        })
        return title
    }


    logout = () => {
       const props = this.props
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '是否退出登入',
            onOk() {
                storageUtil.removeUser()
                memoryUtils.user = {}
                props.history.replace('/login')
            },
          });
    }



    render() {
        const title = this.getTitle()
        const userName = memoryUtils.user.username
        return (
            <div className='header'>
                <div className='header-left'>
                    <span>{title}</span>
                </div>
                <div className='header-right'>
                    <span>欢迎您，{userName}！</span>
                    <a onClick={this.logout}>退出</a>
                </div>

            </div>

        )
    }

}
export default withRouter(Header)