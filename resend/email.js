import { resend } from "./config.js";
import { mailTemplate, welcomeEmail } from "./email-template.js";

export const sendVerMail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["allankirimi65@gmail.com"],
      subject: "Verify your email adress",
      html: mailTemplate.replace("{verificationToken}", verificationToken),
    });
  } catch (error) {
    console.log("Error sending verification error", error);
  }
};

//this is the fucntion for sending the welcome email to the user after their account is verified well

export const welcoMail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["allankirimi65@gmail.com"],
      subject: "Welcome to EduFind",
      html: welcomeEmail.replace("{name}", name),
    });
  } catch (error) {
    console.log("Error sending verification error", error);
  }
};
