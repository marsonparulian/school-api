// This file is for temporary use only. TO test environment vars in github action hosted runner
import "dotenv/config";

console.log("mpa mongodb pass : ", process.env.A_MONGODB_PASSWORD)
console.log("a full host : ", process.env.A_FULL_HOST);
