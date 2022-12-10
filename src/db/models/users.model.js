const { DataTypes, Model } = require('sequelize');

const bcrypt = require('bcrypt');

class User extends Model {
  static init(connection) {
    super.init({
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
      {
        sequelize: connection,
        tableName: 'users',
        hooks: {
          beforeCreate(user) {
            return (
              bcrypt.hash(
                user.password,
                parseInt(process.env.SALT_AMOUNT, 10),
              ).then((hashedPassword) => {
                user.password = hashedPassword;
              })
            );
          },
        },
      }
    );
  }
}


module.exports = User;