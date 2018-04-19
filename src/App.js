import React, {Component} from 'react';
import './App.css';
import {Row, Col, Button, Input} from 'antd';
import QRCode from 'qrcode.react';
import ReactToPrint from "react-to-print";

class App extends Component {

    constructor(props) {
        super(props);
        this.index = 0;
        const autoIncrementIndex = this.getAutoIncrementIndex(this.index+"");
        const curDate = this.getCurrentDate();
        const id = curDate + autoIncrementIndex;
        this.state = {
            id: id,
            pn: '',
            qty: '',
            dc: curDate,
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
    getAutoIncrementIndex(value) {
        const length = value.length;
        switch (length) {
            case 1:
                return '00000'+value;
            case 2:
                return '0000'+value;
            case 3:
                return '000'+value;
            case 4:
                return '00'+value;
            case 5:
                return '0'+value;
            case 6:
                return value;
        }
        return value;
    }
    generateErcode = ()=>{
        const generateValue  = `@ID${this.state.id}@PN${this.state.pn}@QTY${this.state.qty}@DC${this.state.dc}@LOT${this.state.lot}@VPN${this.state.vpn}`;
        this.setState((prevState)=> ({
            ercodeValue: generateValue,
            finalId: prevState.id,
            finalPn: prevState.pn,
            finalQty: prevState.qty,
            finalDc: prevState.dc,
            finalLot: prevState.lot,
            finalVpn: prevState.vpn
        }))
    }
    render() {
        return (
            <div className="App">
                <Row className={'App-Container'} type={'flex'} gutter={6}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            ID
                        </span>
                        <Input className={'App-Input'} value={this.state.id} onChange={(e)=>{this.setState({ id: e.target.value })}}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            PN
                        </span>
                        <Input className={'App-Input'} value={this.state.pn} onChange={(e)=>{this.setState({ pn: e.target.value })}}/>
                    </Col>
                </Row>
                <Row type={'flex'} gutter={12} className={'App-Container'}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            QTY
                        </span>
                        <Input className={'App-Input'} value={this.state.qty} onChange={(e)=>{this.setState({ qty: e.target.value })}}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            DC
                        </span>
                        <Input className={'App-Input'} value={this.state.dc} onChange={(e)=>{this.setState({ dc: e.target.value })}}/>
                    </Col>
                </Row>
                <Row type={'flex'} gutter={12} className={'App-Container'}>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            LOT
                        </span>
                        <Input className={'App-Input'} value={this.state.lot} onChange={(e)=>{this.setState({ lot: e.target.value })}}/>
                    </Col>
                    <Col span={12}>
                        <span className={'App-Text'}>
                            VPN
                        </span>
                        <Input className={'App-Input'} value={this.state.vpn} onChange={(e)=>{this.setState({ vpn: e.target.value })}}/>
                    </Col>
                </Row>
                <Button type="primary" className={'App-Button'} onClick={this.generateErcode}>
                    生成二维码
                </Button>
                <Row type={'flex'} justify={'flex-start'} style={{ marginLeft: 60, marginTop: 60 }}>
                    <Col>
                        <span onClick={()=>{ window.print()}}>二维码生成区</span>
                    </Col>
                    <Col>
                        <ReactToPrint
                            trigger={() => <a href="#">打印二维码</a>}
                            content={() => this.componentRef}
                        />
                    </Col>
                </Row>

                <div className={'App-Ercode-Content'} ref={el => (this.componentRef = el)}>
                    <Row type={'flex'} justify={'flex-start'} style={{margin: 20}} gutter={40}>
                        <Col>
                            <QRCode value={this.state.ercodeValue}/>
                        </Col>
                        <Col>
                            <div>
                                <Row type={'flex'} >
                                    <Col>
                                        <span className={'App-Ercode-Text'}> ID:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalId}</span>
                                    </Col>
                                </Row>
                                <Row type={'flex'}>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> PN:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalPn}</span>
                                    </Col>
                                </Row>
                                <Row type={'flex'}>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> QTY:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalQty}</span>
                                    </Col>
                                </Row>
                                <Row type={'flex'}>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> DC:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalDc}</span>
                                    </Col>
                                </Row>
                                <Row type={'flex'}>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> LOT:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalLot}</span>
                                    </Col>
                                </Row>
                                <Row type={'flex'}>
                                    <Col>
                                        <span className={'App-Ercode-Text'}> VPN:</span>
                                    </Col>
                                    <Col>
                                        <span className={'App-Ercode-Text'} style={{ marginLeft: 10 }}>{this.state.finalVpn}</span>
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
