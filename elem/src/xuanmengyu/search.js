import React, { Component } from 'react'
import "./search.css"

export class search extends Component {
    constructor(props) {
        super(props)
        // 取值

        this.state = {
            cityName: '',
            keyword: '',
            city_id: '',
            allData: [],


        }

    }
    search_City() {
        // https://elm.cangdu.org/v1/pois?city_id=1&keyword=迪士尼&type=search
        fetch("https://elm.cangdu.org/v1/pois?city_id=" + this.state.city_id + "&keyword=" + this.state.keyword + "&type=search", {
            method: "get"
        }).then((res) => {
            return res.json()

        }).then((data) => {
            console.log(data)
            // for( var i=0;i<data.length;i++){
            //     console.log(data[i].name)
            //     console.log(data[i].address)

            // }
            this.setState({
                allData: data


            })

        }).catch((err) => {
            console.log(err)

        })


    }
    componentWillMount() {
        // console.log(this.props.location.state.cityname)
        // console.log(this.props.location.state.cityId)
        this.setState({
            cityName: this.props.location.state.cityname,
            city_id: this.props.location.state.cityId,

        })
    
    }



    render() {
        return (
            <div className='search'>
                <div className="nav">
                    <span className="el-icon-arrow-left nav_left"> </span>
                    {/* 改变位置 方便浮动   */}
                    <span className="cut"> 切换城市</span>
                    <h2 className="zz">{this.props.location.state.cityname}{}</h2>
                </div>


                <div className="search">
                    <input type="text" className="sea_det " value={this.state.keyword} onChange={e => this.setState({ keyword: e.target.value })} placeholder="输入学校 、商务楼、地址" />
                    <button className="submit" onClick={this.search_City.bind(this)}>提交</button>
                </div>

                <div className="show">
                    {
                        this.state.allData.map((v, i) => {
                            return (
                                <div className="show_01" key={i} >
                                    <p className="show_name"> {v.name}</p>
                                    <p className="show_address">{v.address}</p>
                                </div>
                            )
                        })
                    }
                    {/* <p >清空数据</p> */}

                </div>


            </div>
        )
    }
}

export default search

