import { UserAssertions } from "./assertions/user-assertions";
import { SearchAssertions } from "./assertions/search-assertions";
import { NavigationAssertions } from "./assertions/navigation-assertions";
import { TestRecordingAssertions } from "./assertions/test-recording-assertions";

class Assertions {
    constructor() {
        const sources = [
            new UserAssertions(),
            new SearchAssertions(),
            new NavigationAssertions(),
            new TestRecordingAssertions(),
        ];

        for (const source of sources) {
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(source))
                .filter((name) => name !== "constructor" && !name.startsWith("_"));
            for (const method of methods) {
                this[method] = source[method].bind(source);
            }
        }
    }
}

export const assertions = new Assertions();
