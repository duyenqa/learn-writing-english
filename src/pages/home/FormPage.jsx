import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from "../../context/AuthContext";
import { useNotification } from '../../context/MessageContext';
import { utils, writeFile } from 'xlsx';
import ButtonText from '../../components/button/ButtonText';
import TextInputEglish from '../../components/input/TextInputEnglish'
import TextInputTranslation from '../../components/input/TextInputTranslation';
import CardItem from '../../components/card/CardItem';
import Footer from '../../components/footer/Footer';
import ShareSocial from '../../components/share/ShareSocial';
import SearchBar from '../../components/searchbar/SearchBar';
import MultipleButtons from '../../components/buttons/MultipleButtons';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FaceIcon from '@mui/icons-material/Face';
import './styles.css';

function FormPage() {
    const [textEnglish, setTextEnglish] = useState("");
    const [textTranslation, setTextTranslation] = useState("");
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [errorMsgField1, setErrorMsgField1] = useState('');
    const [errorMsgField2, setErrorMsgField2] = useState('');
    const [textSearch, setTextSearch] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { session, signOut } = useAuth();
    const {toast} = useNotification();
    const navigate = useNavigate();

    function onChangeTextEnglish(text) {
        setTextEnglish(text);
        setErrorMsgField1(" ");
    }

    function onChangeTextTranslation(text) {
        setTextTranslation(text);
        setErrorMsgField2(" ");
    }

    const onSubmit = async () => {
        if (!textEnglish.trim() && !textTranslation.trim()) {
            setErrorMsgField1('Không được để trống!!!');
            setErrorMsgField2('Không được để trống!!!');
            return;
        } else if (!textEnglish.trim() && textTranslation.length <= 75) {
            setErrorMsgField1('Không được để trống!!!');
            return;
        } else if (!textTranslation.trim() && textEnglish.length <= 75) {
            setErrorMsgField2('Không được để trống!!!');
            return;
        } else if (!textEnglish.trim() && !!textTranslation.trim()) {
            setErrorMsgField1('Không được để trống!!!');
            return;
        } else if (textTranslation.length > 75 && textEnglish.length <= 75) {
            setErrorMsgField2('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
            return;
        } else if (!textTranslation.trim() && !!textEnglish.trim()) {
            setErrorMsgField2('Không được để trống!!!');
            return;
        } else if (textEnglish.length > 75 && textTranslation.length <= 75) {
            setErrorMsgField1('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
            return;
        } else if (textEnglish.length > 75 && textTranslation.length > 75) {
            setErrorMsgField1('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
            setErrorMsgField2('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
            await supabase
            .from('cards')
            .insert([{ 
                text_english: textEnglish, 
                text_translation: textTranslation,
                user_id: user.id 
            }]);

        fetchCards();

        toast.success("Thêm dữ liệu thành công!");
        setTextEnglish(" ");
        setTextTranslation(" ");
        setIsDisabled(true);

        // Sau 5 giây, bật lại nút
        setTimeout(() => {
            setIsDisabled(false);
        }, 5000);
    }

    const deleteOneCard = async (id) => {
        const { error } = await supabase.from('cards').delete().eq('card_id', id);
        if (error) {
            console.error('Lỗi khi xóa:', error.message);
        } else {
            console.log('Đã xóa thành công');
            fetchCards();
        }
    }

    const onDeleteAllCards = async () => {
        const { error } = await supabase
            .from('cards')
            .delete()
            .not('card_id', 'is', null);
        fetchCards();
        if (error) {
            console.error('Lỗi khi xóa:', error);
        } else {
            toast.success("Xóa tất cả dữ liệu thành công!");
            console.log('Xóa tất cả dữ liệu thành công!');
        }
    }

    function handleRandomData(data) {
        return [...data].sort(() => Math.random() - 0.5);
    }

    function onChangeCards() {
        const newCards = handleRandomData(cards);
        setCards(newCards);
    }

    function onChangeTextSearch(text) {
        setTextSearch(text);
    }

    function exportExcel() {
        let wb = utils.book_new(),
            ws = utils.json_to_sheet(cards);

        utils.book_append_sheet(wb, ws, "vocabulary");
        writeFile(wb, "vocabulary.xlsx");
    }

    const handleSignOut = async (event) => {
        event.preventDefault();
        try{
            await signOut();
            navigate('/');
        }catch(error){
            console.error(error);
        }
    }

    const fetchCards = async () => {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Lỗi:', error);
        else setCards(data);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    useEffect(() => {
        const filtered = cards.filter((card) =>
            card.text_english.toLowerCase().includes(textSearch.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [textSearch, cards]);
    
    return (
        <section className="home">
            <div className="mainMenu">
                <div className="navbar">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <Chip icon={<FaceIcon />} label={JSON.stringify(session?.user?.email)} />
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="wrapper">
                <div className="form">
                    <TextInputEglish text={textEnglish} handleChangeTextEngField={onChangeTextEnglish} />
                    {errorMsgField1 && (<p className="errorMessage">{errorMsgField1}</p>)}
                    <TextInputTranslation text={textTranslation} handleChangeTextTranslation={onChangeTextTranslation} />
                    {errorMsgField2 && (<p className="errorMessage">{errorMsgField2}</p>)}
                    <ButtonText handleSubmit={onSubmit} status={isDisabled} />
                </div>
                <div className="menu">
                    <div className="searchField">
                        <Paper elevation={0}>
                            <SearchBar text={textSearch} handleChangeTextSearch={onChangeTextSearch} />
                        </Paper>
                    </div>
                    <div className="features">
                        <Badge color="primary" badgeContent={cards.length}>
                            <BookmarkBorderOutlinedIcon style={{ fontSize: '32px' }} />
                        </Badge>

                        <MultipleButtons
                            nameIcon1={<FlipCameraAndroidIcon />}
                            text1="Xáo trộn"
                            randomData={onChangeCards}
                            nameIcon2={<FileDownloadIcon />}
                            text2="Tải file"
                            downloadFile={exportExcel}
                            nameIcon3={<ClearAllIcon />}
                            text3="Xóa tất cả"
                            removeAllData={onDeleteAllCards}
                        />
                    </div>
                </div>
                
                <div className="flip-card">
                    {filteredCards.map((card) => (
                        <CardItem key={card.card_id} data={card} removeItem={deleteOneCard} />
                    ))}
                </div>
                
                <ShareSocial />
                <br />
                <Footer />
            </div>
        </section>
    )
};

export default FormPage;