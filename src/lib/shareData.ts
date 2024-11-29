export const encodeShareableLink = (data: any) => {
	const jsonString = JSON.stringify(data);
	const encodedData = btoa(jsonString);
	return `${window.location.origin}/share?data=${encodedData}`;
};

export const decodeShareableLink = (encodedData: string) => {
	try {
		const jsonString = atob(encodedData);
		return JSON.parse(jsonString);
	} catch (error) {
		console.error("Error decoding shareable link:", error);
		return null;
	}
};
