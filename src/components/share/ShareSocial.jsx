import { useState } from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon
} from "react-share";
import { Collapse, Fab, Tooltip } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

function ShareSocial() {
    const [showApps, setShowApps] = useState(false);
    const shareUrl='https://learn-writing-english.vercel.app/'
    return (
        <div className="shareApps">
            <Collapse in={showApps}>
                <div className="apps">
                    <Tooltip title="Facebook" placement="left">
                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                    </Tooltip>
                    <Tooltip title="Twitter" placement="left">
                        <TwitterShareButton url={shareUrl}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                    </Tooltip>
                    <Tooltip title="Email" placement="left">
                        <EmailShareButton url={shareUrl}>
                            <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                    </Tooltip>
                </div>
            </Collapse>
            <Fab aria-label="like" color="info" onClick={() => setShowApps(!showApps)}>
                <ShareIcon />
            </Fab>
        </div>
    )
};

export default ShareSocial;