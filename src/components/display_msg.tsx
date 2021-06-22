import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import MsgContext from "../context/message"

const DisplayMsg = (): React.ReactPortal => {
    const {msg, setMsg} = useContext(MsgContext);
    return ReactDOM.createPortal(
        <div>
            {   
                msg ?
                <div className="ui negative message" style={{display:'flex', top:0, left: `calc(50% - ${msg.length * 5}px)`, position: "absolute", textAlign:"center", justifyContent:"center"}}>
                    <i className="close icon" onClick={() => setMsg}></i>
                    <div className="header">{msg}</div>
                </div> :
                null
            }
        </div>,
        document.getElementById('msg-root')!
    )
}

export default DisplayMsg;