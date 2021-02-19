import React, { useRef } from 'react';
import './style.css';
const Index = ({ Label, name, value, change, changed = true, error, filled, ...props }) => {
    const inputRef = useRef();
    return (
        <div className="custom_input">
            <input
                className={`custom_input_input ${error && changed ? 'custom_input_error' : ''} ${
                    filled && 'custom_input_filled'
                }`}
                value={value}
                ref={inputRef}
                name={name}
                onChange={change}
                {...props}
            />
            <label
                onClick={() => {
                    inputRef.current.focus();
                }}
                className="custom_input_label"
                htmlFor={name}
            >
                {Label}
            </label>
        </div>
    );
};

export default Index;
