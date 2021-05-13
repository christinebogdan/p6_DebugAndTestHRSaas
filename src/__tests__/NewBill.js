import { fireEvent, screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
// import firestore from "../app/Firestore.js";
import userEvent from "@testing-library/user-event";
import { localStorageMock } from "../__mocks__/localStorage";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import { firestore } from "../__mocks__/firestore";

// import firebase from "../__mocks__/firebase.js";

const bill = [
  {
    id: "47qAXb6fIm2zOKkLzMro",
    vat: "80",
    fileUrl:
      "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
    status: "pending",
    type: "Hôtel et logement",
    commentary: "séminaire billed",
    name: "encore",
    fileName: "preview-facture-free-201801-pdf-1.jpg",
    date: "2004-04-04",
    amount: 400,
    commentAdmin: "ok",
    email: "a@a",
    pct: 20,
    email: "john.snow@billed.com",
  },
];

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
        firestore,
        localStorage,
      });

      const formNewBill = screen.getByTestId("form-new-bill");

      newBill.createBill = jest.fn();
      const handleSubmit = jest.fn(newBill.handleSubmit);
      // fails when (e) => handleSubmit
      // fails when NewBill.js lines 62 and 63 not commented out
      formNewBill.addEventListener("submit", handleSubmit);
      fireEvent.submit(formNewBill);
      expect(handleSubmit).toHaveBeenCalled();
    });

    test("Then file input field should have Event Handler added", () => {
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

    /* test.only("Test TEST", () => {
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const png = new File(["hello"], "hello.png", { type: "image/png" });
      const jpg = new File(["hello"], "hello.png", { type: "image/jpg" });
      const jpeg = new File(["hello"], "hello.png", { type: "image/jpeg" });
      const validInputs = [png, jpg, jpeg];

      // valid input, should succeed
      const fileInput = screen.getByTestId("file");

      for (let i = 0; i < validInputs.length; i++) {
        userEvent.upload(fileInput, validInputs[i]);
        expect(firestore.storage.ref).toHaveBeenCalledTimes(i + 1);
      }

      // invalid input
      const gif = new File(["hello"], "hello.png", { type: "image/gif" });
      userEvent.upload(fileInput, gif);

      expect(firestore.storage.ref).toHaveBeenCalledTimes(validInputs.length);
      expect(fileInput.value).toBe("");
    }); */

    test("then file input should only accept types png, jpg and jpeg", () => {
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const fileInput = screen.getByTestId("file");
      // const handleChangeFile = jest.fn(newBill.handleChangeFile);
      // fileInput.addEventListener("change", handleChangeFile);

      const png = new File(["hello"], "hello.png", { type: "image/png" });
      userEvent.upload(fileInput, png);
      expect(firestore.storage.ref).toHaveBeenCalledTimes(1);

      const jpg = new File(["hello"], "hello.jpg", { type: "image/jpg" });
      userEvent.upload(fileInput, jpg);
      expect(firestore.storage.ref).toHaveBeenCalledTimes(2);

      const jpeg = new File(["hello"], "hello.jpeg", { type: "image/jpeg" });
      userEvent.upload(fileInput, jpeg);
      expect(firestore.storage.ref).toHaveBeenCalledTimes(3);

      const gif = new File(["hello"], "hello.gif", { type: "image/gif" });
      userEvent.upload(fileInput, gif);
      expect(firestore.storage.ref).toHaveBeenCalledTimes(3);
      expect(fileInput.value).toBe("");
    });
  });
});

// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I post a New Bill from the New Bill Form", () => {
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

    // // this.store.collection is not a function
    // test("posts new bill to firestore bills collection", async () => {
    //   const newBill = new NewBill({
    //     document,
    //     onNavigate,
    //     firestore,
    //     localStorage,
    //   });

    //   newBill.createBill(bill);
    //   // check if newly posted bill is in collection
    // });
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
