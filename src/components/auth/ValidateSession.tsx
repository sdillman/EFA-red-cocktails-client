import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Signup from "./Signup";
import Login from "./Login";

interface State {
    sessionToken: string;
    authModeLogin: boolean;
    showModal: boolean;
}

interface Props {
    sessionToken: string;
    updateToken: (newToken: string) => void;
    showModal: boolean;
    closeAuth: () => void;
}

class ValidateSession extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sessionToken: this.props.sessionToken,
            authModeLogin: true,
            showModal: this.props.showModal
        };
    }

    toggleContent(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.setState({
            showModal: true,
            authModeLogin: !this.state.authModeLogin
        });
    }
    
    toggleModel() {
        this.setState({ showModal: !this.state.showModal });
        this.props.closeAuth();
    }

    render() {
        return (
            <Modal isOpen={this.state.showModal} toggle={this.toggleModel.bind(this)}>
                <ModalHeader>{ this.state.authModeLogin ? "Log In" : "Create Account" }</ModalHeader>
                <ModalBody>
                    { this.state.authModeLogin
                        ? <Login {...{ updateToken: this.props.updateToken }} />
                        : <Signup {...{ updateToken: this.props.updateToken }} />
                    }
                </ModalBody>
                <ModalFooter className="justify-content-between">
                    <button onClick={this.toggleContent.bind(this)}>
                        { this.state.authModeLogin ? "Create Account instead?" : "Log In instead?" }
                    </button>
                    <Button color="secondary" onClick={this.toggleModel.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
};


// react router (EmJ) react router issues that Justin helped to solve
// don't do admin privileges in localstorage
// functionApp ({isAdmin} as a prop) {
//     return(
//         isAdmin && 5;
//     )

// if isAdmin false, then returns false. If true, returns '5'

// let isAdmin = true
// return (
//     {isAdmin && <>Admin route</>} if isAdmin false, simply goesn't display the option
// )
// }


export default ValidateSession;
