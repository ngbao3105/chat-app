const moment = require('moment');

const formatData = (data) =>{
    return {
     ...data,
      time: moment(data.createdAt).format('hh:mm')
    }
  }

module.exports = {
  formatData
}