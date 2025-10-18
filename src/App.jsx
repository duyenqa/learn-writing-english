import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ButtonText from './components/button/ButtonText'
import TextInputEglish from './components/input/TextInputEnglish'
import TextInputTranslation from './components/input/TextInputTranslation';
import { supabase } from './supabaseClient';

function App() {
  const [textEnglish, setTextEnglish] = useState(" ");
  const [textTranslation, setTextTranslation] = useState(" ");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  function onChangeTextEnglish(text){
    setTextEnglish(text);
    // console.log(textEnglish);
  }

  function onChangeTextTranslation(text){
    setTextTranslation(text);
    // console.log(textTranslation);
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

  return (
    <section className="home">
      <div className="wrapper">
        <div className="form">
          <TextInputEglish handleChangeTextEngField = {onChangeTextEnglish}/>
          <TextInputTranslation handleChangeTextTranslation = {onChangeTextTranslation} />
          <ButtonText handleSubmit={onSubmit} />
        </div>
        <ul className="listCard">

        </ul>
      </div>
    </section>
  )
}

export default App
