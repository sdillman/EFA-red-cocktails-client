import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Header from '../components/header';
import NavigationBar from '../common/navigationbar';
import APIURL from '../common/environment';
import 'bootstrap/dist/css/bootstrap.css';

interface PageState {
    email: string;
    password: string;
    sessionToken: string;
    role: number;
    isValid: boolean;
    redirect: boolean;
}

interface PageProps {
    location: {
        state: {
            sessionToken: string;
            role: number;
        }
    }
}

/**
 * Renders a form for user login.
 */
class Login extends React.Component<PageProps, PageState>{
    constructor(props: PageProps) {
        super(props);
        const { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = props;
        this.state = {
            email: '',
            password: '',
            isValid: false,
            redirect: false,
            role,
            sessionToken
        }
    };
  
    componentDidMount() {
        const { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = this.props;
        this.setState({ sessionToken, role });
    }

    componentDidUpdate(prevProps: PageProps) {
        if ( this.props.location.state.sessionToken !== prevProps.location.state.sessionToken) {
            const  { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = this.props;
            this.setState({ sessionToken, role });
        }
    }

    async handleSubmit(event :any) {
        event.preventDefault();
        const frm = (event.target as HTMLButtonElement).closest('form');
        const isValid = (frm && frm.checkValidity()) || false;
        this.setState({ isValid });
        if (frm) {
            frm.reportValidity();
        }

        if (!isValid) {
            console.warn('Lets Talk Cocktails found the login form to be invalid.');
            return;
        }

        const rawResponse = await fetch(`${APIURL}/auth/login`, {
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
                }
            })
        })
        .catch(error => {
            console.error('Lets Talk Cocktails was unable to login the user.');
            console.error(error);
        });

        let data;

        if (rawResponse) {
            data = await rawResponse.json();
        }
    
        if (data && data.sessionToken) {
            this.setState({
                sessionToken: data.sessionToken,
                role: data.user.role,
                redirect: true
            });
        }
    };
    
    render() {
        const  { sessionToken = '', role = 0 } = this.state;
        if (this.state.redirect) {
            return <Redirect push to={{
                pathname: '/cocktail',
                search: '',
                state: { sessionToken, role }
            }} />
        }
        return (
            <div className='App'>
                <NavigationBar {...{ location: { state: { sessionToken, role } } }}/>
                <Header />
                <h2>Log In</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Label
                            className='form-label'
                            htmlFor='email'>Email</Label>
                        <Input
                            name='email'
                            placeholder='your@email.com'
                            type='email'
                            aria-required='true'
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value }) }
                            value={this.state.email} 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
                            onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Must be a valid email address.')}
                    />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label
                            className='form-label'
                            htmlFor='password'>Password</Label>
                        <Input
                            name='password'
                            placeholder='your password'
                            type='password'
                            aria-required='true'
                            required={true}
                            minLength={6}
                            value={this.state.password} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value }) }
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
                            onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Must be 6 characters or more.')}
                        />
                    </FormGroup>
                <br>
                </br>
                    <Button
                        color='secondary'
                        type='submit'
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
