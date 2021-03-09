import moment from 'moment'

const INPUT_DATE = "YYYY-MM-DDTHH:mm";
const OUTPUT_DATE = "YYYY-MM-DDTHH:mm:ss.sssZ";

const usersDataToRequest = (res) => {
    return {
        users: [{
            dateRegistered: moment(res.start).format(INPUT_DATE, OUTPUT_DATE),
            lastActivity:  moment(res.update).format(INPUT_DATE, OUTPUT_DATE)
        }]
    }
};

const allUsersDataToRequest = (res) => {
    return {
        users: res.map((item) => {
           return {
                dateRegistered: moment(item.dateRegistered).format(INPUT_DATE, OUTPUT_DATE),
                lastActivity: moment(item.lastActivity).format(INPUT_DATE, OUTPUT_DATE)
           }
         })
    }
};


export {usersDataToRequest, allUsersDataToRequest };
