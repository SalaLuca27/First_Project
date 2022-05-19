import { BrowserRouter, Route, Navigate, Outlet, Routes } from "react-router-dom";
import {UsersPage, UserPage, PostsPage, PostPage, LoginPage, HomePage, RegisterPage, SubUserPage, ProfilePage, CreatePostPage, CreateUserPage, UpdatePostPage, UpdateUserPage, ForgotPasswordPage} from '../Pages';
import {ROUTES} from '../Utils/routes';
import Sidebar from "../Components/Sidebar";
import { Auth } from "aws-amplify";

const RequireAuth = () => {

    if(Auth.currentSession().then((data) => {data.getAccessToken().getJwtToken()}) !== "") {
        return <Outlet />
    }
    return <Navigate to = {ROUTES.login} />
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<RequireAuth />} >
                    <Route element = {<Sidebar />} >
                        <Route path = {ROUTES.home} element = {<HomePage/>} />
                        <Route path = {ROUTES.users} element = {<UsersPage/>} />
                        <Route path = {ROUTES.posts} element = {<PostsPage/>} />
                        <Route path = {ROUTES.user} element = {<UserPage/>} />
                        <Route path = {ROUTES.post} element = {<PostPage/>} />
                        <Route path = {ROUTES.sub} element = {<SubUserPage/>} />
                        <Route path = {ROUTES.profilo} element = {<ProfilePage/>} />
                        <Route path = {ROUTES.createPost} element = {<CreatePostPage/>} />
                        <Route path = {ROUTES.createUser} element = {<CreateUserPage/>} />
                        <Route path = {ROUTES.updatePost} element = {<UpdatePostPage/>} />
                        <Route path = {ROUTES.updateUser} element = {<UpdateUserPage/>} />
                    </Route>
                </Route>
                <Route path = {ROUTES.login} element = {<LoginPage />} />
                <Route path = {ROUTES.registrazione} element = {<RegisterPage />} />
                <Route path = {ROUTES.forgotPassword} element = {<ForgotPasswordPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes