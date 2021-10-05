import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../common/environment';

interface LoginState {
    email: string;
    password: string;
    sessionToken: string;
    isValid: boolean;
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
        password: '',
        sessionToken: '',
        isValid: false
      }
    };

    async handleSubmit(event :any) {
        event.preventDefault();
        const frm = (event.target as HTMLButtonElement).closest('form');
        const isValid = frm?.checkValidity() || false;
        this.setState({ isValid: isValid });
        frm?.reportValidity();

        if (!this.state.isValid) {
            return;
        }
        await fetch(`${APIURL}/auth/login`, {
            method: "POST",
            mode: 'no-cors',
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
        .catch(error => {
            console.error("Let's Talk Cocktails was unable to login the user.");
            console.error(error);
        });
    };
    
    render() {
        return (
            <div className="container">
                <h2>Log In</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        
                        <Label
                            className="form-label"
                            htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="your@email.com"
                            type="email"
                            aria-required="true"
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value }) }
                            value={this.state.email} 
                            oninput="setCustomValidity('')"
                            oninvalid="setCustomValidity('Must be a valid email address.')"

                    />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label
                            className="form-label"
                            htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            placeholder="your password"
                            type="password"
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
                        color="secondary"
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
