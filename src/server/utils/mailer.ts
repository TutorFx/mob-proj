import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const config = useRuntimeConfig()

const transport = nodemailer.createTransport({
  host: config.brevo.SMTP_HOSTNAME,
  port: config.brevo.SMTP_PORT,
  auth: { 
    user: config.brevo.SMTP_USER, 
    pass: config.brevo.SMTP_KEY 
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/server/utils/html/"),
    },
    viewPath: path.resolve("./src/server/utils/html/"),
    extName: ".html",
  })
);

export { transport };
