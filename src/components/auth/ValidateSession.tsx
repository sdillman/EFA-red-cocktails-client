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

export default ValidateSession;
