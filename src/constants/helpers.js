import moment from 'moment'

const dateAdapter = (date) => {
    return (
        <div className="d-flex">
            <div>{moment(date).format("YYYY-MM-DD")}</div>
            <div className="font-weight-bold small">{moment(date).format("HH:mm")}</div>
        </div>
    )
};
const setDateAdapter = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm","YYYY-MM-DDZHH:mm:sss")
};

export {dateAdapter, setDateAdapter};