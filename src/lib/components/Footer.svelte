<script>
	import MainNav from './MainNav.svelte';
	import { siteAuthor } from '$lib/setup/config.json';
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" rel="external">RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
		</ul>
	</nav>

	<p>&copy;{new Date().getFullYear()} {siteAuthor.title}</p>
</footer>
