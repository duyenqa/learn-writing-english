import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonText = ({handleSubmit}) => {
    return <Button
        variant="contained"
        startIcon={<SaveOutlinedIcon />}
        onClick={handleSubmit}
        >
        Lưu trữ
    </Button>;
}
export default ButtonText;