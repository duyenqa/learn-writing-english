import { useState } from 'react';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const CardItem = ({ data, removeItem }) => {
    const [isHoverCard, setIsHoverCard] = useState(null);

    return (
        <div className="cardItem">
            <div className="btn-delete" onClick={() => removeItem(data.card_id)}>
                <DeleteIcon style={{ fontSize: '32px' }} />
            </div>
            <div
                className={`flip-card-inner ${isHoverCard ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHoverCard(data.card_id)}
                onMouseLeave={() => setIsHoverCard(null)}
            >
                <div className="flip-card-front">
                    <Typography variant="h5" gutterBottom>{data.text_english}</Typography>
                </div>
                <div className="flip-card-back">
                    <Typography variant="h5" gutterBottom>{data.text_translation}</Typography>
                </div>
            </div>
        </div>
    );
}
export default CardItem;