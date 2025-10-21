import { useState, useEffect } from 'react';
import ButtonText from './components/button/ButtonText'
import TextInputEglish from './components/input/TextInputEnglish'
import TextInputTranslation from './components/input/TextInputTranslation';
import CardItem from './components/card/CardItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { supabase } from './supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import Footer from './components/footer/Footer';

function App() {
  const [textEnglish, setTextEnglish] = useState(" ");
  const [textTranslation, setTextTranslation] = useState(" ");
  const [cards, setCards] = useState([]);
  const [errorMsgField1, setErrorMsgField1] = useState('');
  const [errorMsgField2, setErrorMsgField2] = useState('');

  function onChangeTextEnglish(text) {
    setTextEnglish(text);
  }

  function onChangeTextTranslation(text) {
    setTextTranslation(text);
  }

  const onSubmit = async () => {
    if (!textEnglish.trim()) {
      setErrorMsgField1('Không được để trống!!!');
      return;
    }

    if (textEnglish.length > 75) {
      setErrorMsgField1('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
      return;
    }

    if (!textTranslation.trim()) {
      setErrorMsgField2('Không được để trống!!!');
      return;
    }

    if (textTranslation.length > 75) {
      setErrorMsgField2('Văn bản quá dài. Vui lòng nhập tối đa 75 ký tự!!!');
      return;
    }
    const { data, error } = await supabase
      .from('cards')
      .insert([{ text_english: textEnglish, text_translation: textTranslation }]);

    fetchCards();

    if (error) {
      setErrorMsg('Lỗi khi lưu:', error.message);
      toast("Thêm dữ liệu thất bại!");
    } else {
      toast("Thêm dữ liệu thành công!");
      setTextEnglish(" ");
      setTextTranslation(" ");
    }
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

  function handleRandomData(data) {
    return [...data].sort(() => Math.random() - 0.5);
  }

  function onChangeCards() {
    const newCards = handleRandomData(cards);
    setCards(newCards);
  }

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*');

    if (error) console.error('Lỗi:', error);
    else setCards(data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <section className="home">
      <div className="wrapper">
        <div className="form">
          <TextInputEglish text={textEnglish} handleChangeTextEngField={onChangeTextEnglish} />
          {errorMsgField1 && (<p className="errorMessage">{errorMsgField1}</p>)}
          <TextInputTranslation text={textTranslation} handleChangeTextTranslation={onChangeTextTranslation} />
          {errorMsgField2 && (<p className="errorMessage">{errorMsgField2}</p>)}
          <ButtonText handleSubmit={onSubmit} />
        </div>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            my: 2
          }}
        >
          <Button startIcon={<FlipCameraAndroidIcon/>} variant="contained" size="small" onClick={onChangeCards}>
            Xáo trộn
          </Button>
        </Stack>
        <div className="flip-card">
          {cards.map((card) => (
            <CardItem key={card.card_id} data={card} removeItem={deleteOneCard} />
          ))}
        </div>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </section>
  )
}

export default App;
