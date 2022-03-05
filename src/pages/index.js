console.log('start here');
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../utils'
dayjs.extend(relativeTime);

const pElem = document.createElement('h1');
const hElem = document.createElement('h2');

pElem.innerText = dayjs().fromNow();
hElem.innerText = dayjs().fromNow();

document.body.appendChild(pElem);
document.body.appendChild(hElem);
// document.body.appendChild(pElem);




