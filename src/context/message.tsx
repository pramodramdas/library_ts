import React from 'react';

const Context = React.createContext<MsgState>({msg: '', type: '', setMsg: () => {}});

interface MsgState {
    msg: string,
    type: string,
    setMsg: Function
}

export class MsgStore extends React.Component<{}, MsgState> {
    constructor(props: {}) {
        super(props)
        this.state = { msg: '', type: '', setMsg: this.setMsg };
    }

    setMsg = (type="", msg="") => {
        this.setState({ type, msg });
    };

    render() {
        return (
            <Context.Provider
            value={{ ...this.state }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Context;
