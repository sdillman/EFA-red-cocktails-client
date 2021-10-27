import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from '../components/header';
import NavigationBar from '../common/navigationbar';
import APIURL from '../common/environment';

interface PageState {
    email: string;
    password: string;
    role: number;
    isValid: boolean;
    sessionToken: string;
    redirect: boolean;
}

interface PageProps {
    location: {
        state: {
            sessionToken: string;
        }
    },
}


// Login and Register forms contain the same info, but differ in their titles and the action they initiate with server when a successful user account is made.

/**
 * Renders a form for user Register.
 */
class Register extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
      super(props);
      const { location: { state: { sessionToken = '' } = {} } = {} } = props;
      this.state = {
        email: '',
        password: '',
        role: 0,
        isValid: false,
        sessionToken,
        redirect: false
      }
    };

    componentDidMount() {
        const { location: { state: { sessionToken = '' } = {} } = {} } = this.props;
        this.setState({ sessionToken });
    }

    // SyntheticEvent is the React wrapper for cross-browser native events, which allows events to work identically across all browsers
    handleSubmit = async (event :React.SyntheticEvent) =>  {
        event.preventDefault();
        const frm = (event.target as HTMLButtonElement).closest('form');
        const isValid = await (frm && frm.checkValidity()) || false;
        this.setState({ isValid: isValid });

        if (frm) {
            frm.reportValidity();
        }
        
        if (!this.state.isValid) {
            return;
        }

        const rawResponse = await fetch(`${APIURL}/auth/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': {
                    'email': this.state.email,
                    'password': this.state.password,
                    'role': 2
                }
            })
        })
        .catch(error => {
            console.error('Lets Talk Cocktails was unable to create a new user.');
            console.error(error);
        });

        let data;

        if (rawResponse) {
            data = await rawResponse.json();
        }
    
        if (data && data.sessionToken) {
            this.setState({
                sessionToken: data.sessionToken,
                role: 2,
                redirect: true
            });
        }
    };
    

    render() {
        if (this.state.redirect) {
            return <Redirect push to={{
                pathname: '/cocktail',
                search: '',
                state: { sessionToken: '', role: 0 }
            }} />
        }
        const  { sessionToken = '', role = 0 } = this.state;
        return (
            <div className='App'>
                <NavigationBar {...{ location: { state: { sessionToken, role} } }}/>
                <Header />
                <h2>Create Account</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Label
                            className='form-label'
                            htmlFor='email'>Email</Label>
                        <Input
                            name='email'
                            placeholder='cheers@youremail.com'
                            type='email'
                            aria-required='true'
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
                            value={this.state.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            className='form-label'
                            htmlFor='password'>Password</Label>
                        <Input
                            placeholder='make it strong and 6 characters or more'
                            type='password'
                            name='password'
                            aria-required='true'
                            required={true}
                            minLength={6}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
                            value={this.state.password} />
                        
                    </FormGroup>
                    <br>
                    </br>
                    <Button
                        color='secondary'
                        type='submit'
                        onClick={this.handleSubmit.bind(this)}
                    > Sign Up </Button>
                </Form>
                <br>
                </br>
            </div>
        );
    };
};

export default Register;
