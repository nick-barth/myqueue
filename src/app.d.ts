import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';

declare global {
	declare module '*.svg?component' {
		import type { ComponentType, SvelteComponentTyped } from 'svelte';
		import type { SVGAttributes } from 'svelte/elements';

		const content: ComponentType<SvelteComponentTyped<SVGAttributes<SVGSVGElement>>>;

		export default content;
	}

	declare module '*.svg?src' {
		const content: string;
		export default content;
	}

	declare module '*.svg?url' {
		const content: string;
		export default content;
	}

	declare module '*.svg?dataurl' {
		const content: string;
		export default content;
	}

	declare module '*.svg?dataurl=base64' {
		const content: string;
		export default content;
	}

	declare module '*.svg?dataurl=enc' {
		const content: string;
		export default content;
	}

	declare module '*.svg?dataurl=unenc' {
		const content: string;
		export default content;
	}

	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclick_outside?: (e: CustomEvent) => void;
	}
}
