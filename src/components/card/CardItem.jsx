import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

const CardItem = ({ data, removeItem }) => {
    const [isHoverCard, setIsHoverCard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        setChecked(false);
    }

    const handleDeleteAndClose = () => {
        removeItem(data.card_id);
        setOpenModal(false);
        setChecked(false);
        toast("Xóa dữ liệu thành công!");
    };

    return (
        <>
            <div className="cardItem">
                <div className="btn-delete" onClick={() => setOpenModal(true)}>
                    <Checkbox 
                        inputProps={{ 'aria-label': 'controlled' }} 
                        checked={checked}
                        onChange={(event) => setChecked(event.target.value)}
                    />
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
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Xóa từ
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc là muốn xóa không ? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseModal}>
                        Thoát
                    </Button>
                    <Button onClick={handleDeleteAndClose} autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default CardItem;