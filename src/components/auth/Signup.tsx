import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../common/environment';

interface SignupState {
    email: string;
    password: string;
    role: string;
    isValid: boolean;
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
        role: "0",
        isValid: false
      }
    };
  
    componentDidMount() {

    }

    handleSubmit = async (event :React.SyntheticEvent) =>  {
        event.preventDefault();
        const frm = (event.target as HTMLButtonElement).closest('form');
        const isValid = frm?.checkValidity() || false;
        this.setState({ isValid: isValid });
        frm?.reportValidity();

        if (!this.state.isValid) {
            return;
        }
        await fetch(`${APIURL}/auth/signup/`, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({
                user: { 
                    email: this.state.email, 
                    password: this.state.password,
                    role: "2"
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
                this.props.updateToken(data.sessionToken)
            }
        })
        .catch(error => {
            console.error("Let's Talk Cocktails was unable to create a new user.");
            console.error(error);
        });
    };
    

    render() {
        return (
            <div className="container">
                <h2>Create Account</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
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
                            type="password"
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
                        color="secondary"
                        type="submit"
                        onClick={this.handleSubmit.bind(this)}
                    > Sign Up </Button>
                </Form>
                <br>
                </br>
            </div>
        );
    };
};

export default Signup;
