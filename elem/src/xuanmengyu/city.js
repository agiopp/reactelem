import React, { Component } from 'react'
import './city.css'
import 'element-theme-default';
// import Search from './xuanmengyu/search'

export class city extends Component {
    constructor(props) {

        super(props)
        this.state = {
            hotCity: [],
            sortCity: [],

        }

    }
    // 形参v
    getHotCity(v){
        this.props.history.push({
            pathname:"/search",
            state :{
                cityname:v.name,
                cityId:v.id
            }
        })
        console.log(v)
    }
  
    //  组件将要被挂载
    componentWillMount() {
        // 热门城市
        fetch("https://elm.cangdu.org/v1/cities?type=hot",
            {
                method: "get"
            }).then(res => {
                return res.json();
            }).then(data => {
                console.log(data)
                
                this.setState({
                    hotCity:data
                })
                console.log(this.state.hotCity)

            }).catch(err => {
                console.log(err)

            })
        // fetch网络请求 a-z 城市
        fetch("https://elm.cangdu.org/v1/cities?type=group",
            {
                method: "get"
            }).then(res => {
                return res.json();

            }).then(data => {
                console.log(data)
                let arr = [];
                for (var key in data) {
                    arr.push(key)
                }
                //  26个字母排序
                console.log(arr)
                arr = arr.sort()
                var newData = {}
                for (var i in arr) {
                    //  cityList 是26个字母
                    var cityList = arr[i]
                    //  [cityList]  对象把数组中的元素解析成.cityList
                    newData[cityList] = data[cityList]
                }
                this.setState({
                    sortCity: newData
                })
                // console.log(this.state.sortCity)

            }).catch(err => {
                console.log(err)

            })
    }
  
    render() {
        return (
            <div className="city">
                <div className="login">
                    {/* 头部导航  */}
                    <div className="nav">
                        <div className="nav_01">
                            <p className="nav_reg">登录|注册</p>
                            <p className="nav_ele">ele.me</p>
                        </div>
                        <div className="nowcity">
                            <span className="nowcity_pos">当前定位城市</span>
                            <span className="nowcity_no">定位不准时，请在城市列表中选择</span>
                        </div>
                        <div className="zhengzhou">
                            <span className="zz" ></span>
                            <span className=" el-icon-arrow-right right" >  </span>
                        </div>
                    </div>
                    {/* 热门城市 */}
                    <div className="hotcity"  >
                        <p className="hot">热门城市</p>
                        <ul className="ull" >
                            {
                                this.state.hotCity.map( (v, i)=> {
                                    return (
                                        <li key={i} onClick={this.getHotCity.bind(this,v)} >{v.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {/* a-z  */}
                    <div className="sort_city" >
                        {
                            Object.keys(this.state.sortCity).map((v, i) => {
                                return (
                                    <ul key={i} className="sort_ull" >
                                        {/* a-z  */}
                                        <p className="sort">{v}</p>
                                        {
                                            // a-z对应的城市
                                            this.state.sortCity[v].map((x,y)=>{
                                                return(
                                                    <li onClick={this.getHotCity.bind(this,x)} key={y}>{x.name}</li>
                                                )

                                            })

                                        }
                                    </ul>
                                )
                            })
                        }
                    </div>
                
                </div>
            </div>
        )
    }
}

export default city
