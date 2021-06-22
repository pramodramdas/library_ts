import { Link } from "react-router-dom";

const operations = ["update", "delete"]

interface linkProps {
    to: string,
    state: any
}

const modifyOptions = (id:string, type:string, state:any) => {
    return (
        operations.map((op) => {
            const props:linkProps = {
                to: `/catalog/${type}/${id}/${op}`,
                state: state
            }
            return <div>
                <Link {...props}>{`${op} ${type}`}</Link>
                <br/><br/>
            </div>
        })
    )
}

export default modifyOptions