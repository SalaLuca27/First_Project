import {useState} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom';
import { ROUTES } from '../Utils/routes';
import '../css/sidebar.css'
import { Auth } from 'aws-amplify';

const Sidebar = () => {
    const navigate = useNavigate();
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
    const handleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    }

    const handleClick = (event) => {
        // navigate(ROUTES.event.target.name);
        navigate('/' + event.target.name);
        window.location.reload();
    }

    const logout = () => {
        localStorage.setItem('userId', '');
        localStorage.setItem('username', '');
        localStorage.setItem('description', '');
        localStorage.setItem('userPostId', '');
        localStorage.setItem('token', '');
        localStorage.setItem('postId', '');
        Auth.signOut();
        navigate(ROUTES.login);
    }

    return (
        <div style={{width:"100vw", height:"100vh", display: 'flex'}}>
            <div style={{width: sidebarIsOpen ? "255px" : "0px", backgroundColor: "#ff3e52"}}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                </div>
                <div className="orderLinksDIV">
                    <ul className="sidebarUL" style={{display: sidebarIsOpen ? "" : "none"}}>
                        <li></li>
                        <li></li>
                        <li className='sidebarLI'>
                            <Link className='sidebarLink' to={ROUTES.home} onClick={handleClick} name = ''>HOME</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.users} onClick={handleClick} name = "users">Users</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.posts} onClick={handleClick} name = "posts">Posts</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.sub} name = "sub">Subscription</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.createPost} onClick={handleClick} name = "createPost">New Post</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.createUser} onClick={handleClick} name = "createUser">New User</Link>
                        </li>
                        <li className="sidebarLI">
                            <Link className="sidebarLink" to={ROUTES.profilo} onClick={handleClick} name = "profilo">Profilo</Link>
                        </li>
                    </ul>
                    <button className="linkLogout" onClick={logout}>Logout</button>
                </div>
            </div>
            <div className="SidebarDIV" style={{paddingLeft: sidebarIsOpen ? "60px": "10px"}}>
                <div style={{display: sidebarIsOpen ? "none" : ""}}>
                    <button onClick={handleSidebar} style={{color: "#ff3e52", padding: "0px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                        </svg>
                    </button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;