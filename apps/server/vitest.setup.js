import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
const fetchMocker = createFetchMock(vi);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMocker.enableMocks();

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMocker.dontMock();
