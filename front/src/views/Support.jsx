import React, {createRef} from "react";
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
        this.renderMsgTxt = this.renderMsgTxt.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.sendReply = this.sendReply.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.chatBoxRef = createRef();
        this.state = {
            newMsgs : new Map(),
            selected : false,
            roomSelected : null,
            replyValue : ""
        };
    }
    componentDidMount(){
        this.joinRoom(this.props.hotelId);
        sock.on('sendGuestQuery', (data)=>{
            this.newMsgAdd(data);
        });
 /*        sock.on('receive', (data)=>{
            console.log(data);
            this.newMsgAdd(data);
        }); */
        this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight;
    }
    componentDidUpdate(){
        this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight;
    }
    joinRoom(hotelId){
        sock.emit('joinManager', {hotel: hotelId});
    }
    newMsgAdd(data){
        const newMsgs = new Map([
            ...this.state.newMsgs,
        ]);
        if (newMsgs.has(data.room)){   
            var msg = newMsgs.get(data.room);
            msg.push({
                from : data.from,
                message : data.message
            });
            newMsgs.set(data.room, msg);
        }
        else{
            var arr = new Array();
            arr.push({
                from : data.from,
                message : data.message
            });
            newMsgs.set(data.room, arr);
        }
        this.setState({newMsgs});
    }
    renderNewMsgs(){
        var {newMsgs} = this.state;
        if (newMsgs.size === 0) return null;
        let result = []
        //console.log(newMsgs);
        newMsgs.forEach((txtMsg, roomNumber) => {
            //console.log(roomNumber);
            result.push(
                <Button color="success" size="lg" onClick={this.changeSelection} block>{roomNumber}</Button>
            );
        });
        return result;
    }
    renderMsgTxt(){
        var {newMsgs} = this.state;
        if (!this.state.selected){
            if (newMsgs.size === 0) return null;
            else{
                var k = [...newMsgs.keys()];
                this.setState({selected : true, roomSelected : k[0]});
            }    
        }
        else{
            var selected = this.state.roomSelected;
            var allText = [...this.state.newMsgs.get(selected)];
            var textp = [];
            allText.forEach(txt=>{
                if (txt.from === "Manager"){
                    textp.push(
                        (<p className="msg msg-manager"><strong>Manager : </strong>{txt.message}</p>)

                    );
                }
                else{
                    textp.push(
                        (<p className="msg msg-room"><strong>Room {selected} : </strong>{txt.message}</p>)

                    );
                }
            });
            return textp;
        }
    }
    changeSelection(event){
        //console.log(event.target);
        this.setState({selected : true, roomSelected : event.target.innerHTML });
    }
    onInputChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    sendReply(event){
        //console.log(replyMessage);
        if (this.state.selected){
            var replyMessage = this.state.replyValue;
            var destination = this.props.hotelId + this.state.roomSelected;
            //console.log("before emit");
            sock.emit('managerSendsReply', {to: destination, message : replyMessage, room : this.state.roomSelected, from : "Manager"});
            var data = {
                room : this.state.roomSelected,
                from : "Manager",
                message : replyMessage
            };
            this.newMsgAdd(data);
            this.setState({replyValue : ""});
        }
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
                                <div className="chat-inner chat-text" ref={this.chatBoxRef}>
                                    {this.renderMsgTxt()}
                                </div>
                            </CardBody>
                            <CardBody>
                            <div>
                                <InputGroup>
                                    <Input name="replyValue" value={this.state.replyValue} onChange={this.onInputChange}/>
                                    <InputGroupAddon addonType="append"><Button color="success" onClick={this.sendReply} style={{ margin : "0px" }}>Send</Button></InputGroupAddon>
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