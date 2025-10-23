import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonText = ({status, handleSubmit}) => {
    console.log("xem: " + status);
    return <Button
        variant="contained"
        startIcon={<SaveOutlinedIcon />}
        onClick={handleSubmit}
        disabled={status}
        >
        {status ? 'Vui lòng chờ...' : 'Lưu'}
    </Button>;
}
export default ButtonText;