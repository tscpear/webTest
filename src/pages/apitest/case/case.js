import React,{Component} from 'react'
import { Card,Table,Button,Icon } from 'antd';

export default class Case extends Component{
    render(){
        return(
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>

            </Card>
        )
    }
}