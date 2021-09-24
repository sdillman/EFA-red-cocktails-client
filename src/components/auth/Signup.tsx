import React from 'react';
import ValidateSession from '../src/components/auth/ValidateSession';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../common/environment';



//login and signup forms contain the same info, but differ in their titles and the action they initiate with server when a successful user account is made.

class Signup extends React.Component{
    constructor(props :any) {
    
        super(props);
        this.state = {
            email: '',
            password: '',
            role: "user"
        }
        
    
        handleSignup = async() =>  {
            fetch(`${APIURL}/user/signup`, {
                method: "POST", 
                body: JSON.stringify({
                    user: { 
                        email: this.state.email, 
                        password: this.state.password,
                        role: "user"
                    } 
                }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then((response) => response.json())
            .then((data) =>
            {
                //display to user the server's response
                //then update the token
                window.alert(data.message);
                //takes the session token from the response and passes it to the updatetoken object IF a sessionToken exists
                if (data.sessionToken) {
                //we can do this bc updateToken is defined in app.js
                    props.updateToken(data.sessionToken)
                }
            })
        }
    
    }
    //this is our own return 
    render() {
        return (
            <div className="container">
                <h1>Create Account</h1>

                <Form onSubmit = {handleSignup}>
                    <FormGroup>
                        
                        <Label
                            className="form-label"
                            htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="thenakedchef@email.com"
                            type="email"
                            aria-required="true"
                            required
                        //target is the target element of the event-in this case, the input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                        </FormGroup>
                    
                    <FormGroup>
                        <Label
                            className="form-label"
                            htmlFor="password">Password</Label>
                        <Input
                            placeholder="make it strong, spicy, and 6 characters or more"
                            type="text"
                            name="password"
                            aria-required="true"
                            required
                            minLength="6"
                        //callback functions, being called within the onChange event handlers, are called with an 'event' object as an argument. This is default behavior to any event handler.  Digging into these event objects let us grab hold of the input data the user has typed
                            
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                        
                    </FormGroup>
                <br>
                </br>
                    <Button
                        type="submit"
                        className="btn-auth"
                    > Sign Up </Button>
                    
                    <div id="signupSpinnerDiv">
                    <br></br>
                        <Spinner
                        id="signupSpinner"
                        color="#EBD569"
                        type="border"
                        role="status"
                        size="md">
                        <span class="visually-hidden">Loading...</span>
                    </Spinner>
                    </div>
                </Form>
                <br>
                </br>
                </div>
        );
    };

    }

export default Signup;
