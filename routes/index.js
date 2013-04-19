'use strict';

var soap = require('soap')
  , url = 'http://ideone.com/api/1/service.wsdl'
  , ideoneArgs = require('../lib/ideoneConfig');

/**
 * getSubmissionDetails will tell us if the code has been processed or not.
 * We need to keep calling it until our code has been processed.
 * @param  {Object} args   Arguments to pass to getSubmissionDetails
 * @param  {Object} res    res object provided by Express so we can respond when the code's ready
 * @param  {Object} client The SOAP client
 */
var checkIfProcessed = function(args, res, client) {
  
  //Get the result of the code
  client.getSubmissionDetails(args, function(err, results) {

    //If item's ready, emit event
    if(typeof results.return.item[11].value === 'string') {
      res.end(results.return.item[11].value);
    } else {
      //Set another timeout
      setTimeout(checkIfProcessed, 500, args, res, client);
    }
  });
};

module.exports = {
  processPython: function(req, res) {
    
    //Code we're sending to ideone is the code that's posted
    ideoneArgs.create.sourceCode = req.body.code;
    if(req.body.input) {
      ideoneArgs.create.input = req.body.input;
    }
    
    //Create our WSDL client
    soap.createClient(url, function(err, client) {
      
      //Create a ideone "paste" with the code that's been sent
      client.createSubmission(ideoneArgs.create, function(err, result) {

        //Set up the second args object
        ideoneArgs.details.link = result.return.item[1].value;

        //Start the timeout procedure as described in checkIfProcessed
        //500 is a happy medium.  Feel free to play around with other numbers.
        //If you've got one that works better, send a pull request
        setTimeout(checkIfProcessed, 500, ideoneArgs.details, res, client)
      });
    });
  },
  renderHomepage: function(req, res) {
    res.render('index');
  }
};