import TextField from '@mui/material/TextField';

const SearchBar = ({ text, handleChangeTextSearch }) => {
    return (
        <TextField
            label="Tìm kiếm"
            placeholder='Nhập từ tiếng anh'
            id="outlined-size-small"
            size="small"
            value={text}
            fullWidth
            onChange={(event) => handleChangeTextSearch(event.target.value)}
        />
    )
};

export default SearchBar;