import { createErrorMessages } from "../../../src/helpers/validator.helper";

// Tests for `validator.helper`
describe("Validator helper test", () => {
    test("Create error messages", () => {
        // Prepare data
        const nameError = {
            param: "name",
            msg: "Name is required",
        }
        const postCodeError = {
            param: "postCode",
            msg: "Post code is required",
        };
        const errorArray = [nameError, postCodeError];

        // Expected result
        const expectedResult: { [key: string]: string } = {};
        expectedResult[nameError.param] = nameError.msg;
        expectedResult[postCodeError.param] = postCodeError.msg;

        // Call
        const result = createErrorMessages(errorArray);

        //Verify result 
        expect(result).toEqual(expectedResult);
    });
});
