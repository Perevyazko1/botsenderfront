import {createContext, useContext} from "react"


interface TaskData {
    id: number;
    day_of_week: string;
    time: string;
    task: string;
    task_name: string;
    chat_id: number;
};


export type DataContent = {
    dataSort: TaskData[]
    setDataSort: (c: TaskData[]) => void
}
export const DataContent = createContext<DataContent>({

    dataSort: [], // set a default value
    setDataSort: () => {
    },
})
export const useDataContext = () => useContext(DataContent)