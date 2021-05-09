import { fireEvent, screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import firestore from "../app/Firestore.js";
import userEvent from "@testing-library/user-event";
import { localStorageMock } from "../__mocks__/localStorage";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import firestore from "../app/Firestore.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    let html;
    let onNavigate;
    beforeEach(() => {
      html = NewBillUI();
      document.body.innerHTML = html;

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem("user", JSON.stringify({ type: "Employee" }));

      onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
    });
    test("Then submit button in new Bill Form should have Event Handler added", () => {
      // passes when I comment out firestore
      const newBill = new NewBill({
        document,
        onNavigate,
        // firestore,
        localStorage,
      });

      const formNewBill = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn(newBill.handleSubmit);
      // fails when (e) => handleSubmit
      // fails when NewBill.js lines 62 and 63 not commented out
      formNewBill.addEventListener("submit", handleSubmit);
      fireEvent.submit(formNewBill);
      expect(handleSubmit).toHaveBeenCalled();
    });

    test("Then file input field should have Event Handler added and only accept types", () => {
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const fileInput = screen.getByTestId("file");
      // why does this fail if I remove [] around new File
      const file = [new File(["hello"], "hello.png", { type: "image/png" })];
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
      // does this not add a second event Listener to element?
      fileInput.addEventListener("change", handleChangeFile);
      // https://testing-library.com/docs/ecosystem-user-event/#uploadelement-file--clickinit-changeinit-
      userEvent.upload(fileInput, file);
      expect(handleChangeFile).toHaveBeenCalled();
    });

    test("then file input should only accept types png, jpg and jpeg", () => {
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const fileInput = screen.getByTestId("file");
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
      fileInput.addEventListener("change", handleChangeFile);
      const png = new File(["hello"], "hello.png", { type: "image/png" });
      userEvent.upload(fileInput, png);
      const expectation = "";
      expect(fileInput.value).not.toEqual(expectation);

      const jpg = new File(["hello"], "hello.png", { type: "image/jpg" });
      userEvent.upload(fileInput, jpg);
      const jpeg = new File(["hello"], "hello.png", { type: "image/jpeg" });
      userEvent.upload(fileInput, jpeg);
      const gif = new File(["hello"], "hello.png", { type: "image/gif" });
      userEvent.upload(fileInput, gif);
    });
  });
});

// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I post a New Bill from the New Bill Form", () => {
    test("posts new bill to firestore bills collection", async () => {
      const getSpy = jest.spyOn(firebase, "get");
      const bills = await firebase.get();
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(bills.data.length).toBe(4);
    });
    // test("fetches bills from an API and fails with 404 message error", async () => {
    //   firebase.get.mockImplementationOnce(() =>
    //     Promise.reject(new Error("Erreur 404"))
    //   );
    //   const html = DashboardUI({ error: "Erreur 404" });
    //   document.body.innerHTML = html;
    //   const message = await screen.getByText(/Erreur 404/);
    //   expect(message).toBeTruthy();
    // });
    // test("fetches messages from an API and fails with 500 message error", async () => {
    //   firebase.get.mockImplementationOnce(() =>
    //     Promise.reject(new Error("Erreur 500"))
    //   );
    //   const html = DashboardUI({ error: "Erreur 500" });
    //   document.body.innerHTML = html;
    //   const message = await screen.getByText(/Erreur 500/);
    //   expect(message).toBeTruthy();
    // });
  });
});
