import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { order } from "@service";
import { Service } from "@modal";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const deleteItem = async id => {
    try {
      const response = await order.delete(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editItem = item => {
    setEdit(item);
    setOpen(true);
  };
  return (
    <>
      <Service item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Client Name</StyledTableCell>
              <StyledTableCell align="center">Client phone </StyledTableCell>
              <StyledTableCell align="center">Service name </StyledTableCell>
              <StyledTableCell align="center">Service price </StyledTableCell>
              <StyledTableCell align="center">Amount </StyledTableCell>
              <StyledTableCell align="center">Status </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_price}
                </StyledTableCell>
                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => editItem(item)}>
                    <EditOutlinedIcon />
                  </Button>
                  <Button onClick={() => deleteItem(item.id)} color="error">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
