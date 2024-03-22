import React, {memo, ReactNode} from 'react';
import ColumnGroupingTable from "../shared/TableList/TableList";
import CreateTask from "../shared/CreateTask/CreateTask";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


export const MainPage = memo((props: MainPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props


    return (
        <div>
            <ColumnGroupingTable/>
            <CreateTask/>
        </div>
    );
});