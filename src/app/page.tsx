import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Calculator,
	GraduationCap,
	Library,
	LineChart,
	Timer,
	Calendar,
} from "lucide-react";
import Link from "next/link";
import { ProgressOverview } from "@/components/ProgressTracking/ProgressOverview";
import { StudySuggestions } from "@/components/StudyRecommendations/StudySuggestions";

const features = [
	{
		title: "GPA Calculator",
		description:
			"Calculate and track your GPA/CGPA with our advanced calculator.",
		icon: Calculator,
		href: "/gpa",
		color: "text-violet-500",
	},
	{
		title: "Course Log",
		description:
			"Log your weekly grades, track progress, and get study recommendations.",
		icon: LineChart,
		href: "/course-log",
		color: "text-pink-700",
	},
	{
		title: "Flashcards",
		description:
			"Create and study flashcards with our spaced repetition system.",
		icon: Library,
		href: "/flashcards",
		color: "text-orange-700",
	},
	{
		title: "Study Timer",
		description:
			"Stay focused with our Pomodoro timer and track your study sessions.",
		icon: Timer,
		href: "/study-timer",
		color: "text-emerald-500",
	},
	{
		title: "AI Tutor",
		description: "Get personalized study help and answers to your questions.",
		icon: GraduationCap,
		href: "/ai-tutor",
		color: "text-indigo-500",
	},
	{
		title: "Study Schedule",
		description:
			"Plan and optimize your study sessions for better time management.",
		icon: Calendar,
		href: "/study-schedule",
		color: "text-blue-500",
	},
];

export default function Home() {
<<<<<<< Updated upstream
  return ( <p>test</p>  );
=======
	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
					Your Ultimate Study Companion
				</h1>
				<p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
					Track your grades, create flashcards, and improve your study habits
					with our AI-powered tools.
				</p>
				<div className="flex flex-wrap gap-4 justify-center">
					<Button asChild size="lg">
						<Link href="/gpa">Get Started</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/course-log">View Demo</Link>
					</Button>
				</div>
			</section>

			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<Card
						key={feature.title}
						className="transition-colors hover:bg-muted/50"
					>
						<CardHeader>
							<feature.icon className={`h-10 w-10 ${feature.color}`} />
							<CardTitle>{feature.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">{feature.description}</p>
						</CardContent>
					</Card>
				))}
			</section>

			<section className="grid gap-8 md:grid-cols-2">
				<ProgressOverview />
				<StudySuggestions />
			</section>
		</div>
	);
>>>>>>> Stashed changes
}
