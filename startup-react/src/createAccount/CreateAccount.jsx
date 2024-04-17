import React from 'react';
import createUser from './createUser'
import {NavLink, useNavigate} from 'react-router-dom'

export function CreateAccount(props) {
    const [userNameInput, setUserNameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [confPasswordInput, setConfPasswordInput] = React.useState('');
    const navigate = useNavigate();

    async function handleCreateAccount() {
        if (!userNameInput || !passwordInput || !confPasswordInput) {
            alert("Please fill in all fields");
            return;
        } else if (confPasswordInput !== passwordInput) {
            alert("Passwords must match");
            return;
        }
        createUser(userNameInput, passwordInput)
            .then((response) => {
                if (response === true) {
                    localStorage.setItem("userName", userNameInput);
                    alert(`Account created successfully.`);
                    navigate('/');
                } else {
                    alert("User already exists");
                }
            })
            .catch((error) => {console.log(error); alert('Account creation failed, please try again later.')})
    }


    return (
        <main className="flex-auto h-screen flex flex-col justify-center items-center">
            <div className="flex-none h-1/3 w-1/3 min-w-60 max-w-96 flex flex-col min-h-fit">
                <h3 className="self-center text-4xl font-semibold mb-2">Create Account</h3>
                <hr/>
                <form className="mt-5 flex flex-col space-y-1">
                    <label htmlFor="createName"></label>
                    <input className="border-2 text-center w-full h-10 font-medium focus:placeholder-transparent"
                           type="text"
                           id="createName"
                           placeholder="Username/Email"
                           value={userNameInput}
                           onChange={(e) => setUserNameInput(e.target.value)}
                           required/>
                    <label htmlFor="createPassword"></label>
                    <input className="border-2 text-center w-full h-10 font-medium focus:placeholder-transparent"
                           type="password"
                           id="createPassword"
                           placeholder="Password"
                           value={passwordInput}
                           onChange={(e) => setPasswordInput(e.target.value)}
                           required/>
                    <label htmlFor="passwordConfirmation"></label>
                    <input className="border-2 text-center w-full h-10 font-medium focus:placeholder-transparent"
                           type="password"
                           id="passwordConfirmation"
                           placeholder="Confirm Password"
                           value={confPasswordInput}
                           onChange={(e) => setConfPasswordInput(e.target.value)}
                           required/>
                    <div className="self-center text-red-500" id="message"></div>
                    <button className="w-full text-center h-12 bg-blue-400 font-medium font-sans" type="button"
                            onClick={handleCreateAccount}>CREATE ACCOUNT
                    </button>

                </form>
                <div className="flex flex-row justify-center mt-3" id="extra-buttons">
                    <NavLink className="text-base hover:underline hover:underline-offset-4 hover:font-medium" to={'/'}>
                        Back to Login
                    </NavLink>
                </div>
            </div>
        </main>
    );
}