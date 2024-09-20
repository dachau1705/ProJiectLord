// const validateOrder = (props) => {
//     const errors = [];

//     if (!props._id) {
//         errors.push('Customer ID is required');
//     }
//     if (!props.address) {
//         errors.push('Address is required');
//     }
//     if (!props.totalPrice || props.totalPrice <= 0) {
//         errors.push('Total price must be greater than 0');
//     }
//     if (!props.phoneNumber) {
//         errors.push('Phone number is required');
//     }
//     if (!props.email || !/\S+@\S+\.\S+/.test(props.email)) {
//         errors.push('A valid email is required');
//     }
//     if (!props.items || !Array.isArray(props.items) || props.items.length === 0) {
//         errors.push('At least one item is required in the order');
//     } else {
//         // Validate items individually
//         props.items.forEach((item, index) => {
//             if (!item.productId) {
//                 errors.push(`Product ID is required for item ${index + 1}`);
//             }
//             if (!item.quantity || item.quantity <= 0) {
//                 errors.push(`Quantity must be greater than 0 for item ${index + 1}`);
//             }
//             if (!item.price || item.price <= 0) {
//                 errors.push(`Price must be greater than 0 for item ${index + 1}`);
//             }
//         });
//     }

//     return errors;
// };

// module.exports = { validateOrder };
