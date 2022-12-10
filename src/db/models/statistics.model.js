const { DataTypes, Model } = require('sequelize');


class Statistic extends Model {
  static init(connection) {
    super.init({
      confirmed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recovered: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      death: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize: connection,
      timestamps: false,
      tableName: 'statistics'
    });
  }
}

module.exports = Statistic;