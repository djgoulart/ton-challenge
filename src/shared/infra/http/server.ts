import { app } from "./app";

app.listen(3333, () => console.log(`Node Server: - ${process.env.NODE_ENV}`));
