import TextField from '@mui/material/TextField';

const SearchBar = ({text, handleChangeTextSearch}) => {
    return (
        <TextField
            label="Tìm kiếm"
            placeholder='Nhập từ tiếng anh'
            id="outlined-size-small"
            size="small"
            sx={{width: '60ch'}}
            value={text}
            onChange={(event) => handleChangeTextSearch(event.target.value)}
        />
    )
};

export default SearchBar;