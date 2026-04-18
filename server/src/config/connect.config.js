const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('smartops', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Thiết lập kết nối tới Database thành công.');
    } catch (error) {
        console.error('Không thể kết nối tới Database :', error);
    }
}

module.exports = {
    connect
}