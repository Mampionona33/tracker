import request from './request';

export function getUserToken(clientId) {
  return request(
    `https://accounts.google.com/gsi/button?type=standard&theme=outline&size=large&text=undefined&shape=undefined&logo_alignment=undefined&width=undefined&locale=undefined&client_id=${clientId}&iframe_id=gsi_264819_614367&as=/QB+VWVDNka+FHxdHx8NYA`
  ).then((user) => user.token);
}
