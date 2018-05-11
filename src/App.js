import React, {Component} from 'react';
import './App.css';
import {Row, Col, Button, Input, InputNumber} from 'antd';
import ContentItem from './ContentItem';
import html2canvas from 'html2canvas';
import ReactToPrint from "react-to-print";

class App extends Component {
    constructor(props) {
        super(props);
        this.index = 1;
        const id = this.generateId(this.index);
        this.state = {
            id: id,
            pn: '',
            qty: '',
            dc: this.getCurrentDate(),
            lot: '',
            vpn: '',
            contentArr: [],
            qrCodes: 1
        }
    }

    generateId(index) {
        const autoIncrementIndex = this.getAutoIncrementIndex(index + "");
        const curDate = this.getCurrentDate();
        return curDate + autoIncrementIndex;
    }

    getCurrentDate() {
        const date = new Date();
        let nowMonth = date.getMonth() + 1;
        let nowDay = date.getDate();
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = '0' + nowMonth;
        }
        if (nowDay >= 1 && nowDay <= 9) {
            nowDay = '0' + nowDay;
        }
        return date.getFullYear() + nowMonth + nowDay
    }

    getAutoIncrementIndex(value) {
        const length = value.length;
        switch (length) {
            case 1:
                return '00000' + value;
            case 2:
                return '0000' + value;
            case 3:
                return '000' + value;
            case 4:
                return '00' + value;
            case 5:
                return '0' + value;
            default:
                return value;
        }
    }
    exportImage = () => {
        const _canvas =  document.querySelector('#page'); // 获取到要导出的页面内容
        const w = parseFloat(window.getComputedStyle(_canvas).width);
        const h = parseFloat(window.getComputedStyle(_canvas).height);
        let scale=1;// 渲染比例
        const canvas2 = document.createElement('canvas');
        canvas2.getContext('2d');// 画布上绘图的环境，目前只支持2d
        const opts = {
            scale,
            canvas: canvas2,
            width: w,
            height: h,
        }
        html2canvas(document.querySelector('#page'), opts).then(canvas => {
            // canvas转换成url，然后利用a标签的download属性，直接下载
            const dataURL = canvas.toDataURL();// base64 编码的 dataURL
            const link = document.createElement('a');
            link.addEventListener('click', () => {
                link.download = `${'ercode' || 'chart'}.png`;
                link.href = dataURL.replace('image/png', 'image/octet-stream');
                // 修改DataURL的Mime-type为octet-stream，强制让浏览器下载
                // octet-stream是以流的形式下载文件,这样可以实现任意格式的文件下载。
            });
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', false, false);
            // 2.canBubble	事件是否起泡。 3.cancelable	是否可以用 preventDefault() 方法取消事件。
            link.dispatchEvent(e);
        });
    }
    render() {
        return (
            <div className="App">
                <Row className={'App-Container'} type={'flex'} gutter={6}>
                    <Col span={12}>
                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    ID
                                </span>
                                <Input className={'App-Input'} value={this.state.id} onChange={(e) => {
                                    this.setState({id: e.target.value})
                                }}/>
                            </Col>

                        </Row>
                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    PN
                                </span>
                                <Input className={'App-Input'} value={this.state.pn} onChange={(e) => {
                                    this.setState({pn: e.target.value})
                                }}/>
                            </Col>
                        </Row>

                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    QTY
                                </span>
                                <Input
                                    className={'App-Input'}
                                    value={this.state.qty}
                                    onChange={(e) => {
                                        this.setState({qty: e.target.value})
                                    }}/>
                            </Col>

                        </Row>
                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    DC
                                </span>
                                <Input className={'App-Input'} value={this.state.dc} onChange={(e) => {
                                    this.setState({dc: e.target.value})
                                }}/>
                            </Col>
                        </Row>
                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    LOT
                                </span>
                                <Input className={'App-Input'} value={this.state.lot} onChange={(e) => {
                                    this.setState({lot: e.target.value})
                                }}/>
                            </Col>

                        </Row>
                        <Row className={'App-Content'} type={'flex'}>
                            <Col span={24}>
                                <span className={'App-Text'}>
                                    VPN
                                </span>
                                <Input className={'App-Input'} value={this.state.vpn} onChange={(e) => {
                                    this.setState({vpn: e.target.value})
                                }}/>
                            </Col>
                        </Row>
                        <Row type={'flex'} justify={'center'}>
                            <Col>
                                <span>please enter the number of qr codes</span>
                                <InputNumber
                                    style={{width: 120, marginLeft: 6}}
                                    value={this.state.qrCodes}
                                    size="small"
                                    min={1}
                                    onChange={(value) => {
                                        this.setState({qrCodes: value})
                                    }}
                                />
                                <Button
                                    type="primary"
                                    className={'App-Button'}
                                    style={{marginLeft: 20}}
                                    onClick={() => {
                                        const value = this.state.qrCodes;
                                        if (value > 0) {
                                            this.index = parseInt(this.state.id.substr(8, 6))
                                            const idPrefix = this.state.id.substring(0, 7);
                                            const contentArr = [];
                                            for (let i = 0; i < value; i++) {
                                                const index = this.index + i;
                                                const id = idPrefix + this.getAutoIncrementIndex(index + "");;
                                                const generateValue = `${id};${this.state.pn};${this.state.qty};${this.state.dc};${this.state.lot};${this.state.vpn}`;
                                                const contentItem = {
                                                    ercodeValue: generateValue,
                                                    finalId: id,
                                                    finalPn: this.state.pn,
                                                    finalQty: this.state.qty,
                                                    finalDc: this.state.dc,
                                                    finalLot: this.state.lot,
                                                    finalVpn: this.state.vpn,
                                                };
                                                contentArr.push(contentItem);
                                            }
                                            this.setState({contentArr: contentArr});
                                        }
                                    }}>
                                    Generate QR code
                                </Button>

                            </Col>
                        </Row>

                    </Col>
                    <Col span={12}>
                        <Row type={'flex'} justify={'flex-start'} style={{marginLeft: 60, marginTop: 60}} gutter={10}>
                            <Col>
                                <span>QR code generate area</span>
                            </Col>
                            <Col>
                                <ReactToPrint
                                    trigger={() => (
                                        <a>Print QR code</a>
                                    )}
                                    onBeforePrint={() => {
                                        this.index = this.index + this.state.qrCodes;
                                        const id = this.generateId(this.index);
                                        this.setState({
                                            id: id
                                        });
                                    }}
                                    content={() => this.componentRef}
                                />
                            </Col>
                            <Col>
                                <a onClick={this.exportImage}>Export Image</a>
                            </Col>
                        </Row>
                        {this.state.contentArr.length > 0 ?
                            <Row id={'page'}type={'flex'} justify={'center'} gutter={8} ref={el => (this.componentRef = el)}>
                                {this.state.contentArr.map((item, index) => {
                                    return (
                                        <Col key={item.finalId}>
                                            <ContentItem item={item} key={index.toString()}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        : null}

                    </Col>
                </Row>


            </div>
        );
    }


}

export default App;
