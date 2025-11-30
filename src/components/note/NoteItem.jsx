import { useState } from 'react';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const NoteItem = ({ data, removeItemNote, idx, indexSlider }) => {
    const [openModal, setOpenModal] = useState(false);


    const handleDeleteAndClose = () => {
        removeItemNote(data.id);
        setOpenModal(false);
        toast.success("Xóa dữ liệu thành công!");
    };

    return (
        <>
            <div className={indexSlider == idx ? "noteItem" : "noteItem slide-hidden"}>
                <div className="btn-delete">
                    <Tooltip title="Xóa" placement="top">
                        <IconButton
                            size="small"
                            aria-label="delete"
                            onClick={() => setOpenModal(true)}
                            sx={{
                                color: '#000',
                                '&:hover': {
                                    color: '#ff6f61'
                                },
                            }}>
                            <DeleteOutlinedIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="textNote">
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ whiteSpace: 'wrap', padding: '1rem' }}
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {data.text_note}
                    </Typography>
                </div>
            </div>

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Xóa Ghi Chú
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
                    <Button
                        onClick={handleDeleteAndClose}
                        autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default NoteItem;