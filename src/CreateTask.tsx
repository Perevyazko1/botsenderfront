import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Modal,
    Typography,
    Select,
    SelectChangeEvent,
    MenuItem, Input, TextField
} from "@mui/material";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';


const CreateTask = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [age, setAge] = useState("")
    const handleOpen = () => {
        setIsOpenModal(true)
    }
    const handleClose = () => {
        setIsOpenModal(false)
    }


    const handleChange = (e: SelectChangeEvent) => {
        setAge(e.target.value as string)
    }


    return (
        <div>
            <Button sx={{marginTop: "10px"}} onClick={handleOpen} variant="contained">Создать задачу</Button>
            <Modal
                open={isOpenModal}
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
                        // width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #ffffff',
                        borderRadius: '5px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Заполните поля
                    </Typography>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                    >
                        <DemoContainer
                            sx={{width: 'auto'}}
                            components={['TimePicker']}>
                            <TimePicker
                                ampm={false} // Выставляем 24-часовой формат времени
                                label="Basic time picker"
                            />
                        </DemoContainer>
                    </LocalizationProvider> <FormControl
                    fullWidth
                    sx={{marginTop: '10px'}}
                >
                    <InputLabel id="demo-simple-select-label">Выберите день недели</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Понедельник"}>Понедельник</MenuItem>
                        <MenuItem value={"Вторник"}>Вторник</MenuItem>
                        <MenuItem value={"Среда"}>Среда</MenuItem>
                        <MenuItem value={"Четверг"}>Четверг</MenuItem>
                        <MenuItem value={"Пятница"}>Пятница</MenuItem>
                        <MenuItem value={"Суббота"}>Суббота</MenuItem>
                        <MenuItem value={"Воскресенье"}>Воскресенье</MenuItem>
                        <MenuItem value={"Ежедневно"}>Ежедневно</MenuItem>
                    </Select>
                </FormControl>
                    <TextField sx={{marginTop: '10px'}} fullWidth id="standard-basic" label="Введите имя задачи"
                               variant="outlined"/>
                    <TextField sx={{marginTop: '10px'}} fullWidth id="standard-basic" label="Введите задачу"
                               variant="outlined"/>
                    <Button sx={{marginTop: "10px"}} onClick={handleClose} variant="contained">Отправить</Button>


                </Box>
            </Modal>

        </div>
    );
};

export default CreateTask;