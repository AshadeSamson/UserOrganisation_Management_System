import { db } from "../config/db.js";
import { User } from "./user.js";
import { Organisation } from "./organisaton.js";

User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });

db.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
});

export { User, Organisation}
