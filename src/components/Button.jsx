const Button = ({ bg, hoverBg, text, icon, onClick, type = "button" }) => {
    return <button type={type} className={`${bg} ${hoverBg && "hover:" + hoverBg} px-4 py-2 rounded-lg transition-colors flex items-center justify-evenly`} onClick={onClick}>
        {icon}
        {text}
    </button>
}

export default Button