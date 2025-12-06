const Input = ({ label, type = "text", value, onChange, placeholder, required = false, ...props }) => {
    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        border: '2px solid var(--color-border)',
        fontSize: '0.9375rem',
        fontFamily: 'inherit',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        transition: 'all 0.2s ease',
        outline: 'none',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        fontSize: '0.875rem',
        color: 'var(--color-text)',
    };

    return (
        <div style={{ marginBottom: '1.25rem' }}>
            {label && <label style={labelStyle}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={inputStyle}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                }}
                {...props}
            />
        </div>
    );
};

export default Input;
