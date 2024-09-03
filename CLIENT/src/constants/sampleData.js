import myImg from "/myImg.png";
import profilePhoto from "/myphoto.png";

export const sampleChats = [
  {
    avatar: [profilePhoto],
    name: "Rajdip",
    _id: "1",
    groupChat: "false",
    members: ["1", "2"],
  },
  {
    avatar: ["S"],
    name: "Sahinur",
    _id: "2",
    groupChat: "false",
    members: ["1", "2"],
  },
  {
    avatar: ["profilePhoto, sunglass, myImg"],
    name: "Arijit",
    _id: "3",
    groupChat: "true",
    members: ["1", "2"],
  },
];

//Users
export const sampleUsers = [
  {
    avatar: [profilePhoto],
    name: "Rajdip",
    _id: "1",
  },
  { avatar: [profilePhoto], name: "Sahinur", _id: "2" },
  { avatar: [profilePhoto], name: "Arijit", _id: "3" },
];

//Notifications
export const sampleNotifications = [
  {
    sender: {
      avatar: [profilePhoto],
      name: "Rajdip",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: [profilePhoto],
      name: "Sahinur",
    },
    _id: "2",
  },
];

//Sample Message

export const SampleMessage = [
  {
    attachments: [
      {
        public_id: "abcd",
        url: profilePhoto,
      },
    ],

    content:
      "Yo yo 143 to the 6 to the 9 representing the ABQ what up biatch , leave  a tone",
    _id: "njkdafkjdh",

    sender: {
      _id: "user._id",
      name: "Sahinur",
    },

    chat: "chatId",
    createdAt: "Tue Jul 16 2024 19:13:50 GMT+0530",
  },

  {
    attachments: [
      {
        public_id: "abcd2",
        url: myImg,
      },
    ],

    content:
      "Yo yo 143 to the 6 to the 9 representing the ABQ what up biatch , leave  a tone2",
    _id: "njkdafkjdh 2",

    sender: {
      _id: "kjnfjiewfnewj",
      name: "Rajdip",
    },

    chat: "chatId",
    createdAt: "Tue Jul 16 2024 19:13:50 GMT+0530",
  },
];

// DashBoard Data

export const dashBoardData = {
  users: [
    {
      name: "Sahinur",
      avatar: "",
      _id: "1",
      username: "sahinur",
      friends: 20,
      groups: 5,
    },
    {
      name: "Rajdip",
      avatar: "",
      _id: "2",
      username: "rajdip",
      friends: 20,
      groups: 6,
    },
  ],
  chats: [
    {
      name: "Study Group",
      avatar: [""],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "" },
        { _id: "2", avatar: "" },
      ],
      totalMembers: 5,
      totalMessages: 5,
      creator: {
        name: "Sahinur",
        avatar: "",
      },
    },
    {
      name: "Bkc Group",
      avatar: [""],
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "" },
        { _id: "2", avatar: "" },
      ],
      totalMembers: 5,
      totalMessages: 5,
      creator: {
        name: "Bkc Group",
        avatar: "",
      },
    },
  ],
  messages: [
    {
      attachments: [
        {
          url: profilePhoto,
          type: 'image',
        },
      ],
      content: 'teri ma ki chu*t',
      _id: '123',
      sender: {
        _id: 'user._id',
        name: 'Laude',
      },
      chat: 'chatId',
      groupChat: false,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    {
      attachments: [
        {
          url: myImg,
          type: 'image',
        },

      ],
      content: 'teri ma ki chu*t',
      _id: '124',
      sender: {
        _id: 'user._id',
        name: 'Laude',
      },
      chat: 'chatId',
      groupChat: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  ],
};
