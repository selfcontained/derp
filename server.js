'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})


var HELP_TEXT = `
I will respond to the following messages:
\`help\` - to see this message.
\`hi\` - to demonstrate a conversation that tracks state.
\`thanks\` - to demonstrate a simple response.
\`<type-any-other-text>\` - to demonstrate a random emoticon response, some of the time :wink:.
\`attachment\` - to see a Slack attachment message.
`

//*********************************************
// Setup different handlers for messages
//*********************************************

// response to the user typing "help"
slapp.message('help', ['mention', 'direct_message'], (msg) => {
  msg.say(HELP_TEXT)
})

// "Conversation" flow that tracks state - kicks off when user says hi, hello or hey
slapp
  .message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
    msg
      .say(`${text}, how are you?`)
      // sends next event from user to this route, passing along state
      .route('how-are-you', { greeting: text })
  })
  .route('how-are-you', (msg, state) => {
    var text = (msg.body.event && msg.body.event.text) || ''

    // user may not have typed text as their next action, ask again and re-route
    if (!text) {
      return msg
        .say("Whoops, I'm still waiting to hear how you're doing.")
        .say('How are you?')
        .route('how-are-you', state)
    }

    // add their response to state
    state.status = text

    msg
      .say(`Ok then. What's your favorite color?`)
      .route('color', state)
  })
  .route('color', (msg, state) => {
    var text = (msg.body.event && msg.body.event.text) || ''

    // user may not have typed text as their next action, ask again and re-route
    if (!text) {
      return msg
        .say("I'm eagerly awaiting to hear your favorite color.")
        .route('color', state)
    }

    // add their response to state
    state.color = text

    msg
      .say('Thanks for sharing.')
      .say(`Here's what you've told me so far: \`\`\`${JSON.stringify(state)}\`\`\``)
    // At this point, since we don't route anywhere, the "conversation" is over
  })

// Can use a regex as well
slapp.message(/^(thanks|thank you)/i, ['mention', 'direct_message'], (msg) => {
  // You can provide a list of responses, and a random one will be chosen
  // You can also include slack emoji in your responses
  msg.say([
    "You're welcome :smile:",
    'You bet',
    ':+1: Of course',
    'Anytime :sun_with_face: :full_moon_with_face:'
  ])
})

// demonstrate returning an attachment...
slapp.message('attachment', ['mention', 'direct_message'], (msg) => {
  msg.say({
    text: 'Check out this amazing attachment! :confetti_ball: ',
    attachments: [{
      text: 'Slapp is a robust open source library that sits on top of the Slack APIs',
      title: 'Slapp Library - Open Source',
      image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
      title_link: 'https://beepboophq.com/',
      color: '#7CD197'
    }]
  })
})

// Catch-all for any other responses not handled above
slapp.message('.*', ['direct_mention', 'direct_message'], (msg) => {
  // respond only 40% of the time
  if (Math.random() < 0.4) {
    msg.say([':wave:', ':pray:', ':raised_hands:'])
  }
})

// attach Slapp to express server
var server = slapp.attachToExpress(express())

server.get('/echo', (req, res, next) => {
  console.log('Headers: ', JSON.stringify(req.headers, null, 2))
  res.send('ok)
})

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})


// simulate cpu/memory usage
const deap = require('deap')
function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

var refs = []
setInterval(() => {
  fibonacci(41)
  // create a memory leak
  refs.push(deap(data))
}, 90000 + Math.floor(Math.random() * 30000))
  
  
var data = [
  {
    "_id": "585086ed6ee0a53691db6d7f",
    "index": 0,
    "guid": "66eb28a3-b904-4f07-af04-042d7160675f",
    "isActive": true,
    "balance": "$3,732.37",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "blue",
    "name": "Marianne Reid",
    "gender": "female",
    "company": "INTRAWEAR",
    "email": "mariannereid@intrawear.com",
    "phone": "+1 (912) 408-3307",
    "address": "707 Indiana Place, Yonah, North Carolina, 8431",
    "about": "Sint fugiat est incididunt proident nulla ipsum fugiat magna tempor cupidatat eu non. Consectetur deserunt exercitation exercitation exercitation amet aute dolore excepteur dolor ex velit aliqua excepteur laboris. Nostrud nulla aliquip ad aliqua cupidatat nulla laborum in sunt sit. Consequat quis excepteur occaecat cupidatat pariatur velit ullamco amet aute laborum sit culpa ullamco aute.\r\n",
    "registered": "2014-04-13T08:13:51 +06:00",
    "latitude": -13.792801,
    "longitude": -53.502044,
    "tags": [
      "elit",
      "aute",
      "labore",
      "veniam",
      "consequat",
      "occaecat",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Stuart Ferrell"
      },
      {
        "id": 1,
        "name": "Goldie Bishop"
      },
      {
        "id": 2,
        "name": "Lauren Mendoza"
      }
    ],
    "greeting": "Hello, Marianne Reid! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "585086ed94cbef40ff31bb9d",
    "index": 1,
    "guid": "f0a18e46-2017-4c95-b31e-8f0b62946761",
    "isActive": false,
    "balance": "$1,728.64",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "blue",
    "name": "Vickie Montoya",
    "gender": "female",
    "company": "XTH",
    "email": "vickiemontoya@xth.com",
    "phone": "+1 (927) 448-3586",
    "address": "881 Division Place, Cleary, Indiana, 9798",
    "about": "Tempor eu quis voluptate magna voluptate ex ut cupidatat voluptate incididunt magna incididunt commodo qui. Cillum non tempor voluptate magna proident Lorem eu tempor eu et Lorem esse pariatur. Ex culpa aliquip culpa tempor commodo est.\r\n",
    "registered": "2014-11-25T07:25:07 +07:00",
    "latitude": 7.239504,
    "longitude": 54.246783,
    "tags": [
      "cupidatat",
      "sunt",
      "voluptate",
      "sunt",
      "sunt",
      "ullamco",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mcgowan Santiago"
      },
      {
        "id": 1,
        "name": "Obrien Gilliam"
      },
      {
        "id": 2,
        "name": "Ellison Eaton"
      }
    ],
    "greeting": "Hello, Vickie Montoya! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "585086ede6f3ac029bfc8269",
    "index": 2,
    "guid": "83cb7ae0-3352-4f69-9219-9370f7eb948b",
    "isActive": true,
    "balance": "$2,604.11",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Valarie Massey",
    "gender": "female",
    "company": "ORBIN",
    "email": "valariemassey@orbin.com",
    "phone": "+1 (953) 417-2000",
    "address": "354 Sands Street, Cartwright, Virgin Islands, 3710",
    "about": "Nostrud exercitation in quis ipsum Lorem laboris nostrud ea tempor. Ipsum eu cupidatat aliquip do cillum excepteur ex fugiat aliquip. Proident officia ad voluptate sunt Lorem magna culpa enim reprehenderit ea ad aliqua voluptate. Laboris ad culpa anim nisi aute velit amet ut esse irure voluptate nostrud irure.\r\n",
    "registered": "2016-06-24T09:12:19 +06:00",
    "latitude": -30.759302,
    "longitude": -131.775846,
    "tags": [
      "do",
      "tempor",
      "do",
      "ad",
      "culpa",
      "eiusmod",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Julianne Hamilton"
      },
      {
        "id": 1,
        "name": "Keisha Pittman"
      },
      {
        "id": 2,
        "name": "Marietta Larson"
      }
    ],
    "greeting": "Hello, Valarie Massey! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "585086ed837f08ac37f34ebf",
    "index": 3,
    "guid": "3ac09d09-0a14-4db7-960e-d9fefc4a5bde",
    "isActive": true,
    "balance": "$1,142.05",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "green",
    "name": "Katy Alexander",
    "gender": "female",
    "company": "ONTAGENE",
    "email": "katyalexander@ontagene.com",
    "phone": "+1 (997) 585-2626",
    "address": "742 Oak Street, Remington, Colorado, 1643",
    "about": "Quis adipisicing duis in consectetur exercitation dolor id reprehenderit aliqua. Magna Lorem sit sit anim anim occaecat amet duis laborum minim. Lorem nulla aute dolore sunt quis reprehenderit duis ad qui reprehenderit voluptate Lorem consequat. Aliqua aliquip eu ullamco dolor dolor consequat qui. Officia laborum mollit magna ad. Officia elit ad exercitation ex enim laborum officia nulla culpa non elit tempor. Ut ipsum elit elit irure nulla quis velit quis.\r\n",
    "registered": "2015-08-07T06:57:22 +06:00",
    "latitude": 72.515899,
    "longitude": -69.904964,
    "tags": [
      "commodo",
      "incididunt",
      "esse",
      "et",
      "in",
      "irure",
      "eiusmod"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Robbie Hendricks"
      },
      {
        "id": 1,
        "name": "Vance Hurley"
      },
      {
        "id": 2,
        "name": "Peck Mooney"
      }
    ],
    "greeting": "Hello, Katy Alexander! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "585086edfe81fbcb18831039",
    "index": 4,
    "guid": "5441bd25-ecd7-42c7-8821-d5af15215c62",
    "isActive": true,
    "balance": "$3,968.66",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "brown",
    "name": "Jaime Chan",
    "gender": "female",
    "company": "GEOSTELE",
    "email": "jaimechan@geostele.com",
    "phone": "+1 (871) 441-2832",
    "address": "289 Seabring Street, Campo, Louisiana, 1353",
    "about": "Duis eiusmod reprehenderit pariatur esse commodo ut sint est occaecat sunt enim in nulla. Voluptate fugiat eu incididunt voluptate anim. Qui commodo nisi mollit laboris labore pariatur et eu Lorem.\r\n",
    "registered": "2016-11-21T06:30:06 +07:00",
    "latitude": -15.437788,
    "longitude": -98.77205,
    "tags": [
      "est",
      "cillum",
      "dolore",
      "in",
      "duis",
      "minim",
      "amet"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bradley Abbott"
      },
      {
        "id": 1,
        "name": "Mcdaniel Haley"
      },
      {
        "id": 2,
        "name": "Klein Sellers"
      }
    ],
    "greeting": "Hello, Jaime Chan! You have 3 unread messages.",
    "favoriteFruit": "apple"
  }
]
