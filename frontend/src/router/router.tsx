import { NotificationsList } from "@/domains/notifications/NotificationsList";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Outlet,
  useRouteError,
} from "react-router-dom";
import { Documents } from "../domains/documents/Documents";
import { Layout } from "../Layout/Layout";

// const routes = createRoutesFromElements(
//   <Route path="/">
//     <Route
//       path="/seiri"
//       element={<Layout />}
//       errorElement={<div>Page not found</div>}
//     >
//       <Route errorElement={<ErrorPage />}>
//         <Route path="documents" element={<Documents />} />
//         <Route path="notifications" element={<NotificationsList />} />
//       </Route>

//       <Route />
//     </Route>
//     {/* <Route element={<AuthenticationGuard />}>
//     </Route> */}

//     {/* <Route element={<UnAuthenticationGuard />}>
//       <Route path="/auth" element={<AuthPage />}>
//         <Route index element={<SignIn />}></Route>
//         <Route path="signup" element={<SignUp />}></Route>
//       </Route>
//     </Route> */}
//   </Route>
// );

export function RootErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
}

export function ProjectErrorBoundary() {
  let error = useRouteError();

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }

  return (
    <>
      <h1>This page doens't exist</h1>
      <p>Please reach out to to obtain access.</p>
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "documents",
            element: <Documents />,
            errorElement: <ProjectErrorBoundary />,
          },
          {
            path: "notifications",
            element: <NotificationsList />,
            errorElement: <ProjectErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

// export const router = createBrowserRouter(routes);
