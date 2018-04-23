import React from 'react';
import { Row, Col } from 'antd';
import QRCode from 'qrcode.react';
import './App.css'

export default class ContentItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <Row
                type={'flex'}
                justify={'flex-start'}
                style={{margin: 20, width: '100%'}}
                gutter={16}>
                <Col>
                    <QRCode
                        renderAs={'svg'}
                        level={'H'}
                        value={item.ercodeValue}/>
                </Col>
                <Col>
                    <div>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> ID:</span>
                            </Col>
                            <Col>
                                        <span className={'App-Ercode-Text'}
                                              style={{marginLeft: 10}}>{item.finalId}</span>
                            </Col>
                        </Row>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> PN:</span>
                            </Col>
                            <Col>
                                                <span
                                                    className={'App-Ercode-Text'}
                                                    style={{marginLeft: 10}}>
                                                    {item.finalPn}
                                                </span>
                            </Col>
                        </Row>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> QTY:</span>
                            </Col>
                            <Col>
                                        <span className={'App-Ercode-Text'}
                                              style={{marginLeft: 10}}>{item.finalQty}</span>
                            </Col>
                        </Row>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> DC:</span>
                            </Col>
                            <Col>
                                        <span className={'App-Ercode-Text'}
                                              style={{marginLeft: 10}}>{item.finalDc}</span>
                            </Col>
                        </Row>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> VPN:</span>
                            </Col>
                            <Col>
                                        <span className={'App-Ercode-Text'}
                                              style={{marginLeft: 10}}>{item.finalVpn}</span>
                            </Col>
                        </Row>
                        <Row type={'flex'}>
                            <Col>
                                <span className={'App-Ercode-Text'}> LOT:</span>
                            </Col>
                            <Col>
                                                <span className={'App-Ercode-Text'}
                                                      style={{marginLeft: 10}}>
                                                    {item.finalLot}
                                                </span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}