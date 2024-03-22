import React, {useEffect, useState} from 'react';
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
import dayjs from "dayjs";
import useAxios from "../hooks/axios";


const CreateTask = () => {

    type TaskData = {
        day_of_week: string;
        time: string;
        task: string;
        task_name: string;
        chat_id: number
    };
    const [taskData, setTaskData] = useState<TaskData>({
        day_of_week: '',
        time: '',
        task: '',
        task_name: '',
        chat_id: 0
    });


    const [isOpenModal, setIsOpenModal] = useState(false)
    const [age, setAge] = useState("")
    const {data, error, loading, executeRequest} = useAxios<any>();
    const handleOpen = () => {
        setIsOpenModal(true)
    }

    const handleClose = () => {
        setIsOpenModal(false)
        executeRequest('post', 'http://88.225.47.208:8000/app/create_task/', taskData)

    }


    const handleDayOfWeekChange = (e: SelectChangeEvent) => {
        setTaskData({...taskData, day_of_week: e.target.value as string});
    };

    const handleTimeChange = (newTime: Date | null) => {
        if (newTime) {
            const formattedTime: string = dayjs(newTime).format('HH:mm'); // Преобразование времени в формат "часы:минуты"
            setTaskData({...taskData, time: formattedTime});
        }

    };
    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskData({...taskData, task: e.target.value as string});
    };
    const handlePasteId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedChatId = parseInt(e.target.value, 10);
        setTaskData({...taskData, chat_id: parsedChatId });
    };

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskData({...taskData, task_name: e.target.value as string});
    };

    const handleCreateTask = () => {
        // Вы можете использовать taskData для создания новой задачи или проведения другой логики
    };


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
                                onChange={handleTimeChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl
                        fullWidth
                        sx={{marginTop: '10px'}}
                    >
                        <InputLabel  id="demo-simple-select-label">Выберите день недели</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleDayOfWeekChange}

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
                    <TextField sx={{marginTop: '10px'}}
                               fullWidth id="standard-basic"
                               label="Введите имя задачи"
                               variant="outlined"
                               onChange={handleTaskNameChange}
                    />
                    <TextField sx={{marginTop: '10px'}}
                               fullWidth id="standard-basic"
                               label="Введите задачу"
                               variant="outlined"
                               onChange={handleTaskChange}
                    />
                    <TextField sx={{marginTop: '10px'}}
                               fullWidth id="standard-basic"
                               label="Вставьтье скопированный чат ID"
                               variant="outlined"
                               onChange={handlePasteId}
                    />

                    <Button sx={{marginTop: "10px"}} onClick={handleClose} variant="contained">Отправить</Button>


                </Box>
            </Modal>

        </div>
    );
};

export default CreateTask;