import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: false
});

const models = {
  User: sequelize.import('./user'),
  Post: sequelize.import('./post'),
  PostComment: sequelize.import('./postComment')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
