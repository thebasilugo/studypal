"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { Bell } from "lucide-react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const TIMER_MODES = {
	focus: 25 * 60,
	shortBreak: 5 * 60,
	longBreak: 15 * 60,
};

export function StudyTimer() {
	const [mode, setMode] = useState<TimerMode>("focus");
	const [timeLeft, setTimeLeft] = useState(TIMER_MODES[mode]);
	const [isActive, setIsActive] = useState(false);
	const [cycles, setCycles] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
		} else if (isActive && timeLeft === 0) {
			if (mode === "focus") {
				const newCycles = cycles + 1;
				setCycles(newCycles);
				if (newCycles % 4 === 0) {
					setMode("longBreak");
				} else {
					setMode("shortBreak");
				}
			} else {
				setMode("focus");
			}
			setTimeLeft(TIMER_MODES[mode]);
			playAlarm();
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, timeLeft, mode, cycles]);

	const toggleTimer = () => {
		setIsActive(!isActive);
	};

	const resetTimer = () => {
		setIsActive(false);
		setTimeLeft(TIMER_MODES[mode]);
	};

	const changeMode = (newMode: TimerMode) => {
		setMode(newMode);
		setTimeLeft(TIMER_MODES[newMode]);
		setIsActive(false);
	};

	const playAlarm = () => {
		const audio = new Audio("/alarm.mp3"); // You'll need to add this audio file to your public folder
		audio.play();
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Study Timer</CardTitle>
				<CardDescription>
					Use the Pomodoro Technique to manage your study sessions.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-center items-center space-x-4">
					<Select
						value={mode}
						onValueChange={(value: TimerMode) => changeMode(value)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select mode" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="focus">Focus</SelectItem>
							<SelectItem value="shortBreak">Short Break</SelectItem>
							<SelectItem value="longBreak">Long Break</SelectItem>
						</SelectContent>
					</Select>
					<Bell className="h-6 w-6" />
				</div>
				<div className="text-center text-4xl font-bold">
					{formatTime(timeLeft)}
				</div>
				<Progress
					value={((TIMER_MODES[mode] - timeLeft) / TIMER_MODES[mode]) * 100}
					className="w-full"
				/>
				<div className="flex justify-center space-x-4">
					<Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
					<Button onClick={resetTimer} variant="outline">
						Reset
					</Button>
				</div>
				<div className="text-center">
					<p>Completed Pomodoros: {cycles}</p>
				</div>
			</CardContent>
		</Card>
	);
}
