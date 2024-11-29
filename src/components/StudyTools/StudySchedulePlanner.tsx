"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type StudySession = {
	course: string;
	day: string;
	startTime: string;
	duration: number;
};

const daysOfWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export function StudySchedulePlanner() {
	const [sessions, setSessions] = useState<StudySession[]>([]);
	const [newSession, setNewSession] = useState<StudySession>({
		course: "",
		day: "",
		startTime: "",
		duration: 30,
	});
	const [isGenerating, setIsGenerating] = useState(false);
	const { toast } = useToast();

	const addSession = () => {
		if (newSession.course && newSession.day && newSession.startTime) {
			setSessions([...sessions, newSession]);
			setNewSession({ course: "", day: "", startTime: "", duration: 30 });
			toast({
				title: "Study Session Added",
				description: `Added a ${newSession.duration} minute session for ${newSession.course} on ${newSession.day}`,
			});
		} else {
			toast({
				title: "Error",
				description: "Please fill in all fields for the study session.",
				variant: "destructive",
			});
		}
	};

	const removeSession = (index: number) => {
		const updatedSessions = sessions.filter((_, i) => i !== index);
		setSessions(updatedSessions);
	};

	const generateSchedule = async () => {
		setIsGenerating(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsGenerating(false);
		toast({
			title: "Study Schedule Generated",
			description: "Your optimized study schedule has been created.",
		});
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Study Schedule Planner</CardTitle>
				<CardDescription>
					Plan your study sessions for each course throughout the week.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 mb-4">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div className="space-y-2">
							<Label htmlFor="course">Course</Label>
							<Input
								id="course"
								value={newSession.course}
								onChange={(e) =>
									setNewSession({ ...newSession, course: e.target.value })
								}
								placeholder="Course name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="day">Day</Label>
							<Select
								value={newSession.day}
								onValueChange={(value) =>
									setNewSession({ ...newSession, day: value })
								}
							>
								<SelectTrigger id="day">
									<SelectValue placeholder="Select day" />
								</SelectTrigger>
								<SelectContent>
									{daysOfWeek.map((day) => (
										<SelectItem key={day} value={day}>
											{day}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="startTime">Start Time</Label>
							<Input
								id="startTime"
								type="time"
								value={newSession.startTime}
								onChange={(e) =>
									setNewSession({ ...newSession, startTime: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="duration">Duration (minutes)</Label>
							<Input
								id="duration"
								type="number"
								value={newSession.duration}
								onChange={(e) =>
									setNewSession({
										...newSession,
										duration: Number(e.target.value),
									})
								}
								min={15}
								step={15}
							/>
						</div>
					</div>
					<LoadingButton onClick={addSession} className="w-full">
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Study Session
					</LoadingButton>
				</div>
				{sessions.length > 0 && (
					<div className="mt-6">
						<h3 className="text-lg font-semibold mb-2">Planned Sessions</h3>
						<ul className="space-y-2">
							{sessions.map((session, index) => (
								<li
									key={index}
									className="flex justify-between items-center bg-secondary p-2 rounded"
								>
									<span>
										{session.course} - {session.day} at {session.startTime} (
										{session.duration} min)
									</span>
									<LoadingButton
										variant="ghost"
										size="sm"
										onClick={() => removeSession(index)}
									>
										<Trash2 className="h-4 w-4" />
									</LoadingButton>
								</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>
			<CardFooter>
				<LoadingButton
					onClick={generateSchedule}
					isLoading={isGenerating}
					className="w-full"
				>
					Generate Optimized Schedule
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
