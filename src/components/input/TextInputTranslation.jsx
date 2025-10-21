import TextField from '@mui/material/TextField';

const TextInputTranslation = ({text, handleChangeTextTranslation}) => {
    return <TextField
          id="outlined-multiline-flexible"
          label="Nhập câu 2"
          multiline
          maxRows={2}
          size="medium"
          onChange={(event) => handleChangeTextTranslation(event.target.value)}
          value={text}
          required
        />;
}
export default TextInputTranslation;