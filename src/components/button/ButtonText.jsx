import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const ButtonText = ({handleSubmit}) => {
    return <Button
        variant="contained"
        endIcon={<SaveOutlinedIcon />}
        onClick={handleSubmit}
        sx={{
            width: {
                xs: '100%',
                sm: '80%',
                md: '60%'
            }
        }}>
        Lưu trữ
    </Button>;
}
export default ButtonText;