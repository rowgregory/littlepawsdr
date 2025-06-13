import pug from 'pug';
import path from 'path';
import { createTransporter } from '../config/emailConfig.ts';
import fs from 'fs';

const createPugEmailClient = async () => {
  const transporter = await createTransporter();

  return {
    send: async (emailOptions: { template: string; message: { from: string; to: string; subject?: string }; locals: any }) => {
      try {
        const templateDir = path.join(path.resolve('emails'), emailOptions.template);

        // Render HTML (required)
        const htmlPath = path.join(templateDir, 'html.pug');
        const html = pug.renderFile(htmlPath, emailOptions.locals);

        // Render subject (if exists, otherwise use message.subject or default)
        let subject = emailOptions.message.subject || 'Little Paws Dachshund Rescue';
        const subjectPath = path.join(templateDir, 'subject.pug');
        if (fs.existsSync(subjectPath)) {
          subject = pug.renderFile(subjectPath, emailOptions.locals);
        }

        // Render text version (optional)
        let text: string | undefined = undefined;
        const textPath = path.join(templateDir, 'text.pug');
        if (fs.existsSync(textPath)) {
          text = pug.renderFile(textPath, emailOptions.locals);
        }

        await transporter.sendMail({
          from: emailOptions.message.from,
          to: emailOptions.message.to,
          subject: subject.trim(), // Remove any extra whitespace
          html,
          text, // Will be undefined if no text.pug exists, which is fine
        });
      } catch (error) {
        throw error;
      }
    },
  };
};

export default createPugEmailClient;
