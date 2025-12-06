import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false, style = {} }) => {
    const baseStyle = {
        padding: '0.625rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        fontWeight: '600',
        fontSize: '0.9375rem',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        },
        secondary: {
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, #d97706 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
        },
        outline: {
            background: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            boxShadow: 'none',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            boxShadow: 'none',
        },
        danger: {
            background: 'linear-gradient(135deg, var(--color-danger) 0%, #dc2626 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
        }
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02, boxShadow: variant !== 'ghost' && variant !== 'outline' ? '0 8px 20px rgba(59, 130, 246, 0.4)' : undefined }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={{ ...baseStyle, ...variants[variant], ...style }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
