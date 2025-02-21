import { Box, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { MdOutlineLogout } from 'react-icons/md';

const DropButton = ({ username,show }) => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: '#ffff',
                float: 'right',
                color: 'black',
                borderRadius: '5px',
                display: 'inline-block',

            }}
        >
            {show &&
                <Box
                    sx={{
                        fontSize: '18px',
                        alignItems: 'center',
                        fontFamily: 'Georgia, serif',
                        color: 'black',
                        padding: ' 8px !important'
                    }}
                >
                    <p style={{ marginBottom: '2%', display: 'flex', alignItems: 'center' }}>
                        <IconButton><PersonSharpIcon sx={{ fontSize: 18, color: '#001f4d' }} /></IconButton>&nbsp;{username}
                    </p>
                    <p style={{ display: 'flex', margin: 'unset', alignItems: 'center' }} onClick={() => { navigate('/login'); }}>
                        <IconButton><MdOutlineLogout style={{ fontSize: 18, color: '#001f4d' }} /></IconButton>&nbsp;
                        <p style={{ margin: 'unset' }}>logout</p>
                    </p>
                </Box>
            }
        </div>
    );
};

export default DropButton;
