import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function ButtonBackHome() {
    const navigate = useNavigate();

    return (
        <div className="backHome">
            <Fab size="medium" variant="extended" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
            </Fab>
        </div>
    )
};

export default ButtonBackHome;