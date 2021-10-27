import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../components/header";
import NavigationBar from "../common/navigationbar";
import 'bootstrap/dist/css/bootstrap.css';


interface PageState {
    sessionToken: string;
    role: number;
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

class Logout extends React.Component<PageProps, PageState>{
    constructor(props: PageProps) {
        super(props);
        this.state = {
          sessionToken: '',
          role: 0,
          redirect: false,
        }
    };

    componentDidMount() {
        this.setState({
            sessionToken: '',
            role: 0,
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={{
                pathname: '/cocktail',
                search: '',
                state: { sessionToken: '', role: 0 }
            }} />
        }
        return (
            <div className="App">
                <NavigationBar {...{ location: { state: { sessionToken: '', role: 0 } } }}/>
                <Header />
                <h2>You have been successfully logged out.</h2>
            </div>
        );
    }
}

export default Logout;
