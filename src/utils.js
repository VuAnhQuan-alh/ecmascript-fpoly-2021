export const parseRequestUrl = () => {
  const url = window.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    less: (isNaN(request[2]) ? request[2] : ''),
    then: (isNaN(request[3]) ? request[3] : ''),
    id: (isNaN(request[3]) ? request[4] : request[3]),
  }
};

export const $ = selector => {
  let element = document.querySelectorAll(selector);
  return element.length == 1 ? element[0] : element;
};

export const reRender = async (component, position = "") => {
  $(position).innerHTML = position ? await component.render() : '';
  await component.afterRender();
}