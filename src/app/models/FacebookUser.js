import Sequelize, { Model } from 'sequelize';

class FacebookUser extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        user_id: Sequelize.BIGINT,
      },
      { sequelize }
    );

    return this;
  }
}

export default FacebookUser;
