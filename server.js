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
  analyticsRequests.push({
    userAgent: req.headers['user-agent'],
    query: req._parsedOriginalUrl.query
  });
  return res.send('ok');
 });

const sendAnalyticsRequest = ({ query, userAgent }) => {
  return axios.post(
    'https://www.google-analytics.com/debug/collect',
    query,
    { headers: { 'user-agent': userAgent }}
  )
  .then(({ data }) => console.log(data))
  .catch(error => console.log(error));
} 

const postAnalytics = () => {
  analyticsRequests.forEach((reqData) => {
    analyticsRequestsQueue.then(() => {
      sendAnalyticsRequest(reqData)
    })
  })

  analyticsRequests = []; 
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