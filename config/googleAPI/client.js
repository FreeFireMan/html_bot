
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const {GOOGLE} = require('../config');
const postService = require('../../service/postService');


let client_secret_part = 'credentials.json';
let gSheet = 'gSheet1.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
let TOKEN_DIR = `config${path.sep}filesforSheet${path.sep}`;
let TOKEN_PATH = TOKEN_DIR + `${gSheet}`;




module.exports = {
    apiStart: ()=>{googleApi(listMajors)},
    googleSheetUpdate:() =>{googleApi(updateSheet)},

};

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function googleApi(cb) {
    fs.readFile(`config${path.sep}filesforSheet${path.sep}${client_secret_part}`, function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), cb);
    });
}

///-----------------------methods
function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE.SPREADSHEETID,
        range: GOOGLE.RANGE,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // console.log(res);
        const rows = res.data.values;
        if (rows.length) {
            // console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.forEach((row) => {
                if (row[0] === 'id') {return}
                 // console.log(row);
                postService.createPost({
                    id:row[0],
                    priority: row[1] || 99999,
                    title: row[2],
                    body: row[3],
                    image: row[4],
                })
            });
        } else {
            console.log('No data found.');
        }
    });
}

function updateSheet(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE.SPREADSHEETID,
        range: GOOGLE.RANGE,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // console.log(res);
        const rows = res.data.values;
        if (rows.length) {
            // console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.forEach((row) => {
                if (row[0] === 'id') {return}
                console.log(row);
                postService.updatePost({
                    id:row[0],
                    priority: row[1] || 99999,
                    title: row[2],
                    body: row[3],
                    image: row[4],
                }, row[0])
            });
        } else {
            console.log('No data found.');
        }
    });
}
