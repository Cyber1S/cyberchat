const formatArray = params => {
  if (params.length <= 0) {
    params = [];
  } else if (params.every(elem => typeof elem === 'string')) {
    params = [...params];
  } else {
    params = params.map(val => val.id);
  }
  return params;
};

const generatePayload = data => {
  const actions = JSON.parse(JSON.stringify(data));
  let payload = actions.map(item => {
    if (Array.isArray(item.action_params)) {
      item.action_params = formatArray(item.action_params);
    } else if (typeof item.values === 'object') {
      item.action_params = [item.action_params.id];
    } else if (!item.action_params) {
      item.action_params = [];
    } else {
      item.action_params = [item.action_params];
    }
    return item;
  });
  return payload;
};

export default generatePayload;
