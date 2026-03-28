import { app } from "./app.js";
import { connectToDB } from "./config/database.js";
import { GREEN_ASCII } from "./constants.js";

connectToDB().then(() => {
  app.listen(3000, () => {
    console.log(
      GREEN_ASCII,
      `⚙️  Server is running on port http://localhost:3000 ...`,
    );
  });
});
