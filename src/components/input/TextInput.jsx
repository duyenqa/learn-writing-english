import TextField from '@mui/material/TextField';

const TextInput = ({textLabel, numberRows, text, handleChangeText, mandatory}) => {
 return <TextField
           id="outlined-multiline-flexible"
           label={textLabel}
           multiline
           maxRows={numberRows}
           size="medium"
           onChange={(event) => handleChangeText(event.target.value)}
           value={text}
           required={mandatory}
         />;
};

export default TextInput;