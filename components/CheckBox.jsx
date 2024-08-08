import { useEffect, useState } from 'react';

export default function CheckBox({
    primaryText,
    secondaryText,
    sliderColor = "rgb(23, 201, 100)",
    value,
    onValueChange,
}) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (value == "0" || value == 0 || value == false) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }, [value]);

    const handleCheckboxChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onValueChange(newValue);
    };

    const sliderStyle = isChecked ? { backgroundColor: sliderColor } : {};
    const textStyle = isChecked ? { color: '#fff' } : { color: '#000' };

    return (
        <>
            <label className="custom-switch">
                <input 
                    type="checkbox"
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                />
                <div className="custom-slider round" style={sliderStyle}></div>
                <div className="custom-switch-text" style={textStyle}>{isChecked ? secondaryText : primaryText}</div>
            </label>
        </>
    )
}
