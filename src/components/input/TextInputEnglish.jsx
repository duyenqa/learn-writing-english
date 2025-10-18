import TextField from '@mui/material/TextField';

const TextInputEglish = ({handleChangeTextEngField}) => {
    return <TextField
          id="outlined-multiline-flexible"
          label="Nhập câu tiếng anh"
          multiline
          maxRows={2}
          size="small"
          onChange={(event) => handleChangeTextEngField(event.target.value)}
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
export default TextInputEglish;