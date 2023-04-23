import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Box, Modal, Backdrop, CircularProgress } from '@mui/material';
import { GetApp } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Models
import Downloading from '../../models/Downloading';

export default function Home() {
  const [submissions, setSubmissions] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      const { data } = await axios.get('/api/sub/submissions');
      setSubmissions(data.sub);
    };
    fetchSubmission();
  }, []);

  const handleDownload = async () => {
    // Add logic to download data here
    try {
        setDownloading(true);
        fetch('/api/file/download', {
            method: 'GET',
          })
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const a = document.createElement('a');
              a.href = url;
              a.download = 'uploads.zip';
              document.body.appendChild(a);
              a.click();
              a.remove();
            })
            .catch(error => console.log(error));
        setDownloading(false)
    } catch(err){
        setDownloading(false)
        alert("A error occured, please try again later.")
    }
  };

  const handleRowDoubleClick = (params) => {
    // Extract data from the clicked row
    const rowData = params.row;

    // Alert the data
    alert(JSON.stringify(rowData));
  };

  let columns = [];
  let rows = [];

  if (submissions.length > 0) {
    // Extract properties from the submission objects and flatten the submission array
    const flattenedSubmissions = submissions.flatMap(submission => {
      const submissionProperties = { id: submission._id, ...submission };
      delete submissionProperties.submission;
      return submission.submission.map(item => ({ ...submissionProperties, ...item }));
    });

    // Extract column names from the flattened submissions
    const allColumnNames = flattenedSubmissions.reduce((acc, cur) => {
      Object.keys(cur).forEach(key => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, []);

    // Filter out unwanted column names
    const filteredColumnNames = allColumnNames.filter(
      columnName => columnName !== '_id' && columnName !== '__v' && columnName !== 'consultantEmail' && columnName !== 'consultantTelephone'
    );

    // Generate columns dynamically based on filtered column names
    columns = filteredColumnNames.map(columnName => ({
      field: columnName,
      headerName: columnName,
      width: 150
    }));

    // Generate rows dynamically based on the flattened submissions
    rows = flattenedSubmissions.map((submission, index) => {
      // Filter out unwanted properties from the submission object
      const filteredSubmission = Object.fromEntries(
        Object.entries(submission).filter(
          ([key, value]) => key !== '_id' && key !== '__v' && key !== 'consultantEmail' && key !== 'consultantTelephone'
        )
      );

      return {
        id: index + 1,
        ...filteredSubmission,
      };
    });
  }

  return (
    <Box padding="50px" sx={{ height: "100%", overflow: "auto" }}>
        {downloading ? (
            <Downloading open={downloading}/>
        ):""}
      <Button
        variant="contained"
        onClick={handleDownload}
        startIcon={<GetApp />}
        sx={{ mt: 2 }}
      >
        Download Uploads
      </Button>
      <Box sx={{ height: '100%', width: '100%', marginTop: 6 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowDoubleClick={handleRowDoubleClick}
          autoHeight={true}
          disableExtendRowFullWidth={true}
          components={{
            Toolbar: GridToolbar,
        }}
        />
      </Box>
    </Box>
  );
}
