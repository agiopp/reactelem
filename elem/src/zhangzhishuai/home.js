import React, { Component } from 'react'
import "./home.css"
import Swiper from 'swiper'
import '../../node_modules/swiper/css/swiper.min.css'
import { Rate } from 'element-react';
import 'element-theme-default';
export class home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataArr: [],
            business: []
        }
    }
    componentWillMount() {
        this.swiper();
        this.fujin()
    }
    // 商品轮播图网络请求
    swiper() {
        // fetch网络请求
        fetch(
            'https://elm.cangdu.org/v2/index_entry',
            { method: "get" }
        ).then(
            res => {
                return res.json();
            }
        ).then(
            data => {
                console.log(data);
                // 8个元素作为一个数组
                for (let i = 0; i < data.length / 8; i++) {
                    let subArr = data.slice(i * 8, (i + 1) * 8);
                    console.log(subArr)

                    this.setState((a) => {
                        return {
                            dataArr: [...a.dataArr, subArr]
                        }
                    })
                }
                console.log(this.state.dataArr)
            }
        ).catch()
    }
    // 附近商家网络请求
    fujin() {
        fetch(
            "https://elm.cangdu.org/shopping/restaurants?latitude=" + this.latitude + "&longitude=" + this.longitude,
            { method: "get" }
        ).then(
            res => {
                return res.json()
            }
        ).then(
            data => {
                console.log(data)
                this.setState(() => {
                    return {
                        business: data
                    }
                }, () => {
                    console.log(this.state.business)
                })
            }
        ).catch()
    }
    componentDidUpdate() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器


            // 如果需要前进后退按钮
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },
        })
    }

    render() {
        return (
            <div>
                <header>
                    <span className=" el-icon-search span1"></span>
                    <span className="span2">城市名字</span>
                    <span className="el-icon-menu span3"></span>
                </header>
                {/* swiper 插件 */}
                <div className="swiper">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {
                                this.state.dataArr.map((v, i) => {
                                    return <div className="swiper-slide" key={i}>
                                        {
                                            v.map((v1, i1) => {
                                                return <li className="li1" key={i1}>
                                                    <img className="img1" src={'https://fuss10.elemecdn.com' + v1.image_url} />
                                                    <p className="title">{v1.title}</p>
                                                </li>
                                                // <img style={{ width: "100px", height: "100px" }} src={'https://fuss10.elemecdn.com' + v1.image_url} key={i1} />


                                            })
                                        }
                                    </div>

                                })
                            }
                        </div>
                    </div>

                </div>
                {/* 附近商家 */}
                <p className="p2">
                    <span className="el-icon-date"></span>
                    <span className="span4">附近商家</span>
                </p>
                <ul>
                    {
                        this.state.business.map((v, i) => {
                            return <li className="lis" key={i}>
                                <div className="div_img">
                                    <img src={"//elm.cangdu.org/img/" + v.image_path} alt />
                                </div>
                                <div className="content">
                                    <p className="conp1">
                                        <span className="conspan1">品牌</span>
                                        <span className="conspan2">{v.name}</span>
                                    </p>
                                    <p className="conp2">
                                        <span className="conspan3">
                                            <Rate className="xing" disabled={true} value={v.rating} showText={true} />
                                        </span>
                                        <span className="conspan4">月售{v.recent_order_num}单</span>
                                    </p>
                                    <p className="conp3">
                                        <span className="conspan5">￥</span>
                                        <span>{v.float_minimum_order_amount}起送</span>
                                        <span>/</span>
                                        <span>配送费约￥{v.float_delivery_fee}</span>
                                    </p>
                                </div>
                                <div className="text">
                                    <p className="textp1">保准票</p>
                                    <p className="textp2">
                                        <span className="textspan1">蜂鸟专送</span>
                                        <span className="textspan2">准时达</span>
                                    </p>
                                    <p className="textp3">
                                        <span className="textspan3">{v.distance}</span>
                                        <span className="textspan4">/</span>
                                        <span className="textspan5">{v.order_lead_time}</span>
                                    </p>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div >
        )
    }
}

export default home
