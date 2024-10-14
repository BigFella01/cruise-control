import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import About from "./pages/About";
import FindBooking from "./pages/FindBooking";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Payment from "./ui/Payment";
import OrderConfirmation from "./ui/OrderConfirmation";
import { Toaster } from "react-hot-toast";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 50,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route path="/book" element={<Book />} />
            <Route path="/book/payment/:orderId" element={<Payment />} />
            <Route
              path="/book/confirmation/:orderId"
              element={<OrderConfirmation />}
            />

            <Route path="/about" element={<About />} />
            <Route path="/findbooking" element={<FindBooking />} />
            <Route path="/findbooking/:orderId" element={<OrderConfirmation />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

// STEPS FOR SETTING UP APP

// 1. Go to terminal, navigate to Desktop, and run 'npm create vite@latest'
// 2. Delete everything except App.jsx and main.jsx
// 3. Open VS terminal and run 'npm install'
// 4. Now run 'npm install --save-dev vite-plugin-eslint eslint-config-react-app eslint'
// 5. Create '.eslintrc.json' file and write the same code as this project
// 6. Go to 'vite.config.js' file and add eslint

// OTHER APP IDEA

// We will create a website for a bicycle rental business. The business
// will be located in Pensacola, FL and provide rental bicycles of different
// types.

// Business name: Cruise Control

// const BIKE_SITE_DATABASE_PASSWORD = '0BInn1vk0dZhTYvr'
