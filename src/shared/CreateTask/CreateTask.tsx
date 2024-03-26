import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import useAxios from "../hooks/axios";
import {useParams} from "react-router-dom";
import {useDataContext} from "../../app/providers/ContextProvider/DataContext";


const CreateTask = () => {
    const {id_chat} = useParams()


    type TaskData = {
        day_of_week: string;
        time: string;
        task: string;
        task_name: string;
        chat_id: number
    };
    const [taskData, setTaskData] = useState<TaskData>({
        day_of_week: 'Ежедневно',
        time: '00:00',
        task: 'Задача',
        task_name: 'Название задачи',
        chat_id: 0
    });


    const [isOpenModal, setIsOpenModal] = useState(false)
    const {data, error, loading, executeRequest} = useAxios<any>();
    const {dataSort, setDataSort} = useDataContext()

    useEffect(() => {
        if (data && data.length > 0) {
            setDataSort(data);
        }


    }, [data]);

    const handleOpen = () => {
        setIsOpenModal(true)
    }

    const handleClose = () => {
        setIsOpenModal(false)
        executeRequest('post', `https://senderbot.tw1.ru/app/create_task/`, taskData)


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

    useEffect(() => {
        if (id_chat) {
            setTaskData({...taskData, chat_id: parseInt(id_chat, 10)});
        }

    }, [id_chat]);

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskData({...taskData, task_name: e.target.value as string});
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
                        width: "90%",
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
                                label="Время по Мск"
                                onChange={handleTimeChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl
                        fullWidth
                        sx={{marginTop: '10px'}}
                    >
                        <InputLabel id="demo-simple-select-label">Выберите день недели</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handleDayOfWeekChange}
                            defaultValue={"Ежедневно"}

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
                    <Button sx={{marginTop: "10px"}} onClick={handleClose} variant="contained">Отправить</Button>
                </Box>
            </Modal>

        </div>
    );
};

export default CreateTask;