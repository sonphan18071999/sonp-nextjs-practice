import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div style={styles.spinner}>
            <RotatingLines
                strokeColor="blue"
                strokeWidth="5"
                animationDuration="0.75"
                width="100"
                visible={true}
            />
        </div>
    );
};

const styles = {
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};

export default LoadingSpinner;
