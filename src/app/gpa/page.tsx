import { GPACalculator } from "@/components/GPA/GPACalculator";

export default function GPAPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">GPA Calculator</h1>
			<GPACalculator />
		</div>
	);
}
