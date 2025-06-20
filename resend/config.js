// import (resend) from 'resend'
import { Resend } from "resend";

import "dotenv/config";

// console.log(process.env.RESEND_KEY);

export const resend = new Resend(process.env.RESEND_KEY);
