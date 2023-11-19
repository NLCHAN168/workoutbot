import { config } from "dotenv";
import {
  Client,
  IntentsBitField,
  Partials,
  MessageCollector,
} from "discord.js";

let workouts = [
  {
    name: "Single Leg Raise",
    interval: "3x10",
    resistance: "5#",
    leg: "",
    required: "",
  },
  {
    name: "Long Arc Quad",
    interval: "3x10",
    resistance: "4#",
    leg: "",
    required: "",
  },
  {
    name: "Double Leg Press 0-90",
    interval: "3x10",
    resistance: "120#",
    leg: "",
    required: "",
  },
  {
    name: "Single Leg Press 0-90",
    interval: "3x10",
    resistance: "60#",
    leg: "",
    required: "",
  },
  {
    name: "Barbell Mini Squat 0-60",
    interval: "3x10",
    resistance: "45#",
    leg: "",
    required: "",
  },
  {
    name: 'Low Plyo (12") - Front / Lateral Step-up',
    interval: "3x10",
    resistance: "",
    leg: "",
    required: "",
  },
  {
    name: "Deadlift",
    interval: "3x10",
    resistance: "65#",
    leg: "",
    required: "",
  },
  {
    name: "Triple Extension",
    interval: "3x10",
    resistance: "",
    leg: "",
    required: "",
  },
  {
    name: "Treadmill",
    interval: "10-20 min",
    resistance: "5.0 incline, 4.5 speed",
  },
  {
    name: "Bike",
    interval: "10-20 min",
    resistance: "level 8",
  },
  {
    name: "Single Leg Sit-to-Stand",
    interval: "3x10",
    resistance: "",
    leg: "",
  },
  {
    name: "Lateral / Forward Heel Taps",
    interval: "3x10",
    leg: "",
    resistance: "",
  },
  {
    name: "Small Forward Lunge 1/4",
    interval: "3x10",
    leg: "",
    resistance: "",
  },
  {
    name: "Single Leg Romanian Deadlift",
    interval: "3x10",
    leg: "",
    resistance: "10#",
  },
  {
    name: "Hamstring Curl Machine",
    interval: "2x10",
    leg: "",
    resistance: "15#",
  },
  {
    name: "Bridge on Powerball (Legs Extended)",
    interval: "3x10",
    leg: "",
    resistance: "",
  },
  {
    name: "Single Leg Bridge",
    interval: "3x10",
    leg: "",
    resistance: "",
  },
  {
    name: "Resisted Backwards Walking",
    interval: "5 Laps",
    leg: "",
    resistance: "37.5#",
  },
  {
    name: "Monster Walk (Band around ankles) - Forward / Lateral",
    interval: "3x10",
    leg: "",
    resistance: "Blue Band",
  },
  {
    name: "Single Leg Stand on Uneven Surfaces (ex. airex, rockerboard, dynadisk, bosu, etc.)",
    interval: "3x30s",
    leg: "",
    resistance: "",
  },
  {
    name: "Y-balance",
    interval: "2x10",
    leg: "",
    resistance: "",
  },
  {
    name: "1 / 4 Lunge w/ Single Arm Row",
    interval: "3x10",
    leg: "",
    resistance: "22.5",
  },
  {
    name: "Single Leg Stand w/ Pallof Press",
    interval: "3x10",
    resistance: "7.5#",
    leg: "",
  },
  {
    name: "Front / Side Plank",
    interval: "3x30s",
    resistance: "",
    leg: "",
    back: "",
  },
  {
    name: "Pull-Ups Assisted/Unassisted",
    interval: "3x10",
    resistancee: "40#",
    back: "",
  },
  {
    name: "Diverging Low Row",
    interval: "3x10",
    back: "",
    resistance: "100#",
  },
  {
    name: "Lat Pull-Down",
    back: "",
    interval: "3x10",
    resistance: "80#",
  },
  {
    name: "Bent-over Row",
    back: "",
    interval: "3x10",
    resistance: "35#",
  },
  {
    name: "Bicep Curls (Cable Column)",
    interval: "3x10",
    back: "",
    resistance: "27.5#",
  },
  {
    name: "Dumbbell press",
    interval: "3x10",
    chest: "",
    resistance: "45#",
  },
  {
    name: "Incline Overhead Press 25#",
    interval: "3x10",
    chest: "",
    resistance: "25#",
  },
  {
    name: "Assisted/Unassisted Dips",
    chest: "",
    interval: "3x10",
    resistance: "40#",
  },
  {
    name: "Tricep Pull-Down",
    chest: "",
    interval: "3x10",
    resistance: "32.5#",
  },
  {
    name: "Standing Fly",
    chest: "",
    interval: "3x10",
    resistance: "5#",
  },
  {
    name: "Cable Column High-to-Low Press",
    interval: "3x10",
    chest: "",
    resistance: "12.5#",
  },
];

let c_exercises = 0;
let b_exercises = 0;
let l_exercises = 0;

for (let exercise of workouts) {
  if (exercise.hasOwnProperty("chest")) {
    c_exercises++;
  }
  if (exercise.hasOwnProperty("back")) {
    b_exercises++;
  }
  if (exercise.hasOwnProperty("leg")) {
    l_exercises++;
  }
}

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.DirectMessages,
  IntentsBitField.Flags.DirectMessageReactions
);
const client = new Client({ intents: myIntents, partials: [Partials.Channel] });

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }
  if (
    message.content === "chest" ||
    message.content === "back" ||
    message.content === "leg"
  ) {
    message.reply("How many exercises?");
    const collector = message.channel.createMessageCollector({
      filter: (message) => !message.author.bot,
      max: 1,
    });
    collector.on("collect", (collectedMessage) => {
      collectedMessage.reply(
        getWorkout(collectedMessage.content, message.content).toString()
      );
      console.log(`Collected message: ${collectedMessage.content}`);
    });
    collector.on("end", (reason) => {
      if (reason === "time") {
        console.log("Collector ended: Time limit reached");
      } else {
        console.log(`Collector ended: ${reason}`);
        collector.stop;
      }
    });
  }
});

function getWorkout(number, group) {
  if (group === "chest" && number > c_exercises) {
    number = c_exercises;
  }
  if (group === "leg" && number > l_exercises) {
    number = l_exercises;
  }
  if (group === "back" && number > b_exercises) {
    number = b_exercises;
  }
  let rotation = [];
  workouts.forEach((element) => {
    if (element.hasOwnProperty("required")) {
      rotation.push(element);
    }
  });
  for (let counter = 0; counter < number; ) {
    let exercise = Math.floor(Math.random() * workouts.length);
    if (
      !workouts[exercise].hasOwnProperty("required") &&
      !rotation.includes(workouts[exercise]) &&
      workouts[exercise].hasOwnProperty(group)
    ) {
      rotation.push(workouts[exercise]);
      counter++;
    }
  }
  let circuit = [];
  rotation.forEach((element) =>
    circuit.push(
      element.name + " " + element.interval + " " + element.resistance + "\n"
    )
  );
  return circuit.join("\n");
}

config();
const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN).catch((e) => console.error(e));
client.on("ready", () => {
  console.log("The bot is logged in.");
});
