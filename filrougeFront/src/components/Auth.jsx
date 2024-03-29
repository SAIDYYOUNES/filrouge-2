import React, { useState } from "react";
import Modal from "../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";
import Login from "./Login";

const Auth = ({ modal, setModal }) => {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");
  const navigate = useNavigate();



  return (
    <Modal modal={modal} setModal={setModal}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem]
        overflow-auto right-0 md:right-[10rem] bg-white shadows transition-all duration-500
        ${modal ? "visible opacity-100" : "invisible opacity-0"}`}>
        <button
          onClick={() => setModal(false)}
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
                <Register /> : <Login />
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
    </Modal>
  );
};

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button
      onClick={click}
      className="flex items-center gap-10 sm:w-[20rem] border border-black
        px-3 py-2 rounded-full">
      {icon} {text}
    </button>
  );
};
