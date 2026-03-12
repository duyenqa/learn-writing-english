import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNotification } from '../../context/MessageContext';
import TextInput from "../../components/input/TextInput";
import Typography from '@mui/material/Typography';
import ButtonText from "../../components/button/ButtonText";
import ButtonCancel from "../../components/button/ButtonCancel";
import Button from '@mui/material/Button';
import NoteItem from "../../components/note/NoteItem";
import ShareSocial from '../../components/share/ShareSocial';
import Footer from "../../components/footer/Footer";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { styled } from '@mui/material/styles';
import "./styles.css";
import Navbar from "../../components/navbar/Navbar";

function NotesPage() {
    const [tabIndex, setTabIndex] = useState('1');
    const [typesOfword, setTypesOfWord] = useState([]);
    const [soundIPA, setSoundIPA] = useState([]);
    const [note, setNote] = useState("");
    const [errorMsgNote, setErrorMsgNote] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [notes, setNotes] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const { toast } = useNotification();

    const handleChangeTabs = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getAllNounWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{"-" + item.noun}</td>);
    }

    const getAllVerbWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{item.verb?.trim().length > 0 ? "-" + item.verb : "/"}</td>)
    }

    const getAllAdjectiveWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{item.adjective?.trim().length > 0 ? "-" + item.adjective : "/"}</td>)
    }

    const getSingleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.single_vowel?.trim().length > 0 ? item.single_vowel : "/"}</td>)
    }

    const getDescriptionSingleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_single_vowel?.trim().length > 0 ? item.detail_single_vowel : "/"}</td>)
    }

    const getDoubleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.double_vowel?.trim().length > 0 ? item.double_vowel : "/"}</td>)
    }

    const getDescriptionDoubleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_double_vowel?.trim().length > 0 ? item.detail_double_vowel : "/"}</td>)
    }

    const getVoicelessConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.voiceless_consonant}</td>)
    }

    const getDescriptionVoicelessConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_voiceless_consonant}</td>)
    }

    const getVoicedConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.voiced_consonant?.trim().length > 0 ? item.voiced_consonant : "/"}</td>)
    }

    const getDescriptionVoicedConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_voiced_consonant?.trim().length > 0 ? item.detail_voiced_consonant : "/"}</td>)
    }

    const fetchTypesOfWords = async () => {
        const { data, error } = await supabase
            .from('word_types')
            .select('*')

        if (error) console.error('Lỗi:', error);
        else setTypesOfWord(data);
    }

    const fetchIPAEnglish = async () => {
        const { data, error } = await supabase
            .from('ipa')
            .select('*')

        if (error) console.error('Lỗi:', error);
        else setSoundIPA(data);
    }

    const fetchNotes = async () => {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Lỗi:', error);
        else setNotes(data);
    }

    useEffect(() => {
        fetchTypesOfWords();
        fetchIPAEnglish();
        fetchNotes();
    }, [])

    function onChangeTextNote(text) {
        setNote(text);
        setErrorMsgNote(" ");
    }

    function onCancel() {
        setNote(" ");
    }

    const onSubmit = async () => {
        if (!note.trim()) {
            setErrorMsgNote("Không được để trống!!!");
            return;
        } else if (note.length > 250) {
            setErrorMsgNote('Văn bản quá dài. Vui lòng nhập tối đa 250 ký tự!!!');
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        await supabase
            .from('notes')
            .insert([{
                text_note: note,
                user_id: user.id
            }]);

        fetchNotes();
        toast.success("Thêm dữ liệu thành công!");
        setNote(" ");
        setIsDisabled(true);

        // Sau 5 giây, bật lại nút
        setTimeout(() => {
            setIsDisabled(false);
        }, 5000);
    }

    const handleDeleteOneNote = async (id) => {
        const { error } = await supabase.from('notes').delete().eq('id', id);
        if (error) {
            console.error('Lỗi khi xóa:', error.message);
        } else {
            fetchNotes();
        }
    }

    const onDeleteAllNotes = async () => {
        const { error } = await supabase
            .from('notes')
            .delete()
            .not('id', 'is', null);
        fetchNotes();
        if (error) {
            console.error('Lỗi khi xóa:', error);
        } else {
            toast.success("Xóa tất cả dữ liệu thành công!");
        }
    }

    function prevSlider() {
        setSlideIndex(slideIndex == 0 ? notes.length - 1 : slideIndex - 1);
    }

    function nextSlider() {
        setSlideIndex(slideIndex == notes.length - 1 ? 0 : slideIndex + 1);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'transparent',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        flexGrow: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    return (
        <section className="notes">
            <div className="wrapper">
                <Navbar />
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabIndex}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'warning.light' }}>
                            <TabList
                                onChange={handleChangeTabs}
                                aria-label="lab API tabs example"
                                indicatorColor="primary"
                                textColor="inherit"
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                <Tab value="1" label="Nhận biết loại từ" />
                                <Tab value="2" label="Cách phát âm" />
                                <Tab value="3" label="Ghi chú" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="tableWrapper">
                                <table className="wordTypes">
                                    <thead>
                                        <tr className="rowTable">
                                            <th><Chip label="Danh từ" variant="outlined" /></th>
                                            <th><Chip label="Động từ" variant="outlined" /></th>
                                            <th><Chip label="Tính từ" variant="outlined" /></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bodyTable">
                                        <tr>{getAllNounWords()}</tr>
                                        <tr>{getAllVerbWords()}</tr>
                                        <tr>{getAllAdjectiveWords()}</tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="tableWrapper">
                                <table className="ipaTable">
                                    <thead>
                                        <tr className="rowIPATable">
                                            <th>Nguyên âm đơn</th>
                                            <th>Cách đọc</th>
                                            <th>Nguyên âm đôi</th>
                                            <th>Cách đọc</th>
                                            <th>Phụ âm vô thanh</th>
                                            <th>Cách đọc</th>
                                            <th>Phụ âm hữu thanh</th>
                                            <th>Cách đọc</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bodyIPATable">
                                        <tr>{getSingleVowels()}</tr>
                                        <tr>{getDescriptionSingleVowels()}</tr>
                                        <tr>{getDoubleVowels()}</tr>
                                        <tr>{getDescriptionDoubleVowels()}</tr>
                                        <tr>{getVoicelessConsonant()}</tr>
                                        <tr>{getDescriptionVoicelessConsonant()}</tr>
                                        <tr>{getVoicedConsonant()}</tr>
                                        <tr>{getDescriptionVoicedConsonant()}</tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="listNotes">
                                <div className="form">
                                    <TextInput
                                        textLabel="Nhập ghi chú"
                                        numberRows="3"
                                        text={note}
                                        handleChangeText={onChangeTextNote}
                                        mandatory={true}
                                    />
                                    {errorMsgNote && (<p className="errorMessage">{errorMsgNote}</p>)}

                                    <Stack
                                        spacing={{ xs: 1, sm: 2 }}
                                        direction="row"
                                        useFlexGap
                                        sx={{ flexWrap: 'wrap' }}
                                    >
                                        <Item>
                                            <ButtonText handleSubmit={onSubmit} status={isDisabled} />
                                        </Item>
                                        <Item>
                                            <ButtonCancel handleCancel={onCancel} />
                                        </Item>
                                    </Stack>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Typography variant="h5" gutterBottom>
                                        <strong>Tổng số ghi chú: {notes?.length}</strong>
                                    </Typography>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<ClearAllIcon />}
                                        onClick={onDeleteAllNotes}
                                    >
                                        Xóa tất cả
                                    </Button>
                                </div>
                                {notes.map((note, index) => (
                                    <NoteItem
                                        key={note.id}
                                        idx={index}
                                        data={note}
                                        removeItemNote={handleDeleteOneNote}
                                        indexSlider={slideIndex}
                                    />
                                ))}
                            </div>
                            <div className="arrows">
                                <Chip
                                    color="warning"
                                    variant="filled"
                                    icon={<ArrowBackIcon />}
                                    onClick={prevSlider}
                                />
                                <div className="number-text">
                                    {notes?.length == 0 ? `${slideIndex}` : `${slideIndex + 1}/${notes.length}`}
                                </div>
                                <Chip
                                    color="warning"
                                    variant="filled"
                                    icon={<ArrowForwardIcon />}
                                    onClick={nextSlider}
                                />
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
                <ShareSocial />
                <Footer />
            </div>
        </section>
    )
};

export default NotesPage;