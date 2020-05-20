const express = require('express');
const axios = require('axios')
const path = require('path');
const internetAvailable = require('internet-available');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// analytics
let analyticsRequests = [];
const analyticsRequestsQueue = Promise.resolve()

app.get('/analytics', (req, res) => {
  analyticsRequests.push(`${req._parsedOriginalUrl.query}&ua=${req.headers['user-agent']}`);
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

const postAnalytics = () => {
  const chunksCount = Math.ceil(analyticsRequests.length / 10);
  const chunksArray = [];

  for (let i = 0; i < chunksCount; i++) {
    const batchRequestContent = analyticsRequests.splice(0, 10).join(`\n`);
    chunksArray.push(batchRequestContent);
  }

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
