// server/src/models/index.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

// Initialize models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define associations
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { as: 'assignedUser', foreignKey: 'assignedUserId' });

export { sequelize, User, Ticket };




// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';
// import { UserFactory } from './user.js';
// import { TicketFactory } from './ticket.js';

// const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: process.env.NODE_ENV === 'production' ? {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   } : {}
// });

// const User = UserFactory(sequelize);
// const Ticket = TicketFactory(sequelize);

// User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
// Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

// export { sequelize, User, Ticket };




// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';
// import { UserFactory } from './user.js';
// import { TicketFactory } from './ticket.js';

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'postgres',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

// const User = UserFactory(sequelize);
// const Ticket = TicketFactory(sequelize);

// User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
// Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

// export { sequelize, User, Ticket };
