import TextField from '@mui/material/TextField';

const TextInputEglish = ({text, handleChangeTextEngField}) => {
    return <TextField
          id="outlined-multiline-flexible"
          label="Nhập câu 1"
          multiline
          maxRows={2}
          size="medium"
          onChange={(event) => handleChangeTextEngField(event.target.value)}
          value={text}
          required
        />;
}
export default TextInputEglish;