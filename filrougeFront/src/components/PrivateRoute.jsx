import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import NotAuthorized from './NotAuthorized';
import { Blog } from '../Context/Context';
import Login from './Login';
import Auth from './Auth';
import Register from './Register';
import { useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { useEffect } from 'react';


export default function PrivateRoute() {

    const { authModel, setAuthModel } = Blog();
    const { logged, user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [modal, setModal] = useState(true);
    const [createUser, setCreateUser] = useState(false);

    if (logged) {
        return <Outlet />;
    } else {
       return(
        <section
        className={`top-0 bottom-0 left-0 md:left-[10rem]
        my-8
        overflow-auto right-0 md:right-[10rem] bg-white  transition-all duration-500
        ${modal ? "visible opacity-100" : "invisible opacity-0"}`}>
        <button
        //   onClick={() => setModal(false)}
          className="absolute top-8 right-8 text-2xl hover:opacity-50">
          <LiaTimesSolid />
        </button>
        <div className="flex flex-col justify-center items-center gap-[3rem]">

          <>
            <h2 className="text-2xl pt-[5rem]">
              {createUser ? "Join Medium" : "Welcome Back"}
            </h2>
            <div className="flex flex-col gap-2 w-fit mx-auto">
              {createUser ?
                <Register Switch={setCreateUser} /> : <Login />
              }
            </div>
            <p>
              {createUser ? "Already have an account" : "No Account"}
              <button
                onClick={() => setCreateUser(!createUser)}
                className="text-green-600 hover:text-green-700 font-bold ml-1">
                {createUser ? "Sign In" : "Create one"}
              </button>
            </p>
          </>


        </div>
      </section>
       )
    }

};