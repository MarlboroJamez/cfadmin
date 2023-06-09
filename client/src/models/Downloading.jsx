import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none', // removed the border
    borderRadius: 2, // added border radius
    boxShadow: 24,
    p: 4,
  };

const DownloadingModal = ({open}) => {

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography 
                color="#1E3A8A"
                fontWeight="bold"
                id="modal-modal-title">
                    Successful Submission!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please be patient, while the files are downloading...
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default DownloadingModal
