import { useState, useEffect } from 'react';
import ButtonText from './components/button/ButtonText'
import TextInputEglish from './components/input/TextInputEnglish'
import TextInputTranslation from './components/input/TextInputTranslation';
import { supabase } from './supabaseClient';
import './App.css'
import CardItem from './components/card/CardItem';

function App() {
  const [textEnglish, setTextEnglish] = useState(" ");
  const [textTranslation, setTextTranslation] = useState(" ");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHoverCard, setIsHoverCard] = useState(null);

  function onChangeTextEnglish(text) {
    setTextEnglish(text);
  }

  function onChangeTextTranslation(text) {
    setTextTranslation(text);
  }

  const onSubmit = async () => {
    console.log(textEnglish + "-" + textTranslation);
    const { data, error } = await supabase
      .from('cards')
      .insert([{ text_english: textEnglish, text_translation: textTranslation }]);

    if (error) {
      console.error('Lỗi khi lưu:', error.message);
    } else {
      console.log('Đã lưu thành công:', data);
    }

    setTextEnglish(" ");
    setTextTranslation(" ");
  }

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*');

      if (error) console.error('Lỗi:', error);
      else setCards(data);
    };

    fetchCards();
  }, []);

  return (
    <section className="home">
      <div className="wrapper">
        <div className="form">
          <TextInputEglish handleChangeTextEngField={onChangeTextEnglish} />
          <TextInputTranslation handleChangeTextTranslation={onChangeTextTranslation} />
          <ButtonText handleSubmit={onSubmit} />
        </div>
        <h3>Danh sách</h3>
        <div className="listCard">
          {cards.map((card) => (
            <div
              className="flip-card"
              key={card.card_id}
              onMouseEnter={() => setIsHoverCard(card.card_id)}
              onMouseLeave={() => setIsHoverCard(null)}
            >
              <CardItem data={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default App;
