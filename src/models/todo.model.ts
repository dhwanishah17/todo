// models/ToDo.js

module.exports = (sequelize:any,DataTypes:any) => {
    const ToDo = sequelize.define(
        'ToDo',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id'
          }

          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          dueDate: {
            type: DataTypes.DATE,
            allowNull: false
          },
          completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          reminderTime: {
            type: DataTypes.DATE,
            allowNull: true,
          },
        },
        {
            timestamps: true,
        }
      );
      ToDo.associate = (models:any) => {
        ToDo.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return ToDo;
};
