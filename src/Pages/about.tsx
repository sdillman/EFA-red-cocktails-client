import React from 'react';
import Header from "../components/header";
import NavigationBar from "../common/navigationbar";
import 'bootstrap/dist/css/bootstrap.css';

interface PageState {
    sessionToken: string;
    role: number;
}

interface PageProps {
    location: {
        state: {
            sessionToken: string;
            role: number;
        }
    }
}

class About extends React.Component<PageProps, PageState>{
    constructor(props: PageProps) {
        const  { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = props;
        super(props);
        this.state = { sessionToken, role };
    };
  
    componentDidMount() {
        const  { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = this.props;
        this.setState({ sessionToken, role });
    }

    render() {
        const  { sessionToken = '', role = 0 } = this.state;
        return (
            <div className="App">
                <NavigationBar {...{ location: { state: { sessionToken, role } } }}/>
                <Header />
                <h2>About Us placeholder</h2>
            </div>
        );
    }
}

export default About;
