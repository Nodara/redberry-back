const { DataTypes, Model } = require('sequelize');


class Country extends Model {
  static init(connection) {
    super.init({
      code: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    }, {
      sequelize: connection,
      timestamps: false,
      tableName: 'countries'
    });
  }
}

module.exports = Country;