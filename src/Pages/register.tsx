import React from 'react';
import Header from "../components/header";
import NavigationBar from "../common/navigationbar";
import 'bootstrap/dist/css/bootstrap.css';
interface PageProps {
    sessionToken: string;
}

class Register extends React.Component<PageProps, {}>{
    render() {
        return (
            <div className="App">
                <NavigationBar token={this.props.sessionToken} />
                <Header />
                <p>Register placeholder</p>
            </div>
        );
    }
}

export default Register;
