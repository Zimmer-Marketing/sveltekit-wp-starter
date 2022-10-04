<script>
	import { siteTitle } from '$lib/setup/config.json';

	export let data;
</script>

<svelte:head>
	<title>{siteTitle.title}</title>
</svelte:head>

<div>
	<h2 class="text-red-500">this is my tailwinds test</h2>
</div>

{@html data.ReadMe}
<!-- This is the README.md file in the root of the repo. It serves double duty as the homepage's content. If you'd rather use your own HTML and/or Svelte, you can delete/modify everything in this file. -->
