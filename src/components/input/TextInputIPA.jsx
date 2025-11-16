import TextField from '@mui/material/TextField';

const TextInputIPA = ({text, handleChangeTextIPA}) => {
 return <TextField
           id="outlined-multiline-flexible"
           label="Nhập phiên âm quốc tế"
           multiline
           maxRows={2}
           size="medium"
           onChange={(event) => handleChangeTextIPA(event.target.value)}
           value={text}
         />;
};

export default TextInputIPA;