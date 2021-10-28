import { useContext } from "react"
import userContext from "../context/userContext"
import Button from "./Button"

const Header = () => {
	const userC = useContext(userContext)

	return (
		<header className="">
			<div className="w-full min-h-8 bg-gray-300 flex items-center justify-between px-8">
				<h1 className="text-lg font-bold">Sirius</h1>
				{userC.user !== null ? <div className="justify-self-end">
					<Button bg="bg-blue-400" hoverBg="bg-blue-500" text="Sign Out" onClick={() => {
						userC.logout()
					}} />
				</div> : null}
			</div>
		</header>
	)
}

export default Header