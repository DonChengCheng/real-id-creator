import React, {Component} from 'react';
import './App.css';
import {Row, Col, Button, Input, InputNumber} from 'antd';
import ContentItem from './ContentItem';

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
                                <Input className={'App-Input'} value={this.state.qty} onChange={(e) => {
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
                                            const contentArr = [];
                                            for (let i = 0; i < value; i++) {
                                                const index = this.index + i;
                                                const id = this.generateId(index);
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

                        </Row>
                        { this.state.contentArr.length && <div className={'App-Ercode-Content'} >
                            <Row type={'flex'} gutter={8} ref={el => (this.componentRef = el)}>
                                {this.state.contentArr.map((item, index) => {
                                    return (
                                        <Col span={12}>
                                            <ContentItem item={item} key={index.toString()}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>}

                    </Col>
                </Row>


            </div>
        );
    }


}

export default App;
