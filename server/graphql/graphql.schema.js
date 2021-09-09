'use strict';

const { buildSchema } = require('graphql');
const { STAFF_TYPES } = require('./staff/staff.types');
const { STAFF_QUERY } = require('./staff/staff.query');
const { staffPlural, staffSingular, staffRolePlural, staffCreadtedByPlural, staffTotal} = require('./staff/staff.resolver');
const { CUSTOMER_TYPES } = require('./customer/customer.types');
const { CUSTOMER_QUERY } = require('./customer/customer.query');
const { customerPlural, customerSingular, customerCategoryPlural, customerCreadtedByPlural, customerTotal } = require('./customer/customer.resolver');
const { PRODUCT_TYPES } = require('./product/product.types');
const { PRODUCT_QUERY } = require('./product/product.query');
const { productPlural, productSingular, productCategoryPlural, productCreadtedByPlural, productTotal } = require('./product/product.resolver');
const { MATERIAL_TYPES } = require('./material/material.types');
const { MATERIAL_QUERY } = require('./material/material.query');
const { materialPlural, materialSingular, materialCategoryPlural, materialCreadtedByPlural, materialTotal } = require('./material/material.resolver');
const { ORDER_TYPES } = require('./order/order.types');
const { ORDER_QUERY } = require('./order/order.query');
const { orderPlural, orderSingular, orderCategoryPlural, orderCreadtedByPlural, orderStatusPlural, orderApproverPlural, orderAssignedToPlural, orderCustomerPlural, orderTotal, orderProductPlural } = require('./order/order.resolver');
const { NOTIFICATION_TYPES } = require('./notification/notification.types');
const { NOTIFICATION_QUERY } = require('./notification/notification.query');
const { notificationPlural, notificationSingular, notificationCategoryPlural, notificationStatusPlural, notificationTotal } = require('./notification/notification.resolver');

const schema = buildSchema(`
    ${STAFF_TYPES}

    ${CUSTOMER_TYPES}

    ${PRODUCT_TYPES}

    ${MATERIAL_TYPES}

    ${ORDER_TYPES}

    ${NOTIFICATION_TYPES}

    type Query { 
        ${STAFF_QUERY}

        ${CUSTOMER_QUERY}

        ${PRODUCT_QUERY}

        ${MATERIAL_QUERY}

        ${ORDER_QUERY}

        ${NOTIFICATION_QUERY}
    }
`);

const root = {
    //#region Staff
    staffPlural: async (args) => {
        const result = await staffPlural(args);
        return result;
    },
    staffTotal: async () => {
        const result = await staffTotal();
        return result;
    },
    staffSingular: async ({ _id }) => {
        const result = await staffSingular({ _id: _id });
        return result;
    },
    staffRolePlural: async () => {
        const result = await staffRolePlural();
        return result;
    },
    staffCreadtedByPlural: async () => {
        const result = await staffCreadtedByPlural();
        return result;
    },
    //#endregion
    //#region Customer
    customerPlural: async (args) => {
        const result = await customerPlural(args);
        return result;
    },
    customerTotal: async () => {
        const result = await customerTotal();
        return result;
    },
    customerSingular: async ({ _id }) => {
        const result = await customerSingular({ _id: _id });
        return result;
    },
    customerCategoryPlural: async () => {
        const result = await customerCategoryPlural();
        return result;
    },
    customerCreadtedByPlural: async () => {
        const result = await customerCreadtedByPlural();
        return result;
    },
    //#endregion
    //#region Product
    productPlural: async (args) => {
        const result = await productPlural(args);
        return result;
    },
    productTotal: async () => {
        const result = await productTotal();
        return result;
    },
    productSingular: async ({ _id }) => {
        const result = await productSingular({ _id: _id });
        return result;
    },
    productCategoryPlural: async () => {
        const result = await productCategoryPlural();
        return result;
    },
    productCreadtedByPlural: async () => {
        const result = await productCreadtedByPlural();
        return result;
    },
    //#endregion
    //#region Material
    materialPlural: async (args) => {
        const result = await materialPlural(args);
        return result;
    },
    materialTotal: async () => {
        const result = await materialTotal();
        return result;
    },
    materialSingular: async ({ _id }) => {
        const result = await materialSingular({ _id: _id });
        return result;
    },
    materialCategoryPlural: async () => {
        const result = await materialCategoryPlural();
        return result;
    },
    materialCreadtedByPlural: async () => {
        const result = await materialCreadtedByPlural();
        return result;
    },
    //#endregion
    //#region Order
    orderPlural: async (args) => {
        const result = await orderPlural(args);
        return result;
    },
    orderTotal: async () => {
        const result = await orderTotal();
        return result;
    },
    orderSingular: async ({ _id }) => {
        const result = await orderSingular({ _id: _id });
        return result;
    },
    orderCategoryPlural: async () => {
        const result = await orderCategoryPlural();
        return result;
    },
    orderCreadtedByPlural: async () => {
        const result = await orderCreadtedByPlural();
        return result;
    },
    orderApproverPlural: async () => {
        const result = await orderApproverPlural();
        return result;
    },
    orderCustomerPlural: async () => {
        const result = await orderCustomerPlural();
        return result;
    },
    orderProductPlural: async () => {
        const result = await orderProductPlural();
        return result;
    },
    orderAssignedToPlural: async () => {
        const result = await orderAssignedToPlural();
        return result;
    },
    orderStatusPlural: async () => {
        const result = await orderStatusPlural();
        return result;
    },
    //#endregion
    //#region Notification
    notificationPlural: async (args) => {
        const result = await notificationPlural(args);
        return result;
    },
    notificationTotal: async () => {
        const result = await notificationTotal();
        return result;
    },
    notificationSingular: async ({ _id }) => {
        const result = await notificationSingular({ _id: _id });
        return result;
    },
    notificationCategoryPlural: async () => {
        const result = await notificationCategoryPlural();
        return result;
    },
    notificationStatusPlural: async () => {
        const result = await notificationStatusPlural();
        return result;
    }
    //#endregion
};

module.exports = {
    root,
    schema
}
