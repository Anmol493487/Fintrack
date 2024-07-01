import { useRouteError,useNavigate,Link } from "react-router-dom";
export default function Error() {
    const err = useRouteError();
    const navigate = useNavigate();
    return(
        <div className="error">
            <h1>Oops! we got some error</h1>
            <p>{err.message || err.statusText}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={()=>navigate(-1)}>
                    <span>Go Back</span>
                </button>
                <Link to="/" className="btn btn--dark">
                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    );
}
