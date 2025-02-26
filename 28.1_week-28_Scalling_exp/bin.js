import cluster from "cluster";
import os from "os";
import { app } from "./index.js";

const totalCPUs = os.cpus().length;
const port = 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Number of CPU's is ${totalCPUs}`);

  // fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
