import React from 'react';
import { Link } from "react-router-dom";

interface linksInterface {
    label: string;
    to: string;
}

const linkableLists = ({links}: {links: linksInterface[]}) => {
    return (
        <div className="ui list large" style={{maxHeight: "100%", "float":"left", "paddingTop":"15px", "paddingBottom":"15px", "textAlign": "left"}}>
            {
                links.map((l) => {
                    return <React.Fragment><Link key={l.label} to={l.to} style={{lineHeight:"1.6", color:"#007bff"}}>{l.label}</Link><br/></React.Fragment>
                })
            }
        </div>
    )
}

export default linkableLists