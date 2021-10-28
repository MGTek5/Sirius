import { useContext } from "react"
import userContext from "../context/userContext"

const Header = () => {
	const userC = useContext(userContext)

	return (
		<header>
			<div className="w-full h-8 bg-gray-300 flex items-center">
				<h1 className="text-lg font-bold">Sirius</h1>
				{userC.user !== null ? <div>
					<button onClick={() => {
						userC.logout()
					}}>Log Out</button>
				</div> : null}
			</div>
		</header>
	)
}

export default Header