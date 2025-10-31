import Badge from '@mui/material/Badge';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const BadgeNumber = ({data}) => {
 return (
   <Badge color="primary" badgeContent={data?.length} showZero>
        <BookmarkBorderOutlinedIcon style={{ fontSize: '32px' }} />
    </Badge>
 )
};

export default BadgeNumber;