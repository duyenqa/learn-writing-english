import { useState, useEffect } from 'react';
import ButtonText from './components/button/ButtonText'
import TextInputEglish from './components/input/TextInputEnglish'
import TextInputTranslation from './components/input/TextInputTranslation';
import { supabase } from './supabaseClient';
import './App.css'
import CardItem from './components/card/CardItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [textEnglish, setTextEnglish] = useState(" ");
  const [textTranslation, setTextTranslation] = useState(" ");
  const [cards, setCards] = useState([]);
  const [isHoverCard, setIsHoverCard] = useState(null);

  function onChangeTextEnglish(text) {
    setTextEnglish(text);
  }

  function onChangeTextTranslation(text) {
    setTextTranslation(text);
  }

  const onSubmit = async () => {
    const { data, error } = await supabase
      .from('cards')
      .insert([{ text_english: textEnglish, text_translation: textTranslation }]);

      setTextEnglish(" ");
      setTextTranslation(" ");
      fetchCards();
      
    if (error) {
      console.error('Lỗi khi lưu:', error.message);
      toast("Thêm dữ liệu thất bại!");
    } else {
      toast("Thêm dữ liệu thành công!");
      console.log('Đã lưu thành công:', data);
    }
  }

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*');

    if (error) console.error('Lỗi:', error);
    else setCards(data);
  };

  const deleteOneCard = async (id) => {
    const { error } = await supabase.from('cards').delete().eq('card_id', id);
    if (error) {
      console.error('Lỗi khi xóa:', error.message);
    } else {
      console.log('Đã xóa thành công');
      fetchCards();
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <section className="home">
      <div className="wrapper">
        <div className="form">
          <TextInputEglish text={textEnglish} handleChangeTextEngField={onChangeTextEnglish} />
          <TextInputTranslation text={textTranslation} handleChangeTextTranslation={onChangeTextTranslation} />
          <ButtonText handleSubmit={onSubmit} />
        </div>
        <Typography variant="h4" gutterBottom>Danh sách</Typography>
        <div className="listCard">
          {cards.map((card) => (
            <div
              className="flip-card"
              key={card.card_id}
              onMouseEnter={() => setIsHoverCard(card.card_id)}
              onMouseLeave={() => setIsHoverCard(null)}
            >
              <CardItem data={card} />
              <div className="btn-delete" onClick={() => deleteOneCard(card.card_id)}>
                <DeleteIcon style={{ fontSize: '32px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
       />
    </section>
  )
}

export default App;
