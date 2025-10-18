import TextField from '@mui/material/TextField';

const TextInputTranslation = ({handleChangeTextTranslation}) => {
    return <TextField
          id="outlined-multiline-flexible"
          label="Nhập câu 2"
          multiline
          maxRows={2}
          size="small"
          onChange={(event) => handleChangeTextTranslation(event.target.value)}
          sx={{
            width: {
              xs: '100%',
              sm: '80%',
              md: '60%'
            }
          }}
          required
        />;
}
export default TextInputTranslation;