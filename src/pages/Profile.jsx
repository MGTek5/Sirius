import { useContext } from "react"
import userContext from "../context/userContext"
import { app } from "../utils/appwrite";

const Profile = () => {
    const userC = useContext(userContext);

    return (

        <main className="flex flex-col justify-center items-center">
            <div className="card lg:card-side bordered">
                <figure>
                    <img src={app.avatars.getInitials(userC?.user?.name || "anon")} alt="profile initials" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl capitalize">{userC?.user?.name || "anon"}</h2>
                    <span>{userC.user?.email}</span>
                    <div className="w-full h-full flex flex-col justify-evenly">
                        <div className="flex flex-col">
                            <p>In order to receive realtime update, subscribe to push notifications here</p>
                            {Notification.permission === "granted" &&
                                <div className="alert alert-success">
                                    <div className="flex-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                        </svg>
                                        <label>You have already enabled permissions for this website! We promise not to abuse them</label>
                                    </div>
                                </div>

                            }
                            {
                                Notification.permission === "denied" &&

                                <div className="alert alert-error">
                                    <div className="flex-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                        </svg>
                                        <label>You denied permissions for notifications before, please go into your settings and enable them (usually found on the green padlock next to the site's name)</label>
                                    </div>
                                </div>

                            }
                            {
                                Notification.permission === "default" && <button className="btn btn-primary">
                                    Activate notifications
                                </button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </main >
    )
}

export default Profile