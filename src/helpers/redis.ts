const apiUrl = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(command: Command, ...args: (string | number)[]) {
	// Construct fetch url
	const commandUrl = `${apiUrl}/${command}/${args.join("/")}`;

	// call the api
	const res = await fetch(commandUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: "no-store",
	});

	// Throw error if something goes wrong
	if (!res.ok) {
		throw new Error(`Error executing Redis command: ${res.statusText}`);
	}

	// parse res and return data
	const data = await res.json();
	return data.result;
}
