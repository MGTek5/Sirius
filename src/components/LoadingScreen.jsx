import { BallTriangle } from "svg-loaders-react";


const LoadingScreen = ({text}) => {
	return (
		<div className="w-screen h-screen bg-black flex flex-col justify-center items-center absolute top-0 right-0 z-50">
		<h1>{text}</h1>
		<BallTriangle />
	  </div>
	)
}

export default LoadingScreen