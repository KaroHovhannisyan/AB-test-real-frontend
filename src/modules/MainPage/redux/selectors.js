const userSelector = (store) => store.usersStore?.users;

const newUserSelector = (store) => store.usersStore?.newUsers;

const calcResultSelector = (store) => store.usersStore?.calcResult;

const dateRangeSelector = (store) => store.usersStore?.dateRange;

export {
  userSelector,
  newUserSelector,
  calcResultSelector,
  dateRangeSelector,
};
