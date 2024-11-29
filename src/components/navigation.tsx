"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Calculator,
	GraduationCap,
	Home,
	Library,
	LineChart,
	Menu,
	Timer,
	X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

const routes = [
	{
		label: "Home",
		icon: Home,
		href: "/",
		color: "text-sky-500",
	},
	{
		label: "GPA Calculator",
		icon: Calculator,
		href: "/gpa",
		color: "text-violet-500",
	},
	{
		label: "Course Log",
		icon: LineChart,
		href: "/course-log",
		color: "text-pink-700",
	},
	{
		label: "Flashcards",
		icon: Library,
		href: "/flashcards",
		color: "text-orange-700",
	},
	{
		label: "Study Timer",
		icon: Timer,
		href: "/timer",
		color: "text-emerald-500",
	},
	{
		label: "AI Tutor",
		icon: GraduationCap,
		href: "/ai-tutor",
		color: "text-indigo-500",
	},
];

export function Navigation() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				<Link href="/" className="flex items-center gap-2">
					<GraduationCap className="h-6 w-6" />
					<span className="text-lg font-bold">StudyPal</span>
				</Link>
				<nav className="hidden md:flex md:gap-6">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
								pathname === route.href
									? "text-primary"
									: "text-muted-foreground"
							)}
						>
							<route.icon className={cn("h-4 w-4", route.color)} />
							{route.label}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-4">
					<ModeToggle />
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<div className="flex flex-col gap-4">
								{routes.map((route) => (
									<Link
										key={route.href}
										href={route.href}
										onClick={() => setOpen(false)}
										className={cn(
											"flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
											pathname === route.href
												? "text-primary"
												: "text-muted-foreground"
										)}
									>
										<route.icon className={cn("h-4 w-4", route.color)} />
										{route.label}
									</Link>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
}
