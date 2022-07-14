'use strict'

const { google } = require('googleapis');
const commonConfig = require('../commonconfig.json')


async function main (){
    
    try {
        const youtubeData = await google.youtube('v3').search.list({
            key : YT_API_KEY1,
            part : 'snippet',
            q : commonConfig.query
        })

        const { data } = youtubeData;
        data.items.forEach( (item) =>  {
            console.log(`Title : ${item.snippet.title}\nDescription ${item.snippet.description}`)
        })

    }catch(err) {
        console.log(err)
    }

}

main();