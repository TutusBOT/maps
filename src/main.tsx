import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
