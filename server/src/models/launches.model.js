import launchesDatabase from './launches.mongo.js';
import planets from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER, //flight_number
  mission: 'Kepler Exploration X', //name
  rocket: 'Explorer IS1', //rocket.name
  launchDate: new Date('December 27, 2030'), //date_local
  target: 'Kepler-442 b', //not applicable
  customers: ['ZTM', 'NASA'], //payload.customers for each payload
  upcoming: true, //upcoming
  success: true, //success
};

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchesData() {
  console.log('Downloading Launch Data ...');
  const response = await fetch(SPACEX_API_URL, {
    method: 'POST',
    body: {
      query: {},
      options: {
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    },
  });
  const result = await response.json();

  const launchDocs = result.docs;
  for (let launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(launch);
  }
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { __v: 0, _id: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launchesDatabase.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  console.log(aborted);

  return aborted.matchedCount === 1;
}

export {
  loadLaunchesData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
