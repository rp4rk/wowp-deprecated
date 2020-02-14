import { matcher, MatcherConfig } from ".";

interface TestObject {
  spell: string;
  id: number;
}

describe("matcher", () => {
  const spell = [1, "Power Word: Shield"];
  const spellMatchers: MatcherConfig<TestObject>[] = [
    { label: "id", index: 0 },
    { label: "spell", index: 1 }
  ];

  it("matches objects", () => {
    const testObjectMatcher = matcher<TestObject>(spellMatchers);
    expect(testObjectMatcher(spell)).toEqual({
      id: 1,
      spell: "Power Word: Shield"
    });
  });
});
