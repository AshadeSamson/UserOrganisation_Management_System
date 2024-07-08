import { db } from "../config/db.js";
import { User } from "./user.js";
import { Organisation } from "./organisaton.js";

User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });

db.sync()
  .then(() => {
    console.log('Database & tables synced successfully');
});

export { User, Organisation}
