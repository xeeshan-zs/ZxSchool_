import { motion } from 'framer-motion';

const Card = ({ children, className = "", delay = 0, style = {}, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`glass-panel ${className}`}
            style={{
                padding: '1.75rem',
                ...style
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
