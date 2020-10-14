data(state)
switch (event.target.value) {
    case "currencies":
      return setMinMaxData(75, 95, dataType.currencies);
    case "stock":
      return setMinMaxData(54, 74, dataType.stock);
    case "realestate":
      return setMinMaxData(26, 54, dataType.realestate);
    case "commodities":
      return setMinMaxData(5, 30, dataType.commodities);
    default:
      return null;