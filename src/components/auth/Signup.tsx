import React from 'react';
import ValidateSession from './ValidateSession';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../common/environment';

interface SignupState {
    email: string;
    password: string;
    role: string;
}

interface SignupProps {
    updateToken: (newToken: string) => void;
}

// Login and signup forms contain the same info, but differ in their titles and the action they initiate with server when a successful user account is made.

/**
 * Renders a form for user signup.
 */
class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
      super(props);
      this.state = {
        email: '',
        password: '',
        role: "user"
      }
    };
  
    componentDidMount() {

    }

    handleSignup = async() =>  {
        await fetch(`${APIURL}/user/signup`, {
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
                this.props.updateToken(data.sessionToken)
            }
        })
    };
    

    render() {
        return (
            <div className="container">
                <h1>Create Account</h1>
                <Form onSubmit = {this.handleSignup}>
                    <FormGroup>
                        <Label
                            className="form-label"
                            htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="cheers@youremail.com"
                            type="email"
                            aria-required="true"
                            required={true}
                            //target is the target element of the event-in this case, the input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
                            value={this.state.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            className="form-label"
                            htmlFor="password">Password</Label>
                        <Input
                            placeholder="make it strong and 6 characters or more"
                            type="text"
                            name="password"
                            aria-required="true"
                            required={true}
                            minLength={6}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
                            value={this.state.password} />
                        
                    </FormGroup>
                    <br>
                    </br>
                    <Button
                        type="submit"
                        className="btn-auth"
                    > Sign Up </Button>
                </Form>
                <br>
                </br>
            </div>
        );
    };
};

export default Signup;
