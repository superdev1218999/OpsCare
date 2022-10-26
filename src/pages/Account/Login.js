import React from 'react';
import {withRouter} from 'react-router-dom'
import { MessageContext } from '../../Helper/Message/MessageRenderer'
import { TextField, Button } from '@material-ui/core';
import { AuthContext, authenticate, logout } from '../../Helper/Auth/auth'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//import logo from '../../assets/VesselCare-Lite_logo/4x/Asset 27@4x.png';
import logo from '../../assets/brand-logo/OpsCareLogo.png';
import bgImg from '../../assets/LoginBG.jpg'
class LoginPage extends React.Component  {
    constructor(props,context) {
        super(props, context);
        this.usernameRef = React.createRef()
        this.pwRef = React.createRef();
        this.state = {
            error: false,
            message: "fdgd"
        }
    }
    login = (setUser) => {
        var username = this.usernameRef.current.value
        var pw = this.pwRef.current.value
        console.log("username & pwd",username, pw);
        authenticate(username, pw, true, (success, value) => {
            if (success) {
                var newUser = value
                newUser.isAuthenticated = true
                setUser(newUser)
                if (this.props.history.referrer !== undefined) {
                    this.props.history.push({
                        pathname: this.props.history.referrer
                    })
                } else {
                    this.props.history.push({
                        pathname: `/700T`
                    })
                }
            } else {
                console.log("auth failed", localStorage.getItem("message"));
                this.setState({error: true, message: value});
                this.props.setMessages([{ message : "Authentication Failed", type : "danger"}])
            }
        })
    }
    render = () => {
        return (
            <AuthContext.Consumer>
                { ({user, setUser}) => {
                    
                    return (
                        <>
                        
                        <div style={{
                            position: "fixed", 
                            backgroundColor : "white", 
                            bottom : 0, top : 0, left : 0, right : 0,
                            zIndex : 10,
                            backgroundImage : `url(${bgImg})`,
                            backgroundSize : "cover" }}>

                        <Row style={{marginTop : "10vh"}} >
                            <Col xs={{span : 6, offset : 3}} lg={{span : 6, offset : 3}} style={{textAlign : "center"}}>
                                <img src={logo} className="img-responsive" alt="logo"/>
                            </Col>
                        </Row>
                        <Row style={{marginTop : "10vh"}}>
                            <Col xs={{span : 6, offset : 3}} >
                                <TextField id="username" label="Username" variant="outlined" inputRef={this.usernameRef} style={{width : "100%"}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop : "15px"}}>
                            <Col xs={{span : 6, offset : 3}} >
                                <TextField id="password" label="Password" type="password" variant="outlined" inputRef={this.pwRef} style={{width : "100%"}}/>
                            </Col>
                        </Row>
                        { this.state.error && <div style={{color: "red", textAlign: "center"}}>{this.state.message}</div> }
                        <Row style={{marginTop : "30px"}}>
                            <Col xs={{span : 6, offset : 3}} style={{textAlign : "right"}}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    style={{backgroundColor : "#EA2127"}}
                                    onClick={()=>{this.login(setUser)}}
                                >Log In</Button>
                            </Col>
                        </Row>

                        </div>
                        </>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
class LoginPageWrapper extends React.Component {
    render() {
        return (
            <MessageContext.Consumer>
              { ({messages, setMessages}) => {
                return(<LoginPage setMessages ={setMessages} {... this.props}></LoginPage>)}}
            </MessageContext.Consumer>
        )
    }
}

export default withRouter(LoginPageWrapper);
