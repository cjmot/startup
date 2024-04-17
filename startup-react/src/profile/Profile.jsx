import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile(props) {
    const [profileUserName, setProfileUserName] = React.useState(localStorage.getItem('userName') || '');
    const navigate = useNavigate();

    async function handleLogout() {
        if (props.loggedIn) {
            console.log('Logging out');
            fetch('api/auth/logout', {
                method: 'delete',
            }).then(() => {
                localStorage.removeItem('userName');
                props.onLogout();
                console.log('Logged out');
                navigate('/');
                alert('Logged out successfully');
            }).catch((err) => {alert(err)})
        }
    }

    React.useEffect(() => {

    })


    return (
        <main className="flex-auto h-screen flex flex-col items-center">
            <section id="info" className="w-92 flex-1 flex flex-col items-center justify-center m-5 space-y-5">
                <div className="w-92 flex flex-col space-y-5">
                    <div className="text-4xl font-medium self-center">Profile</div>
                    <hr className=" border-gray-300" />
                    <div className="pt-2 flex flex-row w-full items-center space-x-2">
                        <label htmlFor="infoUserName" className="font-semibold">Username/Email: </label>
                        <input id="infoUserName"
                               className=" py-1 px-2 bg-white border-2 rounded-sm"
                               value={profileUserName}
                               onChange={(e) => {setProfileUserName(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <button id="editButton"
                            className="w-44 border-black text-center py-3 px-5 bg-blue-400 font-medium hover:font-bold hover:bg-blue-500 transition"
                            type="button" onClick={handleLogout}>LOGOUT
                    </button>
                </div>

            </section>
        </main>
    );
}