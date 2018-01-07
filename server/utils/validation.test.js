var expect = require("expect");
const { isRealString } = require("./validations");

describe("validate non string value", () => {
  it("should reject non string vlaue", () => {
    const value = 33333;
    const validate = isRealString(value);
    expect(validate).toBe(false);
  });
  it("should reject string with only spaces", () => {
    const value = "         ";
    const validate = isRealString(value);
    expect(validate).toBe(false);
  });
  it("should allow valid string value", () => {
    const value = "test  ";
    const validate = isRealString(value);
    expect(validate).toBe(true);
  });
});
