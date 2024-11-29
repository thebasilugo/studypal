import { CourseLogTable } from "@/components/CourseLog/CourseLogTable";

export default function CourseLogPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Course Log</h1>
			<CourseLogTable />
		</div>
	);
}
