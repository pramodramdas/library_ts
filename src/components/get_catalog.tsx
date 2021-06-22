import { ReactElement } from "react";
import LinkableLists from "./linkable_lists";

const GetCatalog = (): ReactElement => {

    const links = [
        {to:"/catalog", label:"Home"},
        {to:"/catalog/books", label:"All books"},
        {to:"/catalog/authors", label:"All authors"},
        {to:"/catalog/genres", label:"All genres"},
        {to:"/catalog/bookinstances", label:"All book-instances"}
    ]

    return (
        <div>
            <LinkableLists links={links}/>
        </div>
    )
}

export default GetCatalog;