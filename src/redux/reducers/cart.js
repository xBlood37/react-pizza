const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

// const _get = (obj, path) => {
//   const [firstKey, ...keys] = path.split('.');
//   return keys.reduce((val, key) => {
//     return val[key];
//   }, obj[firstKey]);
// };

// const getTotalSum = (obj, path) => {
//   return Object.values(obj).reduce((sum, obj) => {
//     const value = _get(obj, path);
//     return sum + value;
//   }, 0);
// };

const totalSumItem = (obj, param1, param2) => {
  if (param1 !== null) {
    return Object.keys(obj).reduce(
      (sum, key) => obj[key][param1].length + sum,
      0
    );
  } else {
    return Object.keys(obj).reduce((sum, key) => obj[key][param2] + sum, 0);
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      // const totalCount = Object.keys(newItems).reduce(
      //   (sum, key) => newItems[key].items.length + sum,
      //   0
      // );
      // const totalPrice = Object.keys(newItems).reduce(
      //   (sum, key) => newItems[key].totalPrice + sum,
      //   0
      // );

      // const totalCount = getTotalSum(newItems, 'items,lenght');
      // const totalPrice = getTotalSum(newItems, 'totalPrice');

      const totalCount = totalSumItem(newItems, ['items']);
      const totalPrice = totalSumItem(newItems, null, ['totalPrice']);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM': //удалить пиццу
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };

    // case 'PLUS_CART_ITEM': {
    //   const newObjItems = [
    //     ...state.items[action.payload].items,
    //     state.items[action.payload].items[0],
    //   ];
    //   const newItems = {
    //     ...state.items,
    //     [action.payload]: {
    //       items: newObjItems,
    //       totalPrice: getTotalPrice(newObjItems),
    //     },
    //   };

    //   const totalCount = totalSumItem(newItems, 'items.length');
    //   const totalPrice = totalSumItem(newItems, 'totalPrice');

    //   return {
    //     ...state,
    //     items: newItems,
    //     totalCount,
    //     totalPrice,
    //   };
    // }

    // case 'MINUS_CART_ITEM': {
    //   const oldItems = state.items[action.payload].items;
    //   const newObjItems =
    //     oldItems.length > 1
    //       ? state.items[action.payload].items.slice(1)
    //       : oldItems;
    //   const newItems = {
    //     ...state.items,
    //     [action.payload]: {
    //       items: newObjItems,
    //       totalPrice: getTotalPrice(newObjItems),
    //     },
    //   };

    //   const totalCount = totalSumItem(newItems, 'items.length');
    //   const totalPrice = totalSumItem(newItems, 'totalPrice');

    //   return {
    //     ...state,
    //     items: newItems,
    //     totalCount,
    //     totalPrice,
    //   };
    // }

    case 'CLEAR_CART':
      return { totalPrice: 0, totalCount: 0, items: {} };

    default:
      return state;
  }
};

export default cart;
