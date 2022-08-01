"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, total, products, items, city, token } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(total * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      total: stripeAmount,
      currency: "pkr",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      total: stripeAmount,
      address,
      products,
      city,
      items,
    });

    return order;
  },
};

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order");
