import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage notfound/>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': '500', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;