import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const lowercaseEmails = async () => {
  try {
    console.log('Fetching all users...'.yellow);

    const users = await User.find({});

    console.log(`Found ${users.length} users to process...`.cyan);

    let updated = 0;
    let skipped = 0;
    let errors = 0;
    const processedEmails = new Set();

    for (const user of users) {
      const lowercasedEmail = user.email.toLowerCase();

      // Skip if already lowercase
      if (user.email === lowercasedEmail) {
        skipped++;
        processedEmails.add(lowercasedEmail);
        continue;
      }

      // Skip if this lowercase email was already processed (duplicate)
      if (processedEmails.has(lowercasedEmail)) {
        console.log(`⚠️  Skipping duplicate: ${user.email} (would conflict with existing ${lowercasedEmail})`.yellow);
        errors++;
        continue;
      }

      try {
        user.email = lowercasedEmail;
        await user.save();
        processedEmails.add(lowercasedEmail);
        updated++;
        console.log(`Updated: ${user.email} -> ${lowercasedEmail}`.white);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Skipping duplicate: ${user.email} (conflicts with existing email)`.yellow);
          errors++;
        } else {
          throw error;
        }
      }
    }

    console.log('================================='.green);
    console.log(`✅ Successfully updated ${updated} emails`.green.inverse);
    console.log(`⏭️  Skipped ${skipped} emails (already lowercase)`.gray);
    if (errors > 0) {
      console.log(`⚠️  Skipped ${errors} duplicate emails`.yellow.inverse);
    }
    console.log('================================='.green);

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const confirmAction = async () => {
  console.log('⚠️  WARNING: This will lowercase ALL user emails in the database'.yellow.inverse);
  console.log('⚠️  Duplicate emails will be skipped'.yellow);
  console.log('Starting in 3 seconds... Press Ctrl+C to cancel'.yellow);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  lowercaseEmails();
};

if (process.argv[2] === '-f') {
  // Force without confirmation
  lowercaseEmails();
} else {
  // Run with confirmation delay
  confirmAction();
}
