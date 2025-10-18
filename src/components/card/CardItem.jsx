import Typography from '@mui/material/Typography';

const CardItem = ({data}) => {
    return (
        <div className="flip-card-inner">
            <div className="flip-card-front">
                <Typography variant="h5" gutterBottom>{data.text_english}</Typography>
            </div>
            <div className="flip-card-back">
                <Typography variant="h5" gutterBottom>{data.text_translation}</Typography>
            </div>
        </div>
    );
}
export default CardItem;