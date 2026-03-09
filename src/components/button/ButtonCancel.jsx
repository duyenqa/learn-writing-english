import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonCancel = ({handleCancelNote}) => {
    return <Button
        variant="contained"
        fullWidth
        startIcon={<SaveOutlinedIcon />}
        onClick={handleCancelNote}
        >
        Thoát
    </Button>;
}
export default ButtonCancel;