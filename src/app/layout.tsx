import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "StudyPal - Your Academic Companion",
	description:
		"Track your grades, create flashcards, and improve your study habits",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex flex-col min-h-screen">
						<Navigation />
						<main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
							{children}
						</main>
					</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
