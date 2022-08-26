//import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Constants from './Constants';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

function Listings() {

  const [getArray , setArray] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const fetchData = async() => {
    try {
      const response = await Constants.GetAPI('getallproduct');
      setArray(response);   
    } catch (error) {
      console.log(error);
    }       
  }
  
  useEffect(() => {
      fetchData();
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <React.Fragment>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>
                {'Home'}
              </Button>
              <Button sx={{ color: '#fff' }}>
                {'About'}
              </Button>
              <Button sx={{ color: '#fff' }}>
                {'Contact'}
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Grid container={true} sx={{ mt: 20 }}> 
      
        <Grid item xs={4}>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ml:1}}>
              Open Modal
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending anonymous
                  location data to Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button >Disagree</Button>
                <Button autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
        </Grid>

        <Grid item xs={7}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                    <TableCell align='right' style={{minWidth:100}}> {'ID'} </TableCell>
                    <TableCell align='right' style={{minWidth:100}}> {'Name'} </TableCell>
                    <TableCell align='right' style={{minWidth:100}}> {'Price'} </TableCell>
                    <TableCell align='right' style={{minWidth:100}}> {'Brand'} </TableCell>
                    <TableCell align='right' style={{minWidth:100}}> {'Category'} </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getArray?.length && getArray.map(share => {
                  return(
                    <TableRow key={share?._id}>
                      <TableCell align='right'>{share?._id}</TableCell>
                      <TableCell align='right'>{share?.name}</TableCell>
                      <TableCell align='right'>{share?.price}</TableCell>
                      <TableCell align='right'>{share?.brand}</TableCell>
                      <TableCell align='right'>{share?.category?.name}</TableCell>
                    </TableRow>
                  )
                })}    
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5,10,25,100]}
            component="div"
            count={getArray?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Listings;
