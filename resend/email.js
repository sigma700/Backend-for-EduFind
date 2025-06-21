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

//fucntion for sending the email to the user to allow them to reset  their email after they had forgotten

export const sendResEmail = async (email, resetUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["allankirimi65@gmail.com"],
      subject: "Reset your password",
      html: `Click <a href="${resetUrl}">Here </a> to reset your password`,
    });
  } catch (error) {
    console.log("Error sending verification error", error);
  }
};

export const sendResetSuccess = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["allankirimi65@gmail.com"],
      subject: "Password Reset Successfully :)",
      html: `Your password was successfully reset now you can go back and continue browsing through our website`,
    });
  } catch (error) {
    console.log("Error sending verification error", error);
  }
};
