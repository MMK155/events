'use strict';

    module.exports = {
        eventsReport: async () => {
        try {
          // fetching the data
          // we dont really need contentSections for this example.
          // its kept here, just for your reference
          const entries = await strapi.entityService.findMany('api::event.event', {
            fields: ['id','title','notes'],
            populate: {
              metadata: {
                fields: ['metaTitle']
              },
              contentSections: {
                populate: '*'
              }
            }
          });

          // reducing the data to a simple array
          let entriesReduced;
          if (entries && Array.isArray(entries)) {
            entriesReduced = entries.reduce((acc, item) => {
              acc = acc || [];
              console.log(acc);
              acc.push({
                id: item.id,
                notes: item.notes,
                name: item.name || '',
                metaTitle: item.metadata?.metaTitle || ''
              });
              return acc;
            }, [])

            // returning the reduced data
            return entriesReduced;
          }
        } catch (err) {
          return err;
        }
      }
    }