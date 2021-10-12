import React from 'react';

export default ({ onChange, error, label, required = false, ...props }) => {

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <label className="label">
                {label}{required && " *"}
                <input
                    {...props}
                    className="input"
                    onChange={({ target: { value }}) => {
                        onChange(value);
                    }}
                />
            </label>
        </div>
    )
};
