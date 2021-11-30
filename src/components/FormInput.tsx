import { ChangeEventHandler } from "react"

interface FormInputProps {
	htmlFor:string;
	labelText:string
	inputName:string;
	inputType?:string;
	inputPlaceholder:string;
	inputValue:any;
	onInputChange: ChangeEventHandler<HTMLInputElement>;
	required?:boolean;
}

const FormInput = ({htmlFor, labelText, inputName, inputType = "text", inputPlaceholder="", inputValue, onInputChange, required=true}: FormInputProps) => {
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