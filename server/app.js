import answerRouter from "./Routes/answerRouter.js";
import cors from "cors";
import { createAllTables } from "./controller/createAllTables.js";
import express from "express";
import pool from "./config/databaseConfig.js";
import questionRouter from "./Routes/questionRouter.js";
import userRouter from "./Routes/userRouter.js";

// const app = express();
// const port = process.env.PORT;

// // ✅ Middlewares
// const corsOptions = {
//   origin: "https://evangadiforum.berhangebre.com",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));


// // Middleware to parse JSON
// app.use(express.json());

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("Backend is live");
// })
// //API Routes
// app.use("/api/auth", userRouter);
// app.use("/api/questions", questionRouter); //changed to /api/questions for testing
// app.use("/api/answers", answerRouter);

// // ✅ Test DB Connection
// const testConnection = async () => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     console.log("✅ MySQL connected via pool!");

//     return true;
//   } catch (err) {
//     console.error("❌ MySQL error:", err); //Logging the Whole Error object for debugging
//     return false;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// // ✅ Start the server
// const startServer = async () => {
//   console.log(" Testing database connection...");
//   const isConnected = await testConnection();

//   if (!isConnected) {
//     console.error("Failed to connect to database. Exiting...");
//     process.exit(1); //Kills the app if database fails
//   }
//   if (process.env.INIT_DB === "true") {
//     try {
//       // createAllTables(); //calling this without await, might lead to race conditions****************************** 1.BA
//       await createAllTables();
//     } catch (err) {
//       console.error("Failed to initialize tables. Exiting...");
//       process.exit(1);
//     }
//   }

//   //Start Listening
//   const server = app.listen(port, () => {
//     console.log(`listening on ${port}`);
//   });

//   // Handle server startup errors
//   server.on("error", (err) => {
//     console.error("Server startup error:", err.message);
//     process.exit(1);
//   });
// };

// // Start everything
// startServer();

// import answerRouter from "./Routes/answerRouter.js";
// import cors from "cors";
// import { createAllTables } from "./controller/createAllTables.js";
// import express from "express";
// import pool from "./config/databaseConfig.js";
// import questionRouter from "./Routes/questionRouter.js";
// import userRouter from "./Routes/userRouter.js";

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: "https://evangadiforum.berhangebre.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// ✅ Middlewares
app.use(cors());


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("✅ Backend is live!");
});

//API Routes
app.use("/api/auth", userRouter);
app.use("/api/questions", questionRouter); //changed to /api/questions for testing
app.use("/api/answers", answerRouter);

// ✅ Test DB Connection
const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("✅ MySQL connected via pool!");

    return true;
  } catch (err) {
    console.error("❌ MySQL error:", err); //Logging the Whole Error object for debugging
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// ✅ Start the server
const startServer = async () => {
  console.log(" Testing database connection...");
  const isConnected = await testConnection();

  if (!isConnected) {
    console.error("Failed to connect to database. Exiting...");
    process.exit(1); //Kills the app if database fails
  }
  if (process.env.INIT_DB === "true") {
    try {
      // createAllTables(); //calling this without await, might lead to race conditions****************************** 1.BA
      await createAllTables();
    } catch (err) {
      console.error("Failed to initialize tables. Exiting...");
      process.exit(1);
    }
  }

  //Start Listening
  const server = app.listen(port, () => {
    console.log(`listening on ${ port }`);
  });

  // Handle server startup errors
  server.on("error", (err) => {
    console.error("Server startup error:", err.message);
    process.exit(1);
  });
};

// Start everything
startServer();