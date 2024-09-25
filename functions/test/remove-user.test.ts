/* eslint-disable @typescript-eslint/no-explicit-any */
// removeUser.test.js

import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { removeUser } from "../src/index";
import * as httpMocks from "node-mocks-http";

jest.mock("firebase/firestore");

describe("removeUser cloud function", () => {
  let request: httpMocks.MockRequest<any>;
  let response: httpMocks.MockResponse<any>;

  beforeEach(() => {
    response = httpMocks.createResponse();
  });

  it("should return 401 if no authorization header is present", async () => {
    request = httpMocks.createRequest({
      method: "POST",
      url: "/remove-user",
      body: { data: { id: "123" } },
    });

    await removeUser(request, response);
    expect(response.statusCode).toBe(401);
  });

  it("should return 400 if no id is present in the request body", async () => {
    request = httpMocks.createRequest({
      method: "POST",
      url: "/remove-user",
      body: { data: {} },
      headers: {
        Authorization: "Bearer 123",
      },
    });

    await removeUser(request, response);

    expect(response.statusCode).toBe(400);
  });

  it("should return 200 if the request is successful", async () => {
    request = httpMocks.createRequest({
      method: "POST",
      url: "/remove-user",
      body: { data: { id: "123" } },
      headers: {
        Authorization: "Bearer 123",
      },
    });

    await removeUser(request, response);

    expect(response.statusCode).toBe(200);
  });
});
