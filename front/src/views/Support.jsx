import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

import sock from "./socket";


class Support extends React.Component{
    constructor(props){
        super(props);
        this.joinRoom = this.joinRoom.bind(this);
        this.newMsgAdd = this.newMsgAdd.bind(this);
        this.renderNewMsgs = this.renderNewMsgs.bind(this);
        this.state = {
            newMsgs : new Set()
        };
    }
    componentDidMount(){
        this.joinRoom(this.props.hotelId);
        sock.on('sendGuestQuery', (data)=>{
            this.newMsgAdd(data);
        });
    }
    joinRoom(hotelId){
        sock.emit('joinManager', {hotel: hotelId});
    }
    newMsgAdd(data){
        const newRoom = data.room;
        const newMsgs = new Set([
            ...this.state.newMsgs,
            newRoom
        ]);
        this.setState({newMsgs});
        //console.log(this.state);
    }
    renderNewMsgs(){
        const {newMsgs} = this.state;
        if (!newMsgs) return null;
        let result = []
        newMsgs.forEach(roomNumber => {
            result.push(
                <Button color="success" size="lg" block>{roomNumber}</Button>
            );
        });
        return result;
    }
    render(){
        return (
            <div className="content support-page">
                <Row >
                    <Col xs="6" >
                        <Card className="chat-box" >
                            <CardHeader>
                                <CardTitle> <p className="text-primary text-dark h4">Rooms</p></CardTitle>
                            </CardHeader>
                            <CardBody className="chat-guests">
                                <div className="d-flex flex-column chat-inner chat-menu">
                                    {this.renderNewMsgs()}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" >
                        <Card className="chat-box" >
                            <CardHeader>
                                <CardTitle> <p className="text-primary text-dark h4">Guest Messages</p></CardTitle>
                            </CardHeader>
                            <CardBody className="chat-output">
                                <div className="chat-inner chat-text">
                                
                                </div>
                            </CardBody>
                            <CardBody>
                            <div>
                                <InputGroup>
                                    <Input />
                                    <InputGroupAddon addonType="append"><Button color="success" style={{ margin : "0px" }}>Send</Button></InputGroupAddon>
                                </InputGroup>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Support;