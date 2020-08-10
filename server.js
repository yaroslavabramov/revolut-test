const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const path = require('path');
const internetAvailable = require('internet-available');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// analytics
let analyticsRequests = [];
let firebaseAnalyticsRequests = [];
const analyticsRequestsQueue = Promise.resolve()
const firebaseAnalyticsRequestsQueue = Promise.resolve()

app.get('/analytics', (req, res) => {
  analyticsRequests.push(`${req._parsedOriginalUrl.query}&ua=${req.headers['user-agent']}`);
  return res.send('ok');
 });

app.post('/analytics', (req, res) => {
firebaseAnalyticsRequests.push({
  query: `${req._parsedUrl.query}&ua=${req.headers['user-agent']}`,
  body: req.body
})
return res.send('ok');
});

const sendAnalyticsRequest = (data) => {
  return axios.post(
    'https://www.google-analytics.com/batch',
    data,
  )
  .then(({ data }) => console.log(data))
  .catch(error => console.log(error));
} 
const sendFirebaseAnalyticsRequest = (query, body) => {
  return axios.post(
    `https://www.google-analytics.com/g/collect?${query}`,
    body
  )
  .then(({ data }) => console.log(data))
  .catch(error => console.log(error));
} 

const postAnalytics = () => {
  const chunksCount = Math.ceil(analyticsRequests.length / 10);
  const chunksArray = [];

  for (let i = 0; i < chunksCount; i++) {
    const batchRequestContent = analyticsRequests.splice(0, 10).join(`\n`);
    chunksArray.push(batchRequestContent);
  }

  firebaseAnalyticsRequests.forEach(({query, body}) => {
    firebaseAnalyticsRequestsQueue.then(() => {
      sendFirebaseAnalyticsRequest(query, body);
    })
  })

  firebaseAnalyticsRequests = []

  chunksArray.forEach((reqData) => {
    analyticsRequestsQueue.then(() => {
      sendAnalyticsRequest(reqData)
    })
  })
}

setInterval(() => {
  internetAvailable().then(() => {
    console.log('connected');
    postAnalytics();
  }).catch(() => console.log('no connection'))
}, 20000);

app.get(/pocket|converter|/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Here your link: http://localhost:8080/')
