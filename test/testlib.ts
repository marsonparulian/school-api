import db from "../src/services/db/db";
import { School, Suburb } from "../src/types/common";

// This file contain data / helpers that can be used repeatedly in tests

/**
 * Create new school and the related suburb. Will return the id of the created school and suburb.
 */
const createSchoolAndSuburb = async (schoolData: { name: string }, suburbData: Suburb): Promise<string[]> => {
    // Create suburb
    const suburb = await db.suburb.save(suburbData).catch((e) => {
        throw (e);
    });

    // Persist suburb id
    const suburbId = suburb._id ? suburb._id : "";

    // Create school
    const school = await db.school.save({
        ...schoolData,
        suburb: suburbId,
    }).catch((e) => {
        throw (e);
    });

    // Persist school id
    const schoolId = school._id ? school._id : "";

    return [schoolId, suburbId];
}

const lib = {
    randomId: "123456789012345678901234",
    //'Data's below not contain id or reference property since the `_id`s are generated in DB
    suburb1Data: { name: "Sydney", postCode: "2000" },
    suburb2Data: { name: "Paramatta", postCode: "2150" },
    suburb3Data: { name: "Blacktown", postCode: "2148" },
    suburb4Data: { name: "Castle Hill", postCode: "2154" },
    suburb5Data: { name: "Westmead", postcode: "2145" },
    school1Data: { name: "Sydney Boys" },
    school2Data: { name: "Paramatta Public" },
    school3Data: { name: "Smart Junior School" },
    school4Data: { name: "Good School" },
    createSchoolAndSuburb,
}
export default lib;
