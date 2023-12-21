import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="border-end bg-light ">
            <ul className="list-unstyled" style={{ height: '100vh'}}>
                <li>
                    <Link to="/create" className="btn btn-primary btn-block mt-4 mb-4">Create Event</Link>
                </li>
                <li>
                    <Link to="/category" className="btn btn-primary btn-block">Categories</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
