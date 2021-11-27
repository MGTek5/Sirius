const Footer = () => {
	return (

<footer className="items-center p-4 footer bg-neutral text-neutral-content">
  <div className="items-center grid-flow-col">
  <img src="/icons/icon-512x512.png" className="h-12 w-12 self-center mb-2" alt="logo"/>

    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </div> 
  <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
  </div>
</footer>
	)
}

export default Footer