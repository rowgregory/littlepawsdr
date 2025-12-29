import Error from '../../models/errorModel.js';
import createPugEmailClient from '../emailClients.js';

async function handleInstantDeliveries(items) {
  try {
    const instantItems = items.filter(
      (item) => item.itemType === 'ecard' && item.sendNow === 'send-now'
    );

    if (instantItems.length === 0) {
      return;
    }

    const pugEmail = await createPugEmailClient();

    await Promise.all(
      instantItems.map(async (item) => {
        try {
          if (item.itemType === 'ecard') {
            await pugEmail.send({
              template: 'ecard',
              message: {
                to: item.recipientsEmail,
              },
              locals: {
                name: item.recipientsFullName,
                message: item.message,
                image: item.itemImage,
              },
            });
          }
        } catch (err) {
          await Error.create({
            functionName: 'SEND_INSTANT_ECARD',
            detail: `Failed to send ecard to ${ecard.recipientsEmail}`,
            state: 'sending_instant_ecard',
            status: 500,
            name: err.name,
            message: err.message,
          });
        }
      })
    );
  } catch (err) {
    await Error.create({
      functionName: 'HANDLE_INSTANT_DELIVERIES',
      detail: 'Failed to process instant ecard deliveries',
      state: 'handling_instant_deliveries',
      status: 500,
      name: err.name,
      message: err.message,
    });
  }
}

export default handleInstantDeliveries;
