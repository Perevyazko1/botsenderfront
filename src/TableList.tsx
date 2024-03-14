import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import useAxios from "./axios";


interface Data {
    id: number;
    day_of_week: string;
    time: string;
    task_name: string;
    task: string;
}


export default function BasicTable() {
    const [selectRow, setSelectRow] = useState<Data>()
    const [openModal, setOpenModal] = useState(false)
    const {data, error, loading, executeRequest} = useAxios<any>();
    const [telegramData, setTelegramData] = useState<any>()


    useEffect(() => {
        executeRequest("GET", 'http://88.225.47.208:8000/app/get_task/')
    }, []);
    const handleRowClick = (row: any) => {
        setSelectRow(row)
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false)
    }
    const handleDeleteTask = (id: number) => {
        executeRequest("POST", `http://88.225.47.208:8000/app/delete_task/${id}/`)
    }
    const app = (window as any).Telegram?.WebApp;

    useEffect(() => {
        setTelegramData(app.initDataUnsafe)

    }, [app]);


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
                        {data && data.map((row: Data) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => handleRowClick(row)}
                            >
                                <TableCell align="left">{row.day_of_week}</TableCell>
                                <TableCell align="left">{row.time}</TableCell>
                                <TableCell align="left">{row.task_name}</TableCell>
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
                        {selectRow && selectRow?.day_of_week}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectRow && selectRow?.time}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectRow && selectRow?.task_name}
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{wordWrap: 'break-word', overflowWrap: 'break-word'}}
                    >
                        {selectRow && selectRow?.task}
                    </Typography>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <Button
                            onClick={() => {
                                selectRow && handleDeleteTask(selectRow?.id)
                            }}
                            sx={{margin: "5px"}}
                            variant="contained"
                        >Удалить</Button>
                        {/*<Button sx={{margin: "5px"}} variant="contained">Изменить</Button>*/}
                    </div>


                </Box>
            </Modal>

        </div>
    );
}