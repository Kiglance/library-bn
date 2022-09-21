const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Card, CheckOut, Reservation, Payment }) {
      // define association here
      this.hasOne(Card, {
        as: 'card',
        foreignKey: 'member_id',
        onDelete: 'CASCADE'
      });
      this.hasMany(CheckOut, {
        as: 'check_out_members',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.hasMany(Reservation, {
        as: 'member_reservations',
        foreignKey: 'member_id',
        onDelete: 'CASCADE',
        hooks: true
      });
      this.hasMany(Payment, { as: 'payments', foreignKey: 'member_id' });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Member.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'member'
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING },
      missed_deadline: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      fine: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Member',
      tableName: 'Members'
    }
  );
  return Member;
};
