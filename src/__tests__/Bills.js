import { fireEvent, screen } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import Bills from "../containers/Bills.js";
import { bills } from "../fixtures/bills.js";
import { localStorageMock } from "../__mocks__/localStorage";

// ADDED BY ME

import LoadingPage from "../views/LoadingPage.js";
import ErrorPage from "../views/ErrorPage.js";
import userEvent from "@testing-library/user-event";
import firestore from "../app/Firestore.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import firebase from "../__mocks__/firebase";

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
  // TEST WRITTEN BY ME
  describe("When BillsUI is called", () => {
    // CHANGE TEST DESCRIPTION TO TEST RESULT - DONE
    test("Then Loading Page should be rendered when loading is true", () => {
      const referenceLoadingPage = LoadingPage();
      const result = BillsUI({ data: bills, loading: true });
      // const loadingPage = jest.fn(() => {
      //   return LoadingPage();
      // });
      // why here toEqual not toHaveBeenCalled
      // expect(result).toEqual(loadingPage());
      expect(result).toEqual(referenceLoadingPage);
    });

    test("Then ErrorPage should be rendered when loading is false and error is true", () => {
      const error = "Error";
      const referenceErrorPage = ErrorPage(error);
      const result = BillsUI({ data: bills, loading: false, error });
      expect(result).toEqual(referenceErrorPage);
    });
  });

  describe("When I am on Bills Page", () => {
    let onNavigate;
    beforeEach(() => {
      onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem("user", JSON.stringify({ type: "Employee" }));
    });

    test("Then bill icon in vertical layout should be highlighted", () => {
      // need storage here for VerticalLaout in BillsUI
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const billIcon = screen.getByTestId("icon-window");
      expect(billIcon.classList.contains("active-icon")).toBeTruthy;
    });

    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });

    test("Then event handling should be set up for the new bill button", () => {
      document.body.innerHTML = BillsUI({ data: bills });
      const billsClass = new Bills({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const newBillButton = screen.getByTestId("btn-new-bill");
      const handleClickNewBill = jest.fn(billsClass.handleClickNewBill);
      // DOESNT THIS ADD A 2ND EVENT LISTENER TO THE BUTTON?
      newBillButton.addEventListener("click", handleClickNewBill);
      userEvent.click(newBillButton);
      expect(handleClickNewBill).toHaveBeenCalled();

      // WHY DOES THIS NOT WORK
      // let spy = jest
      //   .spyOn(Bills.prototype, "handleClickNewBill")
      //   .mockImplementation(() => "handleClickNewBill called");
      // const newBillButton = screen.getByTestId("btn-new-bill");
      // userEvent.click(newBillButton);
      // expect(billsClass.handleClickNewBill).toHaveBeenCalled();
    });

    test("Then all event handling should be set up for the eye icons", () => {
      $.fn.modal = jest.fn();

      document.body.innerHTML = BillsUI({ data: bill });
      const billsClass = new Bills({
        document,
        onNavigate,
        firestore,
        localStorage,
      });

      const handleClickIconEye = jest.fn(billsClass.handleClickIconEye);
      const eye = screen.getByTestId("icon-eye");
      eye.addEventListener("click", (e) => handleClickIconEye(eye));
      userEvent.click(eye);
      expect(handleClickIconEye).toHaveBeenCalled();
    });

    describe("When I click on the New Bill button", () => {
      test("Then it should render the New Bill form", () => {
        const data = [];
        const loading = false;
        const error = null;
        const pathname = ROUTES_PATH["NewBill"];
        const html = ROUTES({ pathname, data, loading, error });
        document.body.innerHTML = html;
        expect(screen.getAllByText("Send a fee")).toBeTruthy();
      });
    });

    // moved this inside the previous describe to get the beforeEach setup
    describe("When I click on the eye icon of a bill", () => {
      test("Then it should show the bill in a modal", () => {
        document.body.innerHTML = BillsUI({ data: bill });
        const billsClass = new Bills({
          document,
          onNavigate,
          firestore,
          localStorage,
        });
        const handleClickIconEye = jest.fn(billsClass.handleClickIconEye);
        const eye = screen.getByTestId("icon-eye");
        eye.addEventListener("click", (e) => handleClickIconEye(eye));
        userEvent.click(eye);
        expect(handleClickIconEye).toHaveBeenCalled();
        const modal = screen.getAllByText("Fee");
        // did not work with getByRole("dialog")
        // can I do this with getAllByText?
        expect(modal).toBeTruthy();
      });
    });
  });
});

// GET BILLS Integration Test
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills Overview", () => {
    const getSpy = jest.spyOn(firebase, "get");

    test("fetches bills from mock API GET", async () => {
      const bills = await firebase.get();
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(bills.data.length).toBe(4);
    });
    test("fetches bills from an API and fails with 404 message error", async () => {
      firebase.get.mockImplementationOnce(() => {
        Promise.reject(new Error("Error 404"));
      });
      const html = BillsUI({ error: "Error 404" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Error 404/);
      expect(message).toBeTruthy();
    });
    test("fetches messages from an API and fails with 500 message error", async () => {
      firebase.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Error 500"))
      );
      const html = BillsUI({ error: "Error 500" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Error 500/);
      expect(message).toBeTruthy();
    });
  });
});
