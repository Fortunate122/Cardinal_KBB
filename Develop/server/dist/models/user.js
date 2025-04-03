import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

// Extend with proper typing (for TypeScript safety if needed)
export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  // Encapsulated setter to hash password
  async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 💡 Recommended
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: any) => {
          if (user.password) {
            await user.setPassword(user.password);
          }
        },
        beforeUpdate: async (user: any) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}



// import { DataTypes, Model } from 'sequelize';
// import bcrypt from 'bcrypt';
// export class User extends Model {
//     // Hash the password before saving the user
//     async setPassword(password) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(password, saltRounds);
//     }
// }
// export function UserFactory(sequelize) {
//     User.init({
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     }, {
//         tableName: 'users',
//         sequelize,
//         hooks: {
//             beforeCreate: async (user) => {
//                 await user.setPassword(user.password);
//             },
//             beforeUpdate: async (user) => {
//                 await user.setPassword(user.password);
//             },
//         }
//     });
//     return User;
// }
