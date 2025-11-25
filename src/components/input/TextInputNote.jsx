import TextField from '@mui/material/TextField';

const TextInputNote = ({text, handleChangeTextNoteField}) => {
 return <TextField
           id="outlined-multiline-flexible"
           label="Nhập ghi chú"
           multiline
           maxRows={3}
           size="medium"
           onChange={(event) => handleChangeTextNoteField(event.target.value)}
           value={text}
           required
         />;
};

export default TextInputNote;