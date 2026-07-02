interface Props{
    status:string;
    setStatus:(v:string)=>void;
    priority:string;
    setPriority:(v:string)=>void;
    sort:string;
    setSort:(v:string)=>void;
    order:string;
    setOrder:(v:string)=>void;
}

export default function Filters(props:Props){
    return(
        <div>
            <select
                value={props.status}
                onChange={(e)=>props.setStatus(e.target.value)}
            >
                <option value="">Все статусы</option>
                <option value="new">New</option>
                <option value="in_progress">
                    In progress
                </option>
                <option value="done">
                    Done
                </option>
            </select>
            <select
                value={props.priority}
                onChange={(e)=>props.setPriority(e.target.value)}
            >

                <option value="">
                    Все приоритеты
                </option>

                <option value="low">
                    Low
                </option>

                <option value="normal">
                    Normal
                </option>

                <option value="high">
                    High
                </option>

            </select>

            <select
                value={props.sort}
                onChange={(e)=>props.setSort(e.target.value)}
            >

                <option value="created_at">
                    По дате
                </option>

                <option value="priority">
                    По приоритету
                </option>

            </select>

            <select
                value={props.order}
                onChange={(e)=>props.setOrder(e.target.value)}
            >

                <option value="desc">
                    DESC
                </option>

                <option value="asc">
                    ASC
                </option>

            </select>
        </div>
    );
}