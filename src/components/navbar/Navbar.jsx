import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { session, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            await signOut();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="navbar">
            <Chip label={session?.user?.email} />
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
            >
                <AccountCircle sx={{ fontSize: '32px' }} />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => navigate("/home")}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    Trang chủ
                </MenuItem>
                <MenuItem onClick={() => navigate("/notes")}>
                    <ListItemIcon>
                        <EventNoteIcon fontSize="small" />
                    </ListItemIcon>
                    Ghi chú
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </div>
    )
};

export default Navbar;