import TextField from '@mui/material/TextField';

const SearchBar = ({ text, handleChangeTextSearch }) => {
    return (
        <TextField
            id="outlined-search" 
            label="Tìm kiếm" 
            type="search"
            placeholder='Nhập từ tiếng anh'
            size="small"
            value={text}
            fullWidth
            onChange={(event) => handleChangeTextSearch(event.target.value)}
        />
    )
};

export default SearchBar;