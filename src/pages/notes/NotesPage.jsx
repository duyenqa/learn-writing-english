import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ButtonBackHome from "../../components/buttonback/ButtonBackHome";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./styles.css";

function NotesPage() {
    const [tabIndex, setTabIndex] = useState('1');
    const [typesOfword, setTypesOfWord] = useState([]);
    const [soundIPA, setSoundIPA] = useState([]);

    const handleChangeTabs = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getAllNounWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{"-" + item.noun}</td>);
    }

    const getAllVerbWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{"-" + item.verb}</td>);
    }

    const getAllAdjectiveWords = () => {
        return typesOfword.map((item) => <td key={item.id}>{"-" + item.adjective}</td>);
    }

    const getSingleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.single_vowel}</td>)
    }

    const getDescriptionSingleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_single_vowel}</td>)
    }

    const getDoubleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.double_vowel}</td>)
    }

    const getDescriptionDoubleVowels = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_double_vowel}</td>)
    }

    const getVoicelessConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.voiceless_consonant}</td>)
    }

    const getDescriptionVoicelessConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_voiceless_consonant}</td>)
    }

    const getVoicedConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.voiced_consonant}</td>)
    }

    const getDescriptionVoicedConsonant = () => {
        return soundIPA.map((item) => <td key={item.id}>{item.detail_voiced_consonant}</td>)
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

    useEffect(() => {
        fetchTypesOfWords();
        fetchIPAEnglish();
    }, [])

    return (
        <section className="notes">
            <div className="wrapper">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabIndex}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChangeTabs}
                                aria-label="lab API tabs example"
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
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>

                <ButtonBackHome />
            </div>
        </section>
    )
};

export default NotesPage;