import React,{ Component } from "react"
import { Route,Switch } from "react-router-dom"
import UriHome from './home'
import UriAddUpdata from './add-updata'

/**
 * 接口的子路由
 */
export default class Uri extends Component{
    render(){
        return(
           <Switch>
               <Route exact path='/apitest/uri' component = {UriHome}/>>
               <Route exact path='/apitest/uri/updata' component = {UriAddUpdata}/>
               <Route exact path='/apitest/uri/add' component = {UriAddUpdata}/>
           </Switch>
        )
    }
}