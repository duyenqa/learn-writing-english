import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { toast } from 'react-toastify';

const CardItem = ({ data, removeItem }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteAndClose = () => {
        removeItem(data.card_id);
        setOpenModal(false);
        toast("Xóa dữ liệu thành công!");
    };

    return (
        <>
            <div className="cardItem">
                <div className="btn-delete" onClick={() => setOpenModal(true)}>
                    <DeleteOutlinedIcon sx={{fontSize: '32px'}}/>
                </div>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <Typography 
                            variant="body1" 
                            gutterBottom
                            sx={{whiteSpace: 'wrap', padding:'1rem'}}
                        >
                            {data.text_english}
                        </Typography>
                    </div>
                    <div className="flip-card-back">
                        <Typography 
                            variant="body1" 
                            gutterBottom
                            sx={{whiteSpace: 'wrap', padding:'1rem'}}
                        >
                            {data.text_translation}
                        </Typography>
                    </div>
                </div>
            </div>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
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
                    <Button autoFocus onClick={() => setOpenModal(false)}>
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