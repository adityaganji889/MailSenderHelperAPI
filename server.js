const express = require("express")
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: "./config/.env"
});
const db = require("./config/db");
const port = process.env.PORT || 5000
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoute = require("./routes/userRoutes");
const appRoute = require("./routes/appRoutes");

app.use(cors());
app.use(express.json({
    limit: "50mb",
}));
app.use(express.urlencoded({ extended: true }))

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mail Sender Helper API",
      description:
        "A REST API built with Express and MongoDB. This API provides registers apps having issue with SMTP while hosted on render and sends mail on it's behalf.",
    },
    // components: {
    //     securitySchemes: {
    //       bearerAuth: {
    //         type: "http",
    //         scheme: "bearer",
    //       },
    //     },
    //   },
    //   security: [
    //     {
    //       bearerAuth: [],
    //     },
    //   ],
      servers: [
        {
          url: "http://localhost:5000/",
          description: "Localhost development server"
        },
        {
          url: "https://mail-sender-helper-api.vercel.app",
          description: "Remote deployment on vercel.app"
        }
      ],
  },
  apis: ["./routes/*.js"],
};


app.use("/api/users",userRoute);
app.use("/api/apps",appRoute);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//For hosting Swagger on vercel changes starts
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerDocs);
});

app.get("/", (req, res) => {
  // res.json(swaggerDocs);
  res.setHeader("Content-Type", "text/html");
  res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Swagger</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: window.location.origin + '/api-docs.json',
        dom_id: '#swagger-ui'
      });
    };
  </script>
</body>
</html>
  `);
});
//For hosting Swagger on vercel changes ends

// Serve UI
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(null, {
//     swaggerOptions: {
//       url: "/api-docs.json",
//     },
//   })
// );

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})

module.exports = app;