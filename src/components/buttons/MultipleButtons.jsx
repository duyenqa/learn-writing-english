import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const MultipleButtons = ({nameIcon1, text1, nameIcon2, text2,nameIcon3, text3,randomData,removeAllData,downloadFile}) => {
    
    return (
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button startIcon={nameIcon1} onClick={() => randomData()}>{text1}</Button>
            <Button startIcon={nameIcon2} onClick={() => downloadFile()}>{text2}</Button>
            <Button startIcon={nameIcon3} onClick={() => removeAllData()}>{text3}</Button>
        </ButtonGroup>
    )
};

export default MultipleButtons;