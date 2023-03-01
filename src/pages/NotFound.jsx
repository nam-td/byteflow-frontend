const { Link } = require("react-router-dom");

const NotFound = () => {
    return (
        <div className="v-container not-found">
            <h1>The page you're looking for can't be found.</h1>
            <Link to="/">Go back to Homepage</Link>
        </div>
    );
}
export default NotFound;