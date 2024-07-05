// models/User.js

module.exports = (sequelize:any,DataTypes:any) => {
  const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
              allowNull: false,
              type: DataTypes.STRING
            },
            lastName: {
              allowNull: false,
              type: DataTypes.STRING
            },
            accessToken: {
              type: DataTypes.STRING
            },
            phone: {
              type: DataTypes.STRING
            },
            password: {
              allowNull: false,
              type: DataTypes.STRING,
              validate: {
                notEmpty: true,
                len: [ 6, 100 ]
              }
            },
            email: {
              allowNull: false,
              type: DataTypes.STRING,
              unique:true
            },        
            userName: {
              allowNull: false,
              type: DataTypes.STRING,
              unique:true
            },
        },
        {
            timestamps: true,
        }
    );
    User.associate = (models:any) => {
      User.hasMany(models.ToDo);
  };

    return User;
};
