import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonText = ({status, handleSubmit}) => {
    return <Button
        variant="contained"
        startIcon={<SaveOutlinedIcon />}
        sx={{width: '250px'}}
        size="large"
        onClick={handleSubmit}
        disabled={status}
        >
        {status ? 'Vui lòng chờ...' : 'Lưu'}
    </Button>;
}
export default ButtonText;