import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const lowercaseAllEmails = async () => {
  try {
    console.log('Fetching all users...');

    const users = await User.find({});

    console.log(`Found ${users.length} users to process...`);

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
        console.log(
          `⚠️  Skipping duplicate: ${user.email} (would conflict with existing ${lowercasedEmail})`
        );
        errors++;
        continue;
      }

      try {
        user.email = lowercasedEmail;
        await user.save();
        processedEmails.add(lowercasedEmail);
        updated++;
        console.log(`Updated: ${user.email} -> ${lowercasedEmail}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Skipping duplicate: ${user.email} (conflicts with existing email)`);
          errors++;
        } else {
          throw error;
        }
      }
    }

    console.log('=================================');
    console.log(`✅ Successfully updated ${updated} emails`);
    console.log(`⏭️  Skipped ${skipped} emails (already lowercase)`);
    if (errors > 0) {
      console.log(`⚠️  Skipped ${errors} duplicate emails`);
    }
    console.log('=================================');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

const confirmAction = async () => {
  console.log('⚠️  WARNING: This will lowercase ALL user emails in the database');
  console.log('⚠️  Duplicate emails will be skipped');
  console.log('Starting in 3 seconds... Press Ctrl+C to cancel');

  await new Promise((resolve) => setTimeout(resolve, 3000));

  lowercaseAllEmails();
};

if (process.argv[2] === '-f') {
  // Force without confirmation
  lowercaseAllEmails();
} else {
  // Run with confirmation delay
  confirmAction();
}
