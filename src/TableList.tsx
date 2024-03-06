import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";


interface Data {
    date: string;
    time: string;
    nameTask: string;
    task: string;
}

function createData(
    date: string,
    time: string,
    nameTask: string,
    task: string,
): Data {
    return {date, time, nameTask, task};
}

const rows = [
    createData('Понедельник', '15 00', "Отчет", "Отправить отчет по продажам"),
    createData('Вторник', '15 00', "Отчет", "Отправить отчет по продажам"),
    createData('Среда', '15 00', "Отчет", "Отправить отчет по продажам"),
    createData('Четверг', '15 00', "Отчет", "Отправить отчет по продажам"),
    createData('Пятница', '15 00', "Отчет", "Отправить отчет по продажам"),
    createData('Ежедневно', '15 00', "Отчет", "Отправить отчет по продажам"),
];


export default function BasicTable() {
    const [selectRow, setSelectRow] = useState<Data>()
    const [openModal, setOpenModal] = useState(false)
    const handleRowClick = (row: any) => {
        setSelectRow(row)
        console.log(row)
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false)
    }


    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>День</TableCell>
                            <TableCell align="left">Время</TableCell>
                            <TableCell align="left">Имя задачи</TableCell>
                            {/*<TableCell align="right">Действие</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.task}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => handleRowClick(row)}
                            >
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.time}</TableCell>
                                <TableCell align="left">{row.nameTask}</TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '2px solid #ffffff',
                        borderRadius: '5px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectRow && selectRow?.date}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectRow && selectRow?.time}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectRow && selectRow?.nameTask}
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                    >
                        {selectRow && selectRow?.task}
                    </Typography>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <Button sx={{margin: "5px"}} variant="contained">Удалить</Button>
                        <Button sx={{margin: "5px"}} variant="contained">Изменить</Button>
                    </div>


                </Box>
            </Modal>


        </div>
    );
}