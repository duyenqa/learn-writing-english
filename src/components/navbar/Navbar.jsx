import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/MessageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { session, signOut } = useAuth();
    const { toast } = useNotification();
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            await signOut();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            await signOut().then(() => navigate("/"));
            toast.warning("Hết thời gian đăng nhập hệ thống");
        }, 60 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [navigate])

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
                <MenuItem 
                    onClick={() => navigate("/home")}
                    selected={location.pathname == "/home"}
                    sx={{
                        "&.Mui-selected": {
                            borderRight: "2px solid #1976d2",
                        },
                        "&.Mui-selected .MuiListItemText-primary": {
                        color: "#1979d1", 
                        },
                        "&.Mui-selected .MuiListItemIcon-root": {
                            color: "#1979d1",
                        }
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Trang chủ" />
                </MenuItem>
                <MenuItem 
                    onClick={() => navigate("/notes")}
                    selected={location.pathname == "/notes"}
                    sx={{
                        "&.Mui-selected": {
                            borderRight: "2px solid #1976d2",
                        },
                        "&.Mui-selected .MuiListItemText-primary": {
                        color: "#1979d1", 
                        },
                        "&.Mui-selected .MuiListItemIcon-root": {
                            color: "#1979d1",
                        }
                    }}
                >
                    <ListItemIcon>
                        <EventNoteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Tài liệu & ghi chú" />
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