import React, {Component} from 'react';
import './App.css';
import {Row, Col, Button, Input} from 'antd';
import QRCode from 'qrcode.react';

class App extends Component {

    constructor(props) {
        super(props);
        const curDate = this.getCurrentDate();
        const id = curDate+ '000001';
        this.state = {
            id: id,
            pn: '',
            qty: '',
            dc: '',
            lot: '',
            vpn: '',
            ercodeValue: '',
            finalId: '',
            finalPn: '',
            finalQty: '',
            finalDc: '',
            finalLot: '',
            finalVpn: '',
        }
    }
    getCurrentDate() {
        const date = new Date();
        let nowMonth = date.getMonth()+1;
        let nowDay = date.getDate();
        if(nowMonth >= 1 && nowMonth <=9) {
            nowMonth = '0'+nowMonth;
        }
        if(nowDay >= 1 && nowDay <= 9) {
            nowDay = '0' + nowDay;
        }
        return date.getFullYear()+nowMonth+nowDay
    }
    render() {
        return (
            <div className="App">
                <Row className={'App-Container'} type={'flex'} gutter={6}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            ID
                        </span>
                        <Input className={'App-Input'} value={this.state.id}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            PN
                        </span>
                        <Input className={'App-Input'} value={this.state.pn}/>
                    </Col>
                </Row>
                <Row type={'flex'} gutter={12} className={'App-Container'}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            QTY
                        </span>
                        <Input className={'App-Input'} value={this.state.qty}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            DC
                        </span>
                        <Input className={'App-Input'} value={this.state.dc}/>
                    </Col>
                </Row>
                <Row type={'flex'} gutter={12} className={'App-Container'}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            LOT
                        </span>
                        <Input className={'App-Input'} value={this.state.lot}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            VPN
                        </span>
                        <Input className={'App-Input'} value={this.state.vpn}/>
                    </Col>
                </Row>
                <Button type="primary" className={'App-Button'}>
                    生成二维码
                </Button>
                <div className={'App-Ercode-Content'}>
                    <Row type={'flex'} justify={'flex-start'} style={{margin: 20}}>
                        <Col>
                            <span>二维码生成区</span>
                        </Col>
                    </Row>
                    <Row type={'flex'} justify={'flex-start'} style={{margin: 20}} gutter={40}>
                        <Col>
                            <QRCode value={''}/>
                        </Col>
                        <Col>
                            <div>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> ID:</span>
                                        <span>{this.state.finalId}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> PN:</span>
                                        <span>{this.state.finalPn}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> QTY:</span>
                                        <span>{this.state.finalQty}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> DC:</span>
                                        <span>{this.state.finalDc}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> LOT:</span>
                                        <span>{this.state.finalLot}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> VPN:</span>
                                        <span> {this.state.finalVpn}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

export default App;
