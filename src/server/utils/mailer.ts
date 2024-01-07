/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import path from "node:path";
import hbs from "nodemailer-express-handlebars";
import { createTransport } from "nodemailer";

const config = useRuntimeConfig();

const mailer = {
  host: config.smtp.SMTP_HOSTNAME,
  port: Number(config.smtp.SMTP_PORT),
  auth: {
    user: config.smtp.SMTP_USER,
    pass: config.smtp.SMTP_KEY,
  },
};

const transport = createTransport(mailer);

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/server/utils/html/"),
    },
    viewPath: path.resolve("./src/server/utils/html/"),
    extName: ".html",
  }),
);

export enum templates {
  recovery = "auth/recovery",
}

interface Email {
  to: string;
  from?: string;
  subject?: string;
  template?: templates;
  context?: unknown;
}

interface RecoveryEmail extends Email {
  context: {
    token: string;
  };
}

interface MailServiceContent extends Email {
  transport: typeof transport;
}

interface MailService extends MailServiceContent {}

class MailService {
  constructor(email: Email) {
    this.transport = transport;
    this.to = email.to;
    this.from = email.from;
    this.subject = email.subject;
    this.template = email.template;
    this.context = email.context;
  }

  async sendMail() {
    return await transport.sendMail(this);
  }
}

class Recovery extends MailService {
  from = "suporte@nuxa.io";
  subject = "Recuperação de senha";
  template = templates.recovery;
  constructor(email: RecoveryEmail) {
    super(email);
    this.template = templates.recovery;
  }
}

export const MailServices = {
  Default: MailService,
  Recovery,
};

/*
    const mail = new MailServices.Recovery({
      to: "gabrieltfserejo@gmail.com",
      context: {
        token: "123",
      }
    });
    const response = mail.sendMail();
*/
