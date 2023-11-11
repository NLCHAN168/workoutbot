import { config } from "dotenv";
import { Client } from "discord.js";

let workouts = [
  {
    name: "Single Leg Raise",
    interval: "3x10",
    resistance: "5#",
    required: "",
  },
  {
    name: "Long Arc Quad",
    interval: "3x10",
    resistance: "4#",
    required: "",
  },
  {
    name: "Double Leg Press 0-90",
    interval: "3x10",
    resistance: "120#",
    required: "",
  },
  {
    name: "Single Leg Press 0-90",
    interval: "3x10",
    resistance: "60#",
    required: "",
  },
  {
    name: "Barbell Mini Squat 0-60",
    interval: "3x10",
    resistance: "45#",
    required: "",
  },
  {
    name: 'Low Plyo (12") - Front / Lateral Step-up',
    interval: "3x10",
    resistance: "",
    required: "",
  },
  {
    name: "Deadlift",
    interval: "3x10",
    resistance: "65#",
    required: "",
  },
  {
    name: "Triple Extension",
    interval: "3x10",
    resistance: "",
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
  },
  {
    name: "Lateral / Forward Heel Taps",
    interval: "3x10",
    resistance: "",
  },
  {
    name: "Small Forward Lunge 1/4",
    interval: "3x10",
    resistance: "",
  },
  {
    name: "Single Leg Romanian Deadlift",
    interval: "3x10",
    resistance: "10#",
  },
  {
    name: "Hamstring Curl Machine",
    interval: "2x10",
    resistance: "15#",
  },
  {
    name: "Bridge on Powerball (Legs Extended)",
    interval: "3x10",
    resistance: "",
  },
  {
    name: "Single Leg Bridge",
    interval: "3x10",
    resistance: "",
  },
  {
    name: "Resisted Backwards Walking",
    interval: "5 Laps",
    resistance: "37.5#",
  },
  {
    name: "Monster Walk (Band around ankles) - Forward / Lateral",
    interval: "3x10",
    resistance: "Blue Band",
  },
  {
    name: "Single Leg Stand on Uneven Surfaces (ex. airex, rockerboard, dynadisk, bosu, etc.)",
    interval: "3x30s",
    resistance: "",
  },
  {
    name: "Y-balance",
    interval: "2x10",
    resistance: "",
  },
  {
    name: "1 / 4 Lunge w/ Single Arm Row",
    interval: "3x10",
    resistance: "22.5",
  },
  {
    name: "Single Leg Stand w/ Pallof Press",
    interval: "3x10",
    resistance: "7.5#",
  },
  {
    name: "Front / Side Plank",
    interval: "3x30s",
    resistance: "",
  },
];
// config();
// const client = new Client({
//   intents: ["Guilds", "GuildMessages", "GuildMembers"],
// });
// const TOKEN = process.env.DISCORD_TOKEN;
// client.login(TOKEN).catch((e) => console.error(e));
// client.on("ready", () => {
//   console.log("The bot is logged in.");
// });

function getWorkout(number) {
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
      !rotation.includes(workouts[exercise])
    ) {
      rotation.push(workouts[exercise]);
      counter++;
    }
  }
  let circuit = [];
  rotation.forEach((element) =>
    circuit.push(
      element.name + " " + element.interval + " " + element.resistance
    )
  );
  return circuit;
}

console.log(getWorkout(1));
