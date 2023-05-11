import db from '$lib/db';

export async function load({ params }) {
	const articles = await db.discovery.get(params.source);
	return { ...params, articles };
}
