import { ReactElement } from "react";
import LinkableLists from "./linkable_lists";

const CreateCatalog = (): ReactElement  => {
    const links = [
        {to:"/catalog/author/create", label:"Create new author"},
        {to:"/catalog/genre/create", label:"Create new genre"},
        {to:"/catalog/book/create", label:"Create new book"},
        {to:"/catalog/bookinstance/create", label:"Create new book instance (copy)"}
    ]

    return (
        <div>
            <LinkableLists links={links}/>
        </div>
    )
}

export default CreateCatalog;