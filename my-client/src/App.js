import React from 'react';
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import NeedAuth from "./components/NeedAuth";
import UsersPage from "./pages/UsersPage";
import OffersPage from "./pages/OffersPage";
import MenusPage from "./pages/MenusPage";
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/profile"} element={
                    <NeedAuth><ProfilePage/></NeedAuth>
                }/>
                <Route path={"auth-form"} element={<AuthPage/>}/>
                <Route path={"/all-users"} element={
                    <NeedAuth requireAdmin={true}><UsersPage/></NeedAuth>
                }/>
                <Route path={"/offers"} element={<OffersPage/>}/>
                <Route path={"/menus"} element={<MenusPage/>}/>
            </Routes>
        </Layout>
    );
};

export default App;