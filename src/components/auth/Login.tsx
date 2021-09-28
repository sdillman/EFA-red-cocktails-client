import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../common/environment';

interface LoginState {
    email: string;
    password: string;
}

interface LoginProps {
    updateToken: (newToken: string) => void;
}

/**
 * Renders a form for user login.
 */
 class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
      super(props);
      this.state = {
        email: '',
        password: ''
      }
    };
    
    async handleSubmit(event :any) {
        event.preventDefault();

        await fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({ user: { email: this.state.email, password: this.state.password } }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then((res) => res.json())
            // takes the session token from the response and passes it to the updatetoken object
            .then((data) => {
                //displays what message the server has programmed
                window.alert(data.message);

                if (data.sessionToken) {
                    this.props.updateToken(data.sessionToken);
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    };
    
    render() {
        return (
            <div className="container">
                <h1>Log In</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        
                        <Label
                            className="form-label"
                            htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="yeschef@email.com"
                            type="email"
                            aria-required="true"
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value}) }
                            value={this.state.email}     
                    />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label
                            className="form-label"
                            htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            placeholder="the secret sauce"
                            type="text"
                            aria-required="true"
                            required={true}
                            minLength={6}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value }) }
                            value={this.state.password}
                        />
                    </FormGroup>
                <br>
                </br>
                    <Button
                        className="btn-auth"
                        type="submit"
                        onClick={this.handleSubmit.bind(this)}
                    > Shaken or Stirred
                    </Button>
                </Form>
                <br>
                </br>
            </div>
        );
    };
};

export default Login;
