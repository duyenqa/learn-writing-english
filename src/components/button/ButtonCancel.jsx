import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonCancel = ({handleCancel}) => {
    return <Button
        variant="contained"
        fullWidth
        startIcon={<SaveOutlinedIcon />}
        onClick={handleCancel}
        >
        Thoát
    </Button>;
}
export default ButtonCancel;