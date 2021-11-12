const FormInput = ({htmlFor, labelText, inputName, inputType = "text", inputPlaceholder="", inputValue, onInputChange, required=true}) => {
	return (
		<div className="form-control">
			<label htmlFor={htmlFor} className="label">
				<span className="label-text">{labelText}</span>
			</label>
			<input required={required} className="input" name={inputName} type={inputType} placeholder={inputPlaceholder} value={inputValue} onChange={onInputChange}  />
		</div>
	)
}

export default FormInput